import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../../services/productService";
const FeaturedProduct = () => {
  const navigate = useNavigate();

  const product = {
    name: "Himalayan Shilajit",
    tagline: "Strength, Vitality & Endurance",
    description:
      "Boost stamina, improve recovery, and power your performance with purified Shilajit resin. Trusted by men’s wellness experts.",
    image: "/ResourseImages/4.png",
    price: 999,
    oldPrice: 1349,
    savings: "You save ₹350 (25%)",
    brand: "Wellvas",
    benefits: [
      "Improves stamina and recovery",
      "Balances energy and hormones",
      "Fights fatigue and stress",
    ],
    whyChoose: [
      "Pure Himalayan extract",
      "Lab-tested for heavy metals",
      "Certified FSSAI-compliant",
    ],
    howToUse: ["Take 1 capsule daily after meal with warm water"],
    reviews: [
      "Improved my energy within a week!",
      "Felt the change in stamina and recovery.",
    ],
  };

  // Timer logic
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [bestSeller, setBestSeller] = useState();
  console.log("bestSeller", bestSeller);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await productService.getAllProducts();
        console.log("products....................", products);
        const best = products && products?.find((product) => product.isBestSelling);
        if (best) {
          setBestSeller(best);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  console.log("bestSeller", bestSeller);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0; // Stop the timer when it reaches 0
        }
        return prev - 1; // Decrease the time left by 1 second
      });
    }, 1000); // Update every second
    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };
  if (!bestSeller) return <></>;

  return (
    <section className="bg-[#f6fdf5] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="md:w-1/2 w-full relative">
          <img
            src={bestSeller?.images[0]?.url || product.image}
            alt={product.name}
            className="w-full max-h-[420px] object-contain rounded-2xl shadow-xl"
          />
          <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Bestseller
          </span>
          <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">
            25% OFF
          </span>
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {bestSeller?.name}
          </h2>
          <p className="text-lg text-gray-600 italic mb-4">{product.tagline}</p>
          <p className="text-gray-700 text-sm md:text-base mb-6">
            {bestSeller?.description?.split(" ").slice(0, 30).join(" ") +
              (bestSeller?.description?.split(" ").length > 30 ? "..." : "")}
          </p>

          {/* Timer */}
          <div className="mb-4 text-sm text-red-600 font-medium">
            Limited Time Offer:{" "}
            <span className="font-bold">{formatTime(timeLeft)}</span> left
          </div>

          <button
            onClick={() =>
              navigate(`/ProductDetailsById/${bestSeller?._id}`, {
                state: { product: bestSeller },
              })
            }
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition hover:scale-105"
          >
            Shop Now →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
