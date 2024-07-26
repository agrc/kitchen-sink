import { LayerSelector } from './LayerSelector.tsx';

export default {
  component: LayerSelector,
  parameters: {
    layout: 'padded',
  },
  args: {
    expanded: false,
    options: {
      baseLayers: [
        { id: 'Hybrid', name: 'Hybrid' },
        { id: 'Lite', name: 'Lite' },
        { id: 'Terrain', name: 'Terrain' },
        { id: 'Topo', name: 'Topo' },
        { id: 'Color IR', name: 'Color IR' },
      ],
      overlays: [
        { id: 'Address points', name: 'Address points' },
        { id: 'Land ownership', name: 'Land ownership' },
      ],
    },
  },
};

export const Example = (args) => <LayerSelector {...args}></LayerSelector>;
