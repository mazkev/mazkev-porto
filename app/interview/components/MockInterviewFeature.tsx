'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Play,
  Clock,
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Volume2,
  Mic,
  MicOff,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  BookOpen,
  Save,
  LayoutDashboard,
  Check,
  Flame,
  ArrowRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import {
  MockInterviewRole,
  MockInterviewDifficulty,
  MockInterviewType,
  MockInterviewDuration,
  MockQuestion,
  MockInterviewScorecard,
  QuestionEvaluation,
  interviewerPersonas,
  getMockQuestions
} from '../../lib/data/mockInterviewData';
import { ActivityItem } from '../../lib/data/dashboardData';

interface MockInterviewFeatureProps {
  lang: 'id' | 'en';
  onSaveMockResult: (newActivity: ActivityItem, score: number, topicLabel: string, durationMinutes: number) => void;
  onNavigateToDashboard: () => void;
}

type Step = 'setup' | 'session' | 'report';

const ROLES: MockInterviewRole[] = ['Backend Golang', 'Backend Java', 'Fullstack', 'Frontend'];
const DIFFICULTIES: MockInterviewDifficulty[] = ['Junior', 'Middle', 'Senior'];
const TYPES: MockInterviewType[] = [
  'Technical Deep-Dive',
  'Behavioral & HR',
  'System Design',
  'Full Simulation'
];
const DURATIONS: { duration: MockInterviewDuration; label: string; countText: string }[] = [
  { duration: 15, label: '15 Menit', countText: '3 Pertanyaan Kunci' },
  { duration: 30, label: '30 Menit', countText: '5 Pertanyaan Standar' },
  { duration: 45, label: '45 Menit', countText: '7 Pertanyaan Mendalam' }
];

export default function MockInterviewFeature({
  lang,
  onSaveMockResult,
  onNavigateToDashboard
}: MockInterviewFeatureProps) {
  // Step state
  const [step, setStep] = useState<Step>('setup');

  // Setup options
  const [selectedRole, setSelectedRole] = useState<MockInterviewRole>('Backend Golang');
  const [selectedDifficulty, setSelectedDifficulty] = useState<MockInterviewDifficulty>('Middle');
  const [selectedType, setSelectedType] = useState<MockInterviewType>('Technical Deep-Dive');
  const [selectedDuration, setSelectedDuration] = useState<MockInterviewDuration>(15);

  // Active Session State
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [remainingSeconds, setRemainingSeconds] = useState<number>(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Report State
  const [scorecard, setScorecard] = useState<MockInterviewScorecard | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);

  const recognitionRef = useRef<any>(null);

  const activePersona = interviewerPersonas[selectedType];

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && step === 'session') {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            handleFinishInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, step]);

  // Speech Recognition
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
          if (questions[currentIndex]) {
            const qId = questions[currentIndex].id;
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
  }, [lang, currentIndex, questions]);

  // Voice playback
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
          ? 'Browser tidak mendukung input mikrofon langsung. Silakan ketik narasi jawaban Anda pada kolom teks.'
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

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1. START MOCK INTERVIEW
  const handleStartInterview = () => {
    const qList = getMockQuestions(selectedType, selectedRole, selectedDifficulty, selectedDuration);
    setQuestions(qList);
    setCurrentIndex(0);
    setAnswers({});
    setRemainingSeconds(selectedDuration * 60);
    setIsTimerRunning(true);
    setIsSaved(false);
    setStep('session');
  };

  // 2. FINISH & EVALUATE INTERVIEW
  const handleFinishInterview = () => {
    setIsTimerRunning(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    // Evaluate each question response
    let techScoreSum = 0;
    let relScoreSum = 0;
    let probScoreSum = 0;

    const evals: QuestionEvaluation[] = questions.map((q) => {
      const userAns = answers[q.id] || '';
      const lowerAns = userAns.toLowerCase();

      const matched: string[] = [];
      const missing: string[] = [];

      q.keyRubrics.forEach((rubric) => {
        const words = rubric.toLowerCase().split(/[\s,()]+/);
        const hasMatch = words.some((w) => w.length > 3 && lowerAns.includes(w));
        if (hasMatch) {
          matched.push(rubric);
        } else {
          missing.push(rubric);
        }
      });

      let qTech = 0;
      let qRel = 0;
      let qProb = 0;

      if (userAns.trim().length > 0) {
        const ratio = matched.length / q.keyRubrics.length;
        qTech = Math.min(100, Math.round(55 + ratio * 45));
        qRel = userAns.length > 50 ? Math.min(100, Math.round(65 + ratio * 35)) : 50;
        qProb = userAns.includes('karena') || userAns.includes('sehingga') || userAns.includes('langkah')
          ? Math.min(100, Math.round(70 + ratio * 30))
          : Math.min(100, Math.round(60 + ratio * 40));
      } else {
        qTech = 0;
        qRel = 0;
        qProb = 0;
      }

      techScoreSum += qTech;
      relScoreSum += qRel;
      probScoreSum += qProb;

      return {
        questionId: q.id,
        questionText: q.questionText[lang],
        candidateAnswer: userAns,
        technicalScore: qTech,
        relevanceScore: qRel,
        problemSolvingScore: qProb,
        matchedRubrics: matched,
        missingRubrics: missing,
        feedback:
          matched.length >= 3
            ? 'Jawaban komprehensif, mencakup istilah arsitektur inti dan mitigasi risiko.'
            : 'Jawaban cukup baik, namun perlu diperjelas detail teknis dan alur penanganan insiden.',
        suggestedAnswer: `${q.suggestedStarAnswer.situation} ${q.suggestedStarAnswer.task} ${q.suggestedStarAnswer.action} ${q.suggestedStarAnswer.result}`
      };
    });

    const avgTech = Math.round(techScoreSum / questions.length);
    const avgRel = Math.round(relScoreSum / questions.length);
    const avgProb = Math.round(probScoreSum / questions.length);
    const overall = Math.round((avgTech * 0.45) + (avgRel * 0.25) + (avgProb * 0.30));

    const verdict = overall >= 85 ? 'Strong Hire' : overall >= 70 ? 'Hire' : 'Needs Review';

    const strengths = [
      'Artikulasi konsep Clean Architecture & Dependency Inversion sangat terstruktur.',
      'Pengalaman operasional nyata di PLN Icon+ memberikan nilai tambah kuat dalam aspek troubleshooting query.',
      'Mampu mengaitkan mitigasi race condition dengan transaksi database ACID.'
    ];

    const areasToImprove = [
      'Tambahkan metrik kuantitatif terukur saat menjelaskan hasil (misal: "latensi turun 40%", "SLA 99.9%").',
      'Perdalam penjelasan skenario failover gRPC dan strategi dead-letter queue Kafka.'
    ];

    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()}`;

    const newScorecard: MockInterviewScorecard = {
      id: `mock-${Date.now()}`,
      role: selectedRole,
      difficulty: selectedDifficulty,
      type: selectedType,
      durationMinutes: selectedDuration,
      date: formattedDate,
      technicalScore: avgTech,
      relevanceScore: avgRel,
      problemSolvingScore: avgProb,
      overallScore: overall,
      hiringVerdict: verdict,
      strengths,
      areasToImprove,
      questionEvaluations: evals
    };

    setScorecard(newScorecard);
    setActiveReviewIndex(0);
    setStep('report');
  };

  // 3. SAVE RESULT TO DASHBOARD & HISTORY
  const handleSaveScorecard = () => {
    if (!scorecard) return;

    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()}`;

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Mock Interview: ${scorecard.type} (${scorecard.role} - ${scorecard.difficulty})`,
      type: 'Mock Interview',
      topic: scorecard.role,
      date: formattedDate,
      score: scorecard.overallScore,
      status: scorecard.hiringVerdict === 'Strong Hire' ? 'Excellent' : scorecard.hiringVerdict === 'Hire' ? 'Completed' : 'Needs Review',
      durationMinutes: scorecard.durationMinutes
    };

    onSaveMockResult(newActivity, scorecard.overallScore, scorecard.role, scorecard.durationMinutes);
    setIsSaved(true);
  };

  const currentQ = questions[currentIndex];
  const currentAnswer = currentQ ? answers[currentQ.id] || '' : '';

  return (
    <div className="space-y-6">
      {/* ========================================================= */}
      {/* STEP 1: SETUP SCREEN */}
      {/* ========================================================= */}
      {step === 'setup' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
              <UserCheck size={14} />
              <span>Simulasi Wawancara Kerja Interaktif (Mock Interview Track)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'id' ? 'Setup Simulasi Mock Interview' : 'Mock Interview Setup'}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {lang === 'id'
                ? 'Simulasikan sesi tanya jawab wawancara kerja secara utuh dengan panel pewawancara industri. Dapatkan kartu skor multi-dimensi (Technical, Relevance, Problem-Solving) beserta evaluasi mendalam.'
                : 'Experience an end-to-end simulated job interview with realistic industry interviewer personas and comprehensive multi-criteria evaluation.'}
            </p>
          </div>

          {/* Setup Configuration Grid */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-8">
            {/* 1. Target Role */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">1</span>
                <span>{lang === 'id' ? 'Posisi / Role Target:' : 'Target Role:'}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRole === r
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900">{r}</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {r === 'Backend Golang' && 'Go Clean Arch & Concurrency'}
                      {r === 'Backend Java' && 'Spring Boot & JPA'}
                      {r === 'Fullstack' && 'Go + Next.js / TypeScript'}
                      {r === 'Frontend' && 'React, Next.js & State'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Difficulty Level */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">2</span>
                <span>{lang === 'id' ? 'Level / Tingkat Kesulitan:' : 'Difficulty Level:'}</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDifficulty(d)}
                    className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedDifficulty === d
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900">{d}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {d === 'Junior' && 'Fondasi & Konsep'}
                      {d === 'Middle' && 'Implementasi & Problem Solving'}
                      {d === 'Senior' && 'High Scale & Leadership'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Interview Type & Persona Preview */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">3</span>
                <span>{lang === 'id' ? 'Tipe Sesi Wawancara:' : 'Interview Track Type:'}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedType === t
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900">{t}</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {t === 'Technical Deep-Dive' && 'Fokus arsitektur kode & database'}
                      {t === 'Behavioral & HR' && 'Pengalaman PLN Icon+ & Kolaborasi'}
                      {t === 'System Design' && 'Skalabilitas & High Concurrency'}
                      {t === 'Full Simulation' && 'Simulasi lengkap multi-aspek'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Persona Showcase Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4 mt-2">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activePersona.avatarColor} text-white flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0`}>
                  {activePersona.name.charAt(0)}
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-mono font-bold text-slate-500">Panel Pewawancara:</div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {activePersona.name} • <span className="text-slate-600 font-normal">{activePersona.roleTitle} ({activePersona.companyContext})</span>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    &ldquo;{activePersona.greeting[lang]}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Duration Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">4</span>
                <span>{lang === 'id' ? 'Durasi Wawancara:' : 'Interview Duration:'}</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {DURATIONS.map((dur) => (
                  <button
                    key={dur.duration}
                    type="button"
                    onClick={() => setSelectedDuration(dur.duration)}
                    className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedDuration === dur.duration
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-sm sm:text-base text-slate-900 font-mono">{dur.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{dur.countText}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-mono">
                Ringkasan: <strong className="text-slate-900">{selectedRole}</strong> • {selectedDifficulty} • {selectedType} • {selectedDuration} Menit
              </div>

              <button
                type="button"
                onClick={handleStartInterview}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play size={16} />
                <span>{lang === 'id' ? 'Mulai Simulasi Wawancara' : 'Start Mock Interview'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: LIVE INTERVIEW SESSION */}
      {/* ========================================================= */}
      {step === 'session' && currentQ && (
        <div className="space-y-6">
          {/* Interviewer & Countdown Header */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${activePersona.avatarColor} text-white flex items-center justify-center font-bold text-base shadow-sm`}>
                {activePersona.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-slate-500">Pewawancara Aktif:</div>
                <div className="text-sm font-extrabold text-slate-900">{activePersona.name} ({activePersona.roleTitle})</div>
              </div>
            </div>

            {/* Timer & Question Progress */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                <Clock size={14} className="text-emerald-600" />
                <span>Sisa Waktu: {formatTimer(remainingSeconds)}</span>
              </div>

              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-extrabold">
                Pertanyaan {currentIndex + 1} dari {questions.length}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Question Dialog Bubble */}
            <div className="space-y-3 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Konteks: {currentQ.context}
                </span>

                <button
                  type="button"
                  onClick={() => handlePlayVoice(currentQ.questionText[lang])}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                >
                  <Volume2 size={14} />
                  <span>Dengarkan Pertanyaan</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-mono font-bold text-slate-600">
                  {activePersona.name} bertanya:
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  &ldquo;{currentQ.questionText[lang]}&rdquo;
                </h2>
              </div>
            </div>

            {/* Candidate Response Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Mic size={14} className={isRecording ? 'text-rose-600 animate-pulse' : 'text-emerald-600'} />
                  <span>Jawaban Narasi Anda:</span>
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
                    ? 'Sampaikan narasi jawaban Anda secara runtut menggunakan metode STAR (Situation, Task, Action, Result) atau ketik poin teknis Anda di sini...'
                    : 'Provide your structured response following the STAR framework (Situation, Task, Action, Result) or type your answer here...'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all leading-relaxed resize-none font-sans"
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-1">
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

                <div className="flex items-center gap-2">
                  {currentIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Kirim & Pertanyaan Berikutnya</span>
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleFinishInterview}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center gap-2"
                    >
                      <Check size={16} />
                      <span>Selesaikan & Nilai Wawancara</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3: SCORECARD & EVALUATION REPORT */}
      {/* ========================================================= */}
      {step === 'report' && scorecard && (
        <div className="space-y-6">
          {/* Header Banner & Hiring Verdict */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                <Award size={14} />
                <span>Hasil Evaluasi Panel Pewawancara</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'id' ? 'Laporan & Kartu Skor Mock Interview' : 'Mock Interview Scorecard & Feedback'}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
                {lang === 'id'
                  ? `Simulasi wawancara ${scorecard.type} untuk posisi ${scorecard.role} (${scorecard.difficulty}) selesai. Simpan hasil ini agar muncul pada Dashboard dan Riwayat.`
                  : `Mock interview simulation for ${scorecard.role} (${scorecard.type}) completed. Save this result to sync with your Dashboard.`}
              </p>
            </div>

            {/* Overall Hiring Verdict Banner */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center font-mono space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-700">
                {scorecard.overallScore}%
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase inline-block ${
                scorecard.hiringVerdict === 'Strong Hire'
                  ? 'bg-emerald-100 text-emerald-800'
                  : scorecard.hiringVerdict === 'Hire'
                  ? 'bg-sky-100 text-sky-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                Hiring Verdict: {scorecard.hiringVerdict}
              </div>
            </div>
          </div>

          {/* 3 Multi-Dimensional Score Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Technical Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Technical Score</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck size={16} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-700">
                {scorecard.technicalScore}%
              </div>
              <p className="text-[11px] text-slate-500">
                Kedalaman pemahaman arsitektur & kode
              </p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${scorecard.technicalScore}%` }} />
              </div>
            </div>

            {/* 2. Relevance Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Relevance Score</span>
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  <Target size={16} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-sky-700">
                {scorecard.relevanceScore}%
              </div>
              <p className="text-[11px] text-slate-500">
                Kesesuaian jawaban dengan konteks soal
              </p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-600 h-full rounded-full" style={{ width: `${scorecard.relevanceScore}%` }} />
              </div>
            </div>

            {/* 3. Problem-Solving Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Problem-Solving</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Zap size={16} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-700">
                {scorecard.problemSolvingScore}%
              </div>
              <p className="text-[11px] text-slate-500">
                Struktur logika solusi & metode STAR
              </p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${scorecard.problemSolvingScore}%` }} />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {!isSaved ? (
                <button
                  type="button"
                  onClick={handleSaveScorecard}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Save size={15} />
                  <span>Simpan Hasil ke Dashboard & Riwayat</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Hasil Wawancara Berhasil Disimpan!</span>
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
              <span>Mulai Wawancara Baru</span>
            </button>
          </div>

          {/* Strengths & Areas to Improve Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm border-b border-slate-100 pb-2.5">
                <ShieldCheck size={18} className="text-emerald-600" />
                <span>Kekuatan Utama yang Ditunjukkan (Strengths):</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {scorecard.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm border-b border-slate-100 pb-2.5">
                <Zap size={18} className="text-amber-600" />
                <span>Area yang Perlu Ditingkatkan (Areas to Improve):</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {scorecard.areasToImprove.map((area, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Per-Question Detailed Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-emerald-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Ulasan Rinci per Pertanyaan ({scorecard.questionEvaluations.length} Soal)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Pilih pertanyaan untuk ulasan detail</span>
            </div>

            {/* Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {scorecard.questionEvaluations.map((ev, idx) => (
                <button
                  key={ev.questionId + idx}
                  type="button"
                  onClick={() => setActiveReviewIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeReviewIndex === idx
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>Pertanyaan #{idx + 1}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-black bg-emerald-500 text-white">
                    {ev.technicalScore}%
                  </span>
                </button>
              ))}
            </div>

            {/* Active Question Evaluation Card */}
            {scorecard.questionEvaluations[activeReviewIndex] && (
              <div className="space-y-5 pt-2">
                {(() => {
                  const ev = scorecard.questionEvaluations[activeReviewIndex];

                  return (
                    <div className="space-y-5">
                      {/* Question Text */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="text-xs font-mono font-bold text-slate-500">Pertanyaan:</div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                          {activeReviewIndex + 1}. {ev.questionText}
                        </h4>
                      </div>

                      {/* Candidate Answer */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                          Jawaban yang Anda Sampaikan:
                        </span>
                        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                          {ev.candidateAnswer.trim() ? (
                            ev.candidateAnswer
                          ) : (
                            <span className="italic text-slate-400">Tidak ada jawaban yang diisi untuk pertanyaan ini.</span>
                          )}
                        </div>
                      </div>

                      {/* Matched vs Missing Rubrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            <span>Poin Rubrik yang Terpenuhi ({ev.matchedRubrics.length})</span>
                          </div>
                          <ul className="space-y-1 text-xs text-emerald-800">
                            {ev.matchedRubrics.map((r, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                            <AlertTriangle size={14} className="text-amber-600" />
                            <span>Poin yang Perlu Dilengkapi ({ev.missingRubrics.length})</span>
                          </div>
                          {ev.missingRubrics.length > 0 ? (
                            <ul className="space-y-1 text-xs text-amber-800">
                              {ev.missingRubrics.map((r, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="text-amber-600 font-bold">•</span>
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-amber-800 font-bold">Seluruh poin rubrik utama berhasil Anda jelaskan.</p>
                          )}
                        </div>
                      </div>

                      {/* Suggested Answer */}
                      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-2">
                        <div className="text-xs font-mono font-bold text-emerald-400">
                          Rekomendasi Jawaban Metode STAR:
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {ev.suggestedAnswer}
                        </p>
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
