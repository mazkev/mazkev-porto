import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import MobileNav from "./components/MobileNav";

const About = dynamic(() => import("./components/About"));
const Projects = dynamic(() => import("./components/Projects"));
const GithubActivity = dynamic(() => import("./components/GithubActivity"));
const ContactForm = dynamic(() => import("./components/ContactForm"));

export default function Home() {
  return (
    <>
      <Navbar />
      <MobileNav />
      <main>
        <Hero />
        <LogoMarquee />
        <About />
        <Projects />
        <GithubActivity />
        <ContactForm />
      </main>

      <footer className="print:hidden py-16 border-t border-slate-200 dark:border-slate-800 container-max px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-black text-xs font-bold">
            P.
          </div>
          <span className="font-bold font-geist">Mazkev<span className="text-primary">.</span></span>
        </div>
        
        <span>© {new Date().getFullYear()} All rights reserved. build by mazkev.</span>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-all cursor-pointer">Privacy</a>
          <a href="#" className="hover:text-primary transition-all cursor-pointer">Terms</a>
        </div>
      </footer>
    </>
  );
}
