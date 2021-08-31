const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/login/login.js",
	},
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "build", "css"),
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
