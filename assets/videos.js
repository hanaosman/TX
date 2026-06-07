/* ============================================================================
   رادار أدوات الذكاء الاصطناعي — طبقة الفيديو (Video data + weekly engine)
   AI Video Updates — data layer, config, and the weekly video engine.
   ----------------------------------------------------------------------------
   ▸ النسخة التجريبية تعمل بالكامل في المتصفح ببيانات مُعدّة مسبقًا.
   ▸ في الإنتاج: استبدل VideoEngine._fetch() بنداء إلى خادمك الذي يستخدم
     YouTube Data API (انظر شرح الربط في تعليقات الأسفل) — تبقى الواجهة كما هي.

   This demo runs fully in the browser on prepared data. In production, replace
   VideoEngine._fetch() with a call to your server that uses the YouTube Data
   API (wiring notes at the bottom). The UI never changes.

   ملاحظة عن الفيديوهات: في النسخة التجريبية، معرّف الفيديو (videoId) هو مقطع
   Shorts حقيقي قدّمه المستخدم حتى يعمل التشغيل داخل الموقع فعليًا. الصور المصغّرة
   مولّدة بهوية الأداة (تُستبدل تلقائيًا بصور YouTube الحقيقية عبر الـ API).
   ============================================================================ */

/* مقطع Shorts حقيقي (من طلب المستخدم) — real Shorts id so in-site playback works. */
var DEMO_VIDEO_ID = "6VV5Gvmtrl4";

window.VIDEOS = {
  /* ----------------------------------------------- إعدادات قابلة للتعديل (Admin) */
  config: {
    homeCount: 8,            // عدد الفيديوهات في الصفحة الرئيسية — videos shown on home
    perTool: 6,              // عدد الفيديوهات لكل أداة — videos kept per tool (5–10)
    refreshDay: "sunday",    // يوم التحديث الأسبوعي — weekly refresh day
    reviewBeforePublish: false, // مراجعة قبل النشر — hold new videos for review
    // قنوات يوتيوب الموثوقة — trusted YouTube channels (handle + id optional)
    channels: [
      { id: "anthropic",  handle: "@anthropic-ai",  label: "Anthropic" },
      { id: "openai",     handle: "@OpenAI",         label: "OpenAI" },
      { id: "google",     handle: "@Google",         label: "Google" },
      { id: "ainews",     handle: "@AINewsDaily",     label: "AI News Daily" },
    ],
    // كلمات البحث لكل أداة — search keywords per tool (used by the YouTube API).
    keywords: {
      claude:   ["Claude AI update", "Anthropic Claude new"],
      chatgpt:  ["ChatGPT update", "OpenAI new feature"],
      gemini:   ["Gemini update", "Google Gemini new"],
      genspark: ["Genspark AI update", "Genspark agent"],
      replit:   ["Replit AI update", "Replit agent"],
      opal:     ["Google Opal update", "Opal no-code AI"],
      supaboard:["Supaboard AI update", "Supaboard dashboard"],
      kimi:     ["Kimi AI update", "Moonshot Kimi"],
    },
    generalKeywords: ["AI tools news", "AI weekly updates", "AI announcements"],
  },

  /* ------------------------------------------------- قائمة الفيديوهات (this week) */
  items: [
    // —— Shorts (شاهد خلال دقيقة) ——
    { id: "v-cg-s1", toolId: "chatgpt", kind: "short", date: "2026-06-01", duration: "0:48", views: 184200, channel: "OpenAI",
      videoId: DEMO_VIDEO_ID, title: { ar: "ChatGPT: وكلاء المهام في 48 ثانية", en: "ChatGPT task agents in 48 seconds" } },
    { id: "v-cl-s1", toolId: "claude", kind: "short", date: "2026-05-31", duration: "0:52", views: 132900, channel: "Anthropic",
      videoId: DEMO_VIDEO_ID, title: { ar: "Claude: الذاكرة والمشاريع بسرعة", en: "Claude memory & projects, fast" } },
    { id: "v-gm-s1", toolId: "gemini", kind: "short", date: "2026-05-30", duration: "0:41", views: 98700, channel: "Google",
      videoId: DEMO_VIDEO_ID, title: { ar: "Gemini: البحث المتعمّق في دقيقة", en: "Gemini Deep Research in a minute" } },
    { id: "v-gs-s1", toolId: "genspark", kind: "short", date: "2026-05-29", duration: "0:57", views: 64300, channel: "AI News Daily",
      videoId: DEMO_VIDEO_ID, title: { ar: "Genspark: عرض تلقائي من طلب واحد", en: "Genspark: a deck from one prompt" } },
    { id: "v-rp-s1", toolId: "replit", kind: "short", date: "2026-05-28", duration: "0:39", views: 51200, channel: "AI News Daily",
      videoId: DEMO_VIDEO_ID, title: { ar: "Replit: تطبيق كامل من وصف نصّي", en: "Replit: a full app from text" } },
    { id: "v-km-s1", toolId: "kimi", kind: "short", date: "2026-05-27", duration: "0:44", views: 33800, channel: "AI News Daily",
      videoId: DEMO_VIDEO_ID, title: { ar: "Kimi: تحليل ملفات ضخمة بسرعة", en: "Kimi: huge files, analysed fast" } },

    // —— Videos (مقاطع أطول) ——
    { id: "v-cg-1", toolId: "chatgpt", kind: "video", date: "2026-05-26", duration: "1:54", views: 421000, channel: "OpenAI",
      videoId: DEMO_VIDEO_ID, title: { ar: "تحديث ChatGPT الكبير: النموذج والوكلاء", en: "ChatGPT major update: model & agents" } },
    { id: "v-cl-1", toolId: "claude", kind: "video", date: "2026-05-28", duration: "1:42", views: 312400, channel: "Anthropic",
      videoId: DEMO_VIDEO_ID, title: { ar: "Claude: ذاكرة طويلة المدى وملفات المشاريع", en: "Claude: long-term memory & project files" } },
    { id: "v-gm-1", toolId: "gemini", kind: "video", date: "2026-05-25", duration: "1:58", views: 287600, channel: "Google",
      videoId: DEMO_VIDEO_ID, title: { ar: "Gemini والتكامل مع Workspace", en: "Gemini & Workspace integration" } },
    { id: "v-gs-1", toolId: "genspark", kind: "video", date: "2026-05-29", duration: "1:47", views: 142800, channel: "AI News Daily",
      videoId: DEMO_VIDEO_ID, title: { ar: "وكلاء Genspark لإنشاء العروض", en: "Genspark agents for presentations" } },
    { id: "v-rp-1", toolId: "replit", kind: "video", date: "2026-05-22", duration: "1:51", views: 119500, channel: "AI News Daily",
      videoId: DEMO_VIDEO_ID, title: { ar: "Replit Agent: البناء والنشر", en: "Replit Agent: build & deploy" } },
    { id: "v-op-1", toolId: "scout", kind: "video", date: "2026-05-20", duration: "1:38", views: 73200, channel: "Microsoft",
      videoId: DEMO_VIDEO_ID, title: { ar: "Microsoft Scout: مساعد مؤسسي يعمل باستمرار", en: "Microsoft Scout: an always-on enterprise assistant" } },
    { id: "v-sb-1", toolId: "supaboard", kind: "video", date: "2026-05-19", duration: "1:55", views: 58900, channel: "AI News Daily",
      videoId: DEMO_VIDEO_ID, title: { ar: "Supaboard: لوحات بيانات بالأسئلة", en: "Supaboard: dashboards by questions" } },
    { id: "v-km-1", toolId: "kimi", kind: "video", date: "2026-05-17", duration: "1:49", views: 46100, channel: "AI News Daily",
      videoId: DEMO_VIDEO_ID, title: { ar: "Kimi: نافذة سياق طويلة جدًا", en: "Kimi: a very long context window" } },
  ],

  /* ------------------------------------- دفعة الأسبوع القادم (weekly rotation demo)
     في الإنتاج يأتي هذا من YouTube Data API. هنا يحاكي «التحديث الذكي للفيديوهات». */
  nextWeek: [
    { id: "v-cg-s2", toolId: "chatgpt", kind: "short", date: "2026-06-06", duration: "0:51", views: 22100, channel: "OpenAI",
      videoId: DEMO_VIDEO_ID, title: { ar: "ChatGPT: ميزة جديدة هذا الأسبوع", en: "ChatGPT: a new feature this week" } },
    { id: "v-cl-2", toolId: "claude", kind: "video", date: "2026-06-05", duration: "1:30", views: 18700, channel: "Anthropic",
      videoId: DEMO_VIDEO_ID, title: { ar: "Claude: تحسينات الأداء الأخيرة", en: "Claude: latest performance gains" } },
    { id: "v-gm-s2", toolId: "gemini", kind: "short", date: "2026-06-04", duration: "0:38", views: 15400, channel: "Google",
      videoId: DEMO_VIDEO_ID, title: { ar: "Gemini: نصيحة سريعة للإنتاجية", en: "Gemini: a quick productivity tip" } },
    { id: "v-sb-2", toolId: "supaboard", kind: "video", date: "2026-06-03", duration: "1:20", views: 9800, channel: "AI News Daily",
      videoId: DEMO_VIDEO_ID, title: { ar: "Supaboard: موصّلات بيانات جديدة", en: "Supaboard: new data connectors" } },
  ],
};

/* ============================================================================
   VideoEngine — محرّك الفيديو الأسبوعي
   • يحفظ الحالة في localStorage، يدوّرها أسبوعيًا، يؤرشف القديم، ويحسب الأكثر مشاهدة.
   • يحترم إعدادات لوحة التحكم (perTool، reviewBeforePublish، القنوات، الكلمات).
   ============================================================================ */
(function () {
  const KEY = "ai_radar_videos_v3";
  const CFGKEY = "ai_radar_video_cfg_v3";

  function _load(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function _save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* الإعدادات: تُدمج إعدادات المستخدم المحفوظة فوق الافتراضية — merge saved cfg. */
  function getConfig() {
    const saved = _load(CFGKEY) || {};
    return Object.assign({}, window.VIDEOS.config, saved);
  }
  function setConfig(patch) {
    const next = Object.assign({}, getConfig(), patch);
    // لا نخزّن الحقول الافتراضية الكاملة، فقط ما تغيّر فعليًا (نخزّن الكل ببساطة).
    _save(CFGKEY, next);
    return next;
  }

  function _seed() {
    return {
      items: window.VIDEOS.items.map((v) => Object.assign({}, v)),
      pending: [],                         // بانتظار المراجعة — awaiting review
      archive: [],                         // فيديوهات مؤرشفة — archived videos
      lastRunTs: Date.parse("2026-06-01T08:00:00") || Date.now(),
      week: "2026-W22",
    };
  }

  function getState() {
    let s = _load(KEY);
    if (!s) { s = _seed(); _save(KEY, s); }
    return s;
  }
  function _commit(s) { _save(KEY, s); return s; }

  function isDue() {
    const s = getState();
    return Math.floor((Date.now() - s.lastRunTs) / 86400000) >= 7;
  }

  /* الفيديوهات المعروضة (منشورة فقط) — published videos, honoring perTool cap. */
  function published() {
    const s = getState();
    const cfg = getConfig();
    const byTool = {};
    const out = [];
    // المثبّتة أولًا — pinned first.
    const sorted = s.items.slice().sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || new Date(b.date) - new Date(a.date));
    for (const v of sorted) {
      byTool[v.toolId] = (byTool[v.toolId] || 0) + 1;
      if (byTool[v.toolId] <= cfg.perTool) out.push(v);
    }
    return out;
  }

  function forTool(toolId) { return published().filter((v) => v.toolId === toolId); }
  function shorts() { return published().filter((v) => v.kind === "short"); }
  function videos() { return published().filter((v) => v.kind === "video"); }

  /* الأكثر مشاهدة هذا الأسبوع — most viewed this week. */
  function mostViewed(n) {
    return published().slice().sort((a, b) => b.views - a.views).slice(0, n || 5);
  }

  function togglePin(id) {
    const s = getState();
    const v = s.items.find((x) => x.id === id);
    if (v) v.pinned = !v.pinned;
    return _commit(s);
  }
  function remove(id) {
    const s = getState();
    const i = s.items.findIndex((x) => x.id === id);
    if (i >= 0) { s.archive.unshift(s.items[i]); s.items.splice(i, 1); }
    return _commit(s);
  }
  function approve(id) {
    const s = getState();
    const i = s.pending.findIndex((x) => x.id === id);
    if (i >= 0) { s.items.unshift(s.pending[i]); s.pending.splice(i, 1); }
    return _commit(s);
  }

  /* ----------------------------------------------------------------------------
     _fetch(): مصدر الفيديوهات الجديدة. النسخة التجريبية تُرجع VIDEOS.nextWeek.
     في الإنتاج استبدلها بنداء خادمك:
        const r = await fetch('/api/youtube-weekly'); return await r.json();
     على الخادم استخدم YouTube Data API search.list مع:
        part=snippet, type=video, order=date, publishedAfter=<قبل 7 أيام>,
        q=<من config.keywords>, videoDuration=short (للـ Shorts)،
        ثم videos.list لجلب contentDetails.duration و statistics.viewCount.
     أعد عناصر بنفس الشكل: {id,toolId,kind,date,duration,views,channel,videoId,title}.
     ---------------------------------------------------------------------------- */
  async function _fetch() {
    return JSON.parse(JSON.stringify(window.VIDEOS.nextWeek || []));
  }

  /* التحديث الذكي الأسبوعي — smart weekly update: add new, archive oldest beyond cap. */
  async function runUpdate(force) {
    const s = getState();
    if (!force && !isDue()) return { ran: false, reason: "not-due", state: s };

    let incoming = [];
    try { incoming = await _fetch(); }
    catch (e) { return { ran: true, status: "failed", state: s }; }

    const cfg = getConfig();
    let added = 0;
    const target = cfg.reviewBeforePublish ? s.pending : s.items;
    for (const v of incoming) {
      if (s.items.some((x) => x.id === v.id) || s.pending.some((x) => x.id === v.id)) continue;
      target.unshift(v); added++;
    }

    // أرشفة ما يتجاوز السقف لكل أداة (الأقدم) — archive oldest beyond perTool cap.
    const byTool = {};
    const keep = [];
    const sorted = s.items.slice().sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || new Date(b.date) - new Date(a.date));
    for (const v of sorted) {
      byTool[v.toolId] = (byTool[v.toolId] || 0) + 1;
      if (byTool[v.toolId] <= Math.max(cfg.perTool, 10)) keep.push(v); else s.archive.unshift(v);
    }
    s.items = keep;
    s.lastRunTs = Date.now();

    return { ran: true, status: "success", added, state: _commit(s) };
  }

  function reset() { localStorage.removeItem(KEY); localStorage.removeItem(CFGKEY); }

  window.VideoEngine = {
    getState, getConfig, setConfig, isDue, runUpdate,
    published, forTool, shorts, videos, mostViewed,
    togglePin, remove, approve, reset,
  };
})();
