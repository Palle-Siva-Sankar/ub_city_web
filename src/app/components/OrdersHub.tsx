import { motion, AnimatePresence } from "motion/react";
import { Package, X, Clock, MapPin, CheckCircle2, AlertCircle, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useOrders } from "../hooks/useFeatures";
import { formatINR } from "../utils/currency";
import { Link } from "react-router";

interface OrdersHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrdersHub({ isOpen, onClose }: OrdersHubProps) {
  const { orders } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "Processing": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "Shipped": return "text-purple-500 bg-purple-500/10 border-purple-500/20";
      case "Out for Delivery": return "text-accent bg-accent/10 border-accent/20";
      case "Delivered": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "Cancelled": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const activeOrders = orders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled");
  const pastOrders = orders.filter(o => o.status === "Delivered" || o.status === "Cancelled");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full md:max-w-xl h-full bg-page border-l border-[var(--border)] shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-8 border-b border-[var(--border)] flex items-center justify-between">
               <div>
                 <h2 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter">My Orders</h2>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mt-1">Personal Order History</p>
               </div>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:bg-accent hover:text-black transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content area with forced scrolling */}
             <div className="flex-1 overflow-y-auto p-6 md:p-8 min-h-0 custom-scrollbar overscroll-contain">
               {orders.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                   <Package className="w-20 h-20 mb-6 text-accent" />
                   <p className="text-xl font-black font-['Outfit'] uppercase tracking-tighter text-ink-gradient">No Orders Found</p>
                   <p className="text-xs font-bold uppercase tracking-widest mt-2 max-w-[200px]">You haven't placed any orders in this session yet.</p>
                 </div>
               ) : (
                 <div className="space-y-12 pb-20">
                  {/* Active Shipments */}
                  {activeOrders.length > 0 && (
                    <section>
                       <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6 flex items-center gap-2">
                         <Truck className="w-4 h-4" /> Active Orders
                       </h3>
                      <div className="space-y-4">
                        {activeOrders.map(order => (
                          <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Vault Archives (Past Orders) */}
                  {pastOrders.length > 0 && (
                    <section>
                       <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-6 flex items-center gap-2">
                         <CheckCircle2 className="w-4 h-4" /> Past Orders
                       </h3>
                      <div className="space-y-4">
                        {pastOrders.map(order => (
                          <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-[var(--border)] bg-page/50 backdrop-blur-xl">
               <Link 
                to="/shopping" 
                onClick={onClose}
                className="btn-luxe w-full"
               >
                 Discover New Sectors <ArrowRight className="w-5 h-5 ml-4" />
               </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OrderCard({ order, getStatusColor }: { order: any; getStatusColor: (status: string) => string }) {
  return (
    <div className="glass-pane active-card lighting-card p-6 rounded-[2.5rem] border border-[var(--border)] hover:border-accent/30 transition-all group">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[color:var(--text-dim)] mb-1">ID: {order.id}</p>
          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <p className="text-xl font-black font-['Outfit'] text-accent">{formatINR(order.total * 83)}</p>
      </div>

      <div className="space-y-3 mb-6">
        {order.items.map((item: any, i: number) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 overflow-hidden shrink-0">
               <img src={item.image} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" alt={item.name} />
            </div>
            <div className="min-w-0 flex-1">
               <p className="text-[10px] font-black text-ink-gradient uppercase truncate">{item.name}</p>
               <p className="text-[8px] font-bold text-accent uppercase tracking-widest">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {order.updates && order.updates.length > 0 && (
         <div className="border-t border-[var(--border)] pt-4 flex items-center gap-3">
            <Clock className="w-3 h-3 text-accent animate-pulse" />
            <p className="text-[9px] font-medium italic text-[color:var(--text-dim)] truncate">
              {order.updates[order.updates.length - 1].label}: {order.updates[order.updates.length - 1].note}
            </p>
         </div>
      )}
    </div>
  );
}
