import dotenv from "dotenv";
import Stripe from "stripe";
import orderModel from "../models/orders.js";
import { normalizedCartItems } from "../utils/helper.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const order = await orderModel.findOne({
      stripeCheckoutSessionId: session.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = "paid";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCheckoutSession = async (req, res) => {
  try {
    const { items, customerEmail } = req.body;

    const normalizedItems = normalizedCartItems(items);

    const amountTotal = normalizedItems.reduce(
      (total, item) => total + item.unitAmount * item.quantity,
      0,
    );

    const order = await orderModel.create({
      customerEmail: customerEmail || null,

      items: normalizedItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitAmount: item.unitAmount,
      })),

      amountTotal,
      currency: "usd",
      status: "pending",
    });
    console.log(normalizedItems);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      managed_payments: {
        enabled: false,
      },

      line_items: normalizedItems.map((item) => ({
        price_data: {
          currency: item.currency,

          product_data: {
            name: item.name,
          },

          unit_amount: item.unitAmount,
        },

        quantity: item.quantity,
      })),

      customer_email: customerEmail || undefined,

      success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,

      metadata: {
        orderId: Date.now(),
      },

      payment_intent_data: {
        metadata: {
          orderId: Date.now(),
        },
      },
    });

    order.stripeCheckoutSessionId = session.id;
    await order.save();

    return res.status(201).json({
      success: true,
      checkoutUrl: session.url,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Create checkout session error:", error);

    return res.status(404).json({
      success: false,
      message: error.message || "Unable to create checkout session",
    });
  }
};
