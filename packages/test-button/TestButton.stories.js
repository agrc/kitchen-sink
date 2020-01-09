import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import TestButton from './index.js';

export default {
  title: 'TestButton',
};

export const basic = () => <TestButton />;
