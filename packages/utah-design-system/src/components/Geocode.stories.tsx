import { Meta } from '@storybook/react';
import { Geocode as Component } from './Geocode.js';
import { fn, waitFor, userEvent, within, expect } from '@storybook/test';
import { http, HttpResponse } from 'msw';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

export default meta;

export const Example = {};

export const Milepost = {
  args: { type: 'route-milepost' },
};

const geocode = async (canvas: any, step: any) => {
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
  play: async ({ canvasElement, step }: { canvasElement: any; step: any }) => {
    const canvas = within(canvasElement);

    await geocode(canvas, step);

    const button = canvas.getByRole('button') as HTMLButtonElement;
    await waitFor(
      () => {
        if (button.disabled) {
          throw new Error('Button is still disabled');
        }
      },
      { timeout: 5000 },
    );

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
  play: async ({ canvasElement, step }: { canvasElement: any; step: any }) => {
    const canvas = within(canvasElement);

    await geocode(canvas, step);

    const button = canvas.getByRole('button') as HTMLButtonElement;
    await waitFor(
      () => {
        if (button.disabled) {
          throw new Error('Button is still disabled');
        }
      },
      { timeout: 5000 },
    );

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
  play: async ({ canvasElement, step }: { canvasElement: any; step: any }) => {
    const canvas = within(canvasElement);

    await geocode(canvas, step);

    const button = canvas.getByRole('button') as HTMLButtonElement;
    await waitFor(
      () => {
        if (button.disabled) {
          throw new Error('Button is still disabled');
        }
      },
      { timeout: 5000 },
    );

    await expect(canvas.getByText('No match', {})).toBeInTheDocument();
  },
};
