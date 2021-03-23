import path from 'path'
import webpack from 'webpack'
import TerserPlugin from "terser-webpack-plugin"
import WebpackBundleAnalyzer from "webpack-bundle-analyzer"
import pkfInf from './package.json'
// const WEB = process.env.WEB !== undefined && process.env.WEB !== "0";
// const NODE_MajorVersion = Number.parseInt(process.version.split(".")[0].replace("v", ""));
const config: webpack.Configuration = {
	entry: {
		"tdscore-qjs": path.resolve(__dirname, "./src/index.ts"),
		"tdscore-qjs.min": path.resolve(__dirname, "./src/index.ts"),
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
		library: "tdscore",
		globalObject: "globalThis",
		libraryTarget: "global"
	},

	devtool: "source-map",

	mode: "production",

	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				loader: 'ts-loader',
				options: {
					configFile: "tsconfig.qjs.json"
				}
			},
		]
	},

	// externals: {
	// 	"bignumber.js": "BigNumber"
	// },

	plugins: [
		new webpack.DefinePlugin({
			"__TDSCORE_VERSION__": pkfInf.version,
			"__FOR_QJS__": true
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
				terserOptions: {
					compress: {
						dead_code: true,
						unused: true
					}
				},
			})
		]

	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};

export default config;