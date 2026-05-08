"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import SocialLoginButtons from "./SocialLoginButtons";

export default function LoginForm({
  loginMethod,
  setLoginMethod,
  onSubmit,
  onToggleSignUp,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  return (
    <>
      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setLoginMethod("phone")}
          className={`flex-1 rounded-lg px-4 py-2 font-semibold transition ${loginMethod === "phone"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Phone size={18} className="mr-2 inline" />
          Phone
        </button>
        <button
          type="button"
          onClick={() => setLoginMethod("email")}
          className={`flex-1 rounded-lg px-4 py-2 font-semibold transition ${loginMethod === "email"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Mail size={18} className="mr-2 inline" />
          Email
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {loginMethod === "phone" && (
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Your Contact Number
            </label>

            <div className="flex gap-2 relative">
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 pl-[68px] transition focus:border-teal-500 focus:outline-none"
                maxLength="11"
                {...register("phoneNumber", {
                  validate: (value) =>
                    loginMethod !== "phone" ||
                    /^01\d{9}$/.test(value) ||
                    "Enter a valid 11-digit phone number",
                  onChange: (e) => {
                    e.target.value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 11);
                  },
                })}
              />
              <span className="absolute left-4 top-1/2 flex -translate-y-1/2 text-gray-400 items-center gap-1">
                <Phone size={18} />
                <span>+88</span>
              </span>
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        )}

        {loginMethod === "email" && (
          <>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 transition focus:border-teal-500 focus:outline-none"
                {...register("email", {
                  validate: (value) =>
                    loginMethod !== "email" ||
                    /\S+@\S+\.\S+/.test(value) ||
                    "Enter a valid email address",
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 pr-12 transition focus:border-teal-500 focus:outline-none"
                  {...register("password", {
                    validate: (value) =>
                      loginMethod !== "email" ||
                      value.length >= 6 ||
                      "Password must be at least 6 characters",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </>
        )}

        <div className="mb-6">
          <p className="text-xs text-gray-600">
            By continuing you agree to{" "}
            <a href="#" className="text-primary hover:underline">
              Terms & Conditions
            </a>
            ,{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            &{" "}
            <a href="#" className="text-primary hover:underline">
              Refund-Return Policy
            </a>
          </p>
        </div>

        <button
          type="submit"
          className="group mb-4 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary via-primary to-secondary px-5 py-2 font-semibold text-white transition-all duration-300 hover:shadow-[0_14px_30px_rgba(14,165,233,0.10)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/25">
            {loginMethod === "phone" ? <Phone size={16} /> : <Lock size={16} />}
          </span>
          <span>{loginMethod === "phone" ? "Send OTP" : "Sign In"}</span>
          <span className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </form>

      {loginMethod === "email" && (
        <div className="mb-4 text-center">
          <button type="button" className="text-sm text-primary hover:underline">
            Forgot Password?
          </button>
        </div>
      )}

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">or continue with</span>
        </div>
      </div>

      <SocialLoginButtons />

      <div className="text-center text-sm">
        <p className="text-gray-600">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onToggleSignUp}
            className="font-semibold text-primary hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
}
