# @ugrc/tsconfigs

Shareable tsconfigs for UGRC projects based on [`@total-typescripts/tsconfig`](https://github.com/total-typescript/tsconfig).

## Usage

### Vite App

```json
// tsconfig.json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.browser.json"
    },
    {
      "path": "./tsconfig.vite-config.json"
    }
  ]
}

// tsconfig.browser.json
{
  "extends": "@ugrc/tsconfigs/browser",
  "include": ["src"]
}

// tsconfig.vite-config.json
{
  "extends": "@ugrc/tsconfigs/vite-config",
  "include": ["vite.config.ts"]
}

// functions/tsconfig.json - (Firebase Functions)
{
  "extends": "@total-typescript/tsconfig/tsc/no-dom/app",
  "compilerOptions": {
    "outDir": "lib"
  },
  "compileOnSave": true,
  "include": ["src", "../shared"]
}
```
