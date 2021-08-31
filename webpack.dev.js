const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		login: "./src/login/login.js",
		"reset-password": "./src/reset-password/reset-password.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "build", "js"),
	},
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},
};
