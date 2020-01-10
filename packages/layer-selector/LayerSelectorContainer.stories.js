import React from 'react';
import { LayerSelectorContainer } from './LayerSelector';


export default {
  title: 'LayerSelector.Container'
};

export const closed = () => (
  <LayerSelectorContainer>
    <div style={{width: '200px', height: '200px', border: '1px solid black'}}>peek-a-boo</div>
  </LayerSelectorContainer>
);

export const open = () => (
  <LayerSelectorContainer expanded={true}>
    <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>peek-a-boo</div>
  </LayerSelectorContainer>
);
