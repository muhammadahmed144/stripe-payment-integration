import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async (
  customerEmail,
  orderDetails,
) => {
  try {
    const data = await resend.emails.send({
      from: "Store <onboarding@resend.dev>", // Production mein yahan tumhara apna domain aayega
      to: [customerEmail],
      subject: "Order Confirmation - Thank you for your purchase! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4F46E5;">Thank you for your order!</h2>
          <p>We have successfully received your payment. Your order is now being processed.</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <h3>Order Details:</h3>
          <p><strong>Total Amount:</strong> $${orderDetails.amount}</p>
          <p><strong>Currency:</strong> ${orderDetails.currency.toUpperCase()}</p>
          <p><strong>Status:</strong> Paid ✅</p>
          <p>We appreciate your business!</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", data);
  } catch (error) { 
    console.error("Failed to send email:", error);
  }
};
