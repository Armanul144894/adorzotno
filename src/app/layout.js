// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import MainLayout from "@/components/layout/MainLayout";

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
          <MainLayout>
            {children}
          </MainLayout>
        </CartProvider>
      </body>
    </html>
  );
}
