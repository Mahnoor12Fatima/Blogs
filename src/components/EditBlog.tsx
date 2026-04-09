
import React, { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ContentEditableEvent } from "react-simple-wysiwyg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
type BlogFormInputs = {
  title: string;
  shortDesc?: string;
  author: string;
  image?: FileList;
};
type Blog = {
 
  id: number;
  title: string;
  author: string;
  date: string;
   image: any;
   description:string;

};
const EditBlog = () => {
      const [html, setHtml] = useState<string>("");
      const [imageId, setimageId] = useState("");
       const [blog, setBlog] = useState<Blog | null>(null);
      const navigate =useNavigate();
       const params = useParams();
      // ✅ useForm with types
      const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
      } = useForm<BlogFormInputs>();
    
      // ✅ Editor change (typed properly)
      const onChange = (e: ContentEditableEvent) => {
      setHtml(e.target.value);
      };
      const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
      
        const formData = new FormData();
        formData.append("image", file);
      
        try {
          const res = await fetch("http://127.0.0.1:8000/api/save-temp-image", {
            method: "POST",
            headers: {
              Accept: "application/json", // ✅ IMPORTANT
            },
            body: formData,
          });
      
          const data = await res.json();
          console.log("Uploaded Image:", data);
      
          // ❌ Handle validation error FIRST
          if (!data.status) {
            if (data.errors?.image) {
              alert(data.errors.image[0]); // ✅ show first error
            } else {
              alert("Image upload failed");
            }
      
            e.target.value = ""; // ✅ correct reset
            return;
          }
          setimageId(data.image.id);
      
          // ✅ Success
          toast.success("Image uploaded successfully");
      
        } catch (error) {
          console.error("Upload Error:", error);
          toast.error("Image upload failed");
        }
      };
       const formSubmit: SubmitHandler<BlogFormInputs> = async (data) => {
        const newData = {
          ...data,
          description: html,
          image_id: imageId,
        };
      
        try {
          const res = await fetch("http://127.0.0.1:8000/api/blogs/"+params.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(newData),
          });
      
          // ✅ Handle server error FIRST
          if (!res.ok) {
            const text = await res.text(); // 👈 IMPORTANT
            console.error("Server Error:", text);
            toast.error("Failed to create blog");
            return;
          }
      
          // ✅ Now safe to parse JSON
          const result = await res.json();
          console.log(result);
      
          toast.success("Blog updates successfully");
      
          setTimeout(() => {
            navigate("/");
          }, 1500);
      
        } catch (error) {
          console.error("Error:", error);
          toast.error("Something went wrong");
        }
      };
        const fetchBlog = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/blogs/" + params.id);
    const result = await res.json();
    setBlog(result.data);
    setHtml(result.data.description)
    reset(result.data);
  };
  useEffect(()=>{
fetchBlog();
  },[]);
    
  return (
    <div className="max-w-4xl mx-auto px-4 my-5">
         <ToastContainer />
         <div className="flex px-6 justify-between items-center">
           <h4>Edit Blogs</h4>
           <a href="/" className="border bg-black text-white px-4 py-2 rounded">
             Back
           </a>
         </div>
   
         {/* FORM */}
         <form
           onSubmit={handleSubmit(formSubmit)}
           className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6"
         >
           {/* Title */}
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Title
             </label>
             <input
               type="text"
               placeholder="Title"
               {...register("title", { required: true, minLength: 10 })}
               className="w-full border border-gray-300 rounded-lg px-3 py-2"
             />
             {errors.title && (
               <p className="text-red-500 text-sm">
                 Title must be at least 10 characters
               </p>
             )}
           </div>
   
           {/* Short Description */}
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Short Description
             </label>
             <textarea
               {...register("shortDesc")}
               className="w-full border border-gray-300 rounded-lg px-3 py-2"
             ></textarea>
           </div>
   
           {/* Description */}
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Description
             </label>
             <Editor
               value={html}
               containerProps={{ style: { height: "200px" } }}
               onChange={onChange}
             />
           </div>
   
           {/* Image */}
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Image
             </label>
             <input
               type="file"
               onChange={handleFileChange}
               className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:bg-black file:text-white"
             />
    {blog && (
  <>
    {blog.image && (
      <img
        className="w-full h-auto rounded-lg shadow-md mt-3"
        src={`http://127.0.0.1:8000/uploads/blogs/${blog.image}`}
        alt={blog.title}
      />
    )}
  </>
)}
           </div>
   
           {/* Author */}
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Author
             </label>
             <input
               type="text"
               placeholder="Author"
               {...register("author", { required: true, minLength: 3 })}
               className="w-full border border-gray-300 rounded-lg px-3 py-2"
             />
             {errors.author && (
               <p className="text-red-500 text-sm">
                 Author must be at least 3 characters
               </p>
             )}
           </div>
   
           {/* Button */}
           <button
             type="submit"
             className="w-full bg-black text-white py-2 rounded-lg"
           >
             Update
           </button>
         </form>
       </div>
  )
}

export default EditBlog