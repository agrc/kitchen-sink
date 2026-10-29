import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import type { ConfigEnv, Plugin } from 'vite';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import googleSecrets from './index';

vi.mock('@google-cloud/secret-manager', () => ({
  SecretManagerServiceClient: vi.fn(),
}));

const configEnv: ConfigEnv = {
  command: 'serve',
  mode: 'development',
  isSsrBuild: false,
  isPreview: false,
};

const runConfig = (plugin: Plugin, env: ConfigEnv = configEnv) => {
  const hook = plugin.config;

  if (typeof hook !== 'function') {
    throw new Error('Expected the plugin config hook to be a function.');
  }

  return Reflect.apply(hook, undefined, [{}, env]);
};

describe('googleSecrets', () => {
  const getProjectId = vi.fn();
  const accessSecretVersion = vi.fn();
  const close = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    delete process.env.VITE_API_KEY;
    delete process.env.VITE_SECOND_API_KEY;
    delete process.env.VITE_PREVIEW_API_KEY;
    delete process.env.VITE_TEST_API_KEY;
    delete process.env.GOOGLE_CLOUD_PROJECT;
    vi.mocked(SecretManagerServiceClient).mockImplementation(function () {
      return {
        getProjectId,
        accessSecretVersion,
        close,
      } as unknown as SecretManagerServiceClient;
    });
    getProjectId.mockResolvedValue('detected-project');
    accessSecretVersion.mockResolvedValue([
      { payload: { data: Buffer.from('secret-value') } },
    ]);
  });

  it('fetches all configured secrets and overwrites existing environment values', async () => {
    vi.stubEnv('VITE_API_KEY', 'existing-value');
    const plugin = googleSecrets({
      projectId: 'configured-project',
      secrets: {
        VITE_API_KEY: 'api-key',
        VITE_SECOND_API_KEY: 'second-api-key',
      },
      version: '5',
    });

    await runConfig(plugin);

    expect(accessSecretVersion).toHaveBeenCalledTimes(2);
    expect(accessSecretVersion).toHaveBeenNthCalledWith(1, {
      name: 'projects/configured-project/secrets/api-key/versions/5',
    });
    expect(accessSecretVersion).toHaveBeenNthCalledWith(2, {
      name: 'projects/configured-project/secrets/second-api-key/versions/5',
    });
    expect(process.env.VITE_API_KEY).toBe('secret-value');
    expect(process.env.VITE_SECOND_API_KEY).toBe('secret-value');
    expect(close).toHaveBeenCalledOnce();
  });

  it('uses the Google project environment variable before auth detection', async () => {
    vi.stubEnv('GOOGLE_CLOUD_PROJECT', 'environment-project');
    const plugin = googleSecrets({ secrets: { VITE_API_KEY: 'api-key' } });

    await runConfig(plugin);

    expect(getProjectId).not.toHaveBeenCalled();
    expect(accessSecretVersion).toHaveBeenCalledWith({
      name: 'projects/environment-project/secrets/api-key/versions/latest',
    });
  });

  it('falls back to Google auth project detection', async () => {
    const plugin = googleSecrets({ secrets: { VITE_API_KEY: 'api-key' } });

    await runConfig(plugin);

    expect(getProjectId).toHaveBeenCalledOnce();
    expect(accessSecretVersion).toHaveBeenCalledWith({
      name: 'projects/detected-project/secrets/api-key/versions/latest',
    });
  });

  it('supports a project ID callback', async () => {
    const projectId = vi.fn().mockReturnValue('callback-project');
    const plugin = googleSecrets({
      projectId,
      secrets: { VITE_API_KEY: 'api-key' },
    });

    await runConfig(plugin);

    expect(projectId).toHaveBeenCalledWith(configEnv);
    expect(accessSecretVersion).toHaveBeenCalledWith({
      name: 'projects/callback-project/secrets/api-key/versions/latest',
    });
  });

  it('fetches secrets in test and preview environments even when VITEST is set', async () => {
    vi.stubEnv('VITEST', 'true');
    const plugin = googleSecrets({
      projectId: 'configured-project',
      secrets: {
        VITE_TEST_API_KEY: 'test-api-key',
        VITE_PREVIEW_API_KEY: 'preview-api-key',
      },
    });

    await runConfig(plugin, { ...configEnv, mode: 'test' });
    await runConfig(plugin, { ...configEnv, isPreview: true });

    expect(accessSecretVersion).toHaveBeenCalledTimes(4);
    expect(accessSecretVersion).toHaveBeenNthCalledWith(1, {
      name: 'projects/configured-project/secrets/test-api-key/versions/latest',
    });
    expect(accessSecretVersion).toHaveBeenNthCalledWith(3, {
      name: 'projects/configured-project/secrets/test-api-key/versions/latest',
    });
    expect(process.env.VITE_TEST_API_KEY).toBe('secret-value');
    expect(process.env.VITE_PREVIEW_API_KEY).toBe('secret-value');
  });

  it('fails production builds when Secret Manager cannot access a secret', async () => {
    accessSecretVersion.mockRejectedValue(new Error('permission denied'));
    const plugin = googleSecrets({
      projectId: 'configured-project',
      secrets: { VITE_API_KEY: 'api-key' },
    });

    await expect(
      runConfig(plugin, { ...configEnv, command: 'build', mode: 'production' }),
    ).rejects.toThrow(
      'Unable to access secret "api-key" in project "configured-project"',
    );

    expect(close).toHaveBeenCalledOnce();
  });

  it('does not swallow errors closing the client', async () => {
    close.mockRejectedValue(new Error('close failed'));
    const plugin = googleSecrets({
      projectId: 'configured-project',
      secrets: { VITE_API_KEY: 'api-key' },
    });

    await expect(runConfig(plugin)).rejects.toThrow('close failed');
  });
});
