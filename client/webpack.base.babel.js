import 'dotenv/config';
import cssnext from 'postcss-cssnext';
import cssimport from 'postcss-import';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack'

export default {

	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					"style-loader",
					process.env.NODE_ENV==="production"
						? "css-loader?minimize&modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]!postcss-loader"
						: "css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]!postcss-loader"
				)
			},

			{
				test : /\.jsx?$/,
				loader  : 'babel'
			},

			{
				test : /\.json$/,
				loader  : 'json'
			},

			{
				test: /\.(png|jpe?g|gif|svg|mp3|mpe?g)$/,
				loader: "file-loader?name=static/assets/[name]-[hash:2].[ext]"
			}

		]

	},

	plugins: [
		new ExtractTextPlugin("app.css"),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': `"${process.env.NODE_ENV||"production"}"`
		})
	],


	cssLoader: {
		modules: true
	},

	postcss : [
		cssimport({path: `${__dirname}/src/app`}),
		cssnext()
	]
};
