import React, { Component } from 'react';
import './Sherlock.scss';
import { Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import escapeRegExp from 'lodash.escaperegexp';
import debounce from 'lodash.debounce';
import sortBy from 'lodash.sortby';
import uniqWith from 'lodash.uniqwith';
import Downshift from 'downshift';
import isEqual from 'react-fast-compare';

class Sherlock extends Component {
  static defaultProps = {
    symbols: {
      polygon: {
        type: 'simple-fill',
        color: [240, 240, 240, 0.5],
        outline: {
          style: 'solid',
          color: [255, 255, 0, 0.5],
          width: 2.5,
        },
      },
      line: {
        type: 'simple-line',
        style: 'solid',
        color: [255, 255, 0],
        width: 5,
      },
      point: {
        type: 'simple-marker',
        style: 'circle',
        color: [255, 255, 0, 0.5],
        size: 10,
      },
    },
    maxResultsToDisplay: 10,
  };

  itemToString = this.itemToString.bind(this);
  handleStateChange = this.handleStateChange.bind(this);

  constructor(props) {
    super(props);
    this.innerRef = React.createRef();
  }

  async handleStateChange(feature) {
    const { provider, symbols, onSherlockMatch } = this.props;

    const searchValue =
      feature.attributes[provider.idField || provider.searchField];

    let contextValue;
    if (provider.contextField) {
      contextValue = feature.attributes[provider.contextField];
    }

    const results = await provider.getFeature(searchValue, contextValue);

    const { Graphic } = this.props.modules;

    const graphics = results.map(
      (feature) =>
        new Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: symbols[feature.geometry.type],
        })
    );

    onSherlockMatch(graphics);
  }

  itemToString(item) {
    console.log('Clue:itemToString', arguments);
    const { searchField } = this.props.provider;

    return item ? item.attributes[searchField] : '';
  }

  componentDidMount() {
    if (this.props.mapView) {
      this.props.mapView.ui.add(this.innerRef.current, this.props.position);
    }
  }

  render() {
    console.log('SherlockDownshift:render', arguments);
    const props = {
      itemToString: this.itemToString,
      onChange: this.handleStateChange,
    };

    return (
      <div ref={this.innerRef}>
        <Downshift {...props}>
          {({
            getInputProps,
            getItemProps,
            highlightedIndex,
            isOpen,
            inputValue,
            getMenuProps,
          }) => (
            <div className="sherlock">
              {this.props.label ? <h4>{this.props.label}</h4> : null}
              <div>
                <InputGroup>
                  <Input
                    {...getInputProps()}
                    placeholder={this.props.placeHolder}
                    autoComplete="off"
                  ></Input>
                  <InputGroupAddon addonType="append">
                    <Button size="sm" color="secondary" disabled>
                      <FontAwesomeIcon
                        icon={faSearch}
                        size="lg"
                      ></FontAwesomeIcon>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                <div className="sherlock__match-dropdown" {...getMenuProps()}>
                  <ul className="sherlock__matches">
                    {!isOpen ? null : (
                      <Clue
                        clue={inputValue}
                        provider={this.props.provider}
                        maxresults={this.props.maxResultsToDisplay}
                      >
                        {({ short, hasmore, loading, error, data = [] }) => {
                          if (short) {
                            return (
                              <li
                                className="sherlock__match-item alert-primary"
                                disabled
                              >
                                Type more than 2 letters.
                              </li>
                            );
                          }

                          if (loading) {
                            return (
                              <li
                                className="sherlock__match-item alert-primary"
                                disabled
                              >
                                Loading...
                              </li>
                            );
                          }

                          if (error) {
                            return (
                              <li
                                className="sherlock__match-item alert-danger"
                                disabled
                              >
                                {error}
                              </li>
                            );
                          }

                          if (!data.length) {
                            return (
                              <li
                                className="sherlock__match-item alert-warning"
                                disabled
                              >
                                No items found.
                              </li>
                            );
                          }

                          let items = data.map((item, index) => (
                            <li
                              key={index}
                              {...getItemProps({
                                key: index,
                                className:
                                  'sherlock__match-item' +
                                  (highlightedIndex === index
                                    ? ' sherlock__match-item--selected'
                                    : ''),
                                item,
                                index,
                              })}
                            >
                              <Highlighted
                                text={
                                  item.attributes[
                                    this.props.provider.searchField
                                  ]
                                }
                                highlight={inputValue}
                              ></Highlighted>
                              <div>
                                {item.attributes[
                                  this.props.provider.contextField
                                ] || ''}
                              </div>
                            </li>
                          ));

                          if (hasmore) {
                            items.push(
                              <li
                                key="toomany"
                                className="sherlock__match-item alert-primary text-center"
                                disabled
                              >
                                More than {this.props.maxResultsToDisplay} items
                                found.
                              </li>
                            );
                          }

                          return items;
                        }}
                      </Clue>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

class Clue extends Component {
  state = {
    data: undefined,
    loading: false,
    error: false,
    short: true,
    hasmore: false,
  };

  async componentDidMount() {
    console.log('Clue:componentDidMount', arguments);
    await this.fetchData();
  }

  // eslint-disable-next-line no-unused-vars
  async componentDidUpdate({ children: _, ...prevProps }) {
    console.log('Clue:componentDidUpdate', arguments);

    // eslint-disable-next-line no-unused-vars
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      await this.fetchData();
    }
  }

  makeNetworkRequest = debounce(async () => {
    console.log('Clue:makeNetworkRequest', this.props);

    const { clue, provider, maxresults } = this.props;
    const { searchField, contextField } = provider;

    let data;
    try {
      data = await provider.search(clue, maxresults);
    } catch (e) {
      if (e.name === 'AbortError') {
        // ignore cancelled requests
        return;
      }

      this.setState({
        data: undefined,
        error: e.message,
        loading: false,
        short: clue.length <= 2,
        hasmore: false,
      });

      console.error(e);

      return;
    }

    const iteratee = [`attributes.${searchField}`];
    let hasContext = false;
    if (contextField) {
      iteratee.push(`attributes.${contextField}`);
      hasContext = true;
    }

    let features = uniqWith(data, (a, b) => {
      if (hasContext) {
        return (
          a.attributes[searchField] === b.attributes[searchField] &&
          a.attributes[contextField] === b.attributes[contextField]
        );
      } else {
        return a.attributes[searchField] === b.attributes[searchField];
      }
    });

    features = sortBy(features, iteratee);
    let hasMore = false;
    if (features.length > maxresults) {
      features = features.slice(0, maxresults);
      hasMore = true;
    }

    this.setState({
      data: features,
      loading: false,
      error: false,
      short: clue.length <= 2,
      hasmore: hasMore,
    });
  }, 100);

  async fetchData() {
    console.log('Clue:fetchData', arguments);

    this.setState({
      error: false,
      loading: true,
      short: this.props.clue.length <= 2,
      hasmore: false,
    });

    if (this.props.clue.length > 2) {
      await this.makeNetworkRequest();
    }
  }

  render() {
    console.log('Clue:render', arguments);

    const { children } = this.props;
    const { short, data, loading, error, hasmore } = this.state;

    return children({
      short,
      data,
      loading,
      error,
      hasmore,
      refetch: this.fetchData,
    });
  }
}

const Highlighted = ({ text = '', highlight = '' }) => {
  if (!highlight.trim()) {
    return <div>{text}</div>;
  }

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);

  return (
    <div>
      {parts
        .filter((part) => part)
        .map((part, i) =>
          regex.test(part) ? (
            <mark key={i}>{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
    </div>
  );
};

export default Sherlock;
