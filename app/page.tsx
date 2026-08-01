"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

type Product = "bracelet" | "bookmark" | "art";

const products: Record<Product, { label: string; short: string; price: number }> = {
  bracelet: { label: "Bracelet", short: "Stack your colors", price: 12 },
  bookmark: { label: "Bookmark", short: "Mark it with style", price: 8 },
  art: { label: "Painting", short: "Dream it. We’ll paint it.", price: 28 },
};

const palette = [
  { name: "Power pink", value: "#f56cad" },
  { name: "Electric purple", value: "#8a2db8" },
  { name: "Sunshine", value: "#ffc400" },
  { name: "Sky blue", value: "#42c9e8" },
  { name: "Mint pop", value: "#55d69e" },
  { name: "Midnight", value: "#26013e" },
];

export default function Home() {
  const [product, setProduct] = useState<Product>("bracelet");
  const [selectedColors, setSelectedColors] = useState(["#f56cad", "#8a2db8"]);
  const [braceletType, setBraceletType] = useState("Beads");
  const [size, setSize] = useState("Medium");
  const [bookmarkDesign, setBookmarkDesign] = useState("Checkerboard");
  const [artDesign, setArtDesign] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const price = useMemo(() => {
    let base = products[product].price;
    if (product === "bracelet" && braceletType === "Beads") base += 3;
    if (product === "art" && size === "Large") base += 16;
    return base;
  }, [product, braceletType, size]);

  function toggleColor(color: string) {
    setSelectedColors((current) =>
      current.includes(color)
        ? current.length === 1
          ? current
          : current.filter((item) => item !== color)
        : [...current, color].slice(-4),
    );
  }

  function chooseProduct(next: Product) {
    setProduct(next);
    setSize(next === "art" ? "8 × 10 in" : "Medium");
    setSent(false);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Girl Power home">
          <Image src="/girl-power-logo.png" width={70} height={70} alt="Girl Power logo" priority unoptimized />
          <span>GIRL<br />POWER</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#how-it-works">How it works</a>
          <a href="#story">Our story</a>
        </nav>
        <a className="header-cta" href="#customize">Start creating <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>★</span> Custom-made, just for you</p>
          <h1>MAKE IT<br /><em>YOURS.</em></h1>
          <p className="hero-intro">You pick the colors, size, and vibe. We turn your big ideas into one-of-a-kind bracelets, bookmarks, and art.</p>
          <div className="hero-actions">
            <a className="button primary" href="#customize">Create something <span>→</span></a>
            <a className="text-link" href="#shop">See what we make <span>↓</span></a>
          </div>
          <div className="mini-proof">
            <span className="avatars"><b>💜</b><b>✨</b><b>🎨</b></span>
            <span><strong>Made with care</strong><small>and a whole lot of girl power</small></span>
          </div>
        </div>

        <div className="hero-art" aria-label="Colorful custom Girl Power crafts">
          <div className="burst burst-one">★</div>
          <div className="burst burst-two">✦</div>
          <div className="hero-logo-wrap">
            <Image src="/girl-power-logo.png" width={520} height={520} alt="Girl Power: bracelets, bookmarks, and paintings" priority unoptimized />
          </div>
          <div className="doodle-note note-one"><span>100%</span> YOU</div>
          <div className="doodle-note note-two">MADE<br />BY HAND</div>
          <div className="squiggle" aria-hidden="true">〰〰〰</div>
        </div>
      </section>

      <section className="product-strip" id="shop" aria-label="Products">
        <p>WHAT CAN WE MAKE?</p>
        {(Object.keys(products) as Product[]).map((key, index) => (
          <button key={key} onClick={() => chooseProduct(key)}>
            <span className={`product-icon icon-${key}`} aria-hidden="true">{index === 0 ? "◌" : index === 1 ? "▰" : "✎"}</span>
            <span><strong>{products[key].label}s</strong><small>{products[key].short}</small></span>
            <b aria-hidden="true">↗</b>
          </button>
        ))}
      </section>

      <section className="customizer" id="customize">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>✦</span> Build your own</p>
            <h2>YOUR IDEA.<br /><em>YOUR WAY.</em></h2>
          </div>
          <p>Choose a creation, make it personal, and send us your idea. We’ll get in touch to confirm every detail before we make it.</p>
        </div>

        <div className="builder-shell">
          <div className="preview-panel">
            <span className="preview-label">LIVE PREVIEW</span>
            <div className={`product-preview preview-${product}`}>
              {product === "bracelet" && (
                <div className={`bracelet-preview ${braceletType === "Rubber bands" ? "bands" : "beads"}`}>
                  {Array.from({ length: 16 }).map((_, index) => (
                    <i key={index} style={{ background: selectedColors[index % selectedColors.length] }} />
                  ))}
                  <b>♥</b>
                </div>
              )}
              {product === "bookmark" && (
                <div className={`bookmark-preview pattern-${bookmarkDesign.toLowerCase().replace(" ", "-")}`} style={{ "--c1": selectedColors[0], "--c2": selectedColors[1] || selectedColors[0] } as React.CSSProperties}>
                  <span>GRL<br />PWR</span><i />
                </div>
              )}
              {product === "art" && (
                <div className="art-preview" style={{ "--c1": selectedColors[0], "--c2": selectedColors[1] || selectedColors[0] } as React.CSSProperties}>
                  <span>YOUR<br />IDEA<br /><em>HERE</em></span>
                </div>
              )}
            </div>
            <div className="preview-caption">
              <span><b>{products[product].label}</b><small>{size} · {selectedColors.length} colors</small></span>
              <strong>From ${price}</strong>
            </div>
          </div>

          <form className="options-panel" onSubmit={submit}>
            <div className="product-tabs" role="group" aria-label="Choose a product">
              {(Object.keys(products) as Product[]).map((key) => (
                <button type="button" key={key} className={product === key ? "active" : ""} onClick={() => chooseProduct(key)}>{products[key].label}</button>
              ))}
            </div>

            {product === "bracelet" && (
              <Choice label="1. Choose your type" values={["Beads", "Rubber bands"]} selected={braceletType} onSelect={setBraceletType} />
            )}
            {product === "bookmark" && (
              <Choice label="1. Pick a pattern" values={["Checkerboard", "Stripes", "Hearts"]} selected={bookmarkDesign} onSelect={setBookmarkDesign} />
            )}
            {product === "art" && (
              <label className="field-group"><span>1. Tell us your design</span><textarea value={artDesign} onChange={(e) => setArtDesign(e.target.value)} placeholder="A purple butterfly over a sunset..." required /></label>
            )}

            <fieldset className="field-group color-field">
              <legend>{product === "art" ? "2" : "2"}. Pick your colors <small>choose up to 4</small></legend>
              <div className="swatches">
                {palette.map((color) => (
                  <button type="button" key={color.value} onClick={() => toggleColor(color.value)} className={selectedColors.includes(color.value) ? "selected" : ""} style={{ "--swatch": color.value } as React.CSSProperties} aria-label={`${color.name}${selectedColors.includes(color.value) ? ", selected" : ""}`}><span /></button>
                ))}
              </div>
            </fieldset>

            <Choice label="3. Choose a size" values={product === "art" ? ["5 × 7 in", "8 × 10 in", "11 × 14 in"] : product === "bookmark" ? ["Small", "Classic", "Large"] : ["Small", "Medium", "Large"]} selected={size} onSelect={setSize} />

            <label className="field-group"><span>4. Anything else? <small>optional</small></span><textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Names, charms, a favorite theme—tell us everything!" /></label>

            <button className="button primary submit-button" type="submit">Send my idea <span>→</span></button>
            {sent && <p className="success" role="status">Amazing idea! We’ve got your request and will be in touch to confirm the details. ✨</p>}
          </form>
        </div>
      </section>

      <section className="steps" id="how-it-works">
        <p className="eyebrow"><span>★</span> From idea to made</p>
        <h2>SO EASY. <em>SO YOU.</em></h2>
        <div className="step-grid">
          <article><b>01</b><span>💡</span><h3>Dream it</h3><p>Pick your product, colors, size, and share the idea in your head.</p></article>
          <article><b>02</b><span>💬</span><h3>We confirm it</h3><p>We’ll message you with the final details, timing, and total.</p></article>
          <article><b>03</b><span>⚡</span><h3>We make it</h3><p>Your one-of-a-kind piece is created by hand and packed with care.</p></article>
        </div>
      </section>

      <section className="story" id="story">
        <div className="story-logo"><Image src="/girl-power-logo.png" width={300} height={300} alt="Girl Power logo" unoptimized /></div>
        <div><p className="eyebrow"><span>♥</span> Small business. Big energy.</p><h2>MADE TO<br /><em>MAKE YOU SMILE.</em></h2><p>Girl Power began with a love for color, creativity, and making gifts that feel truly personal. Every piece is imagined with you and made by hand—because the best things are the ones nobody else has.</p><a href="#customize" className="button light">Let’s make something <span>→</span></a></div>
      </section>

      <footer>
        <div className="footer-mark">GRL <span>⚡</span> PWR</div>
        <p>Custom bracelets, bookmarks & art.<br />Made by hand. Powered by imagination.</p>
        <div><a href="#shop">Shop</a><a href="#how-it-works">How it works</a><a href="#story">Our story</a></div>
        <small>© 2026 Girl Power. Made with ♥.</small>
      </footer>
    </main>
  );
}

function Choice({ label, values, selected, onSelect }: { label: string; values: string[]; selected: string; onSelect: (value: string) => void }) {
  return (
    <fieldset className="field-group choice-field">
      <legend>{label}</legend>
      <div>{values.map((value) => <button type="button" key={value} onClick={() => onSelect(value)} className={selected === value ? "selected" : ""}>{value}</button>)}</div>
    </fieldset>
  );
}
