const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const profilePicPath = path.resolve('public/profile/kev.png');
const profilePicBase64 = fs.readFileSync(profilePicPath).toString('base64');
const imgSrc = `data:image/png;base64,${profilePicBase64}`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Kevin Eka Pratama - CV Resume</title>
<style>
  @page {
    size: A4;
    margin: 10mm 15mm;
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
    font-size: 9pt;
    line-height: 1.35;
  }
  .page {
    padding: 10px 0;
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
    padding-bottom: 10px;
    margin-bottom: 12px;
  }
  .photo {
    width: 68px;
    height: 68px;
    border-radius: 8px;
    object-fit: cover;
    border: 1.5px solid #0f172a;
  }
  .header-text {
    text-align: right;
  }
  .name {
    font-size: 18pt;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.5px;
    color: #0f172a;
  }
  .title {
    font-size: 8.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #334155;
    margin-top: 2px;
  }
  .contact-info {
    font-size: 7.5pt;
    font-weight: 600;
    color: #334155;
    margin-top: 4px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .section {
    margin-bottom: 11px;
  }
  .section-title {
    font-size: 8.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    border-bottom: 1px solid #0f172a;
    padding-bottom: 2px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  }
  .summary-text {
    font-size: 8pt;
    color: #1e293b;
    line-height: 1.4;
    text-align: justify;
  }
  .job {
    margin-bottom: 7px;
  }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .job-title {
    font-size: 8.5pt;
    font-weight: 800;
    color: #0f172a;
  }
  .job-company {
    font-size: 7.5pt;
    font-weight: 700;
    color: #475569;
  }
  .job-date {
    font-size: 7.5pt;
    font-family: monospace;
    font-weight: 700;
    background: #f1f5f9;
    border: 1px solid #94a3b8;
    padding: 1px 5px;
    border-radius: 4px;
  }
  ul.bullets {
    padding-left: 14px;
    margin-top: 2px;
  }
  ul.bullets li {
    font-size: 7.8pt;
    color: #334155;
    margin-bottom: 2px;
  }
  .project-item {
    margin-bottom: 4px;
    padding-bottom: 3px;
    border-bottom: 1px solid #e2e8f0;
  }
  .project-item:last-child {
    border-bottom: none;
  }
  .project-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .project-title {
    font-size: 8pt;
    font-weight: 800;
    color: #0f172a;
  }
  .project-tech {
    font-size: 6.8pt;
    font-family: monospace;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
  }
  .project-desc {
    font-size: 7.5pt;
    color: #334155;
    padding-left: 6px;
  }
  .skills-block {
    font-size: 7.5pt;
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
    font-size: 7pt;
    font-family: monospace;
    font-weight: 700;
    color: #64748b;
  }
</style>
</head>
<body>

<!-- PAGE 1: ENGLISH ATS -->
<div class="page">
  <div class="header">
    <img src="${imgSrc}" class="photo" alt="Kevin Eka Pratama">
    <div class="header-text">
      <div class="name">Kevin Eka Pratama</div>
      <div class="title">Fullstack Developer & Application Support Specialist</div>
      <div class="contact-info">
        <span>kevinekapratama@gmail.com</span>
        <span>•</span>
        <span>+62 (813) 2661-2344</span>
        <span>•</span>
        <span>mazkev.vercel.app</span>
        <span>•</span>
        <span>github.com/mazkev</span>
        <span>•</span>
        <span>Jakarta, ID</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Professional Summary</span>
      <span class="badge">Page 1: English (ATS Standard)</span>
    </div>
    <p class="summary-text">
      Fullstack Developer with 3 years of professional experience in Application Support at PT PLN Icon+, transitioning into Software Development. Skilled in building responsive web applications using React, Next.js, and TypeScript on the frontend, paired with Go (Golang), Java Spring Boot, and PostgreSQL on the backend. Strong background in production database troubleshooting, SQL query optimization, and Clean Architecture API design.
    </p>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Professional Experience</span>
    </div>
    
    <div class="job">
      <div class="job-header">
        <div>
          <span class="job-title">Application Support Specialist</span> — <span class="job-company">PT PLN Icon+</span>
        </div>
        <span class="job-date">2022 - Present</span>
      </div>
      <ul class="bullets">
        <li>Maintained and monitored enterprise application ecosystems, ensuring 99.8% service uptime and resolving critical database/API incidents in production.</li>
        <li>Diagnosed complex SQL queries, database deadlocks, and connection pool bottlenecks across enterprise relational databases (PostgreSQL, Oracle, MySQL).</li>
        <li>Authored system troubleshooting guides and collaborated with cross-functional software engineering teams to resolve underlying bugs and edge cases.</li>
      </ul>
    </div>

    <div class="job">
      <div class="job-header">
        <div>
          <span class="job-title">Fullstack & Backend Engineering (Independent)</span> — <span class="job-company">Open Source & Personal Systems</span>
        </div>
        <span class="job-date">2022 - Present</span>
      </div>
      <ul class="bullets">
        <li>Architected and built over 20+ production-grade repositories in Go, Java Spring Boot, and Next.js, practicing Clean Architecture, TDD, and Docker containerization.</li>
        <li>Designed relational schemas, implemented JWT/RBAC security pipelines, and orchestrated concurrency-safe financial transaction workflows.</li>
        <li>Delivered end-to-end fullstack applications with responsive React/TypeScript interfaces, state management (Redux/Zustand), and automated CI/CD.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Featured Repositories (Fullstack & Backend Go)</span>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Go Marketplace (Fullstack Go & React)</span>
        <span class="project-tech">Go • React • GORM • PostgreSQL • JWT</span>
      </div>
      <div class="project-desc">Fullstack e-commerce marketplace built with Go and React. Features REST API, JWT auth, product catalog management, and transactional PostgreSQL integration.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Go Marketplace Backend (GORM & REST API)</span>
        <span class="project-tech">Go • Fiber • PostgreSQL • GORM • Docker</span>
      </div>
      <div class="project-desc">High-performance REST API backend for e-commerce with Go, GORM ORM, and PostgreSQL. Handles atomic checkout transactions and connection pooling.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Go Clean Architecture REST API</span>
        <span class="project-tech">Go • Clean Architecture • Docker • PostgreSQL</span>
      </div>
      <div class="project-desc">Modular Go REST API built with Clean Architecture principles, decoupling domain entities, usecase logic, and database repositories for unit testing.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• BayE Marketplace (Fullstack Next.js)</span>
        <span class="project-tech">Next.js 14 • React • TypeScript • Tailwind</span>
      </div>
      <div class="project-desc">Modern e-commerce and auction platform inspired by eBay. Features server-rendered product hydration, dynamic bidding simulation, and responsive cart.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Go Banking Core Engine</span>
        <span class="project-tech">Go • ACID Transactions • PostgreSQL • Docker</span>
      </div>
      <div class="project-desc">Core financial banking API in Go handling user balance transfers with strict ACID compliance, row-level locking (SELECT FOR UPDATE), and audit logging.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Bun & Hono E-Commerce Backend</span>
        <span class="project-tech">Bun • Hono • Drizzle ORM • Zod • JWT</span>
      </div>
      <div class="project-desc">Modern ultra-fast TypeScript backend built on Bun runtime with Hono, Drizzle ORM type-safe SQL queries, Zod schema validation, and RBAC auth.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Technical Competencies</span>
    </div>
    <div class="skills-block">
      <div><strong>Engineering & Frameworks:</strong> Next.js, React.js, Go (Golang), Java Spring Boot, Express.js, Node.js, Vue 3, Angular, Python (FastAPI), TypeScript, Tailwind CSS</div>
      <div><strong>Databases & Cloud Tools:</strong> PostgreSQL, MySQL, MongoDB, Redis, Docker, GORM, Prisma ORM, AWS, Vercel Edge, Git & GitHub, Postman</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Education</span>
    </div>
    <div class="edu-row">
      <div>
        <strong style="font-size: 8pt;">Bachelor of Computer Science / Information Technology</strong>
        <div style="font-size: 7.5pt; color: #475569;">Universitas Gunadarma • GPA: 3.48 / 4.00</div>
      </div>
      <span class="job-date">2017 - 2022</span>
    </div>
  </div>
</div>

<div class="page-break"></div>

<!-- PAGE 2: BAHASA INDONESIA ATS -->
<div class="page">
  <div class="header">
    <img src="${imgSrc}" class="photo" alt="Kevin Eka Pratama">
    <div class="header-text">
      <div class="name">Kevin Eka Pratama</div>
      <div class="title">Fullstack Developer & Application Support Specialist</div>
      <div class="contact-info">
        <span>kevinekapratama@gmail.com</span>
        <span>•</span>
        <span>+62 (813) 2661-2344</span>
        <span>•</span>
        <span>mazkev.vercel.app</span>
        <span>•</span>
        <span>github.com/mazkev</span>
        <span>•</span>
        <span>Jakarta, ID</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Ringkasan Profesional</span>
      <span class="badge">Halaman 2: Bahasa Indonesia (Standar ATS)</span>
    </div>
    <p class="summary-text">
      Fullstack Developer dengan 3 tahun pengalaman profesional di bidang Application Support pada PT PLN Icon+, bertransisi ke Software Development. Terampil membangun aplikasi web responsif menggunakan React, Next.js, dan TypeScript pada frontend, dipadukan dengan Go (Golang), Java Spring Boot, dan PostgreSQL pada backend. Memiliki fondasi kuat dalam troubleshooting database produksi, query SQL, serta perancangan API Clean Architecture.
    </p>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Pengalaman Profesional</span>
    </div>
    
    <div class="job">
      <div class="job-header">
        <div>
          <span class="job-title">Spesialis Application Support</span> — <span class="job-company">PT PLN Icon+</span>
        </div>
        <span class="job-date">2022 - Sekarang</span>
      </div>
      <ul class="bullets">
        <li>Memelihara dan memonitor ekosistem aplikasi korporat, menjaga uptime layanan 99.8% serta menangani insiden kritis database dan API pada server produksi.</li>
        <li>Menganalisis query SQL kompleks, mengatasi bottleneck connection pool dan deadlock pada database relasional (PostgreSQL, Oracle, MySQL).</li>
        <li>Menyusun dokumentasi investigasi sistem dan berkolaborasi erat dengan tim software engineering untuk perbaikan bug dan penanganan edge case.</li>
      </ul>
    </div>

    <div class="job">
      <div class="job-header">
        <div>
          <span class="job-title">Pengembangan Fullstack & Backend (Mandiri)</span> — <span class="job-company">Open Source & Proyek Mandiri</span>
        </div>
        <span class="job-date">2022 - Sekarang</span>
      </div>
      <ul class="bullets">
        <li>Merancang dan membangun lebih dari 20+ repositori berbasis Go, Java Spring Boot, dan Next.js dengan penerapan Clean Architecture, TDD, dan Docker.</li>
        <li>Mendesain skema database relasional, mengimplementasikan pipeline keamanan JWT/RBAC, serta menangani transaksi keuangan aman berbasis ACID.</li>
        <li>Mengembangkan aplikasi fullstack end-to-end dengan antarmuka responsif React/TypeScript, manajemen state (Redux/Zustand), dan deployment CI/CD.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Proyek Repositori Pilihan (Fullstack & Backend Go)</span>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Go Marketplace (Fullstack Go & React)</span>
        <span class="project-tech">Go • React • GORM • PostgreSQL • JWT</span>
      </div>
      <div class="project-desc">Marketplace e-commerce fullstack dengan Go dan React. Dilengkapi REST API, autentikasi JWT, manajemen katalog produk, dan integrasi database PostgreSQL transaksional.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Go Marketplace Backend (GORM & REST API)</span>
        <span class="project-tech">Go • Fiber • PostgreSQL • GORM • Docker</span>
      </div>
      <div class="project-desc">Layanan backend REST API performa tinggi untuk marketplace e-commerce dengan Go, GORM ORM, dan PostgreSQL. Mengelola transaksi checkout atomik dan connection pooling.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Go Clean Architecture REST API</span>
        <span class="project-tech">Go • Clean Architecture • Docker • PostgreSQL</span>
      </div>
      <div class="project-desc">REST API modular di Go yang menerapkan prinsip Clean Architecture, memisahkan entitas domain, logika usecase, dan repository database untuk kemudahan unit testing.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• BayE Marketplace (Fullstack Next.js)</span>
        <span class="project-tech">Next.js 14 • React • TypeScript • Tailwind</span>
      </div>
      <div class="project-desc">Platform lelang dan belanja modern terinspirasi oleh eBay. Menampilkan hidrasi katalog produk server-rendered, simulasi lelang harga langsung, dan keranjang responsif.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Go Banking Core Engine</span>
        <span class="project-tech">Go • ACID Transactions • PostgreSQL • Docker</span>
      </div>
      <div class="project-desc">Layanan transaksi perbankan di Go yang menangani transfer saldo akun dengan kepatuhan ACID ketat, row-level locking (SELECT FOR UPDATE), dan pencatatan audit trail.</div>
    </div>

    <div class="project-item">
      <div class="project-head">
        <span class="project-title">• Bun & Hono E-Commerce Backend</span>
        <span class="project-tech">Bun • Hono • Drizzle ORM • Zod • JWT</span>
      </div>
      <div class="project-desc">Backend TypeScript modern dan ultra-cepat di atas runtime Bun dengan framework Hono, query database type-safe Drizzle ORM, validasi skema Zod, dan kontrol akses RBAC.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Kompetensi Teknis</span>
    </div>
    <div class="skills-block">
      <div><strong>Bahasa & Framework:</strong> Next.js, React.js, Go (Golang), Java Spring Boot, Express.js, Node.js, Vue 3, Angular, Python (FastAPI), TypeScript, Tailwind CSS</div>
      <div><strong>Database & Cloud:</strong> PostgreSQL, MySQL, MongoDB, Redis, Docker, GORM, Prisma ORM, AWS, Vercel Edge, Git & GitHub, Postman</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">
      <span>Pendidikan</span>
    </div>
    <div class="edu-row">
      <div>
        <strong style="font-size: 8pt;">Sarjana Ilmu Komputer / Teknologi Informasi</strong>
        <div style="font-size: 7.5pt; color: #475569;">Universitas Gunadarma • IPK: 3.48 / 4.00</div>
      </div>
      <span class="job-date">2017 - 2022</span>
    </div>
  </div>
</div>

</body>
</html>`;

const tempHtmlPath = path.resolve('scratch/resume_template.html');
fs.writeFileSync(tempHtmlPath, html);
console.log('HTML written to', tempHtmlPath);

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
