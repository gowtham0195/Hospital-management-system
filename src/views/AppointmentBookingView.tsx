import React, { useState } from 'react';
import { Appointment, Doctor, Patient } from '../types';

interface AppointmentBookingViewProps {
  doctors: Doctor[];
  patients: Patient[];
  onBookAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  onCancel: () => void;
  preselectedDoctor?: Doctor | null;
}

export const AppointmentBookingView: React.FC<AppointmentBookingViewProps> = ({
  doctors,
  patients,
  onBookAppointment,
  onCancel,
  preselectedDoctor,
}) => {
  const [patientName, setPatientName] = useState('Emma Wilson');
  const [patientPhone, setPatientPhone] = useState('+1 (555) 0123');
  const [patientEmail, setPatientEmail] = useState('emma.w@email.com');
  const [patientType, setPatientType] = useState<'Existing' | 'New'>('Existing');

  const [selectedDepartment, setSelectedDepartment] = useState(
    preselectedDoctor ? preselectedDoctor.department : 'Cardiology'
  );

  const filteredDoctors = doctors.filter((d) => d.department === selectedDepartment);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preselectedDoctor ? preselectedDoctor.id : (filteredDoctors[0]?.id || doctors[0].id)
  );

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  const [selectedDate, setSelectedDate] = useState('2026-10-24');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:30 AM');
  const [symptoms, setSymptoms] = useState('Routine cardiovascular checkup and blood pressure evaluation.');

  const availableTimeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
  ];

  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept);
    const newFiltered = doctors.filter((d) => d.department === dept);
    if (newFiltered.length > 0) {
      setSelectedDoctorId(newFiltered[0].id);
    }
  };

  const handleSelectPatient = (p: Patient) => {
    setPatientName(p.name);
    setPatientPhone(p.phone);
    setPatientEmail(p.email);
    setPatientType('Existing');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    onBookAppointment({
      patientName,
      patientPhone,
      doctorName: selectedDoctor.name,
      doctorId: selectedDoctor.id,
      department: selectedDoctor.department,
      date: selectedDate,
      time: selectedTimeSlot,
      status: 'Confirmed',
      symptoms,
      consultationFee: selectedDoctor.consultationFee,
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-[14px] text-[#737686]">
        <span className="hover:text-[#0b1c30] cursor-pointer" onClick={onCancel}>
          Appointments
        </span>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="font-semibold text-[#2563eb]">New Appointment</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Patient Details */}
            <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#c3c6d7]/30">
                <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[13px] font-bold">
                    1
                  </span>
                  Patient Information
                </h3>

                <div className="flex bg-[#eff4ff] dark:bg-[#0b1c30] p-1 rounded-xl text-[12px] font-medium">
                  <button
                    type="button"
                    onClick={() => setPatientType('Existing')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      patientType === 'Existing'
                        ? 'bg-white dark:bg-[#2563eb] text-[#004ac6] dark:text-white font-semibold shadow-sm'
                        : 'text-[#434655]'
                    }`}
                  >
                    Existing Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPatientType('New');
                      setPatientName('');
                      setPatientPhone('');
                      setPatientEmail('');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      patientType === 'New'
                        ? 'bg-white dark:bg-[#2563eb] text-[#004ac6] dark:text-white font-semibold shadow-sm'
                        : 'text-[#434655]'
                    }`}
                  >
                    New Patient
                  </button>
                </div>
              </div>

              {/* Quick Select Existing Patient */}
              {patientType === 'Existing' && (
                <div>
                  <label className="block text-[13px] font-semibold text-[#737686] mb-2 uppercase tracking-wider">
                    Select Recent Patient
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {patients.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectPatient(p)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] border transition-all shrink-0 ${
                          patientName === p.name
                            ? 'bg-[#2563eb]/10 border-[#2563eb] text-[#004ac6] dark:text-[#b4c5ff] font-bold'
                            : 'bg-[#f8f9ff] dark:bg-[#0b1c30]/40 border-[#c3c6d7]/40 text-[#434655]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">account_circle</span>
                        <span>{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Emma Wilson"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="patient@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>

            {/* Step 2: Department & Doctor Selection */}
            <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
              <div className="pb-3 border-b border-[#c3c6d7]/30">
                <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[13px] font-bold">
                    2
                  </span>
                  Department & Doctor Selection
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb]"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Emergency & Trauma">Emergency & Trauma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                    Assigned Clinician
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb]"
                  >
                    {filteredDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} (${doc.consultationFee}) - {doc.status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slot Date Picker & Time Slot Pills */}
              <div className="space-y-3 pt-2">
                <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7]">
                  Select Consultation Date & Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
                  />
                  <div className="flex items-center text-[13px] text-[#007e37] bg-[#4ae176]/20 px-3 py-2 rounded-xl font-medium">
                    <span className="material-symbols-outlined text-[18px] mr-2">check_circle</span>
                    <span>12 Slots Available Today</span>
                  </div>
                </div>

                {/* Time Slot Buttons */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-2">
                  {availableTimeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-3 rounded-xl text-[13px] font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#2563eb] text-white shadow-sm scale-[1.02]'
                            : 'bg-[#f8f9ff] dark:bg-[#0b1c30]/40 text-[#0b1c30] dark:text-[#f8f9ff] border border-[#c3c6d7]/40 hover:bg-[#eff4ff]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Symptoms / Reason */}
            <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
              <div className="pb-3 border-b border-[#c3c6d7]/30">
                <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[13px] font-bold">
                    3
                  </span>
                  Symptoms & Clinical Notes
                </h3>
              </div>

              <div>
                <textarea
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe patient chief complaint, symptoms, or reason for visit..."
                  className="w-full p-4 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb] resize-none"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right Column (1 Col): Appointment Summary Card */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-6 sticky top-24">
            <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] pb-3 border-b border-[#c3c6d7]/30">
              Appointment Summary
            </h3>

            {/* Doctor Card Banner */}
            <div className="flex items-center gap-4 bg-[#eff4ff] dark:bg-[#0b1c30]/50 p-4 rounded-2xl border border-[#c3c6d7]/30">
              <img
                src={selectedDoctor.imageUrl}
                alt={selectedDoctor.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#2563eb]"
              />
              <div>
                <h4 className="font-bold text-[15px] text-[#0b1c30] dark:text-[#f8f9ff]">
                  {selectedDoctor.name}
                </h4>
                <p className="text-[13px] text-[#2563eb] font-semibold">{selectedDoctor.department}</p>
                <div className="flex items-center gap-1 text-[12px] text-[#007e37] font-medium mt-0.5">
                  <span className="material-symbols-outlined text-[14px] icon-filled">star</span>
                  <span>{selectedDoctor.rating} Rating</span>
                </div>
              </div>
            </div>

            {/* Scheduled Time Display */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#737686]">Scheduled Date</span>
                <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#737686]">Time Slot</span>
                <span className="font-semibold text-[#2563eb]">{selectedTimeSlot}</span>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="border-t border-b border-[#c3c6d7]/30 py-4 space-y-2">
              <div className="flex justify-between text-[14px] text-[#434655] dark:text-[#c3c6d7]">
                <span>Consultation Fee</span>
                <span>${selectedDoctor.consultationFee}.00</span>
              </div>
              <div className="flex justify-between text-[14px] text-[#434655] dark:text-[#c3c6d7]">
                <span>Hospital Facility Fee</span>
                <span>$15.00</span>
              </div>
              <div className="flex justify-between text-[16px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] pt-2 border-t border-[#c3c6d7]/20">
                <span>Total Payment</span>
                <span className="text-[#2563eb]">${selectedDoctor.consultationFee + 15}.00</span>
              </div>
            </div>

            {/* Quick Notice */}
            <div className="bg-[#f8f9ff] dark:bg-[#0b1c30]/40 p-3 rounded-xl border border-[#c3c6d7]/30 text-[12px] text-[#434655] dark:text-[#c3c6d7] flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#2563eb] shrink-0 mt-0.5">
                info
              </span>
              <span>Please arrive 15 minutes prior to your slot for initial vitals screening.</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleSubmit}
                className="w-full py-3.5 bg-[#2563eb] hover:bg-[#0053db] text-white rounded-xl font-bold text-[15px] shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Confirm & Book Appointment</span>
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-full py-3 border border-[#c3c6d7] text-[#434655] dark:text-[#c3c6d7] hover:bg-[#eff4ff] rounded-xl font-semibold text-[14px] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
