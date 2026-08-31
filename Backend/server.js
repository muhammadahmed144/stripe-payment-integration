import express from "express";
import cors from "cors";
import connectDB from "./config/dibi.js";
import dns from "dns";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { stripeWebhookHandler } from "./controllers/stripeWebhookHandler.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();

const app = express();

app.use(cors());

app.post(
  "/api/stripe/webhook",
  express.raw({type: "application/json"}),
  stripeWebhookHandler
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
