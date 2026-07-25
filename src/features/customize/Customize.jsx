import React from 'react';
import { Reorder, motion } from 'framer-motion';
import { GripVertical, LayoutGrid, X, Plus, RotateCcw } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import { Badge } from '@platform/components/ui/Badge.jsx';
import { widgetCatalog } from '@platform/data/campusData.js';
import { useDashboardLayout } from '@features/dashboard';

const SIZE_ORDER = ['sm', 'md', 'lg'];
const SIZE_LABEL = { sm: 'S', md: 'M', lg: 'L' };

// catalog lookup just for display name/module (registry has the render content)
const catalogById = Object.fromEntries(widgetCatalog.map((w) => [w.id, w]));

export default function Customize() {
  const { layout, reorder, addWidget, removeWidget, resizeWidget, resetLayout, availableWidgets } =
    useDashboardLayout();

  const cycleSize = (id, current) => {
    const next = SIZE_ORDER[(SIZE_ORDER.indexOf(current) + 1) % SIZE_ORDER.length];
    resizeWidget(id, next);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Personalize"
        title="Customize Your Dashboard"
        description="Drag to reorder, resize, or remove — your Orbit dashboard adapts instantly and remembers your layout."
        action={<Badge tone="violet">{layout.length} active widgets</Badge>}
      />

      <GlassCard hover={false} className="p-3">
        {layout.length === 0 ? (
          <p className="p-4 text-center text-xs text-haze-400">
            No widgets on your dashboard yet — add some below.
          </p>
        ) : (
          <Reorder.Group axis="y" values={layout} onReorder={reorder} className="space-y-2">
            {layout.map((entry) => {
              const meta = catalogById[entry.id];
              const label = meta?.name || entry.id;
              const module = meta?.module || '';
              return (
                <Reorder.Item
                  key={entry.id}
                  value={entry}
                  className="flex cursor-grab items-center justify-between rounded-xl2 border border-white/8 bg-white/[0.02] px-4 py-3.5 active:cursor-grabbing"
                  whileDrag={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.4)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical size={16} className="text-haze-400" />
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orbit-violet/12">
                      <LayoutGrid size={15} className="text-orbit-violetSoft" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-haze-100">{label}</p>
                      <p className="text-[11px] capitalize text-haze-400">{module}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Resize: cycles S -> M -> L -> S. Reordering already works via
                        drag; this reuses the same row rather than adding new UI chrome. */}
                    <button
                      onClick={() => cycleSize(entry.id, entry.size)}
                      title={`Size: ${entry.size.toUpperCase()} (click to change)`}
                      className="h-7 w-7 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-haze-300 transition-colors hover:bg-white/10 hover:text-haze-100"
                    >
                      {SIZE_LABEL[entry.size]}
                    </button>

                    <button
                      onClick={() => removeWidget(entry.id)}
                      title="Remove widget"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-haze-400 transition-colors hover:bg-orbit-rose/15 hover:text-orbit-rose"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        )}
      </GlassCard>

      {availableWidgets.length > 0 && (
        <GlassCard hover={false} className="mt-5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm font-semibold text-haze-100">Add a widget</p>
            <button
              onClick={resetLayout}
              className="flex items-center gap-1.5 text-[11px] text-haze-400 transition-colors hover:text-haze-100"
              title="Reset to default dashboard"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {availableWidgets.map((w) => (
              <button
                key={w.id}
                onClick={() => addWidget(w.id)}
                className="flex items-center justify-between rounded-xl2 border border-dashed border-white/12 bg-white/[0.02] px-4 py-3 text-left transition-colors hover:border-orbit-teal/30 hover:bg-orbit-teal/5"
              >
                <div>
                  <p className="text-sm font-medium text-haze-100">{w.name}</p>
                  <p className="text-[11px] capitalize text-haze-400">{w.module}</p>
                </div>
                <Plus size={16} className="text-orbit-teal" />
              </button>
            ))}
          </div>
        </GlassCard>
      )}

      <GlassCard accent="teal" hover={false} className="mt-5 p-5">
        <p className="mb-3 font-display text-sm font-semibold text-haze-100">Live Preview</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {layout.map((entry) => {
            const meta = catalogById[entry.id];
            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl2 border border-orbit-teal/20 bg-orbit-teal/5 p-4 text-center"
              >
                <LayoutGrid size={16} className="mx-auto mb-2 text-orbit-teal" />
                <p className="text-[11px] text-haze-100">{meta?.name || entry.id}</p>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
