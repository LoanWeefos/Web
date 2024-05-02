const path = require('path');

module.exports = (env, argv) => {
    const { mode } = argv
    const isProduction = mode === 'production'
    return {
        entry: './src/index.js',
        output: {
            filename: isProduction ? '[name].[contenthash].js' : 'main.js',
            path: path.resolve(__dirname, 'build')
        }
    }
}