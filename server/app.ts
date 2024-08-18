import express from "express";
import bodyParser from "body-parser";
import webPush from "web-push";
import notificationsRouter from "./routes/notifications";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Replace these with the keys generated
const vapidKeys = {
  publicKey:
    "BIWOQIWC9RSpCllvR4TQpoIjeHDItf1wh2UEo-A36i8jQXnNBpYh2-3bRFISOQgrpQJthhpY77-Wt3c6OaoH9iQ",
  privateKey: "6XDPH8RDbYo7eDpQoA1iUBG7sp8fkM__393Q4LE1eXA",
};

webPush.setVapidDetails(
  "mailto:howemanning@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Use the notifications router
app.use("/notifications", notificationsRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
