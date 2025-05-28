import React from "react";
import { Link } from "react-router-dom";


const blogPosts = [
  {
    id: 1,
    title: "Scorpion Sex Position: The Bold New Move That’s Shaking Up Bedroom Play",
    description: "The Scorpion position is all about flexibility, deep connection...",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s",
    category: "Intimacy",
    date: "March 31, 2025",
    content: "Here is the full detailed blog content about the Scorpion position...",
  },
  {
    id: 2,
    title: "Unlocking the Dragon Position – A Revolutionary Approach to Intimacy",
    description: "The Dragon position is a mindful approach to intimacy...",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNj3KVn4EbrLuoJ0qYoLWQ4LSiQNWAjQsNQ&s",
    category: "Intimacy",
    date: "March 28, 2025",
    content: "Here is the full detailed blog content about the Dragon position...",
  },
  {
    id: 3,
    title: "Embracing the Lotus Position: A Sensual Harmony",
    description: "The Lotus Position is gentle enough for couples of various sizes...",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg",
    category: "Intimacy",
    date: "March 19, 2025",
    content: "Here is the full detailed blog content about the Lotus position...",
  },
];

const BlogSection = () => {
  return (
    <section className="bg-gray-50 py-10">
   d
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Our Latest Posts
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <span className="text-sm font-semibold text-red-500 bg-red-100 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{post.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link to={`/blogs/${post.id}`} className="text-blue-500 hover:underline">
                      Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
