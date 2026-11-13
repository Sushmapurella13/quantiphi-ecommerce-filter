import { SlidersHorizontal, RotateCcw } from "lucide-react";

const categories = ["Electronics", "Apparel", "Footwear"];

export default function Sidebar({
  selectedCategories, onCategoryChange, minPrice, maxPrice,
  onMinPriceChange, onMaxPriceChange, minRating, onRatingChange, onReset
}) {
  const maxLimit = 3000;
  return (
    <aside className="sidebar">
      <div className="sidebar-heading">
        <div><SlidersHorizontal size={19} /><h2>Filters</h2></div>
        <button className="reset-link" onClick={onReset}><RotateCcw size={14} /> Reset</button>
      </div>

      <section className="filter-section">
        <h3>Category</h3>
        {categories.map(category => (
          <label className="check-row" key={category}>
            <input type="checkbox" checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)} />
            <span>{category}</span>
          </label>
        ))}
      </section>

      <section className="filter-section">
        <h3>Price range</h3>
        <div className="price-values">
          <span>₹{minPrice.toLocaleString("en-IN")}</span>
          <span>₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>
        <div className="range-stack">
          <input aria-label="Minimum price" type="range" min="0" max={maxLimit}
            step="50" value={minPrice}
            onChange={e => onMinPriceChange(Math.min(Number(e.target.value), maxPrice))} />
          <input aria-label="Maximum price" type="range" min="0" max={maxLimit}
            step="50" value={maxPrice}
            onChange={e => onMaxPriceChange(Math.max(Number(e.target.value), minPrice))} />
        </div>
        <p className="hint">Drag either handle to adjust the range</p>
      </section>

      <section className="filter-section">
        <h3>Minimum rating</h3>
        {[5, 4, 3, 2, 1].map(rating => (
          <label className="rating-row" key={rating}>
            <input type="radio" name="rating" checked={minRating === rating}
              onChange={() => onRatingChange(rating)} />
            <span className="stars">{"★".repeat(rating)}<span className="empty-stars">{"★".repeat(5-rating)}</span></span>
            <span className="rating-label">& up</span>
          </label>
        ))}
        <label className="rating-row">
          <input type="radio" name="rating" checked={minRating === 0}
            onChange={() => onRatingChange(0)} />
          <span className="rating-label">Any rating</span>
        </label>
      </section>
    </aside>
  );
}
