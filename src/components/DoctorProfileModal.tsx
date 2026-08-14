import React from 'react';
import { Doctor } from '../types';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookAppointment: (doc: Doctor) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  onBookAppointment,
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#213145] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#c3c6d7]/30">
        <div className="flex justify-between items-start pb-4 border-b border-[#c3c6d7]/30">
          <div className="flex items-center gap-4">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#2563eb]/20 shadow-sm"
            />
            <div>
              <h3 className="text-[20px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                {doctor.name}
              </h3>
              <p className="text-[14px] font-medium text-[#2563eb]">{doctor.department}</p>
              <div className="flex items-center gap-2 mt-1 text-[12px] text-[#434655] dark:text-[#c3c6d7]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#007e37] icon-filled">
                    star
                  </span>
                  <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                    {doctor.rating}
                  </span>
                  <span>({doctor.reviewCount} reviews)</span>
                </span>
                <span>•</span>
                <span>{doctor.experienceYears} Years Exp</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-[#737686] hover:text-[#0b1c30]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="bg-[#eff4ff] dark:bg-[#0b1c30]/50 p-4 rounded-xl border border-[#c3c6d7]/30 flex justify-between items-center">
            <div>
              <span className="text-[12px] text-[#737686] block uppercase tracking-wider font-semibold">
                Consultation Fee
              </span>
              <span className="text-[22px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                ${doctor.consultationFee}.00
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                doctor.status === 'Available Today'
                  ? 'bg-[#4ae176]/20 text-[#007e37]'
                  : doctor.status === 'Busy'
                  ? 'bg-[#ffdad6] text-[#93000a]'
                  : 'bg-[#c3c6d7]/30 text-[#434655]'
              }`}
            >
              {doctor.status}
            </span>
          </div>

          <div>
            <h4 className="text-[14px] font-semibold text-[#0b1c30] dark:text-[#f8f9ff] mb-1">
              About & Specialty
            </h4>
            <p className="text-[14px] text-[#434655] dark:text-[#c3c6d7] leading-relaxed">
              {doctor.bio}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-[#f8f9ff] dark:bg-[#0b1c30]/40 rounded-xl border border-[#c3c6d7]/30">
              <span className="text-[11px] text-[#737686] block">Direct Email</span>
              <span className="text-[13px] font-medium text-[#0b1c30] dark:text-[#f8f9ff] truncate block">
                {doctor.email}
              </span>
            </div>
            <div className="p-3 bg-[#f8f9ff] dark:bg-[#0b1c30]/40 rounded-xl border border-[#c3c6d7]/30">
              <span className="text-[11px] text-[#737686] block">Office Phone</span>
              <span className="text-[13px] font-medium text-[#0b1c30] dark:text-[#f8f9ff] block">
                {doctor.phone}
              </span>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#c3c6d7] text-[#434655] dark:text-[#c3c6d7] font-medium text-[14px]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAppointment(doctor);
              }}
              disabled={doctor.status === 'Busy' || doctor.status === 'On Leave'}
              className="px-6 py-2.5 rounded-xl bg-[#2563eb] text-white hover:bg-[#0053db] transition-colors font-semibold text-[14px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
