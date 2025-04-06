import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ModelEnrollPage.module.css";

function ModelEnrollPage({ marketplaceModels }) {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    if (marketplaceModels) {
      const selectedModel = marketplaceModels.find(m => m.id === parseInt(modelId));
      if (selectedModel) {
        setModel(selectedModel);
      } else {
        console.error(`Model with ID ${modelId} not found`);
      }
    }
    setLoading(false);
  }, [modelId, marketplaceModels]);

  const handleBuyNow = async () => {
    if (!model || paymentLoading) return;
  
    setPaymentLoading(true);
    try {
      const amountInUSD = parseFloat(model.price.replace('$', ''));
      const exchangeRate = 83; // Adjust based on current rate
      const amountInRupees = amountInUSD * exchangeRate;
  
      // Use the correct backend URL and endpoints
      const { data: keyData } = await axios.get('http://localhost:8080/key');
      const { key } = keyData;
  
      const { data: orderData } = await axios.post('http://localhost:8080/process', {
        amount: amountInRupees,
      });
      const { order } = orderData;
  
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "EduViz Learning Platform",
        description: `Purchase: ${model.title}`,
        order_id: order.id,
        handler: function (response) {
          navigate("/dashboard");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "+917806895713",
        },
        theme: {
          color: "#3399cc",
        },
        notes: {
          modelId: model.id,
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert('Payment failed. Please try again.');
        console.error(response.error);
      });
      rzp.open();
  
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const handleBackToMarketplace = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading model details...</div>;
  }

  if (!model) {
    return (
      <div className={styles.errorContainer}>
        <h2>Model not found</h2>
        <button 
          className={styles.backButton} 
          onClick={handleBackToMarketplace}
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.modelEnrollContainer}>
        <button 
          className={styles.backButton} 
          onClick={handleBackToMarketplace}
        >
          ← Back to Marketplace
        </button>
        
        <div className={styles.modelHeader}>
          <h1 className={styles.modelTitle}>{model.title}</h1>
          {model.isNew && <span className={styles.newBadge}>NEW</span>}
          <div className={styles.modelMeta}>
            <span className={styles.category}>{model.category}</span>
            <span className={styles.difficulty}>{model.difficulty}</span>
            <span className={styles.rating}>★ {model.rating} ({model.reviews} reviews)</span>
            <span className={styles.instructor}>By {model.instructor}</span>
            <span className={styles.updated}>Last updated: {model.lastUpdated}</span>
          </div>
        </div>

        <div className={styles.modelContent}>
          <div className={styles.modelPreview}>
            <div className={styles.modelImageContainer}>
              <img 
                src={model.imageUrl} 
                alt={model.title} 
                className={styles.modelImage} 
              />
            </div>
            <div className={styles.pricingCard}>
              <h2 className={styles.priceTag}>{model.price}</h2>
              <div className={styles.actionButtons}>
                <button 
                  className={styles.buyButton} 
                  onClick={handleBuyNow}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? "Processing..." : "Buy Now"}
                </button>
                <button 
                  className={`${styles.cartButton} ${isAddedToCart ? styles.added : ''}`} 
                  onClick={handleAddToCart}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? "Added to Cart ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.modelDescription}>
            <div className={styles.descriptionBox}>
              <h2 className={styles.sectionTitle}>About this 3D Model</h2>
              <p className={styles.descriptionText}>{model.description}</p>
            </div>

            <div className={styles.learningPoints}>
              <h2 className={styles.sectionTitle}>What You'll Learn</h2>
              <ul className={styles.learningList}>
                {model.learningPoints.map((point, index) => (
                  <li key={index} className={styles.learningItem}>
                    <span className={styles.checkmark}>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelEnrollPage;