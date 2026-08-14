import React, { useState } from 'react';
import { Patient, MedicationItem } from '../types';

interface PatientProfileViewProps {
  patient: Patient;
  onOpenAddMedicationModal: () => void;
  onBackToPatientsClick?: () => void;
  onBookAppointmentForPatient: (patient: Patient) => void;
}

export const PatientProfileView: React.FC<PatientProfileViewProps> = ({
  patient,
  onOpenAddMedicationModal,
  onBackToPatientsClick,
  onBookAppointmentForPatient,
}) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Medical History' | 'Medications' | 'Reports'>('Overview');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-[14px] text-[#737686]">
        {onBackToPatientsClick && (
          <>
            <span
              className="hover:text-[#0b1c30] cursor-pointer"
              onClick={onBackToPatientsClick}
            >
              Patients
            </span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </>
        )}
        <span className="font-semibold text-[#2563eb]">
          {patient.name} (ID: {patient.id})
        </span>
      </div>

      {/* Patient Profile Header Banner */}
      <div className="bg-white dark:bg-[#213145] p-6 md:p-8 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={patient.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={patient.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-[#2563eb]/20 shadow-md"
          />

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[26px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                {patient.name}
              </h1>
              <span className="px-3 py-1 bg-[#4ae176]/20 text-[#007e37] rounded-full text-[12px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#007e37]"></span>
                {patient.status} Patient
              </span>
            </div>

            <p className="text-[14px] text-[#434655] dark:text-[#c3c6d7] mt-1 flex flex-wrap items-center gap-3">
              <span>Patient ID: <strong className="text-[#0b1c30] dark:text-[#f8f9ff]">{patient.id}</strong></span>
              <span>•</span>
              <span>Blood Group: <strong className="text-[#ba1a1a]">{patient.bloodGroup}</strong></span>
              <span>•</span>
              <span>{patient.gender}, {patient.age} Yrs</span>
            </p>

            {/* Stat Counters */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-[13px] text-[#434655] dark:text-[#c3c6d7]">
              <div className="bg-[#eff4ff] dark:bg-[#0b1c30]/50 px-3 py-1.5 rounded-xl border border-[#c3c6d7]/30">
                <span className="font-bold text-[#2563eb]">{patient.appointmentsCount}</span> Appointments
              </div>
              <div className="bg-[#eff4ff] dark:bg-[#0b1c30]/50 px-3 py-1.5 rounded-xl border border-[#c3c6d7]/30">
                <span className="font-bold text-[#00687a]">{patient.prescriptionsCount}</span> Prescriptions
              </div>
              <div className="bg-[#eff4ff] dark:bg-[#0b1c30]/50 px-3 py-1.5 rounded-xl border border-[#c3c6d7]/30">
                <span className="font-bold text-[#006229]">{patient.medicalReportsCount}</span> Medical Reports
              </div>
            </div>
          </div>
        </div>

        {/* Header Action Button */}
        <button
          onClick={() => onBookAppointmentForPatient(patient)}
          className="bg-[#2563eb] hover:bg-[#0053db] text-white px-5 py-3 rounded-2xl font-semibold text-[14px] shadow-sm transition-all flex items-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          <span>Schedule Appointment</span>
        </button>
      </div>

      {/* Main Grid Layout (2 Equal Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
            <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2 pb-3 border-b border-[#c3c6d7]/30">
              <span className="material-symbols-outlined text-[#2563eb]">badge</span>
              Personal & Emergency Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
              <div>
                <span className="text-[12px] text-[#737686] block font-semibold uppercase tracking-wider">
                  Date of Birth
                </span>
                <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                  {patient.dob} ({patient.age} Years)
                </span>
              </div>

              <div>
                <span className="text-[12px] text-[#737686] block font-semibold uppercase tracking-wider">
                  Phone Number
                </span>
                <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                  {patient.phone}
                </span>
              </div>

              <div>
                <span className="text-[12px] text-[#737686] block font-semibold uppercase tracking-wider">
                  Email Address
                </span>
                <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                  {patient.email}
                </span>
              </div>

              <div>
                <span className="text-[12px] text-[#737686] block font-semibold uppercase tracking-wider">
                  Residential Address
                </span>
                <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                  {patient.address}
                </span>
              </div>
            </div>

            {/* Emergency Contact Highlight Box */}
            <div className="p-4 bg-[#ffdad6]/40 dark:bg-[#ba1a1a]/10 rounded-2xl border border-[#ffdad6] dark:border-[#ba1a1a]/30">
              <span className="text-[12px] text-[#ba1a1a] font-bold block uppercase tracking-wider">
                Emergency Contact
              </span>
              <p className="text-[15px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mt-0.5">
                {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
              </p>
              <p className="text-[13px] text-[#ba1a1a] font-semibold mt-0.5">
                📞 {patient.emergencyContact.phone}
              </p>
            </div>
          </div>

          {/* Medical History Timeline Card */}
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
            <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2 pb-3 border-b border-[#c3c6d7]/30">
              <span className="material-symbols-outlined text-[#00687a]">history_edu</span>
              Medical History & Allergies
            </h3>

            {/* Severe Allergy Alert Banner if present */}
            {patient.medicalHistory.some((m) => m.isAlert) && (
              <div className="p-4 bg-[#ffdad6] text-[#93000a] rounded-2xl border-2 border-[#ba1a1a] flex items-start gap-3 animate-pulse">
                <span className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">
                  warning
                </span>
                <div>
                  <h4 className="font-bold text-[14px]">CRITICAL ALLERGY ALERT</h4>
                  <p className="text-[13px] mt-0.5 leading-snug">
                    Severe allergic reaction to Penicillin and beta-lactam derivatives. Do NOT prescribe.
                  </p>
                </div>
              </div>
            )}

            {/* Timeline Items */}
            <div className="space-y-4 pt-2">
              {patient.medicalHistory.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-colors ${
                    item.isAlert
                      ? 'bg-[#ffdad6]/20 border-[#ba1a1a]/40'
                      : 'bg-[#eff4ff] dark:bg-[#0b1c30]/40 border-[#c3c6d7]/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[15px] text-[#0b1c30] dark:text-[#f8f9ff]">
                        {item.title}
                      </h4>
                      <span className="text-[12px] font-semibold text-[#2563eb]">{item.type}</span>
                    </div>
                    <span className="text-[12px] font-bold bg-white dark:bg-[#213145] px-2.5 py-1 rounded-full border border-[#c3c6d7]/40 text-[#434655]">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#434655] dark:text-[#c3c6d7] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Medications Card with Progress Bars */}
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#c3c6d7]/30">
              <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006229]">pill</span>
                Current Active Medications
              </h3>
              <button
                onClick={onOpenAddMedicationModal}
                className="text-[13px] font-semibold text-[#2563eb] hover:text-[#004ac6] flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add Medication</span>
              </button>
            </div>

            <div className="space-y-4">
              {patient.medications.map((med) => (
                <div
                  key={med.id}
                  className="p-4 rounded-2xl bg-[#eff4ff] dark:bg-[#0b1c30]/40 border border-[#c3c6d7]/30 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[15px] text-[#0b1c30] dark:text-[#f8f9ff]">
                        {med.name} <span className="text-[13px] font-normal text-[#2563eb]">({med.dosage})</span>
                      </h4>
                      <p className="text-[12px] text-[#434655] dark:text-[#c3c6d7]">
                        {med.frequency} • {med.duration}
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#4ae176]/20 text-[#007e37]">
                      {med.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-[#737686] mb-1">
                      <span>Course Adherence Progress</span>
                      <span>{med.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#c3c6d7]/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2563eb] rounded-full transition-all duration-500"
                        style={{ width: `${med.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Consultation Widget */}
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
            <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2 pb-3 border-b border-[#c3c6d7]/30">
              <span className="material-symbols-outlined text-[#2563eb]">event_available</span>
              Upcoming Consultation
            </h3>

            <div className="p-5 rounded-2xl bg-[#eff4ff] dark:bg-[#0b1c30]/50 border-2 border-[#2563eb]/20 space-y-3">
              <div className="flex items-center gap-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2nRHCNy2I4QSwDxqmd8L2j_cLpj17yqwDFnhwk-LDHc16b1CVn_mlRDjwme7te4gNcnYORmlhjqAv8ACM1qTQ8i6HTtxBwADMWTb8kCbmi3jWqPH3VUmlgC0xFjIWsJL4SiRkPF1Gr9N5PHYGNdhuxMGjb0rGIsp3qTDZJITlUd6Q2i8vMCXt0oyx9Mcr581cTPbbWn-TvBgKNPOZxjnrWqoDlrx7gefW3jv5b0wGjg18zbdvPQ_kug"
                  alt="Dr. Sarah Johnson"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#2563eb]"
                />
                <div>
                  <h4 className="font-bold text-[15px] text-[#0b1c30] dark:text-[#f8f9ff]">
                    Dr. Sarah Johnson
                  </h4>
                  <p className="text-[13px] text-[#2563eb] font-semibold">Cardiology Department</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[13px] pt-2 border-t border-[#c3c6d7]/30">
                <div>
                  <span className="text-[#737686] block text-[11px]">Date & Time</span>
                  <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                    22 Jul 2026 at 09:30 AM
                  </span>
                </div>
                <div>
                  <span className="text-[#737686] block text-[11px]">Location</span>
                  <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                    Room 304, Floor 2
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
