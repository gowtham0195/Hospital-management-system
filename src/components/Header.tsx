import React, { useState, useRef, useEffect } from 'react';
import { NavigationTab, NotificationItem, UserProfile } from '../types';

interface HeaderProps {
  pageTitle?: string;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  isLoggedIn: boolean;
  onLogoutClick: () => void;
  onLoginClick: () => void;
  onOpenMobileMenu?: () => void;
  currentUser: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  pageTitle,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  notifications,
  onMarkNotificationRead,
  isLoggedIn,
  onLogoutClick,
  onLoginClick,
  onOpenMobileMenu,
  currentUser,
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMessageDrawer, setShowMessageDrawer] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter((n) => !n.read);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifMenu(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 0 && activeTab !== 'search') {
      setActiveTab('search');
    }
  };

  return (
    <header className="bg-white dark:bg-[#213145] border-b border-[#c3c6d7] dark:border-[#737686]/40 flex justify-between items-center w-full h-16 px-4 md:px-8 sticky top-0 z-40 transition-colors duration-200">
      {/* Left side: Mobile menu toggle or Page Title or Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-[#434655] dark:text-[#c3c6d7] hover:bg-[#eff4ff] dark:hover:bg-[#dce9ff]/10 rounded-lg transition-colors"
          title="Open Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {pageTitle && (
          <h2 className="text-[20px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] hidden sm:block mr-4 whitespace-nowrap">
            {pageTitle}
          </h2>
        )}

        {/* Global Search Input */}
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search patients, doctors, appointments..."
            className="w-full pl-10 pr-4 py-2 bg-[#eff4ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7] dark:border-[#737686]/50 rounded-full text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all placeholder:text-[#737686]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#0b1c30]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right side Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#434655] dark:text-[#c3c6d7] hover:bg-[#eff4ff] dark:hover:bg-[#dce9ff]/10 transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotifs.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#213145] rounded-2xl shadow-xl border border-[#c3c6d7]/50 py-3 px-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-3 pb-2 border-b border-[#c3c6d7]/30">
                <h4 className="font-semibold text-[15px] text-[#0b1c30] dark:text-[#f8f9ff]">Notifications</h4>
                <span className="text-[12px] bg-[#2563eb]/10 text-[#004ac6] dark:text-[#b4c5ff] px-2 py-0.5 rounded-full font-medium">
                  {unreadNotifs.length} new
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto my-1 divide-y divide-[#c3c6d7]/20">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => onMarkNotificationRead(notif.id)}
                    className={`p-3 rounded-xl hover:bg-[#f8f9ff] dark:hover:bg-[#0b1c30]/40 transition-colors cursor-pointer flex gap-3 items-start ${
                      !notif.read ? 'bg-[#eff4ff]/60 dark:bg-[#2563eb]/10' : ''
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] mt-0.5 shrink-0 ${
                        notif.type === 'alert'
                          ? 'text-[#ba1a1a]'
                          : notif.type === 'success'
                          ? 'text-[#007e37]'
                          : 'text-[#2563eb]'
                      }`}
                    >
                      {notif.type === 'alert'
                        ? 'warning'
                        : notif.type === 'success'
                        ? 'check_circle'
                        : 'info'}
                    </span>
                    <div className="flex-1 text-left">
                      <p className="text-[13px] font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                        {notif.title}
                      </p>
                      <p className="text-[12px] text-[#434655] dark:text-[#c3c6d7] mt-0.5 leading-snug">
                        {notif.message}
                      </p>
                      <span className="text-[11px] text-[#737686] mt-1 block">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button
          onClick={() => setShowMessageDrawer(!showMessageDrawer)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#434655] dark:text-[#c3c6d7] hover:bg-[#eff4ff] dark:hover:bg-[#dce9ff]/10 transition-colors hidden sm:flex"
          title="Messages"
        >
          <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
        </button>

        {/* Quick Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#434655] dark:text-[#c3c6d7] hover:bg-[#eff4ff] dark:hover:bg-[#dce9ff]/10 transition-colors hidden sm:flex"
          title="Settings"
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
        </button>

        <div className="h-8 w-px bg-[#c3c6d7]/50 mx-1 hidden sm:block"></div>

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 hover:opacity-85 transition-opacity p-1 rounded-full sm:rounded-xl hover:bg-[#eff4ff] dark:hover:bg-[#dce9ff]/10"
          >
            <img
              src={currentUser.imageUrl}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-[#c3c6d7]"
            />
            <div className="text-left hidden md:block">
              <span className="text-[14px] font-semibold text-[#0b1c30] dark:text-[#f8f9ff] block leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[12px] text-[#434655] dark:text-[#c3c6d7] block">
                {currentUser.title}
              </span>
            </div>
            <span className="material-symbols-outlined text-[#737686] hidden sm:inline">
              expand_more
            </span>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#213145] rounded-2xl shadow-xl border border-[#c3c6d7]/50 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-[#c3c6d7]/30">
                <p className="font-semibold text-[14px] text-[#0b1c30] dark:text-[#f8f9ff]">
                  {currentUser.name}
                </p>
                <p className="text-[12px] text-[#434655] dark:text-[#c3c6d7]">{currentUser.email}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveTab('patients');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] hover:bg-[#eff4ff] dark:hover:bg-[#0b1c30]/40 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  <span>View Patient Profiles</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] hover:bg-[#eff4ff] dark:hover:bg-[#0b1c30]/40 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  <span>System Settings</span>
                </button>
              </div>
              <div className="border-t border-[#c3c6d7]/30 pt-1">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogoutClick();
                    }}
                    className="w-full text-left px-4 py-2 text-[14px] text-[#ba1a1a] hover:bg-[#ffdad6]/30 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLoginClick();
                    }}
                    className="w-full text-left px-4 py-2 text-[14px] text-[#004ac6] hover:bg-[#2563eb]/10 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
