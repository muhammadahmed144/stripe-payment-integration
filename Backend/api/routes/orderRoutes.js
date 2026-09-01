import express from "express";
import { getOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrders);

router.get("/:id", getOrderById);

export default router;
