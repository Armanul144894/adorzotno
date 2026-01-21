import {
  Building2,
  ChevronRight,
  Home,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      {/* Contact Content */}
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href={"/"}>
            <button className="flex items-center gap-1 hover:text-teal-600">
              <Home size={16} />
              Home
            </button>
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-800 font-semibold">Contact Us</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-12 mb-8 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to us anytime!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-teal-600" size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">Mon-Fri: 9AM - 6PM</p>
            <Link
              href="tel:+18002633227"
              className="text-teal-600 font-semibold hover:text-teal-700"
            >
              +1-800-MEDCARE
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-blue-600" size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
            <Link
              href="mailto:support@medeasy.health"
              className="text-teal-600 font-semibold hover:text-teal-700"
            >
              support@medeasy.health
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="text-purple-600" size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-2">Our Main Office</p>
            <p className="text-teal-600 font-semibold">
              123 Health Street
              <br />
              Medical City, MC 12345
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="How can we help you?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition font-semibold flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Find Us Here
          </h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-3" />
              <p className="text-lg">Map Location</p>
              <p className="text-sm">
                123 Health Street, Medical City, MC 12345
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
