'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Volume2,
  Mic,
  MicOff,
  ChevronRight,
  ChevronLeft,
  Award,
  Sparkles,
  HelpCircle,
  Code2,
  Check,
  Save,
  Layers,
  Flame,
  ArrowRight,
  FileCheck2,
  BookOpen,
  LayoutDashboard,
  Filter
} from 'lucide-react';
import {
  PracticeRole,
  PracticeDifficulty,
  PracticeTopic,
  InterviewQuestion,
  interviewQuestions
} from '../../lib/data/interviewData';
import {
  PracticeStats,
  SkillProgress,
  ActivityItem
} from '../../lib/data/dashboardData';

interface PracticeFeatureProps {
  lang: 'id' | 'en';
  onSaveResult: (newActivity: ActivityItem, score: number, topic: string, questionCount: number, durationMinutes: number) => void;
  onNavigateToDashboard: () => void;
}

type PracticeStep = 'setup' | 'session' | 'result';

interface AnswerRecord {
  questionId: string;
  userAnswer: string;
  matchedConcepts: string[];
  missingConcepts: string[];
  score: number;
}

const ROLES: PracticeRole[] = ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'];
const DIFFICULTIES: PracticeDifficulty[] = ['Junior', 'Middle', 'Senior'];
const TOPICS: PracticeTopic[] = [
  'Golang',
  'SQL',
  'REST API',
  'Database',
  'Docker',
  'Redis',
  'Kafka',
  'gRPC',
  'System Design'
];
const QUESTION_COUNTS = [5, 10, 20];

export default function PracticeFeature({
  lang,
  onSaveResult,
  onNavigateToDashboard
}: PracticeFeatureProps) {
  // Step State
  const [step, setStep] = useState<PracticeStep>('setup');

  // Setup Selections
  const [selectedRole, setSelectedRole] = useState<PracticeRole>('Backend Golang');
  const [selectedDifficulty, setSelectedDifficulty] = useState<PracticeDifficulty>('Middle');
  const [selectedTopic, setSelectedTopic] = useState<PracticeTopic | 'ALL'>('Golang');
  const [selectedCount, setSelectedCount] = useState<number>(5);

  // Active Session State
  const [sessionQuestions, setSessionQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Result / Evaluation State
  const [evaluatedAnswers, setEvaluatedAnswers] = useState<AnswerRecord[]>([]);
  const [overallScore, setOverallScore] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activeReviewTab, setActiveReviewTab] = useState<number>(0);

  const recognitionRef = useRef<any>(null);

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && step === 'session') {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, step]);

  // Web Speech Recognition setup
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
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + ' ';
          }
          if (sessionQuestions[currentIndex]) {
            const qId = sessionQuestions[currentIndex].id;
            setAnswers((prev) => ({
              ...prev,
              [qId]: transcript.trim()
            }));
          }
        };

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition;
      }
    }
  }, [lang, currentIndex, sessionQuestions]);

  // Audio synthesizer cleanup
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [step, currentIndex]);

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
    utterance.rate = 1.0;

    utterance.onstart = () => setIsAudioPlaying(true);
    utterance.onend = () => setIsAudioPlaying(false);
    utterance.onerror = () => setIsAudioPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleToggleRecord = () => {
    if (!recognitionRef.current) {
      alert(
        lang === 'id'
          ? 'Browser tidak mendukung input mikrofon langsung. Silakan ketik narasi jawaban Anda pada textarea.'
          : 'Microphone speech recognition is not supported in this browser. Please type your response.'
      );
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1. START PRACTICE SESSION
  const handleStartPractice = () => {
    // Filter questions based on configuration
    let pool = interviewQuestions.filter((q) => {
      const matchRole = q.role === selectedRole || q.role === 'Backend Golang' || q.role === 'Fullstack';
      const matchTopic = selectedTopic === 'ALL' || q.topic === selectedTopic;
      return matchRole && matchTopic;
    });

    // Fallback if pool is too small: broaden search
    if (pool.length === 0) {
      pool = interviewQuestions.filter((q) => selectedTopic === 'ALL' || q.topic === selectedTopic);
    }
    if (pool.length === 0) {
      pool = interviewQuestions;
    }

    // Shuffle and pick target count (or loop if needed)
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected: InterviewQuestion[] = [];
    for (let i = 0; i < selectedCount; i++) {
      selected.push(shuffled[i % shuffled.length]);
    }

    setSessionQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    setIsSaved(false);
    setStep('session');
  };

  // 2. EVALUATE AND FINISH PRACTICE
  const handleSubmitPractice = () => {
    setIsTimerRunning(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    // Evaluate answers
    let totalScoreSum = 0;
    const records: AnswerRecord[] = sessionQuestions.map((q) => {
      const userAns = answers[q.id] || '';
      const lowerAns = userAns.toLowerCase();

      const matched: string[] = [];
      const missing: string[] = [];

      q.keyConcepts.forEach((concept) => {
        const words = concept.toLowerCase().split(/[\s,()]+/);
        const hasMatch = words.some((w) => w.length > 2 && lowerAns.includes(w));
        if (hasMatch) {
          matched.push(concept);
        } else {
          missing.push(concept);
        }
      });

      let qScore = 0;
      if (userAns.trim().length > 0) {
        if (q.keyConcepts.length > 0) {
          const ratio = matched.length / q.keyConcepts.length;
          // Base score between 60 - 100 based on keyword coverage
          qScore = Math.min(100, Math.round(50 + ratio * 50));
        } else {
          qScore = userAns.trim().length > 20 ? 85 : 70;
        }
      } else {
        qScore = 0;
      }

      totalScoreSum += qScore;

      return {
        questionId: q.id,
        userAnswer: userAns,
        matchedConcepts: matched,
        missingConcepts: missing,
        score: qScore
      };
    });

    const calculatedAvg = Math.round(totalScoreSum / sessionQuestions.length);
    setEvaluatedAnswers(records);
    setOverallScore(calculatedAvg);
    setActiveReviewTab(0);
    setStep('result');
  };

  // 3. SAVE RESULT
  const handleSaveToDashboard = () => {
    const durationMins = Math.max(1, Math.ceil(elapsedSeconds / 60));
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()}`;
    const topicLabel = selectedTopic === 'ALL' ? selectedRole : selectedTopic;

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Latihan ${selectedRole} (${selectedTopic === 'ALL' ? 'Multi-Topik' : selectedTopic} - ${selectedCount} Soal)`,
      type: 'Practice Session',
      topic: topicLabel,
      date: formattedDate,
      score: overallScore,
      status: overallScore >= 85 ? 'Excellent' : overallScore >= 70 ? 'Completed' : 'Needs Review',
      durationMinutes: durationMins
    };

    onSaveResult(newActivity, overallScore, topicLabel, sessionQuestions.length, durationMins);
    setIsSaved(true);
  };

  const currentQ = sessionQuestions[currentIndex];
  const currentAnswer = currentQ ? answers[currentQ.id] || '' : '';

  return (
    <div className="space-y-6">
      {/* ========================================================= */}
      {/* STEP 1: PRACTICE SETUP */}
      {/* ========================================================= */}
      {step === 'setup' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
              <Sparkles size={14} />
              <span>Simulasi Sesi Wawancara Kerja Terstruktur</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'id' ? 'Konfigurasi Latihan Interview' : 'Interview Practice Setup'}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {lang === 'id'
                ? 'Pilih peran jabatan, tingkat kesulitan, topik spesifik, serta jumlah pertanyaan untuk memulai simulasi tanya jawab teknis.'
                : 'Select your target role, difficulty level, topic, and number of questions to start your technical mock session.'}
            </p>
          </div>

          {/* Setup Configuration Form */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-8">
            {/* 1. Target Role */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">1</span>
                <span>{lang === 'id' ? 'Target Role (Posisi Pekerjaan):' : 'Target Role:'}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROLES.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRole === role
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900">{role}</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {role === 'Backend Golang' && 'Clean Arch, Goroutines, REST API'}
                      {role === 'Backend Java' && 'Spring Boot, JPA, Security'}
                      {role === 'Fullstack' && 'Go/Java + React/Next.js'}
                      {role === 'Frontend' && 'React, Next.js, Optimistic UI'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Difficulty Level */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">2</span>
                <span>{lang === 'id' ? 'Tingkat Kesulitan (Difficulty):' : 'Difficulty Level:'}</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900">{diff}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {diff === 'Junior' && 'Fondasi & Konsep Dasar'}
                      {diff === 'Middle' && 'Implementasi & Problem Solving'}
                      {diff === 'Senior' && 'High Scale & System Architecture'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Topic Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">3</span>
                  <span>{lang === 'id' ? 'Pilih Topik Teknis (Topic):' : 'Select Technical Topic:'}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setSelectedTopic('ALL')}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded cursor-pointer ${
                    selectedTopic === 'ALL'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua Topik (Campuran)
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedTopic === topic
                        ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{topic}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {topic === 'Golang' && 'Arch, Concurrency'}
                      {topic === 'SQL' && 'Tuning, Indexing'}
                      {topic === 'REST API' && 'JWT, Idempotency'}
                      {topic === 'Database' && 'EXPLAIN, Replicas'}
                      {topic === 'Docker' && 'Multi-stage, Compose'}
                      {topic === 'Redis' && 'Cache-Aside, Locks'}
                      {topic === 'Kafka' && 'Events, DLQ'}
                      {topic === 'gRPC' && 'Protobuf, Interceptors'}
                      {topic === 'System Design' && 'Scaling, Sharding'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Number of Questions */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">4</span>
                <span>{lang === 'id' ? 'Jumlah Soal (Number of Questions):' : 'Number of Questions:'}</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {QUESTION_COUNTS.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSelectedCount(count)}
                    className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedCount === count
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-sm sm:text-base text-slate-900 font-mono">{count} Soal</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {count === 5 && 'Sesi Cepat (~10 Menit)'}
                      {count === 10 && 'Sesi Standar (~20 Menit)'}
                      {count === 20 && 'Simulasi Penuh (~40 Menit)'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Practice Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-mono">
                Ringkasan: <strong className="text-slate-900">{selectedRole}</strong> • {selectedDifficulty} •{' '}
                {selectedTopic === 'ALL' ? 'Semua Topik' : selectedTopic} • {selectedCount} Pertanyaan
              </div>

              <button
                type="button"
                onClick={handleStartPractice}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play size={16} />
                <span>{lang === 'id' ? 'Mulai Sesi Latihan Sekarang' : 'Start Practice Session'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: ACTIVE PRACTICE SESSION */}
      {/* ========================================================= */}
      {step === 'session' && currentQ && (
        <div className="space-y-6">
          {/* Top Progress & Timer Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            {/* Question Counter & Progress */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600">
                <span>Soal Pertanyaan:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-900 text-xs font-extrabold border border-slate-200">
                  {currentIndex + 1} dari {sessionQuestions.length}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-700 font-bold">{currentQ.role}</span>
              </div>
              {/* Progress Line */}
              <div className="w-48 sm:w-64 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / sessionQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Timer & Meta Badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                <Clock size={14} className="text-emerald-600" />
                <span>Waktu: {formatTime(elapsedSeconds)}</span>
              </div>

              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {currentQ.topic}
              </span>

              <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
                {currentQ.difficulty}
              </span>
            </div>
          </div>

          {/* Question & Answer Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Question Header & Voice Play */}
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Konteks: {currentQ.context}
                </span>

                <button
                  type="button"
                  onClick={() => handlePlayVoice(currentQ.question[lang])}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                >
                  <Volume2 size={14} />
                  <span>Dengarkan Soal</span>
                </button>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                &ldquo;{currentQ.question[lang]}&rdquo;
              </h2>
            </div>

            {/* Candidate Answer Textarea */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Mic size={14} className={isRecording ? 'text-rose-600 animate-pulse' : 'text-emerald-600'} />
                  <span>Jawaban Anda:</span>
                </label>
                <div className="text-xs font-mono text-slate-400">
                  {currentAnswer.trim() ? `${currentAnswer.trim().split(/\s+/).length} Kata` : 'Belum diisi'}
                </div>
              </div>

              <textarea
                value={currentAnswer}
                onChange={(e) => {
                  const val = e.target.value;
                  setAnswers((prev) => ({
                    ...prev,
                    [currentQ.id]: val
                  }));
                }}
                rows={7}
                placeholder={
                  lang === 'id'
                    ? 'Ketik narasi jawaban teknis Anda di sini (jelaskan konsep, langkah arsitektur, dan contoh implementasi), atau gunakan tombol Mulai Bicara (Mic)...'
                    : 'Type your technical answer here (explain the concepts, architectural decisions, and examples), or use the Start Voice (Mic) button...'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all leading-relaxed resize-none"
              />

              {/* Mic & Hint Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
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
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <HelpCircle size={13} />
                    <span>{showHint ? 'Tutup Kisi-Kisi' : 'Lihat Kisi-Kisi Konsep'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  Tekan <strong className="text-slate-700">Selesai</strong> saat semua soal telah Anda jawab.
                </div>
              </div>

              {/* Hint Drawer */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2 mt-3"
                  >
                    <div className="flex items-center gap-1.5 text-emerald-900 font-mono font-bold">
                      <Sparkles size={13} className="text-emerald-600" />
                      <span>Kata Kunci Utama yang Dinilai Pewawancara:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentQ.keyConcepts.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Bottom Controls */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => {
                  if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
                }}
                className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ChevronLeft size={15} />
                <span>Sebelumnya</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < sessionQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentIndex((prev) => prev + 1);
                    }}
                    className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Soal Selanjutnya</span>
                    <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitPractice}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <Check size={16} />
                    <span>Selesai & Kumpulkan Jawaban</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3: RESULT & SCORECARD SCREEN */}
      {/* ========================================================= */}
      {step === 'result' && (
        <div className="space-y-6">
          {/* Result Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                <Award size={14} />
                <span>Hasil Evaluasi Sesi Latihan</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'id' ? 'Laporan & Kartu Skor Interview' : 'Practice Scorecard & Feedback'}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
                {lang === 'id'
                  ? `Sesi latihan ${selectedRole} (${selectedTopic}) dengan total ${sessionQuestions.length} pertanyaan telah selesai. Simpan hasil ini agar muncul pada Dashboard.`
                  : `Practice session for ${selectedRole} (${selectedTopic}) with ${sessionQuestions.length} questions completed. Save this result to sync with your Dashboard.`}
              </p>
            </div>

            {/* Score Showcase */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-center space-y-0.5">
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-700">
                  {overallScore}%
                </div>
                <div className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                  {overallScore >= 85 ? 'Strong Hire' : overallScore >= 70 ? 'Competent' : 'Needs Review'}
                </div>
              </div>

              <div className="h-10 w-px bg-slate-200" />

              <div className="space-y-1 text-xs font-mono text-slate-600">
                <div>Waktu: <strong className="text-slate-900">{formatTime(elapsedSeconds)}</strong></div>
                <div>Soal: <strong className="text-slate-900">{sessionQuestions.length} Butir</strong></div>
              </div>
            </div>
          </div>

          {/* Action Bar (Save to Dashboard & New Practice) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {!isSaved ? (
                <button
                  type="button"
                  onClick={handleSaveToDashboard}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Save size={15} />
                  <span>Simpan Hasil ke Dashboard</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Hasil Berhasil Disimpan di Dashboard!</span>
                  </div>
                  <button
                    type="button"
                    onClick={onNavigateToDashboard}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <LayoutDashboard size={14} />
                    <span>Buka Dashboard</span>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setStep('setup');
                setIsSaved(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Mulai Latihan Baru</span>
            </button>
          </div>

          {/* Detailed Question Review List */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck2 size={18} className="text-emerald-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Ulasan Rinci per Pertanyaan ({sessionQuestions.length} Soal)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Pilih soal untuk melihat ulasan</span>
            </div>

            {/* Question Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {sessionQuestions.map((q, idx) => {
                const rec = evaluatedAnswers[idx];
                const score = rec ? rec.score : 0;
                return (
                  <button
                    key={q.id + idx}
                    type="button"
                    onClick={() => setActiveReviewTab(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeReviewTab === idx
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>Soal #{idx + 1}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-black ${
                      score >= 85 ? 'bg-emerald-500 text-white' : score >= 70 ? 'bg-sky-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {score}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Question Detail Card */}
            {sessionQuestions[activeReviewTab] && evaluatedAnswers[activeReviewTab] && (
              <div className="space-y-6 pt-2">
                {(() => {
                  const q = sessionQuestions[activeReviewTab];
                  const rec = evaluatedAnswers[activeReviewTab];

                  return (
                    <div className="space-y-6">
                      {/* 1. The Prompt & Score Banner */}
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-white text-slate-800 border border-slate-200">
                              {q.topic} • {q.difficulty}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">
                              Konteks: {q.context}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 font-mono font-bold text-xs">
                            <span className="text-slate-500">Skor Soal:</span>
                            <span className={`text-sm font-black ${
                              rec.score >= 85 ? 'text-emerald-700' : rec.score >= 70 ? 'text-sky-700' : 'text-amber-700'
                            }`}>
                              {rec.score}%
                            </span>
                          </div>
                        </div>

                        <h4 className="text-base font-extrabold text-slate-900">
                          {activeReviewTab + 1}. {q.question[lang]}
                        </h4>
                      </div>

                      {/* 2. Candidate Answer Review */}
                      <div className="space-y-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Mic size={14} className="text-slate-500" />
                          <span>Jawaban yang Anda Berikan:</span>
                        </span>
                        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                          {rec.userAnswer.trim() ? (
                            rec.userAnswer
                          ) : (
                            <span className="italic text-slate-400">Tidak ada jawaban yang diisi untuk soal ini.</span>
                          )}
                        </div>
                      </div>

                      {/* 3. Correct & Missing Points Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Matched Concepts */}
                        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                            <CheckCircle2 size={15} className="text-emerald-600" />
                            <span>Poin Konsep yang Terpenuhi ({rec.matchedConcepts.length})</span>
                          </div>
                          {rec.matchedConcepts.length > 0 ? (
                            <ul className="space-y-1 text-xs text-emerald-800">
                              {rec.matchedConcepts.map((item, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="text-emerald-600 font-bold">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-emerald-700/70 italic">Belum ada kata kunci yang terdeteksi.</p>
                          )}
                        </div>

                        {/* Missing Concepts */}
                        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                            <AlertTriangle size={15} className="text-amber-600" />
                            <span>Poin Konsep yang Perlu Dilengkapi ({rec.missingConcepts.length})</span>
                          </div>
                          {rec.missingConcepts.length > 0 ? (
                            <ul className="space-y-1 text-xs text-amber-800">
                              {rec.missingConcepts.map((item, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="text-amber-600 font-bold">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-amber-800 font-bold">Luar biasa! Semua poin konsep utama berhasil Anda sebutkan.</p>
                          )}
                        </div>
                      </div>

                      {/* 4. Explanation */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 font-mono">
                          <BookOpen size={14} className="text-emerald-600" />
                          <span>Penjelasan Teoretis & Operasional:</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {q.explanation[lang]}
                        </p>
                      </div>

                      {/* 5. Suggested Answer Benchmark */}
                      <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                            <Award size={14} className="text-emerald-600" />
                            <span>Rekomendasi Jawaban Standar Wawancara:</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => handlePlayVoice(q.suggestedAnswer[lang])}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 size={13} />
                            <span>Dengarkan</span>
                          </button>
                        </div>

                        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                          {q.suggestedAnswer[lang]}
                        </div>

                        {/* Code Snippet if applicable */}
                        {q.codeSnippet && (
                          <div className="space-y-1.5 pt-2 border-t border-slate-100">
                            <span className="text-[11px] font-mono text-slate-600 uppercase flex items-center gap-1">
                              <Code2 size={12} className="text-emerald-600" /> Contoh Snippet Kode:
                            </span>
                            <pre className="p-3 rounded-xl bg-slate-900 text-emerald-300 text-[11px] font-mono overflow-x-auto">
                              <code>{q.codeSnippet.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
