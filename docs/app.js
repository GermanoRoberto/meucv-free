


const DEFAULT_CV_DATA = {
  name: "JOÃO SILVA (EXEMPLO DE MODELO)",
  title: "Desenvolvedor Full Stack (Exemplo)",
  email: "joao.silva@example.com",
  phone: "(11) 98765-4321",
  location: "São Paulo, SP, Brasil",
  linkedin: "linkedin.com/in/joaosilva",
  github: "github.com/joaosilva",
  website: "",
  linkedinOriginal: null,
  summary: "Desenvolvedor Full Stack com mais de 3 anos de experiência em desenvolvimento web utilizando React, Node.js e bancos de dados SQL/NoSQL. Apaixonado por criar soluções escaláveis, limpas e eficientes, com foco especial na qualidade de código, performance de carregamento e experiência do usuário.",
  experiences: [
    {
      company: "Tech Solutions",
      role: "Desenvolvedor Front-end",
      start: "Janeiro de 2023",
      end: "Presente",
      desc: "Interfaces Modernas: Desenvolvimento de interfaces responsivas de alta performance utilizando React, TypeScript e TailwindCSS, resultando em melhor usabilidade.\nOtimização de Performance: Redução de 25% no tempo de carregamento de páginas principais através de lazy loading e otimização de requisições de API.\nIntegração de Sistemas: Consumo de APIs RESTful estruturadas mantendo fluxo de dados consistente na aplicação."
    },
    {
      company: "Code House",
      role: "Desenvolvedor Web Júnior",
      start: "Março de 2021",
      end: "Dezembro de 2022",
      desc: "Backend e APIs: Criação e manutenção de endpoints RESTful usando Node.js e Express, integrando serviços de banco de dados MongoDB.\nAutomação e Testes: Implementação de suítes de testes unitários com Jest, aumentando a cobertura de código confiável em 15%.\nVersionamento e Git: Trabalho em equipe utilizando versionamento Git com fluxos de Pull Request estruturados."
    }
  ],
  educations: [
    {
      institution: "Universidade Positiva",
      degree: "Bacharelado",
      field: "Análise e Desenvolvimento de Sistemas",
      start: "2020",
      end: "2023",
      desc: ""
    }
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "HTML5",
    "CSS3",
    "TailwindCSS",
    "Git",
    "SQL",
    "MongoDB",
    "REST APIs",
    "Jest",
    "Clean Code"
  ],
  languages: [
    { name: "Inglês", level: "Avançado (Leitura técnica e conversação)" }
  ],
  certs: [
    { title: "React Developer Specialist", date: "2024", desc: "Rocketseat" },
    { title: "Node.js REST APIs Architect", date: "2024", desc: "Alura" }
  ]
};


function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function sanitizeHtml(str) {
  if (!str) return "";
  if (typeof DOMPurify !== "undefined") {
    return DOMPurify.sanitize(str, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'span', 'ul', 'ol', 'li', 'br', 'code', 'h2', 'h3', 'h4', 'h5', 'div'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style', 'data-lucide']
    });
  }
  let clean = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                 .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
                 .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
                 .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
                 .replace(/on\w+\s*=/gi, 'blocked-attr=')
                 .replace(/javascript:/gi, '#');
  return clean;
}

function formatCvDate(str) {
  if (!str) return "";
  let s = String(str).trim();
  if (!s || s.toLowerCase() === "n/a") return s;

  // 1. Status / termos temporais em inglês
  s = s.replace(/\bpresent\b/gi, "Presente")
       .replace(/\bcurrent\b/gi, "Atual")
       .replace(/\bongoing\b/gi, "Em andamento");

  // 2. Meses por extenso em inglês
  s = s.replace(/\bjanuary\b/gi, "Janeiro")
       .replace(/\bfebruary\b/gi, "Fevereiro")
       .replace(/\bmarch\b/gi, "Março")
       .replace(/\bapril\b/gi, "Abril")
       .replace(/\bjune\b/gi, "Junho")
       .replace(/\bjuly\b/gi, "Julho")
       .replace(/\baugust\b/gi, "Agosto")
       .replace(/\bseptember\b/gi, "Setembro")
       .replace(/\boctober\b/gi, "Outubro")
       .replace(/\bnovember\b/gi, "Novembro")
       .replace(/\bdecember\b/gi, "Dezembro");

  // 3. Meses abreviados em inglês (e variações)
  s = s.replace(/\bjan\b/gi, "Jan")
       .replace(/\bfeb\b/gi, "Fev")
       .replace(/\bmar\b/gi, "Mar")
       .replace(/\bapr\b/gi, "Abr")
       .replace(/\bmay\b/gi, "Mai")
       .replace(/\bjun\b/gi, "Jun")
       .replace(/\bjul\b/gi, "Jul")
       .replace(/\baug\b/gi, "Ago")
       .replace(/\bsept?\b/gi, "Set")
       .replace(/\boct\b/gi, "Out")
       .replace(/\bnov\b/gi, "Nov")
       .replace(/\bdec\b/gi, "Dez");

  return s;
}

const ACADEMIC_FIELDS_PT = {
  "computer engineering": "Engenharia de Computação",
  "computer science": "Ciência da Computação",
  "software engineering": "Engenharia de Software",
  "information technology": "Tecnologia da Informação",
  "information systems": "Sistemas de Informação",
  "cybersecurity": "Defesa Cibernética",
  "cyber security": "Defesa Cibernética",
  "information security": "Segurança da Informação",
  "data science": "Ciência de Dados",
  "artificial intelligence": "Inteligência Artificial",
  "cloud computing": "Computação em Nuvem",
  "computer and information sciences": "Ciência da Computação e Informática",
  "electrical engineering": "Engenharia Elétrica",
  "electronic engineering": "Engenharia Eletrônica",
  "telecommunications engineering": "Engenharia de Telecomunicações",
  "mechanical engineering": "Engenharia Mecânica",
  "civil engineering": "Engenharia Civil",
  "production engineering": "Engenharia de Produção",
  "chemical engineering": "Engenharia Química",
  "business administration": "Administração de Empresas",
  "business management": "Gestão Empresarial",
  "project management": "Gestão de Projetos",
  "human resources": "Recursos Humanos",
  "human resources management": "Gestão de Recursos Humanos",
  "marketing": "Marketing",
  "digital marketing": "Marketing Digital",
  "finance": "Finanças",
  "financial management": "Gestão Financeira",
  "accounting": "Ciências Contábeis",
  "economics": "Economia",
  "law": "Direito",
  "logistics": "Logística",
  "graphic design": "Design Gráfico",
  "web development": "Desenvolvimento Web",
  "systems analysis and development": "Análise e Desenvolvimento de Sistemas",
  "data analytics": "Análise de Dados"
};

const ACADEMIC_DEGREES_PT = {
  "bachelor's degree": "Bacharelado",
  "bachelor's": "Bacharelado",
  "bachelor of science": "Bacharelado",
  "bachelor of engineering": "Bacharelado",
  "bachelor of arts": "Bacharelado",
  "bachelor": "Bacharelado",
  "master's degree": "Mestrado",
  "master's": "Mestrado",
  "master of science": "Mestrado",
  "master": "Mestrado",
  "associate's degree": "Curso Superior de Tecnologia (CST)",
  "associate degree": "Curso Superior de Tecnologia (CST)",
  "associate of science": "Curso Superior de Tecnologia (CST)",
  "associate": "Curso Superior de Tecnologia (CST)",
  "postgraduate degree": "Pós-Graduação",
  "postgraduate diploma": "Pós-Graduação",
  "postgraduate": "Pós-Graduação",
  "specialization": "Especialização",
  "doctor of philosophy": "Doutorado",
  "phd": "Doutorado",
  "doctorate": "Doutorado",
  "high school diploma": "Ensino Médio",
  "technical course": "Curso Técnico",
  "technician": "Técnico"
};

function translateAcademicFieldPt(str) {
  if (!str) return "";
  let s = String(str).trim();
  const lower = s.toLowerCase();
  if (ACADEMIC_FIELDS_PT[lower]) {
    return ACADEMIC_FIELDS_PT[lower];
  }
  for (const [en, pt] of Object.entries(ACADEMIC_FIELDS_PT)) {
    const reg = new RegExp(`\\b${en}\\b`, "gi");
    if (reg.test(s)) {
      s = s.replace(reg, pt);
    }
  }
  return s;
}

function translateAcademicDegreePt(str) {
  if (!str) return "";
  let s = String(str).trim();
  const lower = s.toLowerCase();
  if (ACADEMIC_DEGREES_PT[lower]) {
    return ACADEMIC_DEGREES_PT[lower];
  }
  for (const [en, pt] of Object.entries(ACADEMIC_DEGREES_PT)) {
    const reg = new RegExp(`\\b${en}\\b`, "gi");
    if (reg.test(s)) {
      s = s.replace(reg, pt);
    }
  }
  return s;
}

function normalizeCvDates(cvData) {
  if (!cvData) return;
  if (Array.isArray(cvData.experiences)) {
    cvData.experiences.forEach(exp => {
      if (exp.start) exp.start = formatCvDate(exp.start);
      if (exp.end) exp.end = formatCvDate(exp.end);
    });
  }
  if (Array.isArray(cvData.educations)) {
    cvData.educations.forEach(edu => {
      if (edu.start) edu.start = formatCvDate(edu.start);
      if (edu.end) edu.end = formatCvDate(edu.end);
    });
  }
  if (Array.isArray(cvData.certs)) {
    cvData.certs.forEach(c => {
      if (c.date) c.date = formatCvDate(c.date);
    });
  }
}

function normalizeCvData(cvData) {
  if (!cvData) return;
  normalizeCvDates(cvData);
  if (Array.isArray(cvData.educations)) {
    cvData.educations.forEach(edu => {
      if (edu.degree) edu.degree = translateAcademicDegreePt(edu.degree);
      if (edu.field) edu.field = translateAcademicFieldPt(edu.field);
    });
  }
}

function applyInlineMarkdown(text) {
  let escaped = escapeHtml(text);
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  escaped = escaped.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  escaped = escaped.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  escaped = escaped.replace(/_([^_]+)_/g, "<em>$1</em>");
  escaped = escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
  escaped = escaped.replace(/'([^']{20,})'/g, "<code>$1</code>");
  escaped = escaped.replace(/"([^"]{20,})"/g, "<code>$1</code>");
  return escaped;
}

function parseMarkdownToHtml(text) {
  if (!text) return "";
  
  
  let cleaned = text.trim()
    .replace(/^```html\s*/i, "")
    .replace(/^```markdown\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/, "")
    .trim();
    
  const lines = cleaned.split("\n");
  let html = [];
  let inList = false;
  let inBlockquote = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    
    if (line.startsWith("### ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inBlockquote) { html.push("</div>"); inBlockquote = false; }
      html.push(`<h4>${applyInlineMarkdown(line.substring(4))}</h4>`);
    } else if (line.startsWith("## ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inBlockquote) { html.push("</div>"); inBlockquote = false; }
      html.push(`<h3>${applyInlineMarkdown(line.substring(3))}</h3>`);
    } else if (line.startsWith("# ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inBlockquote) { html.push("</div>"); inBlockquote = false; }
      html.push(`<h2>${applyInlineMarkdown(line.substring(2))}</h2>`);
    }
    
    else if (/^\d+\.\s+/.test(line)) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inBlockquote) { html.push("</div>"); inBlockquote = false; }
      const num = line.match(/^\d+/)[0];
      const titleText = line.replace(/^\d+\.\s+/, "");
      html.push(`<h5 class="analysis-section-title"><span class="section-num">${num}</span> ${applyInlineMarkdown(titleText)}</h5>`);
    }
    
    else if (line.startsWith("> ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      if (!inBlockquote) {
        html.push('<div class="analysis-quote-card">');
        inBlockquote = true;
      }
      html.push(`<p>${applyInlineMarkdown(line.substring(2))}</p>`);
    }
    
    else if (line.startsWith("* ") || line.startsWith("- ") || line.startsWith("• ")) {
      if (inBlockquote) { html.push("</div>"); inBlockquote = false; }
      if (!inList) {
        html.push('<ul class="analysis-list">');
        inList = true;
      }
      html.push(`<li>${applyInlineMarkdown(line.substring(2))}</li>`);
    }
    
    else if (line === "") {
      if (inList) { html.push("</ul>"); inList = false; }
      if (inBlockquote) { html.push("</div>"); inBlockquote = false; }
    }
    
    else {
      
      if (line.toLowerCase().includes("exemplo prático completo") || line.toLowerCase().includes("escreva isso:") || line.toLowerCase().includes("sugestão de reescrita")) {
        if (inList) { html.push("</ul>"); inList = false; }
        if (inBlockquote) { html.push("</div>"); inBlockquote = false; }
        html.push(`<p class="highlight-intro-text">${applyInlineMarkdown(line)}</p>`);
      } else {
        if (line.startsWith("<") && (line.endsWith(">") || line.includes("</"))) {
          html.push(sanitizeHtml(line));
        } else {
          html.push(`<p>${applyInlineMarkdown(line)}</p>`);
        }
      }
    }
  }
  
  if (inList) html.push("</ul>");
  if (inBlockquote) html.push("</div>");
  
  return html.join("\n");
}


let appState = {
  currentCvId: null,
  currentCvName: "Meu Currículo Principal",
  currentCvData: JSON.parse(JSON.stringify(DEFAULT_CV_DATA)),
  zoomLevel: 100,
  geminiKey: "",
  geminiModel: "gemini-2.5-flash",
  googleToken: "",
  library: [],
  pendingImportData: null,
  pendingMergeTarget: null
};

let pendingChange = null;


if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}


if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    loadConfig();
    loadLibrary();
    if (window.lucide && typeof lucide.createIcons === "function") lucide.createIcons();
    setupEventListeners();
    setupFormSync();
    fetchConfig();
    console.log("Vellora CV iniciado com sucesso!");
  });
}


function loadConfig() {
  const googleToken = localStorage.getItem("meucv_google_token");
  if (googleToken) {
    appState.googleToken = googleToken;
  } else {
    appState.googleToken = "";
  }
  
  // Chave própria de IA (BYOK) - independente do login Google
  const key = localStorage.getItem("meucv_gemini_key");
  const model = localStorage.getItem("meucv_gemini_model");
  
  if (key) {
    appState.geminiKey = key;
    const inputKey = document.getElementById("settings-gemini-key");
    if (inputKey) inputKey.value = key;
    updateGeminiStatus(true);
  } else {
    appState.geminiKey = "";
    updateGeminiStatus(false);
  }
  
  if (model) {
    appState.geminiModel = model;
    const inputModel = document.getElementById("settings-gemini-model");
    if (inputModel) inputModel.value = model;
  }
}

function updateGeminiStatus(active) {
  const statusBox = document.getElementById("gemini-key-status");
  if (active) {
    statusBox.className = "status-badge status-verified";
    statusBox.innerHTML = '<i data-lucide="check-circle-2" class="inline-icon"></i> IA Habilitada (Gemini Ativo)';
  } else {
    statusBox.className = "status-badge status-missing";
    statusBox.innerHTML = '<i data-lucide="x-circle" class="inline-icon"></i> Sem Chave de IA (Recursos IA bloqueados)';
  }
  lucide.createIcons();
}


let googleClientId = "";

async function fetchConfig() {
  try {
    const res = await fetch("/api/config");
    const data = await res.json();
    googleClientId = data.googleClientId;
    if (googleClientId) {
      initGoogleAuth();
    } else {
      console.log("GOOGLE_CLIENT_ID não configurado na Vercel. Fluxo de login ocultado.");
    }
  } catch (e) {
    console.error("Erro ao buscar Client ID:", e);
  }
}

function initGoogleAuth() {
  if (typeof google !== "undefined" && google.accounts && google.accounts.id && googleClientId) {
    try {
      google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleLoginResponse,
        auto_select: false
      });
    } catch (e) {
      console.warn("Aviso ao inicializar Google Identity Services:", e);
    }
  }
  renderGoogleButtons();
}

function renderGoogleButtons() {
  const containers = [
    document.getElementById("google-auth-container-nav"),
    document.getElementById("google-auth-container-editor"),
    document.getElementById("google-auth-container-modal")
  ];

  containers.forEach(container => {
    if (!container) return;
    container.innerHTML = "";

    if (appState.googleToken) {
      const profile = decodeJwtPayload(appState.googleToken);
      const firstName = profile.given_name || (profile.name ? profile.name.split(" ")[0] : "Usuário");
      const safePic = escapeHtml(profile.picture || "");
      const safeEmail = escapeHtml(profile.email || "");
      const safeName = escapeHtml(firstName || "Usuário");
      
      container.innerHTML = `
        <div class="user-profile-badge" style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); border: 1px solid var(--ui-border); padding: 4px 10px; border-radius: 20px;">
          ${safePic ? `<img src="${safePic}" class="user-avatar" title="${safeEmail}" style="width: 22px; height: 22px; border-radius: 50%;">` : ''}
          <span class="user-name-small" style="font-size: 0.8rem; color: var(--ui-text-primary); font-weight: 500;">Hi, ${safeName}</span>
          <button class="btn-logout-google" title="Sair" style="background: none; border: none; color: var(--ui-text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 2px;"><i data-lucide="log-out" style="width: 14px; height: 14px;"></i></button>
        </div>
      `;
      
      container.querySelector(".btn-logout-google").addEventListener("click", handleGoogleLogout);
    } else {
      if (container.id === "google-auth-container-modal") {
        container.innerHTML = `
          <button class="btn btn-google-custom" style="background-color: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; border-radius: var(--radius-sm); padding: 12px 24px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 10px; font-size: 0.95rem; cursor: pointer; transition: all 0.2s; width: 100%; font-family: var(--font-heading); box-shadow: 0 2px 4px rgba(0,0,0,0.05); outline: none;">
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
            Entrar com o Google
          </button>
        `;
      } else {
        container.innerHTML = `
          <button class="btn btn-google-custom" style="background-color: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; border-radius: var(--radius-sm); padding: 6px 12px; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; font-family: var(--font-heading); outline: none;">
            <svg viewBox="0 0 24 24" width="15" height="15" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
            Entrar com Google
          </button>
        `;
      }

      container.querySelector(".btn-google-custom").addEventListener("click", loginWithGoogleCustom);
    }
  });
  
  lucide.createIcons();
}

function loginWithGoogleCustom() {
  if (!googleClientId) {
    showToast("GOOGLE_CLIENT_ID não configurado nas variáveis da Vercel.", "danger");
    return;
  }

  const redirectUri = window.location.origin + "/";
  const nonce = Math.random().toString(36).substring(2);
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token&scope=openid%20profile%20email&nonce=${nonce}`;
  
  const width = 500;
  const height = 650;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);
  
  const popup = window.open(authUrl, "GoogleLoginPopup", `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`);
  
  const interval = setInterval(() => {
    try {
      if (!popup || popup.closed) {
        clearInterval(interval);
        return;
      }
      
      // Só inspeciona se o popup já redirecionou de volta para a mesma origem (evitando alertas no console)
      if (popup.location.origin === window.location.origin) {
        const hash = popup.location.hash;
        if (hash && hash.includes("id_token=")) {
          const params = new URLSearchParams(hash.substring(1));
          const idToken = params.get("id_token");
          if (idToken) {
            appState.googleToken = idToken;
            localStorage.setItem("meucv_google_token", idToken);
            renderGoogleButtons();
            closeAllModals(); 
            showToast("Login com o Google efetuado com sucesso!", "success");
            popup.close();
            clearInterval(interval);
          }
        }
      }
    } catch (e) {
      // Ignora exceções esperadas enquanto o popup estiver no domínio accounts.google.com
    }
  }, 250);
}

function decodeJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Erro ao decodificar token JWT:", e);
    return {};
  }
}

function handleGoogleLoginResponse(response) {
  appState.googleToken = response.credential;
  localStorage.setItem("meucv_google_token", response.credential);
  renderGoogleButtons();
  closeAllModals(); 
  showToast("Login com o Google efetuado com sucesso!", "success");
}

function handleGoogleLogout() {
  appState.googleToken = "";
  localStorage.removeItem("meucv_google_token");
  renderGoogleButtons();
  showToast("Sessão Google finalizada.", "info");
}


function loadLibrary() {
  const rawLib = localStorage.getItem("meucv_library");
  if (rawLib) {
    try {
      
      // Remove apenas o antigo CV de demonstração legado (id/nome exatos).
      // NUNCA filtrar por substring do nome: isso apagava CVs reais de usuários.
      appState.library = JSON.parse(rawLib).filter(c =>
        c && c.id !== "cv_germano_original" &&
        c.name !== "Germano - Currículo Original"
      );
    } catch (e) {
      appState.library = [];
    }
  }
  
  
  const originalCvName = "João Silva - Exemplo Tech";
  const hasOriginal = appState.library.some(c => c.name === originalCvName || c.id === "cv_joao_original");
  const hasUserCv = appState.library.some(c => c.id !== "cv_joao_original");
  
  if (hasUserCv) {
    
    appState.library = appState.library.filter(c => c.id !== "cv_joao_original");
    saveLibrary();
  } else if (!hasOriginal) {
    const originalCv = {
      id: "cv_joao_original",
      name: originalCvName,
      lastModified: new Date().toISOString(),
      template: "creative",
      data: JSON.parse(JSON.stringify(DEFAULT_CV_DATA))
    };
    appState.library.unshift(originalCv); 
    saveLibrary();
  }
  
  
  if (!appState.currentCvId && appState.library.length > 0) {
    appState.currentCvId = appState.library[0].id;
    appState.currentCvName = appState.library[0].name;
    appState.currentCvData = JSON.parse(JSON.stringify(appState.library[0].data));
  }
  if (appState.currentCvData) {
    normalizeCvData(appState.currentCvData);
  }
}

function saveLibrary() {
  localStorage.setItem("meucv_library", JSON.stringify(appState.library));
}

function selectActiveCv(id, force = false) {
  const isTestCv = id === "cv_joao_original";
  const hasOwnKey = !!appState.geminiKey;
  const isLogged = !!appState.googleToken;
  
  if (!force && !isTestCv && !hasOwnKey && !isLogged) {
    showModal("modal-login-required");
    return;
  }

  const cvItem = appState.library.find(c => String(c.id) === String(id));
  if (cvItem) {
    appState.currentCvId = cvItem.id;
    appState.currentCvName = cvItem.name;
    let dataObj = null;
    try {
      dataObj = cvItem.data ? JSON.parse(JSON.stringify(cvItem.data)) : null;
    } catch (err) {
      dataObj = null;
    }
    
    if (!dataObj) {
      
      dataObj = {
        name: cvItem.name || "",
        title: cvItem.title || "",
        email: cvItem.email || "",
        phone: cvItem.phone || "",
        location: cvItem.location || "",
        linkedin: cvItem.linkedin || "",
        github: cvItem.github || "",
        website: cvItem.website || "",
        summary: cvItem.summary || "",
        experiences: cvItem.experiences || [],
        educations: cvItem.educations || [],
        skills: cvItem.skills || [],
        languages: cvItem.languages || [],
        certs: cvItem.certs || []
      };
    }
    if (cvItem.linkedinOriginal && !dataObj.linkedinOriginal) {
      dataObj.linkedinOriginal = JSON.parse(JSON.stringify(cvItem.linkedinOriginal));
    }
    if (cvItem.isLinkedinImport && !dataObj.isLinkedinImport) {
      dataObj.isLinkedinImport = true;
    }
    appState.currentCvData = dataObj;
    
    
    const d = appState.currentCvData;
    if (!d.experiences || !Array.isArray(d.experiences)) d.experiences = [];
    if (!d.educations || !Array.isArray(d.educations)) d.educations = [];
    if (!d.skills || !Array.isArray(d.skills)) d.skills = [];
    if (!d.languages || !Array.isArray(d.languages)) d.languages = [];
    if (!d.certs || !Array.isArray(d.certs)) d.certs = [];
    normalizeCvData(d);
    
    
    document.getElementById("input-cv-name").value = appState.currentCvName;
    document.getElementById("select-template").value = cvItem.template || "classic";
    
    
    document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".workspace-pane").forEach(pane => pane.classList.remove("active"));
    const defaultTab = document.querySelector('.nav-tab[data-workspace="workspace-editor"]');
    if (defaultTab) defaultTab.classList.add("active");
    const defaultPane = document.getElementById("workspace-editor");
    if (defaultPane) defaultPane.classList.add("active");
    
    
    fillFormFromState();
    renderCv();
    
    
    lucide.createIcons();
  }
}

function saveActiveCvStateToLibrary() {
  if (!appState.currentCvId) return;
  normalizeCvData(appState.currentCvData);
  const index = appState.library.findIndex(c => String(c.id) === String(appState.currentCvId));
  if (index !== -1) {
    appState.library[index].name = appState.currentCvName;
    appState.library[index].lastModified = new Date().toISOString();
    appState.library[index].data = JSON.parse(JSON.stringify(appState.currentCvData));
    appState.library[index].template = document.getElementById("select-template").value;
    saveLibrary();
  }
}

function createNewCv(name = "Novo Currículo", force = false) {
  const hasOwnKey = !!appState.geminiKey;
  const isLogged = !!appState.googleToken;
  if (!force && !hasOwnKey && !isLogged) {
    showModal("modal-login-required");
    return null;
  }
  
  const newId = "cv_" + Date.now();
  const newCv = {
    id: newId,
    name: name,
    lastModified: new Date().toISOString(),
    template: "classic",
    data: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
      summary: "",
      experiences: [],
      educations: [],
      skills: [],
      languages: [],
      certs: []
    }
  };
  
  appState.library = appState.library.filter(c => c.id !== "cv_joao_original");
  appState.library.push(newCv);
  saveLibrary();
  selectActiveCv(newId, force);
  showToast("Novo currículo criado!", "success");
  return newId;
}

function duplicateCv(id) {
  const original = appState.library.find(c => String(c.id) === String(id));
  if (original) {
    const clone = JSON.parse(JSON.stringify(original));
    clone.id = "cv_" + Date.now();
    clone.name = original.name + " (Cópia)";
    clone.lastModified = new Date().toISOString();
    appState.library.push(clone);
    saveLibrary();
    renderLibraryGrid();
    showToast("Currículo duplicado com sucesso!", "success");
  }
}

function deleteCv(id) {
  if (appState.library.length <= 1) {
    showToast("Você precisa ter pelo menos um currículo salvo.", "warning");
    return;
  }
  
  if (confirm("Tem certeza de que deseja excluir este currículo? Esta ação não pode ser desfeita.")) {
    appState.library = appState.library.filter(c => String(c.id) !== String(id));
    saveLibrary();
    renderLibraryGrid();
    if (String(appState.currentCvId) === String(id)) {
      selectActiveCv(appState.library[0].id);
    }
    showToast("Currículo excluído.", "danger");
  }
}


function setupEventListeners() {
  
  document.getElementById("btn-create-new").addEventListener("click", () => {
    const hasOwnKey = !!appState.geminiKey;
    const isLogged = !!appState.googleToken;
    if (!hasOwnKey && !isLogged) {
      showModal("modal-login-required");
      return;
    }
    switchView("editor");
    createNewCv("Novo Currículo Otimizado");
  });
  
  document.getElementById("btn-back-dashboard").addEventListener("click", () => {
    switchView("landing");
  });

  
  const btnOpenDemo = document.getElementById("btn-open-demo-cv");
  if (btnOpenDemo) {
    btnOpenDemo.addEventListener("click", () => {
      
      selectActiveCv("cv_joao_original");
      switchView("editor");
      showToast("Modo de testes ativo! Sinta-se à vontade para editar e testar a IA no currículo de exemplo.", "success");
    });
  }

  
  const openSettingsModal = () => {
    showModal("modal-settings");
  };
  document.getElementById("btn-open-settings-nav").addEventListener("click", openSettingsModal);
  const btnSettings = document.getElementById("btn-open-settings");
  if (btnSettings) {
    btnSettings.addEventListener("click", openSettingsModal);
  }
  
  document.getElementById("btn-open-cv-list-nav").addEventListener("click", () => {
    showModal("modal-cv-list");
    renderLibraryGrid();
  });
  const btnCvList = document.getElementById("btn-open-cv-list");
  if (btnCvList) {
    btnCvList.addEventListener("click", () => {
      showModal("modal-cv-list");
      renderLibraryGrid();
    });
  }

  document.getElementById("btn-trigger-import-pdf").addEventListener("click", () => {
    const hasOwnKey = !!appState.geminiKey;
    const isLogged = !!appState.googleToken;
    if (!hasOwnKey && !isLogged) {
      showModal("modal-login-required");
      return;
    }
    showModal("modal-import-pdf");
    resetPDFImportModal();
  });

  
  const openSupportModal = () => showModal("modal-support");
  
  const btnNavSupport = document.getElementById("btn-nav-support");
  if (btnNavSupport) btnNavSupport.addEventListener("click", openSupportModal);
  
  const btnEditorSupport = document.getElementById("btn-editor-support");
  if (btnEditorSupport) btnEditorSupport.addEventListener("click", openSupportModal);
  
  const btnSupportDonation = document.getElementById("btn-support-donation");
  if (btnSupportDonation) btnSupportDonation.addEventListener("click", openSupportModal);
  
  const btnSupportGuide = document.getElementById("btn-support-guide");
  if (btnSupportGuide) btnSupportGuide.addEventListener("click", openSupportModal);

  
  const btnCopyPix = document.getElementById("btn-copy-pix");
  if (btnCopyPix) {
    btnCopyPix.addEventListener("click", () => {
      const pixText = document.getElementById("pix-key-text").innerText;
      navigator.clipboard.writeText(pixText)
        .then(() => {
          showToast("Chave Pix copiada com sucesso! Muito obrigado pelo apoio! ❤️", "success");
        })
        .catch(err => {
          showToast("Erro ao copiar. Selecione a chave manualmente.", "danger");
        });
    });
  }
  
  
  document.querySelectorAll(".btn-close-modal").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });
  
  
  document.getElementById("btn-save-settings").addEventListener("click", () => {
    const key = document.getElementById("settings-gemini-key").value.trim();
    const model = document.getElementById("settings-gemini-model").value;
    
    if (key) {
      localStorage.setItem("meucv_gemini_key", key);
      appState.geminiKey = key;
      updateGeminiStatus(true);
    } else {
      localStorage.removeItem("meucv_gemini_key");
      appState.geminiKey = "";
      updateGeminiStatus(false);
    }
    localStorage.setItem("meucv_gemini_model", model);
    appState.geminiModel = model;
    
    closeAllModals();
    showToast("Configurações de IA salvas!", "success");
  });

  document.getElementById("btn-test-gemini-key").addEventListener("click", async () => {
    const key = document.getElementById("settings-gemini-key").value.trim();
    if (!key) {
      showToast("Por favor, digite uma chave de API para testar.", "warning");
      return;
    }
    
    const btn = document.getElementById("btn-test-gemini-key");
    const origText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" style="width: 14px; height: 14px; display: inline-block;"></span> Testando...';
    
    try {
      const res = await callGeminiAPI("Diga apenas 'Chave Válida' se estiver funcionando.", key, "gemini-2.5-flash");
      if (res && res.toLowerCase().includes("válida")) {
        showToast("Sucesso! Sua chave de API é válida.", "success");
      } else {
        showToast("Recebemos uma resposta incomum. Verifique se o modelo está acessível.", "warning");
      }
    } catch (e) {
      showToast("Falha na autenticação da chave: " + e.message, "danger");
    } finally {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  });

  
  document.getElementById("btn-library-new").addEventListener("click", () => {
    createNewCv("Novo Currículo da Biblioteca");
    renderLibraryGrid();
  });

  
  document.getElementById("btn-export-backup").addEventListener("click", () => {
    const backupStr = JSON.stringify(appState.library, null, 2);
    const blob = new Blob([backupStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meucv_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup JSON exportado com sucesso!", "success");
  });

  document.getElementById("input-import-backup").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported) && imported.length > 0 && imported[0].id) {
          appState.library = imported;
          saveLibrary();
          renderLibraryGrid();
          selectActiveCv(appState.library[0].id);
          showToast(`Backup restaurado! ${imported.length} currículo(s) carregado(s).`, "success");
        } else {
          showToast("Formato de backup inválido.", "danger");
        }
      } catch (err) {
        showToast("Erro ao processar o arquivo de backup: " + err.message, "danger");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; 
  });

  
  document.getElementById("input-cv-name").addEventListener("change", (e) => {
    appState.currentCvName = e.target.value.trim() || "Currículo Sem Nome";
    saveActiveCvStateToLibrary();
  });

  document.getElementById("select-template").addEventListener("change", (e) => {
    const paper = document.getElementById("cv-paper");
    paper.className = `cv-paper template-${e.target.value}`;
    saveActiveCvStateToLibrary();
    renderCv();
  });

  
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
      
      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      document.getElementById(targetId).classList.add("active");
    });
  });

  
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".workspace-pane").forEach(pane => pane.classList.remove("active"));
      
      tab.classList.add("active");
      const targetWorkspaceId = tab.getAttribute("data-workspace");
      document.getElementById(targetWorkspaceId).classList.add("active");
      
      
      if (targetWorkspaceId === "workspace-editor") {
        renderCv();
      }
      lucide.createIcons();
    });
  });

  
  document.getElementById("btn-zoom-in").addEventListener("click", () => adjustZoom(10));
  document.getElementById("btn-zoom-out").addEventListener("click", () => adjustZoom(-10));

  
  document.getElementById("btn-export-pdf").addEventListener("click", () => {
    showToast("Dica: Desmarque a opção 'Cabeçalhos e rodapés' na tela de impressão para remover o link do site e a data!", "warning");
    setTimeout(() => {
      window.print();
    }, 1000);
  });

  
  document.getElementById("btn-add-experience").addEventListener("click", () => {
    appState.currentCvData.experiences.push({
      company: "",
      role: "",
      start: "",
      end: "",
      desc: ""
    });
    renderExperienceForm();
    saveActiveCvStateToLibrary();
  });

  document.getElementById("btn-add-education").addEventListener("click", () => {
    appState.currentCvData.educations.push({
      institution: "",
      degree: "",
      field: "",
      start: "",
      end: "",
      desc: ""
    });
    renderEducationForm();
    saveActiveCvStateToLibrary();
  });

  document.getElementById("btn-add-language").addEventListener("click", () => {
    appState.currentCvData.languages.push({ name: "", level: "" });
    renderLanguagesForm();
    saveActiveCvStateToLibrary();
  });

  document.getElementById("btn-add-cert").addEventListener("click", () => {
    appState.currentCvData.certs.push({ title: "", date: "", desc: "" });
    renderCertsForm();
    saveActiveCvStateToLibrary();
  });

  
  const dropzone = document.getElementById("pdf-dropzone");
  const fileInput = document.getElementById("input-pdf-file");
  
  dropzone.addEventListener("click", () => fileInput.click());
  
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });
  
  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
  });
  
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handlePdfUpload(e.dataTransfer.files[0]);
    }
  });
  
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handlePdfUpload(e.target.files[0]);
    }
  });

  
  document.getElementById("btn-ai-improve-summary").addEventListener("click", () => {
    improveTextWithAI("summary", "Resumo Profissional");
  });

  document.getElementById("btn-analyze-ats").addEventListener("click", () => {
    runLocalATSAnalysis();
  });

  document.getElementById("btn-ai-adapt-cv").addEventListener("click", () => {
    adaptCvToJobWithAI();
  });

  document.getElementById("btn-process-import").addEventListener("click", () => {
    processRawTextImport();
  });

  
  const isGupyCheckbox = document.getElementById("ats-is-gupy");
  const isInHireCheckbox = document.getElementById("ats-is-inhire");
  const gupyInfoBox = document.getElementById("gupy-info-box");
  const inhireInfoBox = document.getElementById("inhire-info-box");

  isGupyCheckbox.addEventListener("change", () => {
    if (isGupyCheckbox.checked) {
      gupyInfoBox.classList.remove("hidden");
      isInHireCheckbox.checked = false;
      inhireInfoBox.classList.add("hidden");
    } else {
      gupyInfoBox.classList.add("hidden");
    }
  });

  isInHireCheckbox.addEventListener("change", () => {
    if (isInHireCheckbox.checked) {
      inhireInfoBox.classList.remove("hidden");
      isGupyCheckbox.checked = false;
      gupyInfoBox.classList.add("hidden");
    } else {
      inhireInfoBox.classList.add("hidden");
    }
  });

  
  const jdTextarea = document.getElementById("ats-job-description");
  jdTextarea.addEventListener("input", () => {
    const text = jdTextarea.value.trim();
    if (text.includes("gupy.io") || text.includes("gupy.work")) {
      isGupyCheckbox.checked = true;
      gupyInfoBox.classList.remove("hidden");
      isInHireCheckbox.checked = false;
      inhireInfoBox.classList.add("hidden");
      
      if (text.startsWith("http") && text.length < 150) {
        showToast("Detectamos um link da Gupy. Copie a descrição da vaga em texto do site e cole aqui para que possamos analisar!", "warning");
      }
    } else if (text.includes("inhire.app") || text.includes("inhire.com")) {
      isInHireCheckbox.checked = true;
      inhireInfoBox.classList.remove("hidden");
      isGupyCheckbox.checked = false;
      gupyInfoBox.classList.add("hidden");
      
      if (text.startsWith("http") && text.length < 150) {
        showToast("Detectamos um link da inHire. Copie a descrição da vaga em texto do site e cole aqui para que possamos analisar!", "warning");
      }
    }
  });

  
  const btnSubtabPrint = document.getElementById("btn-subtab-linkedin-print");
  const btnSubtabCsv = document.getElementById("btn-subtab-linkedin-csv");
  const sectionPrint = document.getElementById("linkedin-print-section");
  const sectionCsv = document.getElementById("linkedin-csv-section");

  if (btnSubtabPrint && btnSubtabCsv) {
    btnSubtabPrint.addEventListener("click", () => {
      btnSubtabPrint.classList.add("active");
      btnSubtabCsv.classList.remove("active");
      sectionPrint.classList.remove("hidden");
      sectionCsv.classList.add("hidden");
    });

    btnSubtabCsv.addEventListener("click", () => {
      btnSubtabCsv.classList.add("active");
      btnSubtabPrint.classList.remove("active");
      sectionCsv.classList.remove("hidden");
      sectionPrint.classList.add("hidden");
    });
  }

  
  const linkedinDropzone = document.getElementById("linkedin-dropzone");
  const linkedinFileInput = document.getElementById("input-linkedin-files");
  
  if (linkedinDropzone && linkedinFileInput) {
    linkedinDropzone.addEventListener("click", () => linkedinFileInput.click());
    
    linkedinDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      linkedinDropzone.classList.add("dragover");
    });
    
    linkedinDropzone.addEventListener("dragleave", () => {
      linkedinDropzone.classList.remove("dragover");
    });
    
    linkedinDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      linkedinDropzone.classList.remove("dragover");
      if (e.dataTransfer.files.length > 0) {
        handleLinkedinImageUploads(e.dataTransfer.files);
      }
    });
    
    linkedinFileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        handleLinkedinImageUploads(e.target.files);
      }
    });
  }

  
  const linkedinCsvDropzone = document.getElementById("linkedin-csv-dropzone");
  const linkedinCsvFileInput = document.getElementById("input-linkedin-csv-files");

  if (linkedinCsvDropzone && linkedinCsvFileInput) {
    linkedinCsvDropzone.addEventListener("click", () => linkedinCsvFileInput.click());

    linkedinCsvDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      linkedinCsvDropzone.classList.add("dragover");
    });

    linkedinCsvDropzone.addEventListener("dragleave", () => {
      linkedinCsvDropzone.classList.remove("dragover");
    });

    linkedinCsvDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      linkedinCsvDropzone.classList.remove("dragover");
      if (e.dataTransfer.files.length > 0) {
        handleLinkedinCsvUploads(e.dataTransfer.files);
      }
    });

    linkedinCsvFileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        handleLinkedinCsvUploads(e.target.files);
      }
    });
  }
  
  document.getElementById("btn-analyze-linkedin").addEventListener("click", () => {
    analyzeLinkedinWithAI();
  });

  
  document.getElementById("btn-apply-diff").addEventListener("click", () => {
    applyPendingDiff();
  });
  
  document.getElementById("btn-discard-diff").addEventListener("click", () => {
    discardPendingDiff();
  });

  const btnRestoreLinkedin = document.getElementById("btn-restore-linkedin-original");
  if (btnRestoreLinkedin) {
    btnRestoreLinkedin.addEventListener("click", () => {
      toggleLinkedinOptimization();
    });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("#btn-restore-linkedin-original, .btn-restore-original");
    if (btn) {
      e.preventDefault();
      toggleLinkedinOptimization();
    }
  });

  // CV Quality Checklist Dropdown Toggle
  const btnToggleQuality = document.getElementById("btn-toggle-quality-checklist");
  if (btnToggleQuality) {
    btnToggleQuality.addEventListener("click", () => {
      const panel = document.getElementById("cv-quality-checklist-panel");
      const icon = document.getElementById("icon-toggle-quality");
      if (panel) {
        panel.classList.toggle("hidden");
        const isHidden = panel.classList.contains("hidden");
        if (icon) {
          icon.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
        }
      }
    });
  }

  // 1-Click Full CV AI Optimizer
  const btnOptimizeFullCv = document.getElementById("btn-optimize-full-cv");
  if (btnOptimizeFullCv) {
    btnOptimizeFullCv.addEventListener("click", () => {
      optimizeEntireCvWithAI();
    });
  }

  // Identity Merge: Update Existing
  const btnMergeUpdateExisting = document.getElementById("btn-merge-update-existing");
  if (btnMergeUpdateExisting) {
    btnMergeUpdateExisting.addEventListener("click", () => {
      if (!appState.pendingImportData || !appState.pendingMergeTarget) return;
      const targetId = appState.pendingMergeTarget.id;
      const targetCv = appState.library.find(c => String(c.id) === String(targetId));
      if (targetCv) {
        const mergedData = mergeCvDataIntelligently(targetCv.data, appState.pendingImportData);
        targetCv.data = mergedData;
        targetCv.lastModified = new Date().toISOString();
        selectActiveCv(targetId, true);
        saveLibrary();
        showToast(`Currículo de ${appState.pendingImportData.name || "candidato"} atualizado e enriquecido com sucesso!`, "success");
      }
      appState.pendingImportData = null;
      appState.pendingMergeTarget = null;
      closeAllModals();
      switchView("editor");
    });
  }

  // Identity Merge: Create New Separate
  const btnMergeCreateNew = document.getElementById("btn-merge-create-new");
  if (btnMergeCreateNew) {
    btnMergeCreateNew.addEventListener("click", () => {
      if (!appState.pendingImportData) return;
      const parsedData = appState.pendingImportData;
      const createdId = createNewCv(`Importado - ${parsedData.name || "Sem Nome"}`, true);
      if (createdId) {
        appState.currentCvData = parsedData;
        saveActiveCvStateToLibrary();
        fillFormFromState();
        renderCv();
        showToast("Novo currículo criado separadamente com sucesso!", "success");
      }
      appState.pendingImportData = null;
      appState.pendingMergeTarget = null;
      closeAllModals();
      switchView("editor");
    });
  }
}


function switchView(viewName) {
  const landing = document.getElementById("landing-page");
  const editor = document.getElementById("editor-workspace");
  
  if (viewName === "landing") {
    landing.className = "view-active";
    editor.className = "view-hidden";
    loadLibrary();
  } else {
    landing.className = "view-hidden";
    editor.className = "view-active";
    
    
    document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".workspace-pane").forEach(pane => pane.classList.remove("active"));
    const defaultTab = document.querySelector('.nav-tab[data-workspace="workspace-editor"]');
    if (defaultTab) defaultTab.classList.add("active");
    const defaultPane = document.getElementById("workspace-editor");
    if (defaultPane) defaultPane.classList.add("active");
    
    
    if (!appState.currentCvId) {
      if (appState.library.length > 0) {
        selectActiveCv(appState.library[0].id);
      } else {
        createNewCv();
      }
    }
  }
}


function showModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(modal => {
    modal.classList.add("hidden");
  });
}


function adjustZoom(amount) {
  appState.zoomLevel = Math.max(50, Math.min(150, appState.zoomLevel + amount));
  document.getElementById("zoom-percent").innerText = `${appState.zoomLevel}%`;
  document.getElementById("cv-paper").style.transform = `scale(${appState.zoomLevel / 100})`;
}


function showToast(message, type = "primary") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "info";
  if (type === "success") icon = "check-circle";
  if (type === "warning") icon = "alert-triangle";
  if (type === "danger") icon = "x-circle";
  
  const safeMessage = typeof DOMPurify !== "undefined" ? DOMPurify.sanitize(message) : escapeHtml(message);
  toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${safeMessage}</span>`;
  container.appendChild(toast);
  lucide.createIcons();
  
  
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.4s ease-in-out";
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}


function renderLibraryGrid() {
  const grid = document.getElementById("cv-library-grid");
  grid.innerHTML = "";
  
  const hasOwnKey = !!appState.geminiKey;
  const isLogged = !!appState.googleToken;
  const canManage = hasOwnKey || isLogged;
  
  const toolbar = document.querySelector(".library-toolbar");
  if (toolbar) {
    toolbar.style.display = canManage ? "flex" : "none";
  }
  
  appState.library.forEach(cv => {
    const isTestCv = cv.id === "cv_joao_original";
    if (!isTestCv && !canManage) {
      return;
    }
    
    const card = document.createElement("div");
    card.className = "cv-lib-card";
    
    const dateFormatted = new Date(cv.lastModified).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    
    card.innerHTML = `
      <div class="cv-lib-info">
        <h4>${cv.name}</h4>
        <div class="cv-lib-date"><i data-lucide="clock"></i> Modificado em: ${dateFormatted}</div>
      </div>
      <div class="cv-lib-actions">
        <button class="btn btn-primary btn-sm btn-load" data-id="${cv.id}"><i data-lucide="eye"></i> Visualizar / Editar</button>
        <button class="btn btn-secondary btn-sm btn-dup" data-id="${cv.id}" title="Duplicar"><i data-lucide="copy"></i></button>
        <button class="btn btn-danger btn-sm btn-del" data-id="${cv.id}" title="Excluir"><i data-lucide="trash-2"></i></button>
      </div>
    `;
    grid.appendChild(card);
  });
  
  lucide.createIcons();
  
  
  grid.querySelectorAll(".btn-load").forEach(b => {
    b.addEventListener("click", () => {
      selectActiveCv(b.getAttribute("data-id"));
      switchView("editor");
      closeAllModals();
    });
  });
  grid.querySelectorAll(".btn-dup").forEach(b => {
    b.addEventListener("click", () => duplicateCv(b.getAttribute("data-id")));
  });
  grid.querySelectorAll(".btn-del").forEach(b => {
    b.addEventListener("click", () => deleteCv(b.getAttribute("data-id")));
  });
}


function setupFormSync() {
  const bindInput = (id, stateKey) => {
    const el = document.getElementById(id);
    if (!el) return;
    
    const debouncedSaveAndRender = debounce(() => {
      saveActiveCvStateToLibrary();
      renderCv();
    }, 300);
    
    el.addEventListener("input", (e) => {
      appState.currentCvData[stateKey] = e.target.value;
      debouncedSaveAndRender();
    });
  };
  
  bindInput("personal-name", "name");
  bindInput("personal-title", "title");
  bindInput("personal-email", "email");
  bindInput("personal-phone", "phone");
  bindInput("personal-location", "location");
  bindInput("personal-linkedin", "linkedin");
  bindInput("personal-github", "github");
  bindInput("personal-website", "website");
  bindInput("personal-summary", "summary");

  
  const skillsInput = document.getElementById("skills-input");
  skillsInput.addEventListener("keydown", (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const val = skillsInput.value.trim().replace(/,/g, "");
      if (val && !appState.currentCvData.skills.includes(val)) {
        appState.currentCvData.skills.push(val);
        skillsInput.value = "";
        renderSkillsChips();
        saveActiveCvStateToLibrary();
        renderCv();
      }
    }
  });
}

function fillFormFromState() {
  normalizeCvData(appState.currentCvData);
  const d = appState.currentCvData;
  document.getElementById("personal-name").value = d.name || "";
  document.getElementById("personal-title").value = d.title || "";
  document.getElementById("personal-email").value = d.email || "";
  document.getElementById("personal-phone").value = d.phone || "";
  document.getElementById("personal-location").value = d.location || "";
  document.getElementById("personal-linkedin").value = d.linkedin || "";
  document.getElementById("personal-github").value = d.github || "";
  document.getElementById("personal-website").value = d.website || "";
  document.getElementById("personal-summary").value = d.summary || "";
  
  renderSkillsChips();
  renderExperienceForm();
  renderEducationForm();
  renderLanguagesForm();
  renderCertsForm();
}

function renderSkillsChips() {
  const container = document.getElementById("skills-tags-container");
  container.innerHTML = "";
  appState.currentCvData.skills.forEach((skill, index) => {
    const chip = document.createElement("span");
    chip.className = "tag-chip";
    chip.innerHTML = `${escapeHtml(skill)} <button data-index="${index}">&times;</button>`;
    container.appendChild(chip);
  });
  
  
  container.querySelectorAll("button").forEach(b => {
    b.addEventListener("click", () => {
      const idx = parseInt(b.getAttribute("data-index"));
      appState.currentCvData.skills.splice(idx, 1);
      renderSkillsChips();
      saveActiveCvStateToLibrary();
      renderCv();
    });
  });
}


function renderExperienceForm() {
  const list = document.getElementById("experience-list");
  list.innerHTML = "";
  
  appState.currentCvData.experiences.forEach((exp, idx) => {
    const card = document.createElement("div");
    card.className = "repeater-card";
    card.innerHTML = `
      <div class="repeater-card-header">
        <span class="repeater-card-title">Experiência #${idx + 1}</span>
        <button class="btn-card-delete btn-delete-exp" data-index="${idx}"><i data-lucide="trash-2"></i></button>
      </div>
      <div class="form-grid">
        <div class="form-group col-span-2">
          <label for="exp-company-${idx}">Empresa / Organização</label>
          <input type="text" id="exp-company-${idx}" class="exp-company" data-index="${idx}" value="${escapeHtml(exp.company)}">
        </div>
        <div class="form-group col-span-2">
          <label for="exp-role-${idx}">Cargo</label>
          <input type="text" id="exp-role-${idx}" class="exp-role" data-index="${idx}" value="${escapeHtml(exp.role)}">
        </div>
        <div class="form-group">
          <label for="exp-start-${idx}">Data de Início</label>
          <input type="text" id="exp-start-${idx}" class="exp-start" data-index="${idx}" value="${escapeHtml(formatCvDate(exp.start))}" placeholder="Ex: Jan 2021">
        </div>
        <div class="form-group">
          <label for="exp-end-${idx}">Data de Fim</label>
          <input type="text" id="exp-end-${idx}" class="exp-end" data-index="${idx}" value="${escapeHtml(formatCvDate(exp.end))}" placeholder="Ex: Dez 2022 ou Presente">
        </div>
        <div class="form-group col-span-2">
          <div class="tab-title-row" style="margin-bottom:0">
            <label for="exp-desc-${idx}">Principais Responsabilidades e Conquistas</label>
            <button class="btn btn-xs btn-ai-action btn-ai-improve-exp" data-index="${idx}">
              <i data-lucide="sparkles"></i> Melhorar com IA
            </button>
          </div>
          <textarea id="exp-desc-${idx}" class="exp-desc" data-index="${idx}" rows="4" placeholder="Descreva suas conquistas. Dica: use bullet-points separando com novas linhas...">${escapeHtml(exp.desc)}</textarea>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
  
  lucide.createIcons();
  
  
  const updateProp = (selector, key) => {
    list.querySelectorAll(selector).forEach(input => {
      const debouncedSaveAndRender = debounce(() => {
        saveActiveCvStateToLibrary();
        renderCv();
      }, 300);
      
      input.addEventListener("input", (e) => {
        const idx = parseInt(e.target.getAttribute("data-index"));
        appState.currentCvData.experiences[idx][key] = e.target.value;
        debouncedSaveAndRender();
      });
    });
  };
  updateProp(".exp-company", "company");
  updateProp(".exp-role", "role");
  updateProp(".exp-start", "start");
  updateProp(".exp-end", "end");
  updateProp(".exp-desc", "desc");
  
  
  list.querySelectorAll(".btn-delete-exp").forEach(b => {
    b.addEventListener("click", () => {
      const idx = parseInt(b.getAttribute("data-index"));
      appState.currentCvData.experiences.splice(idx, 1);
      renderExperienceForm();
      saveActiveCvStateToLibrary();
      renderCv();
    });
  });

  
  list.querySelectorAll(".btn-ai-improve-exp").forEach(b => {
    b.addEventListener("click", () => {
      const idx = parseInt(b.getAttribute("data-index"));
      improveTextWithAI(`experience-${idx}`, `Experiência na ${appState.currentCvData.experiences[idx].company || "Empresa"}`, idx);
    });
  });
}

function renderEducationForm() {
  const list = document.getElementById("education-list");
  list.innerHTML = "";
  
  appState.currentCvData.educations.forEach((edu, idx) => {
    const card = document.createElement("div");
    card.className = "repeater-card";
    card.innerHTML = `
      <div class="repeater-card-header">
        <span class="repeater-card-title">Educação #${idx + 1}</span>
        <button class="btn-card-delete btn-delete-edu" data-index="${idx}"><i data-lucide="trash-2"></i></button>
      </div>
      <div class="form-grid">
        <div class="form-group col-span-2">
          <label for="edu-inst-${idx}">Instituição</label>
          <input type="text" id="edu-inst-${idx}" class="edu-inst" data-index="${idx}" value="${escapeHtml(edu.institution)}">
        </div>
        <div class="form-group">
          <label for="edu-deg-${idx}">Grau / Nível</label>
          <input type="text" id="edu-deg-${idx}" class="edu-deg" data-index="${idx}" value="${escapeHtml(translateAcademicDegreePt(edu.degree))}" placeholder="Ex: Bacharelado, Técnico">
        </div>
        <div class="form-group">
          <label for="edu-field-${idx}">Curso / Área de Estudo</label>
          <input type="text" id="edu-field-${idx}" class="edu-field" data-index="${idx}" value="${escapeHtml(translateAcademicFieldPt(edu.field))}" placeholder="Ex: Ciência da Computação">
        </div>
        <div class="form-group">
          <label for="edu-start-${idx}">Ano de Início</label>
          <input type="text" id="edu-start-${idx}" class="edu-start" data-index="${idx}" value="${escapeHtml(formatCvDate(edu.start))}" placeholder="Ex: 2016">
        </div>
        <div class="form-group">
          <label for="edu-end-${idx}">Ano de Conclusão</label>
          <input type="text" id="edu-end-${idx}" class="edu-end" data-index="${idx}" value="${escapeHtml(formatCvDate(edu.end))}" placeholder="Ex: 2020 ou Cursando">
        </div>
        <div class="form-group col-span-2">
          <label for="edu-desc-${idx}">Descrição Opcional</label>
          <textarea id="edu-desc-${idx}" class="edu-desc" data-index="${idx}" rows="2">${escapeHtml(edu.desc)}</textarea>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
  
  lucide.createIcons();
  
  const updateProp = (selector, key) => {
    list.querySelectorAll(selector).forEach(input => {
      const debouncedSaveAndRender = debounce(() => {
        saveActiveCvStateToLibrary();
        renderCv();
      }, 300);
      
      input.addEventListener("input", (e) => {
        const idx = parseInt(e.target.getAttribute("data-index"));
        appState.currentCvData.educations[idx][key] = e.target.value;
        debouncedSaveAndRender();
      });
    });
  };
  updateProp(".edu-inst", "institution");
  updateProp(".edu-deg", "degree");
  updateProp(".edu-field", "field");
  updateProp(".edu-start", "start");
  updateProp(".edu-end", "end");
  updateProp(".edu-desc", "desc");
  
  list.querySelectorAll(".btn-delete-edu").forEach(b => {
    b.addEventListener("click", () => {
      const idx = parseInt(b.getAttribute("data-index"));
      appState.currentCvData.educations.splice(idx, 1);
      renderEducationForm();
      saveActiveCvStateToLibrary();
      renderCv();
    });
  });
}

function renderLanguagesForm() {
  const list = document.getElementById("languages-list");
  list.innerHTML = "";
  
  appState.currentCvData.languages.forEach((lang, idx) => {
    const card = document.createElement("div");
    card.className = "repeater-card";
    card.innerHTML = `
      <div class="repeater-card-header">
        <span class="repeater-card-title">Idioma #${idx + 1}</span>
        <button class="btn-card-delete btn-delete-lang" data-index="${idx}"><i data-lucide="trash-2"></i></button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label for="lang-name-${idx}">Idioma</label>
          <input type="text" id="lang-name-${idx}" class="lang-name" data-index="${idx}" value="${escapeHtml(lang.name)}" placeholder="Ex: Inglês">
        </div>
        <div class="form-group">
          <label for="lang-level-${idx}">Proficiência</label>
          <input type="text" id="lang-level-${idx}" class="lang-level" data-index="${idx}" value="${escapeHtml(lang.level)}" placeholder="Ex: Avançado (C1)">
        </div>
      </div>
    `;
    list.appendChild(card);
  });
  
  lucide.createIcons();
  
  const updateProp = (selector, key) => {
    list.querySelectorAll(selector).forEach(input => {
      const debouncedSaveAndRender = debounce(() => {
        saveActiveCvStateToLibrary();
        renderCv();
      }, 300);
      
      input.addEventListener("input", (e) => {
        const idx = parseInt(e.target.getAttribute("data-index"));
        appState.currentCvData.languages[idx][key] = e.target.value;
        debouncedSaveAndRender();
      });
    });
  };
  updateProp(".lang-name", "name");
  updateProp(".lang-level", "level");
  
  list.querySelectorAll(".btn-delete-lang").forEach(b => {
    b.addEventListener("click", () => {
      const idx = parseInt(b.getAttribute("data-index"));
      appState.currentCvData.languages.splice(idx, 1);
      renderLanguagesForm();
      saveActiveCvStateToLibrary();
      renderCv();
    });
  });
}

function renderCertsForm() {
  const list = document.getElementById("certs-list");
  list.innerHTML = "";
  
  appState.currentCvData.certs.forEach((cert, idx) => {
    const card = document.createElement("div");
    card.className = "repeater-card";
    card.innerHTML = `
      <div class="repeater-card-header">
        <span class="repeater-card-title">Certificado/Projeto #${idx + 1}</span>
        <button class="btn-card-delete btn-delete-cert" data-index="${idx}"><i data-lucide="trash-2"></i></button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label for="cert-title-${idx}">Título / Nome</label>
          <input type="text" id="cert-title-${idx}" class="cert-title" data-index="${idx}" value="${escapeHtml(cert.title)}" placeholder="Ex: Certificado React Native">
        </div>
        <div class="form-group">
          <label for="cert-date-${idx}">Ano / Data</label>
          <input type="text" id="cert-date-${idx}" class="cert-date" data-index="${idx}" value="${escapeHtml(formatCvDate(cert.date))}" placeholder="Ex: 2023">
        </div>
        <div class="form-group col-span-2">
          <label for="cert-desc-${idx}">Descrição</label>
          <textarea id="cert-desc-${idx}" class="cert-desc" data-index="${idx}" rows="2">${escapeHtml(cert.desc)}</textarea>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
  
  lucide.createIcons();
  
  const updateProp = (selector, key) => {
    list.querySelectorAll(selector).forEach(input => {
      const debouncedSaveAndRender = debounce(() => {
        saveActiveCvStateToLibrary();
        renderCv();
      }, 300);
      
      input.addEventListener("input", (e) => {
        const idx = parseInt(e.target.getAttribute("data-index"));
        appState.currentCvData.certs[idx][key] = e.target.value;
        debouncedSaveAndRender();
      });
    });
  };
  updateProp(".cert-title", "title");
  updateProp(".cert-date", "date");
  updateProp(".cert-desc", "desc");
  
  list.querySelectorAll(".btn-delete-cert").forEach(b => {
    b.addEventListener("click", () => {
      const idx = parseInt(b.getAttribute("data-index"));
      appState.currentCvData.certs.splice(idx, 1);
      renderCertsForm();
      saveActiveCvStateToLibrary();
      renderCv();
    });
  });
}

function updateLinkedinRestoreButtonUI() {
  const btn = document.getElementById("btn-restore-linkedin-original");
  const desc = document.getElementById("linkedin-import-alert-desc");
  if (!btn) return;
  
  const data = appState.currentCvData;
  if (!data || !data.linkedinOriginal) {
    btn.style.display = "none";
    return;
  }
  
  btn.style.display = "inline-flex";
  
  if (data.linkedinOriginal.isOptimizedApplied) {
    btn.innerHTML = `<i data-lucide="rotate-ccw" style="width: 14px; height: 14px;"></i> <span id="btn-restore-linkedin-label">Desfazer Otimização / Restaurar Original</span>`;
    btn.title = "Desfazer Otimização / Restaurar Texto Original do LinkedIn";
    btn.setAttribute("aria-label", "Desfazer Otimização / Restaurar Original");
    if (desc) {
      desc.innerHTML = `Título e Resumo foram otimizados automaticamente pela IA para elevar o impacto no currículo.`;
    }
  } else {
    btn.innerHTML = `<i data-lucide="sparkles" style="width: 14px; height: 14px;"></i> <span id="btn-restore-linkedin-label">Reaplicar Otimização da IA</span>`;
    btn.title = "Reaplicar Otimização da IA para Título e Resumo";
    btn.setAttribute("aria-label", "Reaplicar Otimização da IA");
    if (desc) {
      desc.innerHTML = `Textos brutos originais do LinkedIn restaurados no currículo.`;
    }
  }
  
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
}

function toggleLinkedinOptimization() {
  const cv = appState.currentCvData;
  if (!cv || !cv.linkedinOriginal) {
    showToast("Nenhum dado original do LinkedIn disponível para restauração.", "warning");
    return;
  }
  
  if (cv.linkedinOriginal.isOptimizedApplied) {
    // Reverter para o original do LinkedIn
    cv.title = cv.linkedinOriginal.title || "";
    cv.summary = cv.linkedinOriginal.summary || "";
    cv.linkedinOriginal.isOptimizedApplied = false;
    showToast("Texto original do LinkedIn restaurado!", "info");
  } else {
    // Reaplicar otimização pela IA
    cv.title = cv.linkedinOriginal.optimizedTitle || "";
    cv.summary = cv.linkedinOriginal.optimizedSummary || "";
    cv.linkedinOriginal.isOptimizedApplied = true;
    showToast("Versão otimizada pela IA reaplicada!", "success");
  }
  
  fillFormFromState();
  renderCv();
  saveActiveCvStateToLibrary();
}

function checkLinkedinImportAlert() {
  const alertBanner = document.getElementById("linkedin-import-alert");
  if (!alertBanner) return;
  
  const data = appState.currentCvData;
  const isLinkedinImport = data && (data.isLinkedinImport || (data.linkedinOriginal && (data.linkedinOriginal.title || data.linkedinOriginal.summary)) || (appState.currentCvName && appState.currentCvName.includes("LinkedIn")));
  
  if (isLinkedinImport) {
    alertBanner.classList.remove("hidden");
    updateLinkedinRestoreButtonUI();
  } else {
    alertBanner.classList.add("hidden");
  }
}


function renderCv() {
  checkLinkedinImportAlert();
  const paper = document.getElementById("cv-paper");
  const data = appState.currentCvData;
  
  
  const formatDesc = (text) => {
    if (!text) return "";
    
    
    let rawText = "";
    if (Array.isArray(text)) {
      rawText = text.join("\n");
    } else {
      
      rawText = String(text).replace(/,([A-Z])/g, "\n$1");
    }

    const escaped = escapeHtml(rawText);
    const lines = escaped.split("\n").map(l => l.trim()).filter(l => l !== "");
    if (lines.length <= 1) return `<p>${escaped.replace(/\n/g, "<br>")}</p>`;
    
    return `<ul>${lines.map(line => {
      
      const cleaned = line.replace(/^[\s\-\*•]+/, "");
      return `<li>${cleaned}</li>`;
    }).join("")}</ul>`;
  };

  
  let contactsHtml = [];
  if (data.email) contactsHtml.push(`<div class="cv-contact-item"><i data-lucide="mail" class="cv-icon" style="width: 10px; height: 10px; color: var(--cv-accent); vertical-align: middle; margin-right: 2pt;"></i> <span>${escapeHtml(data.email)}</span></div>`);
  if (data.phone) contactsHtml.push(`<div class="cv-contact-item"><i data-lucide="phone" class="cv-icon" style="width: 10px; height: 10px; color: var(--cv-accent); vertical-align: middle; margin-right: 2pt;"></i> <span>${escapeHtml(data.phone)}</span></div>`);
  if (data.location) contactsHtml.push(`<div class="cv-contact-item"><i data-lucide="map-pin" class="cv-icon" style="width: 10px; height: 10px; color: var(--cv-accent); vertical-align: middle; margin-right: 2pt;"></i> <span>${escapeHtml(data.location)}</span></div>`);
  if (data.linkedin) contactsHtml.push(`<div class="cv-contact-item"><i data-lucide="linkedin" class="cv-icon" style="width: 10px; height: 10px; color: var(--cv-accent); vertical-align: middle; margin-right: 2pt;"></i> <span>${escapeHtml(data.linkedin)}</span></div>`);
  if (data.github) contactsHtml.push(`<div class="cv-contact-item"><i data-lucide="github" class="cv-icon" style="width: 10px; height: 10px; color: var(--cv-accent); vertical-align: middle; margin-right: 2pt;"></i> <span>${escapeHtml(data.github)}</span></div>`);
  if (data.website) contactsHtml.push(`<div class="cv-contact-item"><i data-lucide="globe" class="cv-icon" style="width: 10px; height: 10px; color: var(--cv-accent); vertical-align: middle; margin-right: 2pt;"></i> <span>${escapeHtml(data.website)}</span></div>`);

  
  let experiencesHtml = "";
  if (data.experiences && data.experiences.length > 0) {
    experiencesHtml = `
      <section class="cv-section">
        <h3 class="cv-section-title">Experiência Profissional</h3>
        ${data.experiences.map(exp => `
          <div class="cv-item">
            <div class="cv-item-header">
              <span class="cv-item-role">${escapeHtml(exp.role || "Cargo")}</span>
              <span class="cv-item-date">${exp.start && exp.end ? `${escapeHtml(formatCvDate(exp.start))} - ${escapeHtml(formatCvDate(exp.end))}` : escapeHtml(formatCvDate(exp.start || exp.end || ""))}</span>
            </div>
            <div class="cv-item-sub">${escapeHtml(exp.company || "Empresa")}</div>
            ${exp.desc ? `<div class="cv-item-desc">${formatDesc(exp.desc)}</div>` : ""}
          </div>
        `).join("")}
      </section>
    `;
  }

  
  let educationsHtml = "";
  if (data.educations && data.educations.length > 0) {
    educationsHtml = `
      <section class="cv-section">
        <h3 class="cv-section-title">Formação Acadêmica</h3>
        ${data.educations.map(edu => `
          <div class="cv-item">
            <div class="cv-item-header">
              <span class="cv-item-role">${escapeHtml(translateAcademicDegreePt(edu.degree || ""))} ${edu.field ? `em ${escapeHtml(translateAcademicFieldPt(edu.field))}` : ""}</span>
              <span class="cv-item-date">${edu.start && edu.end ? `${escapeHtml(formatCvDate(edu.start))} - ${escapeHtml(formatCvDate(edu.end))}` : escapeHtml(formatCvDate(edu.start || edu.end || ""))}</span>
            </div>
            <div class="cv-item-sub">${escapeHtml(edu.institution || "")}</div>
            ${edu.desc ? `<div class="cv-item-desc"><p>${escapeHtml(edu.desc)}</p></div>` : ""}
          </div>
        `).join("")}
      </section>
    `;
  }

  
  let skillsHtml = "";
  if (data.skills && data.skills.length > 0) {
    skillsHtml = `
      <section class="cv-section">
        <h3 class="cv-section-title">Habilidades</h3>
        <div class="cv-skills-list">
          ${data.skills.map(s => escapeHtml(s)).join(" &bull; ")}
        </div>
      </section>
    `;
  }

  
  let languagesHtml = "";
  if (data.languages && data.languages.length > 0) {
    languagesHtml = `
      <section class="cv-section">
        <h3 class="cv-section-title">Idiomas</h3>
        <div class="cv-skills-list">
          ${data.languages.map(l => `<span class="cv-skills-bold">${escapeHtml(l.name || "")}</span>: ${escapeHtml(l.level || "")}`).join(" &bull; ")}
        </div>
      </section>
    `;
  }

  
  let certsHtml = "";
  if (data.certs && data.certs.length > 0) {
    
    const projects = data.certs.filter(c => c.desc && c.desc.trim().length >= 30);
    const simpleCerts = data.certs.filter(c => !c.desc || c.desc.trim().length < 30);
    
    let projectsHtml = "";
    if (projects.length > 0) {
      projectsHtml = projects.map(c => `
        <div class="cv-item" style="margin-bottom: 8pt;">
          <div class="cv-item-header">
            <span class="cv-item-role">${escapeHtml(c.title || "")}</span>
            <span class="cv-item-date">${escapeHtml(formatCvDate(c.date || ""))}</span>
          </div>
          ${c.desc ? `<div class="cv-item-desc"><p>${escapeHtml(c.desc)}</p></div>` : ""}
        </div>
      `).join("");
    }
    
    let simpleCertsHtml = "";
    if (simpleCerts.length > 0) {
      const itemsText = simpleCerts.map(c => {
        const title = escapeHtml(c.title || "");
        const date = c.date && c.date !== "N/A" ? ` (${escapeHtml(formatCvDate(c.date))})` : "";
        const issuer = c.desc && c.desc !== "N/A" ? ` - ${escapeHtml(c.desc)}` : "";
        return `<span class="cv-skills-bold">${title}</span>${issuer}${date}`;
      }).join(" &bull; ");
      
      simpleCertsHtml = `
        <div class="cv-skills-list" style="margin-top: 4pt; line-height: 1.5;">
          ${itemsText}
        </div>
      `;
    }
    
    certsHtml = `
      <section class="cv-section">
        <h3 class="cv-section-title">Certificados e Projetos</h3>
        ${projectsHtml}
        ${simpleCertsHtml}
      </section>
    `;
  }

  
  paper.innerHTML = `
    <header class="cv-header-block">
      <h1 class="cv-header-title">${escapeHtml(data.name || "Seu Nome")}</h1>
      <h2 class="cv-header-subtitle">${escapeHtml(data.title || "Seu Cargo / Área Principal")}</h2>
      <div class="cv-contact-row">
        ${contactsHtml.join("")}
      </div>
    </header>

    ${data.summary ? `
    <section class="cv-section">
      <h3 class="cv-section-title">Resumo Profissional</h3>
      <div class="cv-summary-text">
        <p>${escapeHtml(data.summary).replace(/\n/g, "<br>")}</p>
      </div>
    </section>
    ` : ""}

    ${experiencesHtml}
    ${educationsHtml}
    
    <div class="cv-footer-sections">
      ${skillsHtml}
      ${languagesHtml}
      ${certsHtml}
    </div>
  `;

  
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
  // O auditor é puramente informativo: nunca pode interromper renderização nem salvamento
  try {
    renderCvQualityAuditor();
  } catch (err) {
    console.error("Falha no auditor de qualidade (ignorada):", err);
  }
}


// Converte qualquer valor (string, array, número, null) em texto seguro
function toPlainText(value) {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(toPlainText).join("\n");
  if (typeof value === "object") return "";
  return String(value);
}

function evaluateCvQualityScore(cvData) {
  const cv = cvData || {};
  let contactScore = 0;
  let summaryScore = 0;
  let expScore = 0;
  let eduScore = 0;
  let skillsScore = 0;

  const items = [];
  const txt = (v) => toPlainText(v).trim();

  // --- 1. Contact (Max 20) ---
  const hasName = txt(cv.name).length >= 3;
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(txt(cv.email));
  const hasPhone = txt(cv.phone).length >= 8;
  const hasLocation = txt(cv.location).length >= 3;
  const hasLink = txt(cv.linkedin).length >= 4 || txt(cv.github).length >= 4 || txt(cv.website).length >= 4;

  if (hasName) contactScore += 4;
  if (hasEmail) contactScore += 4;
  if (hasPhone) contactScore += 4;
  if (hasLocation) contactScore += 4;
  if (hasLink) contactScore += 4;

  items.push({
    id: "contact_core",
    category: "contact",
    label: "Dados Essenciais de Contato",
    passed: hasName && hasEmail && hasPhone,
    tip: hasName && hasEmail && hasPhone ? "Nome, e-mail e telefone preenchidos corretamente." : "Preencha nome completo, e-mail válido e telefone para contato direto dos recrutadores."
  });

  items.push({
    id: "contact_links",
    category: "contact",
    label: "Links Profissionais (LinkedIn / GitHub / Portfólio)",
    passed: hasLink,
    tip: hasLink ? "Perfil profissional verificado presente no cabeçalho." : "Adicione seu LinkedIn ou GitHub para aumentar a credibilidade e validação do seu histórico."
  });

  // --- 2. Summary (Max 25) ---
  const summaryText = txt(cv.summary);
  const summaryLen = summaryText.length;
  const hasSummary = summaryLen >= 30;
  const isSummaryIdealLength = summaryLen >= 140 && summaryLen <= 650;
  
  const summaryKeywords = ["experiência", "desenvolvimento", "projetos", "atuação", "especialista", "gestão", "liderança", "foco", "resultados", "soluções", "tecnologia", "engenharia", "infraestrutura", "segurança", "automação", "sistemas", "análise"];
  const summaryMatches = summaryKeywords.filter(kw => summaryText.toLowerCase().includes(kw));
  const hasSummaryValue = summaryMatches.length >= 2;

  if (hasSummary) summaryScore += 5;
  if (isSummaryIdealLength) summaryScore += 10;
  else if (summaryLen >= 60) summaryScore += 5;
  if (hasSummaryValue) summaryScore += 10;
  else if (summaryMatches.length >= 1) summaryScore += 5;

  items.push({
    id: "summary_presence",
    category: "summary",
    label: "Resumo Profissional Estruturado (3 a 5 linhas)",
    passed: isSummaryIdealLength,
    tip: isSummaryIdealLength ? "Resumo com tamanho e densidade ideais para triagem rápida." : (summaryLen < 140 ? "Seu resumo está muito curto. Escreva 3 a 5 linhas destacando suas principais especialidades e conquistas." : "Seu resumo está muito extenso. Resuma em até 5 linhas para garantir leitura ágil.")
  });

  // --- 3. Experiences & STAR Method (Max 25) ---
  const experiences = Array.isArray(cv.experiences) ? cv.experiences : [];
  const hasExp = experiences.length >= 1;
  if (hasExp) expScore += 5;

  const actionVerbs = [
    "desenvolvi", "liderei", "implementei", "estruturei", "otimizei", "automatizei", "criei", 
    "coordenei", "reduzi", "aumentei", "projetei", "integrei", "migrei", "configurei", 
    "administrei", "gerenciei", "auditei", "desenvolvimento", "liderança", "implementação", 
    "automação", "otimização", "suporte", "manutenção", "análise"
  ];

  let totalVerbsFound = 0;
  let hasQuantMetrics = false;
  const metricRegex = /(\d+[\.,]?\d*%|\b\d{2,}\b|r\$|\$|\bhoras\b|\bminutos\b|\bdias\b|\bmeses\b|\busuários\b|\bservidores\b|\bdispositivos\b|\bequipes\b)/i;

  experiences.forEach(exp => {
    const desc = txt(exp.desc).toLowerCase();
    actionVerbs.forEach(v => {
      if (desc.includes(v)) totalVerbsFound++;
    });
    if (metricRegex.test(desc)) {
      hasQuantMetrics = true;
    }
  });

  if (totalVerbsFound >= 3) expScore += 10;
  else if (totalVerbsFound >= 1) expScore += 5;

  if (hasQuantMetrics) expScore += 10;
  else if (totalVerbsFound >= 2) expScore += 5;

  items.push({
    id: "exp_action_verbs",
    category: "experience",
    label: "Verbos de Ação Fortes (Metodologia STAR)",
    passed: totalVerbsFound >= 3,
    tip: totalVerbsFound >= 3 ? "Realizações iniciadas com verbos fortes de impacto." : "Use verbos de ação no pretérito (ex: 'Desenvolvi', 'Liderei', 'Automatizei', 'Otimizei') no início de cada conquista."
  });

  items.push({
    id: "exp_metrics",
    category: "experience",
    label: "Métricas e Resultados Quantificados (%, números)",
    passed: hasQuantMetrics,
    tip: hasQuantMetrics ? "Presença comprovada de métricas e indicadores de impacto." : "Inclua dados quantitativos nas experiências (ex: 'redução de 30% em chamados', 'gestão de 150 servidores'). Recrutadores valorizam impacto mensurável."
  });

  // --- 4. Education & Languages (Max 15) ---
  const educations = Array.isArray(cv.educations) ? cv.educations : [];
  const hasEdu = educations.length >= 1 && educations.some(e => e && txt(e.institution) && (txt(e.field) || txt(e.degree)));
  const hasEduDates = educations.some(e => e && (txt(e.start) || txt(e.end)));
  const languages = Array.isArray(cv.languages) ? cv.languages : [];
  const hasLang = languages.length >= 1;

  if (hasEdu) eduScore += 10;
  if (hasEduDates) eduScore += 3;
  if (hasLang) eduScore += 2;

  items.push({
    id: "edu_complete",
    category: "education",
    label: "Formação Acadêmica e Idiomas",
    passed: hasEdu && hasEduDates,
    tip: (hasEdu && hasEduDates) ? "Formação acadêmica preenchida com instituição, curso e períodos." : "Informe instituição de ensino, graduação/curso e anos de início e conclusão."
  });

  // --- 5. Skills & Projects (Max 15) ---
  const skills = Array.isArray(cv.skills) ? cv.skills : [];
  const certs = Array.isArray(cv.certs) ? cv.certs : [];
  const hasEnoughSkills = skills.length >= 5;
  const hasProjectsOrCerts = certs.length >= 1;

  if (skills.length >= 8) skillsScore += 8;
  else if (skills.length >= 5) skillsScore += 6;
  else if (skills.length >= 1) skillsScore += 3;

  if (certs.length >= 2) skillsScore += 7;
  else if (certs.length === 1) skillsScore += 5;

  items.push({
    id: "skills_density",
    category: "skills",
    label: "Competências Técnicas Chave (Mínimo 5)",
    passed: hasEnoughSkills,
    tip: hasEnoughSkills ? `Excelente densidade de competências técnicas (${skills.length} cadastradas).` : "Liste pelo menos 5 competências e tecnologias dominadas para leitura assertiva por robôs ATS."
  });

  items.push({
    id: "projects_certs_item",
    category: "skills",
    label: "Projetos Práticos ou Certificações",
    passed: hasProjectsOrCerts,
    tip: hasProjectsOrCerts ? "Certificados e/ou projetos práticos cadastrados com sucesso." : "Adicione projetos autorais de software, automações ou certificações profissionais para se destacar da concorrência."
  });

  const totalScore = Math.min(100, Math.max(0, contactScore + summaryScore + expScore + eduScore + skillsScore));

  let ratingLevel = "high";
  let ratingLabel = "Excelente padrão ATS & RH";
  if (totalScore < 60) {
    ratingLevel = "low";
    ratingLabel = "Incompleto - Requer melhorias";
  } else if (totalScore < 80) {
    ratingLevel = "medium";
    ratingLabel = "Bom - Requer ajustes finos";
  }

  return {
    totalScore,
    ratingLevel,
    ratingLabel,
    categoryScores: {
      contact: contactScore,
      summary: summaryScore,
      experience: expScore,
      education: eduScore,
      skills: skillsScore
    },
    items
  };
}

function renderCvQualityAuditor() {
  const badge = document.getElementById("cv-quality-score-badge");
  const label = document.getElementById("cv-quality-status-label");
  const itemsContainer = document.getElementById("cv-quality-checklist-items");

  if (!badge || !label) return;

  const result = evaluateCvQualityScore(appState.currentCvData);

  badge.innerText = `${result.totalScore}/100`;
  badge.className = `quality-score-badge ${result.ratingLevel}`;
  label.innerText = result.ratingLabel;

  const setPill = (id, name, score, max) => {
    const pill = document.getElementById(id);
    if (!pill) return;
    pill.innerText = `${name}: ${score}/${max}`;
    pill.className = `quality-pill ${score >= max * 0.75 ? "passed" : "warn"}`;
  };

  setPill("pill-contact", "Contato", result.categoryScores.contact, 20);
  setPill("pill-summary", "Resumo", result.categoryScores.summary, 25);
  setPill("pill-exp", "Experiências", result.categoryScores.experience, 25);
  setPill("pill-edu", "Formação", result.categoryScores.education, 15);
  setPill("pill-skills", "Skills", result.categoryScores.skills, 15);

  if (itemsContainer) {
    itemsContainer.innerHTML = result.items.map(item => `
      <div class="checklist-card-item ${item.passed ? "pass" : "fail"}">
        <div class="checklist-card-icon">
          <i data-lucide="${item.passed ? "check-circle-2" : "alert-circle"}" style="width: 16px; height: 16px; color: ${item.passed ? "var(--ui-success)" : "var(--ui-warning)"};"></i>
        </div>
        <div class="checklist-card-body">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.tip)}</span>
        </div>
      </div>
    `).join("");
  }

  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
}



async function runLocalATSAnalysis() {
  const jd = document.getElementById("ats-job-description").value.trim();
  if (!jd) {
    showToast("Por favor, cole a descrição da vaga antes de analisar.", "warning");
    return;
  }
  
  const btn = document.getElementById("btn-analyze-ats");
  const origHtml = btn.innerHTML;
  btn.disabled = true;
  
  const updateStatus = async (msg, delay) => {
    btn.innerHTML = `<span class="spinner" style="width: 12px; height: 12px; display: inline-block;"></span> ${msg}`;
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
  };
  
  
  const cleanBoilerplate = (text) => {
    const lowerText = text.toLowerCase();
    const markers = [
      "benefícios", "beneficios", "sobre a empresa", "sobre nós", "sobre nos", 
      "faça parte", "faca parte", "quem somos", "sobre o time", "nossos valores", 
      "valores da empresa", "o que oferecemos", "plano de saúde", "seguro de vida",
      "contratação", "faça parte do time"
    ];
    let cutoffIdx = text.length;
    markers.forEach(marker => {
      const idx = lowerText.indexOf(marker);
      if (idx !== -1 && idx < cutoffIdx) {
        if (idx > 150) cutoffIdx = idx;
      }
    });
    return text.substring(0, cutoffIdx);
  };

  try {
    await updateStatus("Extraindo requisitos...", 600);
    
    
    const cv = appState.currentCvData;
    const cvText = `
      ${cv.name} ${cv.title} ${cv.summary}
      ${cv.experiences.map(e => `${e.role} ${e.company} ${e.desc}`).join(" ")}
      ${cv.educations.map(e => `${e.degree} ${e.field} ${e.institution} ${e.desc}`).join(" ")}
      ${cv.skills.join(" ")}
      ${cv.certs.map(c => `${c.title} ${c.desc}`).join(" ")}
    `.toLowerCase();

    let importantKeywords = [];
    const hasOwnKey = !!appState.geminiKey;
    const isLogged = !!appState.googleToken;

    if (hasOwnKey || isLogged) {
      
      const extractKeywordsWithAI = async (jdText) => {
        await updateStatus("Analisando com IA...", 0);
        const prompt = `
          Você é um motor de ATS de alta precisão.
          Dada a descrição de vaga de trabalho a seguir, extraia de 10 a 15 palavras-chave ou competências técnicas mais cruciais (Hard Skills, ferramentas, tecnologias, frameworks, linguagens ou certificações).
          - Retorne apenas termos técnicos reais e específicos para a função.
          - Descarte totalmente benefícios, local de trabalho, descrições da empresa, soft skills genéricas (como comunicação, detalhista, proatividade) e verbos de ação comuns (como realizar, analisar, documentar).
          - Retorne exatamente um array JSON de strings, por exemplo: ["SIEM", "EDR", "Trend Micro", "CompTIA Security+"].
          - Não adicione marcação markdown (como \`\`\`json), nem introduções ou explicações. Retorne apenas o JSON puro.
          
          DESCRIÇÃO DA VAGA:
          ${jdText}
        `;
        try {
          const responseText = await callGeminiAPI(prompt);
          let cleanText = responseText.trim();
          if (cleanText.startsWith("```")) {
            cleanText = cleanText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
          }
          const list = JSON.parse(cleanText);
          if (Array.isArray(list) && list.length > 0) {
            return list.map(w => w.trim().toLowerCase()).filter(w => w.length > 1);
          }
        } catch (e) {
          console.warn("IA falhou, usando fallback local:", e);
        }
        return null;
      };

      const aiKeywords = await extractKeywordsWithAI(jd);
      if (aiKeywords && aiKeywords.length > 0) {
        importantKeywords = aiKeywords;
      }
    }

    
    if (importantKeywords.length === 0) {
      await updateStatus("Processando heurística local...", 500);
      const cleanedJd = cleanBoilerplate(jd);
      const words = cleanedJd.toLowerCase()
        .replace(/[.,\/!$%\^&\*;:{}=\-_`~()?"']/g, " ")
        .split(/\s+/)
        .map(w => w.trim())
        .filter(w => w.length > 2 && !stopWords.has(w));
        
      const keywordFreq = {};
      words.forEach(w => {
        keywordFreq[w] = (keywordFreq[w] || 0) + 1;
      });
      
      importantKeywords = Object.keys(keywordFreq)
        .sort((a, b) => keywordFreq[b] - keywordFreq[a])
        .slice(0, 15);
    }

    if (importantKeywords.length === 0) {
      showToast("Não encontramos palavras-chave significativas na vaga.", "warning");
      return;
    }
    
    await updateStatus("Analisando compatibilidade...", 600);
    
    
  const matched = [];
  const missing = [];
  
  importantKeywords.forEach(kw => {
    try {
      const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const startBoundary = /^\w/.test(kw) ? "\\b" : "";
      const endBoundary = /\w$/.test(kw) ? "\\b" : "(?!\\w)";
      const regex = new RegExp(startBoundary + escapedKw + endBoundary, "i");
      
      if (regex.test(cvText)) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    } catch (err) {
      
      if (cvText.includes(kw.toLowerCase())) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    }
  });
  
  
  
  let baseScore = 20; 
  if (cv.email) baseScore += 5;
  if (cv.phone) baseScore += 5;
  if (cv.linkedin) baseScore += 5;
  if (cv.experiences.length > 0) baseScore += 10;
  if (cv.skills.length > 5) baseScore += 5;
  
  const kwScoreWeight = 50; 
  const matchRatio = matched.length / importantKeywords.length;
  const kwScore = Math.round(matchRatio * kwScoreWeight);
  
  const totalScore = Math.min(100, baseScore + kwScore);
  
  await updateStatus("Gerando resultado...", 300);
  
  
  const scoreVal = document.getElementById("ats-score-val");
  const ratingTitle = document.getElementById("ats-rating-title");
  const ratingDesc = document.getElementById("ats-rating-desc");
  const scoreCircle = document.querySelector(".score-circle");
  
  scoreVal.innerText = `${totalScore}%`;
  
  
  scoreCircle.className = "score-circle";
  if (totalScore >= 75) {
    scoreCircle.classList.add("high");
    ratingTitle.innerText = "Excelente Compatibilidade!";
    ratingDesc.innerText = "Seu currículo está muito bem alinhado com as palavras-chave desta vaga.";
  } else if (totalScore >= 50) {
    scoreCircle.classList.add("medium");
    ratingTitle.innerText = "Compatibilidade Média";
    ratingDesc.innerText = "Considere adicionar as palavras-chave ausentes para aumentar suas chances.";
  } else {
    scoreCircle.classList.add("low");
    ratingTitle.innerText = "Baixa Compatibilidade";
    ratingDesc.innerText = "Reescreva seções importantes e adicione competências cruciais exigidas na vaga.";
  }
  
  
  const matchedList = document.getElementById("list-matched-kw");
  document.getElementById("count-matched-kw").innerText = matched.length;
  matchedList.innerHTML = matched.map(kw => `<span class="kw-chip">${kw}</span>`).join("");
  
  
  const missingList = document.getElementById("list-missing-kw");
  document.getElementById("count-missing-kw").innerText = missing.length;
  missingList.innerHTML = missing.map(kw => `<span class="kw-chip">${kw}</span>`).join("");
  
  
  const tipsList = document.getElementById("list-ats-tips");
  tipsList.innerHTML = "";
  
  const isGupy = document.getElementById("ats-is-gupy").checked;
  const isInHire = document.getElementById("ats-is-inhire").checked;
  
  if (isGupy) {
    tipsList.innerHTML += `<li><strong>[Gupy]</strong> Não envie apenas o PDF! Copie e cole os textos das seções nos respectivos campos de texto no portal da Gupy.</li>`;
    if (missing.length > 0) {
      tipsList.innerHTML += `<li><strong>[Gupy]</strong> A IA da Gupy busca correspondência semântica e exata. Tente incluir os termos <strong>${missing.slice(0, 3).join(", ")}</strong> no seu resumo.</li>`;
    }
    tipsList.innerHTML += `<li><strong>[Gupy]</strong> Certifique-se de que o título do seu currículo (${cv.title || "seu cargo"}) esteja o mais alinhado possível com o nome exato da vaga.</li>`;
  } else if (isInHire) {
    tipsList.innerHTML += `<li><strong>[inHire]</strong> A plataforma lê diretamente o arquivo PDF anexado. Baixe o PDF final gerado por este otimizador e anexe-o exatamente como gerado.</li>`;
    if (missing.length > 0) {
      tipsList.innerHTML += `<li><strong>[inHire]</strong> Garanta que as palavras-chaves <strong>${missing.slice(0, 3).join(", ")}</strong> estejam no corpo do PDF para evitar que o algoritmo filtre seu currículo por falta de requisitos.</li>`;
    }
    tipsList.innerHTML += `<li><strong>[inHire]</strong> Preencha com atenção todas as perguntas eliminatórias (knockout) de requisitos mínimos na inscrição.</li>`;
  } else {
    if (missing.length > 0) {
      tipsList.innerHTML += `<li>Tente incluir os termos <strong>${missing.slice(0, 3).join(", ")}</strong> no seu resumo profissional ou na descrição dos cargos.</li>`;
    }
    if (cv.summary && cv.summary.length < 100) {
      tipsList.innerHTML += `<li>Seu resumo profissional está muito curto. Expanda-o para conter 3-4 linhas com competências fundamentais.</li>`;
    }
  }
  
  if (!cv.linkedin) {
    tipsList.innerHTML += `<li>Adicione o link do seu LinkedIn! Recrutadores utilizam para validar seu histórico.</li>`;
  }
  
  if (tipsList.innerHTML === "") {
    tipsList.innerHTML = `<li>Excelente! O formato e conteúdo estão ótimos para leitura de robôs ATS. Pronto para enviar!</li>`;
  }
  
      document.getElementById("ats-results-box").classList.remove("hidden");
    showToast("Análise ATS concluída com sucesso!", "success");
  } catch (err) {
    showToast("Erro na análise ATS: " + err.message, "danger");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.innerHTML = origHtml;
  }
}


async function callGeminiAPI(prompt, apiKey = appState.geminiKey, model = appState.geminiModel) {
  
  const url = `/api/gemini?model=${model}`;
  
  const payload = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.2
    }
  };
  
  const headers = {
    "Content-Type": "application/json"
  };
  
  
  if (apiKey) {
    headers["x-goog-api-key"] = apiKey;
  } else {
    
    
    const isTestCv = appState.currentCvId === "cv_joao_original";
    if (!isTestCv && !appState.googleToken) {
      showToast("Faça login com o Google (no topo da página) para usar a IA no seu próprio currículo.", "warning");
      throw new Error("Autenticação com o Google necessária.");
    }
    
    if (appState.googleToken) {
      headers["Authorization"] = `Bearer ${appState.googleToken}`;
    }
  }
  
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errMsg = errData.error?.message || response.statusText;
    throw new Error(`Erro na API (${response.status}): ${errMsg}`);
  }
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Resposta inválida ou vazia recebida do modelo.");
  }
  return text;
}


async function improveTextWithAI(fieldKey, labelName, listIndex = null) {
  let originalText = "";
  if (fieldKey === "summary") {
    originalText = document.getElementById("personal-summary").value.trim();
  } else if (fieldKey.startsWith("experience-")) {
    originalText = appState.currentCvData.experiences[listIndex].desc.trim();
  }
  
  if (!originalText) {
    showToast("Por favor, digite algum texto antes de tentar melhorar com IA.", "warning");
    return;
  }
  
  
  let btnId = fieldKey === "summary" ? "btn-ai-improve-summary" : null;
  let btn = btnId ? document.getElementById(btnId) : document.querySelector(`.btn-ai-improve-exp[data-index="${listIndex}"]`);
  const origHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="width: 12px; height: 12px; display: inline-block;"></span> Analisando...';
  
  const prompt = `
    Você é um redator de currículos profissional especialista em recrutamento por sistemas ATS.
    Melhore o seguinte trecho de currículo da seção "${labelName}".
    
    Retorne OBRIGATORIAMENTE um objeto JSON válido com o seguinte formato exato (sem formatação markdown extra, sem blocos de código markdown como \`\`\`json, e sem aspas fora do JSON):
    {
      "optimizedText": "O texto do currículo melhorado, organizado em bullets de ação se for experiência ou em um parágrafo forte se for resumo.",
      "explanation": "Uma explicação pedagógica em tópicos em português de por que estas mudanças foram efetuadas (ex: quais verbos de ação foram incluídos, como o foco em resultados e métricas foi aumentado, ou quais palavras irrelevantes foram eliminadas)."
    }

    Texto Original:
    """
    ${originalText}
    """
  `;
  
  try {
    const responseText = await callGeminiAPI(prompt);
    let cleanJson = responseText.trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();
      
    const parsed = JSON.parse(cleanJson);
    
    
    pendingChange = {
      type: fieldKey,
      index: listIndex,
      originalText: originalText,
      optimizedText: parsed.optimizedText,
      explanation: parsed.explanation,
      labelName: labelName
    };
    
    
    document.getElementById("diff-original-content").innerText = originalText;
    document.getElementById("diff-optimized-content").innerText = parsed.optimizedText;
    document.getElementById("diff-explanation").innerHTML = parseMarkdownToHtml(parsed.explanation);
    
    showModal("modal-diff");
    
  } catch (err) {
    showToast("Erro da IA: " + err.message, "danger");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.innerHTML = origHtml;
  }
}


async function adaptCvToJobWithAI() {
  const jd = document.getElementById("ats-job-description").value.trim();
  if (!jd) {
    showToast("Por favor, cole a descrição da vaga antes de adaptar.", "warning");
    return;
  }
  
  const isGupy = document.getElementById("ats-is-gupy").checked;
  const isInHire = document.getElementById("ats-is-inhire").checked;
  
  const btn = document.getElementById("btn-ai-adapt-cv");
  const origHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="width: 14px; height: 14px; display: inline-block;"></span> Adaptando...';
  
  const currentCvJson = JSON.stringify(appState.currentCvData, null, 2);
  
  let platformRules = "";
  if (isGupy) {
    platformRules = `
    DIRETRIZES GUPY (GAIA):
    - Destaque termos técnicos e palavras-chave de forma bastante contextualizada no resumo profissional e nos tópicos de experiência, pois a inteligência artificial semântica (Gaia) pontua a aderência conceitual do perfil.
    - O título principal do currículo (cargo) deve ser ajustado para corresponder exatamente ou o mais próximo possível ao título da vaga indicada.
    `;
  } else if (isInHire) {
    platformRules = `
    DIRETRIZES INHIRE:
    - O algoritmo do inHire baseia-se fortemente em parsing de PDF e mapeamento direto de Hard Skills obrigatórias e desejáveis com pesos distintos.
    - Identifique as principais Hard Skills (tecnologias, linguagens, ferramentas, certificações mandatórias) da vaga e inclua-as de maneira explícita e textual nas seções de Habilidades e nos tópicos de Experiência/Formação, usando a ortografia exata da descrição para maximizar a indexação por peso.
    `;
  }

  const prompt = `
    Você é um especialista sênior em recrutamento, recolocação profissional e redação de currículos de alta performance de nível global.
    Sua missão é adaptar o currículo de um candidato para que ele seja altamente relevante para a vaga descrita abaixo, otimizando-o para máxima compatibilidade com leitores ATS${isGupy ? ' (especificamente o portal Gupy/IA Gaia)' : isInHire ? ' (especificamente a plataforma inHire)' : ''}.
    
    ${platformRules}

    REGRAS CRÍTICAS DE ESTRUTURAÇÃO E REDAÇÃO (Alinhadas ao Esqueleto do Currículo de Alta Performance):
    1. CABEÇALHO E CONTATOS: Preserve todas as informações de contato do candidato sem qualquer alteração.
    2. RESUMO PROFISSIONAL (3-5 LINHAS): Escreva um resumo extremamente objetivo, direto e de alto impacto de exatamente 3 a 5 linhas. Deve cobrir: Quem o candidato é + sua especialidade/área principal + anos de experiência + o valor que entrega e principais conquistas de impacto.
    3. EXPERIÊNCIA PROFISSIONAL (Modelo STAR): Reescreva as descrições de realizações e responsabilidades dos cargos em formato de lista (bullets separados por \n) usando ativamente a metodologia STAR (Situação, Ação, Resultado).
       - Foque sempre em impacto, dados e números reais (ex: "Aumentei a retenção de clientes em 30% ao implementar...", "Liderei equipe de X pessoas e reduzi o tempo de produção em Y%").
       - NUNCA use frases passivas ou puramente genéricas (como "Responsável por campanhas de marketing" ou "Responsável por suporte"). Explique a ação e o resultado obtido.
       - Use verbos de ação fortes no início das conquistas (Desenvolvi, Liderei, Otimizei, Implementou, Automatizou, Reduziu, Economizou).
    4. PRESERVAÇÃO E ADAPTAÇÃO DE PROJETOS E INICIATIVAS DE DESTAQUE: Nunca remova, oculte ou ignore projetos autorais, iniciativas de destaque, pesquisas, ferramentas ou plataformas desenvolvidas pelo candidato. Reescreva a descrição detalhada dessas iniciativas (bullets) adaptando-as para ressaltar a aplicação prática de competências e o uso de palavras-chaves que gerem valor para a vaga de trabalho pretendida (por exemplo, correlacionando-os com as necessidades técnicas ou processos descritos na vaga).
    5. PRESERVAÇÃO DE HABILIDADES DIFERENCIAIS: Se o candidato possui competências avançadas, especializações profundas, metodologias diferenciadas ou conhecimentos inovadores (como técnicas de segurança cibernética, engenharia de prompt, liderança ou ferramentas tecnológicas), essas habilidades devem ser preservadas e integradas de forma prática e estratégica no Resumo Profissional, nas Habilidades e nas Experiências, demonstrando seu uso no dia a dia da nova função.
    6. CERTIFICADOS, CURSOS E PROJETOS DETALHADOS (certs): Mantenha todos os certificados, cursos e projetos do candidato. Nunca copie descrições de projetos complexos verbatim (palavra por palavra) sem fazer a devida adaptação de contexto e vocabulário alinhados à vaga de emprego. Conecte cada projeto ou certificado de forma inteligente com os requisitos técnicos do cargo.
    7. REGRA ABSOLUTA DE IDIOMA E LOCALIZAÇÃO (PORTUGUÊS DO BRASIL):
       - O currículo otimizado DEVE ser mantido 100% em Português do Brasil (pt-BR).
       - NUNCA traduza nomes de cursos, faculdades, formações acadêmicas ou cargos para o inglês sem pedido explícito. Mantenha estritamente 'Engenharia de Computação' (JAMAIS 'Computer Engineering'), 'Defesa Cibernética' (JAMAIS 'Cybersecurity'), 'Bacharelado' (JAMAIS 'Bachelor'), etc.
       - Apenas termos técnicos globais e tecnologias consagradas (Python, Docker, React, AWS, SQL) devem permanecer como são.
    
    8. Retorne OBRIGATORIAMENTE um objeto JSON com o seguinte formato exato (sem formatação markdown extra, sem blocos de código markdown como \`\`\`json, e sem aspas fora do JSON):
    {
      "explanation": "Explicação pedagógica detalhada em tópicos em português informando quais palavras-chaves da vaga foram incorporadas, quais alterações no resumo foram feitas e de que forma as experiências e projetos foram reescritos e adaptados.",
      "optimizedCv": {
        "name": "Nome do Candidato (não mude)",
        "title": "Cargo principal alinhado com a vaga",
        "email": "email (não mude)",
        "phone": "telefone (não mude)",
        "location": "cidade (não mude)",
        "linkedin": "linkedin (não mude)",
        "github": "github (não mude)",
        "website": "site (não mude)",
        "summary": "Resumo profissional objetivo e direto de exatamente 3 a 5 linhas, focando em especialidade, competências-chaves e conquistas alinhadas à vaga.",
        "experiences": [
          {
            "company": "Empresa (não mude)",
            "role": "Cargo ocupado (não mude radicalmente)",
            "start": "data (não mude)",
            "end": "data (não mude)",
            "desc": "Realizações e conquistas baseadas no modelo STAR com números, dados e verbos de ação fortes, separadas por novas linhas (\\n)"
          }
        ],
        "educations": [
          {
            "institution": "Instituição (não mude)",
            "degree": "nível (não mude)",
            "field": "curso (não mude)",
            "start": "ano (não mude)",
            "end": "ano (não mude)",
            "desc": "descrição (pode ajustar ênfase)"
          }
        ],
        "skills": ["Lista de habilidades contendo os termos exigidos na vaga e as principais competências e diferenciais profissionais do candidato"],
        "languages": [],
        "certs": [
          {
            "title": "Nome do certificado ou projeto (não mude o nome do projeto)",
            "date": "ano (não mude)",
            "desc": "Para projetos práticos ou autorais, reescreva as realizações e bullets adaptando-as e inserindo palavras-chave relevantes da vaga de trabalho. Para certificados, adicione uma descrição detalhada do escopo do aprendizado conectado de forma estratégica à vaga."
          }
        ]
      }
    }

    DESCRIÇÃO DA VAGA:
    """
    ${jd}
    """

    CURRÍCULO ORIGINAL:
    """
    ${currentCvJson}
    """
  `;
  
  try {
    const rawResponse = await callGeminiAPI(prompt);
    
    let cleanJson = rawResponse.trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();
      
    const parsedData = JSON.parse(cleanJson);
    if (parsedData.optimizedCv) {
      normalizeCvData(parsedData.optimizedCv);
    }
    
    pendingChange = {
      type: "cv",
      index: null,
      originalText: `Resumo original:\n${appState.currentCvData.summary}\n\nHabilidades:\n${appState.currentCvData.skills.join(", ")}`,
      optimizedText: `Resumo otimizado:\n${parsedData.optimizedCv.summary}\n\nHabilidades otimizadas:\n${parsedData.optimizedCv.skills.join(", ")}`,
      explanation: parsedData.explanation,
      optimizedCv: parsedData.optimizedCv
    };
    
    
    document.getElementById("diff-original-content").innerText = pendingChange.originalText;
    document.getElementById("diff-optimized-content").innerText = pendingChange.optimizedText;
    document.getElementById("diff-explanation").innerHTML = parseMarkdownToHtml(parsedData.explanation);
    
    showModal("modal-diff");
    
  } catch (err) {
    showToast("Falha ao adaptar currículo: " + err.message, "danger");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.innerHTML = origHtml;
  }
}


let extractedPdfText = "";

function resetPDFImportModal() {
  extractedPdfText = "";
  document.getElementById("pdf-dropzone").classList.remove("hidden");
  document.getElementById("import-pdf-progress").classList.add("hidden");
  document.getElementById("import-alternative-text").classList.add("hidden");
  document.getElementById("btn-process-import").disabled = true;
  document.getElementById("btn-process-import").innerHTML = '<i data-lucide="sparkles"></i> Processar e Preencher';
  lucide.createIcons();
}

async function handlePdfUpload(file) {
  if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
    showToast("Por favor, envie apenas arquivos em formato PDF.", "warning");
    return;
  }
  
  const dropzone = document.getElementById("pdf-dropzone");
  const progressBox = document.getElementById("import-pdf-progress");
  const progressText = document.getElementById("import-progress-status");
  
  dropzone.classList.add("hidden");
  progressBox.classList.remove("hidden");
  progressText.innerText = "Abrindo o PDF...";
  
  try {
    const fileReader = new FileReader();
    
    fileReader.onload = async function() {
      try {
        const typedArray = new Uint8Array(this.result);
        progressText.innerText = "Lendo texto das páginas...";
        
        
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let textResult = "";
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          progressText.innerText = `Lendo página ${pageNum} de ${pdf.numPages}...`;
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          
          const pageText = textContent.items.map(item => item.str).join(" ");
          textResult += pageText + "\n\n";
        }
        
        extractedPdfText = textResult.trim();
        
        if (!extractedPdfText) {
          throw new Error("Não conseguimos extrair texto deste PDF. Ele pode ser uma imagem digitalizada.");
        }
        
        progressBox.classList.add("hidden");
        
        document.getElementById("raw-cv-text").value = extractedPdfText;
        showToast("Texto extraído do PDF com sucesso! Estruturando currículo...", "info");
        await processRawTextImport();
      } catch (err) {
        progressBox.classList.add("hidden");
        dropzone.classList.remove("hidden");
        showToast("Erro ao processar PDF: " + err.message, "danger");
      }
    };
    
    fileReader.readAsArrayBuffer(file);
    
  } catch (e) {
    progressBox.classList.add("hidden");
    dropzone.classList.remove("hidden");
    showToast("Erro ao ler o arquivo: " + e.message, "danger");
  }
}

function detectExistingIdentity(parsedData) {
  if (!parsedData) return null;
  const newEmail = (parsedData.email || "").trim().toLowerCase();
  
  const normalize = (str) => {
    return (str || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ");
  };

  const newName = normalize(parsedData.name);
  if (!newEmail && (!newName || newName.length < 4)) return null;

  const isNameMatch = (nameA, nameB) => {
    if (!nameA || !nameB) return false;
    if (nameA === nameB) return true;
    const partsA = nameA.split(" ").filter(p => p.length > 2);
    const partsB = nameB.split(" ").filter(p => p.length > 2);
    if (partsA.length >= 2 && partsB.length >= 2) {
      if (partsA[0] === partsB[0] && partsA[partsA.length - 1] === partsB[partsB.length - 1]) {
        return true;
      }
    }
    if (nameA.length >= 8 && nameB.length >= 8) {
      if (nameA.includes(nameB) || nameB.includes(nameA)) return true;
    }
    return false;
  };

  // 1. Check active CV if not sample test
  if (appState.currentCvData && appState.currentCvId !== "cv_joao_original") {
    const curEmail = (appState.currentCvData.email || "").trim().toLowerCase();
    const curName = normalize(appState.currentCvData.name);

    if (newEmail && curEmail && newEmail === curEmail) {
      return {
        id: appState.currentCvId,
        name: appState.currentCvName,
        data: appState.currentCvData,
        matchReason: `mesmo e-mail cadastrado (${newEmail})`
      };
    }
    if (isNameMatch(newName, curName)) {
      return {
        id: appState.currentCvId,
        name: appState.currentCvName,
        data: appState.currentCvData,
        matchReason: `mesmo titular (${parsedData.name})`
      };
    }
  }

  // 2. Check throughout library
  if (Array.isArray(appState.library)) {
    for (const cv of appState.library) {
      if (cv.id === "cv_joao_original") continue;
      const cvData = cv.data || {};
      const cvEmail = (cvData.email || "").trim().toLowerCase();
      const cvName = normalize(cvData.name || cv.name);

      if (newEmail && cvEmail && newEmail === cvEmail) {
        return {
          id: cv.id,
          name: cv.name,
          data: cvData,
          matchReason: `mesmo e-mail cadastrado (${newEmail})`
        };
      }
      if (isNameMatch(newName, cvName)) {
        return {
          id: cv.id,
          name: cv.name,
          data: cvData,
          matchReason: `mesmo titular (${parsedData.name})`
        };
      }
    }
  }

  return null;
}

function mergeCvDataIntelligently(existing, incoming) {
  if (!existing || typeof existing !== "object") return incoming;
  if (!incoming || typeof incoming !== "object") return existing;

  const result = JSON.parse(JSON.stringify(existing));

  // 1. Contact / Core Header fields: fill if missing/empty
  const contactFields = ["name", "title", "email", "phone", "location", "linkedin", "github", "website"];
  contactFields.forEach(field => {
    if (!result[field] || String(result[field]).trim() === "") {
      if (incoming[field] && String(incoming[field]).trim() !== "") {
        result[field] = String(incoming[field]).trim();
      }
    }
  });

  // 2. Professional Summary
  const curSummary = (result.summary || "").trim();
  const incSummary = (incoming.summary || "").trim();
  if (!curSummary && incSummary) {
    result.summary = incSummary;
  } else if (curSummary.length < 60 && incSummary.length >= 60) {
    result.summary = incSummary;
  }

  // 3. Work Experiences: Deduplicate by company & role, enrich descriptions, append new ones
  result.experiences = Array.isArray(result.experiences) ? result.experiences : [];
  const incExps = Array.isArray(incoming.experiences) ? incoming.experiences : [];

  const norm = (s) => toPlainText(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

  incExps.forEach(newExp => {
    const newComp = norm(newExp.company);
    const newRole = norm(newExp.role);

    const match = result.experiences.find(exp => {
      const eComp = norm(exp.company);
      const eRole = norm(exp.role);
      const compMatch = newComp && eComp && (newComp === eComp || newComp.includes(eComp) || eComp.includes(newComp));
      const roleMatch = newRole && eRole && (newRole === eRole || newRole.includes(eRole) || eRole.includes(newRole));
      return compMatch && roleMatch;
    });

    if (match) {
      if (!match.start && newExp.start) match.start = newExp.start;
      if (!match.end && newExp.end) match.end = newExp.end;

      if (!match.desc && newExp.desc) {
        match.desc = newExp.desc;
      } else if (toPlainText(newExp.desc).length > toPlainText(match.desc).length + 30) {
        match.desc = newExp.desc;
      }
    } else {
      result.experiences.push(JSON.parse(JSON.stringify(newExp)));
    }
  });

  // 4. Educations: Deduplicate by institution & field/degree
  result.educations = Array.isArray(result.educations) ? result.educations : [];
  const incEdus = Array.isArray(incoming.educations) ? incoming.educations : [];

  incEdus.forEach(newEdu => {
    const newInst = norm(newEdu.institution);
    const newField = norm(newEdu.field);

    const match = result.educations.find(edu => {
      const eInst = norm(edu.institution);
      const eField = norm(edu.field);
      return (newInst && eInst && (newInst === eInst || newInst.includes(eInst) || eInst.includes(newInst))) ||
             (newField && eField && newField === eField);
    });

    if (match) {
      if (!match.degree && newEdu.degree) match.degree = newEdu.degree;
      if (!match.field && newEdu.field) match.field = newEdu.field;
      if (!match.start && newEdu.start) match.start = newEdu.start;
      if (!match.end && newEdu.end) match.end = newEdu.end;
      if (!match.desc && newEdu.desc) match.desc = newEdu.desc;
    } else {
      result.educations.push(JSON.parse(JSON.stringify(newEdu)));
    }
  });

  // 5. Skills: Deduplicated set union
  result.skills = Array.isArray(result.skills) ? result.skills : [];
  const incSkills = Array.isArray(incoming.skills) ? incoming.skills : [];
  const existingSkillSet = new Set(result.skills.map(s => String(s).trim().toLowerCase()));

  incSkills.forEach(s => {
    const raw = String(s).trim();
    const key = raw.toLowerCase();
    if (key && !existingSkillSet.has(key)) {
      result.skills.push(raw);
      existingSkillSet.add(key);
    }
  });

  // 6. Languages: Deduplicate by name
  result.languages = Array.isArray(result.languages) ? result.languages : [];
  const incLangs = Array.isArray(incoming.languages) ? incoming.languages : [];

  incLangs.forEach(newL => {
    const newName = norm(newL.name);
    const match = result.languages.find(l => norm(l.name) === newName);
    if (!match) {
      result.languages.push(JSON.parse(JSON.stringify(newL)));
    } else if (!match.level && newL.level) {
      match.level = newL.level;
    }
  });

  // 7. Certifications & Projects: Deduplicate by title
  result.certs = Array.isArray(result.certs) ? result.certs : [];
  const incCerts = Array.isArray(incoming.certs) ? incoming.certs : [];

  incCerts.forEach(newC => {
    const newTitle = norm(newC.title);
    const match = result.certs.find(c => norm(c.title) === newTitle);
    if (!match) {
      result.certs.push(JSON.parse(JSON.stringify(newC)));
    } else {
      if (!match.desc && newC.desc) match.desc = newC.desc;
      if ((!match.date || match.date === "N/A") && newC.date && newC.date !== "N/A") match.date = newC.date;
    }
  });

  normalizeCvData(result);
  return result;
}

async function optimizeEntireCvWithAI() {
  const hasOwnKey = !!appState.geminiKey;
  const isLogged = !!appState.googleToken;
  if (!hasOwnKey && !isLogged) {
    showModal("modal-login-required");
    return;
  }

  const btn = document.getElementById("btn-optimize-full-cv");
  const origHtml = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" style="width: 12px; height: 12px; display: inline-block;"></span> IA Otimizando...';
  }

  const cv = appState.currentCvData;

  const prompt = `
    Você é um especialista em recrutamento executivo e engenharia de currículos compatíveis com sistemas ATS (Applicant Tracking Systems).
    Sua missão é aprimorar o currículo abaixo para o mais alto padrão executivo do mercado de trabalho brasileiro (pt-BR).

    DIRETRIZES DE EXCELÊNCIA OBRIGATÓRIAS:
    1. PRESERVAÇÃO DE FATOS: Preserve 100% de empresas, datas, instituições de ensino, cargos reais e dados de contato. Jamais invente experiências inexistentes.
    2. RESUMO PROFISSIONAL DE ALTO IMPACTO:
       - Estruture um resumo executivo objetivo de 3 a 5 linhas destacando competências fundamentais, área de atuação e proposta de valor.
    3. EXPERIÊNCIAS E METODOLOGIA STAR:
       - Reescreva os bullet points de cada experiência profissional no padrão STAR (Situação, Tarefa, Ação e Resultado).
       - Inicie cada bullet com verbos fortes de ação no pretérito perfeito (Desenvolvi, Liderei, Automatizei, Otimizei, Implementei, Estruturei, Reduzi, Projetei).
       - Destaque métricas, volumes e tecnologias reais identificadas no contexto.
    4. HABILIDADES TÉCNICAS E PROJETOS:
       - Mantenha e consolide a lista de habilidades, eliminando repetições.
       - Preserve todos os projetos e certificações existentes na chave "certs".
    5. IDIOMA 100% PORTUGUÊS DO BRASIL:
       - Termos acadêmicos em inglês devem ser traduzidos para a nomenclatura oficial brasileira (ex: Bacharelado em Engenharia de Computação).
       - As datas devem estar em português (ex: Jan 2023 - Presente).
    6. RETORNO OBRIGATÓRIO EM JSON:
       - Retorne APENAS um JSON válido contendo exatamente as chaves abaixo:
       {
         "explanation": "Explicação pedagógica e clara das otimizações realizadas...",
         "optimizedCv": {
           "name": "${cv.name || ""}",
           "title": "${cv.title || ""}",
           "email": "${cv.email || ""}",
           "phone": "${cv.phone || ""}",
           "location": "${cv.location || ""}",
           "linkedin": "${cv.linkedin || ""}",
           "github": "${cv.github || ""}",
           "website": "${cv.website || ""}",
           "summary": "...",
           "experiences": [
             {
               "company": "...",
               "role": "...",
               "start": "...",
               "end": "...",
               "desc": "..."
             }
           ],
           "educations": [
             {
               "institution": "...",
               "degree": "...",
               "field": "...",
               "start": "...",
               "end": "...",
               "desc": "..."
             }
           ],
           "skills": ["..."],
           "languages": [
             {
               "name": "...",
               "level": "..."
             }
           ],
           "certs": [
             {
               "title": "...",
               "date": "...",
               "desc": "..."
             }
           ]
         }
       }

    DADOS ATUAIS DO CURRÍCULO:
    ${JSON.stringify(cv, null, 2)}
  `;

  try {
    const rawResponse = await callGeminiAPI(prompt);
    let cleanJson = rawResponse.trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    const parsedData = JSON.parse(cleanJson);
    if (!parsedData.optimizedCv) {
      throw new Error("Formato de resposta inválido retornado pela IA.");
    }

    normalizeCvData(parsedData.optimizedCv);

    const origSummary = cv.summary || "Sem resumo definido.";
    const optSummary = parsedData.optimizedCv.summary || "";

    const origExps = (cv.experiences || []).map(e => `[${e.role} @ ${e.company}]\n${e.desc || ""}`).join("\n\n");
    const optExps = (parsedData.optimizedCv.experiences || []).map(e => `[${e.role} @ ${e.company}]\n${e.desc || ""}`).join("\n\n");

    pendingChange = {
      type: "cv",
      index: null,
      originalText: `=== RESUMO PROFISSIONAL ===\n${origSummary}\n\n=== EXPERIÊNCIAS ===\n${origExps}`,
      optimizedText: `=== RESUMO OTIMIZADO ===\n${optSummary}\n\n=== EXPERIÊNCIAS OTIMIZADAS (MÉTODO STAR) ===\n${optExps}`,
      explanation: parsedData.explanation || "Estruturação aprimorada com verbos de ação STAR, resumo executivo de alta conversão e padronização ATS.",
      optimizedCv: parsedData.optimizedCv
    };

    document.getElementById("diff-original-content").innerText = pendingChange.originalText;
    document.getElementById("diff-optimized-content").innerText = pendingChange.optimizedText;
    document.getElementById("diff-explanation").innerHTML = parseMarkdownToHtml(pendingChange.explanation);

    showModal("modal-diff");

  } catch (err) {
    showToast("Erro ao otimizar currículo com IA: " + err.message, "danger");
    console.error(err);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

async function processRawTextImport() {
  const text = document.getElementById("raw-cv-text").value.trim();
  if (!text) {
    showToast("Nenhum texto para processar.", "warning");
    return;
  }
  
  const btn = document.getElementById("btn-process-import");
  const origHtml = btn.innerHTML;
  btn.disabled = true;
  
  const hasOwnKey = !!appState.geminiKey;
  const isLogged = !!appState.googleToken;
  const canUseAi = hasOwnKey || isLogged;
  
  if (!canUseAi) {
    btn.innerHTML = '<span class="spinner" style="width: 12px; height: 12px; display: inline-block;"></span> Processando...';
    
    setTimeout(() => {
      fallbackRegexParse(text);
      btn.disabled = false;
      btn.innerHTML = origHtml;
      closeAllModals();
      switchView("editor");
      showToast("Preenchimento básico concluído. Para melhor resultado com Inteligência Artificial, faça login com o Google!", "warning");
    }, 1500);
    return;
  }
  
  btn.innerHTML = '<span class="spinner" style="width: 12px; height: 12px; display: inline-block;"></span> IA Estruturando...';
  
  const prompt = `
    Você é uma API de inteligência artificial de alta precisão e determinística especializada em parsing, auditoria e estruturação de currículos profissionais de alto impacto.
    Sua tarefa é analisar o texto desestruturado de um currículo e preencher um objeto JSON perfeitamente formatado.
    
    DIRETRIZES DE ANCORAGEM DETERMINÍSTICA:
    1. Toda e qualquer informação deve ser extraída única e exclusivamente a partir dos fatos, datas e dados explicitamente presentes no texto fornecido. Se um dado não estiver registrado ali, trate-o como INEXISTENTE (NULO).
    2. Jamais deduza, invente ou alucine cursos, certificados, empresas ou competências que não estejam presentes no texto original.
    3. Identifique as seções principais: Dados de Contato, Resumo Profissional, Experiência Profissional, Educação, Habilidades, Idiomas, e Certificados/Projetos.
    4. RESUMO PROFISSIONAL: Caso o currículo original não possua um resumo ou tenha um resumo fraco, estruture um resumo objetivo de 3 a 5 linhas baseado estritamente na área e experiências informadas no texto.
    5. EXPERIÊNCIA PROFISSIONAL: Estruture os bullets das experiências usando verbos de ação fortes no início (Desenvolvi, Liderei, Reduzi, Otimizei, Automatizei), mantendo métricas originais quando presentes.
    6. PROJETOS AUTORAIS E CERTIFICADOS: Na chave "certs", extraia TODOS os Certificados, Cursos Livres e Projetos de Software/Automação/Engenharia listados no texto (sistemas internos, ferramentas, plataformas, repositórios). Se for um projeto, coloque o nome do projeto em 'title', ano ou período em 'date', e na descrição 'desc' detalhe as tecnologias utilizadas e o impacto real.
    7. LOCALIZAÇÃO E IDIOMA OBRIGATÓRIO (PORTUGUÊS DO BRASIL): O resultado JSON deve estar 100% em Português do Brasil (pt-BR). Se o texto original extraído de PDFs ou do LinkedIn contiver termos acadêmicos em inglês padrão da plataforma (como 'Computer Engineering', 'Computer Science', 'Software Engineering', 'Bachelor', etc.), converta-os obrigatoriamente para a nomenclatura brasileira ('Engenharia de Computação', 'Ciência da Computação', 'Engenharia de Software', 'Bacharelado', etc.). As datas devem estar em português (ex: Jan 2021, Presente).
    8. Retorne APENAS um objeto JSON válido contendo exatamente as chaves abaixo. Não inclua markdown, aspas extras fora do JSON, ou qualquer texto adicional.

    Estrutura do JSON obrigatório:
    {
      "name": "Nome Completo encontrado",
      "title": "Cargo principal do candidato",
      "email": "E-mail de contato",
      "phone": "Telefone de contato",
      "location": "Localização/Cidade",
      "linkedin": "Linkedin URL ou username",
      "github": "Github URL ou username",
      "website": "Site pessoal ou portfólio",
      "summary": "Resumo profissional de 3 a 5 linhas baseado estritamente no texto fornecido.",
      "experiences": [
        {
          "company": "Nome da Empresa",
          "role": "Cargo ocupado",
          "start": "Mês/Ano início",
          "end": "Mês/Ano fim ou Presente",
          "desc": "Bullet-points das realizações baseadas em verbos de ação separados por novas linhas (\\n)"
        }
      ],
      "educations": [
        {
          "institution": "Nome da Escola/Faculdade",
          "degree": "Grau (Bacharel, Mestrado, Curso)",
          "field": "Curso/Área",
          "start": "Ano início",
          "end": "Ano fim"
        }
      ],
      "skills": ["Lista de habilidades presentes no texto"],
      "languages": [
        {
          "name": "Idioma",
          "level": "Nível de proficiência"
        }
      ],
      "certs": [
        {
          "title": "Nome do certificado ou do projeto",
          "date": "Ano de conclusão ou N/A",
          "desc": "Instituição emissora ou descrição do projeto"
        }
      ]
    }

    TEXTO DO CURRÍCULO:
    """
    ${text}
    """
  `;
  
  try {
    const rawResponse = await callGeminiAPI(prompt);
    
    let cleanJson = rawResponse.trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();
      
    const parsedData = JSON.parse(cleanJson);
    normalizeCvData(parsedData);
    
    // Check if imported CV matches an existing identity in library or active state
    const matchingCv = detectExistingIdentity(parsedData);
    if (matchingCv) {
      appState.pendingImportData = parsedData;
      appState.pendingMergeTarget = matchingCv;

      const elDetected = document.getElementById("merge-detected-name");
      const elReason = document.getElementById("merge-match-reason");
      const elTarget = document.getElementById("merge-target-cv-name");
      if (elDetected) elDetected.innerText = parsedData.name || "Candidato";
      if (elReason) elReason.innerText = matchingCv.matchReason;
      if (elTarget) elTarget.innerText = matchingCv.name;

      closeAllModals();
      showModal("modal-identity-merge");
      return;
    }

    const createdId = createNewCv(`Importado - ${parsedData.name || "Sem Nome"}`);
    if (!createdId) {
      return;
    }
    
    appState.currentCvData = parsedData;
    
    saveActiveCvStateToLibrary();
    fillFormFromState();
    renderCv();
    
    closeAllModals();
    switchView("editor");
    showToast("Currículo importado e estruturado pela IA com sucesso!", "success");
    
  } catch (err) {
    showToast("Falha ao analisar currículo com IA: " + err.message, "danger");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.innerHTML = origHtml;
  }
}


function fallbackRegexParse(text) {
  const data = JSON.parse(JSON.stringify(DEFAULT_CV_DATA)); 
  
  data.experiences = [];
  data.educations = [];
  data.skills = [];
  data.languages = [];
  data.certs = [];
  
  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  
  if (lines.length > 0) data.name = lines[0];
  if (lines.length > 1) data.title = lines[1];
  
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) data.email = emailMatch[1];
  
  const phoneMatch = text.match(/(\(?\d{2}\)?\s?\d{4,5}[-.\s]?\d{4})/);
  if (phoneMatch) data.phone = phoneMatch[1];
  
  data.summary = text.slice(0, 400) + "... (Texto importado manualmente. Ative sua chave IA para estruturação perfeita)";
  
  data.experiences.push({
    company: "Empresa Importada",
    role: data.title || "Cargo",
    start: "",
    end: "",
    desc: text.slice(0, 1000)
  });
  
  normalizeCvData(data);

  // Check identity match even in fallback mode
  const matchingCv = detectExistingIdentity(data);
  if (matchingCv) {
    appState.pendingImportData = data;
    appState.pendingMergeTarget = matchingCv;

    const elDetected = document.getElementById("merge-detected-name");
    const elReason = document.getElementById("merge-match-reason");
    const elTarget = document.getElementById("merge-target-cv-name");
    if (elDetected) elDetected.innerText = data.name || "Candidato";
    if (elReason) elReason.innerText = matchingCv.matchReason;
    if (elTarget) elTarget.innerText = matchingCv.name;

    closeAllModals();
    showModal("modal-identity-merge");
    return;
  }

  createNewCv("Importado Manualmente", true);
  appState.currentCvData = data;
  saveActiveCvStateToLibrary();
  fillFormFromState();
  renderCv();
  
  showToast("Currículo carregado! Como você está sem Chave do Gemini, colamos o texto na área de Experiências para ajuste manual.", "warning");
}



let linkedinImages = []; 

function handleLinkedinImageUploads(files) {
  const container = document.getElementById("linkedin-previews-container");
  const list = document.getElementById("linkedin-images-list");
  const btnAnalyze = document.getElementById("btn-analyze-linkedin");
  
  
  if (linkedinImages.length >= 3) {
    showToast("Você pode carregar no máximo 3 capturas de tela.", "warning");
    return;
  }

  Array.from(files).forEach(file => {
    if (!file.type.startsWith("image/")) {
      showToast("Apenas imagens são permitidas para análise do LinkedIn.", "warning");
      return;
    }
    if (linkedinImages.length >= 3) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      linkedinImages.push({
        name: file.name,
        type: file.type,
        dataUrl: e.target.result
      });
      
      
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      
      const img = document.createElement("img");
      img.src = e.target.result;
      img.title = file.name;
      
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = "&times;";
      removeBtn.style.position = "absolute";
      removeBtn.style.top = "-4px";
      removeBtn.style.right = "-4px";
      removeBtn.style.backgroundColor = "var(--ui-danger)";
      removeBtn.style.color = "white";
      removeBtn.style.border = "none";
      removeBtn.style.borderRadius = "50%";
      removeBtn.style.width = "18px";
      removeBtn.style.height = "18px";
      removeBtn.style.cursor = "pointer";
      removeBtn.style.display = "flex";
      removeBtn.style.alignItems = "center";
      removeBtn.style.justifyContent = "center";
      removeBtn.style.fontSize = "12px";
      
      const index = linkedinImages.length - 1;
      removeBtn.addEventListener("click", () => {
        linkedinImages.splice(index, 1);
        wrapper.remove();
        if (linkedinImages.length === 0) {
          container.classList.add("hidden");
          btnAnalyze.disabled = true;
        }
      });
      
      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      list.appendChild(wrapper);
      
      container.classList.remove("hidden");
      btnAnalyze.disabled = false;
    };
    reader.readAsDataURL(file);
  });
}

async function analyzeLinkedinWithAI() {
  if (linkedinImages.length === 0) {
    showToast("Carregue pelo menos uma captura de tela do seu LinkedIn.", "warning");
    return;
  }

  const btn = document.getElementById("btn-analyze-linkedin");
  const origText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="width: 14px; height: 14px; display: inline-block;"></span> Enviando Imagens...';

  const cv = appState.currentCvData;
  const cvContext = `
    DADOS DO CURRÍCULO ATUAL DO CANDIDATO PARA REFERÊNCIA E SUGESTÕES DE REDAÇÃO PERSONALIZADAS:
    Nome: ${cv.name || "Não informado"}
    Cargo Principal: ${cv.title || "Não informado"}
    Resumo Profissional: ${cv.summary || "Não informado"}
    Habilidades: ${cv.skills ? cv.skills.join(", ") : "Não informado"}
    Experiência Profissional:
    ${cv.experiences ? cv.experiences.map(e => `- ${e.role} na empresa ${e.company}: ${e.desc}`).join("\n") : "Não informada"}
  `;

  
  const parts = [
    {
      text: `
        Você é um especialista sênior em marcas pessoais e recrutamento executivo no LinkedIn.
        Analise a(s) captura(s) de tela do perfil do LinkedIn fornecida(s) e gere um relatório detalhado de melhoria com alto impacto visual.
        
        Use o seguinte contexto do currículo atual do candidato para criar exemplos e sugestões de reescrita exatas, sob medida para a carreira dele:
        \"\"\"
        ${cvContext}
        \"\"\"

        Você deve retornar a resposta OBRIGATORIAMENTE como um código HTML limpo, estruturado exatamente com o seguinte layout de classes CSS premium (escreva cada tag HTML em uma nova linha para garantir a renderização):
        
        <div class="analysis-report-container">
          <div class="analysis-header">
            <div class="analysis-logo-wrapper">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#ffffff"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </div>
            <div class="analysis-header-text">
              <h3>Relatório de Auditoria do LinkedIn</h3>
              <span>Análise multimodal realizada com sucesso por IA</span>
            </div>
          </div>
          
          <p class="analysis-card-text">Olá, [Nome do Candidato]! [Breve introdução motivadora e focada nos diferenciais dele, como projetos autorais, liderança ou infraestrutura/desenvolvimento, conforme a trajetória real dele].</p>
          
          <!-- CARD 1: TITULO -->
          <div class="analysis-card">
            <div class="analysis-card-header">
              <span class="analysis-badge">Seção 1: Título Profissional</span>
              <span class="analysis-priority high">⚠️ Prioridade Alta</span>
            </div>
            <h4 class="analysis-card-title">Headline do Perfil (Título)</h4>
            <p class="analysis-card-text">[Explicação sucinta sobre o título atual do candidato e o que precisa melhorar]</p>
            <div class="analysis-suggestions-container">
              <div class="analysis-suggestion-item">
                <span>Sugestão 1 (Foco Técnico)</span>
                <div class="analysis-suggestion-val">[Sugestão completa e adaptada ao currículo do candidato para copiar]</div>
              </div>
              <div class="analysis-suggestion-item success">
                <span>Sugestão 2 (Mais Ampla)</span>
                <div class="analysis-suggestion-val">[Sugestão alternativa completa de título para copiar]</div>
              </div>
            </div>
          </div>
          
          <!-- CARD 2: SOBRE -->
          <div class="analysis-card">
            <div class="analysis-card-header">
              <span class="analysis-badge sobre">Seção 2: Resumo Profissional</span>
              <span class="analysis-priority info">🚀 Recomendado</span>
            </div>
            <h4 class="analysis-card-title">Seção "Sobre" (Storytelling)</h4>
            <p class="analysis-card-text">[Explique como estruturar a seção "Sobre" usando narrativa corporativa e storytelling]</p>
            <div class="analysis-copy-box">
              <div class="analysis-copy-box-header">
                <span class="filename">sugestao_sobre_linkedin.txt</span>
                <span class="badge">Pronto para Copiar</span>
              </div>
              <div class="analysis-copy-box-body">[Escreva o texto completo do resumo profissional sugerido para a seção Sobre do LinkedIn dele, pronto para copiar, integrando as principais conquistas e competências dele de forma profissional]</div>
            </div>
            <p class="analysis-footnote">Nota: Esta é uma sugestão personalizada com base no seu perfil atual para agilizar seu ajuste, que você pode refinar conforme seu gosto pessoal.</p>
          </div>
          
          <!-- GRID CONTAINER -->
          <div class="analysis-grid-container">
            <!-- CARD 3: VISUAL -->
            <div class="analysis-card">
              <div class="analysis-card-header">
                <span class="analysis-badge visual">Seção 3: Visual</span>
              </div>
              <h4 class="analysis-card-title">Foto e Banner de Fundo</h4>
              <ul class="analysis-bullet-list">
                <li><strong>Foto de Perfil:</strong> [Análise da foto do candidato baseado na imagem fornecida e dicas práticas de iluminação e roupas]</li>
                <li><strong>Banner de Fundo:</strong> [Ideias de design para o banner de fundo do LinkedIn dele que combinem com a carreira dele]</li>
              </ul>
            </div>
            
            <!-- CARD 4: HABILIDADES -->
            <div class="analysis-card">
              <div class="analysis-card-header">
                <span class="analysis-badge habilidades">Seção 4: Habilidades</span>
              </div>
              <h4 class="analysis-card-title">Palavras-Chave de Destaque</h4>
              <div class="analysis-tag-list">
                <!-- Adicione de 5 a 8 tags de habilidades principais recomendadas baseadas no currículo dele -->
                <span class="analysis-tag">+ [Habilidade 1]</span>
                <span class="analysis-tag">+ [Habilidade 2]</span>
                <span class="analysis-tag">+ [Habilidade 3]</span>
                <span class="analysis-tag">+ [Habilidade 4]</span>
                <span class="analysis-tag">+ [Habilidade 5]</span>
              </div>
              <p class="analysis-footnote">* Destaque estes termos no seu perfil para melhorar a busca algorítmica.</p>
            </div>
          </div>
        </div>
        
        Não inclua blocos de código markdown (como \`\`\`html) no início ou no fim. Retorne apenas o código HTML bruto estruturado acima.
      `
    }
  ];

  linkedinImages.forEach(img => {
    const base64Data = img.dataUrl.split(",")[1];
    parts.push({
      inlineData: {
        mimeType: img.type,
        data: base64Data
      }
    });
  });

  const url = `/api/gemini?model=${appState.geminiModel}`;
  
  const payload = {
    contents: [{
      parts: parts
    }],
    generationConfig: {
      temperature: 0.3
    }
  };

  const headers = {
    "Content-Type": "application/json"
  };

  if (appState.geminiKey) {
    headers["x-goog-api-key"] = appState.geminiKey;
  } else {
    
    
    const isTestCv = appState.currentCvId === "cv_joao_original";
    if (!isTestCv && !appState.googleToken) {
      showToast("Faça login com o Google (no topo da página) para usar a IA no seu próprio currículo.", "warning");
      btn.disabled = false;
      btn.innerHTML = origText;
      return;
    }
    
    if (appState.googleToken) {
      headers["Authorization"] = `Bearer ${appState.googleToken}`;
    }
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || response.statusText);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!resultText) {
      throw new Error("Não recebemos retorno do Gemini. Certifique-se de usar o modelo Gemini 2.5 Flash.");
    }

    const cleanHtml = parseMarkdownToHtml(resultText);

    document.getElementById("linkedin-analysis-content").innerHTML = cleanHtml;
    document.getElementById("linkedin-results-box").classList.remove("hidden");
    showToast("Análise do LinkedIn concluída com sucesso!", "success");
    
  } catch (err) {
    showToast("Erro na análise do LinkedIn: " + err.message, "danger");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.innerHTML = origText;
  }
}


function applyPendingDiff() {
  if (!pendingChange) return;

  const { type, index, optimizedText, optimizedCv, labelName } = pendingChange;
  
  if (type === "summary") {
    document.getElementById("personal-summary").value = optimizedText;
    appState.currentCvData.summary = optimizedText;
    showToast("Resumo Profissional otimizado e aplicado!", "success");
    
  } else if (type.startsWith("experience-")) {
    appState.currentCvData.experiences[index].desc = optimizedText;
    renderExperienceForm();
    showToast("Experiência profissional otimizada e aplicada!", "success");
    
  } else if (type === "cv") {
    
    if (appState.currentCvName.endsWith(" (Otimizado)")) {
      appState.currentCvData = optimizedCv;
      fillFormFromState();
      runLocalATSAnalysis(); 
      showToast("Currículo otimizado atualizado com sucesso!", "success");
    } else {
      
      const optimizedName = appState.currentCvName + " (Otimizado)";
      const existingOptimized = appState.library.find(c => c.name === optimizedName);
      
      if (existingOptimized) {
        
        existingOptimized.data = optimizedCv;
        existingOptimized.lastModified = new Date().toISOString();
        
        
        appState.currentCvId = existingOptimized.id;
        appState.currentCvName = existingOptimized.name;
        appState.currentCvData = JSON.parse(JSON.stringify(existingOptimized.data));
        
        
        document.getElementById("input-cv-name").value = appState.currentCvName;
        document.getElementById("select-template").value = existingOptimized.template || "classic";
        
        fillFormFromState();
        runLocalATSAnalysis();
        showToast("Versão otimizada existente atualizada com sucesso!", "success");
      } else {
        
        const newId = "cv_" + Date.now() + "_optimized";
        const newCv = {
          id: newId,
          name: optimizedName,
          lastModified: new Date().toISOString(),
          template: document.getElementById("select-template").value,
          data: optimizedCv
        };
        appState.library.push(newCv);
        
        
        appState.currentCvId = newId;
        appState.currentCvName = optimizedName;
        appState.currentCvData = JSON.parse(JSON.stringify(optimizedCv));
        
        
        document.getElementById("input-cv-name").value = appState.currentCvName;
        
        fillFormFromState();
        runLocalATSAnalysis();
        showToast("Nova versão otimizada criada na Biblioteca!", "success");
      }
    }
  }

  saveActiveCvStateToLibrary();
  renderCv();
  closeAllModals();
  pendingChange = null;
}

function discardPendingDiff() {
  closeAllModals();
  showToast("Alterações de IA descartadas.", "warning");
  pendingChange = null;
}





function parseCSV(text) {
  const result = [];
  let row = [];
  let col = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i+1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        col += '"'; 
        i++;
      } else {
        inQuotes = !inQuotes; 
      }
    } else if (char === ',' && !inQuotes) {
      row.push(col.trim());
      col = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(col.trim());
      result.push(row);
      row = [];
      col = '';
    } else {
      col += char;
    }
  }
  if (col || row.length > 0) {
    row.push(col.trim());
    result.push(row);
  }
  return result;
}

function handleLinkedinCsvUploads(files) {
  const list = document.getElementById("linkedin-csv-imported-list");
  const container = document.getElementById("linkedin-csv-imported-container");
  
  const filesArray = Array.from(files);
  const zipFile = filesArray.find(f => f.name.endsWith(".zip") || f.name.endsWith(".zip.zip"));
  
  const dropzone = document.getElementById("linkedin-csv-dropzone");
  const origContent = dropzone.innerHTML;
  
  const setStatus = (text) => {
    dropzone.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; gap: 8px;">
        <span class="spinner" style="width: 24px; height: 24px; border-width: 3px; border-color: var(--ui-success) transparent var(--ui-success) transparent; margin-bottom: 8px; display: inline-block;"></span>
        <p style="font-weight: 500; font-size: 0.85rem; color: #fff; margin: 0;">${text}</p>
      </div>
    `;
  };
  
  const resetDropzone = () => {
    dropzone.innerHTML = origContent;
    lucide.createIcons();
  };

  const showSuccessDropzone = (fileName) => {
    dropzone.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; gap: 6px;">
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="var(--ui-success)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 4px; filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4));"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <p style="font-weight: 600; font-size: 0.85rem; color: #fff; margin: 0; word-break: break-all;">${fileName}</p>
        <span style="color: var(--ui-success); font-size: 0.78rem; font-weight: 600; margin-bottom: 8px;">Importado com Sucesso!</span>
        
        <div style="display: flex; gap: 10px; margin-top: 4px; margin-bottom: 6px;">
          <button type="button" id="btn-goto-preview" style="background: var(--ui-success); border: none; color: #fff; font-size: 0.75rem; padding: 6px 14px; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: opacity 0.2s;">Ver Currículo</button>
          <button type="button" id="btn-goto-ats" style="background: rgba(255,255,255,0.08); border: 1px solid var(--ui-border); color: #fff; font-size: 0.75rem; padding: 6px 14px; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; transition: background 0.2s;">Otimizar ATS</button>
        </div>
        
        <button type="button" id="btn-clear-linkedin-upload" style="background: none; border: none; color: var(--ui-text-muted); font-size: 0.72rem; text-decoration: underline; margin-top: 8px; cursor: pointer; transition: color 0.2s;">Carregar outro arquivo</button>
      </div>
    `;
    lucide.createIcons();
    
    
    const btnGotoPreview = document.getElementById("btn-goto-preview");
    if (btnGotoPreview) {
      btnGotoPreview.addEventListener("click", (e) => {
        e.stopPropagation();
        switchView("cv-preview");
      });
      btnGotoPreview.addEventListener("mouseover", () => btnGotoPreview.style.opacity = "0.9");
      btnGotoPreview.addEventListener("mouseout", () => btnGotoPreview.style.opacity = "1");
    }
    
    const btnGotoAts = document.getElementById("btn-goto-ats");
    if (btnGotoAts) {
      btnGotoAts.addEventListener("click", (e) => {
        e.stopPropagation();
        switchView("ats-optimizer");
        
        
        const jd = document.getElementById("ats-job-description").value.trim();
        if (jd) {
          setTimeout(() => {
            runLocalATSAnalysis();
          }, 300); 
        } else {
          showToast("Dica: Cole a descrição da vaga na caixa de texto abaixo para calcular o Score!", "info");
        }
      });
      btnGotoAts.addEventListener("mouseover", () => btnGotoAts.style.background = "rgba(255,255,255,0.12)");
      btnGotoAts.addEventListener("mouseout", () => btnGotoAts.style.background = "rgba(255,255,255,0.08)");
    }
    
    
    const clearBtn = document.getElementById("btn-clear-linkedin-upload");
    if (clearBtn) {
      clearBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        resetDropzone();
      });
      clearBtn.addEventListener("mouseover", () => clearBtn.style.color = "#fff");
      clearBtn.addEventListener("mouseout", () => clearBtn.style.color = "var(--ui-text-muted)");
    }
  };

  if (zipFile) {
    if (typeof JSZip === "undefined") {
      setStatus("Carregando descompactador... Por favor, aguarde.");
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.onload = () => processZipFile(zipFile);
      document.head.appendChild(script);
      return;
    }
    processZipFile(zipFile);
    return;
  }
  
  
  const addVisualItem = (name, count) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "8px";
    li.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
    li.style.border = "1px solid rgba(16, 185, 129, 0.15)";
    li.style.padding = "8px 12px";
    li.style.borderRadius = "var(--radius-sm)";
    li.style.marginBottom = "6px";
    li.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--ui-success)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span style="font-weight: 500;">${name}</span>
      <span style="color: var(--ui-text-muted); font-size: 0.78rem;">(${count} registros mesclados)</span>
    `;
    list.appendChild(li);
    container.classList.remove("hidden");
  };

  async function processZipFile(file) {
    try {
      setStatus("Lendo arquivo ZIP do LinkedIn...");
      const zip = await JSZip.loadAsync(file);
      const csvEntries = [];
      zip.forEach((path, entry) => {
        if (entry.name.endsWith(".csv") && !entry.dir) {
          csvEntries.push(entry);
        }
      });
      
      if (csvEntries.length === 0) {
        showToast("Nenhum arquivo CSV encontrado dentro do ZIP.", "warning");
        resetDropzone();
        return;
      }
      
      let importedAny = false;
      
      
      csvEntries.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA.includes("profile") && !nameB.includes("profile")) return -1;
        if (!nameA.includes("profile") && nameB.includes("profile")) return 1;
        return 0;
      });
      
      for (const entry of csvEntries) {
        const name = entry.name.split("/").pop();
        setStatus(`Extraindo e lendo ${name}...`);
        
        
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const text = await entry.async("text");
        try {
          const parsed = parseCSV(text);
          if (parsed.length <= 1) continue;
          
          const nameLower = name.toLowerCase();
          let count = 0;
          
          if (nameLower.includes("profile")) {
            count = mergeLinkedinProfileCsv(parsed);
          } else if (nameLower.includes("positions")) {
            count = mergeLinkedinPositionsCsv(parsed);
          } else if (nameLower.includes("education")) {
            count = mergeLinkedinEducationCsv(parsed);
          } else if (nameLower.includes("skills")) {
            count = mergeLinkedinSkillsCsv(parsed);
          } else if (nameLower.includes("certifications")) {
            count = mergeLinkedinCertificationsCsv(parsed);
          } else if (nameLower.includes("projects")) {
            count = mergeLinkedinProjectsCsv(parsed);
          }
          
          if (count > 0) {
            importedAny = true;
            addVisualItem(name, count);
          }
        } catch (e) {
          console.warn(`Erro no CSV do ZIP (${name}):`, e);
        }
      }
      
      if (importedAny) {
        setStatus("Finalizando e atualizando currículo...");
        await new Promise(resolve => setTimeout(resolve, 200));
        
        refineLinkedinOptimizations();
        saveActiveCvStateToLibrary();
        fillFormFromState();
        renderCv();
        showToast("ZIP do LinkedIn importado e mesclado com sucesso!", "success");
        showSuccessDropzone(file.name);
        runLinkedinCsvAnalysis();
      } else {
        showToast("Nenhum registro compatível encontrado no ZIP (ex: Profile, Positions, Education, Skills, Certifications).", "warning");
        resetDropzone();
      }
    } catch (err) {
      showToast("Erro ao abrir ZIP: " + err.message, "danger");
      console.error(err);
      resetDropzone();
    }
  }

  
  let processedCount = 0;
  let importedAnyCsv = false;
  
  setStatus("Lendo arquivos CSV individuais...");
  
  filesArray.forEach(file => {
    if (!file.name.endsWith(".csv")) {
      showToast("Apenas arquivos .csv ou o arquivo .zip de exportação são permitidos.", "warning");
      processedCount++;
      if (processedCount === filesArray.length) resetDropzone();
      return;
    }
    
    setStatus(`Lendo ${file.name}...`);
    
    const reader = new FileReader();
    reader.onload = async function(e) {
      const csvContent = e.target.result;
      try {
        const parsedRows = parseCSV(csvContent);
        if (parsedRows.length <= 1) {
          throw new Error("Arquivo CSV vazio ou sem cabeçalhos.");
        }
        
        const fileNameLower = file.name.toLowerCase();
        let importCount = 0;
        
        if (fileNameLower.includes("profile")) {
          importCount = mergeLinkedinProfileCsv(parsedRows);
        } else if (fileNameLower.includes("positions")) {
          importCount = mergeLinkedinPositionsCsv(parsedRows);
        } else if (fileNameLower.includes("education")) {
          importCount = mergeLinkedinEducationCsv(parsedRows);
        } else if (fileNameLower.includes("skills")) {
          importCount = mergeLinkedinSkillsCsv(parsedRows);
        } else {
          
          const headers = parsedRows[0].map(h => h.toLowerCase());
          if (headers.includes("company name")) {
            importCount = mergeLinkedinPositionsCsv(parsedRows);
          } else if (headers.includes("school name")) {
            importCount = mergeLinkedinEducationCsv(parsedRows);
          } else if (headers.includes("headline")) {
            importCount = mergeLinkedinProfileCsv(parsedRows);
          } else if (headers.includes("name") && parsedRows.length > 2) {
            importCount = mergeLinkedinSkillsCsv(parsedRows);
          } else {
            throw new Error("Formato de CSV desconhecido.");
          }
        }
        
        if (importCount > 0) {
          importedAnyCsv = true;
          addVisualItem(file.name, importCount);
        }
        
        showToast(`Importação do arquivo ${file.name} concluída com sucesso!`, "success");
      } catch (err) {
        showToast(`Erro ao importar ${file.name}: ` + err.message, "danger");
      } finally {
        processedCount++;
        if (processedCount === filesArray.length) {
          if (importedAnyCsv) {
            refineLinkedinOptimizations();
            saveActiveCvStateToLibrary();
            fillFormFromState();
            renderCv();
            showSuccessDropzone(filesArray.length === 1 ? filesArray[0].name : `${filesArray.length} arquivos CSV`);
            runLinkedinCsvAnalysis();
          } else {
            resetDropzone();
          }
        }
      }
    };
    reader.readAsText(file, "UTF-8");
  });
}

function formatLinkedinDate(dateStr) {
  if (!dateStr || dateStr.toLowerCase() === "n/a") return "";
  dateStr = dateStr.trim();
  
  
  const yyyyMmRegex = /^(\d{4})-(\d{1,2})$/;
  
  const mmYyyyRegex = /^(\d{1,2})\/(\d{4})$/;
  
  const monthsPt = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  
  let year = "";
  let monthIdx = -1;
  
  let match = dateStr.match(yyyyMmRegex);
  if (match) {
    year = match[1];
    monthIdx = parseInt(match[2], 10) - 1;
  } else {
    match = dateStr.match(mmYyyyRegex);
    if (match) {
      year = match[2];
      monthIdx = parseInt(match[1], 10) - 1;
    }
  }
  
  if (year && monthIdx >= 0 && monthIdx < 12) {
    return `${monthsPt[monthIdx]}/${year}`;
  }
  
  if (/^\d{4}$/.test(dateStr)) {
    return dateStr;
  }
  
  return formatCvDate(dateStr);
}

function synthesizeLinkedinHighPerformanceContent(rawTitle = "", rawSummary = "", cvData = {}) {
  let title = String(rawTitle || "").trim();
  let summary = String(rawSummary || "").trim();
  
  // 1. SÍNTESE DE TÍTULO DE ALTA PERFORMANCE
  let optimizedTitle = "";
  if (title) {
    // Remover emojis e caracteres especiais decorativos
    let clean = title.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/gu, "").trim();
    // Remover hashtags comuns do LinkedIn (#opentowork, etc.)
    clean = clean.replace(/#\w+/g, "").trim();

    // Quebrar por delimitadores usuais
    const rawSegments = clean.split(/[|•–—/]/).flatMap(s => s.split(" - ")).map(s => s.trim()).filter(Boolean);
    const clutterRegex = /\b(?:open\s*to\s*work|opentowork|open\s*for\s*work|buscando|em\s*busca|dispon[íi]vel|transi[çc][ãa]o|apaixonad[oa]|entusiasta|amante|procurando)\b/i;

    const validSegments = [];
    for (const seg of rawSegments) {
      let s = seg.replace(/^(?:na|no|at|@)\s+/i, "").replace(/\s+(?:na|no|at|@)\s+.*$/i, "").trim();
      if (s.length > 1 && !clutterRegex.test(s)) {
        if (/^dev\b/i.test(s)) s = s.replace(/^dev\b/i, "Desenvolvedor");
        if (/^eng\b/i.test(s)) s = s.replace(/^eng\b/i, "Engenheiro");
        validSegments.push(s);
      }
    }

    if (validSegments.length > 0) {
      let mainRole = validSegments[0];
      mainRole = mainRole.charAt(0).toUpperCase() + mainRole.slice(1);

      let techParts = [];
      for (let i = 1; i < validSegments.length; i++) {
        const subParts = validSegments[i].split(",").map(p => p.trim()).filter(p => p.length > 0 && !clutterRegex.test(p));
        techParts.push(...subParts);
      }

      if (techParts.length === 0 && Array.isArray(cvData.skills) && cvData.skills.length > 0) {
        techParts = cvData.skills.slice(0, 3);
      }

      if (techParts.length > 0) {
        const cleanTech = techParts.slice(0, 4);
        optimizedTitle = `${mainRole} | ${cleanTech.join(" • ")}`;
      } else {
        optimizedTitle = mainRole;
      }
    } else {
      optimizedTitle = clean.trim();
    }
  }

  if (!optimizedTitle) {
    if (Array.isArray(cvData.experiences) && cvData.experiences.length > 0 && cvData.experiences[0].role) {
      optimizedTitle = cvData.experiences[0].role.trim();
    } else {
      optimizedTitle = "Profissional de Tecnologia";
    }
  }

  // 2. SÍNTESE DE RESUMO PROFISSIONAL DE ALTO IMPACTO
  let optimizedSummary = "";
  if (summary) {
    let text = summary;
    // Remover emojis
    text = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/gu, " ");

    // Remover saudações
    text = text.replace(/\b(?:ol[áa](?:\s+(?:a\s+todos|pessoal|gente|rede|galera))?|oi(?:\s+(?:pessoal|gente|galera))?|fala\s+pessoal|sejam?\s+(?:muito\s+)?bem[\s-]vindos?(?:\s+ao\s+meu\s+perfil)?|welcome(?:\s+to\s+my\s+profile)?)[!.,\s]*/gi, " ");

    // Remover redundâncias de autoapresentação: "Meu nome é...", "Me chamo...", "Sou o..."
    text = text.replace(/\b(?:meu\s+nome\s+[ée]|me\s+chamo|sou\s+(?:o|a)?)\s+[A-Za-zÀ-ÿ\s]+?\s+(?:e|,)\s*/gi, " ");

    // Remover contatos (emails, URLs, telefones, blocos de contato)
    text = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, " ");
    text = text.replace(/https?:\/\/[^\s]+|linkedin\.com\/[^\s]+/gi, " ");
    text = text.replace(/(?:\+?55\s*)?(?:\(?\d{2}\)?\s*)?\d{4,5}[-\s]?\d{4}/g, " ");
    text = text.replace(/\b(?:para\s+contato|contato|contatos|fale\s+comigo|entre\s+em\s+contato|e-?mail|telefone|celular|whatsapp|linkedin)\s*:[^\n\.]*/gi, " ");

    // Remover frases de busca de recolocação
    text = text.replace(/\b(?:(?:atualmente\s+)?em\s+busca\s+de\s+(?:novas?\s+)?(?:oportunidades?|desafios?|recoloca[çc][ãa]o)|buscando\s+(?:novas?\s+)?(?:oportunidades?|desafios?|recoloca[çc][ãa]o)|dispon[íi]vel\s+para\s+(?:o\s+mercado|novos?\s+desafios?|recoloca[çc][ãa]o)|em\s+transi[çc][ãa]o\s+de\s+carreira)[^\n\.]*[\.\n!]?/gi, " ");

    // Dividir em sentenças válidas
    const sentences = text.split(/[\n\.]+/).map(s => s.trim().replace(/^[,;\s\-]+/, "")).filter(s => s.length > 10);
    if (sentences.length > 0) {
      let cleanText = sentences.map(s => {
        s = s.charAt(0).toUpperCase() + s.slice(1);
        if (!/[!\?]$/.test(s)) s += ".";
        return s;
      }).join(" ");

      const roleBase = (optimizedTitle.split("|")[0] || "Profissional").trim();
      if (/^Tenho\b/i.test(cleanText)) {
        cleanText = `${roleBase} com ` + cleanText.slice(6);
      } else if (/^(?:Com|Atuo|Atuando)\b/i.test(cleanText)) {
        cleanText = `${roleBase} ` + cleanText;
      }

      if (!/(?:impacto|resultados|escal[aá]ve|boas\s*pr[aá]ticas|qualidade|valor)/i.test(cleanText) && cleanText.length < 250) {
        cleanText += " Foco na aplicação de boas práticas, qualidade técnica e entrega consistente de valor para o negócio.";
      }
      optimizedSummary = cleanText.trim();
    }
  }

  if (!optimizedSummary || optimizedSummary.length < 30) {
    const roleBase = (optimizedTitle.split("|")[0] || "Profissional").trim();
    let topSkillsStr = "";
    if (Array.isArray(cvData.skills) && cvData.skills.length > 0) {
      topSkillsStr = cvData.skills.slice(0, 4).join(", ");
    }
    
    let expHighlights = "";
    if (Array.isArray(cvData.experiences) && cvData.experiences.length > 0) {
      const expCount = cvData.experiences.length;
      expHighlights = ` com atuação comprovada em projetos e times dinâmicos (${expCount} experiência${expCount > 1 ? 's' : ''} relevante${expCount > 1 ? 's' : ''})`;
    }
    
    optimizedSummary = `${roleBase}${expHighlights}${topSkillsStr ? `, com sólida experiência prática em ${topSkillsStr}` : ''}. Foco no desenvolvimento de soluções eficientes e escaláveis, excelência técnica, arquitetura limpa e entrega contínua de impacto mensurável para os objetivos do negócio.`;
  }

  return {
    optimizedTitle: optimizedTitle.trim(),
    optimizedSummary: optimizedSummary.trim()
  };
}

function refineLinkedinOptimizations() {
  const cv = appState.currentCvData;
  if (!cv || !cv.linkedinOriginal || !cv.linkedinOriginal.isOptimizedApplied) return;
  
  const rawTitle = cv.linkedinOriginal.title || "";
  const rawSummary = cv.linkedinOriginal.summary || "";
  
  const synthesized = synthesizeLinkedinHighPerformanceContent(rawTitle, rawSummary, cv);
  cv.linkedinOriginal.optimizedTitle = synthesized.optimizedTitle;
  cv.linkedinOriginal.optimizedSummary = synthesized.optimizedSummary;
  
  cv.title = synthesized.optimizedTitle;
  cv.summary = synthesized.optimizedSummary;
}

function mergeLinkedinProfileCsv(rows) {
  const headers = rows[0].map(h => (h || "").toLowerCase().trim());
  const dataRow = rows[1];
  if (!dataRow) return 0;
  
  const getColVal = (name) => {
    const idx = headers.indexOf(name.toLowerCase());
    return idx !== -1 ? (dataRow[idx] || "").trim() : "";
  };
  
  const firstName = getColVal("first name");
  const lastName = getColVal("last name");
  const headline = getColVal("headline");
  const summary = getColVal("summary");
  
  if (firstName || lastName) {
    appState.currentCvData.name = `${firstName} ${lastName}`.trim();
  }

  const rawTitle = headline || "";
  const rawSummary = summary || "";

  // Salvar texto original bruto no estado do currículo
  appState.currentCvData.linkedinOriginal = {
    title: rawTitle,
    summary: rawSummary,
    optimizedTitle: "",
    optimizedSummary: "",
    isOptimizedApplied: true
  };

  // Sintetizar versões de alta performance do Título Principal e do Resumo Profissional
  const synthesized = synthesizeLinkedinHighPerformanceContent(rawTitle, rawSummary, appState.currentCvData);
  appState.currentCvData.linkedinOriginal.optimizedTitle = synthesized.optimizedTitle;
  appState.currentCvData.linkedinOriginal.optimizedSummary = synthesized.optimizedSummary;
  appState.currentCvData.linkedinOriginal.isOptimizedApplied = true;

  // Aplicar automaticamente as melhorias no currículo ativo
  appState.currentCvData.title = synthesized.optimizedTitle;
  appState.currentCvData.summary = synthesized.optimizedSummary;
  appState.currentCvData.isLinkedinImport = true;
  return 1;
}

function mergeLinkedinPositionsCsv(rows) {
  const headers = rows[0].map(h => h.toLowerCase());
  let count = 0;
  
  const getColVal = (row, name) => {
    const idx = headers.indexOf(name.toLowerCase());
    return idx !== -1 ? row[idx] : "";
  };
  
  
  if (appState.currentCvId === "cv_joao_original" || appState.currentCvData.experiences.length <= 2) {
    appState.currentCvData.experiences = [];
  }
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 2 || !row[0]) continue;
    
    const company = (getColVal(row, "company name") || getColVal(row, "company") || "").trim();
    const title = (getColVal(row, "title") || getColVal(row, "role") || "").trim();
    const desc = getColVal(row, "description") || getColVal(row, "desc") || "";
    const start = (getColVal(row, "started on") || getColVal(row, "start date") || "").trim();
    const end = (getColVal(row, "finished on") || getColVal(row, "end date") || "").trim();
    
    if (!company && !title) continue;
    
    const startFormatted = formatLinkedinDate(start);
    const endFormatted = end ? formatLinkedinDate(end) : "Presente";
    
    
    const exists = appState.currentCvData.experiences.some(e => 
      (e.company || "").trim().toLowerCase() === company.toLowerCase() && 
      (e.role || "").trim().toLowerCase() === title.toLowerCase() &&
      (e.start || "").trim().toLowerCase() === (startFormatted || "").toLowerCase()
    );
    
    if (!exists) {
      appState.currentCvData.experiences.push({
        company: company,
        role: title,
        desc: desc || "",
        start: startFormatted,
        end: endFormatted
      });
      count++;
    }
  }
  
  return count;
}

function mergeLinkedinEducationCsv(rows) {
  const headers = rows[0].map(h => h.toLowerCase());
  let count = 0;
  
  const getColVal = (row, name) => {
    const idx = headers.indexOf(name.toLowerCase());
    return idx !== -1 ? row[idx] : "";
  };
  
  if (appState.currentCvId === "cv_joao_original" || appState.currentCvData.educations.length <= 1) {
    appState.currentCvData.educations = [];
  }
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 2 || !row[0]) continue;
    
    const institution = (getColVal(row, "school name") || getColVal(row, "institution") || "").trim();
    const degree = translateAcademicDegreePt((getColVal(row, "degree name") || getColVal(row, "degree") || "").trim());
    const field = translateAcademicFieldPt((getColVal(row, "fields of study") || getColVal(row, "field") || "").trim());
    const start = (getColVal(row, "started on") || getColVal(row, "start date") || "").trim();
    const end = (getColVal(row, "finished on") || getColVal(row, "end date") || "").trim();
    
    if (!institution && !degree) continue;
    
    const startFormatted = formatLinkedinDate(start);
    const endFormatted = formatLinkedinDate(end);
    
    
    const exists = appState.currentCvData.educations.some(e => {
      const eInst = (e.institution || "").trim().toLowerCase();
      const eDeg = (e.degree || "").trim().toLowerCase();
      const eField = (e.field || "").trim().toLowerCase();
      return eInst === institution.toLowerCase() && 
             (eDeg === degree.toLowerCase() || (!eDeg && !degree)) &&
             (eField === field.toLowerCase() || (!eField && !field));
    });
    
    if (!exists) {
      appState.currentCvData.educations.push({
        institution: institution,
        degree: degree || "",
        field: field || "",
        start: startFormatted,
        end: endFormatted
      });
      count++;
    }
  }
  
  return count;
}

function mergeLinkedinSkillsCsv(rows) {
  const headers = rows[0].map(h => h.toLowerCase());
  let count = 0;
  
  const getColVal = (row, name) => {
    const idx = headers.indexOf(name.toLowerCase());
    return idx !== -1 ? row[idx] : "";
  };
  
  if (appState.currentCvId === "cv_joao_original") {
    appState.currentCvData.skills = [];
  }
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 1 || !row[0]) continue;
    
    const skillName = getColVal(row, "name") || row[0];
    if (skillName && !appState.currentCvData.skills.includes(skillName)) {
      appState.currentCvData.skills.push(skillName);
      count++;
    }
  }
  
  return count;
}

function mergeLinkedinCertificationsCsv(rows) {
  const headers = rows[0].map(h => h.toLowerCase());
  let count = 0;
  
  const getColVal = (row, name) => {
    const idx = headers.indexOf(name.toLowerCase());
    return idx !== -1 ? row[idx] : "";
  };

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < headers.length) continue;
    
    const name = getColVal(row, "name");
    const authority = getColVal(row, "authority");
    const finishedOn = getColVal(row, "finished on") || getColVal(row, "started on");
    
    if (name) {
      let year = "";
      if (finishedOn) {
        const yearMatch = finishedOn.match(/\b\d{4}\b/);
        if (yearMatch) year = yearMatch[0];
      }
      
      const exists = appState.currentCvData.certs.some(c => c.title.toLowerCase() === name.toLowerCase());
      if (!exists) {
        appState.currentCvData.certs.push({
          title: name,
          date: year,
          desc: authority || ""
        });
        count++;
      }
    }
  }
  return count;
}

function mergeLinkedinProjectsCsv(rows) {
  const headers = rows[0].map(h => h.toLowerCase());
  let count = 0;
  
  const getColVal = (row, name) => {
    const idx = headers.indexOf(name.toLowerCase());
    return idx !== -1 ? row[idx] : "";
  };

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < headers.length) continue;
    
    const title = getColVal(row, "title");
    const description = getColVal(row, "description");
    const finishedOn = getColVal(row, "finished on") || getColVal(row, "started on");
    
    if (title) {
      let year = "";
      if (finishedOn) {
        const yearMatch = finishedOn.match(/\b\d{4}\b/);
        if (yearMatch) year = yearMatch[0];
      }
      
      const exists = appState.currentCvData.certs.some(c => c.title.toLowerCase() === title.toLowerCase());
      if (!exists) {
        appState.currentCvData.certs.push({
          title: title,
          date: year,
          desc: description || ""
        });
        count++;
      }
    }
  }
  return count;
}

async function runLinkedinCsvAnalysis() {
  const container = document.getElementById("linkedin-csv-results-box");
  const contentArea = document.getElementById("linkedin-csv-analysis-content");
  if (!container || !contentArea) return;
  
  container.classList.remove("hidden");
  contentArea.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; padding: 25px;">
      <span class="spinner" style="width: 22px; height: 22px; border-width: 3px; border-color: var(--ui-success) transparent var(--ui-success) transparent; display: inline-block;"></span>
      <span style="margin-left: 10px; font-size: 0.85rem; color: var(--ui-text-secondary);">Analisando dados do perfil e consistência...</span>
    </div>
  `;
  
  const cv = appState.currentCvData;
  const hasOwnKey = !!appState.geminiKey;
  const isLogged = !!appState.googleToken;
  const canUseAi = hasOwnKey || isLogged;
  
  if (canUseAi) {
    const prompt = `
      Você é um consultor sênior de recolocação profissional e especialista em otimização de perfis do LinkedIn.
      Analise os dados extraídos do arquivo oficial de exportação do LinkedIn do candidato a seguir e elabore um relatório de auditoria detalhado e profissional.
      
      DADOS EXTRAÍDOS:
      - Nome: "${cv.name}"
      - Título Atual: "${cv.title || 'N/A'}"
      - Sobre (Resumo): "${cv.summary || 'N/A'}"
      - Experiências: ${JSON.stringify(cv.experiences)}
      - Habilidades (Competências): ${JSON.stringify(cv.skills)}
      - Certificados: ${JSON.stringify(cv.certs)}
      
      Gere um relatório estruturado contendo as seguintes seções em HTML (retorne apenas o conteúdo interno das seções, sem tags <html> ou <body>):
      
      <h3>1. Diagnóstico do Título (Headline) e Sobre <span class="badge-applied" style="background: rgba(16, 185, 129, 0.15); color: var(--ui-success); border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.72rem; font-weight: 600; padding: 2px 8px; border-radius: 999px; margin-left: 8px; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle;"><i data-lucide="check-circle-2" style="width: 12px; height: 12px;"></i> Aplicado ao Currículo</span></h3>
      <ul>
        [Insira aqui a análise se o Título é profissional e atraente. Avalie se o 'Sobre' descreve valor ou é fraco/genérico. Indique expressamente que as versões de alta performance do Título e do Sobre já foram sintetizadas e incorporadas ativamente ao currículo em edição.]
      </ul>
      <h4 style="color:var(--ui-success); margin-top:10px;">💡 Sugestão de Reescrita para o Título (Headline):</h4>
      <div style="background: rgba(255,255,255,0.03); padding: 12px; border-left: 3px solid var(--ui-success); margin: 8px 0; font-size: 0.88rem; color: #fff; font-family: monospace;">
        [Sugira de 2 a 3 fórmulas de títulos de alto impacto separados por <br>]
      </div>
      
      <h3>2. Qualidade e Detalhamento das Experiências</h3>
      <ul>
        [Avalie se as descrições contam resultados ou apenas tarefas. Identifique se alguma experiência está vazia ou muito curta.]
      </ul>
      
      <h3>3. Análise de Competências (Skills) e Certificados</h3>
      <ul>
        [Analise se a quantidade de competências é adequada. Diga se há termos obsoletos ou se falta focar em hard skills.]
      </ul>
      
      <h3>4. Plano de Ação - Checklist de Otimização</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        [Gere um checklist com dicas de melhorias práticas (foto de capa, url personalizada, ativar modo Open to Work se aplicável, etc.)]
      </ul>

      Use classes e estilos inline elegantes condizentes com o tema dark da plataforma.
      Retorne apenas o HTML puro. Não use marcação markdown \`\`\`html.
    `;
    
    try {
      const responseText = await callGeminiAPI(prompt);
      let cleanHtml = responseText.trim();
      if (cleanHtml.startsWith("```")) {
        cleanHtml = cleanHtml.replace(/^```html\s*/i, "").replace(/```$/, "").trim();
      }
      if (!cleanHtml.includes("Aplicado ao Currículo")) {
        cleanHtml = cleanHtml.replace(/(<h3>1\.[^<]*<\/h3>)/i, `$1 <span class="badge-applied" style="background: rgba(16, 185, 129, 0.15); color: var(--ui-success); border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.72rem; font-weight: 600; padding: 2px 8px; border-radius: 999px; margin-left: 8px; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle;"><i data-lucide="check-circle-2" style="width: 12px; height: 12px;"></i> Aplicado ao Currículo</span>`);
      }
      contentArea.innerHTML = cleanHtml;
      if (window.lucide && typeof lucide.createIcons === "function") lucide.createIcons();
    } catch (err) {
      console.warn("Erro na análise por IA, rodando heurística local:", err);
      runLocalLinkedinLinkedinHeuristics(cv, contentArea);
    }
  } else {
    
    setTimeout(() => {
      runLocalLinkedinLinkedinHeuristics(cv, contentArea);
    }, 1000);
  }
}

function runLocalLinkedinLinkedinHeuristics(cv, contentArea) {
  let html = `
    <p style="font-size: 0.82rem; color: var(--ui-text-muted); margin-bottom: 15px; background: rgba(255,193,7,0.05); border: 1px solid rgba(255,193,7,0.15); padding: 8px 12px; border-radius: var(--radius-sm);">
      <i data-lucide="info" class="inline-icon" style="color: var(--ui-warning); vertical-align: middle; margin-right: 4px;"></i> Exibindo diagnóstico de consistência local. Para um relatório completo e sugestões de reescrita geradas por Inteligência Artificial, faça login com o Google!
    </p>
  `;
  
  html += `<h3>1. Diagnóstico do Título e Sobre <span class="badge-applied" style="background: rgba(16, 185, 129, 0.15); color: var(--ui-success); border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.72rem; font-weight: 600; padding: 2px 8px; border-radius: 999px; margin-left: 8px; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle;"><i data-lucide="check-circle-2" style="width: 12px; height: 12px;"></i> Aplicado ao Currículo</span></h3><ul>`;
  
  html += `<li><strong style="color: var(--ui-success)">[Aplicado ao Currículo]</strong> Versões otimizadas de alta performance do Título e do Sobre foram sintetizadas e incorporadas diretamente ao currículo ativo (eliminando redundâncias do LinkedIn e elevando o impacto profissional). Você pode alternar para o texto original a qualquer momento no editor.</li>`;
  
  if (cv.linkedinOriginal && cv.linkedinOriginal.title) {
    html += `<li><strong>Título Original do LinkedIn:</strong> <span style="color: var(--ui-text-muted); font-style: italic;">"${escapeHtml(cv.linkedinOriginal.title)}"</span></li>`;
    html += `<li><strong>Título Otimizado Aplicado:</strong> <span style="color: var(--ui-success); font-weight: 600;">"${escapeHtml(cv.title)}"</span></li>`;
  } else if (!cv.title || cv.title.length < 15) {
    html += `<li><strong style="color: var(--ui-warning)">[Atenção]</strong> Seu título atual é muito curto ou genérico. Um bom título deve conter palavras-chave da sua área em vez de apenas o cargo isolado.</li>`;
  } else {
    html += `<li><strong style="color: var(--ui-success)">[Excelente]</strong> Título atual identificado: <strong>"${escapeHtml(cv.title)}"</strong>. Ele está bem preenchido e alinhado aos padrões da área.</li>`;
  }
  
  if (cv.linkedinOriginal && cv.linkedinOriginal.summary) {
    html += `<li><strong style="color: var(--ui-success)">[Sobre Otimizado]</strong> A seção "Sobre" foi reestruturada para focar em competências centrais e entregas de valor, eliminando saudações e dados informais.</li>`;
  } else if (!cv.summary || cv.summary.length < 80) {
    html += `<li><strong style="color: var(--ui-warning)">[Atenção]</strong> Sua seção "Sobre" está muito curta ou ausente (${cv.summary ? cv.summary.length : 0} caracteres). O resumo do LinkedIn deve conter suas principais especialidades, anos de experiência e tecnologias principais.</li>`;
  } else {
    html += `<li><strong style="color: var(--ui-success)">[Bom]</strong> Seu resumo profissional (Sobre) possui um bom tamanho e estrutura orientada a resultados.</li>`;
  }
  html += `</ul>`;
  
  html += `<h3>2. Detalhamento das Experiências</h3><ul>`;
  let emptyDescs = [];
  if (cv.experiences && cv.experiences.length > 0) {
    cv.experiences.forEach(exp => {
      if (!exp.desc || exp.desc.trim().length < 30) {
        emptyDescs.push(`${exp.role} na ${exp.company}`);
      }
    });
  }
  
  if (emptyDescs.length > 0) {
    html += `<li><strong style="color: var(--ui-warning)">[Crítico]</strong> Identificamos descrições vazias ou muito curtas nas seguintes experiências:
      <ul style="padding-left: 20px; margin-top: 4px; color: var(--ui-text-secondary);">
        ${emptyDescs.map(d => `<li>${d}</li>`).join("")}
      </ul>
      Experiências sem descrição reduzem drasticamente as chances de seu perfil ser encontrado na busca de talentos (LinkedIn Recruiter).
    </li>`;
  } else if (!cv.experiences || cv.experiences.length === 0) {
    html += `<li><strong style="color: var(--ui-warning)">[Atenção]</strong> Nenhuma experiência profissional foi detectada no arquivo. Preencha seu histórico profissional para que ele seja mapeado.</li>`;
  } else {
    html += `<li><strong style="color: var(--ui-success)">[Excelente]</strong> Todas as suas experiências possuem descrições preenchidas. Certifique-se de usar verbos de ação para listar conquistas reais.</li>`;
  }
  html += `</ul>`;
  
  html += `<h3>3. Consistência de Competências</h3><ul>`;
  if (!cv.skills || cv.skills.length < 5) {
    html += `<li><strong style="color: var(--ui-warning)">[Atenção]</strong> Você possui apenas ${cv.skills ? cv.skills.length : 0} competências cadastradas. O algoritmo do LinkedIn valoriza perfis com pelo menos 15 a 20 competências focadas na sua área de atuação.</li>`;
  } else {
    html += `<li><strong style="color: var(--ui-success)">[Bom]</strong> Foram detectadas ${cv.skills.length} competências no seu perfil. Tente fixar as 3 principais que melhor descrevem seu foco de carreira atual.</li>`;
  }
  html += `</ul>`;
  
  html += `
    <h3>4. Checklist de Otimização do LinkedIn</h3>
    <ul style="list-style-type: none; padding-left: 0; display: flex; flex-direction: column; gap: 8px; margin-top: 10px; font-size: 0.85rem;">
      <li style="display:flex; gap:8px; align-items:flex-start;"><input type="checkbox" checked disabled style="accent-color: var(--ui-success);"> <span style="text-decoration: line-through; color: var(--ui-text-muted);">Importar dados do LinkedIn no editor para preenchimento (Concluído)</span></li>
      <li style="display:flex; gap:8px; align-items:flex-start;"><input type="checkbox" style="accent-color: var(--ui-success);"> <span>Reescrever o título profissional adicionando 3 a 5 palavras-chave core da sua profissão</span></li>
      <li style="display:flex; gap:8px; align-items:flex-start;"><input type="checkbox" style="accent-color: var(--ui-success);"> <span>Adicionar marcadores de conquistas (com números e impacto) nas descrições de cargos</span></li>
      <li style="display:flex; gap:8px; align-items:flex-start;"><input type="checkbox" style="accent-color: var(--ui-success);"> <span>Garantir que as datas das experiências e formação no LinkedIn coincidem exatamente com o Currículo</span></li>
    </ul>
  `;
  
  contentArea.innerHTML = html;
  if (window.lucide && typeof lucide.createIcons === "function") lucide.createIcons();
}

if (typeof window !== "undefined") {
  window.appState = appState;
  window.synthesizeLinkedinHighPerformanceContent = synthesizeLinkedinHighPerformanceContent;
  window.refineLinkedinOptimizations = refineLinkedinOptimizations;
  window.toggleLinkedinOptimization = toggleLinkedinOptimization;
  window.updateLinkedinRestoreButtonUI = updateLinkedinRestoreButtonUI;
  window.mergeLinkedinProfileCsv = mergeLinkedinProfileCsv;
  window.runLocalLinkedinLinkedinHeuristics = runLocalLinkedinLinkedinHeuristics;
  window.formatCvDate = formatCvDate;
  window.normalizeCvDates = normalizeCvDates;
  window.normalizeCvData = normalizeCvData;
  window.translateAcademicFieldPt = translateAcademicFieldPt;
  window.translateAcademicDegreePt = translateAcademicDegreePt;
  window.detectExistingIdentity = detectExistingIdentity;
  window.mergeCvDataIntelligently = mergeCvDataIntelligently;
  window.evaluateCvQualityScore = evaluateCvQualityScore;
  window.renderCvQualityAuditor = renderCvQualityAuditor;
  window.optimizeEntireCvWithAI = optimizeEntireCvWithAI;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    appState,
    synthesizeLinkedinHighPerformanceContent,
    refineLinkedinOptimizations,
    toggleLinkedinOptimization,
    updateLinkedinRestoreButtonUI,
    mergeLinkedinProfileCsv,
    runLocalLinkedinLinkedinHeuristics,
    formatLinkedinDate,
    formatCvDate,
    normalizeCvDates,
    normalizeCvData,
    translateAcademicFieldPt,
    translateAcademicDegreePt,
    detectExistingIdentity,
    mergeCvDataIntelligently,
    evaluateCvQualityScore,
    renderCvQualityAuditor,
    optimizeEntireCvWithAI,
    parseCSV,
    loadLibrary,
    DEFAULT_CV_DATA
  };
}

