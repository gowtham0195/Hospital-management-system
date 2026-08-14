import React, { useState } from 'react';
import { Doctor } from '../types';

interface DoctorManagementViewProps {
  doctors: Doctor[];
  onBookAppointment: (doctor: Doctor) => void;
  onViewProfile: (doctor: Doctor) => void;
  onOpenAddDoctorModal: () => void;
}

export const DoctorManagementView: React.FC<DoctorManagementViewProps> = ({
  doctors,
  onBookAppointment,
  onViewProfile,
  onOpenAddDoctorModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.bio && doc.bio.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = departmentFilter === 'All' || doc.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || doc.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('All');
    setStatusFilter('All');
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Title & Add Doctor CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
            Doctor Directory & Management
          </h1>
          <p className="text-[14px] text-[#434655] dark:text-[#c3c6d7] mt-1">
            Browse clinicians, check availability, and manage staff records
          </p>
        </div>

        <button
          onClick={onOpenAddDoctorModal}
          className="bg-[#2563eb] hover:bg-[#0053db] text-white px-5 py-3 rounded-2xl font-semibold text-[14px] shadow-sm transition-all flex items-center gap-2 shrink-0 active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Filter Toolbar Card */}
      <div className="bg-white dark:bg-[#213145] p-5 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctor name or specialty..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7] dark:border-[#737686]/50 rounded-xl text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Department Select */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#f8f9ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7] dark:border-[#737686]/50 rounded-xl text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb]"
          >
            <option value="All">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Surgery">General Surgery</option>
            <option value="Emergency & Trauma">Emergency & Trauma</option>
          </select>

          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#f8f9ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7] dark:border-[#737686]/50 rounded-xl text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb]"
          >
            <option value="All">All Statuses</option>
            <option value="Available Today">Available Today</option>
            <option value="Busy">Busy</option>
            <option value="On Leave">On Leave</option>
          </select>

          {/* Reset Filters Button */}
          <button
            onClick={handleResetFilters}
            className="px-4 py-2.5 border border-[#c3c6d7] hover:bg-[#eff4ff] dark:hover:bg-[#0b1c30]/40 text-[#434655] dark:text-[#c3c6d7] rounded-xl text-[14px] font-medium transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Doctor Cards Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-[#213145] rounded-3xl p-6 card-shadow border border-[#c3c6d7]/30 flex flex-col justify-between hover:shadow-lg transition-all group"
          >
            <div>
              {/* Card Header: Photo + Name + Dept + Status Badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#2563eb]/30 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-bold text-[16px] text-[#0b1c30] dark:text-[#f8f9ff] leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-[13px] font-semibold text-[#2563eb] mt-0.5">
                      {doc.department}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[12px] text-[#007e37] font-semibold">
                      <span className="material-symbols-outlined text-[15px] icon-filled">star</span>
                      <span>{doc.rating}</span>
                      <span className="text-[#737686] font-normal">({doc.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-[12px] font-semibold inline-flex items-center gap-1.5 ${
                    doc.status === 'Available Today'
                      ? 'bg-[#4ae176]/20 text-[#007e37]'
                      : doc.status === 'Busy'
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : 'bg-[#c3c6d7]/30 text-[#434655]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      doc.status === 'Available Today'
                        ? 'bg-[#007e37]'
                        : doc.status === 'Busy'
                        ? 'bg-[#ba1a1a]'
                        : 'bg-[#737686]'
                    }`}
                  ></span>
                  {doc.status}
                </span>
              </div>

              {/* Bio snippet */}
              <p className="text-[13px] text-[#434655] dark:text-[#c3c6d7] line-clamp-2 mb-4 leading-relaxed">
                {doc.bio}
              </p>

              {/* Meta Stats */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-[#eff4ff] dark:bg-[#0b1c30]/40 rounded-2xl border border-[#c3c6d7]/20 text-[12px] mb-5">
                <div>
                  <span className="text-[#737686] block">Experience</span>
                  <span className="font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                    {doc.experienceYears} Years
                  </span>
                </div>
                <div>
                  <span className="text-[#737686] block">Consultation</span>
                  <span className="font-bold text-[#2563eb]">${doc.consultationFee} / session</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => onViewProfile(doc)}
                className="py-2.5 px-3 border border-[#c3c6d7] hover:bg-[#f8f9ff] dark:hover:bg-[#0b1c30]/40 text-[#434655] dark:text-[#c3c6d7] rounded-xl font-semibold text-[13px] transition-colors text-center"
              >
                View Profile
              </button>
              <button
                onClick={() => onBookAppointment(doc)}
                disabled={doc.status === 'Busy' || doc.status === 'On Leave'}
                className="py-2.5 px-3 bg-[#2563eb] hover:bg-[#0053db] text-white rounded-xl font-semibold text-[13px] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-center"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="bg-white dark:bg-[#213145] p-12 rounded-3xl text-center card-shadow border border-[#c3c6d7]/30">
          <span className="material-symbols-outlined text-[48px] text-[#737686] mb-2">
            search_off
          </span>
          <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
            No doctors found matching filters
          </h3>
          <p className="text-[14px] text-[#737686] mt-1 mb-4">
            Try adjusting your search keywords or reset department filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl font-semibold text-[14px]"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
