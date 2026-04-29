import path from "path";
import webpack from "webpack";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// const nodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // for webpack
export default {
    entry: "./src/index.js",
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    mode: "development",
    output: {
        // .cjs so Node treats the bundle as CommonJS even though package.json is "type": "module"
        filename: "main.cjs",
        path: path.resolve(__dirname, "..", "dist"),
    },
    // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    // devServer: {
    //     contentBase:  path.join(__dirname, 'dist'),
    //     compress: true,
    //     hot: true,
    //     port: 9000
    // },
    plugins: [
        new webpack.ProgressPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html', //name of html file to be created
        //     template: './src/index' // source from which html file would be created
        // })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, "src")],
                //     exclude: path.resolve(__dirname, "node_modules"), // files to be ignored
                loader: "babel-loader",
            },
        ],
    },
    ignoreWarnings: [
        /Critical dependency:/,
        // mongodb references optional native/cloud drivers (kerberos, snappy,
        // aws4, gcp-metadata, etc.) that we don't use; webpack flags them as
        // unresolved but they're meant to be optional.
        {
            module: /node_modules\/mongodb\/lib\/deps\.js/,
            message: /Can't resolve/,
        },
    ],
};
