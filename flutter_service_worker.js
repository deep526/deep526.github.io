'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "2c81b5f1adeb54760e297e265f6fe410",
"index.html": "d51a6414538e749ea2b0c843dc202498",
"/": "d51a6414538e749ea2b0c843dc202498",
"main.dart.js": "d877da5ae39aefdc4150beaa9bdf8f7f",
"favicon.png": "8eb49a2ca40b69cae2a9c4422d11a27e",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "7efc9c09d0bb5edb7644dc60c0c0f7e9",
"assets/images/itms007C.png": "c3b81d7068b03882d979074684b9cb67",
"assets/images/markss.png": "c0c16f7fe5fc0033e524806031fed049",
"assets/images/resumewritting.png": "13cca2d8ec93c312ca127db77b399ee9",
"assets/images/aboutus.png": "2be00739b6dfce7505c6b2ae9b0e2e83",
"assets/images/itms006R.png": "9f2b728b528a6983d0ee09301865c8ff",
"assets/images/itms007R.png": "a6ae6b36e60d73929c5bd41135a75d54",
"assets/images/landingpagebg.png": "935a9e7eed5aa6393ee5198780895317",
"assets/images/templates.png": "f765dd28506b5f8bbba660f90d85d7f1",
"assets/images/itms006C.png": "2852440e116d96a8c2e93d0ccaa39077",
"assets/images/itms001C.png": "0c04bf29251276c63042496a7d21eb69",
"assets/images/secure.png": "e05cc35e52762c8d37df44b140d1d07e",
"assets/images/bgforquote.png": "9621e890d8384be8238cf7b59edd10b1",
"assets/images/landingpage.png": "68f6e8059248b04374d8614d138c6b8a",
"assets/images/itms001R.png": "57d359d19b529a04fd84160a304f9a70",
"assets/images/itms002R.png": "cecfb735264527cb698cc05499b46c4f",
"assets/images/itms003C.png": "f20fd6d202f088ebc769923eb0c70bcc",
"assets/images/itms002C.png": "b30fbd4ca0ba1a63ab0d372b6b605bb6",
"assets/images/cover.png": "5fa6fd482ab2059330a6a449afb5449d",
"assets/images/landingpagebg1.png": "98df2d636e9e7eb25fb168136a349974",
"assets/images/itms003R.png": "065803f35b0c37c051fea1faa60d8a69",
"assets/images/itms008R.png": "40b0c16ae5f5a5d590cf292673b1c75a",
"assets/images/itms005C.png": "9b9fab22ea666a8ca6766633171adf2f",
"assets/images/itms004R.png": "8041fa0dcdef9adbba1c103000ea3728",
"assets/images/stripe.png": "364ce6202dd59af05e1d831e80e9c0ce",
"assets/images/itms009C.png": "0c67254b166a97142f621294f84c4afc",
"assets/images/marks.png": "dde9a7d043f194a87deddee29aabd6bf",
"assets/images/itms008C.png": "9a5de2c6b2b76b726d0e2e342020b670",
"assets/images/cv.png": "bfb5c2e7fa1245415a7ae04a72cb82fa",
"assets/images/itms005R.png": "c0a569b33776257cb6239bd95447d8aa",
"assets/images/res1.png": "5e5db8f415dbb871175715f4960448be",
"assets/images/itms004C.png": "0d3d3af6dd9e1aa189f6e4261e978686",
"assets/images/res2.png": "a68ba4144d4a084e4ff2500660142c19",
"assets/images/itms009R.png": "da37bc70867b863684c03bed5fcbd179",
"assets/AssetManifest.json": "cbfee0e7e6de5f51713e39a6d937a8d7",
"assets/NOTICES": "7a722fafa1ed200da3085ee0e510fc70",
"assets/FontManifest.json": "1b1e7812d9eb9f666db8444d7dde1b20",
"assets/packages/material_design_icons_flutter/lib/fonts/materialdesignicons-webfont.ttf": "b62641afc9ab487008e996a5c5865e56",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
