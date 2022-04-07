const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	optimization: {
		minimize: false
	},
	output: {
		filename: 'index.js',
		library: {
			name: 'Bootstrap5Lightbox',
			type: 'umd',
			umdNamedDefine: true,
			export: 'default'
		},
		uniqueName: 'bs5-lightbox'
	}
});
