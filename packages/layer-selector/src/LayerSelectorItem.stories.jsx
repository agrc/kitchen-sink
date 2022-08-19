import { LayerSelectorItem } from './';
import './LayerSelector.css';

export default {
  title: 'LayerSelector/Item',
  component: LayerSelectorItem,
};

export const defaultBaseLayer = () => (
  <LayerSelectorItem
    layerType="baselayer"
    selected={false}
    onChange={() => {}}
    id="Base Layer"
  />
);
export const checkedBaseLayer = () => (
  <LayerSelectorItem
    layerType="baselayer"
    selected={true}
    onChange={() => {}}
    id="Base Layer"
  />
);
export const defaultOverlay = () => (
  <LayerSelectorItem
    layerType="overlay"
    selected={false}
    onChange={() => {}}
    id="Overlay Layer"
  />
);
export const checkedOverlay = () => (
  <LayerSelectorItem
    layerType="overlay"
    selected={true}
    onChange={() => {}}
    id="Overlay Layer"
  />
);
export const longLabel = () => (
  <LayerSelectorItem
    layerType="overlay"
    selected={true}
    onChange={() => {}}
    id="Overlay Layer A Longer Label"
  />
);
