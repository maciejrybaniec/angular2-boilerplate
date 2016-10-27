var webpack = require('webpack');
var path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin');
86

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        app: [
            'webpack-dev-server/client?http://0.0.0.0:3000',
            'webpack/hot/only-dev-server',
            path.join(__dirname, 'app', 'src', 'app')
        ],
        vendor: path.join(__dirname, 'app', 'src', 'vendor')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'http://localhost:3000/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },
    module: {
        rules: [
            {
              test: /\.ts$/,
              loaders: ['awesome-typescript-loader'],
              exclude: /node_modules/
            },
            {
              test: /\.ts$/,
              enforce: 'pre',
              loader: 'tslint'
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(__dirname, 'app', 'src')
        ),
        new htmlWebpackPlugin({
            template: './app/src/public/index.html',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                  configuration: {
                    rules: {
                        quotemark: [true, "double"]
                    }
                  },
                  emitErrors: false,
                  failOnHint: false
                },
            }
        }),
        new DashboardPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
