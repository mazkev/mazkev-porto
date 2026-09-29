const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Read allRepositories.ts
const allReposFile = path.resolve('app/lib/data/allRepositories.ts');
let fileContent = fs.readFileSync(allReposFile, 'utf8');

const match = fileContent.match(/export const ALL_REPOSITORIES:\s*RepoItem\[\]\s*=\s*(\[[\s\S]*?\]);\s*export const DOMAIN_META/);
if (!match) {
  console.error('Could not match ALL_REPOSITORIES');
  process.exit(1);
}

const repos = eval('(' + match[1] + ')');

// Clean titles that contain "Clone"
repos.forEach(r => {
  if (r.name === 'treveloka-react-native-expo') {
    r.title = 'Traveloka-Inspired Travel Booking & AI Assistant Platform';
  } else if (r.name === 'duolingo-clone-react-native') {
    r.title = 'Gamified Multilingual Learning Mobile App (Native Audio TTS)';
  } else if (r.name === 'tiktok-clone-react-native-expo') {
    r.title = 'Vertical Video Streaming & Interactive Social Feed App';
  } else if (r.name === 'flutter-grab-superapp-clone') {
    r.title = 'Grab-Inspired On-Demand Multi-Service Mobile App (Flutter & Riverpod)';
  }
});

const backend = repos.filter(r => r.domain === 'backend');
const fullstack = repos.filter(r => r.domain === 'fullstack');
const frontend = repos.filter(r => r.domain === 'frontend');

// Save updated allRepositories.ts
const updatedAllReposTs = `export interface RepoItem {
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

fs.writeFileSync(allReposFile, updatedAllReposTs, 'utf8');
console.log('Updated app/lib/data/allRepositories.ts with clean titles');

// 2. Build MASTERPIECE resume.md
let resumeMd = `# 📄 Technical Engineering Resume & Portfolio Dossier

> **Candidate**: Kevin Eka Pratama  
> **Role Target**: Software Engineer (Backend / Fullstack / Frontend — *Customizable per Target Application*)  
> **Primary Specialization**: High-Performance Backend Systems & Modern Fullstack Platforms (Go, Java Spring Boot, React 19, Next.js 16, TypeScript, PostgreSQL)  
> **Location**: Yogyakarta, Indonesia (Open to Hybrid / Onsite Jakarta & Remote)  
> **Contact**: kevinxtkj3@gmail.com | +62 821-4170-8797  
> **Profiles**: [GitHub: github.com/mazkev](https://github.com/mazkev) | [Portfolio: mazkev.vercel.app](https://mazkev.vercel.app) | [LinkedIn: linkedin.com/in/kevin-pratama-a704252b8](https://linkedin.com/in/kevin-pratama-a704252b8)  
> **Curated Portfolio**: 82 Verified Repositories (19 Backend • 22 Fullstack & Mobile • 41 Frontend) | 12 Live Deployments  
> **Last Updated**: September 2026  

---

## 📌 Executive Summary (Ringkasan Eksekutif)

Software Engineer dengan 2+ tahun pengalaman profesional di bidang **Application Support Sistem Enterprise pada PT PLN Icon+**. Memiliki keahlian teruji dalam menjaga ketersediaan layanan (*uptime >99.5%*), investigasi log produksi, serta optimasi query database relasional tingkat lanjut (**PostgreSQL, Oracle, MySQL**) yang mereduksi latensi query hingga **60%**. 

Di luar peran korporat, memiliki rekam jejak dedikasi rekayasa mandiri dengan merancang, membangun, dan men-deploy **82 repositori terkurasi** mencakup arsitektur *microservices* terdistribusi (**Go, Java Spring Boot 3.3, Bun/Hono**), platform web modern (**Next.js 16, React 19, TypeScript**), serta aplikasi *mobile cross-platform* (**React Native Expo, Flutter**). Terbiasa dengan prinsip **Clean Architecture (DDD)**, transaksi atomik **ACID**, *caching* Redis, *message broker* RabbitMQ, dan kontainerisasi **Docker**.

---

## 🛠️ Comprehensive Technical Skills Matrix

| Category | Technologies & Tools |
| :--- | :--- |
| **Programming Languages** | Go (Golang 1.25/1.26), Java (JDK 17/21), TypeScript, JavaScript (ES6+/Node.js/Bun), PHP 8.3, Python 3, Dart, SQL, HTML5, CSS3/Tailwind CSS v4 |
| **Backend & Microservices** | Gin, Fiber, Java Spring Boot 3.3 (Spring Security 6, JPA, AOP), Bun + Hono v4, Express.js v5, Laravel 12, FastAPI, gRPC, Protocol Buffers, RESTful APIs, Reverse Proxy, Swagger / OpenAPI 3.0 |
| **Architectural Patterns** | Clean Architecture (Domain-Driven Design / Decoupled Layers: Domain, Usecase, Repository), Event-Driven Architecture, Microservices, Worker Pool Concurrency, ACID Transactional Ledgers |
| **Databases & Storage** | PostgreSQL 15/16 (GORM, Prisma 7, Connection Pooling, Row-level Locks), MySQL (Sequelize), MongoDB NoSQL (Mongoose), SQLite (LibSQL adapter) |
| **Caching & Messaging** | Redis (Cache-Aside Pattern, Distributed Rate Limiting, Session Stores), RabbitMQ (AMQP Message Broker, Exchange/Queue Routing) |
| **Frontend Frameworks** | React 19, Next.js 16 (App Router, Server Components, SSR/SSG), Vue 3 (Composition API, Pinia), Angular 19 (Signals, RxJS), Vite, Webpack 5 |
| **Mobile Development** | React Native (Expo SDK 56, Expo Router, New Architecture), Flutter (Riverpod 3, Dart), Offline-first storage, Camera Barcode/GPS hardware integration |
| **Client State & Data Fetching** | Zustand, Redux Toolkit, TanStack Query v5 (React Query), TanStack Table, React Hook Form, Zod Schema Validation |
| **Data Viz & Canvas Graphics** | React-Konva (Infinite 60 FPS Canvas), Three.js / React Three Fiber, Recharts, ApexCharts, Web Audio API |
| **DevOps, Testing & Tooling** | Docker, Docker Compose, Git & GitHub, Postman, Vitest, Jest, Supertest, Linux Bash, Vercel Edge Runtime |

---

## 💼 Professional Experience (Pengalaman Profesional Berdampak Nyata)

### **PT PLN Icon+** — *Application Support Engineer*
**Periode**: 2023 – Sekarang (2+ Tahun) | **Lokasi**: Indonesia  
*PT PLN Icon+ adalah anak perusahaan utilitas ketenagalistrikan terkemuka di Indonesia yang mengelola infrastruktur digital dan layanan kelistrikan nasional.*

* **System Availability & 24/7 Monitoring**: Bertanggung jawab mengawal kestabilan dan keandalan sistem digital enterprise nasional 24/7 yang melayani jutaan transaksi data pelanggan, mempertahankan target uptime operasional di atas **99.5%**.
* **Database Query Tuning & Latency Reduction**: Menganalisis dan men-tuning query SQL kompleks pada cluster database **PostgreSQL, Oracle, dan MySQL**; berhasil **mengurangi execution time query laporan transaksi dari 15 detik menjadi di bawah 1 detik (reduksi >60%)**, mencegah bottleneck data dan lock contention.
* **Production Incident Resolution & SLA**: Menginvestigasi dan menyelesaikan lebih dari **450+ insiden teknis dan tiket operasional produksi** dengan tingkat kepatuhan SLA mencapai **98%**, meliputi analisis kegagalan transaksi API, payload error JSON, dan integritas data backend.
* **Production Log Analysis & Root Cause Diagnosis**: Melakukan *root cause analysis* (RCA) mendalam menggunakan structured server logs, mengidentifikasi exception stack trace (HTTP 5xx/4xx), dan mendeteksi anomali pada alur komunikasi microservices.
* **Core Developer Collaboration & API Release Validation**: Berkolaborasi intensif dengan tim pengembang inti (*core developers*) dan QA dalam mereproduksi bug pada staging, memverifikasi perbaikan API, serta memvalidasi kontrak endpoint REST sebelum deployment hotfix ke lingkungan produksi.

---

### **Independent Software Projects & Web Development** — *Junior Software Developer (Self-Directed / Contract)*
**Periode**: 2022 – 2023 (1 Tahun) | **Lokasi**: Yogyakarta, Indonesia  

* Mengembangkan aplikasi web kustom dan solusi otomasi digital berbasis **JavaScript, PHP, dan React** untuk klien lokal pasca kelulusan sarjana.
* Merancang skema database relasional MySQL, mengintegrasikan REST API pihak ketiga, dan mengimplementasikan antarmuka responsif ramah seluler (*mobile-first design*).
* Membangun fondasi arsitektur perangkat lunak modern dan transisi intensif ke ekosistem **Go (Golang)**, **TypeScript**, dan **Next.js**.

---

## 🎓 Education (Pendidikan)

**Universitas AMIKOM** — *Bachelor of Computer Science / Sarjana Informatika (S.Kom)*  
**Periode**: 2017 – 2022 | **IPK (GPA)**: **3.42 / 4.00**  
*Fokus Studi: Rekayasa Perangkat Lunak, Struktur Data & Algoritma, Basis Data Relasional, Jaringan Komputer.*

---

## 🌟 4 Featured Engineering Case Studies (Studi Kasus Arsitektur Unggulan)

Sebelum meninjau katalog lengkap 82 repositori, berikut adalah **4 studi kasus rekayasa utama** yang merepresentasikan kedalaman arsitektur backend, fullstack, dan frontend:

### 1. Distributed Microservices & High-Throughput API Gateway
* **Kategori**: Backend & Cloud Architecture | **Tier**: 🌟 Tier 1
* **Tech Stack**: Go (Golang), gRPC, Protocol Buffers, RabbitMQ, Redis, Gin, Clean Architecture, Docker
* **Repositori GitHub**: [go-distributed-microservices-lab](https://github.com/mazkev/go-distributed-microservices-lab) & [go-ecommerce-gateway-engine](https://github.com/mazkev/go-ecommerce-gateway-engine)
* **Tantangan Rekayasa**: Menghindari bottleneck komunikasi sinkron HTTP antar-service pada beban transaksi tinggi dan menjaga isolasi data antar-domain.
* **Solusi & Hasil**: Mengimplementasikan komunikasi biner performa tinggi antar-microservice menggunakan **gRPC / Protocol Buffers**, asynchronous message passing dengan **RabbitMQ**, serta pola *Redis Cache-Aside* yang menurunkan latensi baca data hingga sub-milidetik. Menerapkan pemisahan Clean Architecture (*Domain, Usecase, Repository*) untuk modularitas maksimal.

### 2. BayE Modern E-Commerce & Real-Time Bidding Platform
* **Kategori**: Fullstack Web Platform | **Tier**: 🌟 Tier 1 | **Status**: 🚀 **Live Production**
* **Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Prisma 7, LibSQL, Tailwind CSS
* **Live Demo**: [https://baye-ecommerce-marketplace.vercel.app](https://baye-ecommerce-marketplace.vercel.app)
* **Repositori GitHub**: [baye-ecommerce-marketplace](https://github.com/mazkev/baye-ecommerce-marketplace)
* **Tantangan Rekayasa**: Menyediakan simulasi penawaran lelang (*live bidding*) yang responsif dengan *state hydration* yang mulus dan pencetakan faktur digital tanpa membebani thread utama browser.
* **Solusi & Hasil**: Mengoptimalkan Server Components Next.js 16 untuk Initial Page Load instan, dipadukan dengan Client Components untuk interaktivitas dinamis, adapter LibSQL serverless untuk efisiensi query, generator invoice QR interaktif, dan komparasi spesifikasi multi-produk.

### 3. Digital Wallet & Transactional Balance Transfer Engine
* **Kategori**: Core Backend & Financial Integrity | **Tier**: 🌟 Tier 1
* **Tech Stack**: Go (Golang), PostgreSQL, GORM, ACID Transactions, Bcrypt, Swagger OpenAPI
* **Repositori GitHub**: [go-banking-core-system](https://github.com/mazkev/go-banking-core-system)
* **Tantangan Rekayasa**: Mencegah *race condition* dan *double-spending* saat transfer saldo antar-rekening terjadi secara serentak (*concurrent balance deductions*).
* **Solusi & Hasil**: Merancang mekanisme transfer saldo atomik dengan **ACID Transaction Isolation** dan *row-level locking* di PostgreSQL. Dilengkapi enkripsi PIN Bcrypt, structured audit ledger logging untuk setiap mutasi dana, serta dokumentasi endpoint interaktif menggunakan Swagger UI.

### 4. Canvass Visual Graphic Design & Publishing Workstation
* **Kategori**: Frontend Graphics Engineering | **Tier**: 🌟 Tier 1 | **Status**: 🚀 **Live Production**
* **Tech Stack**: React 19, React-Konva, HTML5 Canvas, Zustand, Tailwind CSS v4
* **Live Demo**: [https://canva-clone-fawn.vercel.app](https://canva-clone-fawn.vercel.app)
* **Repositori GitHub**: [react-canva-design-studio](https://github.com/mazkev/react-canva-design-studio) & [react-konva-whiteboard-canvas](https://github.com/mazkev/react-konva-whiteboard-canvas)
* **Tantangan Rekayasa**: Mengelola ribuan node elemen visual (teks, bentuk geometris, layer gambar) pada kanvas interaktif tanpa terjadi *frame drops* (FPS drop).
* **Solusi & Hasil**: Membangun arsitektur *dual-layer 60 FPS Canvas* menggunakan **React-Konva**, di mana transform handler (rotasi, scaling, drag) diisolasi dari rendering tree utama. State dikelola secara reaktif dan hemat memori via Zustand dengan kemampuan ekspor resolusi tinggi (PNG/SVG/PDF).

---

## 🌐 12 Aplikasi Aktif Terverifikasi (Live Cloud Deployments on Vercel)

Seluruh aplikasi berikut telah aktif (*HTTP 200 OK*) dan dapat diuji langsung oleh rekruter & hiring manager secara instan:

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

## 📂 Katalog Lengkap 82 Repositori Rekayasa Terverifikasi

### 🛡️ 1. Backend & Cloud Systems (19 Repositori)
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
> *"Berdasarkan resume teknis dan portofolio 82 repositori di atas, lakukan evaluasi komprehensif terhadap tingkat senioritas teknis Kevin Eka Pratama. Analisis pengalaman 2+ tahun Application Support enterprise di PT PLN Icon+ (optimasi query SQL, pemantauan 24/7, SLA 98%), 4 Featured Engineering Case Studies (Go microservices, ACID transaction ledger, Next.js 16 live e-commerce, Canvas 60 FPS), dan kematangan 82 repositori. Berikan rekomendasi area teknis yang perlu diperdalam untuk mencapai posisi Senior Software Engineer di industri tech tier-1."*

### Prompt 2: Penilaian Kecocokan Posisi (Job Match)
> *"Saya ingin melamar posisi [SEBUTKAN NAMA POSISI, misal: Go Backend Engineer / Fullstack Software Engineer]. Evaluasi kecocokan profil, skill matrix, pengalaman enterprise PLN Icon+, dan 4 Featured Case Studies di atas dengan kualifikasi standar posisi tersebut. Sebutkan kelebihan utama yang harus saya tekankan pada wawancara teknis."*

### Prompt 3: Generator Pertanyaan Wawancara Teknis (System Design & Code)
> *"Bertindaklah sebagai Engineering Manager / Tech Lead yang sedang menguji kandidat ini. Buat 10 pertanyaan teknis mendalam dan studi kasus System Design berdasarkan proyek Go distributed microservices, transactional digital wallet, dan pengalaman optimasi database PostgreSQL di PLN Icon+ yang ada pada resume ini."*
`;

fs.writeFileSync('resume.md', resumeMd, 'utf8');
console.log('Successfully wrote upgraded resume.md!');

// 3. Also update repo.md with clean titles
let repoMd = fs.readFileSync('repo.md', 'utf8');
repoMd = repoMd.replace(/Traveloka Superapp Clone \(React Native & AI\)/g, 'Traveloka-Inspired Travel Booking & AI Assistant Platform');
repoMd = repoMd.replace(/Gamified Language Learning App \(Duolingo Clone\)/g, 'Gamified Multilingual Learning Mobile App (Native Audio TTS)');
repoMd = repoMd.replace(/Short-Form Video Social App \(TikTok Clone\)/g, 'Short-Form Video Social App (Interactive Feed)');
fs.writeFileSync('repo.md', repoMd, 'utf8');
console.log('Successfully updated repo.md');
