import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './LayerSelector.css';
import icon from './layers.svg';

const LayerSelectorContainer = (props) => {
  const [expanded, setExpanded] = useState(props.expanded);

  const imageClasses = classNames(
    'layer-selector__toggle',
    { 'layer-selector--hidden': expanded }
  );

  const fromClasses = classNames(
    { 'layer-selector--hidden': !expanded }
  );

  return (
    <div className="layer-selector" onMouseOver={() => setExpanded(true)} onMouseOut={() => setExpanded(false)} area-haspopup="true">
      <input type="image" className={imageClasses} src={icon} alt="layers" />
      <form className={fromClasses}>
        {props.children}
      </form>
    </div>
  );
};

const LayerSelectorItem = (props) => {
  const inputOptions = {
    type: props.layerType === 'baselayer' ? 'radio' : 'checkbox',
    name: props.layerType,
    value: props.id
  };

  return (
    <div className="layer-selector-item radio checkbox">
      <label className="layer-selector--item">
        <input className="layer-selector-item-input" {...inputOptions} checked={props.selected} onChange={(event) => props.onChange(event, props)} />
        {inputOptions.value}
      </label>
    </div>
  );
};

const imageryAttributionJsonUrl = 'https://mapserv.utah.gov/cdn/attribution/imagery.json';

/**
 * Creates the default TileInfo constructor object for appliance layers.
 * @private
 * @returns {object} The least common denominator constructor object for appliance layers.
 */
const createDefaultTileInfo = (LOD) => {
  const tileSize = 256;
  const earthCircumference = 40075016.685568;
  const inchesPerMeter = 39.37;
  const initialResolution = earthCircumference / tileSize;

  const dpi = 96;
  const maxLevel = 20;
  const squared = 2;
  const lods = [];

  for (let level = 0; level <= maxLevel; level++) {
    const resolution = initialResolution / Math.pow(squared, level);
    const scale = resolution * dpi * inchesPerMeter;

    lods.push(new LOD({
      level: level,
      scale: scale,
      resolution: resolution
    }));
  }

  return {
    dpi: dpi,
    size: tileSize,
    origin: {
      x: -20037508.342787,
      y: 20037508.342787
    },
    spatialReference: {
      wkid: 3857
    },
    lods: lods
  };
};


/** Sets the TileInfo for each of Discover layers since they all use different levels.
* @private
* @param {applianceLayer} layers - The appliance layers object `{ 'id': { urlPattern: ''}}`
* @returns {applianceLayer} - returns Discover layers object with a new `tileInfo` property.
*/
const setTileInfosForApplianceLayers = (layers, defaultTileInfo, TileInfo) => {
  const lods = defaultTileInfo.lods;
  const fiveToNineteen = lods.slice(0, 20); // eslint-disable-line no-magic-numbers
  const fiveToSeventeen = lods.slice(0, 18); // eslint-disable-line no-magic-numbers
  const zeroToEighteen = lods.slice(0, 19); // eslint-disable-line no-magic-numbers

  layers.Imagery.tileInfo = new TileInfo(defaultTileInfo);
  layers.Hybrid.tileInfo = new TileInfo(defaultTileInfo);

  let tileInfo = Object.assign({}, defaultTileInfo);
  tileInfo.lods = zeroToEighteen;

  layers['Color IR'].tileInfo = new TileInfo(tileInfo);

  tileInfo = Object.assign({}, defaultTileInfo);
  tileInfo.lods = fiveToSeventeen;

  layers.Topo.tileInfo = new TileInfo(tileInfo);

  tileInfo = Object.assign({}, defaultTileInfo);
  tileInfo.lods = fiveToNineteen;

  layers.Lite.tileInfo = new TileInfo(tileInfo);
  layers.Overlay.tileInfo = new TileInfo(tileInfo);

  return layers;
};


/**
* Takes layer tokens from `applianceLayers` keys and resolves them to `layerFactory` objects with
* `esri/layer/WebTiledLayer` factories.
* @private
* @param {string} layerType - the type of layer `overlay` or `baselayer`.
* @param {string[]|layerFactory[]} layerFactories - An array of layer tokens or layer factories.
* @returns {layerFactory[]} an array of resolved layer Factory objects.
*/
const createLayerFactories = (layerType, layerFactories, WebTiledLayer, quadWord, applianceLayers) => {
  const resolvedInfos = [];
  layerFactories.forEach((li) => {
    if ((typeof li === 'string' || li instanceof String || li.token) ||
      (typeof li.token === 'string' || li.token instanceof String)) {

      const id = (li.token || li);

      if (!quadWord) {
        console.warn('layer-selector::You chose to use a layer token `' + id + '` without setting ' +
          'your `quadWord` from Discover. The requests for tiles will fail to ' +
          ' authenticate. Pass `quadWord` into the constructor of this widget.');

        return false;
      }

      var layer = applianceLayers[id];

      if (!layer) {
        console.warn('layer-selector::The layer token `' + id + '` was not found. Please use one of ' +
          'the supported tokens (' + Object.keys(applianceLayers).join(', ') +
          ') or pass in the information on how to create your custom layer ' +
          '(`{Factory, url, id}`).');

        return false;
      }

      const linked = [layer.linked, li.linked].reduce((acc, value, index) => {
        if (value) {
          acc = acc.concat(value);
        }

        if (index === 1 && acc.length === 0) {
          return null;
        }

        return acc;
      }, []);

      resolvedInfos.push({
        Factory: WebTiledLayer,
        urlTemplate: layer.urlPattern,
        linked,
        id,
        selected: !!li.selected,
        copyright: layer.copyright,
        layerType
        // TODO: not supported in 4.x WebTiledLayer
        // hasAttributionData: layer.hasAttributionData,
        // attributionDataUrl: layer.attributionDataUrl,
      });
    } else {
      if (!Object.prototype.hasOwnProperty.call(li, 'layerType')) {
        li.layerType = layerType;
      }

      if (!li.selected) {
        li.selected = false;
      }

      resolvedInfos.push(li);
    }
  });

  return resolvedInfos;
};


const LayerSelector = (props) => {
  const [layers, setLayers] = useState({
    baseLayers: [],
    overlays: []
  });
  const [linkedLayers, setLinkedLayers] = useState([]);
  const [managedLayers, setManagedLayers] = useState({});

  useEffect(() => {
    console.log('LayerSelector:updateMap');

    const managedLayersDraft = {...managedLayers};
    const layerItems = layers.baseLayers.concat(layers.overlays);

    layerItems.forEach(layerItem => {
      let layerList = null;
      switch (layerItem.layerType) {
        case 'baselayer':
          if (props.view.map.basemap && props.view.map.basemap.baseLayers) {
            layerList = props.view.map.basemap.baseLayers;
          }
          break;
        case 'overlay':
          layerList = props.view.map.layers;
          break;
        default:
          break;
      }

      if (layerItem.selected === false) {
        var managedLayer = managedLayersDraft[layerItem.id] || {};
        if (!managedLayer.layer) {
          managedLayer.layer = layerList.getItemAt(layerList.indexOf(layerItem.layer));
        }

        if (managedLayer.layer) {
          layerList.remove(managedLayer.layer);
        }

        return;
      }

      if (Object.keys(managedLayersDraft).indexOf(layerItem.id) < 0) {
        managedLayersDraft[layerItem.id] = {
          layerType: layerItem.layerType
        };
      }

      // the set was here before

      if (!managedLayersDraft[layerItem.id].layer) {
        if (typeof layerItem.Factory === 'string') {
          layerItem.Factory = props.modules[layerItem.Factory];
        }
        managedLayersDraft[layerItem.id].layer = new layerItem.Factory(layerItem);
      }

      if (layerItem.selected === true) {
        if (!layerList.includes(managedLayersDraft[layerItem.id].layer)) {
          layerList.add(managedLayersDraft[layerItem.id].layer);
        }
      } else {
        layerList.remove(managedLayersDraft[layerItem.id].layer);
      }

      setManagedLayers(managedLayersDraft);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers]);

  useEffect(() => {
    if (!props.baseLayers || props.baseLayers.length < 1) {
      console.warn('layer-selector::`baseLayers` is null or empty. Make sure you have spelled it correctly ' +
        'and are passing it into the constructor of this widget.');

      return;
    }
  }, [props.baseLayers]);

  useEffect(() => {
    const applianceLayerTemplates = {
      Imagery: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/utah/{level}/{col}/{row}`,
        hasAttributionData: true,
        attributionDataUrl: imageryAttributionJsonUrl
      },
      Topo: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/topo_basemap/{level}/{col}/{row}`,
        copyright: 'AGRC'
      },
      Terrain: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/terrain_basemap/{level}/{col}/{row}`,
        copyright: 'AGRC'
      },
      Lite: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/lite_basemap/{level}/{col}/{row}`,
        copyright: 'AGRC'
      },
      'Color IR': {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/naip_2011_nrg/{level}/{col}/{row}`,
        copyright: 'AGRC'
      },
      Hybrid: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/utah/{level}/{col}/{row}`,
        linked: ['Overlay'],
        hasAttributionData: true,
        attributionDataUrl: imageryAttributionJsonUrl
      },
      Overlay: {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/overlay_basemap/{level}/{col}/{row}`
        // no attribution for overlay layers since it just duplicates the base map attribution
      },
      'Address Points': {
        urlPattern: `https://discover.agrc.utah.gov/login/path/${props.quadWord}/tiles/address_points_basemap/{level}/{col}/{row}`
      }
    };

    const {LOD, TileInfo, Basemap, WebTileLayer} = props.modules;

    props.view.map.basemap = new Basemap();

    const defaultTileInfo = createDefaultTileInfo(LOD);
    const applianceLayers = setTileInfosForApplianceLayers(applianceLayerTemplates, defaultTileInfo, TileInfo);

    const baseLayers = createLayerFactories('baselayer', props.baseLayers, WebTileLayer, props.quadWord, applianceLayers) || [];
    let overlays = props.overlays || [];

    let hasDefaultSelection = false;
    let defaultSelection = null;
    let hasHybrid = false;
    let linkedLayersBuilder = [];

    baseLayers.forEach(layer => {
      if (layer.selected === true) {
        hasDefaultSelection = true;
        defaultSelection = layer;
      }

      if ((layer.id || layer.token) === 'Hybrid') {
        hasHybrid = true;
      }

      if (layer.linked) {
        linkedLayersBuilder = linkedLayersBuilder.concat(layer.linked);
      }
    });
    setLinkedLayers(linkedLayersBuilder);

    // set default basemap to index 0 if not specified by the user
    if (!hasDefaultSelection && baseLayers.length > 0) {
      baseLayers[0].selected = true;
      defaultSelection = baseLayers[0];
    }

    // insert overlay to first spot because hybrid
    if (hasHybrid) {
      overlays.splice(0, 0, 'Overlay');
    }

    overlays = createLayerFactories('overlay', overlays, WebTileLayer, props.quadWord, applianceLayers) || [];

    // set visibility of linked layers to match
    if (defaultSelection.linked && defaultSelection.linked.length > 0) {
      overlays.forEach(layer => {
        if (defaultSelection.linked.includes(layer.id)) {
          layer.selected = true;
        }
      });
    }

    setLayers({
      baseLayers,
      overlays
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.modules]);

  const onItemChanged = (event, props) => {
    console.log('LayerSelector.onItemChanged', props);
    const overlays = layers.overlays;
    const baseLayers = layers.baseLayers;

    if (props.layerType === 'baselayer') {
      baseLayers.forEach(item => {
        item.selected = item.id === props.id ? event.target.checked : false;
      });

      const selectedItem = baseLayers.filter((layer) => layer.selected)[0];

      if (selectedItem.linked && selectedItem.linked.length > 0) {
        overlays.forEach((item) => {
          if (selectedItem.linked.includes(item.id)) {
            item.selected = true;
          }

          return item;
        });
      } else {
        overlays.forEach((item) => {
          if (linkedLayers.includes(item.id)) {
            item.selected = false;
          }
        });
      }
    } else if (props.layerType === 'overlay') {
      overlays.forEach((item) => {
        if (item.id === props.id) {
          item.selected = event.target.checked;
        }
      });
    }

    setLayers({
      overlays,
      baseLayers
    });
  };

  return (
    <div className="layer-selector--layers">
      {layers.baseLayers.map((item, index) => (
        <LayerSelectorItem id={item.name || item.id || 'unknown'} layerType="baselayer" selected={item.selected} onChange={onItemChanged} key={index}></LayerSelectorItem>
      ))}
      <hr className="layer-selector-separator" />
      {layers.overlays.map(item => (
        <LayerSelectorItem id={item.name || item.id || 'unknown'} layerType="overlay" selected={item.selected} onChange={onItemChanged} key={item.id || item}></LayerSelectorItem>
      ))}
    </div>
  );
};


export { LayerSelectorContainer, LayerSelector, LayerSelectorItem };

LayerSelector.propTypes = {
  view: PropTypes.object.isRequired,
  quadWord: PropTypes.string,
  modules: PropTypes.object.isRequired,
  baseLayers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.oneOf(['Hybrid', 'Lite', 'Terrain', 'Topo', 'Color IR', 'Address Points', 'Overlay', 'Imagery']),
    PropTypes.shape({
      Factory: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
      urlTemplate: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.string.isRequired,
      tileInfo: PropTypes.object,
      linked: PropTypes.arrayOf(PropTypes.string)
    }),
    PropTypes.shape({
      token: PropTypes.oneOf(['Hybrid', 'Lite', 'Terrain', 'Topo', 'Color IR', 'Address Points', 'Overlay']).isRequired,
      selected: PropTypes.bool,
      linked: PropTypes.arrayOf(PropTypes.string)
    })
  ])).isRequired,
  overlays: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.oneOf(['Address Points', 'Overlay']),
    PropTypes.shape({
      Factory: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
      urlTemplate: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.string.isRequired,
      tileInfo: PropTypes.object,
      linked: PropTypes.arrayOf(PropTypes.string)
    })]))
};

LayerSelectorItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  layerType: PropTypes.oneOf(['baselayer', 'overlay']).isRequired,
  id: PropTypes.string.isRequired
};
