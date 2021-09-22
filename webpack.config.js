const path = require('path');

module.exports = {
	entry: './src/index.ts',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					'ts-loader'
				],
				exclude: /node_modules/
			}
		],
	},
	resolve: {
		modules: [
			'src',
			'node_modules'
		],
		extensions: [
			'.js',
			'.ts',
			'.tsx',
			'.esm.tsx'
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bs5-lightbox.esm.js',
		library: 'bs5-lightbox',
		libraryTarget: 'umd',
		globalObject: 'this',
		umdNamedDefine: true,
		clean: true
	}
};
