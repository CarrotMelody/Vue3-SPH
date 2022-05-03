const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 關閉 eslint
  devServer: {
    proxy: { // 代理跨域
      "/api": {
        target: "http://192.168.1.26:8080",
      },
    },
  },
});
