// importScripts("/cache-polyfill.js");

// self.addEventListener("install", function (e) {
//   e.waitUntil(
//     caches.open("shinefm").then(function (cache) {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "../src/index.css",
//         "../src/index.js",
//         "../src/Radio.js",
//         "../src/radio.css",
//         "/favicon.ico",
//       ]);
//     })
//   );
// });

// // self.addEventListener("activate", function (event) {
// //   event.waitUntil(
// //     caches.keys().then(function (cacheNames) {
// //       return Promise.all(
// //         cacheNames
// //           .filter(function (cacheName) {})
// //           .map(function (cacheName) {
// //             return caches.delete(cacheName);
// //           })
// //       );
// //     })
// //   );
// // });

// self.addEventListener("fetch", function (event) {
//   console.log(event.request.url);

//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       return response || fetch(event.request);
//     })
//   );
// });
