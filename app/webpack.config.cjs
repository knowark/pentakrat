const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'

  const config = {
    mode: argv.mode,
    entry: {
      app: './src/main.js'
    },
    output: {
      publicPath: '/',
      filename: '[name].[contenthash].js',
      path: path.join(__dirname, '/dist')
    },
    optimization: {
      runtimeChunk: 'single',
      moduleIds: 'deterministic'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.EnvironmentPlugin({
        PRODUCTION: !devMode,
        ARK_DESIGN: 'ark',
        FACTORY: 'blockchain',
        VERSION: require('./package.json').version,
        MISSION_ADDRESS: "0xB5a1f78a494B312efD7c74A47D7d0FE0b64b9572",
      }),
      new CopyPlugin({
        patterns: ['src/.htaccess']
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        title: 'Dashtempos',
        favicon: 'src/favicon.svg',
        template: 'src/index.html'
      })
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['./node_modules']
                }
              }
            }
          ]
        },
        {
          test: /\.gql/i,
          type: 'asset/source'
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/resource'
        },
        {
          test: /\.svg/,
          type: 'asset/inline'
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[ext]'
          }
        }
      ]
    },
    resolve: {
      alias: {
        base: 'componark/src/base/',
        components: 'componark/src/components/',
        application: path.resolve(__dirname, './src/application/'),
        core: path.resolve(__dirname, './src/integration/core/'),
        factories: path.resolve(__dirname, './src/integration/factories/'),
        integration: path.resolve(__dirname, './src/integration/'),
        presentation: path.resolve(__dirname, './src/presentation/'),
        screens: path.resolve(
          __dirname,
          './src/presentation/platform/web/screens/'
        ),
        theme: path.resolve(
          __dirname,
          './src/presentation/platform/web/theme/'
        )
      }
    }
  }

  if (devMode) {
    config.devtool = 'source-map'
    config.devServer = {
      static: './dist',
      historyApiFallback: true,
      port: 8082
    }
  }

  return config
}
