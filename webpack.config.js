// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebPackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const alias = {};
const fileExtensions = ["js", "jsx", "ts", "tsx", "css"];

const config = {
  entry: {
    background: path.join(__dirname, "src", "Background", "index.js"),
    content: path.join(__dirname, "src", "Content", "index.js"),
    popup: path.join(__dirname, "src", "Pages", "Popup", "index.jsx"),
    systemcheck: path.join(
      __dirname,
      "src",
      "Pages",
      "Systemcheck",
      "index.jsx"
    ),
    softconfig: path.join(__dirname, "src", "Pages", "Softconfig", "index.jsx"),
    browserconfig: path.join(
      __dirname,
      "src",
      "Pages",
      "Browserconfig",
      "index.jsx"
    ),
    networkconfig: path.join(
      __dirname,
      "src",
      "Pages",
      "Networkconfig",
      "index.jsx"
    ),
    recording: path.join(
      __dirname,
      "src",
      "Pages",
      "Recording_Module",
      "index.jsx"
    ),
    devtools: path.join(
      __dirname,
      "src",
      "pages",
      "Devtools",
      "index.jsx",
    ),
    contact: path.join(__dirname, "src", "Pages", "Contact", "index.jsx"),
    disconnected: path.join(__dirname, "src", "Pages", "Disconnected", "index.jsx"),
    // "css":["output.css"], add to manifest.JSON if tailwind is needed for content.bundle.js
    output: path.join(__dirname, "src", "index.css"),
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => "." + extension)
      .concat([".js", ".jsx", ".ts", ".tsx", ".css"]),
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    open: true,
    host: "localhost",
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "Pages", "Popup", "index.html"),
      filename: "popup.html",
      chunks: ["popup", "output"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        "src",
        "Pages",
        "Systemcheck",
        "index.html"
      ),
      filename: "systemcheck.html",
      chunks: ["systemcheck", "output"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        "src",
        "Pages",
        "Softconfig",
        "index.html"
      ),
      filename: "softconfig.html",
      chunks: ["softconfig", "output"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        "src",
        "Pages",
        "Browserconfig",
        "index.html"
      ),
      filename: "browserconfig.html",
      chunks: ["browserconfig", "output"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        "src",
        "Pages",
        "Networkconfig",
        "index.html"
      ),
      filename: "networkconfig.html",
      chunks: ["networkconfig", "output"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        "src",
        "Pages",
        "Recording_Module",
        "index.html"
      ),
      filename: "recording.html",
      chunks: ["recording", "output"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "Pages", "Devtools", "index.html"),
      filename: "devtools.html",
      chunks: ["devtools"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "Pages", "Contact", "index.html"),
      filename: "contact.html",
      chunks: ["contact", "output"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "Pages", "Disconnected", "index.html"),
      filename: "disconnected.html",
      chunks: ["disconnected", "output"],
    }),
    new CopyWebPackPlugin({
      patterns: [
        {
          from: "src/assets",
          to: path.join(__dirname, "dist", "assets"),
          force: true,
        },
      ],
    }),
    new CopyWebPackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: path.join(__dirname, "dist"),
          force: true,
        },
      ],
    }),

    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        exclude: /node_modules/,
        type: "asset",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
