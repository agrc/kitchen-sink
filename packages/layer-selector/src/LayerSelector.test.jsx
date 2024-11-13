import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LayerSelector from './';

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
