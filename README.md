# Kitchen Sink

[![Release Events](https://github.com/agrc/kitchen-sink/actions/workflows/release.yml/badge.svg)](https://github.com/agrc/kitchen-sink/actions/workflows/release.yml)

[![utah-design-system](https://img.shields.io/npm/v/@ugrc/utah-design-system?label=utah-design-system)](https://www.npmjs.com/package/@ugrc/utah-design-system)
[![mouse-trap](https://img.shields.io/npm/v/@ugrc/mouse-trap?label=mouse-trap)](https://www.npmjs.com/package/@ugrc/mouse-trap)
[![utilities](https://img.shields.io/npm/v/@ugrc/utilities?label=utilities)](https://www.npmjs.com/package/@ugrc/utilities)
[![esri-theme-toggle](https://img.shields.io/npm/v/@ugrc/esri-theme-toggle?label=esri-theme-toggle)](https://www.npmjs.com/package/@ugrc/esri-theme-toggle)
[![eslint-config](https://img.shields.io/npm/v/@ugrc/eslint-config?label=eslint-config)](https://www.npmjs.com/package/@ugrc/eslint-config)
[![tailwind-preset](https://img.shields.io/npm/v/@ugrc/tailwind-preset?label=tailwind-preset)](https://www.npmjs.com/package/@ugrc/tailwind-preset)
[![tsconfigs](https://img.shields.io/npm/v/@ugrc/tsconfigs?label=tsconfigs)](https://www.npmjs.com/package/@ugrc/tsconfigs)

A monorepo containing UGRC's reusable React components, utilities, and configuration packages.

## Preview

The [storybook files](https://ut-dts-agrc-kitchen-sink-prod.web.app/) are published to the web to view and learn about the components.

## Packages

This monorepo contains the following packages:

### [@ugrc/utah-design-system](./packages/utah-design-system)

A collection of React components implementing the [Utah Design System](https://designsystem.utah.gov). Includes spatial components for maps, geocoding, and location services built with React Aria and ArcGIS.

```bash
pnpm add @ugrc/utah-design-system
```

### [@ugrc/mouse-trap](./packages/mouse-trap)

A React component that displays cursor coordinates while hovering over an ArcGIS map. Supports multiple coordinate systems and projections.

```bash
pnpm add @ugrc/mouse-trap
```

### [@ugrc/utilities](./packages/utilities)

Shared utility functions and React hooks for UGRC projects, including helpers for working with ArcGIS maps and spatial data.

```bash
pnpm add @ugrc/utilities
```

### [@ugrc/esri-theme-toggle](./packages/esri-theme-toggle)

Automatically switches between Esri CSS themes based on the browser's preferred color scheme (light/dark mode).

```bash
pnpm add @ugrc/esri-theme-toggle
```

### [@ugrc/eslint-config](./packages/eslint-config)

Shared ESLint configurations for UGRC projects with support for React, TypeScript, and Storybook.

```bash
pnpm add -D @ugrc/eslint-config
```

### [@ugrc/tailwind-preset](./packages/tailwind-preset)

The default Tailwind CSS preset for UGRC projects with support for React Aria Components.

```bash
pnpm add -D @ugrc/tailwind-preset
```

### [@ugrc/tsconfigs](./packages/tsconfigs)

Shared TypeScript configurations for UGRC projects, including browser and Vite-specific configurations.

```bash
pnpm add -D @ugrc/tsconfigs
```

## Package Dependencies

Some packages in this monorepo depend on each other:

```mermaid
graph TD
    utilities[utilities]
    utah-design-system[utah-design-system]
    mouse-trap[mouse-trap]

    utilities --> utah-design-system
    utilities --> mouse-trap

    style utilities fill:#e1f5ff
    style utah-design-system fill:#fff4e1
    style mouse-trap fill:#fff4e1
```

- **`@ugrc/utah-design-system`** depends on **`@ugrc/utilities`** for shared utility functions and React hooks
- **`@ugrc/mouse-trap`** depends on **`@ugrc/utilities`** for coordinate projection utilities

The remaining packages (`eslint-config`, `esri-theme-toggle`, `tailwind-preset`, `tsconfigs`) are standalone and have no internal dependencies.

## Development

1. Build the packages
   1. `pnpm build`
2. View the stories
   1. `pnpm storybook`

### Conventional Commits

Please use [conventional commits](https://www.conventionalcommits.org) with the following scopes:

- `monorepo`
- `design-system`
- `eslint-config`
- `layer-selector`
- `mouse-trap`
- `tailwind`
- `tsconfigs`
- `utilities`

Within the utah design system use the lower snake case component name

- `button`
- `tag-group`
- `hooks`

or if general package updates use

- `uds`

### Local Linking

To test these packages in other local projects use the `pnpm link` command. For example:

```bash
cd /my-app
pnpm link ../kitchen-sink/packages/utah-design-system
```

Use `@ugrc/utilities` by itself when you only need the shared helpers. Link both packages when you need unpublished `utah-design-system` changes, because it depends on `@ugrc/utilities`.

To remove the links later:

```bash
cd /my-app
pnpm unlink @ugrc/utah-design-system
pnpm unlink @ugrc/utilities
pnpm install
```
