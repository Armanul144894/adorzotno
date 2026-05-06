"use client";

import {
    Home,
    LayoutGrid,
    ShoppingCart,
    Package,
    CircleUser,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../lib/useCart";
import SignInModal from "./SignInModal";

export default function MobileNav() {
    const pathname = usePathname();
    const { cartItems, setIsCartOpen } = useCart();
    const [isSignInOpen, setSignInOpen] = useState(false);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const homeActive = pathname === "/";
    const categoryActive = pathname === "/category" || pathname.startsWith("/category/");

    return (
        <>
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
                <div className="grid grid-cols-5 items-center h-16 px-2">

                    {/* Home */}
                    <Link
                        href="/"
                        className={`flex flex-col items-center justify-center gap-1 transition ${homeActive ? "text-primary" : "text-gray-500 hover:text-primary"
                            }`}
                    >
                        <Home size={20} strokeWidth={2.2} />
                        <span className="text-[11px] font-medium">Home</span>
                    </Link>

                    {/* Categories */}
                    <Link
                        href="/category"
                        className={`flex flex-col items-center justify-center gap-1 transition ${categoryActive ? "text-primary" : "text-gray-500 hover:text-primary"
                            }`}
                    >
                        <LayoutGrid size={20} />
                        <span className="text-[11px] font-medium">
                            Categories
                        </span>
                    </Link>

                    {/* Cart */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-primary transition"
                    >
                        <div className="relative">
                            <ShoppingCart size={20} />

                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        <span className="text-[11px] font-medium">Cart</span>
                    </button>

                    {/* Orders */}
                    <button className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-primary transition">
                        <Package size={20} />
                        <span className="text-[11px] font-medium">Orders</span>
                    </button>

                    {/* Account */}
                    <button
                        onClick={() => setSignInOpen(true)}
                        className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-primary transition"
                    >
                        <CircleUser size={20} />
                        <span className="text-[11px] font-medium">Account</span>
                    </button>
                </div>
            </nav>

            <SignInModal isSignInOpen={isSignInOpen} setSignInOpen={setSignInOpen} />
        </>
    );
}
