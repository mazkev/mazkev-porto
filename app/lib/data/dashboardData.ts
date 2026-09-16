export interface PracticeStats {
  totalSessions: number;
  questionsAnswered: number;
  codingChallengesCompleted: number;
  averageScore: number;
  weeklyTarget: {
    current: number;
    goal: number;
  };
}

export interface SkillProgress {
  skill: string;
  category: 'core-backend' | 'database' | 'infrastructure' | 'architecture';
  score: number;
  level: string;
  totalAnswered: number;
  trend: 'up' | 'stable' | 'down';
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

export const practiceStatsData: PracticeStats = {
  totalSessions: 24,
  questionsAnswered: 142,
  codingChallengesCompleted: 18,
  averageScore: 88.5,
  weeklyTarget: {
    current: 4,
    goal: 5
  }
};

export const skillProgressData: SkillProgress[] = [
  {
    skill: 'Golang',
    category: 'core-backend',
    score: 92,
    level: 'Advanced',
    totalAnswered: 46,
    trend: 'up',
    color: 'bg-cyan-500'
  },
  {
    skill: 'SQL & PostgreSQL',
    category: 'database',
    score: 89,
    level: 'Advanced',
    totalAnswered: 38,
    trend: 'up',
    color: 'bg-blue-600'
  },
  {
    skill: 'REST API',
    category: 'core-backend',
    score: 94,
    level: 'Proficient',
    totalAnswered: 32,
    trend: 'up',
    color: 'bg-emerald-500'
  },
  {
    skill: 'Docker',
    category: 'infrastructure',
    score: 82,
    level: 'Intermediate',
    totalAnswered: 14,
    trend: 'stable',
    color: 'bg-sky-500'
  },
  {
    skill: 'Redis',
    category: 'database',
    score: 76,
    level: 'Intermediate',
    totalAnswered: 12,
    trend: 'down',
    color: 'bg-red-500'
  },
  {
    skill: 'System Design',
    category: 'architecture',
    score: 71,
    level: 'Needs Practice',
    totalAnswered: 9,
    trend: 'down',
    color: 'bg-amber-500'
  }
];

export const recentActivityData: ActivityItem[] = [
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

export const getRecommendedPractice = (): RecommendationTopic => {
  // Identify the weakest topic dynamically based on lowest score
  const sortedSkills = [...skillProgressData].sort((a, b) => a.score - b.score);
  const weakest = sortedSkills[0]; // 'System Design' (71) or 'Redis' (76)

  return {
    skill: weakest.skill,
    score: weakest.score,
    reason: {
      id: `Skor pada topik ${weakest.skill} saat ini berada di ${weakest.score}%, merupakan skor terendah dibanding topik lainnya. Latihan tambahan disarankan sebelum sesi interview teknis tingkat lanjut.`,
      en: `Your score in ${weakest.skill} is currently at ${weakest.score}%, which is your lowest area. Additional review is recommended before advanced technical interviews.`
    },
    suggestedAction: {
      id: 'Fokus pada pola replikasi database (Read/Write Replica), teknik Caching Cache-Aside di Redis, dan pemisahan service.',
      en: 'Focus on database replication patterns (Read/Write Replicas), Cache-Aside strategies in Redis, and modular service separation.'
    },
    recommendedQuestions: [
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
          id: 'Troubleshooting Query Database Lambat (EXPLAIN ANALYZE & Indexing)',
          en: 'Slow Query Database Troubleshooting (EXPLAIN ANALYZE & Indexing)'
        },
        difficulty: 'Intermediate'
      },
      {
        id: 'go-clean-architecture',
        title: {
          id: 'Clean Architecture Decoupling & Mock Testing',
          en: 'Clean Architecture Decoupling & Mock Testing'
        },
        difficulty: 'Intermediate'
      }
    ]
  };
};
