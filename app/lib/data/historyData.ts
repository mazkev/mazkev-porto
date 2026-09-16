export type ActivityType = 'Practice Session' | 'Mock Interview' | 'Coding Challenge';

export type ActivityStatus = 'Excellent' | 'Completed' | 'Needs Review' | 'Accepted' | 'Wrong Answer';

export interface HistoryDetailPractice {
  kind: 'practice';
  questionText: string;
  context: string;
  candidateAnswer: string;
  matchedConcepts: string[];
  missingConcepts: string[];
  explanation: string;
  suggestedAnswer: string;
}

export interface HistoryDetailCoding {
  kind: 'coding';
  language: string;
  codeSnippet: string;
  testsPassed: number;
  totalTests: number;
  runtimeMs: number;
  testCases: Array<{
    caseId: string;
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    runtimeMs: number;
  }>;
}

export interface HistoryDetailMock {
  kind: 'mock';
  interviewerPersona: string;
  feedbackNotes: string;
  starBreakdown: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  strengths: string[];
  areasForImprovement: string[];
}

export interface HistoryItem {
  id: string;
  title: string;
  type: ActivityType;
  role: string;
  topic: string;
  date: string; // e.g., '16 Sep 2026'
  rawDate: string; // ISO string for date filtering '2026-09-16'
  score: number; // 0 - 100
  status: ActivityStatus;
  durationMinutes: number;
  details?: HistoryDetailPractice | HistoryDetailCoding | HistoryDetailMock;
}

export const sampleHistoryItems: HistoryItem[] = [
  {
    id: 'hist-1',
    title: 'Go Clean Architecture Decoupling & Mock Testing',
    type: 'Mock Interview',
    role: 'Backend Golang',
    topic: 'Golang',
    date: '15 Sep 2026',
    rawDate: '2026-09-15',
    score: 94,
    status: 'Excellent',
    durationMinutes: 18,
    details: {
      kind: 'mock',
      interviewerPersona: 'Lead Backend Engineer (Fintech)',
      feedbackNotes: 'Penjelasan arsitektur 4-layer sangat terstruktur. Kandidat menguasai konsep Dependency Inversion dan pembuatan mock unit test tanpa ketergantungan database fisik.',
      starBreakdown: {
        situation: 'Membangun REST API Go berkecepatan tinggi yang mudah diuji.',
        task: 'Memisahkan business logic dari database driver dan web framework.',
        action: 'Mendefinisikan entity domain interfaces, mengisolasi usecase, dan menginjeksi mock repository di unit test.',
        result: 'Kode 100% decouple dan siap diskalakan ke microservices.'
      },
      strengths: [
        'Penguasaan mendalam atas Go interfaces',
        'Pemisahan tegas domain logic vs delivery handler',
        'Artikulasi tenang dan percaya diri'
      ],
      areasForImprovement: [
        'Dapat ditambahkan contoh penggunaan gomock / mockery'
      ]
    }
  },
  {
    id: 'hist-2',
    title: 'Atomic Inventory Stock Decrement (Flash Sale Concurrency)',
    type: 'Coding Challenge',
    role: 'Backend Golang',
    topic: 'Concurrency',
    date: '14 Sep 2026',
    rawDate: '2026-09-14',
    score: 100,
    status: 'Accepted',
    durationMinutes: 12,
    details: {
      kind: 'coding',
      language: 'Go',
      codeSnippet: `func (im *InventoryManager) BuyItem(itemKey string, quantity int) (bool, int) {
	im.mu.Lock()
	defer im.mu.Unlock()

	current, exists := im.stocks[itemKey]
	if !exists || current < quantity {
		return false, current
	}

	current -= quantity
	im.stocks[itemKey] = current
	return true, current
}`,
      testsPassed: 3,
      totalTests: 3,
      runtimeMs: 8,
      testCases: [
        {
          caseId: 'tc-1',
          input: 'SetStock("itemA", 10); BuyItem("itemA", 4)',
          expected: 'success: true, remaining: 6',
          actual: 'success: true, remaining: 6',
          passed: true,
          runtimeMs: 2
        },
        {
          caseId: 'tc-2',
          input: 'SetStock("itemB", 5); BuyItem("itemB", 8)',
          expected: 'success: false, remaining: 5',
          actual: 'success: false, remaining: 5',
          passed: true,
          runtimeMs: 2
        },
        {
          caseId: 'tc-3',
          input: '10 Concurrent goroutines buying 10 units each',
          expected: 'success: true for all 10, remaining: 0',
          actual: 'success: true for all 10, remaining: 0',
          passed: true,
          runtimeMs: 4
        }
      ]
    }
  },
  {
    id: 'hist-3',
    title: 'PostgreSQL ACID Transactions & Row-Level Locking (SELECT FOR UPDATE)',
    type: 'Practice Session',
    role: 'Backend Golang',
    topic: 'SQL & Database',
    date: '13 Sep 2026',
    rawDate: '2026-09-13',
    score: 92,
    status: 'Excellent',
    durationMinutes: 14,
    details: {
      kind: 'practice',
      questionText: 'Bagaimana Anda menangani transaksi database yang aman (ACID) dan mencegah race condition saat pengurangan stok atau transfer saldo?',
      context: 'Proyek Go Banking Core & Tokopedia Marketplace Checkout',
      candidateAnswer: 'Saya membungkus mutasi data dalam transaksi database tx.Begin(). Untuk mencegah race condition saldo negatif, saya menerapkan row-level lock SELECT FOR UPDATE pada baris akun pengirim. Jika saldo tidak cukup atau query error, langsung dipanggil tx.Rollback().',
      matchedConcepts: [
        'ACID Transactions (tx.Begin, Commit, Rollback)',
        'Row-Level Locking (SELECT ... FOR UPDATE)',
        'Pessimistic vs Optimistic Locking'
      ],
      missingConcepts: [
        'Connection Pooling'
      ],
      explanation: 'Transaksi ACID menjamin semua query berhasil secara utuh (Atomicity) atau di-rollback jika salah satu gagal, dengan row-level lock untuk mengisolasi mutasi saldo.',
      suggestedAnswer: 'Bungkus seluruh mutasi dalam database transaction (tx.Begin) dengan row-level locking (SELECT FOR UPDATE) pada record saldo target. Jika terjadi error, panggil tx.Rollback() segera.'
    }
  },
  {
    id: 'hist-4',
    title: 'Slow Database Query Troubleshooting (EXPLAIN ANALYZE & Index Tuning)',
    type: 'Practice Session',
    role: 'Application Support',
    topic: 'SQL & Database',
    date: '11 Sep 2026',
    rawDate: '2026-09-11',
    score: 88,
    status: 'Completed',
    durationMinutes: 15,
    details: {
      kind: 'practice',
      questionText: 'Bagaimana langkah terstruktur Anda ketika menerima laporan bahwa aplikasi operasional mengalami perlambatan akibat kendala query database?',
      context: '2+ Tahun Pengalaman Application Support di PT PLN Icon+',
      candidateAnswer: 'Pertama saya mengekstrak slow query log. Kedua, saya jalankan EXPLAIN ANALYZE untuk mendeteksi apakah terjadi Sequential Scan pada tabel besar. Ketiga, saya buatkan index B-Tree atau composite index pada kolom WHERE dan JOIN. Keempat, cek connection pool database.',
      matchedConcepts: [
        'EXPLAIN ANALYZE',
        'B-Tree & Composite Indexing',
        'Sequential Scan vs Index Scan',
        'Database Connection Pool Saturation'
      ],
      missingConcepts: [],
      explanation: 'Troubleshooting database dilakukan dengan menganalisis execution plan via EXPLAIN ANALYZE, menambahkan indexing, dan menjaga threshold connection pooling.',
      suggestedAnswer: 'Tangkap query dari slow log, jalankan EXPLAIN ANALYZE, tambahkan B-Tree atau composite index pada filter WHERE/JOIN, dan pastikan connection pool tidak saturated.'
    }
  },
  {
    id: 'hist-5',
    title: 'Distributed Caching Invalidation & Cache-Aside Pattern (Redis)',
    type: 'Practice Session',
    role: 'Backend Golang',
    topic: 'Redis',
    date: '09 Sep 2026',
    rawDate: '2026-09-09',
    score: 76,
    status: 'Needs Review',
    durationMinutes: 10,
    details: {
      kind: 'practice',
      questionText: 'Bagaimana cara kerja pola Cache-Aside menggunakan Redis dan bagaimana Anda menangani Cache Invalidation saat data di database berubah?',
      context: 'E-Commerce Product Catalog High Concurrency',
      candidateAnswer: 'Aplikasi cek Redis dulu. Kalau tidak ada, ambil dari database lalu simpan di Redis dengan TTL.',
      matchedConcepts: [
        'Cache-Aside (Lazy Loading)',
        'TTL (Time-To-Live) Expiry'
      ],
      missingConcepts: [
        'Cache Invalidation on Mutation',
        'Cache Stampede / Thundering Herd Prevention'
      ],
      explanation: 'Cache-Aside memeriksa Redis terlebih dahulu. Saat update database terjadi, key terkait di Redis wajib di-delete agar request berikutnya mengambil data terbaru.',
      suggestedAnswer: 'Saat membaca, query Redis terlebih dahulu. Jika miss, fetch dari DB, isi Redis dengan TTL. Saat ada UPDATE di DB, hapus (DELETE) key di Redis agar cache invalidation terjadi secara konsisten.'
    }
  },
  {
    id: 'hist-6',
    title: 'Rate Limiter Token Bucket Algorithm',
    type: 'Coding Challenge',
    role: 'Backend Golang',
    topic: 'System Design',
    date: '07 Sep 2026',
    rawDate: '2026-09-07',
    score: 100,
    status: 'Accepted',
    durationMinutes: 16,
    details: {
      kind: 'coding',
      language: 'Go',
      codeSnippet: `func (tb *TokenBucket) AllowRequest(tokensNeeded float64) bool {
	tb.mu.Lock()
	defer tb.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(tb.lastRefillTime).Seconds()
	tb.lastRefillTime = now

	tb.tokens = math.Min(tb.capacity, tb.tokens+elapsed*tb.refillRatePerSec)

	if tb.tokens >= tokensNeeded {
		tb.tokens -= tokensNeeded
		return true
	}
	return false
}`,
      testsPassed: 3,
      totalTests: 3,
      runtimeMs: 10,
      testCases: [
        {
          caseId: 'tc-1',
          input: 'NewTokenBucket(10, 2); AllowRequest(5)',
          expected: 'true',
          actual: 'true',
          passed: true,
          runtimeMs: 3
        },
        {
          caseId: 'tc-2',
          input: 'Immediate AllowRequest(6) when remaining is 5',
          expected: 'false',
          actual: 'false',
          passed: true,
          runtimeMs: 2
        },
        {
          caseId: 'tc-3',
          input: 'Wait 2 seconds and retry AllowRequest(4)',
          expected: 'true',
          actual: 'true',
          passed: true,
          runtimeMs: 5
        }
      ]
    }
  }
];

export const getAggregatedHistory = (): HistoryItem[] => {
  if (typeof window === 'undefined') return sampleHistoryItems;

  try {
    const rawActs = localStorage.getItem('mazkev_interview_activities');
    const acts = rawActs ? JSON.parse(rawActs) : [];

    if (!acts || acts.length === 0) {
      return sampleHistoryItems;
    }

    // Merge persisted items with detailed mock items if matching, or create structured items
    const merged: HistoryItem[] = acts.map((act: any, idx: number) => {
      const matchSample = sampleHistoryItems.find((s) => s.title === act.title || s.id === act.id);
      if (matchSample) {
        return {
          ...matchSample,
          score: act.score ?? matchSample.score,
          date: act.date ?? matchSample.date
        };
      }

      const isoDate = new Date().toISOString().split('T')[0];

      return {
        id: act.id || `act-${idx}`,
        title: act.title || 'Latihan Sesi Wawancara',
        type: act.type || 'Practice Session',
        role: 'Backend Golang',
        topic: act.topic || 'Golang',
        date: act.date || 'Hari ini',
        rawDate: isoDate,
        score: act.score || 85,
        status: (act.status as ActivityStatus) || (act.score >= 85 ? 'Excellent' : 'Completed'),
        durationMinutes: act.durationMinutes || 10,
        details: {
          kind: 'practice',
          questionText: act.title,
          context: `Sesi Latihan Topik ${act.topic}`,
          candidateAnswer: 'Jawaban telah tersimpan dan tervalidasi pada sesi latihan.',
          matchedConcepts: ['Domain Layer', 'Clean Architecture', 'ACID Transactions'],
          missingConcepts: [],
          explanation: 'Latihan mandiri berhasil diselesaikan dan dicatat pada riwayat aktivitas.',
          suggestedAnswer: 'Lihat bank soal untuk pembahasan lengkap dan studi kasus STAR.'
        }
      };
    });

    return merged;
  } catch (e) {
    console.error('Error reading aggregated history', e);
    return sampleHistoryItems;
  }
};
