import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../../services/blogService";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaPenNib } from "react-icons/fa";
import { motion } from "framer-motion";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await getBlogById(id);
      setPost(data);
      setEditedPost(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch blog post");
      toast.error("Failed to fetch blog post");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedPost = await updateBlog(id, editedPost);
      setPost(updatedPost);
      setIsEditing(false);
      toast.success("Blog updated successfully");
    } catch (err) {
      toast.error("Failed to update blog");
    }
  };

  const handleCancel = () => {
    setEditedPost(post);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Shared Styles
  const inputClasses = "w-full p-4 rounded-xl bg-white border border-[#715036]/20 text-[#2A3B28] placeholder:text-[#715036]/40 focus:outline-none focus:ring-2 focus:ring-[#C17C3A] focus:border-transparent transition-all duration-300 font-medium";
  const labelClasses = "block text-xs font-bold text-[#715036] uppercase tracking-wider mb-2";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C17C3A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-red-500 font-serif text-xl">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-[#715036] font-serif text-xl">Blog post not found</div>
      </div>
    );
  }

  return (
    // Background: Cream
    <section className="bg-[#FDFBF7] min-h-screen py-12 px-4 sm:px-6 relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2A3B28]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C17C3A]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#715036] hover:text-[#2A3B28] transition-colors font-bold text-sm uppercase tracking-wider group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>

          {!isEditing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-white border border-[#715036]/20 px-4 py-2 rounded-full text-[#2A3B28] hover:bg-[#2A3B28] hover:text-white transition-all shadow-sm text-sm font-bold uppercase tracking-wider"
            >
              <FaEdit /> Edit Article
            </button>
          )}
        </div>

        {isEditing ? (
          // --- EDIT MODE ---
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-[#715036]/10"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-[#715036]/10 pb-4">
              <FaPenNib className="text-[#C17C3A]" />
              <h2 className="text-xl font-serif font-bold text-[#2A3B28]">Editing Mode</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className={labelClasses}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={editedPost.title}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Short Description</label>
                <textarea
                  name="description"
                  value={editedPost.description}
                  onChange={handleChange}
                  className={inputClasses}
                  rows="4"
                />
              </div>

              <div>
                <label className={labelClasses}>Full Content (HTML Supported)</label>
                <textarea
                  name="content"
                  value={editedPost.content}
                  onChange={handleChange}
                  className={`${inputClasses} font-mono text-sm`}
                  rows="12"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-[#715036]/10">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 border border-[#715036]/20 rounded-full text-[#715036] hover:bg-[#FDFBF7] font-bold text-sm uppercase tracking-wider transition-all"
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-[#2A3B28] text-white rounded-full hover:bg-[#C17C3A] font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                >
                  <FaSave /> Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          // --- VIEW MODE ---
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-sm border border-[#715036]/10 overflow-hidden"
          >
            {/* Main Image */}
            <div className="relative h-[300px] md:h-[400px] w-full bg-[#FDFBF7]">
              <img
                src={post.mainImg}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A3B28]/80 to-transparent"></div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <div className="flex items-center gap-2 text-[#C17C3A] mb-3 font-bold text-xs uppercase tracking-widest bg-black/30 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/10">
                  <FaCalendarAlt />
                  {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight shadow-sm">
                  {post.title}
                </h1>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Short Description / Intro */}
              <p className="text-xl text-[#2A3B28] font-medium leading-relaxed mb-10 border-l-4 border-[#C17C3A] pl-6 italic bg-[#FDFBF7] py-4 rounded-r-lg">
                {post.description}
              </p>

              {/* Main Content Render */}
              <div className="prose prose-lg max-w-none text-[#715036]/80 
                    prose-headings:font-serif prose-headings:text-[#2A3B28] prose-headings:font-bold
                    prose-a:text-[#C17C3A] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[#2A3B28]
                    prose-blockquote:border-l-[#C17C3A] prose-blockquote:bg-[#FDFBF7] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                    prose-img:rounded-2xl prose-img:shadow-md
                    leading-relaxed
                ">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Secondary Images Grid */}
              {post.secondaryImg && post.secondaryImg.length > 0 && (
                <div className="mt-16 pt-10 border-t border-[#715036]/10">
                  <h2 className="text-2xl font-serif font-bold text-[#2A3B28] mb-6 flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[#C17C3A]"></span>
                    Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {post.secondaryImg.map((img, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl overflow-hidden shadow-md border border-[#715036]/10 h-64 bg-[#FDFBF7]"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.article>
        )}
      </div>
    </section>
  );
};

export default BlogDetail;