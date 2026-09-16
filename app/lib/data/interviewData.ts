export type PracticeRole = 'Backend Golang' | 'Backend Java' | 'Fullstack' | 'Frontend';
export type PracticeDifficulty = 'Junior' | 'Middle' | 'Senior';
export type PracticeTopic =
  | 'Golang'
  | 'SQL'
  | 'REST API'
  | 'Database'
  | 'Docker'
  | 'Redis'
  | 'Kafka'
  | 'gRPC'
  | 'System Design';

export interface StarStructure {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface InterviewQuestion {
  id: string;
  role: PracticeRole;
  difficulty: PracticeDifficulty;
  topic: PracticeTopic;
  categoryLabel: { id: string; en: string };
  context: string;
  question: { id: string; en: string };
  keyConcepts: string[];
  explanation: { id: string; en: string };
  suggestedAnswer: { id: string; en: string };
  starAnswer?: { id: StarStructure; en: StarStructure };
  codeSnippet?: {
    lang: string;
    code: string;
  };
}

export const interviewQuestions: InterviewQuestion[] = [
  // ==========================================
  // 1. GOLANG TOPICS
  // ==========================================
  {
    id: 'go-clean-architecture',
    role: 'Backend Golang',
    difficulty: 'Middle',
    topic: 'Golang',
    categoryLabel: { id: 'Go & Backend', en: 'Go & Backend' },
    context: 'Proyek Go Clean Architecture REST API',
    question: {
      id: 'Bagaimana Anda menerapkan Clean Architecture pada proyek Go dan apa manfaat utamanya dibandingkan struktur monolith biasa?',
      en: 'How do you implement Clean Architecture in a Go project, and what are its main advantages over a conventional monolithic structure?'
    },
    keyConcepts: [
      'Domain Layer',
      'Usecase Layer',
      'Repository Layer',
      'Delivery/Handler',
      'Dependency Inversion & Mock Testing'
    ],
    explanation: {
      id: 'Clean Architecture memisahkan domain business logic dari framework routing dan database driver melalui interface kontrak sehingga kode mudah di-unit test secara independen.',
      en: 'Clean Architecture isolates domain business logic from routing frameworks and database drivers via interface contracts, making code easily mockable in unit tests.'
    },
    suggestedAnswer: {
      id: 'Saya membagi proyek ke 4 layer: 1) Domain (Entity & Interface kontrak), 2) Usecase (Aturan bisnis utama), 3) Repository (Akses database PostgreSQL/GORM), dan 4) Delivery (HTTP Handler Fiber/Gin). Keuntungannya adalah Dependency Inversion di mana pergantian database atau router tidak merusak core domain.',
      en: 'I structure the codebase into 4 layers: Domain, Usecase, Repository, and Delivery. The primary benefit is Dependency Inversion—core domain logic remains untouched when database drivers or HTTP routers change.'
    },
    starAnswer: {
      id: {
        situation: 'Saat membangun REST API dengan Go, saya membutuhkan struktur modular yang mudah diuji tanpa ketergantungan database fisik.',
        task: 'Merancang arsitektur 4-layer dengan Dependency Inversion Principle.',
        action: 'Mendefinisikan interface entity di Domain layer, memusatkan logic di Usecase, dan mengisolasi DB query di Repository layer.',
        result: 'Struktur kode menjadi decoupled, mudah dibuatkan mock unit test, dan siap di-scale.'
      },
      en: {
        situation: 'When building Go APIs, I needed a decoupled structure supporting mockable tests without active databases.',
        task: 'Design a 4-layer Clean Architecture with Dependency Inversion.',
        action: 'Defined domain interfaces, isolated business rules in usecases, and restricted DB drivers to repositories.',
        result: 'Achieved complete separation of concerns and fast unit testing.'
      }
    },
    codeSnippet: {
      lang: 'go',
      code: `type ArticleRepository interface {
    GetByID(ctx context.Context, id int64) (*domain.Article, error)
    Store(ctx context.Context, a *domain.Article) error
}`
    }
  },
  {
    id: 'go-concurrency-goroutines',
    role: 'Backend Golang',
    difficulty: 'Middle',
    topic: 'Golang',
    categoryLabel: { id: 'Go Concurrency', en: 'Go Concurrency' },
    context: 'Go Concurrency & Async Processing',
    question: {
      id: 'Kapan sebaiknya menggunakan Goroutine dan bagaimana cara mencegah memory leak atau race condition saat bekerja dengan Concurrency di Go?',
      en: 'When should you use Goroutines, and how do you prevent memory leaks or race conditions in Go concurrency?'
    },
    keyConcepts: [
      'Goroutines & Channels',
      'sync.WaitGroup & sync.Mutex',
      'Context Cancellation (context.WithTimeout)',
      'Worker Pool Pattern'
    ],
    explanation: {
      id: 'Goroutine sangat ringan namun membutuhkan kontrol lifecycle yang ketat menggunakan context timeout dan channels agar tidak menggantung tanpa batas (leak).',
      en: 'Goroutines are lightweight but require lifecycle management via context timeouts and channels to prevent uncontrolled execution and leaks.'
    },
    suggestedAnswer: {
      id: 'Goroutine digunakan untuk I/O-bound atau background tasks paralel. Untuk mencegah memory leak, selalu gunakan context.WithTimeout atau channel sinyal done. Untuk mencegah race condition, gunakan komunikasi data via channel atau sync.RWMutex saat mengakses shared state.',
      en: 'Use goroutines for concurrent I/O or background workers. Prevent leaks using context.WithTimeout, and eliminate race conditions using channels or sync.RWMutex over shared state.'
    }
  },
  {
    id: 'go-pointers-memory',
    role: 'Backend Golang',
    difficulty: 'Junior',
    topic: 'Golang',
    categoryLabel: { id: 'Go Fundamentals', en: 'Go Fundamentals' },
    context: 'Memory Allocation & Pointers di Go',
    question: {
      id: 'Kapan kita harus menggunakan Pointer vs Value Receiver pada struct method di Go, dan bagaimana dampaknya pada Garbage Collector?',
      en: 'When should you use Pointer vs Value Receivers on struct methods in Go, and what is the impact on the Garbage Collector?'
    },
    keyConcepts: [
      'Pointer Receivers (*T)',
      'Value Receivers (T)',
      'Mutasi State Struct',
      'Escape Analysis & Heap vs Stack Allocation'
    ],
    explanation: {
      id: 'Pointer receiver digunakan saat method perlu memodifikasi field struct atau struct berukuran besar untuk menghindari duplikasi memori, sedangkan value receiver cocok untuk struct kecil yang immutable.',
      en: 'Use pointer receivers when mutating struct state or avoiding copies of large structs. Value receivers are preferred for small, immutable data structures.'
    },
    suggestedAnswer: {
      id: 'Gunakan Pointer Receiver (*T) jika method perlu memutasi isi struct atau struct memiliki banyak data untuk mencegah copy memori berlebih. Gunakan Value Receiver jika struct kecil dan immutable. Variabel pointer sering mengalami escape analysis dan dialokasikan ke Heap, yang menambah beban Garbage Collector.',
      en: 'Use pointer receivers if you need to mutate the struct or if the struct is large to avoid copying overhead. Value receivers are ideal for small, immutable types. Note that pointers may escape to the heap, incurring GC overhead.'
    }
  },
  {
    id: 'go-interfaces-generics',
    role: 'Backend Golang',
    difficulty: 'Senior',
    topic: 'Golang',
    categoryLabel: { id: 'Go Advanced', en: 'Go Advanced' },
    context: 'Type System & Generic Repository',
    question: {
      id: 'Bagaimana pendekatan Anda memanfaatkan Go Generics (any / constraints) untuk membangun Generic Base Repository tanpa mengorbankan type safety?',
      en: 'How do you leverage Go Generics (any / constraints) to construct a Generic Base Repository without sacrificing type safety?'
    },
    keyConcepts: [
      'Type Parameters [T any]',
      'Interface Contracts',
      'Generic CRUD Operations',
      'Compile-time Type Safety'
    ],
    explanation: {
      id: 'Generics di Go memungkinkan pembuatan template CRUD repository untuk banyak entity tanpa perlu interface{} casting saat runtime.',
      en: 'Go generics enable reusable CRUD repository implementations across multiple entities without runtime interface{} reflection overhead.'
    },
    suggestedAnswer: {
      id: 'Saya mendefinisikan generic struct type BaseRepository[T any] struct { db *gorm.DB }. Method seperti FindByID(ctx, id) mengembalikan (*T, error) secara strongly typed saat compile time, mengurangi repetisi boilerplate query CRUD untuk puluhan domain entity.',
      en: 'I define BaseRepository[T any] struct with typed methods like FindByID(ctx, id) returning (*T, error). This eliminates boilerplate code across entities while preserving compile-time type safety.'
    }
  },

  // ==========================================
  // 2. SQL & DATABASE TOPICS
  // ==========================================
  {
    id: 'sql-indexing-optimization',
    role: 'Backend Golang',
    difficulty: 'Middle',
    topic: 'SQL',
    categoryLabel: { id: 'Database & SQL', en: 'Database & SQL' },
    context: 'Optimasi Database PostgreSQL / MySQL di Lingkungan Produksi',
    question: {
      id: 'Bagaimana cara Anda menentukan kolom yang tepat untuk dibuatkan Index pada database PostgreSQL/MySQL agar pencarian data menjadi lebih efisien?',
      en: 'How do you determine the appropriate columns to create database indexes on in PostgreSQL/MySQL for efficient data querying?'
    },
    keyConcepts: [
      'B-Tree Indexing pada kolom WHERE dan JOIN',
      'Composite Index (Urutan Kolom Berdasarkan Kardinalitas)',
      'Menghindari Over-Indexing (Dampak terhadap Latency INSERT/UPDATE)',
      'EXPLAIN ANALYZE untuk Validasi Index Scan'
    ],
    explanation: {
      id: 'Index bekerja seperti daftar isi buku. Menambahkan index pada kolom yang sering dicari (WHERE) atau digabungkan (JOIN) mengubah operasi Full Table Scan (O(N)) menjadi Index Scan (O(log N)).',
      en: 'Indexes function like a book catalog. Creating indexes on frequently filtered or joined columns converts sequential table scans into fast B-tree index searches.'
    },
    suggestedAnswer: {
      id: 'Saya menganalisis query yang sering dipanggil dan memilih kolom yang memiliki kardinalitas tinggi pada klausa WHERE dan JOIN. Saya memvalidasi efektivitasnya menggunakan EXPLAIN ANALYZE untuk memastikan database beralih dari Seq Scan ke Index Scan, serta menghindari pembuatan index berlebih agar performa INSERT/UPDATE tetap optimal.',
      en: 'I identify high-frequency queries and index high-cardinality columns used in WHERE and JOIN clauses. I verify with EXPLAIN ANALYZE to ensure Index Scan is utilized, while keeping index count lean to avoid write overhead.'
    },
    codeSnippet: {
      lang: 'sql',
      code: `-- 1. Buat index pada kolom yang sering di-filter
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- 2. Validasi rencana eksekusi query
EXPLAIN ANALYZE 
SELECT id, total_amount, created_at 
FROM orders 
WHERE user_id = 'usr_102' AND status = 'COMPLETED';`
    }
  },
  {
    id: 'db-slow-query-explain',
    role: 'Backend Golang',
    difficulty: 'Middle',
    topic: 'Database',
    categoryLabel: { id: 'Database Optimization', en: 'Database Optimization' },
    context: '2+ Tahun Pengalaman Application Support di PT PLN Icon+',
    question: {
      id: 'Bagaimana langkah terstruktur Anda ketika menerima laporan bahwa aplikasi operasional mengalami perlambatan akibat kendala query database?',
      en: 'What is your structured troubleshooting procedure when investigating operational application slowdowns caused by database queries?'
    },
    keyConcepts: [
      'EXPLAIN ANALYZE',
      'B-Tree & Composite Indexing',
      'Sequential Scan vs Index Scan',
      'Database Connection Pool Saturation'
    ],
    explanation: {
      id: 'Troubleshooting database dilakukan dengan mengekstrak slow query log, menganalisis cost execution plan via EXPLAIN ANALYZE, dan menambahkan indexing pada kolom filter WHERE/JOIN.',
      en: 'Database troubleshooting involves inspecting slow query logs, profiling execution plans with EXPLAIN ANALYZE, and indexing high-cardinality filter columns.'
    },
    suggestedAnswer: {
      id: 'Langkah saya: 1) Tangkap query bermasalah dari slow query log, 2) Jalankan EXPLAIN ANALYZE untuk mendeteksi Full Table Scan, 3) Buat Index B-Tree atau Composite Index pada kolom WHERE dan JOIN, 4) Cek status database connection pool agar koneksi tidak exhaust.',
      en: 'My approach: 1) Locate slow queries via logs, 2) Run EXPLAIN ANALYZE to identify sequential scans, 3) Add B-Tree or composite indexes on WHERE/JOIN clauses, 4) Validate connection pool thresholds.'
    }
  },
  {
    id: 'sql-indexing-composite',
    role: 'Backend Golang',
    difficulty: 'Junior',
    topic: 'SQL',
    categoryLabel: { id: 'SQL Indexing', en: 'SQL Indexing' },
    context: 'E-commerce Order Search Query',
    question: {
      id: 'Bagaimana aturan Leftmost Prefix pada Composite Index di PostgreSQL atau MySQL dan kapan index tersebut tidak terpakai?',
      en: 'How does the Leftmost Prefix rule work for composite indexes in PostgreSQL/MySQL, and when is the index bypassed?'
    },
    keyConcepts: [
      'Composite Index (col1, col2, col3)',
      'Leftmost Prefix Rule',
      'Wildcard Prefix Queries (%keyword)',
      'Index Skip Scan vs Full Scan'
    ],
    explanation: {
      id: 'Composite index pada (A, B, C) hanya dapat digunakan jika klausa WHERE menyertakan kolom paling kiri (A). Jika query hanya memfilter kolom B atau C, index tidak dapat dioptimalkan secara optimal.',
      en: 'A composite index on (A, B, C) is only utilized if the WHERE clause filters by the leftmost column (A). Filtering only B or C ignores the composite index.'
    },
    suggestedAnswer: {
      id: 'Pada composite index (user_id, status, created_at), database hanya menggunakan index jika query memfilter user_id terlebih dahulu. Jika query langsung WHERE status = 1 tanpa user_id, index tidak terpakai (Full Scan). Urutan kolom index harus disesuaikan dengan kolom filter yang paling sering dan memiliki kardinalitas tinggi.',
      en: 'On a composite index (user_id, status, created_at), queries must include user_id to trigger the index. Placing high-cardinality and most frequent filter columns on the left is crucial for query planner efficiency.'
    }
  },

  // ==========================================
  // 3. REST API TOPICS
  // ==========================================
  {
    id: 'api-jwt-rbac-middleware',
    role: 'Backend Golang',
    difficulty: 'Middle',
    topic: 'REST API',
    categoryLabel: { id: 'API Security & Auth', en: 'API Security & Auth' },
    context: 'Autentikasi & Otorisasi API',
    question: {
      id: 'Bagaimana Anda merancang sistem autentikasi JWT dan otorisasi berbasis peran (RBAC) pada layanan RESTful API?',
      en: 'How do you design JWT authentication and Role-Based Access Control (RBAC) middleware in a RESTful API service?'
    },
    keyConcepts: [
      'JWT Claims & Signature Verification',
      'Bcrypt Hashing',
      'Stateless Request Context Injection',
      'Role-Guard Middleware Pipeline'
    ],
    explanation: {
      id: 'JWT memvalidasi identitas user secara stateless tanpa session database, di mana klaim role diperiksa oleh middleware sebelum request mencapai handler bisnis.',
      en: 'JWT provides stateless authentication where role claims are extracted and validated by guard middlewares before requests reach business handlers.'
    },
    suggestedAnswer: {
      id: 'Password di-hash dengan Bcrypt saat registrasi. Saat login, server menerbitkan JWT dengan claims user_id dan role. Middleware mengekstrak token dari header Authorization Bearer, memvalidasi signature, lalu menyuntikkan user context ke request untuk diverifikasi oleh guard role berikutnya (misal: RequireRole("admin")).',
      en: 'Passwords are encrypted with Bcrypt. Upon login, the server issues signed JWT tokens containing user ID and role claims. Middleware intercepts the Authorization header, validates signatures, and injects context for RBAC route guards.'
    }
  },
  {
    id: 'api-idempotency-rest',
    role: 'Backend Golang',
    difficulty: 'Senior',
    topic: 'REST API',
    categoryLabel: { id: 'API Reliability', en: 'API Reliability' },
    context: 'Payment & Order REST API Integration',
    question: {
      id: 'Apa itu Idempotency pada REST API dan bagaimana cara mengimplementasikannya pada endpoint checkout atau pembayaran?',
      en: 'What is API Idempotency and how do you implement it on payment or checkout endpoints to prevent duplicate charges?'
    },
    keyConcepts: [
      'Idempotency Key (UUID header)',
      'Distributed Lock / Redis Cache',
      'Safe Retry Mechanisms',
      'HTTP 409 Conflict vs 200 OK Cached Response'
    ],
    explanation: {
      id: 'Idempotency memastikan bahwa request identik yang dikirim berkali-kali (akibat network retry) hanya menghasilkan efek mutasi satu kali saja pada sistem database.',
      en: 'Idempotency ensures that identical requests submitted multiple times (e.g. network timeouts) execute side-effects exactly once.'
    },
    suggestedAnswer: {
      id: 'Klien menyertakan Idempotency-Key (UUID) di header request. Backend memeriksa key tersebut di Redis dengan atomic SETNX. Jika key sudah ada, server langsung mengembalikan response transaksi sebelumnya tanpa memotong saldo ulang.',
      en: 'Clients include an Idempotency-Key header. The backend checks the key in Redis using SETNX. If already processed, the cached response returns without re-executing checkout logic.'
    }
  },
  {
    id: 'api-rate-limiting-circuit',
    role: 'Backend Golang',
    difficulty: 'Senior',
    topic: 'REST API',
    categoryLabel: { id: 'API Architecture', en: 'API Architecture' },
    context: 'High-Traffic API Gateway Protection',
    question: {
      id: 'Bagaimana Anda menerapkan Rate Limiting (Token Bucket) dan Circuit Breaker pada backend API untuk mencegah server crash akibat lonjakan traffic atau downstream failure?',
      en: 'How do you implement Rate Limiting (Token Bucket) and Circuit Breaker in backend APIs to prevent cascades and overload?'
    },
    keyConcepts: [
      'Token Bucket / Leaky Bucket Algorithm',
      'Redis Distributed Rate Limiter',
      'Circuit Breaker States (Closed, Open, Half-Open)',
      'HTTP 429 Too Many Requests & 503 Service Unavailable'
    ],
    explanation: {
      id: 'Rate limiting membatasi frekuensi request per client IP/user ID menggunakan algoritma Token Bucket, sedangkan Circuit Breaker memutuskan koneksi ke service yang down secara cepat untuk mencegah starvation.',
      en: 'Rate limiting throttles requests per client via Token Bucket algorithms, while Circuit Breakers fail-fast upon downstream failures to avoid thread starvation.'
    },
    suggestedAnswer: {
      id: 'Saya menggunakan Redis dengan algoritma Token Bucket pada layer middleware untuk mengembalikan HTTP 429 jika kuota per menit habis. Untuk panggilan ke third-party payment gateway, saya memasang library Circuit Breaker (seperti sony/gobreaker): jika 5 error beruntun terjadi, circuit menjadi Open dan langsung mengembalikan fallback error tanpa membebani server.',
      en: 'I implement a Redis Token Bucket middleware returning HTTP 429 upon quota breach. For external dependency calls, I wrap clients in a Circuit Breaker (Closed -> Open -> Half-Open) to fail immediately during outages.'
    }
  },

  // ==========================================
  // 4. DOCKER & INFRASTRUCTURE TOPICS
  // ==========================================
  {
    id: 'docker-multi-stage-builds',
    role: 'Backend Golang',
    difficulty: 'Junior',
    topic: 'Docker',
    categoryLabel: { id: 'Containerization', en: 'Containerization' },
    context: 'Production Deployment Dockerization',
    question: {
      id: 'Mengapa Multi-stage Build penting saat membuat Dockerfile untuk aplikasi Go atau Node.js dan bagaimana cara kerjanya?',
      en: 'Why are Multi-stage builds essential when containerizing Go or Node.js applications, and how do they work?'
    },
    keyConcepts: [
      'Multi-Stage Dockerfile',
      'Builder Stage vs Runtime Stage',
      'Minimal Base Images (Alpine/Scratch)',
      'Smaller Image Size & Reduced Attack Surface'
    ],
    explanation: {
      id: 'Multi-stage build memisahkan tahap kompilasi kode (yang membutuhkan compiler berat) dari tahap runtime akhir, menghasilkan container image yang sangat kecil (hanya beberapa MB).',
      en: 'Multi-stage builds decouple build dependencies from the final minimal runtime image, shrinking image sizes from hundreds of MBs down to lightweight binaries.'
    },
    suggestedAnswer: {
      id: 'Stage pertama (Builder) menggunakan image lengkap (golang:alpine) untuk compile binary. Stage kedua (Final) menggunakan image minimal (scratch / alpine) dan hanya menyalin binary yang sudah ter-compile. Hasilnya ukuran image turun drastis dari 800MB menjadi <20MB serta lebih aman dari celah vulnerabilities.',
      en: 'The Builder stage uses full SDK images to compile the binary, while the final stage copies only the compiled executable into a minimal scratch/alpine image, reducing image sizes from ~800MB to <20MB.'
    },
    codeSnippet: {
      lang: 'dockerfile',
      code: `FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o main .

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]`
    }
  },
  {
    id: 'docker-compose-microservices',
    role: 'Backend Golang',
    difficulty: 'Middle',
    topic: 'Docker',
    categoryLabel: { id: 'Docker Orchestration', en: 'Docker Orchestration' },
    context: 'Local Microservice Environment Setup',
    question: {
      id: 'Bagaimana Anda mengonfigurasi Docker Compose untuk menjalankan service Go API, PostgreSQL, Redis, dan Kafka dengan volume persistence dan custom bridge network?',
      en: 'How do you configure Docker Compose to run a Go API, PostgreSQL, Redis, and Kafka with persistent volumes and isolated bridge networking?'
    },
    keyConcepts: [
      'Docker Compose Networks (Bridge)',
      'Named Volumes Persistence',
      'Environment Variables & Secrets',
      'depends_on & Healthchecks'
    ],
    explanation: {
      id: 'Docker Compose menghubungkan berbagai container dalam satu isolated bridge network sehingga container bisa saling memanggil melalui service name DNS lokal.',
      en: 'Docker Compose orchestrates multi-container environments on private bridge networks, resolving dependencies via internal DNS service discovery.'
    },
    suggestedAnswer: {
      id: 'Saya mendefinisikan services di docker-compose.yml, menetapkan custom network backend-net, me-mount named volume postgres_data untuk persistensi database, dan mengatur healthcheck postgres_isready agar Go API menunggu database siap sebelum booting.',
      en: 'I declare services on a dedicated backend bridge network, bind named volumes for PostgreSQL data persistence, and configure depends_on with health checks to ensure relational DBs are ready before API boot.'
    }
  },

  // ==========================================
  // 5. REDIS & CACHING TOPICS
  // ==========================================
  {
    id: 'redis-cache-aside-pattern',
    role: 'Backend Golang',
    difficulty: 'Middle',
    topic: 'Redis',
    categoryLabel: { id: 'Distributed Caching', en: 'Distributed Caching' },
    context: 'E-Commerce Product Catalog High Concurrency',
    question: {
      id: 'Bagaimana cara kerja pola Cache-Aside (Lazy Loading) menggunakan Redis dan bagaimana Anda menangani Cache Invalidation saat data di database berubah?',
      en: 'How does the Cache-Aside pattern work with Redis, and how do you handle cache invalidation when database records are updated?'
    },
    keyConcepts: [
      'Cache-Aside (Lazy Loading)',
      'TTL (Time-To-Live) Expiry',
      'Cache Invalidation on Mutation',
      'Cache Stampede / Thundering Herd Prevention'
    ],
    explanation: {
      id: 'Cache-Aside memeriksa Redis terlebih dahulu. Jika miss, query diambil dari PostgreSQL lalu disimpan ke Redis dengan TTL. Saat ada update data, key Redis dihapus.',
      en: 'Cache-Aside queries Redis first; upon cache misses, it fetches from PostgreSQL and populates Redis with a TTL. Database updates invalidate or purge the cached key.'
    },
    suggestedAnswer: {
      id: 'Saat membaca data, aplikasi mengecek Redis terlebih dahulu (Cache Hit). Jika tidak ada (Cache Miss), ambil dari PostgreSQL, simpan ke Redis dengan TTL (misal 10 menit), lalu kirim ke klien. Saat data di-update di database, hapus key terkait di Redis agar request berikutnya mengambil data terbaru.',
      en: 'Read flows query Redis first. On cache misses, query PostgreSQL, populate Redis with a TTL, and return. When updates occur, explicitly delete the Redis key to force fresh hydration.'
    }
  },
  {
    id: 'redis-distributed-lock',
    role: 'Backend Golang',
    difficulty: 'Senior',
    topic: 'Redis',
    categoryLabel: { id: 'Distributed Systems', en: 'Distributed Systems' },
    context: 'Flash Sale Flash Deals Concurrency',
    question: {
      id: 'Bagaimana cara mengimplementasikan Distributed Lock di Redis (SET resource_name my_random_value NX PX 30000) dan apa potensi resiko yang harus diwaspadai?',
      en: 'How do you implement Distributed Locking in Redis with atomic SET NX PX and what key failure modes must be handled?'
    },
    keyConcepts: [
      'SET NX PX (Atomic Acquire)',
      'Random UUID Owner Value',
      'Lua Script for Safe Release (DEL if owner matches)',
      'Lock Expiration vs Long Running Job'
    ],
    explanation: {
      id: 'Distributed lock mencegah beberapa instance backend mengeksekusi critical section yang sama, dengan pelepasan kunci menggunakan Lua script agar tidak menghapus lock milik worker lain.',
      en: 'Distributed locking coordinates multi-instance microservices on critical sections, requiring atomic release via Lua scripts to prevent deleting locks held by subsequent holders.'
    },
    suggestedAnswer: {
      id: 'Kunci di-acquire dengan SET lock_key unique_uuid NX PX 5000. Untuk melepas kunci, wajib gunakan Lua script yang memverifikasi bahwa unique_uuid sama dengan pemegang kunci sebelum menjalankan DEL, guna mencegah terhapusnya kunci milik worker lain yang baru dibuat jika proses pertama melebihi TTL.',
      en: 'Acquire via SET lock_key uuid NX PX 5000. Release exclusively via Lua script comparing the stored UUID before DEL to ensure you only unlock your own token.'
    }
  },

  // ==========================================
  // 6. KAFKA & MESSAGE BROKERS TOPICS
  // ==========================================
  {
    id: 'kafka-event-driven-architecture',
    role: 'Backend Golang',
    difficulty: 'Senior',
    topic: 'Kafka',
    categoryLabel: { id: 'Event-Driven Systems', en: 'Event-Driven Systems' },
    context: 'Order Processing & Notification Asynchronous Pipelines',
    question: {
      id: 'Bagaimana Anda merancang alur pesan asinkron menggunakan Apache Kafka dan apa strategi untuk memastikan pesan diproses tepat satu kali (At-least-once vs Exactly-once)?',
      en: 'How do you design asynchronous messaging with Apache Kafka and ensure messages are processed reliably without duplicates?'
    },
    keyConcepts: [
      'Topics, Partitions & Consumer Groups',
      'At-Least-Once Delivery & Idempotent Consumers',
      'Kafka Producer Acks (acks=all)',
      'Dead Letter Queue (DLQ)'
    ],
    explanation: {
      id: 'Kafka memisahkan service secara asinkron menggunakan event streaming, di mana consumer memproses event secara idempotent untuk menangani re-delivery pesan duplikat.',
      en: 'Kafka decouples microservices through high-throughput event streaming, requiring consumers to implement idempotency guards against at-least-once duplicate messages.'
    },
    suggestedAnswer: {
      id: 'Producer mem-publish event (misal: OrderCreated) ke Kafka topic dengan acks=all. Consumer di notification service dan inventory service membaca pesan secara independen via Consumer Group. Di sisi consumer, saya mencatat EventID di database/Redis untuk mencegah pemrosesan ganda jika terjadi re-balancing.',
      en: 'Producers publish events (e.g. OrderCreated) with acks=all. Consumers process messages independently in consumer groups and record processed event IDs in storage to guarantee idempotency.'
    }
  },
  {
    id: 'kafka-consumer-lag-dlq',
    role: 'Backend Golang',
    difficulty: 'Middle',
    topic: 'Kafka',
    categoryLabel: { id: 'Message Queues', en: 'Message Queues' },
    context: 'High-Volume Payment Notifications',
    question: {
      id: 'Apa penyebab Consumer Lag pada Kafka dan bagaimana penanganan Dead Letter Queue (DLQ) untuk pesan yang berulang kali gagal diproses (poison pill)?',
      en: 'What causes Kafka Consumer Lag, and how do you design a Dead Letter Queue (DLQ) for poison pill messages?'
    },
    keyConcepts: [
      'Consumer Lag & Processing Latency',
      'Partition Rebalancing',
      'Dead Letter Queue (DLQ Topic)',
      'Exponential Backoff Retries'
    ],
    explanation: {
      id: 'Consumer lag terjadi saat laju produksi pesan lebih cepat daripada kecepatan komputasi consumer. DLQ mengisolasi pesan error fatal agar tidak memblokir antrean pesan lainnya.',
      en: 'Consumer lag emerges when production rates exceed consumer processing throughput. DLQs isolate unprocessable messages, unblocking the main partition pipeline.'
    },
    suggestedAnswer: {
      id: 'Jika consumer gagal memproses pesan setelah 3x retry dengan backoff, pesan diteruskan ke topic DLQ (dead-letter-topic) dan offset di-commit agar partisi tidak terblokir. Tim support/engineer dapat menginvestigasi data poison pill di DLQ secara terpisah tanpa mengganggu antrean live.',
      en: 'After configured retries with backoff, poison messages route to a dedicated DLQ topic, allowing offset commits and uninterrupted processing of remaining partitions.'
    }
  },

  // ==========================================
  // 7. GRPC & RPC PROTOCOLS
  // ==========================================
  {
    id: 'grpc-protobuf-vs-rest',
    role: 'Backend Golang',
    difficulty: 'Middle',
    topic: 'gRPC',
    categoryLabel: { id: 'High-Performance RPC', en: 'High-Performance RPC' },
    context: 'Internal Microservices Communication',
    question: {
      id: 'Apa perbedaan utama antara gRPC (Protocol Buffers) dan REST API (JSON) dan kapan sebaiknya menggunakan gRPC?',
      en: 'What are the primary differences between gRPC (Protocol Buffers) and REST API (JSON), and when should you choose gRPC?'
    },
    keyConcepts: [
      'Protocol Buffers (Binary Serialization)',
      'HTTP/2 Multiplexing & Bidirectional Streaming',
      'Strict Contract-First Schema (.proto)',
      'Lower Latency & CPU Overhead'
    ],
    explanation: {
      id: 'gRPC menggunakan binary protocol buffers di atas HTTP/2 yang jauh lebih cepat dan hemat bandwidth dibanding teks JSON, ideal untuk komunikasi antar-layanan internal (inter-service).',
      en: 'gRPC uses binary Protocol Buffers over HTTP/2, offering lower network latency, streaming support, and strict schema contracts ideal for internal inter-service communication.'
    },
    suggestedAnswer: {
      id: 'gRPC menggunakan format biner Protocol Buffers dan HTTP/2 multiplexing, menjadikannya 5-10x lebih cepat dan hemat payload dibanding REST JSON over HTTP/1.1. gRPC sangat ideal untuk komunikasi internal antar-microservice dengan throughput tinggi, sedangkan REST tetap lebih baik untuk public API yang diakses browser.',
      en: 'gRPC serializes binary Protobuf over HTTP/2, delivering significantly lower latency and payload sizes than REST JSON. It is optimal for internal microservice communication, while REST remains standard for public client APIs.'
    }
  },
  {
    id: 'grpc-interceptors-auth',
    role: 'Backend Golang',
    difficulty: 'Senior',
    topic: 'gRPC',
    categoryLabel: { id: 'gRPC Middleware', en: 'gRPC Middleware' },
    context: 'Internal Auth & Tracing via Metadata',
    question: {
      id: 'Bagaimana Anda menerapkan Unary dan Stream Interceptors pada gRPC Go untuk keperluan request logging, distributed tracing (OpenTelemetry), dan autentikasi token?',
      en: 'How do you implement gRPC Unary and Stream Interceptors in Go for request logging, OpenTelemetry tracing, and metadata authentication?'
    },
    keyConcepts: [
      'UnaryServerInterceptor & StreamServerInterceptor',
      'gRPC Metadata Context (metadata.MD)',
      'Status Codes (codes.Unauthenticated)',
      'OpenTelemetry Context Propagation'
    ],
    explanation: {
      id: 'Interceptor di gRPC bertindak seperti middleware di REST HTTP, mengekstrak metadata headers untuk memvalidasi auth token atau menyuntikkan trace context.',
      en: 'gRPC interceptors provide middleware capabilities, parsing metadata headers for authentication, OpenTelemetry span extraction, and structured logging.'
    },
    suggestedAnswer: {
      id: 'Saya membuat UnaryServerInterceptor yang membaca metadata dari ctx. Jika authorization token tidak ada atau invalid, kembalikan status.Errorf(codes.Unauthenticated). Untuk tracing, interceptor mengekstrak traceparent ID dan menyuntikkannya ke context span OpenTelemetry.',
      en: 'I construct a UnaryServerInterceptor extracting incoming metadata from context, returning codes.Unauthenticated if claims fail. For distributed tracing, it injects trace IDs into OpenTelemetry spans.'
    }
  },

  // ==========================================
  // 8. SYSTEM DESIGN TOPICS
  // ==========================================
  {
    id: 'sys-design-database-scaling',
    role: 'Backend Golang',
    difficulty: 'Senior',
    topic: 'System Design',
    categoryLabel: { id: 'System Architecture', en: 'System Architecture' },
    context: 'High-Traffic Scaling & Read/Write Splitting',
    question: {
      id: 'Bagaimana strategi Anda dalam menskalakan database relasional ketika beban baca (Read) dan tulis (Write) melonjak tinggi?',
      en: 'How do you scale a relational database architecture under high concurrent Read and Write traffic?'
    },
    keyConcepts: [
      'Read/Write Splitting (Primary-Replica)',
      'Database Sharding & Partitioning',
      'Connection Pooling (PgBouncer)',
      'Distributed Caching (Redis)'
    ],
    explanation: {
      id: 'Skalabilitas database dicapai dengan memisahkan transaksi tulis ke Primary Database dan mengalirkan query baca ke Read Replicas, dipadukan dengan caching Redis di depannya.',
      en: 'Database scaling involves routing write transactions to a primary node and balancing read queries across replicas, buffered by an upstream Redis cache.'
    },
    suggestedAnswer: {
      id: 'Strategi bertahap: 1) Pasang Redis caching di depan untuk mengurangi 80% beban read query, 2) Terapkan Read/Write Splitting (Master untuk INSERT/UPDATE, Read Replicas untuk SELECT), 3) Gunakan connection pooler seperti PgBouncer, 4) Terapkan table partitioning atau database sharding berdasarkan UserID jika data mencapai puluhan juta baris.',
      en: 'Layered strategy: 1) Cache high-read queries in Redis, 2) Implement Primary-Replica splitting (Write on Primary, Read on Replicas), 3) Deploy PgBouncer connection pooling, 4) Apply horizontal sharding by UserID for extreme volume.'
    }
  },
  {
    id: 'sys-design-url-shortener',
    role: 'Fullstack',
    difficulty: 'Middle',
    topic: 'System Design',
    categoryLabel: { id: 'System Design Interview', en: 'System Design Interview' },
    context: 'High Scale URL Shortener (Bitly-like system)',
    question: {
      id: 'Bagaimana Anda merancang arsitektur URL Shortener (seperti Bitly) yang mampu menangani 100 juta URL dengan latency pengalihan < 20ms?',
      en: 'How would you architect a high-scale URL Shortener (e.g. Bitly) handling 100M URLs with redirection latency < 20ms?'
    },
    keyConcepts: [
      'Base62 Encoding vs MD5/SHA256 Hash',
      'Distributed ID Generator (Snowflake)',
      'Redis Cache for High Read Redirections',
      'HTTP 301 Permanent vs 302 Temporary Redirect'
    ],
    explanation: {
      id: 'URL shortener menggunakan distributed ID generator untuk menghasilkan angka integer unik 64-bit yang kemudian di-encode ke Base62, dengan cache Redis untuk melayani redirect dalam hitungan milidetik.',
      en: 'URL shorteners generate unique numeric IDs encoded to Base62 strings, utilizing in-memory Redis caches to deliver sub-20ms HTTP 302 redirects.'
    },
    suggestedAnswer: {
      id: '1) ID Generation: Gunakan distributed ID generator (Snowflake) lalu convert integer ke Base62 (7 karakter = 3.5 triliun kombinasi). 2) Storage: Simpan mapping di PostgreSQL dengan index unik pada short_code. 3) Caching: Simpan top 20% link terpopuler di Redis. 4) Routing: Gunakan HTTP 302 Found jika butuh analytics klik real-time, atau 301 untuk caching browser penuh.',
      en: '1) Generate unique IDs with Snowflake, encoded to Base62. 2) Store in PostgreSQL indexed by short_code. 3) Cache active keys in Redis for lightning redirects. 4) Serve HTTP 302 for click analytics tracking.'
    }
  },

  // ==========================================
  // 9. BACKEND JAVA (SPRING BOOT)
  // ==========================================
  {
    id: 'java-spring-security-jwt',
    role: 'Backend Java',
    difficulty: 'Middle',
    topic: 'REST API',
    categoryLabel: { id: 'Java Spring Boot', en: 'Java Spring Boot' },
    context: 'AliExpress Clone (Java 17 & Spring Boot 3)',
    question: {
      id: 'Bagaimana cara kerja Spring Security Filter Chain dalam memproses autentikasi JWT pada aplikasi Spring Boot 3?',
      en: 'How does the Spring Security Filter Chain process JWT authentication in a Spring Boot 3 application?'
    },
    keyConcepts: [
      'SecurityFilterChain Bean',
      'OncePerRequestFilter',
      'UsernamePasswordAuthenticationToken',
      'SecurityContextHolder'
    ],
    explanation: {
      id: 'Spring Security memproses request melalui OncePerRequestFilter kustom yang memvalidasi header JWT dan menaruh token autentikasi ke SecurityContextHolder.',
      en: 'Spring Security intercepts requests through a custom OncePerRequestFilter that parses JWT claims and registers authentication in the SecurityContextHolder.'
    },
    suggestedAnswer: {
      id: 'Saya membuat custom filter yang mewarisi OncePerRequestFilter. Filter ini mengekstrak Bearer token dari header, memverifikasi tanda tangan JWT, mengekstrak user details, dan menyimpannya ke SecurityContextHolder.getContext().setAuthentication(). Dengan demikian, endpoint terlindungi secara deklaratif menggunakan anotasi @PreAuthorize.',
      en: 'I implement a custom OncePerRequestFilter that extracts Bearer tokens, validates JWT claims, and registers authenticated principals into SecurityContextHolder for declarative @PreAuthorize authorization.'
    }
  },
  {
    id: 'java-hibernate-n-plus-1',
    role: 'Backend Java',
    difficulty: 'Senior',
    topic: 'Database',
    categoryLabel: { id: 'Hibernate & JPA', en: 'Hibernate & JPA' },
    context: 'Enterprise JPA Performance Optimization',
    question: {
      id: 'Apa itu masalah N+1 Query pada Hibernate/Spring Data JPA dan bagaimana teknik terbaik untuk memperbaikinya (JOIN FETCH vs @EntityGraph)?',
      en: 'What is the N+1 Query problem in Spring Data JPA and what are the best strategies to resolve it (JOIN FETCH vs @EntityGraph)?'
    },
    keyConcepts: [
      'N+1 Query Problem',
      'JOIN FETCH in JPQL',
      '@EntityGraph Annotation',
      'FetchType.LAZY vs EAGER'
    ],
    explanation: {
      id: 'Masalah N+1 terjadi ketika query 1 record parent memicu N query tambahan untuk mengambil data relasi child. Solusinya adalah JOIN FETCH atau @EntityGraph untuk mengambilnya dalam satu SQL query.',
      en: 'The N+1 problem occurs when fetching 1 parent collection triggers N separate child select queries. Mitigate via JPQL JOIN FETCH or @EntityGraph eager join fetching.'
    },
    suggestedAnswer: {
      id: 'Selalu set relasi ke FetchType.LAZY secara default. Untuk query yang membutuhkan data relasi, gunakan JOIN FETCH di query JPQL kustom atau pasang anotasi @EntityGraph(attributePaths = {"orders"}) pada repository method agar Hibernate melakukan single SQL JOIN query.',
      en: 'Default all associations to FetchType.LAZY. When relational data is needed, use JPQL JOIN FETCH or @EntityGraph(attributePaths = {"relations"}) to enforce single SQL join execution.'
    }
  },

  // ==========================================
  // 10. FRONTEND & FULLSTACK TOPICS
  // ==========================================
  {
    id: 'frontend-react-optimistic-ui',
    role: 'Frontend',
    difficulty: 'Middle',
    topic: 'REST API',
    categoryLabel: { id: 'Frontend State', en: 'Frontend State' },
    context: 'React & Next.js Shopping Cart',
    question: {
      id: 'Bagaimana Anda menerapkan Optimistic UI Update pada keranjang belanja React dan menangani error rollback saat API gagal?',
      en: 'How do you implement Optimistic UI updates on a React shopping cart and handle state rollback upon API errors?'
    },
    keyConcepts: [
      'Optimistic State Update',
      'Rollback on Error Catch',
      'Toast Feedback Notification',
      'React useTransition'
    ],
    explanation: {
      id: 'Optimistic UI langsung memperbarui tampilan antarmuka sebelum request network selesai, dan segera mengembalikan state ke kondisi awal jika backend merespons error.',
      en: 'Optimistic UI updates local state immediately before network resolution, restoring the previous snapshot if the backend rejects the request.'
    },
    suggestedAnswer: {
      id: 'State keranjang lokal langsung diubah seketika saat tombol ditekan sambil menyimpan snapshot state sebelumnya. Jika request REST API mengembalikan error (misal: 409 Conflict / stok habis), aplikasi me-restore snapshot sebelumnya dan menampilkan notifikasi kesalahan.',
      en: 'Mutate local cart state instantly while retaining a prior snapshot. If the API returns an error (e.g. 409 stock exhausted), revert state to the snapshot and display a toast alert.'
    }
  },
  {
    id: 'fullstack-nextjs-rsc-client',
    role: 'Fullstack',
    difficulty: 'Senior',
    topic: 'REST API',
    categoryLabel: { id: 'Next.js App Router', en: 'Next.js App Router' },
    context: 'SSR & Client Interactivity in Next.js 14+',
    question: {
      id: 'Kapan harus menggunakan React Server Components (RSC) vs Client Components ("use client") di Next.js App Router dan bagaimana cara melempar data antar-keduanya secara efisien?',
      en: 'When should you use React Server Components (RSC) vs Client Components ("use client") in Next.js App Router, and how do you pass data efficiently?'
    },
    keyConcepts: [
      'React Server Components (RSC)',
      'Client Components ("use client")',
      'Zero Bundle Size & Direct DB Fetch',
      'Interactivity (useState/useEffect/onClick)'
    ],
    explanation: {
      id: 'RSC dieksekusi di server untuk fetch data cepat tanpa menambah bundle JS browser, sedangkan Client Components dipakai untuk elemen interaktif seperti event click dan state form.',
      en: 'RSC executes on the server for zero client bundle overhead and secure direct fetching, while Client Components handle user event listeners and interactive state.'
    },
    suggestedAnswer: {
      id: 'Gunakan Server Component secara default untuk layout, halaman data fetching, dan SEO (zero bundle size). Tandai dengan "use client" hanya pada sub-komponen interaktif (seperti modal, form input, audio player). Data dioper dari Server Component ke Client Component melalui serializable Props.',
      en: 'Default to Server Components for SSR layouts and data fetching. Restrict "use client" to leaf components requiring interactive state or browser APIs, passing data down via serializable props.'
    }
  }
];

export const technicalCheatSheet = [
  {
    topic: 'Go Clean Architecture Layers',
    points: [
      'Domain: Entity struct murni & interface kontrak (Zero dependency).',
      'Usecase: Business logic aturan aplikasi (Bergantung hanya pada domain interface).',
      'Repository: Implementasi akses database PostgreSQL/GORM/SQLx.',
      'Delivery/Handler: HTTP routing (Fiber/Gin), serialization JSON, dan HTTP status code.'
    ]
  },
  {
    topic: 'Database Indexing & Query Tuning',
    points: [
      'B-Tree Index: Mempercepat filter klausa WHERE dan penggabungan tabel JOIN.',
      'Composite Index: Mengurutkan kolom index berdasarkan frekuensi dan selektivitas (kardinalitas).',
      'EXPLAIN ANALYZE: Alat diagnosis utama untuk menemukan bottleneck dan full table scan.',
      'Menghindari N+1 Query: Menggunakan eager loading (Preload/JOIN) daripada query per loop.',
      'Menghindari Over-Indexing: Batasi index hanya pada kolom krusial agar operasi INSERT/UPDATE tetap cepat.'
    ]
  },
  {
    topic: 'Database Troubleshooting (PLN Icon+ Style)',
    points: [
      'EXPLAIN ANALYZE: Deteksi Seq Scan vs Index Scan pada tabel besar.',
      'Index Types: B-Tree untuk equality & range queries, Composite Index untuk filter multi-kolom.',
      'Connection Pooling: Atur MaxOpenConns, MaxIdleConns, dan ConnMaxLifetime agar koneksi tidak exhaust.',
      'Slow Query Logs: Selalu log query dengan eksekusi > 200ms untuk optimasi rutin.'
    ]
  },
  {
    topic: 'STAR Method Quick Formula',
    points: [
      'S - Situation: Konteks masalah / lingkungan kerja nyata.',
      'T - Task: Tanggung jawab atau target yang harus diselesaikan.',
      'A - Action: Langkah teknis spesifik yang ANDA lakukan.',
      'R - Result: Hasil terukur (latency turun, SLA tercapai, nol data rusak).'
    ]
  }
];
