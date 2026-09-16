'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Search,
  ChevronRight,
  ChevronDown,
  Layers,
  Server,
  Database,
  UserCheck,
  Code2,
  Terminal,
  HelpCircle,
  Clock,
  ShieldCheck,
  Award,
  Zap,
  BarChart3,
  ListFilter,
  User,
  Sparkles,
  BookOpen,
  Sliders,
  Copy,
  Check,
  FileText,
  Flame,
  TrendingUp,
  Target,
  AlertTriangle,
  Compass,
  CheckCircle,
  Calendar,
  Layers3,
  LayoutDashboard,
  PlusCircle,
  RefreshCw,
  FolderOpen,
  History
} from 'lucide-react';
import {
  interviewQuestions,
  technicalCheatSheet,
  InterviewQuestion,
  PracticeRole,
  PracticeDifficulty,
  PracticeTopic
} from '../lib/data/interviewData';
import {
  codingChallenges
} from '../lib/data/codingChallengeData';
import {
  initialPracticeStats,
  initialSkillProgress,
  initialRecentActivity,
  demoPracticeStats,
  demoSkillProgress,
  demoRecentActivity,
  getDynamicRecommendation,
  PracticeStats,
  SkillProgress,
  ActivityItem
} from '../lib/data/dashboardData';
import PracticeFeature from './components/PracticeFeature';
import CodingChallengeFeature from './components/CodingChallengeFeature';
import HistoryFeature from './components/HistoryFeature';
import MockInterviewFeature from './components/MockInterviewFeature';

type MainTab = 'dashboard' | 'practice' | 'mock' | 'coding' | 'history' | 'pitch' | 'syllabus' | 'cheatsheet';
type PitchLength = 'comprehensive' | 'concise';
type LangMode = 'id' | 'en';

const selfIntroductionData = {
  id: {
    comprehensive: {
      title: 'Naskah Perkenalan Diri (Versi Lengkap & Mendalam — 2 s.d. 3 Menit)',
      subtitle: 'Struktur narasi komprehensif yang menjabarkan latar belakang akademik, pengalaman operasional nyata di PLN Icon+, motivasi transisi ke backend engineering, hingga detail proyek arsitektur Go.',
      duration: 'Durasi Bicara: ~2.5 Menit (360 Kata)',
      script: `Halo, selamat pagi/siang. Perkenalkan nama saya Kevin Eka Pratama. Saya adalah lulusan Sarjana Ilmu Komputer dari Universitas AMIKOM dengan IPK 3.42, dan memiliki pengalaman profesional lebih dari 2 tahun di bidang Application Support pada PT PLN Icon+.

Selama bekerja di PLN Icon+, tanggung jawab utama saya berfokus pada menjaga keandalan dan stabilitas sistem operasional harian. Dalam keseharian, saya terbiasa melakukan pemantauan sistem, menganalisis log error server, mendiagnosis query database relasional (PostgreSQL, Oracle, MySQL) yang mengalami bottleneck menggunakan EXPLAIN ANALYZE, serta berkoordinasi secara terstruktur dengan tim developer untuk pelaporan bug dan verifikasi hotfix demi menjaga batas SLA operasional.

Pengalaman bertahun-tahun menangani insiden di lingkungan produksi tersebut memberi saya pemahaman nyata mengenai apa saja celah yang sering memicu kegagalan sistem. Dari situ, saya memiliki motivasi kuat untuk tidak hanya memperbaiki masalah di hilir, tetapi membangun solusi perangkat lunak yang tangguh sejak awal di tahap rekayasa arsitektur kode.

Untuk itu, saya secara konsisten memperdalam software engineering dengan membangun lebih dari 20 aplikasi mandiri. Fokus spesialisasi saya adalah pengembangan backend RESTful API menggunakan bahasa Go (Golang) berprinsip Clean Architecture, di mana logika bisnis (usecase) dipisahkan secara tegas dari layer database dan routing framework. Saya juga memiliki pemahaman praktis dalam penanganan transaksi database ACID dan row-level locking (SELECT FOR UPDATE) pada sistem perbankan untuk mencegah race condition, serta mengintegrasikan antarmuka modern menggunakan React, Next.js, dan TypeScript.

Kombinasi antara pengalaman operasional produksi di PLN Icon+ dan kebiasaan membangun backend ini membentuk pola pikir saya: saya terbiasa menulis kode yang defensif, mengoptimalkan query database relasional, dan menyusun arsitektur modular yang mudah diuji dan dipelihara. Saya sangat bersemangat untuk dapat berkontribusi langsung sebagai Backend Developer yang proaktif dan handal di tim Anda.`,
      bulletPoints: [
        'Pendidikan: Sarjana Ilmu Komputer, Universitas AMIKOM (IPK 3.42 / 4.00)',
        'Pengalaman Kerja: 2+ Tahun Application Support di PT PLN Icon+ (System monitoring, SLA incident, SQL troubleshooting)',
        'Keahlian Utama: Go (Golang), Clean Architecture 4-layer, PostgreSQL ACID Transactions, REST API, React/TypeScript',
        'Studi Kasus Proyek: Go Banking Core Engine (ACID row locks), Go Clean Arch REST API, Tokopedia Marketplace Fullstack',
        'Value Added: Production-first mindset (mencegah bug sejak desain database & arsitektur kode)'
      ]
    },
    concise: {
      title: 'Naskah Perkenalan Diri (Versi Ringkas / Elevator Pitch — 60 Detik)',
      subtitle: 'Format opening singkat, padat, dan berdampak tinggi untuk sesi HR screening awal.',
      duration: 'Durasi Bicara: ~60 Detik (150 Kata)',
      script: `Halo, perkenalkan nama saya Kevin Eka Pratama. Saya adalah lulusan Ilmu Komputer Universitas AMIKOM dengan IPK 3.42 dan memiliki 2+ tahun pengalaman profesional di bidang Application Support pada PT PLN Icon+.

Di PLN Icon+, saya terbiasa memantau sistem operasional, melakukan investigasi query database PostgreSQL/Oracle yang lambat, dan menangani insiden produksi. Di samping itu, saya aktif membangun 20+ aplikasi mandiri dengan fokus utama pada Backend Go (Golang), Clean Architecture, transaksi database ACID PostgreSQL, dan React/TypeScript.

Kombinasi pengalaman operasional produksi nyata dan keahlian rekayasa backend ini membuat saya memiliki pola pikir defensif: saya tidak hanya fokus membuat fitur bekerja, tetapi memastikan query efisien, error tertangani dengan aman, dan sistem mudah di-scale. Saya siap berkontribusi sebagai Backend Developer di tim Anda.`,
      bulletPoints: [
        'Pendidikan: Universitas AMIKOM (IPK 3.42 / 4.00)',
        'Pengalaman: 2+ Tahun Application Support di PT PLN Icon+',
        'Spesialisasi: Backend Go (Golang), PostgreSQL, Clean Architecture, React',
        'Keunggulan: Terbiasa dengan troubleshooting produksi dan kode defensif'
      ]
    }
  },
  en: {
    comprehensive: {
      title: 'Self-Introduction Script (Comprehensive Deep-Dive — 2 to 3 Minutes)',
      subtitle: 'Detailed narrative covering academic background, real-world PLN Icon+ operational support, engineering transition, and Go architecture projects.',
      duration: 'Speaking Duration: ~2.5 Minutes (350 Words)',
      script: `Hello, good morning/afternoon. My name is Kevin Eka Pratama. I hold a Bachelor's degree in Computer Science from Universitas AMIKOM with a 3.42 GPA, and I bring over 2 years of professional experience in Application Support at PT PLN Icon+.

At PLN Icon+, my primary responsibility was maintaining the high availability and operational stability of core daily systems. On a day-to-day basis, I actively monitored application logs, diagnosed slow relational database queries (PostgreSQL, Oracle, MySQL) using EXPLAIN ANALYZE to resolve performance bottlenecks, and coordinated directly with software engineering teams to report bugs and verify hotfixes within strict SLA timelines.

Handling production incidents over the years gave me firsthand insight into common operational failure points. This experience ignited my passion to transition from resolving downstream production symptoms to engineering resilient, scalable backend architectures from the ground up.

To achieve this, I have continuously developed my software engineering capabilities by building more than 20 personal applications. My core specialization is in developing RESTful API backend services using Go (Golang) adhering to Clean Architecture principles—strictly decoupling domain entities and usecase business logic from database drivers and web frameworks. I also have hands-on experience implementing ACID-compliant database transactions and row-level locking (SELECT FOR UPDATE) to prevent concurrency race conditions in banking and e-commerce checkout flows, complemented by modern frontend integration in React and TypeScript.

This unique blend of real-world production support discipline and active backend engineering defines my approach: I write defensive code, prioritize efficient SQL queries, and design modular systems that are easy to test and maintain. I am very excited to bring this production-first mindset to your engineering team as a dedicated Backend Developer.`,
      bulletPoints: [
        'Education: Bachelor of Computer Science, Universitas AMIKOM (GPA: 3.42 / 4.00)',
        'Experience: 2+ Years Application Support at PT PLN Icon+ (System monitoring, SLA triage, SQL query tuning)',
        'Core Stack: Go (Golang), Clean Architecture, PostgreSQL ACID Transactions, REST APIs, React/TypeScript',
        'Featured Projects: Go Banking Core Engine (Row-level locks), Go Clean Arch REST API, Tokopedia Fullstack',
        'Value Proposition: Production-first mindset bridging system reliability with robust backend engineering'
      ]
    },
    concise: {
      title: 'Self-Introduction Script (Concise Elevator Pitch — 60 Seconds)',
      subtitle: 'Sharp, impactful opening pitch designed for HR screening and quick interview rounds.',
      duration: 'Speaking Duration: ~60 Seconds (150 Words)',
      script: `Hello, my name is Kevin Eka Pratama. I hold a Bachelor's degree in Computer Science from Universitas AMIKOM with a 3.42 GPA and bring 2+ years of professional experience in Application Support at PT PLN Icon+.

At PLN Icon+, I specialized in operational system monitoring, investigating slow relational database queries in PostgreSQL/Oracle, and managing incident triage. In parallel, I have built 20+ personal software projects with a strong focus on Go (Golang) backend services, Clean Architecture, PostgreSQL ACID transactions, and React/TypeScript.

This blend of authentic production support resilience and backend development means I write defensive, well-structured code with optimized database queries. I am ready to contribute immediately as a proactive Backend Developer on your team.`,
      bulletPoints: [
        'Education: Universitas AMIKOM (GPA: 3.42 / 4.00)',
        'Experience: 2+ Years Application Support at PT PLN Icon+',
        'Specialization: Go (Golang) Backend, PostgreSQL, Clean Architecture, React',
        'Differentiator: Production-tested SQL troubleshooting and defensive coding'
      ]
    }
  }
};

const STORAGE_KEYS = {
  STATS: 'mazkev_interview_stats',
  SKILLS: 'mazkev_interview_skills',
  ACTIVITIES: 'mazkev_interview_activities'
};

export default function InterviewPracticePage() {
  const [activeTab, setActiveTab] = useState<MainTab>('dashboard');
  const [pitchLength, setPitchLength] = useState<PitchLength>('comprehensive');
  const [lang, setLang] = useState<LangMode>('id');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');

  // Dynamic Dashboard States (Loaded from localStorage)
  const [practiceStats, setPracticeStats] = useState<PracticeStats>(initialPracticeStats);
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>(initialSkillProgress);
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>(initialRecentActivity);

  // Audio Speech States
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Load Persisted Stats from LocalStorage on mount
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);
      const savedSkills = localStorage.getItem(STORAGE_KEYS.SKILLS);
      const savedActs = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);

      if (savedStats) setPracticeStats(JSON.parse(savedStats));
      if (savedSkills) setSkillProgress(JSON.parse(savedSkills));
      if (savedActs) setRecentActivities(JSON.parse(savedActs));
    } catch (e) {
      console.error('Error reading localStorage data', e);
    }
  }, []);

  // Filtered Questions for Question Bank Syllabus
  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter((q) => {
      const matchTopic = selectedTopicFilter === 'all' || q.topic === selectedTopicFilter;
      const qText = `${q.question[lang]} ${q.context} ${q.keyConcepts.join(' ')} ${q.role} ${q.topic}`.toLowerCase();
      const matchSearch = searchQuery === '' || qText.includes(searchQuery.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [selectedTopicFilter, searchQuery, lang]);

  const currentPitch = selfIntroductionData[lang][pitchLength];
  const recommendedPractice = useMemo(() => getDynamicRecommendation(skillProgress), [skillProgress]);

  // Cancel speech on unmount / tab change
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeTab, lang, pitchLength]);

  // Audio Handler
  const handlePlayVoice = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Browser Anda tidak mendukung Web Speech API.');
      return;
    }

    if (isAudioPlaying) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
    utterance.rate = speechRate;

    utterance.onstart = () => setIsAudioPlaying(true);
    utterance.onend = () => setIsAudioPlaying(false);
    utterance.onerror = () => setIsAudioPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(currentPitch.script);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Synchronize Practice Result to Dashboard and LocalStorage
  const handleSavePracticeResult = (
    newActivity: ActivityItem,
    score: number,
    topicName: string,
    questionCount: number,
    durationMinutes: number
  ) => {
    const updatedActivities = [newActivity, ...recentActivities.slice(0, 19)];

    // Update Stats
    const totalSessions = practiceStats.totalSessions + 1;
    const totalAnswered = practiceStats.questionsAnswered + questionCount;
    const newAvg = practiceStats.totalSessions === 0
      ? score
      : Math.round(((practiceStats.averageScore * practiceStats.totalSessions) + score) / totalSessions * 10) / 10;

    const updatedStats: PracticeStats = {
      totalSessions,
      questionsAnswered: totalAnswered,
      codingChallengesCompleted: practiceStats.codingChallengesCompleted + (topicName.toLowerCase().includes('golang') ? 1 : 0),
      averageScore: newAvg
    };

    // Update skill score mapping
    const targetSkill = skillProgress.find((s) =>
      topicName.toLowerCase().includes(s.skill.toLowerCase()) ||
      s.skill.toLowerCase().includes(topicName.toLowerCase())
    );

    const targetSkillName = targetSkill ? targetSkill.skill : 'Golang';

    const updatedSkills = skillProgress.map((s) => {
      if (s.skill === targetSkillName) {
        const count = s.totalAnswered + questionCount;
        const currentTotal = s.score * s.totalAnswered;
        const calcScore = Math.round((currentTotal + score * questionCount) / count);
        return {
          ...s,
          score: calcScore,
          totalAnswered: count,
          level: calcScore >= 85 ? 'Advanced' : calcScore >= 70 ? 'Intermediate' : 'Needs Practice'
        };
      }
      return s;
    });

    setPracticeStats(updatedStats);
    setRecentActivities(updatedActivities);
    setSkillProgress(updatedSkills);

    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updatedActivities));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updatedSkills));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  };

  // Callback when user solves a Mock Interview
  const handleSaveMockResult = (
    newActivity: ActivityItem,
    score: number,
    roleLabel: string,
    durationMinutes: number
  ) => {
    const updatedActivities = [newActivity, ...recentActivities.slice(0, 19)];
    const totalSessions = practiceStats.totalSessions + 1;
    const totalAnswered = practiceStats.questionsAnswered + 5;
    const newAvg = practiceStats.totalSessions === 0
      ? score
      : Math.round(((practiceStats.averageScore * practiceStats.totalSessions) + score) / totalSessions * 10) / 10;

    const updatedStats: PracticeStats = {
      totalSessions,
      questionsAnswered: totalAnswered,
      codingChallengesCompleted: practiceStats.codingChallengesCompleted,
      averageScore: newAvg
    };

    // Update Golang and System Design skills
    const updatedSkills = skillProgress.map((s) => {
      if (s.skill === 'Golang' || s.skill === 'System Design') {
        const count = s.totalAnswered + 2;
        const currentTotal = s.score * s.totalAnswered;
        const calcScore = Math.round((currentTotal + score * 2) / count);
        return {
          ...s,
          score: calcScore,
          totalAnswered: count,
          level: calcScore >= 85 ? 'Advanced' : calcScore >= 70 ? 'Intermediate' : 'Needs Practice'
        };
      }
      return s;
    });

    setPracticeStats(updatedStats);
    setRecentActivities(updatedActivities);
    setSkillProgress(updatedSkills);

    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updatedActivities));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updatedSkills));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  };

  // Callback when user solves a Coding Challenge
  const handleCodingChallengeCompleted = (newActivity: ActivityItem, challengeTitle: string) => {
    const updatedActivities = [newActivity, ...recentActivities.slice(0, 19)];
    const newChallengesCompleted = practiceStats.codingChallengesCompleted + 1;
    const totalAnswered = practiceStats.questionsAnswered + 1;
    const totalSessions = practiceStats.totalSessions + 1;
    const newAvg = practiceStats.totalSessions === 0
      ? 100
      : Math.round(((practiceStats.averageScore * practiceStats.totalSessions) + 100) / totalSessions * 10) / 10;

    const updatedStats: PracticeStats = {
      totalSessions,
      questionsAnswered: totalAnswered,
      codingChallengesCompleted: newChallengesCompleted,
      averageScore: newAvg
    };

    // Update Golang skill progress
    const updatedSkills = skillProgress.map((s) => {
      if (s.skill === 'Golang') {
        const count = s.totalAnswered + 1;
        const currentTotal = s.score * s.totalAnswered;
        const calcScore = Math.round((currentTotal + 100) / count);
        return {
          ...s,
          score: calcScore,
          totalAnswered: count,
          level: calcScore >= 85 ? 'Advanced' : calcScore >= 70 ? 'Intermediate' : 'Needs Practice'
        };
      }
      return s;
    });

    setPracticeStats(updatedStats);
    setRecentActivities(updatedActivities);
    setSkillProgress(updatedSkills);

    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updatedActivities));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updatedSkills));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  };

  // Demo / Reset controls
  const handleLoadDemoData = () => {
    setPracticeStats(demoPracticeStats);
    setSkillProgress(demoSkillProgress);
    setRecentActivities(demoRecentActivity);
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(demoPracticeStats));
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(demoRecentActivity));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(demoSkillProgress));
    } catch (e) {}
  };

  const handleResetData = () => {
    setPracticeStats(initialPracticeStats);
    setSkillProgress(initialSkillProgress);
    setRecentActivities(initialRecentActivity);
    try {
      localStorage.removeItem(STORAGE_KEYS.STATS);
      localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
      localStorage.removeItem(STORAGE_KEYS.SKILLS);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20">
      {/* ========================================================= */}
      {/* 1. TOP HEADER */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Return */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft size={16} className="text-slate-800" />
              <span className="hidden sm:inline">Kembali ke Portofolio</span>
            </Link>

            <div className="h-4 w-px bg-slate-300 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-slate-900">
                Pusat Latihan Interview
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                CV Verified
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard size={14} className={activeTab === 'dashboard' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play size={14} className={activeTab === 'practice' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Latihan Soal</span>
            </button>

            <button
              onClick={() => setActiveTab('mock')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'mock'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={14} className={activeTab === 'mock' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Mock Interview</span>
            </button>

            <button
              onClick={() => setActiveTab('coding')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'coding'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 size={14} className={activeTab === 'coding' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Coding Arena ({codingChallenges.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History size={14} className={activeTab === 'history' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Riwayat (History)</span>
            </button>

            <button
              onClick={() => setActiveTab('pitch')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'pitch'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User size={14} className={activeTab === 'pitch' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Perkenalan (Audio)</span>
            </button>

            <button
              onClick={() => setActiveTab('syllabus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'syllabus'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter size={14} className={activeTab === 'syllabus' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Bank Soal ({interviewQuestions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'cheatsheet'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap size={14} className={activeTab === 'cheatsheet' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Cheat Sheet</span>
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 border border-slate-200 p-0.5 rounded-lg text-xs font-mono font-bold">
              <button
                onClick={() => setLang('id')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'id' ? 'bg-white text-emerald-700 shadow-sm font-extrabold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-white text-emerald-700 shadow-sm font-extrabold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MOBILE TAB SELECTOR */}
      {/* ========================================================= */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto text-xs font-bold">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'practice', label: 'Latihan' },
          { id: 'mock', label: 'Mock' },
          { id: 'coding', label: 'Coding' },
          { id: 'history', label: 'Riwayat' },
          { id: 'pitch', label: 'Perkenalan' },
          { id: 'syllabus', label: 'Bank Soal' },
          { id: 'cheatsheet', label: 'Cheat Sheet' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as MainTab)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-emerald-600 text-white font-extrabold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN WORKSPACE */}
      {/* ========================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* ========================================================= */}
        {/* TAB 0: DASHBOARD PAGE */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top Welcome & Summary Header */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                  <Sparkles size={13} />
                  <span>Interview Readiness Track • Backend Go & System Architecture</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Dashboard Kemajuan Latihan
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Statistik ini diperbarui secara otomatis saat Anda melatih soal di menu Latihan Soal, menyelesaikan Mock Interview, atau meninjau Riwayat Latihan.
                </p>
              </div>

              {/* Action & Demo Data Toggle */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setActiveTab('mock')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <UserCheck size={15} />
                  <span>Mulai Mock Interview</span>
                </button>

                <button
                  onClick={() => setActiveTab('coding')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Code2 size={15} className="text-emerald-400" />
                  <span>Coding Arena</span>
                </button>

                {practiceStats.totalSessions === 0 ? (
                  <button
                    onClick={handleLoadDemoData}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Muat contoh data simulasi untuk melihat pratinjau statistik penuh"
                  >
                    <FolderOpen size={14} />
                    <span>Lihat Contoh Data</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetData}
                    className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-bold text-xs border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Reset semua riwayat latihan kembali ke 0"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Data (0)</span>
                  </button>
                )}
              </div>
            </div>

            {/* 1. PRACTICE STATISTICS (4 CARDS) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stat 1: Total Sessions */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Total Sesi</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Clock size={16} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {practiceStats.totalSessions}
                </div>
                <p className="text-[11px] text-slate-500">
                  {practiceStats.totalSessions === 0 ? 'Belum ada sesi latihan' : `${practiceStats.totalSessions} sesi selesai`}
                </p>
              </div>

              {/* Stat 2: Questions Answered */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Soal Terlatih</span>
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                    <CheckCircle2 size={16} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {practiceStats.questionsAnswered}
                </div>
                <p className="text-[11px] text-slate-500">
                  Dari total {interviewQuestions.length} bank soal
                </p>
              </div>

              {/* Stat 3: Coding Challenges Completed */}
              <div
                onClick={() => setActiveTab('coding')}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-300 transition-all shadow-sm space-y-2 cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider group-hover:text-emerald-700 transition-colors">Coding Challenge</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Code2 size={16} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {practiceStats.codingChallengesCompleted}
                </div>
                <p className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Arsitektur Go & Concurrency</span>
                  <ChevronRight size={13} className="text-slate-400 group-hover:text-emerald-600" />
                </p>
              </div>

              {/* Stat 4: Average Score */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Rata-Rata Skor</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Award size={16} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-700">
                  {practiceStats.averageScore > 0 ? `${practiceStats.averageScore}%` : '0%'}
                </div>
                <p className="text-[11px] text-slate-500">
                  {practiceStats.averageScore >= 85
                    ? 'Kategori: Strong Hire'
                    : practiceStats.averageScore >= 70
                    ? 'Kategori: Competent'
                    : 'Belum ada evaluasi'}
                </p>
              </div>
            </div>

            {/* 2. MAIN GRID: SKILL PROGRESS & RECOMMENDED PRACTICE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Skill Progress List (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-emerald-600" />
                    <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Penguasaan Topik Teknis (Skill Progress)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">6 Bidang Evaluasi</span>
                </div>

                <div className="space-y-4">
                  {skillProgress.map((item, idx) => (
                    <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{item.skill}</span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            item.score >= 85
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.score >= 70
                              ? 'bg-sky-100 text-sky-800'
                              : item.score > 0
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {item.level}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="text-slate-500">{item.totalAnswered} Soal</span>
                          <span className="font-black text-slate-900">{item.score}%</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${item.color}`}
                          style={{ width: `${Math.max(item.score, item.totalAnswered > 0 ? 10 : 0)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Recommended Practice Card (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-amber-50/80 rounded-2xl border border-amber-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                      <AlertTriangle size={17} className="text-amber-600 flex-shrink-0" />
                      <span>Rekomendasi Langkah Latihan</span>
                    </div>
                    {recommendedPractice.score > 0 && (
                      <span className="px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 text-[10px] font-mono font-black">
                        {recommendedPractice.score}%
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-amber-950">
                    <p className="font-bold text-sm text-slate-900">
                      Fokus Topik: {recommendedPractice.skill}
                    </p>
                    <p className="leading-relaxed text-slate-700">
                      {recommendedPractice.reason[lang]}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-800 space-y-1">
                    <strong className="text-amber-800 font-mono">Saran Tindakan:</strong>
                    <p className="leading-relaxed">{recommendedPractice.suggestedAction[lang]}</p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                      Soal Latihan yang Disarankan:
                    </span>
                    <div className="space-y-1.5">
                      {recommendedPractice.recommendedQuestions.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          onClick={() => setActiveTab('mock')}
                          className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-between text-xs cursor-pointer group"
                        >
                          <span className="text-slate-800 font-medium group-hover:text-emerald-700 truncate pr-2">
                            {q.title[lang]}
                          </span>
                          <ChevronRight size={13} className="text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('mock')}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Mulai Simulasi Wawancara</span>
                    <ArrowLeft size={13} className="rotate-180" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. RECENT ACTIVITY TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-emerald-600" />
                  <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Aktivitas & Riwayat Latihan Terbaru
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
                >
                  <span>Lihat Semua Riwayat ({recentActivities.length})</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              {recentActivities.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800">Belum ada riwayat sesi latihan</p>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Saat Anda menyelesaikan sesi latihan, simulasi Mock Interview, atau menjawab tantangan Coding Challenge, aktivitas Anda akan otomatis tercatat di sini.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('mock')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    <UserCheck size={14} />
                    <span>Mulai Mock Interview Pertama</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-[11px] font-mono text-slate-500 uppercase">
                        <th className="pb-3 font-bold">Judul Sesi / Soal</th>
                        <th className="pb-3 font-bold">Tipe Sesi</th>
                        <th className="pb-3 font-bold">Topik</th>
                        <th className="pb-3 font-bold">Tanggal</th>
                        <th className="pb-3 font-bold">Durasi</th>
                        <th className="pb-3 font-bold text-right">Skor / Hasil</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {recentActivities.map((act) => (
                        <tr
                          key={act.id}
                          onClick={() => setActiveTab('history')}
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                        >
                          <td className="py-3 font-bold text-slate-900 max-w-xs truncate">
                            {act.title}
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              act.type === 'Mock Interview'
                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                : act.type === 'Coding Challenge'
                                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}>
                              {act.type}
                            </span>
                          </td>
                          <td className="py-3 text-slate-600 text-xs">
                            {act.topic}
                          </td>
                          <td className="py-3 text-slate-500 text-xs font-mono">
                            {act.date}
                          </td>
                          <td className="py-3 text-slate-500 text-xs font-mono">
                            {act.durationMinutes} mnt
                          </td>
                          <td className="py-3 text-right">
                            <div className="inline-flex items-center gap-1.5 font-mono font-black">
                              <span className={`text-xs ${
                                act.score >= 85
                                ? 'text-emerald-700'
                                : act.score >= 70
                                ? 'text-sky-700'
                                : 'text-amber-700'
                              }`}>
                                {act.score}%
                              </span>
                              <span className={`w-2 h-2 rounded-full ${
                                act.score >= 85
                                ? 'bg-emerald-500'
                                : act.score >= 70
                                ? 'bg-sky-500'
                                : 'bg-amber-500'
                              }`} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: PRACTICE FEATURE */}
        {/* ========================================================= */}
        {activeTab === 'practice' && (
          <PracticeFeature
            lang={lang}
            onSaveResult={handleSavePracticeResult}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {/* ========================================================= */}
        {/* TAB 2: MOCK INTERVIEW FEATURE */}
        {/* ========================================================= */}
        {activeTab === 'mock' && (
          <MockInterviewFeature
            lang={lang}
            onSaveMockResult={handleSaveMockResult}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {/* ========================================================= */}
        {/* TAB 3: CODING CHALLENGE FEATURE */}
        {/* ========================================================= */}
        {activeTab === 'coding' && (
          <CodingChallengeFeature
            lang={lang}
            onChallengeCompleted={handleCodingChallengeCompleted}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {/* ========================================================= */}
        {/* TAB 4: HISTORY FEATURE */}
        {/* ========================================================= */}
        {activeTab === 'history' && (
          <HistoryFeature
            lang={lang}
            onNavigateToPractice={() => setActiveTab('practice')}
            onNavigateToCoding={() => setActiveTab('coding')}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {/* ========================================================= */}
        {/* TAB 5: SELF-INTRODUCTION ELEVATOR PITCH & AUDIO PLAYER */}
        {/* ========================================================= */}
        {activeTab === 'pitch' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                    <User size={13} />
                    <span>Naskah Wawancara #1: Ceritakan Tentang Diri Anda</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {currentPitch.title}
                  </h1>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    {currentPitch.subtitle}
                  </p>
                </div>

                {/* Pitch Length Toggle Button Group */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto text-xs font-bold">
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      }
                      setIsAudioPlaying(false);
                      setPitchLength('comprehensive');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      pitchLength === 'comprehensive'
                        ? 'bg-white text-emerald-800 shadow-sm border border-slate-200 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Versi Lengkap (2–3 Menit)
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      }
                      setIsAudioPlaying(false);
                      setPitchLength('concise');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      pitchLength === 'concise'
                        ? 'bg-white text-emerald-800 shadow-sm border border-slate-200 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Versi Ringkas (60 Detik)
                  </button>
                </div>
              </div>

              {/* Audio Controls Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlayVoice(currentPitch.script)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer ${
                      isAudioPlaying
                        ? 'bg-emerald-700 text-white animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold'
                    }`}
                  >
                    {isAudioPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
                    <span>{isAudioPlaying ? 'Jeda Suara Audio' : 'Dengarkan Contoh Pengucapan Suara'}</span>
                  </button>

                  <button
                    onClick={handleCopyPitch}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{isCopied ? 'Tersalin!' : 'Salin Teks Naskah'}</span>
                  </button>
                </div>

                {/* Speech Speed Selector */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="font-mono">Kecepatan:</span>
                  {[0.8, 1.0, 1.2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                        speechRate === rate
                          ? 'bg-slate-900 text-white border-slate-900 font-extrabold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Pitch Body & Key Highlights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Teleprompter Pitch Text (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-emerald-600" />
                    <span>Naskah Narasi Lengkap:</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    {currentPitch.duration}
                  </span>
                </div>

                <div className="text-sm sm:text-[15px] text-slate-800 leading-relaxed space-y-4 whitespace-pre-line font-sans">
                  {currentPitch.script}
                </div>
              </div>

              {/* Right: Key Bullets & Strategy Points (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm border-b border-slate-100 pb-3">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <span>Poin Wajib yang Ditegaskan dalam CV:</span>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {currentPitch.bulletPoints.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50/80 rounded-2xl border border-emerald-200 p-6 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider font-mono">
                    <Zap size={14} className="text-emerald-600" />
                    <span>Tips Eksekusi Wawancara:</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Ucapkan naskah perkenalan diri dengan tempo santai, percaya diri, dan artikulasi jelas. Tekankan kata kunci <strong>2+ tahun di PT PLN Icon+</strong> dan <strong>Go Clean Architecture</strong> karena poin inilah yang membedakan Anda dengan fresh graduate lain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: QUESTION BANK SYLLABUS */}
        {/* ========================================================= */}
        {activeTab === 'syllabus' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Bank Pertanyaan & Kisi-Kisi Lengkap</h2>
                <p className="text-xs text-slate-500">
                  Daftar seluruh topik wawancara teknis backend Golang, Java, database SQL, Docker, Redis, Kafka, gRPC, dan System Design.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                {/* Topic Selector */}
                <select
                  value={selectedTopicFilter}
                  onChange={(e) => setSelectedTopicFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Semua Topik</option>
                  <option value="Golang">Golang</option>
                  <option value="SQL">SQL</option>
                  <option value="REST API">REST API</option>
                  <option value="Database">Database</option>
                  <option value="Docker">Docker</option>
                  <option value="Redis">Redis</option>
                  <option value="Kafka">Kafka</option>
                  <option value="gRPC">gRPC</option>
                  <option value="System Design">System Design</option>
                </select>

                <div className="relative w-full md:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari topik pertanyaan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuestions.map((q, idx) => (
                <div
                  key={q.id + idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        {q.topic} • {q.role}
                      </span>
                      <span className="text-slate-400">{q.difficulty}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {idx + 1}. {q.question[lang]}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {q.suggestedAnswer[lang]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">
                      {q.context}
                    </span>

                    <button
                      onClick={() => setActiveTab('practice')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Latih Soal Ini</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: CHEAT SHEET */}
        {/* ========================================================= */}
        {activeTab === 'cheatsheet' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900">Technical Architecture Cheat Sheet</h2>
              <p className="text-xs text-slate-500">
                Formula ringkas arsitektur Go, transaksi database ACID, troubleshooting PLN Icon+, dan metode STAR.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technicalCheatSheet.map((sheet, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>{sheet.topic}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                    {sheet.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-mono font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
