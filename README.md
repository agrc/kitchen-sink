# Kitchen Sink

## Development

1. Build the packages
   1. `npm run build`
2. View the stories
   1. `npm run storybook`

### Conventional Commits

Please use [conventional commits](https://www.conventionalcommits.org) with the following scopes:

- `monorepo`
- `layer-selector`
- `sherlock`
- `utilities`
- `dart-board`
- `mouse-trap`
- `header`

### NPM Linking

To test these packages in other local projects, first run `npm link -workspaces` from the root of this project. Then run `npm link @ugrc/dart-board @ugrc/sherlock` from the root of your test project. Please note that you need to run `npm link` for all of the packages at the same time or previous ones will be removed.

Then run `npm run build:watch --workspace packages/dart-board` to automatically build the package any time a file is saved.
