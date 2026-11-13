import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name}
          onError={e => { e.currentTarget.src = "https://placehold.co/600x450/f1f3f5/64748b?text=Product"; }} />
        <span className="category-tag">{product.category}</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-bottom">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <span className="product-rating"><Star size={15} fill="currentColor" /> {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
