import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { productService } from "../../services/productService";
import ProductTabs from "./ShopComponents/ProductTabs";
import DiscountBanner from "./ShopComponents/DiscountBanner";
import MarqueeBanner from "./ShopComponents/MarqueeBanner";
import LoadingSpinner from "../common/LoadingSpinner";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getAllProducts(),
          productService.getAllCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div>
      <MarqueeBanner />
      <DiscountBanner />
      <ProductTabs products={products} categories={categories} />
    </div>
  );
}

export default Shop;