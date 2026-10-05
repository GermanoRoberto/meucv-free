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

test("Date Localization: English months and relative terms are translated to Portuguese", () => {
  const { formatCvDate, formatLinkedinDate, normalizeCvDates } = app;

  // Short month translations
  assert.strictEqual(formatCvDate("Aug 2026"), "Ago 2026");
  assert.strictEqual(formatCvDate("Apr 2025"), "Abr 2025");
  assert.strictEqual(formatCvDate("Sep 2027"), "Set 2027");
  assert.strictEqual(formatCvDate("Sept 2027"), "Set 2027");
  assert.strictEqual(formatCvDate("Jan 2023"), "Jan 2023");
  assert.strictEqual(formatCvDate("May 2024"), "Mai 2024");
  assert.strictEqual(formatCvDate("Feb 2022"), "Fev 2022");
  assert.strictEqual(formatCvDate("Oct 2023"), "Out 2023");
  assert.strictEqual(formatCvDate("Dec 2021"), "Dez 2021");

  // Full month translations
  assert.strictEqual(formatCvDate("August 2026"), "Agosto 2026");
  assert.strictEqual(formatCvDate("April 2025"), "Abril 2025");
  assert.strictEqual(formatCvDate("September 2027"), "Setembro 2027");

  // Status terms
  assert.strictEqual(formatCvDate("Present"), "Presente");
  assert.strictEqual(formatCvDate("Current"), "Atual");
  assert.strictEqual(formatCvDate("Ongoing"), "Em andamento");

  // formatLinkedinDate integration
  assert.strictEqual(formatLinkedinDate("Aug 2026"), "Ago 2026");
  assert.strictEqual(formatLinkedinDate("Apr 2025"), "Abr 2025");
  assert.strictEqual(formatLinkedinDate("Sep 2027"), "Set 2027");
  assert.strictEqual(formatLinkedinDate("Jan 2023"), "Jan 2023");
  assert.strictEqual(formatLinkedinDate("Present"), "Presente");
  assert.strictEqual(formatLinkedinDate("2026"), "2026");

  // normalizeCvDates object traversal
  const mockCv = {
    experiences: [
      { start: "Jan 2020", end: "Aug 2022" },
      { start: "Apr 2023", end: "Present" }
    ],
    educations: [
      { start: "Jan 2023", end: "Aug 2026" },
      { start: "Apr 2025", end: "Sep 2027" }
    ],
    certs: [
      { date: "May 2023" }
    ]
  };

  normalizeCvDates(mockCv);
  assert.strictEqual(mockCv.experiences[0].end, "Ago 2022");
  assert.strictEqual(mockCv.experiences[1].end, "Presente");
  assert.strictEqual(mockCv.educations[0].end, "Ago 2026");
  assert.strictEqual(mockCv.educations[1].start, "Abr 2025");
  assert.strictEqual(mockCv.educations[1].end, "Set 2027");
  assert.strictEqual(mockCv.certs[0].date, "Mai 2023");
});

test("Academic Localization: English courses, fields of study and degrees are translated to Portuguese", () => {
  const { translateAcademicFieldPt, translateAcademicDegreePt, normalizeCvData } = app;

  // Exact fields
  assert.strictEqual(translateAcademicFieldPt("Computer Engineering"), "Engenharia de Computação");
  assert.strictEqual(translateAcademicFieldPt("computer engineering"), "Engenharia de Computação");
  assert.strictEqual(translateAcademicFieldPt("Computer Science"), "Ciência da Computação");
  assert.strictEqual(translateAcademicFieldPt("Software Engineering"), "Engenharia de Software");
  assert.strictEqual(translateAcademicFieldPt("Information Technology"), "Tecnologia da Informação");
  assert.strictEqual(translateAcademicFieldPt("Cybersecurity"), "Defesa Cibernética");

  // Exact degrees
  assert.strictEqual(translateAcademicDegreePt("Bachelor's degree"), "Bacharelado");
  assert.strictEqual(translateAcademicDegreePt("Bachelor"), "Bacharelado");
  assert.strictEqual(translateAcademicDegreePt("Master's degree"), "Mestrado");
  assert.strictEqual(translateAcademicDegreePt("Associate degree"), "Curso Superior de Tecnologia (CST)");

  // Full object normalization
  const mockCv = {
    educations: [
      {
        institution: "Descomplica Faculdade Digital",
        degree: "Bacharelado",
        field: "Computer Engineering",
        start: "2023",
        end: "Aug 2026"
      },
      {
        institution: "Gran Faculdade",
        degree: "Associate degree",
        field: "Cybersecurity",
        start: "Apr 2025",
        end: "Sep 2027"
      }
    ]
  };

  normalizeCvData(mockCv);
  assert.strictEqual(mockCv.educations[0].degree, "Bacharelado");
  assert.strictEqual(mockCv.educations[0].field, "Engenharia de Computação");
  assert.strictEqual(mockCv.educations[0].end, "Ago 2026");

  assert.strictEqual(mockCv.educations[1].degree, "Curso Superior de Tecnologia (CST)");
  assert.strictEqual(mockCv.educations[1].field, "Defesa Cibernética");
  assert.strictEqual(mockCv.educations[1].start, "Abr 2025");
  assert.strictEqual(mockCv.educations[1].end, "Set 2027");
});

test("Smart Identity Detection: detects existing CV by email, name or active CV", () => {
  const { detectExistingIdentity, appState } = app;

  appState.library = [
    {
      id: "cv_joao_original",
      name: "João Silva (Exemplo)",
      data: { name: "João Silva", email: "joao@exemplo.com" }
    },
    {
      id: "cv_germano_1",
      name: "Currículo Germano Roberto",
      data: {
        name: "Germano Roberto",
        email: "germanorcarmo@gmail.com",
        phone: "(31) 98319-9430"
      }
    }
  ];
  appState.currentCvId = "cv_germano_1";
  appState.currentCvName = "Currículo Germano Roberto";
  appState.currentCvData = appState.library[1].data;

  // 1. Match by exact email with different case
  const matchEmail = detectExistingIdentity({
    name: "GERMANO R.",
    email: "GERMANORCARMO@GMAIL.COM"
  });
  assert.ok(matchEmail);
  assert.strictEqual(matchEmail.id, "cv_germano_1");
  assert.strictEqual(matchEmail.matchReason.includes("mesmo e-mail"), true);

  // 2. Match by normalized name (accents and full name containment)
  const matchName = detectExistingIdentity({
    name: "GERMANO ROBERTO DO CARMO SOBRINHO",
    email: "outro_email@teste.com"
  });
  assert.ok(matchName);
  assert.strictEqual(matchName.id, "cv_germano_1");

  // 3. Do not match João Silva demo
  const matchDemo = detectExistingIdentity({
    name: "João Silva",
    email: "joao@exemplo.com"
  });
  assert.strictEqual(matchDemo, null, "Should not match demo CV");

  // 4. Do not match unrelated candidate
  const matchUnrelated = detectExistingIdentity({
    name: "Carlos Eduardo Ferreira",
    email: "carlos.ferreira@empresa.com"
  });
  assert.strictEqual(matchUnrelated, null);
});

test("Intelligent Merge: preserves user edits and enriches experiences, projects, and skills", () => {
  const { mergeCvDataIntelligently } = app;

  const existing = {
    name: "Germano Roberto",
    title: "Analista de Suporte e Infraestrutura",
    email: "germanorcarmo@gmail.com",
    phone: "(31) 98319-9430",
    location: "Belo Horizonte, MG",
    linkedin: "https://linkedin.com/in/germano-roberto",
    github: "", // missing
    website: "", // missing
    summary: "Profissional de TI com sólida atuação em suporte N1/N2/N3, redes estruturadas, administração de sistemas Windows Server e Linux.",
    experiences: [
      {
        company: "Vext",
        role: "Técnico de Suporte",
        start: "Jan 2024",
        end: "Presente",
        desc: "Atendimento a chamados de suporte técnico N2."
      }
    ],
    educations: [
      {
        institution: "Faculdade Estácio de Sá",
        degree: "Bacharelado",
        field: "Engenharia de Computação",
        start: "2020",
        end: "2024"
      }
    ],
    skills: ["Windows Server", "Linux", "TCP/IP"],
    languages: [{ name: "Inglês", level: "Intermediário" }],
    certs: []
  };

  const incoming = {
    name: "GERMANO ROBERTO DO CARMO SOBRINHO",
    title: "Especialista em Redes e NOC",
    email: "germanorcarmo@gmail.com",
    phone: "(31) 98319-9430",
    location: "Belo Horizonte, MG",
    linkedin: "https://linkedin.com/in/germano-roberto",
    github: "https://github.com/GermanoRoberto",
    website: "https://germanoroberto.dev",
    summary: "Resumo curto que não deve sobrescrever o bom resumo existente.",
    experiences: [
      {
        company: "Vext",
        role: "Técnico de Suporte",
        start: "Jan 2024",
        end: "Presente",
        desc: "Atendimento a chamados N2 e N3, automação de rotinas em Python reduzindo tempo de resposta em 40%."
      },
      {
        company: "Hospital Metropolitano",
        role: "Analista de Suporte e Redes",
        start: "Jan 2021",
        end: "Dez 2023",
        desc: "Monitoramento de infraestrutura com Zabbix e suporte a 150 servidores."
      }
    ],
    educations: [
      {
        institution: "Faculdade Estácio de Sá",
        degree: "Bacharelado",
        field: "Engenharia de Computação",
        start: "2020",
        end: "2024"
      }
    ],
    skills: ["Linux", "Python", "Docker", "Zabbix", "Firewall"],
    languages: [{ name: "Inglês", level: "Técnico" }],
    certs: [
      {
        title: "Vext Hub",
        date: "2024",
        desc: "Desenvolvimento de plataforma web centralizada para automação de tarefas de suporte e chamados."
      },
      {
        title: "Cisco Endpoint Security",
        date: "2023",
        desc: "Cisco Networking Academy"
      }
    ]
  };

  const merged = mergeCvDataIntelligently(existing, incoming);

  // 1. Core fields: Existing preserved, missing filled
  assert.strictEqual(merged.name, "Germano Roberto");
  assert.strictEqual(merged.github, "https://github.com/GermanoRoberto");
  assert.strictEqual(merged.website, "https://germanoroberto.dev");
  assert.strictEqual(merged.summary, existing.summary, "Existing rich summary must be preserved");

  // 2. Experiences: Deduplication + bullet enrichment + appending new role
  assert.strictEqual(merged.experiences.length, 2);
  assert.strictEqual(merged.experiences[0].company, "Vext");
  assert.strictEqual(merged.experiences[0].desc.includes("reduzindo tempo de resposta em 40%"), true, "Experience bullets enriched");
  assert.strictEqual(merged.experiences[1].company, "Hospital Metropolitano", "New experience added");

  // 3. Education: Deduplicated
  assert.strictEqual(merged.educations.length, 1);

  // 4. Skills: Union without duplicates
  assert.strictEqual(merged.skills.includes("Windows Server"), true);
  assert.strictEqual(merged.skills.includes("Python"), true);
  assert.strictEqual(merged.skills.includes("Zabbix"), true);
  // Ensure "Linux" is only present once
  const linuxCount = merged.skills.filter(s => s.toLowerCase() === "linux").length;
  assert.strictEqual(linuxCount, 1);

  // 5. Certs & Projects: Both Vext Hub and Cisco cert preserved
  assert.strictEqual(merged.certs.length, 2);
  assert.strictEqual(merged.certs[0].title, "Vext Hub");
  assert.strictEqual(merged.certs[0].desc.includes("Desenvolvimento de plataforma"), true);
  assert.strictEqual(merged.certs[1].title, "Cisco Endpoint Security");
});

test("CV Quality Auditor: calculates 0-100 score, detects STAR action verbs and quantitative metrics", () => {
  const { evaluateCvQualityScore } = app;

  // Weak/Empty CV
  const weakCv = {
    name: "Candidato Teste",
    email: "teste@teste.com",
    experiences: [],
    educations: [],
    skills: []
  };

  const weakResult = evaluateCvQualityScore(weakCv);
  assert.ok(weakResult.totalScore < 50);
  assert.strictEqual(weakResult.ratingLevel, "low");
  assert.strictEqual(weakResult.items.find(i => i.id === "exp_action_verbs").passed, false);
  assert.strictEqual(weakResult.items.find(i => i.id === "exp_metrics").passed, false);

  // High-performance CV
  const strongCv = {
    name: "Germano Roberto",
    title: "Especialista em Redes e Infraestrutura",
    email: "germanorcarmo@gmail.com",
    phone: "(31) 98319-9430",
    location: "Belo Horizonte, MG",
    linkedin: "https://linkedin.com/in/germano-roberto",
    github: "https://github.com/GermanoRoberto",
    summary: "Profissional de TI com mais de 5 anos de experiência e sólida atuação em engenharia de infraestrutura, automação de sistemas, administração de redes e segurança de dados, entregando soluções escaláveis com alto padrão de qualidade e disponibilidade técnica.",
    experiences: [
      {
        company: "Vext",
        role: "Técnico de Suporte N2/N3",
        start: "Jan 2024",
        end: "Presente",
        desc: "Desenvolvi scripts de automação em Python e Ansible, otimizando o tempo de resposta em 35%. Liderei equipe de 6 analistas na migração de 15 servidores."
      }
    ],
    educations: [
      {
        institution: "Faculdade Estácio de Sá",
        degree: "Bacharelado",
        field: "Engenharia de Computação",
        start: "2020",
        end: "2024"
      }
    ],
    skills: ["Python", "Docker", "Linux", "Windows Server", "Zabbix", "Ansible", "TCP/IP", "Firewall"],
    languages: [{ name: "Inglês", level: "Intermediário" }],
    certs: [
      {
        title: "Vext Hub",
        date: "2024",
        desc: "Plataforma web para orquestração de rotinas e monitoramento proativo."
      },
      {
        title: "Cisco Endpoint Security",
        date: "2023",
        desc: "Cisco Networking Academy"
      }
    ]
  };

  const strongResult = evaluateCvQualityScore(strongCv);
  assert.ok(strongResult.totalScore >= 85, `Score should be >= 85, got ${strongResult.totalScore}`);
  assert.strictEqual(strongResult.ratingLevel, "high");
  assert.strictEqual(strongResult.items.find(i => i.id === "exp_action_verbs").passed, true);
  assert.strictEqual(strongResult.items.find(i => i.id === "exp_metrics").passed, true);
  assert.strictEqual(strongResult.items.find(i => i.id === "contact_core").passed, true);
  assert.strictEqual(strongResult.items.find(i => i.id === "summary_presence").passed, true);
  assert.strictEqual(strongResult.items.find(i => i.id === "skills_density").passed, true);
  assert.strictEqual(strongResult.items.find(i => i.id === "projects_certs_item").passed, true);
});


