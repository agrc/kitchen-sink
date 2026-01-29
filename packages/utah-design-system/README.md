# UGRC Design System

This is UGRC's [React Aria](https://react-spectrum.adobe.com/react-aria/) plus [Tailwind CSS](https://tailwindcss.com/) implementation of the [Utah Design System](https://designsystem.utah.gov/).

## Tailwind Colors

This design system expects Tailwind CSS primary, secondary, and accent colors ranging from 50-950. The UGRC default presets can be used for this from [@ugrc/tailwind-preset](https://www.npmjs.com/package/@ugrc/tailwind-preset).

## TypeScript Configuration

When using spatial components that integrate with ArcGIS and Calcite web components (such as `LayerSelector`), you need to include type references in your project's TypeScript configuration. Add the following to your `vite-env.d.ts` or a similar type declaration file:

```typescript
/// <reference types="@arcgis/map-components/types/react" />
/// <reference types="@esri/calcite-components/types/react" />
```

This ensures TypeScript recognizes the global types for ArcGIS and Calcite elements (e.g., `HTMLArcgisMapElement`, `HTMLCalciteCheckboxElement`) used by these components.

## Header

The Header component requires a custom font for the SVG text.

### Remote

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Source+Sans+3&display=swap"
  rel="stylesheet"
/>
```

### Local

```css
@font-face {
  font-family: 'SourceSansPro-Regular';
  src: url('/fonts/SourceSans3-Regular.otf.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'SourceSansPro-Black';
  src: url('/fonts/SourceSans3-Black.otf.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## Layer Selector

This is a component that allows the user to quickly toggle visibility of layers or base maps in a web map. It has `baseLayers`, `operationalLayers`, and `referenceLayers` options that allow you to add layers to the corresponding properties of your map's [Basemap](https://developers.arcgis.com/javascript/latest/api-reference/esri-Basemap.html). It also supports adding entire base maps via the `basemaps` property. When this property is used, the individual parts of the base map (`baseLayers` and `referenceLayers`) are mixed into the base map that Layer Selector manages.

Layers defined in `baseLayers` or `basemaps` are represented as a radio buttons in a single group. You are required to pass at least one value to at least one of these properties. The first value in `basemaps` is selected by default. If no value is passed to `basemaps`, then the first value in `baseLayers` is selected by default. The `operationalLayers` and `referenceLayers` properties are represented as checkboxes.
