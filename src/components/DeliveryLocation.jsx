"use client";

import { useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";

export default function DeliveryLocation() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Dhaka");

    const locations = [
        { name: "Dhaka", region: "Capital" },
        { name: "Chittagong", region: "Port City" },
        { name: "Sylhet", region: "North East" },
        { name: "Khulna", region: "South West" },
        { name: "Rajshahi", region: "North" },
        { name: "Barisal", region: "South" },
        { name: "Mymensingh", region: "Central" },
    ];

    const handleLocationSelect = (locationName) => {
        setSelectedLocation(locationName);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Desktop trigger: fixed-width compact selector for the main header row */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden sm:flex h-12 w-[220px] xl:w-[236px] shrink-0 items-center gap-3 rounded-lg border border-blue-100 bg-white/95 px-3 shadow-sm transition-all duration-200 hover:border-primary/20 hover:bg-blue-50/70"
            >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                    <p className="text-[11px] font-medium tracking-[0.16em] text-slate-400">
                        Delivery to
                    </p>
                    <p className="truncate whitespace-nowrap text-sm font-semibold text-slate-800">
                        {selectedLocation}
                    </p>
                </div>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Mobile trigger: full-width version that sits comfortably above mobile search */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-8 w-full items-center gap-2 rounded-md px-2 transition-all duration-200 hover:border-primary/30 hover:bg-blue-50/70 sm:hidden"
            >
                <div className="flex gap-2 justify-center items-center">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4" />
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.16em] text-slate-500">
                        Delivery to
                    </span>
                    <span className="truncate whitespace-nowrap text-sm font-semibold text-slate-800">
                        {selectedLocation}
                    </span>
                    <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </div>
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[260px] overflow-hidden rounded-lg border border-blue-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:w-[320px]">
                    {/* Shared dropdown panel for both desktop and mobile triggers */}
                    <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50 px-4 py-3">
                        <p className="text-sm font-semibold text-slate-900">Select delivery area</p>
                        <p className="mt-1 text-xs text-slate-500">
                            Choose where you want your order delivered
                        </p>
                    </div>

                    {/* Scroll area uses the same thin scrollbar style as the sidebar */}
                    <div className="max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        {locations.map((location, index) => (
                            <button
                                key={index}
                                onClick={() => handleLocationSelect(location.name)}
                                className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors duration-150 ${selectedLocation === location.name
                                    ? "bg-primary/20"
                                    : "hover:bg-slate-100"
                                    }`}
                            >
                                <div>
                                    <p className="font-medium text-slate-900">{location.name}</p>
                                    <p className="text-xs text-slate-500">{location.region}</p>
                                </div>
                                {selectedLocation === location.name && (
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                        <Check className="h-3.5 w-3.5" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2 border-t border-blue-100 bg-slate-50 px-4 py-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex-1 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex-1 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            )}

            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
