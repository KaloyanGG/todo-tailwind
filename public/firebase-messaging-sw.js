/// <reference lib="webworker" />
/** @type {ServiceWorkerGlobalScope} */
const sw = self;

importScripts(
  "https://www.gstatic.com/firebasejs/11.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAmgoxLx4rHV65np-BjZV_Fvh0Cpdn4gQA",
  authDomain: "todo-tailwind-c75ac.firebaseapp.com",
  projectId: "todo-tailwind-c75ac",
  storageBucket: "todo-tailwind-c75ac.firebasestorage.app",
  messagingSenderId: "459795594912",
  appId: "1:459795594912:web:9684c82e72d910577993c5"
};

const app = firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging(app);

sw.addEventListener("activate", () => {});
sw.addEventListener("install", () => {
  console.log('SW installed!')
});

// Handle notification clicks - open the app
sw.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow("/"));
});

self.addEventListener('push', function (event) {
    if (!event.data) return;

    const data = event.data.json();
    event.waitUntil(
        self.registration.showNotification(payload.notification.title, {
            body: data.body,
            vibrate: [200, 100, 200],
            // data: payload.data,
            // requireInteraction: true
        })
    );
});