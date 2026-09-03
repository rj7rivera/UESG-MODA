import { Link } from 'react-router-dom'
import Hero from '../../components/Hero/Hero.jsx'
import useReveal from '../../hooks/useReveal.js'
import blogPosts from '../Blog/blogContent.js'
import homeContent from './homeContent.js'
import './Home.css'

const FEATURED_POSTS = blogPosts.slice(0, 3)

function SectionMark({ number, label, tone }) {
  return (
    <div className={`home-mark${tone === 'dark' ? ' home-mark--dark' : ''}`}>
      <span>{number}</span>
      <p>{label}</p>
    </div>
  )
}

function UniverseTile({ universe, index }) {
  const { elementRef, isVisible } = useReveal()

  return (
    <li
      className={`home-universe home-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      style={{ '--home-reveal-delay': `${(index % 4) * 90}ms` }}
    >
      <Link className="home-universe__link" to={universe.to}>
        <span className="home-universe__media">
          <img
            src={universe.image}
            alt={universe.alt}
            width={universe.width}
            height={universe.height}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: universe.position }}
          />
        </span>
        <span className="home-universe__meta">
          <span className="home-universe__number">{universe.number}</span>
          <span className="home-universe__name">{universe.name}</span>
        </span>
        <span className="home-universe__text">{universe.text}</span>
      </Link>
    </li>
  )
}

function JournalItem({ post, index }) {
  const { elementRef, isVisible } = useReveal()

  return (
    <article
      className={`home-journal-card home-reveal${isVisible ? ' is-visible' : ''}`}
      ref={elementRef}
      style={{ '--home-reveal-delay': `${(index % 3) * 90}ms` }}
    >
      <Link className="home-journal-card__media" to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <img
          src={post.image.src}
          alt=""
          width={post.image.width}
          height={post.image.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: post.image.position }}
        />
      </Link>
      <p className="home-journal-card__number" aria-hidden="true">{post.number}</p>
      <h3>
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="home-journal-card__excerpt">{post.excerpt}</p>
    </article>
  )
}

function Home() {
  const { elementRef: manifestoRef, isVisible: isManifestoVisible } = useReveal()
  const { elementRef: universesRef, isVisible: areUniversesVisible } = useReveal()
  const { elementRef: brandRef, isVisible: isBrandVisible } = useReveal()
  const { elementRef: purposeRef, isVisible: isPurposeVisible } = useReveal()
  const { elementRef: journalRef, isVisible: isJournalVisible } = useReveal()
  const { elementRef: invitationRef, isVisible: isInvitationVisible } = useReveal()

  const { manifesto, universes, brand, purpose, journal, invitation } = homeContent

  return (
    <div className="home-page">
      <Hero />

      <section
        className={`home-manifesto home-reveal${isManifestoVisible ? ' is-visible' : ''}`}
        ref={manifestoRef}
        aria-labelledby="home-manifesto-title"
      >
        <div className="home-manifesto__inner">
          <SectionMark number={manifesto.number} label={manifesto.eyebrow} />
          <h2 id="home-manifesto-title">{manifesto.title}</h2>
          <p className="home-manifesto__text">{manifesto.text}</p>
          <p className="home-manifesto__signature">{manifesto.signature}</p>
        </div>
      </section>

      <section
        className={`home-universes home-reveal${areUniversesVisible ? ' is-visible' : ''}`}
        ref={universesRef}
        aria-labelledby="home-universes-title"
      >
        <div className="home-universes__heading">
          <SectionMark number={universes.number} label={universes.eyebrow} tone="dark" />
          <h2 id="home-universes-title">{universes.title}</h2>
          <p>{universes.text}</p>
        </div>

        <ul className="home-universes__grid">
          {universes.items.map((universe, index) => (
            <UniverseTile key={universe.id} universe={universe} index={index} />
          ))}
        </ul>

        <Link className="home-link" to="/tienda">
          <span>{universes.linkLabel}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section
        className={`home-feature home-reveal${isBrandVisible ? ' is-visible' : ''}`}
        ref={brandRef}
        aria-labelledby="home-brand-title"
      >
        <div className="home-feature__inner">
          <figure className="home-feature__media">
            <img
              src={brand.image}
              alt={brand.alt}
              width={brand.width}
              height={brand.height}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: brand.position }}
            />
          </figure>
          <div className="home-feature__copy">
            <SectionMark number={brand.number} label={brand.eyebrow} tone="dark" />
            <h2 id="home-brand-title">{brand.title}</h2>
            <p>{brand.text}</p>
            <Link className="home-link home-link--dark" to={brand.to}>
              <span>{brand.linkLabel}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className={`home-feature home-feature--reverse home-feature--invert home-reveal${isPurposeVisible ? ' is-visible' : ''}`}
        ref={purposeRef}
        aria-labelledby="home-purpose-title"
      >
        <div className="home-feature__inner">
          <figure className="home-feature__media">
            <img
              src={purpose.image}
              alt={purpose.alt}
              width={purpose.width}
              height={purpose.height}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: purpose.position }}
            />
          </figure>
          <div className="home-feature__copy">
            <SectionMark number={purpose.number} label={purpose.eyebrow} />
            <h2 id="home-purpose-title">{purpose.title}</h2>
            <p>{purpose.text}</p>
            <Link className="home-link" to={purpose.to}>
              <span>{purpose.linkLabel}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className={`home-journal home-reveal${isJournalVisible ? ' is-visible' : ''}`}
        ref={journalRef}
        aria-labelledby="home-journal-title"
      >
        <div className="home-journal__heading">
          <SectionMark number={journal.number} label={journal.eyebrow} tone="dark" />
          <h2 id="home-journal-title">{journal.title}</h2>
        </div>

        <div className="home-journal__grid">
          {FEATURED_POSTS.map((post, index) => (
            <JournalItem key={post.id} post={post} index={index} />
          ))}
        </div>

        <Link className="home-link home-link--dark" to={journal.to}>
          <span>{journal.linkLabel}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section
        className={`home-invitation home-reveal${isInvitationVisible ? ' is-visible' : ''}`}
        ref={invitationRef}
        aria-labelledby="home-invitation-title"
      >
        <img
          className="home-invitation__background"
          src={invitation.image}
          alt=""
          width={invitation.width}
          height={invitation.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: invitation.position }}
        />
        <div className="home-invitation__inner">
          <SectionMark number={invitation.number} label={invitation.eyebrow} />
          <h2 id="home-invitation-title">{invitation.title}</h2>
          <p>{invitation.text}</p>
          <Link className="home-link" to={invitation.to}>
            <span>{invitation.linkLabel}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
