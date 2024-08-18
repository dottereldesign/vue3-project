// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker"; // Import the service worker registration

createApp(App).mount("#app");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);

      return registration.pushManager
        .getSubscription()
        .then(async function (subscription) {
          if (subscription) {
            return subscription;
          }

          // Replace this with the actual endpoint for your VAPID public key if needed
          const response = await fetch("http://localhost:3000/vapidPublicKey");
          const vapidPublicKey = await response.text();
          const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          });
        });
    })
    .then(function (subscription) {
      console.log("Subscribed:", subscription);
      // Send subscription to the server
      return fetch("http://localhost:3000/notifications/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
        },
      });
    })
    .then(() => {
      console.log("Subscription sent to the server successfully.");
    })
    .catch(function (err) {
      console.error("Error during subscription process:", err);
    });
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
