import React, { Component } from 'react';
import './Sherlock.scss';
import { Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import escapeRegExp from 'lodash.escaperegexp';
import debounce from "lodash.debounce";
import sortBy from 'lodash.sortby';
import uniqWith from 'lodash.uniqwith';
import Downshift from 'downshift';
import isEqual from "react-fast-compare";


const toQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&')
    .replace(/%20/g, '+');
};

class Sherlock extends Component {
  static defaultProps = {
    symbols: {
      polygon: {
        type: 'simple-fill',
        color: [240, 240, 240, .5],
        outline: {
          style: 'solid',
          color: [255, 255, 0, .5],
          width: 2.5
        }
      },
      line: {
        type: 'simple-line',
        style: 'solid',
        color: [255, 255, 0],
        width: 5
      },
      point: {
        type: 'simple-marker',
        style: 'circle',
        color: [255, 255, 0, 0.5],
        size: 10
      }
    },
    maxResultsToDisplay: 10
  };

  itemToString = this.itemToString.bind(this);
  handleStateChange = this.handleStateChange.bind(this);

  constructor(props) {
    super(props);
    this.innerRef = React.createRef();
  }

  async handleStateChange(feature) {
    const { provider, symbols, onSherlockMatch } = this.props;

    const searchValue = feature.attributes[provider.searchField];

    let contextValue;
    if (provider.contextField) {
      contextValue = feature.attributes[provider.contextField];
    }

    const response = await provider.getFeature(searchValue, contextValue);

    const { Graphic } = this.props.modules;

    const results = response.data;

    const graphics = results.map(feature =>
      (new Graphic({
        geometry: feature.geometry,
        attributes: feature.attributes,
        symbol: symbols[feature.geometry.type]
      }))
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
      onChange: this.handleStateChange
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
            getMenuProps
          }) => (
            <div className='sherlock'>
              { this.props.label ? <h4>{this.props.label}</h4> : null }
              <div>
                <InputGroup>
                  <Input {...getInputProps()} placeholder={this.props.placeHolder} autoComplete="off"></Input>
                  <InputGroupAddon addonType="append">
                    <Button size="sm" color="secondary" disabled>
                      <FontAwesomeIcon icon={faSearch} size="lg"></FontAwesomeIcon>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                <div className="sherlock__match-dropdown" {...getMenuProps()}>
                  <ul className="sherlock__matches">
                    {!isOpen ?
                      null :
                      <Clue clue={inputValue} provider={this.props.provider} maxresults={this.props.maxResultsToDisplay}>
                        {({ short, hasmore, loading, error, data = [] }) => {
                          if (short) {
                            return <li className="sherlock__match-item alert-primary" disabled>Type more than 2 letters.</li>;
                          }

                          if (loading) {
                            return <li className="sherlock__match-item alert-primary" disabled>Loading...</li>;
                          }

                          if (error) {
                            return <li className="sherlock__match-item alert-danger" disabled>Error! ${error}</li>;
                          }

                          if (!data.length) {
                            return <li className="sherlock__match-item alert-warning" disabled>No items found.</li>;
                          }

                          let items = data.map((item, index) => (
                            <li key={index} {...getItemProps({
                              key: index,
                              className: 'sherlock__match-item' + (highlightedIndex === index ? ' sherlock__match-item--selected' : ''),
                              item,
                              index
                            })}>
                              <Highlighted text={item.attributes[this.props.provider.searchField]} highlight={inputValue}></Highlighted>
                              <div>{item.attributes[this.props.provider.contextField] || ''}</div>
                            </li>
                          ));

                          if (hasmore) {
                            items.push(
                              <li key="toomany" className="sherlock__match-item alert-primary text-center" disabled>More than {this.props.maxResultsToDisplay} items found.</li>
                            );
                          }

                          return items;
                        }}
                      </Clue>
                    }
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
    hasmore: false
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

    let response;
    try {
      response = await provider.search(clue, maxresults);
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
        hasmore: false
      });

      console.error(e);
    }

    const iteratee = [`attributes.${searchField}`];
    let hasContext = false;
    if (contextField) {
      iteratee.push(`attributes.${contextField}`);
      hasContext = true;
    }

    let features = uniqWith(response.data, (a, b) => {
      if (hasContext) {
        return a.attributes[searchField] === b.attributes[searchField] &&
          a.attributes[contextField] === b.attributes[contextField];
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
      hasmore: hasMore
    });
  });

  async fetchData() {
    console.log('Clue:fetchData', arguments);

    this.setState({
      error: false,
      loading: true,
      short: this.props.clue.length <= 2,
      hasmore: false
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
      refetch: this.fetchData
    });
  }
}

class ProviderBase {
  getOutFields(outFields, searchField, contextField) {
    outFields = outFields || [];

    // don't mess with '*'
    if (outFields[0] === '*') {
      return outFields;
    }

    const addField = (fld) => {
      if (fld && outFields.indexOf(fld) === -1) {
        outFields.push(fld);
      }
    };

    addField(searchField);
    addField(contextField);

    return outFields;
  }

  getSearchClause(text) {
    return `UPPER(${this.searchField}) LIKE UPPER('%${text}%')`;
  }

  getFeatureClause(searchValue, contextValue) {
    let statement = `${this.searchField}='${searchValue}'`;

    if (this.contextField) {
      if (contextValue && contextValue.length > 0) {
        statement += ` AND ${this.contextField}='${contextValue}'`;
      } else {
        statement += ` AND ${this.contextField} IS NULL`;
      }
    }

    return statement;
  }
}

class MapServiceProvider extends ProviderBase {
  constructor(serviceUrl, searchField, modules, options = {}) {
    console.log('sherlock.MapServiceProvider:constructor', arguments);
    super();

    this.searchField = searchField;
    this.contextField = options.contextField;
    this.modules = modules;

    this.setUpQueryTask(serviceUrl, options);
  }

  setUpQueryTask(serviceUrl, options) {
    const { Query, QueryTask } = this.modules;
    const defaultWkid = 3857;
    this.query = new Query();
    this.query.outFields = this.getOutFields(options.outFields, this.searchField, options.contextField);
    this.query.returnGeometry = false;
    this.query.outSpatialReference = { wkid: options.wkid || defaultWkid };
    this.query.orderByFields = [this.searchField];

    this.queryTask = new QueryTask({ url: serviceUrl });
  }

  async search(searchString, maxresults) {
    console.log('sherlock.MapServiceProvider:search', arguments);

    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    const query = this.query.clone();
    query.where = this.getSearchClause(searchString);

    if (maxresults) {
      query.num = maxresults + 1;
    }

    const featureSet = await this.queryTask.execute(query, { signal: this.abortController.signal });

    return { data: featureSet.features };
  }

  async getFeature(searchValue, contextValue) {
    console.log('sherlock.MapServiceProvider', arguments);

    this.query.where = this.getFeatureClause(searchValue, contextValue);
    this.query.returnGeometry = true;
    const featureSet = await this.queryTask.execute(this.query);

    return { data: featureSet.features };
  }
}

class WebApiProvider extends ProviderBase {
  constructor(apiKey, searchLayer, searchField, options) {
    super();
    console.log('sherlock.providers.WebAPI:constructor', arguments);

    const defaultWkid = 3857;
    this.geometryClasses = {
      point: console.log,
      polygon: console.log,
      polyline: console.log
    };

    this.searchLayer = searchLayer;
    this.searchField = searchField;

    if (options) {
      this.wkid = options.wkid || defaultWkid;
      this.contextField = options.contextField;
      this.outFields = this.getOutFields(options.outFields, this.searchField, this.contextField);
    } else {
      this.wkid = defaultWkid;
    }

    this.outFields = this.getOutFields(null, this.searchField, this.contextField);
    this.webApi = new WebApi(apiKey);
  }

  async search(searchString, maxresults) {
    console.log('sherlock.providers.WebAPI:search', arguments);

    return await this.webApi.search(this.searchLayer, this.outFields, {
      predicate: this.getSearchClause(searchString),
      spatialReference: this.wkid,
      pageSize: (maxresults) ? maxresults + 1 : null
    });
  }

  async getFeature(searchValue, contextValue) {
    console.log('sherlock.providers.WebAPI:getFeature', arguments);

    return await this.webApi.search(this.searchLayer, this.outFields.concat('shape@'), {
      predicate: this.getFeatureClause(searchValue, contextValue),
      spatialReference: this.wkid
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
      {
        parts.filter(part => part).map((part, i) => (
          regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
        ))
      }
    </div>
  );
};

class WebApi {
  constructor(apiKey) {
    this.baseUrl = 'https://api.mapserv.utah.gov/api/v1/';

    // defaultAttributeStyle: String
    this.defaultAttributeStyle = 'identical';

    // xhrProvider: dojo/request/* provider
    //      The current provider as determined by the search function
    this.xhrProvider = null;


    // Properties to be sent into constructor

    // apiKey: String
    //      web api key (http://developer.mapserv.utah.gov/AccountAccess)
    this.apiKey = apiKey;
  }

  async search(featureClass, returnValues, options) {
    // summary:
    //      search service wrapper (http://api.mapserv.utah.gov/#search)
    // featureClass: String
    //      Fully qualified feature class name eg: SGID10.Boundaries.Counties
    // returnValues: String[]
    //      A list of attributes to return eg: ['NAME', 'FIPS'].
    //      To include the geometry use the shape@ token or if you want the
    //      envelope use the shape@envelope token.
    // options.predicate: String
    //      Search criteria for finding specific features in featureClass.
    //      Any valid ArcObjects where clause will work. If omitted, a TSQL *
    //      will be used instead. eg: NAME LIKE 'K%'
    // options.geometry: String (not fully implemented)
    //      The point geometry used for spatial queries. Points are denoted as
    //      'point:[x,y]'.
    // options.spatialReference: Number
    //      The spatial reference of the input geographic coordinate pair.
    //      Choose any of the wkid's from the Geographic Coordinate System wkid reference
    //      or Projected Coordinate System wkid reference. 26912 is the default.
    // options.tolerance: Number (not implemented)
    // options.spatialRelation: String (default: 'intersect')
    // options.buffer: Number
    //      A distance in meters to buffer the input geometry.
    //      2000 meters is the maximum buffer.
    // options.pageSize: Number (not implemented)
    // options.skip: Number (not implemented)
    // options.attributeStyle: String (defaults to 'identical')
    //      Controls the casing of the attributes that are returned.
    //      Options:
    //
    //      'identical': as is in data.
    //      'upper': upper cases all attribute names.
    //      'lower': lower cases all attribute names.
    //      'camel': camel cases all attribute names
    //
    // returns: Promise
    console.log('WebApi:search', arguments);

    var url = `${this.baseUrl}search/${featureClass}/${encodeURIComponent(returnValues.join(','))}?`;

    if (!options) {
      options = {};
    }

    options.apiKey = this.apiKey;
    if (!options.attributeStyle) {
      options.attributeStyle = this.defaultAttributeStyle;
    }

    const querystring = toQueryString(options);

    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    const response = await fetch(url + querystring, { signal: this.abortController.signal });

    if (!response.ok) {
      return {
        ok: false,
        message: response.message || response.statusText
      };
    }

    const result = await response.json();

    if (result.status !== 200) {
      return {
        ok: false,
        message: result.message
      };
    }

    return {
      ok: true,
      data: result.result
    };
  }
}

export { Sherlock, WebApiProvider, MapServiceProvider };
