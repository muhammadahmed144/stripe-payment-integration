export default function ProductCard({
  product,
  onBuy,
  buying,
  index,
}) {
  const price = Number(product.unitAmount || 0) / 100;

  const features = [
    "Lifetime access",
    "Practical examples",
    "Developer focused",
  ];

  return (
    <article className={`product-card product-card-${index % 3}`}>

      <div className="product-card-top">

        <div className="product-category">
          {index === 0
            ? "BACKEND"
            : index === 1
            ? "FRONTEND"
            : "FULL STACK"}
        </div>

        <div className="product-number">
          0{index + 1}
        </div>

      </div>

      <div className="product-icon">

        {index === 0 && "N"}
        {index === 1 && "R"}
        {index >= 2 && "M"}

      </div>

      <h3>{product.name}</h3>

      <p className="product-description">
        {product.description}
      </p>

      <div className="product-features">

        {features.map((feature) => (
          <div className="product-feature" key={feature}>
            <span>✓</span>
            {feature}
          </div>
        ))}

      </div>

      <div className="product-card-bottom">

        <div className="product-price">
          <span>${price.toFixed(0)}</span>
          <small>USD / one-time</small>
        </div>

        <button
          className="buy-button"
          onClick={() => onBuy(product)}
          disabled={buying}
        >
          {buying ? (
            <>
              <span className="button-spinner"></span>
              Processing...
            </>
          ) : (
            <>
              Buy now
              <span>→</span>
            </>
          )}
        </button>

      </div>

    </article>
  );
}