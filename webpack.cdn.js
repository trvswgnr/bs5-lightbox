const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({ extractComments: false })]
	},
	target: ['web', 'es5'],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	output: {
		filename: 'index.bundle.min.js',
		library: {
			name: 'Lightbox',
			type: 'window',
			export: 'default'
		}
	}
});
