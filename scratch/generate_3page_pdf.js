const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getBase64Image(relPath) {
  const fullPath = path.resolve(relPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).replace('.', '').toLowerCase();
    const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    return `data:${mime};base64,${fs.readFileSync(fullPath).toString('base64')}`;
  }
  return '';
}

const profilePicBase64 = getBase64Image('public/profile/kev.png');
const imgGofinance = getBase64Image('public/projects/gofinance.png');
const imgTokopedia = getBase64Image('public/projects/tokopedia.png');
const imgNexus = getBase64Image('public/projects/nexus.png');
const imgCanvass = getBase64Image('public/projects/canvass.png');
const imgMarketx = getBase64Image('public/projects/marketx.png');
const imgSpotify = getBase64Image('public/projects/spotify.png');

function generateExecutive3PageHtml(lang) {
  const isEn = lang === 'en';

  const title = isEn 
    ? 'Kevin Eka Pratama - Executive Technical Resume' 
    : 'Kevin Eka Pratama - Curriculum Vitae Eksekutif';

  const roleTitle = 'Software Engineer';
  const roleSubtitle = isEn
    ? 'Backend Systems • Fullstack Platforms • Cloud Architecture'
    : 'Sistem Backend • Platform Fullstack • Arsitektur Cloud';

  const summary = isEn
    ? `Software Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record maintaining 100% SLA compliance for production operational tickets, authoring structured SQL queries (PostgreSQL, Oracle, MySQL) for transaction verification and data reporting, and monitoring high-availability system workflows 24/7. Concurrently architected and deployed 82 verified software repositories spanning distributed Go & Java Spring Boot microservices, modern Next.js 16 & React 19 web platforms, and cross-platform mobile apps. Strong foundation in Clean Architecture (DDD), ACID transactional ledgers, Redis caching, RabbitMQ message brokers, and Docker containerization.`
    : `Software Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support Sistem Enterprise pada PT PLN Icon+. Memiliki keahlian teruji dalam penanganan tiket operasional produksi dengan kepatuhan SLA 100%, penulisan query SQL terstruktur (PostgreSQL, Oracle, MySQL) untuk validasi data transaksi dan pelaporan, serta pemantauan kestabilan sistem 24/7. Secara mandiri merancang dan membangun 82 repositori perangkat lunak terverifikasi mencakup microservices Go & Java Spring Boot, platform web modern Next.js 16 & React 19, serta aplikasi mobile. Menguasai Clean Architecture (DDD), transaksi atomik ACID, caching Redis, RabbitMQ, dan kontainerisasi Docker.`;

  const job1Title = 'Application Support Engineer';
  const job1Company = 'PT PLN Icon+';
  const job1Date = isEn ? '2023 - Present' : '2023 - Sekarang';
  const job1Bullets = isEn ? [
    'Investigated and resolved technical operational tickets with a <strong>100% SLA compliance rate</strong>, ensuring timely resolution of customer transaction issues.',
    'Authored and executed complex SQL queries across <strong>PostgreSQL, Oracle, and MySQL</strong> for operational data validation, transaction auditing, and business reporting.',
    'Monitored nationwide enterprise system workflows 24/7, analyzed application error logs (HTTP 5xx/4xx), and coordinated directly with core developers for bug/API fixes.'
  ] : [
    'Menginvestigasi dan menyelesaikan tiket insiden teknis serta permintaan operasional produksi dengan tingkat kepatuhan <strong>SLA mencapai 100%</strong> tepat waktu.',
    'Merancang dan mengeksekusi query SQL terstruktur pada database <strong>PostgreSQL, Oracle, dan MySQL</strong> untuk validasi data transaksi, pelaporan operasional, dan pengecekan konsistensi data.',
    'Memantau operasional alur sistem digital enterprise 24/7, menganalisis log error sistem (HTTP 5xx/4xx), dan berkoordinasi langsung dengan tim pengembang inti untuk verifikasi perbaikan API.'
  ];

  const job2Title = isEn 
    ? 'Software Engineering & Open Source Research' 
    : 'Rekayasa Perangkat Lunak & Riset Open Source';
  const job2Company = isEn 
    ? 'Independent Engineering & Open Source Projects' 
    : 'Pengembangan Mandiri & Proyek Open Source';
  const job2Date = isEn ? '2023 - Present' : '2023 - Sekarang';
  const job2Bullets = isEn ? [
    'Architected, built, and audited <strong>82 production-grade repositories</strong> across Backend Microservices (Go, Java Spring Boot, Bun/Hono), Fullstack Web (Next.js 16, React 19), and Mobile.',
    'Designed <strong>ACID transactional schemas</strong>, implemented JWT/RBAC security pipelines, Redis cache-aside patterns, RabbitMQ brokers, and Docker Compose orchestration.',
    'Shipped and maintained <strong>12 live cloud applications</strong> on Vercel with serverless databases, custom domain routing, and responsive UI architecture.'
  ] : [
    'Merancang, membangun, dan mengaudit <strong>82 repositori perangkat lunak</strong> mencakup Backend Microservices (Go, Java Spring Boot, Bun/Hono), Fullstack Web (Next.js 16, React 19), dan Mobile.',
    'Merancang skema database transaksional <strong>ACID</strong>, pipa keamanan JWT/RBAC, pola Redis cache-aside, message broker RabbitMQ, dan orkestrasi Docker Compose.',
    'Men-deploy dan mengelola <strong>12 aplikasi produksi aktif</strong> di cloud Vercel dengan integrasi database serverless dan antarmuka reaktif modern.'
  ];

  const eduDegree = isEn 
    ? 'Bachelor of Computer Science / Information Technology (S.Kom)' 
    : 'Sarjana Ilmu Komputer / Teknik Informatika (S.Kom)';
  const eduUni = 'Universitas AMIKOM • GPA: 3.42 / 4.00';
  const eduDate = '2017 - 2023';
  const eduNote = isEn 
    ? '(Thesis Defense: Dec 2022 | Official Degree / Graduation: 2023)'
    : '(Selesai Ujian Sidang: Des 2022 | Ijazah / Wisuda Resmi: 2023)';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  @page {
    size: A4;
    margin: 8mm 11mm;
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
    font-size: 8.2pt;
    line-height: 1.32;
  }
  .page {
    height: 281mm;
    max-height: 281mm;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    padding-bottom: 6px;
    margin-bottom: 7px;
  }
  .photo {
    width: 58px;
    height: 58px;
    border-radius: 8px;
    object-fit: cover;
    border: 1.5px solid #0f172a;
  }
  .header-text {
    text-align: right;
  }
  .name {
    font-size: 16pt;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    color: #0f172a;
  }
  .role-title {
    font-size: 8.5pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .role-subtitle {
    font-size: 7.2pt;
    font-weight: 700;
    color: #475569;
    margin-bottom: 2px;
  }
  .contact-info {
    font-size: 7.2pt;
    font-family: monospace;
    font-weight: 600;
    color: #334155;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 4px;
  }
  .contact-info a {
    color: #0f172a;
    text-decoration: underline;
  }
  .section {
    margin-bottom: 6.5px;
  }
  .section-title {
    font-size: 8.2pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #0f172a;
    border-bottom: 1.2px solid #0f172a;
    padding-bottom: 2px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .badge {
    font-size: 6.5pt;
    font-family: monospace;
    font-weight: 700;
    color: #64748b;
  }
  .summary-text {
    font-size: 7.8pt;
    color: #1e293b;
    text-align: justify;
    line-height: 1.35;
  }
  .job {
    margin-bottom: 5px;
  }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1.5px;
  }
  .job-title {
    font-size: 8.2pt;
    font-weight: 800;
    color: #0f172a;
  }
  .job-company {
    font-size: 7.5pt;
    font-weight: 700;
    color: #334155;
  }
  .job-date {
    font-size: 6.8pt;
    font-family: monospace;
    font-weight: 700;
    color: #475569;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    border: 0.5px solid #cbd5e1;
  }
  .bullets {
    list-style: square;
    padding-left: 13px;
    font-size: 7.6pt;
    color: #1e293b;
    line-height: 1.32;
  }
  .bullets li {
    margin-bottom: 1.5px;
  }
  .skills-block {
    font-size: 7.3pt;
    color: #1e293b;
    line-height: 1.38;
  }
  .skills-block div {
    margin-bottom: 2px;
  }
  .skills-block strong {
    color: #0f172a;
    font-weight: 800;
  }
  .edu-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .page-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.8px solid #cbd5e1;
    padding-top: 3px;
    font-size: 6.5pt;
    font-family: monospace;
    color: #64748b;
  }

  /* PAGE 2 STYLES: TECHNICAL REPOSITORY DIRECTORY */
  .pillar-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 3px solid #0f172a;
    border-radius: 4px;
    padding: 4px 6px;
    margin-bottom: 5px;
  }
  .pillar-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 0.5px solid #e2e8f0;
    padding-bottom: 1.5px;
    margin-bottom: 2.5px;
  }
  .pillar-title {
    font-size: 8pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
  }
  .pillar-count {
    font-size: 6.5pt;
    font-family: monospace;
    font-weight: 700;
    color: #475569;
    background: #e2e8f0;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .pillar-tech {
    font-size: 6.5pt;
    font-family: monospace;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 2px;
  }
  .repo-item {
    font-size: 7.1pt;
    color: #334155;
    line-height: 1.25;
    margin-bottom: 2px;
    display: flex;
    align-items: baseline;
    gap: 4px;
  }
  .repo-name {
    font-family: monospace;
    font-weight: 700;
    color: #0f172a;
    text-decoration: underline;
    font-size: 6.8pt;
  }
  .table-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5px;
    font-size: 6.8pt;
  }
  .live-item {
    background: #f8fafc;
    border: 0.5px solid #e2e8f0;
    border-radius: 3px;
    padding: 2.5px 5px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  /* PAGE 3 STYLES: VISUAL GALLERY */
  .visual-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-bottom: 5px;
  }
  .visual-card {
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    background: #ffffff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .visual-img-container {
    height: 72px;
    width: 100%;
    background: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
    overflow: hidden;
    position: relative;
  }
  .visual-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .visual-body {
    padding: 4px 6px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .visual-title {
    font-size: 7.6pt;
    font-weight: 800;
    color: #0f172a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .visual-cat {
    font-size: 5.8pt;
    font-family: monospace;
    font-weight: 700;
    background: #e2e8f0;
    color: #1e293b;
    padding: 1px 3px;
    border-radius: 2px;
    text-transform: uppercase;
  }
  .visual-tech {
    font-size: 6.2pt;
    font-family: monospace;
    font-weight: 700;
    color: #475569;
    margin: 1.5px 0;
  }
  .visual-desc {
    font-size: 6.8pt;
    color: #334155;
    line-height: 1.25;
    margin-bottom: 3px;
  }
  .visual-links {
    font-size: 6.2pt;
    font-family: monospace;
    display: flex;
    gap: 6px;
    border-top: 0.5px solid #f1f5f9;
    padding-top: 2px;
  }
  .visual-links a {
    color: #0284c7;
    text-decoration: underline;
  }
</style>
</head>
<body>

<!-- ============================================================== -->
<!-- PAGE 1: EXECUTIVE ATS CORE RESUME (PROFIL & EXPERTISE)         -->
<!-- ============================================================== -->
<div class="page">
  <div>
    <!-- HEADER -->
    <div class="header">
      <img src="${profilePicBase64}" alt="Kevin Eka Pratama" class="photo">
      <div class="header-text">
        <h1 class="name">Kevin Eka Pratama</h1>
        <div class="role-title">${roleTitle}</div>
        <div class="role-subtitle">${roleSubtitle}</div>
        <div class="contact-info">
          <span>📧 <a href="mailto:kevinekapratama@gmail.com">kevinekapratama@gmail.com</a></span>
          <span>•</span>
          <span>📞 +62 (813) 2661-2344</span>
          <span>•</span>
          <span>🌐 <a href="https://mazkev.vercel.app">mazkev.vercel.app</a></span>
          <span>•</span>
          <span>🐙 <a href="https://github.com/mazkev">github.com/mazkev</a></span>
          <span>•</span>
          <span>📍 Jakarta, Indonesia</span>
        </div>
      </div>
    </div>

    <!-- EXECUTIVE SUMMARY -->
    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Executive Summary' : 'Ringkasan Eksekutif'}</span>
        <span class="badge">${isEn ? 'Professional Engineering Profile' : 'Profil Rekayasa Profesional'}</span>
      </div>
      <p class="summary-text">${summary}</p>
    </div>

    <!-- PROFESSIONAL EXPERIENCE -->
    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Professional Experience' : 'Pengalaman Profesional'}</span>
        <span class="badge">${isEn ? 'Production Systems & Open Source' : 'Sistem Produksi & Open Source'}</span>
      </div>

      <!-- JOB 1 -->
      <div class="job">
        <div class="job-header">
          <div>
            <span class="job-title">${job1Title}</span>
            <span style="color: #64748b; font-size: 7.5pt;"> • </span>
            <span class="job-company">${job1Company}</span>
          </div>
          <span class="job-date">${job1Date}</span>
        </div>
        <ul class="bullets">
          ${job1Bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>

      <!-- JOB 2 -->
      <div class="job">
        <div class="job-header">
          <div>
            <span class="job-title">${job2Title}</span>
            <span style="color: #64748b; font-size: 7.5pt;"> • </span>
            <span class="job-company">${job2Company}</span>
          </div>
          <span class="job-date">${job2Date}</span>
        </div>
        <ul class="bullets">
          ${job2Bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- TECHNICAL COMPETENCIES -->
    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Technical Competencies & Core Stack' : 'Kompetensi Teknis & Core Stack'}</span>
        <span class="badge">Enterprise Stack</span>
      </div>
      <div class="skills-block">
        <div><strong>${isEn ? 'Languages:' : 'Bahasa Pemrograman:'}</strong> Go (Golang), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, PHP 8, Dart, SQL, HTML5/CSS3</div>
        <div><strong>${isEn ? 'Backend & Cloud:' : 'Backend & Arsitektur:'}</strong> Java Spring Boot 3.3, Go (Gin/Fiber/Echo), Bun + Hono, Express.js, FastAPI, Laravel 12, Clean Architecture (DDD), RESTful APIs, gRPC (Protobuf), Microservices, WebSocket</div>
        <div><strong>${isEn ? 'Frontend & Mobile:' : 'Frontend & Mobile:'}</strong> Next.js 16 (App Router), React 19, TypeScript, Vue 3 (Pinia), Angular 19 (Signals), React Native (Expo SDK 56), Flutter (Riverpod 3), Tailwind CSS v4, Zustand, Redux Toolkit</div>
        <div><strong>${isEn ? 'Databases & Messaging:' : 'Database & Message Broker:'}</strong> PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling), MySQL, MongoDB, SQLite (LibSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ (Message Broker)</div>
        <div><strong>${isEn ? 'DevOps, Tooling & Testing:' : 'DevOps & Alat Rekayasa:'}</strong> Docker, Docker Compose, Git & GitHub, Postman, Swagger / OpenAPI, Vite, Webpack 5, Linux Bash, Vercel Edge Runtime</div>
      </div>
    </div>

    <!-- EDUCATION -->
    <div class="section" style="margin-bottom: 0;">
      <div class="section-title">
        <span>${isEn ? 'Education' : 'Pendidikan'}</span>
        <span class="badge">Accredited Degree</span>
      </div>
      <div class="edu-row">
        <div>
          <span style="font-size: 8.2pt; font-weight: 800; color: #0f172a;">${eduDegree}</span>
          <span style="color: #64748b; font-size: 7.5pt;"> • </span>
          <span style="font-size: 7.5pt; font-weight: 700; color: #334155;">${eduUni}</span>
          <span style="font-size: 6.8pt; color: #64748b; font-family: monospace;"> ${eduNote}</span>
        </div>
        <span class="job-date">${eduDate}</span>
      </div>
    </div>
  </div>

  <!-- FOOTER PAGE 1 -->
  <div class="page-footer">
    <span>Kevin Eka Pratama • ${roleTitle}</span>
    <span>kevinekapratama@gmail.com • +62 (813) 2661-2344</span>
    <span>Page 1 of 3 (Executive Profile)</span>
  </div>
</div>

<div class="page-break"></div>

<!-- ============================================================== -->
<!-- PAGE 2: TECHNICAL PROJECT & REPOSITORY DIRECTORY (82 REPOS)   -->
<!-- ============================================================== -->
<div class="page">
  <div>
    <!-- PAGE 2 HEADER -->
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: baseline;">
      <div>
        <h2 style="font-size: 11pt; font-weight: 900; text-transform: uppercase; color: #0f172a;">
          ${isEn ? 'Technical Project & Repository Directory' : 'Direktori & Katalog Repositori Rekayasa Perangkat Lunak'}
        </h2>
        <span style="font-size: 7pt; font-weight: 700; color: #475569;">
          ${isEn ? '82 Curated Open-Source Repositories Grouped by Engineering Pillars' : '82 Repositori Terverifikasi Dikelompokkan ke Dalam 3 Pilar Teknis'}
        </span>
      </div>
      <div style="font-size: 7pt; font-family: monospace; font-weight: 700; color: #334155;">
        <span>mazkev.vercel.app</span>
      </div>
    </div>

    <!-- EXECUTIVE METRICS GRID -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 6px;">
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 3px 5px; text-align: center;">
        <div style="font-size: 10.5pt; font-weight: 900; color: #15803d;">19 Repos</div>
        <div style="font-size: 6pt; font-weight: 700; color: #166534; text-transform: uppercase;">Backend & Cloud</div>
      </div>
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 3px 5px; text-align: center;">
        <div style="font-size: 10.5pt; font-weight: 900; color: #1d4ed8;">22 Repos</div>
        <div style="font-size: 6pt; font-weight: 700; color: #1e40af; text-transform: uppercase;">Fullstack & Mobile</div>
      </div>
      <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 3px 5px; text-align: center;">
        <div style="font-size: 10.5pt; font-weight: 900; color: #7e22ce;">41 Repos</div>
        <div style="font-size: 6pt; font-weight: 700; color: #6b21a8; text-transform: uppercase;">Frontend Web Apps</div>
      </div>
      <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 4px; padding: 3px 5px; text-align: center;">
        <div style="font-size: 10.5pt; font-weight: 900; color: #0f766e;">12 Live Apps</div>
        <div style="font-size: 6pt; font-weight: 700; color: #115e59; text-transform: uppercase;">Active Vercel URLs</div>
      </div>
    </div>

    <!-- 3 PILLARS BREAKDOWN (TECHNICAL REPOSITORY DIRECTORY) -->
    
    <!-- PILLAR 1: BACKEND & CLOUD SYSTEMS (19 Repos) -->
    <div class="pillar-card">
      <div class="pillar-header">
        <span class="pillar-title">${isEn ? 'Pillar 1: Backend Systems & Cloud Architecture' : 'Pilar 1: Sistem Backend & Arsitektur Cloud'}</span>
        <span class="pillar-count">19 Repositories</span>
      </div>
      <div class="pillar-tech">Go (Golang) • Java Spring Boot • Bun/Hono • Node.js • PostgreSQL • Redis • RabbitMQ • gRPC • Docker</div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/go-banking-core-system" class="repo-name">go-banking-core-system:</a> ${isEn ? 'Core banking engine with atomic balance transfers, ACID PostgreSQL row locks, and Bcrypt PIN.' : 'Engine core banking transaksi transfer saldo atomik dengan row-level lock PostgreSQL dan validasi PIN Bcrypt.'}</span>
      </div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/go-distributed-microservices-lab" class="repo-name">go-distributed-microservices-lab:</a> ${isEn ? 'High-throughput microservices communicating over binary gRPC and asynchronous RabbitMQ event bus.' : 'Layanan mikro terdistribusi dengan komunikasi biner gRPC dan antrean pesan asinkron RabbitMQ.'}</span>
      </div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/nexus-workspace-engine" class="repo-name">nexus-workspace-engine:</a> ${isEn ? 'Java Spring Boot 3.3 enterprise microservices ecosystem with Resilience4j circuit breakers and Eureka discovery.' : 'Ekosistem microservices enterprise Java Spring Boot 3.3 dengan circuit breaker Resilience4j dan discovery Eureka.'}</span>
      </div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/go-clean-arch" class="repo-name">go-clean-arch:</a> ${isEn ? 'Decoupled Clean Architecture boilerplate implementing strict Domain, Usecase, and Repository boundaries.' : 'Arsitektur Clean terstruktur dengan pemisahan tegas antara lapisan Domain, Usecase, dan Repository.'}</span>
      </div>
    </div>

    <!-- PILLAR 2: FULLSTACK & MOBILE PLATFORMS (22 Repos) -->
    <div class="pillar-card">
      <div class="pillar-header">
        <span class="pillar-title">${isEn ? 'Pillar 2: Fullstack Web Platforms & Mobile Applications' : 'Pilar 2: Platform Web Fullstack & Aplikasi Mobile'}</span>
        <span class="pillar-count">22 Repositories</span>
      </div>
      <div class="pillar-tech">Next.js 16 • React 19 • React Native (Expo SDK 56) • Flutter • FastAPI • Laravel 12 • Prisma 7 • LibSQL</div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/baye-ecommerce-marketplace" class="repo-name">baye-ecommerce-marketplace:</a> ${isEn ? 'Auction e-commerce with Next.js 16 Server Components, live bidding simulation, LibSQL, and digital QR invoices.' : 'Marketplace lelang produksi dengan Next.js 16, LibSQL serverless, komparasi produk, dan cetak invoice QR digital.'}</span>
      </div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/tokopedia-react-storefront" class="repo-name">tokopedia-react-storefront:</a> ${isEn ? 'Fullstack marketplace combining Go REST API backend with React 19, category filters, and optimistic cart checkout.' : 'E-commerce fullstack memadukan backend Go REST API dengan frontend React 19 dan sinkronisasi transaksi PostgreSQL.'}</span>
      </div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/treveloka-react-native-expo" class="repo-name">treveloka-react-native-expo:</a> ${isEn ? 'Mobile travel booking superapp with React Native 0.85, Expo Router, and Gemini AI itinerary assistant.' : 'Aplikasi mobile pemesanan perjalanan dengan React Native 0.85, Expo Router, dan asisten rencana perjalanan Gemini AI.'}</span>
      </div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/tiktok-clone-react-native-expo" class="repo-name">tiktok-clone-react-native-expo:</a> ${isEn ? 'Mobile short-video platform featuring Expo Video autoplay feeds, camera recording, and live comment overlays.' : 'Platform video pendek mobile dengan pemutar Expo Video seamless autoplay dan perekaman video kamera terintegrasi.'}</span>
      </div>
    </div>

    <!-- PILLAR 3: FRONTEND WEB APPLICATIONS (41 Repos) -->
    <div class="pillar-card">
      <div class="pillar-header">
        <span class="pillar-title">${isEn ? 'Pillar 3: Modern Frontend Web Applications' : 'Pilar 3: Aplikasi Frontend Web Modern'}</span>
        <span class="pillar-count">41 Repositories</span>
      </div>
      <div class="pillar-tech">React 19 • Vue 3 (Pinia) • Angular 19 (Signals) • Zustand • Tailwind CSS v4 • React-Konva • Web Audio API</div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/react-canva-design-studio" class="repo-name">react-canva-design-studio:</a> ${isEn ? 'Vector graphic studio with dual-layer 60 FPS React-Konva canvas, transformation matrices, and image export.' : 'Studio desain grafis berbasis web dengan dual-layer kanvas 60 FPS React-Konva dan pipeline ekspor multi-format.'}</span>
      </div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/market-x-angular" class="repo-name">market-x-angular:</a> ${isEn ? 'Enterprise e-commerce storefront powered by Angular 19 reactive Signals, RxJS event streams, and seller dashboard.' : 'Storefront e-commerce enterprise dengan reaktivitas Angular 19 Signals, RxJS streams, dan dashboard penjual.'}</span>
      </div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/nextjs-spotify-music-player" class="repo-name">nextjs-spotify-music-player:</a> ${isEn ? 'Music streaming player with real-time Web Audio API frequency analysis canvas visualizer and synchronized lyrics.' : 'Pemutar musik web dengan visualisasi frekuensi real-time Web Audio API pada kanvas dan sinkronisasi lirik.'}</span>
      </div>
      <div class="repo-item">
        <span>•</span>
        <span><a href="https://github.com/mazkev/react-trello-kanban-suite" class="repo-name">react-trello-kanban-suite:</a> ${isEn ? 'Glassmorphism Kanban project board with multi-axis drag-and-drop task sorting and Zustand state management.' : 'Board manajemen proyek Kanban glassmorphism dengan drag-and-drop multi-axis dan state store Zustand.'}</span>
      </div>
    </div>

    <!-- 12 VERIFIED CLOUD DEPLOYMENTS -->
    <div class="section" style="margin-bottom: 4px;">
      <div class="section-title">
        <span>${isEn ? '12 Verified Cloud Deployments (HTTP 200 OK on Vercel)' : '12 Aplikasi Aktif Terverifikasi di Cloud (Vercel)'}</span>
        <span class="badge">${isEn ? 'Clickable Live Demos' : 'Dapat Diuji Langsung'}</span>
      </div>
      <div class="table-grid">
        <div class="live-item"><strong>1. BayE Auction Store:</strong> <a href="https://baye-ecommerce-marketplace.vercel.app" style="color: #059669; text-decoration: underline;">baye-ecommerce-marketplace.vercel.app</a></div>
        <div class="live-item"><strong>2. Nexus Workspace:</strong> <a href="https://nexus-project-mu.vercel.app" style="color: #059669; text-decoration: underline;">nexus-project-mu.vercel.app</a></div>
        <div class="live-item"><strong>3. Spotify Music Player:</strong> <a href="https://spotify-clonez.vercel.app" style="color: #059669; text-decoration: underline;">spotify-clonez.vercel.app</a></div>
        <div class="live-item"><strong>4. Indofooty Match Hub:</strong> <a href="https://indofooty.vercel.app" style="color: #059669; text-decoration: underline;">indofooty.vercel.app</a></div>
        <div class="live-item"><strong>5. AI Wireframer Lab:</strong> <a href="https://ai-component-wireframer.vercel.app" style="color: #059669; text-decoration: underline;">ai-component-wireframer.vercel.app</a></div>
        <div class="live-item"><strong>6. Umrah Travel Portal:</strong> <a href="https://umrah-travel-landing.vercel.app" style="color: #059669; text-decoration: underline;">umrah-travel-landing.vercel.app</a></div>
        <div class="live-item"><strong>7. Cloud Simulator:</strong> <a href="https://cloud-console-simulator.vercel.app" style="color: #059669; text-decoration: underline;">cloud-console-simulator.vercel.app</a></div>
        <div class="live-item"><strong>8. Snake AI Pathfinding:</strong> <a href="https://snake-ai-pathfinding.vercel.app" style="color: #059669; text-decoration: underline;">snake-ai-pathfinding.vercel.app</a></div>
        <div class="live-item"><strong>9. Canvass Design Studio:</strong> <a href="https://canva-clone-fawn.vercel.app" style="color: #059669; text-decoration: underline;">canva-clone-fawn.vercel.app</a></div>
        <div class="live-item"><strong>10. Trello Kanban Suite:</strong> <a href="https://trello-azure-five.vercel.app" style="color: #059669; text-decoration: underline;">trello-azure-five.vercel.app</a></div>
        <div class="live-item"><strong>11. MarketX Angular Store:</strong> <a href="https://market-x-angular.vercel.app" style="color: #059669; text-decoration: underline;">market-x-angular.vercel.app</a></div>
        <div class="live-item"><strong>12. HubSpot CRM Platform:</strong> <a href="https://hub-spot-clone-five.vercel.app" style="color: #059669; text-decoration: underline;">hub-spot-clone-five.vercel.app</a></div>
      </div>
    </div>

    <!-- AUDIT NOTE -->
    <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 6px;">
      <span style="font-size: 6.6pt; color: #1e293b; line-height: 1.25;">
        <strong>${isEn ? 'Directory Audit Note:' : 'Catatan Audit Direktori:'}</strong> 
        ${isEn 
          ? 'Full source code, commit history, and test suites for all 82 audited repositories are publicly available at <strong>github.com/mazkev</strong> and interactive web workstation at <strong>mazkev.vercel.app</strong>.'
          : 'Seluruh source code, riwayat komit, dan dokumentasi arsitektur untuk 82 repositori terverifikasi dapat diaudit publik pada <strong>github.com/mazkev</strong> dan workstation <strong>mazkev.vercel.app</strong>.'}
      </span>
    </div>
  </div>

  <!-- FOOTER PAGE 2 -->
  <div class="page-footer">
    <span>Kevin Eka Pratama • ${roleTitle}</span>
    <span>mazkev.vercel.app • github.com/mazkev</span>
    <span>Page 2 of 3 (Technical Project Directory)</span>
  </div>
</div>

<div class="page-break"></div>

<!-- ============================================================== -->
<!-- PAGE 3: VISUAL PROJECT CASE STUDIES ANNEX (SHOWCASE GALLERY)   -->
<!-- ============================================================== -->
<div class="page">
  <div>
    <!-- PAGE 3 HEADER -->
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: baseline;">
      <div>
        <h2 style="font-size: 11pt; font-weight: 900; text-transform: uppercase; color: #0f172a;">
          ${isEn ? 'Visual Project Annex & Production Interfaces' : 'Lampiran Visual Portofolio & Bukti Antarmuka Produksi'}
        </h2>
        <span style="font-size: 7pt; font-weight: 700; color: #475569;">
          ${isEn ? 'High-Fidelity Visual Proof: Real Production Screenshots, Workstation Canvas & Live Demos' : 'Bukti Visual Nyata: Tangkapan Layar Produksi Asli, Kanvas Interaktif & Live Demo'}
        </span>
      </div>
      <div style="font-size: 7pt; font-family: monospace; font-weight: 700; color: #334155;">
        <span>mazkev.vercel.app</span>
      </div>
    </div>

    <!-- 6 VISUAL CARDS GRID (2 cols x 3 rows) -->
    <div class="visual-grid">
      <!-- CARD 1: GoFinance -->
      <div class="visual-card">
        <div class="visual-img-container">
          <img src="${imgGofinance}" alt="GoFinance Core Banking" class="visual-img">
        </div>
        <div class="visual-body">
          <div class="visual-title">
            <span>1. GoFinance Banking Core API</span>
            <span class="visual-cat" style="background: #e0f2fe; color: #0369a1;">Backend</span>
          </div>
          <div class="visual-tech">Go • Echo • PostgreSQL • Redis • RabbitMQ • Docker</div>
          <p class="visual-desc">
            ${isEn 
              ? 'High-concurrency banking engine with ACID transactional account transfers, Redis cache-aside ledger, RabbitMQ message brokers, and Bcrypt security.' 
              : 'Engine core banking dengan transaksi transfer akun atomik berstandar ACID, Redis cache-aside, message broker RabbitMQ, dan pengamanan Bcrypt.'}
          </p>
          <div class="visual-links">
            <a href="https://github.com/mazkev/go-banking-core-system">github.com/mazkev/go-banking-core-system</a>
          </div>
        </div>
      </div>

      <!-- CARD 2: Nexus -->
      <div class="visual-card">
        <div class="visual-img-container">
          <img src="${imgNexus}" alt="Nexus Microservices" class="visual-img">
        </div>
        <div class="visual-body">
          <div class="visual-title">
            <span>2. Nexus Enterprise Microservices</span>
            <span class="visual-cat" style="background: #e0e7ff; color: #4338ca;">Fullstack</span>
          </div>
          <div class="visual-tech">Next.js 16 • Java Spring Boot • Resilience4j • PostgreSQL</div>
          <p class="visual-desc">
            ${isEn 
              ? 'Distributed enterprise platform featuring Spring Cloud service discovery, circuit-breaker failover protection, and reactive Next.js workspace client.' 
              : 'Platform enterprise terdistribusi dengan service discovery Spring Cloud, proteksi circuit breaker Resilience4j, dan klien workspace Next.js 16.'}
          </p>
          <div class="visual-links">
            <a href="https://nexus-project-mu.vercel.app" style="color: #059669; font-weight: 700;">Live Demo</a>
            <span>•</span>
            <a href="https://github.com/mazkev/nexus-workspace-engine">GitHub Repo</a>
          </div>
        </div>
      </div>

      <!-- CARD 3: Tokopedia -->
      <div class="visual-card">
        <div class="visual-img-container">
          <img src="${imgTokopedia}" alt="Tokopedia Marketplace" class="visual-img">
        </div>
        <div class="visual-body">
          <div class="visual-title">
            <span>3. Tokopedia Fullstack Commerce</span>
            <span class="visual-cat" style="background: #fef3c7; color: #b45309;">Fullstack</span>
          </div>
          <div class="visual-tech">Go REST API • React 19 • PostgreSQL • Tailwind CSS v4</div>
          <p class="visual-desc">
            ${isEn 
              ? 'Commercial e-commerce platform pairing a Go REST API with React 19. Features optimistic cart updates, category filtering chips, and checkout transactions.' 
              : 'Platform e-commerce mengintegrasikan Go REST API dengan React 19. Dilengkapi sinkronisasi keranjang optimistik dan checkout transaksi PostgreSQL.'}
          </p>
          <div class="visual-links">
            <a href="https://tokopedia-react.vercel.app" style="color: #059669; font-weight: 700;">Live Demo</a>
            <span>•</span>
            <a href="https://github.com/mazkev/tokopedia-react-storefront">GitHub Repo</a>
          </div>
        </div>
      </div>

      <!-- CARD 4: Canvass -->
      <div class="visual-card">
        <div class="visual-img-container">
          <img src="${imgCanvass}" alt="Canvass Design Studio" class="visual-img">
        </div>
        <div class="visual-body">
          <div class="visual-title">
            <span>4. Canvass Visual Graphic Studio</span>
            <span class="visual-cat" style="background: #f3e8ff; color: #7e22ce;">Frontend</span>
          </div>
          <div class="visual-tech">React 19 • React-Konva • Zustand • Tailwind CSS v4</div>
          <p class="visual-desc">
            ${isEn 
              ? 'Browser-based vector graphic publishing workspace with dual-layer 60 FPS canvas, multi-element transform matrices, and high-resolution PNG export.' 
              : 'Workstation desain vektor grafis berbasis web dengan dual-layer kanvas 60 FPS, manipulasi transform matriks elemen, dan ekspor multi-format.'}
          </p>
          <div class="visual-links">
            <a href="https://canva-clone-fawn.vercel.app" style="color: #059669; font-weight: 700;">Live Demo</a>
            <span>•</span>
            <a href="https://github.com/mazkev/react-canva-design-studio">GitHub Repo</a>
          </div>
        </div>
      </div>

      <!-- CARD 5: MarketX -->
      <div class="visual-card">
        <div class="visual-img-container">
          <img src="${imgMarketx}" alt="MarketX Angular Store" class="visual-img">
        </div>
        <div class="visual-body">
          <div class="visual-title">
            <span>5. MarketX Angular E-Commerce</span>
            <span class="visual-cat" style="background: #fee2e2; color: #b91c1c;">Frontend</span>
          </div>
          <div class="visual-tech">Angular 19 • Angular Signals • RxJS • Responsive Dash</div>
          <p class="visual-desc">
            ${isEn 
              ? 'Enterprise storefront powered by Angular 19 reactive Signals and RxJS event streams. Features live order tracking and merchant back-office management.' 
              : 'Storefront enterprise menggunakan reaktivitas Angular Signals dan RxJS event streams. Dilengkapi pelacak status pesanan live dan back-office penjual.'}
          </p>
          <div class="visual-links">
            <a href="https://market-x-angular.vercel.app" style="color: #059669; font-weight: 700;">Live Demo</a>
            <span>•</span>
            <a href="https://github.com/mazkev/angular-marketplace-storefront">GitHub Repo</a>
          </div>
        </div>
      </div>

      <!-- CARD 6: Spotify -->
      <div class="visual-card">
        <div class="visual-img-container">
          <img src="${imgSpotify}" alt="Spotify Music Player" class="visual-img">
        </div>
        <div class="visual-body">
          <div class="visual-title">
            <span>6. Spotify Web Player & Visualizer</span>
            <span class="visual-cat" style="background: #dcfce7; color: #15803d;">Frontend</span>
          </div>
          <div class="visual-tech">Next.js 16 • Web Audio API • Frequency Visualizer • Tailwind</div>
          <p class="visual-desc">
            ${isEn 
              ? 'High-fidelity audio streaming client with real-time Web Audio API frequency analysis canvas visualizer, dynamic album color palette extraction, and lyrics.' 
              : 'Klien streaming audio dengan visualisasi frekuensi real-time Web Audio API pada kanvas, ekstraksi warna cover album dinamis, dan sinkronisasi lirik.'}
          </p>
          <div class="visual-links">
            <a href="https://spotify-clonez.vercel.app" style="color: #059669; font-weight: 700;">Live Demo</a>
            <span>•</span>
            <a href="https://github.com/mazkev/nextjs-spotify-music-player">GitHub Repo</a>
          </div>
        </div>
      </div>
    </div>

    <!-- VISUAL ANNEX FOOTNOTE -->
    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 7px;">
      <span style="font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
        <strong>${isEn ? 'Interactive Demonstration & Source Code Audit:' : 'Demonstrasi Interaktif & Audit Kode Sumber:'}</strong> 
        ${isEn 
          ? 'Live deployments, interactive case studies, architectural documentation, and full source code for all 82 projects are accessible at <strong>mazkev.vercel.app</strong> and <strong>github.com/mazkev</strong>.' 
          : 'Seluruh demo aplikasi langsung, studi kasus interaktif, dokumentasi arsitektur, dan kode sumber untuk 82 repositori dapat diakses publik pada <strong>mazkev.vercel.app</strong> dan <strong>github.com/mazkev</strong>.'}
      </span>
    </div>
  </div>

  <!-- FOOTER PAGE 3 -->
  <div class="page-footer">
    <span>Kevin Eka Pratama • ${roleTitle}</span>
    <span>mazkev.vercel.app • github.com/mazkev</span>
    <span>Page 3 of 3 (Visual Project Annex)</span>
  </div>
</div>

</body>
</html>`;
}

// Generate English 3-Page Executive PDF
const enHtml = generateExecutive3PageHtml('en');
const enHtmlPath = path.resolve('scratch/resume_en_template.html');
fs.writeFileSync(enHtmlPath, enHtml);

// Generate Indonesian 3-Page Executive PDF
const idHtml = generateExecutive3PageHtml('id');
const idHtmlPath = path.resolve('scratch/resume_id_template.html');
fs.writeFileSync(idHtmlPath, idHtml);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputEn = path.resolve('public/resume.pdf');
const outputId = path.resolve('public/resume-id.pdf');

try {
  console.log('Generating English 3-Page PDF...');
  execSync(`"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputEn}" "${enHtmlPath}"`, { stdio: 'inherit' });
  const statEn = fs.statSync(outputEn);
  console.log(`Generated public/resume.pdf (${statEn.size} bytes)`);

  console.log('Generating Indonesian 3-Page PDF...');
  execSync(`"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputId}" "${idHtmlPath}"`, { stdio: 'inherit' });
  const statId = fs.statSync(outputId);
  console.log(`Generated public/resume-id.pdf (${statId.size} bytes)`);
} catch (err) {
  console.error('Error generating PDF:', err);
}
