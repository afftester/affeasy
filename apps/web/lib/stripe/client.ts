// Stripe Client SDK
import { Stripe as StripeProps, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<StripeProps | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const isProd = process.env.NODE_ENV === "production";
    const publishableKey = isProd
      ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE
      : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    stripePromise = loadStripe(publishableKey ?? "");
  }

  return stripePromise;
};
