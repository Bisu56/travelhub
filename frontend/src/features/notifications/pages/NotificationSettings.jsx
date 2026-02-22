import { useState } from "react";
import { updateNotificationSettings } from "../services/notificationApi";

const NotificationSettings = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateNotificationSettings({ emailEnabled, pushEnabled });
      setMessage("Settings saved successfully");
    } catch {
      setMessage("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Notification Settings</h2>

      <label>
        <input
          type="checkbox"
          checked={emailEnabled}
          onChange={() => setEmailEnabled(!emailEnabled)}
        />
        Email Notifications
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={pushEnabled}
          onChange={() => setPushEnabled(!pushEnabled)}
        />
        In-App Notifications
      </label>

      <br />
      <button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Preferences"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NotificationSettings;
