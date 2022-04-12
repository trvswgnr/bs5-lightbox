const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	output: {
		filename: 'index.js',
		library: {
			name: 'Lightbox',
			type: 'umd',
			umdNamedDefine: true,
			export: 'default'
		},
		uniqueName: 'bs5-lightbox'
	}
});
