# Copilot Instructions

## Project Overview

This is UGRC's "kitchen-sink" monorepo containing shared React components, utilities, and configuration packages published under the `@ugrc/` npm scope. The main package is `@ugrc/utah-design-system`, which implements [Utah Design System](https://designsystem.utah.gov) components with ArcGIS mapping integration.

## Architecture

- **Monorepo structure**: Uses npm workspaces (`packages/*`). All packages share root-level dev dependencies, build config, and Storybook.
- **No build for utah-design-system**: Components ship as TypeScript source (`"main": "./src/index.ts"`). Consumers compile them.
- **Package dependencies**: `utah-design-system` and `mouse-trap` depend on `utilities`. Other packages are standalone.

## Key Technologies

- **React Aria Components**: All UI components wrap [react-aria-components](https://react-spectrum.adobe.com/react-aria/components.html) for accessibility
- **Tailwind Variants**: Use `tv()` from `tailwind-variants` for component styling (see [Button.tsx](packages/utah-design-system/src/components/Button.tsx))
- **ArcGIS JS SDK**: Spatial components use `@arcgis/core` for maps, layers, and geocoding
- **Firebase**: Auth and analytics via context providers in `src/contexts/`

## Component Patterns

When creating new components in `utah-design-system`:

1. **Wrap React Aria Components**: Extend RAC base components, use `composeRenderProps` for className merging
2. **Use focusRing utility**: Import from `./utils.ts` and extend with `tv({ extend: focusRing, ... })`
3. **Size variants**: Use `ComponentSize` type from `../types.ts` (`extraSmall | small | medium | large | extraLarge`)
4. **Export from index**: Add export to `src/index.ts`
5. **Create Storybook file**: Co-locate as `ComponentName.stories.tsx` with `tags: ['autodocs']`

```tsx
// Pattern example - see Button.tsx for full implementation
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

const styles = tv({
  extend: focusRing,
  base: '...',
  variants: { size: { small: '...', medium: '...' } },
  defaultVariants: { size: 'medium' },
});
```

## Commands

```bash
npm run storybook     # Dev server + Firebase emulator for auth stories
npm run build         # Build all packages
npm run check         # TypeScript + Prettier check
npm run lint:fix      # ESLint with auto-fix
npm test              # Vitest (uses happy-dom)
```

## Commit Conventions

Use the angular flavor of [conventional commits](https://www.conventionalcommits.org) with scopes:

- Package scopes: `design-system`, `utilities`, `eslint-config`, `tailwind`, `tsconfigs`, `mouse-trap`
- Component scopes (lowercase): `button`, `geocode`, `sherlock`, `layer-selector`, `hooks`
- General UDS changes: `uds`

Example: `feat(geocode): add milepost support`

## Testing

- Tests use Vitest with `happy-dom` environment
- Co-locate test files as `ComponentName.test.tsx`
- Use `@testing-library/react` for component tests
- Stories requiring Firebase auth use the local emulator (`data/firebase/`)

## Tailwind Configuration

- Uses `@ugrc/tailwind-preset` as base preset with Utah Design System colors (primary, secondary, accent)
- Requires `tailwindcss-react-aria-components` plugin for RAC styling
- Pinned versions: `tailwind-merge@2.6.0`, `tailwind-variants@0.3.0` (Tailwind v3 compatibility)
