const ExtractTextPlugin = require('extract-text-webpack-plugin');

const js = {
	mode: 'development',
	entry: `${__dirname}/src/js/index.js`,
	output: {
		path: `${__dirname}/demo/built/`,
		filename: 'index.js'
	}
};

const sass = {
	mode: 'development',
	entry: `${__dirname}/src/scss/index.scss`,
	output: {
		path: `${__dirname}/demo/built/`,
		filename: 'index.css'
	},
	module: {
		rules: [
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
			}
		]
	},
	plugins: [new ExtractTextPlugin({ filename: 'index.css' })]
}

module.exports = [js, sass];
