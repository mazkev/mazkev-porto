const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const profilePicPath = path.resolve('public/profile/kev.png');
const profilePicBase64 = fs.existsSync(profilePicPath) 
  ? fs.readFileSync(profilePicPath).toString('base64') 
  : '';
const imgSrc = `data:image/png;base64,${profilePicBase64}`;

function generateExecutiveHtml(lang) {
  const isEn = lang === 'en';

  const title = isEn 
    ? 'Kevin Eka Pratama - Executive Technical Resume' 
    : 'Kevin Eka Pratama - Curriculum Vitae Eksekutif';

  const roleTitle = isEn 
    ? 'Software Engineer' 
    : 'Software Engineer';
  const roleSubtitle = isEn
    ? 'Backend Systems • Fullstack Platforms • Cloud Architecture'
    : 'Sistem Backend • Platform Fullstack • Arsitektur Cloud';

  const summary = isEn
    ? `Software Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record maintaining 100% SLA compliance for production operational tickets, authoring structured SQL queries (PostgreSQL, Oracle, MySQL) for transaction verification and data reporting, and monitoring high-availability system workflows 24/7. Concurrently architected and deployed 82 verified software repositories spanning distributed Go & Java Spring Boot microservices, modern Next.js 16 & React 19 web platforms, and mobile apps. Strong foundation in Clean Architecture (DDD), ACID transactional ledgers, Redis caching, RabbitMQ message brokers, and Docker containerization.`
    : `Software Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support Sistem Enterprise pada PT PLN Icon+. Memiliki keahlian teruji dalam penanganan tiket operasional produksi dengan kepatuhan SLA 100%, penulisan query SQL terstruktur (PostgreSQL, Oracle, MySQL) untuk validasi data transaksi dan pelaporan, serta pemantauan kestabilan sistem 24/7. Secara mandiri merancang dan membangun 82 repositori perangkat lunak terverifikasi mencakup microservices Go & Java Spring Boot, platform web modern Next.js 16 & React 19, serta aplikasi mobile. Menguasai Clean Architecture (DDD), transaksi atomik ACID, caching Redis, RabbitMQ, dan kontainerisasi Docker.`;

  const job1Title = isEn ? 'Application Support Engineer' : 'Application Support Engineer';
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
    margin: 8mm 12mm;
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
  .case-study {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 3px solid #0f172a;
    border-radius: 4px;
    padding: 4px 6px;
    margin-bottom: 4px;
  }
  .case-title {
    font-size: 7.8pt;
    font-weight: 800;
    color: #0f172a;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .case-tech {
    font-size: 6.6pt;
    font-family: monospace;
    font-weight: 700;
    color: #475569;
    margin: 1px 0;
  }
  .case-desc {
    font-size: 7.2pt;
    color: #334155;
    line-height: 1.25;
  }
  .table-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
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
</style>
</head>
<body>

<!-- PAGE 1: EXECUTIVE ATS CORE RESUME -->
<div class="page">
  <div>
    <!-- HEADER -->
    <div class="header">
      <img src="${imgSrc}" class="photo" alt="Kevin Eka Pratama">
      <div class="header-text">
        <div class="name">Kevin Eka Pratama</div>
        <div class="role-title">${roleTitle}</div>
        <div class="role-subtitle">${roleSubtitle}</div>
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

    <!-- SUMMARY -->
    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Executive Summary' : 'Ringkasan Eksekutif'}</span>
        <span class="badge">${isEn ? 'Official ATS Format • Page 1 of 2' : 'Standar Resmi ATS • Halaman 1 dari 2'}</span>
      </div>
      <p class="summary-text">${summary}</p>
    </div>

    <!-- EXPERIENCE -->
    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Professional Experience' : 'Pengalaman Profesional'}</span>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div>
            <span class="job-title">${job1Title}</span> — <span class="job-company">${job1Company}</span>
          </div>
          <span class="job-date">${job1Date}</span>
        </div>
        <ul class="bullets">
          ${job1Bullets.map(b => `<li>${b}</li>`).join('\n')}
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <div>
            <span class="job-title">${job2Title}</span> — <span class="job-company">${job2Company}</span>
          </div>
          <span class="job-date">${job2Date}</span>
        </div>
        <ul class="bullets">
          ${job2Bullets.map(b => `<li>${b}</li>`).join('\n')}
        </ul>
      </div>
    </div>

    <!-- TECHNICAL SKILLS -->
    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Technical Competencies & Core Stack' : 'Kompetensi Teknis & Core Stack'}</span>
      </div>
      <div class="skills-block">
        <div><strong>${isEn ? 'Languages:' : 'Bahasa Pemrograman:'}</strong> Go (Golang 1.25/1.26), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), PHP 8.3, Python 3, Dart, SQL, HTML5, CSS3/Tailwind CSS v4</div>
        <div><strong>${isEn ? 'Backend & Microservices:' : 'Backend & Microservices:'}</strong> Gin, Fiber, Java Spring Boot 3.3 (Security 6, JPA, AOP), Bun + Hono v4, Express.js v5, Laravel 12, FastAPI, gRPC, Protobuf, REST APIs, Reverse Proxy, Swagger / OpenAPI 3.0</div>
        <div><strong>${isEn ? 'Databases, Caching & Messaging:' : 'Database, Cache & Message Broker:'}</strong> PostgreSQL 15/16 (GORM, Prisma 7, Connection Pooling, ACID), MySQL (Sequelize), MongoDB NoSQL, SQLite (LibSQL), Redis (Cache-Aside, Rate Limiter), RabbitMQ (AMQP)</div>
        <div><strong>${isEn ? 'Frontend & Mobile:' : 'Frontend & Mobile:'}</strong> React 19, Next.js 16 (App Router, Server Components), Vue 3 (Pinia), Angular 19 (Signals), React Native (Expo SDK 56), Flutter (Riverpod 3), Zustand, TanStack Query v5, React-Konva</div>
        <div><strong>${isEn ? 'DevOps, Cloud & Tooling:' : 'DevOps & Alat Rekayasa:'}</strong> Docker, Docker Compose, Git & GitHub, Postman, Vitest, Jest, Supertest, Linux Bash, Vercel Edge Runtime</div>
      </div>
    </div>

    <!-- EDUCATION -->
    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Education' : 'Pendidikan Resmi'}</span>
      </div>
      <div class="edu-row">
        <div>
          <strong style="font-size: 8pt; color: #0f172a;">${eduDegree}</strong>
          <div style="font-size: 7.2pt; color: #475569;">${eduUni} <span style="color: #64748b;">${eduNote}</span></div>
        </div>
        <span class="job-date">${eduDate}</span>
      </div>
    </div>
  </div>

  <!-- FOOTER PAGE 1 -->
  <div class="page-footer">
    <span>Kevin Eka Pratama • ${roleTitle}</span>
    <span>mazkev.vercel.app • github.com/mazkev</span>
    <span>Page 1 of 2</span>
  </div>
</div>

<div class="page-break"></div>

<!-- PAGE 2: FEATURED ENGINEERING CASE STUDIES & VERIFIED PORTFOLIO -->
<div class="page">
  <div>
    <!-- CONTINUATION HEADER -->
    <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f172a; padding-bottom: 4px; margin-bottom: 6px;">
      <div>
        <span style="font-size: 11pt; font-weight: 900; text-transform: uppercase; color: #0f172a;">Kevin Eka Pratama</span>
        <span style="font-size: 8pt; font-weight: 700; color: #475569; margin-left: 6px;">• ${isEn ? 'Key Engineering Achievements & Verified Deployments' : 'Karya Rekayasa Unggulan & Portofolio Terverifikasi'}</span>
      </div>
      <div style="font-size: 7pt; font-family: monospace; font-weight: 700; color: #0f172a;">
        <a href="https://mazkev.vercel.app" style="color: #0f172a; text-decoration: underline;">mazkev.vercel.app</a> • <a href="https://github.com/mazkev" style="color: #0f172a; text-decoration: underline;">github.com/mazkev</a>
      </div>
    </div>

    <!-- EXECUTIVE METRICS GRID -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 7px;">
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 4px 6px; text-align: center;">
        <div style="font-size: 11pt; font-weight: 900; color: #15803d;">19 Repos</div>
        <div style="font-size: 6.2pt; font-weight: 700; color: #166534; text-transform: uppercase;">${isEn ? 'Backend & Cloud' : 'Sistem Backend & Cloud'}</div>
      </div>
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 4px 6px; text-align: center;">
        <div style="font-size: 11pt; font-weight: 900; color: #1d4ed8;">22 Repos</div>
        <div style="font-size: 6.2pt; font-weight: 700; color: #1e40af; text-transform: uppercase;">${isEn ? 'Fullstack & Mobile' : 'Platform Fullstack & Mobile'}</div>
      </div>
      <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 4px 6px; text-align: center;">
        <div style="font-size: 11pt; font-weight: 900; color: #7e22ce;">41 Repos</div>
        <div style="font-size: 6.2pt; font-weight: 700; color: #6b21a8; text-transform: uppercase;">${isEn ? 'Frontend Web Apps' : 'Aplikasi Web Frontend'}</div>
      </div>
      <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 4px; padding: 4px 6px; text-align: center;">
        <div style="font-size: 11pt; font-weight: 900; color: #0f766e;">12 Live Apps</div>
        <div style="font-size: 6.2pt; font-weight: 700; color: #115e59; text-transform: uppercase;">${isEn ? 'Active Vercel URLs' : 'Aktif di Cloud Vercel'}</div>
      </div>
    </div>

    <!-- 4 FEATURED CASE STUDIES -->
    <div class="section">
      <div class="section-title">
        <span>${isEn ? '4 Featured Engineering Case Studies' : '4 Studi Kasus Rekayasa Arsitektur Unggulan'}</span>
        <span class="badge">${isEn ? 'In-Depth Architectural Highlights' : 'Sorotan Arsitektur Pilihan'}</span>
      </div>

      <!-- STUDY 1 -->
      <div class="case-study">
        <div class="case-title">
          <span>1. Distributed Microservices & Concurrency Lab</span>
          <a href="https://github.com/mazkev/go-distributed-microservices-lab" style="font-size: 6.6pt; font-family: monospace; color: #0284c7; text-decoration: underline;">gh/go-distributed-microservices-lab</a>
        </div>
        <div class="case-tech">GO • GRPC • PROTOCOL BUFFERS • RABBITMQ • REDIS • CLEAN ARCHITECTURE • DOCKER</div>
        <div class="case-desc">
          ${isEn 
            ? 'High-throughput microservices architecture with binary gRPC inter-service communication and RabbitMQ asynchronous message queues. Implemented Redis Cache-Aside pattern reducing read latency to sub-milliseconds, worker pool concurrency, and strict Domain-Usecase-Repository decoupling.'
            : 'Arsitektur microservices performa tinggi dengan komunikasi biner gRPC dan antrean pesan asinkron RabbitMQ. Menerapkan pola Redis Cache-Aside yang mereduksi latensi baca ke sub-milidetik, worker pool concurrency, dan pemisahan lapisan Domain, Usecase, dan Repository.'}
        </div>
      </div>

      <!-- STUDY 2 -->
      <div class="case-study">
        <div class="case-title">
          <span>2. BayE Modern E-Commerce & Real-Time Auction Platform</span>
          <span style="font-size: 6.6pt; font-family: monospace;">
            <a href="https://baye-ecommerce-marketplace.vercel.app" style="color: #059669; font-weight: 700; text-decoration: underline;">Live: baye-ecommerce-marketplace.vercel.app</a>
            • <a href="https://github.com/mazkev/baye-ecommerce-marketplace" style="color: #4f46e5; text-decoration: underline;">gh/baye-ecommerce-marketplace</a>
          </span>
        </div>
        <div class="case-tech">NEXT.JS 16 (APP ROUTER) • REACT 19 • PRISMA 7 • LIBSQL • SERVER COMPONENTS • INVOICE QR</div>
        <div class="case-desc">
          ${isEn 
            ? 'Production auction marketplace built with Next.js 16 and Prisma 7 LibSQL adapter. Features server-rendered initial hydration for instant load, responsive live bidding simulation, multi-product spec comparisons, and digital QR invoice generation.'
            : 'Platform e-commerce lelang produksi dengan Next.js 16 dan adapter Prisma 7 LibSQL. Menampilkan server-rendered hydration untuk waktu muat instan, simulasi live bidding interaktif, perbandingan spesifikasi produk, dan generator invoice QR digital.'}
        </div>
      </div>

      <!-- STUDY 3 -->
      <div class="case-study">
        <div class="case-title">
          <span>3. Digital Wallet & Transactional Balance Transfer Engine</span>
          <a href="https://github.com/mazkev/go-banking-core-system" style="font-size: 6.6pt; font-family: monospace; color: #0284c7; text-decoration: underline;">gh/go-banking-core-system</a>
        </div>
        <div class="case-tech">GO • POSTGRESQL • GORM • ACID TRANSACTION ISOLATION • BCRYPT PIN • SWAGGER OPENAPI</div>
        <div class="case-desc">
          ${isEn 
            ? 'Financial balance transfer engine implementing atomic account-to-account transfers with ACID transaction isolation and row-level locking in PostgreSQL, preventing race conditions and double-spending. Features Bcrypt PIN validation and structured audit ledger logging.'
            : 'Engine transfer saldo dompet digital yang menerapkan transfer akun atomik dengan isolasi transaksi ACID dan row-level locking di PostgreSQL untuk mencegah race condition. Dilengkapi validasi PIN Bcrypt dan structured audit ledger logging.'}
        </div>
      </div>

      <!-- STUDY 4 -->
      <div class="case-study">
        <div class="case-title">
          <span>4. Canvass Visual Graphic Design & Publishing Workstation</span>
          <span style="font-size: 6.6pt; font-family: monospace;">
            <a href="https://canva-clone-fawn.vercel.app" style="color: #059669; font-weight: 700; text-decoration: underline;">Live: canva-clone-fawn.vercel.app</a>
            • <a href="https://github.com/mazkev/react-canva-design-studio" style="color: #4f46e5; text-decoration: underline;">gh/react-canva-design-studio</a>
          </span>
        </div>
        <div class="case-tech">REACT 19 • REACT-KONVA • DUAL-LAYER 60 FPS CANVAS • ZUSTAND • TAILWIND CSS V4</div>
        <div class="case-desc">
          ${isEn 
            ? 'Interactive vector publishing workspace built on React 19 and React-Konva. Utilizes dual-layer canvas architecture isolating transformation matrices from main UI rendering tree, reactive Zustand state, and high-resolution export pipelines.'
            : 'Workstation desain vektor interaktif berbasis React 19 dan React-Konva. Menggunakan arsitektur dual-layer kanvas 60 FPS untuk mengisolasi transformasi grafis dari UI utama, state reaktif Zustand, dan pipeline ekspor multi-format resolusi tinggi.'}
        </div>
      </div>
    </div>

    <!-- 12 LIVE DEPLOYMENTS TABLE -->
    <div class="section">
      <div class="section-title">
        <span>${isEn ? '12 Verified Cloud Deployments (HTTP 200 OK on Vercel)' : '12 Aplikasi Aktif Terverifikasi di Cloud (Vercel)'}</span>
        <span class="badge">${isEn ? 'Clickable Live Demos' : 'Dapat Diuji Langsung'}</span>
      </div>
      <div class="table-grid">
        <div class="live-item"><strong>1. BayE Auction Marketplace:</strong> <a href="https://baye-ecommerce-marketplace.vercel.app" style="color: #059669; text-decoration: underline;">baye-ecommerce-marketplace.vercel.app</a></div>
        <div class="live-item"><strong>2. Nexus Workspace Studio:</strong> <a href="https://nexus-project-mu.vercel.app" style="color: #059669; text-decoration: underline;">nexus-project-mu.vercel.app</a></div>
        <div class="live-item"><strong>3. Spotify Music Web Player:</strong> <a href="https://spotify-clonez.vercel.app" style="color: #059669; text-decoration: underline;">spotify-clonez.vercel.app</a></div>
        <div class="live-item"><strong>4. Indofooty Live Match Center:</strong> <a href="https://indofooty.vercel.app" style="color: #059669; text-decoration: underline;">indofooty.vercel.app</a></div>
        <div class="live-item"><strong>5. AI Component Wireframer:</strong> <a href="https://ai-component-wireframer.vercel.app" style="color: #059669; text-decoration: underline;">ai-component-wireframer.vercel.app</a></div>
        <div class="live-item"><strong>6. Umrah Travel Landing Portal:</strong> <a href="https://umrah-travel-landing.vercel.app" style="color: #059669; text-decoration: underline;">umrah-travel-landing.vercel.app</a></div>
        <div class="live-item"><strong>7. Cloud Console Simulator:</strong> <a href="https://cloud-console-simulator.vercel.app" style="color: #059669; text-decoration: underline;">cloud-console-simulator.vercel.app</a></div>
        <div class="live-item"><strong>8. Snake AI Pathfinding Lab:</strong> <a href="https://snake-ai-pathfinding.vercel.app" style="color: #059669; text-decoration: underline;">snake-ai-pathfinding.vercel.app</a></div>
        <div class="live-item"><strong>9. Canvass Visual Studio:</strong> <a href="https://canva-clone-fawn.vercel.app" style="color: #059669; text-decoration: underline;">canva-clone-fawn.vercel.app</a></div>
        <div class="live-item"><strong>10. Trello Glassmorphism Kanban:</strong> <a href="https://trello-azure-five.vercel.app" style="color: #059669; text-decoration: underline;">trello-azure-five.vercel.app</a></div>
        <div class="live-item"><strong>11. MarketX Angular 19 Store:</strong> <a href="https://market-x-angular.vercel.app" style="color: #059669; text-decoration: underline;">market-x-angular.vercel.app</a></div>
        <div class="live-item"><strong>12. HubSpot Enterprise CRM:</strong> <a href="https://hub-spot-clone-five.vercel.app" style="color: #059669; text-decoration: underline;">hub-spot-clone-five.vercel.app</a></div>
      </div>
    </div>

    <!-- AUDIT NOTE -->
    <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; margin-top: 5px;">
      <span style="font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
        <strong>${isEn ? 'Complete 82-Repository Directory:' : 'Katalog Lengkap 82 Repositori:'}</strong> 
        ${isEn 
          ? 'Source code for all 82 audited repositories across Backend (19), Fullstack & Mobile (22), and Frontend (41) is publicly available at <strong>github.com/mazkev</strong> and interactive web workstation at <strong>mazkev.vercel.app</strong>.'
          : 'Seluruh source code 82 repositori terverifikasi (19 Backend, 22 Fullstack & Mobile, 41 Frontend) dapat diakses publik pada profil GitHub <strong>github.com/mazkev</strong> dan web workstation interaktif <strong>mazkev.vercel.app</strong>.'}
      </span>
    </div>
  </div>

  <!-- FOOTER PAGE 2 -->
  <div class="page-footer">
    <span>Kevin Eka Pratama • ${roleTitle}</span>
    <span>mazkev.vercel.app • github.com/mazkev</span>
    <span>Page 2 of 2</span>
  </div>
</div>

</body>
</html>`;
}

// Generate English 2-Page Executive PDF
const enHtml = generateExecutiveHtml('en');
const enHtmlPath = path.resolve('scratch/resume_en_template.html');
fs.writeFileSync(enHtmlPath, enHtml);

// Generate Indonesian 2-Page Executive PDF
const idHtml = generateExecutiveHtml('id');
const idHtmlPath = path.resolve('scratch/resume_id_template.html');
fs.writeFileSync(idHtmlPath, idHtml);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputEn = path.resolve('public/resume.pdf');
const outputId = path.resolve('public/resume-id.pdf');

try {
  console.log('Generating English 2-Page PDF...');
  execSync(`"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputEn}" "${enHtmlPath}"`, { stdio: 'inherit' });
  const statEn = fs.statSync(outputEn);
  console.log(`Generated public/resume.pdf (${statEn.size} bytes)`);

  console.log('Generating Indonesian 2-Page PDF...');
  execSync(`"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputId}" "${idHtmlPath}"`, { stdio: 'inherit' });
  const statId = fs.statSync(outputId);
  console.log(`Generated public/resume-id.pdf (${statId.size} bytes)`);
} catch (err) {
  console.error('Error generating PDF:', err);
}
