import NotificationItem from "./NotificationItem";

const NotificationDropdown = ({ notifications, refresh, onClose }) => {
  return (
    <div style={{
      position: "absolute",
      right: 0,
      top: "30px",
      width: "300px",
      maxHeight: "400px",
      overflowY: "auto",
      background: "#fff",
      border: "1px solid #ccc",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      zIndex: 1000
    }}>
      <div style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
        <strong>Notifications</strong>
      </div>
      {notifications.length === 0 ? (
        <p style={{ padding: "10px", textAlign: "center" }}>No notifications</p>
      ) : (
        notifications.map(n => (
          <NotificationItem
            key={n.id}
            notification={n}
            refresh={refresh}
            onClose={onClose}
          />
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;
