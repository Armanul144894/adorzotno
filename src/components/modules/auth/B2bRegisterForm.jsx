"use client";

import React, { useMemo, useState } from "react";

const initialFormData = {
    fullName: "",
    mobileNumber: "",
    businessType: "",
    pharmacyName: "",
    drugLicenseNumber: "",
    drugLicenseFile: null,
    businessName: "",
    tradeLicenseNumber: "",
    tradeLicenseFile: null,
};

export default function B2bRegisterForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState({});

    const isPharmacy = formData.businessType === "Pharmacy";
    const isOthers = formData.businessType === "Others";

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleBusinessTypeChange = (event) => {
        const selectedType = event.target.value;

        setFormData((prev) => ({
            ...prev,
            businessType: selectedType,
            pharmacyName: "",
            drugLicenseNumber: "",
            drugLicenseFile: null,
            businessName: "",
            tradeLicenseNumber: "",
            tradeLicenseFile: null,
        }));

        setError({});
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        const selectedFile = files?.[0] ?? null;

        setFormData((prev) => ({
            ...prev,
            [name]: selectedFile,
        }));

        setError((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required.";
        }

        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = "Mobile Number is required.";
        }

        if (!formData.businessType) {
            newErrors.businessType = "Business Type is required.";
        }

        if (isPharmacy) {
            if (!formData.pharmacyName.trim()) {
                newErrors.pharmacyName = "Pharmacy Name is required.";
            }

            if (!formData.drugLicenseNumber.trim()) {
                newErrors.drugLicenseNumber = "Drug License Number is required.";
            }

            if (!formData.drugLicenseFile) {
                newErrors.drugLicenseFile = "Drug License file is required.";
            }
        }

        if (isOthers) {
            if (!formData.businessName.trim()) {
                newErrors.businessName = "Business Name is required.";
            }

            if (!formData.tradeLicenseNumber.trim()) {
                newErrors.tradeLicenseNumber = "Trade License Number is required.";
            }

            if (!formData.tradeLicenseFile) {
                newErrors.tradeLicenseFile = "Trade License file is required.";
            }
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isSubmitDisabled = useMemo(() => {
        if (
            !formData.fullName.trim() ||
            !formData.mobileNumber.trim() ||
            !formData.businessType
        ) {
            return true;
        }

        if (isPharmacy) {
            return (
                !formData.pharmacyName.trim() ||
                !formData.drugLicenseNumber.trim() ||
                !formData.drugLicenseFile
            );
        }

        if (isOthers) {
            return (
                !formData.businessName.trim() ||
                !formData.tradeLicenseNumber.trim() ||
                !formData.tradeLicenseFile
            );
        }

        return true;
    }, [formData, isPharmacy, isOthers]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        console.log({
            ...formData,
            drugLicenseFile: formData.drugLicenseFile?.name ?? null,
            tradeLicenseFile: formData.tradeLicenseFile?.name ?? null,
        });
    };

    const inputClassName =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10";

    const fileClassName =
        "block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-2 py-2 text-sm text-slate-600 cursor-pointer file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-secondary file:cursor-pointer";

    return (
        <div className="px-6 border rounded-xl py-8 border-slate-200 bg-slate-50/70">
            <h2 className="text-3xl font-semibold mb-4 text-center">
                B2B Registration
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label
                            htmlFor="fullName"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className={inputClassName}
                        />
                        {error.fullName && (
                            <p className="mt-2 text-sm text-red-500">{error.fullName}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="mobileNumber"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Mobile Number
                        </label>
                        <input
                            id="mobileNumber"
                            name="mobileNumber"
                            type="tel"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your mobile number"
                            className={inputClassName}
                        />
                        {error.mobileNumber && (
                            <p className="mt-2 text-sm text-red-500">
                                {error.mobileNumber}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="businessType"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Business Type
                        </label>
                        <select
                            id="businessType"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleBusinessTypeChange}
                            className={inputClassName}
                        >
                            <option value="">Select business type</option>
                            <option value="Pharmacy">Pharmacy</option>
                            <option value="Others">Others</option>
                        </select>
                        {error.businessType && (
                            <p className="mt-2 text-sm text-red-500">
                                {error.businessType}
                            </p>
                        )}
                    </div>
                </div>

                {isPharmacy && (
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="pharmacyName"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Pharmacy Name
                            </label>
                            <input
                                id="pharmacyName"
                                name="pharmacyName"
                                type="text"
                                value={formData.pharmacyName}
                                onChange={handleInputChange}
                                placeholder="Enter pharmacy name"
                                className={inputClassName}
                            />
                            {error.pharmacyName && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.pharmacyName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="drugLicenseNumber"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Drug License Number
                            </label>
                            <input
                                id="drugLicenseNumber"
                                name="drugLicenseNumber"
                                type="text"
                                value={formData.drugLicenseNumber}
                                onChange={handleInputChange}
                                placeholder="Enter drug license number"
                                className={inputClassName}
                            />
                            {error.drugLicenseNumber && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.drugLicenseNumber}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="drugLicenseFile"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Upload Drug License
                            </label>
                            <input
                                id="drugLicenseFile"
                                name="drugLicenseFile"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className={fileClassName}
                            />
                            {error.drugLicenseFile && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.drugLicenseFile}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {isOthers && (
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="businessName"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Business Name
                            </label>
                            <input
                                id="businessName"
                                name="businessName"
                                type="text"
                                value={formData.businessName}
                                onChange={handleInputChange}
                                placeholder="Enter business name"
                                className={inputClassName}
                            />
                            {error.businessName && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.businessName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="tradeLicenseNumber"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Trade License Number
                            </label>
                            <input
                                id="tradeLicenseNumber"
                                name="tradeLicenseNumber"
                                type="text"
                                value={formData.tradeLicenseNumber}
                                onChange={handleInputChange}
                                placeholder="Enter trade license number"
                                className={inputClassName}
                            />
                            {error.tradeLicenseNumber && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.tradeLicenseNumber}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="tradeLicenseFile"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Upload Trade License
                            </label>
                            <input
                                id="tradeLicenseFile"
                                name="tradeLicenseFile"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className={fileClassName}
                            />
                            {error.tradeLicenseFile && (
                                <p className="mt-2 text-sm text-red-500">
                                    {error.tradeLicenseFile}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                >
                    Submit Registration
                </button>
            </form>
        </div>

    );
}
