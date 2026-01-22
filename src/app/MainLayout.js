"use client"
import React, { useState } from "react";
import "./globals.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

export default function MainLayout({ children }) {

  return (
    <div className="relative bg-[#f0f8ff]">
      <Header/>
      <div className="container-fluid max-w-[1920] mx-auto px-4 py-6 relative">
        <div className="flex lg:gap-6 items-start">

          {/* Sidebar - LEFT SIDE ON DESKTOP */}
          <SideBar />

          {/* Main Content */}
          <main className="flex-1 min-w-0 relative overflow-x-hidden">
            {children}
          </main>

        </div>
      </div>
      <Footer />
    </div>
  );
}
