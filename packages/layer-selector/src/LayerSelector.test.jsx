import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import LayerSelector from './LayerSelector.jsx';

describe('LayerSelector tests', () => {
  it('LayerSelector snapshot', () => {
    const props = {
      view: {
        map: {},
        when: () => {},
        ui: {
          add: () => {},
        },
      },
      baseLayers: ['Lite', 'Terrain', 'Topo', 'Color IR'],
      quadWord: 'my-fake-quad-word',
    };
    const { asFragment } = render(<LayerSelector {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
