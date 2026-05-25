import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import About from "./components/About";
import Projects from "./components/Projects";
import CodePlayground from "./components/CodePlayground";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <About />
      <Projects />
      <CodePlayground />
      <ContactForm />
      
      <footer className="py-12 border-t border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              P.
            </div>
            <span className="font-bold font-outfit">Portfolio<span className="text-brand-600">.</span></span>
          </div>
          
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} All rights reserved. Built with Next.js & Tailwind.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
