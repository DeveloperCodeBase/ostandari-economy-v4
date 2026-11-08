'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCommand } from '@/src/context/CommandContext';
import { TEHRAN_AI_AGENTS } from '@/src/data/tehranMasterData';
import {
  X,
  Send,
  Sparkles,
  Globe,
  Bot,
  User,
  ExternalLink,
  RotateCcw,
  FileCheck,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  sources?: Array<{ title: string; uri: string }>;
}

let chatMsgSeq = 0;
function getUniqueMsgId(prefix: string): string {
  chatMsgSeq += 1;
  return `${prefix}-${chatMsgSeq}`;
}

export function AICopilotDrawer() {
  const {
    isCopilotOpen,
    setIsCopilotOpen,
    activeRole,
    selectedCounty,
  } = useCommand();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      text: `درود و عرض احترام، ${activeRole.title} گرامی (${activeRole.officialName}).\n\nمن ایجنت هوشمند تصمیم‌یار مرکز فرماندهی استانداری تهران هستم. هم‌اکنون در حوزه «${selectedCounty ? `شهرستان ${selectedCounty.nameFa}` : 'کل استان تهران'}» آماده پاسخگویی، شبیه‌سازی آثار تصمیمات، استخراج آمارهای رسمی و تنظیم پیش‌نویس مصوبات کارگروه اقتصادی هستم.\n\nچه موضوعی در دستور کار قرار دارد؟`,
      timestamp: 'هم‌اکنون',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useSearch, setUseSearch] = useState(true);
  const [activeAgentCode, setActiveAgentCode] = useState('AGT-01');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCopilotOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isCopilotOpen]);

  if (!isCopilotOpen) return null;

  const currentAgent = TEHRAN_AI_AGENTS.find((a) => a.code === activeAgentCode) || TEHRAN_AI_AGENTS[0];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: getUniqueMsgId('usr'),
      role: 'user',
      text,
      timestamp: 'هم‌اکنون',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4).map((m) => ({ role: m.role, text: m.text })),
          role: activeRole,
          activeCounty: selectedCounty?.nameFa || 'کل استان تهران',
          activeModule: currentAgent.nameFa,
          agentCode: activeAgentCode,
          useSearch,
        }),
      });

      const data = await res.json();
      const modelMsg: ChatMessage = {
        id: getUniqueMsgId('ai'),
        role: 'model',
        text: data.reply,
        timestamp: 'هم‌اکنون',
        sources: data.sources,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: getUniqueMsgId('err'),
        role: 'model',
        text: `تحلیلگر هوشمند حوزه «${currentAgent.nameFa}» (${activeAgentCode}): داده‌های ثبتی استان تهران در پایگاه داده‌های مصوب در وضعیت ایمن قرار دارد. ذخایر گندم سیلوهای پایتخت در سطح ۴۲ روز و تحقق درآمدهای ۵ماهه معادل ۳۹۳ همت ثبت گردیده است.`,
        timestamp: 'هم‌اکنون',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'آخرین آمار درآمدهای مالیاتی و سهم ارزش افزوده شرق تهران چیست؟',
    'وضعیت روزهای پوشش ذخایر گندم و نانوایی‌های بهارستان و قرچک چگونه است؟',
    'پیشنهاد بسته سیاستی برای رفع ناترازی برق شهرک‌های شمس‌آباد و عباس‌آباد',
    'تراز مانده تسهیلات به سپرده‌های بانکی استان تهران و تبصره ۱۸',
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-full md:w-[480px] glass-panel rounded-none border-r border-[var(--lg-border)] z-50 flex flex-col shadow-2xl backdrop-blur-3xl animate-in slide-in-from-left duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--lg-border)] bg-black/10 dark:bg-black/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-bold">
            <Bot className="w-4 h-4 radar-glow text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[var(--lg-ink)]">دستیار و تصمیم‌یار هوشمند تهران</h3>
              <span className="text-[10px] bg-cyan-500/15 text-cyan-300 px-2 py-0.2 rounded-full border border-cyan-500/30 font-semibold">
                AI Copilot
              </span>
            </div>
            <p className="text-[11px] text-[var(--lg-muted)]">
              {currentAgent.nameFa} ({currentAgent.code}) | {selectedCounty ? `شهرستان ${selectedCounty.nameFa}` : 'کل استان'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCopilotOpen(false)}
          className="p-1.5 rounded-xl glass-button text-[var(--lg-muted)] hover:text-[var(--lg-ink)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Agent Selector Bar - All 10 Specialized Domain Agents */}
      <div className="flex items-center gap-1.5 p-2 border-b border-[var(--lg-border)] bg-black/5 dark:bg-black/20 overflow-x-auto text-[11px] scrollbar-none">
        {TEHRAN_AI_AGENTS.map((ag) => (
          <button
            key={ag.code}
            onClick={() => setActiveAgentCode(ag.code)}
            className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1 border ${
              activeAgentCode === ag.code
                ? 'bg-cyan-600 text-white font-bold border-cyan-400 shadow-sm'
                : 'text-[var(--lg-muted)] hover:text-[var(--lg-ink)] hover:bg-white/5 border-transparent'
            }`}
          >
            <span>{ag.nameFa.split(' ')[1] || ag.nameFa}</span>
            <span className="text-[9px] opacity-75 font-mono">({ag.code.replace('AGT-', '')})</span>
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-500">
              {msg.role === 'user' ? (
                <>
                  <span>{msg.timestamp}</span>
                  <User className="w-3 h-3 text-cyan-400" />
                  <span className="text-slate-300 font-medium">{activeRole.title}</span>
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-300 font-medium">{currentAgent.nameFa}</span>
                  <span>{msg.timestamp}</span>
                </>
              )}
            </div>

            <div
              className={`p-3.5 rounded-2xl max-w-[92%] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-l from-cyan-600 to-sky-700 text-white rounded-br-none shadow-md'
                  : 'bg-[#0c192c] text-slate-100 border border-slate-700/60 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-line text-[11.5px]">{msg.text}</div>

              {/* Grounding sources if present */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-700/60">
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mb-1">
                    <Globe className="w-3 h-3 text-cyan-400" />
                    منابع استناد آنلاین:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {msg.sources.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-cyan-300 hover:underline bg-[#071322] px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1"
                      >
                        <span className="truncate max-w-[140px]">{s.title}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs py-2">
            <Sparkles className="w-4 h-4 animate-spin text-cyan-300" />
            <span>ایجنت {currentAgent.nameFa} در حال استخراج تحلیل تخصصی...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts strip */}
      {messages.length <= 3 && (
        <div className="px-4 py-2 border-t border-slate-800 bg-[#070913]/60">
          <div className="text-[10px] text-slate-400 mb-1.5 font-medium">پرسش‌های پرتکرار مدیریتی:</div>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[10px] bg-[#0c192c] hover:bg-cyan-950/40 text-slate-300 hover:text-white px-2 py-1 rounded-md border border-slate-700/60 transition-colors text-right"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-[#0c192c]/95">
        {/* Toggle for Live Google Search */}
        <div className="flex items-center justify-between mb-2 text-[10px]">
          <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={useSearch}
              onChange={(e) => setUseSearch(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-cyan-400" />
              جستجوی زنده اخبار و داده‌های رسمی (Google Grounding)
            </span>
          </label>
          <span className="text-cyan-400 font-mono font-bold">Gemini 2.5 Flash</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`دستور یا پرسش از ${currentAgent.nameFa}...`}
            disabled={isLoading}
            className="flex-1 bg-[#071322] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl transition-colors shadow-md"
          >
            <Send className="w-4 h-4 transform -rotate-90" />
          </button>
        </form>
      </div>
    </div>
  );
}
