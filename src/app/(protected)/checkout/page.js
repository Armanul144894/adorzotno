import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Checkout from "@/components/checkout/Checkout";

export const metadata = {
  title: "Checkout | Adorzotno Limited",
  description:
    "Secure checkout at Adorzotno Limited. Complete your order with safe payment options and fast delivery.",
  keywords: [
    "checkout",
    "adorzotno",
    "online pharmacy checkout",
    "secure payment",
    "medical products order",
  ],
  openGraph: {
    title: "Checkout | Adorzotno Limited",
    description:
      "Complete your healthcare purchase securely at Adorzotno Limited.",
    url: "https://adorzotno.health/checkout",
    siteName: "Adorzotno Limited",
    images: [
      {
        url: "/images/AdorzotnoLogo.png",
        width: 1200,
        height: 630,
        alt: "Adorzotno Limited Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout | Adorzotno Limited",
    description:
      "Safe and secure checkout for healthcare products at Adorzotno Limited.",
    images: ["/images/AdorzotnoLogo.png"],
  },
};

const redirectToSignIn = () => {
  redirect("/?signin=1&redirect=/checkout");
};

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adorzotno_token")?.value?.trim();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!token || !apiBaseUrl) {
    redirectToSignIn();
  }

  try {
    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      redirectToSignIn();
    }

    const payload = await response.json();
    const user = payload?.data?.user;

    if (!user) {
      redirectToSignIn();
    }

    return <Checkout user={user} />;
  } catch {
    redirectToSignIn();
  }
}
