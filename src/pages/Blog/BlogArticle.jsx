import { Link, Navigate, useParams } from 'react-router-dom'
import { getBlogPost } from './blogContent.js'
import './BlogArticle.css'

function BlogArticle() {
  const { slug } = useParams()
  const post = getBlogPost(slug)

  if (!post) return <Navigate to="/blog" replace />

  const imageOrientation = post.image.width < post.image.height ? 'portrait' : 'landscape'

  return (
    <article className="blog-article">
      <header className="blog-article__masthead">
        <nav className="blog-article__breadcrumb" aria-label="Migas de pan">
          <ol>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>

        <div className="blog-article__heading">
          <p><span>{post.number}</span> / UESG Blog</p>
          <h1>{post.articleTitle}</h1>
        </div>
      </header>

      <figure className={`blog-article__featured blog-article__featured--${imageOrientation}`}>
        <img
          src={post.image.src}
          alt={post.image.alt}
          width={post.image.width}
          height={post.image.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{ objectPosition: post.image.position }}
        />
      </figure>

      <section className="blog-article__intro" aria-labelledby="blog-article-intro-title">
        <h2 className="visually-hidden" id="blog-article-intro-title">Introducción</h2>
        <p className="blog-article__intro-label">{post.number} / Introducción</p>
        <p className="blog-article__lead">{post.excerpt}</p>
      </section>

      <section className="blog-article__body" aria-labelledby="blog-article-body-title">
        <h2 className="visually-hidden" id="blog-article-body-title">Artículo</h2>
        <div className="blog-article__copy">
          {post.body.map((paragraph, index) => (
            <p key={`${post.id}-paragraph-${index + 1}`}>{paragraph}</p>
          ))}
        </div>
      </section>

      {post.quote ? (
        <blockquote className="blog-article__quote">
          <p>“{post.quote.text}”</p>
          <footer>— {post.quote.attribution}</footer>
        </blockquote>
      ) : null}

      {post.gallery.length > 0 ? (
        <section className="blog-article__gallery" aria-labelledby="blog-gallery-title">
          <div className="blog-article__gallery-heading">
            <p>{String(post.gallery.length).padStart(2, '0')} / Fotografías</p>
            <h2 id="blog-gallery-title">Galería</h2>
          </div>

          <div className="blog-article__gallery-grid">
            {post.gallery.map((image, index) => (
              <figure
                className={image.width < image.height ? 'is-portrait' : 'is-landscape'}
                key={image.src}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption aria-hidden="true">
                  {String(index + 1).padStart(2, '0')} / {String(post.gallery.length).padStart(2, '0')}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <div className="blog-article__back">
        <Link to="/blog">
          <span aria-hidden="true">←</span>
          Volver al blog
        </Link>
      </div>
    </article>
  )
}

export default BlogArticle
