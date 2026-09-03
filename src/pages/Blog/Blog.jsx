import { Link } from 'react-router-dom'
import useReveal from '../../hooks/useReveal.js'
import blogPosts from './blogContent.js'
import './Blog.css'

function BlogCard({ post, index }) {
  const { elementRef, isVisible } = useReveal()

  return (
    <article
      className={`blog-card blog-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      style={{ '--blog-reveal-delay': `${(index % 3) * 80}ms` }}
    >
      <Link
        className="blog-card__media"
        to={`/blog/${post.slug}`}
        aria-label={`Leer ${post.title}`}
      >
        <img
          src={post.image.src}
          alt={post.image.alt}
          width={post.image.width}
          height={post.image.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: post.image.position }}
        />
      </Link>

      <div className="blog-card__meta" aria-hidden="true">
        <span>{post.number}</span>
        <span />
        <span>UESG</span>
      </div>

      <h3>
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
      <Link
        className="blog-card__link"
        to={`/blog/${post.slug}`}
        aria-label={`Ver más: ${post.title}`}
      >
        <span>Ver más</span>
        <span aria-hidden="true">↗</span>
      </Link>
    </article>
  )
}

function Blog() {
  return (
    <div className="blog-page">
      <header className="blog-hero">
        <div className="blog-hero__inner">
          <nav className="blog-breadcrumb" aria-label="Migas de pan">
            <ol>
              <li><Link to="/">Inicio</Link></li>
              <li aria-current="page">Blog</li>
            </ol>
          </nav>

          <div className="blog-hero__heading">
            <p>UESG / 04</p>
            <h1>Nuestro <span>Blog</span></h1>
          </div>

          <p className="blog-hero__count">
            <span>06</span>
            Publicaciones
          </p>
        </div>
      </header>

      <section className="blog-index" aria-labelledby="blog-index-title">
        <div className="blog-index__heading">
          <p>01—06 / Archivo</p>
          <h2 id="blog-index-title">Publicaciones</h2>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Blog
