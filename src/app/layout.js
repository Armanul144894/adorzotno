// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";
import CartOffcanvas from "../components/layout/CartOffcanvas";
import { CartProvider } from "../components/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Adorzotno Limited | Medicine E-commerce App",
  description:
    "Secure contact at Adorzotno Limited. Complete your order with safe payment options and fast delivery.",
  keywords: [
    "contact",
    "adorzotno",
    "online pharmacy contact",
    "secure payment",
    "medical products order",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-white`}
      >
        <CartProvider>
          <Header />
          <CartOffcanvas />
          <div className="container-fluid max-w-[1920] mx-auto relative">
            <div className="flex lg:gap-0 items-start">
              {/* Sidebar - LEFT SIDE ON DESKTOP */}
              <SideBar />

              {/* Main Content */}
              <main className="flex-1 min-w-0 relative overflow-x-hidden px-4 py-6 border-l border-blue-50">
                {children}
              </main>
            </div>
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
