import React from 'react';
import { LayerSelectorItem } from './LayerSelector';


export default {
  title: 'LayerSelector/Item'
};

export const defaultBaseLayer = () => <LayerSelectorItem layerType="baselayer" selected={false} onChange={() => {}} id="Base Layer"/>;
export const checkedBaseLayer = () => <LayerSelectorItem layerType="baselayer" selected={true} onChange={() => {}} id="Base Layer"/>;
export const defaultOverlay = () => <LayerSelectorItem layerType="overlay" selected={false} onChange={() => {}} id="Overlay Layer"/>;
export const checkedOverlay = () => <LayerSelectorItem layerType="overlay" selected={true} onChange={() => {}} id="Overlay Layer"/>;
