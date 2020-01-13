const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './app.js',
    module: {
        rules: [{
            use: 'ts-loader',
            exclude: '/node_modules/',
        }]
    },
    //resolve: {
      //  extensions: ['.tsx,', '.ts', '.js']
    //},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

};