const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");
const path = require("path");

module.exports = merge(webpackCommon, {
  mode: "development",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
