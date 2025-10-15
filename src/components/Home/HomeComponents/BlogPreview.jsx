import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../../services/blogService";

const BlogPreview = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const data = await getAllBlogs();
        const sorted = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
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
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
          From Our <span className="text-green-700">Wellness Blog</span>
        </h2>

        {/* Mobile Carousel */}
        <div className="md:hidden flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {latestBlogs.map((post) => (
            <Link
              to={`/blogs/${post._id}`}
              key={post._id}
              className="
                  w-[80%] sm:w-[70%] 
                  max-w-sm 
                  snap-start 
                  bg-white 
                  rounded-2xl 
                  shadow-md 
                  hover:shadow-xl 
                  transition-transform 
                  duration-300 
                  overflow-hidden 
                  flex-shrink-0 
                  mx-auto
                "
            >
              <img
                    src={post.mainImg}
                    alt={post.title}
                    className="
                      h-52 sm:h-56 
                      w-auto 
                      max-w-full 
                      mx-auto 
                      object-contain 
                      rounded-t-2xl 
                      bg-gray-100
                    "
                  />
              <div className="p-5 text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">
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
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {latestBlogs.map((post) => (
            <Link
              to={`/blogs/${post._id}`}
              key={post._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 overflow-hidden"
            >
              <img
                src={post.mainImg}
                alt={post.title}
                className="w-full h-56 lg:h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {formatDate(post.createdAt)}
                </p>
                <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                  {post.description}
                </p>
                <span className="text-green-600 text-sm font-medium mt-3 inline-block">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/blogs"
            className="inline-block bg-green-700 text-white px-8 py-2.5 rounded-full font-semibold hover:bg-green-800 transition"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
