// server/routes/notification.ts
import express from "express";
import webPush from "web-push";

const router = express.Router();

let subscriptions: Array<any> = [];

router.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

router.post("/send", (req, res) => {
  const notificationPayload = {
    title: "Test Notification",
    body: "This is a test notification",
    icon: "./img/icons/android-chrome-192x192.png",
  };

  const promises = subscriptions.map((subscription) =>
    webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
  );

  Promise.all(promises)
    .then(() => res.status(200).json({ message: "Notifications sent" }))
    .catch((err) => {
      console.error("Error sending notifications", err);
      res.sendStatus(500);
    });
});

export default router;
