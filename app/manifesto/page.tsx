import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CosmicShell } from '@/components/cosmic-shell';
import { PublicHeader } from '@/components/public-header';
import sections from '@/content/manifesto.json';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'The Cloud Surfing Jupiter Founding Manifesto',
  description: 'Creativity first. Technology second. Automate the friction. Protect the authorship. The philosophy behind Cloud Surfing Jupiter.',
  alternates: { canonical: 'https://cloudsurfing-jupiter.com/manifesto' },
  openGraph: {
    title: 'The Cloud Surfing Jupiter Founding Manifesto',
    description: 'Can these tools give us more time and space to create?',
    url: 'https://cloudsurfing-jupiter.com/manifesto',
    type: 'article',
    images: [{ url: 'https://cloudsurfing-jupiter.com/csj-bg.jpg' }],
  },
};

// Render the copy's emphasis and HTTPS links as elements, never injected HTML.
function Inline({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\(https:\/\/[^\s)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^\s)]+)\)$/);
    if (link) return <a key={index} href={link[2]}><Inline text={link[1]} /></a>;
    return part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part.startsWith('*') ? <em key={index}>{part.slice(1, -1)}</em>
        : part;
  });
}

export default function ManifestoPage() {
  return (
    <CosmicShell reading>
      <a className={styles.skipLink} href="#manifesto">Skip to article</a>
      <PublicHeader currentPage="/manifesto" />
      <main className={styles.spread}>
        <div className={styles.context}>
          <Link href="/">← Back to Jupiter</Link>
          <span>Manifesto · 15 minute read</span>
        </div>
        <article id="manifesto" className={styles.panel} aria-labelledby="manifesto-title">
          <div className={styles.column}>
            <header className={styles.titleBlock}>
              <div className={styles.orbit} aria-hidden="true" />
              <h1 id="manifesto-title">The Cloud Surfing Jupiter Founding Manifesto</h1>
            </header>
            {sections.map((section, index) => (
              <section key={section.id} aria-labelledby={section.id} className={index === 0 ? styles.opening : styles.section}>
                <h2 id={section.id}><Inline text={section.heading} /></h2>
                {section.id === 'the-razors-edge' && (
                  <figure className={styles.poster}>
                    <a className={styles.posterFrame} href="https://www.impawards.com/1984/razors_edge.html" target="_blank" rel="noreferrer" aria-label="View The Razor's Edge (1984) poster source (opens in a new tab)">
                      <Image src="/razors-edge-1984.jpg" alt="Original illustrated poster for The Razor's Edge, starring Bill Murray, with portraits above a river and mountain scene." width={482} height={755} sizes="200px" />
                    </a>
                    <figcaption>The Razor’s Edge, 1984 · <a href="https://www.impawards.com/1984/razors_edge.html" target="_blank" rel="noreferrer">Poster source ↗</a></figcaption>
                  </figure>
                )}
                {section.blocks.map((block, blockIndex) => {
                  if (block.type === 'heading') return <h3 key={blockIndex}><Inline text={block.text!} /></h3>;
                  if (block.type === 'list') return <ul key={blockIndex}>{block.items!.map(item => <li key={item}><Inline text={item} /></li>)}</ul>;
                  if (block.type === 'quote') return <blockquote key={blockIndex}><p><Inline text={block.text!} /></p></blockquote>;
                  return <p key={blockIndex}><Inline text={block.text!} /></p>;
                })}
              </section>
            ))}
          </div>
        </article>
        <footer className={styles.footer}>
          <Link href="/">← Back to Cloudsurfing Jupiter</Link>
          <a href="#manifesto-title">Back to top ↑</a>
        </footer>
      </main>
    </CosmicShell>
  );
}
