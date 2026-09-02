import axios from "axios";

export const api = axios.create({
  baseURL: "https://stripe-payment-integration-gamma.vercel.app/api",
});

