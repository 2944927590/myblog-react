var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        './app/js/blog/app.js'
    ],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.less/, loader: 'style-loader!css-loader!less-loader'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=10000'}
        ]
    },
    resolve: {
        extensions:['','.js','.json','.less']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ]
};
