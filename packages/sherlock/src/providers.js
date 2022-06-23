import { toQueryString } from '@agrc/helpers';

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
    this.query.outFields = this.getOutFields(
      options.outFields,
      this.searchField,
      options.contextField
    );
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

    const featureSet = await this.queryTask.execute(query, {
      signal: this.abortController.signal,
    });

    return featureSet.features;
  }

  async getFeature(searchValue, contextValue) {
    console.log('sherlock.MapServiceProvider', arguments);

    this.query.where = this.getFeatureClause(searchValue, contextValue);
    this.query.returnGeometry = true;
    const featureSet = await this.queryTask.execute(this.query);

    return featureSet.features;
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
    this.webApi = new WebApi(apiKey);
  }

  async search(searchString, maxresults) {
    console.log('sherlock.providers.WebAPI:search', arguments);

    return await this.webApi.search(this.searchLayer, this.outFields, {
      predicate: this.getSearchClause(searchString),
      spatialReference: this.wkid,
      pageSize: maxresults ? maxresults + 1 : null,
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

    const querystring = toQueryString(options);

    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();

    const response = await fetch(url + querystring, {
      signal: this.abortController.signal,
    });

    if (!response.ok) {
      throw Error(response.message || response.statusText);
    }

    const result = await response.json();

    if (result.status !== 200) {
      throw Error(result.message);
    }

    return result.result;
  }
}

class LocatorSuggestProvider extends ProviderBase {
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

export { WebApiProvider, MapServiceProvider, LocatorSuggestProvider };
