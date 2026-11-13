import products from "../data/products.js";

// All filtering and sorting business logic is performed on the server.
export function getProducts(req, res) {
  try {
    const rawCategories = req.query.categories;
    const categories = rawCategories
      ? rawCategories.split(",").map(value => value.trim()).filter(Boolean)
      : [];

    const minPrice = req.query.minPrice === undefined ? 0 : Number(req.query.minPrice);
    const maxPrice = req.query.maxPrice === undefined
      ? Math.max(...products.map(product => product.price))
      : Number(req.query.maxPrice);
    const minRating = req.query.minRating === undefined ? 0 : Number(req.query.minRating);
    const sort = req.query.sort || "default";

    if (!Number.isFinite(minPrice) || !Number.isFinite(maxPrice) ||
        !Number.isFinite(minRating) || minPrice < 0 || maxPrice < minPrice ||
        minRating < 0 || minRating > 5) {
      return res.status(400).json({ message: "Invalid filter values." });
    }

    // Intersect all active filters. Empty categories means all categories.
    let result = products.filter(product => {
      const categoryMatches = categories.length === 0 || categories.includes(product.category);
      const priceMatches = product.price >= minPrice && product.price <= maxPrice;
      const ratingMatches = product.rating >= minRating;
      return categoryMatches && priceMatches && ratingMatches;
    });

    // Sort only after filtering.
    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "top-rated") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort !== "default") {
      return res.status(400).json({ message: "Unsupported sort option." });
    }

    return res.json({
      products: result,
      total: result.length,
      filters: { categories, minPrice, maxPrice, minRating, sort }
    });
  } catch (error) {
    console.error("Product filtering failed:", error);
    return res.status(500).json({ message: "Unable to retrieve products." });
  }
}
