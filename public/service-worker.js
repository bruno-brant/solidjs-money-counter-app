/*
 * Service Worker file
 */

/** Initialize the service worker */
self.addEventListener("install", () => {
	console.log("[SW] Service Worker installed.");
});

/**  Activate the service worker */
self.addEventListener("activate", () => {
	console.log("[SW] Service Worker activated.");
});
