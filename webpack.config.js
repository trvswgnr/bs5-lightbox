const path = require('path');
module.exports = {
	entry: './src/index.js',
	stats: {
		warnings: false
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index.js'
	}
};
