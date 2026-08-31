import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import "./Success.css";

export default function Success() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasVerified = useRef(false);

  const sessionId = searchParams.get("session_id");

  const verifyPayment = async () => {
    try {
      const { data } = await api.post("/payments/verify", { sessionId });

      if (data.success) {
        setOrder(data.order);
        toast.success(data.message || "Payment verified successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    if (hasVerified.current) return;
    hasVerified.current = true;

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 style={{ width: "40px", height: "40px", animation: "spin 1s linear infinite", marginBottom: "16px", color: "#3b82f6" }} />
        <p style={{ fontSize: "18px", fontWeight: "600" }}>Verifying your payment...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="success-page-container">
        <div className="success-card">
          <div className="success-icon-box" style={{ backgroundColor: "#ffeeee", color: "#ef4444", borderColor: "#fecaca" }}>
            <XCircle size={32} />
          </div>
          <h2 className="success-title">Payment Verification Failed</h2>
          <p className="success-desc">We couldn't verify your payment session. Please try again.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="continue-btn"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page-container">
      <div className="success-card">
        
        {/* Success Icon */}
        <div className="success-icon-box">
          <CheckCircle2 size={32} />
        </div>

        {/* Heading */}
        <h1 className="success-title">Payment Successful</h1>
        <p className="success-desc">
          Thank you for your purchase. Your payment has been verified successfully.
        </p>

        {/* Order Details Card */}
        <div className="order-details-box">
          <h3 className="order-details-title">Order Details</h3>
          
          <div className="detail-row">
            <span className="detail-label">Status</span>
            <span className="status-badge">
              {order.status}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{order.customerEmail || "Guest User"}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Total</span>
            <span className="detail-value">${(order.amountTotal / 100).toFixed(2)}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Currency</span>
            <span className="detail-value">{order.currency.toUpperCase()}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Items</span>
            <span className="detail-value">{order.items.length}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="continue-btn"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}