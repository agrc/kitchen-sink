# Kitchen Sink

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Development

### Conventional Commits

Please use [conventional commits](https://www.conventionalcommits.org) with the following scopes:

- `monorepo`
- `layer-selector`
- `sherlock`
- `helpers`

### `npm run build`

Using `lerna exec` runs babel on each package as well as copyfiles for copying non-babel files. Output is put in the `dist` directory within each package.

### `npm start`

Starts a watch process that automatically runs new builds when any file changes within a package folder.

### `npm test`

Runs tests via jest.

### `npm run storybook`

Starts the storybook server.

### `npm run link` && `npm run unlink`

Runs npm (un)link for all packages making them npm-link-able in other projects on your local machine.

If you experience invalid use of hook errors in your application after npm-linking, you may try running `npm link ../myapp/node_modules/react` (as suggested in the [react docs](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)) from the root of this project to make sure that you are using the same react instance in both projects.

### `npm run release`

Publishes packages that have changed since the last release to npm. This automatically increments the version numbers and updates `CHANGELOG.md` based on conventional commits.
