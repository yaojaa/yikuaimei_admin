module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'autoprefixer': {
            browsers: 'last 5 version'
        },
        'postcss-pxtorem': {
            rootValue: 100,
            minPixelValue: 2,
            propWhiteList: []
        },
    }
}