const fs = require('fs');
const path = require('path');

// 1. Read allRepositories.ts
const allReposFile = path.resolve('app/lib/data/allRepositories.ts');
const fileContent = fs.readFileSync(allReposFile, 'utf8');

const match = fileContent.match(/export const ALL_REPOSITORIES:\s*RepoItem\[\]\s*=\s*(\[[\s\S]*?\]);\s*export const DOMAIN_META/);
if (!match) {
  console.error('Could not match ALL_REPOSITORIES');
  process.exit(1);
}

const repos = eval('(' + match[1] + ')');
console.log('Original repos count:', repos.length);

// Transform repos: mobile -> fullstack, exploration -> frontend
repos.forEach(r => {
  if (r.domain === 'mobile') {
    r.domain = 'fullstack';
    r.domainLabel = {
      en: 'Fullstack & Mobile Platforms',
      id: 'Platform Fullstack & Mobile'
    };
  } else if (r.domain === 'exploration') {
    r.domain = 'frontend';
    r.domainLabel = {
      en: 'Frontend Web Applications',
      id: 'Aplikasi Web Frontend'
    };
  } else if (r.domain === 'fullstack') {
    r.domainLabel = {
      en: 'Fullstack & Mobile Platforms',
      id: 'Platform Fullstack & Mobile'
    };
  }
});

// Group by domain
const backend = repos.filter(r => r.domain === 'backend');
const fullstack = repos.filter(r => r.domain === 'fullstack');
const frontend = repos.filter(r => r.domain === 'frontend');

console.log(`Curated counts: Backend=${backend.length}, Fullstack=${fullstack.length}, Frontend=${frontend.length}, Total=${repos.length}`);

// Generate updated allRepositories.ts
const newAllReposTs = `export interface RepoItem {
  id: string;
  name: string;
  title: string;
  domain: 'backend' | 'fullstack' | 'frontend';
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

export const ALL_REPOSITORIES: RepoItem[] = ${JSON.stringify(repos, null, 2)};

export const DOMAIN_META = {
  backend: {
    icon: 'Server',
    label: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    count: ${backend.length},
    tier1Count: ${backend.filter(r => r.tier === 1).length},
    color: 'sky'
  },
  fullstack: {
    icon: 'Layers',
    label: { en: 'Fullstack & Mobile Platforms', id: 'Platform Fullstack & Mobile' },
    count: ${fullstack.length},
    tier1Count: ${fullstack.filter(r => r.tier === 1).length},
    color: 'indigo'
  },
  frontend: {
    icon: 'Cpu',
    label: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    count: ${frontend.length},
    tier1Count: ${frontend.filter(r => r.tier === 1).length},
    color: 'emerald'
  }
};
`;

fs.writeFileSync(allReposFile, newAllReposTs, 'utf8');
console.log('Successfully wrote updated app/lib/data/allRepositories.ts');

// 2. Generate updated repo.md
let repoMd = `# 📂 Katalog Komprehensif 82 Repositori Rekayasa Perangkat Lunak

> **Developer**: Kevin Eka Pratama  
> **Status Portofolio**: 82 Repositori Terkurasi (100% Kredibel, 0 Repo Arsip/Placeholder)  
> **Live Deployments**: 12 Aplikasi Aktif di Cloud Vercel  
> **Pilar Rekayasa**: **Backend & Cloud Systems** (19), **Fullstack & Mobile Platforms** (22), **Frontend Web Applications** (41)  
> **Terakhir Diperbarui**: September 2026  

---

## 📊 Ringkasan Distribusi Rekayasa

| Kategori Rekayasa | Total Repositori | Tier 1 (Unggulan) | Fokus Arsitektur & Teknologi Utama |
| :--- | :---: | :---: | :--- |
| **🛡️ 1. Backend & Cloud Systems** | **${backend.length}** | ${backend.filter(r => r.tier === 1).length} | Go (Clean Arch, gRPC, Protobuf), Java Spring Boot 3.3, Bun/Hono, Node.js Express, PostgreSQL ACID, Redis, RabbitMQ, Docker |
| **🌐 2. Fullstack & Mobile Platforms** | **${fullstack.length}** | ${fullstack.filter(r => r.tier === 1).length} | Next.js 16, React 19, Laravel 12, FastAPI, React Native Expo SDK 56, Flutter Riverpod 3, Prisma 7, WebSocket |
| **⚛️ 3. Frontend Web Applications** | **${frontend.length}** | ${frontend.filter(r => r.tier === 1).length} | React 19, Vue 3, Angular 19, TypeScript, Zustand, Three.js, React-Konva, Canvas 60 FPS, TanStack Query |
| **TOTAL KESELURUHAN** | **${repos.length}** | **${repos.filter(r => r.tier === 1).length}** | **12 Aplikasi Terverifikasi Live Cloud (Vercel)** |

---

## 🌐 12 Aplikasi Aktif Terverifikasi (Live Cloud Deployments)

Seluruh aplikasi berikut telah terverifikasi aktif (*HTTP 200 OK*) dan dapat diakses langsung oleh rekruter secara instan:

1. **BayE Marketplace**: [https://baye-ecommerce-marketplace.vercel.app](https://baye-ecommerce-marketplace.vercel.app)
2. **Nexus Workspace Studio**: [https://nexus-project-mu.vercel.app](https://nexus-project-mu.vercel.app)
3. **Spotify Music Web Player**: [https://spotify-clonez.vercel.app](https://spotify-clonez.vercel.app)
4. **Indofooty Live Match Center**: [https://indofooty.vercel.app](https://indofooty.vercel.app)
5. **AI Component Wireframer**: [https://ai-component-wireframer.vercel.app](https://ai-component-wireframer.vercel.app)
6. **Umrah Travel Landing**: [https://umrah-travel-landing.vercel.app](https://umrah-travel-landing.vercel.app)
7. **Cloud Console Simulator**: [https://cloud-console-simulator.vercel.app](https://cloud-console-simulator.vercel.app)
8. **Snake AI Pathfinding Lab**: [https://snake-ai-pathfinding.vercel.app](https://snake-ai-pathfinding.vercel.app)
9. **Canvass Visual Design Studio**: [https://canva-clone-fawn.vercel.app](https://canva-clone-fawn.vercel.app)
10. **Trello Kanban Workspace**: [https://trello-azure-five.vercel.app](https://trello-azure-five.vercel.app)
11. **MarketX Angular 19 Storefront**: [https://market-x-angular.vercel.app](https://market-x-angular.vercel.app)
12. **HubSpot Enterprise CRM**: [https://hub-spot-clone-five.vercel.app](https://hub-spot-clone-five.vercel.app)

---

## 🛡️ 1. Backend & Cloud Systems (${backend.length} Repositori)

Daftar sistem backend, microservices, transactional ledger, dan RESTful/gRPC API:

| No | Repositori | Stack Utama | Deskripsi & Nilai Rekayasa | Size (KB) | Tier |
| :---: | :--- | :--- | :--- | :---: | :---: |
`;

backend.forEach((r, idx) => {
  const tierIcon = r.tier === 1 ? '🌟 Tier 1' : r.tier === 2 ? '⚡ Tier 2' : '🧪 Tier 3';
  repoMd += `| ${idx + 1} | **[${r.name}](${r.githubUrl})** | ${r.tech.slice(0, 3).join(', ')} | ${r.desc.id} | ${r.sizeKb || '-'} | ${tierIcon} |\n`;
});

repoMd += `\n---\n\n## 🌐 2. Fullstack & Mobile Platforms (${fullstack.length} Repositori)\n\nPlatform monorepo web fullstack dan aplikasi mobile cross-platform (React Native & Flutter):\n\n| No | Repositori | Stack Utama | Deskripsi & Nilai Rekayasa | Live URL | Size (KB) | Tier |\n| :---: | :--- | :--- | :--- | :---: | :---: | :---: |\n`;

fullstack.forEach((r, idx) => {
  const tierIcon = r.tier === 1 ? '🌟 Tier 1' : r.tier === 2 ? '⚡ Tier 2' : '🧪 Tier 3';
  const liveStr = r.liveUrl ? `[Live Demo](${r.liveUrl})` : '-';
  repoMd += `| ${idx + 1} | **[${r.name}](${r.githubUrl})** | ${r.tech.slice(0, 3).join(', ')} | ${r.desc.id} | ${liveStr} | ${r.sizeKb || '-'} | ${tierIcon} |\n`;
});

repoMd += `\n---\n\n## ⚛️ 3. Frontend Web Applications (${frontend.length} Repositori)\n\nAplikasi antarmuka web modern, sistem desain grafis interaktif, dashboard data, dan lab eksperimen pengembang:\n\n| No | Repositori | Stack Utama | Deskripsi & Nilai Rekayasa | Live URL | Size (KB) | Tier |\n| :---: | :--- | :--- | :--- | :---: | :---: | :---: |\n`;

frontend.forEach((r, idx) => {
  const tierIcon = r.tier === 1 ? '🌟 Tier 1' : r.tier === 2 ? '⚡ Tier 2' : '🧪 Tier 3';
  const liveStr = r.liveUrl ? `[Live Demo](${r.liveUrl})` : '-';
  repoMd += `| ${idx + 1} | **[${r.name}](${r.githubUrl})** | ${r.tech.slice(0, 3).join(', ')} | ${r.desc.id} | ${liveStr} | ${r.sizeKb || '-'} | ${tierIcon} |\n`;
});

fs.writeFileSync('repo.md', repoMd, 'utf8');
console.log('Successfully wrote updated repo.md');

// 3. Generate updated resume.md
let resumeMd = `# 📄 Technical Engineering Resume & Portfolio Dossier

> **Candidate**: Kevin Eka Pratama  
> **Role Target**: Backend Software Engineer | Fullstack & Mobile Engineer | Frontend Web Engineer  
> **Location**: Yogyakarta, Indonesia  
> **Contact**: kevinxtkj3@gmail.com | +62 821-4170-8797  
> **Profiles**: [GitHub](https://github.com/mazkev) | [Portfolio](https://mazkev.vercel.app) | [LinkedIn](https://linkedin.com/in/kevin-pratama-a704252b8)  
> **Audited Repositories**: 82 Production & Open Source Repositories (Curated & Verified)  
> **Pillars**: Backend (${backend.length}) • Fullstack & Mobile (${fullstack.length}) • Frontend (${frontend.length})  
> **Last Updated**: September 2026  

---

## 📌 Executive Summaries

### 1. Fullstack & Mobile Software Engineer
Fullstack & Mobile Software Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record of independently designing, building, and deploying 82 curated software repositories across distributed backend systems (Go, Java Spring Boot, Bun/Hono, Express.js), fullstack web platforms (Next.js 16, React 19, Laravel 12, FastAPI), modern frontend clients, and cross-platform mobile apps (React Native Expo SDK 56, Flutter Riverpod 3). Strong foundation in database architecture, relational schema optimization (PostgreSQL, MySQL), NoSQL (MongoDB), ACID transactions, Clean Architecture, and containerized deployment via Docker.

### 2. Backend & Cloud Systems Engineer (Go / Java / Node.js)
Backend & Cloud Systems Engineer specializing in Go (Golang), Java Spring Boot, Bun/Hono, and Node.js RESTful/gRPC microservices. Architect of 19 dedicated backend systems and 22 fullstack/mobile platforms implementing Clean Architecture, ACID transactional ledgers, Redis cache-aside, RabbitMQ message brokers, and database connection pooling (PostgreSQL, MongoDB, MySQL). Backed by 2+ years of Application Support at PT PLN Icon+, with rigorous practical mastery in database query optimization, production log troubleshooting, and high-availability operations.

### 3. Frontend & Mobile Engineer
Frontend & Mobile Engineer specializing in high-performance, user-centric web and mobile platforms with React 19, Next.js 16, TypeScript, Vue 3, Angular 19, and React Native (Expo SDK 56). Creator of 63 production-grade frontend, fullstack, and mobile applications featuring complex client state management (Zustand, Redux Toolkit, Signals), interactive canvas/3D graphics (React-Konva, Three.js), GIS mapping (Leaflet, OSRM), and real-time WebSockets. Backed by 2+ years of enterprise Application Support experience ensuring system reliability and user operational excellence.

---

## 🛠️ Comprehensive Technical Skills Matrix

| Category | Technologies & Tools |
| :--- | :--- |
| **Programming Languages** | Go (Golang 1.25/1.26), Java (JDK 17/21), TypeScript, JavaScript (ES6+/Node.js/Bun), PHP 8.3, Python 3, Dart, SQL, HTML5, CSS3/Tailwind CSS |
| **Backend & Microservices** | Gin, Fiber, Java Spring Boot 3.3 (Spring Security 6, JPA, AOP), Bun + Hono v4, Express.js v5, Laravel 12, FastAPI, gRPC, Protocol Buffers, RESTful APIs, Reverse Proxy, Swagger / OpenAPI 3.0 |
| **Architectural Patterns** | Clean Architecture (Domain-Driven Design / Decoupled Layers: Domain, Usecase, Repository), Event-Driven Architecture, Microservices, Worker Pool Concurrency, ACID Transactional Ledgers |
| **Databases & Storage** | PostgreSQL 15/16 (GORM, Prisma 7, Connection Pooling, Row-level Locks), MySQL (Sequelize), MongoDB NoSQL (Mongoose), SQLite (LibSQL adapter) |
| **Caching & Messaging** | Redis (Cache-Aside, Distributed Rate Limiting, Session Stores), RabbitMQ (AMQP Message Broker, Exchange/Queue Queuing) |
| **Frontend Frameworks** | React 19, Next.js 16 (App Router, Server Components, SSR/SSG), Vue 3 (Composition API, Pinia), Angular 19 (Signals, RxJS), Vite, Webpack 5 |
| **Mobile Development** | React Native (Expo SDK 56, Expo Router, New Architecture), Flutter (Riverpod 3, Dart), Offline-first storage, Camera/GPS hardware integration |
| **Client State & Data Fetching** | Zustand, Redux Toolkit, TanStack Query v5 (React Query), TanStack Table, React Hook Form, Zod Validation |
| **Data Viz & Canvas Graphics** | React-Konva (Infinite 60 FPS Canvas), Three.js / React Three Fiber, Recharts, ApexCharts, Web Audio API |
| **DevOps, Testing & Tooling** | Docker, Docker Compose, Git & GitHub, Postman, Vitest, Jest, Supertest, Linux Bash, Vercel Edge Runtime |

---

## 💼 Professional Experience

### **PT PLN Icon+** — *Application Support Engineer*
**Periode**: 2023 – Sekarang (2+ Tahun) | **Lokasi**: Indonesia  
*PT PLN Icon+ adalah anak perusahaan utilitas ketenagalistrikan terkemuka di Indonesia yang mengelola layanan digital dan infrastruktur ketenagalistrikan nasional.*

* **System Monitoring & Incident Resolution**: Memantau operasional alur sistem digital enterprise berskala besar 24/7. Mengidentifikasi, menginvestigasi, dan menyelesaikan insiden produksi kritis untuk meminimalkan *downtime* layanan publik nasional.
* **Database Performance & Query Optimization**: Melakukan analisis mendalam terhadap query SQL kompleks, mendiagnosis *database locks* dan *query bottlenecks*, serta menjalankan optimasi indeks dan performa pada cluster database PostgreSQL, Oracle, dan MySQL.
* **Production Logs & Root Cause Analysis**: Menganalisis log produksi enterprise (*structured logging*, error envelopes, HTTP 5xx/4xx metrics) untuk mengidentifikasi *root cause* bug aplikasi dan kegagalan transaksi API.
* **Technical Documentation & SOP**: Menyusun Standard Operating Procedures (SOP) untuk penanganan insiden, *runbook* operasional, serta laporan *post-mortem* gangguan teknis.
* **Developer & Cross-Team Collaboration**: Berkoordinasi intensif dengan *core software development team*, QA, dan tim infrastruktur jaringan dalam memvalidasi *bug fixes*, *hotfix deployments*, serta verifikasi kontrak integrasi REST API.

---

## 🎓 Education

**Universitas AMIKOM** — *Bachelor of Computer Science / Teknik Informatika*  
**Periode**: 2017 – 2022 | **IPK (GPA)**: 3.42 / 4.00  

---

## 🌐 12 Aplikasi Aktif Terverifikasi (Live Cloud Deployments)

1. **BayE Marketplace**: [https://baye-ecommerce-marketplace.vercel.app](https://baye-ecommerce-marketplace.vercel.app)
2. **Nexus Workspace Studio**: [https://nexus-project-mu.vercel.app](https://nexus-project-mu.vercel.app)
3. **Spotify Music Web Player**: [https://spotify-clonez.vercel.app](https://spotify-clonez.vercel.app)
4. **Indofooty Live Match Center**: [https://indofooty.vercel.app](https://indofooty.vercel.app)
5. **AI Component Wireframer**: [https://ai-component-wireframer.vercel.app](https://ai-component-wireframer.vercel.app)
6. **Umrah Travel Landing**: [https://umrah-travel-landing.vercel.app](https://umrah-travel-landing.vercel.app)
7. **Cloud Console Simulator**: [https://cloud-console-simulator.vercel.app](https://cloud-console-simulator.vercel.app)
8. **Snake AI Pathfinding Lab**: [https://snake-ai-pathfinding.vercel.app](https://snake-ai-pathfinding.vercel.app)
9. **Canvass Visual Graphic Design Studio**: [https://canva-clone-fawn.vercel.app](https://canva-clone-fawn.vercel.app)
10. **Trello Glassmorphism Kanban Workspace**: [https://trello-azure-five.vercel.app](https://trello-azure-five.vercel.app)
11. **MarketX Angular 19 E-Commerce Storefront**: [https://market-x-angular.vercel.app](https://market-x-angular.vercel.app)
12. **HubSpot Enterprise CRM Platform**: [https://hub-spot-clone-five.vercel.app](https://hub-spot-clone-five.vercel.app)

---

## 📂 Katalog Terkurasi 82 Repositori Teknis (3 Pilar Rekayasa)

### 🛡️ 1. Backend & Cloud Systems (${backend.length} Repositori)
`;

backend.forEach((r, idx) => {
  const liveStr = r.liveUrl ? ' • [Live: ' + r.liveUrl.replace('https://', '').replace('http://', '') + '](' + r.liveUrl + ')' : '';
  resumeMd += `\n${idx + 1}. **${r.title}** | [GitHub: ${r.name}](${r.githubUrl})${liveStr}\n   * **Technologies**: ${r.tech.join(', ')}\n   * **Pencapaian**: ${r.desc.id} *(Tier ${r.tier})*\n`;
});

resumeMd += `\n### 🌐 2. Fullstack & Mobile Platforms (${fullstack.length} Repositori: Web & Cross-Platform Mobile)\n`;

fullstack.forEach((r, idx) => {
  const liveStr = r.liveUrl ? ' • [Live: ' + r.liveUrl.replace('https://', '').replace('http://', '') + '](' + r.liveUrl + ')' : '';
  const typeTag = r.category.includes('Mobile') ? '📱 Mobile' : '🌐 Fullstack Web';
  resumeMd += `\n${idx + 1}. **${r.title}** (${typeTag}) | [GitHub: ${r.name}](${r.githubUrl})${liveStr}\n   * **Technologies**: ${r.tech.join(', ')}\n   * **Pencapaian**: ${r.desc.id} *(Tier ${r.tier})*\n`;
});

resumeMd += `\n### ⚛️ 3. Frontend Web Applications (${frontend.length} Repositori)\n`;

frontend.forEach((r, idx) => {
  const liveStr = r.liveUrl ? ' • [Live: ' + r.liveUrl.replace('https://', '').replace('http://', '') + '](' + r.liveUrl + ')' : '';
  resumeMd += `\n${idx + 1}. **${r.title}** | [GitHub: ${r.name}](${r.githubUrl})${liveStr}\n   * **Technologies**: ${r.tech.join(', ')}\n   * **Pencapaian**: ${r.desc.id} *(Tier ${r.tier})*\n`;
});

resumeMd += `\n---

## 🤖 Panduan Prompt Analisis untuk AI Lain

Gunakan prompt di bawah ini saat menyalin isi dokumen ini ke AI lain (ChatGPT / Claude / DeepSeek):

### Prompt 1: Audit Tingkat Senioritas & Gap Analysis
> *"Berdasarkan resume dan katalog 82 repositori di atas (19 Backend, 22 Fullstack & Mobile, 41 Frontend), lakukan evaluasi komprehensif terhadap tingkat senioritas teknis Kevin Eka Pratama. Analisis kedalaman arsitektur backend (Go, Java Spring Boot, Microservices, ACID), kematangan fullstack & mobile (Next.js 16, React Native, Flutter), dan pengalaman Application Support enterprise di PT PLN Icon+. Berikan rekomendasi area teknis yang perlu diperdalam untuk mencapai posisi Senior Software Engineer di industri tech tier-1."*

### Prompt 2: Penilaian Kecocokan Posisi (Job Match)
> *"Saya ingin melamar posisi [SEBUTKAN NAMA POSISI, misal: Go Backend Engineer / Fullstack & Mobile Developer / Senior Frontend Engineer]. Evaluasi kecocokan profil, skill matrix, dan repositori di atas dengan kualifikasi standar posisi tersebut. Sebutkan 5 proyek unggulan yang paling relevan untuk ditonjolkan pada sesi wawancara teknis."*

### Prompt 3: Generator Pertanyaan Wawancara Teknis (System Design & Code)
> *"Bertindaklah sebagai Engineering Manager / Tech Lead yang sedang menguji kandidat ini. Buat 10 pertanyaan teknis mendalam dan studi kasus System Design berdasarkan proyek Go distributed microservices, transactional digital wallet, aplikasi mobile React Native/Flutter, dan pengalaman database support PLN Icon+ yang ada pada resume ini."*
`;

fs.writeFileSync('resume.md', resumeMd, 'utf8');
console.log('Successfully wrote updated resume.md');
