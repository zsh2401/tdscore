import path from 'path'
import webpack from 'webpack'
import TerserPlugin from "terser-webpack-plugin"
import WebpackBundleAnalyzer from "webpack-bundle-analyzer"
import pkfInf from './package.json'
// const WEB = process.env.WEB !== undefined && process.env.WEB !== "0";
// const NODE_MajorVersion = Number.parseInt(process.version.split(".")[0].replace("v", ""));
const config: webpack.Configuration = {
	entry: {
		"tdscore": path.resolve(__dirname, "./src/index.ts"),
		"tdscore.min": path.resolve(__dirname, "./src/index.ts"),
		"tdscore-hash": path.resolve(__dirname, "./src/util/hash/index.ts"),
		"tdscore-hash.min": path.resolve(__dirname, "./src/util/hash/index.ts")
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
			{
				test: /\.(ts|tsx)?$/,
				loader: 'ts-loader',
			},
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			"__TDSCORE_VERSION__": pkfInf.version
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