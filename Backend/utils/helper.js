const PRODUCT_CATALOG = {
  "node-course": {
    name: "Node.js Backend Masterclass",
    unitAmount: 4900,
    currency: "usd",
    description: "this is nodejs masterclasses"
  },
  "react-course": {
    name: "React Fundamentals",
    unitAmount: 2900,
    currency: "usd",
    description: "this is react fundamentals"
  },
  "mern-course": {
    name: "Complete MERN Stack Program",
    unitAmount: 7900,
    currency: "usd",
    description: "this is complete mern stack progam"
  },
  
};

export function normalizedCartItems(clientItems) {
  if (!Array.isArray(clientItems) || clientItems.length === 0) {
    throw new Error("At least one item is required");
  }

  return clientItems.map((clientItem) => {
    const product = PRODUCT_CATALOG[clientItem.productId];

    if (!product) {
      throw new Error(`Invalid product ${clientItem.productId}`);
    }

    const quantity = Number(clientItem.quantity);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error("Quantity must be between 1 and 10");
    }

    return {
      productId: clientItem.productId,
      name: product.name,
      unitAmount: product.unitAmount,
      currency: product.currency,
      quantity,
    };
  });
}

export function getPublicProducts() {
  return Object.entries(PRODUCT_CATALOG).map(([id, product]) => ({
    id,
    name: product.name,
    description: product.description,
    unitAmount: product.unitAmount,
    currency: product.currency,
  }));
}
