import React, { useState } from 'react';
import { Appointment, AppointmentStatus, NavigationTab } from '../types';

interface AppointmentHistoryViewProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, newStatus: AppointmentStatus) => void;
  onDeleteAppointment: (id: string) => void;
  setActiveTab: (tab: NavigationTab) => void;
  onBookAppointmentClick: () => void;
}

export const AppointmentHistoryView: React.FC<AppointmentHistoryViewProps> = ({
  appointments,
  onUpdateStatus,
  onDeleteAppointment,
  setActiveTab,
  onBookAppointmentClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (apt.symptoms && apt.symptoms.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = departmentFilter === 'All' || apt.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesDate = !dateFilter || apt.date.includes(dateFilter);

    return matchesSearch && matchesDept && matchesStatus && matchesDate;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Patient,Doctor,Department,Date,Time,Status,Fee']
        .concat(
          filteredAppointments.map(
            (a) =>
              `"${a.id}","${a.patientName}","${a.doctorName}","${a.department}","${a.date}","${a.time}","${a.status}","${a.consultationFee || 150}"`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'medisync_appointments_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('All');
    setStatusFilter('All');
    setDateFilter('');
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Export CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
            Appointment History Log
          </h1>
          <p className="text-[14px] text-[#434655] dark:text-[#c3c6d7] mt-1">
            Track, audit, and export patient appointment records across hospital departments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="border border-[#c3c6d7] hover:bg-[#eff4ff] dark:hover:bg-[#0b1c30]/40 text-[#0b1c30] dark:text-[#f8f9ff] px-4 py-2.5 rounded-2xl font-semibold text-[14px] transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Export CSV</span>
          </button>
          <button
            onClick={onBookAppointmentClick}
            className="bg-[#2563eb] hover:bg-[#0053db] text-white px-5 py-2.5 rounded-2xl font-semibold text-[14px] shadow-sm transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#213145] p-5 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex justify-between items-center">
          <div>
            <span className="text-[12px] text-[#737686] font-semibold uppercase tracking-wider">
              Total Logged
            </span>
            <h3 className="text-[24px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mt-0.5">
              1,245
            </h3>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#213145] p-5 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex justify-between items-center">
          <div>
            <span className="text-[12px] text-[#737686] font-semibold uppercase tracking-wider">
              Scheduled Today
            </span>
            <h3 className="text-[24px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mt-0.5">
              58
            </h3>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#00687a]/10 text-[#00687a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">today</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#213145] p-5 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex justify-between items-center">
          <div>
            <span className="text-[12px] text-[#737686] font-semibold uppercase tracking-wider">
              Completed
            </span>
            <h3 className="text-[24px] font-bold text-[#007e37] mt-0.5">
              980
            </h3>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#4ae176]/20 text-[#007e37] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">task_alt</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#213145] p-5 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex justify-between items-center">
          <div>
            <span className="text-[12px] text-[#737686] font-semibold uppercase tracking-wider">
              Cancelled
            </span>
            <h3 className="text-[24px] font-bold text-[#ba1a1a] mt-0.5">
              42
            </h3>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">cancel</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar Card */}
      <div className="bg-white dark:bg-[#213145] p-5 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient, ID, doctor..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7] dark:border-[#737686]/50 rounded-xl text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] outline-none focus:border-[#2563eb]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#f8f9ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7] dark:border-[#737686]/50 rounded-xl text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
          >
            <option value="All">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Surgery">General Surgery</option>
            <option value="Emergency & Trauma">Emergency & Trauma</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#f8f9ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7] dark:border-[#737686]/50 rounded-xl text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Date Picker Filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 bg-[#f8f9ff] dark:bg-[#0b1c30]/50 border border-[#c3c6d7] dark:border-[#737686]/50 rounded-xl text-[14px] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
          />

          <button
            onClick={handleResetFilters}
            className="px-4 py-2.5 border border-[#c3c6d7] hover:bg-[#eff4ff] text-[#434655] dark:text-[#c3c6d7] rounded-xl text-[14px] font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Appointment History Table Card */}
      <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#c3c6d7]/30 text-[12px] uppercase text-[#737686] tracking-wider font-semibold">
                <th className="pb-3.5 px-3">Appointment ID</th>
                <th className="pb-3.5 px-3">Patient Name</th>
                <th className="pb-3.5 px-3">Doctor & Dept</th>
                <th className="pb-3.5 px-3">Date & Time</th>
                <th className="pb-3.5 px-3">Status</th>
                <th className="pb-3.5 px-3">Fee</th>
                <th className="pb-3.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20 text-[14px]">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-[#eff4ff]/50 dark:hover:bg-[#0b1c30]/40 transition-colors">
                  <td className="py-4 px-3 font-semibold text-[#2563eb]">
                    {apt.id}
                  </td>

                  <td className="py-4 px-3">
                    <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff] block">
                      {apt.patientName}
                    </span>
                    {apt.patientPhone && (
                      <span className="text-[12px] text-[#737686]">{apt.patientPhone}</span>
                    )}
                  </td>

                  <td className="py-4 px-3">
                    <span className="font-medium text-[#0b1c30] dark:text-[#f8f9ff] block">
                      {apt.doctorName}
                    </span>
                    <span className="text-[12px] text-[#2563eb]">{apt.department}</span>
                  </td>

                  <td className="py-4 px-3 text-[#434655] dark:text-[#c3c6d7] text-[13px]">
                    <div>{apt.date}</div>
                    <div className="text-[11px] text-[#737686]">{apt.time}</div>
                  </td>

                  <td className="py-4 px-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold inline-block ${
                        apt.status === 'Confirmed'
                          ? 'bg-[#2563eb]/10 text-[#004ac6] dark:text-[#b4c5ff]'
                          : apt.status === 'Completed'
                          ? 'bg-[#4ae176]/20 text-[#007e37]'
                          : apt.status === 'Pending'
                          ? 'bg-[#f59e0b]/10 text-[#b45309]'
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>

                  <td className="py-4 px-3 font-semibold text-[#0b1c30] dark:text-[#f8f9ff]">
                    ${apt.consultationFee || 160}.00
                  </td>

                  <td className="py-4 px-3 text-right relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === apt.id ? null : apt.id)}
                      className="p-1.5 rounded-lg hover:bg-[#c3c6d7]/30 text-[#434655] dark:text-[#c3c6d7]"
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>

                    {/* Context Action Menu */}
                    {openMenuId === apt.id && (
                      <div className="absolute right-3 mt-1 w-44 bg-white dark:bg-[#213145] rounded-2xl shadow-xl border border-[#c3c6d7]/50 py-2 z-50 animate-in fade-in zoom-in-95 text-left">
                        <button
                          onClick={() => {
                            onUpdateStatus(apt.id, 'Completed');
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#007e37] hover:bg-[#eff4ff] flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          <span>Mark Completed</span>
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(apt.id, 'Confirmed');
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#2563eb] hover:bg-[#eff4ff] flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">event_available</span>
                          <span>Confirm Slot</span>
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(apt.id, 'Cancelled');
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">cancel</span>
                          <span>Cancel Appointment</span>
                        </button>
                        <div className="border-t border-[#c3c6d7]/30 my-1"></div>
                        <button
                          onClick={() => {
                            onDeleteAppointment(apt.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-2 font-semibold"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          <span>Delete Record</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-[48px] text-[#737686] mb-2">
              event_busy
            </span>
            <p className="text-[16px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
              No appointment history records found
            </p>
            <p className="text-[14px] text-[#737686] mt-1 mb-4">
              Try clearing search filters or book a new appointment.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 bg-[#2563eb] text-white rounded-xl text-[14px] font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
