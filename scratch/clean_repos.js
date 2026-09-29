const fs = require('fs');

const content = fs.readFileSync('app/lib/data/allRepositories.ts', 'utf8');

const removeIds = new Set([
  'Ecommerce-botcamp',
  'Project',
  'final-project',
  'mazkev',
  'testReact5',
  'tes-html',
  'belajar-backend-css-app',
  'belajar-java-springboot',
  'Shovee-Frontend',
  'Semarketplace',
  'Ecommerce-bootcamp'
]);

const match = content.match(/export const ALL_REPOSITORIES:\s*RepoItem\[\]\s*=\s*(\[[\s\S]*?\]);\s*export const DOMAIN_META/);
const repos = eval('(' + match[1] + ')');
const filtered = repos.filter(r => !removeIds.has(r.id) && !removeIds.has(r.name));

const newContent = `export interface RepoItem {
  id: string;
  name: string;
  title: string;
  domain: 'backend' | 'fullstack' | 'frontend' | 'mobile' | 'exploration';
  domainLabel: { en: string; id: string };
  category: string;
  tech: string[];
  sizeKb?: number;
  tier: 1 | 2 | 3 | 4;
  githubUrl: string;
  liveUrl?: string;
  desc: {
    en: string;
    id: string;
  };
}

export const ALL_REPOSITORIES: RepoItem[] = ` + JSON.stringify(filtered, null, 2) + `;

export const DOMAIN_META = {
  backend: {
    icon: 'Server',
    label: { en: 'Backend & Cloud Systems', id: 'Sistem Backend & Cloud' },
    count: 19,
    tier1Count: 15,
    color: 'sky'
  },
  fullstack: {
    icon: 'Layers',
    label: { en: 'Fullstack Web Platforms & Monorepos', id: 'Platform Web Fullstack & Monorepo' },
    count: 13,
    tier1Count: 13,
    color: 'indigo'
  },
  frontend: {
    icon: 'Cpu',
    label: { en: 'Frontend Web Applications', id: 'Aplikasi Web Frontend' },
    count: 36,
    tier1Count: 26,
    color: 'emerald'
  },
  mobile: {
    icon: 'Smartphone',
    label: { en: 'Mobile Applications (iOS & Android)', id: 'Aplikasi Mobile (iOS & Android)' },
    count: 9,
    tier1Count: 9,
    color: 'purple'
  },
  exploration: {
    icon: 'FlaskConical',
    label: { en: 'Engineering Exploration & Labs', id: 'Eksplorasi & Lab Rekayasa' },
    count: 5,
    tier1Count: 0,
    color: 'amber'
  }
};
`;

fs.writeFileSync('app/lib/data/allRepositories.ts', newContent, 'utf8');
console.log('Successfully written allRepositories.ts with', filtered.length, 'clean repositories!');
