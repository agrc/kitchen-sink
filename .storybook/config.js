import { configure } from '@storybook/react';
import dotenv from 'dotenv';

dotenv.config();

// automatically import all files ending in *.stories.js
configure(require.context('../packages', true, /\.stories\.js$/), module);
