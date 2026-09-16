'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Search,
  ChevronRight,
  ChevronLeft,
  Award,
  Sparkles,
  Terminal,
  BookOpen,
  FileCode2,
  History,
  Layers,
  Check,
  Flame,
  ArrowLeft,
  Clock,
  Zap,
  Filter,
  Sliders,
  Maximize2
} from 'lucide-react';
import {
  CodingChallenge,
  ChallengeDifficulty,
  ChallengeTopic,
  ChallengeLanguage,
  TestCase,
  SubmissionRecord,
  codingChallenges,
  getStoredSubmissions,
  saveStoredSubmission
} from '../../lib/data/codingChallengeData';
import { ActivityItem } from '../../lib/data/dashboardData';

interface CodingChallengeFeatureProps {
  lang: 'id' | 'en';
  onChallengeCompleted: (activity: ActivityItem, challengeTitle: string) => void;
  onNavigateToDashboard: () => void;
}

type LeftPaneTab = 'problem' | 'solution' | 'history';

export default function CodingChallengeFeature({
  lang,
  onChallengeCompleted,
  onNavigateToDashboard
}: CodingChallengeFeatureProps) {
  // Navigation State
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');

  // Workspace State
  const [activeLeftTab, setActiveLeftTab] = useState<LeftPaneTab>('problem');
  const [selectedLanguage, setSelectedLanguage] = useState<ChallengeLanguage>('go');
  const [userCode, setUserCode] = useState<string>('');
  const [activeTestTab, setActiveTestTab] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{
    caseId: string;
    passed: boolean;
    actualOutput: string;
    expectedOutput: string;
    runtimeMs: number;
    errorMessage?: string;
  }[]>([]);
  const [runVerdict, setRunVerdict] = useState<'IDLE' | 'PASSED' | 'FAILED' | 'ERROR'>('IDLE');
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Load submissions from localStorage
  useEffect(() => {
    setSubmissions(getStoredSubmissions());
  }, []);

  // Current active challenge
  const activeChallenge = useMemo(() => {
    if (!selectedChallengeId) return null;
    return codingChallenges.find((c) => c.id === selectedChallengeId) || codingChallenges[0];
  }, [selectedChallengeId]);

  // Sync starter code when challenge or language changes
  useEffect(() => {
    if (activeChallenge) {
      const code = activeChallenge.starterCode[selectedLanguage] || activeChallenge.starterCode['go'];
      setUserCode(code);
      setTestResults([]);
      setRunVerdict('IDLE');
      setActiveTestTab(0);
      setActiveLeftTab('problem');
    }
  }, [activeChallenge, selectedLanguage]);

  // Solved challenges set
  const solvedChallengeIds = useMemo(() => {
    const set = new Set<string>();
    submissions.forEach((s) => {
      if (s.status === 'Accepted') {
        set.add(s.challengeId);
      }
    });
    return set;
  }, [submissions]);

  // Filtered Challenge List
  const filteredChallenges = useMemo(() => {
    return codingChallenges.filter((c) => {
      const matchDiff = filterDifficulty === 'all' || c.difficulty === filterDifficulty;
      const matchTopic = filterTopic === 'all' || c.topic === filterTopic;
      const matchLang = filterLanguage === 'all' || c.languages.includes(filterLanguage as ChallengeLanguage);
      const text = `${c.title} ${c.topic} ${c.description[lang]}`.toLowerCase();
      const matchSearch = searchQuery === '' || text.includes(searchQuery.toLowerCase());
      return matchDiff && matchTopic && matchLang && matchSearch;
    });
  }, [filterDifficulty, filterTopic, filterLanguage, searchQuery, lang]);

  // Filter Submissions for current challenge
  const challengeSubmissions = useMemo(() => {
    if (!activeChallenge) return [];
    return submissions.filter((s) => s.challengeId === activeChallenge.id);
  }, [submissions, activeChallenge]);

  // Code Editor Keydown helper for Tab indents and Run shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        executeTests(true); // Full submit
      } else {
        executeTests(false); // Quick run
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = editorTextareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      setUserCode(val.substring(0, start) + '\t' + val.substring(end));
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  // Line numbers calculation
  const lineNumbers = useMemo(() => {
    const count = userCode.split('\n').length;
    return Array.from({ length: Math.max(count, 14) }, (_, i) => i + 1);
  }, [userCode]);

  // Safe Mock Evaluation & Test Runner
  const executeTests = (isFullSubmission: boolean) => {
    if (!activeChallenge) return;
    setIsRunning(true);
    setRunVerdict('IDLE');

    // Simulate async execution with realistic latency
    setTimeout(() => {
      const casesToRun = isFullSubmission
        ? activeChallenge.testCases
        : activeChallenge.testCases.filter((tc) => !tc.isHidden);

      // Analyze user code quality
      const codeTrimmed = userCode.trim();
      const isStarterUntouched =
        codeTrimmed === (activeChallenge.starterCode[selectedLanguage] || '').trim() ||
        codeTrimmed.includes('// TODO') ||
        codeTrimmed.includes('/* TODO */');

      const results = casesToRun.map((tc, idx) => {
        const runtime = Math.floor(Math.random() * 8) + 6; // 6ms - 14ms

        if (isStarterUntouched || codeTrimmed.length < 35) {
          return {
            caseId: tc.id,
            passed: false,
            actualOutput: 'nil / incomplete implementation',
            expectedOutput: tc.expectedOutput,
            runtimeMs: runtime,
            errorMessage: 'Assertion failed: Logic belum diimplementasikan atau masih menggunakan template default.'
          };
        }

        // Realistic heuristic verification based on required logic
        let pass = true;
        let errMsg = '';
        let actual = tc.expectedOutput;

        // Check if solution contains necessary keywords for the challenge
        if (activeChallenge.id === 'atomic-stock-decrement') {
          if (!codeTrimmed.includes('Lock') && !codeTrimmed.includes('stocks')) {
            pass = false;
            actual = 'race condition / unsynchronized';
            errMsg = 'Race condition detected: Mutex Lock tidak digunakan untuk melindungi concurrent map access.';
          }
        } else if (activeChallenge.id === 'lru-cache-invalidation') {
          if (!codeTrimmed.includes('capacity') || (!codeTrimmed.includes('delete') && !codeTrimmed.includes('tail') && !codeTrimmed.includes('prev'))) {
            pass = false;
            actual = 'capacity overflow / no eviction';
            errMsg = 'Eviction failed: Elemen terlama tidak dibuang saat kapasitas penuh.';
          }
        } else if (activeChallenge.id === 'rate-limiter-token-bucket') {
          if (!codeTrimmed.includes('Sub') && !codeTrimmed.includes('tokens') && !codeTrimmed.includes('time')) {
            pass = false;
            actual = 'tokens not replenished';
            errMsg = 'Token refill calculation missing or incorrect.';
          }
        } else if (activeChallenge.id === 'merge-intervals') {
          if (!codeTrimmed.includes('sort') && !codeTrimmed.includes('Sort')) {
            pass = false;
            actual = 'unsorted intervals';
            errMsg = 'Intervals must be sorted prior to merging.';
          }
        } else if (activeChallenge.id === 'valid-parentheses-stack') {
          if (!codeTrimmed.includes('stack') && !codeTrimmed.includes('len') && !codeTrimmed.includes('pop')) {
            pass = false;
            actual = 'false';
            errMsg = 'Stack LIFO matching failed for closing bracket.';
          }
        }

        return {
          caseId: tc.id,
          passed: pass,
          actualOutput: actual,
          expectedOutput: tc.expectedOutput,
          runtimeMs: runtime,
          errorMessage: pass ? undefined : errMsg
        };
      });

      const passedCount = results.filter((r) => r.passed).length;
      const allPassed = passedCount === casesToRun.length;

      setTestResults(results);
      setRunVerdict(allPassed ? 'PASSED' : 'FAILED');
      setIsRunning(false);

      // If full submit, record to submission history and notify parent
      if (isFullSubmission) {
        const now = new Date();
        const formattedDate = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
        const totalRuntime = results.reduce((acc, r) => acc + r.runtimeMs, 0);

        const record: SubmissionRecord = {
          id: `sub-${Date.now()}`,
          challengeId: activeChallenge.id,
          challengeTitle: activeChallenge.title,
          language: selectedLanguage,
          code: userCode,
          status: allPassed ? 'Accepted' : 'Wrong Answer',
          testsPassed: passedCount,
          totalTests: casesToRun.length,
          runtimeMs: totalRuntime,
          timestamp: formattedDate
        };

        const updated = saveStoredSubmission(record);
        setSubmissions(updated);

        if (allPassed) {
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            title: `Coding Challenge: ${activeChallenge.title}`,
            type: 'Coding Challenge',
            topic: activeChallenge.topic,
            date: formattedDate.split(',')[0],
            score: 100,
            status: 'Excellent',
            durationMinutes: Math.max(2, Math.ceil(totalRuntime / 1000))
          };
          onChallengeCompleted(newActivity, activeChallenge.title);
        }
      }
    }, 600);
  };

  const handleResetCode = () => {
    if (activeChallenge) {
      setUserCode(activeChallenge.starterCode[selectedLanguage] || activeChallenge.starterCode['go']);
      setTestResults([]);
      setRunVerdict('IDLE');
    }
  };

  return (
    <div className="space-y-6">
      {/* ========================================================= */}
      {/* 1. CHALLENGE LIST VIEW (When no challenge is selected) */}
      {/* ========================================================= */}
      {!selectedChallengeId && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                <Code2 size={14} />
                <span>Real-World Backend & Concurrency Challenges</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'id' ? 'Coding Challenge & Algorithm Arena' : 'Coding Challenge Arena'}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                {lang === 'id'
                  ? 'Uji kemampuan logika, concurrency, data structure, dan defensive coding Anda dengan skenario nyata industri backend (Go & Concurrency).'
                  : 'Test your algorithmic, concurrency, and backend engineering skills on real-world production scenarios.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center font-mono">
                <div className="text-2xl font-black text-emerald-700">
                  {solvedChallengeIds.size} / {codingChallenges.length}
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Terselesaikan</div>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={lang === 'id' ? 'Cari problem coding (judul, topik, keyword)...' : 'Search coding challenges...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Difficulty */}
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Semua Kesulitan</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                </select>

                {/* Topic */}
                <select
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Semua Topik</option>
                  <option value="Concurrency">Concurrency</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="System Design">System Design</option>
                  <option value="Algorithms">Algorithms</option>
                </select>

                {/* Language */}
                <select
                  value={filterLanguage}
                  onChange={(e) => setFilterLanguage(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Semua Bahasa</option>
                  <option value="go">Go (Golang)</option>
                  <option value="typescript">TypeScript</option>
                </select>
              </div>
            </div>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChallenges.map((item, idx) => {
              const isSolved = solvedChallengeIds.has(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedChallengeId(item.id)}
                  className={`bg-white p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group hover:shadow-md ${
                    isSolved
                      ? 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-400'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          {item.topic}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          item.difficulty === 'Junior'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.difficulty === 'Middle'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.difficulty}
                        </span>
                      </div>

                      {isSolved && (
                        <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          <CheckCircle2 size={13} />
                          <span>Solved</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.description[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-mono text-slate-500">
                      <span>Bahasa:</span>
                      <div className="flex items-center gap-1">
                        {item.languages.map((l) => (
                          <span key={l} className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                      <span>Buka Editor</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. CHALLENGE WORKSPACE / IDE VIEW */}
      {/* ========================================================= */}
      {selectedChallengeId && activeChallenge && (
        <div className="space-y-4">
          {/* Top Return Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setSelectedChallengeId(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Daftar Problem</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                {activeChallenge.title}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                activeChallenge.difficulty === 'Junior'
                  ? 'bg-emerald-100 text-emerald-800'
                  : activeChallenge.difficulty === 'Middle'
                  ? 'bg-sky-100 text-sky-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {activeChallenge.difficulty}
              </span>
            </div>
          </div>

          {/* Split Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT PANE: Problem Description, Solution, Submissions (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[760px] overflow-hidden">
              {/* Tab Header */}
              <div className="flex items-center bg-slate-100/80 border-b border-slate-200 p-1.5 gap-1 text-xs font-bold">
                <button
                  onClick={() => setActiveLeftTab('problem')}
                  className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeLeftTab === 'problem'
                      ? 'bg-white text-emerald-800 shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen size={14} />
                  <span>Deskripsi Soal</span>
                </button>

                <button
                  onClick={() => setActiveLeftTab('solution')}
                  className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeLeftTab === 'solution'
                      ? 'bg-white text-emerald-800 shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award size={14} />
                  <span>Solusi & Acuan</span>
                </button>

                <button
                  onClick={() => setActiveLeftTab('history')}
                  className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeLeftTab === 'history'
                      ? 'bg-white text-emerald-800 shadow-sm font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <History size={14} />
                  <span>Submissions ({challengeSubmissions.length})</span>
                </button>
              </div>

              {/* Tab Content Body (Scrollable) */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 text-xs sm:text-sm font-sans">
                {/* 1. PROBLEM TAB */}
                {activeLeftTab === 'problem' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-lg font-black text-slate-900 leading-tight">
                        {activeChallenge.title}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <span>Topik: <strong>{activeChallenge.topic}</strong></span>
                        <span>•</span>
                        <span>Level: <strong>{activeChallenge.difficulty}</strong></span>
                      </div>
                    </div>

                    <div className="space-y-3 leading-relaxed whitespace-pre-line text-slate-700">
                      {activeChallenge.description[lang]}
                    </div>

                    {/* Examples */}
                    <div className="space-y-3">
                      <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 font-mono">
                        Contoh Kasus (Examples):
                      </h3>
                      {activeChallenge.examples.map((ex, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                          <div className="font-mono text-slate-700">
                            <strong className="text-slate-900">Input:</strong>
                            <pre className="mt-1 p-2 bg-white rounded border border-slate-200 overflow-x-auto">
                              <code>{ex.input}</code>
                            </pre>
                          </div>
                          <div className="font-mono text-slate-700">
                            <strong className="text-slate-900">Output:</strong>
                            <pre className="mt-1 p-2 bg-white rounded border border-slate-200 overflow-x-auto">
                              <code>{ex.output}</code>
                            </pre>
                          </div>
                          {ex.explanation && (
                            <p className="text-slate-600 italic">
                              <strong>Penjelasan:</strong> {ex.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Constraints */}
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 font-mono">
                        Batasan (Constraints):
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {activeChallenge.constraints.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hints Accordion */}
                    {activeChallenge.hints && activeChallenge.hints.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        <button
                          type="button"
                          onClick={() => setShowHint(!showHint)}
                          className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                        >
                          <Sparkles size={13} />
                          <span>{showHint ? 'Tutup Petunjuk (Hints)' : 'Lihat Petunjuk Solusi (Hints)'}</span>
                        </button>

                        {showHint && (
                          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs text-amber-900">
                            {activeChallenge.hints.map((h, i) => (
                              <p key={i}>• {h}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. SOLUTION & BENCHMARK TAB */}
                {activeLeftTab === 'solution' && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 font-mono">
                        <Award size={15} className="text-emerald-600" />
                        <span>Penjelasan Arsitektur Solusi:</span>
                      </div>
                      <p className="text-xs text-emerald-950 leading-relaxed">
                        {activeChallenge.solutionExplanation[lang]}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                          Solusi Acuan ({selectedLanguage.toUpperCase()}):
                        </span>
                      </div>
                      <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 text-xs font-mono overflow-x-auto leading-relaxed">
                        <code>{activeChallenge.benchmarkSolution[selectedLanguage] || activeChallenge.benchmarkSolution['go']}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* 3. SUBMISSION HISTORY TAB */}
                {activeLeftTab === 'history' && (
                  <div className="space-y-4">
                    {challengeSubmissions.length === 0 ? (
                      <div className="py-16 text-center space-y-2 text-slate-400">
                        <History size={28} className="mx-auto" />
                        <p className="text-xs font-bold text-slate-600">Belum ada riwayat submission</p>
                        <p className="text-[11px]">Kumpulkan solusi Anda untuk melihat riwayat evaluasi di sini.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {challengeSubmissions.map((sub) => (
                          <div key={sub.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black ${
                                sub.status === 'Accepted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {sub.status}
                              </span>
                              <span className="text-[11px] font-mono text-slate-400">{sub.timestamp}</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                              <span>Bahasa: <strong>{sub.language.toUpperCase()}</strong></span>
                              <span>Test: <strong>{sub.testsPassed}/{sub.totalTests} Passed</strong></span>
                              <span>Runtime: <strong>{sub.runtimeMs}ms</strong></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANE: CODE EDITOR & TEST RUNNER CONSOLE (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col h-[760px] overflow-hidden text-slate-200">
              {/* Editor Top Action Bar */}
              <div className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Language:</span>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as ChallengeLanguage)}
                    className="bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-xs font-bold px-2.5 py-1 rounded-lg focus:outline-none"
                  >
                    {activeChallenge.languages.map((l) => (
                      <option key={l} value={l}>
                        {l === 'go' ? 'Go (1.22)' : 'TypeScript (Node)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Editor Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetCode}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Reset to starter code"
                  >
                    <RotateCcw size={14} />
                  </button>

                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => executeTests(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Play size={12} className="text-emerald-400" />
                    <span>Jalankan (Run)</span>
                  </button>

                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => executeTests(true)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Check size={14} />
                    <span>Kumpulkan (Submit)</span>
                  </button>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="flex-1 flex overflow-hidden font-mono text-xs sm:text-[13px] bg-[#0B132B]">
                {/* Line Numbers */}
                <div className="w-10 sm:w-12 py-4 select-none bg-[#080E21] border-r border-slate-800/80 text-slate-600 text-right pr-3 space-y-0.5 leading-6">
                  {lineNumbers.map((num) => (
                    <div key={num}>{num}</div>
                  ))}
                </div>

                {/* Textarea Code Input */}
                <textarea
                  ref={editorTextareaRef}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  rows={18}
                  className="flex-1 p-4 bg-transparent text-emerald-300 placeholder:text-slate-600 focus:outline-none resize-none leading-6 font-mono overflow-y-auto"
                />
              </div>

              {/* Bottom Test Result Console */}
              <div className="h-56 bg-slate-950 border-t border-slate-800 flex flex-col">
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-slate-400" />
                    <span className="font-bold text-slate-300">Test Cases Console:</span>
                    {isRunning && <span className="text-emerald-400 animate-pulse font-sans text-[11px]">(Evaluating code...)</span>}
                  </div>

                  {runVerdict !== 'IDLE' && (
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded font-black text-[11px] ${
                        runVerdict === 'PASSED'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                          : 'bg-rose-950 text-rose-400 border border-rose-700'
                      }`}>
                        {runVerdict === 'PASSED' ? 'Accepted (All Tests Passed)' : 'Wrong Answer / Failed'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Test Cases Tabs & Output View */}
                {testResults.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-xs font-mono text-slate-500">
                    Klik &ldquo;Jalankan (Run)&rdquo; untuk menguji visible test cases atau &ldquo;Kumpulkan (Submit)&rdquo; untuk seluruh test suite.
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Tab Selectors */}
                    <div className="flex items-center bg-slate-900 border-b border-slate-800 px-3 py-1 gap-1.5 overflow-x-auto text-xs font-mono">
                      {testResults.map((r, idx) => (
                        <button
                          key={r.caseId}
                          type="button"
                          onClick={() => setActiveTestTab(idx)}
                          className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                            activeTestTab === idx
                              ? 'bg-slate-800 text-white font-bold border border-slate-700'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {r.passed ? (
                            <CheckCircle2 size={12} className="text-emerald-400" />
                          ) : (
                            <XCircle size={12} className="text-rose-400" />
                          )}
                          <span>Case {idx + 1}</span>
                          <span className="text-[10px] text-slate-500">({r.runtimeMs}ms)</span>
                        </button>
                      ))}
                    </div>

                    {/* Active Test Case Detail */}
                    {testResults[activeTestTab] && (
                      <div className="p-3.5 overflow-y-auto flex-1 text-xs font-mono space-y-2">
                        {(() => {
                          const curr = testResults[activeTestTab];
                          return (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-[11px] text-slate-400">
                                <span>Status: <strong className={curr.passed ? 'text-emerald-400' : 'text-rose-400'}>{curr.passed ? 'Passed' : 'Failed'}</strong></span>
                                <span>Execution Time: <strong className="text-slate-200">{curr.runtimeMs}ms</strong></span>
                              </div>

                              <div className="grid grid-cols-2 gap-3 text-slate-300">
                                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                                  <div className="text-[10px] text-slate-500 uppercase">Expected Output:</div>
                                  <div className="text-emerald-300 truncate">{curr.expectedOutput}</div>
                                </div>
                                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                                  <div className="text-[10px] text-slate-500 uppercase">Actual Output:</div>
                                  <div className={curr.passed ? 'text-emerald-300 truncate' : 'text-rose-400 truncate'}>
                                    {curr.actualOutput}
                                  </div>
                                </div>
                              </div>

                              {curr.errorMessage && (
                                <div className="p-2.5 rounded bg-rose-950/60 border border-rose-900 text-rose-300 text-[11px]">
                                  <strong>Error:</strong> {curr.errorMessage}
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
