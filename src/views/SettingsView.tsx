import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';

type ThemeMode = 'light' | 'dark' | 'system';

interface SettingsViewProps {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  currentUser: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onSaveToast: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  themeMode,
  setThemeMode,
  isDark,
  currentUser,
  onUpdateProfile,
  onSaveToast,
}) => {
  const [activeSection, setActiveSection] = useState<'Appearance' | 'Profile' | 'Notifications' | 'Security'>('Profile');

  // Local draft — only committed when user hits Save
  const [draftName, setDraftName] = useState(currentUser.name);
  const [draftEmail, setDraftEmail] = useState(currentUser.email);
  const [draftPhone, setDraftPhone] = useState(currentUser.phone);
  const [draftTitle, setDraftTitle] = useState(currentUser.title);
  const [draftImage, setDraftImage] = useState(currentUser.imageUrl);

  // Keep draft in sync if parent updates currentUser from outside
  useEffect(() => {
    setDraftName(currentUser.name);
    setDraftEmail(currentUser.email);
    setDraftPhone(currentUser.phone);
    setDraftTitle(currentUser.title);
    setDraftImage(currentUser.imageUrl);
  }, [currentUser]);

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emergencyPush, setEmergencyPush] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setDraftImage(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSection === 'Profile') {
      onUpdateProfile({
        name: draftName.trim() || currentUser.name,
        email: draftEmail.trim() || currentUser.email,
        phone: draftPhone.trim() || currentUser.phone,
        title: draftTitle.trim() || currentUser.title,
        imageUrl: draftImage,
      });
    } else {
      onSaveToast();
    }
  };

  const hasProfileChanges =
    draftName !== currentUser.name ||
    draftEmail !== currentUser.email ||
    draftPhone !== currentUser.phone ||
    draftTitle !== currentUser.title ||
    draftImage !== currentUser.imageUrl;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-[26px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
          System & Account Settings
        </h1>
        <p className="text-[14px] text-[#434655] dark:text-[#c3c6d7] mt-1">
          Manage your hospital preferences, user profile, and system theme appearance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation Tabs */}
        <div className="md:col-span-1 space-y-1">
          <div className="bg-white dark:bg-[#213145] p-3 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-1">
            {(['Appearance', 'Profile', 'Notifications', 'Security'] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all flex items-center gap-3 ${
                  activeSection === sec
                    ? 'bg-[#2563eb] text-white shadow-sm'
                    : 'text-[#434655] dark:text-[#c3c6d7] hover:bg-[#eff4ff] dark:hover:bg-[#0b1c30]/40'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {sec === 'Appearance' ? 'palette' : sec === 'Profile' ? 'person' : sec === 'Notifications' ? 'notifications' : 'security'}
                </span>
                <span>{sec}</span>
              </button>
            ))}
          </div>

          {/* Live preview card */}
          {activeSection === 'Profile' && (
            <div className="bg-white dark:bg-[#213145] p-4 rounded-3xl card-shadow border border-[#c3c6d7]/30 text-center mt-4">
              <p className="text-[11px] font-semibold text-[#737686] uppercase tracking-widest mb-3">Live Preview</p>
              <img
                src={draftImage}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#2563eb] mx-auto"
              />
              <p className="mt-2 text-[14px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] truncate">{draftName || '—'}</p>
              <p className="text-[12px] text-[#2563eb] truncate">{draftTitle || '—'}</p>
              <p className="text-[11px] text-[#737686] truncate mt-0.5">{draftEmail || '—'}</p>
              {hasProfileChanges && (
                <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[11px] font-medium">
                  Unsaved changes
                </span>
              )}
            </div>
          )}
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-3 bg-white dark:bg-[#213145] p-6 md:p-8 rounded-3xl card-shadow border border-[#c3c6d7]/30">
          <form onSubmit={handleSave} className="space-y-6">

            {/* ── Appearance ─────────────────────────────────────── */}
            {activeSection === 'Appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">Theme & Visual Appearance</h3>
                  <p className="text-[13px] text-[#434655] dark:text-[#c3c6d7] mt-0.5">
                    Choose how MediSync Pro looks. System mode automatically follows your OS preference.
                  </p>
                </div>

                {/* Active theme badge */}
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#eff4ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7]/30 w-fit">
                  <span className="material-symbols-outlined text-[18px] text-[#2563eb]">
                    {isDark ? 'dark_mode' : 'light_mode'}
                  </span>
                  <span className="text-[13px] font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                    Currently active:&nbsp;
                    <span className="text-[#2563eb]">{isDark ? 'Dark' : 'Light'} Mode</span>
                  </span>
                  {themeMode === 'system' && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-[#2563eb]/10 text-[#2563eb] text-[11px] font-semibold">
                      via System
                    </span>
                  )}
                </div>

                {/* Three theme cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  {/* Light */}
                  <button
                    type="button"
                    onClick={() => setThemeMode('light')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left ${
                      themeMode === 'light'
                        ? 'border-[#2563eb] bg-[#eff4ff] dark:bg-[#2563eb]/10'
                        : 'border-[#c3c6d7]/40 hover:border-[#2563eb]/40 bg-[#f8f9ff] dark:bg-[#0b1c30]/30'
                    }`}
                  >
                    {/* Mini preview */}
                    <div className="h-20 bg-white rounded-xl p-2.5 border border-[#e5e7eb] flex flex-col gap-1.5 mb-3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded bg-[#2563eb]" />
                        <div className="h-2 w-16 bg-[#e5eeff] rounded" />
                      </div>
                      <div className="h-2 w-full bg-[#f0f4ff] rounded" />
                      <div className="h-2 w-3/4 bg-[#f0f4ff] rounded" />
                      <div className="flex gap-1 mt-auto">
                        <div className="h-4 w-8 rounded bg-[#2563eb]/20" />
                        <div className="h-4 w-8 rounded bg-[#e5eeff]" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[14px] text-[#0b1c30] dark:text-[#f8f9ff]">Light</p>
                        <p className="text-[11px] text-[#737686] mt-0.5">Clean white canvas</p>
                      </div>
                      {themeMode === 'light' && (
                        <span className="material-symbols-outlined text-[#2563eb] text-[20px]">check_circle</span>
                      )}
                    </div>
                  </button>

                  {/* Dark */}
                  <button
                    type="button"
                    onClick={() => setThemeMode('dark')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left ${
                      themeMode === 'dark'
                        ? 'border-[#2563eb] bg-[#eff4ff] dark:bg-[#2563eb]/10'
                        : 'border-[#c3c6d7]/40 hover:border-[#2563eb]/40 bg-[#f8f9ff] dark:bg-[#0b1c30]/30'
                    }`}
                  >
                    {/* Mini preview */}
                    <div className="h-20 bg-[#0b1c30] rounded-xl p-2.5 border border-[#374151] flex flex-col gap-1.5 mb-3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded bg-[#2563eb]" />
                        <div className="h-2 w-16 bg-[#213145] rounded" />
                      </div>
                      <div className="h-2 w-full bg-[#1e3a5f] rounded" />
                      <div className="h-2 w-3/4 bg-[#1e3a5f] rounded" />
                      <div className="flex gap-1 mt-auto">
                        <div className="h-4 w-8 rounded bg-[#2563eb]/40" />
                        <div className="h-4 w-8 rounded bg-[#213145]" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[14px] text-[#0b1c30] dark:text-[#f8f9ff]">Dark</p>
                        <p className="text-[11px] text-[#737686] mt-0.5">Easy on the eyes</p>
                      </div>
                      {themeMode === 'dark' && (
                        <span className="material-symbols-outlined text-[#2563eb] text-[20px]">check_circle</span>
                      )}
                    </div>
                  </button>

                  {/* System */}
                  <button
                    type="button"
                    onClick={() => setThemeMode('system')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left ${
                      themeMode === 'system'
                        ? 'border-[#2563eb] bg-[#eff4ff] dark:bg-[#2563eb]/10'
                        : 'border-[#c3c6d7]/40 hover:border-[#2563eb]/40 bg-[#f8f9ff] dark:bg-[#0b1c30]/30'
                    }`}
                  >
                    {/* Mini preview — split light/dark */}
                    <div className="h-20 rounded-xl border border-[#c3c6d7]/40 mb-3 shadow-sm overflow-hidden flex">
                      <div className="w-1/2 bg-white p-2 flex flex-col gap-1.5">
                        <div className="w-3 h-3 rounded bg-[#2563eb]" />
                        <div className="h-1.5 w-full bg-[#e5eeff] rounded" />
                        <div className="h-1.5 w-2/3 bg-[#e5eeff] rounded" />
                      </div>
                      <div className="w-1/2 bg-[#0b1c30] p-2 flex flex-col gap-1.5">
                        <div className="w-3 h-3 rounded bg-[#3b82f6]" />
                        <div className="h-1.5 w-full bg-[#213145] rounded" />
                        <div className="h-1.5 w-2/3 bg-[#213145] rounded" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[14px] text-[#0b1c30] dark:text-[#f8f9ff]">System</p>
                        <p className="text-[11px] text-[#737686] mt-0.5">Follows your OS</p>
                      </div>
                      {themeMode === 'system' && (
                        <span className="material-symbols-outlined text-[#2563eb] text-[20px]">check_circle</span>
                      )}
                    </div>
                  </button>
                </div>

                {/* Info row */}
                <div className="p-4 bg-[#f0f5ff] dark:bg-[#0b1c30]/50 rounded-2xl border border-[#c3c6d7]/30 flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#2563eb] text-[20px] mt-0.5 shrink-0">info</span>
                  <div>
                    <p className="font-semibold text-[13px] text-[#0b1c30] dark:text-[#f8f9ff]">
                      {themeMode === 'system'
                        ? 'System mode is active — MediSync Pro will automatically switch themes when your OS setting changes.'
                        : themeMode === 'dark'
                        ? 'Dark mode is pinned — it stays dark regardless of your OS preference.'
                        : 'Light mode is pinned — it stays light regardless of your OS preference.'}
                    </p>
                    <p className="text-[12px] text-[#737686] mt-0.5">
                      Your preference is saved and persists across page reloads.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Profile ────────────────────────────────────────── */}
            {activeSection === 'Profile' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">Administrator Profile</h3>
                  <p className="text-[13px] text-[#434655] dark:text-[#c3c6d7] mt-0.5">
                    Changes save instantly across the header, sidebar, and entire app.
                  </p>
                </div>

                {/* Avatar upload */}
                <div className="flex items-center gap-5 p-4 bg-[#f8f9ff] dark:bg-[#0b1c30]/40 rounded-2xl border border-[#c3c6d7]/30">
                  <div className="relative shrink-0">
                    <img
                      src={draftImage}
                      alt="Profile avatar"
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#2563eb] shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-md hover:bg-[#1d4ed8] transition-colors"
                      title="Change photo"
                    >
                      <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      aria-label="Upload profile photo"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[15px] text-[#0b1c30] dark:text-[#f8f9ff]">{draftName}</p>
                    <p className="text-[13px] text-[#2563eb]">{draftTitle}</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-[12px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">upload</span>
                      Upload new photo
                    </button>
                    <p className="text-[11px] text-[#9ca3af] mt-0.5">JPG, PNG or GIF · max 5 MB</p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] dark:text-[#c3c6d7] mb-1.5 uppercase tracking-wide">
                    Display Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[18px]">person</span>
                    <input
                      type="text"
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all text-[14px]"
                    />
                  </div>
                </div>

                {/* Job title */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] dark:text-[#c3c6d7] mb-1.5 uppercase tracking-wide">
                    Job Title
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[18px]">badge</span>
                    <input
                      type="text"
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      placeholder="e.g. Chief Medical Officer"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all text-[14px]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] dark:text-[#c3c6d7] mb-1.5 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[18px]">mail</span>
                    <input
                      type="email"
                      value={draftEmail}
                      onChange={(e) => setDraftEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all text-[14px]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#374151] dark:text-[#c3c6d7] mb-1.5 uppercase tracking-wide">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[18px]">phone</span>
                    <input
                      type="tel"
                      value={draftPhone}
                      onChange={(e) => setDraftPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all text-[14px]"
                    />
                  </div>
                </div>

                {/* Change summary */}
                {hasProfileChanges && (
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-[13px]">
                    <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">edit_note</span>
                    <span>You have unsaved changes. Hit <strong>Save Changes</strong> to apply them everywhere.</span>
                  </div>
                )}
              </div>
            )}

            {/* ── Notifications ──────────────────────────────────── */}
            {activeSection === 'Notifications' && (
              <div className="space-y-4">
                <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">Alert & Notification Preferences</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Email Notifications for Appointments', desc: 'Receive automated email summaries for new patient bookings', val: emailNotifs, set: setEmailNotifs },
                    { label: 'Emergency SMS Alerts', desc: 'Immediate SMS notifications for high-priority emergency admissions', val: smsAlerts, set: setSmsAlerts },
                    { label: 'Browser Push Notifications', desc: 'Show real-time toast alerts when new lab reports are ready', val: emergencyPush, set: setEmergencyPush },
                  ].map(({ label, desc, val, set }) => (
                    <label key={label} className="flex items-center justify-between p-4 bg-[#eff4ff] dark:bg-[#0b1c30]/50 rounded-2xl border border-[#c3c6d7]/30 cursor-pointer">
                      <div>
                        <span className="font-bold text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] block">{label}</span>
                        <span className="text-[12px] text-[#434655] dark:text-[#c3c6d7]">{desc}</span>
                      </div>
                      <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)} className="w-5 h-5 text-[#2563eb] ml-4 shrink-0" />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ── Security ───────────────────────────────────────── */}
            {activeSection === 'Security' && (
              <div className="space-y-4">
                <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">Password & Access Security</h3>
                <div>
                  <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all text-[14px]" />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">New Password</label>
                  <input type="password" placeholder="Enter new strong password" className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all text-[14px]" />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#c3c6d7]/30 flex items-center justify-between">
              {activeSection === 'Profile' && hasProfileChanges && (
                <button
                  type="button"
                  onClick={() => {
                    setDraftName(currentUser.name);
                    setDraftEmail(currentUser.email);
                    setDraftPhone(currentUser.phone);
                    setDraftTitle(currentUser.title);
                    setDraftImage(currentUser.imageUrl);
                  }}
                  className="text-[13px] font-semibold text-[#737686] hover:text-[#0b1c30] dark:hover:text-[#f8f9ff] flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">undo</span>
                  Discard changes
                </button>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-[14px] rounded-xl shadow-sm transition-all flex items-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
