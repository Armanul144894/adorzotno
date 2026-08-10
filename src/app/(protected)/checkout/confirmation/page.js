import CheckoutConfirmationPage from "@/components/checkout/CheckoutConfirmationPage";
import { requireAuthenticatedUser } from "@/lib/serverAuth";

export const metadata = {
  title: "Order Confirmation | Adorzotno Limited",
  description:
    "Thank you for your order. View your order confirmation and summary at Adorzotno Limited.",
};

export default async function CheckoutConfirmationRoute({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  await requireAuthenticatedUser("/checkout/confirmation");

  return (
    <CheckoutConfirmationPage
      orderId={resolvedSearchParams?.id || ""}
      orderNumber={resolvedSearchParams?.order || ""}
    />
  );
}

