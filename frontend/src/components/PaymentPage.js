import React, { useState }  from 'react';
import { QrCode, Clock, ShoppingBag } from 'lucide-react';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";


const PaymentPage = ({ amount }) => {

  
  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("processing...");
      navigate(`/${id}/token`);
    }, 2000);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <>
    <div className="pppayment-page">
    <div className="payment-page">
      <header className="page-header">
        <h1>Mall Shopping Assistant</h1>
        <p>Smart shopping, zero waiting</p>
      </header>

      <div className="main-content">
        <div className="process-steps">
          <div className="step">
            <div className="step-icon">
              <QrCode />
            </div>
            <div className="step-content">
              <h3>Scan QR Code</h3>
              <p>Scan the QR code at any mall counter</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-icon">
              <Clock />
            </div>
            <div className="step-content">
              <h3>Book Time Slot</h3>
              <p>Choose your preferred billing time</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-icon">
              <ShoppingBag />
            </div>
            <div className="step-content">
              <h3>Priority Checkout</h3>
              <p>Skip the line with priority billing</p>
            </div>
          </div>
        </div>

        <div className="benefits-section">
          <h2>What You Get</h2>
          <div className="benefits-list">
            <div className="benefit">
              <span className="check">✓</span>
              <p>SMS notifications for your turn</p>
            </div>
            <div className="benefit">
              <span className="check">✓</span>
              <p>Digital receipt for easy tracking</p>
            </div>
            <div className="benefit">
              <span className="check">✓</span>
              <p>24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="payment-footer">
        <div className="price-tag">
          {/* <span className="amount">₹{amount}</span> */}
          <span className="amount">₹120{amount}</span>
          <span className="period">one-time fee</span>
        </div>
        <button className="pay-button" onClick={handlePayment} disabled={loading}>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          "Book Appointment"
        )}
        </button>
      </footer>
    </div>
    </div>

    <style>{`
    .pppayment-page {
      background:rgb(255, 255, 255);
      width: 100vw;
      height: 100vh;
       display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
    }


      .payment-page {
  // min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.33);
  background: #ffffff;
}

.page-header {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
  padding: 24px 20px;
  text-align: center;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.page-header p {
  font-size: 16px;
  opacity: 0.9;
}

.main-content {
  flex: 1;
  padding: 24px 20px;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}

.step {
  display: flex;
  align-items: center;
  gap: 16px;
}

.step-icon {
  background: #f0f7ff;
  color: #4a90e2;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.step-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.benefits-section {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.benefits-section h2 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.benefit {
  display: flex;
  align-items: center;
  gap: 12px;
}

.check {
  color: #4a90e2;
  font-size: 18px;
  font-weight: bold;
}

.benefit p {
  font-size: 14px;
  color: #444;
}

.payment-footer {
  background: white;
  padding: 20px;
  border-top: 1px solid #eee;
  position: sticky;
  bottom: 0;
}

.price-tag {
  text-align: center;
  margin-bottom: 16px;
}

.amount {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  display: block;
}

.period {
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pay-button {
  background: #4a90e2;
  color: white;
  border: none;
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.pay-button:hover {
  background: #357abd;
}

/* Laptop/Desktop styles */
@media (min-width: 768px) {
  .payment-page {
    max-width: 480px;
    margin: 0 auto;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }

  .page-header {
    border-radius: 0 0 24px 24px;
    margin: 0 20px;
    padding: 32px;
  }

  .main-content {
    padding: 32px;
  }

  .payment-footer {
    max-width: 480px;
    margin: 0 auto;
  }
}





// spiner css
.pay-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
   position: relative;
      z-index: 2;
  font-size: 16px;
}

.pay-button:disabled {
  background-color: #7aa7d9;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
      `}</style>
      </>
  );
};

export default PaymentPage;