"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/routes/notification.ts
const express_1 = __importDefault(require("express"));
const web_push_1 = __importDefault(require("web-push"));
const router = express_1.default.Router();
let subscriptions = [];
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
    const promises = subscriptions.map((subscription) => web_push_1.default.sendNotification(subscription, JSON.stringify(notificationPayload)));
    Promise.all(promises)
        .then(() => res.status(200).json({ message: "Notifications sent" }))
        .catch((err) => {
        console.error("Error sending notifications", err);
        res.sendStatus(500);
    });
});
exports.default = router;
