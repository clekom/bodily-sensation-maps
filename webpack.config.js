const path = require('path');

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            './src/index.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env', 'stage-0']
            }
        }]
    }
}
