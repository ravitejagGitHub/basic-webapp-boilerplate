const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		login: "./src/widgets/login/login.js",
		"reset-password": "./src/widgets/reset-password/reset-password.js",
		footer: "./src/widgets/footer/footer.js",
		header: "./src/widgets/header/header.js",
	},
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
