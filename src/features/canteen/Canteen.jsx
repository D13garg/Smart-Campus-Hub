import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingBag, Flame, Wallet } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import Button from '@platform/components/ui/Button.jsx';
import { Badge } from '@platform/components/ui/Badge.jsx';
import { canteenMenu, canteenOrders } from '@platform/data/campusData.js';
import usePersistedState from '@platform/hooks/usePersistedState.js';

const categories = ['All', ...new Set(canteenMenu.map((m) => m.category))];

export default function Canteen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = usePersistedState('orbit_canteen_cart', {});
  const [placed, setPlaced] = useState(false);

  const items = useMemo(
    () => (activeCategory === 'All' ? canteenMenu : canteenMenu.filter((m) => m.category === activeCategory)),
    [activeCategory]
  );

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = canteenMenu.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const placeOrder = () => {
    setPlaced(true);
    setTimeout(() => {
      setPlaced(false);
      setCart({});
    }, 2200);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Canteen"
        title="Order & Track"
        description="Browse the campus menu and place an order — tracked live from kitchen to counter."
        action={
          <GlassCard hover={false} className="flex items-center gap-2 px-4 py-2.5">
            <Wallet size={14} className="text-orbit-amber" />
            <span className="number-mono text-sm text-haze-100">₹420</span>
          </GlassCard>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  activeCategory === c ? 'bg-orbit-amber text-[#0B0C14]' : 'glass text-haze-300 hover:text-haze-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard accent="amber" className="flex h-full flex-col p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <span className="text-3xl">{item.emoji}</span>
                    {item.popular && <Badge tone="amber"><Flame size={10} className="mr-1 inline" />Popular</Badge>}
                  </div>
                  <p className="font-display text-sm font-semibold text-haze-100">{item.name}</p>
                  <p className="mt-1 number-mono text-sm text-haze-400">₹{item.price}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {cart[item.id] ? (
                      <div className="flex items-center gap-3">
                        <button onClick={() => remove(item.id)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-haze-100">
                          <Minus size={12} />
                        </button>
                        <span className="number-mono w-4 text-center text-sm text-haze-100">{cart[item.id]}</span>
                        <button onClick={() => add(item.id)} className="flex h-7 w-7 items-center justify-center rounded-full bg-orbit-amber text-[#0B0C14]">
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <Button variant="subtle" className="!px-3 !py-1.5 text-xs" onClick={() => add(item.id)} icon={Plus}>
                        Add
                      </Button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-4 font-display text-sm font-semibold text-haze-100">Order History</p>
            <div className="space-y-3">
              {canteenOrders.map((o) => (
                <GlassCard key={o.id} hover={false} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-haze-100">{o.items.join(', ')}</p>
                    <p className="text-xs text-haze-400">{o.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="number-mono text-sm text-haze-100">₹{o.total}</span>
                    <Badge tone={o.status === 'Delivered' ? 'teal' : 'amber'}>{o.status}</Badge>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Cart sidebar */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <GlassCard accent="amber" hover={false} className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <ShoppingBag size={16} className="text-orbit-amber" />
              <p className="font-display text-sm font-semibold text-haze-100">Your Cart ({cartCount})</p>
            </div>

            {cartCount === 0 ? (
              <p className="py-8 text-center text-xs text-haze-400">Your cart is empty. Add something tasty!</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = canteenMenu.find((m) => m.id === id);
                  return (
                    <div key={id} className="flex items-center justify-between text-xs">
                      <span className="text-haze-200">{item.name} × {qty}</span>
                      <span className="number-mono text-haze-100">₹{item.price * qty}</span>
                    </div>
                  );
                })}
                <div className="border-t border-white/8 pt-3 flex items-center justify-between text-sm font-semibold">
                  <span className="text-haze-100">Total</span>
                  <span className="number-mono text-orbit-amber">₹{total}</span>
                </div>
                <Button variant="teal" className="mt-2 w-full" onClick={placeOrder}>
                  Place Order
                </Button>
              </div>
            )}
          </GlassCard>

          <AnimatePresence>
            {placed && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 rounded-xl2 border border-orbit-teal/30 bg-orbit-teal/10 p-4 text-center text-sm text-orbit-teal"
              >
                Order placed! Heading to the kitchen 🍳
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}