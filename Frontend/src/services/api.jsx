import axios from "axios";

export const api = axios.create({
  baseURL: "https://muhammadahmed144-stripe-payment-int.vercel.app",
});

