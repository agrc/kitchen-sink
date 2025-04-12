import { LayerSelectorItem } from './';
import './LayerSelector.css';

export default {
  component: LayerSelectorItem,
};

export const DefaultBaseLayer = () => (
  <LayerSelectorItem
    layerType="baselayer"
    selected={false}
    onChange={() => {}}
    id="Base Layer"
  />
);
export const CheckedBaseLayer = () => (
  <LayerSelectorItem
    layerType="baselayer"
    selected={true}
    onChange={() => {}}
    id="Base Layer"
  />
);
export const DefaultOverlay = () => (
  <LayerSelectorItem
    layerType="overlay"
    selected={false}
    onChange={() => {}}
    id="Overlay Layer"
  />
);
export const CheckedOverlay = () => (
  <LayerSelectorItem
    layerType="overlay"
    selected={true}
    onChange={() => {}}
    id="Overlay Layer"
  />
);
export const LongLabel = () => (
  <LayerSelectorItem
    layerType="overlay"
    selected={true}
    onChange={() => {}}
    id="Overlay Layer A Longer Label"
  />
);
