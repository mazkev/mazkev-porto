export type MockInterviewRole = 'Backend Golang' | 'Backend Java' | 'Fullstack' | 'Frontend';

export type MockInterviewDifficulty = 'Junior' | 'Middle' | 'Senior';

export type MockInterviewType =
  | 'Technical Deep-Dive'
  | 'Behavioral & HR'
  | 'System Design'
  | 'Full Simulation';

export type MockInterviewDuration = 15 | 30 | 45;

export interface InterviewerPersona {
  name: string;
  roleTitle: string;
  companyContext: string;
  avatarColor: string;
  greeting: {
    id: string;
    en: string;
  };
}

export interface MockQuestion {
  id: string;
  type: MockInterviewType;
  roles: MockInterviewRole[];
  difficulty: MockInterviewDifficulty;
  questionText: {
    id: string;
    en: string;
  };
  context: string;
  keyRubrics: string[];
  suggestedStarAnswer: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface QuestionEvaluation {
  questionId: string;
  questionText: string;
  candidateAnswer: string;
  technicalScore: number;
  relevanceScore: number;
  problemSolvingScore: number;
  matchedRubrics: string[];
  missingRubrics: string[];
  feedback: string;
  suggestedAnswer: string;
}

export interface MockInterviewScorecard {
  id: string;
  role: MockInterviewRole;
  difficulty: MockInterviewDifficulty;
  type: MockInterviewType;
  durationMinutes: number;
  date: string;
  technicalScore: number;
  relevanceScore: number;
  problemSolvingScore: number;
  overallScore: number;
  hiringVerdict: 'Strong Hire' | 'Hire' | 'Needs Review';
  strengths: string[];
  areasToImprove: string[];
  questionEvaluations: QuestionEvaluation[];
}

export const interviewerPersonas: Record<MockInterviewType, InterviewerPersona> = {
  'Technical Deep-Dive': {
    name: 'Dimas Prasetyo',
    roleTitle: 'Lead Backend Architect',
    companyContext: 'Fintech & High-Scale Microservices',
    avatarColor: 'from-emerald-500 to-teal-700',
    greeting: {
      id: 'Halo Kevin, saya akan mengevaluasi pemahaman teknis Anda terkait arsitektur Go, optimasi query database, caching, dan clean code.',
      en: 'Hello Kevin, I will evaluate your technical depth in Go architecture, database query optimization, caching, and clean code.'
    }
  },
  'Behavioral & HR': {
    name: 'Maya Sartika',
    roleTitle: 'Head of People & Talent',
    companyContext: 'Tech Enterprise & PLN Support Operations',
    avatarColor: 'from-purple-500 to-indigo-700',
    greeting: {
      id: 'Selamat pagi! Di sesi ini kita akan berdiskusi seputar pengalaman operasional Anda di PLN Icon+, cara Anda berkolaborasi, dan menangani insiden produksi.',
      en: 'Good day! In this session, we will discuss your operational experience at PLN Icon+, collaboration, and production incident resolution.'
    }
  },
  'System Design': {
    name: 'Budi Santoso',
    roleTitle: 'VP of Engineering',
    companyContext: 'Cloud Infrastructure & High-Traffic Platforms',
    avatarColor: 'from-amber-500 to-orange-700',
    greeting: {
      id: 'Mari kita bedah arsitektur sistem skala besar: bagaimana Anda menangani scalability, caching, database sharding, dan failover reliability.',
      en: 'Let us dive into large-scale system design: scalability, distributed caching, database sharding, and failover reliability.'
    }
  },
  'Full Simulation': {
    name: 'Panel Pewawancara (Engineering & HR)',
    roleTitle: 'Lead Architect & Talent Partner',
    companyContext: 'Enterprise Hiring Committee',
    avatarColor: 'from-sky-500 to-blue-700',
    greeting: {
      id: 'Selamat datang di simulasi wawancara kerja penuh. Sesi ini menggabungkan perkenalan diri, eksplorasi teknis mendalam, studi kasus arsitektur, hingga aspek behavioral.',
      en: 'Welcome to the full interview simulation covering self-introduction, technical deep-dive, architecture, and behavioral questions.'
    }
  }
};

export const mockQuestionsPool: MockQuestion[] = [
  // ==========================================
  // 1. TECHNICAL DEEP-DIVE QUESTIONS
  // ==========================================
  {
    id: 'tech-1',
    type: 'Technical Deep-Dive',
    roles: ['Backend Golang', 'Fullstack'],
    difficulty: 'Middle',
    context: 'Arsitektur Clean Architecture & Decoupling',
    questionText: {
      id: 'Ceritakan bagaimana Anda merancang Clean Architecture pada REST API Go, bagaimana layer-layer tersebut saling berkomunikasi, dan mengapa Dependency Inversion penting?',
      en: 'Explain how you design Clean Architecture in a Go REST API, how layers communicate, and why Dependency Inversion is crucial.'
    },
    keyRubrics: [
      'Domain Layer (Entity & Interface kontrak)',
      'Usecase Layer (Business Logic)',
      'Repository Layer (Database Driver)',
      'Delivery/Handler Layer (HTTP Routing)',
      'Dependency Inversion & Mock Unit Testing'
    ],
    suggestedStarAnswer: {
      situation: 'Saat membangun REST API Go, saya membutuhkan struktur yang modular dan mudah diuji secara terisolasi.',
      task: 'Menerapkan 4 layer Clean Architecture dengan Dependency Inversion.',
      action: 'Mendefinisikan interface di Domain layer, memusatkan logic di Usecase, dan menginjeksi mock repository pada unit test.',
      result: 'Kode menjadi decoupled, mudah di-test tanpa live database, dan tahan terhadap perubahan framework.'
    }
  },
  {
    id: 'tech-2',
    type: 'Technical Deep-Dive',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack'],
    difficulty: 'Middle',
    context: 'Optimasi Query Database & Indexing',
    questionText: {
      id: 'Berdasarkan pengalaman Anda di PLN Icon+, bagaimana langkah sistematis Anda mendiagnosis dan mengoptimalkan query database yang lambat?',
      en: 'Based on your experience at PLN Icon+, what is your systematic approach to diagnosing and optimizing slow database queries?'
    },
    keyRubrics: [
      'Eksekusi EXPLAIN ANALYZE (Mendeteksi Seq Scan vs Index Scan)',
      'Pembuatan B-Tree Index pada kolom WHERE dan JOIN',
      'Menghindari N+1 Query Problem & SELECT * berlebihan',
      'Database Connection Pool Management'
    ],
    suggestedStarAnswer: {
      situation: 'Saat aplikasi mengalami lonjakan latency, terdapat query laporan harian yang membutuhkan waktu lebih dari 10 detik.',
      task: 'Mendiagnosis bottleneck query dan mempercepat waktu eksekusi tanpa mengubah skema tabel utama.',
      action: 'Menjalankan EXPLAIN ANALYZE untuk menemukan full table scan, menambahkan composite index pada kolom filter tanggal dan foreign key, serta membatasi SELECT hanya pada kolom yang dibutuhkan.',
      result: 'Waktu eksekusi query berkurang dari 10 detik menjadi 60ms dan CPU database kembali normal.'
    }
  },
  {
    id: 'tech-3',
    type: 'Technical Deep-Dive',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack'],
    difficulty: 'Middle',
    context: 'Redis Caching & Invalidation',
    questionText: {
      id: 'Jelaskan implementasi pola Cache-Aside menggunakan Redis dan bagaimana strategi Anda mencegah Cache Breakdown / Stampede saat item populer expired?',
      en: 'Explain your Cache-Aside implementation with Redis and how you mitigate Cache Breakdown / Stampede when hot keys expire.'
    },
    keyRubrics: [
      'Cache-Aside Pattern (Lazy Loading)',
      'TTL (Time-To-Live) Expiry',
      'Cache Invalidation on Database Mutation',
      'Mutual Exclusion / Singleflight Mutex for Cache Stampede'
    ],
    suggestedStarAnswer: {
      situation: 'Katalog produk e-commerce mengalami lonjakan query ke PostgreSQL saat cache expired.',
      task: 'Menerapkan Cache-Aside dengan proteksi Cache Stampede.',
      action: 'Menggunakan Redis dengan TTL dan memanfaatkan singleflight.Group di Go agar hanya 1 worker yang meng-query database saat cache miss.',
      result: 'Beban query database turun hingga 85% dan waktu respons API stabil di bawah 20ms.'
    }
  },

  // ==========================================
  // 2. BEHAVIORAL & HR QUESTIONS
  // ==========================================
  {
    id: 'behav-1',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: '2+ Tahun Pengalaman Operasional di PT PLN Icon+',
    questionText: {
      id: 'Ceritakan situasi ketika Anda menangani insiden sistem operasional kritis yang hampir melanggar batas SLA di PT PLN Icon+. Apa tindakan yang Anda ambil?',
      en: 'Describe a situation where you resolved a critical system outage nearing SLA breach at PT PLN Icon+. What actions did you take?'
    },
    keyRubrics: [
      'System Monitoring & Log Analysis',
      'Diagnosis Akar Masalah (Root Cause Analysis)',
      'Investigasi Database Slow Query / Bottleneck',
      'Komunikasi Terstruktur & Kepatuhan Batas SLA',
      'Verifikasi Hotfix Bersama Tim Developer'
    ],
    suggestedStarAnswer: {
      situation: 'Saat bertugas di PLN Icon+, aplikasi operasional harian mendadak lambat dan terancam melanggar SLA 99.5%.',
      task: 'Mengidentifikasi akar penyebab latency dan memulihkan kestabilan sistem secepat mungkin.',
      action: 'Menganalisis log error server dan menjalankan EXPLAIN ANALYZE pada query lambat di PostgreSQL/Oracle, menemukan full table scan karena missing index, lalu mengoordinasikan hotfix indeks darurat.',
      result: 'Latency query turun dari 12 detik menjadi 80ms, dan insiden terselesaikan 30 menit sebelum batas SLA terlampaui.'
    }
  },
  {
    id: 'behav-2',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Kolaborasi Tim & Perbedaan Pendapat Teknis',
    questionText: {
      id: 'Pernahkah Anda memiliki perbedaan pendapat teknis dengan developer lain terkait arsitektur atau desain database? Bagaimana Anda menyelesaikannya?',
      en: 'Have you ever had a technical disagreement regarding database design or architecture with another developer? How did you resolve it?'
    },
    keyRubrics: [
      'Komunikasi Terbuka & Berbasis Data (Benchmark/Metrics)',
      'Fokus pada Kebutuhan Bisnis & Skalabilitas',
      'Kompromi Profesional & Dokumentasi Keputusan (ADR)'
    ],
    suggestedStarAnswer: {
      situation: 'Terdapat perbedaan pendapat apakah transaksi saldo harus menggunakan database trigger atau eksplisit di layer backend Go.',
      task: 'Menentukan solusi yang paling mudah dipelihara dan tidak mengunci CPU database.',
      action: 'Membuat proof of concept sederhana dan menyajikan data benchmark bahwa logika di layer Go lebih mudah di-unit test dan di-debug.',
      result: 'Tim menyetujui pendekatan layer aplikasi dengan row-level locking dan mendokumentasikannya dalam ADR.'
    }
  },

  // ==========================================
  // 3. SYSTEM DESIGN QUESTIONS
  // ==========================================
  {
    id: 'sys-1',
    type: 'System Design',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack'],
    difficulty: 'Senior',
    context: 'High-Scale Read/Write Scaling',
    questionText: {
      id: 'Bagaimana Anda merancang arsitektur database relasional untuk menangani rasio 90% Read dan 10% Write dengan jutaan traffic per hari?',
      en: 'How would you architect a relational database architecture handling a 90% Read and 10% Write workload with millions of daily requests?'
    },
    keyRubrics: [
      'Primary-Replica Read/Write Splitting',
      'PgBouncer Connection Pooling',
      'Upstream Redis Distributed Caching',
      'Table Partitioning / Sharding Strategy'
    ],
    suggestedStarAnswer: {
      situation: 'Sistem mengalami bottleneck karena semua traffic read dan write bertumpu pada satu database master.',
      task: 'Merancang arsitektur terdistribusi yang memisahkan beban baca dan tulis.',
      action: 'Memasang Redis cache di layer terdepan, memecah query SELECT ke Read Replicas, dan mengarahkan INSERT/UPDATE ke Primary DB dengan PgBouncer pooler.',
      result: 'Arsitektur mampu melayani 10x lonjakan traffic tanpa peningkatan latency.'
    }
  },
  {
    id: 'sys-2',
    type: 'System Design',
    roles: ['Backend Golang', 'Fullstack'],
    difficulty: 'Senior',
    context: 'Distributed Event Streaming & Async Tasks',
    questionText: {
      id: 'Bagaimana Anda merancang pipeline pengiriman notifikasi dan pemrosesan pesanan menggunakan Apache Kafka agar pesan tidak hilang dan tetap idempotent?',
      en: 'How do you design an order processing and notification pipeline using Apache Kafka ensuring zero message loss and idempotent consumption?'
    },
    keyRubrics: [
      'Kafka Topics, Partitions & Consumer Groups',
      'Producer acks=all (At-least-once delivery)',
      'Idempotent Consumer dengan Event ID di Redis/DB',
      'Dead Letter Queue (DLQ) untuk Poison Pills'
    ],
    suggestedStarAnswer: {
      situation: 'Sistem pesanan membutuhkan notifikasi asinkron ke WhatsApp dan email tanpa memblokir response HTTP.',
      task: 'Membangun pipeline event-driven yang tahan terhadap duplikasi pesan.',
      action: 'Mem-publish event OrderCreated dengan producer acks=all, dan di consumer memverifikasi EventID di Redis sebelum mengirim notifikasi.',
      result: 'Pesanan terproses seketika secara asinkron dan pesan duplikat dicegah 100%.'
    }
  }
];

export const getMockQuestions = (
  type: MockInterviewType,
  role: MockInterviewRole,
  difficulty: MockInterviewDifficulty,
  durationMinutes: MockInterviewDuration
): MockQuestion[] => {
  const targetCount = durationMinutes === 15 ? 3 : durationMinutes === 30 ? 5 : 7;

  let pool: MockQuestion[] = [];

  if (type === 'Full Simulation') {
    // Combine questions from all types
    pool = [...mockQuestionsPool];
  } else {
    pool = mockQuestionsPool.filter((q) => q.type === type);
    if (pool.length < targetCount) {
      pool = [...pool, ...mockQuestionsPool.filter((q) => q.type !== type)];
    }
  }

  // Shuffle and pick target count
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const selected: MockQuestion[] = [];
  for (let i = 0; i < targetCount; i++) {
    selected.push(shuffled[i % shuffled.length]);
  }

  return selected;
};
