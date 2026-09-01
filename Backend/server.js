import express from "express";
import cors from "cors";
import connectDB from "./api/config/dibi.js";
import dns from "dns";
import dotenv from "dotenv";
import paymentRoutes from "./api/routes/paymentRoutes.js";
import productRoutes from "./api/routes/productRoutes.js";
import orderRoutes from "./api/routes/orderRoutes.js";
import stripeWebhook from "./api/routes/stripeWebhookRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

const app = express();

app.use(cors());

app.use(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

app.use(express.json());

app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Application runing on port ${PORT}`);
    });
  } catch (error) {
    console.error("Application failed to start:", error.message);
  }
};

startServer();
