/*
This file is required (no pun intended) to make `require.context(..)` work
in .storybook/config.js.
*/
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
registerRequireContextHook();
