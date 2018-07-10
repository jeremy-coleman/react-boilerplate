const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const ReactJssHmrPlugin = require("react-jss-hmr/webpack")
const BrowserSyncPlugin = require("browser-sync-webpack-plugin")

const { SERVER_PORT = 3000, CLIENT_PORT = 8080 } = process.env

module.exports = {
  entry: "./src/client/client.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  resolve: {
    plugins: [new ReactJssHmrPlugin()]
  },
  devServer: {
    overlay: true,
    proxy: {
      "/api": {
        target: `http://localhost:${SERVER_PORT}`
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/index.html"
    }),
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: CLIENT_PORT + 1,
        proxy: `http://localhost:${CLIENT_PORT}`
      },
      {
        reload: process.env.SYNC === "true"
      }
    )
  ]
}
