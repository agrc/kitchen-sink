# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/agrc/kitchen-sink/compare/utilities-v3.0.0...utilities-v3.0.1) (2025-03-04)


### Bug Fixes

* **useViewLoading:** replace deprecated watch method ([2a058f7](https://github.com/agrc/kitchen-sink/commit/2a058f7f792f6591fed3b3e69ac07e42f9bf1c1b))

## [3.0.0](https://github.com/agrc/kitchen-sink/compare/utilities-v2.4.3...utilities-v3.0.0) (2025-01-22)


### ⚠ BREAKING CHANGES

* **useWebMap:** accepts a div instead of a ref of a div
* **useViewPointZooming:** accepts a MapView instead of a ref of a MapView

### Features

* **useViewPointZooming:** accepts a MapView instead of a ref of a MapView ([ff77bc6](https://github.com/agrc/kitchen-sink/commit/ff77bc62ff175c63d9c2a7a8af8b91ad99142902))
* **useWebMap:** accepts a div instead of a ref of a div ([b2c10c7](https://github.com/agrc/kitchen-sink/commit/b2c10c7a48243ecb45903413ce7175d299c32b18))

## [2.4.3](https://github.com/agrc/kitchen-sink/compare/utilities-v2.4.2...utilities-v2.4.3) (2024-12-13)


### Bug Fixes

* **utilities:** fix typescript check errors after applying new tsconfig ([f943fab](https://github.com/agrc/kitchen-sink/commit/f943fab6a5c6d35d6dfa9728e78998e1c89236cd))

## [2.4.2](https://github.com/agrc/kitchen-sink/compare/utilities-v2.4.1...utilities-v2.4.2) (2024-12-05)


### Bug Fixes

* **api:** correct field name merging ([6ef5ea5](https://github.com/agrc/kitchen-sink/commit/6ef5ea5d8648d83531ab49caa22f305efb657a1b))

## [2.4.1](https://github.com/agrc/kitchen-sink/compare/utilities-v2.4.0...utilities-v2.4.1) (2024-11-21)


### Bug Fixes

* **hooks:** debounce useViewLoading ([41f4cc3](https://github.com/agrc/kitchen-sink/commit/41f4cc36adef5ebf05a00012054fb3839dafde90))

## [2.4.0](https://github.com/agrc/kitchen-sink/compare/utilities-v2.3.1...utilities-v2.4.0) (2024-11-19)


### Features

* **hooks:** create useDefaultExtent hook ([283dc48](https://github.com/agrc/kitchen-sink/commit/283dc4893a09ef3e72d0c848cf3c0a92df8246e1))


### Bug Fixes

* **hooks:** correct hook logic on useViewUiPosition ([c519108](https://github.com/agrc/kitchen-sink/commit/c51910838b35f15fde11dc1fde7498048b7cdfe8))
* **hooks:** correct position type on useViewUiPosition ([d75aed8](https://github.com/agrc/kitchen-sink/commit/d75aed8eb0d060b2d85a274238f2b226ece7f47d))

## [2.3.1](https://github.com/agrc/kitchen-sink/compare/utilities-v2.3.0...utilities-v2.3.1) (2024-11-14)


### Bug Fixes

* **useGraphicManager:** update types ([13366e9](https://github.com/agrc/kitchen-sink/commit/13366e9316693b46f15f268860ba85e564ef7121))

## [2.3.0](https://github.com/agrc/kitchen-sink/compare/utilities-v2.2.7...utilities-v2.3.0) (2024-11-13)


### Features

* **sherlock:** convert to typescript ([12fe17d](https://github.com/agrc/kitchen-sink/commit/12fe17def4fa3c3458de5f9866f16715d90d7bbd))
* **utilities:** convert JS modules to TS ([e8703e5](https://github.com/agrc/kitchen-sink/commit/e8703e583f6b707ac9579b03432ef50a5e21b3d0)), closes [#367](https://github.com/agrc/kitchen-sink/issues/367)

## [2.2.7](https://github.com/agrc/kitchen-sink/compare/utilities-v2.2.6...utilities-v2.2.7) (2024-10-29)


### Bug Fixes

* **hooks:** add extensions to [@arcgis](https://github.com/arcgis) imports ([94e2e13](https://github.com/agrc/kitchen-sink/commit/94e2e13a2a2530de5bd9b6ce94e629162cdbe94e))

## [2.2.6](https://github.com/agrc/kitchen-sink/compare/utilities-v2.2.5...utilities-v2.2.6) (2024-09-30)


### Bug Fixes

* **url:** remove undefined values from the query string ([b96699d](https://github.com/agrc/kitchen-sink/commit/b96699d1dfdd4e63816f32850efd28d9e3a34cb1))

## [2.2.5](https://github.com/agrc/kitchen-sink/compare/utilities-v2.2.4...utilities-v2.2.5) (2024-08-09)


### Bug Fixes

* **utilities:** use new value for attribute style for web api search requests ([3961079](https://github.com/agrc/kitchen-sink/commit/3961079f5b9af9d56c7f61a96fb59afc89e927f9))

## [2.2.4](https://github.com/agrc/kitchen-sink/compare/utilities-v2.2.3...utilities-v2.2.4) (2024-07-31)


### Bug Fixes

* **utilities:** useGraphicsManager no longer accepts a ref ([c26546a](https://github.com/agrc/kitchen-sink/commit/c26546a7f9323f42e43ac385db1cbe7625d11ec8)), closes [#166](https://github.com/agrc/kitchen-sink/issues/166)

## [2.2.3](https://github.com/agrc/kitchen-sink/compare/utilities-v2.2.2...utilities-v2.2.3) (2024-07-25)


### Bug Fixes

* **utilities:** for historical changes ([69c9b0b](https://github.com/agrc/kitchen-sink/commit/69c9b0ba772a5b68d9e6cc1fdd6c25fc628cd512))

## [2.2.2](https://github.com/agrc/kitchen-sink/compare/utilities-v2.2.1...utilities-v2.2.2) (2024-05-13)


### Bug Fixes

* **monorepo:** fresh npm install ([7f7599b](https://github.com/agrc/kitchen-sink/commit/7f7599b6743b4e1c13d9617acafbb15d4b00f2c3))

## [2.2.1](https://github.com/agrc/kitchen-sink/compare/utilities-v2.2.0...utilities-v2.2.1) (2022-08-23)


### Bug Fixes

* **utilities:** sort imports ([f9bb166](https://github.com/agrc/kitchen-sink/commit/f9bb166b9e45a10d00131c4096337376d4c1f2ad))

## [2.2.0](https://github.com/agrc/kitchen-sink/compare/utilities-v2.1.3...utilities-v2.2.0) (2022-08-22)


### Features

* **utilities:** add useLocalStorage hook ([1aca06f](https://github.com/agrc/kitchen-sink/commit/1aca06f6183e04f094ae60ab2253a5e7bf1ce48f))

## [2.1.3](https://github.com/agrc/kitchen-sink/compare/utilities-v2.1.2...utilities-v2.1.3) (2022-07-21)


### Bug Fixes

* add files to correct publishing ([4499372](https://github.com/agrc/kitchen-sink/commit/4499372c102015acd59adc4d5342082a85548de4))

## [2.1.2](https://github.com/agrc/kitchen-sink/compare/utilities-v2.1.1...utilities-v2.1.2) (2022-07-21)


### Bug Fixes

* compile jsx to js for vite dev optimizations ([5af363d](https://github.com/agrc/kitchen-sink/commit/5af363d73630185a2a6b9ae1119ef0375d400e97))

## [2.1.1](https://github.com/agrc/kitchen-sink/compare/utilities-v2.1.0...utilities-v2.1.1) (2022-07-07)


### Bug Fixes

* **utilities:** remove console.logs ([462a204](https://github.com/agrc/kitchen-sink/commit/462a204c2d64a0a70b8d8eed015190d35ba86c6c))

## [2.1.0](https://github.com/agrc/kitchen-sink/compare/utilities-v2.0.0...utilities-v2.1.0) (2022-06-30)


### Features

* **utilities:** add interval hook ([0a35bcd](https://github.com/agrc/kitchen-sink/commit/0a35bcd2e303c818251aaab9b6fe601a05c4e8b6))
* **utilities:** add view loading hook ([af9ae0a](https://github.com/agrc/kitchen-sink/commit/af9ae0ad0ed01c54404c7f543f7114a713dd96fd))
* **utilities:** add view ui position hook ([78cb569](https://github.com/agrc/kitchen-sink/commit/78cb569c28af9e6b9cb149c8a7b2af80db888d4d))
* **utilities:** add web map hook ([4d9f45b](https://github.com/agrc/kitchen-sink/commit/4d9f45b981e45401fa4acda12dcc4d378ca33ad5))
* **utilities:** graphic management hook ([78e1d07](https://github.com/agrc/kitchen-sink/commit/78e1d079a679831db4a8231de1fd9f0d89417fd2))
* **utilities:** track open/closed state hook ([a155b03](https://github.com/agrc/kitchen-sink/commit/a155b0372d06c6adbda875c13a67997d9c70dfbd))
* **utilities:** zoom to a point hook ([1dcd822](https://github.com/agrc/kitchen-sink/commit/1dcd82238fb5ce5f5955891c25088972adeea91f))


### Bug Fixes

* **utilities:** improve importing and publishing ([fbd9464](https://github.com/agrc/kitchen-sink/commit/fbd9464bab5912a317b8a8d42268c0716aab2ce9))

## [2.0.0](https://github.com/agrc/kitchen-sink/compare/utilities-v1.3.1...utilities-v2.0.0) (2022-06-29)


### ⚠ BREAKING CHANGES

* **utilities:** update dependencies

### Miscellaneous Chores

* **utilities:** update dependencies ([eee7a26](https://github.com/agrc/kitchen-sink/commit/eee7a262f2e291877f5dca8c10da3d5cc8fcc062))

## [1.3.1](https://github.com/agrc/kitchen-sink/compare/@agrc/helpers@1.3.0...@agrc/helpers@1.3.1) (2021-01-20)

**Note:** Version bump only for package @agrc/helpers

# [1.3.0](https://github.com/agrc/kitchen-sink/compare/@agrc/helpers@1.2.2...@agrc/helpers@1.3.0) (2020-12-01)

### Features

- **helpers:** add mapview ready and toquerystring ([a616049](https://github.com/agrc/kitchen-sink/commit/a616049f1120ec4adc81d63a89bed04729d3edb1))

## [1.2.2](https://github.com/agrc/kitchen-sink/compare/@agrc/helpers@1.2.0...@agrc/helpers@1.2.2) (2020-11-05)

### Bug Fixes

- standardize package.json's and readme's ([2896c50](https://github.com/agrc/kitchen-sink/commit/2896c5074f397c43945d08d5d66435cc43a1f78a))

## [1.2.1](https://github.com/agrc/kitchen-sink/compare/@agrc/helpers@1.2.0...@agrc/helpers@1.2.1) (2020-11-05)

### Bug Fixes

- standardize package.json's and readme's ([2896c50](https://github.com/agrc/kitchen-sink/commit/2896c5074f397c43945d08d5d66435cc43a1f78a))

# [1.2.0](https://github.com/agrc/kitchen-sink/compare/@agrc/helpers@1.1.0...@agrc/helpers@1.2.0) (2020-09-30)

### Features

- **sherlock:** initial port from old repo ([e71acb9](https://github.com/agrc/kitchen-sink/commit/e71acb90edf04c6d3f303b50ae9a348440bdfca6))

# 1.1.0 (2020-01-23)

### Features

- **helpers:** inital framework setup for package ([9eda6ba](https://github.com/agrc/kitchen-sink/commit/9eda6ba829ad72b8ab299ff79bdedd0ad99a5227))
