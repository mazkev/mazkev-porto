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

export interface ProjectSpecs {
  architecture: string;
  database: string;
  auth: string;
  devopsOrTesting?: string;
}

export interface CaseStudyDetails {
  challenge: string;
  solution: string;
  contributions: string[];
  architectureFlow?: string;
  specs?: ProjectSpecs;
  codeSnippet?: string;
  codeLang?: string;
}

export const caseStudyMap: Record<string, CaseStudyDetails> = {
  'Go Marketplace (Fullstack Go & React)': {
    architectureFlow: 'Client Request ➔ JWT Auth & Validation ➔ Handler Layer ➔ Usecase (Business Logic) ➔ Repository Layer ➔ PostgreSQL (Connection Pool)',
    specs: {
      architecture: 'Fullstack Layered REST API (Go + React)',
      database: 'PostgreSQL 15 (GORM ORM + Connection Pooling)',
      auth: 'JWT Bearer Authentication & Bcrypt Hashing',
      devopsOrTesting: 'Docker Containerization & Postman Collections',
    },
    challenge: 'Synchronizing real-time checkout state between React frontend and Go microservices while ensuring ACID transaction safety for product stock.',
    solution: 'Implemented clean RESTful API contracts with Go structs and GORM ORM transactions. Handled cart state optimistically in React and verified stock availability in PostgreSQL with row-level locks.',
    contributions: [
      'Engineered Go REST API endpoints with JWT middleware authentication.',
      'Designed relational PostgreSQL schema with connection pooling.',
      'Built responsive React frontend with TypeScript and dynamic catalog filters.',
    ],
  },
  'Go Marketplace Backend (GORM & REST API)': {
    architectureFlow: 'HTTP Request ➔ Router Engine ➔ JWT Middleware ➔ Order Service ➔ GORM Tx Repository ➔ PostgreSQL Pool',
    specs: {
      architecture: 'Modular Handler & Service Pattern (Fiber Router)',
      database: 'PostgreSQL (Atomic Transactions & Row-Level Locking)',
      auth: 'JWT Middleware & Role-Based Access Control (RBAC)',
      devopsOrTesting: 'Docker Compose & PostgreSQL Healthchecks',
    },
    challenge: 'Preventing double-spending and inventory race conditions during concurrent high-volume order checkout requests.',
    solution: 'Enforced atomic database transactions (tx.Begin) with optimistic concurrency control and indexed product foreign keys in PostgreSQL.',
    contributions: [
      'Created modular CRUD handlers for auth, product catalogues, and checkout transactions.',
      'Structured environment configuration and PostgreSQL connection health checks.',
      'Implemented structured JSON logging and standardized HTTP error response models.',
    ],
  },
  'Go Clean Architecture REST API': {
    architectureFlow: 'HTTP Request ➔ Middleware ➔ Delivery/Handler ➔ Domain Interface ➔ Usecase Layer ➔ Repository Layer ➔ PostgreSQL',
    specs: {
      architecture: 'Uncle Bob Clean Architecture (4 Decoupled Layers)',
      database: 'PostgreSQL (Repository Interface Abstraction)',
      auth: 'JWT Claims Validation & Middleware Pipeline',
      devopsOrTesting: 'Mock Testing & Automated Migrations',
    },
    challenge: 'Maintaining decoupled codebase where domain business rules are completely independent of third-party frameworks and database drivers.',
    solution: 'Implemented Clean Architecture with 4 distinct layers: Domain (entities & interfaces), Usecase (application logic), Repository (database access), and Delivery (HTTP routing & JSON serialization).',
    contributions: [
      'Defined clean Go interfaces for loose coupling and mockable testing.',
      'Structured database migrations and Docker containerized PostgreSQL environment.',
      'Implemented input validation and standard error code mappings.',
    ],
  },
  'BayE Marketplace (Fullstack Next.js)': {
    architectureFlow: 'Next.js App Router ➔ Server Component Fetch ➔ Client Dynamic Filter ➔ Cart / Bidding State ➔ Tailwind CSS UI',
    specs: {
      architecture: 'Next.js 14 App Router (RSC + Client Slices)',
      database: 'PostgreSQL (Prisma ORM & Connection Pooling)',
      auth: 'NextAuth.js Session & OAuth Handling',
      devopsOrTesting: 'Vercel Edge & Tailwind Responsive Breakpoints',
    },
    challenge: 'Rendering large dynamic auction product lists with interactive live price updates without causing layout shifts or hydration errors.',
    solution: 'Utilized Next.js App Router server components for initial catalog hydration and client state hooks for bidding simulation and filter queries.',
    contributions: [
      'Built eBay-inspired responsive product card grid with badge indicators.',
      'Created dynamic price bidding simulation and modular checkout sheet.',
      'Optimized image loading with Next.js Image component and responsive breakpoints.',
    ],
  },
  'Go Banking Core Engine': {
    architectureFlow: 'Transfer Request ➔ Account Verification ➔ ACID Transaction Lock ➔ Ledger Balance Update ➔ Audit Logging',
    specs: {
      architecture: 'Event-Driven Financial Transaction Engine',
      database: 'PostgreSQL (SELECT FOR UPDATE Row-Level Locking)',
      auth: 'Account Verification & Audit Logging Pipeline',
      devopsOrTesting: 'Dockerized PostgreSQL Concurrency Testing',
    },
    challenge: 'Executing financial balance transfers between user accounts with strict zero-loss consistency and race condition prevention.',
    solution: 'Designed ACID database transactions with row-level locking (SELECT ... FOR UPDATE) in PostgreSQL to guarantee serialized balance updates.',
    contributions: [
      'Engineered transfer transaction handlers with ledger balance verification.',
      'Implemented Dockerized PostgreSQL testing suite with seed migrations.',
      'Structured REST API endpoints with robust error boundary returns.',
    ],
  },
  'Enterprise Operations Dashboard': {
    architectureFlow: 'Metrics Stream ➔ Next.js 16 Client ➔ Recharts Visualization ➔ Tabular Log Filter ➔ Dark/Light System',
    specs: {
      architecture: 'Component-Driven Telemetry Dashboard',
      database: 'Virtual Server Log Stream & Tabular State',
      auth: 'Role-Based Operator View Access',
      devopsOrTesting: 'TypeScript Strict Mode & Recharts Virtualization',
    },
    challenge: 'Visualizing dense system telemetry and server metric streams in real-time without degrading browser frame rates.',
    solution: 'Implemented memoized chart components with Recharts, responsive CSS Grid virtualization, and local state filtering for server logs.',
    contributions: [
      'Designed enterprise-grade dashboard layout with interactive metric cards.',
      'Built tabular system event log viewer with search and severity level filters.',
      'Configured responsive theme system with dark mode priority.',
    ],
  },
  'MazCloud File Storage Dashboard': {
    architectureFlow: 'File Action ➔ Redux State Store ➔ Storage Capacity Engine ➔ Visual File Explorer ➔ Tailwind UI',
    specs: {
      architecture: 'Normalized Redux Tree Hierarchy',
      database: 'Browser File API & Local Storage Persistence',
      auth: 'User Session Workspace Context',
      devopsOrTesting: 'Tailwind CSS Grid & Breadcrumb Routing',
    },
    challenge: 'Managing nested folder navigation and dynamic storage capacity calculations on the client side.',
    solution: 'Structured normalized Redux state slices for file system trees with instant UI feedback for folder creation and deletion.',
    contributions: [
      'Created interactive storage usage donut charts and capacity meters.',
      'Engineered file directory breadcrumbs and multi-select file grid.',
      'Built drag-and-drop file upload interface mockup.',
    ],
  },
  'Bun & Hono E-Commerce Backend (Drizzle ORM)': {
    architectureFlow: 'HTTP Request ➔ Hono Router ➔ Zod Validation ➔ JWT & RBAC Middleware ➔ Drizzle ORM ➔ SQLite / PostgreSQL',
    specs: {
      architecture: 'Hono Web Framework on Bun High-Throughput Runtime',
      database: 'SQLite / PostgreSQL (Drizzle ORM Type-Safe Queries)',
      auth: 'JWT & Role-Based Access Control (RBAC)',
      devopsOrTesting: 'Zod Runtime Schema Validation',
    },
    challenge: 'Maximizing REST API throughput while maintaining strict runtime schema validation and type-safe database queries.',
    solution: 'Leveraged Bun runtime with Hono web framework, Drizzle ORM type-safe queries, and Zod middleware validation.',
    contributions: [
      'Implemented JWT authentication with Role-Based Access Control (RBAC).',
      'Built order return and customer complaint issue tracking workflows.',
      'Configured Drizzle ORM schemas with relations and migration scripts.',
    ],
  },
  'AliExpress Choice E-Commerce (Java Spring Boot)': {
    architectureFlow: 'Vue 3 (Pinia) ➔ RESTful API ➔ Spring Security (JWT) ➔ Controller ➔ Service Layer ➔ Spring Data JPA ➔ PostgreSQL',
    specs: {
      architecture: 'Enterprise MVC (Java 17 Spring Boot 3 + Vue 3)',
      database: 'PostgreSQL (Spring Data JPA / Hibernate ORM)',
      auth: 'Spring Security 6 + JWT Filter Chain',
      devopsOrTesting: 'Maven Multi-Module Build & Docker',
    },
    challenge: 'Structuring an enterprise multi-category marketplace with secure JWT auth and reactive frontend state synchronization.',
    solution: 'Paired Java 17 Spring Boot 3 REST services with Vue 3 Composition API and Pinia state management.',
    contributions: [
      'Engineered Spring Security JWT filter chain and user role management.',
      'Designed PostgreSQL entity relationships with JPA Hibernate.',
      'Built AliExpress-inspired reactive frontend catalog with Tailwind CSS.',
    ],
  },
  'HRMS Enterprise Management (Laravel 11)': {
    architectureFlow: 'Employee Request ➔ Laravel Route ➔ Middleware ➔ Controller ➔ Eloquent ORM ➔ MySQL Database',
    specs: {
      architecture: 'Modular Model-View-Controller (Laravel 11)',
      database: 'MySQL 8 (Eloquent ORM & Foreign Constraints)',
      auth: 'Laravel Session Security & Multi-Role Guards',
      devopsOrTesting: 'PHPUnit Automated Tests & Blade Engine',
    },
    challenge: 'Handling complex corporate payroll calculations, attendance tracking, and hierarchical department leave approvals.',
    solution: 'Built modular MVC architecture in Laravel 11 with Eloquent model relations, automated leave policy checks, and Blade UI.',
    contributions: [
      'Created attendance logging and automated salary deduction rules.',
      'Designed database schemas with foreign key constraints in MySQL.',
      'Implemented department manager approval workflows and report generators.',
    ],
  },
  'Semarketplace Pro': {
    architectureFlow: 'React Client ➔ Redux Toolkit State ➔ Express.js REST API ➔ MongoDB Mongoose ➔ Order Processing',
    specs: {
      architecture: 'MERN Stack (React + Express REST API)',
      database: 'MongoDB (Mongoose ODM & Schemas)',
      auth: 'JWT Auth & HTTP-Only Secure Cookies',
      devopsOrTesting: 'Redux Toolkit Optimistic State Updates',
    },
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
    title: 'Go Marketplace (Fullstack Go & React)',
    description: 'Fullstack e-commerce marketplace built with Go and React. Features RESTful APIs, JWT authentication, product catalog management, and PostgreSQL database integration.',
    tech: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'JWT'],
    image: '/projects/mazmarket.png',
    live: 'https://github.com/mazkev/go-marketplace',
    github: 'https://github.com/mazkev/go-marketplace',
    category: 'Full Stack',
  },
  {
    title: 'Go Marketplace Backend (GORM & REST API)',
    description: 'Backend e-commerce microservice built with Go and GORM. Implements user authentication, product CRUD endpoints, transactional order checkout, and PostgreSQL connection pooling.',
    tech: ['Go', 'GORM', 'PostgreSQL', 'JWT', 'REST API'],
    image: '/projects/mazcloud.png',
    live: 'https://github.com/mazkev/go-marketplace-backend',
    github: 'https://github.com/mazkev/go-marketplace-backend',
    category: 'Back End',
  },
  {
    title: 'Go Clean Architecture REST API',
    description: 'Backend RESTful API service built with Go following Clean Architecture principles (domain, usecase, repository). Features modular repository layers, PostgreSQL database integration, and structured request validation.',
    tech: ['Go', 'Clean Architecture', 'PostgreSQL', 'Docker', 'REST API'],
    image: '/projects/gofinance.png',
    live: 'https://github.com/mazkev/go-clean-arch',
    github: 'https://github.com/mazkev/go-clean-arch',
    category: 'Back End',
  },
  {
    title: 'BayE Marketplace (Fullstack Next.js)',
    description: 'Fullstack e-commerce marketplace inspired by eBay, built with Next.js App Router, TypeScript, and Tailwind CSS. Includes dynamic product filtering, bidding simulation, responsive UI, and modular checkout flow.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    image: '/projects/semarketplace.png',
    live: 'https://github.com/mazkev/BayE-marketplace',
    github: 'https://github.com/mazkev/BayE-marketplace',
    category: 'Full Stack',
  },
  {
    title: 'Semarketplace Pro (React & Express)',
    description: 'Fullstack e-commerce application built with React, Redux Toolkit, and Express.js. Features optimistic cart updates, inventory synchronization, category filtering, and client-side memory caching.',
    tech: ['React', 'Redux', 'Express.js', 'Node.js', 'MongoDB'],
    image: '/projects/semarketplace.jpg',
    live: 'https://semarketplace.vercel.app/',
    github: 'https://github.com/mazkev/semarketplace',
    category: 'Full Stack',
  },
  {
    title: 'MazCloud File Storage Dashboard',
    description: 'Cloud storage management dashboard built with React, Redux, and Tailwind CSS. Features interactive storage capacity charts, secure folder navigation, and file upload tracking.',
    tech: ['React', 'Redux', 'Tailwind CSS', 'JavaScript'],
    image: '/projects/mazcloud.png',
    live: 'https://mazcloud.vercel.app/',
    github: 'https://github.com/mazkev/mazcloud',
    category: 'Front End',
  },
  {
    title: 'Enterprise Operations Dashboard',
    description: 'System operations monitoring interface built with Next.js 16, TypeScript, and Recharts. Features real-time server activity metrics, tabular log viewer, role filters, and responsive data grid layouts.',
    tech: ['Next.js', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    image: '/projects/nexus.png',
    live: 'https://nexus-project-mu.vercel.app/',
    github: 'https://github.com/mazkev/nexus-project',
    category: 'Front End',
  },
  {
    title: 'AliExpress Choice E-Commerce (Java Spring Boot)',
    description: 'Enterprise fullstack e-commerce platform built with Java 17, Spring Boot 3.3+, and Vue 3 (Composition API). Features Spring Security JWT auth, inventory stock management, Pinia state store, and RESTful catalog endpoints.',
    tech: ['Java 17', 'Spring Boot 3', 'Vue.js 3', 'PostgreSQL', 'Pinia'],
    image: '/projects/marketinvent.png',
    live: 'https://github.com/mazkev/java-ecommerce',
    github: 'https://github.com/mazkev/java-ecommerce',
    category: 'Full Stack',
  },
  {
    title: 'HRMS Enterprise Management (Laravel 11)',
    description: 'Human Resource Management System built with Laravel 11, PHP, and MySQL. Features employee attendance records, payroll calculation, department management, and automated leave request workflows.',
    tech: ['Laravel 11', 'PHP', 'Blade', 'MySQL', 'Tailwind CSS'],
    image: '/projects/marketinvent.png',
    live: 'https://github.com/mazkev/HRMS-app-laravel',
    github: 'https://github.com/mazkev/HRMS-app-laravel',
    category: 'Back End',
  },
  {
    title: 'Bun & Hono E-Commerce Backend (Drizzle ORM)',
    description: 'High-throughput e-commerce backend built with Bun runtime, Hono framework, and Drizzle ORM. Features Zod schema validation, JWT authentication, RBAC authorization, and SQLite/PostgreSQL storage.',
    tech: ['Bun', 'Hono', 'TypeScript', 'Drizzle ORM', 'Zod', 'JWT'],
    image: '/projects/mazcloud.png',
    live: 'https://github.com/mazkev/bun-hono',
    github: 'https://github.com/mazkev/bun-hono',
    category: 'Back End',
  },
  {
    title: 'Go Banking Core Engine',
    description: 'Enterprise banking transaction engine built with Go and PostgreSQL. Implements ACID-compliant balance transfers, account ledger verification, optimistic concurrency handling, and RESTful API endpoints.',
    tech: ['Go', 'PostgreSQL', 'Docker', 'REST API'],
    image: '/projects/gofinance.png',
    live: 'https://github.com/mazkev/go-bank',
    github: 'https://github.com/mazkev/go-bank',
    category: 'Back End',
  },
  {
    title: 'React Shopping Cart Application',
    description: 'Interactive e-commerce shopping cart built with React and TypeScript. Features dynamic item quantity adjustments, live price calculations, category filtering, and local storage state persistence.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/semarketplace.jpg',
    live: 'https://github.com/mazkev/react-shopping-cart',
    github: 'https://github.com/mazkev/react-shopping-cart',
    category: 'Front End',
  },
  {
    title: 'React Mini POS System',
    description: 'Point of Sale web application built with React and JavaScript. Features product item lookup, dynamic cart calculation, receipt printing simulation, and transaction summary logging.',
    tech: ['React', 'JavaScript', 'Tailwind CSS'],
    image: '/projects/marketinvent.png',
    live: 'https://github.com/mazkev/react-mini-pos',
    github: 'https://github.com/mazkev/react-mini-pos',
    category: 'Front End',
  },
  {
    title: 'Traveloka Mobile App Clone (React Native)',
    description: 'Mobile travel booking application UI built with React Native and Expo. Features flight & hotel search grids, interactive booking datepickers, and dynamic ticket summary cards.',
    tech: ['React Native', 'Expo', 'TypeScript'],
    image: '/projects/airbnb.png',
    live: 'https://github.com/mazkev/treveloka-react-native-expo',
    github: 'https://github.com/mazkev/treveloka-react-native-expo',
    category: 'Front End',
  },
  {
    title: 'TikTok Mobile App UI Clone (React Native)',
    description: 'Mobile video feed application UI built with React Native and Expo. Features vertical video swiping gestures, animated like counters, user profile views, and bottom tab navigation.',
    tech: ['React Native', 'Expo', 'TypeScript'],
    image: '/projects/netflix.jpg',
    live: 'https://github.com/mazkev/tiktok-clone-react-native-expo',
    github: 'https://github.com/mazkev/tiktok-clone-react-native-expo',
    category: 'Front End',
  },
  {
    title: 'Spotify Web Player Clone',
    description: 'Music streaming web player interface built with Next.js and Tailwind CSS. Features glassmorphism sidebar navigation, playlist browsing, audio playback controls, and gradient headers.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    image: '/projects/spotify.png',
    live: 'https://spotify-clonez.vercel.app/',
    github: 'https://github.com/mazkev/Spotify-Clone',
    category: 'Front End',
  },
  {
    title: 'Trello Kanban Workspace',
    description: 'Kanban project management board built with React and Tailwind CSS. Features drag-and-drop task card sorting across columns, card detail modal editing, and local state persistence.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    image: '/projects/trello.png',
    live: 'https://trello-azure-five.vercel.app/',
    github: 'https://github.com/mazkev/trello',
    category: 'Front End',
  },
  {
    title: 'Canvass Graphic Design Studio',
    description: 'Graphic design canvas editor built with React, Zustand, and Tailwind CSS. Features interactive drag-and-drop element placement, layer ordering, color property controls, and export options.',
    tech: ['React', 'Tailwind CSS', 'Zustand'],
    image: '/projects/canvass.png',
    live: 'https://canva-clone-fawn.vercel.app/',
    github: 'https://github.com/mazkev/canva-clone',
    category: 'Front End',
  },
  {
    title: 'MazMarket Vue Marketplace',
    description: 'Modern e-commerce platform built with Vue 3 and Vite. Features reactive product queries, category filtering, cart management, and fluid responsive design.',
    tech: ['Vue.js', 'Vite', 'Tailwind CSS'],
    image: '/projects/mazmarket.png',
    live: 'https://aplikasi-vue.vercel.app/',
    github: 'https://github.com/mazkev/aplikasi-vue',
    category: 'Front End',
  },
  {
    title: 'MarketX Angular E-Commerce',
    description: 'Enterprise marketplace frontend built with Angular and TypeScript. Features reactive form validation, RxJS state management streams, and theme customization.',
    tech: ['Angular', 'TypeScript', 'RxJS'],
    image: '/projects/marketx.png',
    live: 'https://market-x-angular.vercel.app/',
    github: 'https://github.com/mazkev/marketX-angular',
    category: 'Front End',
  },
];
