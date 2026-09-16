export type InterviewCategory = 'backend-go' | 'app-support' | 'fullstack-react' | 'behavioral-hr';
export type InterviewDifficulty = 'Fundamental' | 'Intermediate' | 'Advanced';

export interface StarStructure {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  categoryLabel: { id: string; en: string };
  difficulty: InterviewDifficulty;
  context: string;
  question: { id: string; en: string };
  keyConcepts: string[];
  starAnswer?: { id: StarStructure; en: StarStructure };
  modelAnswer: { id: string; en: string };
  interviewerInsight: { id: string; en: string };
  codeSnippet?: {
    lang: string;
    code: string;
  };
}

export const interviewQuestions: InterviewQuestion[] = [
  // ==========================================
  // 1. BACKEND & GO (GOLANG)
  // ==========================================
  {
    id: 'go-clean-architecture',
    category: 'backend-go',
    categoryLabel: { id: 'Go & Backend', en: 'Go & Backend' },
    difficulty: 'Intermediate',
    context: 'Proyek Go Clean Architecture REST API',
    question: {
      id: 'Bagaimana Anda menerapkan Clean Architecture pada proyek Go dan apa manfaat utamanya dibandingkan struktur monolith biasa?',
      en: 'How do you implement Clean Architecture in a Go project, and what are its main advantages over a conventional monolithic structure?'
    },
    keyConcepts: [
      'Domain Layer (Entities & Interfaces)',
      'Usecase Layer (Business Logic)',
      'Repository Layer (Database Implementation)',
      'Delivery/Handler (HTTP Router & Serializer)',
      'Dependency Inversion & Mock Testing'
    ],
    starAnswer: {
      id: {
        situation: 'Saat membangun REST API dengan Go, saya membutuhkan struktur yang modular, mudah diuji (unit test), dan tidak terikat ketat pada database maupun framework routing tertentu.',
        task: 'Merancang arsitektur 4-layer (Domain, Usecase, Repository, Delivery) dengan Dependency Inversion Principle.',
        action: 'Saya mendefinisikan interface entity di layer Domain. Layer Usecase memegang business rules tanpa tahu apakah database menggunakan PostgreSQL atau SQLite. Layer Repository mengimplementasikan interface DB, dan Delivery (Fiber/Gin) hanya bertugas mem-parsing HTTP request dan memanggil usecase.',
        result: 'Struktur kode menjadi sangat decoupled, mudah dibuatkan mock test tanpa database fisik, dan penggantian komponen eksternal tidak merusak domain inti.'
      },
      en: {
        situation: 'When building Go REST APIs, I needed a modular architecture that supports mockable unit testing and decouples domain logic from frameworks and database drivers.',
        task: 'Designed a 4-layer Clean Architecture (Domain, Usecase, Repository, Delivery) using Dependency Inversion.',
        action: 'Defined core interfaces in the Domain layer. The Usecase layer executes business rules independently of the database driver. The Repository layer implements database operations via interfaces, and the Delivery layer (Fiber/Gin) handles HTTP serialization and error routing.',
        result: 'Achieved high testability, clean boundary isolation, and zero coupling between core business rules and third-party libraries.'
      }
    },
    modelAnswer: {
      id: 'Saya menerapkan Clean Architecture dengan membagi aplikasi ke 4 layer: 1) Domain (Entity & Interface kontrak), 2) Usecase (Logika bisnis utama), 3) Repository (Akses database relasional PostgreSQL), dan 4) Delivery (HTTP Handler / Router). Keuntungan utamanya adalah Dependency Inversion: layer dalam tidak bergantung pada layer luar, sehingga saat database atau framework HTTP diganti, business logic tetap utuh dan sangat mudah diuji menggunakan mock testing.',
      en: 'I structure Clean Architecture into 4 decoupled layers: Domain, Usecase, Repository, and Delivery. Its greatest benefit is Dependency Inversion—the inner business logic has zero direct dependencies on external databases or HTTP routers, making unit testing with mocks fast and reliable.'
    },
    interviewerInsight: {
      id: 'Pewawancara ingin melihat pemahaman Anda tentang Dependency Inversion, pemisahan tanggung jawab (SoC), dan bagaimana Anda menjaga kode tetap mudah di-maintain.',
      en: 'The interviewer wants to assess your understanding of Dependency Inversion, Separation of Concerns, and maintainable software architecture.'
    },
    codeSnippet: {
      lang: 'go',
      code: `// Domain Interface Contract
type ArticleRepository interface {
    GetByID(ctx context.Context, id int64) (*domain.Article, error)
    Store(ctx context.Context, a *domain.Article) error
}

type ArticleUsecase interface {
    GetByID(ctx context.Context, id int64) (*domain.Article, error)
}`
    }
  },
  {
    id: 'go-database-transactions',
    category: 'backend-go',
    categoryLabel: { id: 'Go & Backend', en: 'Go & Backend' },
    difficulty: 'Advanced',
    context: 'Proyek Go Banking Core & Tokopedia Marketplace Checkout',
    question: {
      id: 'Bagaimana Anda menangani transaksi database yang aman (ACID) dan mencegah race condition saat pengurangan stok atau transfer saldo di Go?',
      en: 'How do you handle ACID-compliant database transactions and prevent race conditions during stock decrements or balance transfers in Go?'
    },
    keyConcepts: [
      'ACID Transactions (tx.Begin, tx.Commit, tx.Rollback)',
      'Row-Level Locking (SELECT FOR UPDATE)',
      'Optimistic vs Pessimistic Locking',
      'Database Connection Pooling'
    ],
    starAnswer: {
      id: {
        situation: 'Pada proyek e-commerce dan banking core engine, checkout massal atau transfer saldo rentan terhadap masalah race condition dan saldo negatif jika dua request diproses bersamaan.',
        task: 'Memastikan transaksi checkout dan transfer dana berjalan secara atomik dan konsisten tanpa resiko double-spending.',
        action: 'Saya mengimplementasikan database transaction menggunakan GORM/pgx dengan blok `tx.Begin()`, `defer rollback on panic/error`, dan eksekusi row-level lock (`SELECT ... FOR UPDATE`) pada record akun/produk yang sedang diubah sebelum melakukan update saldo.',
        result: 'Sistem berhasil mempertahankan konsistensi data (ACID), mencegah saldo negatif, dan mencatat audit log mutasi dengan aman.'
      },
      en: {
        situation: 'In e-commerce checkout and banking transfer engines, simultaneous requests can trigger race conditions and negative inventory or balance issues.',
        task: 'Ensure all financial transfers and stock reductions are strictly atomic and consistent without double-spending risks.',
        action: 'Enforced explicit database transactions using GORM/pgx with `tx.Begin()`, deferred rollbacks on error, and row-level locking (`SELECT FOR UPDATE`) on target records before performing arithmetic updates.',
        result: 'Guaranteed complete ACID compliance, eliminated race conditions under concurrent requests, and ensured accurate transaction audit logs.'
      }
    },
    modelAnswer: {
      id: 'Untuk menjamin ACID, saya membungkus seluruh query dalam satu database transaction (tx). Saya menerapkan pessimistic row-level locking (`SELECT ... FOR UPDATE`) pada baris produk/rekening target untuk mengunci record selama transaksi berlangsung. Jika terjadi kegagalan atau stok tidak mencukupi, fungsi otomatis memanggil `tx.Rollback()` dan mengembalikan HTTP error yang sesuai.',
      en: 'To enforce ACID guarantees, I wrap the operations inside a database transaction (`tx.Begin`). I apply pessimistic row-level locking (`SELECT ... FOR UPDATE`) on target account/inventory rows during execution. If any condition fails, a deferred rollback executes immediately, preventing partial updates.'
    },
    interviewerInsight: {
      id: 'Poin kritis yang dinilai adalah pemahaman penanganan error, rollback yang aman jika terjadi panic, dan pemilihan locking strategy untuk concurrency.',
      en: 'The interviewer evaluates your understanding of error handling, safe rollback mechanisms, and concurrency locking strategies.'
    },
    codeSnippet: {
      lang: 'go',
      code: `// Atomic transaction with rollback and stock check
tx := db.Begin()
defer func() {
    if r := recover(); r != nil { tx.Rollback() }
}()

res := tx.Model(&Product{}).
    Where("id = ? AND stock >= ?", productID, qty).
    Update("stock", gorm.Expr("stock - ?", qty))

if res.RowsAffected == 0 {
    tx.Rollback()
    return errors.New("insufficient stock or concurrent modification")
}
return tx.Commit().Error`
    }
  },
  {
    id: 'go-goroutines-concurrency',
    category: 'backend-go',
    categoryLabel: { id: 'Go & Backend', en: 'Go & Backend' },
    difficulty: 'Intermediate',
    context: 'Go Concurrency & Async Processing',
    question: {
      id: 'Kapan sebaiknya menggunakan Goroutine dan bagaimana cara mencegah memory leak atau race condition saat bekerja dengan Concurrency di Go?',
      en: 'When should you use Goroutines, and how do you prevent memory leaks or race conditions when handling concurrency in Go?'
    },
    keyConcepts: [
      'Goroutines & Channels',
      'sync.WaitGroup & sync.Mutex',
      'Context Cancellation (context.WithTimeout)',
      'Worker Pool Pattern'
    ],
    starAnswer: {
      id: {
        situation: 'Dalam backend service, ada tugas-tugas non-blocking seperti pengiriman email notifikasi, audit logging, atau fetching data paralel dari beberapa API pihak ketiga.',
        task: 'Mengeksekusi proses paralel dengan cepat tanpa memblokir response HTTP utama dan tanpa menghabiskan resource server.',
        action: 'Saya menggunakan Goroutine dipadukan dengan `sync.WaitGroup` untuk sinkronisasi, `sync.Mutex` atau channel untuk komunikasi data antar-thread, serta `context.WithTimeout` untuk membatasi durasi eksekusi goroutine agar tidak menggantung selamanya.',
        result: 'Response time HTTP berkurang drastis dan server tetap stabil tanpa goroutine leak.'
      },
      en: {
        situation: 'In backend systems, non-blocking tasks like sending confirmation emails, audit logs, or concurrent third-party requests should not delay the primary HTTP response.',
        task: 'Execute background tasks concurrently while maintaining safe resource limits and predictable lifecycle control.',
        action: 'Leveraged Goroutines with `sync.WaitGroup`, buffered channels, and `context.WithTimeout` to guarantee clean termination and prevent leaked background routines.',
        result: 'Dramatically reduced HTTP endpoint response latencies while maintaining zero goroutine leaks and safe memory usage.'
      }
    },
    modelAnswer: {
      id: 'Goroutine sangat ideal untuk I/O-bound tasks atau background jobs paralel. Untuk mencegah memory leak, jangan pernah memulai goroutine tanpa mekanisme penghentian yang jelas—selalu sertakan `context.Context` dengan timeout atau channel `done`. Untuk mencegah race condition, gunakan channel untuk passing data ("share memory by communicating") atau gunakan `sync.RWMutex` saat mengakses shared state.',
      en: 'Goroutines are best for parallel I/O and background workers. To avoid leaks, never launch a goroutine without a clear termination signal (using `context.WithTimeout` or a `done` channel). For data safety, adhere to Go’s philosophy: "Do not communicate by sharing memory; instead, share memory by communicating" via channels or `sync.RWMutex`.'
    },
    interviewerInsight: {
      id: 'Pewawancara ingin memastikan Anda tidak asal membuat `go func()` liar tanpa memikirkan lifecycle, context timeout, dan channel buffer.',
      en: 'Interviewers look for mature lifecycle management rather than careless `go func()` invocations without context limits.'
    }
  },
  {
    id: 'go-jwt-auth-middleware',
    category: 'backend-go',
    categoryLabel: { id: 'Go & Backend', en: 'Go & Backend' },
    difficulty: 'Intermediate',
    context: 'Proyek Tokopedia Backend & Bun-Hono API',
    question: {
      id: 'Bagaimana Anda merancang sistem autentikasi JWT dan otorisasi berbasis peran (Role-Based Access Control / RBAC) di backend Go?',
      en: 'How do you design JWT authentication and Role-Based Access Control (RBAC) middleware in a Go backend service?'
    },
    keyConcepts: [
      'JWT Signing & Claims Parsing (golang-jwt)',
      'Bcrypt Password Hashing',
      'HTTP Middleware Handler',
      'Context Request Value Propagation',
      'Token Expiration & Refresh Strategy'
    ],
    starAnswer: {
      id: {
        situation: 'Aplikasi e-commerce memerlukan pemisahan hak akses antara akun Customer (membeli, checkout) dan Admin (mengelola produk, melihat analitik).',
        task: 'Membangun middleware autentikasi dan RBAC yang aman, stateless, dan dapat digunakan di semua route endpoint.',
        action: 'Saat login, password diverifikasi dengan `bcrypt.CompareHashAndPassword`. Jika valid, server meng-generate JWT token dengan claims ID dan Role. Saya membuat middleware Go yang mengekstrak header `Authorization: Bearer <token>`, memvalidasi signature dengan secret key, lalu memasukkan claims ke `c.Request.Context()` / `c.Locals()` untuk dicek oleh middleware RBAC berikutnya.',
        result: 'Hak akses endpoint terlindungi secara ketat, route admin tidak bisa diakses user biasa, dan sistem tetap stateless tanpa query session berulang.'
      },
      en: {
        situation: 'An e-commerce API requires strict role segregation between Customer routes (checkout, cart) and Admin routes (inventory update, analytics).',
        task: 'Implement secure, stateless JWT authentication and RBAC authorization middleware reusable across route groups.',
        action: 'Verified passwords with bcrypt and signed JWT tokens with claims (UserID, Role). Engineered a custom Go middleware that validates Bearer tokens, decrypts claims, and injects user identity into the request context before forwarding to role-guard middlewares.',
        result: 'Protected API endpoints with sub-millisecond overhead and completely eliminated unauthorized route access.'
      }
    },
    modelAnswer: {
      id: 'Saya mengimplementasikan JWT dengan: 1) Hashing password menggunakan Bcrypt saat registrasi, 2) Men-generate token dengan expiration time dan custom claims (user_id, role), 3) Membuat middleware JWT yang memeriksa header Authorization Bearer, 4) Menyimpan claims ke dalam Context request, 5) Membuat middleware RBAC (misal: `RequireRole("admin")`) yang menolak request dengan status 403 Forbidden jika role tidak sesuai.',
      en: 'I structure JWT by hashing passwords with Bcrypt, generating signed tokens with user ID and role claims, and routing requests through a JWT middleware that extracts and validates the token. The validated claims are injected into the request context, allowing subsequent RBAC guards (like `RequireRole("admin")`) to block unauthorized access with 403 Forbidden.'
    },
    interviewerInsight: {
      id: 'Pewawancara menilai pemahaman Anda seputar keamanan token, pencegahan penyimpanan password plaintext, dan pemanfaatan middleware pipeline.',
      en: 'Evaluates your security fundamentals, stateless authorization mechanics, and middleware pipeline design in Go.'
    }
  },

  // ==========================================
  // 2. APPLICATION SUPPORT & DATABASE (PLN ICON+)
  // ==========================================
  {
    id: 'app-support-slow-queries',
    category: 'app-support',
    categoryLabel: { id: 'App Support & Database', en: 'App Support & Database' },
    difficulty: 'Intermediate',
    context: '2+ Tahun Pengalaman Application Support di PT PLN Icon+',
    question: {
      id: 'Bagaimana langkah terstruktur Anda ketika menerima laporan bahwa aplikasi operasional mengalami perlambatan akibat kendala query database?',
      en: 'What is your structured troubleshooting procedure when receiving reports of operational application slowdowns caused by database query bottlenecks?'
    },
    keyConcepts: [
      'Query Execution Plan (EXPLAIN ANALYZE)',
      'Table Indexing (B-Tree, Composite Indexes)',
      'Database Connection Pool Saturation',
      'Slow Query Logs & Incident Documentation'
    ],
    starAnswer: {
      id: {
        situation: 'Di PT PLN Icon+, sistem operasional terkadang mengalami lonjakan waktu respon (latency) pada jam sibuk saat pengguna mengeksekusi laporan atau transaksi harian.',
        task: 'Mendiagnosis akar masalah perlambatan, memulihkan performa layanan, dan memberikan rekomendasi teknis kepada tim engineering.',
        action: 'Pertama, saya memeriksa log aplikasi dan slow query log di PostgreSQL/Oracle. Kedua, saya menjalankan `EXPLAIN ANALYZE` pada query terkait untuk mendeteksi Full Table Scan vs Index Scan. Ketiga, saya mengecek status connection pool dan lock contention. Terakhir, saya membuat indexing rekomendasi dan berkoordinasi dengan developer.',
        result: 'Waktu eksekusi query berkurang signifikan dan alur operasional kembali berjalan dalam batas SLA resmi.'
      },
      en: {
        situation: 'At PT PLN Icon+, operational systems experienced peak-hour latency spikes during heavy daily transaction reporting.',
        task: 'Diagnose the root cause of the slowdown, restore SLA performance, and document actionable fixes for the development team.',
        action: 'Inspected application error logs and slow query logs. Executed `EXPLAIN ANALYZE` to identify sequential scans versus index scans. Verified database connection pool saturation and table lock states, then formulated indexing and query restructuring recommendations.',
        result: 'Drastically reduced query execution time, resolved latency bottlenecks, and restored normal operational SLA.'
      }
    },
    modelAnswer: {
      id: 'Langkah saya: 1) Identifikasi query spesifik dari slow log atau metrik APM, 2) Jalankan `EXPLAIN ANALYZE` untuk melihat apakah ada Seq Scan pada tabel berukuran jutaan baris, 3) Cek apakah kolom filter (WHERE, JOIN, ORDER BY) memiliki Index B-Tree atau composite index yang sesuai, 4) Periksa apakah connection pool habis (exhausted), 5) Dokumentasikan hasil investigasi dan solusi ke tiket pelaporan engineering.',
      en: 'My approach: 1) Identify the problematic query via slow query logs or APM metrics, 2) Run `EXPLAIN ANALYZE` to pinpoint sequential scans or costly nested loops, 3) Verify if WHERE, JOIN, and ORDER BY clauses have matching B-Tree or composite indexes, 4) Check for connection pool exhaustion, and 5) Document findings and collaborate with developers on the patch.'
    },
    interviewerInsight: {
      id: 'Menunjukkan pengalaman nyata dalam troubleshooting data di lingkungan enterprise dan pemahaman mendalam tentang relasional database.',
      en: 'Demonstrates authentic enterprise troubleshooting experience and practical relational database query optimization knowledge.'
    }
  },
  {
    id: 'app-support-incident-handling',
    category: 'app-support',
    categoryLabel: { id: 'App Support & Database', en: 'App Support & Database' },
    difficulty: 'Intermediate',
    context: 'Incident Response & SLA Management di PT PLN Icon+',
    question: {
      id: 'Bagaimana Anda menangani insiden sistem kritis di mana aplikasi operasional down atau mengalami anomali data di jam kerja?',
      en: 'How do you handle a critical production incident where an operational system goes down or exhibits data anomalies during business hours?'
    },
    keyConcepts: [
      'Incident Triage & Severity Classification',
      'System Health Checks & Log Isolation',
      'SLA Timelines & Stakeholder Communication',
      'Post-Mortem & Preventative Documentation'
    ],
    starAnswer: {
      id: {
        situation: 'Terjadi anomali pada sistem di mana pengguna tidak dapat melakukan pemrosesan data operasional harian.',
        task: 'Melakukan mitigasi darurat dalam target waktu SLA, menstabilkan layanan, dan mencari root cause.',
        action: 'Saya mengisolasi log error terkini di server, memverifikasi status koneksi service ke database, mengeksekusi data validation check, dan segera berkoordinasi secara terstruktur dengan tim developer untuk menerapkan hotfix darurat.',
        result: 'Layanan operasional berhasil dipulihkan dalam batas waktu SLA dan prosedur preventif didokumentasikan untuk mencegah insiden berulang.'
      },
      en: {
        situation: 'An operational incident occurred where end-users were blocked from executing daily transactions.',
        task: 'Execute immediate triage within SLA targets, restore service stability, and determine the exact root cause.',
        action: 'Isolated recent error stack traces, verified microservice-to-database connection states, executed data integrity checks, and collaborated closely with engineering teams to deploy hotfixes.',
        result: 'Restored service well within SLA limits and established preventative operational documentation to prevent recurrence.'
      }
    },
    modelAnswer: {
      id: 'Prioritas utama adalah mitigasi cepat untuk meminimalkan dampak operasional: cek healthcheck service, isolasi log error terbaru, dan verifikasi status database. Setelah sistem pulih, saya melakukan investigasi mendalam terhadap root cause, mencatat timeline insiden, dan menyusun laporan post-mortem agar celah yang sama tidak terulang.',
      en: 'The top priority is rapid mitigation to minimize operational downtime: check service health status, isolate error logs, and verify database integrity. Once stable, conduct root cause analysis, log the incident timeline, and formulate post-mortem documentation.'
    },
    interviewerInsight: {
      id: 'Pewawancara ingin melihat ketenangan Anda di bawah tekanan dan metode sistematis dalam menangani masalah produksi.',
      en: 'The interviewer wants to see your composure under pressure and structured problem-solving methodology in production environments.'
    }
  },

  // ==========================================
  // 3. FULLSTACK & FRONTEND (REACT / NEXT.JS)
  // ==========================================
  {
    id: 'fullstack-optimistic-ui',
    category: 'fullstack-react',
    categoryLabel: { id: 'Fullstack & React', en: 'Fullstack & React' },
    difficulty: 'Intermediate',
    context: 'Proyek Tokopedia Marketplace & BayE Next.js',
    question: {
      id: 'Bagaimana Anda merancang komunikasi antara Frontend React dan Backend Go agar pengalaman belanja terasa instan namun data tetap sinkron?',
      en: 'How do you design communication between a React frontend and Go backend to deliver instantaneous shopping experiences while maintaining data synchronization?'
    },
    keyConcepts: [
      'Optimistic UI Updates',
      'REST API JSON Envelopes',
      'State Rollback on API Error',
      'React useTransition & useMemo'
    ],
    starAnswer: {
      id: {
        situation: 'Pada antarmuka belanja e-commerce, pengguna menginginkan respon instan saat menambah item ke keranjang atau mengubah kuantitas tanpa menunggu round-trip network backend.',
        task: 'Membangun interaksi antarmuka yang cepat di React namun tetap memastikan backend Go memvalidasi ketersediaan stok.',
        action: 'Saya menerapkan pola Optimistic UI Update di React: state lokal keranjang langsung diupdate secara instan. Di latar belakang, request dikirim ke REST API Go. Jika backend mengembalikan error (misal: stok habis), React otomatis me-rollback state keranjang dan menampilkan toast notifikasi kesalahan.',
        result: 'Pengalaman pengguna terasa sangat responsif (60 FPS) tanpa ada data ghost item yang tidak valid di database.'
      },
      en: {
        situation: 'In e-commerce interfaces, users expect zero-latency responses when adding items to the cart or updating quantities without waiting for network round-trips.',
        task: 'Create an instantaneous UI in React while ensuring the Go backend strictly validates inventory limits.',
        action: 'Implemented Optimistic UI state updates in React to reflect changes immediately, while dispatching asynchronous REST requests to the Go backend. If the backend returned a stock conflict error, the client state automatically rolled back with an informative toast alert.',
        result: 'Delivered an ultra-responsive user experience while maintaining 100% data integrity with backend PostgreSQL inventory.'
      }
    },
    modelAnswer: {
      id: 'Saya menggunakan pola Optimistic UI di React untuk mengubah state keranjang di layar seketika, lalu mengirimkan payload ke REST API Go. Jika response backend sukses (200 OK), data dikonfirmasi. Jika terjadi error (409 Conflict / stok habis), state frontend langsung di-rollback ke kondisi sebelumnya dengan pesan peringatan yang ramah.',
      en: 'I utilize Optimistic UI patterns in React to instantly mutate the cart state on screen while dispatching the payload to the Go REST API. If the server responds with 200 OK, the state is committed; if it fails with 409 Conflict, the UI smoothly rolls back to the prior state with a clear feedback message.'
    },
    interviewerInsight: {
      id: 'Menilai kemampuan Anda dalam memadukan keahlian frontend React dengan pemahaman reliabilitas backend.',
      en: 'Evaluates your ability to balance frontend user delight with backend data validation and rollback mechanisms.'
    }
  },

  // ==========================================
  // 4. BEHAVIORAL & HR (METODE STAR)
  // ==========================================
  {
    id: 'behavioral-tell-me-about-yourself',
    category: 'behavioral-hr',
    categoryLabel: { id: 'Behavioral & HR', en: 'Behavioral & HR' },
    difficulty: 'Fundamental',
    context: 'Perkenalan Diri & Positioning Karir',
    question: {
      id: 'Ceritakan tentang diri Anda dan apa yang membedakan Anda dengan kandidat backend lainnya?',
      en: 'Tell me about yourself and what sets you apart from other backend developer candidates?'
    },
    keyConcepts: [
      '2+ Tahun Application Support di PT PLN Icon+',
      'Lulusan Ilmu Komputer Universitas AMIKOM (IPK 3.42)',
      'Hands-on Go, PostgreSQL, Clean Architecture',
      'Jembatan antara Operasional Produksi & Software Engineering'
    ],
    starAnswer: {
      id: {
        situation: 'Saya adalah lulusan Ilmu Komputer dari Universitas AMIKOM (IPK 3.42) dengan 2+ tahun pengalaman profesional di bidang Application Support pada PT PLN Icon+.',
        task: 'Membawa pengalaman operasional sistem nyata ke dalam pengembangan perangkat lunak backend.',
        action: 'Selama di PLN Icon+, saya terbiasa melakukan troubleshooting database relasional, investigasi query lambat, dan memantau stabilitas sistem. Di samping itu, saya aktif membangun 20+ proyek mandiri menggunakan Go (Golang), Clean Architecture, PostgreSQL, dan React.',
        result: 'Kombinasi ini membuat saya tidak hanya bisa menulis kode fitur, tetapi juga sangat peduli pada efisiensi query database, error handling yang aman, dan kemudahan pemeliharaan sistem di lingkungan produksi.'
      },
      en: {
        situation: 'I am a Computer Science graduate from Universitas AMIKOM (GPA 3.42) with 2+ years of professional experience in Application Support at PT PLN Icon+.',
        task: 'Bridging practical operational insights into high-quality backend software engineering.',
        action: 'At PLN Icon+, I actively diagnosed relational database bottlenecks, resolved system operational incidents, and collaborated with engineering teams. Simultaneously, I developed 20+ applications utilizing Go (Golang), Clean Architecture, PostgreSQL, and React.',
        result: 'This distinct background means I write code with a deep production mindset—prioritizing efficient SQL queries, defensive error handling, and robust maintainability.'
      }
    },
    modelAnswer: {
      id: 'Saya adalah Software Developer berfokus pada Backend Go dengan fondasi 2+ tahun pengalaman profesional Application Support di PT PLN Icon+. Keunggulan utama saya adalah pola pikir produksi: berkat pengalaman bertahun-tahun menangani insiden operasional dan troubleshooting database, saya terbiasa menulis kode yang defensif, mengoptimalkan query database, dan menerapkan Clean Architecture agar sistem mudah di-maintain dan di-scale.',
      en: 'I am a Software Developer focused on Go backend development with 2+ years of professional Application Support experience at PT PLN Icon+. My key differentiator is a production-first mindset: having spent years troubleshooting operational database issues and production logs, I write defensive, well-structured Clean Architecture code with optimized SQL queries.'
    },
    interviewerInsight: {
      id: 'HR & Engineering Lead ingin melihat kejelasan narasi karir, kejujuran pengalaman, dan bagaimana background Anda memberi nilai tambah nyata bagi tim.',
      en: 'HR and Engineering Leads look for authentic storytelling, coherent career trajectory, and unique value-adds derived from real support experience.'
    }
  },
  {
    id: 'behavioral-why-transition',
    category: 'behavioral-hr',
    categoryLabel: { id: 'Behavioral & HR', en: 'Behavioral & HR' },
    difficulty: 'Fundamental',
    context: 'Transisi Karir: Application Support ke Backend Developer',
    question: {
      id: 'Mengapa Anda memutuskan untuk berpindah dari peran Application Support ke Software Engineering / Backend Developer?',
      en: 'Why did you decide to transition from an Application Support role into Software Engineering / Backend Development?'
    },
    keyConcepts: [
      'Proactive Problem Prevention vs Reactive Fixes',
      'Passion for Software Architecture & Go',
      'Strong Foundation in Database & System Monitoring'
    ],
    starAnswer: {
      id: {
        situation: 'Selama 2+ tahun di Application Support, saya sering menemukan kendala sistem yang sebenarnya bisa dicegah sejak tahap arsitektur kode dan desain database.',
        task: 'Mengalihkan fokus dari sekadar memperbaiki kendala di hilir menjadi membangun solusi yang kokoh di hulu (tahap pengembangan).',
        action: 'Saya memperdalam rekayasa perangkat lunak backend secara intensif, mempelajari bahasa Go, Clean Architecture, relational database schema design, dan membangun berbagai proyek fullstack & API e-commerce mandiri.',
        result: 'Saya siap berkontribusi langsung sebagai Backend Developer yang proaktif dalam membangun sistem tangguh sejak hari pertama.'
      },
      en: {
        situation: 'During 2+ years in Application Support, I frequently analyzed production bottlenecks that could have been prevented during architecture and database schema design.',
        task: 'Transition from resolving downstream production symptoms to engineering resilient upstream solutions.',
        action: 'Deepened my backend engineering skills in Go, Clean Architecture, relational schema modeling, and built practical fullstack and REST API systems.',
        result: 'Positioned to contribute as a proactive Backend Developer who builds scalable, resilient systems from the ground up.'
      }
    },
    modelAnswer: {
      id: 'Di Application Support, peran saya lebih berfokus pada mitigasi masalah yang sudah terjadi di produksi. Dari situ saya menyadari bahwa ketertarikan terbesar saya adalah mendesain dan membangun sistem yang handal sejak awal. Pengalaman support memberi saya pemahaman tajam tentang apa yang sering rusak di produksi, dan saya ingin memanfaatkan wawasan tersebut untuk menulis kode backend yang lebih berkualitas dan tahan banting.',
      en: 'In Application Support, the focus is resolving problems after they occur in production. That experience made me realize my true passion is designing and building resilient systems from day one. My support background gives me firsthand insight into common production failure points, which I now channel into writing robust, scalable backend services.'
    },
    interviewerInsight: {
      id: 'Pewawancara ingin melihat motivasi intrinsik dan memastikan transisi karir Anda didasari komitmen belajar yang kuat serta pembuktian proyek nyata.',
      en: 'Interviewers seek strong intrinsic motivation and tangible proof of continuous learning through portfolio projects.'
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
    topic: 'Database ACID & Concurrency',
    points: [
      'Atomicity: Semua query berhasil atau semua dibatalkan (tx.Rollback()).',
      'Consistency: Data selalu valid sesuai constraint skema database.',
      'Isolation: Transaksi konkuren tidak saling merusak (SELECT FOR UPDATE).',
      'Durability: Transaksi yang di-commit tersimpan permanen di storage.',
      'Row-Level Locking: Mencegah race condition saldo negatif atau overselling stok.'
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
