import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className="bg-gray-800 text-white mt-8">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <Link href="/">
                                <Image
                                    src="/images/AdorzotnoLogo.png"
                                    alt="adorzotno Logo"
                                    width={200}
                                    height={60}
                                />
                            </Link>
                            <p className="text-gray-400 text-sm">
                                Your trusted online pharmacy for quality healthcare products and medicines.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                                <li><Link href="#" className="hover:text-white">FAQs</Link></li>
                                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Customer Service</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="#" className="hover:text-white">Shipping Info</Link></li>
                                <li><Link href="#" className="hover:text-white">Returns</Link></li>
                                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-white">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contact Us</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <Phone size={16} />
                                    +1-800-ADORZOTNO
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={16} />
                                    support@adorzotno.health
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    123 Health St, Medical City
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                        © 2026 adorzotno. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
