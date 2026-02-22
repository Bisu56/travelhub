import { markAsRead } from "../services/notificationApi";

const NotificationItem = ({ notification, refresh, onClose }) => {
  const handleRead = async () => {
    if (!notification.read_status) {
      try {
        await markAsRead(notification.id);
        refresh();
      } catch (error) {
        console.error("Failed to mark as read", error);
      }
    }
    if (onClose) onClose();
  };

  return (
    <div
      onClick={handleRead}
      style={{
        padding: "10px",
        borderBottom: "1px solid #eee",
        background: notification.read_status ? "#fff" : "#f0f8ff",
        cursor: "pointer"
      }}
    >
      <p style={{ margin: "0 0 5px 0" }}>{notification.message}</p>
      <small style={{ color: "#666" }}>{notification.type}</small>
    </div>
  );
};

export default NotificationItem;
