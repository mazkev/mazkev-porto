export type ChallengeDifficulty = 'Junior' | 'Middle' | 'Senior';
export type ChallengeTopic =
  | 'Golang'
  | 'Concurrency'
  | 'Data Structures'
  | 'Algorithms'
  | 'Database & SQL'
  | 'System Design';

export type ChallengeLanguage = 'go' | 'typescript' | 'java' | 'sql';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description?: string;
  isHidden?: boolean;
}

export interface ExampleCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: ChallengeDifficulty;
  topic: ChallengeTopic;
  languages: ChallengeLanguage[];
  description: {
    id: string;
    en: string;
  };
  examples: ExampleCase[];
  constraints: string[];
  starterCode: Record<ChallengeLanguage, string>;
  testCases: TestCase[];
  solutionExplanation: {
    id: string;
    en: string;
  };
  benchmarkSolution: Record<ChallengeLanguage, string>;
  hints: string[];
}

export interface SubmissionRecord {
  id: string;
  challengeId: string;
  challengeTitle: string;
  language: ChallengeLanguage;
  code: string;
  status: 'Accepted' | 'Wrong Answer' | 'Compile Error' | 'Time Limit Exceeded';
  testsPassed: number;
  totalTests: number;
  runtimeMs: number;
  timestamp: string;
}

export const codingChallenges: CodingChallenge[] = [
  // ==========================================
  // 1. ATOMIC INVENTORY STOCK DECREMENT (GO CONCURRENCY)
  // ==========================================
  {
    id: 'atomic-stock-decrement',
    title: 'Atomic Stock Decrement (Flash Sale Concurrency)',
    difficulty: 'Middle',
    topic: 'Concurrency',
    languages: ['go', 'typescript'],
    description: {
      id: `Dalam sistem e-commerce berskala tinggi, Anda ditugaskan untuk membuat modul manajemen inventaris barang flash sale. 
Saat ribuan pengguna membeli item yang sama secara bersamaan (konkuren), stok barang tidak boleh bernilai negatif (overselling) dan setiap pengurangan kuantitas stok harus bersifat atomic dan thread-safe.

Lengkapi struct \`InventoryManager\` dan fungsi \`BuyItem(itemKey string, quantity int) (bool, int)\`.
- Jika stok mencukupi (\`currentStock >= quantity\`), kurangi stok dan kembalikan \`(true, remainingStock)\`.
- Jika stok tidak mencukupi, jangan ubah stok dan kembalikan \`(false, currentStock)\`.
- Pastikan operasi aman dari race condition menggunakan \`sync.Mutex\` atau \`sync.RWMutex\`.`,
      en: `In a high-scale e-commerce flash sale system, implement a thread-safe inventory stock manager.
When thousands of concurrent requests attempt to purchase the same product, the inventory must never drop below zero (prevent overselling) and all decrements must execute atomically.

Implement the \`InventoryManager\` struct and \`BuyItem(itemKey string, quantity int) (bool, int)\` method.
- If stock is sufficient (\`currentStock >= quantity\`), decrement stock and return \`(true, remainingStock)\`.
- If insufficient, keep stock unchanged and return \`(false, currentStock)\`.
- Ensure thread safety against race conditions using \`sync.Mutex\` or \`sync.RWMutex\`.`
    },
    examples: [
      {
        input: `Initial Stock: "iphone15" -> 10\nBuyItem("iphone15", 3)\nBuyItem("iphone15", 8)`,
        output: `(true, 7)\n(false, 7)`,
        explanation: 'Pembelian pertama berhasil (sisa 7). Pembelian kedua gagal karena 8 > 7, sehingga stok tetap 7.'
      },
      {
        input: `Initial Stock: "macbook" -> 5\nBuyItem("macbook", 5)`,
        output: `(true, 0)`,
        explanation: 'Pembelian 5 unit pas menghabiskan stok, sisa menjadi 0.'
      }
    ],
    constraints: [
      '1 <= quantity <= 100,000',
      'itemKey adalah string alfanumerik non-kosong',
      'Fungsi harus thread-safe dan lulus uji konkuren tanpa race condition'
    ],
    starterCode: {
      go: `package main

import (
	"sync"
)

type InventoryManager struct {
	mu     sync.Mutex
	stocks map[string]int
}

func NewInventoryManager() *InventoryManager {
	return &InventoryManager{
		stocks: make(map[string]int),
	}
}

func (im *InventoryManager) SetStock(itemKey string, initialStock int) {
	im.mu.Lock()
	defer im.mu.Unlock()
	im.stocks[itemKey] = initialStock
}

// BuyItem mengurangkan stok secara thread-safe jika mencukupi.
// Kembalikan (success bool, remainingStock int).
func (im *InventoryManager) BuyItem(itemKey string, quantity int) (bool, int) {
	// TODO: Implementasikan thread-safe atomic decrement di sini
	
	return false, 0
}
`,
      typescript: `export class InventoryManager {
  private stocks: Map<string, number> = new Map();

  setStock(itemKey: string, initialStock: number): void {
    this.stocks.set(itemKey, initialStock);
  }

  buyItem(itemKey: string, quantity: number): [boolean, number] {
    // TODO: Implement atomic decrement logic
    return [false, 0];
  }
}
`,
      java: ``,
      sql: ``
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'SetStock("itemA", 10); BuyItem("itemA", 4)',
        expectedOutput: 'success: true, remaining: 6',
        description: 'Single purchase within available stock'
      },
      {
        id: 'tc-2',
        input: 'SetStock("itemB", 5); BuyItem("itemB", 8)',
        expectedOutput: 'success: false, remaining: 5',
        description: 'Purchase exceeds available stock (insufficient)'
      },
      {
        id: 'tc-3',
        input: 'SetStock("itemC", 100); Concurrent 10 workers buying 10 units each',
        expectedOutput: 'success: true for all 10, remaining: 0',
        description: 'High concurrency race condition check (10 parallel workers)',
        isHidden: true
      }
    ],
    solutionExplanation: {
      id: 'Gunakan `im.mu.Lock()` sebelum membaca dan memutasi `im.stocks[itemKey]`, dan pasang `defer im.mu.Unlock()`. Jika `im.stocks[itemKey] >= quantity`, kurangi stok dan return `(true, remaining)`. Jika tidak cukup, return `(false, currentStock)`.',
      en: 'Acquire `im.mu.Lock()` before inspecting and mutating `im.stocks[itemKey]` and release via `defer im.mu.Unlock()`. If stock >= qty, decrement and return `(true, remaining)`. Otherwise return `(false, current)`.'
    },
    benchmarkSolution: {
      go: `func (im *InventoryManager) BuyItem(itemKey string, quantity int) (bool, int) {
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
      typescript: `buyItem(itemKey: string, quantity: number): [boolean, number] {
  const current = this.stocks.get(itemKey) ?? 0;
  if (current < quantity) {
    return [false, current];
  }
  const next = current - quantity;
  this.stocks.set(itemKey, next);
  return [true, next];
}`,
      java: ``,
      sql: ``
    },
    hints: [
      'Gunakan im.mu.Lock() dan defer im.mu.Unlock() untuk mengisolasi akses map.',
      'Cek apakah itemKey ada dalam map dan apakah stok saat ini >= quantity sebelum mengurangi.'
    ]
  },

  // ==========================================
  // 2. LRU CACHE WITH TTL (DATA STRUCTURES & REDIS PATTERN)
  // ==========================================
  {
    id: 'lru-cache-invalidation',
    title: 'LRU Cache Invalidation & Eviction (Least Recently Used)',
    difficulty: 'Senior',
    topic: 'Data Structures',
    languages: ['go', 'typescript'],
    description: {
      id: `Rancang dan bangun struktur data **LRU (Least Recently Used) Cache** dengan kapasitas tetap \`capacity\`.
Cache harus mendukung operasi berikut dengan kompleksitas waktu rata-rata **O(1)**:
1. \`Get(key string) (int, bool)\`: Mengembalikan nilai dari key jika ada, dan menandai key tersebut sebagai yang paling baru diakses. Jika tidak ada, kembalikan \`(-1, false)\`.
2. \`Put(key string, value int)\`: Memperbarui nilai jika key sudah ada, atau memasukkan pasangan key-value baru. Jika kapasitas penuh, buang (evict) key yang paling jarang diakses (Least Recently Used).`,
      en: `Design and implement an **LRU (Least Recently Used) Cache** with a fixed capacity.
The cache must support the following operations with average **O(1)** time complexity:
1. \`Get(key string) (int, bool)\`: Return the value if key exists, updating it as most recently used. Return \`(-1, false)\` if not found.
2. \`Put(key string, value int)\`: Update value if key exists or insert new key-value pair. If capacity is exceeded, evict the least recently used key.`
    },
    examples: [
      {
        input: `cache := NewLRUCache(2)\ncache.Put("a", 1)\ncache.Put("b", 2)\ncache.Get("a") -> (1, true)\ncache.Put("c", 3) // Evicts "b"\ncache.Get("b") -> (-1, false)\ncache.Get("c") -> (3, true)`,
        output: `Get("a") = 1\nGet("b") = -1 (Evicted)\nGet("c") = 3`,
        explanation: '"b" dibuang karena "a" baru saja diakses dengan Get(), menjadikan "b" elemen paling usang (LRU).'
      }
    ],
    constraints: [
      '1 <= capacity <= 3,000',
      'Operasi Get dan Put harus berkecepatan O(1)',
      'Key berupa string dan value berupa integer'
    ],
    starterCode: {
      go: `package main

type LRUCache struct {
	capacity int
	items    map[string]int
	// Hint: Gunakan Doubly Linked List untuk O(1) eviction
}

func NewLRUCache(capacity int) *LRUCache {
	return &LRUCache{
		capacity: capacity,
		items:    make(map[string]int),
	}
}

func (c *LRUCache) Get(key string) (int, bool) {
	// TODO: Return value and move node to head
	val, ok := c.items[key]
	return val, ok
}

func (c *LRUCache) Put(key string, value int) {
	// TODO: Insert or update, and evict LRU if capacity exceeded
}
`,
      typescript: `export class LRUCache {
  private capacity: number;
  private map: Map<string, number> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: string): [number, boolean] {
    // TODO: Implement O(1) LRU Get
    return [-1, false];
  }

  put(key: string, value: number): void {
    // TODO: Implement O(1) LRU Put with eviction
  }
}
`,
      java: ``,
      sql: ``
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'NewLRUCache(2); Put("x", 10); Put("y", 20); Get("x")',
        expectedOutput: '10, true',
        description: 'Basic Put and Get within capacity'
      },
      {
        id: 'tc-2',
        input: 'Put("z", 30) on full cache after Get("x"); check Get("y")',
        expectedOutput: '-1, false',
        description: 'Least recently used item "y" is correctly evicted'
      },
      {
        id: 'tc-3',
        input: 'Put existing key "x" with new value 99; check Get("x")',
        expectedOutput: '99, true',
        description: 'Update existing key without increasing size'
      }
    ],
    solutionExplanation: {
      id: 'Kombinasikan Hash Map dengan Doubly Linked List (atau container/list di Go). Map menyimpan pointer ke node list untuk akses O(1), sedangkan Doubly Linked List mengatur urutan akses (Head = Most Recent, Tail = LRU).',
      en: 'Combine a Hash Map with a Doubly Linked List. The Map stores pointers to list nodes for O(1) lookups, while the list maintains access ordering (Head = MRU, Tail = LRU).'
    },
    benchmarkSolution: {
      go: `// Kombinasi Map dan Doubly Linked List Node
type Node struct {
	key   string
	val   int
	prev  *Node
	next  *Node
}

type LRUCache struct {
	capacity int
	cache    map[string]*Node
	head     *Node
	tail     *Node
}

func NewLRUCache(capacity int) *LRUCache {
	head := &Node{}
	tail := &Node{}
	head.next = tail
	tail.prev = head
	return &LRUCache{
		capacity: capacity,
		cache:    make(map[string]*Node),
		head:     head,
		tail:     tail,
	}
}`,
      typescript: `get(key: string): [number, boolean] {
  if (!this.map.has(key)) return [-1, false];
  const val = this.map.get(key)!;
  this.map.delete(key);
  this.map.set(key, val);
  return [val, true];
}`,
      java: ``,
      sql: ``
    },
    hints: [
      'Gunakan Hash Map untuk mapping key -> Node dan Doubly Linked List untuk mengatur urutan MRU dan LRU.',
      'Saat Get dipanggil, pindahkan node ke posisi paling depan (Head).'
    ]
  },

  // ==========================================
  // 3. RATE LIMITER TOKEN BUCKET (API GATEWAY ALGORITHM)
  // ==========================================
  {
    id: 'rate-limiter-token-bucket',
    title: 'Rate Limiter (Token Bucket Algorithm)',
    difficulty: 'Middle',
    topic: 'System Design',
    languages: ['go', 'typescript'],
    description: {
      id: `Implementasikan algoritma **Token Bucket Rate Limiter** untuk melindungi endpoint API dari spam request.
Struktur \`TokenBucket\` memiliki:
- \`capacity\`: Jumlah token maksimum dalam ember.
- \`refillRatePerSec\`: Jumlah token yang diisi ulang setiap 1 detik.

Fungsi \`AllowRequest(tokens int) bool\`:
- Mengisi ulang token berdasarkan selisih waktu sejak request terakhir.
- Jika token saat ini mencukupi (\`currentTokens >= tokens\`), kurangi token dan kembalikan \`true\`.
- Jika token tidak cukup, kembalikan \`false\` (HTTP 429 Too Many Requests).`,
      en: `Implement a **Token Bucket Rate Limiter** to protect API endpoints against excessive request bursts.
The \`TokenBucket\` contains:
- \`capacity\`: Maximum token capacity in the bucket.
- \`refillRatePerSec\`: Number of tokens replenished every 1 second.

Method \`AllowRequest(tokens int) bool\`:
- Replenishes tokens proportionally to elapsed time since last check.
- If current tokens >= requested tokens, decrement and return \`true\`.
- If insufficient, return \`false\` (HTTP 429 Too Many Requests).`
    },
    examples: [
      {
        input: `Capacity: 5, RefillRate: 1 token/sec\nAllowRequest(3) -> true (sisa 2)\nAllowRequest(3) -> false (kurang)`,
        output: `true\nfalse`,
        explanation: 'Request kedua ditolak karena sisa 2 token tidak cukup untuk 3 token yang diminta.'
      }
    ],
    constraints: [
      'capacity >= 1',
      'refillRatePerSec >= 1',
      'Thread-safe untuk pemanggilan konkuren'
    ],
    starterCode: {
      go: `package main

import (
	"sync"
	"time"
)

type TokenBucket struct {
	mu               sync.Mutex
	capacity         float64
	tokens           float64
	refillRatePerSec float64
	lastRefillTime   time.Time
}

func NewTokenBucket(capacity, refillRatePerSec float64) *TokenBucket {
	return &TokenBucket{
		capacity:         capacity,
		tokens:           capacity,
		refillRatePerSec: refillRatePerSec,
		lastRefillTime:   time.Now(),
	}
}

func (tb *TokenBucket) AllowRequest(tokensNeeded float64) bool {
	tb.mu.Lock()
	defer tb.mu.Unlock()

	// TODO: Hitung selisih waktu, isi ulang token proporsional, dan cek kelayakan request
	
	return false
}
`,
      typescript: `export class TokenBucket {
  private capacity: number;
  private tokens: number;
  private refillRatePerSec: number;
  private lastRefillTime: number;

  constructor(capacity: number, refillRatePerSec: number) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRatePerSec = refillRatePerSec;
    this.lastRefillTime = Date.now();
  }

  allowRequest(tokensNeeded: number): boolean {
    // TODO: Implement token bucket algorithm
    return false;
  }
}
`,
      java: ``,
      sql: ``
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'NewTokenBucket(10, 2); AllowRequest(5)',
        expectedOutput: 'true',
        description: 'First burst within capacity'
      },
      {
        id: 'tc-2',
        input: 'Immediate follow-up AllowRequest(6) when remaining is 5',
        expectedOutput: 'false',
        description: 'Immediate exhaustion rejection'
      },
      {
        id: 'tc-3',
        input: 'Wait 2 seconds and retry AllowRequest(4)',
        expectedOutput: 'true',
        description: 'Token replenishment allows subsequent request'
      }
    ],
    solutionExplanation: {
      id: 'Hitung waktu berjalan `now := time.Now(); elapsed := now.Sub(tb.lastRefillTime).Seconds()`. Tambahkan token `tb.tokens = math.Min(tb.capacity, tb.tokens + elapsed * tb.refillRatePerSec)`. Jika `tb.tokens >= tokensNeeded`, kurangi token dan return `true`.',
      en: 'Calculate elapsed time in seconds. Add tokens proportional to elapsed * refillRate bounded by capacity. If available tokens >= needed, decrement and return `true`.'
    },
    benchmarkSolution: {
      go: `func (tb *TokenBucket) AllowRequest(tokensNeeded float64) bool {
	tb.mu.Lock()
	defer tb.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(tb.lastRefillTime).Seconds()
	tb.lastRefillTime = now

	// Refill tokens
	tb.tokens = tb.tokens + (elapsed * tb.refillRatePerSec)
	if tb.tokens > tb.capacity {
		tb.tokens = tb.capacity
	}

	if tb.tokens >= tokensNeeded {
		tb.tokens -= tokensNeeded
		return true
	}
	return false
}`,
      typescript: `allowRequest(tokensNeeded: number): boolean {
  const now = Date.now();
  const elapsedSec = (now - this.lastRefillTime) / 1000;
  this.lastRefillTime = now;

  this.tokens = Math.min(this.capacity, this.tokens + elapsedSec * this.refillRatePerSec);

  if (this.tokens >= tokensNeeded) {
    this.tokens -= tokensNeeded;
    return true;
  }
  return false;
}`,
      java: ``,
      sql: ``
    },
    hints: [
      'Gunakan time.Now().Sub(tb.lastRefillTime).Seconds() untuk menghitung durasi detik sejak refill terakhir.',
      'Jangan biarkan tb.tokens melebihi tb.capacity saat pengisian ulang.'
    ]
  },

  // ==========================================
  // 4. MERGE OVERLAPPING INTERVALS (ALGORITHMS & SLA TIME WINDOWS)
  // ==========================================
  {
    id: 'merge-intervals',
    title: 'Merge Overlapping Time Intervals (Incident Downtime)',
    difficulty: 'Junior',
    topic: 'Algorithms',
    languages: ['go', 'typescript'],
    description: {
      id: `Dalam kalkulasi SLA downtime sistem operasional PLN Icon+, insiden jaringan sering kali terjadi secara tumpang tindih (overlapping).
Diberikan array interval waktu \`intervals\` di mana \`intervals[i] = [start_i, end_i]\`.
Gabungkan seluruh interval yang saling bertumpukan atau bersentuhan menjadi array interval baru yang tidak tumpang tindih.`,
      en: `Given an array of operational downtime intervals where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals into a consolidated non-overlapping array.`
    },
    examples: [
      {
        input: `intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]`,
        output: `[[1, 6], [8, 10], [15, 18]]`,
        explanation: 'Interval [1, 3] dan [2, 6] saling bertumpukan pada rentang [2, 3], sehingga digabung menjadi [1, 6].'
      },
      {
        input: `intervals = [[1, 4], [4, 5]]`,
        output: `[[1, 5]]`,
        explanation: 'Interval saling bersentuhan pada titik 4, sehingga digabung menjadi [1, 5].'
      }
    ],
    constraints: [
      '1 <= intervals.length <= 10,000',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^6'
    ],
    starterCode: {
      go: `package main

import "sort"

func MergeIntervals(intervals [][]int) [][]int {
	if len(intervals) <= 1 {
		return intervals
	}

	// TODO: 1) Sort intervals berdasarkan start_time
	// TODO: 2) Iterasi dan gabungkan interval yang tumpang tindih
	
	return intervals
}
`,
      typescript: `export function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;
  
  // TODO: Sort and merge intervals
  return [];
}
`,
      java: ``,
      sql: ``
    },
    testCases: [
      {
        id: 'tc-1',
        input: '[[1, 3], [2, 6], [8, 10], [15, 18]]',
        expectedOutput: '[[1, 6], [8, 10], [15, 18]]',
        description: 'Standard overlapping intervals'
      },
      {
        id: 'tc-2',
        input: '[[1, 4], [4, 5]]',
        expectedOutput: '[[1, 5]]',
        description: 'Touching boundaries merging'
      },
      {
        id: 'tc-3',
        input: '[[6, 8], [1, 9], [2, 4], [4, 7]]',
        expectedOutput: '[[1, 9]]',
        description: 'Unsorted nested intervals completely engulfed'
      }
    ],
    solutionExplanation: {
      id: 'Urutkan intervals berdasarkan start time `sort.Slice(intervals, func(i, j int) bool { return intervals[i][0] < intervals[j][0] })`. Siapkan slice hasil. Jika start interval saat ini <= end interval sebelumnya, perbarui `end = max(end, current_end)`. Jika tidak, append interval baru.',
      en: 'Sort intervals by their start index. Iterate through: if current start <= previous end, expand previous end to max(previous end, current end). Else append current as a new interval.'
    },
    benchmarkSolution: {
      go: `func MergeIntervals(intervals [][]int) [][]int {
	if len(intervals) <= 1 {
		return intervals
	}

	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})

	merged := [][]int{intervals[0]}

	for i := 1; i < len(intervals); i++ {
		curr := intervals[i]
		last := merged[len(merged)-1]

		if curr[0] <= last[1] {
			if curr[1] > last[1] {
				last[1] = curr[1]
			}
		} else {
			merged = append(merged, curr)
		}
	}

	return merged
}`,
      typescript: `export function mergeIntervals(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const result: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      result.push(current);
    }
  }
  return result;
}`,
      java: ``,
      sql: ``
    },
    hints: [
      'Selalu urutkan (sort) array interval berdasarkan nilai awal [0] terlebih dahulu.',
      'Periksa apakah elemen start interval berikutnya lebih kecil atau sama dengan end interval sebelumnya.'
    ]
  },

  // ==========================================
  // 5. VALID PARENTHESES & JSON TAG VALIDATOR (STACK)
  // ==========================================
  {
    id: 'valid-parentheses-stack',
    title: 'Valid Syntax & Parentheses Validator (Stack)',
    difficulty: 'Junior',
    topic: 'Data Structures',
    languages: ['go', 'typescript'],
    description: {
      id: `Diberikan string \`s\` yang hanya berisi karakter \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` dan \`']'\`.
Tentukan apakah string input tersebut valid.
String dinyatakan valid jika:
1. Setiap kurung buka harus ditutup oleh kurung tutup dari jenis yang sama.
2. Setiap kurung harus ditutup dalam urutan yang tepat (LIFO / Stack).
3. Setiap kurung tutup memiliki kurung buka yang bersesuaian.`,
      en: `Given a string \`s\` containing just characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid using a Stack data structure.`
    },
    examples: [
      {
        input: `s = "()[]{}"`,
        output: `true`,
        explanation: 'Semua jenis kurung terbuka dan tertutup secara benar dan seimbang.'
      },
      {
        input: `s = "(]"`,
        output: `false`,
        explanation: 'Kurung "(" ditutup secara salah dengan "]".'
      },
      {
        input: `s = "([{}])"`,
        output: `true`,
        explanation: 'Kurung bertingkat (nested) tertutup secara rapi sesuai urutan LIFO.'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's hanya terdiri dari kurung "()[]{}"'
    ],
    starterCode: {
      go: `package main

func IsValidParentheses(s string) bool {
	// TODO: Gunakan Stack slice untuk memeriksa validitas kurung
	
	return false
}
`,
      typescript: `export function isValidParentheses(s: string): boolean {
  // TODO: Implement stack validator
  return false;
}
`,
      java: ``,
      sql: ``
    },
    testCases: [
      {
        id: 'tc-1',
        input: '"()[]{}"',
        expectedOutput: 'true',
        description: 'Balanced flat sequence'
      },
      {
        id: 'tc-2',
        input: '"([{}])"',
        expectedOutput: 'true',
        description: 'Balanced deep nested brackets'
      },
      {
        id: 'tc-3',
        input: '"(]"',
        expectedOutput: 'false',
        description: 'Mismatched closing bracket type'
      },
      {
        id: 'tc-4',
        input: '"["',
        expectedOutput: 'false',
        description: 'Unclosed open bracket at EOF'
      }
    ],
    solutionExplanation: {
      id: 'Gunakan slice `stack []rune`. Setiap kali menemukan kurung buka `(`, `{`, `[`, push ke stack. Saat menemukan kurung tutup, periksa apakah stack kosong atau elemen teratas tidak cocok. Jika tidak cocok, return `false`. Di akhir, return `len(stack) == 0`.',
      en: 'Push open brackets to a slice stack. When a closing bracket appears, pop and verify matching parity. Return true if and only if the stack is completely empty at the end.'
    },
    benchmarkSolution: {
      go: `func IsValidParentheses(s string) bool {
	pairs := map[rune]rune{
		')': '(',
		'}': '{',
		']': '[',
	}
	stack := []rune{}

	for _, char := range s {
		if open, isClose := pairs[char]; isClose {
			if len(stack) == 0 || stack[len(stack)-1] != open {
				return false
			}
			stack = stack[:len(stack)-1] // Pop
		} else {
			stack = append(stack, char) // Push
		}
	}

	return len(stack) == 0
}`,
      typescript: `export function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      java: ``,
      sql: ``
    },
    hints: [
      'Gunakan struktur data Stack. Push kurung buka, dan Pop saat menemukan kurung tutup.',
      'Periksa apakah stack kosong di akhir iterasi.'
    ]
  }
];

export const SUBMISSION_STORAGE_KEY = 'mazkev_coding_submissions';

export const getStoredSubmissions = (): SubmissionRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SUBMISSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error loading submissions', e);
    return [];
  }
};

export const saveStoredSubmission = (record: SubmissionRecord): SubmissionRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredSubmissions();
    const updated = [record, ...existing.slice(0, 49)];
    localStorage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving submission', e);
    return [];
  }
};
