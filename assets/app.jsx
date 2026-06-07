/* ============================================================================
   موجز الذكاء الاصطناعي للقيادة — التطبيق الرئيسي (executive App root)
   ============================================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "gold",
  "density": "comfy",
  "header": "light"
} /*EDITMODE-END*/;

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState(() => localStorage.getItem("radar_lang") || "ar");
  const [drawerTool, setDrawerTool] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("watch");
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "ok" });
  const [playing, setPlaying] = useState(null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [reco, setReco] = useState("all");

  const [engine, setEngine] = useState(() => window.UpdateEngine.getState());
  const [tick, setTick] = useState(0);

  window.RX.lang = lang;
  const t = window.I18N[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    localStorage.setItem("radar_lang", lang);
  }, [lang]);

  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-primary", tw.primary);
    r.setAttribute("data-density", tw.density);
    r.setAttribute("data-header", tw.header);
  }, [tw.primary, tw.density, tw.header]);

  // تشغيل تلقائي عند الاستحقاق (مرور 7 أيام) — auto-run weekly when due.
  useEffect(() => {
    if (window.UpdateEngine.isDue()) {
      window.UpdateEngine.runUpdate(false).then((res) => {
        if (res.ran && res.state) {setEngine(Object.assign({}, res.state));setTick((x) => x + 1);}
      });
    }
    if (window.VideoEngine.isDue()) {
      window.VideoEngine.runUpdate(false).then(() => setTick((x) => x + 1));
    }
  }, []);

  function nav(key) {
    setMobileOpen(false);
    if (key === "top") {window.scrollTo({ top: 0, behavior: "smooth" });setActive("watch");return;}
    const el = document.getElementById(key);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setActive(key);
  }

  function toggleLang() {setLang((l) => l === "ar" ? "en" : "ar");}

  // مراقبة القسم النشط أثناء التمرير — scroll-spy.
  useEffect(() => {
    const ids = ["watch", "tools"];
    function onScroll() {
      setScrolled(window.scrollY > 10);
      let cur = "watch";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = id;
      }
      setActive(cur);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openTool = (id) => setDrawerTool(id);

  const counts = {
    videos: window.VideoEngine.videos().filter((v) => {
      const p = String(v.duration).split(":").map(Number);return p.length === 2 && p[0] * 60 + p[1] <= 120;
    }).slice(0, 4).length,
    tools: window.DATA.tools.length
  };

  return (
    <React.Fragment>
      <Header t={t} lang={lang} onLang={toggleLang} active={active} nav={nav} onMobile={() => setMobileOpen(true)} scrolled={scrolled} query={query} onQuery={setQuery} />

      <div className={"mobile-menu" + (mobileOpen ? " open" : "")}>
        <button className="icon-btn mclose" onClick={() => setMobileOpen(false)}><Icon name="ph-x" weight="bold" /></button>
        {["watch", "tools"].map((k) =>
        <button key={k} className="mlink" onClick={() => nav(k)}>{t.nav[k]}</button>
        )}
        <button className="mlink" onClick={toggleLang} style={{ color: "var(--p-700)" }}>{t.switchTo}</button>
      </div>

      <BriefMast t={t} meta={window.DATA.meta} counts={counts} nav={nav} />
      <WatchIn2 t={t} onPlay={setPlaying} key={"w2-" + tick} />
      <ToolsDirectory t={t} query={query} onQuery={setQuery} cat={cat} onCat={setCat}
      reco={reco} onReco={setReco} onOpen={openTool} key={"td-" + tick} />
      <Footer t={t} lang={lang} nav={nav} />

      <Drawer toolId={drawerTool} t={t} onClose={() => setDrawerTool(null)} onVisit={() => {}} onPlay={setPlaying} />
      <Toast toast={toast} />
      <VideoModal video={playing} onClose={() => setPlaying(null)} />

      <TweaksPanel>
        <TweakSection label={t.tweaks.primary} />
        <TweakColorChips value={tw.primary} options={[
        { id: "gold", color: "#92722A" }, { id: "techblue", color: "#286CFF" }, { id: "green", color: "#3F8E50" }]
        } onChange={(v) => setTweak("primary", v)} />
        <TweakSection label={tx({ ar: "العرض", en: "Display" })} />
        <TweakRadio label={t.tweaks.density} value={tw.density} options={[
        { value: "comfy", label: t.tweaks.comfy }, { value: "compact", label: t.tweaks.compact }]
        } onChange={(v) => setTweak("density", v)} />
        <TweakRadio label={t.tweaks.header} value={tw.header} options={[
        { value: "light", label: t.tweaks.light }, { value: "dark", label: t.tweaks.dark }]
        } onChange={(v) => setTweak("header", v)} />
      </TweaksPanel>
    </React.Fragment>);

}

/* محدِّد ألوان مخصّص (3 خيارات) — small custom color-chip control. */
function TweakColorChips({ value, options, onChange }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "4px 2px 10px" }}>
      {options.map((o) =>
      <button key={o.id} onClick={() => onChange(o.id)} title={o.id}
      style={{
        width: 38, height: 38, borderRadius: 10, background: o.color, cursor: "pointer",
        border: value === o.id ? "3px solid #fff" : "3px solid transparent",
        boxShadow: value === o.id ? "0 0 0 2px " + o.color : "inset 0 0 0 1px rgba(0,0,0,.1)",
        transition: "all .15s"
      }}></button>
      )}
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);