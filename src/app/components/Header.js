"use client";
import { Mail, Menu, Phone, Search, ShoppingCart, User, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import CartOffcanvas from "./CartOffcanvas";
import CategoryOffcanvas from "./CategoryOffcanvas";
import SignInModal from "./SignInModal";

export default function Header({ cartCount = 3 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="sticky top-0 w-full z-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        {/* Top Bar */}
        <div className="bg-teal-600 text-white text-sm">
          <div className="container-fluid max-w-[1920px] mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone size={14} />
                <span className="hidden sm:inline">+1-800-MEDCARE</span>
              </span>
              <span className="hidden md:flex items-center gap-1">
                <Mail size={14} />
                support@medeasy.health
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">
                Free shipping on orders over $50
              </span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container-fluid max-w-[1920px] mx-auto px-4 py-4">
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
                <h1 className="text-2xl font-bold text-teal-600">MedEasy</h1>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for medicines, health products..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Demo Button */}
              <button
                onClick={() => setSignInOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
               <ShoppingCart size={24} className="text-gray-600" />
              </button>

              
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <ShoppingCart size={24} className="text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search
                className="absolute right-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Sidebar - Categories (LEFT SIDE) */}
          <CategoryOffcanvas
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Cart Offcanvas (RIGHT SIDE) */}
          <CartOffcanvas isOpen={isOpen} setIsOpen={setIsOpen} />

          <SignInModal isSignInOpen={isSignInOpen} setSignInOpen={setSignInOpen}/>
        </div>
      </header>
    </div>
  );
}
