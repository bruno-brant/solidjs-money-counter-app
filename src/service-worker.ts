/*
 * Service Worker file
 */

/** Initialize the service worker */
self.addEventListener("install", () => {
	console.log("Service Worker installed");
});

/**  Activate the service worker */
self.addEventListener("activate", () => {
	console.log("Service Worker activated");
});

export { };
