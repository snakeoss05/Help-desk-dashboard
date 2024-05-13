import { getNotifications, deleteNotification } from "../dao/notification.js";

export const getNotificationsController = async (req, res) => {
  try {
    const notifications = await getNotifications(req.user._id);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getNotificationsController: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteNotificationController = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notifications = await deleteNotification(notificationId);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getNotificationsController: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
