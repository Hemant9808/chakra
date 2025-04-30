import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../Store/useCartStore";

const ProductSlider = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();


  

  const products = [
    {
      id: 11,
      name: "[Charak] Premium Gokshura – Natural Vitality & Wellness Booster",
      tagline: "Boost Vitality & Wellness Naturally with Gokshura",
      price: 5699,
      oldPrice: 8197,
      savings: "Save ₹2,498",
      image: "https://pngimg.com/d/water_bottle_PNG98959.png",
      brand: "CharakWellness",
      description:
        "Discover the ancient Ayurvedic secret to enhanced vitality and strength with Charak Pure Gokshura. Sourced from the finest farms, our high-potency Gokshura helps boost stamina, support muscle recovery, and promote overall wellness.",
      benefits: [
        "Enhances stamina, endurance & muscle strength",
        "Supports testosterone levels & reproductive health",
        "Aids in kidney & urinary tract health",
        "Promotes hormonal balance & vitality",
        "Reduces stress & improves overall well-being",
        "100% Pure & Chemical-Free – No Additives",
      ],
      whyChoose: [
        "High-potency Gokshura extract for maximum effectiveness",
        "Lab-tested for purity & safety",
        "Available in capsules, powder, or liquid extract",
        "Backed by Ayurvedic principles & trusted by experts",
        "100% Natural & Organic – No fillers, additives, or artificial preservatives",
      ],
      howToUse: [
        "Capsules: Take 1-2 capsules daily with a glass of water.",
        "Liquid Extract: Add a few drops to water or juice as recommended.",
      ],
      reviews: [
        '"My energy levels have improved significantly! Great quality Gokshura." – Rahul S.',
        '"I feel more balanced and stronger since using this product daily." – Priya K.',
      ],
    },
    {
      id: 12,
      name: "[Charak] Premium Organic Ashwagandha – The Ultimate Stress & Vitality Booster",
      tagline: "Restore Balance, Energy & Strength Naturally",
      price: 4999,
      oldPrice: 7299,
      savings: "Save ₹2,300",
      image: "https://pngimg.com/d/water_bottle_PNG98959.png",
      brand: "CharakWellness",
      description:
        "Harness the power of Ashwagandha, the ancient Ayurvedic adaptogen, known for its ability to reduce stress, boost energy, and enhance overall well-being. Our 100% pure, organic Ashwagandha is sourced from high-quality roots and carefully processed to retain its maximum potency.",
      benefits: [
        "Reduces stress & anxiety",
        "Boosts energy & stamina",
        "Enhances strength & endurance",
        "Supports hormonal balance & immunity",
        "Improves sleep quality & relaxation",
        "100% Pure & Natural – No Artificial Additives",
      ],
      whyChoose: [
        "High-potency Ashwagandha extract for maximum benefits",
        "Lab-tested for purity & safety",
        "Available in easy-to-consume capsules, powder, or liquid extract",
        "Trusted by Ayurvedic experts",
        "100% Organic & Pure – No fillers, additives, or artificial preservatives",
      ],
      howToUse: [
        "Capsules: Take 1-2 capsules daily with a glass of water.",
        "Liquid Extract: Add a few drops to water or juice as recommended.",
      ],
      reviews: [
        '"I feel more relaxed and focused throughout the day!" – Arjun M.',
        '"Excellent quality! I’ve noticed a great boost in my energy levels." – Sneha P.',
      ],
    },
    {
      id: 13,
      name: "[Charak] Premium Gokshura – Natural Vitality & Wellness Booster",
      tagline: "Boost Vitality & Wellness Naturally with Gokshura",
      price: 5699,
      oldPrice: 8197,
      savings: "Save ₹2,498",
      image: "https://pngimg.com/d/water_bottle_PNG98959.png",
      brand: "CharakWellness",
      description:
        "Discover the ancient Ayurvedic secret to enhanced vitality and strength with Charak Pure Gokshura. Sourced from the finest farms, our high-potency Gokshura helps boost stamina, support muscle recovery, and promote overall wellness.",
      benefits: [
        "Enhances stamina, endurance & muscle strength",
        "Supports testosterone levels & reproductive health",
        "Aids in kidney & urinary tract health",
        "Promotes hormonal balance & vitality",
        "Reduces stress & improves overall well-being",
        "100% Pure & Chemical-Free – No Additives",
      ],
      whyChoose: [
        "High-potency Gokshura extract for maximum effectiveness",
        "Lab-tested for purity & safety",
        "Available in capsules, powder, or liquid extract",
        "Backed by Ayurvedic principles & trusted by experts",
        "100% Natural & Organic – No fillers, additives, or artificial preservatives",
      ],
      howToUse: [
        "Capsules: Take 1-2 capsules daily with a glass of water.",
        "Liquid Extract: Add a few drops to water or juice as recommended.",
      ],
      reviews: [
        '"My energy levels have improved significantly! Great quality Gokshura." – Rahul S.',
        '"I feel more balanced and stronger since using this product daily." – Priya K.',
      ],
    },
    {
      id: 14,
      name: "[Charak] Premium Organic Ashwagandha – The Ultimate Stress & Vitality Booster",
      tagline: "Restore Balance, Energy & Strength Naturally",
      price: 4999,
      oldPrice: 7299,
      savings: "Save ₹2,300",
      image: "https://pngimg.com/d/water_bottle_PNG98959.png",
      brand: "CharakWellness",
      description:
        "Harness the power of Ashwagandha, the ancient Ayurvedic adaptogen, known for its ability to reduce stress, boost energy, and enhance overall well-being. Our 100% pure, organic Ashwagandha is sourced from high-quality roots and carefully processed to retain its maximum potency.",
      benefits: [
        "Reduces stress & anxiety",
        "Boosts energy & stamina",
        "Enhances strength & endurance",
        "Supports hormonal balance & immunity",
        "Improves sleep quality & relaxation",
        "100% Pure & Natural – No Artificial Additives",
      ],
      whyChoose: [
        "High-potency Ashwagandha extract for maximum benefits",
        "Lab-tested for purity & safety",
        "Available in easy-to-consume capsules, powder, or liquid extract",
        "Trusted by Ayurvedic experts",
        "100% Organic & Pure – No fillers, additives, or artificial preservatives",
      ],
      howToUse: [
        "Capsules: Take 1-2 capsules daily with a glass of water.",
        "Liquid Extract: Add a few drops to water or juice as recommended.",
      ],
      reviews: [
        '"I feel more relaxed and focused throughout the day!" – Arjun M.',
        '"Excellent quality! I’ve noticed a great boost in my energy levels." – Sneha P.',
      ],
    },
    {
      id: 15,
      name: "[Charak] Premium Gokshura – Natural Vitality & Wellness Booster",
      tagline: "Boost Vitality & Wellness Naturally with Gokshura",
      price: 5699,
      oldPrice: 8197,
      savings: "Save ₹2,498",
      image: "https://pngimg.com/d/water_bottle_PNG98959.png",
      brand: "CharakWellness",
      description:
        "Discover the ancient Ayurvedic secret to enhanced vitality and strength with Charak Pure Gokshura. Sourced from the finest farms, our high-potency Gokshura helps boost stamina, support muscle recovery, and promote overall wellness.",
      benefits: [
        "Enhances stamina, endurance & muscle strength",
        "Supports testosterone levels & reproductive health",
        "Aids in kidney & urinary tract health",
        "Promotes hormonal balance & vitality",
        "Reduces stress & improves overall well-being",
        "100% Pure & Chemical-Free – No Additives",
      ],
      whyChoose: [
        "High-potency Gokshura extract for maximum effectiveness",
        "Lab-tested for purity & safety",
        "Available in capsules, powder, or liquid extract",
        "Backed by Ayurvedic principles & trusted by experts",
        "100% Natural & Organic – No fillers, additives, or artificial preservatives",
      ],
      howToUse: [
        "Capsules: Take 1-2 capsules daily with a glass of water.",
        "Liquid Extract: Add a few drops to water or juice as recommended.",
      ],
      reviews: [
        '"My energy levels have improved significantly! Great quality Gokshura." – Rahul S.',
        '"I feel more balanced and stronger since using this product daily." – Priya K.',
      ],
    },
    {
      id:16,
      name: "[Charak] Premium Organic Ashwagandha – The Ultimate Stress & Vitality Booster",
      tagline: "Restore Balance, Energy & Strength Naturally",
      price: 4999,
      oldPrice: 7299,
      savings: "Save ₹2,300",
      image: "https://pngimg.com/d/water_bottle_PNG98959.png",
      brand: "CharakWellness",
      description:
        "Harness the power of Ashwagandha, the ancient Ayurvedic adaptogen, known for its ability to reduce stress, boost energy, and enhance overall well-being. Our 100% pure, organic Ashwagandha is sourced from high-quality roots and carefully processed to retain its maximum potency.",
      benefits: [
        "Reduces stress & anxiety",
        "Boosts energy & stamina",
        "Enhances strength & endurance",
        "Supports hormonal balance & immunity",
        "Improves sleep quality & relaxation",
        "100% Pure & Natural – No Artificial Additives",
      ],
      whyChoose: [
        "High-potency Ashwagandha extract for maximum benefits",
        "Lab-tested for purity & safety",
        "Available in easy-to-consume capsules, powder, or liquid extract",
        "Trusted by Ayurvedic experts",
        "100% Organic & Pure – No fillers, additives, or artificial preservatives",
      ],
      howToUse: [
        "Capsules: Take 1-2 capsules daily with a glass of water.",
        "Liquid Extract: Add a few drops to water or juice as recommended.",
      ],
      reviews: [
        '"I feel more relaxed and focused throughout the day!" – Arjun M.',
        '"Excellent quality! I’ve noticed a great boost in my energy levels." – Sneha P.',
      ],
    },
    {
      id: 17,
      name: "[Charak] Premium Gokshura – Natural Vitality & Wellness Booster",
      tagline: "Boost Vitality & Wellness Naturally with Gokshura",
      price: 5699,
      oldPrice: 8197,
      savings: "Save ₹2,498",
      image: "https://pngimg.com/d/water_bottle_PNG98959.png",
      brand: "CharakWellness",
      description:
        "Discover the ancient Ayurvedic secret to enhanced vitality and strength with Charak Pure Gokshura. Sourced from the finest farms, our high-potency Gokshura helps boost stamina, support muscle recovery, and promote overall wellness.",
      benefits: [
        "Enhances stamina, endurance & muscle strength",
        "Supports testosterone levels & reproductive health",
        "Aids in kidney & urinary tract health",
        "Promotes hormonal balance & vitality",
        "Reduces stress & improves overall well-being",
        "100% Pure & Chemical-Free – No Additives",
      ],
      whyChoose: [
        "High-potency Gokshura extract for maximum effectiveness",
        "Lab-tested for purity & safety",
        "Available in capsules, powder, or liquid extract",
        "Backed by Ayurvedic principles & trusted by experts",
        "100% Natural & Organic – No fillers, additives, or artificial preservatives",
      ],
      howToUse: [
        "Capsules: Take 1-2 capsules daily with a glass of water.",
        "Liquid Extract: Add a few drops to water or juice as recommended.",
      ],
      reviews: [
        '"My energy levels have improved significantly! Great quality Gokshura." – Rahul S.',
        '"I feel more balanced and stronger since using this product daily." – Priya K.',
      ],
    },
    {
      id: 18,
      name: "[Charak] Premium Organic Ashwagandha – The Ultimate Stress & Vitality Booster",
      tagline: "Restore Balance, Energy & Strength Naturally",
      price: 4999,
      oldPrice: 7299,
      savings: "Save ₹2,300",
      image: "https://pngimg.com/d/water_bottle_PNG98959.png",
      brand: "CharakWellness",
      description:
        "Harness the power of Ashwagandha, the ancient Ayurvedic adaptogen, known for its ability to reduce stress, boost energy, and enhance overall well-being. Our 100% pure, organic Ashwagandha is sourced from high-quality roots and carefully processed to retain its maximum potency.",
      benefits: [
        "Reduces stress & anxiety",
        "Boosts energy & stamina",
        "Enhances strength & endurance",
        "Supports hormonal balance & immunity",
        "Improves sleep quality & relaxation",
        "100% Pure & Natural – No Artificial Additives",
      ],
      whyChoose: [
        "High-potency Ashwagandha extract for maximum benefits",
        "Lab-tested for purity & safety",
        "Available in easy-to-consume capsules, powder, or liquid extract",
        "Trusted by Ayurvedic experts",
        "100% Organic & Pure – No fillers, additives, or artificial preservatives",
      ],
      howToUse: [
        "Capsules: Take 1-2 capsules daily with a glass of water.",
        "Liquid Extract: Add a few drops to water or juice as recommended.",
      ],
      reviews: [
        '"I feel more relaxed and focused throughout the day!" – Arjun M.',
        '"Excellent quality! I’ve noticed a great boost in my energy levels." – Sneha P.',
      ],
    },
  ];

  return (
    <section className="bg-white py-10">
      <div className="sm:max-w-7xl mx-auto px-5">
        <h2 className="text-2xl font-bold text-black mb-6">Frequently Bought Together</h2>
        <div className="flex gap-4 sm:overflow-x-auto overflow-scroll no-scrollbar">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md min-w-[250px] border border-gray-300"
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/product/${product.id}`, {
                    state: { product },
                  })
                }
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded"
                />
              </div>
              <h3 className="text-sm font-semibold mt-3 text-black">
                {product.name}
              </h3>
              <div className="text-lg font-bold mt-2 text-black">
                ₹{product.price}
              </div>
              <button
                className="bg-[#96d569] text-black w-full py-2 mt-3 rounded font-bold hover:bg-[#d4be9b]"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
