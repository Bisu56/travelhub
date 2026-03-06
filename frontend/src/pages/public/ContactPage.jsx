import { useState } from 'react';
import { FiMapPin, FiMail, FiPhone, FiClock, FiSend, FiUser, FiFileText, FiList } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FiMapPin size={24} />,
      title: 'Visit Us',
      details: ['TravelHub Pvt. Ltd.', 'Kantipath, Kathmandu', 'Nepal']
    },
    {
      icon: <FiPhone size={24} />,
      title: 'Call Us',
      details: ['+977 9800000000', '+977 9800000001', 'Mon-Fri: 9AM - 6PM']
    },
    {
      icon: <FiMail size={24} />,
      title: 'Email Us',
      details: ['support@travelhub.com', 'info@travelhub.com', 'careers@travelhub.com']
    },
    {
      icon: <FiClock size={24} />,
      title: 'Office Hours',
      details: ['Sunday - Friday', '9:00 AM - 6:00 PM', 'Saturday: Closed']
    }
  ];

  const faqs = [
    {
      q: 'What are your office hours?',
      a: 'Our office is open from Sunday to Friday, 9:00 AM to 6:00 PM. We are closed on Saturdays.'
    },
    {
      q: 'How can I get a refund?',
      a: 'For refund inquiries, please contact our support team with your booking details. We process refunds within 5-7 business days.'
    },
    {
      q: 'Do you offer 24/7 customer support?',
      a: 'Yes, our customer support team is available 24/7 for emergency assistance. For non-emergency inquiries, please reach out during office hours.'
    },
    {
      q: 'How can I become a travel agent?',
      a: 'Please visit our Careers page or email your resume to careers@travelhub.com for agent partnership opportunities.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-700/80 to-cyan-900/60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920"
            alt="Contact TravelHub" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 w-full max-w-4xl px-4 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
            Contact Us
          </h1>
          <p className="text-cyan-100 text-lg md:text-xl max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with us.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-lime-500 rounded-full flex items-center justify-center text-cyan-900 mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-cyan-900 mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm mb-1">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-cyan-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <div className="relative">
                    <FiList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Related</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <div className="relative">
                    <FiFileText className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Write your message here..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-lime-500 text-cyan-900 py-3 rounded-lg font-semibold hover:bg-lime-400 transition-colors flex items-center justify-center gap-2"
                >
                  <FiSend /> Send Message
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2767568534747!2d85.32329007527444!3d27.71745498279343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19c192e7067b%3A0x398346c38b1a3991!2sKantipath%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TravelHub Location"
                ></iframe>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h3 className="text-xl font-semibold text-cyan-900 mb-4">Follow Us</h3>
                <p className="text-gray-600 mb-4">Stay connected with us on social media for updates and travel inspiration.</p>
                <div className="flex gap-4">
                  {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-900 hover:bg-lime-500 hover:text-cyan-900 transition-colors"
                    >
                      {social[0]}
                    </a>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-cyan-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">Emergency Support</h3>
                <p className="text-cyan-200 mb-4">For urgent assistance outside office hours, call our 24/7 emergency line.</p>
                <a href="tel:+9779800000000" className="text-lime-400 font-semibold text-lg hover:underline">
                  +977 9800000000
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cyan-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find quick answers to common questions</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-cyan-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
