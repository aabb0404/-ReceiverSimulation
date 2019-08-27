const path = require('path');
// const loaders = require();
module.exports = {
    entry: './src/bin/simulation.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/bin'),
    },
    // module :{rules:loaders},
};
