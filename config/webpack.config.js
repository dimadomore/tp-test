const fs = require('fs');
const paths = require('./paths');
const webpack = require('webpack');
const resolve = require('resolve');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

const useTypeScript = fs.existsSync(paths.appTsConfig);

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvDevelopment ? 'cheap-module-source-map' : false,
    entry: paths.appIndexJs,
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      pathinfo: isEnvDevelopment,
      filename: 'static/js/tp-widget.js',
      futureEmitAssets: true,
      publicPath: paths.publicUrlOrPath,
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          sourceMap: false,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
        },
      },
      runtimeChunk: false,
    },
    resolve: {
      modules: ['node_modules'],
      extensions: paths.moduleFileExtensions
        .map((ext) => `.${ext}`)
        .filter((ext) => useTypeScript || !ext.includes('ts')),

      plugins: [PnpWebpackPlugin],
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: paths.appSrc,
        },
        {
          oneOf: [
            {
              test: /\.(ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [require.resolve('babel-preset-react-app/dependencies'), { helpers: true }],
                ],
                cacheDirectory: true,
                cacheCompression: false,
                sourceMaps: false,
                inputSourceMap: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
              },
            }
            : undefined,
        ),
      ),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      useTypeScript &&
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
          basedir: paths.appNodeModules,
        }),
        async: isEnvDevelopment,
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        // resolveModuleNameModule: process.versions.pnp ? `${__dirname}/pnpTs.js` : undefined,
        // resolveTypeReferenceDirectiveModule: process.verssions.pnp
        // ? `${__dirname}/pnpTs.js`
        // : undefined,
        tsconfig: paths.appTsConfig,
        reportFiles: ['**'],
        silent: true,
        formatter: isEnvProduction ? typescriptFormatter : undefined,
      }),
    ].filter(Boolean),
    performance: false,
  };
};
