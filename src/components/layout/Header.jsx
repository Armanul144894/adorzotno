"use client";

import { ChevronDown, LogOut, Menu, ShoppingCart, User, X, } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import CategoryOffcanvas from "./CategoryOffcanvas";
import HeaderCategoryMenu from "./HeaderCategoryMenu";
import SignInModal from "../modules/auth/SignInModal";
import HeaderSearch from "./HeaderSearch";
import { useCart } from "../../lib/useCart";
import DeliveryLocation from "../DeliveryLocation";
import allCategories from "../../../public/data/category";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cartItems, setIsCartOpen } = useCart();
  const { user, isAuthenticated, isHydrated } = useSelector((state) => state.auth);
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutMutation();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shouldOpenSignIn = searchParams.get("signin") === "1";
  const redirectPath = searchParams.get("redirect");
  const signInRequestKey = shouldOpenSignIn
    ? `${pathname}?${searchParams.toString()}`
    : "";
  const firstName =
    isHydrated && isAuthenticated
      ? user?.name?.trim()?.split(" ")[0] || "Sign In"
      : "Sign In";

  const [manualSignInOpen, setManualSignInOpen] = useState(false);
  const [dismissedSignInKey, setDismissedSignInKey] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const categoryMenuRef = useRef(null);
  const desktopAccountMenuRef = useRef(null);
  const mobileAccountMenuRef = useRef(null);

  useEffect(() => {
    const isVisibleElement = (element) =>
      Boolean(element && element.offsetParent !== null);

    const handlePointerDown = (event) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setCategoryMenuOpen(false);
      }

      if (
        isVisibleElement(desktopAccountMenuRef.current) &&
        desktopAccountMenuRef.current &&
        !desktopAccountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }

      if (
        isVisibleElement(mobileAccountMenuRef.current) &&
        mobileAccountMenuRef.current &&
        !mobileAccountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setCategoryMenuOpen(false);
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const autoOpenSignIn =
    shouldOpenSignIn &&
    isHydrated &&
    !isAuthenticated &&
    dismissedSignInKey !== signInRequestKey;

  const isSignInOpen = manualSignInOpen || autoOpenSignIn;

  const handleSetSignInOpen = (nextOpen) => {
    setManualSignInOpen(nextOpen);

    if (!nextOpen && autoOpenSignIn) {
      setDismissedSignInKey(signInRequestKey);
    }
  };

  const handleAccountClick = () => {
    if (!isHydrated || !isAuthenticated) {
      setManualSignInOpen(true);
      return;
    }

    setAccountMenuOpen((open) => !open);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap();
      // toast.success(response?.message || "Logout successful");
      setAccountMenuOpen(false);
      router.push("/");
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed. Please try again.");
    }
  };

  const handleProfileNavigate = () => {
    setAccountMenuOpen(false);
    router.push("/profile");
  };

  const handleLoginSuccess = () => {
    setManualSignInOpen(false);

    if (redirectPath) {
      router.push(redirectPath);
      return;
    }

    if (pathname === "/" && shouldOpenSignIn) {
      router.replace("/");
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-1.5 sm:py-1">
          <div className="flex items-center justify-between gap-4">
            <div
              ref={categoryMenuRef}
              className="relative flex w-60 items-center justify-between gap-2"
            >
              <button
                onClick={() => setCategoryMenuOpen((open) => !open)}
                className="max-lg:hidden rounded-lg p-3 text-primary transition-colors duration-300 hover:bg-primary/5"
              >
                {categoryMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} strokeWidth={2.5} />
                )}
              </button>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded p-2 hover:bg-gray-100 lg:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <Link href="/" className="hidden sm:block">
                <Image
                  src="/images/AdorzotnoLogo.png"
                  alt="adorzotno Logo"
                  width={150}
                  height={60}
                />
              </Link>

              <Link href="/" className="sm:hidden">
                <Image
                  src="/images/AdorzotnoLogo.png"
                  alt="adorzotno Logo"
                  width={120}
                  height={60}
                />
              </Link>

              <div></div>

              <HeaderCategoryMenu
                isOpen={categoryMenuOpen}
                onClose={() => setCategoryMenuOpen(false)}
                categories={allCategories}
              />
            </div>

            <div className="max-sm:hidden">
              <DeliveryLocation />
            </div>

            <div className="hidden justify-center md:flex md:w-1/2 xl:w-3/6">
              <HeaderSearch />
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer rounded-lg p-2.5 transition-colors duration-300 hover:bg-primary/5"
              >
                <ShoppingCart size={24} className="text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="h-6 w-[2px] rounded bg-primary md:hidden"></div>

              <div ref={mobileAccountMenuRef} className="relative md:hidden">
                <button
                  onClick={handleAccountClick}
                  className="relative cursor-pointer rounded-lg p-2.5 transition-colors duration-300 hover:bg-primary/5"
                >
                  <User size={24} className="text-gray-600" />
                </button>

                {isHydrated && isAuthenticated && accountMenuOpen && (
                  <div
                    className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={handleProfileNavigate}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-primary/5"
                    >
                      <User size={18} className="text-primary" />
                      Profile
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <LogOut size={18} />
                      {isLoggingOut ? "Logging out..." : "Log Out"}
                    </button>
                  </div>
                )}
              </div>

              <div className="hidden h-8 w-[3px] rounded bg-primary md:block"></div>

              <div ref={desktopAccountMenuRef} className="relative hidden md:block">
                <button
                  onClick={handleAccountClick}
                  className="group relative overflow-hidden rounded-xl"
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
                        {firstName}
                      </span>
                    </span>
                    <span className="text-slate-400 transition-all duration-300 group-hover:text-primary">
                      {isHydrated && isAuthenticated ? (
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${accountMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                      ) : (
                        <span className="text-lg">→</span>
                      )}
                    </span>
                  </div>
                </button>

                {isHydrated && isAuthenticated && accountMenuOpen && (
                  <div
                    className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="border-b border-gray-100 px-3 py-2">
                      <p className="text-sm font-semibold text-slate-800">
                        {user?.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleProfileNavigate}
                      className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-primary/5"
                    >
                      <User size={18} className="text-primary" />
                      Profile
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <LogOut size={18} />
                      {isLoggingOut ? "Logging out..." : "Log Out"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sm:hidden">
            <DeliveryLocation />
          </div>

          <div className="block pt-2 md:hidden">
            <HeaderSearch />
          </div>

          <CategoryOffcanvas
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <SignInModal
            isSignInOpen={isSignInOpen}
            setSignInOpen={handleSetSignInOpen}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </header>
    </div>
  );
}
