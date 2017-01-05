import base from './webpack.base.babel.js';
import path from 'path';
import webpack from 'webpack';

const {WDS_PORT, PORT, APP_WEB_BASE_PATH} = process.env;

export default {
	...base,

	entry: "./src/app/_client.js",
	output: {
		path: path.join(__dirname, 'dist', 'static'),
		filename: "app.js",
		publicPath: `${APP_WEB_BASE_PATH}/`
	},

	plugins: base.plugins
		.concat(process.env.NODE_ENV==="production"
			? [
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.optimize.UglifyJsPlugin({
					compressor: {
						warnings: false
					}
				})
			]
			: []
		),

	devServer: {
		publicPath: '/static/',
		contentBase: `http://localhost:${PORT}/static`,
		historyApiFallback: true,
		progress: false,
		stats: 'errors-only',
		compress: true,
		port: WDS_PORT,
		proxy: {
			"**": `http://localhost:${PORT}`
		}
	}

};
