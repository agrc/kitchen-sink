# @ugrc/utilities

[![NPM version](https://badgen.net/npm/v/@ugrc/utilities)](https://www.npmjs.com/package/@ugrc/utilities)

These are shared utilities for various [UGRC React Components](https://github.com/agrc/kitchen-sink).

Install with [pnpm](https://pnpm.io/)

```bash
pnpm add @ugrc/utilities
```

Import utilities from their module paths:

```ts
import { geocode, search } from '@ugrc/utilities/api';
import { toQueryString } from '@ugrc/utilities/url';
```

Import hooks from their individual files:

```tsx
import useDefaultExtent from '@ugrc/utilities/hooks/useDefaultExtent';
import useMapReady from '@ugrc/utilities/hooks/useMapReady';
```
