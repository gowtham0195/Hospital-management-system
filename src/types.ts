export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  title: string;
  imageUrl: string;
}

export type NavigationTab = 
  | 'dashboard'
  | 'doctors'
  | 'patients'
  | 'appointments'
  | 'history'
  | 'departments'
  | 'search'
  | 'reports'
  | 'settings'
  | 'login';

export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';

export interface Doctor {
  id: string;
  name: string;
  department: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  status: 'Available Today' | 'Busy' | 'On Leave';
  imageUrl: string;
  consultationFee: number;
  email: string;
  phone: string;
  bio?: string;
}

export interface Patient {
  id: string; // e.g. PT-1024
  name: string;
  age: number;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  status: 'Active' | 'Inactive' | 'Discharged';
  imageUrl: string;
  lastVisit: string;
  appointmentsCount: number;
  prescriptionsCount: number;
  medicalReportsCount: number;
  medicalHistory: MedicalHistoryItem[];
  medications: MedicationItem[];
}

export interface MedicalHistoryItem {
  id: string;
  title: string;
  type: 'Surgery' | 'Condition' | 'Diagnosis' | 'Allergy';
  year: string;
  status: 'Completed' | 'Diagnosed' | 'Active' | 'Alert';
  description: string;
  isAlert?: boolean;
}

export interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string; // e.g. "30 Days"
  progressPercent: number;
  status: 'Active' | 'Ongoing' | 'Completed';
}

export interface Appointment {
  id: string; // e.g. APT-1024
  patientName: string;
  patientId?: string;
  patientPhone?: string;
  doctorName: string;
  doctorId?: string;
  department: string;
  date: string; // e.g. "2026-08-05" or "15 Jul 2026"
  time: string; // e.g. "09:30 AM"
  status: AppointmentStatus;
  symptoms?: string;
  consultationFee?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'alert' | 'success';
}

export interface Department {
  id: string;
  name: string;
  floor: string;
  doctorCount: number;
  headDoctor: string;
  icon: string;
}
