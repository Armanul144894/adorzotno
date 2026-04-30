"use client"

import React, { useState } from "react";
import "../../app/globals.css";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import CartOffcanvas from "./CartOffcanvas";
import ScrollToTop from "../ScrollToTop";
import StickyCartButton from "../StickyCartButton";
import LiveChatWidget from "./LiveChatWidget";

export default function MainLayout({ children }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CartOffcanvas />
      <div className="container mx-auto relative flex-1">
        <div className="flex lg:gap-0 items-start">
          {/* Sidebar - LEFT SIDE ON DESKTOP */}
          {/* <SideBar /> */}

          {/* Main Content */}
          <main className="flex-1 min-w-0 relative overflow-x-hidden px-4 py-6 border-blue-50">
            {children}

            <ScrollToTop />
            <StickyCartButton />
            <LiveChatWidget
              chatOpen={chatOpen}
              setChatOpen={setChatOpen}
              chatExpanded={chatExpanded}
            />

          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
