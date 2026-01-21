"use client";
import React, { useState } from "react";
import { X, Phone, Mail, Facebook, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignInModal({ isSignInOpen, setSignInOpen }) {
  const [loginMethod, setLoginMethod] = useState("phone"); // 'phone' or 'email'
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSendOTP = () => {
    if (loginMethod === "phone" && phoneNumber) {
      alert(`OTP sent to +88${phoneNumber}`);
    } else if (loginMethod === "email" && email) {
      alert(`Verification link sent to ${email}`);
    }
  };

  return (
    <div className="">
      {/* Overlay */}
      {isSignInOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSignInOpen(false)}
        />
      )}

      {/* Modal Overlay */}
      {isSignInOpen && (
        <div className={`fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4 transform transition-transform duration-300
        ${isSignInOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-fadeIn">
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Branding */}
              <div className="bg-gradient-to-br hidden md:block from-teal-500 to-cyan-600 p-8 md:w-2/5 text-white relative overflow-hidden">
                {/* Close Button - Mobile */}
                <button
                  onClick={() => setSignInOpen(false)}
                  className="md:hidden absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
                >
                  <X size={24} />
                </button>

                {/* Logo and Tagline */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-4xl">💊</div>
                    <h1 className="text-3xl font-bold">MedEasy</h1>
                  </div>
                  <p className="text-teal-100 text-lg">
                    দেশের সেবায় ডিজিটাল লেয়ার স্বাস্থ্য
                  </p>
                  <p className="text-white/90 mt-2">
                    এখন আপনার সকল সব মানের
                    <br />
                    ডিজিটাল হেলথ ফার্মেসি
                  </p>
                </div>

                {/* Phone Mockup Image */}
                <div className="flex justify-center mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=500&fit=crop"
                    alt="MedEasy App"
                    className="rounded-2xl shadow-xl max-w-[200px] border-4 border-white/20"
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
              </div>

              {/* Right Side - Sign In Form */}
              <div className="p-8 md:w-3/5 relative">
                {/* Close Button - Desktop */}
                <button
                  onClick={() => setSignInOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} className="text-gray-600" />
                </button>

                <div className="max-w-md mx-auto">
                  {/* Header */}
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {isSignUp ? "Create Account" : "PLEASE LOG IN"}
                    </h2>
                    <p className="text-gray-600">
                      {isSignUp
                        ? "Sign up to get started"
                        : "Welcome back! Please enter your details"}
                    </p>
                  </div>

                  {/* Login Method Toggle */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setLoginMethod("phone")}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                        loginMethod === "phone"
                          ? "bg-teal-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Phone size={18} className="inline mr-2" />
                      Phone
                    </button>
                    <button
                      onClick={() => setLoginMethod("email")}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                        loginMethod === "email"
                          ? "bg-teal-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Mail size={18} className="inline mr-2" />
                      Email
                    </button>
                  </div>

                  {/* Phone Number Input */}
                  {loginMethod === "phone" && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Contact Number
                      </label>
                      <div className="flex gap-2">
                        <div className="bg-gray-100 px-4 py-3 rounded-lg font-semibold text-gray-700">
                          +88
                        </div>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition"
                          maxLength="11"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Input */}
                  {loginMethod === "email" && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition"
                      />
                    </div>
                  )}

                  {/* Password Input (for Email login or Sign Up) */}
                  {(loginMethod === "email" || isSignUp) && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Terms and Privacy */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-600">
                      By continuing you agree to{" "}
                      <a href="#" className="text-teal-600 hover:underline">
                        Terms & Conditions
                      </a>
                      ,{" "}
                      <a href="#" className="text-teal-600 hover:underline">
                        Privacy Policy
                      </a>{" "}
                      &{" "}
                      <a href="#" className="text-teal-600 hover:underline">
                        Refund-Return Policy
                      </a>
                    </p>
                  </div>

                  {/* Send OTP / Sign In Button */}
                  <button
                    onClick={handleSendOTP}
                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition mb-4"
                  >
                    {loginMethod === "phone"
                      ? "Send OTP"
                      : isSignUp
                        ? "Sign Up"
                        : "Sign In"}
                  </button>

                  {/* Forgot Password */}
                  {loginMethod === "email" && !isSignUp && (
                    <div className="text-center mb-4">
                      <button className="text-teal-600 text-sm hover:underline">
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">
                        or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="flex gap-3 mb-6">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#1877F2"
                          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                        />
                      </svg>
                      <span className="font-semibold text-gray-700">
                        Facebook
                      </span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#EA4335"
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        />
                      </svg>
                      <span className="font-semibold text-gray-700">
                        Google
                      </span>
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center">
                    <p className="text-gray-600">
                      {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                      <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-teal-600 font-semibold hover:underline"
                      >
                        {isSignUp ? "Sign In" : "Sign Up"}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}
