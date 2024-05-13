import express from "express";
import { getNotificationsController,deleteNotificationController } from "../controller/notifications.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/get", protectRoute, getNotificationsController);
router.delete("/delete:notificationId", deleteNotificationController);


export default router;
