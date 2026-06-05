import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrderDetailsPageClient from "@/components/profile/OrderDetailsPageClient";

const redirectToSignIn = () => {
  redirect("/?signin=1&redirect=/profile");
};

export default async function OrderDetailsPage({ params }) {
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

    const { id } = await params;
    return <OrderDetailsPageClient orderId={id} />;
  } catch {
    redirectToSignIn();
  }
}

