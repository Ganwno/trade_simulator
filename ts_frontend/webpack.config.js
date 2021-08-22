var path = require('path');

module.exports = {
    entry: "./entry.jsx",
    output: {
        path: path.resolve(__dirname, '../ts_backend', 'app', 'assets', 'javascripts'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '*']
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    }
};