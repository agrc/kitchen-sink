# Kitchen Sink

## Development

### Conventional Commits

Please use [conventional commits](https://www.conventionalcommits.org) with the following scopes:

- `monorepo`
- `layer-selector`
- `sherlock`
- `utilities`
- `dart-board`
- `mouse-trap`
- `default-extent`

### NPM Linking

To test these packages in other local projects, first run `npm link -workspaces` from the root of this project. Then run `npm link @ugrc/dart-board @ugrc/sherlock` from the root of your test project. Please note that you need to run `npm link` for all of the packages at the same time or previous ones will be removed.
