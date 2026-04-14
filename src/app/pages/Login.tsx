import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Mail, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { useNavigate } from "react-router";
import { useCart, useOrders, useUserSession, useWishlist } from "../hooks/useFeatures";
import { Footer } from "../components/Footer";
import { VIDEOS } from "../data/mediaAssets";

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
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-page">
      {/* ─── Cinematic Background ─── */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 dark:opacity-40">
          <source src={VIDEOS.fashion} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-page/40 via-page/80 to-page" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-[color:var(--text-main)] opacity-60 hover:opacity-100 transition-opacity uppercase mb-12">
          <ArrowLeft className="w-4 h-4" /> Return to Website
        </Link>

        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-pane rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Progress Bar Header */}
          {step !== "success" && (
            <div className="flex gap-4 mb-10 w-full justify-center text-xs font-bold uppercase tracking-widest text-[color:var(--text-main)] opacity-60">
              <span className={step === "input" ? "text-accent opacity-100" : ""}>Identification</span>
              <span>—</span>
              <span className={step === "otp" ? "text-accent opacity-100" : ""}>Verification</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ════════════ INPUT STEP ════════════ */}
            {step === "input" && (
              <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                
                {/* Sign In vs Create Account Toggle */}
                <div className="bg-page-alt p-1 rounded-full flex mb-10 border border-[var(--glass-border)]">
                  <button onClick={() => { setAuthMode("signin"); setErrorMsg(""); }} className={`flex-1 py-3 text-sm font-bold rounded-full transition-all ${authMode === "signin" ? "bg-accent text-[var(--btn-text-on-accent)] shadow-md" : "text-[color:var(--text-main)] opacity-70 hover:opacity-100"}`}>
                    Sign In
                  </button>
                  <button onClick={() => { setAuthMode("create"); setErrorMsg(""); }} className={`flex-1 py-3 text-sm font-bold rounded-full transition-all ${authMode === "create" ? "bg-accent text-[var(--btn-text-on-accent)] shadow-md" : "text-[color:var(--text-main)] opacity-70 hover:opacity-100"}`}>
                    Create Account
                  </button>
                </div>

                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold font-['Outfit'] text-[color:var(--text-main)] mb-2">
                    {authMode === "signin" ? "Welcome Back" : "Register a Portfolio"}
                  </h1>
                  <p className="text-[color:var(--text-dim)] text-sm font-light">
                    {authMode === "signin" 
                      ? "Sign in securely with your email to access your account." 
                      : "Create your account with email verification."}
                  </p>
                </div>

                {/* Email vs Phone Tabs */}
                <div className="flex gap-6 justify-center mb-8 border-b border-[var(--border)] pb-4">
                  <button onClick={() => { setAuthMethod("phone"); setErrorMsg(""); }} className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${authMethod === "phone" ? "text-accent border-b-2 border-accent" : "text-[color:var(--text-main)] opacity-60 hover:opacity-100"}`}>
                    <Phone className="w-4 h-4" /> Phone
                  </button>
                  <button onClick={() => { setAuthMethod("email"); setErrorMsg(""); }} className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${authMethod === "email" ? "text-accent border-b-2 border-accent" : "text-[color:var(--text-main)] opacity-60 hover:opacity-100"}`}>
                    <Mail className="w-4 h-4" /> Email
                  </button>
                </div>

                <form onSubmit={handleInputSubmit} className="flex flex-col gap-6">
                  {errorMsg && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-start gap-3 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p>{errorMsg}</p>
                    </motion.div>
                  )}

                  {authMode === "create" && (
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter Username"
                      className="w-full bg-page-alt border border-[var(--glass-border)] text-[color:var(--text-main)] rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors font-mono"
                    />
                  )}
                  {authMethod === "phone" ? (
                    <div className="flex gap-2 w-full max-w-[520px] mx-auto items-center justify-center">
                       {/* Real International Prefix Dropdown */}
                       <div className="relative">
                         <select 
                           value={country} 
                           onChange={(e) => setCountry(e.target.value as CountryCode)} 
                           className="login-auth-select h-full bg-page-alt border border-[var(--glass-border)] text-[color:var(--text-main)] rounded-xl px-4 py-4 focus:outline-none focus:border-accent appearance-none cursor-pointer pr-10 font-bold"
                         >
                           {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.dial})</option>)}
                         </select>
                         <div className="absolute top-[50%] right-3 -translate-y-1/2 pointer-events-none text-[color:var(--text-main)] opacity-60">▾</div>
                       </div>
                       
                       <input 
                         type="tel" 
                         value={phoneRaw}
                         onChange={(e) => setPhoneRaw(e.target.value)}
                         placeholder="Enter Mobile Number"
                         className="flex-1 bg-page-alt border border-[var(--glass-border)] text-[color:var(--text-main)] rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors font-mono"
                       />
                    </div>
                  ) : (
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email Address"
                      className="w-full bg-page-alt border border-[var(--glass-border)] text-[color:var(--text-main)] rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors font-mono"
                    />
                  )}

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full bg-page-alt border border-[var(--glass-border)] text-[color:var(--text-main)] rounded-xl px-4 py-4 focus:outline-none focus:border-accent transition-colors font-mono"
                  />

                  <button type="submit" disabled={isLoading} className="w-full bg-page text-[color:var(--text-main)] border border-[var(--border)] hover:bg-accent hover:border-accent hover:text-[var(--btn-text-on-accent)] font-bold uppercase tracking-widest text-sm py-5 rounded-xl transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50">
                    {isLoading ? <span className="w-5 h-5 border-2 border-[var(--page-bg)] border-t-transparent rounded-full animate-spin" /> : <>{authMethod === "email" ? "Continue With Email" : "Access Secure Gateway"} <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ════════════ OTP VERIFICATION STEP ════════════ */}
            {step === "otp" && (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-bold font-['Outfit'] text-[color:var(--text-main)] mb-4 tracking-widest px-8">SECURITY <br/>CHECK</h1>
                  <p className="text-[color:var(--text-dim)] text-sm font-light max-w-xs mx-auto">
                    A secure 6-digit authentication token has been dispatched to <br/>
                    <strong className="text-[color:var(--text-main)] mt-2 block font-mono">{authMethod === "phone" ? getDisplayPhone() : email}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerify} className="flex flex-col gap-8">
                  {authMethod === "email" ? (
                    <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-center">
                      <p className="text-[10px] uppercase tracking-[0.16em] font-black text-accent mb-1">Demo OTP</p>
                      <p className="text-lg font-black tracking-[0.2em] text-[color:var(--text-main)] font-mono">{generatedOtp || "------"}</p>
                      <p className="text-[11px] text-[color:var(--text-dim)] mt-1">Email gateway not connected yet. Use this OTP for now.</p>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-center">
                      <p className="text-[10px] uppercase tracking-[0.16em] font-black text-emerald-300 mb-1">Mobile OTP Sent</p>
                      <p className="text-[11px] text-[color:var(--text-dim)] mt-1">We sent an OTP to {getDisplayPhone()}.</p>
                    </div>
                  )}
                  {errorMsg && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 text-red-500 p-3 rounded-lg text-center text-sm border border-red-500/20">
                      {errorMsg}
                    </motion.div>
                  )}

                  <div className="flex justify-between gap-2 max-w-[340px] mx-auto">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className={`w-12 h-14 bg-page-alt border-2 ${digit ? 'border-accent text-accent' : 'border-[var(--glass-border)] text-[color:var(--text-main)]'} rounded-xl text-center text-xl font-bold font-mono focus:border-accent focus:outline-none transition-all shadow-inner`}
                      />
                    ))}
                  </div>

                  <div className="text-center space-y-4 pt-4">
                    <button type="submit" disabled={isLoading || otp.join("").length < 6} className="w-full bg-accent text-[var(--btn-text-on-accent)] border border-accent hover:brightness-110 font-bold uppercase tracking-widest text-sm py-5 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 shadow-[0_0_20px_rgba(200,169,81,0.3)]">
                      {isLoading ? <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : "Verify Identity"}
                    </button>
                    
                    <div className="flex flex-col gap-2 pt-2 text-xs font-bold tracking-widest uppercase">
                      {countdown > 0 ? (
                        <span className="text-[color:var(--text-main)] opacity-60">Resend Token in {countdown}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={async () => {
                            setErrorMsg("");
                            if (authMethod === "phone") {
                              try {
                                const e164Phone = getE164Phone();
                                const response = await fetch("/api/auth/send-otp", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ phone: e164Phone }),
                                });
                                const data = await response.json();
                                if (!response.ok) throw new Error(data?.error || "Failed to resend OTP.");
                                await trackActivity("OTP_RESENT_PHONE", { destination: e164Phone });
                              } catch (error) {
                                setErrorMsg(error instanceof Error ? error.message : "Failed to resend OTP.");
                                return;
                              }
                            } else {
                              setGeneratedOtp(generateOtpCode());
                              await trackActivity("OTP_RESENT_EMAIL_DEMO", { destination: email.trim() });
                            }
                            setCountdown(60);
                            setOtp(["", "", "", "", "", ""]);
                          }}
                          className="text-accent hover:underline"
                        >
                          Resend Token Now
                        </button>
                      )}
                      <button type="button" onClick={() => setStep("input")} className="text-[color:var(--text-main)] opacity-60 hover:opacity-100 mt-4">
                        Change Destination Address
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ════════════ SUCCESS STEP ════════════ */}
            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-10">
                 <CheckCircle2 className="w-24 h-24 text-green-500 mb-8" />
                 <h2 className="text-4xl font-['Outfit'] font-bold text-[color:var(--text-main)] mb-4">Verification<br/>Successful</h2>
                 <p className="text-[color:var(--text-dim)] font-light mb-5">Redirecting you to your account...</p>
                 <div className="w-full grid grid-cols-3 gap-2 mt-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-dim)]">Wishlist</p>
                    <p className="text-lg font-black">{wishlistCount}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-dim)]">Cart</p>
                    <p className="text-lg font-black">{cartCount}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-dim)]">Orders</p>
                    <p className="text-lg font-black">{orderStats.total}</p>
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
