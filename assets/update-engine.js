/* ============================================================================
   رادار أدوات الذكاء الاصطناعي — محرّك التحديث الأسبوعي (Weekly Update Engine)
   ----------------------------------------------------------------------------
   يعمل بالكامل في المتصفح. مسؤول عن:
   • تتبّع آخر تحديث ناجح في localStorage.
   • تشغيل التحديث تلقائيًا عند مرور (intervalDays) أو يدويًا بزر "تحديث الآن".
   • دمج التحديثات الجديدة من قائمة الانتظار (وفي الإنتاج: من الخادم/المصادر).
   • أرشفة الأسبوع السابق والتسجيل في سجل التحديثات.
   • الأمان عند الفشل: يُبقي آخر نسخة ناجحة ولا يعطّل الموقع.

   Runs entirely in the browser. Tracks the last successful update, runs weekly
   (or on demand), merges new items, archives the prior week, logs the run, and
   falls back to the last good version on failure.

   في الإنتاج: استبدل _fetchUpdates() بنداء إلى الخادم (انظر how-it-works docs).
   In production: replace _fetchUpdates() with a call to your server.
   ============================================================================ */
(function () {
  const KEY = "ai_tools_radar_state_v2";
  const cfg = (window.SOURCES && window.SOURCES.config) || { intervalDays: 7, keepArchiveWeeks: 26, requireSource: true };

  function _now() { return Date.now(); }
  function _daysBetween(a, b) { return Math.floor((b - a) / 86400000); }

  function _load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; }
  }
  function _save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full / private mode */ }
  }

  /* الحالة الأولية مأخوذة من DATA — initial state seeded from the dataset. */
  function _seed() {
    return {
      highlights: window.DATA.highlights.slice(),
      changelog: window.DATA.changelog.slice(),
      meta: Object.assign({}, window.DATA.meta),
      lastRunTs: Date.parse(window.DATA.meta.lastUpdated + "T08:00:00") || _now(),
      archive: [],   // الأسابيع المؤرشفة — archived weeks
      log: [{ ts: _now(), week: window.DATA.meta.version, status: "success", added: window.DATA.highlights.length, note: "seed" }],
    };
  }

  /* ----------------------------------------------------------------------------
     _fetchUpdates(): مصدر التحديثات الجديدة.
     النسخة التجريبية تقرأ من DATA.nextQueue. في الإنتاج استبدلها بـ:
        const res = await fetch('/api/weekly-update'); return await res.json();
     ويجب أن يُرجع الخادم نفس البنية: { week, date, status, highlights[], tools[], note }.
     ---------------------------------------------------------------------------- */
  async function _fetchUpdates() {
    const q = window.DATA.nextQueue;
    if (!q) return null;
    // محاكاة فشل عشوائي صغير للتأكد من الأمان؟ — نُبقيها ناجحة افتراضيًا.
    return JSON.parse(JSON.stringify(q));
  }

  /* تطبيق قاعدة "لا مصدر = لا نشر" — enforce the no-source rule. */
  function _filterSourced(items) {
    if (!cfg.requireSource) return items;
    return items.filter((it) => it.source && it.source.url);
  }

  function getState() {
    let s = _load();
    if (!s) { s = _seed(); _save(s); }
    return s;
  }

  function isDue() {
    const s = getState();
    return _daysBetween(s.lastRunTs, _now()) >= (cfg.intervalDays || 7);
  }

  function lastRunInfo() {
    const s = getState();
    return { ts: s.lastRunTs, version: s.meta.version, log: s.log[s.log.length - 1] };
  }

  /* تشغيل دورة تحديث. force=true يتجاوز فحص المدة (لزر "تحديث الآن"). */
  async function runUpdate(force) {
    const s = getState();
    if (!force && !isDue()) return { ran: false, reason: "not-due", state: s };

    let incoming = null;
    try {
      incoming = await _fetchUpdates();
    } catch (e) {
      // فشل الجلب — أمان: أبقِ آخر نسخة ناجحة وسجّل الفشل.
      s.log.push({ ts: _now(), week: s.meta.version, status: "failed", added: 0, note: String(e) });
      _save(s);
      return { ran: true, status: "failed", state: s };
    }

    if (!incoming || !incoming.highlights || !incoming.highlights.length) {
      s.log.push({ ts: _now(), week: s.meta.version, status: "failed", added: 0, note: "no-data" });
      _save(s);
      return { ran: true, status: "failed", state: s };
    }

    const sourced = _filterSourced(incoming.highlights);
    if (!sourced.length) {
      s.log.push({ ts: _now(), week: incoming.week, status: "failed", added: 0, note: "no-sourced-items" });
      _save(s);
      return { ran: true, status: "failed", state: s };
    }

    // أرشفة الأسبوع الحالي قبل الاستبدال — archive current week first.
    s.archive.unshift({ week: s.meta.version, highlights: s.highlights });
    if (s.archive.length > (cfg.keepArchiveWeeks || 26)) s.archive.length = cfg.keepArchiveWeeks;

    // تحديث "أبرز الأسبوع" — replace highlights with the new sourced items.
    s.highlights = sourced.slice(0, (cfg.maxHighlights || 5));

    // تحديث بيانات الأدوات (آخر تحديث + المصدر) — patch tool.update from incoming.
    sourced.forEach((h) => {
      const tool = window.DATA.tools.find((t) => t.id === h.toolId);
      if (tool) {
        tool.update = { date: h.date, title: h.title, source: h.source };
        tool._justUpdated = true;
      }
    });

    // سجلّ ومِيتا — changelog entry + meta.
    const entry = { week: incoming.week, date: incoming.date, status: incoming.status || "success",
      added: sourced.length, tools: incoming.tools || sourced.map((h) => h.toolId), note: incoming.note };
    s.changelog.unshift(entry);
    s.meta.version = incoming.week;
    s.meta.lastUpdated = incoming.date;
    s.lastRunTs = _now();
    s.log.push({ ts: _now(), week: incoming.week, status: entry.status, added: sourced.length, note: "ok" });

    _save(s);
    return { ran: true, status: entry.status, state: s, entry };
  }

  function reset() { localStorage.removeItem(KEY); }

  window.UpdateEngine = { getState, isDue, runUpdate, lastRunInfo, reset, _seed };
})();
