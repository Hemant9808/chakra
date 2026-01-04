import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs, deleteBlog, createBlog, updateBlog } from "../../services/blogService";
import { toast } from "react-hot-toast";
import { Editor } from '@tinymce/tinymce-react';
import useAuthStore from "../../Store/useAuthStore";
import { FaArrowRight, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: '',
    mainImg: '',
    description: '',
    secondaryImg: [],
    secondaryDesc: '',
    content: ''
  });

  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://wellvas-backend.onrender.com/product/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.coverImage) {
        return data.coverImage;
      } else {
        console.error("Upload failed:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleEditorChange = (newContent, editor) => {
    setContent(newContent);
    setCurrentBlog(prev => ({ ...prev, content: newContent }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await handleFileUpload(file);
      if (url) {
        setCurrentBlog(prev => ({ ...prev, mainImg: url }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateBlog(currentBlog._id, currentBlog);
        toast.success('Blog updated successfully');
      } else {
        await createBlog(currentBlog);
        toast.success('Blog created successfully');
      }
      setIsDialogOpen(false);
      fetchBlogs();
      resetForm();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update blog' : 'Failed to create blog');
    }
  };

  const resetForm = () => {
    setCurrentBlog({
      title: '',
      mainImg: '',
      description: '',
      secondaryImg: [],
      secondaryDesc: '',
      content: ''
    });
    setContent('');
    setIsEditing(false);
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setContent(blog.content);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      const sortedBlogs = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBlogs(sortedBlogs);
      setError(null);
    } catch (err) {
      setError("Failed to fetch blogs");
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(id);
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } catch (err) {
        toast.error("Failed to delete blog");
      }
    }
  };

  // Styles for inputs
  const inputClasses = "w-full p-3 rounded-lg bg-[#FDFBF7] border border-[#715036]/20 text-[#2A3B28] placeholder:text-[#715036]/40 focus:outline-none focus:ring-2 focus:ring-[#C17C3A] focus:border-transparent transition-all duration-300";
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
        <div className="text-red-500 font-serif text-lg">{error}</div>
      </div>
    );
  }

  return (
    // Background: Cream
    <section className="pt-30 bg-[#FDFBF7] py-20 px-4 sm:px-6 relative overflow-hidden">

      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A3B28]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <span className="text-[#C17C3A] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
              Wellness Journal
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2A3B28]">
              Our Latest Posts
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="bg-[#2A3B28] text-white px-6 py-3 rounded-full hover:bg-[#C17C3A] transition-all duration-300 shadow-lg flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
            >
              <FaPlus /> Add New Blog
            </button>
          )}
        </div>

        {/* Blog Dialog - Only show if user is admin */}
        {isAdmin && isDialogOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[#715036]/10">
              <div className="p-6 border-b border-[#715036]/10 bg-[#FDFBF7]">
                <h3 className="text-2xl font-serif font-bold text-[#2A3B28]">
                  {isEditing ? 'Edit Article' : 'Create New Article'}
                </h3>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={labelClasses}>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={currentBlog.title}
                      onChange={handleInputChange}
                      className={inputClasses}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Main Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageChange}
                      className="block w-full text-sm text-[#715036]
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-xs file:font-bold file:uppercase file:tracking-wider
                        file:bg-[#2A3B28] file:text-white
                        file:cursor-pointer hover:file:bg-[#C17C3A]
                        transition-all duration-300"
                    />
                    {currentBlog.mainImg && (
                      <div className="mt-4 rounded-lg overflow-hidden border border-[#715036]/20 w-fit">
                        <img src={currentBlog.mainImg} alt="Main" className="h-40 object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={labelClasses}>Short Description</label>
                    <textarea
                      name="description"
                      value={currentBlog.description}
                      onChange={handleInputChange}
                      className={inputClasses}
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Secondary Description</label>
                    <textarea
                      name="secondaryDesc"
                      value={currentBlog.secondaryDesc}
                      onChange={handleInputChange}
                      className={inputClasses}
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Content</label>
                    <div className="border border-[#715036]/20 rounded-lg overflow-hidden">
                      <Editor
                        apiKey='1me8jbsjux1lek0xoq6018iujrx1jv9isuam7bu259kygrqt'
                        init={{
                          height: 400,
                          menubar: false,
                          plugins: [
                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                          ],
                          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | image link',
                          images_upload_handler: async (blobInfo, success, failure) => {
                            const file = blobInfo.blob();
                            const imageUrl = await handleFileUpload(file);
                            if (imageUrl) {
                              success(imageUrl);
                            } else {
                              failure('Image upload failed');
                            }
                          },
                          content_style: 'body { font-family:serif; font-size:16px; color: #2A3B28 }'
                        }}
                        value={content}
                        onEditorChange={handleEditorChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-[#715036]/10">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDialogOpen(false);
                        resetForm();
                      }}
                      className="px-6 py-3 border border-[#715036]/20 rounded-full text-[#715036] hover:bg-[#FDFBF7] font-bold text-sm uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#2A3B28] text-white rounded-full hover:bg-[#C17C3A] font-bold text-sm uppercase tracking-wider shadow-md transition-all"
                    >
                      {isEditing ? 'Update Article' : 'Publish Article'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-sm border border-[#715036]/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#C17C3A]/30 transform hover:-translate-y-1 group flex flex-col h-full"
            >
              <div className="h-56 overflow-hidden bg-[#FDFBF7] relative">
                <img
                  src={post.mainImg}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold text-white bg-[#C17C3A] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Article
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3 text-xs text-[#715036]/60 font-medium uppercase tracking-wide">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>

                <h3 className="text-xl font-serif font-bold text-[#2A3B28] mb-3 line-clamp-2 group-hover:text-[#C17C3A] transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-[#715036]/70 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">
                  {post.description}
                </p>

                <div className="pt-4 border-t border-[#715036]/10 flex justify-between items-center">
                  <Link
                    to={`/blogs/${post._id}`}
                    className="text-[#2A3B28] font-bold text-sm uppercase tracking-wider group-hover:text-[#C17C3A] transition-colors flex items-center gap-2"
                  >
                    Read Article <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {isAdmin && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-[#2A3B28] hover:text-[#C17C3A] transition-colors p-2 hover:bg-[#FDFBF7] rounded-full"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  )}
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