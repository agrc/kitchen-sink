# Kitchen Sink

## Preview

The [storybook files](https://ut-dts-agrc-kitchen-sink-prod.web.app/) are published to the web to view and learn about the components.

## Development

1. Build the packages
   1. `npm run build`
2. View the stories
   1. `npm run storybook`

### Conventional Commits

Please use [conventional commits](https://www.conventionalcommits.org) with the following scopes:

- `monorepo`
- `dart-board`
- `design-system`
- `eslint-config`
- `header`
- `layer-selector`
- `mouse-trap`
- `popover`
- `tailwind`
- `tsconfigs`
- `utilities`

Within the utah design system use the lower snake case component name

- `button`
- `tag-group`
- `hooks`

or if general package updates use

- `uds`

### NPM Linking

To test these packages in other local projects, first run `npm link -workspaces` from the root of this project. Then run `npm link @ugrc/dart-board @ugrc/utah-design-system` from the root of your test project. Please note that you need to run `npm link` for all of the packages at the same time or previous ones will be removed.

Then run `npm run build:watch --workspace packages/dart-board` to automatically build the package any time a file is saved.
