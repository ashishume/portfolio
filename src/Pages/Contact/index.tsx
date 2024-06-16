import React, { useRef, useState } from "react";
import Layout from "../../Layout/layout";
import emailjs from "@emailjs/browser";

const ContactMe: React.FC = () => {
  const INITIAL_STATE = {
    from_name: "",
    email: "",
    message: "",
  };

  const serviceId = "service_d5cjsva";
  const templateId = "template_fviwbek";
  const publicKey = "hn9BMW67XuDv0hgOr";

  const [formData, setFormData] = useState(INITIAL_STATE);
  const formRef = useRef(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      emailjs
        .sendForm(serviceId, templateId, formRef.current, {
          publicKey: publicKey,
        })
        .then(
          () => {
            setFormData(INITIAL_STATE);
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    }
  };

  return (
    <Layout>
      <div className="flex items-start justify-center min-h-screen p-4">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-400"
              htmlFor="from_name"
            >
              Name
            </label>
            <input
              type="text"
              id="from_name"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-400"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-400"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 h-32 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ContactMe;
