import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, BadgeCheck, Save } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import Button from '@platform/components/ui/Button.jsx';
import { Badge } from '@platform/components/ui/Badge.jsx';
import { student } from '@platform/data/campusData.js';

export default function Profile() {
  const [form, setForm] = useState({ name: student.name, email: student.email, phone: student.phone });
  const [saved, setSaved] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div>
      <PageHeader eyebrow="Account" title="Profile & Settings" description="Manage how your identity appears across Orbit." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
        <GlassCard accent="violet" hover={false} className="flex flex-col items-center p-8 text-center">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orbit-violet to-orbit-teal font-display text-2xl font-bold text-white shadow-glow"
          >
            {student.avatarInitials}
          </motion.span>
          <p className="mt-4 font-display text-lg font-semibold text-haze-100">{student.name}</p>
          <p className="text-xs text-haze-400">{student.program}</p>
          <Badge tone="teal" className="mt-3"><BadgeCheck size={11} className="mr-1 inline" />Verified Student</Badge>

          <div className="mt-6 w-full space-y-3 text-left text-xs text-haze-300">
            <div className="flex items-center gap-2"><Mail size={13} className="text-haze-400" /> {student.email}</div>
            <div className="flex items-center gap-2"><Phone size={13} className="text-haze-400" /> {student.phone}</div>
            <div className="flex items-center gap-2"><MapPin size={13} className="text-haze-400" /> {student.hostel}</div>
          </div>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard hover={false} className="p-6">
            <p className="mb-5 font-display text-sm font-semibold text-haze-100">Personal Information</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" value={form.name} onChange={(v) => update('name', v)} />
              <Field label="Roll Number" value={student.rollNo} disabled />
              <Field label="Email" value={form.email} onChange={(v) => update('email', v)} />
              <Field label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
              <Field label="Program" value={student.program} disabled />
              <Field label="Advisor" value={student.advisor} disabled />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Button variant="primary" icon={Save} onClick={save}>Save Changes</Button>
              {saved && <span className="text-xs text-orbit-teal">Saved ✓</span>}
            </div>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <p className="mb-4 font-display text-sm font-semibold text-haze-100">Preferences</p>
            <div className="space-y-4">
              <ToggleRow label="Email notifications" defaultOn />
              <ToggleRow label="SMS alerts for attendance" />
              <ToggleRow label="Weekly grade digest" defaultOn />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, disabled }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-wide text-haze-400">{label}</span>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none focus:border-orbit-teal/50 ${
          disabled ? 'border-white/6 bg-white/[0.02] text-haze-400' : 'border-white/10 bg-white/[0.03] text-haze-100'
        }`}
      />
    </label>
  );
}

function ToggleRow({ label, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-haze-200">{label}</span>
      <button
        onClick={() => setOn((o) => !o)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-orbit-teal' : 'bg-white/10'}`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
          style={{ left: on ? 22 : 2 }}
        />
      </button>
    </div>
  );
}
