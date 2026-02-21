const ContactForm = ({ setContact }) => {
  const handleChange = (e) => {
    setContact(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h3>Contact Information</h3>

      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
    </div>
  );
};

export default ContactForm;