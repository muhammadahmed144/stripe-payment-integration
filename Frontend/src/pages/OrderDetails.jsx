import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import toast from "react-hot-toast";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOrderDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(`/orders/${id}`);

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.message || "Unable to load order details");
      }
    } catch (err) {
      console.error("Order details error:", err);

      setError(err?.response?.data?.message || "Unable to load order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="order-details-page">
        <div className="order-details-container">
          <div className="details-loading">
            <div className="details-spinner"></div>
            <h3>Loading order details</h3>
            <p>Please wait while we fetch your order.</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="order-details-page">
        <div className="order-details-container">
          <div className="details-error">
            <div className="error-circle">!</div>

            <h2>Order not found</h2>

            <p>{error}</p>

            <div className="error-actions">
              <button onClick={getOrderDetails}>Try again</button>

              <Link to="/orders">Back to orders</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!order) return null;

  const amount = Number(order.amount || 0) / 100;

  const isPaid = order.status === "paid" || order.paymentStatus === "paid";

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const formattedTime = order.createdAt
    ? new Date(order.createdAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "—";

  return (
    <main className="order-details-page">
      <div className="order-details-container">
        {/* BACK */}
        <Link to="/orders" className="details-back">
          <span>←</span>
          Back to orders
        </Link>

        {/* HEADER */}
        <div className="details-header">
          <div>
            <span className="details-eyebrow">ORDER DETAILS</span>

            <h1>Order #{order._id?.slice(-8).toUpperCase()}</h1>

            <p>
              Purchased on {formattedDate} at {formattedTime}
            </p>
          </div>

          <div
            className={`details-status ${
              isPaid ? "status-paid" : "status-pending"
            }`}
          >
            <span className="status-dot"></span>
            {isPaid ? "Payment successful" : "Payment pending"}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="details-grid">
          {/* LEFT */}
          <div className="details-main">
            {/* PAYMENT CARD */}
            <section className="details-card payment-card">
              <div className="card-heading">
                <div className="heading-icon">$</div>

                <div>
                  <h2>Payment summary</h2>
                  <p>Your transaction information</p>
                </div>
              </div>

              <div className="payment-total">
                <span>Total paid</span>

                <strong>${amount.toFixed(2)}</strong>
              </div>

              <div className="payment-rows">
                <div className="payment-row">
                  <span>Order status</span>

                  <strong className={isPaid ? "text-success" : "text-warning"}>
                    {order.status || "Pending"}
                  </strong>
                </div>

                <div className="payment-row">
                  <span>Payment status</span>

                  <strong>{order.paymentStatus || "Paid"}</strong>
                </div>

                <div className="payment-row">
                  <span>Payment provider</span>

                  <strong className="stripe-label">
                    <span>✦</span>
                    Stripe
                  </strong>
                </div>

                <div className="payment-row">
                  <span>Currency</span>

                  <strong>USD</strong>
                </div>
              </div>
            </section>

            {/* ORDER INFORMATION */}
            <section className="details-card">
              <div className="card-heading">
                <div className="heading-icon">#</div>

                <div>
                  <h2>Order information</h2>
                  <p>Reference information for this purchase</p>
                </div>
              </div>

              <div className="order-reference">
                <div>
                  <span>Order ID</span>

                  <strong>{order._id}</strong>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(order._id);

                    toast.success("Order ID copied");
                  }}
                >
                  Copy
                </button>
              </div>

              {order.stripeCheckoutSessionId && (
                <div className="order-reference">
                  <div>
                    <span>Checkout session</span>

                    <strong>{order.stripeCheckoutSessionId}</strong>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        order.stripeCheckoutSessionId,
                      );

                      toast.success("Session ID copied");
                    }}
                  >
                    Copy
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT */}
          <aside className="details-sidebar">
            {/* SUCCESS CARD */}
            <div className="success-card">
              <div className="success-icon">✓</div>

              <h2>{isPaid ? "Payment confirmed" : "Payment processing"}</h2>

              <p>
                {isPaid
                  ? "Your payment was successfully processed through Stripe."
                  : "Your payment is currently being processed."}
              </p>
            </div>

            {/* SECURE CARD */}
            <div className="secure-card">
              <div className="secure-icon">✓</div>

              <div>
                <strong>Secure payment</strong>

                <p>
                  Your payment was processed securely using Stripe Checkout.
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="details-actions">
              <Link to="/" className="primary-details-button">
                Continue shopping
                <span>→</span>
              </Link>

              <Link to="/orders" className="secondary-details-button">
                View all orders
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
