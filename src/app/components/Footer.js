import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 shadow-md mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & About */}
          <div>
            <Link href="/" className="inline-block">
              <div className="">
                <Image
                  src="/images/AdorzotnoLogo.png"
                  alt="Adorzotno Limited Logo"
                  width={200}
                  height={70}
                  className="w-full"
                  priority
                />
              </div>
            </Link>

            <p className="text-slate-600 text-sm mt-4 leading-relaxed">
              Affection for child, care for all.  
              Your trusted healthcare partner providing quality medical products and services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-xl text-slate-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQs</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-xl text-slate-800 mb-4">Customer Service</h4>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><Link href="#" className="hover:text-primary">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-primary">Returns</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xl text-slate-800 mb-4">Contact Us</h4>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-primary" />
                <span>+1-800-ADORZOTNO</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-primary" />
                <span>support@adorzotno.health</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary" />
                <span>123 Health St, Medical City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 mt-10 pt-6 text-center text-lg text-gray-700">
          © 2026 <span className="font-medium text-slate-700">Adorzotno Limited</span>. All rights reserved. Design & Developed By <Link href={'/'}>Tech Cloud Ltd.</Link>
        </div>
      </div>
    </footer>
  );
}
