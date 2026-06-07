/* ============================================================================
   رادار أدوات الذكاء الاصطناعي — مكوّنات الفيديو (AI Video Updates UI)
   ============================================================================ */

/* تنسيق عدد المشاهدات — compact views formatter. */
function fmtViews(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return String(n);
}
function ytEmbed(id) {return "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1&playsinline=1";}

/* غلاف مصغّر بهوية الأداة — branded thumbnail (used when no real thumb URL). */
function VideoThumb({ video, ratio }) {
  const tool = window.DATA.tools.find((x) => x.id === video.toolId);
  const t = window.I18N[window.RX.lang];
  return (
    <div className={"vthumb" + (ratio === "v" ? " vert" : "")} style={tool ? { "--gl": tool.logo.color } : null}>
      {video.thumb ?
      <img src={video.thumb} alt={tx(video.title)} loading="lazy" /> :
      <div className="vthumb-art">{tool && <Glyph tool={tool} cls="vg" />}</div>
      }
      <span className="vthumb-grad"></span>
      <span className="vplay"><Icon name="ph-play" weight="fill" /></span>
      <span className="vdur">{video.duration}</span>
      <span className={"vkind " + video.kind}>{video.kind === "short" ?
        <React.Fragment><Icon name="ph-lightning" weight="fill" />{t.video.short}</React.Fragment> : t.video.video}</span>
    </div>);

}

/* بطاقة فيديو — a video card. */
function VideoCard({ video, onPlay }) {
  const tool = window.DATA.tools.find((x) => x.id === video.toolId);
  const t = window.I18N[window.RX.lang];
  return (
    <article className="vcard" onClick={() => onPlay(video)}>
      <VideoThumb video={video} />
      <div className="vbody">
        <div className="vmeta">
          {tool && <Glyph tool={tool} cls="vm-lg" />}
          <span className="vm-tool">{tool ? tool.name : ""}</span>
          {video.pinned && <span className="vm-pin"><Icon name="ph-push-pin" weight="fill" />{t.admin.pinned}</span>}
        </div>
        <h3>{tx(video.title)}</h3>
        <div className="vfoot">
          <span><Icon name="ph-calendar-blank" />{video.date}</span>
          <span><Icon name="ph-eye" />{fmtViews(video.views)} {t.video.views}</span>
        </div>
        <button className="btn btn-soft btn-sm vwatch" onClick={(e) => {e.stopPropagation();onPlay(video);}}>
          <Icon name="ph-play-circle" weight="fill" />{t.video.watch}
        </button>
      </div>
    </article>);

}

/* مشغّل داخل الموقع — in-site player modal (no leaving the page). */
function VideoModal({ video, onClose }) {
  useEffect(() => {
    function esc(e) {if (e.key === "Escape") onClose();}
    if (video) {document.addEventListener("keydown", esc);document.body.style.overflow = "hidden";}
    return () => {document.removeEventListener("keydown", esc);document.body.style.overflow = "";};
  }, [video]);
  if (!video) return null;
  const tool = window.DATA.tools.find((x) => x.id === video.toolId);
  const t = window.I18N[window.RX.lang];
  const vert = video.kind === "short";
  return (
    <div className="vmodal-scrim" onClick={onClose}>
      <div className={"vmodal" + (vert ? " vert" : "")} onClick={(e) => e.stopPropagation()}>
        <button className="vmodal-close" onClick={onClose} aria-label={t.video.close}><Icon name="ph-x" weight="bold" /></button>
        <div className="vmodal-frame">
          <iframe src={ytEmbed(video.videoId)} title={tx(video.title)} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0"></iframe>
        </div>
        <div className="vmodal-info">
          {tool && <Glyph tool={tool} cls="vm-lg" />}
          <div>
            <h3>{tx(video.title)}</h3>
            <div className="vmodal-meta">{tool ? tool.name : ""} · {video.channel} · {video.date} · {fmtViews(video.views)} {t.video.views}</div>
          </div>
        </div>
      </div>
    </div>);

}

/* عارض المقاطع القصيرة الرأسي (Reels/TikTok) — vertical Shorts viewer. */
function ShortsViewer({ shorts, onPlay }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const startY = useRef(null);
  const t = window.I18N[window.RX.lang];
  if (!shorts.length) return null;
  const cur = shorts[idx];
  const tool = window.DATA.tools.find((x) => x.id === cur.toolId);

  function go(d) {setPlaying(false);setIdx((i) => (i + d + shorts.length) % shorts.length);}
  useEffect(() => {
    function key(e) {if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1);if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1);}
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [shorts.length]);

  return (
    <div className="shorts-stage">
      <button className="shorts-nav up" onClick={() => go(-1)} aria-label="prev"><Icon name="ph-caret-up" weight="bold" /></button>
      <div className="shorts-frame"
      onTouchStart={(e) => startY.current = e.touches[0].clientY}
      onTouchEnd={(e) => {if (startY.current == null) return;const dy = e.changedTouches[0].clientY - startY.current;if (Math.abs(dy) > 40) go(dy < 0 ? 1 : -1);startY.current = null;}}
      onWheel={(e) => {if (Math.abs(e.deltaY) > 20) go(e.deltaY > 0 ? 1 : -1);}}>
        {playing ?
        <iframe src={ytEmbed(cur.videoId)} title={tx(cur.title)} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0"></iframe> :
        <div className="shorts-poster" onClick={() => setPlaying(true)} style={tool ? { "--gl": tool.logo.color } : null}>
            <div className="shorts-art">{tool && <Glyph tool={tool} cls="vg" />}</div>
            <span className="shorts-grad"></span>
            <button className="shorts-play" aria-label={t.video.play}><Icon name="ph-play" weight="fill" /></button>
            <div className="shorts-cap">
              <div className="sc-tool">{tool && <Glyph tool={tool} cls="vm-lg" />}<span>{tool ? tool.name : ""}</span><span className="sc-dur">{cur.duration}</span></div>
              <h3>{tx(cur.title)}</h3>
              <div className="sc-foot"><Icon name="ph-eye" weight="fill" />{fmtViews(cur.views)} {t.video.views} · {cur.date}</div>
            </div>
          </div>
        }
      </div>
      <button className="shorts-nav down" onClick={() => go(1)} aria-label="next"><Icon name="ph-caret-down" weight="bold" /></button>
      <div className="shorts-dots">
        {shorts.map((s, i) => <button key={s.id} className={"sd" + (i === idx ? " on" : "")} onClick={() => {setPlaying(false);setIdx(i);}} aria-label={"short " + (i + 1)}></button>)}
      </div>
      <div className="shorts-hint"><Icon name="ph-hand-swipe-right" />{t.video.swipeHint}</div>
    </div>);

}

/* القسم الرئيسي للفيديوهات — homepage video section. */
function VideoSection({ t, onPlay, onAdmin }) {
  const [toolFilter, setToolFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const all = window.VideoEngine.videos().concat(window.VideoEngine.shorts());
  const list = (toolFilter === "all" ? window.VideoEngine.published() : window.VideoEngine.forTool(toolFilter)).slice(0, 12);
  const visible = showAll ? list : list.slice(0, 6);
  const most = window.VideoEngine.mostViewed(4);
  const toolsWithVideos = window.DATA.tools.filter((tool) => window.VideoEngine.published().some((v) => v.toolId === tool.id));

  return (
    <section className="section videos-sec" id="videos">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow"><Icon name="ph-video-camera" weight="fill" />{t.video.eyebrow}</div>
            <h2>{t.video.title}</h2>
            <p>{t.video.desc}</p>
          </div>
          <button className="btn btn-ghost btn-sm vadmin-btn" onClick={onAdmin}><Icon name="ph-sliders" weight="bold" />{t.video.manage}</button>
        </div>

        <div className="vfilter">
          <button className={"vchip" + (toolFilter === "all" ? " active" : "")} onClick={() => {setToolFilter("all");setShowAll(false);}}>
            <Icon name="ph-squares-four" />{t.video.all}
          </button>
          {toolsWithVideos.map((tool) =>
          <button key={tool.id} className={"vchip" + (toolFilter === tool.id ? " active" : "")} onClick={() => {setToolFilter(tool.id);setShowAll(false);}}>
              <Glyph tool={tool} cls="vchip-lg" />{tool.name}
            </button>
          )}
        </div>

        <div className="vgrid">
          {visible.map((v) => <VideoCard key={v.id} video={v} onPlay={onPlay} />)}
        </div>

        {list.length > 6 &&
        <div className="tools-more">
            <button className="btn btn-ghost" onClick={() => setShowAll((v) => !v)}>
              {showAll ? t.tools.showLess : t.tools.showMore}
              {!showAll && <span className="more-cnt">+{list.length - 6}</span>}
              <Icon name={showAll ? "ph-caret-up" : "ph-caret-down"} weight="bold" style={{ fontSize: 14 }} />
            </button>
          </div>
        }

        {/* الأكثر مشاهدة هذا الأسبوع — most viewed this week */}
        <div className="most-viewed">
          <div className="mv-head"><Icon name="ph-trend-up" weight="bold" />{t.video.mostViewed}</div>
          <div className="mv-list">
            {most.map((v, i) => {
              const tool = window.DATA.tools.find((x) => x.id === v.toolId);
              return (
                <button key={v.id} className="mv-row" onClick={() => onPlay(v)}>
                  <span className="mv-rank">{i + 1}</span>
                  <VideoThumb video={v} />
                  <div className="mv-body">
                    <h4>{tx(v.title)}</h4>
                    <div className="mv-meta">{tool ? tool.name : ""} · <Icon name="ph-eye" />{fmtViews(v.views)} {t.video.views}</div>
                  </div>
                </button>);

            })}
          </div>
        </div>

        <div className="vauto-note"><Icon name="ph-youtube-logo" weight="fill" />{t.video.autoNote}</div>
      </div>
    </section>);

}

/* قسم "شاهد خلال دقيقة" — Watch in 60 seconds (Shorts). */
function ShortsSection({ t, onPlay }) {
  const shorts = window.VideoEngine.shorts();
  if (!shorts.length) return null;
  return (
    <section className="section shorts-sec dark" id="shorts">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow"><Icon name="ph-rocket-launch" weight="fill" />{t.video.shortsEyebrow}</div>
            <h2>{t.video.shortsTitle}</h2>
            <p>{t.video.shortsDesc}</p>
          </div>
        </div>
        <div className="shorts-wrap">
          <ShortsViewer shorts={shorts} onPlay={onPlay} />
          <div className="shorts-side">
            {shorts.slice(0, 5).map((s) => {
              const tool = window.DATA.tools.find((x) => x.id === s.toolId);
              return (
                <button key={s.id} className="ss-row" onClick={() => onPlay(s)}>
                  <VideoThumb video={s} ratio="v" />
                  <div className="ss-body">
                    <h4>{tx(s.title)}</h4>
                    <div className="ss-meta">{tool ? tool.name : ""} · <Icon name="ph-eye" />{fmtViews(s.views)}</div>
                  </div>
                </button>);

            })}
          </div>
        </div>
      </div>
    </section>);

}

/* فيديوهات داخل لوحة تفاصيل الأداة — per-tool video strip for the drawer. */
function ToolVideos({ toolId, t, onPlay }) {
  const vids = window.VideoEngine.forTool(toolId).slice(0, 6);
  if (!vids.length) return null;
  return (
    <div className="tool-videos">
      <div className="tv-row">
        {vids.map((v) =>
        <button key={v.id} className="tv-card" onClick={() => onPlay(v)}>
            <VideoThumb video={v} />
            <h5>{tx(v.title)}</h5>
            <div className="tv-meta">{v.date} · {fmtViews(v.views)} {t.video.views}</div>
          </button>
        )}
      </div>
    </div>);

}

/* قسم "شاهد خلال دقيقتين" — Watch in 2 minutes (executive video picks). */
function durSecs(d) {const p = String(d).split(":").map(Number);return p.length === 2 ? p[0] * 60 + p[1] : 0;}

function WatchIn2({ t, onPlay }) {
  // مقاطع أقل من دقيقتين، الأعلى مشاهدة — sub-2-min clips, most-viewed first, max 4.
  const picks = window.VideoEngine.videos().
  filter((v) => durSecs(v.duration) > 0 && durSecs(v.duration) <= 120).
  sort((a, b) => b.views - a.views).
  slice(0, 4);
  const briefByTool = {};
  (window.DATA.highlights || []).forEach((h) => {briefByTool[h.toolId] = h;});

  return (
    <section className="section watch-sec" id="watch">
      <div className="wrap">
        <div className="ex-head">
          <div>
            <div className="eyebrow"><Icon name="ph-monitor-play" weight="fill" />{t.watch.eyebrow}</div>
            <h2>{t.watch.title}</h2>
            <p>{t.watch.desc}</p>
          </div>
        </div>

        <div className="watch-grid">
          {picks.map((v) => {
            const tool = window.DATA.tools.find((x) => x.id === v.toolId);
            const h = briefByTool[v.toolId];
            const oneLine = h ? tx(h.feature) : tx(v.title);
            return (
              <article key={v.id} className="watch-card" onClick={() => onPlay(v)}>
                <div className="wc-thumb" style={tool ? { "--gl": tool.logo.color } : null}>
                  <div className="wc-art">{tool && <Glyph tool={tool} cls="wc-g" />}</div>
                  <span className="wc-grad"></span>
                  <span className="wc-play"><Icon name="ph-play" weight="fill" /></span>
                  <span className="wc-dur"><Icon name="ph-clock" weight="fill" />{v.duration} {t.watch.min}</span>
                </div>
                <div className="wc-body">
                  <div className="wc-tool">{tool && <Glyph tool={tool} cls="wc-tg" />}<span>{tool ? tool.name : ""}</span></div>
                  <h3>{tx(v.title)}</h3>
                  <p className="wc-line">{oneLine}</p>
                </div>
              </article>);
          })}
        </div>
      </div>
    </section>);
}

Object.assign(window, { fmtViews, VideoThumb, VideoCard, VideoModal, ShortsViewer, VideoSection, ShortsSection, ToolVideos, WatchIn2 });