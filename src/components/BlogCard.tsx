import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type Blog = {
  id: number;
  title: string;
  shortDesc: string;
  image?: string;
};
type BlogCardProps = {
  blog: Blog;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
};
const BlogCard = ({ blog, blogs, setBlogs }: BlogCardProps) => {
  const showImage=(img: any)=>{
    return(img)? 'http://127.0.0.1:8000/uploads/blogs/'+img : 'https://placehold.co/600x400';
  }
 const deleteBlog = async (id: any) => {
  if (confirm("Are you sure you want to delete?")) {
    await fetch("http://127.0.0.1:8000/api/blogs/" + id, {
      method: "DELETE",
    });

    const newBlogs = blogs.filter((b: any) => b.id !== id);
    setBlogs(newBlogs);

    toast.success("Blog deleted successfully");
  }
};
  return (
     <div className="w-full md:w-1/2 lg:w-1/4 p-2 ">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        
        <img
          src={showImage(blog.image)}
          alt=""
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">
            {blog.title}
          </h2>

          <p className="text-gray-600 text-sm mb-4">
             {blog.shortDesc}
          </p>

          <div className="flex justify-between items-center">
            <Link to={`/blog/${blog.id}`} className="text-sm px-4 py-2 rounded text-white bg-black">
             Deatails
            </Link>
            <div className='flex'>
  <Link to={`/blog/edit/${blog.id}`} >
             <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="w-5 h-5"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16.862 3.487a2.1 2.1 0 113 3L7.5 18.85l-4 1 1-4L16.862 3.487z"
  />
</svg>
            </Link>
           <a onClick={()=>deleteBlog(blog.id)} className="flex items-center gap-1 text-sm text-red-500 hover:underline">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 7h12M9 7V4h6v3m-7 4v6m4-6v6m4-6v6M5 7l1 14h12l1-14"
    />
  </svg>
  
</a>
</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BlogCard