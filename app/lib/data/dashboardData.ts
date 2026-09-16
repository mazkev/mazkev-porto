export interface PracticeStats {
  totalSessions: number;
  questionsAnswered: number;
  codingChallengesCompleted: number;
  averageScore: number;
}

export interface SkillProgress {
  skill: string;
  category: 'core-backend' | 'database' | 'infrastructure' | 'architecture';
  score: number;
  level: string;
  totalAnswered: number;
  color: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  type: 'Practice Session' | 'Mock Interview' | 'Coding Challenge';
  topic: string;
  date: string;
  score: number;
  status: 'Completed' | 'Excellent' | 'Needs Review';
  durationMinutes: number;
}

export interface RecommendationTopic {
  skill: string;
  score: number;
  reason: {
    id: string;
    en: string;
  };
  suggestedAction: {
    id: string;
    en: string;
  };
  recommendedQuestions: Array<{
    id: string;
    title: { id: string; en: string };
    difficulty: 'Fundamental' | 'Intermediate' | 'Advanced';
  }>;
}

// Initial Real-time zero state
export const initialPracticeStats: PracticeStats = {
  totalSessions: 0,
  questionsAnswered: 0,
  codingChallengesCompleted: 0,
  averageScore: 0
};

export const initialSkillProgress: SkillProgress[] = [
  {
    skill: 'Golang',
    category: 'core-backend',
    score: 0,
    level: 'Belum Dilatih',
    totalAnswered: 0,
    color: 'bg-cyan-500'
  },
  {
    skill: 'SQL & PostgreSQL',
    category: 'database',
    score: 0,
    level: 'Belum Dilatih',
    totalAnswered: 0,
    color: 'bg-blue-600'
  },
  {
    skill: 'REST API',
    category: 'core-backend',
    score: 0,
    level: 'Belum Dilatih',
    totalAnswered: 0,
    color: 'bg-emerald-500'
  },
  {
    skill: 'Docker',
    category: 'infrastructure',
    score: 0,
    level: 'Belum Dilatih',
    totalAnswered: 0,
    color: 'bg-sky-500'
  },
  {
    skill: 'Redis',
    category: 'database',
    score: 0,
    level: 'Belum Dilatih',
    totalAnswered: 0,
    color: 'bg-red-500'
  },
  {
    skill: 'System Design',
    category: 'architecture',
    score: 0,
    level: 'Belum Dilatih',
    totalAnswered: 0,
    color: 'bg-amber-500'
  }
];

export const initialRecentActivity: ActivityItem[] = [];

// Sample Demo Data (If user wants to preview)
export const demoPracticeStats: PracticeStats = {
  totalSessions: 24,
  questionsAnswered: 142,
  codingChallengesCompleted: 18,
  averageScore: 88.5
};

export const demoSkillProgress: SkillProgress[] = [
  {
    skill: 'Golang',
    category: 'core-backend',
    score: 92,
    level: 'Advanced',
    totalAnswered: 46,
    color: 'bg-cyan-500'
  },
  {
    skill: 'SQL & PostgreSQL',
    category: 'database',
    score: 89,
    level: 'Advanced',
    totalAnswered: 38,
    color: 'bg-blue-600'
  },
  {
    skill: 'REST API',
    category: 'core-backend',
    score: 94,
    level: 'Proficient',
    totalAnswered: 32,
    color: 'bg-emerald-500'
  },
  {
    skill: 'Docker',
    category: 'infrastructure',
    score: 82,
    level: 'Intermediate',
    totalAnswered: 14,
    color: 'bg-sky-500'
  },
  {
    skill: 'Redis',
    category: 'database',
    score: 76,
    level: 'Intermediate',
    totalAnswered: 12,
    color: 'bg-red-500'
  },
  {
    skill: 'System Design',
    category: 'architecture',
    score: 71,
    level: 'Needs Practice',
    totalAnswered: 9,
    color: 'bg-amber-500'
  }
];

export const demoRecentActivity: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Go Clean Architecture & Dependency Inversion',
    type: 'Mock Interview',
    topic: 'Golang & Backend',
    date: '15 Sep 2026',
    score: 94,
    status: 'Excellent',
    durationMinutes: 18
  },
  {
    id: 'act-2',
    title: 'PostgreSQL ACID Transactions & Row-Level Locking',
    type: 'Practice Session',
    topic: 'SQL & Database',
    date: '14 Sep 2026',
    score: 91,
    status: 'Excellent',
    durationMinutes: 14
  },
  {
    id: 'act-3',
    title: 'Atomic Inventory Stock Decrement (GORM + Fiber)',
    type: 'Coding Challenge',
    topic: 'Golang',
    date: '13 Sep 2026',
    score: 96,
    status: 'Excellent',
    durationMinutes: 25
  },
  {
    id: 'act-4',
    title: 'Database Slow Query Troubleshooting & Index Tuning (PLN Icon+)',
    type: 'Practice Session',
    topic: 'SQL & Database',
    date: '11 Sep 2026',
    score: 88,
    status: 'Completed',
    durationMinutes: 15
  },
  {
    id: 'act-5',
    title: 'Distributed Caching Invalidation & Cache-Aside Pattern',
    type: 'Practice Session',
    topic: 'Redis',
    date: '09 Sep 2026',
    score: 74,
    status: 'Needs Review',
    durationMinutes: 12
  },
  {
    id: 'act-6',
    title: 'Database Sharding & Read/Write Replication Strategy',
    type: 'Mock Interview',
    topic: 'System Design',
    date: '07 Sep 2026',
    score: 68,
    status: 'Needs Review',
    durationMinutes: 20
  }
];

export const getDynamicRecommendation = (skills: SkillProgress[]): RecommendationTopic => {
  const isAllZero = skills.every((s) => s.totalAnswered === 0);

  if (isAllZero) {
    return {
      skill: 'Naskah Perkenalan Diri & Go Clean Architecture',
      score: 0,
      reason: {
        id: 'Anda belum memulai sesi latihan. Memulai dari Naskah Perkenalan Diri atau Skenario Go Clean Architecture adalah langkah awal terbaik untuk membangun rasa percaya diri.',
        en: 'You have not started any practice sessions yet. Beginning with your Self-Introduction Script or Go Clean Architecture is the best first step.'
      },
      suggestedAction: {
        id: 'Buka tab "Perkenalan Diri (Audio)" untuk melatih elevator pitch Anda, atau pilih topik "Go & Backend" di Studio.',
        en: 'Open the "Self-Introduction (Audio)" tab to practice your elevator pitch, or select "Go & Backend" in the Studio.'
      },
      recommendedQuestions: [
        {
          id: 'go-clean-architecture',
          title: {
            id: 'Clean Architecture Decoupling & Mock Testing di Go',
            en: 'Clean Architecture Decoupling & Mock Testing in Go'
          },
          difficulty: 'Intermediate'
        },
        {
          id: 'go-database-transactions',
          title: {
            id: 'Penanganan Transaksi ACID & Row-Level Locking (SELECT FOR UPDATE)',
            en: 'ACID Transactions & Row-Level Locking (SELECT FOR UPDATE)'
          },
          difficulty: 'Advanced'
        },
        {
          id: 'app-support-slow-queries',
          title: {
            id: 'Troubleshooting Query Database Lambat (PLN Icon+ Style)',
            en: 'Slow Query Database Troubleshooting (PLN Icon+ Style)'
          },
          difficulty: 'Intermediate'
        }
      ]
    };
  }

  // If there are answers, find the one with lowest score or lowest answered
  const sorted = [...skills].sort((a, b) => a.score - b.score);
  const weakest = sorted[0];

  return {
    skill: weakest.skill,
    score: weakest.score,
    reason: {
      id: `Skor pada topik ${weakest.skill} saat ini berada di ${weakest.score}%, merupakan area yang paling perlu ditingkatkan berdasarkan riwayat latihan Anda.`,
      en: `Your score in ${weakest.skill} is currently at ${weakest.score}%, which is your lowest area based on your practice history.`
    },
    suggestedAction: {
      id: `Luangkan waktu untuk melatih minimal 2–3 soal seputar ${weakest.skill} di Studio.`,
      en: `Spend time practicing at least 2–3 questions regarding ${weakest.skill} in the Studio.`
    },
    recommendedQuestions: [
      {
        id: 'go-database-transactions',
        title: {
          id: 'Penanganan Transaksi ACID & Row-Level Locking',
          en: 'ACID Transactions & Row-Level Locking'
        },
        difficulty: 'Advanced'
      },
      {
        id: 'app-support-slow-queries',
        title: {
          id: 'Troubleshooting Query Database Lambat (EXPLAIN ANALYZE)',
          en: 'Slow Query Database Troubleshooting (EXPLAIN ANALYZE)'
        },
        difficulty: 'Intermediate'
      }
    ]
  };
};
