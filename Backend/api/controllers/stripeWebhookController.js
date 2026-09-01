import Stripe from "stripe";
import Order from "../models/orders.js";
import webhookEventModel from "../models/webhookEvent.js";
import { sendOrderConfirmationEmail } from "../utils/sendEmail.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  console.log("Is req.body a Buffer?", Buffer.isBuffer(req.body));
  console.log("Req.body type:", typeof req.body);
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // .env mein webhook secret dalna hoga

  let event;

  try {
    // Stripe signature verify kar raha hai ke request asli hai ya nahi
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Check karo ke payment successful ho gayi hai ya nahi
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const customerEmail = session.customer_details.email;
    const amount = session.amount_total / 100; // cents se dollars mein convert
    const currency = session.currency;

    // 📧 Email bhej do (Background mein chalne do taake webhook block na ho)
    sendOrderConfirmationEmail(customerEmail, { amount, currency });

    try {
      // Yahan database mein order status update kar do
      // Example: Session ID ya metadata ke zariye order dhoond kar paid karain
      await Order.findOneAndUpdate(
        { stripeCheckoutSessionId: session.id },
        { status: "Paid", customerEmail: session.customer_details.email },
      );

      // 2. Phir webhook event ko alag se database mein save karo
      await webhookEventModel.create({
        eventId: event.id,
        eventType: event.type,
        payload: event,
      });

      console.log(`Order updated successfully for session: ${session.id}`);
    } catch (dbError) {
      console.error("Database update failed:", dbError);
    }
  }

  res.status(200).json({ received: true });
};
