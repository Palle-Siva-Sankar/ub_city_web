import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ShoppingBag, CreditCard, Box, CheckCircle2, ChevronRight, Lock, Sparkles, MapPin, Truck } from "lucide-react";
import { useCart, useOrders } from "../hooks/useFeatures";
import { useNavigate } from "react-router";
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

  const handlePlaceOrder = async () => {
    setStep(3);
    const id = placeOrder(cart, total * 1.08);
    setOrderId(id);
    clearCart();
  };

  if (cart.length === 0 && step !== 3) {
      navigate("/shopping");
      return null;
  }

  return (
    <div className="page-wrapper bg-page min-h-screen pt-28 md:pt-40 flex items-start justify-center px-4 sm:px-6">
      <div className="w-full max-w-4xl">
        
        {/* Step Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 md:mb-20 overflow-visible">
           {[
             { id: 1, label: "Logistics", icon: Truck },
             { id: 2, label: "Acquisition", icon: CreditCard },
             { id: 3, label: "Confirmation", icon: CheckCircle2 }
           ].map((s, i) => (
             <div key={s.id} className="flex items-center gap-2 sm:gap-4">
               <div className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 rounded-full transition-all duration-700 ${
                   step === s.id ? "bg-accent shadow-gold scale-105" : step > s.id ? "bg-white/20" : "bg-white/5 opacity-40"
               }`}>
                  <s.icon className={`w-4 h-4 ${step === s.id ? "text-black" : "text-white"}`} />
                  <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.12em] sm:tracking-widest ${step === s.id ? "text-black" : "text-white"}`}>{s.label}</span>
               </div>
               {i < 2 && <div className={`w-5 sm:w-8 h-0.5 rounded-full ${step > s.id ? "bg-accent" : "bg-white/10"}`} />}
             </div>
           ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
               key="step1" 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
               className="glass-pane p-5 sm:p-8 md:p-12 rounded-3xl md:rounded-[4rem] border border-white/10"
            >
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Outfit'] text-white uppercase tracking-tighter mb-8 md:mb-12 flex items-center gap-3 md:gap-4">
                  <MapPin className="text-accent" /> Destination Details
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Full Legal Name</label>
                     <input type="text" value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white focus:border-accent transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Contact Protocol (Phone)</label>
                     <input type="text" placeholder="+1 (____) ____" className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white focus:border-accent transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Delivery Coordinate (Address)</label>
                     <input type="text" value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white focus:border-accent transition-all" />
                  </div>
               </div>
               <button onClick={() => setStep(2)} className="w-full btn-luxe mt-12">Move to Payment <ChevronRight className="w-5 h-5" /></button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
               key="step2" 
               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
               className="flex flex-col md:flex-row gap-6 md:gap-12"
            >
               <div className="flex-1 glass-pane p-5 sm:p-8 md:p-12 rounded-3xl md:rounded-[4rem] border border-white/10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Outfit'] text-white uppercase tracking-tighter mb-8 md:mb-12 flex items-center gap-3 md:gap-4">
                     <CreditCard className="text-accent" /> Vault Assets
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
                    {(["card", "upi", "netbanking"] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`rounded-2xl py-3 text-[10px] font-black uppercase tracking-widest ${paymentMethod === method ? "bg-accent text-black" : "bg-white/5 border border-white/10 text-white/70"}`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-8">
                    {paymentMethod === "card" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Card Number</label>
                          <input type="text" value={payment.card} onChange={(e) => setPayment({ ...payment, card: e.target.value })} placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white focus:border-accent transition-all text-base sm:text-xl font-mono tracking-[0.2em] sm:tracking-widest" />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Expiry</label>
                            <input type="text" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM / YY" className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white focus:border-accent transition-all" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">CVV</label>
                            <input type="text" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} placeholder="XXX" className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white focus:border-accent transition-all" />
                          </div>
                        </div>
                      </>
                    )}
                    {paymentMethod === "upi" && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">UPI ID</label>
                        <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="name@bank" className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white focus:border-accent transition-all" />
                      </div>
                    )}
                    {paymentMethod === "netbanking" && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Online Banking Reference</label>
                        <input type="text" value={bankRef} onChange={(e) => setBankRef(e.target.value)} placeholder="Bank or account reference" className="w-full bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white focus:border-accent transition-all" />
                      </div>
                    )}
                  </div>
                  <div className="mt-12 flex items-center gap-4 text-white/20 text-[9px] font-black tracking-[0.3em] uppercase">
                     <Lock className="w-4 h-4" /> Military Grade Encryption Active
                  </div>
                  <button onClick={handlePlaceOrder} className="w-full btn-luxe mt-12 bg-white text-black">Authorize Acquisition</button>
               </div>
               
               <div className="w-full md:w-80 bg-white/5 rounded-3xl md:rounded-[3rem] p-5 sm:p-8 md:p-10 border border-white/5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white/60 mb-6 border-b border-white/10 pb-4">Manifest</h3>
                    <div className="space-y-4">
                       {cart.map(item => (
                         <div key={item.id} className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-white/40 truncate w-32">{item.name}</span>
                            <span className="text-accent">{formatINR(item.price * 83)}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                  <div className="mt-10 pt-10 border-t border-white/10">
                     <div className="flex justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Valuation</span>
                        <span className="text-2xl font-black text-white">{formatINR(total * 1.08 * 83)}</span>
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
               <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-accent/20">
                  <Sparkles className="w-16 h-16 text-accent animate-pulse" />
               </div>
               <p className="text-accent text-xs font-black uppercase tracking-[0.5em] mb-4">Acquisition Successful</p>
               <h2 className="text-5xl md:text-7xl font-black font-['Outfit'] text-white uppercase tracking-tighter mb-10 leading-none">
                  Collection <br /> <span className="text-gradient">Secured.</span>
               </h2>
               <div className="glass-pane p-8 rounded-[2.5rem] bg-white/5 border-white/10 max-w-sm mx-auto mb-16">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">Order Authentication ID</p>
                  <p className="text-xl font-black text-white font-mono tracking-widest">{orderId}</p>
               </div>
               <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button onClick={() => navigate("/profile#orders")} className="btn-luxe px-16">Track Progress</button>
                  <button onClick={() => navigate("/shopping")} className="px-12 py-5 border-2 border-white/10 rounded-full text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">Continue Discovery</button>
               </div>
               <div className="max-w-md mx-auto mt-8">
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mb-2">Cancel Order Reason</p>
                  <select value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-white">
                    <option>Changed my mind</option>
                    <option>Found better price</option>
                    <option>Delivery is too late</option>
                    <option>Ordered by mistake</option>
                    <option>Payment issue</option>
                  </select>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
