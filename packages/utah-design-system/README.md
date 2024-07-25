# UGRC Design System

This is UGRC's [React Aria](https://react-spectrum.adobe.com/react-aria/) plus [Tailwind CSS](https://tailwindcss.com/) implementation of the [Utah Design System](https://designsystem.utah.gov/).

This design system expects Tailwind CSS primary, secondary, and accent colors ranging from 50-950. The UGRC default presets can be used for this from [@ugrc/tailwind-preset](https://www.npmjs.com/package/@ugrc/tailwind-preset).

The Header component requires a custom font for the SVG text.

## Remote

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Source+Sans+3&display=swap"
  rel="stylesheet"
/>
```

## Local

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
