import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useCart, useOrders } from "../hooks/useFeatures";
import { formatINR } from "../utils/currency";

export function Cart() {
  const { cart, removeFromCart, updateQuantity, total, count } = useCart();
  const { orders } = useOrders();
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="page-wrapper bg-page min-h-screen pt-24 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pb-20 md:pb-40">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Cart Items */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-12">
               <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-accent" />
               </div>
               <h1 className="text-4xl font-black font-['Outfit'] text-white uppercase tracking-tighter">Your Collection</h1>
               <span className="px-4 py-1.5 rounded-full bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest border border-white/10">
                 {count} Items
               </span>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-pane p-4 sm:p-8 rounded-[2.5rem] border border-white/5 flex flex-col sm:flex-row items-center gap-4 sm:gap-10"
                  >
                    <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shrink-0">
                       <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                       <p className="text-accent text-[8px] font-black uppercase tracking-[0.4em] mb-1">{item.storeSlug}</p>
                       <h3 className="text-2xl font-black font-['Outfit'] text-white uppercase tracking-tighter mb-4">{item.name}</h3>
                       <div className="flex items-center justify-center sm:justify-start gap-6">
                          <div className="flex items-center bg-black/40 rounded-full border border-white/10 p-1">
                             <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/40"
                             >
                                <Minus className="w-4 h-4" />
                             </button>
                             <span className="w-10 text-center text-sm font-black text-white">{item.quantity}</span>
                             <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/40"
                             >
                                <Plus className="w-4 h-4" />
                             </button>
                          </div>
                          <span className="text-2xl font-black text-accent">{formatINR(item.price * item.quantity * 83)}</span>
                       </div>
                    </div>

                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-14 h-14 rounded-full bg-white/5 hover:bg-red-500/10 hover:text-red-500 border border-white/10 flex items-center justify-center transition-all group"
                    >
                        <Trash2 className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {cart.length === 0 && (
                <div className="py-20 text-center bg-white/5 rounded-[3rem] border border-white/5 border-dashed">
                   <p className="text-white/20 font-black uppercase tracking-[0.4em] mb-4">Your collection is empty</p>
                   <Link to="/shopping" className="text-accent hover:text-white transition-colors text-xs font-black uppercase tracking-widest">Start Exploring <ArrowRight className="inline w-4 h-4 ml-2" /></Link>
                </div>
              )}
            </div>
          </div>

          {/* Sumary */}
          <div className="lg:w-[450px]">
            <div className="sticky top-40 bg-white/5 rounded-[3.5rem] border border-white/10 p-10 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-[80px]" />
               
               <h2 className="text-2xl font-black font-['Outfit'] text-white uppercase tracking-tighter mb-10 pb-6 border-b border-white/10">Order Insights</h2>
               
               <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center text-white/40 text-xs font-black uppercase tracking-widest">
                     <span>Subtotal</span>
                     <span className="text-white">{formatINR(total * 83)}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/40 text-xs font-black uppercase tracking-widest">
                     <span>Shipping</span>
                     <span className="text-accent underline">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-white/40 text-xs font-black uppercase tracking-widest">
                     <span>Bespoke Tax</span>
                     <span className="text-white">{formatINR(total * 0.08 * 83)}</span>
                  </div>
               </div>

               <div className="flex justify-between items-center mb-10">
                  <span className="text-sm font-black text-white uppercase tracking-widest text-shadow-glow">Total Valuation</span>
                  <span className="text-4xl font-black text-white">{formatINR(total * 1.08 * 83)}</span>
               </div>

               {cart.length > 0 ? (
                <Link 
                  to="/checkout"
                  className="w-full btn-luxe flex items-center justify-center gap-3"
                >
                    Finalize Acquisition <ArrowRight className="w-5 h-5" />
                </Link>
               ) : (
                <button
                  type="button"
                  disabled
                  className="w-full btn-luxe flex items-center justify-center gap-3 opacity-50 cursor-not-allowed grayscale"
                >
                  Finalize Acquisition <ArrowRight className="w-5 h-5" />
                </button>
               )}

               <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[color:var(--text-dim)]">Orders & Updates</p>
                    <Link to="/profile#orders" className="text-[10px] font-black uppercase tracking-[0.16em] text-accent">
                      Open
                    </Link>
                  </div>
                  {recentOrders.length > 0 ? (
                    <div className="space-y-2">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                          <p className="text-[11px] font-black break-all">{order.id}</p>
                          <p className="text-[10px] text-[color:var(--text-dim)]">
                            {order.items.length} item(s) • {order.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[color:var(--text-dim)]">No orders yet. Place from cart to track updates.</p>
                  )}
               </div>

               <div className="mt-10 pt-10 border-t border-white/10 flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                  <Sparkles className="w-4 h-4" />
                  Secured by UB City Elite Systems
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

