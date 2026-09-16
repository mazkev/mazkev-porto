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
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Search,
  ChevronRight,
  ChevronDown,
  Layers,
  Server,
  Database,
  UserCheck,
  Code2,
  FileText,
  Activity,
  Send,
  HelpCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  RefreshCw,
  Terminal,
  BarChart3,
  ListFilter
} from 'lucide-react';
import {
  interviewQuestions,
  technicalCheatSheet,
  InterviewQuestion,
  InterviewCategory
} from '../lib/data/interviewData';

type MainView = 'studio' | 'syllabus' | 'cheatsheet';
type LangMode = 'id' | 'en';

export default function InterviewStudioPage() {
  const [mainView, setMainView] = useState<MainView>('studio');
  const [lang, setLang] = useState<LangMode>('id');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Candidate Response States
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Timer States
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Speech Recognition Ref
  const recognitionRef = useRef<any>(null);

  // Filtered Questions list
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

  // Speech Recognition Setup (Web Speech API)
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
          let currentResult = '';
          for (let i = 0; i < event.results.length; i++) {
            currentResult += event.results[i][0].transcript + ' ';
          }
          setUserTranscript(currentResult.trim());
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [lang]);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  // Read Question aloud using SpeechSynthesis
  const handleSpeakQuestion = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || isAudioMuted) return;

    if (isSpeakingQuestion) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = currentQuestion.question[lang];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeakingQuestion(true);
    utterance.onend = () => setIsSpeakingQuestion(false);
    utterance.onerror = () => setIsSpeakingQuestion(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleToggleRecord = () => {
    if (!recognitionRef.current) {
      alert(
        lang === 'id'
          ? 'Browser Anda belum mendukung input suara Speech Recognition. Anda dapat mengetik jawaban langsung pada kotak teks.'
          : 'Speech recognition is not supported in this browser. You can type your answer directly into the response box.'
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

  const handleNextQuestion = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    setIsSpeakingQuestion(false);
    setShowFeedback(false);
    setShowHint(false);
    setUserTranscript('');
    setElapsedSeconds(0);
    setIsTimerActive(false);
    setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handlePrevQuestion = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    setIsSpeakingQuestion(false);
    setShowFeedback(false);
    setShowHint(false);
    setUserTranscript('');
    setElapsedSeconds(0);
    setIsTimerActive(false);
    setCurrentIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate Keyword Match Score based on user's answer
  const keywordAnalysis = useMemo(() => {
    const lowerTranscript = userTranscript.toLowerCase();
    const matched = currentQuestion.keyConcepts.filter((kw) =>
      lowerTranscript.includes(kw.toLowerCase())
    );
    const score = Math.round((matched.length / currentQuestion.keyConcepts.length) * 100);
    return {
      matched,
      score: userTranscript.length > 15 ? Math.max(score, 70) : 0,
      wordCount: userTranscript.trim() ? userTranscript.trim().split(/\s+/).length : 0
    };
  }, [userTranscript, currentQuestion]);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black flex flex-col">
      {/* ========================================================= */}
      {/* 1. TOP SAAS HEADER (wawancara.ai inspired) */}
      {/* ========================================================= */}
      <header className="h-16 border-b border-slate-800/80 bg-[#0B101B]/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
        {/* Left: Brand & Back */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-slate-700">
              <ArrowLeft size={14} className="text-slate-300 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="hidden sm:inline">mazkev.vercel.app</span>
          </Link>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>INTERVIEW STUDIO</span>
            </div>
          </div>
        </div>

        {/* Center: Navigation View Tabs */}
        <div className="hidden md:flex items-center bg-slate-900/90 border border-slate-800/80 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setMainView('studio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              mainView === 'studio'
                ? 'bg-slate-800 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity size={14} className="text-emerald-400" />
            <span>Simulasi Live</span>
          </button>
          <button
            onClick={() => setMainView('syllabus')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              mainView === 'syllabus'
                ? 'bg-slate-800 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ListFilter size={14} className="text-sky-400" />
            <span>Bank Pertanyaan ({interviewQuestions.length})</span>
          </button>
          <button
            onClick={() => setMainView('cheatsheet')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              mainView === 'cheatsheet'
                ? 'bg-slate-800 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap size={14} className="text-amber-400" />
            <span>Cheat Sheet</span>
          </button>
        </div>

        {/* Right: Controls & Language Switcher */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs font-mono font-bold">
            <button
              onClick={() => setLang('id')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'id' ? 'bg-slate-800 text-emerald-400 font-extrabold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'en' ? 'bg-slate-800 text-emerald-400 font-extrabold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. SUBHEADER / SESSION CONTEXT BAR */}
      {/* ========================================================= */}
      <div className="border-b border-slate-800/60 bg-[#0B101B]/50 px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: lang === 'id' ? 'Semua Track' : 'All Tracks' },
            { id: 'backend-go', label: 'Go & Backend' },
            { id: 'app-support', label: 'App Support (PLN Icon+)' },
            { id: 'fullstack-react', label: 'Fullstack & React' },
            { id: 'behavioral-hr', label: 'Behavioral & HR' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentIndex(0);
                setShowFeedback(false);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Question Counter & Timer Meter */}
        <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px] ml-auto">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className={isTimerActive ? 'text-emerald-400 animate-spin' : 'text-slate-500'} />
            <span className={isTimerActive ? 'text-white font-bold' : ''}>{formatTimer(elapsedSeconds)}</span>
          </div>
          <span>•</span>
          <div>
            Soal <strong className="text-white">{currentIndex + 1}</strong> dari{' '}
            <strong className="text-white">{filteredQuestions.length}</strong>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN CONTENT CONTAINER */}
      {/* ========================================================= */}
      <div className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* VIEW 1: STUDIO (INTERVIEW ROOM) */}
        {mainView === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ----------------------------------------------------- */}
            {/* LEFT COLUMN: INTERVIEW STAGE (7 COLS) */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-5">
              {/* RECRUITER AI AVATAR & QUESTION CARD */}
              <div className="rounded-2xl border border-slate-800 bg-[#0E1424] p-5 sm:p-6 shadow-xl relative overflow-hidden">
                {/* Top Persona Bar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center font-extrabold text-slate-950 text-sm shadow-md">
                        AI
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0E1424]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-white">
                          {currentQuestion.category === 'backend-go'
                            ? 'Lead Backend Architect'
                            : currentQuestion.category === 'app-support'
                            ? 'Enterprise Operations Manager'
                            : currentQuestion.category === 'fullstack-react'
                            ? 'Senior Fullstack Engineer'
                            : 'HR Technical Recruiter'}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                          {currentQuestion.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Sesi Wawancara • {currentQuestion.context}
                      </p>
                    </div>
                  </div>

                  {/* Audio Speech Button */}
                  <button
                    onClick={handleSpeakQuestion}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      isSpeakingQuestion
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold animate-pulse'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Volume2 size={14} className={isSpeakingQuestion ? 'text-emerald-400 animate-bounce' : ''} />
                    <span>{isSpeakingQuestion ? 'Memutar Suara...' : 'Dengarkan Soal'}</span>
                  </button>
                </div>

                {/* Question Prompt */}
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Terminal size={13} /> Pertanyaan Sesi Ini:
                  </div>

                  <h2 className="text-lg sm:text-xl font-extrabold text-white leading-relaxed">
                    &ldquo;{currentQuestion.question[lang]}&rdquo;
                  </h2>

                  {/* Animated Voice Waveform Visualizer (Simulated) */}
                  <div className="pt-2 flex items-center gap-1 h-5">
                    {[12, 24, 8, 30, 18, 28, 14, 22, 10, 26, 16, 20, 12, 18, 28, 10, 24, 14].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isSpeakingQuestion || isRecording
                            ? 'bg-emerald-400 animate-pulse'
                            : 'bg-slate-800'
                        }`}
                        style={{ height: isSpeakingQuestion || isRecording ? `${h}px` : '4px' }}
                      />
                    ))}
                    <span className="text-[10px] font-mono text-slate-500 ml-2">
                      {isSpeakingQuestion
                        ? 'Interviewer sedang berbicara...'
                        : isRecording
                        ? 'Mendengarkan suara Anda...'
                        : 'Mikrofon siap'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CANDIDATE ANSWERING STATION */}
              <div className="rounded-2xl border border-slate-800 bg-[#0E1424] p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Mic size={14} className={isRecording ? 'text-rose-500 animate-ping' : 'text-emerald-400'} />
                    <span>Jawaban Anda:</span>
                  </span>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span>{keywordAnalysis.wordCount} Kata</span>
                    {userTranscript.length > 0 && (
                      <button
                        onClick={() => setUserTranscript('')}
                        className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        Bersihkan
                      </button>
                    )}
                  </div>
                </div>

                {/* Interactive Transcript / Input Area */}
                <div className="relative">
                  <textarea
                    value={userTranscript}
                    onChange={(e) => setUserTranscript(e.target.value)}
                    placeholder={
                      lang === 'id'
                        ? 'Klik tombol "Rekam Suara (Mic)" untuk menjawab dengan suara, atau ketik langsung narasi jawaban Anda di sini...'
                        : 'Click "Record Voice (Mic)" to answer verbally, or type your response directly here...'
                    }
                    rows={6}
                    className="w-full bg-[#090D16] border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed font-sans resize-none"
                  />
                </div>

                {/* Candidate Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  {/* Left: Recording & Hint */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleRecord}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isRecording
                          ? 'bg-rose-500/20 border border-rose-500 text-rose-300 animate-pulse'
                          : 'bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
                      <span>{isRecording ? 'Hentikan Rekaman' : 'Rekam Suara (Mic)'}</span>
                    </button>

                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 transition-colors cursor-pointer"
                    >
                      {showHint ? 'Tutup Hint' : 'Lihat Kisi-Kisi Kata Kunci'}
                    </button>
                  </div>

                  {/* Right: Submit & Next */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowFeedback(true)}
                      disabled={userTranscript.length < 5}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        userTranscript.length >= 5
                          ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md'
                          : 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles size={14} />
                      <span>Analisis Jawaban</span>
                    </button>

                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                    >
                      <span>Lewati / Lanjut</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* HINT OVERLAY (IF TOGGLED) */}
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2"
                    >
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold">
                        <HelpCircle size={13} /> Poin Konsep Utama yang Dinilai:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentQuestion.keyConcepts.map((k, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono"
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

            {/* ----------------------------------------------------- */}
            {/* RIGHT COLUMN: AI FEEDBACK & STAR BENCHMARK (5 COLS) */}
            {/* ----------------------------------------------------- */}
            <div className="lg:col-span-5 space-y-5">
              {/* SCORECARD CARD */}
              <div className="rounded-2xl border border-slate-800 bg-[#0E1424] p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BarChart3 size={14} className="text-emerald-400" />
                    <span>Evaluasi & Kesesuaian Kriteria:</span>
                  </span>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {showFeedback ? 'Analisis Selesai' : 'Siap Dianalisis'}
                  </span>
                </div>

                {/* Real-time Match Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Match Kata Kunci</span>
                    <div className="text-2xl font-black font-mono text-emerald-400">
                      {keywordAnalysis.score}%
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Estimasi Struktur STAR</span>
                    <div className="text-2xl font-black font-mono text-sky-400">
                      {userTranscript.length > 50 ? 'Optimal' : 'Draft'}
                    </div>
                  </div>
                </div>

                {/* Keywords Tagging Checklist */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    Checklist Konsep ATS yang Terdeteksi:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentQuestion.keyConcepts.map((kw, i) => {
                      const isFound = userTranscript.toLowerCase().includes(kw.toLowerCase());
                      return (
                        <span
                          key={i}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border transition-all ${
                            isFound
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <CheckCircle2 size={11} className={isFound ? 'text-emerald-400' : 'text-slate-700'} />
                          <span>{kw}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* BENCHMARK STAR STRUCTURE CARD */}
              <div className="rounded-2xl border border-slate-800 bg-[#0E1424] p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                    <Award size={14} />
                    <span>Rekomendasi Jawaban STAR (CV Benchmark):</span>
                  </span>
                </div>

                {/* STAR Breakdown */}
                {currentQuestion.starAnswer ? (
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800/80 space-y-1">
                      <strong className="text-sky-400 font-mono">[S] Situation:</strong>
                      <p className="text-slate-300 leading-relaxed">{currentQuestion.starAnswer[lang].situation}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800/80 space-y-1">
                      <strong className="text-amber-400 font-mono">[T] Task:</strong>
                      <p className="text-slate-300 leading-relaxed">{currentQuestion.starAnswer[lang].task}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800/80 space-y-1">
                      <strong className="text-emerald-400 font-mono">[A] Action:</strong>
                      <p className="text-slate-300 leading-relaxed">{currentQuestion.starAnswer[lang].action}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800/80 space-y-1">
                      <strong className="text-purple-400 font-mono">[R] Result:</strong>
                      <p className="text-slate-300 leading-relaxed">{currentQuestion.starAnswer[lang].result}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 text-xs text-slate-300 italic leading-relaxed">
                    &ldquo;{currentQuestion.modelAnswer[lang]}&rdquo;
                  </div>
                )}

                {/* Code Snippet (if applicable) */}
                {currentQuestion.codeSnippet && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1">
                      <Code2 size={12} className="text-emerald-400" /> Contoh Snippet Kode Pendukung:
                    </span>
                    <pre className="p-3 rounded-xl bg-[#090D16] border border-slate-800 text-emerald-300 text-[11px] font-mono overflow-x-auto">
                      <code>{currentQuestion.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: SYLLABUS / QUESTION BANK TABLE */}
        {/* ========================================================= */}
        {mainView === 'syllabus' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-[#0E1424] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Bank Pertanyaan & Kisi-Kisi Lengkap</h2>
                <p className="text-xs text-slate-400">
                  Daftar seluruh pertanyaan wawancara teknis, pengalaman database PLN, dan behavioral.
                </p>
              </div>

              <div className="relative w-full md:w-72">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder={lang === 'id' ? 'Cari pertanyaan...' : 'Search questions...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#090D16] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-[#0E1424] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-400 font-bold border border-slate-800">
                        {q.categoryLabel[lang]}
                      </span>
                      <span className="text-slate-500">{q.difficulty}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">
                      {idx + 1}. {q.question[lang]}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {q.modelAnswer[lang]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">
                      {q.context}
                    </span>

                    <button
                      onClick={() => {
                        const targetIdx = interviewQuestions.findIndex((item) => item.id === q.id);
                        if (targetIdx !== -1) setCurrentIndex(targetIdx);
                        setMainView('studio');
                      }}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Simulasikan Soal Ini</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: CHEAT SHEET */}
        {/* ========================================================= */}
        {mainView === 'cheatsheet' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 pb-2">
              <h2 className="text-xl font-extrabold text-white">Technical Architecture Cheat Sheet</h2>
              <p className="text-xs text-slate-400">
                Formula ringkas arsitektur Go, transaksi database ACID, troubleshooting PLN Icon+, dan STAR.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technicalCheatSheet.map((sheet, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0E1424] border border-slate-800 space-y-3 shadow-md"
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
      </div>
    </div>
  );
}
