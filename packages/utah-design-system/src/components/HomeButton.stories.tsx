import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import type { Meta } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { HomeButton as Component } from './HomeButton';

import '@arcgis/core/assets/esri/themes/light/main.css';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;

export const Example = {
  render: () => {
    const viewDivRef = useRef<HTMLDivElement | null>(null);
    const view = useRef<__esri.MapView | null>(null);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
      if (view.current) {
        return;
      }

      view.current = new MapView({
        container: viewDivRef.current!,
        map: new Map({
          basemap: 'topo',
        }),
        zoom: 15,
        center: [-111.5, 39.5],
      });

      view.current.when(() => {
        setReady(true);
      });
    }, [view.current, viewDivRef.current]);

    return (
      <>
        <div
          ref={viewDivRef}
          className="border rounded-lg size-96 overflow-hidden"
        >
          {ready && <Component view={view.current!} />}
        </div>
      </>
    );
  },
};
