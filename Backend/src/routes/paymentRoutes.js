import express from "express";
import {
  verifyPayment,
  createCheckoutSession,
} from "../controllers/paymentController.js";
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/verify", verifyPayment);

export default router;
