import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import WidgetFrame from '@platform/components/widgets/WidgetFrame.jsx';
import AnimatedCounter from '@platform/components/animations/AnimatedCounter.jsx';
import { Badge } from '@platform/components/ui/Badge.jsx';
import Button from '@platform/components/ui/Button.jsx';
import { overviewStats, student } from '@platform/data/campusData.js';
import { WIDGET_REGISTRY } from './widgetRegistry.jsx';
import { useDashboardLayout } from './useDashboardLayout.js';

// sm = default single column, md/lg widen the widget within the bento grid.
export const SIZE_CLASSES = {
  sm: '',
  md: 'md:col-span-2',
  lg: 'md:col-span-2 xl:col-span-4',
};

export default function Dashboard() {
  const { layout } = useDashboardLayout();

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title={`Good to see you, ${student.name.split(' ')[0]}.`}
        description="Here's everything happening across your campus today, pulled into one view."
        action={
          <div className="hidden gap-2 sm:flex">
            <Badge tone="teal">Live sync</Badge>
            <Badge tone="violet">{student.campus}</Badge>
          </div>
        }
      />

      {/* Stat strip */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {overviewStats.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <GlassCard accent={s.accent} className="p-5">
              <p className="text-xs text-haze-400">{s.label}</p>
              <p className="number-mono mt-2 font-display text-2xl font-semibold text-haze-100">
                <AnimatedCounter value={s.value} prefix={s.prefix || ''} suffix={s.suffix} />
              </p>
              <p
                className={`mt-1 text-[11px] ${
                  s.trendDir === 'up' ? 'text-orbit-teal' : s.trendDir === 'down' ? 'text-orbit-rose' : 'text-haze-400'
                }`}
              >
                {s.trend} {s.trendDir !== 'neutral' ? 'vs last week' : ''}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Bento grid — driven entirely by the saved layout (add/remove/resize/reorder
          from the Customize page all just edit this array in localStorage). */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {layout.map(({ id, size }, index) => {
          const widget = WIDGET_REGISTRY[id];
          if (!widget) return null; // stale id, e.g. removed from the catalog
          const { title, subtitle, accent, to, Content } = widget;
          return (
            <WidgetFrame
              key={id}
              title={title}
              subtitle={subtitle}
              accent={accent}
              to={to}
              index={index}
              className={SIZE_CLASSES[size] || ''}
            >
              <Content />
            </WidgetFrame>
          );
        })}
      </div>

      {layout.length === 0 && (
        <GlassCard hover={false} className="mt-5 flex flex-col items-center gap-2 p-8 text-center">
          <p className="text-sm font-medium text-haze-100">Your dashboard is empty</p>
          <p className="text-xs text-haze-400">Add some widgets back from the Customize page.</p>
        </GlassCard>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6"
      >
        <GlassCard accent="violet" hover={false} className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orbit-violet/15">
              <Sparkles size={18} className="text-orbit-violetSoft" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-haze-100">Want a different layout?</p>
              <p className="text-xs text-haze-400">Add, remove, resize or rearrange widgets from the Customize page.</p>
            </div>
          </div>
          <Button variant="ghost" icon={ArrowRight} onClick={() => (window.location.href = '/customize')}>
            Customize Dashboard
          </Button>
        </GlassCard>
      </motion.div>
    </div>
  );
}
