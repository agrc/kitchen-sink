/*
This file is required (no pun intended) to make `require.context(..)` work
in .storybook/config.js.
*/
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'regenerator-runtime/runtime';

registerRequireContextHook();
configure({ adapter: new Adapter() });
