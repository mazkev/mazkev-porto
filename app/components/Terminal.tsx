'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

type CommandHistory = {
  command: string;
  output: string | null;
};

export default function Terminal() {
  const { setTheme, resolvedTheme } = useTheme();
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === '') {
      setHistory(prev => [...prev, { command: trimmed, output: null }]);
      return;
    }

    if (cmdHistory.length === 0 || cmdHistory[cmdHistory.length - 1] !== trimmed) {
      setCmdHistory(prev => [...prev, trimmed]);
    }
    setHistoryIndex(-1);

    let output = '';

    switch (trimmed) {
      case 'help':
        output = "Available: <span class='text-yellow-400'>about</span>, <span class='text-yellow-400'>projects</span>, <span class='text-yellow-400'>experience</span>, <span class='text-yellow-400'>contact</span>, <span class='text-yellow-400'>theme</span>, <span class='text-yellow-400'>clear</span>, <span class='text-yellow-400'>whoami</span>";
        break;
      case 'whoami':
        output = "You are a visitor in the world of DevShell - an Elite Performance Architect.";
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'theme':
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        output = "Switching visual engine mode...";
        break;
      case 'about':
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        output = "Navigating to About section...";
        break;
      case 'projects':
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        output = "Navigating to Work section...";
        break;
      case 'experience':
        document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
        output = "Navigating to Experience section...";
        break;
      case 'contact':
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        output = "Opening contact portal...";
        break;
      default:
        output = "Command not found. Type 'help'.";
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        if (historyIndex === -1) {
          setHistoryIndex(cmdHistory.length - 1);
          setInput(cmdHistory[cmdHistory.length - 1]);
        } else if (historyIndex > 0) {
          const nextIndex = historyIndex - 1;
          setHistoryIndex(nextIndex);
          setInput(cmdHistory[nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex !== -1) {
        if (historyIndex < cmdHistory.length - 1) {
          const nextIndex = historyIndex + 1;
          setHistoryIndex(nextIndex);
          setInput(cmdHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  return (
    <div className="tilt-card reveal active">
      <div 
        className="tilt-inner" 
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
          card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.05, 1.05, 1.05)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }}
      >
        <div 
          ref={terminalRef}
          className="bg-black/90 dark:bg-black text-emerald-400 font-mono rounded-3xl p-6 shadow-2xl h-[350px] overflow-y-auto border border-white/10"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="mb-2 text-[13px] leading-relaxed">
            <div>Welcome to <span className="text-yellow-400">DevShell v2.4.0</span>.</div>
            <div>Type <span className="text-yellow-400">'help'</span> to see available commands.</div>
          </div>
          
          {history.map((h, i) => (
            <div key={i} className="mb-2 text-[13px] leading-relaxed">
              <div>guest@devshell:~$ {h.command}</div>
              {h.output && <div dangerouslySetInnerHTML={{ __html: h.output }} />}
            </div>
          ))}
          
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold">guest@devshell:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white w-full font-mono text-[13px]"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
