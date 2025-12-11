import React, { useRef, useState, useEffect } from "react";
import Layout from "../../Layout/layout";
import Snackbar from "../../Components/Snackbar";
import emailjs from "@emailjs/browser";
import { SVGs } from "../../Shared/icons";

const ContactMe: React.FC = () => {
  const INITIAL_STATE = {
    from_name: "",
    email: "",
    message: "",
  };

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const serviceId = "service_d5cjsva";
  const templateId = "template_fviwbek";
  const publicKey = "hn9BMW67XuDv0hgOr";

  const [formData, setFormData] = useState(INITIAL_STATE);
  const formRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
    setIsLoading(true);

    if (formRef.current) {
      emailjs
        .sendForm(serviceId, templateId, formRef.current, {
          publicKey: publicKey,
        })
        .then(
          () => {
            setIsSnackbarOpen(true);
            setFormData(INITIAL_STATE);
            setIsLoading(false);

            setTimeout(() => {
              setIsSnackbarOpen(false);
            }, 5000);
          },
          (error) => {
            console.log("FAILED...", error);
            setIsLoading(false);
          }
        );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 py-16 px-6 md:px-16 lg:px-24">
        <div
          className={`max-w-7xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-500/20 px-4 py-1 rounded-full text-blue-400 text-sm font-medium mb-4">
              Get in touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              CONTACT ME
            </h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto mt-6"></div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? Fill out the
              form below, and I'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="flex flex-col lg:flex-row justify-between gap-12 mt-10">
            {/* Left side - contact info */}
            <div className="w-full lg:w-2/5 space-y-8">
              <div className="bg-slate-800/80 p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      {SVGs().Email}
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium">Email</h4>
                      <a
                        href="mailto:ashishume@gmail.com"
                        className="text-blue-400 hover:underline"
                      >
                        ashishume@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      {SVGs().Location}
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium">Location</h4>
                      <p className="text-white">Bengaluru, India</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      {SVGs().Briefcase}
                    </div>
                    <div>
                      <h4 className="text-gray-300 font-medium">Work</h4>
                      <p className="text-white">Software Engineer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background elements similar to profile section */}
              <div className="relative hidden lg:block h-64">
                <div className="absolute left-1/4 top-1/2 w-20 h-20 bg-blue-500/30 rounded-full blur-md"></div>
                <div className="absolute right-1/4 bottom-0 w-16 h-16 bg-purple-500/20 rounded-full blur-md"></div>
              </div>
            </div>

            {/* Right side - form */}
            <div className="w-full lg:w-3/5">
              <div className="bg-slate-800/80 p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      className="block mb-2 text-gray-300"
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
                      className="w-full p-3 rounded-lg bg-slate-700/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-gray-300" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-slate-700/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className="block mb-2 text-gray-300"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 h-40 rounded-lg bg-slate-700/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 w-full flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        {SVGs().Spinner}
                        Sending...
                      </>
                    ) : (
                      <>Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSnackbarOpen && (
        <Snackbar message="Message sent successfully! I'll get back to you soon." />
      )}
    </Layout>
  );
};

export default ContactMe;
