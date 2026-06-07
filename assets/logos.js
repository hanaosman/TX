/* ============================================================================
   رادار أدوات الذكاء الاصطناعي — شعارات الأدوات (brand glyphs)
   ----------------------------------------------------------------------------
   رسومات SVG مدمجة بألوان كل علامة. لتبديل أي شعار بالشعار الرسمي، استبدل
   نص الـ SVG هنا فقط (يُفضّل viewBox 0 0 40 40 وبدون width/height ثابتين).
   Inline brand SVGs in each tool's real colours. To swap any for the official
   asset, replace just the SVG string here (keep viewBox, drop fixed width/height).
   ============================================================================ */
window.LOGOS = {
  /* Claude — Anthropic clay sunburst */
  claude: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g stroke="#D97757" stroke-width="3" stroke-linecap="round"><line x1="20" y1="20" x2="33" y2="20"/><line x1="20" y1="20" x2="31.3" y2="13.5"/><line x1="20" y1="20" x2="26.5" y2="8.7"/><line x1="20" y1="20" x2="20" y2="7"/><line x1="20" y1="20" x2="13.5" y2="8.7"/><line x1="20" y1="20" x2="8.7" y2="13.5"/><line x1="20" y1="20" x2="7" y2="20"/><line x1="20" y1="20" x2="8.7" y2="26.5"/><line x1="20" y1="20" x2="13.5" y2="31.3"/><line x1="20" y1="20" x2="20" y2="33"/><line x1="20" y1="20" x2="26.5" y2="31.3"/><line x1="20" y1="20" x2="31.3" y2="26.5"/></g></svg>`,

  /* ChatGPT — OpenAI rosette */
  chatgpt: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#0D0D0D" stroke-width="2.3"><ellipse cx="20" cy="20" rx="6" ry="13" transform="rotate(0 20 20)"/><ellipse cx="20" cy="20" rx="6" ry="13" transform="rotate(30 20 20)"/><ellipse cx="20" cy="20" rx="6" ry="13" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="6" ry="13" transform="rotate(90 20 20)"/><ellipse cx="20" cy="20" rx="6" ry="13" transform="rotate(120 20 20)"/><ellipse cx="20" cy="20" rx="6" ry="13" transform="rotate(150 20 20)"/></g></svg>`,

  /* Gemini — Google four-point spark */
  gemini: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-gemini" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4796E3"/><stop offset=".5" stop-color="#9177C7"/><stop offset="1" stop-color="#D56F76"/></linearGradient></defs><path d="M20 3 C21.4 12.6 27.4 18.6 37 20 C27.4 21.4 21.4 27.4 20 37 C18.6 27.4 12.6 21.4 3 20 C12.6 18.6 18.6 12.6 20 3 Z" fill="url(#g-gemini)"/></svg>`,

  /* Genspark — twin spark */
  genspark: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-gs" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#1466FF"/><stop offset="1" stop-color="#19C6E6"/></linearGradient></defs><path d="M17 6 C18.1 13.4 22.6 17.9 30 19 C22.6 20.1 18.1 24.6 17 32 C15.9 24.6 11.4 20.1 4 19 C11.4 17.9 15.9 13.4 17 6 Z" fill="url(#g-gs)"/><path d="M31 22 C31.5 25.2 33.8 27.5 37 28 C33.8 28.5 31.5 30.8 31 34 C30.5 30.8 28.2 28.5 25 28 C28.2 27.5 30.5 25.2 31 22 Z" fill="url(#g-gs)"/></svg>`,

  /* Replit — three squares */
  replit: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="#F26207"><rect x="21" y="6" width="12" height="12" rx="3.5"/><rect x="9" y="14" width="12" height="12" rx="3.5"/><rect x="21" y="22" width="12" height="12" rx="3.5"/></g></svg>`,

  /* Microsoft Scout — Microsoft four-square mark */
  scout: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="7" width="12" height="12" rx="1.5" fill="#F25022"/><rect x="21" y="7" width="12" height="12" rx="1.5" fill="#7FBA00"/><rect x="7" y="21" width="12" height="12" rx="1.5" fill="#00A4EF"/><rect x="21" y="21" width="12" height="12" rx="1.5" fill="#FFB900"/></svg>`,

  /* Supaboard — analytics bars */
  supaboard: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-supa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E9BE6"/><stop offset="1" stop-color="#0073AB"/></linearGradient></defs><g fill="url(#g-supa)"><rect x="7" y="21" width="6.5" height="13" rx="2.5"/><rect x="16.7" y="11" width="6.5" height="23" rx="2.5"/><rect x="26.5" y="25" width="6.5" height="9" rx="2.5"/></g></svg>`,

  /* Kimi — Moonshot crescent */
  kimi: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M26 6 A15 15 0 1 0 26 34 A12 12 0 1 1 26 6 Z" fill="#16162B"/><path d="M31 6 C31.4 8.4 33 10 35.4 10.4 C33 10.8 31.4 12.4 31 14.8 C30.6 12.4 29 10.8 26.6 10.4 C29 10 30.6 8.4 31 6 Z" fill="#16162B"/></svg>`,
};
