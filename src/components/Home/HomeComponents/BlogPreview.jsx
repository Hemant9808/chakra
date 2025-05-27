import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../../services/blogService"; // Adjust path based on your project

const BlogPreview = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const data = await getAllBlogs();
        const sorted = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3); // show latest 3 blogs
        setLatestBlogs(sorted);
      } catch (error) {
        console.error("Failed to load blogs", error);
      }
    };

    fetchLatestBlogs();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          From Our <span className="text-green-700">Wellness Blog</span>
        </h2>

        {/* Mobile Carousel */}
        <div className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {latestBlogs.map((post) => (
            <Link
              to={`/blogs/${post._id}`}
              key={post._id}
              className="min-w-[85%] snap-start bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex-shrink-0"
            >
              <img
                src={post.mainImg}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {formatDate(post.createdAt)}
                </p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {post.description}
                </p>
                <span className="text-green-600 text-sm font-medium mt-2 inline-block">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 text-left">
          {latestBlogs.map((post) => (
            <Link
              to={`/blogs/${post._id}`}
              key={post._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={post.mainImg}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {formatDate(post.createdAt)}
                </p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {post.description}
                </p>
                <span className="text-green-600 text-sm font-medium mt-2 inline-block">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/blogs"
            className="inline-block bg-green-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
