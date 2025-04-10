import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <div className="text-center text-xl font-bold mt-10">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg p-6">
        {/* Product Image Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-md" />
          <div className="flex gap-2 mt-4 overflow-x-auto w-full">
            {[1, 2, 3].map((i) => (
              <img key={i} src={product.image} alt="Product thumbnail" className="w-16 h-16 rounded border" />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-1/2 flex flex-col px-6">
          <h2 className="text-3xl font-bold text-black">{product.name}</h2>
          <p className="text-lg text-gray-700 italic">{product.tagline}</p>

          <div className="flex items-center mt-2">
            ⭐⭐⭐⭐⭐ <span className="text-gray-500">(11 customer reviews)</span>
          </div>

          <div className="flex items-center mt-4">
            <span className="text-2xl font-bold text-black">₹{product.price}</span>
            <span className="text-gray-500 line-through ml-3 text-lg">{product.oldPrice}</span>
          </div>

          <span className="text-green-500 text-lg mt-2">{product.savings}</span>

          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Key Benefits */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-black">Key Benefits:</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {product.benefits.map((benefit, index) => (
                <li key={index}>✅ {benefit}</li>
              ))}
            </ul>
          </div>

          {/* Why Choose This Product */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-black">Why Choose {product.brand}?</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {product.whyChoose.map((point, index) => (
                <li key={index}>✔ {point}</li>
              ))}
            </ul>
          </div>

          {/* How to Use */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-black">How to Use:</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {product.howToUse.map((instruction, index) => (
                <li key={index}>🥄 {instruction}</li>
              ))}
            </ul>
          </div>

          {/* Customer Reviews */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-black">Customer Reviews:</h3>
            {product.reviews.map((review, index) => (
              <p key={index} className="text-gray-700 mt-2">
                ⭐ {review}
              </p>
            ))}
          </div>

          <button
            className="border-2 border-black text-black py-3 mt-6 w-full rounded-lg font-bold text-lg hover:bg-gray-200"
            onClick={() => addToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
