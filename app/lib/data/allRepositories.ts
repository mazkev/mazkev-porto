export interface RepoItem {
  id: string;
  name: string;
  title: string;
  domain: 'backend' | 'fullstack' | 'frontend' | 'mobile' | 'exploration';
  domainLabel: { en: string; id: string };
  category: string;
  tech: string[];
  sizeKb?: number;
  tier: 1 | 2 | 3 | 4;
  githubUrl: string;
  liveUrl?: string;
  desc: {
    en: string;
    id: string;
  };
}

export const ALL_REPOSITORIES: RepoItem[] = [
  // ==========================================
  // 1. BACKEND & CLOUD SYSTEMS (19 Repos)
  // ==========================================
  {
    id: 'go-distributed-microservices-lab',
    name: 'go-distributed-microservices-lab',
    title: 'Distributed Microservices & Concurrency Lab',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Distributed',
    tech: ['Go', 'gRPC', 'Protobuf', 'RabbitMQ', 'Redis', 'Clean Arch'],
    tier: 1,
    sizeKb: 120,
    githubUrl: 'https://github.com/mazkev/go-distributed-microservices-lab',
    desc: {
      en: 'Distributed microservices architecture featuring gRPC, Protocol Buffers, RabbitMQ message broker, Redis cache-aside, worker pool concurrency, and Clean Architecture.',
      id: 'Arsitektur microservices terdistribusi dengan gRPC, Protobuf, message broker RabbitMQ, Redis cache-aside, worker pool concurrency, dan Clean Architecture.'
    }
  },
  {
    id: 'go-ecommerce-gateway-engine',
    name: 'go-ecommerce-gateway-engine',
    title: 'E-Commerce Backend & API Gateway Engine',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Microservices',
    tech: ['Go 1.26', 'Gin', 'MongoDB v2', 'Reverse Proxy', 'Swagger UI'],
    tier: 1,
    sizeKb: 92,
    githubUrl: 'https://github.com/mazkev/go-ecommerce-gateway-engine',
    desc: {
      en: 'High-performance e-commerce backend and API Gateway with Gin router, MongoDB NoSQL integration, voucher engine, order lifecycle, reverse proxy, and Swagger docs.',
      id: 'Backend e-commerce dan API Gateway performa tinggi dengan Gin router, database MongoDB, sistem voucher, order lifecycle, reverse proxy, dan dokumentasi Swagger.'
    }
  },
  {
    id: 'go-banking-core-system',
    name: 'go-banking-core-system',
    title: 'Enterprise Core Banking Backend Engine',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / FinTech',
    tech: ['Go', 'Clean Arch', 'PostgreSQL', 'ACID Transactions', 'GORM', 'Swagger UI'],
    tier: 1,
    sizeKb: 99,
    githubUrl: 'https://github.com/mazkev/go-banking-core-system',
    desc: {
      en: 'Financial ledger transaction engine implementing atomic account-to-account balance transfers, Bcrypt PIN validation, audit logging, and PostgreSQL connection pooling.',
      id: 'Engine transaksi keuangan berbasis Go dan PostgreSQL yang menerapkan transfer saldo atomik antar rekening, validasi PIN Bcrypt, audit logging, dan connection pooling.'
    }
  },
  {
    id: 'go-clean-arch',
    name: 'go-clean-arch',
    title: 'Go Clean Architecture Domain-Driven REST API',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Clean Architecture',
    tech: ['Go', 'Clean Architecture', 'Gin', 'PostgreSQL', 'Repository Pattern'],
    tier: 1,
    sizeKb: 421,
    githubUrl: 'https://github.com/mazkev/go-clean-arch',
    desc: {
      en: 'Modular REST API decoupling domain entities, usecase business logic, and database repositories for unit testing, structured error handling, and database migrations.',
      id: 'REST API modular dengan Clean Architecture, memisahkan entitas domain, usecase logic, dan repository database untuk kemudahan unit testing dan migrasi database.'
    }
  },
  {
    id: 'go-rest-api-enterprise',
    name: 'go-rest-api-enterprise',
    title: 'Enterprise Go REST API Production Boilerplate',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Enterprise',
    tech: ['Go', 'Gin', 'GORM', 'Redis Caching', 'Uber Zap', 'Rate Limiting', 'Swagger UI'],
    tier: 1,
    sizeKb: 307,
    githubUrl: 'https://github.com/mazkev/go-rest-api-enterprise',
    desc: {
      en: 'Production-ready Go REST API featuring Gin, GORM ORM, Redis caching, Uber Zap structured logging, graceful shutdown, IP rate limiting, and Swagger documentation.',
      id: 'REST API Go standar enterprise dengan Gin, GORM, Redis caching, structured logging Uber Zap, graceful shutdown, rate limiting, dan dokumentasi Swagger UI.'
    }
  },
  {
    id: 'spring-boot-enterprise-platform',
    name: 'spring-boot-enterprise-platform',
    title: 'Enterprise Spring Boot 3.3 Microservices Platform',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Java Spring',
    tech: ['Java 17', 'Spring Boot 3.3', 'Spring Security', 'JWT', 'MongoDB', 'Bucket4j', 'Docker'],
    tier: 1,
    sizeKb: 310,
    githubUrl: 'https://github.com/mazkev/spring-boot-enterprise-platform',
    desc: {
      en: 'Enterprise backend platform using Java 17 and Spring Boot 3.3, Spring Security JWT, MongoDB, AOP logging, event-driven async mailers, Bucket4j rate limiting, and Docker.',
      id: 'Platform backend enterprise dengan Java 17 dan Spring Boot 3.3, Spring Security JWT, MongoDB, AOP logging, async mailer event-driven, Bucket4j rate limiting, dan Docker.'
    }
  },
  {
    id: 'hono-ecommerce-engine',
    name: 'hono-ecommerce-engine',
    title: 'Ultra-Fast E-Commerce Engine (Bun + Hono + Drizzle)',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Modern Node',
    tech: ['Bun', 'Hono v4', 'TypeScript', 'Drizzle ORM', 'WebSocket', 'Swagger UI'],
    tier: 1,
    sizeKb: 547,
    githubUrl: 'https://github.com/mazkev/hono-ecommerce-engine',
    desc: {
      en: 'Ultra-fast TypeScript e-commerce API built on Bun and Hono v4 with Drizzle ORM, WebSocket live chat, order checkout, coupon discount engine, and OpenAPI Swagger documentation.',
      id: 'API e-commerce ultra cepat berbasis Bun runtime dan Hono v4 dengan Drizzle ORM, live chat WebSocket, order checkout, sistem kupon diskon, dan OpenAPI Swagger.'
    }
  },
  {
    id: 'express-prisma-realworld-api',
    name: 'express-prisma-realworld-api',
    title: 'RealWorld Conduit Backend API (Nx Monorepo)',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Monorepo',
    tech: ['Express', 'TypeScript', 'Prisma ORM', 'Nx Monorepo', 'JWT', 'Jest'],
    tier: 1,
    sizeKb: 277,
    githubUrl: 'https://github.com/mazkev/express-prisma-realworld-api',
    desc: {
      en: 'Medium-style publishing backend conforming to the RealWorld spec using Express, TypeScript, Prisma ORM, Nx Monorepo, JWT auth, social follower graphs, and Jest tests.',
      id: 'Backend platform publikasi standar RealWorld menggunakan Express, TypeScript, Prisma ORM, Nx Monorepo, autentikasi JWT, relasi follower sosial, dan unit testing Jest.'
    }
  },
  {
    id: 'express-typescript-prisma-api',
    name: 'express-typescript-prisma-api',
    title: 'Type-Safe Express REST API (Prisma 7 & LibSQL)',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / TypeScript',
    tech: ['Express v5', 'TypeScript', 'Prisma 7', 'LibSQL', 'SQLite', 'tsx runtime'],
    tier: 1,
    sizeKb: 155,
    githubUrl: 'https://github.com/mazkev/express-typescript-prisma-api',
    desc: {
      en: 'End-to-end type-safe REST API built with Express v5, TypeScript, Prisma 7 ORM, LibSQL client adapter, and tsx development runtime.',
      id: 'REST API type-safe yang dibangun dengan Express v5, TypeScript, Prisma 7 ORM, adapter LibSQL, dan runtime pengembangan modern tsx.'
    }
  },
  {
    id: 'express-prisma-product-api',
    name: 'express-prisma-product-api',
    title: 'Modular Product & Catalog REST API',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Node.js',
    tech: ['Node.js', 'Express v5', 'Prisma ORM', 'Zod Validation', 'Multer', 'Supertest'],
    tier: 1,
    sizeKb: 56,
    githubUrl: 'https://github.com/mazkev/express-prisma-product-api',
    desc: {
      en: 'REST API featuring Express v5 and Prisma ORM with JWT authentication, Multer multipart file uploads, Zod runtime schema validation, and Jest/Supertest integration suites.',
      id: 'REST API dengan Express v5 dan Prisma ORM dilengkapi autentikasi JWT, upload file Multer, validasi skema runtime Zod, dan suite integrasi Jest/Supertest.'
    }
  },
  {
    id: 'express-sqlite-ecommerce-api',
    name: 'express-sqlite-ecommerce-api',
    title: 'Transactional E-Commerce REST API (SQLite ACID)',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Node.js',
    tech: ['Node.js', 'Express v5', 'SQLite', 'ACID Transactions', 'JWT', 'Swagger UI'],
    tier: 1,
    sizeKb: 28,
    githubUrl: 'https://github.com/mazkev/express-sqlite-ecommerce-api',
    desc: {
      en: 'Lightweight e-commerce API built with Express v5 and SQLite prepared statements, implementing atomic order checkout transactions, JWT auth, and interactive Swagger UI.',
      id: 'API e-commerce ringan dengan Express v5 dan prepared statements SQLite, mengimplementasikan transaksi checkout order atomik, autentikasi JWT, dan Swagger UI.'
    }
  },
  {
    id: 'express-realtime-api-service',
    name: 'express-realtime-api-service',
    title: 'Modular Real-Time API Service (Socket.IO & Redis)',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Real-Time',
    tech: ['Node.js', 'Express v5', 'Socket.IO', 'Mongoose', 'MySQL', 'Winston', 'Node-Cache'],
    tier: 1,
    sizeKb: 245,
    githubUrl: 'https://github.com/mazkev/express-realtime-api-service',
    desc: {
      en: 'Production-ready Express v5 architecture with Socket.IO event broadcasting, dual Mongoose and MySQL drivers, Zod schema validation, Winston loggers, and in-memory cache.',
      id: 'Arsitektur Express v5 dengan real-time event broadcasting Socket.IO, dual database Mongoose dan MySQL, validasi Zod, logger Winston, dan in-memory cache.'
    }
  },
  {
    id: 'express-prisma-payment-api',
    name: 'express-prisma-payment-api',
    title: 'E-Commerce Payment Gateway API (Midtrans & PDFKit)',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Payment',
    tech: ['Node.js', 'Express v5', 'Prisma ORM', 'Midtrans Gateway', 'PDFKit', 'Nodemailer', 'Redis'],
    tier: 1,
    sizeKb: 180,
    githubUrl: 'https://github.com/mazkev/express-prisma-payment-api',
    desc: {
      en: 'Payment processing backend integrating Midtrans payment gateway webhooks, automated invoice PDF generation with PDFKit, asynchronous email dispatch, and Redis caching.',
      id: 'Backend pemrosesan pembayaran mengintegrasikan webhook Midtrans payment gateway, pembuatan invoice PDF otomatis dengan PDFKit, notifikasi email, dan Redis.'
    }
  },
  {
    id: 'AI-api-manager',
    name: 'AI-api-manager',
    title: 'AI Gateway & API Management Proxy Console',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Proxy Console',
    tech: ['Node.js', 'Express', 'React', 'API Gateway Proxy', 'Rate Limiting', 'Analytics'],
    tier: 1,
    sizeKb: 2239,
    githubUrl: 'https://github.com/mazkev/AI-api-manager',
    desc: {
      en: 'Fullstack API management reverse proxy with API Key validation, token bucket rate limiting, quota tracking, latency analytics, and interactive React management dashboard.',
      id: 'Reverse proxy manajemen API dengan validasi API Key, pembatasan rate limiting, pelacakan kuota token, analitik latensi, dan dashboard manajemen interaktif React.'
    }
  },
  {
    id: 'spring-boot-book-manager-api',
    name: 'spring-boot-book-manager-api',
    title: 'Spring Boot 3.3 Book Catalog Service (MongoDB)',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Java',
    tech: ['Java 17', 'Spring Boot 3.3', 'Spring Data MongoDB', 'Swagger UI'],
    tier: 2,
    sizeKb: 30,
    githubUrl: 'https://github.com/mazkev/spring-boot-book-manager-api',
    desc: {
      en: 'RESTful API service built with Java 17 and Spring Boot 3.3 with Spring Data MongoDB, pagination, multi-field search queries, and OpenAPI documentation.',
      id: 'Layanan RESTful API dengan Java 17 dan Spring Boot 3.3 menggunakan Spring Data MongoDB, paginasi data, pencarian multi-field, dan dokumentasi OpenAPI.'
    }
  },
  {
    id: 'express-book-catalog-api',
    name: 'express-book-catalog-api',
    title: 'Real-Time Book Catalog API (Socket.IO & Redis)',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Node.js',
    tech: ['Express v5', 'Prisma 7', 'Socket.IO', 'Redis Rate Limiter', 'Joi', 'Jest'],
    tier: 2,
    sizeKb: 565,
    githubUrl: 'https://github.com/mazkev/express-book-catalog-api',
    desc: {
      en: 'Catalog management REST API featuring Express v5, Prisma 7, Socket.IO live notifications, Redis rate limiting, Joi validation, and Jest integration tests.',
      id: 'REST API manajemen katalog buku dengan Express v5, Prisma 7, notifikasi langsung Socket.IO, rate limiting Redis, validasi Joi, dan pengujian Jest.'
    }
  },
  {
    id: 'express-redis-url-shortener',
    name: 'express-redis-url-shortener',
    title: 'High-Performance URL Shortener (Redis Cache-Aside)',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Cache',
    tech: ['Express v5', 'MongoDB', 'Redis Cache-Aside', 'Gzip', 'Jest', 'Supertest'],
    tier: 2,
    sizeKb: 63,
    githubUrl: 'https://github.com/mazkev/express-redis-url-shortener',
    desc: {
      en: 'Scalable URL shortener backend leveraging Redis cache-aside patterns to achieve sub-millisecond redirection times, combined with MongoDB persistence and Jest tests.',
      id: 'Backend pemendek tautan URL dengan pola Redis cache-aside untuk pengalihan sub-milidetik, didukung persistensi MongoDB dan unit test Jest.'
    }
  },
  {
    id: 'express-mongo-content-api',
    name: 'express-mongo-content-api',
    title: 'Content & Tutorial REST API Service',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Content',
    tech: ['Express', 'MongoDB', 'Redis Caching', 'Socket.IO', 'node-cron', 'Docker Compose'],
    tier: 2,
    sizeKb: 111,
    githubUrl: 'https://github.com/mazkev/express-mongo-content-api',
    desc: {
      en: 'Content management REST API featuring Express, MongoDB, Redis caching, real-time Socket.IO broadcasts, scheduled cron jobs, and Docker Compose orchestration.',
      id: 'REST API manajemen konten dengan Express, MongoDB, Redis caching, broadcast real-time Socket.IO, penjadwalan cron job, dan orkestrasi Docker Compose.'
    }
  },
  {
    id: 'express-mongodb-starter-api',
    name: 'express-mongodb-starter-api',
    title: 'Express MongoDB Starter REST API Boilerplate',
    domain: 'backend',
    domainLabel: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    category: 'Backend / Starter',
    tech: ['Express', 'MongoDB Mongoose', 'JWT Auth', 'Redis', 'node-cron', 'Docker'],
    tier: 2,
    sizeKb: 36,
    githubUrl: 'https://github.com/mazkev/express-mongodb-starter-api',
    desc: {
      en: 'Modular starter RESTful CRUD API with Express, MongoDB Mongoose, JWT authentication, Redis cache layer, scheduled tasks, and containerized Docker setup.',
      id: 'Boilerplate RESTful CRUD API modular dengan Express, MongoDB Mongoose, autentikasi JWT, lapisan Redis cache, tugas terjadwal, dan Docker container.'
    }
  },

  // ==========================================
  // 2. FULLSTACK WEB PLATFORMS & MONOREPOS (13 Repos)
  // ==========================================
  {
    id: 'baye-ecommerce-marketplace',
    name: 'baye-ecommerce-marketplace',
    title: 'BayE E-Commerce & Auction Marketplace',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Next.js',
    tech: ['Next.js 16', 'React 19', 'Prisma 7', 'LibSQL', 'Product Compare', 'Invoice QR'],
    tier: 1,
    sizeKb: 164,
    githubUrl: 'https://github.com/mazkev/baye-ecommerce-marketplace',
    liveUrl: 'https://baye-marketplace.vercel.app',
    desc: {
      en: 'eBay-inspired fullstack marketplace on Next.js 16 and React 19 with Prisma 7, LibSQL, live bidding simulation, multi-attribute product comparison, and QR invoice generation.',
      id: 'Marketplace lelang dan e-commerce modern dengan Next.js 16, React 19, Prisma 7, LibSQL, simulasi bidding langsung, perbandingan spesifikasi produk, dan invoice QR.'
    }
  },
  {
    id: 'go-clean-marketplace-fullstack',
    name: 'go-clean-marketplace-fullstack',
    title: 'Fullstack Multi-Vendor Marketplace (Go & React)',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Go & React',
    tech: ['Go 1.25', 'Gin', 'Clean Architecture', 'MongoDB NoSQL', 'React 19', 'Docker Compose'],
    tier: 1,
    sizeKb: 212,
    githubUrl: 'https://github.com/mazkev/go-clean-marketplace-fullstack',
    desc: {
      en: 'Multi-vendor marketplace pairing Go 1.25 Gin Clean Architecture backend with MongoDB NoSQL and a modern React 19 storefront containerized via Docker Compose.',
      id: 'Marketplace multi-vendor yang memadukan backend Go 1.25 Gin Clean Architecture, database MongoDB NoSQL, dan antarmuka React 19 dengan Docker Compose.'
    }
  },
  {
    id: 'go-react-c2c-marketplace',
    name: 'go-react-c2c-marketplace',
    title: 'Fullstack C2C Escrow Marketplace (Go & React)',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Go & React',
    tech: ['Go Clean Arch', 'Gin', 'GORM', 'PostgreSQL', 'React 19', 'Atomic Checkout', 'Escrow'],
    tier: 1,
    sizeKb: 555,
    githubUrl: 'https://github.com/mazkev/go-react-c2c-marketplace',
    desc: {
      en: 'Customer-to-customer e-commerce platform pairing a Go Clean Architecture REST API with PostgreSQL and a React 19 UI, featuring escrow safeguards and atomic transactions.',
      id: 'Platform e-commerce C2C yang memadukan REST API Go Clean Architecture dengan PostgreSQL dan frontend React 19, dilengkapi sistem rekening bersama dan transaksi atomik.'
    }
  },
  {
    id: 'laravel-hrms-platform',
    name: 'laravel-hrms-platform',
    title: 'Enterprise HRMS & Payroll Management Platform',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Laravel',
    tech: ['PHP 8.3', 'Laravel 12', 'Selfie Attendance', 'Shift Management', 'THR & Payroll', 'MySQL'],
    tier: 1,
    sizeKb: 347,
    githubUrl: 'https://github.com/mazkev/laravel-hrms-platform',
    desc: {
      en: 'Comprehensive HRMS platform built with Laravel 12 featuring selfie-camera GPS attendance, dynamic work shifts, automated THR and salary deductions, and KPI evaluation sheets.',
      id: 'Sistem manajemen SDM & penggajian enterprise dengan Laravel 12, absensi selfie GPS, manajemen shift dinamis, kalkulasi otomatis THR & slip gaji, serta penilaian KPI.'
    }
  },
  {
    id: 'java-spring-commerce-platform',
    name: 'java-spring-commerce-platform',
    title: 'Enterprise Commerce Platform (Spring Boot & Vue 3)',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Spring & Vue',
    tech: ['Java 17', 'Spring Boot 3.3', 'Vue 3', 'Pinia', 'OpenPDF', 'Apache POI', 'PostgreSQL'],
    tier: 1,
    sizeKb: 342,
    githubUrl: 'https://github.com/mazkev/java-spring-commerce-platform',
    desc: {
      en: 'Enterprise full-stack commerce and warehouse inventory platform built with Java 17, Spring Boot 3.3, Vue 3, Pinia, OpenPDF invoices, Apache POI Excel reports, and PostgreSQL.',
      id: 'Platform e-commerce dan pergudangan inventaris enterprise dengan Java 17, Spring Boot 3.3, Vue 3, Pinia, faktur OpenPDF, laporan Excel Apache POI, dan PostgreSQL.'
    }
  },
  {
    id: 'fastapi-angular-marketplace',
    name: 'fastapi-angular-marketplace',
    title: 'Multi-Vendor Marketplace (FastAPI & Angular)',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Python & Angular',
    tech: ['Python 3', 'FastAPI', 'Angular 19', 'TypeScript', 'Recommendation Engine', 'Vouchers'],
    tier: 1,
    sizeKb: 610,
    githubUrl: 'https://github.com/mazkev/fastapi-angular-marketplace',
    desc: {
      en: 'Full-stack marketplace platform pairing high-concurrency FastAPI (Python 3) backend with Angular (TypeScript) frontend, merchant store management, and recommendation algorithms.',
      id: 'Platform marketplace multi-vendor yang memadukan backend performa tinggi FastAPI (Python 3) dengan frontend Angular (TypeScript), toko merchant, dan algoritma rekomendasi.'
    }
  },
  {
    id: 'express-react-marketplace-monorepo',
    name: 'express-react-marketplace-monorepo',
    title: 'P2P Marketplace Monorepo (Express & React 19)',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Monorepo',
    tech: ['Express v5', 'React 19', 'Sequelize ORM', 'MySQL', 'ACID Transactions', 'RBAC'],
    tier: 1,
    sizeKb: 81,
    githubUrl: 'https://github.com/mazkev/express-react-marketplace-monorepo',
    desc: {
      en: 'Fullstack P2P marketplace monorepo built with Express v5 and React 19 with Sequelize ORM, MySQL ACID transaction order processing, and role-based access control.',
      id: 'Monorepo marketplace P2P fullstack dengan Express v5 dan React 19, Sequelize ORM, transaksi pesanan database atomik MySQL, dan kontrol akses peran RBAC.'
    }
  },
  {
    id: 'nextjs-nexus-workspace-studio',
    name: 'nextjs-nexus-workspace-studio',
    title: 'Nexus Developer Workspace Studio',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Next.js',
    tech: ['Next.js 16', 'React 19', 'dnd-kit Kanban', 'TanStack Table CRM', 'Konva Canvas'],
    tier: 1,
    sizeKb: 110,
    githubUrl: 'https://github.com/mazkev/nextjs-nexus-workspace-studio',
    liveUrl: 'https://nexus-project-mu.vercel.app',
    desc: {
      en: 'All-in-one developer productivity workstation featuring Next.js 16, React 19, dnd-kit fluid Kanban boards, TanStack Table CRM, and Konva 2D graphic canvas editor.',
      id: 'Workstation produktivitas pengembang lengkap dengan Next.js 16, React 19, papan Kanban dnd-kit, tabel data CRM TanStack, dan editor kanvas grafis Konva 2D.'
    }
  },
  {
    id: 'nextjs-spotify-music-player',
    name: 'nextjs-spotify-music-player',
    title: 'Spotify Web Player & Audio Canvas Visualizer',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Audio Web',
    tech: ['Next.js 16', 'TypeScript', 'Web Audio API', 'Canvas Visualizer', 'Color Extraction', 'Lyrics'],
    tier: 1,
    sizeKb: 106,
    githubUrl: 'https://github.com/mazkev/nextjs-spotify-music-player',
    liveUrl: 'https://spotify-clonez.vercel.app',
    desc: {
      en: 'Spotify web player built with Next.js 16, TypeScript, Web Audio API frequency canvas visualizer, dynamic album artwork color extraction, and synchronized lyrics viewer.',
      id: 'Web player musik terinspirasi Spotify dengan Next.js 16, TypeScript, visualisator audio kanvas Web Audio API, ekstraksi warna cover album dinamis, dan lirik lagu sinkron.'
    }
  },
  {
    id: 'nextjs-football-sport-portal',
    name: 'nextjs-football-sport-portal',
    title: 'Football Live Score & Sports Portal (Indofooty)',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Media Portal',
    tech: ['Next.js 16', 'Tailwind CSS v4', 'Live Match Center', 'News Reader', 'Admin CMS'],
    tier: 1,
    sizeKb: 1094,
    githubUrl: 'https://github.com/mazkev/nextjs-football-sport-portal',
    liveUrl: 'https://indofooty.vercel.app',
    desc: {
      en: 'Live sports and football portal on Next.js 16 and Tailwind CSS v4 featuring real-time match center scores, league standings, editorial news reader, and admin CMS console.',
      id: 'Portal berita dan skor sepak bola langsung dengan Next.js 16 dan Tailwind CSS v4, menampilkan match center real-time, klasemen liga, pembaca berita, dan konsol admin CMS.'
    }
  },
  {
    id: 'vue-ecommerce-storefront-platform',
    name: 'vue-ecommerce-storefront-platform',
    title: 'Vue 3 Storefront & Back-Office Platform',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Vue 3',
    tech: ['Vue 3', 'Pinia', 'Product Comparison', 'Luxury Checkout', 'Order Tracking'],
    tier: 1,
    sizeKb: 333,
    githubUrl: 'https://github.com/mazkev/vue-ecommerce-storefront-platform',
    liveUrl: 'https://aplikasi-vue.vercel.app',
    desc: {
      en: 'Complete e-commerce storefront and back-office system built with Vue 3 Composition API and Pinia, featuring multi-product comparison, luxury checkout flows, and order tracking.',
      id: 'Storefront dan sistem back-office e-commerce lengkap dengan Vue 3 Composition API dan Pinia, perbandingan produk multi-spesifikasi, alur checkout, dan pelacakan pesanan.'
    }
  },
  {
    id: 'learn-go-app',
    name: 'learn-go-app',
    title: 'Interactive Go & Java Code Learning Sandbox',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / EdTech',
    tech: ['React 19', 'Monaco Editor', 'Go Playground API', '8-Module Curriculum', 'Vercel'],
    tier: 1,
    sizeKb: 320,
    githubUrl: 'https://github.com/mazkev/learn-go-app',
    liveUrl: 'https://learn-go-app.vercel.app',
    desc: {
      en: 'Interactive programming learning sandbox featuring React 19, Microsoft Monaco Editor, Go Playground compilation API integration, and an 8-module curated curriculum.',
      id: 'Sandbox pembelajaran pemrograman interaktif dengan React 19, Monaco Editor, integrasi kompilasi API Go Playground, dan kurikulum pemrograman 8 modul terstruktur.'
    }
  },
  {
    id: 'mazkev-porto',
    name: 'mazkev-porto',
    title: 'Developer Portfolio & Interactive Workstation',
    domain: 'fullstack',
    domainLabel: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    category: 'Full Stack / Portfolio Showcase',
    tech: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'Dynamic Project Showcase', 'Terminal CLI'],
    tier: 1,
    sizeKb: 38446,
    githubUrl: 'https://github.com/mazkev/mazkev-porto',
    liveUrl: 'https://mazkev.vercel.app',
    desc: {
      en: 'Flagship portfolio website built with Next.js 16 and React 19 featuring categorized repository showcases, interactive ATS resume generator, terminal simulator, and dark mode.',
      id: 'Website portofolio utama dengan Next.js 16 dan React 19, etalase proyek terverifikasi, generator CV ATS interaktif, simulator terminal CLI, dan tema modern dark mode.'
    }
  },

  // ==========================================
  // 3. FRONTEND WEB APPLICATIONS (38 Repos)
  // ==========================================
  {
    id: 'react-enterprise-patterns',
    name: 'react-enterprise-patterns',
    title: 'React 19 Enterprise Architecture Patterns',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Architecture',
    tech: ['React 19', 'TypeScript', 'Zustand', 'TanStack Query v5', 'Zod', 'React Hook Form'],
    tier: 1,
    sizeKb: 178,
    githubUrl: 'https://github.com/mazkev/react-enterprise-patterns',
    desc: {
      en: 'Production-ready React 19 enterprise boilerplate showcasing Zustand client state, TanStack Query v5 server caching, Zod validation, and React Hook Form integration.',
      id: 'Pola arsitektur React 19 skala enterprise dengan manajemen state Zustand, TanStack Query v5 server caching, validasi Zod, dan integrasi React Hook Form.'
    }
  },
  {
    id: 'tokopedia-react-storefront',
    name: 'tokopedia-react-storefront',
    title: 'Tokopedia React E-Commerce Storefront',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Marketplace',
    tech: ['React 19', 'Vitest', 'Custom Hooks', 'Shopping Cart', 'Wishlist', 'Admin Dashboard'],
    tier: 1,
    sizeKb: 2671,
    githubUrl: 'https://github.com/mazkev/tokopedia-react-storefront',
    liveUrl: 'https://tokopedia-react.vercel.app',
    desc: {
      en: 'Marketplace storefront inspired by Tokopedia with React 19, custom hooks state management, cart drawer, wishlist, admin product manager, and Vitest unit testing suites.',
      id: 'Storefront marketplace terinspirasi Tokopedia dengan React 19, custom hooks state management, keranjang belanja, wishlist, admin manajemen produk, dan unit testing Vitest.'
    }
  },
  {
    id: 'react-pos-cashier-system',
    name: 'react-pos-cashier-system',
    title: 'Point of Sale (POS) Cashier Workstation',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / FinTech POS',
    tech: ['React 19', 'Tailwind CSS v4', 'Zustand', 'Receipt Modal', 'Sales Reports', 'FSM State'],
    tier: 1,
    sizeKb: 79,
    githubUrl: 'https://github.com/mazkev/react-pos-cashier-system',
    desc: {
      en: 'Fast, touch-ready retail cashier POS terminal with React 19, Zustand state store, receipt printing simulation, daily sales reporting, and Finite State Machine order handling.',
      id: 'Terminal kasir POS ritel dengan React 19, state store Zustand, simulasi cetak struk nota belanja, laporan omzet harian, dan alur Finite State Machine (FSM).'
    }
  },
  {
    id: 'react-ecommerce-storefront',
    name: 'react-ecommerce-storefront',
    title: 'Role-Based E-Commerce Storefront & Admin',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Storefront',
    tech: ['React 19', 'Tailwind CSS v4', 'Axios', 'FakeStore API', 'Role-Based Auth', 'Cart'],
    tier: 1,
    sizeKb: 66,
    githubUrl: 'https://github.com/mazkev/react-ecommerce-storefront',
    desc: {
      en: 'Modern e-commerce platform with React 19, Tailwind CSS v4, FakeStore REST API, user authentication roles, shopping cart, and back-office inventory catalog manager.',
      id: 'Aplikasi e-commerce modern dengan React 19, Tailwind CSS v4, integrasi FakeStore API, hak akses berbasis peran, keranjang belanja, dan manajemen katalog admin.'
    }
  },
  {
    id: 'react-inventory-workspace',
    name: 'react-inventory-workspace',
    title: 'Warehouse & Inventory Operations Workspace',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Operations',
    tech: ['React 19', 'Tailwind CSS v4', 'Zustand', 'KPI Metric Cards', 'Skeleton Loading'],
    tier: 1,
    sizeKb: 215,
    githubUrl: 'https://github.com/mazkev/react-inventory-workspace',
    desc: {
      en: 'Stock and inventory operations workstation built with React 19, Zustand, KPI analytics cards, low-stock threshold alerts, and skeleton loaders.',
      id: 'Workstation operasional gudang dan inventaris dengan React 19, Zustand, kartu analitik KPI, peringatan stok menipis, dan skeleton loader responsif.'
    }
  },
  {
    id: 'react-inventory-admin-dashboard',
    name: 'react-inventory-admin-dashboard',
    title: 'Retail Inventory Admin Management Dashboard',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Dashboard',
    tech: ['React 19', 'Tailwind CSS', 'Product CRUD', 'Stock Tracking', 'User Management'],
    tier: 1,
    sizeKb: 74,
    githubUrl: 'https://github.com/mazkev/react-inventory-admin-dashboard',
    desc: {
      en: 'Retail inventory dashboard featuring complete product CRUD workflows, stock level adjusters, user role permissions, and tabular data filters.',
      id: 'Dashboard manajemen inventaris ritel dengan alur CRUD produk lengkap, penyesuaian stok barang, pengaturan hak akses pengguna, dan filter data tabel.'
    }
  },
  {
    id: 'react-ai-resume-tailor',
    name: 'react-ai-resume-tailor',
    title: 'AI Resume Optimizer & ATS Analyzer Workstation',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / AI Tool',
    tech: ['TypeScript', 'React 19', 'Tailwind CSS v4', 'Google Gemini API', 'Voice Coach', 'Kanban Tracker'],
    tier: 1,
    sizeKb: 53,
    githubUrl: 'https://github.com/mazkev/react-ai-resume-tailor',
    desc: {
      en: 'AI-assisted resume analysis tool matching job descriptions with CV keywords using Google Gemini API, voice interview simulator, and application Kanban tracker.',
      id: 'Aplikasi analisis dan optimasi CV ATS berbasis AI dengan Google Gemini API, simulator wawancara suara interaktif, dan papan Kanban pelacakan lamaran kerja.'
    }
  },
  {
    id: 'react-hubspot-crm-platform',
    name: 'react-hubspot-crm-platform',
    title: 'HubSpot-Inspired Enterprise CRM Platform',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Enterprise CRM',
    tech: ['TypeScript', 'React 19', 'TanStack Table', 'TanStack Query v5', 'Zod', 'SVG Sales Funnel'],
    tier: 1,
    sizeKb: 85,
    githubUrl: 'https://github.com/mazkev/react-hubspot-crm-platform',
    desc: {
      en: 'Sales CRM platform featuring TanStack Table data grids, TanStack Query v5 server caching, interactive SVG sales funnel charts, contact dialer, and deal pipeline boards.',
      id: 'Platform CRM penjualan enterprise dengan grid data TanStack Table, TanStack Query v5, visualisasi corong penjualan SVG interaktif, dialer kontak, dan pipeline deal.'
    }
  },
  {
    id: 'react-3d-configurator',
    name: 'react-3d-configurator',
    title: 'Interactive 3D Product Customizer (Three.js & R3F)',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / 3D Graphics',
    tech: ['React 19', 'Three.js', 'React Three Fiber', 'Material Finishes', 'Decal Texturing', 'Web Audio'],
    tier: 1,
    sizeKb: 25053,
    githubUrl: 'https://github.com/mazkev/react-3d-configurator',
    desc: {
      en: 'High-fidelity 3D product customization studio with React 19, Three.js, React Three Fiber, PBR metallic material shaders, custom decals, 3D text placement, and sound effects.',
      id: 'Studio kustomisasi produk 3D interaktif dengan React 19, Three.js, React Three Fiber, material shader PBR, tekstur stiker decal, teks 3D, dan efek audio.'
    }
  },
  {
    id: 'react-english-learning-platform',
    name: 'react-english-learning-platform',
    title: 'Interactive AI English Learning & TOEFL Platform',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / EdTech AI',
    tech: ['React 19', 'Mistral AI', 'Web Speech STT/TTS', 'Grammar Checker', 'TOEFL Simulator'],
    tier: 1,
    sizeKb: 65,
    githubUrl: 'https://github.com/mazkev/react-english-learning-platform',
    desc: {
      en: 'Language learning platform with Mistral AI integration, Web Speech API speech-to-text / text-to-speech pronunciation grading, grammar diagnostics, and TOEFL exam simulations.',
      id: 'Platform pembelajaran bahasa Inggris interaktif dengan Mistral AI, Web Speech STT/TTS untuk evaluasi pengucapan, pemeriksa tata bahasa, dan simulasi tes TOEFL.'
    }
  },
  {
    id: 'gitstory-repo-visualizer',
    name: 'gitstory-repo-visualizer',
    title: 'GitStory: GitHub Analytics & Commit Graph Workstation',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Analytics',
    tech: ['React 19', 'Recharts', 'SVG Git Graphs', 'Dual Repo Comparison', 'AI Release Notes'],
    tier: 1,
    sizeKb: 81,
    githubUrl: 'https://github.com/mazkev/gitstory-repo-visualizer',
    desc: {
      en: 'GitHub repository intelligence workstation with SVG branch commit visualizers, Recharts contribution metrics, dual repository benchmarking, and automated release note generation.',
      id: 'Workstation analitik repositori GitHub dengan visualisasi grafik commit branch SVG, grafik kontribusi Recharts, komparasi dua repositori, dan generator changelog otomatis.'
    }
  },
  {
    id: 'youtube-creator-assistant',
    name: 'youtube-creator-assistant',
    title: 'YouTube Creator Suite & Live Teleprompter',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Creator Tool',
    tech: ['React 19', 'YouTube Data API v3', 'Live Teleprompter', 'Transcript Clipper', 'SEO Suite'],
    tier: 1,
    sizeKb: 77,
    githubUrl: 'https://github.com/mazkev/youtube-creator-assistant',
    desc: {
      en: 'Video production tool integrating YouTube Data API v3, variable-speed floating teleprompter, video transcript quote clipper, and SEO tag analysis suite.',
      id: 'Aplikasi pendukung kreator konten dengan integrasi YouTube Data API v3, teleprompter kecepatan variabel, pemotong transkrip video, dan analisis kata kunci SEO.'
    }
  },
  {
    id: 'react-contract-document-analyzer',
    name: 'react-contract-document-analyzer',
    title: 'Legal Contract Risk Analyzer & Document Intelligence',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / LegalTech AI',
    tech: ['React 19', 'PDF.js', 'Mammoth.js', 'Gemini & OpenAI API', 'IndexedDB'],
    tier: 1,
    sizeKb: 76,
    githubUrl: 'https://github.com/mazkev/react-contract-document-analyzer',
    desc: {
      en: 'Legal contract intelligence tool using PDF.js and Mammoth.js to extract documents, analyze high-risk liability clauses using AI models, and store audit records in IndexedDB.',
      id: 'Aplikasi analisis risiko kontrak hukum dengan PDF.js dan Mammoth.js, identifikasi klausul berisiko tinggi menggunakan AI, dan penyimpanan riwayat aman di IndexedDB.'
    }
  },
  {
    id: 'react-konva-whiteboard-canvas',
    name: 'react-konva-whiteboard-canvas',
    title: 'Infinite Whiteboard Canvas (React-Konva 60 FPS)',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Canvas 2D',
    tech: ['React 19', 'React-Konva', 'Dual-Layer 60 FPS', 'Smart Snapping', 'PNG/SVG Export'],
    tier: 1,
    sizeKb: 57,
    githubUrl: 'https://github.com/mazkev/react-konva-whiteboard-canvas',
    desc: {
      en: 'Hardware-accelerated infinite whiteboard canvas with React-Konva, dual-layer rendering, freehand pen smoothing, shape snapping guides, and high-res PNG/SVG export.',
      id: 'Kanvas whiteboard tak terbatas performa tinggi dengan React-Konva, rendering dual-layer 60 FPS, pena gambar halus, snapping bentuk otomatis, dan ekspor PNG/SVG.'
    }
  },
  {
    id: 'react-grab-superapp-simulator',
    name: 'react-grab-superapp-simulator',
    title: 'Grab Superapp Web Simulator & Route Tracker',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Map GIS',
    tech: ['React 19', 'Leaflet Map', 'OSRM Routing', 'Traffic Speed Polyline', 'Weather Surge'],
    tier: 1,
    sizeKb: 83,
    githubUrl: 'https://github.com/mazkev/react-grab-superapp-simulator',
    desc: {
      en: 'Grab-inspired superapp web simulator using Leaflet, real OpenStreetMap waypoints, OSRM road route calculations, traffic polyline colors, and weather-based pricing surge algorithms.',
      id: 'Simulator web Grab superapp menggunakan Leaflet peta interaktif, kalkulasi rute jalan OSRM, warna polyline kondisi macet lalu lintas, dan simulasi tarif cuaca hujan.'
    }
  },
  {
    id: 'react-canva-design-studio',
    name: 'react-canva-design-studio',
    title: 'Canva-Inspired Graphic Design Studio',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Design Studio',
    tech: ['React 19', 'Zustand', 'Tailwind CSS v4', 'Curved Text', 'Layer Ordering', 'Export PNG/JPEG'],
    tier: 1,
    sizeKb: 88,
    githubUrl: 'https://github.com/mazkev/react-canva-design-studio',
    liveUrl: 'https://canva-clone-fawn.vercel.app',
    desc: {
      en: 'Browser-based graphic design editor with React 19, Zustand, curved typography, multi-layer z-index arrangements, color pickers, and high-definition PNG/JPEG image export.',
      id: 'Studio editor desain grafis berbasis web dengan React 19, Zustand, tipografi teks melengkung, manajemen layer z-index, pemilih warna, dan ekspor gambar PNG/JPEG.'
    }
  },
  {
    id: 'react-trello-kanban-suite',
    name: 'react-trello-kanban-suite',
    title: 'Trello-Inspired Glassmorphism Kanban Suite',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Productivity',
    tech: ['React 19', 'Zustand', '@hello-pangea/dnd', 'Workflow Automations', 'Calendar View'],
    tier: 1,
    sizeKb: 97,
    githubUrl: 'https://github.com/mazkev/react-trello-kanban-suite',
    liveUrl: 'https://trello-azure-five.vercel.app',
    desc: {
      en: 'Kanban project management dashboard with React 19, @hello-pangea/dnd multi-axis drag-and-drop, card modal editor with subtasks, automated workflow rules, and calendar view.',
      id: 'Dashboard manajemen proyek Kanban dengan React 19, drag-and-drop multi-axis @hello-pangea/dnd, editor modal kartu tugas, otomasi alur kerja, dan tampilan kalender.'
    }
  },
  {
    id: 'react-crypto-analytics-dashboard',
    name: 'react-crypto-analytics-dashboard',
    title: 'Cryptocurrency Analytics & Whale Tracker',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / FinTech Web',
    tech: ['React 19', 'Recharts', 'Framer Motion', 'CoinGecko Live API', 'Whale Tracker'],
    tier: 1,
    sizeKb: 78,
    githubUrl: 'https://github.com/mazkev/react-crypto-analytics-dashboard',
    desc: {
      en: 'Cryptocurrency analytics and portfolio dashboard with Recharts live charts, Framer Motion animations, CoinGecko v3 real-time market data, and large whale transaction feed.',
      id: 'Dashboard analitik cryptocurrency dan portofolio dengan grafik Recharts, animasi Framer Motion, data pasar live CoinGecko v3, dan pemantau transaksi besar whale.'
    }
  },
  {
    id: 'react-whatsapp-web-client',
    name: 'react-whatsapp-web-client',
    title: 'WhatsApp Web Client (BroadcastChannel Multi-Tab)',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Messenger',
    tech: ['React 19', 'BroadcastChannel API', 'Cross-Tab Sync', 'Stories Viewer', 'Communities'],
    tier: 1,
    sizeKb: 91,
    githubUrl: 'https://github.com/mazkev/react-whatsapp-web-client',
    desc: {
      en: 'WhatsApp Web client clone with React 19, cross-tab real-time communication via the HTML5 BroadcastChannel API, status stories viewer, and community group channels.',
      id: 'Aplikasi pesan web terinspirasi WhatsApp dengan React 19, sinkronisasi pesan multi-tab langsung via BroadcastChannel API, penampil status cerita, dan kanal komunitas.'
    }
  },
  {
    id: 'react-youtube-streaming-platform',
    name: 'react-youtube-streaming-platform',
    title: 'YouTube Streaming Platform (Picture-in-Picture & Shorts)',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Video Web',
    tech: ['React 19', 'React Router v7', 'Zustand', 'PiP Mini-Player', 'Shorts Feed', 'YouTube API'],
    tier: 1,
    sizeKb: 89,
    githubUrl: 'https://github.com/mazkev/react-youtube-streaming-platform',
    desc: {
      en: 'Video streaming platform on React 19 and React Router v7 with Picture-in-Picture floating mini-player, vertical Shorts autoplay feed, category carousels, and YouTube Data API.',
      id: 'Platform streaming video dengan React 19 dan React Router v7, pemutar mini Picture-in-Picture melayang, feed Shorts vertikal putar otomatis, dan integrasi YouTube Data API.'
    }
  },
  {
    id: 'react-airbnb-booking-platform',
    name: 'react-airbnb-booking-platform',
    title: 'Airbnb Vacation Rental & Reservation Platform',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Travel Booking',
    tech: ['React 19', 'Leaflet Clusters', 'Date-Range Picker', 'Digital Receipts', 'Trips Manager'],
    tier: 1,
    sizeKb: 93,
    githubUrl: 'https://github.com/mazkev/react-airbnb-booking-platform',
    desc: {
      en: 'Vacation rental platform built with React 19, interactive Leaflet map marker clusters, dynamic stay night date-range pricing calculators, digital receipts, and trip manager.',
      id: 'Platform sewa penginapan terinspirasi Airbnb dengan React 19, klaster peta interaktif Leaflet, kalkulasi harga menginap kalender dinamis, kuitansi digital, dan manajemen trip.'
    }
  },
  {
    id: 'react-twitter-x-social-platform',
    name: 'react-twitter-x-social-platform',
    title: 'Twitter / X Social Network & AI Bot Platform',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Social Network',
    tech: ['React 19', 'Tailwind CSS v4', 'Zustand', 'X-Bot AI Chat', 'Communities', 'Lists'],
    tier: 1,
    sizeKb: 87,
    githubUrl: 'https://github.com/mazkev/react-twitter-x-social-platform',
    desc: {
      en: 'Modern social platform inspired by Twitter/X with React 19, Tailwind CSS v4, Zustand, Grok/X-Bot AI assistant chat, bookmarks, custom lists, and community feed channels.',
      id: 'Platform jejaring sosial terinspirasi X/Twitter dengan React 19, Tailwind CSS v4, Zustand, asisten chat X-Bot AI terintegrasi, bookmark, daftar kurasi, dan kanal komunitas.'
    }
  },
  {
    id: 'react-instagram-social-platform',
    name: 'react-instagram-social-platform',
    title: 'Instagram Social Media Platform (Reels & AI DMs)',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Social Media',
    tech: ['React 19', 'Reels Feed', 'Stories Viewer', 'AI Auto-Reply DMs', 'Zustand'],
    tier: 1,
    sizeKb: 5614,
    githubUrl: 'https://github.com/mazkev/react-instagram-social-platform',
    desc: {
      en: 'Instagram web client with React 19, vertical Reels autoplay feed, full-screen story viewer with progress countdowns, image filters, and direct messages with AI auto-replies.',
      id: 'Klien web Instagram dengan React 19, feed Reels putar otomatis vertikal, penampil story layar penuh dengan bar countdown, filter foto, dan pesan langsung DM dengan AI auto-reply.'
    }
  },
  {
    id: 'react-netflix-streaming-platform',
    name: 'react-netflix-streaming-platform',
    title: 'Netflix Streaming Platform & Storybook Design System',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Streaming Web',
    tech: ['React 18', 'TypeScript', 'Redux Toolkit', 'Webpack 5', 'TMDB API', 'Firebase', 'Storybook'],
    tier: 1,
    sizeKb: 39319,
    githubUrl: 'https://github.com/mazkev/react-netflix-streaming-platform',
    desc: {
      en: 'Cinema streaming platform built with React 18, TypeScript, Redux Toolkit, Webpack 5 custom bundling, TMDB film database, Firebase auth, and comprehensive Storybook design system.',
      id: 'Platform streaming bioskop dengan React 18, TypeScript, Redux Toolkit, konfigurasi Webpack 5 kustom, katalog film TMDB, autentikasi Firebase, dan design system Storybook.'
    }
  },
  {
    id: 'angular-marketplace-storefront',
    name: 'angular-marketplace-storefront',
    title: 'Angular 19 Enterprise E-Commerce Storefront',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Angular',
    tech: ['Angular 19', 'TypeScript', 'Angular Signals', 'RxJS', 'Order Tracking', 'Seller Dashboard'],
    tier: 1,
    sizeKb: 171,
    githubUrl: 'https://github.com/mazkev/angular-marketplace-storefront',
    liveUrl: 'https://market-x-angular.vercel.app',
    desc: {
      en: 'Enterprise e-commerce storefront utilizing Angular 19, reactive Angular Signals, RxJS event streams, live order status progression tracker, and seller back-office dashboard.',
      id: 'Storefront e-commerce enterprise dengan Angular 19, Angular Signals reaktif, alur event RxJS, pelacak perkembangan status pesanan langsung, dan dashboard toko penjual.'
    }
  },
  {
    id: 'vue-gojek-superapp-prototype',
    name: 'vue-gojek-superapp-prototype',
    title: 'Gojek Super-App Web Prototype & Wallet (Vue 3)',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Super-App',
    tech: ['Vue 3 Composition API', 'GoRide & GoFood', 'GoPay Wallet', 'Driver Chat', 'Vitest'],
    tier: 1,
    sizeKb: 76,
    githubUrl: 'https://github.com/mazkev/vue-gojek-superapp-prototype',
    desc: {
      en: 'Super-app web prototype with Vue 3 Composition API, simulated GoRide transport and GoFood delivery order workflows, interactive GoPay digital wallet, driver chat, and Vitest suites.',
      id: 'Prototipe web super-app dengan Vue 3 Composition API, alur pemesanan GoRide dan GoFood, dompet digital interaktif GoPay, obrolan dengan driver, dan pengujian Vitest.'
    }
  },
  {
    id: 'react-shopping-cart',
    name: 'react-shopping-cart',
    title: 'Type-Safe Shopping Cart & Catalog (React & Redux)',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / E-Commerce',
    tech: ['React', 'TypeScript', 'Redux', 'Local Storage Persistence', 'Dynamic Cart'],
    tier: 2,
    sizeKb: 55612,
    githubUrl: 'https://github.com/mazkev/react-shopping-cart',
    desc: {
      en: 'Type-safe shopping cart and product catalog application built with React, TypeScript, Redux state management, and persistent local storage synchronization.',
      id: 'Aplikasi keranjang belanja type-safe dengan React, TypeScript, manajemen state Redux, dan sinkronisasi penyimpanan lokal persisten.'
    }
  },
  {
    id: 'belajar-excel-app',
    name: 'belajar-excel-app',
    title: 'Interactive Excel Simulator & AI Tutor (Groq AI)',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / EdTech',
    tech: ['React 19', 'Spreadsheet Simulator', 'Groq AI Tutor', 'SheetJS', 'Gamification'],
    tier: 2,
    sizeKb: 126,
    githubUrl: 'https://github.com/mazkev/belajar-excel-app',
    desc: {
      en: 'Interactive spreadsheet learning platform featuring formula calculation simulators, Groq AI instant formula tutor, SheetJS workbook parser, and gamified practice challenges.',
      id: 'Platform pembelajaran spreadsheet interaktif dengan simulator rumus Excel, tutor rumus cerdas Groq AI, parser SheetJS, dan tantangan latihan gamifikasi berlevel.'
    }
  },
  {
    id: 'crypto-market-cap-dashboard',
    name: 'crypto-market-cap-dashboard',
    title: 'Crypto Market Capitalization & Analytics Board',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Crypto',
    tech: ['React 19', 'CoinGecko API v3', 'ApexCharts', 'Recharts', 'Price Tracking'],
    tier: 2,
    sizeKb: 88,
    githubUrl: 'https://github.com/mazkev/crypto-market-cap-dashboard',
    desc: {
      en: 'Cryptocurrency market monitoring board featuring real-time CoinGecko API v3 integration, multi-timeframe ApexCharts and Recharts price graphs, and coin rankings.',
      id: 'Papan pemantau pasar cryptocurrency dengan integrasi CoinGecko API v3 langsung, grafik pergerakan harga ApexCharts dan Recharts multi-timeframe, dan ranking koin.'
    }
  },
  {
    id: 'react-snake-ai-pathfinding',
    name: 'react-snake-ai-pathfinding',
    title: 'HTML5 Canvas Snake Game & BFS Pathfinding AI',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Canvas Game',
    tech: ['React 19', 'HTML5 Canvas 60 FPS', 'BFS Pathfinding', 'Zustand', 'Gemini AI Coach'],
    tier: 2,
    sizeKb: 52,
    githubUrl: 'https://github.com/mazkev/react-snake-ai-pathfinding',
    desc: {
      en: 'Classic Snake game running on HTML5 Canvas at 60 FPS featuring an autonomous BFS shortest-path bot algorithm, Zustand game state, and Gemini AI gameplay coach.',
      id: 'Game Snake klasik berbasis kanvas HTML5 60 FPS dengan algoritma bot auto-play BFS shortest-path, manajemen state Zustand, dan ulasan taktik Gemini AI coach.'
    }
  },
  {
    id: 'react-ai-component-wireframer',
    name: 'react-ai-component-wireframer',
    title: 'AI UI Component Generator & Sandpack Sandbox',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Developer Tool',
    tech: ['React 19', 'Tailwind CSS v4', 'CodeSandbox Sandpack', 'Google Gen AI', 'Resizable Panels'],
    tier: 2,
    sizeKb: 771,
    githubUrl: 'https://github.com/mazkev/react-ai-component-wireframer',
    desc: {
      en: 'AI frontend component generator using Google Gemini to produce code and execute it in real time within a secure CodeSandbox Sandpack in-browser environment.',
      id: 'Aplikasi pembuat komponen UI berbasis AI menggunakan Google Gemini dengan eksekusi langsung dalam lingkungan sandbox peramban aman CodeSandbox Sandpack.'
    }
  },
  {
    id: 'ai-code-reviewer',
    name: 'ai-code-reviewer',
    title: 'AI Code Security & Quality Reviewer',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Code Analysis',
    tech: ['React 19', 'Prism Highlighter', 'JSZip Unpacker', 'Security Audit', 'Gemini AI'],
    tier: 2,
    sizeKb: 66,
    githubUrl: 'https://github.com/mazkev/ai-code-reviewer',
    desc: {
      en: 'Automated code review workstation using JSZip to unpack project files, syntax-highlight with Prism.js, and identify security vulnerabilities with AI prompts.',
      id: 'Workstation review kode otomatis menggunakan JSZip untuk membaca berkas proyek, penyorot sintaks Prism.js, dan deteksi celah keamanan menggunakan model AI.'
    }
  },
  {
    id: 'react-umrah-travel-landing',
    name: 'react-umrah-travel-landing',
    title: 'Hajj & Umrah Travel Agency Booking Portal',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Travel',
    tech: ['React 19', 'Cost Calculator', 'Daily Itineraries', 'WhatsApp Widget', 'Tailwind CSS'],
    tier: 2,
    sizeKb: 3498,
    githubUrl: 'https://github.com/mazkev/react-umrah-travel-landing',
    desc: {
      en: 'Travel portal featuring dynamic package price calculators, interactive day-by-day pilgrimage itineraries, testimonial grids, and direct WhatsApp sales consultation integration.',
      id: 'Portal travel haji dan umrah dengan kalkulator perkiraan biaya paket, jadwal perjalanan hari demi hari, testimoni jamaah, dan integrasi konsultasi WhatsApp langsung.'
    }
  },
  {
    id: 'react-cloud-console-simulator',
    name: 'react-cloud-console-simulator',
    title: 'Cloud PaaS Deployment Console Simulator',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Cloud Tool',
    tech: ['React 19', 'Terminal Stream Logs', 'DNS Domains', 'Secrets Vault', 'Tailwind CSS'],
    tier: 2,
    sizeKb: 45,
    githubUrl: 'https://github.com/mazkev/react-cloud-console-simulator',
    desc: {
      en: 'Vercel/Heroku-inspired PaaS cloud console simulator with streaming build terminal logs, custom DNS domain routing configurations, and environment secrets vault.',
      id: 'Simulator konsol cloud PaaS terinspirasi Vercel/Heroku dengan streaming log terminal build, konfigurasi domain DNS kustom, dan brankas rahasia environment variables.'
    }
  },
  {
    id: 'vue-inventory-management-system',
    name: 'vue-inventory-management-system',
    title: 'Vue Inventory & Supplier Audit System',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Business Tool',
    tech: ['Vue.js', 'Tailwind CSS', 'ApexCharts', 'PDF/Excel Export', 'Audit Logs'],
    tier: 2,
    sizeKb: 409,
    githubUrl: 'https://github.com/mazkev/vue-inventory-management-system',
    desc: {
      en: 'Business inventory platform built with Vue.js featuring supplier directory, ApexCharts stock trend visualizers, PDF/Excel report export utilities, and historical audit logs.',
      id: 'Platform inventaris bisnis dengan Vue.js, direktori supplier, grafik tren stok barang ApexCharts, ekspor laporan format PDF/Excel, dan riwayat audit log.'
    }
  },
  {
    id: 'medium-clone-bootstrap',
    name: 'medium-clone-bootstrap',
    title: 'Medium Editorial Publishing Landing Page',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Slicing UI',
    tech: ['HTML5', 'Bootstrap 5', 'Bootstrap Icons', 'Trending Grid', 'Responsive Layout'],
    tier: 2,
    sizeKb: 1918,
    githubUrl: 'https://github.com/mazkev/medium-clone-bootstrap',
    desc: {
      en: 'Pixel-perfect UI clone of Medium landing page using HTML5 and Bootstrap 5, featuring trending post numbers, topic tag carousels, and responsive typography layouts.',
      id: 'Slicing antarmuka web Medium dengan HTML5 dan Bootstrap 5, menampilkan artikel trending bernomor urut, kategori topik artikel, dan tata letak tipografi responsif.'
    }
  },
  {
    id: 'Ecommerce-bootcamp',
    name: 'Ecommerce-bootcamp',
    title: 'E-Commerce Bootcamp Storefront Practice',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Practice',
    tech: ['JavaScript', 'React', 'Product Catalog', 'Cart Flow', 'Bootstrap'],
    tier: 2,
    sizeKb: 1417,
    githubUrl: 'https://github.com/mazkev/Ecommerce-bootcamp',
    desc: {
      en: 'E-commerce frontend practice application with product card grids, interactive shopping cart, checkout form validation, and responsive mobile styling.',
      id: 'Aplikasi latihan frontend toko online dengan katalog produk, keranjang belanja interaktif, validasi form checkout, dan tata letak responsif.'
    }
  },
  {
    id: 'Ecommerce-botcamp',
    name: 'Ecommerce-botcamp',
    title: 'E-Commerce Frontend State Practice App',
    domain: 'frontend',
    domainLabel: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    category: 'Frontend / Practice',
    tech: ['JavaScript', 'React', 'State Management', 'Cart UI'],
    tier: 2,
    sizeKb: 0,
    githubUrl: 'https://github.com/mazkev/Ecommerce-botcamp',
    desc: {
      en: 'Foundational React e-commerce practice project demonstrating component lifecycle, state lifting, and modular UI structure.',
      id: 'Proyek latihan dasar e-commerce React untuk menguji siklus hidup komponen, state lifting, dan struktur antarmuka modular.'
    }
  },

  // ==========================================
  // 4. MOBILE APPLICATIONS (iOS & Android) (10 Repos)
  // ==========================================
  {
    id: 'flutter-grab-superapp-clone',
    name: 'flutter-grab-superapp-clone',
    title: 'Grab Superapp Mobile & Web (Flutter & Riverpod)',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / Flutter',
    tech: ['Flutter 3', 'Dart', 'Riverpod 3', 'OpenStreetMap Live Tracking', 'Food & Ride Hailing'],
    tier: 1,
    sizeKb: 21810,
    githubUrl: 'https://github.com/mazkev/flutter-grab-superapp-clone',
    desc: {
      en: 'Cross-platform mobile superapp built with Flutter and Riverpod 3 featuring real-time OpenStreetMap driver route tracking, GrabFood and GrabRide booking flows.',
      id: 'Aplikasi superapp mobile cross-platform dengan Flutter dan Riverpod 3, menampilkan pelacakan langsung driver di peta OpenStreetMap, pemesanan GrabFood dan GrabRide.'
    }
  },
  {
    id: 'treveloka-react-native-expo',
    name: 'treveloka-react-native-expo',
    title: 'Traveloka Superapp Clone (React Native & AI)',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / React Native',
    tech: ['React Native 0.85', 'Expo SDK 56', 'Expo Router', 'Gemini AI Assistant', 'E-Ticket QR'],
    tier: 1,
    sizeKb: 1550,
    githubUrl: 'https://github.com/mazkev/treveloka-react-native-expo',
    desc: {
      en: 'Mobile travel booking superapp with React Native 0.85 and Expo SDK 56, featuring flight/hotel search, Gemini AI itinerary assistant, and QR e-ticket generation.',
      id: 'Aplikasi mobile pemesanan tiket perjalanan dengan React Native 0.85 dan Expo 56, pencarian tiket pesawat & hotel, asisten perjalanan Gemini AI, dan e-tiket QR.'
    }
  },
  {
    id: 'react-native-inventory-tracker',
    name: 'react-native-inventory-tracker',
    title: 'Warehouse Inventory Mobile App (Barcode Scanner)',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / React Native',
    tech: ['React Native 0.85', 'Expo SDK 56', 'Camera Barcode Scanner', 'Multi-Warehouse', 'Google Apps Script'],
    tier: 1,
    sizeKb: 1546,
    githubUrl: 'https://github.com/mazkev/react-native-inventory-tracker',
    desc: {
      en: 'Warehouse operations mobile app with real-time camera barcode/QR scanner, multi-facility stock transfers, offline caching, and Google Apps Script database sync.',
      id: 'Aplikasi pergudangan mobile dengan scanner barcode & QR kamera langsung, mutasi stok multi-gudang, offline cache, dan sinkronisasi Google Apps Script.'
    }
  },
  {
    id: 'react-native-pos-cashier',
    name: 'react-native-pos-cashier',
    title: 'Mobile POS Cashier Terminal (Expo SDK 56)',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / React Native',
    tech: ['React Native 0.85', 'Expo SDK 56', 'Cashier PIN Lock', 'Shift Drawer Audit', 'GAS Cloud'],
    tier: 1,
    sizeKb: 669,
    githubUrl: 'https://github.com/mazkev/react-native-pos-cashier',
    desc: {
      en: 'Mobile POS cashier terminal app featuring PIN-protected cashier shift logins, cash drawer reconciliation audit, customer loyalty points, and cloud sales logging.',
      id: 'Terminal kasir POS mobile dengan proteksi PIN kasir, audit rekonsiliasi uang laci per shift, program poin loyalitas pelanggan, dan pencatatan transaksi cloud.'
    }
  },
  {
    id: 'duolingo-clone-react-native',
    name: 'duolingo-clone-react-native',
    title: 'Gamified Language Learning App (Duolingo Clone)',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / React Native',
    tech: ['React Native 0.85', 'Expo SDK 56', 'Native Audio TTS', 'Lottie Animations', 'Zustand Streak'],
    tier: 1,
    sizeKb: 650,
    githubUrl: 'https://github.com/mazkev/duolingo-clone-react-native',
    desc: {
      en: 'Gamified language learning app with React Native and Expo, featuring native text-to-speech audio pronunciation, Lottie rewards, streak tracker, and gem shop.',
      id: 'Aplikasi belajar bahasa berbasis gamifikasi dengan React Native dan Expo, audio native text-to-speech, animasi Lottie, pelacak streak harian, dan toko item permata.'
    }
  },
  {
    id: 'tiktok-clone-react-native-expo',
    name: 'tiktok-clone-react-native-expo',
    title: 'Short-Form Video Social App (TikTok Clone)',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / React Native',
    tech: ['React Native 0.85', 'Expo SDK 56', 'Expo Video Player', 'Camera Recording', 'Live Comments'],
    tier: 1,
    sizeKb: 2461,
    githubUrl: 'https://github.com/mazkev/tiktok-clone-react-native-expo',
    desc: {
      en: 'Short-form vertical video social platform with Expo Video seamless autoplay feeds, camera video capture, double-tap like animations, and live comment overlays.',
      id: 'Platform video vertikal pendek terinspirasi TikTok dengan putar otomatis video Expo Video, perekaman kamera, animasi double-tap like, dan overlay komentar live.'
    }
  },
  {
    id: 'shopee-clone-react-native-expo',
    name: 'shopee-clone-react-native-expo',
    title: 'Shopee E-Commerce Marketplace Mobile App',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / React Native',
    tech: ['React Native 0.85', 'Expo SDK 56', 'ShopeePay Wallet', 'Ongkir Shipping Calculator', 'Resi Tracker'],
    tier: 1,
    sizeKb: 3166,
    githubUrl: 'https://github.com/mazkev/shopee-clone-react-native-expo',
    desc: {
      en: 'E-commerce marketplace mobile app with ShopeePay wallet simulator, multi-courier shipping rate calculator, flash sale countdowns, and package tracking.',
      id: 'Aplikasi marketplace mobile e-commerce dengan simulator dompet ShopeePay, kalkulator ongkir multi-ekspedisi, promo flash sale, dan pelacak nomor resi paket.'
    }
  },
  {
    id: 'whatsapp-clone-react-native-expo',
    name: 'whatsapp-clone-react-native-expo',
    title: 'WhatsApp Messenger Mobile App (Expo SDK 56)',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / React Native',
    tech: ['React Native 0.85', 'Expo SDK 56', 'Voice Note Recording', 'Location Pins', 'Status Stories'],
    tier: 1,
    sizeKb: 1546,
    githubUrl: 'https://github.com/mazkev/whatsapp-clone-react-native-expo',
    desc: {
      en: 'Mobile messaging app built with React Native and Expo featuring voice note recording, GPS location pin sharing, status story carousels, and in-chat polling.',
      id: 'Aplikasi pesan mobile dengan React Native dan Expo dilengkapi rekaman pesan suara (VN), berbagi pin lokasi GPS, status cerita, dan polling jajak pendapat di chat.'
    }
  },
  {
    id: 'react-native-employee-attendance',
    name: 'react-native-employee-attendance',
    title: 'Employee Attendance & GPS Location Check-In',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / React Native',
    tech: ['React Native Expo 56', 'Selfie Camera Check-In', 'GPS Geo-Fence', 'Google Apps Script'],
    tier: 1,
    sizeKb: 2887,
    githubUrl: 'https://github.com/mazkev/react-native-employee-attendance',
    desc: {
      en: 'Mobile employee attendance app with front-facing camera selfie verification, GPS geo-fenced workplace check-in, leave application requests, and cloud spreadsheet sync.',
      id: 'Aplikasi absensi karyawan mobile dengan verifikasi kamera selfie depan, validasi geo-fencing radius kantor GPS, pengajuan cuti, dan sinkronisasi cloud spreadsheet.'
    }
  },
  {
    id: 'Shovee-Frontend',
    name: 'Shovee-Frontend',
    title: 'Shopee Mobile Slicing Baseline (Legacy)',
    domain: 'mobile',
    domainLabel: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    category: 'Mobile / Legacy Baseline',
    tech: ['React Native', 'Mobile UI Slicing', 'JavaScript'],
    tier: 4,
    sizeKb: 2969,
    githubUrl: 'https://github.com/mazkev/Shovee-Frontend',
    desc: {
      en: 'Early exploration baseline repository practicing React Native mobile components and layout design for e-commerce shopping apps.',
      id: 'Repositori eksplorasi awal untuk latihan komponen mobile dan tata letak aplikasi e-commerce menggunakan React Native.'
    }
  },

  // ==========================================
  // 5. EKSPLORASI, PRAKTIK & ARSIP (13 Repos)
  // ==========================================
  {
    id: 'Semarketplace',
    name: 'Semarketplace',
    title: 'Semarketplace Prototype Marketplace',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / Prototype',
    tech: ['JavaScript', 'React', 'Product Catalog', 'Prototype State'],
    tier: 3,
    sizeKb: 2272,
    githubUrl: 'https://github.com/mazkev/Semarketplace',
    desc: {
      en: 'Early React marketplace prototype exploring state architectures and responsive component hierarchies.',
      id: 'Prototipe marketplace React tahap awal untuk eksplorasi arsitektur state dan hierarki komponen responsif.'
    }
  },
  {
    id: 'codequest-app',
    name: 'codequest-app',
    title: 'CodeQuest: Gamified Algorithm Practice Sandbox',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / Algorithms',
    tech: ['JavaScript', 'React', 'LeetCode-Style Sandbox', 'Code Runner', 'Synth Audio'],
    tier: 3,
    sizeKb: 61,
    githubUrl: 'https://github.com/mazkev/codequest-app',
    desc: {
      en: 'Gamified coding practice platform with LeetCode-style algorithm problems, client-side code runner, synth sound effects, and XP levels.',
      id: 'Platform latihan algoritma bergaya LeetCode dengan eksekutor kode client-side, efek suara synthesizer, dan level pengalaman XP.'
    }
  },
  {
    id: 'omnidesk',
    name: 'omnidesk',
    title: 'OmniDesk: Customer Support Queue Console',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / Support Queue',
    tech: ['JavaScript', 'React', 'Kanban Queue', 'Ticket System', 'Sound Effects'],
    tier: 3,
    sizeKb: 63,
    githubUrl: 'https://github.com/mazkev/omnidesk',
    desc: {
      en: 'Helpdesk ticket management prototype with prioritized Kanban queue, sound notifications, and fast response snippet templates.',
      id: 'Prototipe manajemen tiket bantuan pelanggan dengan antrean Kanban berprioritas, notifikasi suara, dan template pesan cepat.'
    }
  },
  {
    id: 'syntax-translator',
    name: 'syntax-translator',
    title: 'Syntax Translator: AI Multi-Language Code Converter',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / Code Tool',
    tech: ['JavaScript', 'React', 'AI Code Conversion', 'Syntax Highlighter'],
    tier: 3,
    sizeKb: 52,
    githubUrl: 'https://github.com/mazkev/syntax-translator',
    desc: {
      en: 'Cross-language code syntax translator using AI APIs to convert snippets between JavaScript, Python, Go, and Java.',
      id: 'Konverter sintaks kode multi-bahasa menggunakan API AI untuk mengonversi potongan kode antar JavaScript, Python, Go, dan Java.'
    }
  },
  {
    id: 'belajar-backend-css-app',
    name: 'belajar-backend-css-app',
    title: 'Backend Architecture & CSS Learning Playground',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / Learning Lab',
    tech: ['JavaScript', 'React', 'Interactive Cheatsheets', 'CSS Layout Sandbox'],
    tier: 3,
    sizeKb: 80,
    githubUrl: 'https://github.com/mazkev/belajar-backend-css-app',
    desc: {
      en: 'Interactive reference sandbox covering backend architecture patterns, SQL schema design, and CSS modern layouts.',
      id: 'Sandbox referensi interaktif yang merangkum konsep arsitektur backend, skema SQL, dan eksplorasi tata letak modern CSS.'
    }
  },
  {
    id: 'vibe-coding-assistant',
    name: 'vibe-coding-assistant',
    title: 'Vibe Coding Assistant & Prompt Playground',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / AI Assistant',
    tech: ['JavaScript', 'React', 'Prompt Engineering', 'AI Stream Response'],
    tier: 3,
    sizeKb: 56,
    githubUrl: 'https://github.com/mazkev/vibe-coding-assistant',
    desc: {
      en: 'AI pair programming assistant interface experimenting with stream prompt completions and rapid prototyping.',
      id: 'Antarmuka asisten pair programming AI untuk eksperimen prompt streaming dan pembuatan prototipe kode secara cepat.'
    }
  },
  {
    id: 'AI-SaaS-Image-Generator',
    name: 'AI-SaaS-Image-Generator',
    title: 'AI SaaS Image Generator Studio Prototype',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / AI SaaS',
    tech: ['JavaScript', 'React', 'AI Image API', 'Gallery Export'],
    tier: 3,
    sizeKb: 2591,
    githubUrl: 'https://github.com/mazkev/AI-SaaS-Image-Generator',
    desc: {
      en: 'AI-powered image generation studio prototype with prompt presets, aspect ratio selectors, and history gallery.',
      id: 'Prototipe studio pembuat gambar berbasis AI dengan preset prompt, pemilih rasio aspek gambar, dan galeri riwayat.'
    }
  },
  {
    id: 'testReact5',
    name: 'testReact5',
    title: 'React Component Optimization Sandbox',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / Benchmark',
    tech: ['JavaScript', 'React', 'Render Performance Tests'],
    tier: 3,
    sizeKb: 174,
    githubUrl: 'https://github.com/mazkev/testReact5',
    desc: {
      en: 'Technical sandbox testing React component rendering speeds, hook dependencies, and state boundaries.',
      id: 'Sandbox teknis untuk menguji kecepatan render komponen React, dependensi hooks, dan batas isolasi state.'
    }
  },
  {
    id: 'belajar-java-springboot',
    name: 'belajar-java-springboot',
    title: 'Java Spring Boot & Vue Fullstack Study Lab',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / Java Lab',
    tech: ['Java', 'Spring Boot', 'Vue.js', 'REST API Practice'],
    tier: 3,
    sizeKb: 153,
    githubUrl: 'https://github.com/mazkev/belajar-java-springboot',
    desc: {
      en: 'Study repository practicing Java Spring Boot REST controllers, dependency injection, and Vue.js consumption.',
      id: 'Repositori studi untuk latihan controller REST Java Spring Boot, dependency injection, dan integrasi antarmuka Vue.js.'
    }
  },
  {
    id: 'mazkev',
    name: 'mazkev',
    title: 'GitHub Profile README Configuration',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / Profile Config',
    tech: ['Markdown', 'GitHub Profile', 'SVG Badges', 'Stats Metrics'],
    tier: 3,
    sizeKb: 11,
    githubUrl: 'https://github.com/mazkev/mazkev',
    desc: {
      en: 'GitHub profile README configuration with technology badges, live repository stats, and developer bio.',
      id: 'Konfigurasi README profil GitHub resmi dengan badge teknologi, metrik repositori langsung, dan bio pengembang.'
    }
  },
  {
    id: 'tes-html',
    name: 'tes-html',
    title: 'HTML5 Semantic Markup & CSS Exercise',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Exploration / Web Basics',
    tech: ['HTML5', 'CSS3', 'Semantic Layout'],
    tier: 3,
    sizeKb: 66,
    githubUrl: 'https://github.com/mazkev/tes-html',
    desc: {
      en: 'Foundational markup practice repository exploring semantic HTML5 tags and CSS responsive box models.',
      id: 'Latihan dasar penulisan markup semantik HTML5 dan model kotak responsif CSS.'
    }
  },
  {
    id: 'final-project',
    name: 'final-project',
    title: 'Legacy Final Project Archive',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Archive / Legacy',
    tech: ['Archive', 'Legacy Code'],
    tier: 4,
    sizeKb: 1,
    githubUrl: 'https://github.com/mazkev/final-project',
    desc: {
      en: 'Archived historical repository from early university software development assignments.',
      id: 'Arsip repositori historis dari tugas awal perkuliahan rekayasa perangkat lunak.'
    }
  },
  {
    id: 'Project',
    name: 'Project',
    title: 'Initial Development Repository Placeholder',
    domain: 'exploration',
    domainLabel: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    category: 'Archive / Placeholder',
    tech: ['Archive', 'Git Initialization'],
    tier: 4,
    sizeKb: 2,
    githubUrl: 'https://github.com/mazkev/Project',
    desc: {
      en: 'Initial Git repository initialized during early version control workflow practice.',
      id: 'Repositori inisialisasi awal saat praktik pengenalan version control Git.'
    }
  }
];

export const DOMAIN_META = {
  backend: {
    icon: 'Server',
    label: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    count: 19,
    tier1Count: 14,
    color: 'sky'
  },
  fullstack: {
    icon: 'Layers',
    label: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    count: 13,
    tier1Count: 13,
    color: 'indigo'
  },
  frontend: {
    icon: 'Cpu',
    label: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    count: 38,
    tier1Count: 26,
    color: 'emerald'
  },
  mobile: {
    icon: 'Smartphone',
    label: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    count: 10,
    tier1Count: 9,
    color: 'purple'
  },
  exploration: {
    icon: 'FlaskConical',
    label: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    count: 13,
    tier1Count: 0,
    color: 'amber'
  }
};
