/* ============================================================================
   رادار أدوات الذكاء الاصطناعي — مكوّنات أساسية + لوحة التفاصيل
   Shared primitives + the tool detail drawer.
   ============================================================================ */
const { useState, useEffect, useRef, useMemo } = React;

/* لغة عامة قابلة للقراءة من أي مكوّن — global current language for tx(). */
window.RX = window.RX || { lang: "ar" };
function tx(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  const L = window.RX.lang;
  return obj[L] != null ? obj[L] : obj.ar != null ? obj.ar : obj.en;
}

/* أيقونة Phosphor — Phosphor icon helper. */
function Icon({ name, weight, style }) {
  const cls = !weight || weight === "regular" ? "ph" : "ph-" + weight;
  return <i className={cls + " " + name} style={style} aria-hidden="true"></i>;
}

function Badge({ variant, children, dot }) {
  return <span className={"badge badge-" + (variant || "neutral")}>{dot && <span className="dot"></span>}{children}</span>;
}

/* شعار الأداة الحقيقي — real brand glyph, with a coloured monogram fallback. */
function Glyph({ tool, cls }) {
  const svg = window.LOGOS && window.LOGOS[tool.id] || "";
  if (svg) return <div className={(cls || "lg") + " glyph"} dangerouslySetInnerHTML={{ __html: svg }} aria-label={tool.name}></div>;
  return <div className={(cls || "lg") + " glyph glyph-mono"} style={{ background: tool.logo && tool.logo.color || "#6B7280" }} aria-label={tool.name}><span>{tool.logo && tool.logo.text || tool.name.slice(0, 1)}</span></div>;
}
function ToolLogo({ tool, cls }) {return <Glyph tool={tool} cls={cls} />;}

/* شارة مستوى التوصية — recommendation badge. */
function RecoBadge({ tool }) {
  const lv = window.DATA.recoLevels[tool.reco];
  const icon = tool.reco === "strong" ? "ph-star" : tool.reco === "recommended" ? "ph-thumbs-up" : "ph-minus-circle";
  return (
    <span className={"badge badge-" + lv.variant}>
      <Icon name={icon} weight="fill" style={{ fontSize: 13 }} />
      {tx({ ar: lv.ar, en: lv.en })}
    </span>);

}

/* مؤشّر الأثر على العمل — business-impact signal meter (High/Medium/Low). */
function ImpactBadge({ level, showLabel }) {
  const lv = window.DATA.impactLevels[level] || window.DATA.impactLevels.low;
  return (
    <span className={"impact impact-" + level} title={tx({ ar: lv.ar, en: lv.en })}>
      <span className="impact-bars" aria-hidden="true">
        <i className={lv.bars >= 1 ? "on" : ""}></i>
        <i className={lv.bars >= 2 ? "on" : ""}></i>
        <i className={lv.bars >= 3 ? "on" : ""}></i>
      </span>
      {showLabel !== false && <span className="impact-lbl">{tx({ ar: lv.ar, en: lv.en })}</span>}
    </span>);

}

/* تنسيق السعر — price formatting. */
function priceMain(tool) {
  if (!tool.price || tool.price.amount === 0) return null;
  return "$" + tool.price.amount;
}

function categoryOf(id) {return window.DATA.categories.find((c) => c.id === id);}

/* ----------------------------------------------------------- لوحة التفاصيل
   Sliding detail drawer for a single tool. */
function Drawer({ toolId, t, onClose, onVisit, onPlay }) {
  const open = !!toolId;
  const tool = toolId ? window.DATA.tools.find((x) => x.id === toolId) : null;

  useEffect(() => {
    function esc(e) {if (e.key === "Escape") onClose();}
    if (open) {document.addEventListener("keydown", esc);document.body.style.overflow = "hidden";}
    return () => {document.removeEventListener("keydown", esc);document.body.style.overflow = "";};
  }, [open]);

  const cat = tool ? categoryOf(tool.category) : null;
  const D = t.detail;

  return (
    <React.Fragment>
      <div className={"drawer-scrim" + (open ? " open" : "")} onClick={onClose}></div>
      <aside className={"drawer" + (open ? " open" : "")} aria-hidden={!open}>
        {tool &&
        <React.Fragment>
            <div className="drawer-hd">
              <button className="close" onClick={onClose} aria-label={D.close}><Icon name="ph-x" weight="bold" /></button>
              <div className="top">
                <ToolLogo tool={tool} />
                <div>
                  <h2>{tool.name}</h2>
                  <div className="vendor">{tool.vendor}</div>
                </div>
              </div>
              <div className="badges">
                <RecoBadge tool={tool} />
                {cat && <span className="badge badge-gold"><Icon name={cat.icon} style={{ fontSize: 13 }} />{tx({ ar: cat.ar, en: cat.en })}</span>}
                {tool.isNew && <span className="badge badge-new"><Icon name="ph-sparkle" weight="fill" style={{ fontSize: 12 }} />{t.tools.new}</span>}
              </div>
            </div>

            <div className="drawer-body">
              <p className="lead">{tx(tool.summary)}</p>

              <h4><Icon name="ph-bell-ringing" />{D.weekly}</h4>
              <div className="drawer-update">
                <div className="dt">{tool.update.date}</div>
                <div className="ti">{tx(tool.update.title)}</div>
                <a href={tool.update.source.url} target="_blank" rel="noopener">
                  <Icon name="ph-link" style={{ fontSize: 14 }} />{D.source}: {tool.update.source.label}
                </a>
              </div>

              {window.VideoEngine && window.VideoEngine.forTool(tool.id).length > 0 &&
            <React.Fragment>
                <h4><Icon name="ph-video-camera" />{t.video.inTool} {tool.name}</h4>
                <ToolVideos toolId={tool.id} t={t} onPlay={(v) => {onPlay && onPlay(v);}} />
              </React.Fragment>
            }

              <div className="drawer-sec">
                <h4><Icon name="ph-target" />{D.useCases}</h4>
                <ul className="ul-check use">
                  {tx(tool.use).map ? tx(tool.use).map((u, i) => <li key={i}><Icon name="ph-check-circle" weight="fill" />{u}</li>) : null}
                </ul>
              </div>

              <div className="drawer-sec">
                <h4><Icon name="ph-star" />{D.features}</h4>
                <ul className="ul-check feat">
                  {tx(tool.features).map((f, i) => <li key={i}><Icon name="ph-check-circle" weight="fill" />{f}</li>)}
                </ul>
              </div>

              <div className="drawer-sec">
                <h4><Icon name="ph-warning-circle" />{D.limits}</h4>
                <ul className="ul-check lim">
                  {tx(tool.limits).map((l, i) => <li key={i}><Icon name="ph-info" weight="fill" />{l}</li>)}
                </ul>
              </div>

              <div className="drawer-sec">
                <h4><Icon name="ph-buildings" />{D.depts}</h4>
                <div className="dept-chips">
                  {tx(tool.depts).map((d, i) => <span key={i}>{d}</span>)}
                </div>
              </div>

              <div className="drawer-sec">
                <h4><Icon name="ph-clipboard-text" />{D.plans}</h4>
                <div className="plan-list">
                  {(tool.plans || []).map((p, i) => {
                    const isFree = /^(0\$|\$0)$/.test(tx(p.price).trim());
                    return (
                      <div className="plan" key={i}>
                        <div className="plan-hd">
                          <span className="plan-name">{tx(p.name)}</span>
                          <span className={"plan-price" + (isFree ? " free" : "")}>{tx(p.price)}</span>
                        </div>
                        <p className="plan-note">{tx(p.note)}</p>
                      </div>);
                  })}
                </div>
                <p className="plan-disclaimer"><Icon name="ph-info" />{D.planNote}</p>
                <div className="kv-box">
                  <div className="kv">
                    <span className="k"><Icon name="ph-squares-four" />{D.category}</span>
                    <span className="v">{cat ? tx({ ar: cat.ar, en: cat.en }) : ""}</span>
                  </div>
                  <div className="kv">
                    <span className="k"><Icon name="ph-calendar-check" />{D.reviewed}</span>
                    <span className="v">{tool.reviewed}</span>
                  </div>
                </div>
              </div>

              <div className="drawer-cta">
                <a className="btn btn-solid" href={tool.url} target="_blank" rel="noopener" onClick={() => onVisit && onVisit(tool)}>
                  <Icon name="ph-arrow-square-out" weight="bold" />{D.visit}
                </a>
                <button className="btn btn-ghost" onClick={onClose}>{D.close}</button>
              </div>
            </div>
          </React.Fragment>
        }
      </aside>
    </React.Fragment>);

}

function Toast({ toast }) {
  return (
    <div className={"toast" + (toast.show ? " show" : "") + (toast.type === "warn" ? " warn" : "")}>
      <Icon name={toast.type === "warn" ? "ph-warning" : "ph-check-circle"} weight="fill" />
      {toast.msg}
    </div>);

}

Object.assign(window, { tx, Icon, Badge, ToolLogo, Glyph, RecoBadge, ImpactBadge, priceMain, categoryOf, Drawer, Toast });