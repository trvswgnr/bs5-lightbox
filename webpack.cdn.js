const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	optimization: {
		minimize: false
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
			name: 'Bootstrap5Lightbox',
			type: 'window',
			export: 'default'
		}
	}
});
