const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const profilePicPath = path.resolve('public/profile/kev.png');
const profilePicBase64 = fs.existsSync(profilePicPath) 
  ? fs.readFileSync(profilePicPath).toString('base64') 
  : '';
const imgSrc = `data:image/png;base64,${profilePicBase64}`;

function getBase64Image(filePath) {
  try {
    const fullPath = path.resolve('public' + filePath);
    if (fs.existsSync(fullPath)) {
      const ext = path.extname(fullPath).replace('.', '');
      const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
      const b64 = fs.readFileSync(fullPath).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  } catch (e) {
    console.error('Error reading image:', filePath, e);
  }
  return '';
}

// Visual showcase thumbnails
const imgGomarket = getBase64Image('/projects/gomarketplace.png') || getBase64Image('/projects/tokopedia.png');
const imgBaye = getBase64Image('/projects/baye.png') || getBase64Image('/projects/semarketplace.jpg');
const imgJava = getBase64Image('/projects/marketinvent.png');
const imgHrms = getBase64Image('/projects/marketinvent.png');
const imgSwagger = getBase64Image('/projects/swagger-go.png');
const imgNexus = getBase64Image('/projects/nexus.png');
const imgBanking = getBase64Image('/projects/swagger-banking.png');
const imgSpotify = getBase64Image('/projects/spotify.png');
const imgTrello = getBase64Image('/projects/trello.png');
const imgCanva = getBase64Image('/projects/canvass.png');
const imgIndofooty = getBase64Image('/projects/indofooty.jpg');
const imgGojek = getBase64Image('/projects/gojek.png');

// Load all repositories from allRepositories.ts by parsing or importing
const allReposFile = path.resolve('app/lib/data/allRepositories.ts');
let ALL_REPOSITORIES = [];

try {
  const content = fs.readFileSync(allReposFile, 'utf8');
  // Match ALL_REPOSITORIES array block
  const match = content.match(/export const ALL_REPOSITORIES:\s*RepoItem\[\]\s*=\s*(\[[\s\S]*?\]);\s*export const DOMAIN_META/);
  if (match) {
    // Evaluate safely in sandbox
    const parsed = eval('(' + match[1] + ')');
    ALL_REPOSITORIES = parsed;
    console.log(`Successfully parsed ${ALL_REPOSITORIES.length} repositories from allRepositories.ts`);
  }
} catch (err) {
  console.error('Error parsing allRepositories.ts, falling back:', err);
}

// Fallback if eval fails
if (!ALL_REPOSITORIES || ALL_REPOSITORIES.length === 0) {
  console.error('Fatal: Could not load ALL_REPOSITORIES');
  process.exit(1);
}

// Domain groupings
const domains = [
  { key: 'backend', titleEn: '1. Backend & Cloud Systems', titleId: '1. Sistem Backend & Cloud', color: '#0284c7' },
  { key: 'fullstack', titleEn: '2. Fullstack Web Platforms & Monorepos', titleId: '2. Platform Web Fullstack & Monorepo', color: '#4f46e5' },
  { key: 'frontend', titleEn: '3. Frontend Web Applications', titleId: '3. Aplikasi Web Frontend', color: '#059669' },
  { key: 'mobile', titleEn: '4. Mobile Applications (iOS & Android)', titleId: '4. Aplikasi Mobile (iOS & Android)', color: '#7c3aed' },
  { key: 'exploration', titleEn: '5. Engineering Exploration & Concept Labs', titleId: '5. Eksplorasi & Lab Rekayasa', color: '#d97706' },
];

function renderRepoList(lang) {
  let html = '';
  for (const dom of domains) {
    const repos = ALL_REPOSITORIES.filter(r => r.domain === dom.key);
    const title = lang === 'en' ? dom.titleEn : dom.titleId;
    html += `
      <div class="domain-header" style="border-left: 3px solid ${dom.color}; background: #f8fafc; padding: 4px 8px; margin: 10px 0 6px 0; display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-weight: 800; font-size: 8.5pt; text-transform: uppercase; color: #0f172a;">${title} (${repos.length} Repos)</span>
        <span style="font-size: 6.8pt; font-family: monospace; font-weight: 700; color: #64748b;">${repos.filter(r => r.tier === 1).length} Tier 1 Flagships</span>
      </div>
      <div class="repo-list">
    `;

    for (let i = 0; i < repos.length; i++) {
      const r = repos[i];
      const tierBadge = r.tier === 1 ? '🌟 TIER 1' : r.tier === 2 ? '⚡ TIER 2' : r.tier === 3 ? '🧪 TIER 3' : '📦 TIER 4';
      const tierColor = r.tier === 1 ? '#d97706' : r.tier === 2 ? '#0284c7' : '#64748b';
      const desc = r.desc[lang] || r.desc.en;

      html += `
        <div class="project-item" style="page-break-inside: avoid; break-inside: avoid;">
          <div class="project-head">
            <span class="project-title">
              <span style="color: #64748b; font-family: monospace; font-size: 7pt;">${i + 1}.</span> 
              <a href="${r.githubUrl}" style="color: #0f172a; text-decoration: none; font-weight: 800;">${r.name}</a>
              ${r.liveUrl ? `<span style="font-size: 6.5pt; font-family: monospace; color: #059669; font-weight: bold; background: #ecfdf5; padding: 1px 3px; border-radius: 2px; border: 0.5px solid #a7f3d0; margin-left: 3px;">[Live Demo]</span>` : ''}
              <span style="font-size: 6.2pt; font-family: monospace; color: ${tierColor}; font-weight: 800; background: #f1f5f9; padding: 1px 3px; border-radius: 2px; margin-left: 4px;">${tierBadge}</span>
            </span>
            <span class="project-tech">${r.tech.join(' • ')}</span>
          </div>
          <div class="project-desc">${desc}</div>
        </div>
      `;
    }

    html += `</div>`;
  }
  return html;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Kevin Eka Pratama - Comprehensive Engineering Resume (93 Repositories)</title>
<style>
  @page {
    size: A4;
    margin: 10mm 14mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0f172a;
    background: #ffffff;
    font-size: 8.5pt;
    line-height: 1.35;
  }
  .page {
    padding: 6px 0;
    min-height: 100vh;
  }
  .page-break {
    page-break-after: always;
    break-after: page;
    height: 0;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #0f172a;
    padding-bottom: 8px;
    margin-bottom: 10px;
  }
  .photo {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    object-fit: cover;
    border: 1.5px solid #0f172a;
  }
  .header-text {
    text-align: right;
  }
  .name {
    font-size: 17pt;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    color: #0f172a;
  }
  .title {
    font-size: 8.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #334155;
    margin-top: 1px;
  }
  .contact-info {
    font-size: 7.2pt;
    font-weight: 600;
    color: #334155;
    margin-top: 3px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    flex-wrap: wrap;
  }
  .contact-info a {
    color: #0f172a;
    text-decoration: none;
    font-weight: 700;
  }
  .section {
    margin-bottom: 9px;
  }
  .section-title {
    font-size: 8.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 2px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .summary-text {
    font-size: 8pt;
    color: #1e293b;
    line-height: 1.4;
    text-align: justify;
  }
  .job {
    margin-bottom: 6px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .job-title {
    font-size: 8.2pt;
    font-weight: 800;
    color: #0f172a;
  }
  .job-company {
    font-size: 7.5pt;
    font-weight: 700;
    color: #475569;
  }
  .job-date {
    font-size: 7.2pt;
    font-family: monospace;
    font-weight: 700;
    background: #f1f5f9;
    border: 1px solid #94a3b8;
    padding: 1px 4px;
    border-radius: 3px;
  }
  ul.bullets {
    padding-left: 14px;
    margin-top: 2px;
  }
  ul.bullets li {
    font-size: 7.6pt;
    color: #334155;
    margin-bottom: 1.5px;
  }
  .project-item {
    margin-bottom: 3.5px;
    padding-bottom: 2.5px;
    border-bottom: 0.5px solid #e2e8f0;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .project-item:last-child {
    border-bottom: none;
  }
  .project-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 6px;
  }
  .project-title {
    font-size: 7.8pt;
    font-weight: 800;
    color: #0f172a;
  }
  .project-tech {
    font-size: 6.5pt;
    font-family: monospace;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    text-align: right;
    white-space: nowrap;
  }
  .project-desc {
    font-size: 7.3pt;
    color: #334155;
    padding-left: 8px;
    line-height: 1.25;
  }
  .skills-block {
    font-size: 7.4pt;
    color: #1e293b;
    line-height: 1.45;
  }
  .skills-block strong {
    font-weight: 800;
    color: #0f172a;
  }
  .edu-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .badge {
    font-size: 6.8pt;
    font-family: monospace;
    font-weight: 700;
    color: #64748b;
  }
</style>
</head>
<body>

<!-- SECTION 1: ENGLISH ATS (COMPREHENSIVE DIRECTORY) -->
<div class="page">
  <div class="header">
    <img src="${imgSrc}" class="photo" alt="Kevin Eka Pratama">
    <div class="header-text">
      <div class="name">Kevin Eka Pratama</div>
      <div class="title">Fullstack Software Engineer</div>
      <div class="contact-info">
        <span>kevinekapratama@gmail.com</span>
        <span>•</span>
        <span>+62 (813) 2661-2344</span>
        <span>•</span>
        <a href="https://mazkev.vercel.app">mazkev.vercel.app</a>
        <span>•</span>
        <a href="https://github.com/mazkev">github.com/mazkev</a>
        <span>•</span>
        <span>Jakarta, ID</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Executive Summary</span>
      <span class="badge">English ATS Standard • Complete 93-Repository Inventory</span>
    </div>
    <p class="summary-text">
      Fullstack Software Engineer with 2+ years of professional Application Support experience at PT PLN Icon+. Proven track record of independently designing, building, and deploying 93 verified software repositories across distributed backend systems (Go, Java Spring Boot, Bun/Hono, Express.js), fullstack web platforms (Next.js 16, React 19, Laravel 12, FastAPI), modern frontend clients, and cross-platform mobile apps (React Native, Flutter). Rigorous foundation in relational database schema optimization (PostgreSQL, MySQL), NoSQL (MongoDB), ACID transactions, Clean Architecture, and containerized deployment with Docker.
    </p>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Professional Experience</span>
    </div>
    
    <div class="job">
      <div class="job-header">
        <div>
          <span class="job-title">Application Support</span> — <span class="job-company">PT PLN Icon+</span>
        </div>
        <span class="job-date">2023 - Present</span>
      </div>
      <ul class="bullets">
        <li>Monitored critical enterprise system workflows and resolved production incidents to guarantee uninterrupted 24/7 public utility operations.</li>
        <li>Investigated complex database queries, diagnosed performance bottlenecks, and executed SQL query optimization across PostgreSQL, Oracle, and MySQL clusters.</li>
        <li>Authored standard operating procedures (SOP), incident post-mortems, and coordinated with core development teams to verify defect fixes and API updates.</li>
      </ul>
    </div>

    <div class="job">
      <div class="job-header">
        <div>
          <span class="job-title">Software Engineering & Open Source Development</span> — <span class="job-company">Independent Engineering & Technical Research</span>
        </div>
        <span class="job-date">2024 - Present</span>
      </div>
      <ul class="bullets">
        <li>Engineered and audited 93 production-grade repositories spanning Backend Microservices, Fullstack Monorepos, Modern Frontend, and Cross-Platform Mobile Apps.</li>
        <li>Designed ACID transactional schemas, implemented JWT/RBAC security pipelines, and orchestrated multi-container environments using Docker Compose.</li>
        <li>Maintained strict software craftsmanship: Clean Architecture domain-usecase-repository decoupling, automated CI/CD unit testing, and OpenAPI/Swagger documentation.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Technical Competencies & Core Stack</span>
    </div>
    <div class="skills-block">
      <div><strong>Languages:</strong> Go (Golang), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, PHP 8, Dart, SQL, HTML5/CSS3</div>
      <div><strong>Frameworks & Architectures:</strong> Next.js 16, React 19, Java Spring Boot 3.3, Gin, Fiber, Bun + Hono, Express.js, Laravel 12, FastAPI, Vue 3, Angular 19, React Native (Expo SDK 56), Flutter (Riverpod 3), Clean Architecture, Domain-Driven Design (DDD), Microservices</div>
      <div><strong>Databases & Messaging:</strong> PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling), MySQL, MongoDB (NoSQL), SQLite (LibSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ (AMQP Message Broker)</div>
      <div><strong>DevOps & Tooling:</strong> Docker, Docker Compose, Git & GitHub, Postman, Swagger / OpenAPI, Vite, Webpack 5, TanStack Query/Table, Zustand, Redux Toolkit, WebSockets, Linux Bash, Vercel Edge</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Education</span>
    </div>
    <div class="edu-row">
      <div>
        <strong style="font-size: 8pt;">Bachelor of Computer Science / Information Technology</strong>
        <div style="font-size: 7.3pt; color: #475569;">Universitas AMIKOM • GPA: 3.42 / 4.00</div>
      </div>
      <span class="job-date">2017 - 2022</span>
    </div>
  </div>

  <!-- DIRECTORY TITLE -->
  <div class="section" style="margin-top: 14px;">
    <div class="section-title" style="border-bottom: 2px solid #0f172a;">
      <span>Verified Technical Repository Directory (All 93 Projects)</span>
      <span class="badge">63 Tier 1 Flagships • 16 Tier 2 Supporting • 14 Concept Labs</span>
    </div>

    ${renderRepoList('en')}
  </div>
</div>

<div class="page-break"></div>

<!-- SECTION 2: INDONESIAN ATS (COMPREHENSIVE DIRECTORY) -->
<div class="page">
  <div class="header">
    <img src="${imgSrc}" class="photo" alt="Kevin Eka Pratama">
    <div class="header-text">
      <div class="name">Kevin Eka Pratama</div>
      <div class="title">Fullstack Software Engineer</div>
      <div class="contact-info">
        <span>kevinekapratama@gmail.com</span>
        <span>•</span>
        <span>+62 (813) 2661-2344</span>
        <span>•</span>
        <a href="https://mazkev.vercel.app">mazkev.vercel.app</a>
        <span>•</span>
        <a href="https://github.com/mazkev">github.com/mazkev</a>
        <span>•</span>
        <span>Jakarta, ID</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Ringkasan Eksekutif</span>
      <span class="badge">Standar ATS Bahasa Indonesia • Direktori Lengkap 93 Repositori</span>
    </div>
    <p class="summary-text">
      Fullstack Software Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support pada PT PLN Icon+. Memiliki rekam jejak terverifikasi dalam merancang, membangun, dan mendokumentasikan 93 repositori perangkat lunak secara mandiri mencakup sistem backend terdistribusi (Go, Java Spring Boot, Bun/Hono, Express.js), platform web fullstack (Next.js 16, React 19, Laravel 12, FastAPI), aplikasi frontend modern, serta mobile cross-platform (React Native, Flutter). Menguasai arsitektur database relasional (PostgreSQL, MySQL), NoSQL (MongoDB), transaksi ACID, Clean Architecture, dan containerization Docker.
    </p>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Pengalaman Profesional</span>
    </div>
    
    <div class="job">
      <div class="job-header">
        <div>
          <span class="job-title">Application Support</span> — <span class="job-company">PT PLN Icon+</span>
        </div>
        <span class="job-date">2023 - Sekarang</span>
      </div>
      <ul class="bullets">
        <li>Memantau alur operasional sistem enterprise kritis dan menangani insiden produksi untuk menjamin kelancaran layanan utilitas publik secara 24/7.</li>
        <li>Menganalisis query database kompleks, mendiagnosis hambatan performa, dan melakukan investigasi teknis pada cluster database PostgreSQL, Oracle, dan MySQL.</li>
        <li>Menyusun dokumentasi SOP troubleshooting sistem operasional dan berkoordinasi erat dengan tim developer inti untuk pelaporan bug serta verifikasi perbaikan API.</li>
      </ul>
    </div>

    <div class="job">
      <div class="job-header">
        <div>
          <span class="job-title">Rekayasa Perangkat Lunak & Pengembangan Open Source</span> — <span class="job-company">Pengembangan Mandiri & Riset Arsitektur</span>
        </div>
        <span class="job-date">2024 - Sekarang</span>
      </div>
      <ul class="bullets">
        <li>Membangun dan mengaudit 93 repositori perangkat lunak mencakup Backend Microservices, Fullstack Monorepo, Frontend Modern, dan Mobile Cross-Platform.</li>
        <li>Merancang skema database transaksional ACID, menerapkan pipa keamanan JWT/RBAC, dan mengorkestrasikan lingkungan multi-container dengan Docker Compose.</li>
        <li>Menerapkan standar rekayasa perangkat lunak: Clean Architecture decoupling (Domain, Usecase, Repository), unit testing otomatis, dan dokumentasi OpenAPI Swagger.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Kompetensi Teknis & Core Stack</span>
    </div>
    <div class="skills-block">
      <div><strong>Bahasa Pemrograman:</strong> Go (Golang), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, PHP 8, Dart, SQL, HTML5/CSS3</div>
      <div><strong>Framework & Arsitektur:</strong> Next.js 16, React 19, Java Spring Boot 3.3, Gin, Fiber, Bun + Hono, Express.js, Laravel 12, FastAPI, Vue 3, Angular 19, React Native (Expo SDK 56), Flutter (Riverpod 3), Clean Architecture, Domain-Driven Design (DDD), Microservices</div>
      <div><strong>Database & Message Broker:</strong> PostgreSQL (GORM, Prisma, Transaksi ACID, Connection Pooling), MySQL, MongoDB (NoSQL), SQLite (LibSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ (AMQP Message Broker)</div>
      <div><strong>DevOps & Alat Rekayasa:</strong> Docker, Docker Compose, Git & GitHub, Postman, Swagger / OpenAPI, Vite, Webpack 5, TanStack Query/Table, Zustand, Redux Toolkit, WebSockets, Linux Bash, Vercel Edge</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Pendidikan</span>
    </div>
    <div class="edu-row">
      <div>
        <strong style="font-size: 8pt;">Sarjana Ilmu Komputer / Teknologi Informasi</strong>
        <div style="font-size: 7.3pt; color: #475569;">Universitas AMIKOM • IPK: 3.42 / 4.00</div>
      </div>
      <span class="job-date">2017 - 2022</span>
    </div>
  </div>

  <!-- DIRECTORY TITLE -->
  <div class="section" style="margin-top: 14px;">
    <div class="section-title" style="border-bottom: 2px solid #0f172a;">
      <span>Direktori Portofolio Teknis Terverifikasi (Seluruh 93 Repositori)</span>
      <span class="badge">63 Flagship Tier 1 • 16 Supporting Tier 2 • 14 Lab Konsep</span>
    </div>

    ${renderRepoList('id')}
  </div>
</div>

<div class="page-break"></div>

<!-- SECTION 3: VISUAL SHOWCASE GALLERY -->
<div class="page">
  <div class="header" style="border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 12px;">
    <div style="text-align: left;">
      <div class="name" style="font-size: 15pt;">Kevin Eka Pratama <span style="font-size: 8pt; background: #0f172a; color: white; padding: 2px 6px; border-radius: 4px; vertical-align: middle;">VISUAL CASE STUDIES</span></div>
      <div class="title" style="font-size: 8pt; color: #334155;">Lampiran Visual Proyek Pilihan & Arsitektur Sistem</div>
    </div>
    <div class="header-text">
      <div style="font-size: 8pt; font-family: monospace; font-weight: bold; color: #0f172a;">mazkev.vercel.app</div>
      <div style="font-size: 7.5pt; font-family: monospace; color: #475569;">github.com/mazkev</div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 8px;">
    <!-- CARD 1 -->
    <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #f8fafc; display: flex; gap: 7px; page-break-inside: avoid;">
      <img src="${imgGomarket}" style="width: 65px; height: 50px; border-radius: 4px; object-fit: cover; border: 1px solid #cbd5e1; flex-shrink: 0;" alt="Tokopedia Go">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <strong style="font-size: 7.5pt; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">1. Tokopedia Marketplace</strong>
          <span style="font-size: 6pt; background: #e2e8f0; font-family: monospace; font-weight: bold; padding: 1px 3px; border-radius: 2px;">FULL STACK</span>
        </div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #475569; margin: 1px 0;">GO • REACT 19 • POSTGRESQL • DOCKER</div>
        <div style="font-size: 6.8pt; color: #334155; line-height: 1.25;">Marketplace e-commerce memadukan frontend React 19 dengan REST API Go dan PostgreSQL transaksional.</div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #0369a1; margin-top: 2px;">Repo: gh/tokopedia-react-storefront</div>
      </div>
    </div>

    <!-- CARD 2 -->
    <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #f8fafc; display: flex; gap: 7px; page-break-inside: avoid;">
      <img src="${imgBaye}" style="width: 65px; height: 50px; border-radius: 4px; object-fit: cover; border: 1px solid #cbd5e1; flex-shrink: 0;" alt="BayE Marketplace">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <strong style="font-size: 7.5pt; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">2. BayE Marketplace</strong>
          <span style="font-size: 6pt; background: #e2e8f0; font-family: monospace; font-weight: bold; padding: 1px 3px; border-radius: 2px;">FULL STACK</span>
        </div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #475569; margin: 1px 0;">NEXT.JS 16 • REACT 19 • PRISMA 7 • LIBSQL</div>
        <div style="font-size: 6.8pt; color: #334155; line-height: 1.25;">Platform lelang & belanja modern. Server-rendered hydration, live bidding simulation, dan faktur QR.</div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #0369a1; margin-top: 2px;">Demo: baye-marketplace.vercel.app</div>
      </div>
    </div>

    <!-- CARD 3 -->
    <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #f8fafc; display: flex; gap: 7px; page-break-inside: avoid;">
      <img src="${imgJava}" style="width: 65px; height: 50px; border-radius: 4px; object-fit: cover; border: 1px solid #cbd5e1; flex-shrink: 0;" alt="Spring Boot Commerce">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <strong style="font-size: 7.5pt; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">3. Spring Boot Commerce</strong>
          <span style="font-size: 6pt; background: #e2e8f0; font-family: monospace; font-weight: bold; padding: 1px 3px; border-radius: 2px;">FULL STACK</span>
        </div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #475569; margin: 1px 0;">JAVA 17 • SPRING BOOT 3.3 • VUE 3 • PINIA</div>
        <div style="font-size: 6.8pt; color: #334155; line-height: 1.25;">Platform e-commerce enterprise dengan Spring Security 6 JWT, OpenPDF invoices, dan PostgreSQL.</div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #0369a1; margin-top: 2px;">Repo: gh/java-spring-commerce-platform</div>
      </div>
    </div>

    <!-- CARD 4 -->
    <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #f8fafc; display: flex; gap: 7px; page-break-inside: avoid;">
      <img src="${imgHrms}" style="width: 65px; height: 50px; border-radius: 4px; object-fit: cover; border: 1px solid #cbd5e1; flex-shrink: 0;" alt="HRMS Laravel 12">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <strong style="font-size: 7.5pt; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">4. Laravel 12 HRMS Platform</strong>
          <span style="font-size: 6pt; background: #e2e8f0; font-family: monospace; font-weight: bold; padding: 1px 3px; border-radius: 2px;">FULL STACK</span>
        </div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #475569; margin: 1px 0;">PHP 8.3 • LARAVEL 12 • SELFIE ATTENDANCE</div>
        <div style="font-size: 6.8pt; color: #334155; line-height: 1.25;">Sistem SDM dengan absensi selfie GPS, shift kerja, otomatisasi THR & slip gaji, serta KPI.</div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #0369a1; margin-top: 2px;">Repo: gh/laravel-hrms-platform</div>
      </div>
    </div>

    <!-- CARD 5 -->
    <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #f8fafc; display: flex; gap: 7px; page-break-inside: avoid;">
      <img src="${imgSwagger}" style="width: 65px; height: 50px; border-radius: 4px; object-fit: cover; border: 1px solid #cbd5e1; flex-shrink: 0;" alt="Go Clean Architecture">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <strong style="font-size: 7.5pt; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">5. Go Clean Architecture API</strong>
          <span style="font-size: 6pt; background: #e2e8f0; font-family: monospace; font-weight: bold; padding: 1px 3px; border-radius: 2px;">BACK END</span>
        </div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #475569; margin: 1px 0;">GO • CLEAN ARCH • GIN • POSTGRESQL</div>
        <div style="font-size: 6.8pt; color: #334155; line-height: 1.25;">REST API modular di Go memisahkan Domain, Usecase, dan Repository dengan Swagger OpenAPI.</div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #0369a1; margin-top: 2px;">Repo: gh/go-clean-arch</div>
      </div>
    </div>

    <!-- CARD 6 -->
    <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #f8fafc; display: flex; gap: 7px; page-break-inside: avoid;">
      <img src="${imgBanking}" style="width: 65px; height: 50px; border-radius: 4px; object-fit: cover; border: 1px solid #cbd5e1; flex-shrink: 0;" alt="Go Core Banking">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <strong style="font-size: 7.5pt; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">6. Go Banking Core Engine</strong>
          <span style="font-size: 6pt; background: #e2e8f0; font-family: monospace; font-weight: bold; padding: 1px 3px; border-radius: 2px;">BACK END</span>
        </div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #475569; margin: 1px 0;">GO • POSTGRESQL • ACID TRANSFERS • GORM</div>
        <div style="font-size: 6.8pt; color: #334155; line-height: 1.25;">Engine transfer saldo keuangan atomik dengan verifikasi PIN Bcrypt dan structured audit logging.</div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #0369a1; margin-top: 2px;">Repo: gh/go-banking-core-system</div>
      </div>
    </div>

    <!-- CARD 7 -->
    <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #f8fafc; display: flex; gap: 7px; page-break-inside: avoid;">
      <img src="${imgNexus}" style="width: 65px; height: 50px; border-radius: 4px; object-fit: cover; border: 1px solid #cbd5e1; flex-shrink: 0;" alt="Nexus Workspace Studio">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <strong style="font-size: 7.5pt; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">7. Nexus Workspace Studio</strong>
          <span style="font-size: 6pt; background: #e2e8f0; font-family: monospace; font-weight: bold; padding: 1px 3px; border-radius: 2px;">FULL STACK</span>
        </div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #475569; margin: 1px 0;">NEXT.JS 16 • REACT 19 • DND-KIT • KONVA</div>
        <div style="font-size: 6.8pt; color: #334155; line-height: 1.25;">Workstation produktivitas pengembang: papan Kanban dnd-kit, tabel data CRM, dan kanvas Konva.</div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #0369a1; margin-top: 2px;">Demo: nexus-project-mu.vercel.app</div>
      </div>
    </div>

    <!-- CARD 8 -->
    <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #f8fafc; display: flex; gap: 7px; page-break-inside: avoid;">
      <img src="${imgSpotify}" style="width: 65px; height: 50px; border-radius: 4px; object-fit: cover; border: 1px solid #cbd5e1; flex-shrink: 0;" alt="Spotify Web Player">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <strong style="font-size: 7.5pt; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">8. Spotify Music Web Player</strong>
          <span style="font-size: 6pt; background: #e2e8f0; font-family: monospace; font-weight: bold; padding: 1px 3px; border-radius: 2px;">FRONT END</span>
        </div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #475569; margin: 1px 0;">NEXT.JS 16 • WEB AUDIO API • CANVAS • LYRICS</div>
        <div style="font-size: 6.8pt; color: #334155; line-height: 1.25;">Player musik web dengan visualisator kanvas Web Audio API, ekstraksi warna cover album, dan lirik sinkron.</div>
        <div style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #0369a1; margin-top: 2px;">Demo: spotify-clonez.vercel.app</div>
      </div>
    </div>
  </div>

  <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; background: #f1f5f9; display: flex; justify-content: space-between; align-items: center; margin-top: 10px; page-break-inside: avoid;">
    <span style="font-size: 7.2pt; color: #1e293b;"><strong>Catatan:</strong> Seluruh 93 source code repositori dapat diverifikasi langsung pada profil GitHub resmi <strong>github.com/mazkev</strong> dan web portofolio <strong>mazkev.vercel.app</strong>.</span>
    <span style="font-size: 6.5pt; font-family: monospace; font-weight: bold; color: #64748b;">Visual Portfolio Showcase</span>
  </div>
</div>

</body>
</html>`;

const tempHtmlPath = path.resolve('scratch/resume_template.html');
fs.writeFileSync(tempHtmlPath, html);
console.log('Comprehensive HTML written to', tempHtmlPath);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputPath = path.resolve('public/resume.pdf');

try {
  execSync(`"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputPath}" "${tempHtmlPath}"`, { stdio: 'inherit' });
  console.log('PDF successfully generated at:', outputPath);
  const stats = fs.statSync(outputPath);
  console.log('PDF file size:', stats.size, 'bytes');
} catch (err) {
  console.error('Error generating PDF:', err);
}
