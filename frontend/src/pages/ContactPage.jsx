import React, { useState } from 'react';
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import { FaHeadphones } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import Footer from '../components/Footer/Footer';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <PrimaryNavbar />

      {/* Heading */}
      <h1
        className="
          flex items-center justify-center
          gap-2 md:gap-4
          text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 
          text-white font-semibold tracking-wide
          my-8 text-center select-none
        ">
        Contact Us <FaHeadphones className="text-rose-700 text-[clamp(1.5rem,5vw,2.5rem)]" />
      </h1>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 mb-8 md:mb-12 lg:mb-16">
        {/* Intro Header */}
        <div className="bg-zinc-900 text-white rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">Connect with us</h2>
          <p className="text-sm sm:text-base md:text-lg mt-2 text-gray-300">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Contact Info */}
          <div className="w-full md:w-1/2 bg-zinc-900 p-6 rounded-xl">
            <h2 className="text-xl sm:text-2xl font-semibold text-rose-100 mb-6">Get in Touch</h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-rose-600">Customer Support</h3>
              <p className="text-sm sm:text-base text-rose-100 mt-1">support@exclusive.com</p>
              <p className="text-sm sm:text-base text-rose-100">+1 (555) 123-4567</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-rose-600">Business Inquiries</h3>
              <p className="text-sm sm:text-base text-rose-100 mt-1">partnerships@exclusive.com</p>
              <p className="text-sm sm:text-base text-rose-100">+91 9999999999</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-rose-600">Headquarters</h3>
              <p className="text-sm sm:text-base text-rose-100 mt-1">123 Fashion Street</p>
              <p className="text-sm sm:text-base text-rose-100">Apparel District</p>
              <p className="text-sm sm:text-base text-rose-100">New York, NY 10001</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-3/5 bg-zinc-900 p-6 rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white text-sm sm:text-base mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white text-sm sm:text-base mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white text-sm sm:text-base mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md outline-none"
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="order-issue">Order Issue</option>
                  <option value="return-exchange">Return & Exchange</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-white text-sm sm:text-base mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md outline-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-rose-800 hover:bg-rose-700 text-white py-3 rounded-md transition"
              >
                Send Message <RiSendPlaneLine />
              </button>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-rose-100 rounded-xl p-6 mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-rose-800 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-rose-700">How long does shipping take?</h3>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                Standard shipping takes 3-5 business days. Express options are available at checkout.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-rose-700">What is your return policy?</h3>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                We offer a 30-day return policy on all unworn items with original tags attached.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-rose-700">Do you ship internationally?</h3>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                Yes, we ship to over 50 countries worldwide. International shipping rates apply.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
