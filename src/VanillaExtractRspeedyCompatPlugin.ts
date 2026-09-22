import type { Compiler, WebpackPluginInstance } from "webpack";

export class VanillaExtractRspeedyCompatPlugin
  implements WebpackPluginInstance
{
  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(
      "VanillaExtractTypeScript",
      (compilation) => {
        const original = compilation.createChildCompiler.bind(compilation);

        compilation.createChildCompiler = (name, outputOptions, plugins) => {
          const childCompiler = original(name, outputOptions, plugins);

          if (!name?.startsWith("vanilla-extract-compiler")) {
            return childCompiler;
          }

          childCompiler.options.module.rules ??= [];
          childCompiler.options.module.rules.unshift({
            test: /\.[cm]?[jt]sx?$/,
            use: [
              {
                loader: "builtin:swc-loader",
                options: {
                  jsc: {
                    parser: {
                      syntax: "typescript",
                      tsx: false,
                      decorators: true,
                    },
                  },
                },
              },
            ],
          });

          return childCompiler;
        };
      },
    );
  }
}
