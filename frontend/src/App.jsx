import { useEffect, useState } from "react";
import { Search, ShoppingBag, PackageOpen } from "lucide-react";
import Sidebar from "./components/Sidebar.jsx";
import ProductCard from "./components/ProductCard.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("default");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Every filter or sort change triggers a fresh backend request.
  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      setLoading(true);
      setError("");
      const params = new URLSearchParams({
        categories: selectedCategories.join(","),
        minPrice: String(minPrice),
        maxPrice: String(maxPrice),
        minRating: String(minRating),
        sort
      });
      try {
        const response = await fetch(`${API_URL}/api/products?${params}`, {
          signal: controller.signal
        });
        if (!response.ok) {
          const body = await response.json();
          throw new Error(body.message || "Request failed");
        }
        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Could not connect to the server.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProducts();
    return () => controller.abort();
  }, [selectedCategories, minPrice, maxPrice, minRating, sort]);

  function toggleCategory(category) {
    setSelectedCategories(current =>
      current.includes(category)
        ? current.filter(item => item !== category)
        : [...current, category]
    );
  }

  function resetFilters() {
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(3000);
    setMinRating(0);
    setSort("default");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark"><ShoppingBag size={21} /></span> marketly<span className="brand-dot">.</span></a>
        <div className="topbar-note"><span className="online-dot" /> Curated finds, better choices</div>
        <div className="topbar-icon"><ShoppingBag size={19} /></div>
      </header>

      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">THE EVERYDAY EDIT</p>
            <h1>Find your next<br /><span>favourite thing.</span></h1>
            <p className="hero-copy">Thoughtfully picked products. Easy browsing. Better discoveries.</p>
          </div>
          <div className="hero-art"><div className="hero-circle"><ShoppingBag size={72} strokeWidth={1.1} /></div></div>
        </section>

        <div className="catalog-heading">
          <div><p className="eyebrow">EXPLORE THE COLLECTION</p><h2>All products</h2></div>
          <div className="catalog-meta"><span>{total} items</span></div>
        </div>

        <div className="catalog-layout">
          <Sidebar
            selectedCategories={selectedCategories}
            onCategoryChange={toggleCategory}
            minPrice={minPrice} maxPrice={maxPrice}
            onMinPriceChange={setMinPrice} onMaxPriceChange={setMaxPrice}
            minRating={minRating} onRatingChange={setMinRating}
            onReset={resetFilters}
          />

          <section className="results">
            <div className="results-toolbar">
              <p>Showing <strong>{total}</strong> matching products</p>
              <label className="sort-control">Sort by
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="default">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="top-rated">Top Rated First</option>
                </select>
              </label>
            </div>

            {error ? (
              <div className="empty-state"><PackageOpen size={42} /><h3>Unable to load products</h3><p>{error}</p><button onClick={resetFilters}>Reset filters</button></div>
            ) : loading ? (
              <div className="loading-state">Loading products…</div>
            ) : products.length === 0 ? (
              <div className="empty-state"><Search size={42} /><h3>No items match your criteria.</h3><p>Try changing your filters to discover more products.</p><button onClick={resetFilters}>Reset filters</button></div>
            ) : (
              <div className="product-grid">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </section>
        </div>
      </main>
      <footer>© 2026 Marketly. Made for better everyday discoveries.</footer>
    </div>
  );
}
