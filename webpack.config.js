var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './app/assets/javascripts');
var outPath = path.join(__dirname, './app/assets/javascripts/build');

// plugins
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: sourcePath,
    entry: {
        main: './index.tsx',
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux'
        ]
    },
    output: {
        path: outPath,
        publicPath: '/',
        filename: 'app.js',
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // https://github.com/Microsoft/TypeScript/issues/11677
        mainFields: ['main']
    },
    module: {
        loaders: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                use: isProduction
                    ? 'awesome-typescript-loader?module=es6'
                    : [
                        'react-hot-loader',
                        'awesome-typescript-loader'
                    ]
            },
            // css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                sourceMap: !isProduction,
                                importLoaders: 1,
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            },
            // static assets
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.png$/, use: 'url-loader?limit=10000' },
            { test: /\.jpg$/, use: 'file-loader' },
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: sourcePath,
                postcss: [
                    require('postcss-import')({ addDependencyTo: webpack }),
                    require('postcss-url')(),
                    require('postcss-cssnext')(),
                    require('postcss-reporter')(),
                    require('postcss-browser-reporter')({ disabled: isProduction }),
                ]
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: !isProduction
        })
    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        stats: {
            warnings: false
        },
    },
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    }
};
