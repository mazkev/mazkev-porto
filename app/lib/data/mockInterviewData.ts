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
  // 2. BEHAVIORAL & HR QUESTIONS (10 TOPIC CONVERSATIONAL SUITE)
  // ==========================================
  {
    id: 'behav-intro',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Junior',
    context: 'Perkenalan Diri & Latar Belakang Transisi Karir',
    questionText: {
      id: 'Bisa ceritakan tentang diri Anda, latar belakang pendidikan, pengalaman kerja di PLN, dan apa yang memotivasi Anda melamar posisi Software Engineer ini?',
      en: 'Could you introduce yourself, your educational background, your work experience at PLN, and what motivates you to apply for this Software Engineer role?'
    },
    keyRubrics: [
      'Latar Belakang S1 Informatika Amikom Yogyakarta',
      '3+ Tahun Pengalaman Application Support di PLN (Enterprise App, SQL/DB, Monitoring)',
      'Pengalaman Hands-on Development (Internal Tools, Project Go, React, PostgreSQL, Docker, Microservices)',
      'Motivasi Jelas Transisi ke Software Engineer untuk merancang & membangun software',
      'Penyampaian Alami, Santai & Percaya Diri'
    ],
    suggestedStarAnswer: {
      situation: 'Lulusan S1 Informatika Amikom dan 3+ tahun bekerja di PLN menangani stabilitas aplikasi enterprise, SQL database, dan koordinasi dev.',
      task: 'Menjelaskan transisi karir dari Application Support menuju Software Engineer yang berfokus pada backend engineering.',
      action: 'Membangun aplikasi internal otomatisasi support serta mengembangkan project mandiri Go REST API, PostgreSQL, Docker, dan microservices.',
      result: 'Memiliki kombinasi pemahaman troubleshooting produksi nyata dan kemampuan rekayasa backend yang siap memberi kontribusi langsung ke tim.'
    }
  },
  {
    id: 'behav-challenge',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Menghadapi Masalah / Insiden Sistem Down di Jam Kerja',
    questionText: {
      id: 'Ceritakan situasi ketika salah satu aplikasi yang Anda tangani tiba-tiba mengalami down saat jam kerja dengan lonjakan tiket. Bagaimana langkah Anda mengatasinya?',
      en: 'Describe a situation where an application you managed went down during business hours with a surge in tickets. How did you resolve it?'
    },
    keyRubrics: [
      'Pengecekan Status Aplikasi & Server Logs Terstruktur',
      'Investigasi Query Database Menggunakan SQL',
      'Komunikasi Proaktif dengan Tim Developer',
      'Update Berkala & Transparan kepada User',
      'Penyelesaian Root Cause & Kolaborasi Tim'
    ],
    suggestedStarAnswer: {
      situation: 'Aplikasi enterprise down mendadak saat jam kerja dengan lonjakan tiket user secara bersamaan.',
      task: 'Mendiagnosis akar masalah dan memulihkan aplikasi secepat mungkin dengan koordinasi tim.',
      action: 'Mengecek status & server logs, menginvestigasi query database via SQL, membagikan temuan ke developer, dan memberikan update rutin ke user.',
      result: 'Root cause teridentifikasi, aplikasi pulih, dan membuktikan pentingnya komunikasi jelas serta penentuan prioritas saat insiden.'
    }
  },
  {
    id: 'behav-disagreement',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Perbedaan Pendapat Teknis dengan Teammate (App vs DB)',
    questionText: {
      id: 'Pernahkah Anda memiliki perbedaan pendapat dengan rekan kerja atau developer mengenai penyebab masalah sistem? Bagaimana Anda menyelesaikannya secara profesional?',
      en: 'Have you ever had a disagreement with a teammate or developer about the cause of a system issue? How did you resolve it professionally?'
    },
    keyRubrics: [
      'Mendengarkan & Memahami Sudut Pandang Teammate Terlebih Dahulu',
      'Menyajikan Bukti Objektif Berdasarkan Data Hasil SQL & Log',
      'Menghindari Perdebatan Personal (Fokus pada Masalah & Solusi)',
      'Diskusi Bersama Dua Arah untuk Validasi Menyeluruh'
    ],
    suggestedStarAnswer: {
      situation: 'Terjadi perbedaan pendapat di mana developer menduga isu berasal dari kode aplikasi, sementara investigasi saya menemukan indikasi di database.',
      task: 'Menemukan akar masalah sebenarnya tanpa berdebat kusir mengenai siapa yang benar.',
      action: 'Menunjukkan output query SQL dan bukti log secara objektif, lalu duduk bersama berdiskusi memeriksa kedua sisi.',
      result: 'Menemukan penyebab sebenarnya secara kolaboratif dan menerapkan solusi yang tepat tanpa merusak hubungan tim.'
    }
  },
  {
    id: 'behav-learning',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Metode Belajar Teknologi Baru (Hands-on Real Projects)',
    questionText: {
      id: 'Bagaimana pendekatan Anda ketika harus mempelajari teknologi atau bahasa pemrograman baru? Bisa berikan contoh konkritnya?',
      en: 'What is your approach when learning a new technology or programming language? Could you provide a concrete example?'
    },
    keyRubrics: [
      'Pahami Konsep & Sintaks Dasar Terlebih Dahulu',
      'Learning by Doing: Membangun Proyek Nyata (Bukan Sekadar Nonton Tutorial)',
      'Evolusi Belajar: Go -> REST API -> PostgreSQL -> Docker -> Microservices (gRPC, RabbitMQ, Kafka)',
      'Deploy ke Linux VPS untuk Memahami Runtime Nyata',
      'Validasi & Testing Mandiri saat Menggunakan AI Tools'
    ],
    suggestedStarAnswer: {
      situation: 'Ingin memperdalam keahlian backend engineering dengan mempelajari Go dan arsitektur modern.',
      task: 'Menguasai ekosistem Go mulai dari sintaks dasar hingga implementasi skala produksi.',
      action: 'Membangun marketplace backend, merancang pipeline microservices (gRPC, Kafka), dan mendeploy langsung ke VPS Linux.',
      result: 'Memahami teknologi secara mendalam melalui implementasi nyata, penanganan bug mandiri, dan testing komprehensif.'
    }
  },
  {
    id: 'behav-initiative',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Inisiatif & Entrepreneur Spirit (Otomasi Internal Support Tool)',
    questionText: {
      id: 'Ceritakan inisiatif yang pernah Anda ambil di tempat kerja di luar tugas pokok Anda untuk meningkatkan efisiensi tim.',
      en: 'Tell me about an initiative you took at work beyond your core job duties to improve team efficiency.'
    },
    keyRubrics: [
      'Observasi Masalah & Aktivitas Manual yang Berulang',
      'Inisiatif Mandiri Merancang & Membangun Internal Tool',
      'Pengurangan Beban Pekerjaan Manual bagi Tim',
      'Mindset Proaktif tanpa Menunggu Perintah Atasan'
    ],
    suggestedStarAnswer: {
      situation: 'Melihat beberapa tugas operasional support dilakukan berulang dan memakan waktu tim karena proses manual.',
      task: 'Meningkatkan efisiensi alur kerja tim meskipun pembuatan tools bukan tugas formal harian.',
      action: 'Mengidentifikasi bottleneck, merancang alur otomatisasi, dan mengembangkan aplikasi internal mandiri.',
      result: 'Aplikasi digunakan tim, memangkas beban kerja manual berulang, dan membuktikan inisiatif proaktif penyelesaian masalah.'
    }
  },
  {
    id: 'behav-pressure',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Bekerja di Bawah Tekanan Tinggi (Working Under Pressure)',
    questionText: {
      id: 'Bagaimana cara Anda mengelola tekanan kerja ketika terjadi insiden kritis dan user menuntut perbaikan segera?',
      en: 'How do you handle pressure when critical incidents occur and users demand immediate resolution?'
    },
    keyRubrics: [
      'Menjaga Ketenangan & Menolak Perubahan Terburu-buru tanpa Analisis',
      'Investigasi Bertahap (Server Logs -> SQL Database -> Koordinasi)',
      'Komunikasi Teratur & Transparan kepada Stakeholder/User',
      'Fokus pada Penentuan Prioritas & Prosedur Troubleshooting yang Benar'
    ],
    suggestedStarAnswer: {
      situation: 'Aplikasi down saat jam sibuk dan banjir tiket user mendesak perbaikan seketika.',
      task: 'Memulihkan sistem secara terukur tanpa melakukan perubahan serampangan yang berisiko memperparah keadaan.',
      action: 'Tetap tenang, bekerja bertahap mengecek logs dan query database SQL, berkoordinasi dengan developer, serta memberi update berkala ke user.',
      result: 'Aplikasi pulih dengan stabil dan aman karena mengikuti metodologi penanganan insiden yang disiplin.'
    }
  },
  {
    id: 'behav-mistake',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Kesalahan dan Tanggung Jawab (Accountability & Learning)',
    questionText: {
      id: 'Pernahkah Anda melakukan kesalahan saat melakukan troubleshooting atau development? Bagaimana respon dan tindakan Anda?',
      en: 'Have you ever made a mistake during troubleshooting or development? How did you respond and handle it?'
    },
    keyRubrics: [
      'Kejujuran Mengakui Asumsi Awal yang Keliru secara Terbuka',
      'Menghentikan Pendekatan yang Salah & Berbagi Temuan Baru ke Tim',
      'Penyelesaian Masalah Berdasarkan Validasi Data Nyata (Log & DB)',
      'Pembelajaran Agar Kesalahan Serupa Tidak Terulang'
    ],
    suggestedStarAnswer: {
      situation: 'Saat menginvestigasi masalah aplikasi, asumsi awal saya keliru mengira bug pada application logic padahal sumbernya pada database.',
      task: 'Mengakui kekeliruan secara transparan dan mengarahkan ulang proses investigasi.',
      action: 'Menyampaikan ke tim apa saja yang sudah dicek, mengakui asumsi yang keliru, dan melanjutkan penyelidikan berbasis data log serta SQL.',
      result: 'Akar masalah sebenarnya berhasil ditemukan dan dituntaskan; belajar untuk selalu memvalidasi bukti empiris sebelum berasumsi.'
    }
  },
  {
    id: 'behav-teamwork',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Kolaborasi Tim & Bagaimana Rekan Menggambarkan Anda',
    questionText: {
      id: 'Bagaimana rekan kerja atau developer lain menggambarkan cara kerja Anda dalam sebuah tim?',
      en: 'How would your colleagues or developers describe your work style within a team?'
    },
    keyRubrics: [
      'Dapat Diandalkan (Dependable) & Kooperatif dalam Menyelesaikan Masalah',
      'Transparan dalam Berbagi Temuan & Follow-up hingga Tuntas',
      'Self-Awareness: Meningkatkan Proaktivitas Memberi Update Berkala Lebih Dini',
      'Memastikan Seluruh Anggota Tim Memperoleh Konteks Informasi yang Dibutuhkan'
    ],
    suggestedStarAnswer: {
      situation: 'Rutin berkolaborasi dengan developer dan cross-functional tim untuk investigasi dan eskalasi aplikasi di PLN.',
      task: 'Menjadi rekan tim yang handal dan memastikan koordinasi teknis berjalan lancar.',
      action: 'Membagikan data investigasi dengan jelas, mengawal follow up perbaikan, dan terus meningkatkan frekuensi update status.',
      result: 'Dikenal sebagai teammate yang kooperatif, transparan, dan dapat diandalkan saat menghadapi situasi sulit.'
    }
  },
  {
    id: 'behav-career',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Rencana 2–3 Tahun ke Depan (Career Aspirations)',
    questionText: {
      id: 'Apa target dan pencapaian yang ingin Anda raih dalam 2 hingga 3 tahun ke depan dalam karir software engineering Anda?',
      en: 'What are your goals and milestones for the next 2 to 3 years in your software engineering career?'
    },
    keyRubrics: [
      'Menjadi Backend Software Engineer yang Kuat & Mandiri di Ekosistem Go',
      'Memperdalam Arsitektur Backend, Database Tuning, dan Distributed Systems',
      'Mengambil End-to-End Ownership terhadap Fitur (Development hingga Deployment)',
      'Knowledge Sharing, Membantu Teammate, dan Berkontribusi Membangun Produk yang Handal'
    ],
    suggestedStarAnswer: {
      situation: 'Beralih ke peran Software Engineer dengan fondasi kuat pada pengalaman operasional produksi.',
      task: 'Menentukan roadmap pengembangan diri dan kontribusi profesional dalam 2-3 tahun ke depan.',
      action: 'Memperdalam arsitektur Go & distributed systems, mengambil ownership fitur end-to-end, dan aktif berbagi pengetahuan dengan tim.',
      result: 'Menjadi engineer mandiri yang berkontribusi nyata pada keandalan produk dan perkembangan tim engineering.'
    }
  },
  {
    id: 'behav-achievement',
    type: 'Behavioral & HR',
    roles: ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'],
    difficulty: 'Middle',
    context: 'Pencapaian Terbesar / Penutup Interview (Biggest Achievement)',
    questionText: {
      id: 'Menurut Anda, apa pencapaian terbesar yang paling membanggakan dalam perjalanan karir Anda sejauh ini?',
      en: 'In your view, what is your greatest and most meaningful achievement in your career so far?'
    },
    keyRubrics: [
      'Disiplin Bertumbuh & Belajar Mandiri di Sela Bekerja Full-Time Application Support',
      'Membangun Aplikasi Produksi Mandiri (Go, PostgreSQL, Docker, Microservices, VPS)',
      'Memiliki Grit, Dedikasi Tinggi, dan Tanggung Jawab atas Pengembangan Karir Sendiri',
      'Memadukan Pengalaman Keandalan Produksi Nyata dengan Kemampuan Software Engineering'
    ],
    suggestedStarAnswer: {
      situation: 'Bekerja full-time di PLN Application Support sambil memupuk aspirasi kuat di bidang software development.',
      task: 'Mengembangkan kapabilitas rekayasa software secara mandiri tanpa mengorbankan tanggung jawab harian.',
      action: 'Konsisten belajar dan membangun berbagai project Go backend, microservices, hingga deploy ke Linux VPS.',
      result: 'Membuktikan disiplin diri dan determinasi tinggi untuk menggabungkan keandalan produksi dengan software engineering yang solid.'
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
