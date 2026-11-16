import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Star,
  ShieldCheck,
  Droplets,
  Leaf,
  Truck
} from 'lucide-react';

export default function ProductDetails({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false
}) {
  const [quantity, setQuantity] = useState(1);

  const images = useMemo(() => {
    const candidates = [product?.image, ...(product?.images || [])].filter(Boolean);
    return [...new Set(candidates)];
  }, [product]);

  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <main className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={onBack}>Back to shop</button>
      </main>
    );
  }

  const price = Number(product.price || 0);
  const originalPrice = Number(product.originalPrice || 0);
  const stock = Number(product.stock ?? 0);
  const outOfStock = stock <= 0;
  const maxQuantity = Math.max(1, stock);

  const benefits = [
    'A thoughtful addition to your everyday skincare routine',
    'Designed for a comfortable, easy-to-layer routine',
    'A simple way to make time for daily self-care',
    'Explore the product details and directions on its packaging'
  ];

  function changeQuantity(amount) {
    setQuantity(current => Math.min(maxQuantity, Math.max(1, current + amount)));
  }

  return (
    <main className="product-details-page">
      <button className="back-to-shop" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to shopping
      </button>

      <div className="product-details-layout">
        <section className="product-gallery">
          <div className="product-main-image">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={product.name}
                onError={event => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="product-image-placeholder">SKINÉRA</div>
            )}

            <button
              className={`detail-wishlist ${isWishlisted ? 'active' : ''}`}
              onClick={() => onToggleWishlist?.(product)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              type="button"
            >
              <Heart size={21} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {images.length > 1 && (
            <div className="product-image-thumbnails">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={activeImage === index ? 'selected' : ''}
                  onClick={() => setActiveImage(index)}
                  type="button"
                  aria-label={`View product image ${index + 1}`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="product-information">
          <p className="product-brand">{product.brand || 'SKINÉRA COLLECTION'}</p>
          <h1>{product.name}</h1>

          <div className="product-rating">
            <span className="rating-stars" aria-label="Product listing">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} size={15} />
              ))}
            </span>
            <span>Discover your skincare favourite</span>
          </div>

          <div className="detail-price">
            <strong>₹{price.toLocaleString('en-IN')}</strong>
            {originalPrice > price && (
              <>
                <del>₹{originalPrice.toLocaleString('en-IN')}</del>
                <span className="detail-discount">
                  {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="product-description">
            {product.description ||
              'A carefully selected Korean skincare essential for your everyday routine. Please check the product packaging for complete ingredients and directions.'}
          </p>

          <div className="product-detail-divider" />
          <h3>Product highlights</h3>
          <ul className="product-benefits">
            {benefits.map((benefit, index) => (
              <li key={index}><span>✧</span>{benefit}</li>
            ))}
          </ul>
          <div className="product-detail-divider" />

          <div className="quantity-section">
            <span>Quantity</span>
            <div className="quantity-selector">
              <button onClick={() => changeQuantity(-1)} disabled={quantity <= 1} type="button" aria-label="Decrease quantity">
                <Minus size={15} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => changeQuantity(1)} disabled={outOfStock || quantity >= maxQuantity} type="button" aria-label="Increase quantity">
                <Plus size={15} />
              </button>
            </div>
          </div>

          <p className="stock-label" aria-live="polite">
            {outOfStock ? 'Currently out of stock' : `${stock} available`}
          </p>

          <button
            className="detail-add-cart"
            disabled={outOfStock}
            onClick={() => onAddToCart?.(product, quantity)}
            type="button"
          >
            <ShoppingBag size={19} />
            {outOfStock
              ? 'OUT OF STOCK'
              : `ADD TO BAG — ₹${(price * quantity).toLocaleString('en-IN')}`}
          </button>

          <div className="product-service-info">
            <div><Truck size={19} /><span>Delivery information at checkout</span></div>
            <div><ShieldCheck size={19} /><span>Secure shopping experience</span></div>
            <div><Droplets size={19} /><span>Thoughtful everyday skincare</span></div>
            <div><Leaf size={19} /><span>Explore your skincare routine</span></div>
          </div>
        </section>
      </div>
    </main>
  );
}
