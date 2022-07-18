import Graphic from '@arcgis/core/Graphic';
import * as query from '@arcgis/core/rest/query';
import Query from '@arcgis/core/rest/support/Query';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Downshift from 'downshift';
import escapeRegExp from 'lodash.escaperegexp';
import sortBy from 'lodash.sortby';
import uniqWith from 'lodash.uniqwith';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Button, Input, InputGroup } from 'reactstrap';
import './Sherlock.css';

const defaultSymbols = {
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
};

export default function Sherlock({
  symbols = defaultSymbols,
  provider,
  onSherlockMatch,
  label,
  placeHolder,
  maxResultsToDisplay,
}) {
  const handleStateChange = async (feature) => {
    const searchValue = feature.attributes[provider.searchField];

    let contextValue;
    if (provider.contextField) {
      contextValue = feature.attributes[provider.contextField];
    }

    const response = await provider.getFeature(searchValue, contextValue);

    const results = response.data;

    const graphics = results.map(
      (feature) =>
        new Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: symbols[feature.geometry.type],
        })
    );

    onSherlockMatch(graphics);
  };

  const itemToString = (item) => {
    console.log('Clue:itemToString', arguments);

    return item ? item.attributes[provider.searchField] : '';
  };

  return (
    <Downshift itemToString={itemToString} onChange={handleStateChange}>
      {({
        getInputProps,
        getItemProps,
        highlightedIndex,
        isOpen,
        inputValue,
        getMenuProps,
      }) => (
        <div className="sherlock">
          <h4>{label}</h4>
          <div style={{ paddingBottom: '1em' }}>
            <InputGroup>
              <Input
                {...getInputProps()}
                placeholder={placeHolder}
                autoComplete="nope"
              ></Input>
              <Button size="sm" color="secondary" disabled>
                <FontAwesomeIcon icon={faSearch} size="lg"></FontAwesomeIcon>
              </Button>
            </InputGroup>
            <div className="sherlock__match-dropdown" {...getMenuProps()}>
              <ul className="sherlock__matches">
                {!isOpen ? null : (
                  <Clue
                    clue={inputValue}
                    provider={provider}
                    maxResults={maxResultsToDisplay}
                  >
                    {({ short, hasMore, error, data = [] }) => {
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

                      if (error) {
                        return (
                          <li
                            className="sherlock__match-item alert-danger"
                            disabled
                          >
                            Error! ${error}
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
                        // eslint-disable-next-line react/jsx-key
                        <li
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
                            text={item.attributes[provider.searchField]}
                            highlight={inputValue}
                          ></Highlighted>
                          <div>
                            {item.attributes[provider.contextField] || ''}
                          </div>
                        </li>
                      ));

                      if (hasMore) {
                        items.push(
                          <li
                            key="too-many"
                            className="sherlock__match-item alert-primary text-center"
                            disabled
                          >
                            More than {maxResultsToDisplay} items found.
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
  );
}
Sherlock.propTypes = {
  symbols: PropTypes.object,
  provider: PropTypes.object,
  onSherlockMatch: PropTypes.func,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  maxResultsToDisplay: PropTypes.number,
};

function Clue({ clue, provider, maxResults, children }) {
  const [state, setState] = useState({
    data: undefined,
    loading: false,
    error: false,
    short: true,
    hasMore: false,
  });

  const updateState = (newProps) => {
    setState((oldState) => {
      return {
        ...oldState,
        ...newProps,
      };
    });
  };

  const makeNetworkRequest = useCallback(async () => {
    console.log('makeNetworkRequest');
    const { searchField, contextField } = provider;

    const response = await provider.search(clue).catch((e) => {
      updateState({
        data: undefined,
        error: e.message,
        loading: false,
        short: clue.length <= 2,
        hasMore: false,
      });

      console.error(e);
    });

    const iteratee = [`attributes.${searchField}`];
    let hasContext = false;
    if (contextField) {
      iteratee.push(`attributes.${contextField}`);
      hasContext = true;
    }

    let features = uniqWith(response.data, (a, b) => {
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
    if (features.length > maxResults) {
      features = features.slice(0, maxResults);
      hasMore = true;
    }

    updateState({
      data: features,
      loading: false,
      error: false,
      short: clue.length <= 2,
      hasMore: hasMore,
    });
  }, [clue, maxResults, provider]);

  useEffect(() => {
    console.log('clue or makeNetworkRequest changed');
    updateState({
      error: false,
      loading: true,
      short: clue.length <= 2,
      hasMore: false,
    });

    if (clue.length > 2) {
      makeNetworkRequest();
    }
  }, [clue, makeNetworkRequest]);

  const { short, data, loading, error, hasMore } = state;

  return children({
    short,
    data,
    loading,
    error,
    hasMore,
    // refetch: fetchData,
  });
}

class ProviderBase {
  controller = new AbortController();
  signal = this.controller.signal;

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

  cancelPendingRequests() {
    this.controller.abort();
  }
}

export class MapServiceProvider extends ProviderBase {
  constructor(serviceUrl, searchField, options = {}) {
    console.log('sherlock.MapServiceProvider:constructor', arguments);
    super();

    this.searchField = searchField;
    this.contextField = options.contextField;
    this.serviceUrl = serviceUrl;

    this.setUpQueryTask(options);
  }

  async setUpQueryTask(options) {
    const defaultWkid = 3857;
    this.query = new Query();
    this.query.outFields = this.getOutFields(
      options.outFields,
      this.searchField,
      options.contextField
    );
    this.query.returnGeometry = false;
    this.query.outSpatialReference = { wkid: options.wkid || defaultWkid };
  }

  async search(searchString) {
    console.log('sherlock.MapServiceProvider:search', arguments);

    this.query.where = this.getSearchClause(searchString);
    const featureSet = await query.executeQueryJSON(
      this.serviceUrl,
      this.query
    );

    return { data: featureSet.features };
  }

  async getFeature(searchValue, contextValue) {
    console.log('sherlock.MapServiceProvider', arguments);

    this.query.where = this.getFeatureClause(searchValue, contextValue);
    this.query.returnGeometry = true;
    const featureSet = await query.executeQueryJSON(
      this.serviceUrl,
      this.query
    );

    return { data: featureSet.features };
  }
}

export class WebApiProvider extends ProviderBase {
  constructor(apiKey, searchLayer, searchField, options) {
    super();
    console.log('sherlock.providers.WebAPI:constructor', arguments);

    const defaultWkid = 3857;
    this.geometryClasses = {
      point: console.log,
      polygon: console.log,
      polyline: console.log,
    };

    this.searchLayer = searchLayer;
    this.searchField = searchField;

    if (options) {
      this.wkid = options.wkid || defaultWkid;
      this.contextField = options.contextField;
      this.outFields = this.getOutFields(
        options.outFields,
        this.searchField,
        this.contextField
      );
    } else {
      this.wkid = defaultWkid;
    }

    this.outFields = this.getOutFields(
      null,
      this.searchField,
      this.contextField
    );
    this.webApi = new WebApi(apiKey, this.signal);
  }

  async search(searchString) {
    console.log('sherlock.providers.WebAPI:search', arguments);

    return await this.webApi.search(this.searchLayer, this.outFields, {
      predicate: this.getSearchClause(searchString),
      spatialReference: this.wkid,
    });
  }

  async getFeature(searchValue, contextValue) {
    console.log('sherlock.providers.WebAPI:getFeature', arguments);

    return await this.webApi.search(
      this.searchLayer,
      this.outFields.concat('shape@'),
      {
        predicate: this.getFeatureClause(searchValue, contextValue),
        spatialReference: this.wkid,
      }
    );
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
Highlighted.propTypes = {
  text: PropTypes.string,
  highlight: PropTypes.string,
};

class WebApi {
  constructor(apiKey, signal) {
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

    this.signal = signal;
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

    var url = `${this.baseUrl}search/${featureClass}/${encodeURIComponent(
      returnValues.join(',')
    )}?`;

    if (!options) {
      options = {};
    }

    options.apiKey = this.apiKey;
    if (!options.attributeStyle) {
      options.attributeStyle = this.defaultAttributeStyle;
    }

    const response = await fetch(url + new URLSearchParams(options), {
      signal: this.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        message: response.message || response.statusText,
      };
    }

    const result = await response.json();

    if (result.status !== 200) {
      return {
        ok: false,
        message: result.message,
      };
    }

    return {
      ok: true,
      data: result.result,
    };
  }
}

export class LocatorSuggestProvider extends ProviderBase {
  searchField = 'text';
  idField = 'magicKey';

  constructor(url, outSRID) {
    super();
    this.url = url;
    this.outSRID = outSRID;
  }

  async search(searchString, maxresults) {
    const suggestUrl = `${this.url}/suggest?text=${searchString}&maxSuggestions=${maxresults}`;

    let response;
    try {
      response = await fetch(suggestUrl);
      const responseJson = await response.json();
      const features = responseJson.suggestions.map((suggestion) => {
        return {
          attributes: suggestion,
        };
      });

      return features;
    } catch {
      const message = 'error with suggest request';
      console.error(message, response);

      throw new Error(message);
    }
  }

  async getFeature(magicKey) {
    const getFeatureUrl = `${this.url}/findAddressCandidates?magicKey=${magicKey}&outSR={"wkid":${this.outSRID}}`;

    const response = await fetch(getFeatureUrl);
    const responseJson = await response.json();
    const candidate = responseJson.candidates[0];
    candidate.geometry = {
      ...candidate.location,
      type: 'point',
      spatialReference: {
        wkid: this.outSRID,
      },
    };
    // used to zoom to result
    candidate.attributes.extent = {
      ...candidate.extent,
      spatialReference: {
        wkid: this.outSRID,
      },
    };

    return [candidate];
  }
}
