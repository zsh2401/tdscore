import path from 'path'
import webpack from 'webpack'
const config: webpack.Configuration = {
	entry: path.resolve(__dirname, "./src/index.ts"),

	output: {
		filename: 'tdscore.js',
		path: path.resolve(__dirname, './dist'),
		library: "tdscore",
		globalObject:"this",
		libraryTarget: "umd"
	},

	mode: "production",

	module: {
		rules: [
			{ test: /\.(ts|tsx)?$/, loader: 'ts-loader' },

			// {
			// 	test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)?$/,
			// 	use: {
			// 		loader: 'url-loader?limit=100000&name=images/[name]_[hash:8].[ext]'
			// 	}
			// },
		]
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		})
	],

	// optimization: {
	// 	// minimizer: [
	// 	// 	new UglifyJsPlugin({
	// 	// 		uglifyOptions: {
	// 	// 			compress: true
	// 	// 		}
	// 	// 	})
	// 	// ],
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			// vendors: {
	// 			// 	name:"vendors",
	// 			// 	priority: -10,
	// 			// 	chunks:'initial',
	// 			// 	test: /[\\/]node_modules[\\/]/
	// 			// },
	// 		},
	// 		// name: true,
	// 		chunks: 'async',
	// 		minSize: 20000,
	// 		minRemainingSize: 0,
	// 		// maxSize: 0,
	// 		// maxSize: 
	// 	}
	// },


	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};

export default config;