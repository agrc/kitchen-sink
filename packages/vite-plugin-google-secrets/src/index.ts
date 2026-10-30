import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import type { ConfigEnv, Plugin } from 'vite';

export interface GoogleSecretsOptions {
  /** Map of environment variable name to Secret Manager secret ID. */
  secrets: Record<string, string>;
  /**
   * Google Cloud project that holds the secrets. Falls back to GOOGLE_CLOUD_PROJECT and then to
   * Google auth project detection (ADC credentials / active gcloud project).
   */
  projectId?: string | ((env: ConfigEnv) => string | undefined);
  /** Secret version to read. */
  version?: string;
}

export default function googleSecrets({
  secrets,
  projectId,
  version = 'latest',
}: GoogleSecretsOptions): Plugin {
  return {
    name: 'ugrc:google-secrets',
    enforce: 'pre',
    async config(_, env) {
      const entries = Object.entries(secrets);

      if (entries.length === 0) {
        return;
      }

      const client = new SecretManagerServiceClient();

      try {
        const configured =
          typeof projectId === 'function' ? projectId(env) : projectId;
        const [project, source] = configured
          ? [configured, 'plugin option']
          : process.env.GOOGLE_CLOUD_PROJECT
            ? [process.env.GOOGLE_CLOUD_PROJECT, 'GOOGLE_CLOUD_PROJECT']
            : [
                await client.getProjectId().catch(() => undefined),
                'Google auth detection',
              ];

        if (!project) {
          throw new Error(
            '[google-secrets] Unable to determine the Google Cloud project. Pass `projectId`, set ' +
              'GOOGLE_CLOUD_PROJECT, or run `gcloud config set project <id>`.',
          );
        }

        const values = await Promise.all(
          entries.map(async ([variable, secretId]) => {
            const name = `projects/${project}/secrets/${secretId}/versions/${version}`;
            const [secretVersion] = await client
              .accessSecretVersion({ name })
              .catch((error: unknown) => {
                throw new Error(
                  `[google-secrets] Unable to access secret "${secretId}" in project "${project}" (from ${source}).`,
                  { cause: error },
                );
              });
            const data = secretVersion.payload?.data;

            if (data === undefined || data === null) {
              throw new Error(
                `[google-secrets] Secret "${secretId}" in project "${project}" has no payload.`,
              );
            }

            const value = Buffer.from(data).toString('utf8');

            return [variable, value] as const;
          }),
        );

        for (const [variable, value] of values) {
          process.env[variable] = value;
        }
      } finally {
        await client.close();
      }
    },
  };
}
