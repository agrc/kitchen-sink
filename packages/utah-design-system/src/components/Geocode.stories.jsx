import { Geocode } from './Geocode.jsx';
import { fn } from '@storybook/test';

export default {
  component: Geocode,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    format: {
      control: {
        type: 'select',
        options: ['', 'geojson', 'esrijson'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['single-address', 'route-milepost'],
      },
    },
  },
  args: {
    apiKey: 'agrc-storybook',
    events: {
      success: fn(),
      error: fn(),
    },
    wkid: 26912,
  },
};

export const DefaultAddress = {
  render: (args) => {
    console.log('args', args);
    return <Geocode {...args} />;
  },
};

export const DefaultMilepost = {
  render: (args) => <Geocode {...args} type="route-milepost" />,
};

export const MilepostWithArguments = {
  render: (args) => (
    <Geocode
      {...args}
      milepost={{ side: 'decreasing' }}
      wkid={26912}
      format="geojson"
      type="route-milepost"
    />
  ),
};
