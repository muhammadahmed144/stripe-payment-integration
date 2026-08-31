import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  CreditCard,
  PackageOpen,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { api } from "../services/api";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/orders");

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || "Failed to load orders");
      }
    } catch (err) {
      console.error("Get orders error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load orders right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const formatAmount = (amount) => {
    return `$${(Number(amount || 0) / 100).toFixed(2)}`;
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    return status?.toLowerCase() === "paid"
      ? "status-paid"
      : "status-pending";
  };

  return (
    <main className="orders-page">
      <div className="orders-container">

        {/* HEADER */}
        <motion.div
          className="orders-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="orders-eyebrow">
              <span></span>
              ACCOUNT
            </div>

            <h1>Your Orders</h1>

            <p>
              Manage your purchases and view your payment history.
            </p>
          </div>

          <Link to="/" className="back-store-button">
            <ArrowLeft size={17} />
            Back to store
          </Link>
        </motion.div>

        {/* STATS */}
        {!loading && !error && orders.length > 0 && (
          <motion.div
            className="orders-stats"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="order-stat-card">
              <div className="order-stat-icon">
                <PackageOpen size={21} />
              </div>

              <div>
                <span>Total orders</span>
                <strong>{orders.length}</strong>
              </div>
            </div>

            <div className="order-stat-card">
              <div className="order-stat-icon success">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <span>Completed</span>
                <strong>
                  {
                    orders.filter(
                      (order) =>
                        order.status?.toLowerCase() === "paid"
                    ).length
                  }
                </strong>
              </div>
            </div>

            <div className="order-stat-card">
              <div className="order-stat-icon purple">
                <ShieldCheck size={21} />
              </div>

              <div>
                <span>Secure payments</span>
                <strong>Stripe</strong>
              </div>
            </div>
          </motion.div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="orders-loading">
            {[1, 2, 3].map((item) => (
              <div className="order-skeleton" key={item}>
                <div className="skeleton-line small"></div>
                <div className="skeleton-line medium"></div>
                <div className="skeleton-line large"></div>
                <div className="skeleton-line button"></div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <motion.div
            className="orders-error"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="error-icon">
              !
            </div>

            <h2>Unable to load orders</h2>

            <p>{error}</p>

            <button onClick={getOrders}>
              <RefreshCw size={17} />
              Try again
            </button>
          </motion.div>
        )}

        {/* EMPTY */}
        {!loading && !error && orders.length === 0 && (
          <motion.div
            className="empty-orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-icon">
              <PackageOpen size={42} />
            </div>

            <h2>No orders yet</h2>

            <p>
              You haven't made any purchases yet.
              Your completed orders will appear here.
            </p>

            <Link to="/" className="shop-button">
              Explore products
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        )}

        {/* ORDERS */}
        {!loading && !error && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order, index) => {
              const isPaid =
                order.status?.toLowerCase() === "paid";

              return (
                <motion.article
                  className="order-card"
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07,
                  }}
                >
                  {/* TOP */}
                  <div className="order-card-header">

                    <div className="order-id-section">
                      <div className="order-package-icon">
                        <PackageOpen size={20} />
                      </div>

                      <div>
                        <span className="order-label">
                          ORDER
                        </span>

                        <h3>
                          #
                          {order._id
                            ?.slice(-8)
                            .toUpperCase()}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`order-status ${
                        isPaid
                          ? "status-paid"
                          : "status-pending"
                      }`}
                    >
                      {isPaid ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <span className="pending-dot"></span>
                      )}

                      {isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>

                  {/* DIVIDER */}
                  <div className="order-divider"></div>

                  {/* DETAILS */}
                  <div className="order-info">

                    <div className="order-info-item">
                      <div className="info-icon">
                        <CircleDollarSign size={18} />
                      </div>

                      <div>
                        <span>Amount</span>

                        <strong>
                          {formatAmount(order.amount)}
                        </strong>
                      </div>
                    </div>

                    <div className="order-info-item">
                      <div className="info-icon">
                        <CreditCard size={18} />
                      </div>

                      <div>
                        <span>Payment</span>

                        <strong>
                          {order.paymentStatus || "Paid"}
                        </strong>
                      </div>
                    </div>

                    <div className="order-info-item">
                      <div className="info-icon">
                        <CalendarDays size={18} />
                      </div>

                      <div>
                        <span>Date</span>

                        <strong>
                          {formatDate(order.createdAt)}
                        </strong>
                      </div>
                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="order-card-footer">

                    <div className="order-security">
                      <ShieldCheck size={16} />
                      Secure payment via Stripe
                    </div>

                    <Link
                      to={`/orders/${order._id}`}
                      className="order-details-button"
                    >
                      View details
                      <ArrowRight size={17} />
                    </Link>

                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}