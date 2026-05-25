'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Terminal, Sparkles, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export interface ProjectData {
  title: string;
  description: string;
  tech: string[];
  image: string;
  live: string;
  github: string;
}

interface ProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}

interface CaseStudyDetails {
  challenge: string;
  solution: string;
  contributions: string[];
  codeSnippet: string;
  codeLang: string;
}

const caseStudyMap: Record<string, CaseStudyDetails> = {
  'Semarketplace Pro': {
    challenge: 'Minimizing cart abandonment rates, ensuring zero inventory race conditions, and loading massive catalogues with sub-100ms response times.',
    solution: 'Engineered an optimistic checkout dispatch flow in Redux Toolkit with background polling. Integrated pre-fetching and client-side memory caching to reduce redundant network transfers by 45%.',
    contributions: [
      'Designed responsive cart drawer matching premium UI design patterns.',
      'Implemented optimistic UI state updates that immediately reflect cart changes in the DOM.',
      'Configured automated state purging on successful transaction events.',
    ],
    codeSnippet: `// Redux slice handling optimistic update and cart calculation
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOptimisticItem: (state, action) => {
      const item = action.payload;
      const exists = state.items.find(i => i.id === item.id);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
    }
  }
});`,
    codeLang: 'typescript',
  },
  'Indofooty Hub': {
    challenge: 'Broadcasting live match statistics, goals, and yellow card events to thousands of active clients simultaneously without hitting CPU limits on the server.',
    solution: 'Constructed a robust WebSocket channel pipeline in FastAPI. Threaded message workers using direct connection pool managers that broadcast updates within 30ms of database entry.',
    contributions: [
      'Configured FastAPI WebSocket endpoints to subscribe clients dynamically.',
      'Wired connection recovery fallback listeners in React to seamlessly auto-reconnect.',
      'Optimized PostgreSQL index structures to cut query response times for match histories.',
    ],
    codeSnippet: `# FastAPI WebSocket Manager for live match stat broadcasts
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)`,
    codeLang: 'python',
  },
  'StreamX: Cinema Reimagined': {
    challenge: 'Achieving visual excellence with media loading transitions. Standard lists caused content jumping (Layout Shift) when loading large image assets.',
    solution: 'Wired Framer Motion layout animations combined with Next.js dynamic imports. Handled backdrop-blur filters using CSS hardware acceleration to maintain a solid 60+ FPS on mobile browsers.',
    contributions: [
      'Coded glassmorphism overlays and interactive slide transitions.',
      'Integrated React Player handles to control media playback inside detailed views.',
      'Used Next.js image optimization components to serve compressed WebP variants.',
    ],
    codeSnippet: `// Framer Motion shared layout animation for VOD cards
export function MovieGrid({ movies, onSelect }) {
  return (
    <motion.div layout className="grid grid-cols-3 gap-6">
      {movies.map(movie => (
        <motion.div 
          layoutId={\`card-\${movie.id}\`} 
          onClick={() => onSelect(movie)}
          key={movie.id}
          className="cursor-pointer overflow-hidden rounded-2xl"
        >
          <img src={movie.thumbnail} alt={movie.title} />
        </motion.div>
      ))}
    </motion.div>
  );
}`,
    codeLang: 'typescript',
  },
  'MazChat: Real-time Messaging': {
    challenge: 'Syncing massive chat logs in real-time while avoiding runaway Firestore read costs and memory leaks caused by multiple active collection subscriptions.',
    solution: 'Designed collection snapshot listeners throttled with a 100ms window hook. Configured state cleaning in React useEffect cleanup callbacks to close open database ports immediately on unmount.',
    contributions: [
      'Built a responsive mobile chat bubble UI with scroll-to-bottom refs.',
      'Wired automatic text formatting and emoji parses.',
      'Integrated Firebase auth tokens to secure chat channel routes.',
    ],
    codeSnippet: `// Real-time listener hook with listener cleanup on unmount
useEffect(() => {
  const q = query(
    collection(db, "messages"), 
    orderBy("timestamp", "asc")
  );
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setMessages(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  });

  return () => unsubscribe(); // Cleanup listener on unmount
}, []);`,
    codeLang: 'javascript',
  },
  'Instavision: Social Media Clone': {
    challenge: 'Mitigating performance blockages during concurrent image uploads, and securing private uploads from unauthorized cross-origin indexing.',
    solution: 'Implemented client-side image compression using canvas scaling prior to upload, coupled with signed JWT request headers targeting third-party secure CDNs.',
    contributions: [
      'Created custom double-tap gesture hooks to fire post-like events.',
      'Optimized CSS backdrop blurs to run smoothly across Safari/iOS browsers.',
      'Established user registration endpoints utilizing bcrypt password hashing.',
    ],
    codeSnippet: `// Client-side canvas image resizing prior to transmission
export function resizeImage(file: File, maxW = 800): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = maxW / img.width;
      canvas.width = maxW;
      canvas.height = img.height * scale;
      canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => resolve(blob!), 'image/jpeg', 0.8);
    };
  });
}`,
    codeLang: 'typescript',
  },
  'InsightFlow: Modern Publishing': {
    challenge: 'Structuring a layout that parses rich text configurations dynamically, while maintaining high SEO rankings and structural meta tags.',
    solution: 'Integrated Next.js App Router dynamic Metadata calls that pre-render meta tags at build time, fetching static parameters during server-side build steps.',
    contributions: [
      'Coded a custom responsive sidebar navigation system.',
      'Configured markdown parsing pipelines to render code and image elements safely.',
      'Set up meta keywords mapping for search engine crawlers.',
    ],
    codeSnippet: `// Next.js App Router dynamic SEO metadata generator
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticleData(params.slug);
  return {
    title: \`\${article.title} | InsightFlow\`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage }]
    }
  };
}`,
    codeLang: 'typescript',
  },
};

export default function ProjectDrawer({ isOpen, onClose, project }: ProjectDrawerProps) {
  if (!isOpen || !project) return null;

  const study = caseStudyMap[project.title] || {
    challenge: 'Designing a maintainable frontend component architecture and optimizing page speed.',
    solution: 'Utilized Next.js components combined with Tailwind utility styles to ensure modularity and clean performance metrics.',
    contributions: ['Built reusable page sections.', 'Configured theme overrides.', 'Tested layout views.'],
    codeSnippet: `// Default utility component definition
export default function Component({ name }) {
  return <div className="p-4 bg-slate-100">{name}</div>;
}`,
    codeLang: 'typescript',
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-3xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10"
      >
        {/* Header Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-brand-600/10"
            >
              <ExternalLink size={14} /> Visit Site
            </a>
            {project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-slate-200/40 dark:border-slate-700/60"
              >
                <Github size={14} /> View Code
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-10">
          {/* Cover & Title */}
          <div className="space-y-4">
            <div className="h-64 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800/60 shadow-md">
              <Image 
                src={project.image} 
                alt={project.title} 
                width={800}
                height={400}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold rounded-xl border border-brand-100/50 dark:border-brand-900/50"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-extrabold font-outfit text-slate-900 dark:text-white mt-2">
              {project.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
              {project.description}
            </p>
          </div>

          {/* Technical Challenge */}
          <div className="space-y-3 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
            <h2 className="text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" /> The Challenge
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {study.challenge}
            </p>
          </div>

          {/* Technical Solution */}
          <div className="space-y-3 p-6 rounded-3xl bg-brand-50/30 dark:bg-brand-950/10 border border-brand-100/30 dark:border-brand-900/10">
            <h2 className="text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Sparkles size={16} className="text-brand-500" /> The Engineering Solution
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {study.solution}
            </p>
          </div>

          {/* Contributions */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
              <Layers size={16} className="text-brand-500" /> Key Contributions
            </h2>
            <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-2">
              {study.contributions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Code Showcase */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
              <Terminal size={16} className="text-brand-500" /> Code Showcase
            </h2>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              {/* Code header bar */}
              <div className="bg-slate-100 dark:bg-slate-950 px-4 py-2 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>implementation.{study.codeLang === 'python' ? 'py' : 'ts'}</span>
                <span className="uppercase">{study.codeLang}</span>
              </div>
              {/* Code text block */}
              <pre className="p-4 bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed select-text">
                <code>{study.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
