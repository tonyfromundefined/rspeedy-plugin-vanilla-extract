import type { RsbuildPlugin } from "@rsbuild/core";
import { VanillaExtractPlugin as VanillaExtractWebpackPlugin } from "@vanilla-extract/webpack-plugin";
import { VanillaExtractRspeedyCompatPlugin } from "./VanillaExtractRspeedyCompatPlugin";

type VanillaExtractWebpackPluginOptions =
  typeof VanillaExtractWebpackPlugin extends new (
    options: infer O,
  ) => unknown
    ? O
    : never;

/**
 * Options forwarded to `@vanilla-extract/webpack-plugin`.
 */
export type PluginVanillaExtractOptions = VanillaExtractWebpackPluginOptions;

/**
 * Creates an Rsbuild plugin that enables vanilla-extract and applies
 * Rspeedy compatibility adjustments.
 *
 * @param options Configuration for the underlying vanilla-extract webpack plugin.
 * @returns Rsbuild plugin definition for vanilla-extract integration.
 */
export function pluginVanillaExtract(
  options: PluginVanillaExtractOptions,
): RsbuildPlugin {
  return {
    name: "rspeedy-plugin-vanilla-extract",
    setup(api) {
      api.modifyRspackConfig((config) => {
        config.plugins.push(new VanillaExtractWebpackPlugin(options));
        config.plugins.push(new VanillaExtractRspeedyCompatPlugin());
      });
    },
  };
}
