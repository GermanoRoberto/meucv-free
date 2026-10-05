const assert = require("node:assert");
const test = require("node:test");

// Mock browser globals needed by app.js functions
class MockClassList {
  constructor() {
    this.classes = new Set();
  }
  add(c) { this.classes.add(c); }
  remove(c) { this.classes.delete(c); }
  contains(c) { return this.classes.has(c); }
}

class MockElement {
  constructor(id = "") {
    this.id = id;
    this.value = "";
    this.innerHTML = "";
    this.innerText = "";
    this.textContent = "";
    this.title = "";
    this.className = "";
    this.classList = new MockClassList();
    this.style = {};
    this.attributes = {};
    this.listeners = {};
    this.children = [];
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  appendChild(child) { this.children.push(child); return child; }
  remove() {}
  querySelectorAll(selector) { return []; }
  querySelector(selector) { return null; }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  click() {
    if (this.listeners["click"]) {
      this.listeners["click"].forEach(fn => fn({ preventDefault: () => {} }));
    }
  }
}

const elements = new Map();
function getOrCreateElement(id) {
  if (!elements.has(id)) {
    elements.set(id, new MockElement(id));
  }
  return elements.get(id);
}

global.window = {
  lucide: { createIcons: () => {} }
};
global.lucide = global.window.lucide;

global.document = {
  getElementById: (id) => getOrCreateElement(id),
  createElement: (tag) => new MockElement(tag),
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener: () => {}
};

const app = require("../app.js");

// Initialize test state
function resetState() {
  elements.clear();
  app.appState.currentCvId = "test_cv_1";
  app.appState.currentCvName = "Meu Currículo Importado";
  app.appState.currentCvData = JSON.parse(JSON.stringify(app.DEFAULT_CV_DATA));
  app.appState.library = [];
  global.appState = app.appState;

  global.fillFormFromState = () => {
    const d = app.appState.currentCvData;
    getOrCreateElement("personal-title").value = d.title || "";
    getOrCreateElement("personal-summary").value = d.summary || "";
    getOrCreateElement("personal-name").value = d.name || "";
  };
  global.renderCv = () => {
    app.updateLinkedinRestoreButtonUI();
    const d = app.appState.currentCvData;
    getOrCreateElement("cv-paper").innerHTML = `<h1>${d.name}</h1><h2>${d.title}</h2><p>${d.summary}</p>`;
  };
  global.saveActiveCvStateToLibrary = () => {
    // Saved
  };

  const btn = getOrCreateElement("btn-restore-linkedin-original");
  btn.addEventListener("click", () => {
    app.toggleLinkedinOptimization();
  });
}

test("R1: Import of Profile.csv automatically applies high-performance Title and Summary", () => {
  resetState();

  const rawHeadline = "Desenvolvedor Frontend na TechCorp | React, TypeScript | Buscando recolocação | #OpenToWork 🚀";
  const rawSummary = "Olá pessoal! Meu nome é João Silva e tenho 5 anos de experiência com TI. Trabalho na empresa XPTO com React e Node. Contato: joao@email.com. Sejam bem-vindos ao meu perfil!";

  const csvContent = [
    "First Name,Last Name,Maiden Name,Address,Birth Date,Headline,Summary,Industry",
    `João,Silva,,,,${JSON.stringify(rawHeadline)},${JSON.stringify(rawSummary)},Tecnologia`
  ].join("\n");

  const parsed = app.parseCSV(csvContent);
  assert.strictEqual(parsed.length, 2);

  const count = app.mergeLinkedinProfileCsv(parsed);
  assert.strictEqual(count, 1);

  // Active CV fields must be the optimized versions
  const cv = app.appState.currentCvData;
  assert.strictEqual(cv.isLinkedinImport, true);
  assert.notStrictEqual(cv.title, rawHeadline, "Active title should not be the cluttered raw headline");
  assert.notStrictEqual(cv.summary, rawSummary, "Active summary should not be the informal raw summary");

  // Verify clutter is removed from Title
  assert.strictEqual(cv.title.includes("🚀"), false, "Title should not contain emojis");
  assert.strictEqual(cv.title.includes("#OpenToWork"), false, "Title should not contain hashtags");
  assert.strictEqual(cv.title.includes("Buscando recolocação"), false, "Title should not contain search clutter");
  assert.strictEqual(cv.title.includes("na TechCorp"), false, "Title should not contain company preposition");
  assert.strictEqual(cv.title, "Desenvolvedor Frontend | React • TypeScript");

  // Verify informal greetings and contact are removed from Summary
  assert.strictEqual(cv.summary.includes("Olá pessoal!"), false, "Summary should not contain greetings");
  assert.strictEqual(cv.summary.includes("joao@email.com"), false, "Summary should not contain emails");
  assert.strictEqual(cv.summary.includes("Sejam bem-vindos"), false, "Summary should not contain welcome filler");
  assert.strictEqual(cv.summary.includes("qualidade técnica e entrega consistente de valor"), true, "Summary should include high-impact closing");

  // Sync form inputs and preview
  global.fillFormFromState();
  global.renderCv();
  assert.strictEqual(getOrCreateElement("personal-title").value, cv.title);
  assert.strictEqual(getOrCreateElement("personal-summary").value, cv.summary);
  assert.strictEqual(getOrCreateElement("cv-paper").innerHTML.includes(cv.title), true);
  assert.strictEqual(getOrCreateElement("cv-paper").innerHTML.includes(cv.summary), true);
});

test("R2: Raw LinkedIn text is preserved in linkedinOriginal and revert/toggle works reactively", () => {
  resetState();

  const rawHeadline = "Software Engineer at Google | Python, Go | Open to Work";
  const rawSummary = "Olá! Engenheiro de software focado em microsserviços. Contato: email@exemplo.com";

  const csvRows = [
    ["First Name", "Last Name", "Headline", "Summary"],
    ["Carlos", "Mendes", rawHeadline, rawSummary]
  ];

  app.mergeLinkedinProfileCsv(csvRows);
  const cv = app.appState.currentCvData;

  // Verify preservation in linkedinOriginal
  assert.ok(cv.linkedinOriginal, "linkedinOriginal must exist in currentCvData");
  assert.strictEqual(cv.linkedinOriginal.title, rawHeadline, "Raw title must match verbatim");
  assert.strictEqual(cv.linkedinOriginal.summary, rawSummary, "Raw summary must match verbatim");
  assert.strictEqual(cv.linkedinOriginal.isOptimizedApplied, true, "Initially optimized is applied");

  global.fillFormFromState();
  global.renderCv();

  // Test Reversion: Click 'Restaurar Original' / toggleLinkedinOptimization
  app.toggleLinkedinOptimization();

  // Active CV fields must now be the raw original texts
  assert.strictEqual(cv.title, rawHeadline, "After revert, title must be the raw headline");
  assert.strictEqual(cv.summary, rawSummary, "After revert, summary must be the raw summary");
  assert.strictEqual(cv.linkedinOriginal.isOptimizedApplied, false);

  // Form inputs and A4 document preview must update reactively
  assert.strictEqual(getOrCreateElement("personal-title").value, rawHeadline);
  assert.strictEqual(getOrCreateElement("personal-summary").value, rawSummary);
  assert.strictEqual(getOrCreateElement("cv-paper").innerHTML.includes(rawHeadline), true);
  assert.strictEqual(getOrCreateElement("cv-paper").innerHTML.includes(rawSummary), true);

  // Button text must update to indicate reapplication
  const btn = getOrCreateElement("btn-restore-linkedin-original");
  assert.strictEqual(btn.innerHTML.includes("Reaplicar Otimização"), true);

  // Test Re-application: Click toggle again
  app.toggleLinkedinOptimization();

  assert.strictEqual(cv.title, cv.linkedinOriginal.optimizedTitle);
  assert.strictEqual(cv.summary, cv.linkedinOriginal.optimizedSummary);
  assert.strictEqual(cv.linkedinOriginal.isOptimizedApplied, true);

  assert.strictEqual(getOrCreateElement("personal-title").value, cv.linkedinOriginal.optimizedTitle);
  assert.strictEqual(getOrCreateElement("personal-summary").value, cv.linkedinOriginal.optimizedSummary);
  assert.strictEqual(getOrCreateElement("cv-paper").innerHTML.includes(cv.linkedinOriginal.optimizedTitle), true);
  assert.strictEqual(btn.innerHTML.includes("Restaurar Original"), true);
});

test("R3: Diagnostic report includes visual badge 'Aplicado ao Currículo'", () => {
  resetState();

  const rawHeadline = "Analista de Dados na Startup ABC | SQL, Power BI";
  const rawSummary = "Analista com 3 anos de experiência em modelagem de dados.";

  const csvRows = [
    ["First Name", "Last Name", "Headline", "Summary"],
    ["Ana", "Costa", rawHeadline, rawSummary]
  ];

  app.mergeLinkedinProfileCsv(csvRows);
  const cv = app.appState.currentCvData;

  const contentArea = getOrCreateElement("linkedin-csv-analysis-content");
  app.runLocalLinkedinLinkedinHeuristics(cv, contentArea);

  assert.strictEqual(contentArea.innerHTML.includes("Aplicado ao Currículo"), true, "Report must contain 'Aplicado ao Currículo'");
  assert.strictEqual(contentArea.innerHTML.includes("badge-applied"), true, "Report must use badge-applied CSS class");
  assert.strictEqual(contentArea.innerHTML.includes("Título Original do LinkedIn:"), true, "Report must show original title for reference");
  assert.strictEqual(contentArea.innerHTML.includes("Título Otimizado Aplicado:"), true, "Report must show applied optimized title");
  assert.strictEqual(contentArea.innerHTML.includes(cv.title), true, "Report must contain current active title");
});

test("Synthesis Edge Cases: empty values, short values, and multiple toggles", () => {
  resetState();

  // Edge case 1: Empty headline and empty summary
  const emptyRes = app.synthesizeLinkedinHighPerformanceContent("", "", {
    experiences: [{ role: "Backend Developer", company: "Test Co" }],
    skills: ["Node.js", "Docker"]
  });
  assert.ok(emptyRes.optimizedTitle.includes("Backend Developer"));
  assert.ok(emptyRes.optimizedSummary.length > 30);

  // Edge case 2: Profile already clean
  const cleanRes = app.synthesizeLinkedinHighPerformanceContent(
    "Engenheiro de Software Sênior | Java • Spring",
    "Engenheiro de software com mais de 8 anos de experiência em sistemas distribuídos.",
    {}
  );
  assert.strictEqual(cleanRes.optimizedTitle, "Engenheiro de Software Sênior | Java • Spring");
  assert.ok(cleanRes.optimizedSummary.includes("Engenheiro de software"));

  // Edge case 3: Refine optimizations with positions and skills
  const cv = app.appState.currentCvData;
  cv.linkedinOriginal = {
    title: "Dev Fullstack na Startup X",
    summary: "Trabalho criando sites.",
    optimizedTitle: "Desenvolvedor Fullstack",
    optimizedSummary: "Trabalho criando sites.",
    isOptimizedApplied: true
  };
  cv.skills = ["React", "Node.js", "PostgreSQL"];
  cv.experiences = [{ role: "Desenvolvedor Full Stack", company: "Startup X" }];

  app.refineLinkedinOptimizations();
  assert.strictEqual(cv.title, "Desenvolvedor Fullstack | React • Node.js • PostgreSQL");
  assert.ok(cv.summary.length > 30);
});

test("E2E: Multiple toggles via direct button click and state persistence", () => {
  resetState();

  const rawHeadline = "Desenvolvedor Mobile | Swift, Kotlin";
  const rawSummary = "Desenvolvo apps nativos.";

  app.mergeLinkedinProfileCsv([
    ["First Name", "Last Name", "Headline", "Summary"],
    ["Lucas", "Silva", rawHeadline, rawSummary]
  ]);

  const cv = app.appState.currentCvData;
  const optTitle = cv.title;
  const optSummary = cv.summary;
  assert.strictEqual(cv.linkedinOriginal.isOptimizedApplied, true);

  const btn = getOrCreateElement("btn-restore-linkedin-original");

  // Toggle 1: Revert via button click
  btn.click();
  assert.strictEqual(cv.title, rawHeadline);
  assert.strictEqual(cv.summary, rawSummary);
  assert.strictEqual(cv.linkedinOriginal.isOptimizedApplied, false);
  assert.strictEqual(getOrCreateElement("personal-title").value, rawHeadline);
  assert.strictEqual(getOrCreateElement("personal-summary").value, rawSummary);

  // Toggle 2: Reapply via button click
  btn.click();
  assert.strictEqual(cv.title, optTitle);
  assert.strictEqual(cv.summary, optSummary);
  assert.strictEqual(cv.linkedinOriginal.isOptimizedApplied, true);
  assert.strictEqual(getOrCreateElement("personal-title").value, optTitle);
  assert.strictEqual(getOrCreateElement("personal-summary").value, optSummary);

  // Toggle 3: Revert again
  btn.click();
  assert.strictEqual(cv.title, rawHeadline);
  assert.strictEqual(cv.summary, rawSummary);
  assert.strictEqual(cv.linkedinOriginal.isOptimizedApplied, false);

  // Toggle 4: Reapply again
  btn.click();
  assert.strictEqual(cv.title, optTitle);
  assert.strictEqual(cv.summary, optSummary);
  assert.strictEqual(cv.linkedinOriginal.isOptimizedApplied, true);
});

test("Security & Escaping: XSS protection in original text rendering", () => {
  resetState();

  const maliciousHeadline = "<script>alert('xss')</script> Lead Dev";
  const maliciousSummary = "<img src=x onerror=alert(1)> Resumo profissional.";

  app.mergeLinkedinProfileCsv([
    ["First Name", "Last Name", "Headline", "Summary"],
    ["Hacker", "One", maliciousHeadline, maliciousSummary]
  ]);

  const cv = app.appState.currentCvData;
  assert.strictEqual(cv.linkedinOriginal.title, maliciousHeadline);
  assert.strictEqual(cv.linkedinOriginal.summary, maliciousSummary);

  const contentArea = getOrCreateElement("linkedin-csv-analysis-content");
  app.runLocalLinkedinLinkedinHeuristics(cv, contentArea);

  // Verifying HTML does not contain unescaped script tag
  assert.strictEqual(contentArea.innerHTML.includes("<script>"), false, "Script tag must be escaped");
  assert.strictEqual(contentArea.innerHTML.includes("&lt;script&gt;"), true, "Script tag must be safely HTML escaped");
});

