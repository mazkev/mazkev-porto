export type ProjectCategory = 'Front End' | 'Back End' | 'Full Stack';

export interface ProjectData {
  title: string;
  description: string;
  tech: string[];
  image: string;
  live: string;
  github: string;
  category: ProjectCategory;
}

export interface CaseStudyDetails {
  challenge: string;
  solution: string;
  contributions: string[];
  codeSnippet: string;
  codeLang: string;
}

export const caseStudyMap: Record<string, CaseStudyDetails> = {
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

export const projects: ProjectData[] = [
  {
    title: 'MazCloud Dashboard',
    description: 'A premium cloud storage and file management dashboard. Features interactive capacity charts, secure folder management, and a sleek file browser interface.',
    tech: ['React', 'Tailwind CSS', 'Redux'],
    image: '/projects/mazcloud.png',
    live: 'https://mazcloud.vercel.app/',
    github: 'https://github.com/mazkev/mazcloud',
    category: 'Front End',
  },
  {
    title: 'Enterprise Operations Dashboard',
    description: 'A modern enterprise dashboard and system operations interface. Features real-time activity graphs, scalable data grids, and complex data visualizations.',
    tech: ['Next.js', 'TypeScript', 'Recharts'],
    image: '/projects/nexus.png',
    live: 'https://nexus-project-mu.vercel.app/',
    github: 'https://github.com/mazkev/nexus-project',
    category: 'Front End',
  },
  {
    title: 'CodeQuest AI Gaming Sandbox',
    description: 'A futuristic gamified coding practice sandbox featuring live code execution runner, visual debugger, AI debugging copilot, retro arcade synth audio, and multiplayer cursor simulations.',
    tech: ['React', 'TypeScript', 'AI Copilot', 'WebSockets'],
    image: '/projects/nexus.png',
    live: 'https://github.com/mazkev/codequest-app',
    github: 'https://github.com/mazkev/codequest-app',
    category: 'Full Stack',
  },
  {
    title: 'AI Code Reviewer Copilot',
    description: 'An AI-powered automated code review platform built with React, featuring real-time syntax inspection, security vulnerability suggestions, and AI refactoring prompts.',
    tech: ['React', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    image: '/projects/cryptodash.png',
    live: 'https://github.com/mazkev/AI-Code-Reviewer',
    github: 'https://github.com/mazkev/AI-Code-Reviewer',
    category: 'Full Stack',
  },
  {
    title: 'AI SaaS Image Generator',
    description: 'A SaaS platform application for AI image generation, built with React JS, featuring prompt engineering tools, image variations, style presets, and download handlers.',
    tech: ['React', 'Tailwind CSS', 'AI Image API'],
    image: '/projects/canvass.png',
    live: 'https://github.com/mazkev/AI-SaaS-Image-Generator',
    github: 'https://github.com/mazkev/AI-SaaS-Image-Generator',
    category: 'Full Stack',
  },
  {
    title: 'AI UI Wireframer & Generator',
    description: 'A powerful AI-driven React application that generates and previews responsive Tailwind CSS UI components and visual wireframes on the fly.',
    tech: ['React', 'Tailwind CSS', 'AI Prompt API'],
    image: '/projects/miro.png',
    live: 'https://github.com/mazkev/ai-ui-wireframe',
    github: 'https://github.com/mazkev/ai-ui-wireframe',
    category: 'Full Stack',
  },
  {
    title: 'OmniDesk AI Support Console',
    description: 'A gamified customer support console featuring automated AI agent suggestions, dynamic drag-and-drop Kanban queue, synth audio feedback, and system terminal logs.',
    tech: ['React', 'Zustand', 'AI Agent API', 'Tailwind CSS'],
    image: '/projects/trello.png',
    live: 'https://github.com/mazkev/omnidesk',
    github: 'https://github.com/mazkev/omnidesk',
    category: 'Full Stack',
  },
  {
    title: 'React 3D Product Configurator',
    description: 'An interactive 3D product customization studio built with React and Three.js, featuring real-time lighting, material texture swaps, and 360 camera controls.',
    tech: ['React', 'Three.js', 'WebGL', 'Tailwind CSS'],
    image: '/projects/canvass.png',
    live: 'https://github.com/mazkev/react-3d-configurator',
    github: 'https://github.com/mazkev/react-3d-configurator',
    category: 'Front End',
  },
  {
    title: 'Java Spring Boot REST API Service',
    description: 'An enterprise backend service built with Java Spring Boot, JPA Hibernate, PostgreSQL, and Spring Security featuring JWT authentication and layered architecture.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'REST API'],
    image: '/projects/marketinvent.png',
    live: 'https://github.com/mazkev/tes-backend-java',
    github: 'https://github.com/mazkev/tes-backend-java',
    category: 'Back End',
  },
  {
    title: 'TypeScript Prisma REST API Engine',
    description: 'A scalable Node.js backend REST API built with TypeScript and Prisma ORM, implementing relational schema migrations, JWT auth, and middleware validation.',
    tech: ['TypeScript', 'Node.js', 'Express', 'Prisma'],
    image: '/projects/nexus.png',
    live: 'https://github.com/mazkev/ts-prisma-api',
    github: 'https://github.com/mazkev/ts-prisma-api',
    category: 'Back End',
  },
  {
    title: 'Hajj & Umrah Travel Landing Page',
    description: 'A high-converting, modern landing page for Umrah and Hajj travel packages built with React JS, featuring dynamic itinerary packages and booking forms.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/airbnb.png',
    live: 'https://github.com/mazkev/landing-page-haji-umroh-react',
    github: 'https://github.com/mazkev/landing-page-haji-umroh-react',
    category: 'Front End',
  },
  {
    title: 'React Native Mobile POS System',
    description: 'A mobile Point of Sale application built with React Native Expo and AppScript API, featuring offline cart management, receipt printing simulation, and stock logs.',
    tech: ['React Native', 'Expo', 'JavaScript', 'REST API'],
    image: '/projects/marketinvent.png',
    live: 'https://github.com/mazkev/pos-react-native-appscript',
    github: 'https://github.com/mazkev/pos-react-native-appscript',
    category: 'Full Stack',
  },
  {
    title: 'Duolingo Mobile App Clone',
    description: 'A pixel-perfect UI clone of Duolingo built with React Native Expo, featuring animated lesson cards, streak trackers, and interactive quiz components.',
    tech: ['React Native', 'Expo', 'TypeScript'],
    image: '/projects/gojek.png',
    live: 'https://github.com/mazkev/Duolingo-clone-react-native-expo',
    github: 'https://github.com/mazkev/Duolingo-clone-react-native-expo',
    category: 'Full Stack',
  },
  {
    title: 'Shopee E-Commerce Mobile App Clone',
    description: 'A full-featured mobile e-commerce clone of Shopee built with React Native Expo, featuring flash sale carousels, category grids, and checkout flows.',
    tech: ['React Native', 'Expo', 'Tailwind CSS'],
    image: '/projects/tokopedia.png',
    live: 'https://github.com/mazkev/shopee-clone-react-native-expo',
    github: 'https://github.com/mazkev/shopee-clone-react-native-expo',
    category: 'Full Stack',
  },
  {
    title: 'GitStory GitHub Visualizer',
    description: 'A GitHub repository reader and visualizer built with React JS, displaying interactive commit histories, contributor charts, and file tree breakdowns.',
    tech: ['React', 'GitHub API', 'Tailwind CSS'],
    image: '/projects/twitter.png',
    live: 'https://github.com/mazkev/gitstory',
    github: 'https://github.com/mazkev/gitstory',
    category: 'Front End',
  },
  {
    title: 'Vibe Coding Assistant',
    description: 'An interactive developer assistant web application built with React JS, featuring live snippet generators, prompt templates, and code formatting tools.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/nexus.png',
    live: 'https://github.com/mazkev/vibe-coding-assistant',
    github: 'https://github.com/mazkev/vibe-coding-assistant',
    category: 'Front End',
  },
  {
    title: 'Grab Super-App Clone',
    description: 'A high-fidelity clone of the Grab application, featuring real-time map integration, interactive food delivery menus, and ride-hailing simulations.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/grab.png',
    live: 'https://grab-clone-three.vercel.app/',
    github: 'https://github.com/mazkev/grab-clone',
    category: 'Full Stack',
  },
  {
    title: 'HubSpot CRM Clone',
    description: 'A premium marketing and CRM dashboard clone of HubSpot. Features dynamic analytics charts, contact list management, and sleek marketing campaign interfaces.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/hubspot.png',
    live: 'https://hub-spot-clone-five.vercel.app/',
    github: 'https://github.com/mazkev/HubSpot-clone',
    category: 'Full Stack',
  },
  {
    title: 'Miro Infinite Canvas Clone',
    description: 'A collaborative whiteboard application replicating Miro. Features an infinite canvas, drag-and-drop sticky notes, flowchart components, and real-time cursor simulations.',
    tech: ['Next.js', 'React', 'Zustand'],
    image: '/projects/miro.png',
    live: 'https://miro-clone-kappa-livid.vercel.app/',
    github: 'https://github.com/mazkev/Miro-Clone',
    category: 'Full Stack',
  },
  {
    title: 'Semarketplace Pro',
    description: 'An enterprise-grade e-commerce ecosystem engineered for high-velocity transactions, featuring optimized checkout flows and real-time inventory synchronization.',
    tech: ['Next.js', 'Tailwind CSS', 'Redux', 'Node.js'],
    image: '/projects/semarketplace.jpg',
    live: 'https://semarketplace.vercel.app/',
    github: 'https://github.com/mazkev/Semarketplace',
    category: 'Full Stack',
  },
  {
    title: 'Indofooty Hub',
    description: 'A dynamic sports journalism platform delivering lightning-fast football updates, interactive match statistics, and a seamless multimedia experience for global fans.',
    tech: ['React', 'FastAPI', 'PostgreSQL'],
    image: '/projects/indofooty.jpg',
    live: 'https://indofooty.vercel.app/',
    github: 'https://github.com/mazkev/Indofooty',
    category: 'Full Stack',
  },
  {
    title: 'StreamX: Cinema Reimagined',
    description: 'A premium video-on-demand architectural demonstration featuring advanced content delivery, fluid glassmorphism UI, and ultra-responsive interaction patterns.',
    tech: ['TypeScript', 'React Js', 'Framer Motion'],
    image: '/projects/netflix.jpg',
    live: 'https://netflix-asli.vercel.app/',
    github: 'https://github.com/mazkev/Netflix-Clone',
    category: 'Full Stack',
  },
  {
    title: 'Twitter Clonex',
    description: 'A high-fidelity social media clone featuring real-time feed updates, customizable dark-theme configurations, global user profile management, and interactive media sharing.',
    tech: ['Next.js', 'Firebase', 'Tailwind CSS'],
    image: '/projects/twitter.png',
    live: 'https://twitter-clonex1.vercel.app/',
    github: 'https://github.com/mazkev/twitter-clonex',
    category: 'Full Stack',
  },
  {
    title: 'Airbnb Clonex',
    description: 'A premium travel rental platform featuring dynamic accommodation grid listings, interactive category filter tabs, high-performance checkout simulation, and responsive map visualizations.',
    tech: ['React', 'Next.js', 'PostgreSQL'],
    image: '/projects/airbnb.png',
    live: 'https://airbnb-clonex.vercel.app/',
    github: 'https://github.com/mazkev/airbnb-clone',
    category: 'Full Stack',
  },
  {
    title: 'MazTube: Video Sharing',
    description: 'A sleek, state-of-the-art video sharing ecosystem featuring responsive custom playback overlays, interactive grid queries, sidebar controls, and GPU-accelerated backdrop blur transitions.',
    tech: ['TypeScript', 'React', 'Framer Motion'],
    image: '/projects/maztube.png',
    live: 'https://maztube.vercel.app/',
    github: 'https://github.com/mazkev/Maztube',
    category: 'Full Stack',
  },
  {
    title: 'MazChat: Real-time Messaging',
    description: 'A high-fidelity communication platform featuring a personalized "Mulai Percakapan" onboarding flow, secure unique ID authentication, and a pixel-perfect conversational interface.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    image: '/projects/whatsapp.png',
    live: 'https://whatsapp-rect.vercel.app/',
    github: 'https://github.com/mazkev/WhatsApp-Clone',
    category: 'Full Stack',
  },
  {
    title: 'Instavision: Social Media Clone',
    description: 'A sleek, dark-mode social networking demonstration featuring an elegant login ecosystem, cross-platform authentication patterns, and high-fidelity UI components.',
    tech: ['React', 'Next.js', 'PostgreSQL'],
    image: '/projects/instagram.png',
    live: 'https://instgram1.vercel.app/',
    github: 'https://github.com/mazkev/instgram-clone',
    category: 'Full Stack',
  },
  {
    title: 'InsightFlow: Modern Publishing',
    description: 'A vibrant publishing platform where "good ideas find you." Features a sophisticated Bootstrap-powered interface designed for maximum readability and engagement.',
    tech: ['React', 'Bootstrap', 'Node.js'],
    image: '/projects/medium.png',
    live: 'https://small-medium1.vercel.app/',
    github: 'https://github.com/mazkev/medium-test',
    category: 'Full Stack',
  },
  {
    title: 'MazMarket: Premium Marketplace',
    description: 'A high-performance modern e-commerce platform built with Vue 3, featuring real-time product queries, high-speed filtering, and fluid reactive interface patterns.',
    tech: ['Vue.js', 'Vite', 'Tailwind CSS'],
    image: '/projects/mazmarket.png',
    live: 'https://aplikasi-vue.vercel.app/',
    github: 'https://github.com/mazkev/aplikasi-vue',
    category: 'Front End',
  },
  {
    title: 'MarketX: Angular E-Commerce',
    description: 'An enterprise-grade marketplace powered by Angular, featuring reactive form controls, RxJS data stream management, and deep theme customization.',
    tech: ['Angular', 'TypeScript', 'RxJS'],
    image: '/projects/marketx.png',
    live: 'https://market-x-angular.vercel.app/',
    github: 'https://github.com/mazkev/marketX-angular',
    category: 'Front End',
  },
  {
    title: 'MarketInvent: Inventory Control',
    description: 'A robust warehouse and inventory control system built with Vue, featuring real-time stock dashboards, analytical summaries, and tabular control views.',
    tech: ['Vue.js', 'Bootstrap', 'jQuery'],
    image: '/projects/marketinvent.png',
    live: 'https://vue-market-invent.vercel.app/',
    github: 'https://github.com/mazkev/testmegagiga',
    category: 'Full Stack',
  },
  {
    title: 'Gojek Super-App Clone',
    description: 'A high-fidelity clone of the Gojek Super-App built with Vue 3, featuring animated service shortcuts, booking simulation sheets, and dynamic layout scaling.',
    tech: ['Vue.js', 'Vite', 'Tailwind CSS'],
    image: '/projects/gojek.png',
    live: 'https://gojek-clone-vue.vercel.app/',
    github: 'https://github.com/mazkev/gojek-clone-vue',
    category: 'Front End',
  },
  {
    title: 'Tokopedia Commerce Clone',
    description: 'A premium frontend recreation of Tokopedia, built with React, featuring product search matching, tab categories, carousel promos, and a responsive navigation bar.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    image: '/projects/tokopedia.png',
    live: 'https://tokopedia-react.vercel.app/',
    github: 'https://github.com/mazkev/tokopedia-react',
    category: 'Front End',
  },
  {
    title: 'Spotify Web Player Clone',
    description: 'A sleek, high-fidelity Spotify Web Player clone built with Next.js, featuring responsive glassmorphism sidebars, dynamic gradient headers, and player controls.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    image: '/projects/spotify.png',
    live: 'https://spotify-clonez.vercel.app/',
    github: 'https://github.com/mazkev/Spotify-Clone',
    category: 'Front End',
  },
  {
    title: 'CryptoDash: Elite Fintech Dashboard',
    description: 'A premium real-time cryptocurrency trading and analysis dashboard built with React, featuring dynamic candlestick charts, asset holdings grids, and smooth theme configurations.',
    tech: ['React', 'Vite', 'Recharts'],
    image: '/projects/cryptodash.png',
    live: 'https://crypto-dashboardz.vercel.app/',
    github: 'https://github.com/mazkev/crypto-dashboard',
    category: 'Front End',
  },
  {
    title: 'Trello Kanban Workspace',
    description: 'A high-fidelity Kanban project management board built with React, featuring smooth drag-and-drop column sorting, card detail edits, and state persistence.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    image: '/projects/trello.png',
    live: 'https://trello-azure-five.vercel.app/',
    github: 'https://github.com/mazkev/trello',
    category: 'Front End',
  },
  {
    title: 'Canvass: Premium Design Studio',
    description: 'A premium graphic design and layout editor application built with React, featuring drag-and-drop visual canvases, layer hierarchies, custom text properties, and image exports.',
    tech: ['React', 'Tailwind CSS', 'Zustand'],
    image: '/projects/canvass.png',
    live: 'https://canva-clone-fawn.vercel.app/',
    github: 'https://github.com/mazkev/canva-clone',
    category: 'Front End',
  },
];
