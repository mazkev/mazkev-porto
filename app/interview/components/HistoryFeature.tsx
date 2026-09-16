'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Award,
  ChevronRight,
  X,
  Code2,
  Terminal,
  BookOpen,
  User,
  ShieldCheck,
  Zap,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  LayoutDashboard,
  Layers,
  Flame,
  FileCheck2,
  Play
} from 'lucide-react';
import {
  HistoryItem,
  ActivityType,
  getAggregatedHistory,
  HistoryDetailPractice,
  HistoryDetailCoding,
  HistoryDetailMock
} from '../../lib/data/historyData';

interface HistoryFeatureProps {
  lang: 'id' | 'en';
  onNavigateToPractice: () => void;
  onNavigateToCoding: () => void;
  onNavigateToDashboard: () => void;
}

export default function HistoryFeature({
  lang,
  onNavigateToPractice,
  onNavigateToCoding,
  onNavigateToDashboard
}: HistoryFeatureProps) {
  // State
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Load History Items on Mount
  useEffect(() => {
    setHistoryItems(getAggregatedHistory());
  }, []);

  // Filtered History Items
  const filteredItems = useMemo(() => {
    return historyItems.filter((item) => {
      // Type Filter
      const matchType = filterType === 'all' || item.type === filterType;

      // Topic Filter
      const matchTopic =
        filterTopic === 'all' ||
        item.topic.toLowerCase().includes(filterTopic.toLowerCase()) ||
        filterTopic.toLowerCase().includes(item.topic.toLowerCase());

      // Date Range Filter
      let matchDate = true;
      if (filterDate !== 'all') {
        const itemDate = new Date(item.rawDate);
        const today = new Date();
        const diffDays = Math.floor((today.getTime() - itemDate.getTime()) / (1000 * 3600 * 24));

        if (filterDate === 'today') {
          matchDate = diffDays <= 1;
        } else if (filterDate === '7days') {
          matchDate = diffDays <= 7;
        } else if (filterDate === '30days') {
          matchDate = diffDays <= 30;
        }
      }

      // Search Query
      const query = searchQuery.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(query) ||
        item.topic.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query);

      return matchType && matchTopic && matchDate && matchSearch;
    });
  }, [historyItems, filterType, filterTopic, filterDate, searchQuery]);

  // Overall Statistics
  const stats = useMemo(() => {
    const total = historyItems.length;
    const practiceCount = historyItems.filter((h) => h.type === 'Practice Session').length;
    const mockCount = historyItems.filter((h) => h.type === 'Mock Interview').length;
    const codingCount = historyItems.filter((h) => h.type === 'Coding Challenge').length;
    const avg = total > 0 ? Math.round(historyItems.reduce((acc, h) => acc + h.score, 0) / total) : 0;

    return { total, practiceCount, mockCount, codingCount, avg };
  }, [historyItems]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterTopic('all');
    setFilterDate('all');
  };

  return (
    <div className="space-y-6">
      {/* ========================================================= */}
      {/* 1. TOP SUMMARY BANNER */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
            <History size={14} />
            <span>Riwayat & Rekam Jejak Latihan Wawancara</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'id' ? 'Riwayat Aktivitas & Evaluasi' : 'Activity & Practice History'}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {lang === 'id'
              ? 'Tinjau kembali seluruh sesi latihan, simulasi mock interview, dan submission coding challenge yang telah Anda kerjakan beserta evaluasi mendalamnya.'
              : 'Review all completed practice sessions, mock interviews, and coding submissions with in-depth evaluation reports.'}
          </p>
        </div>

        {/* Aggregate Stats Badges */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-center">
          <div className="space-y-0.5">
            <div className="text-2xl font-black text-slate-900">{stats.total}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Total Sesi</div>
          </div>
          <div className="space-y-0.5 border-x border-slate-200 px-3">
            <div className="text-2xl font-black text-emerald-700">{stats.codingCount}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Coding</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-black text-amber-600">{stats.avg}%</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Rata-Rata</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. FILTER & SEARCH CONTROLS */}
      {/* ========================================================= */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={lang === 'id' ? 'Cari sesi riwayat (judul, role, topik)...' : 'Search history sessions...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {/* Selectors Group */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter: Activity Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Semua Tipe Aktivitas</option>
              <option value="Practice Session">Practice Session</option>
              <option value="Mock Interview">Mock Interview</option>
              <option value="Coding Challenge">Coding Challenge</option>
            </select>

            {/* Filter: Topic */}
            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Semua Topik</option>
              <option value="Golang">Golang</option>
              <option value="Concurrency">Concurrency</option>
              <option value="SQL & Database">SQL & Database</option>
              <option value="REST API">REST API</option>
              <option value="Redis">Redis</option>
              <option value="System Design">System Design</option>
            </select>

            {/* Filter: Date */}
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Semua Waktu</option>
              <option value="today">Hari Ini</option>
              <option value="7days">7 Hari Terakhir</option>
              <option value="30days">30 Hari Terakhir</option>
            </select>

            {(searchQuery || filterType !== 'all' || filterTopic !== 'all' || filterDate !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Reset Filter"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. HISTORY LIST / CARDS */}
      {/* ========================================================= */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <History size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-800">Tidak ada riwayat aktivitas yang cocok</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Cobalah untuk mengubah kata kunci pencarian atau mengatur ulang filter di atas.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Left info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Activity Type Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.type === 'Mock Interview'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : item.type === 'Coding Challenge'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {item.type}
                    </span>

                    {/* Topic Badge */}
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {item.topic}
                    </span>

                    <span className="text-[11px] text-slate-400 font-mono">
                      • {item.date} ({item.durationMinutes} Menit)
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Right score and action */}
                <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-black font-mono text-emerald-700">
                      {item.score}%
                    </div>
                    <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                      {item.status}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-2 rounded-xl bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-700 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. DETAILED RESULT MODAL / DIALOG */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-800"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        selectedItem.type === 'Mock Interview'
                          ? 'bg-purple-100 text-purple-800'
                          : selectedItem.type === 'Coding Challenge'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {selectedItem.type}
                    </span>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-700 border border-slate-200">
                      {selectedItem.topic}
                    </span>

                    <span className="text-[11px] text-slate-500 font-mono">
                      {selectedItem.date}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {selectedItem.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
                {/* Score and Overview Banner */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <Award size={20} />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">Skor Hasil Latihan</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Kategori Evaluasi: <strong className="text-slate-800">{selectedItem.status}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-2xl sm:text-3xl font-black text-emerald-700">
                      {selectedItem.score}%
                    </div>
                    <div className="text-[10px] text-slate-500">Durasi: {selectedItem.durationMinutes} Menit</div>
                  </div>
                </div>

                {/* CONTEXTUAL CONTENT DETAILS */}

                {/* A. PRACTICE SESSION DETAIL */}
                {selectedItem.details?.kind === 'practice' && (
                  <div className="space-y-5">
                    {/* Question Context */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                        Pertanyaan Sesi:
                      </span>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-extrabold text-slate-900 leading-relaxed">
                        &ldquo;{selectedItem.details.questionText}&rdquo;
                      </div>
                    </div>

                    {/* Candidate Answer */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <User size={13} className="text-emerald-600" />
                        <span>Jawaban Kandidat pada Sesi Ini:</span>
                      </span>
                      <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-800 leading-relaxed font-sans">
                        {selectedItem.details.candidateAnswer}
                      </div>
                    </div>

                    {/* Matched vs Missing Concepts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                          <CheckCircle2 size={14} className="text-emerald-600" />
                          <span>Poin Konsep yang Terpenuhi</span>
                        </div>
                        <ul className="space-y-1 text-xs text-emerald-800">
                          {selectedItem.details.matchedConcepts.map((m, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                          <AlertTriangle size={14} className="text-amber-600" />
                          <span>Poin yang Perlu Dilengkapi</span>
                        </div>
                        {selectedItem.details.missingConcepts.length > 0 ? (
                          <ul className="space-y-1 text-xs text-amber-800">
                            {selectedItem.details.missingConcepts.map((m, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="text-amber-600 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-amber-800 font-bold">Luar biasa! Seluruh konsep utama terpenuhi.</p>
                        )}
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 font-mono">
                        <BookOpen size={14} className="text-emerald-600" />
                        <span>Penjelasan Teori & Best Practice:</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {selectedItem.details.explanation}
                      </p>
                    </div>

                    {/* Benchmark Answer */}
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                        <span>Rekomendasi Jawaban Standar:</span>
                        <button
                          type="button"
                          onClick={() => handleCopy((selectedItem.details as HistoryDetailPractice).suggestedAnswer)}
                          className="flex items-center gap-1 hover:text-white cursor-pointer"
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          <span>{isCopied ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {selectedItem.details.suggestedAnswer}
                      </p>
                    </div>
                  </div>
                )}

                {/* B. CODING CHALLENGE DETAIL */}
                {selectedItem.details?.kind === 'coding' && (
                  <div className="space-y-5">
                    {/* Code Snippet Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-700">
                        <span className="font-bold flex items-center gap-1.5">
                          <Code2 size={14} className="text-emerald-600" />
                          <span>Kode Solusi yang Dikumpulkan ({selectedItem.details.language}):</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy((selectedItem.details as HistoryDetailCoding).codeSnippet)}
                          className="flex items-center gap-1 text-emerald-700 hover:text-emerald-600 font-bold cursor-pointer"
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          <span>{isCopied ? 'Tersalin' : 'Salin Kode'}</span>
                        </button>
                      </div>

                      <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed">
                        <code>{selectedItem.details.codeSnippet}</code>
                      </pre>
                    </div>

                    {/* Test Cases Results */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-slate-800">Hasil Pengujian Test Cases:</span>
                        <span className="text-emerald-700 font-bold">
                          {selectedItem.details.testsPassed}/{selectedItem.details.totalTests} Passed ({selectedItem.details.runtimeMs}ms)
                        </span>
                      </div>

                      <div className="space-y-2">
                        {selectedItem.details.testCases.map((tc, idx) => (
                          <div key={tc.caseId} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <div className="flex items-center gap-1.5">
                                {tc.passed ? (
                                  <CheckCircle2 size={13} className="text-emerald-600" />
                                ) : (
                                  <XCircle size={13} className="text-rose-600" />
                                )}
                                <span className="font-bold text-slate-800">Test Case #{idx + 1}</span>
                              </div>
                              <span className="text-slate-500">{tc.runtimeMs}ms</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                              <div>Expected: <strong className="text-emerald-700">{tc.expected}</strong></div>
                              <div>Actual: <strong className={tc.passed ? 'text-emerald-700' : 'text-rose-600'}>{tc.actual}</strong></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* C. MOCK INTERVIEW DETAIL */}
                {selectedItem.details?.kind === 'mock' && (
                  <div className="space-y-5">
                    {/* Persona & Feedback */}
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-purple-900 font-bold">
                        <span>Pewawancara: {selectedItem.details.interviewerPersona}</span>
                        <span>Rating: Strong Hire</span>
                      </div>
                      <p className="text-xs text-purple-950 leading-relaxed">
                        {selectedItem.details.feedbackNotes}
                      </p>
                    </div>

                    {/* STAR Breakdown */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                        Evaluasi Metode STAR:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <strong className="text-sky-700 font-mono">[S] Situation:</strong>
                          <p className="text-slate-700">{selectedItem.details.starBreakdown.situation}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <strong className="text-amber-700 font-mono">[T] Task:</strong>
                          <p className="text-slate-700">{selectedItem.details.starBreakdown.task}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <strong className="text-emerald-700 font-mono">[A] Action:</strong>
                          <p className="text-slate-700">{selectedItem.details.starBreakdown.action}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <strong className="text-purple-700 font-mono">[R] Result:</strong>
                          <p className="text-slate-700">{selectedItem.details.starBreakdown.result}</p>
                        </div>
                      </div>
                    </div>

                    {/* Strengths & Improvements */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 font-mono">
                          <ShieldCheck size={14} className="text-emerald-600" />
                          <span>Kekuatan Utama Kandidat:</span>
                        </div>
                        <ul className="space-y-1 text-xs text-emerald-800">
                          {selectedItem.details.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 font-mono">
                          <Zap size={14} className="text-amber-600" />
                          <span>Area Pengembangan (Improvement):</span>
                        </div>
                        <ul className="space-y-1 text-xs text-amber-800">
                          {selectedItem.details.areasForImprovement.map((a, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-amber-600 font-bold">•</span>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/60">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Tutup Dialog
                </button>

                <div className="flex items-center gap-2">
                  {selectedItem.type === 'Coding Challenge' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(null);
                        onNavigateToCoding();
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Code2 size={13} className="text-emerald-400" />
                      <span>Buka di Coding Arena</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(null);
                        onNavigateToPractice();
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Play size={13} />
                      <span>Ulangi Sesi Latihan</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
