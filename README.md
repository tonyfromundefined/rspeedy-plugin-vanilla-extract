# rspeedy-plugin-vanilla-extract

Use [vanilla-extract](https://vanilla-extract.style/) with Rspeedy through an
Rsbuild plugin. This wraps `@vanilla-extract/webpack-plugin` and adds an SWC
loader to vanilla-extract child compilers.

## Install

```sh
npm install rspeedy-plugin-vanilla-extract @rsbuild/core webpack
```

## Use

```ts
import { pluginVanillaExtract } from "rspeedy-plugin-vanilla-extract";

export default {
  plugins: [pluginVanillaExtract({})],
};
```

Pass vanilla-extract webpack plugin options to `pluginVanillaExtract` as needed.

## Release

Run `yarn changeset` with each user-facing change. A push to `main` opens or
updates a version pull request. After it is merged, GitHub Actions publishes
the version to npm using trusted publishing once it is configured on npm.
