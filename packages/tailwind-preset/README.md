# UGRC TailwindCSS Preset

This preset defines colors and font families used in UGRC products and required by the Utah Design System. These primary colors and fonts are used through out the [@ugrc/utah-design-system](https://www.npmjs.com/package/@ugrc/utah-design-system) components and atlas layout.

## Usage

`npm install --save-dev @ugrc/tailwind-preset`

```js
// tailwind.config.js
import ugrcPreset from '@ugrc/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [ugrcPreset],
};
```

## Colors

This preset extends the default tailwindcss color pallet with `primary`, `secondary`, and `accent` colors ranging from 50-950.

The primary colors are generated from the deep purple in our logo `#4d2a54` and is `primary-900`.

The secondary colors are generated from the deep blue in our logo `#33505d` and is `secondary-800`.

The accent colors are generated from the light yellow in our logo `#eaca00` and is `accent-500`.

The warning colors default to the standard tailwind rose color pallette and are used for required inputs, warning, and error components.
