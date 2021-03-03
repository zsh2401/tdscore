import path from 'path'
import webpack from 'webpack'
import TerserPlugin from "terser-webpack-plugin"
const config: webpack.Configuration = {
	entry: {
		"tdscore": path.resolve(__dirname, "./src/index.ts"),
		"tdscore.min": path.resolve(__dirname, "./src/index.ts")
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
		library: "tdscore",
		globalObject: "this",
		libraryTarget: "umd"
	},

	devtool: "source-map",

	mode: "production",

	module: {
		rules: [
			{ test: /\.(ts|tsx)?$/, loader: 'ts-loader' },
		]
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		})
	],

	optimization: {
		// minimize: false,
		minimizer: [
			new TerserPlugin({
				include: /\.min\.js$/,
				// cache: true,
				parallel: true,
				// sourceMap: true, // Must be set to true if using source-maps in production
				terserOptions: {},
			})
		]

	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};

export default config;