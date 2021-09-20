const path = require('path')

module.exports = (env, {mode}) => ({
  entry: './bs5-lightbox.js',
  devtool: mode === 'development' ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
			{
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
	path: path.resolve(__dirname, ''),
	filename: mode === 'development' ? 'bs-lightbox.dev.js' : 'bs5-lightbox.min.js',
  },
  externals: ['bootstrap']
})
