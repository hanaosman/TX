/* ============================================================================
   رادار أدوات الذكاء الاصطناعي — مجموعة البيانات (Dataset)
   AI Tools Radar — bilingual dataset (AR / EN)
   ----------------------------------------------------------------------------
   بيانات الأدوات وأبرز التحديثات. عدّل القيم بحرية أو دع محرك التحديث الأسبوعي
   (update-engine.js) يجلب الجديد من المصادر في sources.js.
   ============================================================================ */

window.DATA = {
  meta: {
    version: "2026-W23",
    lastUpdated: "2026-06-05",      // آخر تحديث ناجح — last successful update
    nextScheduled: "2026-06-12",    // التحديث القادم — next scheduled run
    weekLabel: { ar: "الأسبوع 23 · 2026", en: "Week 23 · 2026" },
  },

  /* ---------------------------------------------------------------- التصنيفات */
  categories: [
    { id: "writing",     icon: "ph-pen-nib",              ar: "كتابة المحتوى",            en: "Content writing" },
    { id: "research",    icon: "ph-magnifying-glass",     ar: "البحث والتحليل",           en: "Research & analysis" },
    { id: "coding",      icon: "ph-code",                 ar: "البرمجة وتطوير التطبيقات", en: "Coding & app dev" },
    { id: "slides",      icon: "ph-presentation-chart",   ar: "العروض التقديمية",         en: "Presentations" },
    { id: "dashboards",  icon: "ph-chart-bar",            ar: "لوحات البيانات والتحليلات", en: "Dashboards & BI" },
    { id: "automation",  icon: "ph-flow-arrow",           ar: "الأتمتة والوكلاء",          en: "Automation & agents" },
    { id: "documents",   icon: "ph-file-text",            ar: "تحليل المستندات",          en: "Document analysis" },
    { id: "design",      icon: "ph-palette",              ar: "التصميم والصور",            en: "Design & imagery" },
  ],

  /* مستويات التوصية — recommendation levels */
  recoLevels: {
    strong:      { ar: "موصى بها بشدة", en: "Strongly recommended", variant: "ok" },
    recommended: { ar: "موصى بها",      en: "Recommended",          variant: "info" },
    not:         { ar: "غير موصى بها",  en: "Not recommended",      variant: "neutral" },
  },

  /* ------------------------------------------------------------------ الأدوات */
  tools: [
    {
      id: "claude", name: "Claude", vendor: "Anthropic",
      logo: { text: "C", color: "#92722A" },
      category: "coding", altCategories: ["research", "documents"],
      reco: "strong", isNew: false, featured: true,
      url: "https://claude.ai", reviewed: "2026-06-03",
      price: { amount: 20, currency: "USD", period: "month", note: { ar: "الخطط المدفوعة تبدأ من 20$ شهريًا · خطط للفرق", en: "Paid plans from $20/month · Team plans" } },
      summary: { ar: "يتميّز بالتحليل العميق، البرمجة المتقدمة، وتصميم المواقع ومعالجة ملفات Excel المعقّدة.", en: "Excels at deep analysis, advanced coding, website design, and handling complex Excel files." },
      use: { ar: ["التحليل المعمّق ودعم القرار", "البرمجة المتقدمة ومراجعة الشيفرة", "تصميم وبناء صفحات الويب", "معالجة جداول Excel المعقّدة"], en: ["Deep analysis and decision support", "Advanced coding and code review", "Designing and building web pages", "Working with complex Excel files"] },
      features: { ar: ["تحليل عميق ودقيق للمستندات الطويلة", "برمجة متقدمة وبناء مواقع", "معالجة ملفات Excel المعقّدة", "ضوابط خصوصية للمؤسسات"], en: ["Deep, accurate analysis of long documents", "Advanced coding and website building", "Handles complex Excel files", "Enterprise privacy controls"] },
      limits: { ar: ["بعض الميزات تتطلب خطة مدفوعة"], en: ["Some features need a paid plan"] },
      depts: { ar: ["الشؤون القانونية", "المالية", "إدارة المشاريع", "الخدمات الذكية"], en: ["Legal affairs", "Finance", "Project management", "Smart services"] },
      plans: [
        { name: { ar: "مجانية", en: "Free" }, price: { ar: "0$", en: "$0" }, note: { ar: "وصول أساسي للنموذج بحدود استخدام يومية.", en: "Basic model access with daily usage limits." } },
        { name: { ar: "Pro", en: "Pro" }, price: { ar: "20$ / شهريًا", en: "$20 / month" }, note: { ar: "استخدام أوسع، ميزات متقدمة، ورفع الملفات.", en: "Higher usage, advanced features, and file uploads." } },
        { name: { ar: "Max", en: "Max" }, price: { ar: "من 100$ / شهريًا", en: "From $100 / month" }, note: { ar: "استخدام موسّع 5–20 ضعفًا للمهام الكثيفة.", en: "Expanded 5–20× usage for heavy workloads." } },
        { name: { ar: "Team", en: "Team" }, price: { ar: "25$ / مستخدم شهريًا", en: "$25 / user / month" }, note: { ar: "للفرق، مع إدارة مركزية (فوترة سنوية).", en: "For teams, with central admin (billed annually)." } },
        { name: { ar: "Enterprise", en: "Enterprise" }, price: { ar: "حسب الطلب", en: "Custom" }, note: { ar: "ضوابط أمن وخصوصية للمؤسسات — تواصل مع المبيعات.", en: "Enterprise security & privacy — contact sales." } },
      ],
      update: { date: "2026-06-03", title: { ar: "توسيع مشروع Glasswing لحماية البنية التحتية في عدة دول", en: "Glasswing expands to protect infrastructure across several countries" }, source: { label: "Anthropic News", url: "https://www.anthropic.com/news" } },
    },
    {
      id: "chatgpt", name: "ChatGPT", vendor: "OpenAI",
      logo: { text: "G", color: "#0F766E" },
      category: "writing", altCategories: ["design", "research"],
      reco: "strong", isNew: false, featured: true,
      url: "https://chat.openai.com", reviewed: "2026-06-04",
      price: { amount: 20, currency: "USD", period: "month", note: { ar: "خطة Plus للفرد · خطط للفرق والمؤسسات", en: "Plus per user · Team & enterprise plans" } },
      summary: { ar: "الأفضل في إنشاء المحتوى والكتابة الإبداعية وتوليد الصور، مع أدوات بحث متقدمة ووكلاء مهام.", en: "Best for content creation, creative writing, and image generation, with advanced search and task agents." },
      use: { ar: ["إنشاء المحتوى والكتابة الإبداعية", "توليد الصور والتصاميم", "البحث المتقدم داخل المحادثة", "تنفيذ مهام متعددة الخطوات"], en: ["Content creation and creative writing", "Image and design generation", "Advanced in-chat search", "Multi-step task execution"] },
      features: { ar: ["كتابة إبداعية وإنشاء محتوى متميّز", "توليد الصور", "أدوات بحث متقدمة ووظائف Agentic", "أداة البحث عن الوظائف داخل ChatGPT"], en: ["Strong creative writing & content", "Image generation", "Advanced search & agentic functions", "Built-in job search tool"] },
      limits: { ar: ["تختلف الجودة بين النماذج", "بعض القدرات محصورة بالخطط الأعلى"], en: ["Quality varies between models", "Some capabilities gated to higher tiers"] },
      depts: { ar: ["المحتوى المعرفي", "فريق الميديا", "الفعاليات", "التجربة المتكاملة"], en: ["Knowledge content", "Media team", "Events", "Total experience"] },
      plans: [
        { name: { ar: "مجانية", en: "Free" }, price: { ar: "0$", en: "$0" }, note: { ar: "وصول للنموذج الأساسي بحدود استخدام.", en: "Access to the base model with usage limits." } },
        { name: { ar: "Plus", en: "Plus" }, price: { ar: "20$ / شهريًا", en: "$20 / month" }, note: { ar: "نماذج أحدث، توليد صور، وأدوات متقدمة.", en: "Newer models, image generation, and advanced tools." } },
        { name: { ar: "Pro", en: "Pro" }, price: { ar: "200$ / شهريًا", en: "$200 / month" }, note: { ar: "أعلى حدود استخدام وأقوى النماذج.", en: "Highest usage limits and the most capable models." } },
        { name: { ar: "Team", en: "Team" }, price: { ar: "25$ / مستخدم شهريًا", en: "$25 / user / month" }, note: { ar: "مساحة عمل للفرق (فوترة سنوية).", en: "Team workspace (billed annually)." } },
        { name: { ar: "Enterprise", en: "Enterprise" }, price: { ar: "حسب الطلب", en: "Custom" }, note: { ar: "أمن وإدارة للمؤسسات — تواصل مع المبيعات.", en: "Enterprise security & admin — contact sales." } },
      ],
      update: { date: "2026-06-04", title: { ar: "تحديث GPT-5.5 وإضافة وظائف Agentic وأداة البحث عن الوظائف", en: "GPT-5.5 update, agentic functions, and in-app job search" }, source: { label: "OpenAI News", url: "https://openai.com/news/" } },
    },
    {
      id: "gemini", name: "Gemini", vendor: "Google",
      logo: { text: "✦", color: "#286CFF" },
      category: "research", altCategories: ["writing", "automation"],
      reco: "strong", isNew: false, featured: true,
      url: "https://gemini.google.com", reviewed: "2026-06-02",
      price: { amount: 20, currency: "USD", period: "month", note: { ar: "خطة Google AI Pro · Gemma مجاني ومفتوح المصدر", en: "Google AI Pro · Gemma is free & open-source" } },
      summary: { ar: "تكامل قوي مع Gmail وDocs وDrive، مع نماذج متعددة الوسائط وإصدار Gemma المجاني مفتوح المصدر.", en: "Tight Gmail, Docs and Drive integration, multimodal models, and the free open-source Gemma." },
      use: { ar: ["العمل داخل Gmail وDocs وDrive", "تحليل الفيديو والوسائط المتعددة", "التشغيل المحلّي على الأجهزة دون إنترنت", "البحث والتحليل"], en: ["Work inside Gmail, Docs and Drive", "Video and multimodal analysis", "Run locally on-device, offline", "Research and analysis"] },
      features: { ar: ["تكامل عميق مع Google Workspace", "Gemini Omni للفيديو متعدد الوسائط", "Gemma 4 يعمل محليًا دون إنترنت", "Gemma مجاني ومفتوح المصدر"], en: ["Deep Google Workspace integration", "Gemini Omni multimodal video", "Gemma 4 runs locally, offline", "Gemma is free and open-source"] },
      limits: { ar: ["أفضل أداء ضمن بيئة Google", "بعض الميزات حسب المنطقة"], en: ["Best within the Google ecosystem", "Some features are region-dependent"] },
      depts: { ar: ["إدارة المشاريع", "الشؤون الإدارية", "المحتوى المعرفي"], en: ["Project management", "Administrative affairs", "Knowledge content"] },
      plans: [
        { name: { ar: "مجانية", en: "Free" }, price: { ar: "0$", en: "$0" }, note: { ar: "تشمل Gemma المجاني مفتوح المصدر.", en: "Includes the free, open-source Gemma." } },
        { name: { ar: "Google AI Pro", en: "Google AI Pro" }, price: { ar: "20$ / شهريًا", en: "$20 / month" }, note: { ar: "نماذج أقوى وتكامل مع Workspace.", en: "More capable models and Workspace integration." } },
        { name: { ar: "Google AI Ultra", en: "Google AI Ultra" }, price: { ar: "من 250$ / شهريًا", en: "From $250 / month" }, note: { ar: "أعلى الحدود وأحدث الإمكانات.", en: "Top limits and the latest capabilities." } },
        { name: { ar: "Workspace", en: "Workspace" }, price: { ar: "حسب خطة Workspace", en: "Per Workspace plan" }, note: { ar: "للمؤسسات ضمن اشتراك Google Workspace.", en: "For organisations within Google Workspace." } },
      ],
      update: { date: "2026-06-02", title: { ar: "إطلاق Gemini Omni للفيديو وGemma 4 للتشغيل المحلّي على الأجهزة", en: "Gemini Omni for video and on-device Gemma 4" }, source: { label: "blog.google", url: "https://blog.google/products/gemini/" } },
    },
    {
      id: "scout", name: "Microsoft Scout", vendor: "Microsoft",
      logo: { text: "S", color: "#0078D4" },
      category: "automation", altCategories: ["documents"],
      reco: "recommended", isNew: true, featured: true,
      url: "https://www.microsoft.com", reviewed: "2026-06-02",
      price: { amount: 0, currency: "USD", period: "month", note: { ar: "موجّه للشركات والمؤسسات · تواصل مع المبيعات", en: "Aimed at enterprises · contact sales" } },
      summary: { ar: "مساعد ذكي يعمل باستمرار داخل بيئة العمل، يراقب البريد والملفات وينفّذ المهام بعد موافقتك.", en: "An always-on assistant inside your workplace that watches email and files and acts after your approval." },
      use: { ar: ["مراقبة البريد والملفات باستمرار", "تنفيذ المهام المكتبية بعد الموافقة", "أتمتة سير العمل للمؤسسات", "متابعة المهام نيابة عنك"], en: ["Continuously monitor email and files", "Carry out office tasks after approval", "Automate enterprise workflows", "Follow up on tasks for you"] },
      features: { ar: ["يعمل باستمرار داخل بيئة العمل", "يراقب البريد والملفات", "ينفّذ المهام بعد موافقة المستخدم", "موجّه للشركات والمؤسسات"], en: ["Runs continuously in your workspace", "Monitors email and files", "Acts only after user approval", "Built for enterprises"] },
      limits: { ar: ["موجّه أساسًا للشركات والمؤسسات", "يتطلب صلاحيات وصول واسعة — راجع الخصوصية"], en: ["Primarily for enterprises", "Needs broad access — review privacy"] },
      depts: { ar: ["الخدمات الذكية", "الشؤون الإدارية", "الأمن السيبراني"], en: ["Smart services", "Administrative affairs", "Cybersecurity"] },
      plans: [
        { name: { ar: "للمؤسسات", en: "Enterprise" }, price: { ar: "حسب الطلب", en: "Custom" }, note: { ar: "موجّه للشركات والمؤسسات — تواصل مع المبيعات.", en: "Aimed at enterprises — contact sales." } },
        { name: { ar: "ضمن Microsoft 365", en: "With Microsoft 365" }, price: { ar: "حسب اشتراك المؤسسة", en: "Per enterprise subscription" }, note: { ar: "قد يتطلب اشتراك Microsoft 365 للمؤسسات.", en: "May require a Microsoft 365 enterprise subscription." } },
      ],
      update: { date: "2026-06-01", title: { ar: "إطلاق مساعد Microsoft Scout الذكي للمؤسسات", en: "Microsoft launches the Scout enterprise assistant" }, source: { label: "Microsoft", url: "https://www.microsoft.com" } },
    },
    {
      id: "kimi", name: "Kimi K2.6", vendor: "Moonshot AI",
      logo: { text: "K", color: "#4B4F58" },
      category: "coding", altCategories: ["research", "automation"],
      reco: "recommended", isNew: true, featured: true,
      url: "https://kimi.moonshot.cn", reviewed: "2026-06-03",
      price: { amount: 0, currency: "USD", period: "month", note: { ar: "مجاني للاستخدام العام · خطط للمطوّرين عبر الواجهة البرمجية", en: "Free for general use · API plans for developers" } },
      summary: { ar: "يشغّل مئات الوكلاء الأذكياء بالتوازي — ممتاز للأبحاث الضخمة وتطوير المواقع والتطبيقات.", en: "Runs hundreds of AI agents in parallel — great for large-scale research and building sites and apps." },
      use: { ar: ["تشغيل مئات الوكلاء بالتوازي", "الأبحاث الضخمة والمعمّقة", "تطوير المواقع والتطبيقات", "أتمتة المهام متعددة الخطوات"], en: ["Run hundreds of agents in parallel", "Large, deep research", "Build websites and apps", "Automate multi-step tasks"] },
      features: { ar: ["تشغيل مئات الوكلاء بالتوازي", "ممتاز للأبحاث الضخمة", "تطوير المواقع والتطبيقات", "من أقوى أدوات الـ Agentic AI حاليًا"], en: ["Hundreds of parallel agents", "Excellent for large research", "Builds sites and apps", "Among the strongest agentic AIs today"] },
      limits: { ar: ["الواجهة قد تكون أساسًا بالصينية", "تحقّق من سياسة البيانات قبل الملفات الحساسة"], en: ["UI may default to Chinese", "Check data policy before sensitive files"] },
      depts: { ar: ["الخدمات الذكية", "إدارة المشاريع", "المحتوى المعرفي"], en: ["Smart services", "Project management", "Knowledge content"] },
      plans: [
        { name: { ar: "مجانية", en: "Free" }, price: { ar: "0$", en: "$0" }, note: { ar: "استخدام عام مجاني عبر الواجهة.", en: "Free general use via the app." } },
        { name: { ar: "الواجهة البرمجية", en: "API" }, price: { ar: "حسب الاستهلاك", en: "Usage-based" }, note: { ar: "تسعير حسب عدد الرموز (tokens) للمطوّرين.", en: "Token-based pricing for developers." } },
        { name: { ar: "مؤسسية", en: "Enterprise" }, price: { ar: "حسب الطلب", en: "Custom" }, note: { ar: "خطط للفرق والمؤسسات — تواصل مع المزوّد.", en: "Team & enterprise plans — contact the vendor." } },
      ],
      update: { date: "2026-06-03", title: { ar: "إصدار K2.6 يشغّل مئات الوكلاء الأذكياء بالتوازي", en: "K2.6 runs hundreds of AI agents in parallel" }, source: { label: "Moonshot AI", url: "https://www.moonshot.cn" } },
    },
    {
      id: "replit", name: "Replit Agent 4", vendor: "Replit",
      logo: { text: "▶", color: "#E54B1D" },
      category: "coding", altCategories: ["automation", "slides"],
      reco: "recommended", isNew: true, featured: false,
      url: "https://replit.com", reviewed: "2026-06-02",
      price: { amount: 20, currency: "USD", period: "month", note: { ar: "خطة Core · رصيد استخدام للوكيل (Agent)", en: "Core plan · usage credits for the Agent" } },
      summary: { ar: "يبني تطبيقات كاملة (واجهة وقاعدة بيانات وعروضًا تقديمية) من أوامر نصية فقط.", en: "Builds full apps — front-end, database, and presentations — from text prompts alone." },
      use: { ar: ["بناء تطبيقات كاملة من وصف نصّي", "تطوير المنتجات الرقمية بسرعة", "إنشاء قواعد بيانات وعروض", "النشر السريع للأدوات"], en: ["Build full apps from a text prompt", "Rapid digital product development", "Generate databases and decks", "Fast tool deployment"] },
      features: { ar: ["يبني الواجهة وقاعدة البيانات معًا", "ينشئ عروضًا تقديمية", "من أوامر نصية فقط", "تطوير سريع للمنتجات الرقمية"], en: ["Builds UI and database together", "Generates presentations", "From text prompts only", "Rapid product development"] },
      limits: { ar: ["يحتاج مراجعة أمنية قبل الإنتاج", "تكلفة الوكيل حسب الاستخدام"], en: ["Needs security review before production", "Agent cost scales with usage"] },
      depts: { ar: ["الخدمات الذكية", "إدارة المشاريع"], en: ["Smart services", "Project management"] },
      plans: [
        { name: { ar: "Starter", en: "Starter" }, price: { ar: "0$", en: "$0" }, note: { ar: "للبدء والتجربة بحدود استخدام.", en: "To start and experiment with usage limits." } },
        { name: { ar: "Core", en: "Core" }, price: { ar: "20$ / شهريًا", en: "$20 / month" }, note: { ar: "رصيد استخدام للوكيل وميزات أوسع (فوترة سنوية).", en: "Agent usage credits and more features (billed annually)." } },
        { name: { ar: "Teams", en: "Teams" }, price: { ar: "35$ / مستخدم شهريًا", en: "$35 / user / month" }, note: { ar: "تعاون الفرق وإدارة مركزية.", en: "Team collaboration and central admin." } },
        { name: { ar: "Enterprise", en: "Enterprise" }, price: { ar: "حسب الطلب", en: "Custom" }, note: { ar: "أمن وحوكمة للمؤسسات — تواصل مع المبيعات.", en: "Enterprise security & governance — contact sales." } },
      ],
      update: { date: "2026-06-02", title: { ar: "Agent 4 يبني تطبيقات كاملة من أوامر نصية فقط", en: "Agent 4 builds complete apps from text prompts" }, source: { label: "Replit Changelog", url: "https://docs.replit.com/updates" } },
    },
    {
      id: "genspark", name: "Genspark Workspace", vendor: "Genspark",
      logo: { text: "G", color: "#C026D3" },
      category: "research", altCategories: ["writing", "automation"],
      reco: "recommended", isNew: true, featured: false,
      url: "https://www.genspark.ai", reviewed: "2026-06-01",
      price: { amount: 0, currency: "USD", period: "month", note: { ar: "خطط مدفوعة · استخدام غير محدود لبعض الخدمات ضمن الاشتراك", en: "Paid plans · unlimited use of some services within the subscription" } },
      summary: { ar: "يجمع عدة نماذج ذكاء اصطناعي (GPT وClaude وGemini وغيرها) في منصة واحدة باستخدام غير محدود لبعض الخدمات.", en: "Brings several AI models (GPT, Claude, Gemini and more) into one workspace, with unlimited use of some services." },
      use: { ar: ["الوصول لعدة نماذج من مكان واحد", "مقارنة مخرجات النماذج المختلفة", "الاستخدام المكثّف ضمن اشتراك واحد", "البحث وإعداد المحتوى"], en: ["Access many models in one place", "Compare different model outputs", "Heavy use within one subscription", "Research and content prep"] },
      features: { ar: ["يجمع GPT وClaude وGemini وغيرها", "منصة عمل واحدة موحّدة", "استخدام غير محدود لبعض الخدمات", "تكامل أدوات متعدد"], en: ["Combines GPT, Claude, Gemini and more", "One unified workspace", "Unlimited use of some services", "Multi-tool integration"] },
      limits: { ar: ["أداة حديثة نسبيًا — يُنصح بالتحقق من المخرجات", "قد تتغيّر حدود الخطط"], en: ["Relatively new — verify outputs", "Plan limits may change"] },
      depts: { ar: ["المحتوى المعرفي", "إدارة المشاريع", "التجربة المتكاملة"], en: ["Knowledge content", "Project management", "Total experience"] },
      plans: [
        { name: { ar: "مجانية", en: "Free" }, price: { ar: "0$", en: "$0" }, note: { ar: "وصول محدود لعدة نماذج.", en: "Limited access to multiple models." } },
        { name: { ar: "Plus", en: "Plus" }, price: { ar: "25$ / شهريًا", en: "$25 / month" }, note: { ar: "استخدام أوسع عبر نماذج متعددة.", en: "Higher usage across multiple models." } },
        { name: { ar: "Pro", en: "Pro" }, price: { ar: "250$ / شهريًا", en: "$250 / month" }, note: { ar: "استخدام غير محدود لبعض الخدمات.", en: "Unlimited use of some services." } },
      ],
      update: { date: "2026-06-01", title: { ar: "Workspace يوحّد عدة نماذج في منصة واحدة باستخدام غير محدود", en: "Workspace unifies multiple models with unlimited use" }, source: { label: "Genspark Blog", url: "https://www.genspark.ai/blog" } },
    },
    {
      id: "supaboard", name: "Supaboard", vendor: "Supaboard",
      logo: { text: "S", color: "#0073AB" },
      category: "dashboards", altCategories: ["research"],
      reco: "recommended", isNew: false, featured: false,
      url: "https://supaboard.ai", reviewed: "2026-05-30",
      price: { amount: 0, currency: "USD", period: "month", note: { ar: "خطة مجانية للبدء · خطط مدفوعة حسب المقاعد والبيانات", en: "Free to start · paid plans by seats & data" } },
      summary: { ar: "منصة ذكاء أعمال (BI) باللغة الطبيعية: أنشئ لوحات معلومات وتقارير دون SQL أو خبرة تقنية متقدمة.", en: "A natural-language BI platform: build dashboards and reports with no SQL or advanced technical skills." },
      use: { ar: ["إنشاء لوحات المؤشرات (KPIs)", "تحليل البيانات بدون SQL", "تقارير دورية تلقائية", "استكشاف البيانات بالأسئلة"], en: ["Build KPI dashboards", "Analyse data without SQL", "Automated periodic reports", "Explore data by questions"] },
      features: { ar: ["ذكاء أعمال باللغة الطبيعية", "لوحات وتقارير بدون SQL", "لا يتطلب خبرة تقنية متقدمة", "لوحات تفاعلية قابلة للمشاركة"], en: ["Natural-language business intelligence", "Dashboards & reports without SQL", "No advanced tech skills needed", "Shareable interactive boards"] },
      limits: { ar: ["يتطلب بيانات منظمة لنتائج دقيقة", "راجع متطلبات الخصوصية قبل الربط"], en: ["Needs clean data for accuracy", "Review privacy before connecting data"] },
      depts: { ar: ["المالية", "إدارة المشاريع", "الخدمات الذكية"], en: ["Finance", "Project management", "Smart services"] },
      plans: [
        { name: { ar: "مجانية", en: "Free" }, price: { ar: "0$", en: "$0" }, note: { ar: "للبدء بلوحات وتقارير أساسية.", en: "Start with basic dashboards and reports." } },
        { name: { ar: "Pro", en: "Pro" }, price: { ar: "حسب المقاعد", en: "Per seat" }, note: { ar: "خطة مدفوعة حسب عدد المستخدمين والبيانات.", en: "Paid plan by number of users and data." } },
        { name: { ar: "مؤسسية", en: "Enterprise" }, price: { ar: "حسب الطلب", en: "Custom" }, note: { ar: "للفرق الكبيرة وضوابط الأمن — تواصل مع المزوّد.", en: "For large teams and security controls — contact the vendor." } },
      ],
      update: { date: "2026-05-30", title: { ar: "تحسين إنشاء التقارير ولوحات المعلومات باللغة الطبيعية", en: "Improved natural-language reports and dashboards" }, source: { label: "Supaboard Blog", url: "https://supaboard.ai/blog" } },
    },

    /* ------------------------------------ الأدوات الصاعدة الأكثر انتشارًا (rising) */
    {
      id: "krea", name: "Krea 2 Turbo", vendor: "Krea",
      logo: { text: "K", color: "#111114" },
      category: "design", altCategories: [],
      reco: "recommended", isNew: true, featured: false,
      url: "https://www.krea.ai", reviewed: "2026-06-04",
      price: { amount: 0, currency: "USD", period: "month", note: { ar: "خطة مجانية محدودة · خطط مدفوعة للاستخدام المكثّف", en: "Limited free tier · paid plans for heavy use" } },
      summary: { ar: "توليد صور احترافية عالية الجودة خلال ثوانٍ.", en: "Generates professional, high-quality images in seconds." },
      use: { ar: ["توليد الصور الاحترافية بسرعة", "إنتاج مواد بصرية للحملات", "تجربة أفكار التصميم بسرعة"], en: ["Fast professional image generation", "Visual assets for campaigns", "Quickly prototype design ideas"] },
      features: { ar: ["صور احترافية خلال ثوانٍ", "جودة عالية", "سرعة كبيرة في التوليد"], en: ["Professional images in seconds", "High quality", "Very fast generation"] },
      limits: { ar: ["أداة صاعدة — راجع حقوق الاستخدام"], en: ["Rising tool — check usage rights"] },
      depts: { ar: ["فريق الميديا", "الفعاليات"], en: ["Media team", "Events"] },
      plans: [
        { name: { ar: "مجانية محدودة", en: "Free" }, price: { ar: "0$", en: "$0" }, note: { ar: "عدد محدود من عمليات التوليد.", en: "A limited number of generations." } },
        { name: { ar: "مدفوعة", en: "Paid" }, price: { ar: "من 10$ / شهريًا (تقديري)", en: "From $10 / month (indicative)" }, note: { ar: "توليد أكبر وسرعة أعلى.", en: "More generations and higher speed." } },
        { name: { ar: "احترافية", en: "Pro" }, price: { ar: "حسب الخطة", en: "Per plan" }, note: { ar: "للاستخدام المكثّف والفرق.", en: "For heavy use and teams." } },
      ],
      update: { date: "2026-06-04", title: { ar: "من الأدوات الصاعدة الأكثر انتشارًا هذا الأسبوع", en: "Among the fastest-rising tools this week" }, source: { label: "Krea", url: "https://www.krea.ai" } },
    },
    {
      id: "ideogram", name: "Ideogram 4.0", vendor: "Ideogram",
      logo: { text: "I", color: "#5B5BD6" },
      category: "design", altCategories: [],
      reco: "recommended", isNew: true, featured: false,
      url: "https://ideogram.ai", reviewed: "2026-06-04",
      price: { amount: 0, currency: "USD", period: "month", note: { ar: "خطة مجانية · خطط مدفوعة للاستخدام الأعلى", en: "Free tier · paid plans for higher use" } },
      summary: { ar: "الأفضل في تصميم الصور التي تحتوي على نصوص واضحة ودقيقة.", en: "Best at designing images that contain clear, accurate text." },
      use: { ar: ["تصميم صور تتضمّن نصوصًا", "إنشاء الملصقات والشعارات", "إعداد المواد التسويقية"], en: ["Design images with text", "Create posters and logos", "Prepare marketing assets"] },
      features: { ar: ["دقة عالية في النصوص داخل الصور", "تصاميم احترافية", "مناسب للشعارات والملصقات"], en: ["Accurate text inside images", "Professional designs", "Great for logos and posters"] },
      limits: { ar: ["أداة صاعدة — راجع حقوق الاستخدام"], en: ["Rising tool — check usage rights"] },
      depts: { ar: ["فريق الميديا", "الفعاليات", "المحتوى المعرفي"], en: ["Media team", "Events", "Knowledge content"] },
      plans: [
        { name: { ar: "مجانية", en: "Free" }, price: { ar: "0$", en: "$0" }, note: { ar: "توليد أساسي بحدود استخدام.", en: "Basic generation with usage limits." } },
        { name: { ar: "Basic", en: "Basic" }, price: { ar: "من 8$ / شهريًا (تقديري)", en: "From $8 / month (indicative)" }, note: { ar: "توليد أكبر وأولوية في المعالجة.", en: "More generations and priority processing." } },
        { name: { ar: "Plus", en: "Plus" }, price: { ar: "من 20$ / شهريًا (تقديري)", en: "From $20 / month (indicative)" }, note: { ar: "للاستخدام الأعلى وميزات إضافية.", en: "For higher use and extra features." } },
      ],
      update: { date: "2026-06-04", title: { ar: "من الأدوات الصاعدة الأكثر انتشارًا هذا الأسبوع", en: "Among the fastest-rising tools this week" }, source: { label: "Ideogram", url: "https://ideogram.ai" } },
    },
    {
      id: "factory", name: "Factory Router", vendor: "Factory",
      logo: { text: "F", color: "#E5601D" },
      category: "coding", altCategories: ["automation"],
      reco: "recommended", isNew: true, featured: false,
      url: "https://factory.ai", reviewed: "2026-06-04",
      price: { amount: 0, currency: "USD", period: "month", note: { ar: "خطط حسب الاستخدام · تواصل مع المزوّد", en: "Usage-based plans · contact the vendor" } },
      summary: { ar: "يختار تلقائيًا أفضل نموذج ذكاء اصطناعي لكل مهمة برمجية.", en: "Automatically routes each coding task to the best AI model for it." },
      use: { ar: ["اختيار النموذج الأمثل آليًا لكل مهمة", "تحسين تكلفة الاستدلال", "تسريع مهام البرمجة"], en: ["Auto-pick the optimal model per task", "Cut inference cost", "Speed up coding tasks"] },
      features: { ar: ["توجيه تلقائي لأفضل نموذج", "موازنة الجودة والتكلفة", "مناسب لفرق التطوير"], en: ["Auto-routes to the best model", "Balances quality and cost", "Built for development teams"] },
      limits: { ar: ["أداة صاعدة — موجّهة للفرق التقنية"], en: ["Rising tool — aimed at technical teams"] },
      depts: { ar: ["الخدمات الذكية", "الأمن السيبراني"], en: ["Smart services", "Cybersecurity"] },
      plans: [
        { name: { ar: "حسب الاستهلاك", en: "Usage-based" }, price: { ar: "حسب الاستخدام", en: "Per usage" }, note: { ar: "تسعير وفق حجم الاستدلال — تواصل مع المزوّد.", en: "Priced by inference volume — contact the vendor." } },
        { name: { ar: "خطط الفرق", en: "Teams" }, price: { ar: "حسب الطلب", en: "Custom" }, note: { ar: "للفرق التقنية والمؤسسات.", en: "For technical teams and enterprises." } },
      ],
      update: { date: "2026-06-04", title: { ar: "من الأدوات الصاعدة الأكثر انتشارًا هذا الأسبوع", en: "Among the fastest-rising tools this week" }, source: { label: "Factory", url: "https://factory.ai" } },
    },
    {
      id: "mina", name: "Mina", vendor: "Mina",
      logo: { text: "M", color: "#0EA5A5" },
      category: "automation", altCategories: ["documents"],
      reco: "recommended", isNew: true, featured: false,
      url: "https://www.mina.ai", reviewed: "2026-06-04",
      price: { amount: 0, currency: "USD", period: "month", note: { ar: "خطط للفرق · تواصل مع المزوّد", en: "Team plans · contact the vendor" } },
      summary: { ar: "مساعد اجتماعات ذكي يتحدّث أثناء الاجتماعات ويجيب باستخدام بيانات الشركة.", en: "A smart meeting assistant that speaks during meetings and answers using your company's data." },
      use: { ar: ["دعم الاجتماعات لحظيًا", "الإجابة من بيانات الشركة", "تلخيص القرارات والمهام"], en: ["Live meeting support", "Answer from company data", "Summarise decisions and tasks"] },
      features: { ar: ["يتحدّث ويجيب أثناء الاجتماعات", "يستخدم بيانات الشركة", "تلخيص ومتابعة المهام"], en: ["Speaks and answers in meetings", "Uses company data", "Summaries and action items"] },
      limits: { ar: ["أداة صاعدة — راجع الخصوصية قبل ربط البيانات"], en: ["Rising tool — review privacy before connecting data"] },
      depts: { ar: ["الشؤون الإدارية", "المراسم والبروتوكول", "إدارة المشاريع"], en: ["Administrative affairs", "Protocol and ceremonies", "Project management"] },
      plans: [
        { name: { ar: "خطط الفرق", en: "Teams" }, price: { ar: "حسب الطلب", en: "Custom" }, note: { ar: "تسعير للفرق — تواصل مع المزوّد.", en: "Team pricing — contact the vendor." } },
        { name: { ar: "تجريبي", en: "Trial" }, price: { ar: "حسب التوفّر", en: "As available" }, note: { ar: "فترة تجربة حسب توفّر المزوّد.", en: "Trial period subject to vendor availability." } },
      ],
      update: { date: "2026-06-04", title: { ar: "من الأدوات الصاعدة الأكثر انتشارًا هذا الأسبوع", en: "Among the fastest-rising tools this week" }, source: { label: "Mina", url: "https://www.mina.ai" } },
    },
    {
      id: "fundraisly", name: "Fundraisly", vendor: "Fundraisly",
      logo: { text: "F", color: "#3F8E50" },
      category: "automation", altCategories: ["research"],
      reco: "recommended", isNew: true, featured: false,
      url: "https://fundraisly.ai", reviewed: "2026-06-04",
      price: { amount: 0, currency: "USD", period: "month", note: { ar: "خطط للمشاريع الناشئة · تواصل مع المزوّد", en: "Startup plans · contact the vendor" } },
      summary: { ar: "وكيل ذكاء اصطناعي متخصّص في جمع التمويل للمشاريع الناشئة.", en: "An AI agent specialised in fundraising for startups." },
      use: { ar: ["البحث عن المستثمرين المناسبين", "إعداد عروض ومواد التمويل", "أتمتة التواصل والمتابعة"], en: ["Find matching investors", "Prepare pitch and fundraising materials", "Automate outreach and follow-up"] },
      features: { ar: ["يحدّد المستثمرين المناسبين", "يجهّز مواد جمع التمويل", "متابعة وتواصل آلي"], en: ["Finds matching investors", "Prepares fundraising materials", "Automated follow-up"] },
      limits: { ar: ["أداة صاعدة ومتخصّصة في التمويل"], en: ["Rising, fundraising-focused tool"] },
      depts: { ar: ["المالية", "المشتريات"], en: ["Finance", "Procurement"] },
      plans: [
        { name: { ar: "خطط المشاريع الناشئة", en: "Startup plans" }, price: { ar: "حسب الطلب", en: "Custom" }, note: { ar: "تسعير لجمع التمويل — تواصل مع المزوّد.", en: "Fundraising pricing — contact the vendor." } },
      ],
      update: { date: "2026-06-04", title: { ar: "من الأدوات الصاعدة الأكثر انتشارًا هذا الأسبوع", en: "Among the fastest-rising tools this week" }, source: { label: "Fundraisly", url: "https://fundraisly.ai" } },
    },
  ],

  /* ------------------------------------------ أبرز تحديثات الأسبوع (highlights)
     "الموجز التنفيذي" — يظهر في الأعلى للمدير التنفيذي. كل عنصر له مصدر. */
  highlights: [
    { id: "h1", toolId: "chatgpt", date: "2026-06-04",
      title: { ar: "ChatGPT: تحديث GPT-5.5 ووكلاء مهام وبحث عن الوظائف", en: "ChatGPT: GPT-5.5 update, task agents and job search" },
      summary: { ar: "تحديث GPT-5.5 يحسّن أسلوب الإجابات وسهولة القراءة، مع وظائف Agentic وأداة بحث عن الوظائف داخل التطبيق.", en: "GPT-5.5 improves answer style and readability, with agentic functions and an in-app job search tool." },
      feature: { ar: "وظائف Agentic ووكلاء مهام", en: "Agentic functions & task agents" },
      why: { ar: "يقلّل الوقت اللازم لإنجاز المهام المكتبية المتكررة ويرفع جودة المخرجات.", en: "Cuts time on repetitive office tasks and raises output quality." },
      source: { label: "OpenAI News", url: "https://openai.com/news/" } },
    { id: "h2", toolId: "claude", date: "2026-06-03",
      title: { ar: "Claude: توسيع مشروع Glasswing لحماية البنية التحتية", en: "Claude: Glasswing expands to protect infrastructure" },
      summary: { ar: "توسّع مشروع Glasswing لحماية البنية التحتية الحيوية في عدة دول، مع قدرات تحليل وبرمجة متقدمة.", en: "The Glasswing programme expands to protect critical infrastructure across several countries, alongside advanced analysis and coding." },
      feature: { ar: "حماية البنية التحتية (Glasswing)", en: "Infrastructure protection (Glasswing)" },
      why: { ar: "وثيق الصلة بأمن البنية التحتية الوطنية والجهات الحكومية.", en: "Highly relevant to national infrastructure security and government bodies." },
      source: { label: "Anthropic News", url: "https://www.anthropic.com/news" } },
    { id: "h3", toolId: "gemini", date: "2026-06-02",
      title: { ar: "Gemini Omni للفيديو وGemma 4 للتشغيل المحلّي", en: "Gemini Omni for video and on-device Gemma 4" },
      summary: { ar: "إطلاق Gemini Omni للفيديو متعدد الوسائط، وGemma 4 المجاني الذي يعمل محليًا على الأجهزة دون إنترنت.", en: "Gemini Omni launches for multimodal video, and free Gemma 4 runs locally on devices, offline." },
      feature: { ar: "تشغيل محلّي دون إنترنت", en: "On-device, offline operation" },
      why: { ar: "التشغيل المحلّي يدعم خصوصية البيانات والعمل دون اتصال في الجهات الحساسة.", en: "On-device operation supports data privacy and offline work in sensitive entities." },
      source: { label: "blog.google", url: "https://blog.google/products/gemini/" } },
    { id: "h4", toolId: "kimi", date: "2026-06-03",
      title: { ar: "Kimi K2.6: تشغيل مئات الوكلاء الأذكياء بالتوازي", en: "Kimi K2.6: hundreds of agents running in parallel" },
      summary: { ar: "إصدار K2.6 يشغّل مئات الوكلاء بالتوازي، ما يجعله ممتازًا للأبحاث الضخمة وتطوير المواقع والتطبيقات.", en: "K2.6 runs hundreds of agents in parallel, making it excellent for large research and building sites and apps." },
      feature: { ar: "مئات الوكلاء بالتوازي", en: "Hundreds of parallel agents" },
      why: { ar: "يفتح الباب لأتمتة الأبحاث والمهام واسعة النطاق في وقت قصير.", en: "Enables automating large-scale research and tasks in a short time." },
      source: { label: "Moonshot AI", url: "https://www.moonshot.cn" } },
    { id: "h5", toolId: "scout", date: "2026-06-01",
      title: { ar: "Microsoft Scout: مساعد مؤسسي يعمل باستمرار", en: "Microsoft Scout: an always-on enterprise assistant" },
      summary: { ar: "مساعد ذكي يراقب البريد والملفات داخل بيئة العمل وينفّذ المهام بعد موافقة المستخدم.", en: "A smart assistant that monitors email and files in the workplace and acts after user approval." },
      feature: { ar: "مراقبة وتنفيذ بعد الموافقة", en: "Monitor and act after approval" },
      why: { ar: "يؤتمت المهام المكتبية المتكررة للمؤسسات مع إبقاء القرار بيد المستخدم.", en: "Automates repetitive office tasks for enterprises while keeping the user in control." },
      source: { label: "Microsoft", url: "https://www.microsoft.com" } },
  ],

  /* ----------------------------------------- سجل التحديثات والأرشيف (changelog) */
  changelog: [
    { week: "2026-W23", date: "2026-06-05", status: "success", added: 5,
      tools: ["chatgpt", "claude", "gemini", "kimi", "scout"],
      note: { ar: "تحديث أسبوعي ناجح — 5 تحديثات من المصادر الرسمية.", en: "Successful weekly update — 5 items from official sources." } },
    { week: "2026-W22", date: "2026-06-01", status: "success", added: 4,
      tools: ["replit", "genspark", "supaboard", "kimi"],
      note: { ar: "تحديث أسبوعي ناجح — 4 تحديثات.", en: "Successful weekly update — 4 items." } },
    { week: "2026-W21", date: "2026-05-25", status: "partial", added: 2,
      tools: ["claude", "chatgpt"],
      note: { ar: "نجاح جزئي — تعذّر الوصول إلى مصدرين، عُرضت آخر نسخة ناجحة.", en: "Partial — two sources unreachable, last good version kept." } },
    { week: "2026-W20", date: "2026-05-18", status: "success", added: 6,
      tools: ["claude", "chatgpt", "gemini", "genspark", "replit", "kimi"],
      note: { ar: "تحديث أسبوعي ناجح — 6 تحديثات.", en: "Successful weekly update — 6 items." } },
  ],

  /* ----------------------------------- قائمة انتظار التحديث القادم (next queue) */
  nextQueue: {
    week: "2026-W24", date: "2026-06-12", status: "success",
    highlights: [
      { id: "n1", toolId: "replit", date: "2026-06-10",
        title: { ar: "Replit Agent 4: قوالب نشر جاهزة للأدوات الداخلية", en: "Replit Agent 4: ready deployment templates for internal tools" },
        summary: { ar: "قوالب جاهزة لنشر الأدوات الداخلية بأمان وسرعة.", en: "Ready templates to deploy internal tools quickly and safely." },
        feature: { ar: "قوالب نشر", en: "Deployment templates" },
        why: { ar: "يسرّع إطلاق الأدوات الداخلية لفرق التقنية.", en: "Speeds up internal tool launches for IT teams." },
        source: { label: "Replit Changelog", url: "https://docs.replit.com/updates" } },
      { id: "n2", toolId: "genspark", date: "2026-06-09",
        title: { ar: "Genspark Workspace: إضافة نماذج جديدة للمنصة", en: "Genspark Workspace: new models added" },
        summary: { ar: "إضافة نماذج ذكاء اصطناعي جديدة إلى المنصة الموحّدة.", en: "New AI models added to the unified workspace." },
        feature: { ar: "نماذج إضافية", en: "Additional models" },
        why: { ar: "خيارات أوسع ضمن اشتراك واحد.", en: "Wider choice within one subscription." },
        source: { label: "Genspark Blog", url: "https://www.genspark.ai/blog" } },
      { id: "n3", toolId: "supaboard", date: "2026-06-08",
        title: { ar: "Supaboard: موصّلات بيانات جديدة", en: "Supaboard: new data connectors" },
        summary: { ar: "إضافة موصّلات لمصادر بيانات جديدة وتحسين الاستعلام الطبيعي.", en: "New data-source connectors and better natural-language querying." },
        feature: { ar: "موصّلات بيانات", en: "Data connectors" },
        why: { ar: "يسهّل بناء لوحات الأداء دون فرق تقنية.", en: "Makes performance dashboards easier without technical teams." },
        source: { label: "Supaboard Blog", url: "https://supaboard.ai/blog" } },
    ],
    tools: ["replit", "genspark", "supaboard"],
    note: { ar: "تحديث أسبوعي ناجح — 3 تحديثات جديدة.", en: "Successful weekly update — 3 new items." },
  },
};

/* ============================================================================
   طبقة المدير التنفيذي — Executive layer
   ============================================================================ */

/* مستويات الأثر — business impact levels (High / Medium / Low). */
window.DATA.impactLevels = {
  high:   { ar: "أثر مرتفع",  en: "High impact",   bars: 3 },
  medium: { ar: "أثر متوسط",  en: "Medium impact", bars: 2 },
  low:    { ar: "أثر محدود",  en: "Low impact",    bars: 1 },
};

/* مؤشّر الأثر لكل عنصر في الموجز — impact rating keyed by highlight id. */
window.DATA.impactByHighlight = {
  h1: "high",     // ChatGPT GPT-5.5 + agentic
  h2: "high",     // Claude Glasswing infrastructure protection
  h3: "high",     // Gemini Omni + on-device Gemma 4
  h4: "medium",   // Kimi K2.6 parallel agents
  h5: "medium",   // Microsoft Scout enterprise assistant
};

/* رادار الأثر — four executive picks of the week. */
window.DATA.radar = [
  {
    slot: "release", toolId: "chatgpt", icon: "ph-rocket-launch", accent: "gold",
    label: { ar: "أبرز إصدار هذا الأسبوع", en: "Biggest release this week" },
    reason: { ar: "تحديث GPT-5.5 ووظائف Agentic وأداة بحث عن الوظائف — قفزة في إنشاء المحتوى وتنفيذ المهام.", en: "GPT-5.5 with agentic functions and in-app job search — a leap in content creation and task execution." },
  },
  {
    slot: "government", toolId: "claude", icon: "ph-bank", accent: "green",
    label: { ar: "الأنسب للعمل الحكومي", en: "Most useful for government" },
    reason: { ar: "تحليل عميق ومعالجة المستندات وExcel، مع مشروع Glasswing لحماية البنية التحتية.", en: "Deep analysis, documents and Excel handling, plus the Glasswing infrastructure-protection programme." },
  },
  {
    slot: "productivity", toolId: "gemini", icon: "ph-lightning", accent: "blue",
    label: { ar: "الأنسب للإنتاجية", en: "Most useful for productivity" },
    reason: { ar: "تكامل عميق مع Gmail وDocs وDrive، وGemma 4 يعمل محليًا دون إنترنت.", en: "Deep Gmail, Docs and Drive integration, and Gemma 4 running locally offline." },
  },
  {
    slot: "watch", toolId: "kimi", icon: "ph-binoculars", accent: "slate",
    label: { ar: "أداة تستحق المتابعة", en: "Tool worth monitoring" },
    reason: { ar: "يشغّل مئات الوكلاء بالتوازي ويُعدّ من أقوى منافسي الـ Agentic AI حاليًا.", en: "Runs hundreds of agents in parallel and is among the strongest agentic-AI contenders today." },
  },
];
