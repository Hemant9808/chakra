import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { productService } from "../../services/productService";
import ProductTabs from "./ShopComponents/ProductTabs";
import DiscountBanner from "./ShopComponents/DiscountBanner";
import MarqueeBanner from "./ShopComponents/MarqueeBanner";
import SEO from "../common/SEO";

function Shop() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const activeCategoryName = !id || id === "all" ? "All Products" : id;

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

  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div>
      <SEO 
        title={`${activeCategoryName}`} 
        description={`Explore and purchase 100% natural, premium, and lab-tested organic formulations under our ${activeCategoryName} collection.`} 
      />
      <DiscountBanner />
      <ProductTabs products={products} categories={categories} loading={loading} />
    </div>
  );
}

export default Shop;