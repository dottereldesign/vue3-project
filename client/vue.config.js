const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: "Better View",
    themeColor: "#42b983",
    msTileColor: "#42b983",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    manifestOptions: {
      background_color: "#42b983",
    },

    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      clientsClaim: true,
      skipWaiting: true,
    },
  },

  configureWebpack: {
    entry: "./src/main.ts",
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".vue", ".json"],
    },
  },
});
