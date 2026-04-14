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
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500 pt-24 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
          
          {/* Cart Items */}
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-16">
               <div className="w-16 h-16 rounded-3xl bg-accent/20 border border-accent/30 flex items-center justify-center shadow-gold">
                  <ShoppingBag className="w-8 h-8 text-accent" />
               </div>
               <div>
                  <h1 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-2">Collection</h1>
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">
                    {count} Curated Pieces
                  </span>
               </div>
            </div>

            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-pane active-card lighting-card p-4 md:p-8 rounded-[3rem] border border-[var(--border)] flex flex-col md:flex-row items-center gap-8 shadow-sm"
                  >
                    <Link to={`/shopping/${item.storeSlug}`} className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] overflow-hidden bg-accent/5 border border-accent/10 shrink-0 block hover:scale-105 transition-transform duration-500">
                       <img src={item.image} className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700" alt={item.name} />
                    </Link>
                    
                    <div className="flex-1 text-center md:text-left">
                       <Link to={`/shopping/${item.storeSlug}`} className="group/link block">
                         <p className="text-accent text-[8px] font-black uppercase tracking-[0.6em] mb-3">{item.storeSlug}</p>
                         <h3 className="text-2xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-6 leading-none group-hover/link:text-accent transition-colors">{item.name}</h3>
                       </Link>
                       
                       <div className="flex flex-wrap items-center justify-center md:justify-start gap-8">
                          <div className="flex items-center glass-pane border border-[var(--border)] rounded-full p-1.5 bg-page/40">
                             <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all font-black text-lg"
                             >
                                <Minus className="w-4 h-4" />
                             </button>
                             <span className="w-12 text-center text-xl font-black text-ink-gradient">{item.quantity}</span>
                             <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all font-black text-lg"
                             >
                                <Plus className="w-5 h-5" />
                             </button>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[9px] font-black tracking-widest text-accent uppercase mb-1">Valuation</span>
                             <span className="text-3xl font-black text-accent font-['Outfit'] tracking-tighter">{formatINR(item.price * item.quantity * 83)}</span>
                          </div>
                       </div>
                    </div>

                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-20 h-20 rounded-full glass-pane hover:bg-red-500/10 hover:text-red-500 border border-[var(--border)] flex items-center justify-center transition-all group shrink-0"
                    >
                        <Trash2 className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {cart.length === 0 && (
                <div className="py-32 text-center glass-pane rounded-[4rem] border border-[var(--border)] border-dashed border-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-8">Atmosphere Empty</p>
                   <Link to="/shopping" className="btn-luxe py-5 px-12 inline-flex">Explore Catalog <ArrowRight className="w-5 h-5 ml-4" /></Link>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-[480px]">
            <div className="sticky top-40 glass-pane lighting-card rounded-[4rem] border border-[var(--border)] p-12 md:p-16 overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-[100px]" />
               
               <h2 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-12 pb-8 border-b border-[var(--border)] leading-none text-center">Summary</h2>
               
               <div className="space-y-8 mb-12">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-[color:var(--text-dim)]">
                     <span>Base Acquisition</span>
                     <span className="text-ink-gradient font-black">{formatINR(total * 83)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-[color:var(--text-dim)]">
                     <span>Elite Logistics</span>
                     <span className="text-accent">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-[color:var(--text-dim)]">
                     <span>Executive Tax</span>
                     <span className="text-ink-gradient font-black">{formatINR(total * 0.08 * 83)}</span>
                  </div>
               </div>

               <div className="flex flex-col items-center mb-16 pt-10 border-t border-[var(--border)]">
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.6em] mb-4">Total Consideration</span>
                  <span className="text-5xl md:text-6xl font-black text-ink-gradient font-['Outfit'] tracking-tighter">{formatINR(total * 1.08 * 83)}</span>
               </div>

               {cart.length > 0 ? (
                <Link 
                  to="/checkout"
                  className="btn-luxe w-full py-6 flex items-center justify-center gap-4 text-sm"
                >
                    Finalize Acquisition <ArrowRight className="w-5 h-5" />
                </Link>
               ) : (
                <button
                  type="button"
                  disabled
                  className="btn-luxe w-full py-6 flex items-center justify-center gap-4 text-sm opacity-30 grayscale cursor-not-allowed"
                >
                  Finalize Acquisition
                </button>
               )}

               <div className="mt-12 rounded-[2.5rem] border border-[var(--border)] bg-page-bg-alt p-8">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Order Heritage</p>
                    <Link to="/profile#orders" className="text-[10px] font-black uppercase tracking-widest text-ink-gradient hover:text-accent transition-colors">
                      Archives
                    </Link>
                  </div>
                  {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="glass-pane rounded-2xl border border-[var(--border)] p-4 hover:border-accent transition-all">
                          <p className="text-[10px] font-black text-ink-gradient break-all mb-1">{order.id}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-[9px] font-black uppercase tracking-widest text-[color:var(--text-dim)]">
                               {order.items.length} Curated Pieces
                            </p>
                            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-widest">
                               {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[color:var(--text-dim)] italic font-medium">No previous records found.</p>
                  )}
               </div>

               <div className="mt-12 pt-10 border-t border-[var(--border)] text-center">
                  <div className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.6em] text-accent/40">
                    <Sparkles className="w-4 h-4 text-accent" />
                    UB City Elite Protocol
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

