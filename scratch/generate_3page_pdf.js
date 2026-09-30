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
const imgSwaggerGo = getBase64Image('public/projects/swagger-go.png');
const imgSwaggerBanking = getBase64Image('public/projects/swagger-banking.png');
const imgGoclean = getBase64Image('public/projects/goclean.png');
const imgTokopedia = getBase64Image('public/projects/tokopedia.png');
const imgNexus = getBase64Image('public/projects/nexus.png');
const imgCanvass = getBase64Image('public/projects/canvass.png');
const imgMarketx = getBase64Image('public/projects/marketx.png');
const imgSpotify = getBase64Image('public/projects/spotify.png');
const imgTrello = getBase64Image('public/projects/trello.png');
const imgHubspot = getBase64Image('public/projects/hubspot.png');
const imgMazmarket = getBase64Image('public/projects/mazmarket.png');
const imgMazcloud = getBase64Image('public/projects/mazcloud.png');
const imgSemarketplace = getBase64Image('public/projects/semarketplace.jpg');
const imgMarketinvent = getBase64Image('public/projects/marketinvent.png');
const imgIndofooty = getBase64Image('public/projects/indofooty.jpg');
const imgGrab = getBase64Image('public/projects/grab.png');
const imgAirbnb = getBase64Image('public/projects/airbnb.png');
const imgNetflix = getBase64Image('public/projects/netflix.jpg');
const imgUmrah = getBase64Image('public/projects/umrah.jpg');
const imgCloudConsole = getBase64Image('public/projects/cloudconsole.jpg');

function repoBlock(name, url, tech, isEn) {
  const label = isEn ? 'Tech Stack:' : 'Teknologi:';
  return `        <div class="repo-block">
          <div class="repo-title-row">• <a href="${url}" class="repo-name">${name}</a></div>
          <div class="repo-tech-row"><span class="repo-tech-label">${label}</span> <span class="repo-tech-desc">${tech}</span></div>
        </div>`;
}

function generateRoleHtml(role, lang) {
  const isEn = lang === 'en';

  const title = isEn 
    ? 'Kevin Eka Pratama - Executive Technical Resume' 
    : 'Kevin Eka Pratama - Curriculum Vitae Eksekutif';

  let roleTitle = 'Software Engineer';
  let roleSubtitle = '';
  let summary = '';
  let skillsHtml = '';
  let page2Title = '';
  let page2Subtitle = '';
  let page2Metrics = '';
  let page2Content = '';
  let page3Title = '';
  let page3Subtitle = '';
  let page3Cards = [];

  // ==========================================
  // 1. BACKEND ROLE
  // ==========================================
  if (role === 'backend') {
    roleTitle = isEn 
      ? 'Backend & Cloud Systems Engineer' 
      : 'Backend & Cloud Systems Engineer';
    roleSubtitle = isEn
      ? 'Distributed Microservices • High-Concurrency Go & Java Spring Boot • ACID Ledgers'
      : 'Sistem Terdistribusi • Microservices Go & Java Spring Boot • Transaksi ACID';

    summary = isEn
      ? `Backend & Cloud Systems Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record maintaining 100% SLA compliance for production operational tickets, authoring complex SQL queries (PostgreSQL, Oracle, MySQL) for data auditing, and monitoring 24/7 high-availability system workflows. Deeply proficient in AI-Assisted Engineering, pairing with LLM tools to accelerate schema design, boilerplate generation, and integration testing. Independently architected and deployed 19 production-grade backend microservices and cloud systems using Go (Golang), Java Spring Boot 3.3, Bun/Hono, and Express.js. Strong mastery in Clean Architecture (DDD), ACID transactional ledgers with row-level locks, Redis cache-aside patterns, RabbitMQ message brokers, gRPC binary protocols, and Docker containerization.`
      : `Backend & Cloud Systems Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support Sistem Enterprise pada PT PLN Icon+. Memiliki keahlian teruji dalam penanganan tiket operasional produksi dengan kepatuhan SLA 100%, penulisan query SQL terstruktur (PostgreSQL, Oracle, MySQL) untuk validasi data transaksi dan pelaporan, serta pemantauan kestabilan sistem 24/7. Sangat mahir dalam Rekayasa Berbasis AI (AI-Assisted Engineering), memanfaatkan LLM tools untuk akselerasi pemodelan skema, scaffolding arsitektur, dan automated testing. Secara mandiri merancang dan membangun 19 repositori sistem backend dan microservices menggunakan Go (Golang), Java Spring Boot 3.3, Bun/Hono, dan Express.js berprinsip Clean Architecture (DDD), transaksi atomik ACID, caching Redis, dan Docker.`;

    skillsHtml = `
      <div><strong>${isEn ? 'Backend Languages:' : 'Bahasa Pemrograman:'}</strong> Go (Golang 1.25/1.26), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, SQL, Bash</div>
      <div><strong>${isEn ? 'Frameworks & Architecture:' : 'Framework & Arsitektur:'}</strong> Java Spring Boot 3.3 (Spring Security 6, JPA), Go (Gin/Fiber/Echo), Bun + Hono, Express.js, FastAPI, Clean Architecture (DDD), gRPC (Protobuf), RESTful APIs, Microservices</div>
      <div><strong>${isEn ? 'Databases & Message Brokers:' : 'Basis Data & Messaging:'}</strong> PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling, Row-level Locks), MySQL, MongoDB (NoSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ (Message Broker)</div>
      <div><strong>${isEn ? 'AI & Agentic Engineering:' : 'AI & Rekayasa Agentic:'}</strong> Gemini 2.5, Claude 3.7, OpenAI APIs, AI Component Prototyping, Prompt Engineering, Agentic Tooling, Automated Testing</div>
      <div><strong>${isEn ? 'DevOps, Cloud & Tooling:' : 'DevOps & Alat Rekayasa:'}</strong> Docker, Docker Compose, Linux Bash, Git & GitHub, Postman, Swagger / OpenAPI 3.0, CI/CD GitHub Actions</div>
    `;

    page2Title = isEn 
      ? 'Backend & Cloud Systems Project Directory' 
      : 'Direktori Proyek Sistem Backend & Cloud';
    page2Subtitle = isEn
      ? 'High-Performance Microservices, Distributed Systems & Database Engines'
      : 'Layanan Mikro Kinerja Tinggi, Sistem Terdistribusi & Mesin Basis Data';

    page2Metrics = '';

    page2Content = `
      <div class="pillar-card">
        <div class="pillar-header">
          <span class="pillar-title">${isEn ? 'Pillar 1: Distributed Go & Java Systems' : 'Pilar 1: Sistem Terdistribusi Go & Java'}</span>
        </div>
${repoBlock('go-distributed-microservices-lab', 'https://github.com/mazkev/go-distributed-microservices-lab', 'Go, gRPC, Protobuf, RabbitMQ, Redis, Worker Pools, Docker', isEn)}
${repoBlock('go-ecommerce-gateway-engine', 'https://github.com/mazkev/go-ecommerce-gateway-engine', 'Go 1.26, Gin, MongoDB, Reverse Proxy, Swagger OpenAPI', isEn)}
${repoBlock('go-banking-core-system', 'https://github.com/mazkev/go-banking-core-system', 'Go, Echo, PostgreSQL, ACID Row Locks, Bcrypt PIN, Swagger UI', isEn)}
${repoBlock('go-clean-arch', 'https://github.com/mazkev/go-clean-arch', 'Go, Clean Architecture (DDD), Domain/Usecase/Repository, PostgreSQL', isEn)}
${repoBlock('go-rest-api-enterprise', 'https://github.com/mazkev/go-rest-api-enterprise', 'Go, Gin, GORM, Redis Cache-Aside, Zap Structured Logging, Docker', isEn)}
${repoBlock('spring-boot-enterprise-platform', 'https://github.com/mazkev/spring-boot-enterprise-platform', 'Java 17, Spring Boot 3.3, Spring Security JWT, Bucket4j Rate Limiter, Docker', isEn)}
      </div>

      <div class="pillar-card">
        <div class="pillar-header">
          <span class="pillar-title">${isEn ? 'Pillar 2: Cloud APIs & TypeScript Microservices' : 'Pilar 2: API Cloud & Microservices TypeScript'}</span>
        </div>
${repoBlock('hono-ecommerce-engine', 'https://github.com/mazkev/hono-ecommerce-engine', 'Bun Runtime, Hono v4, Drizzle ORM, WebSocket Live Chat, SQLite', isEn)}
${repoBlock('express-prisma-realworld-api', 'https://github.com/mazkev/express-prisma-realworld-api', 'Express.js, TypeScript, Prisma ORM, Nx Monorepo, JWT, Jest Suite', isEn)}
${repoBlock('express-typescript-prisma-api', 'https://github.com/mazkev/express-typescript-prisma-api', 'Express v5, TypeScript, Prisma 7 ORM, LibSQL Adapter, tsx', isEn)}
${repoBlock('express-prisma-product-api', 'https://github.com/mazkev/express-prisma-product-api', 'Express v5, TypeScript, Prisma ORM, JWT Auth, Multer, Zod Validation', isEn)}
${repoBlock('express-sqlite-ecommerce-api', 'https://github.com/mazkev/express-sqlite-ecommerce-api', 'Express v5, SQLite Prepared Statements, ACID Transactions, Swagger UI', isEn)}
${repoBlock('express-realtime-api-service', 'https://github.com/mazkev/express-realtime-api-service', 'Express v5, Socket.IO, Dual DB (MongoDB + MySQL), Winston, Zod', isEn)}
      </div>

      <div class="pillar-card" style="margin-bottom: 2px;">
        <div class="pillar-header">
          <span class="pillar-title">${isEn ? 'Pillar 3: Specialized Microservices, Webhooks & Data Pipelines' : 'Pilar 3: Layanan Mikro Khusus, Webhook & Pipeline Data'}</span>
        </div>
${repoBlock('express-prisma-payment-api', 'https://github.com/mazkev/express-prisma-payment-api', 'Express.js, Midtrans Webhook, PDFKit Invoicing, Nodemailer', isEn)}
${repoBlock('AI-api-manager', 'https://github.com/mazkev/AI-api-manager', 'Node.js, Reverse Proxy Gateway, Redis Rate Limiting, API Key Auth, React UI', isEn)}
${repoBlock('spring-boot-book-manager-api', 'https://github.com/mazkev/spring-boot-book-manager-api', 'Java 17, Spring Boot 3.3, Spring Data MongoDB, OpenAPI 3.0', isEn)}
${repoBlock('express-book-catalog-api', 'https://github.com/mazkev/express-book-catalog-api', 'Express v5, Prisma 7, Socket.IO Real-time, Redis Rate Limiter, Jest', isEn)}
${repoBlock('express-redis-url-shortener', 'https://github.com/mazkev/express-redis-url-shortener', 'Express, Redis Cache-Aside, Sub-millisecond Redirects, MongoDB', isEn)}
${repoBlock('express-mongo-content-api', 'https://github.com/mazkev/express-mongo-content-api', 'Express, MongoDB Mongoose, Redis Caching, Socket.IO, Cron Jobs', isEn)}
${repoBlock('express-mongodb-starter-api', 'https://github.com/mazkev/express-mongodb-starter-api', 'Express, MongoDB Mongoose, JWT Auth, Redis Cache, Docker Compose', isEn)}
      </div>
    `;

    page3Title = isEn 
      ? 'Backend Visual Annex: 12 Production API Architectures & Contracts' 
      : 'Lampiran Visual Backend: 12 Arsitektur API & Topologi Microservices';
    page3Subtitle = isEn
      ? 'Interactive API Contracts, Microservices Topologies, Schema Proofs & Rate Limiters'
      : 'Dokumentasi Kontrak API Interaktif, Topologi Microservices & Pembuktian Skema Transaksi';

    page3Cards = [
      {
        title: '1. GoFinance Banking Core API',
        cat: 'Backend',
        tech: 'Go • Echo • PostgreSQL • Redis • RabbitMQ • Docker',
        desc: isEn ? 'High-concurrency banking engine with ACID transactional transfers, Redis cache-aside ledger, and RabbitMQ broker.' : 'Engine core banking dengan transaksi transfer akun atomik berstandar ACID, Redis cache-aside, dan message broker RabbitMQ.',
        img: imgGofinance,
        link: 'https://github.com/mazkev/go-banking-core-system',
        label: 'github.com/mazkev/go-banking-core-system'
      },
      {
        title: '2. Swagger Go API Gateway Engine',
        cat: 'Backend',
        tech: 'Go 1.26 • Gin • GORM • PostgreSQL • Swagger OpenAPI',
        desc: isEn ? 'Production API gateway with interactive Swagger OpenAPI contract documentation, connection pooling, and JWT authorization.' : 'API gateway produksi dengan dokumentasi kontrak OpenAPI Swagger interaktif, connection pooling, dan otorisasi JWT.',
        img: imgSwaggerGo,
        link: 'https://github.com/mazkev/go-ecommerce-gateway-engine',
        label: 'github.com/mazkev/go-ecommerce-gateway-engine'
      },
      {
        title: '3. Nexus Enterprise Microservices',
        cat: 'Backend',
        tech: 'Java Spring Boot 3.3 • Resilience4j • Eureka • PostgreSQL',
        desc: isEn ? 'Enterprise backend architecture with Eureka service discovery, circuit-breaker failover protection, and JPA auditing.' : 'Arsitektur backend enterprise dengan service discovery Eureka, proteksi circuit breaker Resilience4j, dan auditing JPA.',
        img: imgNexus,
        link: 'https://github.com/mazkev/nexus-workspace-engine',
        label: 'github.com/mazkev/nexus-workspace-engine'
      },
      {
        title: '4. Go Clean Architecture Engine',
        cat: 'Backend',
        tech: 'Go • Gin • Clean Architecture • Docker • Unit Tests',
        desc: isEn ? 'Modular domain-driven design decoupling business logic, usecases, and repository data stores for maximum testability.' : 'Desain domain-driven modular yang memisahkan logika bisnis, usecase, dan repositori data untuk testability maksimal.',
        img: imgGoclean,
        link: 'https://github.com/mazkev/go-clean-arch',
        label: 'github.com/mazkev/go-clean-arch'
      },
      {
        title: '5. Core Banking Swagger UI & Ledger',
        cat: 'Backend',
        tech: 'Go • Echo • Swagger UI • Bcrypt PIN • Audit Logs',
        desc: isEn ? 'Interactive API testing suite verifying balance inquiries, atomic debit/credit transactions, and audit ledger entries.' : 'Suite pengujian API interaktif untuk verifikasi cek saldo, transaksi debit/kredit atomik, dan mutasi buku besar.',
        img: imgSwaggerBanking,
        link: 'https://github.com/mazkev/go-banking-core-system',
        label: 'github.com/mazkev/go-banking-core-system'
      },
      {
        title: '6. Microservices Concurrency Lab',
        cat: 'Backend',
        tech: 'Go • gRPC • Protocol Buffers • RabbitMQ • Redis',
        desc: isEn ? 'Binary inter-service communication pipeline with worker pool concurrency and decoupled background message queues.' : 'Pipa komunikasi biner antar-service berkecepatan tinggi dengan worker pool concurrency dan antrean pesan background.',
        img: imgGofinance,
        link: 'https://github.com/mazkev/go-distributed-microservices-lab',
        label: 'github.com/mazkev/go-distributed-microservices-lab'
      },
      {
        title: '7. Bun Hono Ultra-Fast REST Engine',
        cat: 'Backend',
        tech: 'Bun • Hono v4 • Drizzle ORM • TypeScript • WebSocket',
        desc: isEn ? 'Sub-millisecond REST API engine running on Bun runtime with Drizzle ORM, live WebSocket chat, and coupon discount logic.' : 'Engine REST API sub-milidetik berbasis Bun runtime dengan Drizzle ORM, live chat WebSocket, dan kupon diskon.',
        img: imgMazmarket,
        link: 'https://github.com/mazkev/hono-ecommerce-engine',
        label: 'github.com/mazkev/hono-ecommerce-engine'
      },
      {
        title: '8. AI API Manager & Rate Limiter',
        cat: 'Backend',
        tech: 'Node.js • Express • Redis • Token Quotas • React Console',
        desc: isEn ? 'Reverse proxy API gateway with API key authentication, distributed rate limiting, token quota tracking, and latency analytics.' : 'API gateway reverse proxy dengan otentikasi API key, rate limiting terdistribusi, pelacakan kuota token, dan analitik latensi.',
        img: imgMazcloud,
        link: 'https://github.com/mazkev/AI-api-manager',
        label: 'github.com/mazkev/AI-api-manager'
      },
      {
        title: '9. Midtrans Payment Gateway API',
        cat: 'Backend',
        tech: 'Node.js • Express v5 • Prisma ORM • Midtrans • PDFKit',
        desc: isEn ? 'Payment processing backend with Midtrans webhook verification, automated digital PDF invoice rendering, and email notifications.' : 'Backend pembayaran dengan webhook Midtrans, pembuatan invoice PDF otomatis dengan PDFKit, dan notifikasi email.',
        img: imgSemarketplace,
        link: 'https://github.com/mazkev/express-prisma-payment-api',
        label: 'github.com/mazkev/express-prisma-payment-api'
      },
      {
        title: '10. Spring Boot Enterprise Platform',
        cat: 'Backend',
        tech: 'Java 17 • Spring Boot 3.3 • JWT • Bucket4j • MongoDB',
        desc: isEn ? 'Enterprise platform with Spring Security JWT, AOP audit logging, async event-driven mailers, Bucket4j rate limiting, and Docker.' : 'Platform enterprise dengan Spring Security JWT, audit logging AOP, emailer asinkron event-driven, dan rate limiting Bucket4j.',
        img: imgMarketinvent,
        link: 'https://github.com/mazkev/spring-boot-enterprise-platform',
        label: 'github.com/mazkev/spring-boot-enterprise-platform'
      },
      {
        title: '11. Spring Boot Book Catalog API',
        cat: 'Backend',
        tech: 'Java 17 • Spring Boot 3.3 • MongoDB • OpenAPI 3.0',
        desc: isEn ? 'Enterprise book catalog service with Spring Data MongoDB, automated OpenAPI documentation, and containerized deployment.' : 'Layanan katalog buku enterprise dengan Spring Data MongoDB, dokumentasi otomatis OpenAPI, dan kontainerisasi Docker.',
        img: imgMarketinvent,
        link: 'https://github.com/mazkev/spring-boot-book-manager-api',
        label: 'github.com/mazkev/spring-boot-book-manager-api'
      },
      {
        title: '12. Cloud PaaS Deployment Console Simulator',
        cat: 'Cloud Tool',
        tech: 'React 19 • Terminal Stream Logs • DNS • Secrets Vault',
        desc: isEn ? 'PaaS cloud deployment simulator featuring real-time build streaming terminal logs, custom DNS domain routing, and environment secrets vault.' : 'Simulator konsol cloud PaaS dengan streaming log build terminal real-time, konfigurasi domain DNS, dan brankas rahasia env variables.',
        img: imgCloudConsole,
        link: 'https://github.com/mazkev/react-cloud-console-simulator',
        label: 'github.com/mazkev/react-cloud-console-simulator'
      }
    ];
  } 

  // ==========================================
  // 2. FRONTEND & MOBILE ROLE
  // ==========================================
  else if (role === 'frontend') {
    roleTitle = isEn 
      ? 'Frontend & Mobile Engineer' 
      : 'Frontend & Mobile Engineer';
    roleSubtitle = isEn
      ? 'Next.js 16 • React 19 • React Native (Expo) • Angular 19 • 60 FPS Canvas'
      : 'Next.js 16 • React 19 • React Native (Expo) • Angular 19 • Kanvas 60 FPS';

    summary = isEn
      ? `Frontend & Mobile Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record maintaining 100% SLA compliance for production operational tickets, user workflow issue resolution, and system stability. Deeply proficient in AI-Assisted Engineering, pairing with LLM tools to accelerate component prototyping, state architecture, and accessibility testing. Creator of 48+ production-grade frontend web and mobile applications specializing in modern component architecture (Next.js 16 App Router, React 19, Angular 19 Signals, Vue 3 Pinia), reactive client state management (Zustand, Redux Toolkit, RxJS), dual-layer 60 FPS canvas graphics (React-Konva), and cross-platform mobile apps (React Native Expo SDK 56, Flutter). Strong foundation in responsive performance optimization, WebSockets, and Vercel edge deployment.`
      : `Frontend & Mobile Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support Sistem Enterprise pada PT PLN Icon+. Memiliki keahlian teruji dalam penanganan tiket operasional produksi dengan kepatuhan SLA 100%, penyelesaian kendala antarmuka pengguna, dan kestabilan sistem. Sangat mahir dalam Rekayasa Berbasis AI (AI-Assisted Engineering), memanfaatkan LLM tools untuk akselerasi prototyping komponen, perancangan arsitektur state, dan pengujian aksesibilitas. Membangun 48+ aplikasi frontend web dan mobile dengan spesialisasi arsitektur komponen modern (Next.js 16 App Router, React 19, Angular 19 Signals, Vue 3 Pinia), state management reaktif (Zustand, Redux Toolkit, RxJS), kanvas grafis dual-layer 60 FPS (React-Konva), dan mobile cross-platform (React Native Expo SDK 56, Flutter). Menguasai optimasi performa responsif, WebSockets, dan deployment Vercel.`;

    skillsHtml = `
      <div><strong>${isEn ? 'Core Languages:' : 'Bahasa Pemrograman:'}</strong> TypeScript, JavaScript (ES6+), Dart, HTML5, CSS3, Tailwind CSS v4</div>
      <div><strong>${isEn ? 'Web Frameworks:' : 'Framework Web:'}</strong> Next.js 16 (App Router, Server Components), React 19, Angular 19 (Signals, RxJS), Vue 3 (Composition API, Pinia), Vite</div>
      <div><strong>${isEn ? 'Mobile Development:' : 'Pengembangan Mobile:'}</strong> React Native (Expo SDK 56, Expo Router, New Architecture), Flutter (Riverpod 3, Dart), Camera/Video APIs</div>
      <div><strong>${isEn ? 'State & Interactive Graphics:' : 'State & Grafis Interaktif:'}</strong> Zustand, Redux Toolkit, React-Konva (60 FPS Infinite Canvas), Web Audio API, Recharts, TanStack Query/Table</div>
      <div><strong>${isEn ? 'AI & Agentic Engineering:' : 'AI & Rekayasa Agentic:'}</strong> Gemini 2.5, Claude 3.7, OpenAI APIs, AI Component Prototyping, Prompt Engineering, Agentic Tooling, Automated Frontend Testing</div>
      <div><strong>${isEn ? 'DevOps & Tooling:' : 'DevOps & Alat Rekayasa:'}</strong> Git & GitHub, Postman, Webpack 5, Linux Bash, Vercel Edge Runtime, Responsive CSS Grid</div>
    `;

    page2Title = isEn 
      ? 'Frontend Web & Mobile Engineering Directory' 
      : 'Direktori Proyek Frontend Web & Mobile';
    page2Subtitle = isEn
      ? 'Modern Web Clients, Mobile Apps & 12 Verified Cloud Deployments'
      : 'Klien Web Modern, Aplikasi Mobile & 12 Aplikasi Cloud Terverifikasi';

    page2Metrics = '';

    page2Content = `
      <div class="pillar-card">
        <div class="pillar-header">
          <span class="pillar-title">${isEn ? 'Flagship Frontend Web Applications & Interactive Workstations' : 'Aplikasi Web Unggulan & Workstation Grafis'}</span>
        </div>
${repoBlock('react-canva-design-studio', 'https://github.com/mazkev/react-canva-design-studio', 'React 19, TypeScript, React-Konva (60 FPS Infinite Canvas), Tailwind CSS', isEn)}
${repoBlock('market-x-angular', 'https://github.com/mazkev/market-x-angular', 'Angular 19, TypeScript, Reactive Signals, RxJS Event Streams, Tailwind CSS', isEn)}
${repoBlock('nextjs-spotify-music-player', 'https://github.com/mazkev/nextjs-spotify-music-player', 'Next.js 16, TypeScript, Web Audio API, Canvas Visualizer, Tailwind CSS', isEn)}
${repoBlock('react-trello-kanban-suite', 'https://github.com/mazkev/react-trello-kanban-suite', 'React 19, TypeScript, Zustand, Multi-axis Drag & Drop, Glassmorphism UI', isEn)}
${repoBlock('baye-ecommerce-marketplace', 'https://github.com/mazkev/baye-ecommerce-marketplace', 'Next.js 16, React 19, TypeScript, LibSQL Serverless, Tailwind CSS', isEn)}
${repoBlock('nexus-project-workspace', 'https://github.com/mazkev/nexus-project-workspace', 'React 19, TypeScript, Lucide Icons, Enterprise Dashboard UI', isEn)}
      </div>

      <div class="pillar-card">
        <div class="pillar-header">
          <span class="pillar-title">${isEn ? 'Cross-Platform Mobile Applications' : 'Aplikasi Mobile Cross-Platform'}</span>
        </div>
${repoBlock('treveloka-react-native-expo', 'https://github.com/mazkev/treveloka-react-native-expo', 'React Native 0.85, Expo Router, TypeScript, Gemini AI API Assistant', isEn)}
${repoBlock('tiktok-clone-react-native-expo', 'https://github.com/mazkev/tiktok-clone-react-native-expo', 'React Native, Expo Video Autoplay, Camera API, Interactive UI', isEn)}
${repoBlock('flutter-grab-superapp-clone', 'https://github.com/mazkev/flutter-grab-superapp-clone', 'Flutter 3, Dart, Riverpod 3, OpenStreetMap Live Driver Tracking', isEn)}
      </div>

      <!-- 12 LIVE DEPLOYMENTS TABLE -->
      <div class="section" style="margin-bottom: 2px;">
        <div class="section-title">
          <span>${isEn ? '12 Verified Cloud Deployments (HTTP 200 OK on Vercel)' : '12 Aplikasi Aktif Terverifikasi di Cloud (Vercel)'}</span>
          <span class="badge">${isEn ? 'Clickable Live Demos' : 'Dapat Diuji Langsung'}</span>
        </div>
        <div class="table-grid">
          <div class="live-item"><strong>1. Canvass Design Studio:</strong> <a href="https://canva-clone-fawn.vercel.app" style="color: #059669; text-decoration: underline;">canva-clone-fawn.vercel.app</a></div>
          <div class="live-item"><strong>2. Spotify Music Player:</strong> <a href="https://spotify-clonez.vercel.app" style="color: #059669; text-decoration: underline;">spotify-clonez.vercel.app</a></div>
          <div class="live-item"><strong>3. MarketX Angular Store:</strong> <a href="https://market-x-angular.vercel.app" style="color: #059669; text-decoration: underline;">market-x-angular.vercel.app</a></div>
          <div class="live-item"><strong>4. Trello Kanban Suite:</strong> <a href="https://trello-azure-five.vercel.app" style="color: #059669; text-decoration: underline;">trello-azure-five.vercel.app</a></div>
          <div class="live-item"><strong>5. BayE Auction Store:</strong> <a href="https://baye-ecommerce-marketplace.vercel.app" style="color: #059669; text-decoration: underline;">baye-ecommerce-marketplace.vercel.app</a></div>
          <div class="live-item"><strong>6. Nexus Workspace:</strong> <a href="https://nexus-project-mu.vercel.app" style="color: #059669; text-decoration: underline;">nexus-project-mu.vercel.app</a></div>
          <div class="live-item"><strong>7. Indofooty Match Hub:</strong> <a href="https://indofooty.vercel.app" style="color: #059669; text-decoration: underline;">indofooty.vercel.app</a></div>
          <div class="live-item"><strong>8. AI Wireframer Lab:</strong> <a href="https://ai-component-wireframer.vercel.app" style="color: #059669; text-decoration: underline;">ai-component-wireframer.vercel.app</a></div>
          <div class="live-item"><strong>9. Umrah Travel Portal:</strong> <a href="https://umrah-travel-landing.vercel.app" style="color: #059669; text-decoration: underline;">umrah-travel-landing.vercel.app</a></div>
          <div class="live-item"><strong>10. Cloud Simulator:</strong> <a href="https://cloud-console-simulator.vercel.app" style="color: #059669; text-decoration: underline;">cloud-console-simulator.vercel.app</a></div>
          <div class="live-item"><strong>11. Snake AI Pathfinding:</strong> <a href="https://snake-ai-pathfinding.vercel.app" style="color: #059669; text-decoration: underline;">snake-ai-pathfinding.vercel.app</a></div>
          <div class="live-item"><strong>12. HubSpot CRM Platform:</strong> <a href="https://hub-spot-clone-five.vercel.app" style="color: #059669; text-decoration: underline;">hub-spot-clone-five.vercel.app</a></div>
        </div>
      </div>
    `;

    page3Title = isEn 
      ? 'Frontend & Mobile Visual Annex: 12 Flagship Interfaces & Demos' 
      : 'Lampiran Visual Frontend & Mobile: 12 Antarmuka Unggulan & Live Demo';
    page3Subtitle = isEn
      ? 'Vector Canvas Workstations, Dynamic Media Clients, Dashboards & Mobile App Views'
      : 'Workstation Kanvas Vektor, Klien Media Dinamis, Dashboard & Tampilan Aplikasi Mobile';

    page3Cards = [
      {
        title: '1. Canvass Visual Graphic Studio',
        cat: 'Frontend',
        tech: 'React 19 • React-Konva • Zustand • Tailwind CSS v4',
        desc: isEn ? 'Browser vector graphic publishing workspace with dual-layer 60 FPS canvas, multi-element transform matrices, and high-resolution export.' : 'Workstation desain vektor grafis berbasis web dengan dual-layer kanvas 60 FPS, manipulasi transform matriks elemen, dan ekspor multi-format.',
        img: imgCanvass,
        link: 'https://canva-clone-fawn.vercel.app',
        label: 'canva-clone-fawn.vercel.app'
      },
      {
        title: '2. Spotify Web Player & Visualizer',
        cat: 'Frontend',
        tech: 'Next.js 16 • Web Audio API • Frequency Visualizer • Tailwind',
        desc: isEn ? 'High-fidelity audio streaming client with real-time Web Audio API frequency analysis canvas visualizer and synchronized lyrics.' : 'Klien streaming audio dengan visualisasi frekuensi real-time Web Audio API pada kanvas, ekstraksi warna cover album, dan sinkronisasi lirik.',
        img: imgSpotify,
        link: 'https://spotify-clonez.vercel.app',
        label: 'spotify-clonez.vercel.app'
      },
      {
        title: '3. MarketX Angular 19 Storefront',
        cat: 'Frontend',
        tech: 'Angular 19 • Angular Signals • RxJS • Responsive Dash',
        desc: isEn ? 'Enterprise storefront powered by Angular 19 reactive Signals and RxJS event streams with live order tracking and merchant back-office.' : 'Storefront enterprise menggunakan reaktivitas Angular Signals dan RxJS event streams dengan pelacak status pesanan live dan back-office.',
        img: imgMarketx,
        link: 'https://market-x-angular.vercel.app',
        label: 'market-x-angular.vercel.app'
      },
      {
        title: '4. Trello Glassmorphism Kanban Workspace',
        cat: 'Frontend',
        tech: 'React 19 • Zustand • @hello-pangea/dnd • Tailwind v4',
        desc: isEn ? 'Glassmorphism Kanban project board with multi-axis drag-and-drop task sorting and card detail modal editing.' : 'Board manajemen proyek Kanban glassmorphism dengan drag-and-drop task sorting multi-axis dan pengeditan detail kartu modal.',
        img: imgTrello,
        link: 'https://trello-azure-five.vercel.app',
        label: 'trello-azure-five.vercel.app'
      },
      {
        title: '5. HubSpot Enterprise CRM Platform',
        cat: 'Frontend',
        tech: 'React 19 • Recharts • Tailwind CSS v4 • REST API',
        desc: isEn ? 'B2B sales and customer relationship management workspace featuring interactive deal pipelines, contacts table, and analytics.' : 'Workspace CRM penjualan enterprise dengan pipeline transaksi interaktif, tabel manajemen kontak, dan grafik analitik.',
        img: imgHubspot,
        link: 'https://hub-spot-clone-five.vercel.app',
        label: 'hub-spot-clone-five.vercel.app'
      },
      {
        title: '6. Indofooty Real-Time Match Center',
        cat: 'Frontend',
        tech: 'Next.js 16 • Tailwind CSS v4 • Real-Time Sports API',
        desc: isEn ? 'Live sports match fixture hub with league standings, dynamic club comparison, and interactive editorial reader.' : 'Hub pertandingan olahraga sepak bola langsung dengan klasemen liga, komparasi statistik klub, dan pembaca artikel berita interaktif.',
        img: imgIndofooty,
        link: 'https://indofooty.vercel.app',
        label: 'indofooty.vercel.app'
      },
      {
        title: '7. Traveloka Mobile App Clone',
        cat: 'Mobile',
        tech: 'React Native 0.85 • Expo SDK 56 • Gemini AI Assistant',
        desc: isEn ? 'Mobile travel booking superapp featuring flight & hotel search grids, Gemini AI itinerary assistant, and QR e-ticket generation.' : 'Aplikasi mobile pemesanan perjalanan dengan grid pencarian penerbangan & hotel, asisten rencana perjalanan Gemini AI, dan tiket QR.',
        img: imgNexus,
        link: 'https://github.com/mazkev/treveloka-react-native-expo',
        label: 'github.com/mazkev/treveloka-react-native-expo'
      },
      {
        title: '8. Grab Cross-Platform Superapp Clone',
        cat: 'Mobile',
        tech: 'Flutter • Dart • Riverpod 3 • OpenStreetMap',
        desc: isEn ? 'Mobile superapp clone featuring live driver coordinate rendering, food delivery ordering, and wallet integration.' : 'Superapp mobile cross-platform dengan visualisasi koordinat driver peta OpenStreetMap, pemesanan GrabFood, dan integrasi dompet.',
        img: imgGrab,
        link: 'https://github.com/mazkev/flutter-grab-superapp-clone',
        label: 'github.com/mazkev/flutter-grab-superapp-clone'
      },
      {
        title: '9. Airbnb Fullstack Property Rental',
        cat: 'Frontend',
        tech: 'React 19 • Tailwind CSS v4 • Interactive Datepicker',
        desc: isEn ? 'Property booking marketplace with interactive date pickers, guest counters, dynamic property filtering, and responsive cards.' : 'Marketplace sewa akomodasi dengan datepicker interaktif, penghitung tamu, filter spesifikasi dinamis, dan kartu galeri foto responsif.',
        img: imgAirbnb,
        link: 'https://github.com/mazkev/airbnb-clone-react',
        label: 'github.com/mazkev/airbnb-clone-react'
      },
      {
        title: '10. Netflix Cinematic Streaming Hub',
        cat: 'Frontend',
        tech: 'React 19 • TMDb API • Custom Video Modal • Tailwind',
        desc: isEn ? 'Streaming portal with video billboard preview hero, horizontal genre carousels, and detailed movie modal overviews.' : 'Portal streaming film dengan preview billboard video hero, carousel horizontal bergenre, dan modal deskripsi sinematik detail.',
        img: imgNetflix,
        link: 'https://github.com/mazkev/netflix-clone-react',
        label: 'github.com/mazkev/netflix-clone-react'
      },
      {
        title: '11. Umrah Travel Agency Booking Portal',
        cat: 'Frontend',
        tech: 'React 19 • Cost Calculator • Itineraries • Tailwind',
        desc: isEn ? 'Pilgrimage travel portal with dynamic package cost estimator, interactive daily itineraries, and WhatsApp booking consultation.' : 'Portal travel haji dan umrah dengan kalkulator estimasi biaya paket, jadwal perjalanan hari demi hari, dan integrasi konsultasi WhatsApp.',
        img: imgUmrah,
        link: 'https://github.com/mazkev/react-umrah-travel-landing',
        label: 'github.com/mazkev/react-umrah-travel-landing'
      },
      {
        title: '12. Cloud PaaS Deployment Console Simulator',
        cat: 'Cloud Tool',
        tech: 'React 19 • Terminal Stream Logs • DNS • Secrets Vault',
        desc: isEn ? 'PaaS cloud deployment simulator featuring real-time build streaming terminal logs, custom DNS domain routing, and environment secrets vault.' : 'Simulator konsol cloud PaaS dengan streaming log build terminal real-time, konfigurasi domain DNS, dan brankas rahasia env variables.',
        img: imgCloudConsole,
        link: 'https://github.com/mazkev/react-cloud-console-simulator',
        label: 'github.com/mazkev/react-cloud-console-simulator'
      }
    ];
  }

  // ==========================================
  // 3. FULLSTACK ROLE (DEFAULT)
  // ==========================================
  else {
    roleTitle = isEn 
      ? 'Fullstack Software Engineer' 
      : 'Fullstack Software Engineer';
    roleSubtitle = isEn
      ? 'Backend Systems • Fullstack Platforms • Cloud Architecture'
      : 'Sistem Backend • Platform Fullstack • Arsitektur Cloud';

    summary = isEn
      ? `Fullstack Software Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record maintaining 100% SLA compliance for production operational tickets, authoring structured SQL queries (PostgreSQL, Oracle, MySQL) for transaction verification and data reporting, and monitoring high-availability system workflows 24/7. Deeply proficient in AI-Assisted Engineering, pairing with LLM tools to accelerate architecture design, component prototyping, and automated test generation. Concurrently architected and deployed 82 verified software repositories spanning distributed Go & Java Spring Boot microservices, modern Next.js 16 & React 19 web platforms, and mobile apps. Strong foundation in Clean Architecture (DDD), ACID transactional ledgers, Redis caching, RabbitMQ message brokers, and Docker containerization.`
      : `Fullstack Software Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support Sistem Enterprise pada PT PLN Icon+. Memiliki keahlian teruji dalam penanganan tiket operasional produksi dengan kepatuhan SLA 100%, penulisan query SQL terstruktur (PostgreSQL, Oracle, MySQL) untuk validasi data transaksi dan pelaporan, serta pemantauan kestabilan sistem 24/7. Sangat mahir dalam Rekayasa Berbasis AI (AI-Assisted Engineering), memanfaatkan LLM tools untuk akselerasi perancangan arsitektur, prototyping antarmuka, dan otomasi test suite. Secara mandiri merancang dan membangun 82 repositori perangkat lunak terverifikasi mencakup microservices Go & Java Spring Boot, platform web modern Next.js 16 & React 19, serta aplikasi mobile berprinsip Clean Architecture (DDD), transaksi atomik ACID, caching Redis, dan kontainerisasi Docker.`;

    skillsHtml = `
      <div><strong>${isEn ? 'Languages:' : 'Bahasa Pemrograman:'}</strong> Go (Golang), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, PHP 8, Dart, SQL, HTML5/CSS3</div>
      <div><strong>${isEn ? 'Backend & Cloud:' : 'Backend & Arsitektur:'}</strong> Java Spring Boot 3.3, Go (Gin/Fiber/Echo), Bun + Hono, Express.js, FastAPI, Laravel 12, Clean Architecture (DDD), RESTful APIs, gRPC (Protobuf), Microservices, WebSocket</div>
      <div><strong>${isEn ? 'Frontend & Mobile:' : 'Frontend & Mobile:'}</strong> Next.js 16 (App Router), React 19, TypeScript, Vue 3 (Pinia), Angular 19 (Signals), React Native (Expo SDK 56), Flutter (Riverpod 3), Tailwind CSS v4, Zustand, Redux Toolkit</div>
      <div><strong>${isEn ? 'Databases & Messaging:' : 'Database & Message Broker:'}</strong> PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling), MySQL, MongoDB, SQLite (LibSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ (Message Broker)</div>
      <div><strong>${isEn ? 'AI & Agentic Engineering:' : 'AI & Rekayasa Agentic:'}</strong> Gemini 2.5, Claude 3.7, OpenAI APIs, AI Component Prototyping, Prompt Engineering, Agentic Tooling, Automated Testing</div>
      <div><strong>${isEn ? 'DevOps, Tooling & Testing:' : 'DevOps & Alat Rekayasa:'}</strong> Docker, Docker Compose, Git & GitHub, Postman, Swagger / OpenAPI, Vite, Webpack 5, Linux Bash, Vercel Edge Runtime</div>
    `;

    page2Title = isEn 
      ? 'Software Engineering Project Directory' 
      : 'Direktori Proyek Rekayasa Perangkat Lunak';
    page2Subtitle = isEn
      ? 'Curated Open-Source Production Projects Grouped by Engineering Pillars'
      : 'Katalog Proyek Produksi Terverifikasi Berdasarkan Pilar Rekayasa';

    page2Metrics = '';

    page2Content = `
      <div class="pillar-card">
        <div class="pillar-header">
          <span class="pillar-title">${isEn ? 'Pillar 1: Backend Systems & Distributed Services' : 'Pilar 1: Sistem Backend & Arsitektur Cloud'}</span>
        </div>
${repoBlock('go-banking-core-system', 'https://github.com/mazkev/go-banking-core-system', 'Go, Echo, PostgreSQL, ACID Row Locks, Bcrypt PIN, Swagger UI', isEn)}
${repoBlock('go-distributed-microservices-lab', 'https://github.com/mazkev/go-distributed-microservices-lab', 'Go, gRPC, Protobuf, RabbitMQ, Redis, Worker Pools, Docker', isEn)}
${repoBlock('nexus-workspace-engine', 'https://github.com/mazkev/nexus-workspace-engine', 'Java 17, Spring Boot 3.3, Resilience4j, Eureka Discovery, PostgreSQL', isEn)}
${repoBlock('go-ecommerce-gateway-engine', 'https://github.com/mazkev/go-ecommerce-gateway-engine', 'Go 1.26, Gin, MongoDB, Reverse Proxy, Swagger OpenAPI', isEn)}
${repoBlock('hono-ecommerce-engine', 'https://github.com/mazkev/hono-ecommerce-engine', 'Bun Runtime, Hono v4, Drizzle ORM, WebSocket Live Chat, SQLite', isEn)}
${repoBlock('go-clean-arch', 'https://github.com/mazkev/go-clean-arch', 'Go, Clean Architecture (DDD), Domain/Usecase/Repository, PostgreSQL', isEn)}
      </div>

      <div class="pillar-card">
        <div class="pillar-header">
          <span class="pillar-title">${isEn ? 'Pillar 2: Fullstack Web Platforms & Enterprise Systems' : 'Pilar 2: Platform Web Fullstack & Aplikasi Mobile'}</span>
        </div>
${repoBlock('baye-ecommerce-marketplace', 'https://github.com/mazkev/baye-ecommerce-marketplace', 'Next.js 16, React 19, TypeScript, LibSQL Serverless, QR Digital Invoices', isEn)}
${repoBlock('tokopedia-react-storefront', 'https://github.com/mazkev/tokopedia-react-storefront', 'React 19, TypeScript, Go REST API Backend, PostgreSQL, Tailwind', isEn)}
${repoBlock('laravel-hrms-platform', 'https://github.com/mazkev/laravel-hrms-platform', 'Laravel 12, PHP 8.3, MySQL, GPS Attendance, Automated Payroll', isEn)}
${repoBlock('java-spring-commerce-platform', 'https://github.com/mazkev/java-spring-commerce-platform', 'Java 17, Spring Boot 3.3, Vue 3, Pinia, OpenPDF, PostgreSQL', isEn)}
${repoBlock('treveloka-react-native-expo', 'https://github.com/mazkev/treveloka-react-native-expo', 'React Native 0.85, Expo Router, Gemini AI Itinerary Assistant', isEn)}
${repoBlock('flutter-grab-superapp-clone', 'https://github.com/mazkev/flutter-grab-superapp-clone', 'Flutter 3, Dart, Riverpod 3, OpenStreetMap Live Driver Tracking', isEn)}
      </div>

      <div class="pillar-card">
        <div class="pillar-header">
          <span class="pillar-title">${isEn ? 'Pillar 3: Modern Frontend & Mobile Applications' : 'Pilar 3: Aplikasi Frontend Web Modern'}</span>
        </div>
${repoBlock('react-canva-design-studio', 'https://github.com/mazkev/react-canva-design-studio', 'React 19, TypeScript, React-Konva 60 FPS, Multi-format Export', isEn)}
${repoBlock('market-x-angular', 'https://github.com/mazkev/market-x-angular', 'Angular 19, TypeScript, Signals, RxJS Event Streams, Seller Back-office', isEn)}
${repoBlock('nextjs-spotify-music-player', 'https://github.com/mazkev/nextjs-spotify-music-player', 'Next.js 16, TypeScript, Web Audio API Canvas Visualizer, Synced Lyrics', isEn)}
${repoBlock('react-trello-kanban-suite', 'https://github.com/mazkev/react-trello-kanban-suite', 'React 19, TypeScript, Zustand, Multi-axis Drag & Drop, Glassmorphism', isEn)}
${repoBlock('tiktok-clone-react-native-expo', 'https://github.com/mazkev/tiktok-clone-react-native-expo', 'React Native, Expo Video Autoplay Feed, Camera Recording', isEn)}
${repoBlock('indofooty-match-hub', 'https://github.com/mazkev/indofooty-match-hub', 'React 19, TypeScript, Sports Analytics Dashboard, Responsive UI', isEn)}
      </div>

      <!-- 12 LIVE DEPLOYMENTS TABLE -->
      <div class="section" style="margin-bottom: 2px;">
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
    `;

    page3Title = isEn 
      ? 'Visual Project Annex: 12 Production Interfaces & Workstations' 
      : 'Lampiran Visual Portofolio: 12 Antarmuka Produksi & Workstation';
    page3Subtitle = isEn
      ? 'High-Fidelity Visual Proof: Real Production Screenshots, Workstation Canvas & Live Demos'
      : 'Bukti Visual Nyata: Tangkapan Layar Produksi Asli, Kanvas Interaktif & Live Demo';

    page3Cards = [
      {
        title: '1. GoFinance Banking Core API',
        cat: 'Backend',
        tech: 'Go • Echo • PostgreSQL • Redis • RabbitMQ • Docker',
        desc: isEn ? 'High-concurrency banking engine with ACID transactional account transfers, Redis cache-aside ledger, RabbitMQ message brokers, and Bcrypt security.' : 'Engine core banking dengan transaksi transfer akun atomik berstandar ACID, Redis cache-aside, message broker RabbitMQ, dan pengamanan Bcrypt.',
        img: imgGofinance,
        link: 'https://github.com/mazkev/go-banking-core-system',
        label: 'github.com/mazkev/go-banking-core-system'
      },
      {
        title: '2. Nexus Enterprise Microservices',
        cat: 'Fullstack',
        tech: 'Next.js 16 • Java Spring Boot • Resilience4j • PostgreSQL',
        desc: isEn ? 'Distributed enterprise platform featuring Spring Cloud service discovery, circuit-breaker failover protection, and reactive Next.js workspace client.' : 'Platform enterprise terdistribusi dengan service discovery Spring Cloud, proteksi circuit breaker Resilience4j, dan klien workspace Next.js 16.',
        img: imgNexus,
        link: 'https://nexus-project-mu.vercel.app',
        label: 'nexus-project-mu.vercel.app'
      },
      {
        title: '3. Tokopedia Fullstack Commerce',
        cat: 'Fullstack',
        tech: 'Go REST API • React 19 • PostgreSQL • Tailwind CSS v4',
        desc: isEn ? 'Commercial e-commerce platform pairing a Go REST API with React 19. Features optimistic cart updates, category filtering chips, and checkout transactions.' : 'Platform e-commerce mengintegrasikan Go REST API dengan React 19. Dilengkapi sinkronisasi keranjang optimistik dan checkout transaksi PostgreSQL.',
        img: imgTokopedia,
        link: 'https://tokopedia-react.vercel.app',
        label: 'tokopedia-react.vercel.app'
      },
      {
        title: '4. Canvass Visual Graphic Studio',
        cat: 'Frontend',
        tech: 'React 19 • React-Konva • Zustand • Tailwind CSS v4',
        desc: isEn ? 'Browser-based vector graphic publishing workspace with dual-layer 60 FPS canvas, multi-element transform matrices, and high-resolution PNG export.' : 'Workstation desain vektor grafis berbasis web dengan dual-layer kanvas 60 FPS, manipulasi transform matriks elemen, dan ekspor multi-format.',
        img: imgCanvass,
        link: 'https://canva-clone-fawn.vercel.app',
        label: 'canva-clone-fawn.vercel.app'
      },
      {
        title: '5. MarketX Angular E-Commerce',
        cat: 'Frontend',
        tech: 'Angular 19 • Angular Signals • RxJS • Responsive Dash',
        desc: isEn ? 'Enterprise storefront powered by Angular 19 reactive Signals and RxJS event streams. Features live order tracking and merchant back-office management.' : 'Storefront enterprise menggunakan reaktivitas Angular Signals dan RxJS event streams. Dilengkapi pelacak status pesanan live dan back-office penjual.',
        img: imgMarketx,
        link: 'https://market-x-angular.vercel.app',
        label: 'market-x-angular.vercel.app'
      },
      {
        title: '6. Spotify Web Player & Visualizer',
        cat: 'Frontend',
        tech: 'Next.js 16 • Web Audio API • Frequency Visualizer • Tailwind',
        desc: isEn ? 'High-fidelity audio streaming client with real-time Web Audio API frequency analysis canvas visualizer, dynamic album color palette extraction, and lyrics.' : 'Klien streaming audio dengan visualisasi frekuensi real-time Web Audio API pada kanvas, ekstraksi warna cover album dinamis, dan sinkronisasi lirik.',
        img: imgSpotify,
        link: 'https://spotify-clonez.vercel.app',
        label: 'spotify-clonez.vercel.app'
      },
      {
        title: '7. Trello Glassmorphism Kanban Workspace',
        cat: 'Frontend',
        tech: 'React 19 • Zustand • @hello-pangea/dnd • Tailwind v4',
        desc: isEn ? 'Glassmorphism Kanban project board with multi-axis drag-and-drop task sorting, card detail modal editing, and workflow automation.' : 'Board manajemen proyek Kanban glassmorphism dengan drag-and-drop multi-axis, pengeditan modal kartu tugas, dan otomasi alur kerja.',
        img: imgTrello,
        link: 'https://trello-azure-five.vercel.app',
        label: 'trello-azure-five.vercel.app'
      },
      {
        title: '8. HubSpot Enterprise CRM Platform',
        cat: 'Frontend',
        tech: 'React 19 • TanStack Table • Recharts • REST API',
        desc: isEn ? 'Enterprise CRM sales platform featuring interactive deal pipelines, contact data grid, and automated performance tracking.' : 'Platform CRM penjualan enterprise dengan pipeline transaksi interaktif, tabel data kontak, dan pelacakan performa otomatis.',
        img: imgHubspot,
        link: 'https://hub-spot-clone-five.vercel.app',
        label: 'hub-spot-clone-five.vercel.app'
      },
      {
        title: '9. Indofooty Real-Time Match Center',
        cat: 'Fullstack',
        tech: 'Next.js 16 • Tailwind CSS v4 • Real-Time Sports API',
        desc: isEn ? 'Live sports score and news portal with Next.js 16, real-time match fixture feeds, league standings, and editorial CMS console.' : 'Portal berita dan skor sepak bola langsung dengan Next.js 16, jadwal pertandingan real-time, klasemen liga, dan konsol admin CMS.',
        img: imgIndofooty,
        link: 'https://indofooty.vercel.app',
        label: 'indofooty.vercel.app'
      },
      {
        title: '10. Swagger Go API Gateway Engine',
        cat: 'Backend',
        tech: 'Go 1.26 • Gin • GORM • PostgreSQL • Swagger OpenAPI 3.0',
        desc: isEn ? 'Production API gateway with interactive Swagger OpenAPI contract documentation, reverse proxy routing, and JWT authorization.' : 'API gateway produksi dengan dokumentasi kontrak OpenAPI Swagger interaktif, routing reverse proxy, dan otorisasi JWT.',
        img: imgSwaggerGo,
        link: 'https://github.com/mazkev/go-ecommerce-gateway-engine',
        label: 'github.com/mazkev/go-ecommerce-gateway-engine'
      },
      {
        title: '11. Umrah Travel Agency Booking Portal',
        cat: 'Frontend',
        tech: 'React 19 • Cost Calculator • Itineraries • Tailwind',
        desc: isEn ? 'Pilgrimage travel portal with dynamic package cost estimator, interactive daily itineraries, and WhatsApp booking consultation.' : 'Portal travel haji dan umrah dengan kalkulator estimasi biaya paket, jadwal perjalanan hari demi hari, dan integrasi konsultasi WhatsApp.',
        img: imgUmrah,
        link: 'https://github.com/mazkev/react-umrah-travel-landing',
        label: 'github.com/mazkev/react-umrah-travel-landing'
      },
      {
        title: '12. Cloud PaaS Deployment Console Simulator',
        cat: 'Cloud Tool',
        tech: 'React 19 • Terminal Stream Logs • DNS • Secrets Vault',
        desc: isEn ? 'PaaS cloud deployment simulator featuring real-time build streaming terminal logs, custom DNS domain routing, and environment secrets vault.' : 'Simulator konsol cloud PaaS dengan streaming log build terminal real-time, konfigurasi domain DNS, dan brankas rahasia env variables.',
        img: imgCloudConsole,
        link: 'https://github.com/mazkev/react-cloud-console-simulator',
        label: 'github.com/mazkev/react-cloud-console-simulator'
      }
    ];
  }

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
    ? (role === 'backend' ? 'AI-Assisted Backend Systems & Architecture' : role === 'frontend' ? 'AI-Assisted Frontend & Mobile Engineering' : 'AI-Assisted Software Engineer & Open Source Contributor')
    : (role === 'backend' ? 'Rekayasa Sistem Backend & Arsitektur Berbasis AI' : role === 'frontend' ? 'Rekayasa Frontend & Mobile Berbasis AI' : 'AI-Assisted Software Engineer & Kontributor Open Source');
  const job2Company = isEn 
    ? 'Independent Engineering & Open Source Projects' 
    : 'Pengembangan Mandiri & Proyek Open Source';
  const job2Date = isEn ? '2023 - Present' : '2023 - Sekarang';
  const job2Bullets = isEn ? [
    'Pioneered AI-assisted software engineering workflows (Gemini 2.5, Claude 3.7, OpenAI, agentic coding tools) for rapid architectural scaffolding, schema design, and automated test suite generation.',
    `Architected, built, and audited <strong>${role === 'backend' ? '19 production-grade backend microservices' : role === 'frontend' ? '48+ frontend and mobile applications' : '82 production-grade repositories'}</strong> with Clean Architecture and Docker containerization.`,
    role === 'backend'
      ? 'Audited AI-generated architectures for strict security, PostgreSQL row-level locks, Redis cache-aside patterns, and RabbitMQ decoupled message brokers.'
      : role === 'frontend'
      ? 'Shipped and maintained 12 live cloud applications on Vercel with responsive mobile-first UI, fast hydration, and accessible design systems.'
      : 'Shipped and maintained 12 live cloud applications on Vercel with serverless databases, ACID transactions, and responsive modern UI architecture.'
  ] : [
    'Menerapkan alur kerja rekayasa perangkat lunak modern berbasis AI (Gemini 2.5, Claude 3.7, OpenAI, agentic coding tools) untuk akselerasi perancangan arsitektur, pemodelan skema, dan generasi automated test suite.',
    `Merancang, membangun, dan mengaudit <strong>${role === 'backend' ? '19 repositori sistem backend microservices' : role === 'frontend' ? '48+ aplikasi frontend dan mobile' : '82 repositori perangkat lunak'}</strong> berprinsip Clean Architecture dan kontainerisasi Docker.`,
    role === 'backend'
      ? 'Melakukan audit mendalam kode arsitektur: menjamin keamanan celah injeksi, isolasi transaksi row-level lock PostgreSQL, pola Redis cache-aside, dan message broker RabbitMQ.'
      : role === 'frontend'
      ? 'Men-deploy dan mengelola 12 aplikasi web aktif di cloud Vercel dengan tampilan antarmuka responsif mobile-first, waktu muat instan, dan standar aksesibilitas.'
      : 'Men-deploy dan mengelola 12 aplikasi produksi aktif di cloud Vercel dengan integrasi database serverless, transaksi ACID, dan antarmuka reaktif modern.'
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
    margin: 8mm 10mm;
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
    font-size: 8.8pt;
    line-height: 1.42;
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
    margin-bottom: 8px;
  }
  .photo {
    width: 60px;
    height: 60px;
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
    font-size: 9pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .role-subtitle {
    font-size: 7.6pt;
    font-weight: 700;
    color: #475569;
    margin-bottom: 2px;
  }
  .contact-info {
    font-size: 7.4pt;
    font-family: monospace;
    font-weight: 600;
    color: #334155;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 6px;
  }
  .contact-info a {
    color: #0f172a;
    text-decoration: underline;
  }
  .section {
    margin-bottom: 7px;
  }
  .section-title {
    font-size: 8.6pt;
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
    font-size: 6.8pt;
    font-family: monospace;
    font-weight: 700;
    color: #64748b;
  }
  .summary-text {
    font-size: 8.1pt;
    color: #1e293b;
    text-align: justify;
    line-height: 1.38;
  }
  .job {
    margin-bottom: 5px;
  }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }
  .job-title {
    font-size: 8.6pt;
    font-weight: 800;
    color: #0f172a;
  }
  .job-company {
    font-size: 7.8pt;
    font-weight: 700;
    color: #334155;
  }
  .job-date {
    font-size: 7pt;
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
    padding-left: 14px;
    font-size: 7.9pt;
    color: #1e293b;
    line-height: 1.36;
  }
  .bullets li {
    margin-bottom: 2px;
  }
  .skills-block {
    font-size: 7.6pt;
    color: #1e293b;
    line-height: 1.38;
  }
  .skills-block div {
    margin-bottom: 2.5px;
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
    font-size: 7pt;
    font-family: monospace;
    color: #64748b;
  }

  /* PAGE 2 STYLES: TECHNICAL REPOSITORY DIRECTORY */
  .pillar-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 3.5px solid #0f172a;
    border-radius: 4px;
    padding: 5px 8px;
    margin-bottom: 6px;
  }
  .pillar-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 2.5px;
    margin-bottom: 4px;
  }
  .pillar-title {
    font-size: 8.5pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .pillar-count {
    font-size: 6.8pt;
    font-family: monospace;
    font-weight: 700;
    color: #475569;
    background: #e2e8f0;
    padding: 1px 4px;
    border-radius: 2px;
  }
  .pillar-tech {
    font-size: 6.8pt;
    font-family: monospace;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 2.5px;
  }
  .repo-block {
    margin-bottom: 4px;
  }
  .repo-block:last-child {
    margin-bottom: 1px;
  }
  .repo-title-row {
    font-size: 8.3pt;
    line-height: 1.25;
    color: #0f172a;
  }
  .repo-name {
    font-family: monospace;
    font-weight: 700;
    color: #0f172a;
    text-decoration: underline;
    font-size: 8.3pt;
  }
  .repo-tech-row {
    padding-left: 10px;
    font-family: monospace;
    font-size: 7.3pt;
    line-height: 1.25;
    color: #475569;
  }
  .repo-tech-label {
    font-weight: 700;
    color: #334155;
  }
  .repo-tech-desc {
    color: #475569;
  }
  .repo-item {
    font-size: 7.4pt;
    color: #334155;
    line-height: 1.3;
    margin-bottom: 2.5px;
    display: flex;
    align-items: baseline;
    gap: 4px;
  }
  .table-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    font-size: 7.1pt;
  }
  .live-item {
    background: #f8fafc;
    border: 0.5px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 6px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  /* PAGE 3 STYLES: 12 VISUAL CARDS (2 cols x 6 rows) */
  .visual-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    margin-bottom: 4px;
  }
  .visual-card {
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    background: #ffffff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .visual-img-container {
    height: 44px;
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
    padding: 3px 5px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .visual-title {
    font-size: 7.8pt;
    font-weight: 800;
    color: #0f172a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .visual-cat {
    font-size: 6pt;
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
    margin: 0.5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .visual-desc {
    font-size: 6.6pt;
    color: #334155;
    line-height: 1.22;
    margin-bottom: 1.5px;
  }
  .visual-links {
    font-size: 6.2pt;
    font-family: monospace;
    display: flex;
    gap: 4px;
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

<!-- PAGE 1 -->
<div class="page">
  <div>
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

    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Executive Summary' : 'Ringkasan Eksekutif'}</span>
        <span class="badge">${isEn ? `Target: ${role.toUpperCase()} (Page 1 of 3)` : `Target: ${role.toUpperCase()} (Halaman 1 dari 3)`}</span>
      </div>
      <p class="summary-text">${summary}</p>
    </div>

    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Professional Experience' : 'Pengalaman Profesional'}</span>
      </div>
      <div class="job">
        <div class="job-header">
          <div>
            <span class="job-title">${job1Title}</span>
            <span style="color: #64748b;"> • </span>
            <span class="job-company">${job1Company}</span>
          </div>
          <span class="job-date">${job1Date}</span>
        </div>
        <ul class="bullets">
          ${job1Bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <div>
            <span class="job-title">${job2Title}</span>
            <span style="color: #64748b;"> • </span>
            <span class="job-company">${job2Company}</span>
          </div>
          <span class="job-date">${job2Date}</span>
        </div>
        <ul class="bullets">
          ${job2Bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Technical Competencies & Core Stack' : 'Kompetensi Teknis & Core Stack'}</span>
      </div>
      <div class="skills-block">
        ${skillsHtml}
      </div>
    </div>

    <div class="section">
      <div class="section-title">
        <span>${isEn ? 'Education' : 'Pendidikan'}</span>
      </div>
      <div class="edu-row">
        <div>
          <strong style="font-size: 8.5pt;">${eduDegree}</strong>
          <span style="color: #64748b;"> • </span>
          <span style="font-size: 8.2pt; font-weight: 600; color: #334155;">${eduUni}</span>
          <span style="font-size: 7.2pt; color: #64748b; font-family: monospace;"> ${eduNote}</span>
        </div>
        <span class="job-date">${eduDate}</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Kevin Eka Pratama • ${roleTitle}</span>
    <span>kevinekapratama@gmail.com • +62 (813) 2661-2344</span>
    <span>Page 1 of 3 (${isEn ? 'Executive Profile' : 'Profil Eksekutif'})</span>
  </div>
</div>

<div class="page-break"></div>

<!-- PAGE 2 -->
<div class="page">
  <div>
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: baseline;">
      <div>
        <h2 style="font-size: 11pt; font-weight: 900; text-transform: uppercase; color: #0f172a;">
          ${page2Title}
        </h2>
        <span style="font-size: 7pt; font-weight: 700; color: #475569;">
          ${page2Subtitle}
        </span>
      </div>
      <div style="font-size: 7pt; font-family: monospace; font-weight: 700; color: #334155;">
        <span>mazkev.vercel.app</span>
      </div>
    </div>

    <!-- CONTENT -->
    ${page2Content}

    <!-- AUDIT NOTE -->
    <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 7px;">
      <span style="font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
        <strong>${isEn ? 'Directory Audit Note:' : 'Catatan Audit Direktori:'}</strong> 
        ${isEn 
          ? `Full source code, commit history, and test suites for all repositories are publicly available at <strong>github.com/mazkev</strong> and interactive web workstation at <strong>mazkev.vercel.app</strong>.`
          : `Seluruh source code, riwayat komit, dan dokumentasi arsitektur untuk seluruh repositori terverifikasi dapat diaudit publik pada <strong>github.com/mazkev</strong> dan workstation <strong>mazkev.vercel.app</strong>.`}
      </span>
    </div>
  </div>

  <div class="page-footer">
    <span>Kevin Eka Pratama • ${roleTitle}</span>
    <span>mazkev.vercel.app • github.com/mazkev</span>
    <span>Page 2 of 3 (${isEn ? 'Technical Project Directory' : 'Direktori Proyek Teknis'})</span>
  </div>
</div>

<div class="page-break"></div>

<!-- PAGE 3 -->
<div class="page">
  <div>
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 5px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: baseline;">
      <div>
        <h2 style="font-size: 11pt; font-weight: 900; text-transform: uppercase; color: #0f172a;">
          ${page3Title}
        </h2>
        <span style="font-size: 7pt; font-weight: 700; color: #475569;">
          ${page3Subtitle}
        </span>
      </div>
      <div style="font-size: 7pt; font-family: monospace; font-weight: 700; color: #334155;">
        <span>mazkev.vercel.app</span>
      </div>
    </div>

    <div class="visual-grid">
      ${page3Cards.map((c, idx) => `
        <div class="visual-card">
          <div class="visual-img-container">
            <img src="${c.img}" alt="${c.title}" class="visual-img">
          </div>
          <div class="visual-body">
            <div class="visual-title">
              <span>${c.title}</span>
              <span class="visual-cat">${c.cat}</span>
            </div>
            <div class="visual-tech">${c.tech}</div>
            <p class="visual-desc">${c.desc}</p>
            <div class="visual-links">
              <a href="${c.link}">${c.label}</a>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 7px;">
      <span style="font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
        <strong>${isEn ? 'Interactive Demonstration & Source Code Audit:' : 'Demonstrasi Interaktif & Audit Kode Sumber:'}</strong> 
        ${isEn 
          ? `Live deployments, interactive case studies, architectural documentation, and full source code are accessible at <strong>mazkev.vercel.app</strong> and <strong>github.com/mazkev</strong>.` 
          : `Seluruh demo aplikasi langsung, studi kasus interaktif, dokumentasi arsitektur, dan kode sumber dapat diakses publik pada <strong>mazkev.vercel.app</strong> dan <strong>github.com/mazkev</strong>.`}
      </span>
    </div>
  </div>

  <div class="page-footer">
    <span>Kevin Eka Pratama • ${roleTitle}</span>
    <span>mazkev.vercel.app • github.com/mazkev</span>
    <span>Page 3 of 3 (${isEn ? 'Visual Project Annex' : 'Lampiran Visual Portofolio'})</span>
  </div>
</div>

</body>
</html>`;
}

// Generate for all roles & languages
const roles = ['fullstack', 'backend', 'frontend'];
const langs = ['en', 'id'];
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

for (const role of roles) {
  for (const lang of langs) {
    const html = generateRoleHtml(role, lang);
    const htmlPath = path.resolve(`scratch/resume_${role}_${lang}.html`);
    fs.writeFileSync(htmlPath, html);

    const pdfName = role === 'fullstack' 
      ? (lang === 'en' ? 'resume.pdf' : 'resume-id.pdf')
      : (lang === 'en' ? `resume-${role}.pdf` : `resume-${role}-id.pdf`);
    const outputPdf = path.resolve(`public/${pdfName}`);

    console.log(`Generating ${role} (${lang}) 3-Page PDF -> ${pdfName}...`);
    try {
      execSync(`"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputPdf}" "${htmlPath}"`, { stdio: 'ignore' });
      const stat = fs.statSync(outputPdf);
      console.log(`Generated public/${pdfName} (${stat.size} bytes)`);
    } catch (e) {
      console.error(`Error generating ${pdfName}:`, e.message);
    }
  }
}
