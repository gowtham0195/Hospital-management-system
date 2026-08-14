import { Doctor, Patient, Appointment, Department, NotificationItem } from '../types';

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 142,
    status: 'Available Today',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2nRHCNy2I4QSwDxqmd8L2j_cLpj17yqwDFnhwk-LDHc16b1CVn_mlRDjwme7te4gNcnYORmlhjqAv8ACM1qTQ8i6HTtxBwADMWTb8kCbmi3jWqPH3VUmlgC0xFjIWsJL4SiRkPF1Gr9N5PHYGNdhuxMGjb0rGIsp3qTDZJITlUd6Q2i8vMCXt0oyx9Mcr581cTPbbWn-TvBgKNPOZxjnrWqoDlrx7gefW3jv5b0wGjg18zbdvPQ_kug',
    consultationFee: 160,
    email: 'sarah.johnson@medisync.com',
    phone: '+1 (555) 234-5678',
    bio: 'Specialist in non-invasive cardiology, echocardiography, and preventive cardiovascular healthcare.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Michael Brown',
    department: 'Neurology',
    experienceYears: 9,
    rating: 4.8,
    reviewCount: 118,
    status: 'Available Today',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFDl0HxFOS0412Ku87DnFchqkB4PyMInSVdHIq6fmGBBwe84K2ewA5daZWauTQxCIemf5a7QBKdfZJ66g5aWO_pY1zpNF9s_kV_v2CXmS0lh3NTmQoK-5CpaH3f4758g6TqoIkxzBoN6appRs_Xm0ti1BUFjtVgFha8tjCguvJy9UurEhdds3sWBmwfk0npUwNHRE3uuO552x5Lcxp6tMOVUoIP7Qx1u1WfU40vbn_1_zo6R1WiscaQ',
    consultationFee: 175,
    email: 'michael.brown@medisync.com',
    phone: '+1 (555) 345-6789',
    bio: 'Expert in clinical neurophysiology, movement disorders, and migraine management.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Emily Carter',
    department: 'Orthopedics',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 195,
    status: 'Busy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0tsJYOpUYoNv9Rd2e3VZLE6wzsTgB7hWUEaLlARhTJd2i8THRfg4kHyjn3neGbnMJ6AAZLaoe3101pdCE942LtHW6LBLhMBNZ7mkWSRF5c835SvGr26zOrdiL0gYm5EoLcA0IX4IMDOgyjqzziCL_5MtqarLnr6FpPVbQeJplywK9lN6MJqh97QfJoE4nWT2CiTZxBh4EX2EeJvE3Gv23TnJyW6lVcSxkvFM_KD6YGVlLp9s4sg3bEA',
    consultationFee: 180,
    email: 'emily.carter@medisync.com',
    phone: '+1 (555) 456-7890',
    bio: 'Renowned orthopedic surgeon specializing in joint replacement and sports medicine rehabilitation.'
  },
  {
    id: 'doc-4',
    name: 'Dr. Robert Chen',
    department: 'Cardiology',
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 128,
    status: 'Available Today',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4gz6FtZXyuTjSas1Da_3Jx_QKE6wFXU8-7mFwLfL8q50-4tCOHMGOfbxAE8xZyzQkSw9lT2nDHzykAhv9zITkX4rgNYSszzzoUPQrq7IIx71H1Gd1GqxRC3dOsOxJdjkBwYtVbNLMtJA9G0jnQt6NWAnOJwIBYNyCb4qj2t74DwdQSyJPyKFchCPAMGbzZdG4bXKDsPdG3Yr2wm6a8fGFJANgayQHCOIx4Q4UAsxiXhxctkyPtPCqkg',
    consultationFee: 150,
    email: 'robert.chen@medisync.com',
    phone: '+1 (555) 567-8901',
    bio: 'Senior Cardiologist specializing in heart rhythm disorders and electrophysiology.'
  },
  {
    id: 'doc-5',
    name: 'Dr. Sarah Jenkins',
    department: 'Hospital Administration & Medicine',
    experienceYears: 18,
    rating: 5.0,
    reviewCount: 210,
    status: 'Available Today',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfQewcOIrPgWxl5CX1a008vpNqD5mT5CsP2Y_7h9FBE20Ik3AGrKg105Bl_pf6UOVt7-0f-6vfRLauYUjB365_rkz-d-OLbg9CgNatyna0VC0E2wBi3OWk9Sa8sA1Tr-2EfBSP6PaPmyArHSpc7U515Z_pA5VuYsCvVPMKpXm-8cE4qlvI7KSsISzQhcz1WLgM7wSBfAbdCukGeePbc9bwR5GR6mBO3s_qyUu-o8fBhjR-Fmm-geoyNA',
    consultationFee: 200,
    email: 's.jenkins@medisync.org',
    phone: '+1 (555) 123-4567',
    bio: 'Chief Medical Officer at Metro General Hospital driving clinical excellence.'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'PT-1024',
    name: 'Emma Wilson',
    age: 28,
    dob: '15 May 1998',
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+1 555-0123',
    email: 'emma.w@email.com',
    address: '123 Maple St, Springfield',
    emergencyContact: {
      name: 'John Wilson',
      relationship: 'Spouse',
      phone: '+1 555-0987'
    },
    status: 'Active',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH3g_F8jv_su_l5quagEg_I2VlE7V67Rb7zJ7JL6XsFBIiDV-kGvhaJuoAJbSPNDIMSnsEhxWBNWUYqNRtuVKkC456x6oUCKlyoX0wlKk3IEzJxHeEEI5CBj7FR5McO287YtvsT4MmPRJ6keDYm3GRom_39QiKhc-pUe4hX64btjPYkihzcm1iqxmuqsbuagS0bFyMkjrvPAwp0ukfd03SkNb2ZVlpy_Sq99SkyFtWLK7AddOcI8sArA',
    lastVisit: '10 May 2026',
    appointmentsCount: 12,
    prescriptionsCount: 2,
    medicalReportsCount: 8,
    medicalHistory: [
      {
        id: 'mh-1',
        title: 'Minor Surgery',
        type: 'Surgery',
        year: '2024',
        status: 'Completed',
        description: 'Appendectomy performed successfully without complications. Full recovery documented.'
      },
      {
        id: 'mh-2',
        title: 'Diabetes Type II',
        type: 'Condition',
        year: '2023',
        status: 'Diagnosed',
        description: 'Currently managing with diet, exercise, and Metformin. Regular HbA1c monitoring required.'
      },
      {
        id: 'mh-3',
        title: 'Hypertension',
        type: 'Condition',
        year: '2021',
        status: 'Diagnosed',
        description: 'Controlled via Lisinopril. Patient advised on low-sodium diet.'
      },
      {
        id: 'mh-4',
        title: 'Allergy Alert',
        type: 'Allergy',
        year: '2020',
        status: 'Alert',
        description: 'Severe allergic reaction to Penicillin. Ensure alternative antibiotics are prescribed.',
        isAlert: true
      }
    ],
    medications: [
      {
        id: 'med-1',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice Daily',
        duration: '30 Days',
        progressPercent: 40,
        status: 'Active'
      },
      {
        id: 'med-2',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once Daily',
        duration: 'Ongoing',
        progressPercent: 85,
        status: 'Ongoing'
      }
    ]
  },
  {
    id: 'PT-1025',
    name: 'Alex Lawson',
    age: 34,
    dob: '22 Aug 1992',
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+1 555-0144',
    email: 'alex.lawson@email.com',
    address: '456 Oak Avenue, Springfield',
    emergencyContact: {
      name: 'Sarah Lawson',
      relationship: 'Sister',
      phone: '+1 555-0944'
    },
    status: 'Active',
    imageUrl: '',
    lastVisit: '24 Oct 2023',
    appointmentsCount: 5,
    prescriptionsCount: 1,
    medicalReportsCount: 3,
    medicalHistory: [],
    medications: []
  },
  {
    id: 'PT-1026',
    name: 'Maria Rodriguez',
    age: 41,
    dob: '11 Nov 1985',
    gender: 'Female',
    bloodGroup: 'B+',
    phone: '+1 555-0155',
    email: 'm.rodriguez@email.com',
    address: '789 Pine Road, Springfield',
    emergencyContact: {
      name: 'Carlos Rodriguez',
      relationship: 'Spouse',
      phone: '+1 555-0955'
    },
    status: 'Active',
    imageUrl: '',
    lastVisit: '24 Oct 2023',
    appointmentsCount: 8,
    prescriptionsCount: 3,
    medicalReportsCount: 6,
    medicalHistory: [],
    medications: []
  },
  {
    id: 'PT-1027',
    name: 'James Smith',
    age: 52,
    dob: '03 Feb 1974',
    gender: 'Male',
    bloodGroup: 'AB-',
    phone: '+1 555-0166',
    email: 'j.smith@email.com',
    address: '321 Elm Street, Springfield',
    emergencyContact: {
      name: 'Laura Smith',
      relationship: 'Daughter',
      phone: '+1 555-0966'
    },
    status: 'Active',
    imageUrl: '',
    lastVisit: '14 Jul 2026',
    appointmentsCount: 14,
    prescriptionsCount: 4,
    medicalReportsCount: 11,
    medicalHistory: [],
    medications: []
  },
  {
    id: 'PT-1028',
    name: 'Olivia Davis',
    age: 29,
    dob: '18 Dec 1997',
    gender: 'Female',
    bloodGroup: 'O-',
    phone: '+1 555-0177',
    email: 'olivia.davis@email.com',
    address: '654 Birch Boulevard, Springfield',
    emergencyContact: {
      name: 'Mark Davis',
      relationship: 'Father',
      phone: '+1 555-0977'
    },
    status: 'Active',
    imageUrl: '',
    lastVisit: '16 Jul 2026',
    appointmentsCount: 3,
    prescriptionsCount: 1,
    medicalReportsCount: 2,
    medicalHistory: [],
    medications: []
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1024',
    patientName: 'Emma Wilson',
    patientId: 'PT-1024',
    doctorName: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    date: '2026-07-22',
    time: '09:30 AM',
    status: 'Confirmed',
    symptoms: 'Routine cardiovascular checkup and blood pressure monitoring.',
    consultationFee: 160
  },
  {
    id: 'APT-1023',
    patientName: 'John Smith',
    patientId: 'PT-1029',
    doctorName: 'Dr. Michael Brown',
    department: 'Neurology',
    date: '2026-07-15',
    time: '10:15 AM',
    status: 'Completed',
    symptoms: 'Persistent tension headaches and sleep monitoring evaluation.',
    consultationFee: 175
  },
  {
    id: 'APT-1022',
    patientName: 'Olivia Davis',
    patientId: 'PT-1028',
    doctorName: 'Dr. Emily Carter',
    department: 'Orthopedics',
    date: '2026-07-16',
    time: '11:00 AM',
    status: 'Pending',
    symptoms: 'Right knee joint pain following treadmill exercise.',
    consultationFee: 180
  },
  {
    id: 'APT-1021',
    patientName: 'David Miller',
    patientId: 'PT-1030',
    doctorName: 'Dr. Robert Chen',
    department: 'Cardiology',
    date: '2026-07-14',
    time: '02:45 PM',
    status: 'Cancelled',
    symptoms: 'Chest tightness, rescheduled due to travel conflict.',
    consultationFee: 150
  },
  {
    id: 'APT-1020',
    patientName: 'Alex Lawson',
    patientId: 'PT-1025',
    doctorName: 'Dr. Sarah Jenkins',
    department: 'Cardiology',
    date: '2026-10-24',
    time: '09:30 AM',
    status: 'Confirmed',
    symptoms: 'High cholesterol consultation.',
    consultationFee: 200
  },
  {
    id: 'APT-1019',
    patientName: 'Maria Rodriguez',
    patientId: 'PT-1026',
    doctorName: 'Dr. Michael Brown',
    department: 'Neurology',
    date: '2026-10-24',
    time: '10:15 AM',
    status: 'Pending',
    symptoms: 'Numbness in left hand.',
    consultationFee: 175
  },
  {
    id: 'APT-1018',
    patientName: 'James Smith',
    patientId: 'PT-1027',
    doctorName: 'Dr. Emily Carter',
    department: 'Orthopedics',
    date: '2026-10-24',
    time: '11:00 AM',
    status: 'Cancelled',
    symptoms: 'Back pain assessment.',
    consultationFee: 180
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  { id: 'dep-1', name: 'Cardiology', floor: 'Floor 2', doctorCount: 15, headDoctor: 'Dr. Sarah Johnson', icon: 'stethoscope' },
  { id: 'dep-2', name: 'Neurology', floor: 'Floor 3', doctorCount: 12, headDoctor: 'Dr. Michael Brown', icon: 'neurology' },
  { id: 'dep-3', name: 'Orthopedics', floor: 'Floor 1', doctorCount: 10, headDoctor: 'Dr. Emily Carter', icon: 'orthopedics' },
  { id: 'dep-4', name: 'Pediatrics', floor: 'Floor 4', doctorCount: 14, headDoctor: 'Dr. Lisa Ray', icon: 'child_care' },
  { id: 'dep-5', name: 'General Surgery', floor: 'Floor 5', doctorCount: 18, headDoctor: 'Dr. David Miller', icon: 'medical_services' },
  { id: 'dep-6', name: 'Emergency & Trauma', floor: 'Ground Floor', doctorCount: 22, headDoctor: 'Dr. Sarah Jenkins', icon: 'emergency' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif-1', title: 'New Appointment Booked', message: 'Emma Wilson booked an appointment with Dr. Sarah Johnson.', time: '10 mins ago', read: false, type: 'info' },
  { id: 'notif-2', title: 'Emergency Alert', message: 'New trauma patient admitted in Bay 3.', time: '25 mins ago', read: false, type: 'alert' },
  { id: 'notif-3', title: 'Schedule Updated', message: 'Dr. Robert Chen modified availability for tomorrow.', time: '1 hour ago', read: true, type: 'info' },
  { id: 'notif-4', title: 'Lab Report Ready', message: 'Blood test results for John Smith (APT-1023) filed.', time: '2 hours ago', read: true, type: 'success' }
];
