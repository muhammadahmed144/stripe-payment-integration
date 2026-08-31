import { getPublicProducts } from "../utils/helper.js";

export const getProducts = (req, res) => {
  return res.status(200).json({
    success: true,
    products: getPublicProducts(),
  });
};
