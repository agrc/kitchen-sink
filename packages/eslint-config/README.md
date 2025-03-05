# UGRC Eslint Config

This is UGRC's eslint configuration for JavaScript and TypeScript projects. There are two exports available:

- `browser` - This is intended for all apps that run in a browser. It will also work for server-side code, it just runs checks that may not be applicable.
- `server` - This is intended for non-browser projects. It's very similar to `browser` but doesn't have any of the browser-specific plugins enabled.

## Usage

```js
// eslint.config.js
import { browser } from '@ugrc/eslint-config';

export default browser;
```

If you want to extend the configuration, you can do so like this:

```js
// eslint.config.js
import { browser } from '@ugrc/eslint-config';

export default {
  ...browser,
  rules: {
    ...browser.rules,
    'no-console': 'off',
  },
};
```
