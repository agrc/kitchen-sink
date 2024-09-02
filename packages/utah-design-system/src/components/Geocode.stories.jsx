import { Geocode } from './Geocode.jsx';
import { fn, userEvent, within, expect } from '@storybook/test';
import { http, HttpResponse, delay } from 'msw';

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
    apiKey: 'ugrc-storybook',
    events: {
      success: fn(),
      error: fn(),
    },
    wkid: 26912,
  },
};

export const ExampleAddress = {
  render: (args) => {
    console.log('args', args);
    return <Geocode {...args} />;
  },
};

export const ExampleMilepost = {
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

const geocode = async (canvas, step) => {
  await step('Enter address', async () => {
    await userEvent.type(
      canvas.getByLabelText('Street address'),
      '480 N STATE ST',
    );

    await userEvent.type(canvas.getByLabelText('City or Zip code'), 'slc');
  });

  await step('Geocode address', async () => {
    await userEvent.click(canvas.getByRole('button'));
  });
};

export const SuccessfulRequest = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.mapserv.utah.gov/api/v1/geocode/*', async () => {
          return new HttpResponse(
            JSON.stringify({
              result: {
                location: {
                  x: -12455321.74755778,
                  y: 4979830.905009897,
                },
                score: 100,
                locator: 'Centerlines.StatewideRoads',
                matchAddress: '480 N STATE ST, SALT LAKE CITY',
                inputAddress: '480 N STATE ST, slc',
                standardizedAddress: '480 north state street',
                addressGrid: 'SALT LAKE CITY',
              },
              status: 200,
            }),
            {
              status: 200,
            },
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await geocode(canvas, step);

    // this is a half second longer than the spinner delay
    await delay(1000);

    await expect(canvas.getByText('Match found', {})).toBeInTheDocument();
  },
};

export const InvalidApiKey = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.mapserv.utah.gov/api/v1/geocode/*', async () => {
          return new HttpResponse(
            JSON.stringify({
              status: 400,
              message:
                'Your API key does match the pattern created in the self service website.',
            }),
            {
              status: 400,
            },
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await geocode(canvas, step);

    // this is a half second longer than the spinner delay
    await delay(1000);

    await expect(canvas.getByText('Error', {})).toBeInTheDocument();
  },
};

export const NoMatchFound = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.mapserv.utah.gov/api/v1/geocode/*', async () => {
          return new HttpResponse(
            JSON.stringify({
              status: 404,
              message:
                'No address candidates found with a score of 70 or better.',
            }),
            {
              status: 404,
            },
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await geocode(canvas, step);

    // this is a half second longer than the spinner delay
    await delay(1000);

    await expect(canvas.getByText('No match', {})).toBeInTheDocument();
  },
};
