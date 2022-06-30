import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Dartboard from './';

describe('Dartboard tests', () => {
  it('Dartboard snapshot', () => {
    const args = {
      success: () => {},
      error: () => {},
    };

    const { asFragment } = render(
      <Dartboard apiKey="storybook" events={{ ...args }} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
