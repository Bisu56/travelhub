import { useState } from "react";
import { getEmailTemplates, getEmailTemplateById } from "../services/notificationApi";

const EmailTemplatePreview = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await getEmailTemplates();
      setTemplates(res.data);
    } catch (error) {
      console.error("Failed to fetch templates", error);
    } finally {
      setLoading(false);
    }
  };

  const selectTemplate = async (id) => {
    setLoading(true);
    try {
      const res = await getEmailTemplateById(id);
      setSelectedTemplate(res.data);
    } catch (error) {
      console.error("Failed to fetch template", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Email Template Preview</h2>

      <div>
        <button onClick={fetchTemplates}>Load Templates</button>
      </div>

      {templates.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Available Templates</h3>
          <ul>
            {templates.map(t => (
              <li key={t.id} style={{ cursor: "pointer", margin: "5px 0" }} onClick={() => selectTemplate(t.id)}>
                {t.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
        {selectedTemplate ? (
          <>
            <h3>{selectedTemplate.name}</h3>
            <div dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
          </>
        ) : (
          <>
            <h3>Booking Confirmation</h3>
            <p>Dear User,</p>
            <p>Your booking has been confirmed.</p>
            <p>Thank you for choosing TravelHub.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailTemplatePreview;
