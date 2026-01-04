import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../../services/blogService";
import { FaArrowRight } from "react-icons/fa";

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
    // Background: Cream
    <section className="bg-[#FDFBF7] py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A3B28]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A3B28] mb-4">
          Wellness <span className="text-[#C17C3A] italic">Journal</span>
        </h2>
        <p className="text-[#715036]/80 max-w-2xl mx-auto font-medium mb-12">
          Ancient wisdom for modern living. Explore our latest articles on health, balance, and vitality.
        </p>

        {/* Mobile Carousel */}
        <div className="md:hidden flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4">
          {latestBlogs.map((post) => (
            <Link
              to={`/blogs/${post._id}`}
              key={post._id}
              className="w-[280px] snap-center bg-white rounded-2xl shadow-sm border border-[#715036]/10 overflow-hidden flex-shrink-0 mx-auto block group"
            >
              <div className="h-48 overflow-hidden bg-[#FDFBF7] relative">
                <img
                  src={post.mainImg}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#2A3B28]/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>

              <div className="p-6 text-left flex flex-col h-[220px]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-white bg-[#C17C3A] px-2 py-1 rounded-full uppercase tracking-wider">
                    Article
                  </span>
                  <span className="text-xs text-[#715036]/60 font-medium">
                    {formatDate(post.createdAt)}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#2A3B28] line-clamp-2 mb-2 group-hover:text-[#C17C3A] transition-colors">
                  {post.title}
                </h3>

                <p className="text-[#715036]/70 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {post.description}
                </p>

                <div className="mt-auto pt-4 border-t border-[#715036]/10 flex items-center text-[#2A3B28] text-sm font-bold group-hover:text-[#C17C3A] transition-colors gap-2">
                  Read Article <FaArrowRight size={12} />
                </div>
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
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-[#715036]/10 overflow-hidden group transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-60 overflow-hidden bg-[#FDFBF7] relative">
                <img
                  src={post.mainImg}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#2A3B28]/0 group-hover:bg-[#2A3B28]/10 transition-colors duration-300"></div>
              </div>

              <div className="p-8 flex flex-col h-[280px]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold text-[#C17C3A] bg-[#C17C3A]/10 px-3 py-1 rounded-full uppercase tracking-wider border border-[#C17C3A]/20">
                    Wellness
                  </span>
                  <span className="text-xs text-[#715036]/60 font-medium uppercase tracking-wide">
                    {formatDate(post.createdAt)}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#2A3B28] line-clamp-2 mb-3 group-hover:text-[#C17C3A] transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-[#715036]/70 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {post.description}
                </p>

                <div className="mt-auto flex items-center text-[#2A3B28] font-bold text-sm uppercase tracking-wider group-hover:text-[#C17C3A] transition-colors gap-2">
                  Read Full Story <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <Link
            to="/blogs"
            className="inline-block bg-[#2A3B28] text-white px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#C17C3A] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;