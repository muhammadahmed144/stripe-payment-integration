import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cancel.css";

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="cancel-page">
      <div className="cancel-card">
        {/* Professional SVG Icon inside a soft red circle */}
        <div className="cancel-icon-wrapper">
          <svg
            className="cancel-svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="status-badge">Payment Failed</div>
        <h1>Order Cancelled</h1>
        <p>
          Your payment session was cancelled or interrupted. No charges were made to your account.
        </p>
        
        <div className="cancel-actions">
          <button 
            className="btn-secondary" 
            onClick={() => navigate("/")}
          >
            Back to Store
          </button>
          <button 
            className="btn-primary" 
            onClick={() => navigate("/")}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}