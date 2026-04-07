"use client";
import { ChevronDown, Menu, ShoppingCart, Users, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import CategoryOffcanvas from "./CategoryOffcanvas";
import SignInModal from "./SignInModal";
import Image from "next/image";
import LiveChatWidget from "./LiveChatWidget";
import HeaderSearch from "./HeaderSearch";
import { useCart } from "../../context/CartContext";

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
        <div className="container-fluid max-w-[1920px] mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
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

            {/* Search Bar */}
            <div className="hidden md:flex md:w-1/2 xl:w-2/3 justify-center">
              <HeaderSearch />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
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
                <Users size={24} className="text-gray-600" />
              </button>

              <div className="h-8 w-[3px] rounded bg-primary hidden md:block"></div>

              <button
                onClick={() => setSignInOpen(true)}
                className="relative bg-primary p-3 rounded cursor-pointer hidden md:block"
              >
                <div className="flex items-center font-bold gap-2 text-white">
                  <Users size={24} className="text-white" /> Sign In <ChevronDown />
                </div>
              </button>
            </div>
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
