import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ShoppingBag, CreditCard, Box, CheckCircle2, ChevronRight, Lock, Sparkles, MapPin, Truck, ArrowLeft } from "lucide-react";
import { useCart, useOrders } from "../hooks/useFeatures";
import { useNavigate, Link } from "react-router";
import { formatINR } from "../utils/currency";

export function Checkout() {
  const [step, setStep] = useState(1);
  const { cart, total, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);

  const [shipping, setShipping] = useState({ name: "", address: "", city: "", zip: "" });
  const [payment, setPayment] = useState({ card: "", expiry: "", cvv: "" });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [upiId, setUpiId] = useState("");
  const [bankRef, setBankRef] = useState("");
  const [cancelReason, setCancelReason] = useState("Changed my mind");

  const [isCancelled, setIsCancelled] = useState(false);

  const handlePlaceOrder = async () => {
    setStep(3);
    const id = placeOrder(cart, total * 1.08);
    setOrderId(id);
    clearCart();
  };

  const handleCancelOrder = () => {
    setIsCancelled(true);
    setStep(4);
  };

  if (cart.length === 0 && step !== 3 && step !== 4) {
      navigate("/shopping");
      return null;
  }

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500 pt-32 md:pt-48 flex items-start justify-center px-6">
      <div className="w-full max-w-5xl">
        <div className="flex justify-center mb-16">
            <Link to="/cart" className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Return to Cart
            </Link>
        </div>
        
        {/* Step Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16 md:mb-32">
           {[
             { id: 1, label: "Logistics", icon: Truck },
             { id: 2, label: "Acquisition", icon: CreditCard },
             { id: 3, label: "Confirmation", icon: CheckCircle2 }
           ].map((s, i) => (
             <div key={s.id} className="flex items-center gap-4 md:gap-8">
               <div className={`flex items-center gap-4 px-8 py-4 rounded-full transition-all duration-700 ${
                   step === s.id ? "bg-accent shadow-gold scale-110" : step > s.id && step < 4 ? "bg-accent/20 border border-accent/20" : "glass-pane border border-[var(--border)] opacity-30"
               }`}>
                  <s.icon className={`w-5 h-5 ${step === s.id ? "text-black" : "text-accent"}`} />
                  <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${step === s.id ? "text-black" : "text-accent"}`}>{s.label}</span>
               </div>
               {i < 2 && <div className={`w-8 md:w-16 h-[2px] rounded-full ${step > s.id ? "bg-accent" : "bg-[var(--border)]"}`} />}
             </div>
           ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
               key="step1" 
               initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
               className="glass-pane lighting-card p-10 md:p-20 rounded-[4rem] border border-[var(--border)] shadow-2xl"
            >
               <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-16 flex items-center gap-6 leading-none">
                  <MapPin className="text-accent w-10 h-10 md:w-14 md:h-14" /> Logistics <span className="text-gradient">Protocol.</span>
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">Full Legal Name</label>
                     <input type="text" value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})} className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient font-bold focus:border-accent outline-none transition-all text-lg placeholder:opacity-30" placeholder="e.g. Victor Rose" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">Contact Protocol</label>
                     <input type="text" placeholder="+91 XXXX XXX XXX" className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient font-bold focus:border-accent outline-none transition-all text-lg placeholder:opacity-30" />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">Delivery Coordinate (Address)</label>
                     <input type="text" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient font-bold focus:border-accent outline-none transition-all text-lg placeholder:opacity-30" placeholder="e.g. 7th Heaven, Elite District" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">City</label>
                     <input type="text" value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient font-bold focus:border-accent outline-none transition-all text-lg placeholder:opacity-30" placeholder="Bengaluru" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">Zip Code</label>
                     <input type="text" value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient font-bold focus:border-accent outline-none transition-all text-lg placeholder:opacity-30" placeholder="560001" />
                  </div>
               </div>
               <button onClick={() => setStep(2)} className="btn-luxe w-full mt-20 py-8">Continue to Acquisition <ChevronRight className="w-6 h-6 ml-4" /></button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
               key="step2" 
               initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}
               className="flex flex-col lg:flex-row gap-12"
            >
               <div className="flex-1 glass-pane lighting-card p-10 md:p-20 rounded-[4rem] border border-[var(--border)] shadow-2xl">
                  <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-16 flex items-center gap-6 leading-none">
                     <CreditCard className="text-accent w-10 h-10 md:w-14 md:h-14" /> Vault <span className="text-gradient">Access.</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
                    {(["card", "upi", "netbanking"] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`rounded-2xl py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${paymentMethod === method ? "bg-accent text-black shadow-gold" : "glass-pane border border-[var(--border)] text-[color:var(--text-dim)]"}`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-10">
                    {paymentMethod === "card" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">Card Number</label>
                          <input type="text" value={payment.card} onChange={(e) => setPayment({ ...payment, card: e.target.value })} placeholder="XXXX XXXX XXXX XXXX" className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient focus:border-accent outline-none transition-all text-2xl font-black font-['Outfit'] tracking-[0.2em] placeholder:opacity-20" />
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">Expiry</label>
                            <input type="text" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM / YY" className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient font-bold focus:border-accent outline-none" />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">CVV</label>
                            <input type="text" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} placeholder="XXX" className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient font-bold focus:border-accent outline-none" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {paymentMethod === "upi" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">UPI ID</label>
                        <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="name@bank" className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient font-bold focus:border-accent outline-none placeholder:opacity-20" />
                      </motion.div>
                    )}
                    {paymentMethod === "netbanking" && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-accent ml-8">Banking Authority</label>
                        <input type="text" value={bankRef} onChange={(e) => setBankRef(e.target.value)} placeholder="e.g. HDFC, ICICI, etc." className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-ink-gradient font-bold focus:border-accent outline-none placeholder:opacity-20" />
                      </motion.div>
                    )}
                  </div>
                  <div className="mt-16 flex items-center gap-6 text-[10px] font-black tracking-[0.5em] text-accent/40 uppercase">
                     <Lock className="w-5 h-5" /> Secured by Elite Systems
                  </div>
                  <button onClick={handlePlaceOrder} className="btn-luxe w-full mt-16 py-8">Authorize Acquisition</button>
               </div>
               
               <div className="w-full lg:w-96 glass-pane lighting-card rounded-[4rem] border border-[var(--border)] p-12 flex flex-col shadow-xl">
                  <div className="mb-12">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-10 pb-6 border-b border-[var(--border)] text-center">Manifest</h3>
                    <div className="space-y-6">
                       {cart.map(item => (
                         <div key={item.id} className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                            <span className="text-[color:var(--text-dim)] truncate w-32">{item.name}</span>
                            <span className="text-ink-gradient">{formatINR(item.price * 83)}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                  <div className="mt-auto pt-10 border-t border-[var(--border)] space-y-6">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-[color:var(--text-dim)]">
                        <span>Surcharge</span>
                        <span className="text-ink-gradient">{formatINR(total * 0.08 * 83)}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-accent">Total</span>
                        <span className="text-3xl font-black text-accent font-['Outfit'] tracking-tighter">{formatINR(total * 1.08 * 83)}</span>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
               key="step3" 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
               className="text-center py-20"
            >
               <div className="w-40 h-40 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-16 border border-accent/20 shadow-gold">
                  <CheckCircle2 className="w-20 h-20 text-accent" />
               </div>
               <p className="text-accent text-xs font-black uppercase tracking-[0.6em] mb-6">Acquisition Successful</p>
               <h2 className="text-5xl md:text-[8rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-16 leading-none">
                  Collection <br /> <span className="text-gradient">Secured.</span>
               </h2>
               <div className="glass-pane lighting-card p-12 rounded-[4rem] border border-[var(--border)] max-w-xl mx-auto mb-20 shadow-2xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4 leading-none">Order Authentication ID</p>
                  <p className="text-4xl font-black text-ink-gradient font-['Outfit'] tracking-tighter uppercase leading-none">{orderId}</p>
               </div>
               <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <button onClick={() => navigate("/profile")} className="btn-luxe px-20 py-6">Track Progress</button>
                  <button onClick={() => navigate("/shopping")} className="text-[10px] font-black uppercase tracking-[0.6em] text-ink-gradient hover:text-accent transition-all flex items-center gap-4">
                     Continue Discovery <ChevronRight className="w-5 h-5" />
                  </button>
               </div>
               <div className="max-w-md mx-auto mt-24 pt-16 border-t border-[var(--border)]">
                  <p className="text-[10px] text-accent/40 uppercase tracking-[0.4em] mb-6 leading-none">Order Cancellation Request</p>
                  <div className="flex flex-col gap-6">
                    <select value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} className="w-full glass-pane border border-[var(--border)] rounded-[2.5rem] px-10 py-6 text-xs font-black uppercase tracking-[0.2em] text-ink-gradient outline-none appearance-none">
                      <option>Changed my mind</option>
                      <option>Found better price</option>
                      <option>Delivery is too late</option>
                      <option>Ordered by mistake</option>
                      <option>Payment issue</option>
                    </select>
                    <button onClick={handleCancelOrder} className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 hover:text-red-400 transition-colors">Terminate Order Transaction</button>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
               key="step4" 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
               className="text-center py-20"
            >
               <div className="w-40 h-40 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-16 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <Box className="w-20 h-20 text-red-500" />
               </div>
               <p className="text-red-500 text-xs font-black uppercase tracking-[0.6em] mb-6">Transaction Terminated</p>
               <h2 className="text-5xl md:text-[8rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-16 leading-none">
                  Order <br /> <span className="text-red-500">Cancelled.</span>
               </h2>
               <div className="glass-pane p-12 rounded-[4rem] border border-[var(--border)] max-w-xl mx-auto mb-20 shadow-2xl">
                  <p className="text-xl text-[color:var(--text-dim)] font-medium italic mb-4">"Refund Process Started"</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Your capital will be returned to the original node within 3-5 operational days.</p>
               </div>
               <button onClick={() => navigate("/shopping")} className="btn-luxe px-20 py-6">Return to Marketplace</button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
