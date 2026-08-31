import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck, X, Mail, ArrowRight, LockKeyhole } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { api } from "../services/api";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import Navbar from "../components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get("/products");

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error(error);
        toast.error("Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleBuy = (product) => {
    setCheckoutProduct(product);
    setCustomerEmail("");
    setEmailError("");
  };

  const handleCheckout = async () => {
    const email = customerEmail.trim();

    if (!email) {
      setEmailError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      setBuying(true);
      setEmailError("");

      const { data } = await api.post("/payments/create-checkout-session", {
        items: [
          {
            productId: checkoutProduct._id || checkoutProduct.id,
            quantity: 1,
          },
        ],
        customerEmail: email,
      });

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      toast.error(data.message || "Unable to start checkout");
    } catch (error) {
      console.error("Checkout error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while starting checkout",
      );
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="store-page">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <main>
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="status-dot"></span>
                Secure digital payments
              </div>

              <h1>
                Learn more.
                <br />
                <span>Build better.</span>
              </h1>

              <p>
                Premium developer courses designed to help you build real-world
                applications and level up your web development skills.
              </p>

              <div className="hero-actions">
                <a href="#products" className="primary-button">
                  Explore Products
                  <span>→</span>
                </a>

                <Link to="/orders" className="secondary-button">
                  View Orders
                </Link>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <div className="trust-icon">✓</div>
                  <span>Secure checkout</span>
                </div>

                <div className="trust-item">
                  <div className="trust-icon">✓</div>
                  <span>Instant access</span>
                </div>

                <div className="trust-item">
                  <div className="trust-icon">✓</div>
                  <span>Powered by Stripe</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-glow"></div>

              <div className="dashboard-card">
                <div className="dashboard-header">
                  <div>
                    <span>PayStore</span>
                    <strong>Secure checkout</strong>
                  </div>

                  <div className="secure-badge">
                    <span>●</span>
                    Secure
                  </div>
                </div>

                <div className="checkout-preview">
                  <div className="preview-label">FEATURED PRODUCT</div>

                  <h3>Complete MERN Stack</h3>

                  <p>
                    Build modern full-stack applications with MongoDB, Express,
                    React and Node.js.
                  </p>

                  <div className="preview-price">
                    <span>$79</span>
                    <small>one-time payment</small>
                  </div>

                  <div className="preview-line"></div>

                  <div className="preview-row">
                    <span>Payment processing</span>
                    <span>Secure</span>
                  </div>

                  <div className="preview-row">
                    <span>Checkout</span>
                    <span>Stripe</span>
                  </div>

                  <div className="preview-button">
                    Continue to checkout
                    <span>→</span>
                  </div>
                </div>
              </div>

              <div className="floating-card floating-card-one">
                <span className="floating-icon">✓</span>
                <div>
                  <strong>Payment secured</strong>
                  <small>Stripe checkout</small>
                </div>
              </div>

              <div className="floating-card floating-card-two">
                <span className="floating-icon blue">↗</span>
                <div>
                  <strong>Instant access</strong>
                  <small>After successful payment</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat">
              <strong>100%</strong>
              <span>Secure payments</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat">
              <strong>24/7</strong>
              <span>Digital access</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat">
              <strong>Stripe</strong>
              <span>Payment infrastructure</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat">
              <strong>1-click</strong>
              <span>Simple checkout</span>
            </div>
          </div>
        </section>

        {/* ================= PRODUCTS ================= */}
        <section id="products" className="products-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">OUR PRODUCTS</span>

              <h2>
                Build your next
                <br />
                <span>big project.</span>
              </h2>
            </div>

            <p>
              Practical courses and resources created for developers who want to
              build real products.
            </p>
          </div>

          {loading ? (
            <div className="loading-grid">
              {[1, 2, 3].map((item) => (
                <div className="skeleton-card" key={item}>
                  <div className="skeleton skeleton-icon"></div>
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-price"></div>
                  <div className="skeleton skeleton-button"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="empty-products">
              <h3>No products available</h3>
              <p>Please check back later.</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product, index) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  index={index}
                  onBuy={handleBuy}
                  buying={buying}
                />
              ))}
            </div>
          )}
        </section>

        {/* ================= SECURITY ================= */}
        <section id="security" className="security-section">
          <div className="security-container">
            <div className="security-content">
              <span className="section-eyebrow">BUILT FOR TRUST</span>

              <h2>
                Your payment.
                <br />
                <span>Protected.</span>
              </h2>

              <p>
                PayStore uses Stripe Checkout to securely process payments. Your
                card information is handled by Stripe's secure payment
                infrastructure.
              </p>

              <div className="security-features">
                <div className="security-feature">
                  <div className="security-feature-icon">✓</div>
                  <div>
                    <strong>Secure checkout</strong>
                    <span>Payments are processed through Stripe.</span>
                  </div>
                </div>

                <div className="security-feature">
                  <div className="security-feature-icon">⌁</div>
                  <div>
                    <strong>Encrypted payments</strong>
                    <span>Sensitive payment information stays protected.</span>
                  </div>
                </div>

                <div className="security-feature">
                  <div className="security-feature-icon">↗</div>
                  <div>
                    <strong>Order tracking</strong>
                    <span>Easily view your payment history and orders.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="security-card">
              <div className="security-card-top">
                <div className="shield-icon">✓</div>

                <span>SECURE PAYMENT</span>
              </div>

              <div className="security-card-middle">
                <span>Payment status</span>
                <strong>
                  <i></i>
                  Protected
                </strong>
              </div>

              <div className="security-card-line"></div>

              <div className="stripe-text">
                Powered by <strong>stripe</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= CHECKOUT MODAL ================= */}
      <AnimatePresence>
        {checkoutProduct && (
          <motion.div
            className="checkout-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!buying) {
                setCheckoutProduct(null);
                setCustomerEmail("");
                setEmailError("");
              }
            }}
          >
            <motion.div
              className="checkout-modal"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}
              <div className="checkout-modal-header">
                <div className="checkout-modal-title">
                  <div className="checkout-modal-icon">
                    <LockKeyhole size={20} />
                  </div>

                  <div>
                    <span>SECURE CHECKOUT</span>
                    <h2>Complete your purchase</h2>
                  </div>
                </div>

                <button
                  type="button"
                  className="checkout-close-button"
                  onClick={() => {
                    if (!buying) {
                      setCheckoutProduct(null);
                      setCustomerEmail("");
                      setEmailError("");
                    }
                  }}
                  disabled={buying}
                  aria-label="Close checkout"
                >
                  <X size={20} />
                </button>
              </div>

              {/* PRODUCT SUMMARY */}
              <div className="checkout-product">
                <div className="checkout-product-icon">
                  <ShieldCheck size={24} />
                </div>

                <div className="checkout-product-info">
                  <span>PRODUCT</span>

                  <h3>{checkoutProduct.name || "Digital Product"}</h3>

                  {checkoutProduct.description && (
                    <p>{checkoutProduct.description}</p>
                  )}
                </div>

                <div className="checkout-product-price">
                  ${(Number(checkoutProduct.unitAmount || 0) / 100).toFixed(2)}
                </div>
              </div>

              {/* EMAIL */}
              <div className="checkout-form">
                <label htmlFor="customer-email">Email address</label>

                <div
                  className={`checkout-input-wrapper ${
                    emailError ? "has-error" : ""
                  }`}
                >
                  <Mail size={18} />

                  <input
                    id="customer-email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => {
                      setCustomerEmail(e.target.value);

                      if (emailError) {
                        setEmailError("");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !buying) {
                        handleCheckout();
                      }
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={buying}
                    autoFocus
                  />
                </div>

                {emailError && (
                  <span className="checkout-input-error">{emailError}</span>
                )}

                <p className="checkout-email-hint">
                  Your receipt and order information will be sent to this email.
                </p>
              </div>

              {/* SECURITY NOTE */}
              <div className="checkout-security">
                <ShieldCheck size={18} />

                <div>
                  <strong>Secure payment</strong>

                  <span>
                    Your payment is securely processed by Stripe. We never store
                    your card details.
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="checkout-actions">
                <button
                  type="button"
                  className="checkout-cancel-button"
                  onClick={() => {
                    if (!buying) {
                      setCheckoutProduct(null);
                      setCustomerEmail("");
                      setEmailError("");
                    }
                  }}
                  disabled={buying}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="checkout-continue-button"
                  onClick={handleCheckout}
                  disabled={buying}
                >
                  {buying ? (
                    <>
                      <span className="checkout-button-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to secure checkout
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              {/* FOOTER */}
              <div className="checkout-modal-footer">
                <LockKeyhole size={14} />

                <span>Secure checkout powered by Stripe</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FOOTER ================= */}
      <footer className="store-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand">
              <div className="brand-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="13"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M7 15H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <span>PayStore</span>
            </div>

            <p>Premium digital products with secure payments.</p>
          </div>

          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <a href="#products">Products</a>
              <Link to="/orders">Orders</Link>
            </div>

            <div>
              <strong>Platform</strong>
              <a href="#security">Security</a>
              <a href="#products">Checkout</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} PayStore. All rights reserved.
          </span>

          <span>Secure payments powered by Stripe</span>
        </div>
      </footer>
    </div>
  );
}
