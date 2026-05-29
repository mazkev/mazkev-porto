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
  'Twitter Clonex': {
    challenge: 'Replicating fluid real-time feed updates with dynamic content loading, while managing dark mode transitions without UI flashes.',
    solution: 'Leveraged Next.js Server Components integrated with Firebase snapshot listeners. Managed theme values in state using CSS custom properties combined with local storage persistence.',
    contributions: [
      'Built a fully responsive layout with left sidebar, central feed, and right trends pane.',
      'Wired instant post publishing and real-time state syncing with Firestore.',
      'Optimized media file compression and uploads directly from the frontend.',
    ],
    codeSnippet: `// Firebase real-time query listener hook for feed logs
useEffect(() => {
  const feedQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  const unsubscribe = onSnapshot(feedQuery, (snapshot) => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  });
  return () => unsubscribe();
}, []);`,
    codeLang: 'typescript',
  },
  'Airbnb Clonex': {
    challenge: 'Structuring quick-search filter queries across hundreds of rental listings, and rendering high-fidelity interactive map cards smoothly.',
    solution: 'Constructed an optimized API routing handler matching SQL indexed parameters. Used Mapbox responsive clusters with memoized coordinate markers to prevent duplicate render passes.',
    contributions: [
      'Integrated dynamic header search boxes and category filter sliders.',
      'Coded a beautiful listing details page with pricing calculator components.',
      'Engineered responsive grid displays supporting full dark mode styling.',
    ],
    codeSnippet: `// Server-side filtered query executor with PostgreSQL indexes
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');

  const listings = await prisma.listing.findMany({
    where: {
      category: category || undefined,
      location: location ? { contains: location, mode: 'insensitive' } : undefined,
    },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(listings);
}`,
    codeLang: 'typescript',
  },
  'MazTube: Video Sharing': {
    challenge: 'Optimizing high-bitrate media playback without UI blockages, and managing responsive sidebars across varying display sizes.',
    solution: 'Wired dynamic react-player lazy loading to decouple heavy playback code from main bundle. Used tailwind container queries to adjust layout layers based on player dimensions.',
    contributions: [
      'Built custom overlay video controllers with volume and progression trackers.',
      'Designed responsive grid displaying dynamic video thumbnails and categories.',
      'Coded smooth backdrop blur transition wipes for a premium dark aesthetics vibe.',
    ],
    codeSnippet: `// Lazy loaded custom player wrapper with state callback handlers
export function CustomPlayer({ url, onProgress }) {
  return (
    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={false}
        playing={true}
        onProgress={(state) => onProgress(state.playedSeconds)}
      />
    </div>
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
  'MazMarket: Premium Marketplace': {
    challenge: 'Implementing a highly-responsive product search grid that filters thousands of items dynamically without triggering heavy layouts or blocking the client rendering thread.',
    solution: 'Leveraged Vue 3 reactive computed properties combined with a debounced virtual scrolling system, keeping DOM node count constant and execution times under 8ms.',
    contributions: [
      'Developed the dynamic product card grid with skeleton loading state animations.',
      'Configured Vite asset-chunking pipelines to optimize initial bundle sizes by 30%.',
      'Wired Tailwind container queries to ensure fluid responsive card scaling.',
    ],
    codeSnippet: `// Vue 3 computed filter pipeline for high-performance sorting
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  const term = searchQuery.value.toLowerCase();
  return products.value.filter(p => 
    p.name.toLowerCase().includes(term) || 
    p.category.toLowerCase().includes(term)
  );
});`,
    codeLang: 'typescript',
  },
  'MarketX: Angular E-Commerce': {
    challenge: 'Managing multi-step purchase flows and user cart states across deep navigation hierarchies without losing transient data or creating memory leaks.',
    solution: 'Designed a centralized state service utilizing RxJS BehaviorSubjects. Bound UI components via the AsyncPipe, which automatically manages subscriptions and garbage collection.',
    contributions: [
      'Implemented a secure, reactive checkout form with dynamic field validation.',
      'Wired an RxJS-based toast notification service for instant user action feedback.',
      'Built custom structural directives to toggle dark and light theme classes across the app.',
    ],
    codeSnippet: `// Angular cart state service utilizing RxJS BehaviorSubject
@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(item: CartItem) {
    const current = this.cartSubject.value;
    const exists = current.find(i => i.id === item.id);
    if (exists) {
      exists.quantity += 1;
      this.cartSubject.next([...current]);
    } else {
      this.cartSubject.next([...current, { ...item, quantity: 1 }]);
    }
  }
}`,
    codeLang: 'typescript',
  },
  'MarketInvent: Inventory Control': {
    challenge: 'Parsing legacy jQuery-based Bootstrap plugins in a modern single-page-application lifecycle without causing memory leaks or layout mismatches.',
    solution: 'Encapsulated jQuery data-table initializations strictly within Vue lifecycle hook wrappers (mounted/beforeDestroy), ensuring cleanup of events and DOM references.',
    contributions: [
      'Created reusable Vue wrappers for legacy jQuery Bootstrap table elements.',
      'Designed visual inventory stock status cards with responsive CSS rules.',
      'Configured dynamic stock level alert triggers and CSV export handlers.',
    ],
    codeSnippet: `// Vue lifecycle encapsulation for legacy jQuery plugins
mounted() {
  this.$nextTick(() => {
    this.tableElement = $(this.$refs.table).DataTable({
      data: this.inventoryData,
      columns: [
        { title: "Product" },
        { title: "Stock" },
        { title: "Status" }
      ]
    });
  });
},
beforeDestroy() {
  if (this.tableElement) {
    this.tableElement.destroy(true);
  }
}`,
    codeLang: 'javascript',
  },
  'Gojek Super-App Clone': {
    challenge: 'Developing a highly interactive multi-service booking interface that manages complex map positioning and service sheet animations seamlessly on mobile displays.',
    solution: 'Leveraged Framer-like transition states in CSS combined with dynamic Vue ref components to trigger slide-up drawer animations and state tracking without stuttering.',
    contributions: [
      'Designed pixel-perfect service shortcut menus matching the official Gojek brand styling.',
      'Wired booking flow simulator with progressive active-state checks.',
      'Optimized mobile touch gesture triggers for slide-up booking drawers.',
    ],
    codeSnippet: `// Vue 3 composition drawer toggle and active state coordinator
const isDrawerExpanded = ref(false);
const activeService = ref<string | null>(null);

const selectService = (service: string) => {
  activeService.value = service;
  isDrawerExpanded.value = true;
};

const closeDrawer = () => {
  isDrawerExpanded.value = false;
  activeService.value = null;
};`,
    codeLang: 'typescript',
  },
  'Tokopedia Commerce Clone': {
    challenge: 'Building a complex multi-row nested navigation header that supports dynamic categories, sticky headers, and smooth hover menus without layout shift.',
    solution: 'Implemented CSS Grid layouts combined with memoized React category drop-down overlays, utilizing custom hooks to handle scroll offsets and state caching.',
    contributions: [
      'Developed the responsive search input with auto-suggestions and historical term tags.',
      'Created slick promo banners using swiper-carousel components.',
      'Integrated theme-conforming green accent configurations matching official brand identity.',
    ],
    codeSnippet: `// React memoized suggestion filtering hook for responsive search
export function SearchSuggestions({ query, items }) {
  const suggestions = useMemo(() => {
    if (!query) return [];
    const filter = query.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().startsWith(filter)
    ).slice(0, 5);
  }, [query, items]);

  return (
    <ul className="absolute left-0 right-0 bg-white border rounded-b-xl shadow-lg z-50">
      {suggestions.map(s => <li key={s.id} className="p-3 hover:bg-slate-50">{s.name}</li>)}
    </ul>
  );
}`,
    codeLang: 'typescript',
  },
  'Spotify Web Player Clone': {
    challenge: 'Synchronizing the media playback state, volume controls, and active playlist queue across sidebars, grid cards, and footer controls without prop drilling.',
    solution: 'Utilized React Context API combined with custom play/pause hooks. Used CSS custom properties in gradient headers to dynamically reflect playlist color schemes.',
    contributions: [
      'Built glassmorphism sidebar navigation and responsive playlist libraries.',
      'Coded sleek player progress slider bars and volume controls with hover states.',
      'Designed fluid gradient backdrops that shift colors based on selected album cards.',
    ],
    codeSnippet: `// Next.js React Context provider for global media player control
export const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, setIsPlaying }}>
      {children}
    </PlayerContext.Provider>
  );
}`,
    codeLang: 'typescript',
  },
  'CryptoDash: Elite Fintech Dashboard': {
    challenge: 'Rendering rapid real-time price tick variations and multi-series line charts simultaneously without causing lag on long-running client sessions.',
    solution: 'Optimized React component rendering by memoizing high-frequency table cells and scheduling price tick updates with custom requestAnimationFrame throttling.',
    contributions: [
      'Designed interactive Recharts area charts with custom color gradients.',
      'Implemented multi-currency coin selection menus with quick search filters.',
      'Wired mock portfolio distribution pie charts with dynamic hover tooltips.',
    ],
    codeSnippet: `// React area chart component rendering live asset histories
export function CryptoAreaChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke="#64748b" />
        <YAxis stroke="#64748b" domain={['auto', 'auto']} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}`,
    codeLang: 'typescript',
  },
  'Trello Kanban Workspace': {
    challenge: 'Implementing a fluid multi-axis drag-and-drop mechanism for both tasks and columns while ensuring local storage state saves remain consistently in sync.',
    solution: 'Utilized React DnB hooks with customized collision detection math, scheduling state updates to save to local storage inside debounced hook triggers.',
    contributions: [
      'Developed vertical column cards with dynamic titles and scrollable task lists.',
      'Created card edit modals with subtask lists, labels, and due dates.',
      'Integrated horizontal scroll boundaries for multi-column board layouts.',
    ],
    codeSnippet: `// React DnD drop container ref handling tasks reordering
export function BoardColumn({ id, cards, moveCard }) {
  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item: { id: string; index: number }) => {
      if (item.id !== id) {
        moveCard(item.id, id);
      }
    }
  });

  return (
    <div ref={drop} className="w-80 bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl flex flex-col min-h-[400px]">
      {cards.map(c => <TaskCard key={c.id} card={c} />)}
    </div>
  );
}`,
    codeLang: 'typescript',
  },
  'Canvass: Premium Design Studio': {
    challenge: 'Managing canvas layout hierarchies, element selections, color changes, and high-quality image exports cleanly in single-session client scopes.',
    solution: 'Constructed a single-source-of-truth Zustand store to track all visual attributes, and used html-to-image library utilities to parse elements into PNG binaries.',
    contributions: [
      'Built the visual edit canvas supporting mouse resize anchors and drag positioning.',
      'Coded sidebar layout panels containing fonts, shapes, layers, and color selectors.',
      'Integrated html-to-image export utilities for download actions.',
    ],
    codeSnippet: `// Zustand store managing visual element layers on Canva board
interface CanvasStore {
  elements: VisualElement[];
  selectedId: string | null;
  addElement: (type: string) => void;
  updateElement: (id: string, attrs: Partial<VisualElement>) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  elements: [],
  selectedId: null,
  addElement: (type) => set((state) => ({
    elements: [...state.elements, { id: uuid(), type, x: 50, y: 50, w: 100, h: 100, color: '#000000' }]
  })),
  updateElement: (id, attrs) => set((state) => ({
    elements: state.elements.map(e => e.id === id ? { ...e, ...attrs } : e)
  }))
}));`,
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
        <div className="px-4 sm:px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-600 hover:bg-brand-700 text-white text-[10px] sm:text-xs font-bold rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-md shadow-brand-600/10"
            >
              <ExternalLink size={14} /> Visit Site
            </a>
            {project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] sm:text-xs font-bold rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer border border-slate-200/40 dark:border-slate-700/60"
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
        <div className="flex-grow overflow-y-auto p-5 sm:p-8 md:p-12 space-y-8 sm:space-y-10">
          {/* Cover & Title */}
          <div className="space-y-4">
            <div className="h-48 sm:h-64 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800/60 shadow-md">
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
