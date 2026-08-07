import { execFileSync } from 'node:child_process';
import process from 'node:process';

const controlledDependencies = [
  '@arcgis/core',
  '@arcgis/map-components',
  '@esri/calcite-components',
  'react',
  'react-dom',
];

const dependencyTree = JSON.parse(
  execFileSync(
    process.env.SHELL ?? 'sh',
    ['-lc', 'pnpm list --recursive --json --depth Infinity'],
    { encoding: 'utf8', maxBuffer: 100 * 1024 * 1024 },
  ),
);

const versions = new Map(
  controlledDependencies.map((dependencyName) => [dependencyName, new Set()]),
);

function collectVersions(value) {
  if (!value || typeof value !== 'object') {
    return;
  }

  if (
    typeof value.from === 'string' &&
    versions.has(value.from) &&
    value.version &&
    !value.version.startsWith('link:')
  ) {
    versions.get(value.from).add(value.version);
  }

  for (const child of Object.values(value)) {
    collectVersions(child);
  }
}

collectVersions(dependencyTree);

let hasMultipleVersions = false;

for (const [dependencyName, dependencyVersions] of versions) {
  const resolvedVersions = [...dependencyVersions].sort();
  process.stdout.write(
    `${dependencyName}: ${resolvedVersions.join(', ') || 'not installed'}\n`,
  );

  if (resolvedVersions.length > 1) {
    hasMultipleVersions = true;
  }
}

if (hasMultipleVersions) {
  process.stderr.write(
    'Controlled runtime dependencies must resolve to one version each.\n',
  );
  process.exitCode = 1;
}
