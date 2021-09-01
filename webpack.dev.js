const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { getEntryConfig } = require("./prebuild-scripts/generate-webpack-entry");
let entryConfig = getEntryConfig("en-SG.json");

module.exports = {
	mode: "development",
	entry: entryConfig,
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "build", "js"),
	},
	plugins: [new MiniCssExtractPlugin({ filename: "../css/[name].css" })],
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					// Extract css to saparate file
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},
};
