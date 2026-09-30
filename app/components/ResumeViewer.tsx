'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X, Printer, Download, Mail, Phone, MapPin, Code, Briefcase,
  GraduationCap, LayoutGrid, Globe, Github, Layers, Server, Cpu,
  FileText, User, ExternalLink
} from 'lucide-react';
import Image from 'next/image';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ResumeRole = 'fullstack' | 'frontend' | 'backend';
export type CVLang = 'en' | 'id';

// Role configurations for Page 1, Page 2, and Page 3
const roleData = {
  // ==========================================
  // 1. BACKEND & CLOUD SYSTEMS ROLE
  // ==========================================
  backend: {
    en: {
      roleTitle: 'Backend & Cloud Systems Engineer',
      roleSubtitle: 'Distributed Microservices • High-Concurrency Go & Java Spring Boot • ACID Ledgers',
      executiveSummaryTitle: 'Executive Summary',
      executiveSummary: 'Backend & Cloud Systems Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record maintaining 100% SLA compliance for production operational tickets, authoring structured SQL queries (PostgreSQL, Oracle, MySQL) for transaction verification and data reporting, and monitoring high-availability system workflows 24/7. Deeply skilled in AI-Assisted Software Engineering, utilizing LLM & Agentic AI workflows to accelerate architectural design, unit testing, and code quality. Independently architected and deployed 19 production-grade backend microservices using Go (Golang), Java Spring Boot 3.3, Bun/Hono, and Express.js, with mastery in Clean Architecture (DDD), ACID transactional ledgers with row-level locks, Redis caching, RabbitMQ message brokers, gRPC, and Docker containerization.',
      skillsLanguages: 'Go (Golang 1.25/1.26), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, SQL, Bash',
      skillsFrameworks: 'Java Spring Boot 3.3 (Spring Security 6, JPA), Go (Gin/Fiber/Echo), Bun + Hono, Express.js, FastAPI, Clean Architecture (DDD), gRPC (Protobuf), RESTful APIs, Microservices',
      skillsDatabases: 'PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling, Row-level Locks), MySQL, MongoDB (NoSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ (Message Broker)',
      skillsAi: 'Gemini AI, Claude/OpenAI APIs, AI-Assisted System Architecture, Prompt Engineering, Agentic Coding Workflows, Automated Test Generation & Code Refactoring',
      skillsDevOps: 'Docker, Docker Compose, Linux Bash, Git & GitHub, Postman, Swagger / OpenAPI 3.0, CI/CD GitHub Actions',
      page2Title: 'Backend & Cloud Systems Repository Directory (19 Repositories)',
      page2Subtitle: 'High-Performance Microservices, Distributed Systems & Database Engines',
      page3Title: 'Backend Visual Annex: 10 Microservices & API Architectures',
      page3Subtitle: 'Interactive API Contracts, Microservices Topologies & Schema Proofs',
    },
    id: {
      roleTitle: 'Backend & Cloud Systems Engineer',
      roleSubtitle: 'Sistem Terdistribusi • Microservices Go & Java Spring Boot • Transaksi ACID',
      executiveSummaryTitle: 'Ringkasan Eksekutif',
      executiveSummary: 'Backend & Cloud Systems Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support Sistem Enterprise pada PT PLN Icon+. Memiliki keahlian teruji dalam penanganan tiket operasional produksi dengan kepatuhan SLA 100%, penulisan query SQL terstruktur (PostgreSQL, Oracle, MySQL) untuk validasi data transaksi dan pelaporan, serta pemantauan kestabilan sistem 24/7. Mahir bekerja bersama teknologi AI (AI-Assisted Engineering), memanfaatkan LLM dan agentic workflows untuk akselerasi perancangan arsitektur, pembuatan unit test, dan refactoring. Secara mandiri merancang dan membangun 19 repositori sistem backend dan microservices menggunakan Go (Golang), Java Spring Boot 3.3, Bun/Hono, dan Express.js berstandar Clean Architecture (DDD), transaksi atomik ACID, Redis cache-aside, RabbitMQ, gRPC, dan Docker.',
      skillsLanguages: 'Go (Golang 1.25/1.26), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, SQL, Bash',
      skillsFrameworks: 'Java Spring Boot 3.3 (Spring Security 6, JPA), Go (Gin/Fiber/Echo), Bun + Hono, Express.js, FastAPI, Clean Architecture (DDD), gRPC (Protobuf), RESTful APIs, Microservices',
      skillsDatabases: 'PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling, Row-level Locks), MySQL, MongoDB (NoSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ (Message Broker)',
      skillsAi: 'Gemini AI, Claude/OpenAI APIs, Arsitektur Berbasis AI & Refactoring, Prompt Engineering, Agentic Coding Workflows, Otomasi Pembuatan Unit Test',
      skillsDevOps: 'Docker, Docker Compose, Linux Bash, Git & GitHub, Postman, Swagger / OpenAPI 3.0, CI/CD GitHub Actions',
      page2Title: 'Direktori Repositori Backend & Cloud Systems (19 Repositori)',
      page2Subtitle: 'Layanan Mikro Kinerja Tinggi, Sistem Terdistribusi & Mesin Basis Data',
      page3Title: 'Lampiran Visual Backend: 10 Arsitektur API & Microservices',
      page3Subtitle: 'Dokumentasi Kontrak API Interaktif, Topologi Microservices & Pembuktian Skema',
    },
    metrics: [
      { num: '19 Repos', labelEn: 'Backend Repositories', labelId: 'Repositori Backend' },
      { num: '8 Services', labelEn: 'Go (Golang) Microservices', labelId: 'Layanan Mikro Go' },
      { num: '4 Services', labelEn: 'Java Spring Boot', labelId: 'Java Spring Boot' },
      { num: '7 Services', labelEn: 'Node.js / Bun / Python', labelId: 'Node.js / Bun / Python' },
    ],
    visualCards: [
      {
        title: '1. GoFinance Banking Core API',
        cat: 'Backend',
        tech: 'Go • Echo • PostgreSQL • Redis • RabbitMQ • Docker',
        descEn: 'High-concurrency banking engine with ACID transactional account transfers, Redis cache-aside ledger, and RabbitMQ message broker.',
        descId: 'Engine core banking dengan transaksi transfer akun atomik berstandar ACID, Redis cache-aside, dan message broker RabbitMQ.',
        img: '/projects/gofinance.png',
        link: 'https://github.com/mazkev/go-banking-core-system',
        label: 'github.com/mazkev/go-banking-core-system'
      },
      {
        title: '2. Swagger Go API Gateway Engine',
        cat: 'Backend',
        tech: 'Go 1.26 • Gin • GORM • PostgreSQL • Swagger OpenAPI 3.0',
        descEn: 'Production API gateway with interactive Swagger OpenAPI contract documentation, connection pooling, and JWT authorization.',
        descId: 'API gateway produksi dengan dokumentasi kontrak OpenAPI Swagger interaktif, connection pooling, dan otorisasi JWT.',
        img: '/projects/swagger-go.png',
        link: 'https://github.com/mazkev/go-ecommerce-gateway-engine',
        label: 'github.com/mazkev/go-ecommerce-gateway-engine'
      },
      {
        title: '3. Nexus Enterprise Microservices',
        cat: 'Backend',
        tech: 'Java Spring Boot 3.3 • Resilience4j • Eureka • PostgreSQL',
        descEn: 'Enterprise backend architecture with Eureka service discovery, circuit-breaker failover protection, and JPA auditing.',
        descId: 'Arsitektur backend enterprise dengan service discovery Eureka, proteksi circuit breaker Resilience4j, dan auditing JPA.',
        img: '/projects/nexus.png',
        link: 'https://github.com/mazkev/nexus-workspace-engine',
        label: 'github.com/mazkev/nexus-workspace-engine'
      },
      {
        title: '4. Go Clean Architecture Engine',
        cat: 'Backend',
        tech: 'Go • Gin • Clean Architecture • Docker • Unit Tests',
        descEn: 'Modular domain-driven design decoupling business logic, usecases, and repository data stores for maximum testability.',
        descId: 'Desain domain-driven modular yang memisahkan logika bisnis, usecase, dan repositori data untuk testability maksimal.',
        img: '/projects/goclean.png',
        link: 'https://github.com/mazkev/go-clean-arch',
        label: 'github.com/mazkev/go-clean-arch'
      },
      {
        title: '5. Core Banking Swagger UI & Ledger',
        cat: 'Backend',
        tech: 'Go • Echo • Swagger UI • Bcrypt PIN • Audit Logs',
        descEn: 'Interactive API testing suite verifying balance inquiries, atomic debit/credit transactions, and audit ledger entries.',
        descId: 'Suite pengujian API interaktif untuk verifikasi cek saldo, transaksi debit/kredit atomik, dan mutasi buku besar.',
        img: '/projects/swagger-banking.png',
        link: 'https://github.com/mazkev/go-banking-core-system',
        label: 'github.com/mazkev/go-banking-core-system'
      },
      {
        title: '6. Distributed Microservices Concurrency Lab',
        cat: 'Backend',
        tech: 'Go • gRPC • Protocol Buffers • RabbitMQ • Redis',
        descEn: 'Binary inter-service communication pipeline with worker pool concurrency and decoupled background message queues.',
        descId: 'Pipa komunikasi biner antar-service berkecepatan tinggi dengan worker pool concurrency dan antrean pesan background.',
        img: '/projects/gofinance.png',
        link: 'https://github.com/mazkev/go-distributed-microservices-lab',
        label: 'github.com/mazkev/go-distributed-microservices-lab'
      },
      {
        title: '7. Bun Hono Ultra-Fast REST API Engine',
        cat: 'Backend',
        tech: 'Bun • Hono v4 • Drizzle ORM • TypeScript • WebSocket',
        descEn: 'Sub-millisecond REST API engine running on Bun runtime with Drizzle ORM, live WebSocket chat, and coupon discount logic.',
        descId: 'Engine REST API sub-milidetik berbasis Bun runtime dengan Drizzle ORM, live chat WebSocket, dan kupon diskon.',
        img: '/projects/mazmarket.png',
        link: 'https://github.com/mazkev/hono-ecommerce-engine',
        label: 'github.com/mazkev/hono-ecommerce-engine'
      },
      {
        title: '8. AI API Manager & Rate-Limiter Gateway',
        cat: 'Backend',
        tech: 'Node.js • Express • Redis • Token Quotas • React Console',
        descEn: 'Reverse proxy API gateway with API key authentication, distributed rate limiting, token quota tracking, and latency analytics.',
        descId: 'API gateway reverse proxy dengan otentikasi API key, rate limiting terdistribusi, pelacakan kuota token, dan analitik latensi.',
        img: '/projects/mazcloud.png',
        link: 'https://github.com/mazkev/AI-api-manager',
        label: 'github.com/mazkev/AI-api-manager'
      },
      {
        title: '9. Midtrans Payment Gateway & Invoicing API',
        cat: 'Backend',
        tech: 'Node.js • Express v5 • Prisma ORM • Midtrans • PDFKit',
        descEn: 'Payment processing backend with Midtrans webhook verification, automated digital PDF invoice rendering, and email notifications.',
        descId: 'Backend pembayaran dengan webhook Midtrans, pembuatan invoice PDF otomatis dengan PDFKit, dan notifikasi email.',
        img: '/projects/semarketplace.jpg',
        link: 'https://github.com/mazkev/express-prisma-payment-api',
        label: 'github.com/mazkev/express-prisma-payment-api'
      },
      {
        title: '10. Spring Boot Enterprise Platform',
        cat: 'Backend',
        tech: 'Java 17 • Spring Boot 3.3 • JWT • Bucket4j • MongoDB',
        descEn: 'Enterprise platform with Spring Security JWT, AOP audit logging, async event-driven mailers, Bucket4j rate limiting, and Docker.',
        descId: 'Platform enterprise dengan Spring Security JWT, audit logging AOP, emailer asinkron event-driven, dan rate limiting Bucket4j.',
        img: '/projects/marketinvent.png',
        link: 'https://github.com/mazkev/spring-boot-enterprise-platform',
        label: 'github.com/mazkev/spring-boot-enterprise-platform'
      }
    ]
  },

  // ==========================================
  // 2. FRONTEND & MOBILE ROLE
  // ==========================================
  frontend: {
    en: {
      roleTitle: 'Frontend & Mobile Engineer',
      roleSubtitle: 'Next.js 16 • React 19 • React Native (Expo) • Angular 19 • 60 FPS Canvas',
      executiveSummaryTitle: 'Executive Summary',
      executiveSummary: 'Frontend & Mobile Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record maintaining 100% SLA compliance for production operational tickets, user workflow issue resolution, and system stability. Deeply proficient in AI-Assisted Engineering, pairing with LLM tools to accelerate component prototyping, state architecture, and accessibility testing. Creator of 48+ production-grade frontend web and mobile applications specializing in modern component architecture (Next.js 16 App Router, React 19, Angular 19 Signals, Vue 3 Pinia), reactive client state management (Zustand, Redux Toolkit, RxJS), dual-layer 60 FPS canvas graphics (React-Konva), and cross-platform mobile apps (React Native Expo SDK 56, Flutter). Strong foundation in responsive performance optimization, WebSockets, and Vercel edge deployment.',
      skillsLanguages: 'TypeScript, JavaScript (ES6+), Dart, HTML5, CSS3, Tailwind CSS v4',
      skillsFrameworks: 'Next.js 16 (App Router, Server Components), React 19, Angular 19 (Signals, RxJS), Vue 3 (Composition API, Pinia), Vite',
      skillsDatabases: 'Zustand, Redux Toolkit, React-Konva (60 FPS Infinite Canvas), Web Audio API, Recharts, TanStack Query/Table',
      skillsAi: 'Gemini AI, Claude/OpenAI APIs, AI Component Prototyping, Prompt Engineering, Agentic Tooling, Automated Frontend Testing',
      skillsDevOps: 'React Native (Expo SDK 56, Expo Router), Flutter (Riverpod 3), Git & GitHub, Postman, Webpack 5, Vercel Edge Runtime',
      page2Title: 'Frontend Web & Mobile Engineering Directory (48+ Repositories)',
      page2Subtitle: 'Modern Web Clients, Mobile Apps & 12 Verified Cloud Deployments',
      page3Title: 'Frontend & Mobile Visual Annex: 10 Production Interfaces & Demos',
      page3Subtitle: 'Vector Canvas Workstations, Dynamic Media Clients & Mobile App Views',
    },
    id: {
      roleTitle: 'Frontend & Mobile Engineer',
      roleSubtitle: 'Next.js 16 • React 19 • React Native (Expo) • Angular 19 • Kanvas 60 FPS',
      executiveSummaryTitle: 'Ringkasan Eksekutif',
      executiveSummary: 'Frontend & Mobile Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support Sistem Enterprise pada PT PLN Icon+. Memiliki keahlian teruji dalam penanganan tiket operasional produksi dengan kepatuhan SLA 100%, penyelesaian kendala antarmuka pengguna, dan kestabilan sistem. Mahir bekerja bersama teknologi AI (AI-Assisted Engineering) untuk mempercepat pembuatan prototipe komponen, state architecture, dan pengujian UI. Membangun 48+ aplikasi frontend web dan mobile dengan spesialisasi arsitektur komponen modern (Next.js 16 App Router, React 19, Angular 19 Signals, Vue 3 Pinia), state management reaktif (Zustand, Redux Toolkit, RxJS), kanvas grafis dual-layer 60 FPS (React-Konva), dan mobile cross-platform (React Native Expo SDK 56, Flutter). Menguasai optimasi performa responsif, WebSockets, dan deployment Vercel.',
      skillsLanguages: 'TypeScript, JavaScript (ES6+), Dart, HTML5, CSS3, Tailwind CSS v4',
      skillsFrameworks: 'Next.js 16 (App Router, Server Components), React 19, Angular 19 (Signals, RxJS), Vue 3 (Composition API, Pinia), Vite',
      skillsDatabases: 'Zustand, Redux Toolkit, React-Konva (60 FPS Infinite Canvas), Web Audio API, Recharts, TanStack Query/Table',
      skillsAi: 'Gemini AI, Claude/OpenAI APIs, Pembuatan Prototipe Komponen UI Berbasis AI, Prompt Engineering, Otomasi Pengujian Antarmuka',
      skillsDevOps: 'React Native (Expo SDK 56, Expo Router), Flutter (Riverpod 3), Git & GitHub, Postman, Webpack 5, Vercel Edge Runtime',
      page2Title: 'Direktori Repositori Frontend Web & Mobile (48+ Repositori)',
      page2Subtitle: 'Klien Web Modern, Aplikasi Mobile & 12 Aplikasi Cloud Terverifikasi',
      page3Title: 'Lampiran Visual Frontend & Mobile: 10 Antarmuka Produksi & Live Demo',
      page3Subtitle: 'Workstation Kanvas Vektor, Klien Media Dinamis & Tampilan Aplikasi Mobile',
    },
    metrics: [
      { num: '41 Repos', labelEn: 'Frontend Web Apps', labelId: 'Aplikasi Web Frontend' },
      { num: '7 Repos', labelEn: 'Mobile Cross-Platform', labelId: 'Mobile Cross-Platform' },
      { num: '12 Live Apps', labelEn: 'Active Vercel URLs', labelId: 'Aplikasi Aktif Vercel' },
      { num: '100%', labelEn: 'TypeScript / Typed', labelId: 'TypeScript / Typed' },
    ],
    visualCards: [
      {
        title: '1. Canvass Visual Graphic Studio',
        cat: 'Frontend',
        tech: 'React 19 • React-Konva • Zustand • Tailwind CSS v4',
        descEn: 'Browser vector graphic publishing workspace with dual-layer 60 FPS canvas, multi-element transform matrices, and high-resolution export.',
        descId: 'Workstation desain vektor grafis berbasis web dengan dual-layer kanvas 60 FPS, manipulasi transform matriks elemen, dan ekspor multi-format.',
        img: '/projects/canvass.png',
        link: 'https://canva-clone-fawn.vercel.app',
        label: 'canva-clone-fawn.vercel.app'
      },
      {
        title: '2. Spotify Web Player & Visualizer',
        cat: 'Frontend',
        tech: 'Next.js 16 • Web Audio API • Frequency Visualizer • Tailwind',
        descEn: 'High-fidelity audio streaming client with real-time Web Audio API frequency analysis canvas visualizer and synchronized lyrics.',
        descId: 'Klien streaming audio dengan visualisasi frekuensi real-time Web Audio API pada kanvas, ekstraksi warna cover album, dan sinkronisasi lirik.',
        img: '/projects/spotify.png',
        link: 'https://spotify-clonez.vercel.app',
        label: 'spotify-clonez.vercel.app'
      },
      {
        title: '3. MarketX Angular 19 Storefront',
        cat: 'Frontend',
        tech: 'Angular 19 • Angular Signals • RxJS • Responsive Dash',
        descEn: 'Enterprise storefront powered by Angular 19 reactive Signals and RxJS event streams with live order tracking and merchant back-office.',
        descId: 'Storefront enterprise menggunakan reaktivitas Angular Signals dan RxJS event streams dengan pelacak status pesanan live dan back-office.',
        img: '/projects/marketx.png',
        link: 'https://market-x-angular.vercel.app',
        label: 'market-x-angular.vercel.app'
      },
      {
        title: '4. Trello Glassmorphism Kanban Workspace',
        cat: 'Frontend',
        tech: 'React 19 • Zustand • @hello-pangea/dnd • Tailwind v4',
        descEn: 'Glassmorphism Kanban project board with multi-axis drag-and-drop task sorting and card detail modal editing.',
        descId: 'Board manajemen proyek Kanban glassmorphism dengan drag-and-drop task sorting multi-axis dan pengeditan detail kartu modal.',
        img: '/projects/trello.png',
        link: 'https://trello-azure-five.vercel.app',
        label: 'trello-azure-five.vercel.app'
      },
      {
        title: '5. HubSpot Enterprise CRM Platform',
        cat: 'Frontend',
        tech: 'React 19 • Recharts • Tailwind CSS v4 • REST API',
        descEn: 'B2B sales and customer relationship management workspace featuring interactive deal pipelines, contacts table, and analytics.',
        descId: 'Workspace CRM penjualan enterprise dengan pipeline transaksi interaktif, tabel manajemen kontak, dan grafik analitik.',
        img: '/projects/hubspot.png',
        link: 'https://hub-spot-clone-five.vercel.app',
        label: 'hub-spot-clone-five.vercel.app'
      },
      {
        title: '6. Traveloka Mobile App Clone',
        cat: 'Mobile',
        tech: 'React Native 0.85 • Expo SDK 56 • Gemini AI Assistant',
        descEn: 'Mobile travel booking superapp featuring flight & hotel search grids, Gemini AI itinerary assistant, and QR e-ticket generation.',
        descId: 'Aplikasi mobile pemesanan perjalanan dengan grid pencarian penerbangan & hotel, asisten rencana perjalanan Gemini AI, dan tiket QR.',
        img: '/projects/nexus.png',
        link: 'https://github.com/mazkev/treveloka-react-native-expo',
        label: 'github.com/mazkev/treveloka-react-native-expo'
      },
      {
        title: '7. Indofooty Live Match Center',
        cat: 'Frontend',
        tech: 'Next.js 16 • Tailwind CSS v4 • Real-Time Sports Portal',
        descEn: 'Sports media portal featuring real-time match fixtures, league tables, article reader, and responsive admin editorial console.',
        descId: 'Portal media olahraga dengan jadwal pertandingan real-time, klasemen liga, pembaca berita, dan konsol admin responsif.',
        img: '/projects/indofooty.jpg',
        link: 'https://indofooty.vercel.app',
        label: 'indofooty.vercel.app'
      },
      {
        title: '8. Tokopedia React Storefront',
        cat: 'Frontend',
        tech: 'React 19 • Vitest • Custom Hooks • Optimistic Cart',
        descEn: 'High-performance marketplace storefront featuring optimistic shopping cart synchronization, category filter chips, and Vitest suite.',
        descId: 'Storefront e-commerce dengan sinkronisasi keranjang belanja optimistik, filter kategori, dan pengujian unit Vitest.',
        img: '/projects/tokopedia.png',
        link: 'https://tokopedia-react.vercel.app',
        label: 'tokopedia-react.vercel.app'
      },
      {
        title: '9. Konva Whiteboard Infinite Canvas',
        cat: 'Frontend',
        tech: 'React 19 • React-Konva • 60 FPS Dual-Layer • SVG Export',
        descEn: 'Infinite whiteboard canvas with dual-layer 60 FPS rendering, smooth vector pen drawing, shape snapping, and multi-format export.',
        descId: 'Kanvas whiteboard tak terbatas dengan rendering dual-layer 60 FPS, pena gambar vektor halus, dan ekspor multi-format.',
        img: '/projects/miro.png',
        link: 'https://github.com/mazkev/react-konva-whiteboard-canvas',
        label: 'github.com/mazkev/react-konva-whiteboard-canvas'
      },
      {
        title: '10. Netflix Cinema Streaming Client',
        cat: 'Frontend',
        tech: 'React 18 • Redux Toolkit • Webpack 5 • TMDB REST API',
        descEn: 'Cinematic video browsing platform with custom Webpack 5 architecture, TMDB catalog integration, and Storybook design system.',
        descId: 'Platform penjelajahan film bioskop dengan arsitektur Webpack 5 kustom, katalog TMDB API, dan sistem desain Storybook.',
        img: '/projects/netflix.jpg',
        link: 'https://github.com/mazkev/react-netflix-streaming-platform',
        label: 'github.com/mazkev/react-netflix-streaming-platform'
      }
    ]
  },

  // ==========================================
  // 3. FULLSTACK ROLE (DEFAULT)
  // ==========================================
  fullstack: {
    en: {
      roleTitle: 'Fullstack Software Engineer',
      roleSubtitle: 'Backend Systems • Fullstack Platforms • Cloud Architecture',
      executiveSummaryTitle: 'Executive Summary',
      executiveSummary: 'Fullstack Software Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record maintaining 100% SLA compliance for production operational tickets, authoring structured SQL queries (PostgreSQL, Oracle, MySQL) for transaction verification and data reporting, and monitoring high-availability system workflows 24/7. Deeply skilled in AI-Assisted Software Engineering, utilizing LLM and Agentic AI workflows to accelerate full-cycle development from system design to automated testing. Independently architected and deployed 82 verified software repositories spanning distributed Go & Java Spring Boot microservices, modern Next.js 16 & React 19 web platforms, and mobile apps, with strong mastery in Clean Architecture (DDD), ACID transactional ledgers, Redis caching, RabbitMQ message brokers, and Docker containerization.',
      skillsLanguages: 'Go (Golang), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, PHP 8, Dart, SQL, HTML5/CSS3',
      skillsFrameworks: 'Java Spring Boot 3.3, Go (Gin/Fiber/Echo), Bun + Hono, Express.js, FastAPI, Laravel 12, Clean Architecture (DDD), RESTful APIs, gRPC (Protobuf), Microservices, WebSocket',
      skillsDatabases: 'PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling), MySQL, MongoDB, SQLite (LibSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ',
      skillsAi: 'Gemini AI, Claude/OpenAI APIs, AI-Assisted System Architecture, Prompt Engineering, Agentic Coding Workflows, Automated Test Generation & Code Refactoring',
      skillsDevOps: 'Next.js 16 (App Router), React 19, Angular 19, React Native Expo SDK 56, Docker, Git & GitHub, Postman, Vercel Edge Runtime',
      page2Title: 'Technical Project & Repository Directory (82 Repositories)',
      page2Subtitle: '82 Curated Open-Source Repositories Grouped by Engineering Pillars',
      page3Title: 'Visual Project Annex: 10 Flagship Systems & Live Workstations',
      page3Subtitle: 'High-Fidelity Visual Proof: Real Production Screenshots, Workstation Canvas & Live Demos',
    },
    id: {
      roleTitle: 'Fullstack Software Engineer',
      roleSubtitle: 'Sistem Backend • Platform Fullstack • Arsitektur Cloud',
      executiveSummaryTitle: 'Ringkasan Eksekutif',
      executiveSummary: 'Fullstack Software Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support Sistem Enterprise pada PT PLN Icon+. Memiliki keahlian teruji dalam penanganan tiket operasional produksi dengan kepatuhan SLA 100%, penulisan query SQL terstruktur (PostgreSQL, Oracle, MySQL) untuk validasi data transaksi dan pelaporan, serta pemantauan kestabilan sistem 24/7. Mahir bekerja bersama teknologi AI (AI-Assisted Engineering) untuk melipatgandakan kecepatan deliveri sistem dan kualitas kode secara menyeluruh. Secara mandiri merancang dan membangun 82 repositori perangkat lunak terverifikasi mencakup microservices Go & Java Spring Boot, platform web modern Next.js 16 & React 19, serta aplikasi mobile berstandar Clean Architecture (DDD), transaksi atomik ACID, caching Redis, RabbitMQ, dan kontainerisasi Docker.',
      skillsLanguages: 'Go (Golang), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, PHP 8, Dart, SQL, HTML5/CSS3',
      skillsFrameworks: 'Java Spring Boot 3.3, Go (Gin/Fiber/Echo), Bun + Hono, Express.js, FastAPI, Laravel 12, Clean Architecture (DDD), RESTful APIs, gRPC (Protobuf), Microservices, WebSocket',
      skillsDatabases: 'PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling), MySQL, MongoDB, SQLite (LibSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ',
      skillsAi: 'Gemini AI, Claude/OpenAI APIs, Arsitektur Berbasis AI & Refactoring, Prompt Engineering, Agentic Coding Workflows, Otomasi Pembuatan Unit Test',
      skillsDevOps: 'Next.js 16 (App Router), React 19, Angular 19, React Native Expo SDK 56, Docker, Git & GitHub, Postman, Vercel Edge Runtime',
      page2Title: 'Direktori & Katalog Repositori Rekayasa Perangkat Lunak (82 Repositori)',
      page2Subtitle: '82 Repositori Terverifikasi Dikelompokkan ke Dalam 3 Pilar Teknis',
      page3Title: 'Lampiran Visual Portofolio: 10 Sistem Unggulan & Workstation Aktif',
      page3Subtitle: 'Bukti Visual Nyata: Tangkapan Layar Produksi Asli, Kanvas Interaktif & Live Demo',
    },
    metrics: [
      { num: '19 Repos', labelEn: 'Backend & Cloud', labelId: 'Backend & Cloud' },
      { num: '22 Repos', labelEn: 'Fullstack & Mobile', labelId: 'Fullstack & Mobile' },
      { num: '41 Repos', labelEn: 'Frontend Web Apps', labelId: 'Aplikasi Frontend Web' },
      { num: '12 Live Apps', labelEn: 'Active Vercel URLs', labelId: 'Aplikasi Aktif Vercel' },
    ],
    visualCards: [
      {
        title: '1. GoFinance Banking Core API',
        cat: 'Backend',
        tech: 'Go • Echo • PostgreSQL • Redis • RabbitMQ • Docker',
        descEn: 'High-concurrency banking engine with ACID transactional account transfers, Redis cache-aside ledger, RabbitMQ message brokers, and Bcrypt security.',
        descId: 'Engine core banking dengan transaksi transfer akun atomik berstandar ACID, Redis cache-aside, message broker RabbitMQ, dan pengamanan Bcrypt.',
        img: '/projects/gofinance.png',
        link: 'https://github.com/mazkev/go-banking-core-system',
        label: 'github.com/mazkev/go-banking-core-system'
      },
      {
        title: '2. Nexus Enterprise Microservices',
        cat: 'Fullstack',
        tech: 'Next.js 16 • Java Spring Boot • Resilience4j • PostgreSQL',
        descEn: 'Distributed enterprise platform featuring Spring Cloud service discovery, circuit-breaker failover protection, and reactive Next.js workspace client.',
        descId: 'Platform enterprise terdistribusi dengan service discovery Spring Cloud, proteksi circuit breaker Resilience4j, dan klien workspace Next.js 16.',
        img: '/projects/nexus.png',
        link: 'https://nexus-project-mu.vercel.app',
        label: 'nexus-project-mu.vercel.app'
      },
      {
        title: '3. Tokopedia Fullstack Commerce',
        cat: 'Fullstack',
        tech: 'Go REST API • React 19 • PostgreSQL • Tailwind CSS v4',
        descEn: 'Commercial e-commerce platform pairing a Go REST API with React 19. Features optimistic cart updates, category filtering chips, and checkout transactions.',
        descId: 'Platform e-commerce mengintegrasikan Go REST API dengan React 19. Dilengkapi sinkronisasi keranjang optimistik dan checkout transaksi PostgreSQL.',
        img: '/projects/tokopedia.png',
        link: 'https://tokopedia-react.vercel.app',
        label: 'tokopedia-react.vercel.app'
      },
      {
        title: '4. Canvass Visual Graphic Studio',
        cat: 'Frontend',
        tech: 'React 19 • React-Konva • Zustand • Tailwind CSS v4',
        descEn: 'Browser-based vector graphic publishing workspace with dual-layer 60 FPS canvas, multi-element transform matrices, and high-resolution PNG export.',
        descId: 'Workstation desain vektor grafis berbasis web dengan dual-layer kanvas 60 FPS, manipulasi transform matriks elemen, dan ekspor multi-format.',
        img: '/projects/canvass.png',
        link: 'https://canva-clone-fawn.vercel.app',
        label: 'canva-clone-fawn.vercel.app'
      },
      {
        title: '5. MarketX Angular E-Commerce',
        cat: 'Frontend',
        tech: 'Angular 19 • Angular Signals • RxJS • Responsive Dash',
        descEn: 'Enterprise storefront powered by Angular 19 reactive Signals and RxJS event streams. Features live order tracking and merchant back-office management.',
        descId: 'Storefront enterprise menggunakan reaktivitas Angular Signals dan RxJS event streams. Dilengkapi pelacak status pesanan live dan back-office penjual.',
        img: '/projects/marketx.png',
        link: 'https://market-x-angular.vercel.app',
        label: 'market-x-angular.vercel.app'
      },
      {
        title: '6. Spotify Web Player & Visualizer',
        cat: 'Frontend',
        tech: 'Next.js 16 • Web Audio API • Frequency Visualizer • Tailwind',
        descEn: 'High-fidelity audio streaming client with real-time Web Audio API frequency analysis canvas visualizer, dynamic album color palette extraction, and lyrics.',
        descId: 'Klien streaming audio dengan visualisasi frekuensi real-time Web Audio API pada kanvas, ekstraksi warna cover album dinamis, dan sinkronisasi lirik.',
        img: '/projects/spotify.png',
        link: 'https://spotify-clonez.vercel.app',
        label: 'spotify-clonez.vercel.app'
      },
      {
        title: '7. Trello Glassmorphism Kanban Workspace',
        cat: 'Frontend',
        tech: 'React 19 • Zustand • @hello-pangea/dnd • Tailwind v4',
        descEn: 'Glassmorphism Kanban project board with multi-axis drag-and-drop task sorting, card detail modal editing, and workflow automation.',
        descId: 'Board manajemen proyek Kanban glassmorphism dengan drag-and-drop multi-axis, pengeditan modal kartu tugas, dan otomasi alur kerja.',
        img: '/projects/trello.png',
        link: 'https://trello-azure-five.vercel.app',
        label: 'trello-azure-five.vercel.app'
      },
      {
        title: '8. HubSpot Enterprise CRM Platform',
        cat: 'Frontend',
        tech: 'React 19 • TanStack Table • Recharts • REST API',
        descEn: 'Enterprise CRM sales platform featuring interactive deal pipelines, contact data grid, and automated performance tracking.',
        descId: 'Platform CRM penjualan enterprise dengan pipeline transaksi interaktif, tabel data kontak, dan pelacakan performa otomatis.',
        img: '/projects/hubspot.png',
        link: 'https://hub-spot-clone-five.vercel.app',
        label: 'hub-spot-clone-five.vercel.app'
      },
      {
        title: '9. Indofooty Real-Time Match Center',
        cat: 'Fullstack',
        tech: 'Next.js 16 • Tailwind CSS v4 • Real-Time Sports API',
        descEn: 'Live sports score and news portal with Next.js 16, real-time match fixture feeds, league standings, and editorial CMS console.',
        descId: 'Portal berita dan skor sepak bola langsung dengan Next.js 16, jadwal pertandingan real-time, klasemen liga, dan konsol admin CMS.',
        img: '/projects/indofooty.jpg',
        link: 'https://indofooty.vercel.app',
        label: 'indofooty.vercel.app'
      },
      {
        title: '10. Swagger Go API Gateway Engine',
        cat: 'Backend',
        tech: 'Go 1.26 • Gin • GORM • PostgreSQL • Swagger OpenAPI 3.0',
        descEn: 'Production API gateway with interactive Swagger OpenAPI contract documentation, reverse proxy routing, and JWT authorization.',
        descId: 'API gateway produksi dengan dokumentasi kontrak OpenAPI Swagger interaktif, routing reverse proxy, dan otorisasi JWT.',
        img: '/projects/swagger-go.png',
        link: 'https://github.com/mazkev/go-ecommerce-gateway-engine',
        label: 'github.com/mazkev/go-ecommerce-gateway-engine'
      }
    ]
  }
};

const commonText = {
  en: {
    downloadBtn: 'Download PDF',
    printBtn: 'Print / PDF',
    experienceTitle: 'Professional Experience',
    skillsTitle: 'Technical Competencies & Core Stack',
    educationTitle: 'Education',
    job1Title: 'Application Support Engineer',
    job1Company: 'PT PLN Icon+',
    job1Date: '2023 - Present',
    job1Bullet1: 'Investigated and resolved technical operational tickets with a 100% SLA compliance rate, ensuring timely resolution of customer transaction issues.',
    job1Bullet2: 'Authored and executed complex SQL queries across PostgreSQL, Oracle, and MySQL for operational data validation, transaction auditing, and business reporting.',
    job1Bullet3: 'Monitored nationwide enterprise system workflows 24/7, analyzed application error logs (HTTP 5xx/4xx), and coordinated directly with core developers for bug/API fixes.',
    job2Company: 'Independent Engineering & Open Source Projects',
    job2Date: '2023 - Present',
    degree: 'Bachelor of Computer Science / Information Technology (S.Kom)',
    university: 'Universitas AMIKOM • GPA: 3.42 / 4.00',
    eduDate: '2017 - 2023',
    eduNote: '(Thesis Defense: Dec 2022 | Official Degree / Graduation: 2023)',
  },
  id: {
    downloadBtn: 'Unduh PDF',
    printBtn: 'Cetak / PDF',
    experienceTitle: 'Pengalaman Profesional',
    skillsTitle: 'Kompetensi Teknis & Core Stack',
    educationTitle: 'Pendidikan',
    job1Title: 'Application Support Engineer',
    job1Company: 'PT PLN Icon+',
    job1Date: '2023 - Sekarang',
    job1Bullet1: 'Menginvestigasi dan menyelesaikan tiket insiden teknis serta permintaan operasional produksi dengan tingkat kepatuhan SLA mencapai 100% tepat waktu.',
    job1Bullet2: 'Merancang dan mengeksekusi query SQL terstruktur pada database PostgreSQL, Oracle, dan MySQL untuk validasi data transaksi, pelaporan operasional, dan pengecekan konsistensi data.',
    job1Bullet3: 'Memantau operasional alur sistem digital enterprise 24/7, menganalisis log error sistem (HTTP 5xx/4xx), dan berkoordinasi langsung dengan tim pengembang inti untuk verifikasi perbaikan API.',
    job2Company: 'Pengembangan Mandiri & Proyek Open Source',
    job2Date: '2023 - Sekarang',
    degree: 'Sarjana Ilmu Komputer / Teknik Informatika (S.Kom)',
    university: 'Universitas AMIKOM • IPK: 3.42 / 4.00',
    eduDate: '2017 - 2023',
    eduNote: '(Selesai Ujian Sidang: Des 2022 | Ijazah / Wisuda Resmi: 2023)',
  }
};

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [lang, setLang] = useState<CVLang>('id');
  const [activeRole, setActiveRole] = useState<ResumeRole>('fullstack');

  const handlePrint = () => window.print();

  if (!isOpen) return null;

  const currentRole = roleData[activeRole][lang];
  const t = commonText[lang];

  // Dynamic PDF download path matching role and language
  const pdfDownloadPath = activeRole === 'fullstack'
    ? (lang === 'id' ? '/resume-id.pdf' : '/resume.pdf')
    : (lang === 'id' ? `/resume-${activeRole}-id.pdf` : `/resume-${activeRole}.pdf`);

  const job2Title = lang === 'en'
    ? (activeRole === 'backend' ? 'AI-Assisted Backend Systems & Architecture' : activeRole === 'frontend' ? 'AI-Assisted Frontend & Mobile Engineering' : 'AI-Assisted Software Engineer & Open Source Contributor')
    : (activeRole === 'backend' ? 'Rekayasa Sistem Backend & Arsitektur Berbasis AI' : activeRole === 'frontend' ? 'Rekayasa Frontend & Mobile Berbasis AI' : 'AI-Assisted Software Engineer & Kontributor Open Source');

  const job2Bullets = lang === 'en' ? [
    'Pioneered AI-assisted software engineering workflows (Gemini 2.5, Claude 3.7, OpenAI, agentic coding tools) for rapid architectural scaffolding, schema design, and automated test suite generation.',
    activeRole === 'backend'
      ? 'Architected, built, and audited 19 production-grade backend microservices and cloud systems with Clean Architecture, ACID transactional schemas, and Docker containerization.'
      : activeRole === 'frontend'
      ? 'Architected, built, and audited 48+ frontend web and mobile applications with responsive state management, dual-layer 60 FPS canvas graphics, and mobile navigation.'
      : 'Architected, built, and audited 82 production-grade repositories across Backend Microservices, Fullstack Web Platforms, and Mobile Applications.',
    activeRole === 'backend'
      ? 'Audited AI-generated architectures for strict security, PostgreSQL row-level locks, Redis cache-aside patterns, and RabbitMQ decoupled message brokers.'
      : activeRole === 'frontend'
      ? 'Shipped and maintained 12 live cloud applications on Vercel with responsive mobile-first UI, fast hydration, and accessible design systems.'
      : 'Shipped and maintained 12 live cloud applications on Vercel with serverless databases, ACID transactions, and responsive modern UI architecture.'
  ] : [
    'Menerapkan alur kerja rekayasa perangkat lunak modern berbasis AI (Gemini 2.5, Claude 3.7, OpenAI, agentic coding tools) untuk akselerasi perancangan arsitektur, pemodelan skema, dan generasi automated test suite.',
    activeRole === 'backend'
      ? 'Merancang, membangun, dan mengaudit 19 repositori sistem backend microservices dan cloud berprinsip Clean Architecture, skema transaksi ACID, dan kontainerisasi Docker.'
      : activeRole === 'frontend'
      ? 'Merancang, membangun, dan mengaudit 48+ aplikasi frontend web dan mobile dengan state management reaktif, kanvas grafis dual-layer 60 FPS, dan navigasi mobile.'
      : 'Merancang, membangun, dan mengaudit 82 repositori perangkat lunak mencakup Backend Microservices, Platform Web Fullstack, dan Aplikasi Mobile.',
    activeRole === 'backend'
      ? 'Melakukan audit mendalam kode arsitektur: menjamin keamanan celah injeksi, isolasi transaksi row-level lock PostgreSQL, pola Redis cache-aside, dan message broker RabbitMQ.'
      : activeRole === 'frontend'
      ? 'Men-deploy dan mengelola 12 aplikasi web aktif di cloud Vercel dengan tampilan antarmuka responsif mobile-first, waktu muat instan, dan standar aksesibilitas.'
      : 'Men-deploy dan mengelola 12 aplikasi produksi aktif di cloud Vercel dengan integrasi database serverless, transaksi ACID, dan antarmuka reaktif modern.'
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end print:absolute print:inset-auto print:w-full print:h-auto print:block">
      <style jsx global>{`
        @page { size: A4; margin: 8mm 10mm; }
        @media print {
          .no-print { display: none !important; }
          html, body {
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-page {
            box-sizing: border-box !important;
            width: 100% !important;
            min-height: 279mm !important;
            height: 279mm !important;
            max-height: 279mm !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            page-break-after: always !important;
            break-after: page !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-page:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .page-break {
            display: none !important;
          }
          #print-area * {
            color: black !important;
            border-color: #cbd5e1 !important;
          }
          #print-area a {
            color: #0284c7 !important;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm no-print"
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-5xl h-full print:h-auto bg-white text-slate-900 border-l border-slate-300 shadow-2xl flex flex-col z-10 font-sans"
      >
        {/* CONTROL HEADER (NO-PRINT) */}
        <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 flex items-center justify-between no-print flex-shrink-0 flex-wrap gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* ROLE SELECTOR TABS */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setActiveRole('fullstack')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeRole === 'fullstack'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Tampilkan CV Khusus Fullstack (3 Halaman)"
              >
                <Layers size={13} /> Fullstack
              </button>
              <button
                onClick={() => setActiveRole('backend')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeRole === 'backend'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Tampilkan CV Khusus Backend (3 Halaman)"
              >
                <Server size={13} /> Back End
              </button>
              <button
                onClick={() => setActiveRole('frontend')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeRole === 'frontend'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Tampilkan CV Khusus Frontend & Mobile (3 Halaman)"
              >
                <Cpu size={13} /> Front End & Mobile
              </button>
            </div>

            {/* LANGUAGE TOGGLE */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setLang('id')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'id'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Versi Bahasa Indonesia (Tepat 3 Halaman ATS)"
              >
                🇮🇩 ID (3 Hlm)
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="English Version (Strict 3-Page ATS)"
              >
                🇬🇧 EN (3 Pages)
              </button>
            </div>

            {/* ACTION BUTTONS */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-black text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Printer size={14} /> {t.printBtn}
            </button>
            <a
              href={pdfDownloadPath}
              target="_blank"
              download={`resume-kevin-eka-pratama-${activeRole}${lang === 'id' ? '-id' : ''}.pdf`}
              className="px-3.5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-slate-400 dark:border-slate-700"
            >
              <Download size={14} /> {t.downloadBtn} ({activeRole.toUpperCase()})
            </a>
          </div>

          <button
            onClick={onClose}
            aria-label="Close resume"
            className="p-2 text-slate-500 hover:text-black dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* PRINTABLE STRICT 3-PAGE BODY */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-white text-slate-900 print:p-0" id="print-area">
          <div className="max-w-4xl mx-auto font-sans">
            
            {/* ========================================================= */}
            {/* PAGE 1: EXECUTIVE PROFILE, EXPERIENCE & EDUCATION         */}
            {/* ========================================================= */}
            <div className="print-page flex flex-col justify-between">
              <div className="space-y-3.5 print:space-y-2">
                {/* HEADER */}
                <div className="border-b-2 border-slate-900 pb-3 print:pb-2 flex flex-row items-center justify-between gap-4 print:gap-2.5">
                  <div className="w-16 h-16 md:w-20 md:h-20 print:w-16 print:h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 border-slate-900 shadow-sm bg-white print:border-none print:shadow-none">
                    <Image
                      src="/profile/kev.png"
                      alt="Kevin Eka Pratama"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>

                  <div className="flex-grow space-y-0.5">
                    <h1 className="text-xl sm:text-2xl md:text-3xl print:text-xl font-black text-slate-900 uppercase tracking-tight">
                      Kevin Eka Pratama
                    </h1>
                    <p className="text-xs sm:text-sm print:text-[10.5px] font-extrabold text-slate-800 uppercase tracking-wide">
                      {currentRole.roleTitle}
                    </p>
                    <p className="text-[11px] print:text-[8.5px] font-bold text-slate-600">
                      {currentRole.roleSubtitle}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs print:text-[8.5px] text-slate-700 font-medium pt-0.5">
                      <span className="flex items-center gap-1 font-mono">
                        <Mail size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> kevinekapratama@gmail.com
                      </span>
                      <span className="hidden sm:inline print:inline">•</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Phone size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> +62 (813) 2661-2344
                      </span>
                      <span className="hidden sm:inline print:inline">•</span>
                      <a href="https://mazkev.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono text-slate-900 hover:underline">
                        <Globe size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> mazkev.vercel.app
                      </a>
                      <span className="hidden sm:inline print:inline">•</span>
                      <a href="https://github.com/mazkev" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono text-slate-900 hover:underline">
                        <Github size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> github.com/mazkev
                      </a>
                      <span className="hidden sm:inline print:inline">•</span>
                      <span className="flex items-center gap-1 font-mono">
                        <MapPin size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> Jakarta, Indonesia
                      </span>
                    </div>
                  </div>
                </div>

                {/* EXECUTIVE SUMMARY */}
                <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-0.5">
                    <h2 className="text-xs sm:text-sm print:text-[10px] font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <User size={14} className="text-slate-900 print:w-3 print:h-3" /> {currentRole.executiveSummaryTitle}
                    </h2>
                    <span className="text-[10px] print:text-[7.5px] font-mono font-bold text-slate-500 uppercase">
                      {lang === 'en' ? `Target: ${activeRole.toUpperCase()} (Page 1 of 3)` : `Target: ${activeRole.toUpperCase()} (Halaman 1 dari 3)`}
                    </span>
                  </div>
                  <p className="text-slate-800 text-xs sm:text-sm print:text-[9.5px] leading-relaxed print:leading-normal font-medium text-justify">
                    {currentRole.executiveSummary}
                  </p>
                </div>

                {/* PROFESSIONAL EXPERIENCE */}
                <div className="space-y-1.5 print:space-y-1 print:break-inside-avoid">
                  <h2 className="text-xs sm:text-sm print:text-[10px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 flex items-center gap-1.5">
                    <Briefcase size={14} className="text-slate-900 print:w-3 print:h-3" /> {t.experienceTitle}
                  </h2>

                  <div className="space-y-2 print:space-y-1">
                    <div className="space-y-0.5 print:break-inside-avoid">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <div>
                          <span className="font-extrabold text-slate-900 text-xs sm:text-sm print:text-[10px]">
                            {t.job1Title}
                          </span>
                          <span className="text-slate-500 text-xs print:text-[9px]"> • </span>
                          <span className="text-xs print:text-[9.5px] font-bold text-slate-700">
                            {t.job1Company}
                          </span>
                        </div>
                        <span className="text-[10px] print:text-[8px] font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">
                          {t.job1Date}
                        </span>
                      </div>
                      <ul className="list-disc pl-4 text-slate-800 text-xs print:text-[9.2px] leading-relaxed print:leading-normal space-y-0.5 font-medium">
                        <li>{t.job1Bullet1}</li>
                        <li>{t.job1Bullet2}</li>
                        <li>{t.job1Bullet3}</li>
                      </ul>
                    </div>

                    <div className="space-y-0.5 print:break-inside-avoid">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <div>
                          <span className="font-extrabold text-slate-900 text-xs sm:text-sm print:text-[10px]">
                            {job2Title}
                          </span>
                          <span className="text-slate-500 text-xs print:text-[9px]"> • </span>
                          <span className="text-xs print:text-[9.5px] font-bold text-slate-700">
                            {t.job2Company}
                          </span>
                        </div>
                        <span className="text-[10px] print:text-[8px] font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">
                          {t.job2Date}
                        </span>
                      </div>
                      <ul className="list-disc pl-4 text-slate-800 text-xs print:text-[9.2px] leading-relaxed print:leading-normal space-y-0.5 font-medium">
                        {job2Bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* TECHNICAL COMPETENCIES */}
                <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
                  <h2 className="text-xs sm:text-sm print:text-[10px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 flex items-center gap-1.5">
                    <Code size={14} className="text-slate-900 print:w-3 print:h-3" /> {t.skillsTitle} ({currentRole.roleTitle})
                  </h2>
                  
                  <div className="space-y-1 text-xs print:text-[9px] text-slate-800 leading-relaxed font-medium">
                    <p>
                      <strong>{lang === 'id' ? 'Bahasa Pemrograman:' : 'Programming Languages:'}</strong> {currentRole.skillsLanguages}
                    </p>
                    <p>
                      <strong>{lang === 'id' ? 'Framework & Arsitektur:' : 'Frameworks & Architecture:'}</strong> {currentRole.skillsFrameworks}
                    </p>
                    <p>
                      <strong>{activeRole === 'backend' ? (lang === 'id' ? 'Database & Message Broker:' : 'Databases & Message Brokers:') : activeRole === 'frontend' ? (lang === 'id' ? 'State & Grafis Interaktif:' : 'State & Interactive Graphics:') : (lang === 'id' ? 'Database & Messaging:' : 'Databases & Messaging:')}</strong> {currentRole.skillsDatabases}
                    </p>
                    <p>
                      <strong>{lang === 'id' ? 'AI & Agentic Engineering:' : 'AI & Agentic Engineering:'}</strong> {currentRole.skillsAi}
                    </p>
                    <p>
                      <strong>{lang === 'id' ? 'DevOps, Cloud & Tooling:' : 'DevOps, Cloud & Tooling:'}</strong> {currentRole.skillsDevOps}
                    </p>
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
                  <h2 className="text-xs sm:text-sm print:text-[10px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-slate-900 print:w-3 print:h-3" /> {t.educationTitle}
                  </h2>
                  <div className="flex justify-between items-start flex-wrap gap-1 text-xs print:text-[9.5px]">
                    <div>
                      <span className="font-extrabold text-slate-900">
                        {t.degree}
                      </span>
                      <span className="text-slate-500"> • </span>
                      <span className="font-bold text-slate-700">
                        {t.university}
                      </span>
                      <span className="text-slate-500 text-[10px] print:text-[8px] font-mono"> {t.eduNote}</span>
                    </div>
                    <span className="text-[10px] print:text-[8px] font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">
                      {t.eduDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* FOOTER PAGE 1 */}
              <div className="border-t border-slate-300 pt-1.5 flex justify-between items-center text-[10px] print:text-[8px] font-mono text-slate-500 mt-2">
                <span>Kevin Eka Pratama • {currentRole.roleTitle}</span>
                <span>kevinekapratama@gmail.com • +62 (813) 2661-2344</span>
                <span className="font-bold">Page 1 of 3 (Executive Profile)</span>
              </div>
            </div>

            {/* SCREEN DIVIDER */}
            <div className="no-print my-8 py-3 border-y-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                <LayoutGrid size={15} className="text-sky-600 dark:text-sky-400" />
                {lang === 'id' ? `Halaman 2: Direktori Proyek Khusus (${activeRole.toUpperCase()})` : `Page 2: Dedicated Project Directory (${activeRole.toUpperCase()})`}
              </span>
              <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 dark:text-slate-300">
                Page 2 of 3
              </span>
            </div>

            <div className="page-break" />

            {/* ========================================================= */}
            {/* PAGE 2: TECHNICAL PROJECT & REPOSITORY DIRECTORY          */}
            {/* ========================================================= */}
            {/* ========================================================= */}
            {/* PAGE 2: TECHNICAL PROJECT & REPOSITORY DIRECTORY          */}
            {/* ========================================================= */}
            <div className="print-page flex flex-col justify-between pt-2 print:pt-0">
              <div className="space-y-3.5 print:space-y-2">
                {/* PAGE 2 HEADER */}
                <div className="border-b-2 border-slate-900 pb-2 print:pb-1.5 flex justify-between items-baseline gap-2">
                  <div>
                    <h2 className="text-sm md:text-base print:text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <LayoutGrid size={16} className="text-slate-900 print:w-3 print:h-3" />
                      {currentRole.page2Title}
                    </h2>
                    <p className="text-[11px] print:text-[8px] font-bold text-slate-600">
                      {currentRole.page2Subtitle}
                    </p>
                  </div>
                  <span className="text-[10px] print:text-[7.5px] font-mono font-bold text-slate-500 uppercase">
                    mazkev.vercel.app
                  </span>
                </div>

                {/* EXECUTIVE METRICS BAR */}
                <div className="grid grid-cols-4 gap-2 print:gap-1.5 p-2 print:p-2 bg-slate-50 print:bg-slate-100 rounded-lg border border-slate-300 print:break-inside-avoid">
                  {roleData[activeRole].metrics.map((m, idx) => (
                    <div key={idx} className="text-center p-1 bg-white print:bg-transparent rounded border border-slate-200 print:border-none">
                      <div className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[12px]">{m.num}</div>
                      <div className="text-[8px] print:text-[7px] font-mono font-bold text-slate-600 uppercase">
                        {lang === 'en' ? m.labelEn : m.labelId}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ROLE-SPECIFIC REPOSITORY DIRECTORY */}
                {activeRole === 'backend' && (
                  <div className="space-y-2 print:space-y-1.5">
                    {/* PILLAR 1: Distributed Go & Java High-Throughput Engines (6 Repos) */}
                    <div className="p-2.5 print:p-2 rounded-lg bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-1 print:break-inside-avoid">
                      <div className="flex justify-between items-baseline border-b border-slate-200 pb-1">
                        <span className="font-extrabold text-slate-900 text-xs print:text-[10px] uppercase tracking-wide">
                          {lang === 'en' ? 'Pillar 1: Distributed Go & Java High-Throughput Engines' : 'Pilar 1: Layanan Mikro Go & Java Kinerja Tinggi Terdistribusi'}
                        </span>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                          6 Repositories
                        </span>
                      </div>
                      <div className="text-xs print:text-[8.5px] text-slate-700 space-y-0.5">
                        <p>• <a href="https://github.com/mazkev/go-distributed-microservices-lab" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">go-distributed-microservices-lab:</a> {lang === 'en' ? 'High-throughput microservices with binary gRPC, Protocol Buffers, RabbitMQ event bus, and Redis cache-aside.' : 'Layanan mikro terdistribusi dengan komunikasi biner gRPC, antrean pesan asinkron RabbitMQ, dan caching Redis.'}</p>
                        <p>• <a href="https://github.com/mazkev/go-ecommerce-gateway-engine" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">go-ecommerce-gateway-engine:</a> {lang === 'en' ? 'High-performance API Gateway with Gin router, MongoDB v2, order lifecycle, reverse proxy, and Swagger docs.' : 'Backend e-commerce & API Gateway performa tinggi dengan Gin router, MongoDB, reverse proxy, dan dokumentasi Swagger.'}</p>
                        <p>• <a href="https://github.com/mazkev/go-banking-core-system" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">go-banking-core-system:</a> {lang === 'en' ? 'Core banking ledger with atomic balance transfers, ACID PostgreSQL row locks, Bcrypt PIN, and Swagger docs.' : 'Engine transfer rekening atomik dengan isolasi transaksi ACID, row-level lock PostgreSQL, PIN Bcrypt, dan dokumentasi Swagger.'}</p>
                        <p>• <a href="https://github.com/mazkev/go-clean-arch" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">go-clean-arch:</a> {lang === 'en' ? 'Domain-Driven Design (DDD) Clean Architecture decoupling Domain, Usecase, and Repository data layers.' : 'Arsitektur Clean terstruktur dengan pemisahan tegas antara lapisan Domain, Usecase, dan Repository.'}</p>
                        <p>• <a href="https://github.com/mazkev/go-rest-api-enterprise" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">go-rest-api-enterprise:</a> {lang === 'en' ? 'Enterprise Go REST API with Gin, GORM, Redis caching, Uber Zap structured logging, and graceful shutdown.' : 'REST API Go standar enterprise dengan Gin, GORM, Redis caching, structured logging Uber Zap, dan graceful shutdown.'}</p>
                        <p>• <a href="https://github.com/mazkev/spring-boot-enterprise-platform" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">spring-boot-enterprise-platform:</a> {lang === 'en' ? 'Java 17 Spring Boot 3.3 enterprise platform with Spring Security JWT, AOP logging, Bucket4j rate limiting, and Docker.' : 'Platform enterprise Java 17 Spring Boot 3.3 dengan Spring Security JWT, audit logging AOP, Bucket4j rate limiter, dan Docker.'}</p>
                      </div>
                    </div>

                    {/* PILLAR 2: Cloud APIs & TypeScript Micro-Frameworks (6 Repos) */}
                    <div className="p-2.5 print:p-2 rounded-lg bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-1 print:break-inside-avoid">
                      <div className="flex justify-between items-baseline border-b border-slate-200 pb-1">
                        <span className="font-extrabold text-slate-900 text-xs print:text-[10px] uppercase tracking-wide">
                          {lang === 'en' ? 'Pillar 2: Cloud APIs & TypeScript Micro-Frameworks' : 'Pilar 2: API Cloud & Framework TypeScript Mikro'}
                        </span>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                          6 Repositories
                        </span>
                      </div>
                      <div className="text-xs print:text-[8.5px] text-slate-700 space-y-0.5">
                        <p>• <a href="https://github.com/mazkev/hono-ecommerce-engine" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">hono-ecommerce-engine:</a> {lang === 'en' ? 'Sub-millisecond REST API engine running on Bun runtime with Hono v4, Drizzle ORM, and WebSocket live chat.' : 'Engine REST API sub-milidetik berbasis Bun runtime dengan Hono v4, Drizzle ORM, dan live chat WebSocket.'}</p>
                        <p>• <a href="https://github.com/mazkev/express-prisma-realworld-api" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-prisma-realworld-api:</a> {lang === 'en' ? 'RealWorld standard backend with Express, TypeScript, Prisma ORM, Nx Monorepo, JWT, and Jest test suite.' : 'Backend standar RealWorld dengan Express, TypeScript, Prisma ORM, Nx Monorepo, JWT, dan unit testing Jest.'}</p>
                        <p>• <a href="https://github.com/mazkev/express-typescript-prisma-api" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-typescript-prisma-api:</a> {lang === 'en' ? 'Type-safe REST API built with Express v5, TypeScript, Prisma 7 ORM, LibSQL adapter, and tsx development.' : 'REST API type-safe dengan Express v5, TypeScript, Prisma 7 ORM, LibSQL adapter, dan runtime modern tsx.'}</p>
                        <p>• <a href="https://github.com/mazkev/express-prisma-product-api" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-prisma-product-api:</a> {lang === 'en' ? 'REST API with Express v5, Prisma ORM, JWT authentication, Multer upload, and Zod runtime validation.' : 'REST API dengan Express v5 dan Prisma ORM dilengkapi autentikasi JWT, Multer upload, dan validasi Zod.'}</p>
                        <p>• <a href="https://github.com/mazkev/express-sqlite-ecommerce-api" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-sqlite-ecommerce-api:</a> {lang === 'en' ? 'Lightweight e-commerce API with Express v5, SQLite prepared statements, ACID checkout, and Swagger UI.' : 'API e-commerce dengan Express v5 dan SQLite prepared statements, transaksi order atomik, dan Swagger UI.'}</p>
                        <p>• <a href="https://github.com/mazkev/express-realtime-api-service" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-realtime-api-service:</a> {lang === 'en' ? 'Express v5 with Socket.IO real-time broadcasting, dual database (Mongoose + MySQL), Winston logger, and Zod.' : 'Arsitektur Express v5 dengan real-time Socket.IO broadcasting, dual database (Mongoose + MySQL), dan logger Winston.'}</p>
                      </div>
                    </div>

                    {/* PILLAR 3: Specialized Microservices, Webhooks & Caching (7 Repos) */}
                    <div className="p-2.5 print:p-2 rounded-lg bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-1 print:break-inside-avoid">
                      <div className="flex justify-between items-baseline border-b border-slate-200 pb-1">
                        <span className="font-extrabold text-slate-900 text-xs print:text-[10px] uppercase tracking-wide">
                          {lang === 'en' ? 'Pillar 3: Specialized Microservices, Webhooks & Caching' : 'Pilar 3: Layanan Mikro Khusus, Webhook & Caching'}
                        </span>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                          7 Repositories
                        </span>
                      </div>
                      <div className="text-xs print:text-[8.5px] text-slate-700 space-y-0.5">
                        <p>• <a href="https://github.com/mazkev/express-prisma-payment-api" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-prisma-payment-api:</a> {lang === 'en' ? 'Payment backend with Midtrans webhook verification, automated PDFKit digital invoice rendering, and email notifications.' : 'Backend pemrosesan pembayaran dengan webhook Midtrans, pembuatan invoice PDF otomatis dengan PDFKit, dan email.'}</p>
                        <p>• <a href="https://github.com/mazkev/AI-api-manager" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">AI-api-manager:</a> {lang === 'en' ? 'Reverse proxy API gateway with API key authentication, distributed rate limiting, token quota tracking, and React UI.' : 'Reverse proxy API gateway dengan autentikasi API Key, rate limiting Redis, pelacakan kuota token, dan konsol React.'}</p>
                        <p>• <a href="https://github.com/mazkev/spring-boot-book-manager-api" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">spring-boot-book-manager-api:</a> {lang === 'en' ? 'Java 17 and Spring Boot 3.3 REST service with Spring Data MongoDB, pagination, and OpenAPI docs.' : 'Layanan RESTful API Java 17 dan Spring Boot 3.3 dengan Spring Data MongoDB, paginasi, dan dokumentasi OpenAPI.'}</p>
                        <p>• <a href="https://github.com/mazkev/express-book-catalog-api" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-book-catalog-api:</a> {lang === 'en' ? 'Book catalog API with Express v5, Prisma 7, Socket.IO live notifications, Redis rate limiting, and Jest tests.' : 'REST API katalog buku dengan Express v5, Prisma 7, notifikasi langsung Socket.IO, Redis limiter, dan pengujian Jest.'}</p>
                        <p>• <a href="https://github.com/mazkev/express-redis-url-shortener" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-redis-url-shortener:</a> {lang === 'en' ? 'URL shortener engine with Redis cache-aside pattern for sub-millisecond redirects and MongoDB persistence.' : 'Backend pemendek URL dengan pola Redis cache-aside untuk pengalihan sub-milidetik dan persistensi MongoDB.'}</p>
                        <p>• <a href="https://github.com/mazkev/express-mongo-content-api" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-mongo-content-api:</a> {lang === 'en' ? 'Content management REST API with Express, MongoDB, Redis caching, Socket.IO broadcasting, and cron jobs.' : 'REST API manajemen konten dengan Express, MongoDB, Redis caching, broadcast Socket.IO, dan cron job.'}</p>
                        <p>• <a href="https://github.com/mazkev/express-mongodb-starter-api" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">express-mongodb-starter-api:</a> {lang === 'en' ? 'Modular CRUD boilerplate with Express, MongoDB Mongoose, JWT auth, Redis caching, and Docker container.' : 'Boilerplate RESTful CRUD API modular dengan Express, MongoDB Mongoose, JWT auth, Redis cache, dan Docker.'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeRole === 'frontend' && (
                  <div className="space-y-2 print:space-y-1.5">
                    <div className="p-2.5 print:p-2 rounded-lg bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-1 print:break-inside-avoid">
                      <div className="flex justify-between items-baseline border-b border-slate-200 pb-1">
                        <span className="font-extrabold text-slate-900 text-xs print:text-[10px] uppercase tracking-wide">
                          {lang === 'en' ? 'Flagship Frontend Web Applications & Interactive Workstations' : 'Aplikasi Web Unggulan & Workstation Grafis'}
                        </span>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                          React 19 • Next.js 16 • Angular 19
                        </span>
                      </div>
                      <div className="text-xs print:text-[9px] text-slate-700 space-y-1">
                        <p>• <a href="https://github.com/mazkev/react-canva-design-studio" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">react-canva-design-studio:</a> {lang === 'en' ? 'Browser vector graphic design studio with dual-layer 60 FPS React-Konva canvas, transformation matrices, and image export.' : 'Studio desain grafis berbasis web dengan dual-layer kanvas 60 FPS React-Konva dan pipeline ekspor multi-format.'}</p>
                        <p>• <a href="https://github.com/mazkev/market-x-angular" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">market-x-angular:</a> {lang === 'en' ? 'Enterprise e-commerce storefront powered by Angular 19 reactive Signals, RxJS event streams, and seller back-office.' : 'Storefront e-commerce enterprise dengan reaktivitas Angular 19 Signals, RxJS streams, dan dashboard penjual.'}</p>
                        <p>• <a href="https://github.com/mazkev/nextjs-spotify-music-player" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">nextjs-spotify-music-player:</a> {lang === 'en' ? 'Music streaming player with real-time Web Audio API frequency analysis canvas visualizer and synchronized lyrics.' : 'Pemutar musik web dengan visualisasi frekuensi real-time Web Audio API pada kanvas dan sinkronisasi lirik.'}</p>
                        <p>• <a href="https://github.com/mazkev/react-trello-kanban-suite" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">react-trello-kanban-suite:</a> {lang === 'en' ? 'Glassmorphism Kanban project board with multi-axis drag-and-drop task sorting and Zustand state store.' : 'Board manajemen proyek Kanban glassmorphism dengan drag-and-drop multi-axis dan state store Zustand.'}</p>
                      </div>
                    </div>

                    <div className="p-2.5 print:p-2 rounded-lg bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-1 print:break-inside-avoid">
                      <div className="flex justify-between items-baseline border-b border-slate-200 pb-1">
                        <span className="font-extrabold text-slate-900 text-xs print:text-[10px] uppercase tracking-wide">
                          {lang === 'en' ? 'Cross-Platform Mobile Applications' : 'Aplikasi Mobile Cross-Platform'}
                        </span>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                          React Native & Flutter
                        </span>
                      </div>
                      <div className="text-xs print:text-[9px] text-slate-700 space-y-1">
                        <p>• <a href="https://github.com/mazkev/treveloka-react-native-expo" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">treveloka-react-native-expo:</a> {lang === 'en' ? 'Mobile travel booking superapp with React Native 0.85, Expo Router, and Gemini AI itinerary assistant.' : 'Aplikasi mobile pemesanan perjalanan dengan React Native 0.85, Expo Router, dan asisten rencana perjalanan Gemini AI.'}</p>
                        <p>• <a href="https://github.com/mazkev/tiktok-clone-react-native-expo" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">tiktok-clone-react-native-expo:</a> {lang === 'en' ? 'Mobile short-video platform featuring Expo Video autoplay feeds, camera recording, and live comment overlays.' : 'Platform video pendek mobile dengan pemutar Expo Video seamless autoplay dan perekaman video kamera terintegrasi.'}</p>
                      </div>
                    </div>

                    {/* 12 LIVE DEPLOYMENTS TABLE */}
                    <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-0.5">
                        <h3 className="text-xs print:text-[9.5px] font-extrabold uppercase tracking-wide text-slate-900">
                          {lang === 'en' ? '12 Verified Cloud Deployments (HTTP 200 OK on Vercel)' : '12 Aplikasi Aktif Terverifikasi di Cloud (Vercel)'}
                        </h3>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold text-emerald-700 uppercase">
                          {lang === 'en' ? 'Clickable Live Demos' : 'Dapat Diuji Langsung'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[10px] print:text-[8px] font-mono">
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>1. Canvass Design Studio:</strong>
                          <a href="https://canva-clone-fawn.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">canva-clone-fawn.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>2. Spotify Music Player:</strong>
                          <a href="https://spotify-clonez.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">spotify-clonez.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>3. MarketX Angular Store:</strong>
                          <a href="https://market-x-angular.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">market-x-angular.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>4. Trello Kanban Suite:</strong>
                          <a href="https://trello-azure-five.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">trello-azure-five.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>5. BayE Auction Store:</strong>
                          <a href="https://baye-ecommerce-marketplace.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">baye-ecommerce-marketplace.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>6. Nexus Workspace:</strong>
                          <a href="https://nexus-project-mu.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">nexus-project-mu.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>7. Indofooty Match Hub:</strong>
                          <a href="https://indofooty.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">indofooty.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>8. AI Wireframer Lab:</strong>
                          <a href="https://ai-component-wireframer.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">ai-component-wireframer.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>9. Umrah Travel Portal:</strong>
                          <a href="https://umrah-travel-landing.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">umrah-travel-landing.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>10. Cloud Simulator:</strong>
                          <a href="https://cloud-console-simulator.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">cloud-console-simulator.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>11. Snake AI Pathfinding:</strong>
                          <a href="https://snake-ai-pathfinding.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">snake-ai-pathfinding.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>12. HubSpot CRM Platform:</strong>
                          <a href="https://hub-spot-clone-five.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">hub-spot-clone-five.vercel.app</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeRole === 'fullstack' && (
                  <div className="space-y-2 print:space-y-1.5">
                    {/* PILLAR 1: Backend Systems & Cloud Architecture (6 Repos) */}
                    <div className="p-2.5 print:p-2 rounded-lg bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-1 print:break-inside-avoid">
                      <div className="flex justify-between items-baseline border-b border-slate-200 pb-1">
                        <span className="font-extrabold text-slate-900 text-xs print:text-[10px] uppercase tracking-wide">
                          {lang === 'en' ? 'Pillar 1: Backend Systems & Cloud Architecture' : 'Pilar 1: Sistem Backend & Arsitektur Cloud'}
                        </span>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                          19 Repositories
                        </span>
                      </div>
                      <div className="text-xs print:text-[8.5px] text-slate-700 space-y-0.5">
                        <p>• <a href="https://github.com/mazkev/go-banking-core-system" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">go-banking-core-system:</a> {lang === 'en' ? 'Core banking engine with atomic balance transfers, ACID PostgreSQL row locks, and Bcrypt PIN.' : 'Engine core banking transaksi transfer saldo atomik dengan row-level lock PostgreSQL dan validasi PIN Bcrypt.'}</p>
                        <p>• <a href="https://github.com/mazkev/go-distributed-microservices-lab" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">go-distributed-microservices-lab:</a> {lang === 'en' ? 'High-throughput microservices communicating over binary gRPC and asynchronous RabbitMQ event bus.' : 'Layanan mikro terdistribusi dengan komunikasi biner gRPC dan antrean pesan asinkron RabbitMQ.'}</p>
                        <p>• <a href="https://github.com/mazkev/nexus-workspace-engine" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">nexus-workspace-engine:</a> {lang === 'en' ? 'Java Spring Boot 3.3 enterprise microservices ecosystem with Resilience4j circuit breakers and Eureka discovery.' : 'Ekosistem microservices enterprise Java Spring Boot 3.3 dengan circuit breaker Resilience4j dan discovery Eureka.'}</p>
                        <p>• <a href="https://github.com/mazkev/go-ecommerce-gateway-engine" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">go-ecommerce-gateway-engine:</a> {lang === 'en' ? 'High-performance API Gateway with Gin router, MongoDB v2, order lifecycle, reverse proxy, and Swagger docs.' : 'Backend e-commerce & API Gateway performa tinggi dengan Gin router, MongoDB, reverse proxy, dan dokumentasi Swagger.'}</p>
                        <p>• <a href="https://github.com/mazkev/hono-ecommerce-engine" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">hono-ecommerce-engine:</a> {lang === 'en' ? 'Sub-millisecond REST API engine running on Bun runtime with Hono v4, Drizzle ORM, and WebSocket live chat.' : 'Engine REST API sub-milidetik berbasis Bun runtime dengan Hono v4, Drizzle ORM, dan live chat WebSocket.'}</p>
                        <p>• <a href="https://github.com/mazkev/go-clean-arch" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">go-clean-arch:</a> {lang === 'en' ? 'Decoupled Clean Architecture boilerplate implementing strict Domain, Usecase, and Repository boundaries.' : 'Arsitektur Clean terstruktur dengan pemisahan tegas antara lapisan Domain, Usecase, dan Repository.'}</p>
                      </div>
                    </div>

                    {/* PILLAR 2: Fullstack Web Platforms & Mobile Applications (6 Repos) */}
                    <div className="p-2.5 print:p-2 rounded-lg bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-1 print:break-inside-avoid">
                      <div className="flex justify-between items-baseline border-b border-slate-200 pb-1">
                        <span className="font-extrabold text-slate-900 text-xs print:text-[10px] uppercase tracking-wide">
                          {lang === 'en' ? 'Pillar 2: Fullstack Web Platforms & Mobile Applications' : 'Pilar 2: Platform Web Fullstack & Aplikasi Mobile'}
                        </span>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                          22 Repositories
                        </span>
                      </div>
                      <div className="text-xs print:text-[8.5px] text-slate-700 space-y-0.5">
                        <p>• <a href="https://github.com/mazkev/baye-ecommerce-marketplace" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">baye-ecommerce-marketplace:</a> {lang === 'en' ? 'Auction e-commerce with Next.js 16 Server Components, live bidding simulation, LibSQL, and digital QR invoices.' : 'Marketplace lelang produksi dengan Next.js 16, LibSQL serverless, komparasi produk, dan cetak invoice QR digital.'}</p>
                        <p>• <a href="https://github.com/mazkev/tokopedia-react-storefront" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">tokopedia-react-storefront:</a> {lang === 'en' ? 'Fullstack marketplace combining Go REST API backend with React 19, category filters, and optimistic cart checkout.' : 'E-commerce fullstack memadukan backend Go REST API dengan frontend React 19 dan sinkronisasi transaksi PostgreSQL.'}</p>
                        <p>• <a href="https://github.com/mazkev/laravel-hrms-platform" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">laravel-hrms-platform:</a> {lang === 'en' ? 'Enterprise HRMS with Laravel 12, selfie attendance, dynamic shift management, and automated payroll calculations.' : 'Sistem manajemen SDM & penggajian enterprise dengan Laravel 12, absensi selfie GPS, shift dinamis, dan kalkulasi THR.'}</p>
                        <p>• <a href="https://github.com/mazkev/java-spring-commerce-platform" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">java-spring-commerce-platform:</a> {lang === 'en' ? 'Enterprise warehouse commerce with Java 17 Spring Boot 3.3, Vue 3, Pinia, OpenPDF, and PostgreSQL.' : 'Platform e-commerce & pergudangan enterprise dengan Java 17 Spring Boot 3.3, Vue 3, Pinia, dan faktur OpenPDF.'}</p>
                        <p>• <a href="https://github.com/mazkev/treveloka-react-native-expo" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">treveloka-react-native-expo:</a> {lang === 'en' ? 'Mobile travel booking superapp with React Native 0.85, Expo Router, and Gemini AI itinerary assistant.' : 'Aplikasi mobile pemesanan perjalanan dengan React Native 0.85, Expo Router, dan asisten rencana perjalanan Gemini AI.'}</p>
                        <p>• <a href="https://github.com/mazkev/flutter-grab-superapp-clone" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">flutter-grab-superapp-clone:</a> {lang === 'en' ? 'Cross-platform mobile superapp with Flutter, Riverpod 3, live driver tracking on OpenStreetMap, and food ordering.' : 'Aplikasi superapp mobile cross-platform dengan Flutter dan Riverpod 3, pelacakan driver di peta, dan pesan makanan.'}</p>
                      </div>
                    </div>

                    {/* PILLAR 3: Modern Frontend Web Applications (6 Repos) */}
                    <div className="p-2.5 print:p-2 rounded-lg bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-1 print:break-inside-avoid">
                      <div className="flex justify-between items-baseline border-b border-slate-200 pb-1">
                        <span className="font-extrabold text-slate-900 text-xs print:text-[10px] uppercase tracking-wide">
                          {lang === 'en' ? 'Pillar 3: Modern Frontend Web Applications' : 'Pilar 3: Aplikasi Frontend Web Modern'}
                        </span>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                          41 Repositories
                        </span>
                      </div>
                      <div className="text-xs print:text-[8.5px] text-slate-700 space-y-0.5">
                        <p>• <a href="https://github.com/mazkev/react-canva-design-studio" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">react-canva-design-studio:</a> {lang === 'en' ? 'Vector graphic studio with dual-layer 60 FPS React-Konva canvas, transformation matrices, and image export.' : 'Studio desain grafis berbasis web dengan dual-layer kanvas 60 FPS React-Konva dan pipeline ekspor multi-format.'}</p>
                        <p>• <a href="https://github.com/mazkev/market-x-angular" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">market-x-angular:</a> {lang === 'en' ? 'Enterprise e-commerce storefront powered by Angular 19 reactive Signals, RxJS event streams, and seller dashboard.' : 'Storefront e-commerce enterprise dengan reaktivitas Angular 19 Signals, RxJS streams, dan dashboard penjual.'}</p>
                        <p>• <a href="https://github.com/mazkev/nextjs-spotify-music-player" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">nextjs-spotify-music-player:</a> {lang === 'en' ? 'Music streaming player with real-time Web Audio API frequency analysis canvas visualizer and synchronized lyrics.' : 'Pemutar musik web dengan visualisasi frekuensi real-time Web Audio API pada kanvas dan sinkronisasi lirik.'}</p>
                        <p>• <a href="https://github.com/mazkev/react-trello-kanban-suite" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">react-trello-kanban-suite:</a> {lang === 'en' ? 'Glassmorphism Kanban project board with multi-axis drag-and-drop task sorting and Zustand state store.' : 'Board manajemen proyek Kanban glassmorphism dengan drag-and-drop multi-axis dan state store Zustand.'}</p>
                        <p>• <a href="https://github.com/mazkev/hub-spot-clone" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">hub-spot-clone:</a> {lang === 'en' ? 'Enterprise CRM platform with sales pipeline Kanban, TanStack data tables, and Recharts performance analytics.' : 'Platform CRM penjualan enterprise dengan pipeline transaksi interaktif, tabel data TanStack, dan analitik performa.'}</p>
                        <p>• <a href="https://github.com/mazkev/nextjs-football-sport-portal" target="_blank" rel="noreferrer" className="font-mono font-bold text-slate-900 underline hover:text-sky-700">nextjs-football-sport-portal:</a> {lang === 'en' ? 'Live match center with Next.js 16, real-time sports feed parsing, league standings, and editorial CMS.' : 'Portal berita dan skor sepak bola langsung dengan Next.js 16, jadwal pertandingan real-time, dan konsol admin CMS.'}</p>
                      </div>
                    </div>

                    {/* 12 LIVE DEPLOYMENTS TABLE */}
                    <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-0.5">
                        <h3 className="text-xs print:text-[9.5px] font-extrabold uppercase tracking-wide text-slate-900">
                          {lang === 'en' ? '12 Verified Cloud Deployments (HTTP 200 OK on Vercel)' : '12 Aplikasi Aktif Terverifikasi di Cloud (Vercel)'}
                        </h3>
                        <span className="text-[9px] print:text-[7.5px] font-mono font-bold text-emerald-700 uppercase">
                          {lang === 'en' ? 'Clickable Live Demos' : 'Dapat Diuji Langsung'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[10px] print:text-[8px] font-mono">
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>1. BayE Auction Store:</strong>
                          <a href="https://baye-ecommerce-marketplace.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">baye-ecommerce-marketplace.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>2. Nexus Workspace:</strong>
                          <a href="https://nexus-project-mu.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">nexus-project-mu.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>3. Spotify Music Player:</strong>
                          <a href="https://spotify-clonez.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">spotify-clonez.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>4. Indofooty Match Hub:</strong>
                          <a href="https://indofooty.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">indofooty.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>5. AI Wireframer Lab:</strong>
                          <a href="https://ai-component-wireframer.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">ai-component-wireframer.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>6. Umrah Travel Portal:</strong>
                          <a href="https://umrah-travel-landing.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">umrah-travel-landing.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>7. Cloud Simulator:</strong>
                          <a href="https://cloud-console-simulator.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">cloud-console-simulator.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>8. Snake AI Pathfinding:</strong>
                          <a href="https://snake-ai-pathfinding.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">snake-ai-pathfinding.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>9. Canvass Design Studio:</strong>
                          <a href="https://canva-clone-fawn.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">canva-clone-fawn.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>10. Trello Kanban Suite:</strong>
                          <a href="https://trello-azure-five.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">trello-azure-five.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>11. MarketX Angular Store:</strong>
                          <a href="https://market-x-angular.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">market-x-angular.vercel.app</a>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <strong>12. HubSpot CRM Platform:</strong>
                          <a href="https://hub-spot-clone-five.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">hub-spot-clone-five.vercel.app</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AUDIT NOTE */}
                <div className="p-2 print:p-1.5 rounded bg-slate-100 border border-slate-300 text-[10px] print:text-[8px] text-slate-800 font-medium leading-tight">
                  <strong>{lang === 'en' ? 'Directory Audit Note: ' : 'Catatan Audit Direktori: '}</strong>
                  {lang === 'en' 
                    ? 'Full source code, commit history, and test suites for all repositories are publicly available at github.com/mazkev and interactive web workstation at mazkev.vercel.app.'
                    : 'Seluruh source code, riwayat komit, dan dokumentasi arsitektur untuk seluruh repositori terverifikasi dapat diaudit publik pada github.com/mazkev dan workstation mazkev.vercel.app.'}
                </div>
              </div>

              {/* FOOTER PAGE 2 */}
              <div className="border-t border-slate-300 pt-1.5 flex justify-between items-center text-[10px] print:text-[8px] font-mono text-slate-500 mt-2">
                <span>Kevin Eka Pratama • {currentRole.roleTitle}</span>
                <span>mazkev.vercel.app • github.com/mazkev</span>
                <span className="font-bold">Page 2 of 3 ({lang === 'en' ? 'Dedicated Directory' : 'Direktori Terdedikasi'})</span>
              </div>
            </div>

            {/* SCREEN DIVIDER */}
            <div className="no-print my-8 py-3 border-y-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                <FileText size={15} className="text-emerald-600 dark:text-emerald-400" />
                {lang === 'id' ? `Halaman 3: Lampiran Visual Portofolio (${activeRole.toUpperCase()})` : `Page 3: Dedicated Visual Project Annex (${activeRole.toUpperCase()})`}
              </span>
              <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 dark:text-slate-300">
                Page 3 of 3
              </span>
            </div>

            <div className="page-break" />

            {/* ========================================================= */}
            {/* PAGE 3: VISUAL PROJECT ANNEX (SHOWCASE GALLERY)           */}
            {/* ========================================================= */}
            <div className="print-page flex flex-col justify-between pt-2 print:pt-0">
              <div className="space-y-3 print:space-y-2">
                {/* PAGE 3 HEADER */}
                <div className="border-b-2 border-slate-900 pb-2 print:pb-1.5 flex justify-between items-baseline gap-2">
                  <div>
                    <h2 className="text-sm md:text-base print:text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <FileText size={16} className="text-slate-900 print:w-3 print:h-3" />
                      {currentRole.page3Title}
                    </h2>
                    <p className="text-[11px] print:text-[8px] font-bold text-slate-600">
                      {currentRole.page3Subtitle}
                    </p>
                  </div>
                  <span className="text-[10px] print:text-[7.5px] font-mono font-bold text-slate-500 uppercase">
                    mazkev.vercel.app
                  </span>
                </div>

                {/* 10 VISUAL CARDS GRID (2 cols x 5 rows) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 print:gap-1">
                  {roleData[activeRole].visualCards.map((p, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-300 rounded-lg overflow-hidden bg-white flex flex-col justify-between print:break-inside-avoid shadow-sm print:shadow-none"
                    >
                      <div className="h-20 sm:h-24 print:h-[50px] w-full bg-slate-100 border-b border-slate-200 relative overflow-hidden">
                        <Image
                          src={p.img}
                          alt={p.title}
                          width={400}
                          height={180}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-1.5 print:p-1 space-y-0.5">
                        <div className="flex justify-between items-center gap-1">
                          <span className="font-extrabold text-slate-900 text-xs print:text-[8.5px] leading-tight truncate">
                            {p.title}
                          </span>
                          <span className="text-[8px] print:text-[6.8px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase flex-shrink-0">
                            {p.cat}
                          </span>
                        </div>
                        <div className="text-[8.5px] print:text-[6.8px] font-mono font-bold text-slate-600 truncate">
                          {p.tech}
                        </div>
                        <p className="text-[10px] print:text-[7.2px] text-slate-700 font-medium leading-tight">
                          {lang === 'en' ? p.descEn : p.descId}
                        </p>
                        <div className="pt-0.5 border-t border-slate-100 flex items-center gap-1 text-[9px] print:text-[6.8px] font-mono">
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-700 hover:underline flex items-center gap-0.5"
                          >
                            <span>{p.label}</span>
                            <ExternalLink size={9} className="opacity-70" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AUDIT NOTICE */}
                <div className="p-2 print:p-1.5 rounded bg-slate-100 border border-slate-300 text-[10px] print:text-[8px] text-slate-800 font-medium leading-tight">
                  <strong>{lang === 'en' ? 'Interactive Demonstration & Source Code Audit: ' : 'Demonstrasi Interaktif & Audit Kode Sumber: '}</strong>
                  {lang === 'en'
                    ? 'Live deployments, interactive case studies, architectural documentation, and full source code are accessible at mazkev.vercel.app and github.com/mazkev.'
                    : 'Seluruh demo aplikasi langsung, studi kasus interaktif, dokumentasi arsitektur, dan kode sumber dapat diakses publik pada mazkev.vercel.app dan github.com/mazkev.'}
                </div>
              </div>

              {/* FOOTER PAGE 3 */}
              <div className="border-t border-slate-300 pt-1.5 flex justify-between items-center text-[10px] print:text-[8px] font-mono text-slate-500 mt-2">
                <span>Kevin Eka Pratama • {currentRole.roleTitle}</span>
                <span>mazkev.vercel.app • github.com/mazkev</span>
                <span className="font-bold">Page 3 of 3 (Visual Project Annex)</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
