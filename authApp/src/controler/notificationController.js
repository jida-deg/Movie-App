import Notification from "../modele/notifications.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user; // set by combinedAuthMiddleware
    const notifications = await Notification.find({ userId: userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error("Failed to fetch notifications", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};