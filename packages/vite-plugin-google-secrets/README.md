# @ugrc/vite-plugin-google-secrets

A Vite plugin that loads configured values from Google Cloud Secret Manager into `process.env` during Vite config.

```ts
import googleSecrets from '@ugrc/vite-plugin-google-secrets';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    googleSecrets({
      projectId: 'my-google-cloud-project',
      secrets: {
        VITE_API_KEY: 'VITE_API_KEY',
      },
    }),
  ],
});
```

The `secrets` option maps environment variable names to Secret Manager secret IDs. Outside Vitest, every configured secret is fetched each time the plugin runs, and the result overwrites any existing environment value. Empty payloads set an empty environment value, while missing payload data is an error. This also applies to preview and production builds; Secret Manager access failures fail the build.

The plugin automatically skips Secret Manager access when Vitest sets `process.env.VITEST`, including when running tests with a custom mode. No conditional plugin configuration or Google credentials are needed for unit tests. Existing environment values are left unchanged during tests; provide any values your tests need through test fixtures or mocks. A normal Vite build with `--mode test` still fetches secrets when it is not running under Vitest.

| Option      | Type                                                  | Default       | Description                                                                                                                 |
| ----------- | ----------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `secrets`   | `Record<string, string>`                              | Required      | Map of environment variable name to Secret Manager secret ID.                                                               |
| `projectId` | `string \| ((env: ConfigEnv) => string \| undefined)` | Auto-detected | Project that holds the secrets. Resolution order is the option, `GOOGLE_CLOUD_PROJECT`, then Google auth project detection. |
| `version`   | `string`                                              | `'latest'`    | Secret version to read.                                                                                                     |

The plugin requires Google application default credentials or an active `gcloud` project when `projectId` and `GOOGLE_CLOUD_PROJECT` are not set.

Requires Node.js 22 or newer.
