import { useEffect, useState } from "react";
import { getAllNotifications, markAsRead } from "../services/notificationApi";

const NotificationHistory = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getAllNotifications();
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      fetchAll();
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Notification History</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications.map(n => (
          <div 
            key={n.id} 
            style={{ 
              padding: "15px", 
              border: "1px solid #ccc", 
              marginBottom: "10px",
              background: n.read_status ? "#fff" : "#f0f8ff"
            }}
          >
            <p>{n.message}</p>
            <small>
              {n.read_status ? "Read" : "Unread"} | {n.type}
            </small>
            {!n.read_status && (
              <button onClick={() => handleMarkAsRead(n.id)} style={{ marginLeft: "10px" }}>
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationHistory;
