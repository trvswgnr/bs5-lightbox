const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: './src/index.esm.ts',
	target: 'web',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				exclude: /node_modules/
			}
		]
	},
	optimization: {
		minimize: false
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index.esm.js',
		library: 'bs5-lightbox',
		libraryTarget: 'umd',
		globalObject: 'this',
		umdNamedDefine: true
	}
};
