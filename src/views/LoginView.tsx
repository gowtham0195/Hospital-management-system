import React, { useState } from 'react';

interface LoginViewProps {
  onLoginSuccess: (email: string) => void;
  onRegisterClick?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onRegisterClick }) => {
  const [activeMode, setActiveMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Doctor');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string; general?: string }>({});
  const [forgotSent, setForgotSent] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (activeMode === 'register' && !fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);

    if (activeMode === 'register') {
      if (onRegisterClick) onRegisterClick();
      else onLoginSuccess(email);
      return;
    }

    if (email === 'doctor@medisync.com' && password === 'password') {
      onLoginSuccess(email);
    } else {
      setErrors({ general: 'Invalid credentials. Use doctor@medisync.com / password' });
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrors({ email: 'Enter your email above to reset your password.' });
      return;
    }
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 4000);
  };

  const switchMode = (mode: 'login' | 'register') => {
    setActiveMode(mode);
    setErrors({});
    setForgotSent(false);
  };

  return (
    <div className="flex w-full min-h-screen font-['Inter',sans-serif] bg-[#f0f4ff]">

      {/* ─── Left Branding Panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0a1f6e 0%, #1a3aa8 35%, #2563eb 65%, #3b82f6 100%)' }}>

        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }} />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12 justify-between">

          {/* Top: Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <span className="material-symbols-outlined icon-fill text-white text-[24px]">local_hospital</span>
            </div>
            <div>
              <span className="text-[20px] font-bold text-white tracking-tight block">MediSync Pro</span>
              <span className="text-[11px] text-blue-200 font-medium tracking-widest uppercase">Healthcare Platform</span>
            </div>
          </div>

          {/* Middle: Illustration card */}
          <div className="flex flex-col items-center text-center">
            {/* Floating stat cards above image */}
            <div className="flex gap-4 mb-8 w-full justify-center">
              {[
                { icon: 'groups', value: '12,400+', label: 'Patients Served', color: 'bg-blue-400/20' },
                { icon: 'event_available', value: '98.5%', label: 'Uptime', color: 'bg-purple-400/20' },
              ].map(({ icon, value, label, color }) => (
                <div key={label}
                  className={`${color} backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3.5 text-center`}>
                  <span className={`material-symbols-outlined icon-fill text-white text-[20px]`}>{icon}</span>
                  <p className="text-[20px] font-bold text-white mt-1 leading-tight">{value}</p>
                  <p className="text-[11px] text-blue-100 font-medium">{label}</p>
                </div>
              ))}
            </div>

            {/* Central hero image */}
            <div className="relative w-full max-w-[400px]">
              <div className="absolute inset-0 bg-blue-400/20 rounded-3xl blur-2xl scale-95" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3JyOrItaD6GvCeX0_gGit6anZQK4SujJySEbjfN3WdQxLkaoT0wWhznRj204ejyeeoQwkfjCPIRz5CYWc2kfEDxELo05MGEanzseMVWQxsWoZwEmXTIxMaBelOfgcqc_HSvcJmht5Cnih7b5n0YTYBVwjUybojjfwCo8Q_SPvvci-5zsxiXtnsQvxfRqoorj-Juh1JT_vn00iRHMySOwByUSCUAOfWUCct-Z0vLaHbQoLdw_2TUIPHg"
                alt="Healthcare illustration"
                className="relative w-full h-auto object-contain rounded-3xl drop-shadow-2xl"
              />
            </div>

            {/* Below image: third stat */}
            <div className="mt-8 flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3.5">
              <div className="w-10 h-10 rounded-xl bg-green-400/30 flex items-center justify-center">
                <span className="material-symbols-outlined icon-fill text-green-300 text-[20px]">stethoscope</span>
              </div>
              <div className="text-left">
                <p className="text-[18px] font-bold text-white">340+ Specialists</p>
                <p className="text-[12px] text-blue-200">Across 6 departments</p>
              </div>
            </div>
          </div>

          {/* Bottom: Tagline */}
          <div className="text-center">
            <h2 className="text-[26px] font-bold text-white leading-snug">
              Streamlining Healthcare.<br />
              <span className="text-blue-200 font-normal text-[18px]">Empowering every professional.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* ─── Right Form Panel ────────────────────────────────────────────── */}
      <div className="w-full lg:w-[48%] flex items-center justify-center p-6 sm:p-10 bg-white min-h-screen">
        <div className="w-full max-w-[440px]">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-[#2563eb] flex items-center justify-center">
              <span className="material-symbols-outlined icon-fill text-white text-[20px]">local_hospital</span>
            </div>
            <span className="text-[20px] font-bold text-[#1e3a8a]">MediSync Pro</span>
          </div>

          {/* Mode toggle tabs */}
          <div className="flex bg-[#f0f4ff] rounded-2xl p-1.5 mb-8">
            {(['login', 'register'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => switchMode(mode)}
                className={`flex-1 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                  activeMode === mode
                    ? 'bg-white text-[#1e3a8a] shadow-sm'
                    : 'text-[#6b7280] hover:text-[#374151]'
                }`}
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-[28px] font-bold text-[#0b1c30] tracking-tight leading-tight">
              {activeMode === 'login' ? 'Welcome back 👋' : 'Join MediSync Pro'}
            </h1>
            <p className="mt-1.5 text-[14px] text-[#6b7280]">
              {activeMode === 'login'
                ? 'Sign in to access your healthcare dashboard.'
                : 'Create your account to get started today.'}
            </p>
          </div>

          {/* Error banner */}
          {errors.general && (
            <div className="flex items-start gap-3 p-4 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px]">
              <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">error</span>
              <span>{errors.general}</span>
            </div>
          )}

          {/* Forgot password success */}
          {forgotSent && (
            <div className="flex items-start gap-3 p-4 mb-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[13px]">
              <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">mark_email_read</span>
              <span>Reset link sent to <strong>{email}</strong>. Check your inbox.</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Full Name (register only) */}
            {activeMode === 'register' && (
              <div>
                <label htmlFor="fullName" className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className={`material-symbols-outlined text-[18px] ${errors.fullName ? 'text-red-400' : 'text-[#9ca3af]'}`}>
                      person
                    </span>
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined })); }}
                    placeholder="Dr. Jane Smith"
                    className={`block w-full pl-10 pr-4 h-[48px] rounded-xl border text-[14px] text-[#0b1c30] placeholder:text-[#d1d5db] outline-none transition-all
                      ${errors.fullName ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-[#e5e7eb] bg-[#fafafa] focus:bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15'}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">warning</span>{errors.fullName}
                  </p>
                )}
              </div>
            )}

            {/* Role selector (register only) */}
            {activeMode === 'register' && (
              <div>
                <label htmlFor="role" className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">
                  Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[18px] text-[#9ca3af]">badge</span>
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full pl-10 pr-4 h-[48px] rounded-xl border border-[#e5e7eb] bg-[#fafafa] focus:bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 text-[14px] text-[#0b1c30] outline-none appearance-none transition-all cursor-pointer"
                  >
                    {['Doctor', 'Nurse', 'Admin', 'Receptionist', 'Pharmacist'].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[18px] text-[#9ca3af]">expand_more</span>
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[12px] font-semibold text-[#374151] mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className={`material-symbols-outlined text-[18px] ${errors.email ? 'text-red-400' : 'text-[#9ca3af]'}`}>
                    mail
                  </span>
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="doctor@medisync.com"
                  className={`block w-full pl-10 pr-4 h-[48px] rounded-xl border text-[14px] text-[#0b1c30] placeholder:text-[#d1d5db] outline-none transition-all
                    ${errors.email ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-[#e5e7eb] bg-[#fafafa] focus:bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15'}`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">warning</span>{errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-[12px] font-semibold text-[#374151] uppercase tracking-wide">
                  Password
                </label>
                {activeMode === 'login' && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[12px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className={`material-symbols-outlined text-[18px] ${errors.password ? 'text-red-400' : 'text-[#9ca3af]'}`}>
                    lock
                  </span>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={activeMode === 'login' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
                  placeholder={activeMode === 'login' ? 'Enter your password' : 'Create a strong password'}
                  className={`block w-full pl-10 pr-11 h-[48px] rounded-xl border text-[14px] text-[#0b1c30] placeholder:text-[#d1d5db] outline-none transition-all
                    ${errors.password ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-[#e5e7eb] bg-[#fafafa] focus:bg-white focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#9ca3af] hover:text-[#2563eb] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">warning</span>{errors.password}
                </p>
              )}
            </div>

            {/* Remember me */}
            {activeMode === 'login' && (
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={rememberMe}
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0
                    ${rememberMe ? 'bg-[#2563eb] border-[#2563eb]' : 'border-[#d1d5db] bg-white hover:border-[#2563eb]'}`}
                >
                  {rememberMe && (
                    <span className="material-symbols-outlined icon-fill text-white text-[13px]">check</span>
                  )}
                </button>
                <span
                  onClick={() => setRememberMe(!rememberMe)}
                  className="text-[13px] text-[#6b7280] cursor-pointer select-none"
                >
                  Keep me signed in for 30 days
                </span>
              </div>
            )}

            {/* Terms (register only) */}
            {activeMode === 'register' && (
              <p className="text-[12px] text-[#9ca3af] leading-relaxed">
                By creating an account you agree to our{' '}
                <span className="text-[#2563eb] cursor-pointer hover:underline">Terms of Service</span>{' '}
                and{' '}
                <span className="text-[#2563eb] cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[50px] rounded-xl font-bold text-[15px] text-white transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: isLoading ? '#93c5fd' : 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)' }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>{activeMode === 'login' ? 'Signing in…' : 'Creating account…'}</span>
                </>
              ) : (
                <>
                  <span>{activeMode === 'login' ? 'Sign In to Dashboard' : 'Create My Account'}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#f3f4f6]" />
            <span className="text-[11px] text-[#d1d5db] font-semibold tracking-widest">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-[#f3f4f6]" />
          </div>

          {/* SSO buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Google', icon: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' },
              { label: 'Microsoft', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => onLoginSuccess(`user@${label.toLowerCase()}.com`)}
                className="flex items-center justify-center gap-2.5 h-[44px] rounded-xl border border-[#e5e7eb] bg-white hover:bg-[#f8faff] hover:border-[#2563eb] transition-all text-[13px] font-semibold text-[#374151]"
              >
                <img src={icon} alt={label} className="w-4 h-4 object-contain" />
                {label}
              </button>
            ))}
          </div>

          {/* Mode switch link */}
          <p className="mt-7 text-center text-[13px] text-[#6b7280]">
            {activeMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => switchMode(activeMode === 'login' ? 'register' : 'login')}
              className="font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
            >
              {activeMode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </p>

          {/* Demo credentials hint */}
          {activeMode === 'login' && (
            <div className="mt-5 p-4 rounded-xl border border-dashed border-[#bfdbfe] bg-[#eff6ff]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-[#3b82f6] text-[16px]">info</span>
                <span className="text-[12px] font-bold text-[#1e40af]">Demo Access</span>
              </div>
              <p className="text-[12px] text-[#3b82f6] leading-relaxed">
                Email: <span className="font-mono font-semibold">doctor@medisync.com</span><br />
                Password: <span className="font-mono font-semibold">password</span>
              </p>
              <button
                type="button"
                onClick={() => { setEmail('doctor@medisync.com'); setPassword('password'); }}
                className="mt-2.5 w-full h-[32px] rounded-lg bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#1d4ed8] text-[12px] font-semibold transition-colors"
              >
                Auto-fill credentials
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
