const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
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
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  plugins: [new webpack.BannerPlugin({
	  raw: true,
	  banner: `
/*!
 * Lightbox for Bootstrap 5 v${process.env.npm_package_version} (https://trvswgnr.github.io/bs5-lightbox/)
 * Copyright ${(new Date()).getFullYear()} Travis Aaron Wagner (https://github.com/trvswgnr/)
 * Licensed under MIT (https://github.com/trvswgnr/bs5-lightbox/blob/main/LICENSE)
 */`
  })],
  output: {
	path: path.resolve(__dirname, ''),
	filename: mode === 'development' ? 'bs-lightbox.dev.js' : 'bs5-lightbox.min.js',
  },
  externals: ['bootstrap']
})
