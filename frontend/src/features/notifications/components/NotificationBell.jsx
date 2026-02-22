import { useEffect, useState, useCallback } from "react";
import { getUserNotifications } from "../services/notificationApi";
import NotificationDropdown from "./NotificationDropdown";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await getUserNotifications(userId);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch notifications", error);
      return [];
    }
  }, [userId]);

  useEffect(() => {
    let isMounted = true;

    if (userId) {
      fetchNotifications().then((data) => {
        if (isMounted) {
          setNotifications(data);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [userId, fetchNotifications]);

  useEffect(() => {
    let isMounted = true;

    if (userId) {
      fetchNotifications().then(() => {
        if (isMounted) {
          // State update will only happen if component is still mounted
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [userId, fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read_status).length;

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}>
        🔔
        {unreadCount > 0 && (
          <span style={{ color: "red", fontSize: "12px", marginLeft: "2px" }}>
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={notifications}
          refresh={fetchNotifications}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
