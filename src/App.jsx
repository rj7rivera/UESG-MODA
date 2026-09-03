import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout.jsx'
import {
  loadBlog,
  loadBlogArticle,
  loadContacto,
  loadHome,
  loadNosotros,
  loadRazonSocial,
  loadTienda,
} from './routes/routeLoaders.js'

const Home = lazy(loadHome)
const Nosotros = lazy(loadNosotros)
const RazonSocial = lazy(loadRazonSocial)
const Tienda = lazy(loadTienda)
const Blog = lazy(loadBlog)
const BlogArticle = lazy(loadBlogArticle)
const Contacto = lazy(loadContacto)

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="razon-social" element={<RazonSocial />} />
        <Route path="tienda" element={<Tienda />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogArticle />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
