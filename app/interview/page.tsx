'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  Terminal,
  HelpCircle,
  Play,
  RotateCcw,
  Pause,
  Award,
  Layers,
  Server,
  Database,
  Cpu,
  UserCheck,
  Zap,
  Globe,
  Flame,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import {
  interviewQuestions,
  technicalCheatSheet,
  InterviewCategory,
  InterviewQuestion,
  InterviewDifficulty
} from '../lib/data/interviewData';

type ViewMode = 'flashcards' | 'simulator' | 'cheatsheet';
type LangMode = 'id' | 'en';

export default function InterviewPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('flashcards');
  const [lang, setLang] = useState<LangMode>('id');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(interviewQuestions[0].id);

  // Mock Simulator States
  const [currentSimIndex, setCurrentSimIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(120);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showSimAnswer, setShowSimAnswer] = useState<boolean>(false);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter((q) => {
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const qText = `${q.question[lang]} ${q.context} ${q.keyConcepts.join(' ')}`.toLowerCase();
      const matchSearch = searchQuery === '' || qText.includes(searchQuery.toLowerCase());
      return matchCat && matchDiff && matchSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery, lang]);

  // Simulator Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setShowSimAnswer(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const handleNextSimQuestion = () => {
    if (filteredQuestions.length === 0) return;
    setCurrentSimIndex((prev) => (prev + 1) % filteredQuestions.length);
    setTimerSeconds(120);
    setIsTimerRunning(false);
    setShowSimAnswer(false);
  };

  const handleResetSim = () => {
    setTimerSeconds(120);
    setIsTimerRunning(false);
    setShowSimAnswer(false);
  };

  const currentSimQuestion = filteredQuestions[currentSimIndex] || interviewQuestions[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-black font-sans pb-24">
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group cursor-pointer"
          >
            <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-emerald-500/40 transition-colors">
              <ArrowLeft size={16} className="text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Kembali ke Portofolio</span>
          </Link>

          {/* LANGUAGE TOGGLE */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setLang('id')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  lang === 'id'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ID (Indonesia)
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN (English)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO HEADER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide">
          <Sparkles size={14} className="animate-pulse" />
          <span>Interactive Career & Technical Q&A Bank</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto">
          Simulator Latihan Interview <br />
          <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-teal-300 bg-clip-text text-transparent">
            Backend Go & Software Engineer
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Bank pertanyaan teknis, arsitektur sistem, database, dan behavioral yang disesuaikan langsung dengan isi CV, proyek nyata, dan pengalaman Application Support di PT PLN Icon+.
        </p>

        {/* MODE SWITCHER TABS */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <button
            onClick={() => setViewMode('flashcards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              viewMode === 'flashcards'
                ? 'bg-slate-800 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <BookOpen size={16} className={viewMode === 'flashcards' ? 'text-emerald-400' : ''} />
            <span>Q&A Flashcards & STAR Answers</span>
          </button>

          <button
            onClick={() => {
              setViewMode('simulator');
              handleResetSim();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              viewMode === 'simulator'
                ? 'bg-slate-800 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Clock size={16} className={viewMode === 'simulator' ? 'text-sky-400' : ''} />
            <span>Timed Mock Simulator (Simulasi Waktu)</span>
          </button>

          <button
            onClick={() => setViewMode('cheatsheet')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              viewMode === 'cheatsheet'
                ? 'bg-slate-800 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Zap size={16} className={viewMode === 'cheatsheet' ? 'text-purple-400' : ''} />
            <span>Technical Cheat Sheet (Ringkasan Cepat)</span>
          </button>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ========================================================= */}
        {/* MODE 1: Q&A FLASHCARDS */}
        {/* ========================================================= */}
        {viewMode === 'flashcards' && (
          <div className="space-y-6">
            {/* FILTERS & SEARCH */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {[
                  { key: 'all', label: lang === 'id' ? 'Semua' : 'All', icon: Sparkles },
                  { key: 'backend-go', label: 'Go & Backend', icon: Server },
                  { key: 'app-support', label: 'App Support (PLN)', icon: Database },
                  { key: 'fullstack-react', label: 'Fullstack & React', icon: Layers },
                  { key: 'behavioral-hr', label: 'Behavioral & HR', icon: UserCheck }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedCategory(tab.key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        selectedCategory === tab.key
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon size={13} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder={lang === 'id' ? 'Cari topik / keyword...' : 'Search topics / keywords...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* QUESTIONS LIST */}
            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => {
                const isExpanded = expandedCardId === q.id;
                return (
                  <motion.div
                    key={q.id}
                    layout
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all shadow-md"
                  >
                    {/* CARD HEADER */}
                    <div
                      onClick={() => setExpandedCardId(isExpanded ? null : q.id)}
                      className="flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-2 flex-grow">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-emerald-400 border border-slate-700">
                            #{idx + 1} {q.categoryLabel[lang]}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                            {q.difficulty}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            Konteks CV: {q.context}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {q.question[lang]}
                        </h3>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-800/70 border border-slate-700 text-slate-300 flex-shrink-0">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>

                    {/* EXPANDABLE BODY */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-5 pt-5 border-t border-slate-800/80 space-y-5 text-sm"
                        >
                          {/* KEY ATS CONCEPTS */}
                          <div className="space-y-1.5">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                              <ShieldCheck size={14} /> Kata Kunci Teknis Wajib (ATS Keywords):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {q.keyConcepts.map((kw, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* STAR STRUCTURE BREAKDOWN (IF AVAILABLE) */}
                          {q.starAnswer && (
                            <div className="space-y-2.5 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                                <Award size={14} /> Struktur Jawaban Metode STAR:
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                                  <strong className="text-sky-400 font-mono">[S] Situation:</strong>
                                  <p className="text-slate-300">{q.starAnswer[lang].situation}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                                  <strong className="text-amber-400 font-mono">[T] Task:</strong>
                                  <p className="text-slate-300">{q.starAnswer[lang].task}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                                  <strong className="text-emerald-400 font-mono">[A] Action:</strong>
                                  <p className="text-slate-300">{q.starAnswer[lang].action}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                                  <strong className="text-purple-400 font-mono">[R] Result:</strong>
                                  <p className="text-slate-300">{q.starAnswer[lang].result}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* MODEL SPOKEN ANSWER */}
                          <div className="space-y-1.5 bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                              <Terminal size={14} /> Contoh Narasi Langsung (Model Answer):
                            </span>
                            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic">
                              &ldquo;{q.modelAnswer[lang]}&rdquo;
                            </p>
                          </div>

                          {/* CODE SNIPPET (IF ANY) */}
                          {q.codeSnippet && (
                            <div className="space-y-1.5">
                              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <Code2 size={14} /> Contoh Implementasi Kode:
                              </span>
                              <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 text-xs font-mono overflow-x-auto">
                                <code>{q.codeSnippet.code}</code>
                              </pre>
                            </div>
                          )}

                          {/* INTERVIEWER INSIGHT */}
                          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-400 flex items-center gap-2">
                            <HelpCircle size={15} className="text-sky-400 flex-shrink-0" />
                            <span>
                              <strong>Sudut Pandang Pewawancara:</strong> {q.interviewerInsight[lang]}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              {filteredQuestions.length === 0 && (
                <div className="p-12 text-center text-slate-500 space-y-2">
                  <p className="text-base font-bold">Tidak ada pertanyaan yang sesuai dengan filter.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-emerald-400 hover:underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 2: TIMED MOCK SIMULATOR */}
        {/* ========================================================= */}
        {viewMode === 'simulator' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-center">
              {/* STATUS HEADER */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-mono text-slate-400">
                <span>
                  Pertanyaan {currentSimIndex + 1} dari {filteredQuestions.length || interviewQuestions.length}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold">
                  {currentSimQuestion.categoryLabel[lang]}
                </span>
              </div>

              {/* TIMER DISPLAY */}
              <div className="flex flex-col items-center justify-center py-4">
                <div
                  className={`text-5xl sm:text-6xl font-black font-mono tracking-tight transition-colors ${
                    timerSeconds <= 20
                      ? 'text-rose-500 animate-pulse'
                      : timerSeconds <= 60
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {formatTime(timerSeconds)}
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Target Waktu Menjawab (2 Menit)
                </p>
              </div>

              {/* SIMULATOR CONTROLS */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isTimerRunning
                      ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                      : 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-400'
                  }`}
                >
                  {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isTimerRunning ? 'Pause Waktu' : 'Mulai Menjawab'}</span>
                </button>

                <button
                  onClick={handleResetSim}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              {/* CURRENT QUESTION PROMPT */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase">
                  <Terminal size={14} /> Pertanyaan Interviewer:
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white leading-relaxed">
                  &ldquo;{currentSimQuestion.question[lang]}&rdquo;
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  Konteks: {currentSimQuestion.context}
                </p>
              </div>

              {/* TOGGLE MODEL ANSWER */}
              <div className="pt-2">
                <button
                  onClick={() => setShowSimAnswer(!showSimAnswer)}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
                >
                  {showSimAnswer ? 'Sembunyikan Kunci Jawaban' : 'Tampilkan Kunci Jawaban Model (STAR)'}
                </button>
              </div>

              {/* REVEALED MODEL ANSWER */}
              <AnimatePresence>
                {showSimAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-left space-y-4"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                        Kata Kunci yang Wajib Disebut:
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {currentSimQuestion.keyConcepts.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                        Narasi Jawaban Model:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                        &ldquo;{currentSimQuestion.modelAnswer[lang]}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* NEXT BUTTON */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={handleNextSimQuestion}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
                >
                  <span>Pertanyaan Berikutnya</span>
                  <ArrowLeft size={16} className="rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODE 3: TECHNICAL CHEAT SHEET */}
        {/* ========================================================= */}
        {viewMode === 'cheatsheet' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technicalCheatSheet.map((sheet, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md"
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-slate-800 pb-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    <span>{sheet.topic}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    {sheet.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-mono font-bold">•</span>
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
