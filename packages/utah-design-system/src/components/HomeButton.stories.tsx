/* eslint-disable react-hooks/rules-of-hooks */
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { HomeButton } from './HomeButton';

const meta: Meta<typeof HomeButton> = {
  component: HomeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof HomeButton>;

export const Example: Story = {
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
    }, []);

    return (
      <>
        <div
          ref={viewDivRef}
          className="size-96 overflow-hidden rounded-lg border"
        >
          {ready && <HomeButton view={view.current!} />}
        </div>
      </>
    );
  },
};
