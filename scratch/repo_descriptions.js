const repoDescriptions = {
  'go-distributed-microservices-lab': {
    en: 'Distributed microservices architecture with binary gRPC, RabbitMQ message brokers, and Redis cache-aside.',
    id: 'Arsitektur microservices terdistribusi dengan gRPC biner, message broker RabbitMQ, dan Redis cache-aside.'
  },
  'go-ecommerce-gateway-engine': {
    en: 'High-throughput reverse proxy API gateway with MongoDB, order lifecycle engine, and Swagger OpenAPI.',
    id: 'Reverse proxy API gateway berkecepatan tinggi dengan database MongoDB, lifecycle order, dan Swagger OpenAPI.'
  },
  'go-banking-core-system': {
    en: 'Digital wallet and transactional transfer engine with ACID atomic isolation, row-level locks, and Bcrypt PIN.',
    id: 'Layanan dompet digital & transfer dana dengan isolasi atomik ACID, row-level locking, dan PIN Bcrypt.'
  },
  'go-clean-arch': {
    en: 'Domain-driven Clean Architecture REST API decoupling business usecases from repository persistence.',
    id: 'REST API Clean Architecture domain-driven yang memisahkan usecase bisnis dari persistensi repository.'
  },
  'go-rest-api-enterprise': {
    en: 'Enterprise Go boilerplate featuring Zap structured logging, cache-aside Redis, and graceful shutdown.',
    id: 'Boilerplate Go enterprise dengan structured logging Zap, caching Redis, dan graceful shutdown.'
  },
  'spring-boot-enterprise-platform': {
    en: 'Enterprise backend platform with Spring Security JWT, AOP logging, Bucket4j rate limiting, and Docker.',
    id: 'Platform enterprise dengan Spring Security JWT, audit logging AOP, rate limiting Bucket4j, dan Docker.'
  },
  'hono-ecommerce-engine': {
    en: 'Sub-millisecond REST API engine running on Bun runtime with Drizzle ORM and live WebSocket chat.',
    id: 'Engine REST API sub-milidetik berbasis Bun runtime dengan Drizzle ORM dan live chat WebSocket.'
  },
  'express-prisma-realworld-api': {
    en: 'Conduit specification publication backend built with Express, TypeScript, Prisma ORM, and Nx monorepo.',
    id: 'Backend publikasi standar RealWorld dengan Express, TypeScript, Prisma ORM, dan Nx monorepo.'
  },
  'express-typescript-prisma-api': {
    en: 'Type-safe modular REST API built with Express v5, TypeScript, Prisma 7, and LibSQL adapter.',
    id: 'REST API modular type-safe dengan Express v5, TypeScript, Prisma 7, dan LibSQL adapter.'
  },
  'express-prisma-product-api': {
    en: 'Modular product catalog REST API with JWT authentication, Multer uploads, and Zod schema validation.',
    id: 'REST API katalog produk dengan autentikasi JWT, upload file Multer, dan validasi runtime Zod.'
  },
  'express-sqlite-ecommerce-api': {
    en: 'Lightweight e-commerce API with SQLite prepared statements, atomic checkout transactions, and Swagger UI.',
    id: 'API e-commerce ringan dengan prepared statements SQLite, checkout transaksi atomik, dan Swagger UI.'
  },
  'express-realtime-api-service': {
    en: 'Real-time event broadcasting API engine integrating Socket.IO, dual DB (MongoDB + MySQL), and Winston.',
    id: 'Engine API event broadcasting real-time dengan Socket.IO, dual database (MongoDB + MySQL), dan Winston.'
  },
  'express-prisma-payment-api': {
    en: 'Payment processing backend with Midtrans webhook verification, automated PDFKit invoices, and Nodemailer.',
    id: 'Backend pembayaran dengan webhook Midtrans, pembuatan faktur invoice PDFKit otomatis, dan email notifikasi.'
  },
  'AI-api-manager': {
    en: 'API reverse proxy gateway with API key validation, Token Bucket rate limiting, and quota analytics.',
    id: 'API reverse proxy gateway dengan otentikasi API key, rate limiting Token Bucket, dan analitik kuota.'
  },
  'spring-boot-book-manager-api': {
    en: 'Book catalog microservice with Java 17, Spring Boot 3.3, Spring Data MongoDB, and OpenAPI 3.0.',
    id: 'Layanan mikro katalog buku dengan Java 17, Spring Boot 3.3, Spring Data MongoDB, dan OpenAPI 3.0.'
  },
  'express-book-catalog-api': {
    en: 'Real-time book inventory management API with Express v5, Prisma 7, Socket.IO, and Redis rate limiting.',
    id: 'API manajemen inventaris buku real-time dengan Express v5, Prisma 7, Socket.IO, dan rate limiter Redis.'
  },
  'express-redis-url-shortener': {
    en: 'URL redirect engine leveraging Redis cache-aside for sub-millisecond lookups and MongoDB storage.',
    id: 'Engine redirect tautan dengan pola Redis cache-aside untuk lookup sub-milidetik dan penyimpanan MongoDB.'
  },
  'express-mongo-content-api': {
    en: 'Content management REST API with MongoDB Mongoose, Redis caching, Socket.IO, and cron schedulers.',
    id: 'REST API manajemen konten dengan MongoDB Mongoose, caching Redis, Socket.IO, dan penjadwalan cron.'
  },
  'express-mongodb-starter-api': {
    en: 'Modular CRUD boilerplate with Express, MongoDB Mongoose, JWT auth, Redis cache, and Docker.',
    id: 'Boilerplate CRUD modular dengan Express, MongoDB Mongoose, autentikasi JWT, Redis, dan Docker.'
  },
  'react-canva-design-studio': {
    en: 'Infinite 2D graphic design workstation with dual-layer 60 FPS canvas and multi-format exports.',
    id: 'Workstation desain grafis kanvas 2D tak hingga 60 FPS dengan ekspor multi-format (PNG, SVG, PDF).'
  },
  'angular-marketplace-storefront': {
    en: 'Enterprise e-commerce storefront powered by reactive Angular Signals, RxJS streams, and seller back-office.',
    id: 'Storefront e-commerce enterprise dengan Angular Signals reaktif, alur RxJS, dan back-office penjual.'
  },
  'nextjs-spotify-music-player': {
    en: 'Cinematic music web player featuring Web Audio API canvas visualizer and synchronized lyrics.',
    id: 'Web player musik sinematik dengan visualisator kanvas Web Audio API dan sinkronisasi lirik lagu.'
  },
  'react-trello-kanban-suite': {
    en: 'Productivity Kanban workspace with multi-axis drag-and-drop, Zustand state, and glassmorphism styling.',
    id: 'Ruang kerja Kanban produktivitas dengan multi-axis drag-and-drop, state Zustand, dan antarmuka glassmorphism.'
  },
  'baye-ecommerce-marketplace': {
    en: 'Modern bidding & marketplace platform with live auction simulation, product comparisons, and QR invoices.',
    id: 'Platform marketplace & lelang modern dengan simulasi live bidding, perbandingan produk, dan faktur QR.'
  },
  'nextjs-nexus-workspace-studio': {
    en: 'Developer productivity studio combining dnd-kit Kanban boards, TanStack data tables, and 2D canvas.',
    id: 'Studio produktivitas developer memadukan Kanban dnd-kit, tabel data TanStack, dan kanvas 2D.'
  },
  'treveloka-react-native-expo': {
    en: 'Travel booking mobile application featuring AI travel itinerary assistant and Expo Router.',
    id: 'Aplikasi booking travel mobile dengan asisten rencana perjalanan berbasis AI dan Expo Router.'
  },
  'tiktok-clone-react-native-expo': {
    en: 'Short-video mobile app with autoplay video feeds, interactive gestures, and camera recording.',
    id: 'Aplikasi mobile video pendek dengan autoplay feed video, gestur interaktif, dan perekaman kamera.'
  },
  'flutter-grab-superapp-clone': {
    en: 'On-demand ride & food delivery superapp with live OpenStreetMap driver tracking and wallet.',
    id: 'Superapp on-demand ride & food delivery dengan pelacakan live driver OpenStreetMap dan dompet digital.'
  },
  'tokopedia-react-storefront': {
    en: 'High-performance e-commerce web platform backed by Go REST API and PostgreSQL.',
    id: 'Platform web e-commerce performa tinggi didukung backend REST API Go dan PostgreSQL.'
  },
  'laravel-hrms-platform': {
    en: 'Enterprise HRMS & payroll platform featuring GPS selfie attendance and automated salary calculations.',
    id: 'Platform HRMS & payroll enterprise dengan absensi selfie GPS dan kalkulasi gaji otomatis.'
  },
  'java-spring-commerce-platform': {
    en: 'Enterprise commerce and inventory platform with Vue 3 Pinia, OpenPDF invoicing, and PostgreSQL.',
    id: 'Platform e-commerce dan pergudangan enterprise dengan Vue 3 Pinia, faktur OpenPDF, dan PostgreSQL.'
  },
  'nextjs-football-sport-portal': {
    en: 'Real-time sports and live match portal with Tailwind CSS v4, live standings, and admin CMS.',
    id: 'Portal skor langsung & olahraga real-time dengan Tailwind CSS v4, klasemen liga, dan admin CMS.'
  }
};

module.exports = { repoDescriptions };
