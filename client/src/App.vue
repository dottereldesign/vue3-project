<!-- client/src/App.vue -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Homepage</h1>
    <p>This is a simple homepage created in Vue.js.</p>
    <button @click="subscribeUser">Enable Notifications</button>
    <button @click="sendNotification">Send Test Notification</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async subscribeUser() {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(
            "BIWOQIWC9RSpCllvR4TQpoIjeHDItf1wh2UEo-A36i8jQXnNBpYh2-3bRFISOQgrpQJthhpY77-Wt3c6OaoH9iQ"
          ),
        });

        await fetch("http://localhost:3000/notifications/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });

        alert("Subscribed successfully!");
      } catch (err) {
        console.error("Error subscribing to notifications", err);
      }
    },
    async sendNotification() {
      try {
        await fetch("http://localhost:3000/notifications/send", {
          method: "POST",
        });

        alert("Notification sent!");
      } catch (err) {
        console.error("Error sending notification", err);
      }
    },
    urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
  },
};
</script>
