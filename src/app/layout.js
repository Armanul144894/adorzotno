import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative bg-[#f0f8ff]`}
      >
        <Header />
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
      </body>
    </html>
  );
}
