const path = require("path");
module.exports = {
  mode: "none",
  entry: "./script.js",
  output: {
    path: __dirname + "/dist",
    filename: "script.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
