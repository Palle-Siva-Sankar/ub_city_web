import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Mail, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { useNavigate } from "react-router";
import { useCart, useOrders, useUserSession, useWishlist } from "../hooks/useFeatures";
import { Footer } from "../components/Footer";
import { VIDEOS, POSTERS } from "../data/mediaAssets";

type AuthMode = "signin" | "create";
type AuthMethod = "phone" | "email";
type Step = "input" | "otp" | "success";

const COUNTRY_CODES: { code: CountryCode, name: string, dial: string }[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "AE", name: "UAE", dial: "+971" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "CN", name: "China", dial: "+86" },
];

export function Login() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [authMethod, setAuthMethod] = useState<AuthMethod>("email");
  const [step, setStep] = useState<Step>("input");
  
  // Form State
  const [country, setCountry] = useState<CountryCode>("US");
  const [phoneRaw, setPhoneRaw] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP for realistic security
  const [generatedOtp, setGeneratedOtp] = useState("");
  const { login } = useUserSession();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { orderStats } = useOrders();
  
  // Validation State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(60);

  const generateOtpCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  // OTP Timer Logic
  useEffect(() => {
    let timer: number;
    if (step === "otp" && countdown > 0) {
      timer = window.setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return "Invalid email formatting.";
    
    // Simulate real-time DNS / fake email check
    const badDomains = ["test.com", "fake.com", "mailinator.com", "example.com"];
    const domain = email.split("@")[1];
    if (badDomains.includes(domain)) return "This email domain appears to be invalid or deactivated.";
    
    return null;
  };

  const validateCredentials = () => {
    if (authMode === "create" && !username.trim()) return "Username is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const credentialError = validateCredentials();
    if (credentialError) {
      setErrorMsg(credentialError);
      return;
    }

    if (authMethod === "email") {
      const err = validateEmail(email);
      if (err) return setErrorMsg(err);
    } else {
      if (!isValidPhoneNumber(phoneRaw, country)) {
        return setErrorMsg("Invalid phone number formatting for the selected region.");
      }
    }

    setIsLoading(true);
    try {
      if (authMethod === "phone") {
        const e164Phone = getE164Phone();
        const response = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: e164Phone }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Failed to send OTP");
        setGeneratedOtp("");
        await trackActivity("OTP_SENT_PHONE", { destination: e164Phone });
      } else {
        setGeneratedOtp(generateOtpCode());
        await trackActivity("OTP_SENT_EMAIL_DEMO", { destination: email.trim() });
      }

      setStep("otp");
      setCountdown(60);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => document.getElementById("otp-0")?.focus(), 100);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Unable to send OTP right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-advance cursor
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    // Auto-delete cursor tracking
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;
    
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      if (authMethod === "phone") {
        const e164Phone = getE164Phone();
        const response = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: e164Phone, code }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "OTP verification failed.");
        await trackActivity("OTP_VERIFIED_PHONE", { destination: e164Phone });
      } else if (code !== generatedOtp) {
        throw new Error("Invalid or expired authentication code. Try again.");
      } else {
        await trackActivity("OTP_VERIFIED_EMAIL_DEMO", { destination: email.trim() });
      }

      setStep("success");
      await trackActivity("LOGIN_SUCCESS", { mode: authMode, method: authMethod });
      login({
        name: username.trim(),
        email: authMethod === "email" ? email.trim() : `${username.trim().toLowerCase().replace(/\s+/g, "")}@ubcity.local`,
        phone: authMethod === "phone" ? getDisplayPhone() : "",
        role: "visitor",
      });
      setTimeout(() => { navigate("/profile#orders"); }, 2000);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Formatter for display
  const getDisplayPhone = () => {
    try {
      const pn = parsePhoneNumber(phoneRaw, country);
      return pn.formatInternational();
    } catch {
      return phoneRaw;
    }
  };

  const getE164Phone = () => {
    try {
      const pn = parsePhoneNumber(phoneRaw, country);
      return pn.number;
    } catch {
      return "";
    }
  };

  const trackActivity = async (action: string, details: Record<string, unknown> = {}) => {
    const userKey = (authMethod === "email" ? email.trim() : getE164Phone()) || username.trim() || "anonymous";
    const payload = {
      userId: userKey,
      username: username.trim(),
      email: authMethod === "email" ? email.trim() : "",
      phone: authMethod === "phone" ? getE164Phone() : "",
      action,
      details,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch("http://127.0.0.1:8899/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Activity monitor runs separately; ignore if offline.
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-page transition-colors duration-500">
      {/* ─── Cinematic Background ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-40 dark:opacity-20"
          style={{ backgroundImage: `url(${POSTERS.fashion})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-page/60 via-page/80 to-page" />
      </div>

      <div className="relative z-10 w-full max-w-xl px-6 py-20">
        <div className="flex justify-center mb-16">
           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Link to="/" className="inline-flex items-center gap-4 px-8 py-4 glass-pane border border-[var(--border)] rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold">
                <ArrowLeft className="w-4 h-4" /> Home
              </Link>
           </motion.div>
        </div>

        <motion.div 
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-pane lighting-card rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border border-[var(--border)]"
        >
          {/* Progress Indicator */}
          {step !== "success" && (
            <div className="flex gap-6 mb-12 w-full justify-center">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step === "input" ? "bg-accent shadow-gold" : "bg-accent/20"}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step === "otp" ? "bg-accent shadow-gold" : "bg-[var(--border)]"}`} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ════════════ INPUT STEP ════════════ */}
            {step === "input" && (
              <motion.div key="input" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
                
                {/* Sign In vs Create Account Toggle */}
                <div className="glass-pane p-2 rounded-[2rem] border border-[var(--border)] flex mb-12 shadow-inner">
                  <button onClick={() => { setAuthMode("signin"); setErrorMsg(""); }} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all duration-500 ${authMode === "signin" ? "bg-accent text-black shadow-gold" : "text-ink-gradient opacity-40 hover:opacity-100"}`}>
                    Sign In
                  </button>
                  <button onClick={() => { setAuthMode("create"); setErrorMsg(""); }} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all duration-500 ${authMode === "create" ? "bg-accent text-black shadow-gold" : "text-ink-gradient opacity-40 hover:opacity-100"}`}>
                    Create Account
                  </button>
                </div>

                <div className="text-center mb-12">
                  <h1 className="text-5xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-4">Welcome Back</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Sign in to your account</p>
                </div>

                {/* Email vs Phone Tabs */}
                <div className="flex gap-10 justify-center mb-12 border-b border-[var(--border)] pb-6">
                  <button onClick={() => { setAuthMethod("phone"); setErrorMsg(""); }} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${authMethod === "phone" ? "text-accent scale-110" : "text-ink-gradient opacity-30 hover:opacity-100"}`}>
                    <Phone className="w-4 h-4" /> Phone
                  </button>
                  <button onClick={() => { setAuthMethod("email"); setErrorMsg(""); }} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${authMethod === "email" ? "text-accent scale-110" : "text-ink-gradient opacity-30 hover:opacity-100"}`}>
                    <Mail className="w-4 h-4" /> Email
                  </button>
                </div>

                <form onSubmit={handleInputSubmit} className="flex flex-col gap-6">
                  {errorMsg && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-[2rem] flex items-start gap-4 text-xs font-bold leading-relaxed">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p>{errorMsg}</p>
                    </motion.div>
                  )}

                  {authMode === "create" && (
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-6">Username</label>
                       <input
                         type="text"
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                         placeholder="Enter unique ID"
                         className="w-full glass-pane border border-[var(--border)] text-ink-gradient rounded-[2rem] px-8 py-5 focus:border-accent transition-all font-bold placeholder:opacity-20 outline-none"
                       />
                    </div>
                  )}

                  {authMethod === "phone" ? (
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-6">Mobile Access</label>
                       <div className="flex gap-3 w-full items-center">
                          <div className="relative">
                            <select 
                              value={country} 
                              onChange={(e) => setCountry(e.target.value as CountryCode)} 
                              className="bg-accent/10 border border-accent/30 text-accent rounded-2xl px-5 py-5 focus:outline-none focus:border-accent appearance-none cursor-pointer pr-12 font-black text-xs tracking-widest outline-none"
                            >
                              {COUNTRY_CODES.map(c => <option key={c.code} value={c.code} className="bg-page text-ink-gradient">{c.code} ({c.dial})</option>)}
                            </select>
                            <div className="absolute top-[50%] right-4 -translate-y-1/2 pointer-events-none text-accent">▾</div>
                          </div>
                          <input 
                            type="tel" 
                            value={phoneRaw}
                            onChange={(e) => setPhoneRaw(e.target.value)}
                            placeholder="Number Profile"
                            className="flex-1 glass-pane border border-[var(--border)] text-ink-gradient rounded-[2.5rem] px-8 py-5 focus:border-accent transition-all font-bold placeholder:opacity-20 outline-none"
                          />
                       </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-6">Email</label>
                       <div className="relative group">
                        <Mail className="w-5 h-5 absolute left-8 top-1/2 -translate-y-1/2 text-accent opacity-20 group-focus-within:opacity-100 transition-opacity" />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@email.com"
                          className="w-full glass-pane border border-[var(--border)] text-ink-gradient rounded-[2.5rem] pl-16 pr-8 py-5 focus:border-accent transition-all font-bold placeholder:opacity-20 outline-none"
                        />
                       </div>
                    </div>
                  )}

                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-6">Password</label>
                     <input
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="••••••••"
                       className="w-full glass-pane border border-[var(--border)] text-ink-gradient rounded-[2.5rem] px-8 py-5 focus:border-accent transition-all font-black text-xl tracking-[0.4em] placeholder:opacity-20 outline-none"
                     />
                  </div>

                  <button type="submit" disabled={isLoading} className="btn-luxe w-full py-6 mt-8 disabled:opacity-30 disabled:grayscale transition-all text-sm">
                    {isLoading ? <span className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" /> : <>{authMethod === "email" ? "Initialize Gateway" : "Secure Authentication"} <ArrowRight className="w-5 h-5 ml-4" /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ════════════ OTP VERIFICATION STEP ════════════ */}
            {step === "otp" && (
              <motion.div key="otp" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                <div className="text-center mb-12 px-6">
                  <h1 className="text-5xl font-black font-['Outfit'] text-ink-gradient mb-6 uppercase tracking-tighter leading-none">Identity <br/><span className="text-gradient">Valuation.</span></h1>
                  <p className="text-[color:var(--text-dim)] text-sm font-medium italic leading-relaxed">
                    A secure authentication token has been dispatched to: <br/>
                    <strong className="text-accent mt-4 block font-black text-lg tracking-widest">{authMethod === "phone" ? getDisplayPhone() : email}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerify} className="flex flex-col gap-10">
                  {authMethod === "email" ? (
                    <div className="rounded-[2.5rem] border border-accent/20 bg-accent/5 p-8 text-center space-y-2">
                      <p className="text-[9px] uppercase tracking-[0.5em] font-black text-accent opacity-60">System Bypass Key</p>
                      <p className="text-4xl font-black tracking-[0.4em] text-ink-gradient font-['Outfit']">{generatedOtp || "------"}</p>
                      <p className="text-[11px] text-[color:var(--text-dim)] font-medium italic opacity-60">Authentication environment is currently isolated.</p>
                    </div>
                  ) : (
                    <div className="rounded-[2.5rem] border border-green-500/20 bg-green-500/5 p-8 text-center">
                      <p className="text-[9px] uppercase tracking-[0.5em] font-black text-green-500 opacity-60">Dispatch Successful</p>
                      <p className="text-sm text-green-500/80 font-bold mt-2 italic px-10">Verification package received at {getDisplayPhone()}.</p>
                    </div>
                  )}

                  {errorMsg && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 text-red-500 p-6 rounded-[2rem] text-center text-xs font-bold border border-red-500/20 shadow-sm">
                      {errorMsg}
                    </motion.div>
                  )}

                  <div className="flex justify-between gap-4 max-w-[420px] mx-auto">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className={`w-14 h-20 glass-pane border-2 ${digit ? 'border-accent text-accent shadow-gold' : 'border-[var(--border)] text-ink-gradient'} rounded-2xl text-center text-3xl font-black font-['Outfit'] focus:border-accent focus:outline-none transition-all outline-none`}
                      />
                    ))}
                  </div>

                  <div className="text-center space-y-10 pt-4">
                    <button
                      type="submit"
                      className="btn-luxe w-full !py-5 !text-[11px] !rounded-[2.5rem] mt-4"
                    >
                      Sign In
                    </button>
                    
                    <div className="flex flex-col gap-6 text-[10px] font-black tracking-[0.5em] uppercase text-accent">
                      {countdown > 0 ? (
                        <span className="opacity-40">Security refresh in {countdown}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {/* Resend Logic */}}
                          className="hover:scale-110 transition-transform underline underline-offset-8"
                        >
                          Resend Protocol
                        </button>
                      )}
                      <button type="button" onClick={() => setStep("input")} className="text-ink-gradient opacity-30 hover:opacity-100 mt-6 tracking-widest text-[9px]">
                        Redefine Destination
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ════════════ SUCCESS STEP ════════════ */}
            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-20">
                 <div className="w-40 h-40 bg-accent/20 rounded-full flex items-center justify-center mb-16 shadow-gold border border-accent/20">
                    <CheckCircle2 className="w-20 h-20 text-accent" />
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black font-['Outfit'] text-ink-gradient mb-8 uppercase tracking-tighter leading-none">Access <br/><span className="text-gradient">Granted.</span></h2>
                 <p className="text-[color:var(--text-dim)] font-medium text-lg italic mb-12">Synchronizing your account profile...</p>
                 
                 <div className="w-full grid grid-cols-3 gap-6 pt-10 border-t border-[var(--border)]">
                  <div className="glass-pane rounded-[2rem] border border-[var(--border)] p-6">
                    <p className="text-[9px] uppercase tracking-[0.34em] font-black text-accent mb-2">Selection</p>
                    <p className="text-3xl font-black text-ink-gradient font-['Outfit']">{wishlistCount}</p>
                  </div>
                  <div className="glass-pane rounded-[2rem] border border-[var(--border)] p-6">
                    <p className="text-[9px] uppercase tracking-[0.34em] font-black text-accent mb-2">Acquisition</p>
                    <button onClick={guestLogin} className="w-full h-20 rounded-[2.5rem] glass-pane border border-[var(--border)] flex items-center justify-center gap-4 group hover:border-accent transition-all shadow-xl">
                      <User className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-black uppercase tracking-widest text-ink-gradient">Continue as Guest</span>
                      <div className="ml-auto mr-8 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </button>
                  </div>
                  <div className="glass-pane rounded-[2rem] border border-[var(--border)] p-6">
                    <p className="text-[9px] uppercase tracking-[0.34em] font-black text-accent mb-2">History</p>
                    <p className="text-3xl font-black text-ink-gradient font-['Outfit']">{orderStats.total}</p>
                  </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      </div>
      <Footer />
    </>
  );
}
