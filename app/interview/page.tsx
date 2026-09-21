'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Volume2,
  Pause,
  CheckCircle2,
  Search,
  ChevronRight,
  UserCheck,
  Play,
  User,
  ListFilter,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  ShieldCheck,
  Zap
} from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  interviewQuestions
} from '../lib/data/interviewData';
import {
  SpokenInterviewTopic,
  spokenInterviewTopics
} from '../lib/data/spokenInterviewData';

export type { SpokenInterviewTopic };

// Dynamic Feature Loading with Skeletons
function FeatureLoadingSkeleton({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">
        <Sparkles size={22} className="animate-spin" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-extrabold text-slate-800">{title}</div>
        <p className="text-xs text-slate-400">Menyiapkan workspace interaktif...</p>
      </div>
    </div>
  );
}

const MockInterviewFeature = dynamic(() => import('./components/MockInterviewFeature'), {
  loading: () => <FeatureLoadingSkeleton title="Memuat Mock Interview..." />
});
const PracticeFeature = dynamic(() => import('./components/PracticeFeature'), {
  loading: () => <FeatureLoadingSkeleton title="Memuat Sesi Latihan..." />
});

type MainTab = 'mock' | 'practice' | 'pitch' | 'syllabus';
type LangMode = 'id' | 'en';

export default function InterviewPracticePage() {
  const [activeTab, setActiveTab] = useState<MainTab>('mock');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const [lang, setLang] = useState<LangMode>('id');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');

  // Audio Speech States
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Filtered Questions for Question Bank Syllabus
  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter((q) => {
      const matchTopic = selectedTopicFilter === 'all' || q.topic === selectedTopicFilter;
      const qText = `${q.question[lang]} ${q.context} ${q.keyConcepts.join(' ')} ${q.role} ${q.topic}`.toLowerCase();
      const matchSearch = searchQuery === '' || qText.includes(searchQuery.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [selectedTopicFilter, searchQuery, lang]);

  const currentTopic = spokenInterviewTopics[selectedTopicIndex] || spokenInterviewTopics[0];

  // Cancel speech on unmount / tab change / topic change
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsAudioPlaying(false);
    };
  }, [activeTab, lang, selectedTopicIndex]);

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
    navigator.clipboard.writeText(currentTopic.script[lang]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20">
      {/* ========================================================= */}
      {/* 1. TOP HEADER */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
                Backend Go
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs (Streamlined: 4 Core Tabs) */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('mock')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'mock'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={14} className={activeTab === 'mock' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Simulasi Wawancara</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play size={14} className={activeTab === 'practice' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Latihan Soal</span>
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
              <span>Naskah Lisan (10 Topik)</span>
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
          { id: 'mock', label: 'Simulasi Wawancara' },
          { id: 'practice', label: 'Latihan Soal' },
          { id: 'pitch', label: 'Naskah Lisan (10)' },
          { id: 'syllabus', label: 'Bank Soal' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as MainTab)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN CONTENT CONTAINER */}
      {/* ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* TAB 1: MOCK INTERVIEW (DEFAULT) */}
        {activeTab === 'mock' && (
          <MockInterviewFeature
            lang={lang}
            onSaveMockResult={() => {}}
            onNavigateToDashboard={() => setActiveTab('practice')}
          />
        )}

        {/* TAB 2: PRACTICE QUESTIONS */}
        {activeTab === 'practice' && (
          <PracticeFeature
            lang={lang}
            onSaveResult={() => {}}
            onNavigateToDashboard={() => setActiveTab('mock')}
          />
        )}

        {/* TAB 3: 10 CONVERSATIONAL INTERVIEW TOPICS & AUDIO */}
        {activeTab === 'pitch' && (
          <div className="space-y-6">
            {/* Topic Navigation Selector Bar (10 Topics) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2 px-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Pilih Topik Pertanyaan Lisan (1 s.d. 10):
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Bahasa Percakapan Wawancara Nyata
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {spokenInterviewTopics.map((topic, idx) => {
                  const isSelected = selectedTopicIndex === idx;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                        }
                        setIsAudioPlaying(false);
                        setSelectedTopicIndex(idx);
                      }}
                      className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          #{topic.number}
                        </span>
                        <span className="text-[9px] font-mono text-slate-600 truncate max-w-[70px]">
                          {topic.badge}
                        </span>
                      </div>
                      <div className={`text-xs font-bold leading-tight line-clamp-1 ${
                        isSelected ? 'text-emerald-900 font-extrabold' : 'text-slate-800'
                      }`}>
                        {topic.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Header Detail Card for Selected Topic */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                    <User size={13} />
                    <span>Topik #{currentTopic.number} • {currentTopic.badge}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {currentTopic.title[lang]}
                  </h1>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    {currentTopic.subtitle[lang]}
                  </p>
                </div>

                {/* Duration Indicator */}
                <div className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700 self-start md:self-auto">
                  {currentTopic.duration[lang]}
                </div>
              </div>

              {/* Audio Controls Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlayVoice(currentTopic.script[lang])}
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
              {/* Left: Teleprompter Spoken Script (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-emerald-600" />
                    <span>Naskah Jawaban Percakapan Wawancara:</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Bukan Bahasa Formal CV
                  </span>
                </div>

                <div className="text-sm sm:text-[15px] text-slate-800 leading-relaxed space-y-4 whitespace-pre-line font-sans">
                  {currentTopic.script[lang]}
                </div>
              </div>

              {/* Right: Key Bullets & Strategy Points (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm border-b border-slate-100 pb-3">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <span>Intisari & Poin Kunci Jawaban:</span>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {currentTopic.bulletPoints[lang].map((item, idx) => (
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
                    <span>Tips Eksekusi Pewawancara:</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {currentTopic.tips[lang]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QUESTION BANK SYLLABUS */}
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
      </main>
    </div>
  );
}
