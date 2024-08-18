"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const web_push_1 = __importDefault(require("web-push"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
// Replace these with the keys generated
const vapidKeys = {
    publicKey: "BIWOQIWC9RSpCllvR4TQpoIjeHDItf1wh2UEo-A36i8jQXnNBpYh2-3bRFISOQgrpQJthhpY77-Wt3c6OaoH9iQ",
    privateKey: "6XDPH8RDbYo7eDpQoA1iUBG7sp8fkM__393Q4LE1eXA",
};
web_push_1.default.setVapidDetails("mailto:howemanning@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);
// Use the notifications router
app.use("/notifications", notifications_1.default);
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
