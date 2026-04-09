import  { useEffect, useState } from 'react'
import BlogCard from './BlogCard'

const Blogs = () => {
  
 const [blogs, setBlogs] = useState<any[]>([]);
 const [keyword,setKeyword]=useState('');
  const fetchBlogs=async()=>{
    const res=await fetch('http://127.0.0.1:8000/api/blogs')
    const result=await res.json();
    setBlogs(result.data)
    console.log(result);
  }
  const searchBlogs=async (e:any)=>{
e.preventDefault();
const res=await fetch('http://127.0.0.1:8000/api/blogs?keyword='+keyword)
    const result=await res.json();
    setBlogs(result.data)
    console.log(result);
  }
  const resetSearch=()=>{
    fetchBlogs();
    setKeyword('');
  }
  useEffect(()=>{
    fetchBlogs();
  },[])
  return (
     <div className="max-w-4xl mx-auto mt-10  px-4">
     <div className="flex justify-center mt-6">
    <form onSubmit={searchBlogs} className="flex justify-center mt-8">
  <div className="flex items-center gap-3 bg-white   p-3 w-full max-w-lg">
    
    {/* Input */}
    <input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      type="text"
      placeholder="Search blogs..."
      className="flex-1 px-4 py-2 rounded-md outline-none text-gray-700 border border-gray-200 focus:ring-2 focus:ring-black"
    />

    {/* Search Button */}
    <button
      type="submit"
      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition flex items-center gap-1"
    >
       Search
    </button>

    {/* Reset Button */}
    <button
      type="button"
      onClick={resetSearch}
      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
    >
      Reset
    </button>

  </div>
</form>
</div>
      <div className="flex px-6 justify-between items-center">
        <h4>Blogs</h4>
        <a href="/create" className='border bg-black text-white px-4 py-2 rounded'>Create</a>
      </div>
<div className="max-w-6xl mx-auto px-4">
  <div className="flex flex-wrap">
    {blogs.map((blog: any) => (
  <BlogCard
    key={blog.id}
    blog={blog}
    blogs={blogs}          // ✅ pass this
    setBlogs={setBlogs}    // ✅ pass this
  />
))}
   
    

  </div>
</div>
    </div>
  )
}

export default Blogs