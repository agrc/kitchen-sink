import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import TestButton from '../packages/test-button';

export default {
  title: 'TestButton',
};

export const testOne = () => (
  <TestButton />
);
