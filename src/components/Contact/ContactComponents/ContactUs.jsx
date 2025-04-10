import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Your message has been sent!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-900">Contact Us</h2>
      <p className="text-center text-gray-600 mb-6">
        We'd love to hear from you! Our team is here to help.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full bg-gray-100"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full bg-gray-100"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full bg-gray-100"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full bg-gray-100"
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="p-3 border rounded-lg w-full bg-gray-100 h-32"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full p-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800"
        >
          Send Message
        </button>
      </form>
      <div className="mt-8 text-center text-gray-600">
        <p><strong>Address:</strong> CharakWellness HQ, New Delhi</p>
        <p><strong>Email:</strong> support@charakwellness.com</p>
        <p><strong>Phone:</strong> +91-9000000000</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-xl"><FaFacebook /></a>
          <a href="#" className="text-xl"><FaInstagram /></a>
          <a href="#" className="text-xl"><FaTwitter /></a>
          <a href="#" className="text-xl"><FaLinkedin /></a>
          <a href="#" className="text-xl"><FaEnvelope /></a>
          <a href="#" className="text-xl"><FaPhone /></a>
        </div>
      </div>
    </div>
  );
}
