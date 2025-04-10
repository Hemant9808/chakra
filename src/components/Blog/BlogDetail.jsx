import React from "react";
import { useParams } from "react-router-dom";


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

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <h2 className="text-center text-red-500">Blog not found!</h2>;
  }

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-lg" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">{post.title}</h1>
        <p className="text-gray-500 text-sm mt-2">{post.date}</p>
        <p className="mt-4 text-gray-700 leading-relaxed">{post.content}</p>
      </div>
    </section>
  );
};

export default BlogDetail;
