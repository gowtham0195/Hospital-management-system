import React, { useState, useEffect } from 'react';
import {
  NavigationTab,
  Doctor,
  Patient,
  Appointment,
  Department,
  NotificationItem,
  AppointmentStatus,
  MedicationItem,
  UserProfile,
} from './types';
import {
  INITIAL_DOCTORS,
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_DEPARTMENTS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';

// Components
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast, ToastMessage } from './components/Toast';
import { AddDoctorModal } from './components/AddDoctorModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { AddMedicationModal } from './components/AddMedicationModal';

// Views
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { AppointmentBookingView } from './views/AppointmentBookingView';
import { DoctorManagementView } from './views/DoctorManagementView';
import { AppointmentHistoryView } from './views/AppointmentHistoryView';
import { GlobalSearchView } from './views/GlobalSearchView';
import { PatientProfileView } from './views/PatientProfileView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Theme: 'light' | 'dark' | 'system'
  type ThemeMode = 'light' | 'dark' | 'system';
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('themeMode') as ThemeMode) || 'system';
  });

  // Derived: is dark actually active right now?
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemPrefersDark);

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logged-in user profile — single source of truth
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@medisync.org',
    phone: '+1 (555) 123-4567',
    title: 'Chief Medical Officer',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDy9b2Vr9xBzmzuEmghjYgoufR95YpaLaB79lR8HzavgNYQK3tecTLUl9f56aV9iX29jpO2PMFipKolOoNxJ23yQQ8Ql_VqOBFYYHeFMO73K0YAr_YAvmUrbhiXID0UEQahZ6tjQsRBG-zUizaw5nnUPZ4howxJyMGw4sVjbMqTWWPUz2JIv68R3VI76nF6sd_u5h5gFU_POL4iTC5DgAeVkD7zHr1j9ULGFHxeIuRgwP8ewTblefOGSQ',
  });

  // Core Data Collections State
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Selected entities for detail views
  const [selectedPatient, setSelectedPatient] = useState<Patient>(INITIAL_PATIENTS[0]);
  const [preselectedDoctorForBooking, setPreselectedDoctorForBooking] = useState<Doctor | null>(null);
  const [doctorForProfileModal, setDoctorForProfileModal] = useState<Doctor | null>(null);

  // Modal toggles
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
  const [isAddMedicationModalOpen, setIsAddMedicationModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Listen to OS preference changes when in system mode
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Apply / remove the 'dark' class and persist preference
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode, isDark]);

  // Handlers
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleBookAppointment = (aptData: Omit<Appointment, 'id'>) => {
    const newId = `APT-${1025 + appointments.length}`;
    const newApt: Appointment = {
      ...aptData,
      id: newId,
    };

    setAppointments([newApt, ...appointments]);

    // Add automated notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Appointment Confirmed',
      message: `${aptData.patientName} booked with ${aptData.doctorName} for ${aptData.date}`,
      time: 'Just now',
      read: false,
      type: 'success',
    };
    setNotifications([newNotif, ...notifications]);

    addToast(
      'success',
      'Appointment Booked Successfully!',
      `Scheduled ${aptData.patientName} with ${aptData.doctorName} on ${aptData.date} at ${aptData.time}`
    );

    setActiveTab('history');
  };

  const handleAddDoctor = (doctorData: Omit<Doctor, 'id' | 'rating' | 'reviewCount'>) => {
    const newDoctor: Doctor = {
      ...doctorData,
      id: `doc-${doctors.length + 1}`,
      rating: 5.0,
      reviewCount: 1,
    };
    setDoctors([newDoctor, ...doctors]);
    addToast('success', 'New Doctor Added', `${newDoctor.name} added to ${newDoctor.department}`);
  };

  const handleAddMedicationToPatient = (medData: Omit<MedicationItem, 'id'>) => {
    const newMed: MedicationItem = {
      ...medData,
      id: `med-${Date.now()}`,
    };

    const updatedPatients = patients.map((p) => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          medications: [newMed, ...p.medications],
          prescriptionsCount: p.prescriptionsCount + 1,
        };
      }
      return p;
    });

    setPatients(updatedPatients);
    setSelectedPatient({
      ...selectedPatient,
      medications: [newMed, ...selectedPatient.medications],
      prescriptionsCount: selectedPatient.prescriptionsCount + 1,
    });

    addToast('success', 'Medication Added', `Prescribed ${medData.name} to ${selectedPatient.name}`);
  };

  const handleUpdateAppointmentStatus = (id: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    addToast('info', 'Status Updated', `Appointment ${id} status changed to ${newStatus}`);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    addToast('info', 'Appointment Deleted', `Record ${id} removed`);
  };

  const handleSelectPatientToView = (p: Patient) => {
    setSelectedPatient(p);
    setActiveTab('patients');
  };

  const handleBookForDoctor = (doc: Doctor) => {
    setPreselectedDoctorForBooking(doc);
    setActiveTab('appointments');
  };

  // Title translation
  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'doctors':
        return 'Doctor Management';
      case 'patients':
        return 'Patient Records';
      case 'appointments':
        return 'New Appointment';
      case 'history':
        return 'Appointment History';
      case 'search':
        return 'Global Search';
      case 'settings':
        return 'System Settings';
      default:
        return 'MediSync Pro';
    }
  };

  if (!isLoggedIn || activeTab === 'login') {
    return (
      <LoginView
        onLoginSuccess={(email) => {
          setIsLoggedIn(true);
          setActiveTab('dashboard');
          addToast('success', 'Welcome Back!', `Signed in as ${email}`);
        }}
        onRegisterClick={() => {
          setIsLoggedIn(true);
          setActiveTab('dashboard');
          addToast('success', 'Account Created!', 'Welcome to MediSync Pro');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] transition-colors duration-200">
      {/* Toast Notification Layer */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }}
        onNewAppointmentClick={() => {
          setPreselectedDoctorForBooking(null);
          setActiveTab('appointments');
          setIsMobileMenuOpen(false);
        }}
        isLoggedIn={isLoggedIn}
        onLogoutClick={() => {
          setIsLoggedIn(false);
          setActiveTab('login');
          addToast('info', 'Logged Out', 'You have been signed out.');
        }}
        onLoginClick={() => setActiveTab('login')}
        currentUser={currentUser}
      />

      {/* Mobile Drawer Navigation Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full bg-white dark:bg-[#213145]"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsMobileMenuOpen(false);
              }}
              onNewAppointmentClick={() => {
                setPreselectedDoctorForBooking(null);
                setActiveTab('appointments');
                setIsMobileMenuOpen(false);
              }}
              isLoggedIn={isLoggedIn}
              onLogoutClick={() => {
                setIsLoggedIn(false);
                setActiveTab('login');
                setIsMobileMenuOpen(false);
              }}
              onLoginClick={() => {
                setActiveTab('login');
                setIsMobileMenuOpen(false);
              }}
              currentUser={currentUser}
            />
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        <Header
          pageTitle={getPageTitle()}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          isLoggedIn={isLoggedIn}
          onLogoutClick={() => {
            setIsLoggedIn(false);
            setActiveTab('login');
          }}
          onLoginClick={() => setActiveTab('login')}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          currentUser={currentUser}
        />

        <main className="flex-1 pb-16">
          {activeTab === 'dashboard' && (
            <DashboardView
              appointments={appointments}
              doctors={doctors}
              patients={patients}
              setActiveTab={setActiveTab}
              onBookAppointmentClick={() => {
                setPreselectedDoctorForBooking(null);
                setActiveTab('appointments');
              }}
              onSelectPatient={handleSelectPatientToView}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentBookingView
              doctors={doctors}
              patients={patients}
              preselectedDoctor={preselectedDoctorForBooking}
              onBookAppointment={handleBookAppointment}
              onCancel={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorManagementView
              doctors={doctors}
              onBookAppointment={handleBookForDoctor}
              onViewProfile={(doc) => setDoctorForProfileModal(doc)}
              onOpenAddDoctorModal={() => setIsAddDoctorModalOpen(true)}
            />
          )}

          {activeTab === 'history' && (
            <AppointmentHistoryView
              appointments={appointments}
              onUpdateStatus={handleUpdateAppointmentStatus}
              onDeleteAppointment={handleDeleteAppointment}
              setActiveTab={setActiveTab}
              onBookAppointmentClick={() => {
                setPreselectedDoctorForBooking(null);
                setActiveTab('appointments');
              }}
            />
          )}

          {activeTab === 'search' && (
            <GlobalSearchView
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              doctors={doctors}
              patients={patients}
              appointments={appointments}
              departments={departments}
              onSelectDoctor={(doc) => setDoctorForProfileModal(doc)}
              onSelectPatient={handleSelectPatientToView}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'patients' && (
            <PatientProfileView
              patient={selectedPatient}
              onOpenAddMedicationModal={() => setIsAddMedicationModalOpen(true)}
              onBookAppointmentForPatient={(pat) => {
                setSelectedPatient(pat);
                setPreselectedDoctorForBooking(null);
                setActiveTab('appointments');
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              themeMode={themeMode}
              setThemeMode={setThemeMode}
              isDark={isDark}
              currentUser={currentUser}
              onUpdateProfile={(updated) => {
                setCurrentUser(updated);
                addToast('success', 'Profile Updated', 'Your changes are now live across the app.');
              }}
              onSaveToast={() => addToast('success', 'Settings Saved', 'System preferences updated')}
            />
          )}

          {/* Departments & Reports Placeholders redirecting to core data */}
          {(activeTab === 'departments' || activeTab === 'reports') && (
            <div className="p-8 max-w-4xl mx-auto text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#2563eb]/10 text-[#2563eb] mx-auto flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[32px]">
                  {activeTab === 'departments' ? 'domain' : 'monitoring'}
                </span>
              </div>
              <h2 className="text-[24px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                {activeTab === 'departments' ? 'Hospital Departments' : 'Analytical Reports'}
              </h2>
              <p className="text-[14px] text-[#434655] dark:text-[#c3c6d7] mt-2 mb-6 max-w-md mx-auto">
                {activeTab === 'departments'
                  ? 'Manage hospital wings, floors, and specialty clinics.'
                  : 'Generate comprehensive operational metrics and patient load analytics.'}
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-3 bg-[#2563eb] text-white font-bold rounded-2xl shadow-sm hover:bg-[#0053db] transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Dialog Modals */}
      <AddDoctorModal
        isOpen={isAddDoctorModalOpen}
        onClose={() => setIsAddDoctorModalOpen(false)}
        onAddDoctor={handleAddDoctor}
      />

      <DoctorProfileModal
        doctor={doctorForProfileModal}
        onClose={() => setDoctorForProfileModal(null)}
        onBookAppointment={(doc) => {
          setDoctorForProfileModal(null);
          handleBookForDoctor(doc);
        }}
      />

      <AddMedicationModal
        isOpen={isAddMedicationModalOpen}
        onClose={() => setIsAddMedicationModalOpen(false)}
        onAddMedication={handleAddMedicationToPatient}
      />
    </div>
  );
}
