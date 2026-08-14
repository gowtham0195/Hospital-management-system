import React from 'react';
import { NavigationTab, UserProfile } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onNewAppointmentClick: () => void;
  isLoggedIn: boolean;
  onLogoutClick: () => void;
  onLoginClick: () => void;
  currentUser: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onNewAppointmentClick,
  isLoggedIn,
  onLogoutClick,
  onLoginClick,
  currentUser,
}) => {
  const navItems: { id: NavigationTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'doctors', label: 'Doctors', icon: 'medical_services' },
    { id: 'patients', label: 'Patients', icon: 'group' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar_today' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'departments', label: 'Departments', icon: 'domain' },
    { id: 'reports', label: 'Reports', icon: 'monitoring' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside className="hidden md:flex bg-white dark:bg-[#213145] shadow-[0_6px_24px_0_rgba(15,23,42,0.08)] h-screen w-64 fixed left-0 top-0 flex-col py-6 px-4 z-50 transition-colors duration-200">
      {/* Header / Brand */}
      <div 
        className="mb-6 flex items-center gap-3 px-2 cursor-pointer"
        onClick={() => setActiveTab('dashboard')}
      >
        <div className="w-10 h-10 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shadow-sm shrink-0">
          <span className="material-symbols-outlined icon-filled">local_hospital</span>
        </div>
        <div>
          <h1 className="text-[20px] font-bold text-[#004ac6] dark:text-[#b4c5ff] leading-tight">MediSync Pro</h1>
          <p className="text-[12px] text-[#434655] dark:text-[#c3c6d7]">Hospital Management</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mb-6 px-1">
        <button
          onClick={onNewAppointmentClick}
          className="w-full bg-[#2563eb] hover:bg-[#0053db] text-white py-3 px-4 rounded-xl text-[15px] font-semibold shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Appointment</span>
        </button>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex-1 overflow-y-auto pr-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#004ac6] dark:text-[#b4c5ff] font-bold border-r-4 border-[#004ac6] dark:border-[#b4c5ff] bg-[#2563eb]/10 scale-[0.99]'
                      : 'text-[#434655] dark:text-[#c3c6d7] hover:text-[#004ac6] dark:hover:text-[#b4c5ff] hover:bg-[#e5eeff] dark:hover:bg-[#dce9ff]/10'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[22px] ${isActive ? 'icon-filled' : ''}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Profile Card */}
      {isLoggedIn && (
        <div
          className="mt-4 mb-2 p-3 rounded-2xl bg-[#eff4ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7]/30 flex items-center gap-3 cursor-pointer hover:bg-[#e0eaff] dark:hover:bg-[#0b1c30]/70 transition-colors"
          onClick={() => setActiveTab('settings')}
          title="Edit profile in Settings"
        >
          <div className="relative shrink-0">
            <img
              src={currentUser.imageUrl}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#2563eb]"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-[#213145] rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] truncate">{currentUser.name}</p>
            <p className="text-[11px] text-[#2563eb] truncate">{currentUser.title}</p>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#737686] shrink-0">edit</span>
        </div>
      )}

      {/* Footer Nav Controls */}
      <div className="mt-auto border-t border-[#c3c6d7]/30 pt-3">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setActiveTab('settings')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#434655] dark:text-[#c3c6d7] hover:text-[#004ac6] dark:hover:text-[#b4c5ff] hover:bg-[#e5eeff] dark:hover:bg-[#dce9ff]/10 transition-colors text-[14px] font-medium"
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span>Help Center</span>
            </button>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={onLogoutClick}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors text-[14px] font-medium"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#004ac6] hover:bg-[#2563eb]/10 transition-colors text-[14px] font-medium"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                <span>Sign In</span>
              </button>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};
