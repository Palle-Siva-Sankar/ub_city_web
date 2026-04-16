import { motion, AnimatePresence, useAnimation } from "motion/react";
import {
  Sparkles,
  X,
  MessageSquare,
  Send,
  Store,
  Utensils,
  Building2,
  Package,
  ArrowRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";

type Message = {
  id: string;
  role: "user" | "agent";
  text: string;
  action?: { label: string; to: string; icon: any };
};

const SITUATIONS = [
  {
    id: "brands",
    label: "Find Brands",
    prompt: "Can you help me find a specific brand?",
  },
  {
    id: "dining",
    label: "Book a Table",
    prompt: "I'd like to book a table at a premium restaurant.",
  },
  {
    id: "leasing",
    label: "Contact Leasing",
    prompt: "I need to contact the leasing office for business inquiries.",
  },
  {
    id: "orders",
    label: "Track Orders",
    prompt: "How do I track my recent orders?",
  },
];
const AGENT_RESPONSES: Record<string, Message> = {
  brands: {
    id: "",
    role: "agent",
    text: "Our directories span multiple floors featuring the world's prestigious luxury brands. You can browse the interactive directory here:",
    action: { label: "Explore Directory", to: "/shopping", icon: Store },
  },
  dining: {
    id: "",
    role: "agent",
    text: "Mall of America hosts award-winning gastronomy experiences, spanning international favorites to exquisite cafes. Where would you like to reserve?",
    action: { label: "View Restaurants", to: "/dine", icon: Utensils },
  },
  leasing: {
    id: "",
    role: "agent",
    text: "Our retail spaces offer prime real estate for global brands. I can direct you to our leasing specialists for inquiries.",
    action: { label: "Leasing Portal", to: "/reach-us", icon: Building2 },
  },
  orders: {
    id: "",
    role: "agent",
    text: "To ensure maximum privacy and security, you can track all authenticated purchases and deliveries directly in your client portal.",
    action: { label: "Track Orders", to: "/profile", icon: Package },
  },
};

export function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation(); // Used to reset drag position

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-0",
      role: "agent",
      text: "Welcome to Mall of America. I am your exclusive digital concierge. Ask me anything about our premium brands, reservations, or attractions.",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
      controls.start({ y: 0 }); // Reset drag when opened
    }
  }, [isOpen, messages, isTyping, controls]);

  const handleSituationalPrompt = (situation: (typeof SITUATIONS)[0]) => {
    if (isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: situation.prompt,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        ...AGENT_RESPONSES[situation.id],
        id: (Date.now() + 1).toString(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputValue.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        text: `Our premium concierge team has logged your query: "${userMsg.text}". A dedicated representative will assist you momentarily.`,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Drag handling removed to ensure standard touch/scroll interactions work cleanly on mobile

  return (
    <>
      {/* Floating Trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 md:right-12 z-[70] group touch-manipulation"
          >
            <div className="relative flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-2.5 rounded-full glass-pane border border-accent/40 shadow-gold backdrop-blur-3xl transition-all duration-500 hover:border-accent transform-gpu active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-6 h-6 md:w-7 md:h-7 rounded-full bg-accent flex items-center justify-center text-on-accent shadow-[0_0_20px_rgba(198,163,95,0.6)] group-hover:rotate-[15deg] transition-all">
                <Sparkles className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 fill-[var(--btn-text-on-accent)] text-[var(--btn-text-on-accent)]" />
              </div>
              <span className="relative text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-accent group-hover:text-ink-gradient">
                Concierge
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Interface Bottom Sheet/Floating Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-end md:items-center justify-end md:justify-end md:p-12 pointer-events-none">
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md md:hidden pointer-events-auto"
              style={{ touchAction: "none" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 300,
                mass: 0.8,
              }}
              className="relative w-[340px] md:w-[360px] h-[450px] max-w-[92vw] max-h-[85vh] bg-page glass-pane border border-[var(--border)] rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto transform-gpu overflow-hidden mb-6 md:mb-0 mr-4 md:mr-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-accent/10 blur-[100px] pointer-events-none z-0" />

              {/* Drag Indicator (Mobile Only) */}
              <div className="w-full flex justify-center py-2 md:hidden absolute top-0 left-0 z-20">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>

              {/* Chat Header */}
              <div className="relative z-10 p-5 md:p-6 pt-6 md:pt-6 border-b border-[var(--border)] bg-page/90 backdrop-blur-xl flex items-center justify-between touch-none">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-[1rem] bg-accent flex items-center justify-center text-[var(--btn-text-on-accent)] shadow-gold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-black font-['Outfit'] text-ink-gradient leading-none uppercase tracking-tight">
                      AI Concierge
                    </h2>
                    <p className="text-[7.5px] font-bold text-accent tracking-[0.4em] uppercase mt-1 flex items-center gap-1.5 opacity-90">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
                      Active Live
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:bg-accent hover:text-on-accent transition-all active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat History */}
              <div
                className="relative z-10 flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar overscroll-contain flex flex-col gap-6"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}
                    >
                      <div
                        className={`p-4 rounded-[1.5rem] ${
                          msg.role === "user"
                            ? "bg-accent text-white rounded-tr-[0.25rem] shadow-gold font-medium"
                            : "glass-pane border border-[var(--border)] rounded-tl-[0.25rem] text-ink-gradient shadow-xl"
                        }`}
                      >
                        {msg.role === "agent" && (
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-black/10 dark:border-white/10">
                            <Sparkles
                              className={`w-3 h-3 ${msg.role === "user" ? "text-black" : "text-accent"}`}
                            />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-80">
                              Concierge
                            </span>
                          </div>
                        )}
                        <p className="text-[12px] md:text-[13px] leading-relaxed font-['Inter']">
                          {msg.text}
                        </p>
                      </div>

                      {msg.action && (
                        <Link
                          to={msg.action.to}
                          onClick={() => setIsOpen(false)}
                          className="mt-3 ml-2 group flex items-center gap-4 p-3 pr-4 rounded-[1.25rem] glass-pane border border-accent/40 hover:border-accent hover:bg-accent/10 transition-all bg-page-alt active:scale-95"
                        >
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                            <msg.action.icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-black text-ink-gradient uppercase tracking-widest leading-none">
                            {msg.action.label}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-accent ml-auto transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="self-start glass-pane border border-[var(--border)] p-4 rounded-[1.5rem] rounded-tl-[0.25rem] shadow-xl flex items-center gap-2"
                    >
                      <span
                        className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Situational Chips */}
              {!isTyping && (
                <div
                  className="relative z-10 px-4 md:px-6 pb-2 overflow-x-auto custom-scrollbar flex gap-2"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {SITUATIONS.map((sit) => (
                    <button
                      key={sit.id}
                      onClick={() => handleSituationalPrompt(sit)}
                      className="whitespace-nowrap shrink-0 px-4 py-2 rounded-full glass-pane border border-accent/30 text-[9px] font-black uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-on-accent transition-all shadow-sm active:scale-95 touch-manipulation"
                    >
                      {sit.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input */}
              <div className="relative z-10 p-3 md:p-5 border-t border-[var(--border)] bg-page/95 backdrop-blur-xl">
                <form
                  onSubmit={handleCustomSubmit}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isTyping}
                    className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-[1.5rem] py-3 pl-5 pr-14 text-sm font-medium text-[var(--text-main)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-accent transition-all min-h-[50px] disabled:opacity-50 touch-manipulation"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-2 w-10 h-10 rounded-xl bg-accent text-[var(--btn-text-on-accent)] flex items-center justify-center hover:brightness-110 disabled:opacity-30 disabled:hover:brightness-100 transition-all shadow-gold active:scale-90 touch-manipulation"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
