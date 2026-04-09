import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Blog = {
 
  id: number;
  title: string;
  author: string;
  date: string;
   image: any;
   description:string;

};

const BlogDetail = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const params = useParams();

  const fetchBlog = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/blogs/" + params.id);
    const result = await res.json();
    setBlog(result.data);
  };

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10 space-y-6">

  {/* Header */}
  <div className="flex justify-between items-center border-b pb-4">
    <h1 className="text-3xl font-bold">{blog.title}</h1>
    
    <a
      href="/"
      className="border bg-black text-white px-4 py-2 rounded"
    >
      Back to Blogs
    </a>
  </div>

  {/* Author + Date */}
  <p className="text-gray-600">
    by <strong>{blog.author}</strong> on {blog.date}
  </p>

  {/* Image */}
  {blog.image && (
    <img
      className="w-full h-auto rounded-lg shadow-md"
      src={`http://127.0.0.1:8000/uploads/blogs/${blog.image}`}
      alt={blog.title}
    />
  )}
  <div>
    {blog.description}
  </div>

</div>
  );
};

export default BlogDetail;