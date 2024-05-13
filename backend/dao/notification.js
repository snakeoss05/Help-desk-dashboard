import Notification from "../models/Notifications.js";
import { io } from "../socket.js";
import User from "../models/user.js";
import { getReceiverSocketId } from "../socket.js";
export async function sendNotification(receiverId, senderId, message) {
  
  const sender = await User.findById(senderId).select(
    "profilePicture name lastname"
  );
  const notificiating = new Notification({
    receiverId: receiverId,
    senderId: sender._id,
    message: message,
  });
  await notificiating.save();

  const receiverSocketId = getReceiverSocketId(receiverId);

  // io.emit() used to send events to all the connected clients
  if (receiverSocketId) {
    const notification = {
      senderId: sender,
      message: message,
    };
    io.to(receiverSocketId).emit("notify", notification);
  }

  return notificiating;
}

export async function getNotifications(receiverId) {
  const notifications = await Notification.find({ receiverId })
    .sort({
      createdAt: -1,
    })
    .populate("senderId")
    .select("-password");
  return notifications;
}
export async function deleteNotification(notificationId) {
  const deletedNotification = await Notification.findByIdAndDelete(
    notificationId
  );
  return deletedNotification;
}
