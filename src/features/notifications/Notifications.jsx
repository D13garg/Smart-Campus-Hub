import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, CalendarCheck, UtensilsCrossed, Bell, CheckCheck } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import Button from '@platform/components/ui/Button.jsx';
import { notifications as seed } from '@platform/data/campusData.js';
import usePersistedState from '@platform/hooks/usePersistedState.js';

const iconMap = {
  grade: { icon: GraduationCap, color: 'text-orbit-violetSoft', bg: 'bg-orbit-violet/12' },
  library: { icon: BookOpen, color: 'text-orbit-rose', bg: 'bg-orbit-rose/12' },
  attendance: { icon: CalendarCheck, color: 'text-orbit-teal', bg: 'bg-orbit-teal/12' },
  canteen: { icon: UtensilsCrossed, color: 'text-orbit-amber', bg: 'bg-orbit-amber/12' },
  system: { icon: Bell, color: 'text-haze-300', bg: 'bg-white/8' },
};

export default function Notifications() {
  // Persist only which ids have been read, layered onto the live mock data —
  // so a future change to the seed data (e.g. a new notification) still shows
  // up correctly instead of being masked by a stale stored copy of `items`.
  const [readIds, setReadIds] = usePersistedState('orbit_notifications_read_ids', []);
  const items = seed.map((n) => (readIds.includes(n.id) ? { ...n, unread: false } : n));
  const unreadCount = items.filter((n) => n.unread).length;

  const markAllRead = () => setReadIds(seed.map((n) => n.id));
  const markRead = (id) => setReadIds((ids) => (ids.includes(id) ? ids : [...ids, id]));

  return (
    <div>
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description={`${unreadCount} unread updates across your campus modules.`}
        action={
          unreadCount > 0 && (
            <Button variant="ghost" icon={CheckCheck} onClick={markAllRead}>
              Mark all read
            </Button>
          )
        }
      />

      <div className="space-y-3">
        <AnimatePresence>
          {items.map((n, i) => {
            const meta = iconMap[n.type];
            return (
              <motion.button
                key={n.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => markRead(n.id)}
                className="block w-full text-left"
              >
                <GlassCard
                  accent={n.unread ? 'teal' : 'none'}
                  className={`flex items-start gap-4 p-4 ${n.unread ? '' : 'opacity-60'}`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.bg}`}>
                    <meta.icon size={17} className={meta.color} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-haze-100">{n.title}</p>
                      <span className="shrink-0 text-[11px] text-haze-400">{n.time}</span>
                    </div>
                    <p className="mt-1 text-xs text-haze-400">{n.body}</p>
                  </div>
                  {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orbit-teal" />}
                </GlassCard>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}