'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "3b448b84ea096910531d0c3ff43e9471",
"index.html": "6223071af95798e4b7c2bcc6b61c5d8f",
"/": "6223071af95798e4b7c2bcc6b61c5d8f",
"main.dart.js": "4f91fcc951a4d95a87960c3a481be953",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "3184a149613beb2315480687357ea5d8",
"icons/Icon-192.png": "1e10514abcd2d2f47267dd0a1c592db8",
"icons/Icon-maskable-192.png": "1e10514abcd2d2f47267dd0a1c592db8",
"icons/Icon-maskable-512.png": "cc076a67047136c5cd55a9371e96e664",
"icons/Icon-512.png": "cc076a67047136c5cd55a9371e96e664",
"manifest.json": "f3319a25f6697d50d097e07f854f0308",
"assets/images/getitonastore.png": "77ca8b6daef7f3a2c81f8266a17cd96a",
"assets/images/LOGOnobackground%2520%25E2%2580%2593%2520wt.png": "0c5168d92292ef33a44f93a69144ee2b",
"assets/images/gplaystore.jpg": "9dc94245d5b5838fb8a487f2bc767dd2",
"assets/images/image8.png": "0a0fcdf304f4e3dc5427f0cabf742156",
"assets/images/image9.png": "6b17bdc9298ab4f41c82db3930bb0152",
"assets/images/bg2.jpeg": "027c2521779df5330951d3f0ea424254",
"assets/images/bg9.jpg": "763e8c3c8e2ebbcb781ce8d44ed19f60",
"assets/images/bg8.jpg": "a41340fe1bd7f9bbfe2f02c73ce88266",
"assets/images/appstore.png": "e621fca3b7f0d88e4a78335e579d9be2",
"assets/images/image10.png": "7944e98626eaaa4f3134f74b93e2b608",
"assets/images/bg6.jpg": "ce4dc86c2c435ccaa95c42b10c499fc4",
"assets/images/bg10.jpg": "788605a627381f6ac2413cb65d011cc7",
"assets/images/bg7.jpg": "1a4232146a56a98f6a835b8889e3cc3c",
"assets/images/spacebg.jpg": "2f7ba53142c07329d229c4a6fd4e1dee",
"assets/images/bg5.jpg": "c649e21a6cdaa1bc07e23525b322ac51",
"assets/images/bg4.jpg": "2f7fb16a45b0e73e15305cf7909ded25",
"assets/images/logo.png": "3184a149613beb2315480687357ea5d8",
"assets/images/bg1.jpg": "aec03f84bfcee5ec7a61f368cfe9d031",
"assets/images/bg3.jpg": "dc13b1c16f97f14c10f14e734c12ca59",
"assets/images/bg2.jpg": "4f124804fad8730f5a33cacaa98f1109",
"assets/images/image7.png": "d3fe0e00d54ba249dfaccf7bed95246a",
"assets/images/image6.png": "3d6116c5dc2c20fbb995bf5fc1b4e29c",
"assets/images/image4.png": "d86062c1d6937dd578d1e5188de7c72e",
"assets/images/image5.png": "9d350181f8cca16095479322dee52df5",
"assets/images/image1.png": "f3d07638624f2e07efc9e1f40567b35e",
"assets/images/logonbg.png": "ea483e9d9f4aaffcce016042454d266f",
"assets/images/getitonpstore.png": "1e91d02cf5a902f38f2923c006d79281",
"assets/images/image2.png": "d6eac5c305b3b85be9c16a606ef7d7db",
"assets/images/image3.png": "e4b2db8e329dc6b4232010e48a873a1a",
"assets/AssetManifest.json": "662e8b73bcbb5b1533d517f6c6a6a7db",
"assets/NOTICES": "df51d85aaebf63a1f09121ee8cfb7554",
"assets/FontManifest.json": "1b1e7812d9eb9f666db8444d7dde1b20",
"assets/packages/material_design_icons_flutter/lib/fonts/materialdesignicons-webfont.ttf": "3759b2f7a51e83c64a58cfe07b96a8ee",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/glass_kit/assets/noise.png": "86f22ae1a498bb8f0c39264f9c7c796c",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "4613545d80a8da2491bd40c9e399c63c",
"assets/fonts/MaterialIcons-Regular.otf": "f67d0a020bb751e75523fda6fa6c2885",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
