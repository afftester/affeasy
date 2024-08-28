import Stripe from "stripe";

const isProd = process.env.NODE_ENV === "production";
const secretKey = isProd
  ? process.env.STRIPE_SECRET_KEY_LIVE
  : process.env.STRIPE_SECRET_KEY;

export const stripe = new Stripe(secretKey ?? "", {
  apiVersion: "2022-11-15",
  appInfo: {
    name: "AffEasy",
    version: "0.1.0",
  },
});

export async function cancelSubscription(customer?: string) {
  if (!customer) return;
  try {
    const subscriptionId = await stripe.subscriptions
      .list({
        customer,
      })
      .then((res) => res.data[0].id);
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
      cancellation_details: {
        comment: "Customer deleted their Dub workspace.",
      },
    });
  } catch (error) {
    console.log("Error cancelling Stripe subscription", error);
    return;
  }
}
