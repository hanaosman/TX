/* ============================================================================
   رادار أدوات الذكاء الاصطناعي — لوحة تحكم الفيديوهات (Video admin panel)
   تتحكم في الإعدادات: القنوات، الكلمات، العدد، المراجعة، التثبيت، التشغيل اليدوي.
   ============================================================================ */
function AdminPanel({ open, t, onClose, onChanged, onRun, running }) {
  const [cfg, setCfg] = useState(() => window.VideoEngine.getConfig());
  const [chInput, setChInput] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const A = t.admin;

  useEffect(() => {
    function esc(e) { if (e.key === "Escape") onClose(); }
    if (open) { document.addEventListener("keydown", esc); document.body.style.overflow = "hidden"; setCfg(window.VideoEngine.getConfig()); }
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  function persist(next) {
    setCfg(next);
    window.VideoEngine.setConfig(next);
    setSavedFlash(true);
    clearTimeout(window.__adSave);
    window.__adSave = setTimeout(() => setSavedFlash(false), 1400);
    onChanged && onChanged();
  }

  function addChannel() {
    const v = chInput.trim();
    if (!v) return;
    const channels = cfg.channels.concat([{ id: "c" + Date.now(), handle: v, label: v.replace(/^@/, "") }]);
    persist(Object.assign({}, cfg, { channels }));
    setChInput("");
  }
  function removeChannel(id) { persist(Object.assign({}, cfg, { channels: cfg.channels.filter((c) => c.id !== id) })); }
  function setKeywords(toolId, str) {
    const keywords = Object.assign({}, cfg.keywords, { [toolId]: str.split(",").map((s) => s.trim()).filter(Boolean) });
    persist(Object.assign({}, cfg, { keywords }));
  }
  function setPerTool(n) { persist(Object.assign({}, cfg, { perTool: n })); }
  function toggleReview() { persist(Object.assign({}, cfg, { reviewBeforePublish: !cfg.reviewBeforePublish })); }

  const state = window.VideoEngine.getState();
  const pending = state.pending || [];
  const manage = window.VideoEngine.published();

  if (!open) return null;
  return (
    <div className="admin-scrim" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()} dir={t.dir}>
        <div className="admin-hd">
          <div>
            <h2><Icon name="ph-sliders" weight="bold" />{A.title}</h2>
            <p>{A.subtitle}</p>
          </div>
          <div className="admin-hd-acts">
            {savedFlash && <span className="saved-flash"><Icon name="ph-check-circle" weight="fill" />{A.saved}</span>}
            <button className="icon-btn" onClick={onClose} aria-label={A.close ?? "close"} style={{ color: "#fff" }}><Icon name="ph-x" weight="bold" /></button>
          </div>
        </div>

        <div className="admin-body">
          {/* تشغيل التحديث الآن */}
          <div className="admin-run">
            <div>
              <div className="ar-t"><Icon name="ph-arrows-clockwise" weight="bold" />{t.video.autoNote}</div>
              <div className="ar-s">{t.updates.lastRun}: {state.week}</div>
            </div>
            <button className="btn btn-solid btn-sm" onClick={onRun} disabled={running}>
              <Icon name="ph-play" weight="fill" style={running ? { animation: "spin 1s linear infinite" } : null} />
              {running ? t.updates.running : A.runNow}
            </button>
          </div>

          {/* القنوات */}
          <section className="admin-sec">
            <h3><Icon name="ph-television-simple" />{A.channels}</h3>
            <p className="as-hint">{A.channelsHint}</p>
            <div className="ch-add">
              <input value={chInput} onChange={(e) => setChInput(e.target.value)} placeholder={A.channelPh}
                onKeyDown={(e) => { if (e.key === "Enter") addChannel(); }} />
              <button className="btn btn-soft btn-sm" onClick={addChannel}><Icon name="ph-plus" weight="bold" />{A.addChannel}</button>
            </div>
            <div className="ch-list">
              {cfg.channels.map((c) =>
              <span key={c.id} className="ch-pill"><Icon name="ph-youtube-logo" weight="fill" />{c.handle}
                  <button onClick={() => removeChannel(c.id)} aria-label={A.remove}><Icon name="ph-x" weight="bold" /></button>
                </span>
              )}
            </div>
          </section>

          {/* الكلمات المفتاحية */}
          <section className="admin-sec">
            <h3><Icon name="ph-magnifying-glass" />{A.keywords}</h3>
            <p className="as-hint">{A.keywordsHint}</p>
            <div className="kw-grid">
              {window.DATA.tools.map((tool) =>
              <div key={tool.id} className="kw-row">
                  <label><Glyph tool={tool} cls="kw-lg" />{tool.name}</label>
                  <input defaultValue={(cfg.keywords[tool.id] || []).join(", ")}
                  onBlur={(e) => setKeywords(tool.id, e.target.value)} placeholder="keyword, keyword" />
                </div>
              )}
            </div>
          </section>

          {/* عدد الفيديوهات + المراجعة */}
          <section className="admin-sec admin-2col">
            <div>
              <h3><Icon name="ph-hash" />{A.perTool}</h3>
              <div className="pt-ctrl">
                <button onClick={() => setPerTool(Math.max(5, cfg.perTool - 1))} aria-label="-"><Icon name="ph-minus" weight="bold" /></button>
                <span className="pt-n">{cfg.perTool}</span>
                <button onClick={() => setPerTool(Math.min(10, cfg.perTool + 1))} aria-label="+"><Icon name="ph-plus" weight="bold" /></button>
                <span className="pt-range">5–10</span>
              </div>
            </div>
            <div>
              <h3><Icon name="ph-eye" />{A.review}</h3>
              <button className={"toggle" + (cfg.reviewBeforePublish ? " on" : "")} onClick={toggleReview} role="switch" aria-checked={cfg.reviewBeforePublish}>
                <span className="knob"></span>
              </button>
            </div>
          </section>

          {/* بانتظار المراجعة */}
          {cfg.reviewBeforePublish &&
          <section className="admin-sec">
              <h3><Icon name="ph-clock-countdown" />{A.pending}{pending.length > 0 && <span className="cnt-badge">{pending.length}</span>}</h3>
              {pending.length === 0 ? <p className="as-empty">{A.noPending}</p> :
            <div className="pending-list">
                  {pending.map((v) =>
              <div key={v.id} className="pend-row">
                      <VideoThumb video={v} />
                      <div className="pend-body"><h5>{tx(v.title)}</h5><span>{v.date}</span></div>
                      <button className="btn btn-solid btn-sm" onClick={() => { window.VideoEngine.approve(v.id); onChanged && onChanged(); setCfg(window.VideoEngine.getConfig()); }}><Icon name="ph-check" weight="bold" />{A.approve}</button>
                    </div>
              )}
                </div>
            }
            </section>
          }

          {/* إدارة الفيديوهات: تثبيت/حذف */}
          <section className="admin-sec">
            <h3><Icon name="ph-list-bullets" />{A.manageVideos}</h3>
            <div className="manage-list">
              {manage.map((v) => {
                const tool = window.DATA.tools.find((x) => x.id === v.toolId);
                return (
                  <div key={v.id} className="manage-row">
                    {tool && <Glyph tool={tool} cls="mr-lg" />}
                    <div className="mr-body"><h5>{tx(v.title)}</h5><span>{tool ? tool.name : ""} · {v.date}</span></div>
                    <button className={"mr-pin" + (v.pinned ? " on" : "")} title={v.pinned ? A.unpin : A.pin}
                      onClick={() => { window.VideoEngine.togglePin(v.id); onChanged && onChanged(); setCfg(window.VideoEngine.getConfig()); }}>
                      <Icon name="ph-push-pin" weight={v.pinned ? "fill" : "regular"} />
                    </button>
                    <button className="mr-del" title={A.remove}
                      onClick={() => { window.VideoEngine.remove(v.id); onChanged && onChanged(); setCfg(window.VideoEngine.getConfig()); }}>
                      <Icon name="ph-trash" />
                    </button>
                  </div>);

              })}
            </div>
          </section>

          {/* ملاحظة الربط */}
          <div className="admin-api">
            <h4><Icon name="ph-plug" weight="bold" />{A.apiTitle}</h4>
            <p>{A.apiNote}</p>
            <code>assets/videos.js → VideoEngine._fetch()</code>
          </div>
        </div>
      </div>
    </div>);

}

Object.assign(window, { AdminPanel });
