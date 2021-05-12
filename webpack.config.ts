import path from 'path'
import webpack from 'webpack'
import fs from "fs"
import TerserPlugin from "terser-webpack-plugin"
import WebpackBundleAnalyzer from "webpack-bundle-analyzer"
import pkfInf from './package.json'

const config: webpack.Configuration = {
	entry: {
		"tdscore": path.resolve(__dirname, "./src/index.ts"),
		"tdscore.min": path.resolve(__dirname, "./src/index.ts"),
		"tdscore-hash": path.resolve(__dirname, "./src/util/hashing/index.ts"),
		"tdscore-hash.min": path.resolve(__dirname, "./src/util/hashing/index.ts")
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
		library: "tdscore",
		globalObject: "this",
		libraryTarget: "var",
		auxiliaryComment: "fuck this way"
	},

	devtool: "source-map",

	mode: "production",

	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				loader: 'ts-loader',
			},
		]
	},

	plugins: [
		new webpack.BannerPlugin(fs.readFileSync("./LICENSE", "utf-8")),
		new webpack.DefinePlugin({
			"__TDSCORE_VERSION__": pkfInf.version,
			"__FOR_QJS__": false
		}),
		new webpack.ProgressPlugin(),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
		new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
			analyzerMode: "static",
		}),
	],

	optimization: {
		minimizer: [
			//@ts-ignore
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