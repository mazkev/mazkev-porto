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
  LayoutDashboard
} from 'lucide-react';
import {
  interviewQuestions,
  technicalCheatSheet,
  InterviewQuestion,
  InterviewCategory
} from '../lib/data/interviewData';
import {
  practiceStatsData,
  skillProgressData,
  recentActivityData,
  getRecommendedPractice,
  ActivityItem,
  SkillProgress
} from '../lib/data/dashboardData';

type MainTab = 'dashboard' | 'pitch' | 'studio' | 'syllabus' | 'cheatsheet';
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

export default function InterviewPracticePage() {
  const [activeTab, setActiveTab] = useState<MainTab>('dashboard');
  const [pitchLength, setPitchLength] = useState<PitchLength>('comprehensive');
  const [lang, setLang] = useState<LangMode>('id');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Audio Speech States
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Candidate Response / Mic States
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Practice Timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter((q) => {
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      const qText = `${q.question[lang]} ${q.context} ${q.keyConcepts.join(' ')}`.toLowerCase();
      const matchSearch = searchQuery === '' || qText.includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, lang]);

  const currentQuestion: InterviewQuestion =
    filteredQuestions[currentIndex] || interviewQuestions[0];

  const currentPitch = selfIntroductionData[lang][pitchLength];
  const recommendedPractice = useMemo(() => getRecommendedPractice(), []);

  // Speech Recognition (Web Speech API)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = lang === 'id' ? 'id-ID' : 'en-US';

        recognition.onresult = (event: any) => {
          let resultStr = '';
          for (let i = 0; i < event.results.length; i++) {
            resultStr += event.results[i][0].transcript + ' ';
          }
          setUserTranscript(resultStr.trim());
        };

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition;
      }
    }
  }, [lang]);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive) {
      interval = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  // Cancel speech on unmount / change
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeTab, currentIndex, lang, pitchLength]);

  // Play Speech Function
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

  const handleToggleRecord = () => {
    if (!recognitionRef.current) {
      alert(
        lang === 'id'
          ? 'Browser tidak mendukung input mikrofon langsung. Silakan ketik narasi jawaban Anda pada kolom teks.'
          : 'Microphone speech recognition is not supported in this browser. Please type your response.'
      );
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIsTimerActive(false);
    } else {
      setUserTranscript('');
      recognitionRef.current.start();
      setIsRecording(true);
      setIsTimerActive(true);
    }
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(currentPitch.script);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Keyword Matching
  const keywordAnalysis = useMemo(() => {
    const lowerTranscript = userTranscript.toLowerCase();
    const matched = currentQuestion.keyConcepts.filter((kw) =>
      lowerTranscript.includes(kw.toLowerCase())
    );
    const score = Math.round((matched.length / currentQuestion.keyConcepts.length) * 100);
    return {
      matched,
      score: userTranscript.length > 15 ? Math.max(score, 75) : 0,
      wordCount: userTranscript.trim() ? userTranscript.trim().split(/\s+/).length : 0
    };
  }, [userTranscript, currentQuestion]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20">
      {/* ========================================================= */}
      {/* 1. TOP HEADER (Clean White & High Contrast) */}
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

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard size={14} className={activeTab === 'dashboard' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Dashboard Latihan</span>
            </button>

            <button
              onClick={() => setActiveTab('pitch')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'pitch'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User size={14} className={activeTab === 'pitch' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Perkenalan Diri (Audio)</span>
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'studio'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal size={14} className={activeTab === 'studio' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Tanya Jawab Teknis</span>
            </button>

            <button
              onClick={() => setActiveTab('syllabus')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
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
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto text-xs font-bold">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'pitch', label: 'Perkenalan' },
          { id: 'studio', label: 'Tanya Jawab' },
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
                  <span>Interview Readiness Track • Backend Go & System Support</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Dashboard Kemajuan Latihan
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  Pantau statistik latihan, kesiapan topik teknis (Golang, SQL, REST API, Redis, System Design), dan histori simulasi wawancara Anda.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('studio')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Play size={15} />
                  <span>Mulai Latihan Baru</span>
                </button>
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
                  {practiceStatsData.totalSessions}
                </div>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-600" />
                  <span>+4 sesi minggu ini</span>
                </p>
              </div>

              {/* Stat 2: Questions Answered */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Soal Dijawab</span>
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                    <CheckCircle2 size={16} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {practiceStatsData.questionsAnswered}
                </div>
                <p className="text-[11px] text-slate-500">
                  Dari 20+ skenario interview
                </p>
              </div>

              {/* Stat 3: Coding Challenges Completed */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Coding Challenge</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Code2 size={16} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {practiceStatsData.codingChallengesCompleted}
                </div>
                <p className="text-[11px] text-slate-500">
                  Go transactions & Clean Arch
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
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono text-emerald-700">
                  {practiceStatsData.averageScore}%
                </div>
                <p className="text-[11px] text-slate-500">
                  Kategori <strong>Strong Hire</strong>
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
                      Kemajuan & Penguasaan Topik Teknis (Skill Progress)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">6 Bidang Evaluasi</span>
                </div>

                <div className="space-y-4">
                  {skillProgressData.map((item, idx) => (
                    <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{item.skill}</span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            item.score >= 85
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.score >= 75
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
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
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Recommended Practice & Weakest Area (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Weakest Area Alert Card */}
                <div className="bg-amber-50/80 rounded-2xl border border-amber-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                      <AlertTriangle size={17} className="text-amber-600 flex-shrink-0" />
                      <span>Rekomendasi Latihan (Area Paling Perlu Ditingkatkan)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 text-[10px] font-mono font-black">
                      {recommendedPractice.score}%
                    </span>
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
                    <strong className="text-amber-800 font-mono">Saran Langkah Perbaikan:</strong>
                    <p className="leading-relaxed">{recommendedPractice.suggestedAction[lang]}</p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                      Soal Rekomendasi Terkait:
                    </span>
                    <div className="space-y-1.5">
                      {recommendedPractice.recommendedQuestions.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          onClick={() => {
                            const targetIdx = interviewQuestions.findIndex((item) => item.id === q.id);
                            if (targetIdx !== -1) setCurrentIndex(targetIdx);
                            setActiveTab('studio');
                          }}
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
                    onClick={() => {
                      setSelectedCategory('backend-go');
                      setActiveTab('studio');
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Latih Topik {recommendedPractice.skill} Sekarang</span>
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
                    Aktivitas & Riwayat Simulasi Terbaru
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-500">6 Sesi Terakhir</span>
              </div>

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
                    {recentActivityData.map((act) => (
                      <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 font-bold text-slate-900 max-w-xs truncate">
                          {act.title}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            act.type === 'Mock Interview'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : act.type === 'Coding Challenge'
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
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
                                : act.score >= 75
                                ? 'text-sky-700'
                                : 'text-amber-700'
                            }`}>
                              {act.score}%
                            </span>
                            <span className={`w-2 h-2 rounded-full ${
                              act.score >= 85
                                ? 'bg-emerald-500'
                                : act.score >= 75
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
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: SELF-INTRODUCTION ELEVATOR PITCH & AUDIO PLAYER */}
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
        {/* TAB 2: TECHNICAL Q&A STUDIO */}
        {/* ========================================================= */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            {/* Category Track Filter */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {[
                  { id: 'all', label: 'Semua Kategori' },
                  { id: 'backend-go', label: 'Go & Backend' },
                  { id: 'app-support', label: 'App Support (PLN)' },
                  { id: 'fullstack-react', label: 'Fullstack & React' },
                  { id: 'behavioral-hr', label: 'Behavioral & HR' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategory(c.id);
                      setCurrentIndex(0);
                      setShowFeedback(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === c.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono font-bold text-slate-500">
                Soal <strong className="text-slate-900">{currentIndex + 1}</strong> dari{' '}
                <strong className="text-slate-900">{filteredQuestions.length}</strong>
              </div>
            </div>

            {/* Dual Pane Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Question Prompt & Candidate Input (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Question Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {currentQuestion.categoryLabel[lang]}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Konteks: {currentQuestion.context}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePlayVoice(currentQuestion.question[lang])}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                    >
                      <Volume2 size={14} />
                      <span>Dengarkan Soal</span>
                    </button>
                  </div>

                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-relaxed">
                    &ldquo;{currentQuestion.question[lang]}&rdquo;
                  </h2>
                </div>

                {/* Candidate Answering Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Mic size={14} className={isRecording ? 'text-rose-600 animate-pulse' : 'text-emerald-600'} />
                      <span>Jawaban Latihan Anda:</span>
                    </span>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                      <span>Waktu: {formatTimer(elapsedSeconds)}</span>
                      <span>•</span>
                      <span>{keywordAnalysis.wordCount} Kata</span>
                    </div>
                  </div>

                  <textarea
                    value={userTranscript}
                    onChange={(e) => setUserTranscript(e.target.value)}
                    placeholder={
                      lang === 'id'
                        ? 'Tekan tombol "Mulai Bicara (Mic)" untuk menjawab langsung dengan suara, atau ketik jawaban Anda di sini...'
                        : 'Click "Start Voice (Mic)" to answer with your microphone, or type your response here...'
                    }
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all leading-relaxed resize-none"
                  />

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleToggleRecord}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isRecording
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-sm'
                        }`}
                      >
                        {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
                        <span>{isRecording ? 'Stop Rekaman' : 'Mulai Bicara (Mic)'}</span>
                      </button>

                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                      >
                        {showHint ? 'Tutup Kisi-Kisi' : 'Kisi-Kisi Konsep'}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
                          setUserTranscript('');
                          setElapsedSeconds(0);
                        }}
                        className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                      >
                        <span>Soal Berikutnya</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Hint Concepts Box */}
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                      >
                        <div className="flex items-center gap-1.5 text-slate-700 font-mono font-bold">
                          <HelpCircle size={13} className="text-emerald-600" /> Kata Kunci Konsep yang Dinilai:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentQuestion.keyConcepts.map((k, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-mono"
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Recommended STAR Model Answer (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Keywords Match Meter */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
                      Checklist Konsep Jawaban:
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      {keywordAnalysis.score}% Match
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {currentQuestion.keyConcepts.map((kw, i) => {
                      const isFound = userTranscript.toLowerCase().includes(kw.toLowerCase());
                      return (
                        <span
                          key={i}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                            isFound
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                          }`}
                        >
                          <CheckCircle2 size={12} className={isFound ? 'text-emerald-600' : 'text-slate-400'} />
                          <span>{kw}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* STAR Benchmark Answer Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Award size={14} className="text-emerald-600" />
                      <span>Rekomendasi Jawaban Metode STAR:</span>
                    </span>

                    <button
                      onClick={() => handlePlayVoice(currentQuestion.modelAnswer[lang])}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 size={13} />
                      <span>Dengarkan</span>
                    </button>
                  </div>

                  {currentQuestion.starAnswer ? (
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <strong className="text-sky-700 font-mono">[S] Situation:</strong>
                        <p className="text-slate-700 leading-relaxed">{currentQuestion.starAnswer[lang].situation}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <strong className="text-amber-700 font-mono">[T] Task:</strong>
                        <p className="text-slate-700 leading-relaxed">{currentQuestion.starAnswer[lang].task}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <strong className="text-emerald-700 font-mono">[A] Action:</strong>
                        <p className="text-slate-700 leading-relaxed">{currentQuestion.starAnswer[lang].action}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <strong className="text-purple-700 font-mono">[R] Result:</strong>
                        <p className="text-slate-700 leading-relaxed">{currentQuestion.starAnswer[lang].result}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic leading-relaxed">
                      &ldquo;{currentQuestion.modelAnswer[lang]}&rdquo;
                    </div>
                  )}

                  {/* Code Snippet */}
                  {currentQuestion.codeSnippet && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-mono text-slate-600 uppercase flex items-center gap-1">
                        <Code2 size={12} className="text-emerald-600" /> Contoh Snippet Kode:
                      </span>
                      <pre className="p-3 rounded-xl bg-slate-900 text-emerald-300 text-[11px] font-mono overflow-x-auto">
                        <code>{currentQuestion.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: QUESTION BANK SYLLABUS */}
        {/* ========================================================= */}
        {activeTab === 'syllabus' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Bank Pertanyaan & Kisi-Kisi Lengkap</h2>
                <p className="text-xs text-slate-500">
                  Daftar seluruh topik wawancara teknis backend Go, pengalaman operasional PLN, dan behavioral.
                </p>
              </div>

              <div className="relative w-full md:w-72">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        {q.categoryLabel[lang]}
                      </span>
                      <span className="text-slate-400">{q.difficulty}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {idx + 1}. {q.question[lang]}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {q.modelAnswer[lang]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">
                      {q.context}
                    </span>

                    <button
                      onClick={() => {
                        const targetIdx = interviewQuestions.findIndex((item) => item.id === q.id);
                        if (targetIdx !== -1) setCurrentIndex(targetIdx);
                        setActiveTab('studio');
                      }}
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
        {/* TAB 4: CHEAT SHEET */}
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
