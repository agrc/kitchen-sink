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

A component for managing map basemaps and overlay layers.

This is a component that allows the user to quickly toggle visibility of layers or base maps in a web map. It has `baseLayers`, `operationalLayers`, and `referenceLayers` properties that allow you to add layers to the corresponding properties of your map's [Basemap](https://developers.arcgis.com/javascript/latest/api-reference/esri-Basemap.html). It also supports adding entire base maps via the `basemaps` property. When this property is used, the individual parts of the base map (`baseLayers` and `referenceLayers`) are mixed into the base map that Layer Selector manages.

Layers defined in `baseLayers` or `basemaps` are represented as radio buttons in a single group. You are required to pass at least one value to at least one of these properties. The first value in `basemaps` is selected by default. If no value is passed to `basemaps`, then the first value in `baseLayers` is selected by default. The `operationalLayers` and `referenceLayers` properties are represented as checkboxes.

**Important:** When using `LayerSelector`, you must set a `basemap` prop on the related `arcgis-map` element (e.g., `basemap="streets"`). This is required because the map component needs an initial basemap to properly initialize the view before `LayerSelector` can take over basemap management. Without it, the initial extent related properties (center, zoom, scale, etc.) will not be honored.

This component will not work with base `@arcgis/core/views/MapView` API since it is built on top of the `arcgis-expand` component.

### Example

```tsx
<arcgis-map basemap="streets">
  <LayerSelector basemaps={['Lite', 'Imagery']} />
</arcgis-map>
```

#### Migration from previous API (breaking change)

In earlier versions, `LayerSelector` accepted a single `options` prop (e.g., `<LayerSelector options={{ basemaps: ['Lite', 'Imagery'] }} />`). This has been replaced with flat props in order to be more idiomatic in React and easier to type and document.

**Before (deprecated API):**

```tsx
useEffect(() => {
  // ...
  setSelectorOptions({
    options: {
      basemaps: ['Lite', 'Imagery'],
      operationalLayers: ['Parcels', 'Roads'],
    },
  });
}, []);

<arcgis-map basemap="streets">
  {selectorOptions && <LayerSelector {...selectorOptions} />}
</arcgis-map>;
```

**After (current API):**

```tsx
<arcgis-map basemap="streets">
  <LayerSelector
    // no need to pass a reference to the map since it's handled internally
    basemaps={['Lite', 'Imagery']}
    operationalLayers={['Parcels', 'Roads']}
  />
</arcgis-map>
```

When upgrading, move properties that were previously nested under `options` (such as `basemaps`, `operationalLayers`, `referenceLayers`, and `baseLayers`) to top-level props on `LayerSelector`.
