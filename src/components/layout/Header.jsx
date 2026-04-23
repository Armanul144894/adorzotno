"use client";
import { ChevronDown, MapPin, Menu, ShoppingCart, User, Users, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import CategoryOffcanvas from "./CategoryOffcanvas";
import SignInModal from "./SignInModal";
import Image from "next/image";
import LiveChatWidget from "./LiveChatWidget";
import HeaderSearch from "./HeaderSearch";
import { useCart } from "../../context/CartContext";
import DeliveryLocation from "../DeliveryLocation";

export default function Header() {
  const { cartItems, setIsCartOpen } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isSignInOpen, setSignInOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);

  return (
    <div className="sticky top-0 w-full z-50">
      <header className="bg-blue-50 shadow-md">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 w-60">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link href="/">
                <Image
                  src="/images/AdorzotnoLogo.png"
                  alt="adorzotno Logo"
                  width={140}
                  height={60}
                />
              </Link>
            </div>

            {/* location selector */}
            <div className="max-sm:hidden">
              <DeliveryLocation />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex md:w-1/2 xl:w-3/6 justify-center">
              <HeaderSearch />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Cart Button — now opens via CartContext */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <ShoppingCart size={24} className="text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="h-6 w-[2px] rounded bg-primary md:hidden"></div>

              <button
                onClick={() => setSignInOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer md:hidden"
              >
                <User size={24} className="text-gray-600" />
              </button>

              <div className="h-8 w-[3px] rounded bg-primary hidden md:block"></div>

              <button
                onClick={() => setSignInOpen(true)}
                className="group relative hidden overflow-hidden rounded-xl md:block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center gap-3 rounded-[14px] p-2.5 font-semibold text-slate-800">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-sm">
                    <User size={20} />
                  </span>
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                      Account
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      Sign In
                    </span>
                  </span>
                  <span className="text-lg text-slate-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary">
                    →
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="sm:hidden">
            <DeliveryLocation></DeliveryLocation>
          </div>

          {/* Mobile Search */}
          <div className="block md:hidden pt-2">
            <HeaderSearch />
          </div>

          <CategoryOffcanvas
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <SignInModal isSignInOpen={isSignInOpen} setSignInOpen={setSignInOpen} />

          <LiveChatWidget
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            chatExpanded={chatExpanded}
          />
        </div>
      </header>
    </div>
  );
}
