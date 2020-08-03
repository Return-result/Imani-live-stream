const { generateSW } = require("workbox-build");

generateSW({
  cacheId: "radio_pwa",
  globDirectory: "./",
  globPatterns: ["**/*{css,js,json,png,gif,jpg,jpeg,svg}"],
  globIgnores: ["**/generator.js", "**/sw.js", "node_modules/**/*"],
  swDest: "./sw.js",
  runtimeCaching: [
    {
      urlPattern: /\.(?:html)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "page",
        expiration: {
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
      },
    },
  ],
});
