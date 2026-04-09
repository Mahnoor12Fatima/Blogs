
import { Route,Routes } from 'react-router-dom'
import Blogs from './components/Blogs'
import Contact from './components/Contact'
import CreateBlogs from './components/CreateBlogs'
import BlogDetail from './components/BlogDetail'
import EditBlog from './components/EditBlog'

function App() {

  return (
    <>
     <div className='bg-black text-center py-2 shadow-lg'>
    <h1 className='text-white'>React & Laravel blog App</h1>
    </div>
    <Routes>
      <Route path='/' element={<Blogs/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/create' element={<CreateBlogs/>}/>
      <Route path='/blog/:id' element={<BlogDetail/>}/>
      <Route path='/blog/edit/:id' element={<EditBlog/>}/>
    </Routes>
   
   
     </>
  )
}

export default App
