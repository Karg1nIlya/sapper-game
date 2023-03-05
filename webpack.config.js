const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


module.exports = {
    mode: 'development',

    entry: ['@babel/polyfill', './src/index.ts'],
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
        // assetModuleFilename: 'assets/[name][ext]'
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(), //удаляет/очищает директорию сборки проекта
        
    ],

    target: 'web',
    devServer: {
        port: '3000',
        // static: ['./public'],
        open: true,
        hot: true,
        liveReload: true,
    }, 

    module: {
        rules: [
            // {
            //   test: /\.tsx?$/,
            //   exclude: /node_modules/,
            //   use: 'ts-loader'
            // },
            {
                test: /.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                }
            },

            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.html$/i,
                loader: 'html-loader',
            },

            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            // },
          ],
    },
    resolve: {
        extensions: ['.tsx', 'jsx', '.ts', '.js', 'css'],
    },
}