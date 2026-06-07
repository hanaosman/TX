/* ============================================================================
   رادار أدوات الذكاء الاصطناعي — ملف المصادر (Sources configuration)
   AI Tools Radar — Update sources configuration
   ----------------------------------------------------------------------------
   هذا هو الملف الوحيد الذي تحتاج إلى تعديله لإضافة/تغيير مصادر التحديث الأسبوعي.
   This is the ONLY file you edit to add or change the weekly update sources.

   • لكل أداة قائمة مصادر موثوقة (الموقع الرسمي، المدونة، ملاحظات الإصدار، RSS).
   • محرك التحديث (update-engine.js) يقرأ هذه القائمة أسبوعيًا.
   • لا يُنشر أي تحديث بدون مصدر من هذه القائمة (قاعدة "لا مصدر = لا نشر").

   For each tool: a list of TRUSTED sources (official site, blog, release notes,
   RSS). The update engine reads this list weekly. Nothing is published without
   a source from this list ("no source = no publish" rule).
   ============================================================================ */

window.SOURCES = {
  /* الإعدادات العامة لآلية التحديث — General auto-update settings */
  config: {
    intervalDays: 7,            // كل كم يوم يعمل التحديث — run cadence in days
    runOnDay: "sunday",         // اليوم المفضل للتشغيل — preferred run day
    timezone: "Asia/Dubai",     // التوقيت — timezone for the schedule
    requireSource: true,        // لا تنشر تحديثًا بلا مصدر — never publish without a source
    keepArchiveWeeks: 26,       // كم أسبوعًا يُحفظ في الأرشيف — weeks kept in archive
    maxHighlights: 5,           // عدد عناصر "أبرز تحديثات الأسبوع" — top weekly highlights
  },

  /* المصادر لكل أداة — per-tool trusted sources. أضف/احذف بحرية. */
  tools: {
    claude: [
      { type: "official", label: "Anthropic — الموقع الرسمي", url: "https://www.anthropic.com" },
      { type: "blog",     label: "Anthropic News",            url: "https://www.anthropic.com/news" },
      { type: "release",  label: "Release notes",             url: "https://docs.anthropic.com/en/release-notes" },
    ],
    genspark: [
      { type: "official", label: "Genspark — الموقع الرسمي",  url: "https://www.genspark.ai" },
      { type: "blog",     label: "Genspark Blog",             url: "https://www.genspark.ai/blog" },
    ],
    gemini: [
      { type: "official", label: "Google Gemini",             url: "https://gemini.google.com" },
      { type: "blog",     label: "Google Keyword — Gemini",   url: "https://blog.google/products/gemini/" },
      { type: "release",  label: "Gemini release notes",      url: "https://gemini.google.com/updates" },
    ],
    chatgpt: [
      { type: "official", label: "OpenAI — الموقع الرسمي",     url: "https://openai.com" },
      { type: "blog",     label: "OpenAI News",               url: "https://openai.com/news/" },
      { type: "release",  label: "ChatGPT release notes",     url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" },
    ],
    replit: [
      { type: "official", label: "Replit — الموقع الرسمي",     url: "https://replit.com" },
      { type: "blog",     label: "Replit Blog",               url: "https://blog.replit.com" },
      { type: "release",  label: "Changelog",                 url: "https://docs.replit.com/updates" },
    ],
    opal: [
      { type: "official", label: "Google Opal (Labs)",        url: "https://opal.withgoogle.com" },
      { type: "blog",     label: "Google Labs",               url: "https://labs.google" },
    ],
    supaboard: [
      { type: "official", label: "Supaboard — الموقع الرسمي",  url: "https://supaboard.ai" },
      { type: "blog",     label: "Supaboard Blog",            url: "https://supaboard.ai/blog" },
    ],
    kimi: [
      { type: "official", label: "Kimi (Moonshot AI)",        url: "https://kimi.moonshot.cn" },
      { type: "blog",     label: "Moonshot AI",               url: "https://www.moonshot.cn" },
    ],
  },

  /* مصادر إخبارية تقنية عامة (اختيارية) — general trusted tech-news feeds (optional). */
  general: [
    { type: "rss", label: "TechCrunch — AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
    { type: "rss", label: "The Verge — AI",  url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml" },
    { type: "rss", label: "VentureBeat — AI", url: "https://venturebeat.com/category/ai/feed/" },
  ],
};
