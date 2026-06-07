/* ============================================================================
   موجز الذكاء الاصطناعي للقيادة — أقسام الصفحة (executive page sections)
   Stripped to three high-value sections: Brief · Watch · Impact radar.
   ============================================================================ */

/* --------------------------------------------------------------- Header */
/* شعار الرادار — custom radar brand mark (sweep + rings + detection blips). */
function RadarMark() {
  return (
    <svg className="radar-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="rm-sweep" x1="24" y1="24" x2="38" y2="9" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity=".7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* sweep wedge */}
      <path d="M24 24 L24 5 A19 19 0 0 1 37.4 11.1 Z" fill="url(#rm-sweep)" />
      {/* concentric rings */}
      <circle cx="24" cy="24" r="18.5" stroke="#fff" strokeOpacity=".92" strokeWidth="2.1" />
      <circle cx="24" cy="24" r="12.5" stroke="#fff" strokeOpacity=".5" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="6.5" stroke="#fff" strokeOpacity=".34" strokeWidth="1.4" />
      {/* crosshair */}
      <path d="M24 5.5 V42.5 M5.5 24 H42.5" stroke="#fff" strokeOpacity=".28" strokeWidth="1.2" />
      {/* detection blips */}
      <circle cx="33.4" cy="14.6" r="2.6" fill="#fff" />
      <circle cx="16.5" cy="30" r="1.7" fill="#fff" fillOpacity=".55" />
      <circle cx="24" cy="24" r="2" fill="#fff" />
    </svg>);
}

function Header({ t, lang, onLang, nav, active, onMobile, scrolled, query, onQuery }) {
  const items = ["watch", "tools"];
  function onSearch(v) {
    onQuery(v);
    if (v && document.getElementById("tools")) {
      const el = document.getElementById("tools");
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
  return (
    <header className={"masthead" + (scrolled ? " scrolled" : "")}>
      <div className="wrap">
        <div className="brand" onClick={() => nav("top")} style={{ cursor: "pointer" }}>
          <div className="emblem"><RadarMark /></div>
          <div className="names">
            <div className="ar">{lang === "ar" ? t.brandAr : t.brandEn}</div>
            <div className="en">{t.exec.kicker}</div>
          </div>
        </div>
        <div className="head-search">
          <Icon name="ph-magnifying-glass" />
          <input value={query} onChange={(e) => onSearch(e.target.value)} placeholder={t.tools.searchPh} aria-label={t.tools.searchPh} />
          {query && <button className="hs-clear" onClick={() => onQuery("")} aria-label={t.detail.close}><Icon name="ph-x" /></button>}
        </div>
        <nav className="nav">
          {items.map((k) =>
          <button key={k} className={active === k ? "active" : ""} onClick={() => nav(k)}>{t.nav[k]}</button>
          )}
        </nav>
        <div className="acts">
          <button className="lang-btn" onClick={onLang}>
            <Icon name="ph-translate" style={{ fontSize: 15 }} />{t.switchTo}
          </button>
          <button className="icon-btn burger" onClick={onMobile} aria-label="menu"><Icon name="ph-list" weight="bold" /></button>
        </div>
      </div>
    </header>);
}

/* ----------------------------------------------- غلاف التقرير (report cover) */
function BriefMast({ t, meta, counts, nav }) {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-top">
          <span className="eyebrow"><span className="pulse"></span><b>{tx(meta.weekLabel)}</b></span>
          <span className="hero-updated"><Icon name="ph-clock" weight="fill" />{t.exec.date} <b>{meta.lastUpdated}</b></span>
        </div>

        <h1>
          {window.RX.lang === "ar" ?
          <React.Fragment>رادار أدوات <b>الذكاء الاصطناعي</b></React.Fragment> :
          <React.Fragment>AI Tools <b>Radar</b></React.Fragment>}
        </h1>

        <div className="hero-mini-stats">
          <span><b>{counts.videos}</b> {t.exec.videosN}</span>
          <span className="dotsep"></span>
          <span><b>{counts.tools}</b> {t.exec.toolsN}</span>
        </div>
      </div>
    </section>);
}

/* ---------------------------------------- ١ · الموجز التنفيذي (top 5 updates) */
function ExecBrief({ t, highlights, onOpen }) {
  const top5 = highlights.slice(0, 5);
  return (
    <section className="section ex-sec" id="brief">
      <div className="wrap">
        <div className="ex-head">
          <div>
            <div className="eyebrow"><Icon name="ph-newspaper-clipping" weight="fill" />{t.brief.eyebrow}</div>
            <h2>{t.brief.title}</h2>
            <p>{t.brief.desc}</p>
          </div>
        </div>

        <ol className="brief-list">
          {top5.map((h, i) => {
            const tool = window.DATA.tools.find((x) => x.id === h.toolId);
            const impact = window.DATA.impactByHighlight[h.id] || "low";
            return (
              <li key={h.id} className="brief-card" onClick={() => onOpen(h.toolId)}>
                <div className="bc-top">
                  <span className="br-rank">{String(i + 1).padStart(2, "0")}</span>
                  <ImpactBadge level={impact} />
                </div>
                <div className="br-tool">
                  {tool && <Glyph tool={tool} cls="br-g" />}
                  <span className="br-name">{tool ? tool.name : ""}</span>
                  <span className="br-vendor">{tool ? tool.vendor : ""}</span>
                </div>
                <p className="br-sum">{tx(h.summary)}</p>
                <p className="br-why"><span className="br-why-l">{t.brief.why}</span>{tx(h.why)}</p>
                <div className="bc-foot">
                  <span className="br-more">{t.brief.deepDive}<Icon name={window.RX.lang === "ar" ? "ph-arrow-left" : "ph-arrow-right"} weight="bold" /></span>
                </div>
              </li>);
          })}
        </ol>
      </div>
    </section>);
}

/* ------------------------------------------- ٣ · رادار الأثر (four picks) */
function ImpactRadar({ t, onOpen }) {
  const picks = window.DATA.radar;
  return (
    <section className="section radar-sec" id="radar">
      <div className="wrap">
        <div className="ex-head">
          <div>
            <div className="eyebrow"><Icon name="ph-target" weight="fill" />{t.radar.eyebrow}</div>
            <h2>{t.radar.title}</h2>
            <p>{t.radar.desc}</p>
          </div>
        </div>

        <div className="radar-grid">
          {picks.map((p) => {
            const tool = window.DATA.tools.find((x) => x.id === p.toolId);
            if (!tool) return null;
            return (
              <article key={p.slot} className={"radar-card accent-" + p.accent} onClick={() => onOpen(p.toolId)}>
                <div className="rc-slot"><span className="rc-ic"><Icon name={p.icon} weight="fill" /></span>{tx(p.label)}</div>
                <div className="rc-tool">
                  <Glyph tool={tool} cls="lg" />
                  <div className="rc-id">
                    <h3>{tool.name}</h3>
                    <div className="rc-vendor">{tool.vendor}</div>
                  </div>
                </div>
                <p className="rc-reason">{tx(p.reason)}</p>
                <div className="rc-foot">
                  <RecoBadge tool={tool} />
                  <span className="rc-more"><Icon name={window.RX.lang === "ar" ? "ph-arrow-left" : "ph-arrow-right"} weight="bold" /></span>
                </div>
              </article>);
          })}
        </div>
      </div>
    </section>);
}

/* ----------------------------------------------------- دليل الأدوات + الفلاتر */
function ToolsDirectory({ t, query, onQuery, cat, onCat, reco, onReco, onOpen }) {
  const cats = window.DATA.categories;
  const q = query.trim().toLowerCase();
  const [fOpen, setFOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filtered = window.DATA.tools.filter((tool) => {
    if (cat !== "all" && tool.category !== cat && !(tool.altCategories || []).includes(cat)) return false;
    if (reco !== "all" && tool.reco !== reco) return false;
    if (q) {
      const hay = (tool.name + " " + tool.vendor + " " + tx(tool.summary) + " " + tx(tool.use).join(" ")).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const catCount = (id) => window.DATA.tools.filter((tool) => tool.category === id || (tool.altCategories || []).includes(id)).length;
  const activeCount = (cat !== "all" ? 1 : 0) + (reco !== "all" ? 1 : 0);
  const recoKeys = ["strong", "recommended", "not"];
  const recoIc = { strong: "ph-star", recommended: "ph-thumbs-up", not: "ph-minus-circle" };
  const catLabel = cat === "all" ? null : (() => {const c = categoryOf(cat);return tx({ ar: c.ar, en: c.en });})();
  const recoLabel = reco === "all" ? null : tx({ ar: window.DATA.recoLevels[reco].ar, en: window.DATA.recoLevels[reco].en });

  return (
    <section className="section alt" id="tools">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow"><Icon name="ph-squares-four" weight="fill" />{t.tools.eyebrow}</div>
            <h2>{t.tools.title}</h2>
            <p>{t.tools.desc}</p>
          </div>
          <div className="head-search dir-search">
            <Icon name="ph-magnifying-glass" />
            <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder={t.tools.searchPh} aria-label={t.tools.searchPh} />
            {query && <button className="hs-clear" onClick={() => onQuery("")} aria-label="clear"><Icon name="ph-x" /></button>}
          </div>
        </div>

        <div className="filter-bar">
          <button className={"filter-btn" + (fOpen ? " open" : "")} onClick={() => setFOpen((v) => !v)}>
            <Icon name="ph-sliders-horizontal" weight="bold" />{t.tools.filtersBtn}
            {activeCount > 0 && <span className="cnt">{activeCount}</span>}
            <Icon name="ph-caret-down" weight="bold" style={{ fontSize: 13, transition: "transform .2s", transform: fOpen ? "rotate(180deg)" : "none" }} />
          </button>
          {catLabel &&
          <span className="active-pill"><Icon name={categoryOf(cat).icon} />{catLabel}<button onClick={() => onCat("all")} aria-label="clear"><Icon name="ph-x" weight="bold" /></button></span>
          }
          {recoLabel &&
          <span className="active-pill"><Icon name={recoIc[reco]} />{recoLabel}<button onClick={() => onReco("all")} aria-label="clear"><Icon name="ph-x" weight="bold" /></button></span>
          }
          {activeCount > 0 &&
          <button className="clear-all" onClick={() => {onCat("all");onReco("all");}}>{t.tools.clearAll}</button>
          }
          <span className="results-count">{filtered.length} {t.tools.results}</span>
        </div>

        {fOpen &&
        <div className="filter-panel">
            <div className="fp-sec">
              <h4><Icon name="ph-squares-four" />{t.tools.filterCat}</h4>
              <div className="fp-opts">
                <button className={"fp-opt" + (cat === "all" ? " active" : "")} onClick={() => onCat("all")}>
                  <Icon name="ph-stack" />{t.tools.all}<span className="ct">{window.DATA.tools.length}</span>
                </button>
                {cats.map((c) =>
              <button key={c.id} className={"fp-opt" + (cat === c.id ? " active" : "")} onClick={() => onCat(c.id)}>
                    <Icon name={c.icon} />{tx({ ar: c.ar, en: c.en })}<span className="ct">{catCount(c.id)}</span>
                  </button>
              )}
              </div>
            </div>
            <div className="fp-sec">
              <h4><Icon name="ph-funnel" />{t.tools.filterReco}</h4>
              <div className="fp-opts">
                <button className={"fp-opt" + (reco === "all" ? " active" : "")} onClick={() => onReco("all")}>
                  <Icon name="ph-list-checks" />{t.tools.all}
                </button>
                {recoKeys.map((r) =>
              <button key={r} className={"fp-opt" + (reco === r ? " active" : "")} onClick={() => onReco(r)}>
                    <Icon name={recoIc[r]} />{tx({ ar: window.DATA.recoLevels[r].ar, en: window.DATA.recoLevels[r].en })}
                  </button>
              )}
              </div>
            </div>
          </div>
        }

        {filtered.length === 0 ?
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--fg-3)" }}>
            <Icon name="ph-magnifying-glass" weight="duotone" style={{ fontSize: 56, color: "var(--aeblack-200)" }} />
            <p style={{ marginTop: 14, fontSize: 16 }}>{t.tools.noResults}</p>
          </div> :

        <div className="tools-grid">
            {(showAll ? filtered : filtered.slice(0, 6)).map((tool) => {
            const tagCats = [tool.category, ...(tool.altCategories || [])].map(categoryOf).filter(Boolean).slice(0, 4);
            const features = tx(tool.features).slice(0, 3);
            return (
              <article key={tool.id} className={"tool-card" + (tool._justUpdated ? " fresh" : "")}>
                  <div className="tc-head">
                    <Glyph tool={tool} cls="lg" />
                    <div className="tc-id">
                      <h3>{tool.name}</h3>
                      <div className="tc-vendor">{tool.vendor}</div>
                    </div>
                    <RecoBadge tool={tool} />
                  </div>

                  <p className="tc-sum">{tx(tool.summary)}</p>

                  <div className="tc-tags">
                    {tagCats.map((c) =>
                  <span key={c.id} className="tc-tag"><Icon name={c.icon} />{tx({ ar: c.ar, en: c.en })}</span>
                  )}
                  </div>

                  <div className="tc-box tc-box-upd">
                    <div className="tc-box-h"><Icon name="ph-bell-ringing" weight="fill" />{t.tools.latestUpdate}</div>
                    <p className="tc-upd">{tx(tool.update.title)}</p>
                  </div>

                  <div className="tc-box">
                    <div className="tc-box-h"><Icon name="ph-star" weight="fill" />{t.tools.topFeatures}</div>
                    <ul className="tc-list">
                      {features.map((f, i) => <li key={i}><Icon name="ph-check-circle" weight="fill" />{f}</li>)}
                    </ul>
                  </div>

                  <div className="tc-foot">
                    <a className="tc-icon" href={tool.url} target="_blank" rel="noopener" aria-label={t.tools.visit} onClick={(e) => e.stopPropagation()}><Icon name="ph-arrow-square-out" weight="bold" /></a>
                    <button className="tc-cta" onClick={() => onOpen(tool.id)}><Icon name="ph-info" weight="bold" />{t.tools.details}</button>
                  </div>
                </article>);

          })}
          </div>
        }

        {filtered.length > 6 &&
        <div className="tools-more">
            <button className="btn btn-ghost" onClick={() => setShowAll((v) => !v)}>
              {showAll ? t.tools.showLess : t.tools.showMore}
              {!showAll && <span className="more-cnt">+{filtered.length - 6}</span>}
              <Icon name={showAll ? "ph-caret-up" : "ph-caret-down"} weight="bold" style={{ fontSize: 14 }} />
            </button>
          </div>
        }
      </div>
    </section>);
}

/* --------------------------------------------------------------- Footer */
function Footer({ t, lang, nav }) {
  return (
    <footer className="footer footer-slim">
      <div className="wrap">
        <div className="bottom">
          <span>© 2026 · {lang === "ar" ? t.brandAr : t.brandEn} · {t.footer.rights}</span>
          <span className="foot-built">{t.footer.builtWith}</span>
        </div>
      </div>
    </footer>);
}

Object.assign(window, { Header, BriefMast, ExecBrief, ImpactRadar, ToolsDirectory, Footer });