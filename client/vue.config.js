const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: "Better View",
    themeColor: "#42b983",
    msTileColor: "#42b983",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
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
