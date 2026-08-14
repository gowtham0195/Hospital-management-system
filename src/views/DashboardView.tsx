import React, { useState } from 'react';
import { Appointment, Doctor, Patient, NavigationTab } from '../types';

interface DashboardViewProps {
  appointments: Appointment[];
  doctors: Doctor[];
  patients: Patient[];
  setActiveTab: (tab: NavigationTab) => void;
  onBookAppointmentClick: () => void;
  onSelectPatient: (patient: Patient) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  appointments,
  doctors,
  patients,
  setActiveTab,
  onBookAppointmentClick,
  onSelectPatient,
}) => {
  const [chartTimeframe, setChartTimeframe] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(6);

  // Chart data
  const monthlyData = [
    { label: 'Jan', val: 780 },
    { label: 'Feb', val: 890 },
    { label: 'Mar', val: 950 },
    { label: 'Apr', val: 1020 },
    { label: 'May', val: 1100 },
    { label: 'Jun', val: 1180 },
    { label: 'Jul', val: 1245 },
  ];

  const totalPatients = patients.length + 1240;
  const todayAppointments = appointments.filter((a) => a.date.includes('2026-07-22') || a.date.includes('2026-10-24') || a.status === 'Confirmed' || a.status === 'Pending').length + 35;
  const availableDoctors = doctors.filter((d) => d.status === 'Available Today').length;

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30">
        <div>
          <h1 className="text-[26px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
            Good Morning, Dr. Jenkins 👋
          </h1>
          <p className="text-[14px] text-[#434655] dark:text-[#c3c6d7] mt-1">
            Here is what's happening at Metro General Hospital today.
          </p>
        </div>
        <button
          onClick={onBookAppointmentClick}
          className="bg-[#2563eb] hover:bg-[#0053db] text-white px-5 py-3 rounded-2xl text-[14px] font-semibold shadow-sm transition-all flex items-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Stats Cards Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1: Total Patients */}
        <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[13px] text-[#434655] dark:text-[#c3c6d7] font-medium">
                Total Patients
              </span>
              <h3 className="text-[28px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mt-1">
                {totalPatients.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#2563eb]/10 text-[#004ac6] dark:text-[#b4c5ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">group</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[13px]">
            <span className="text-[#007e37] bg-[#4ae176]/20 font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12%
            </span>
            <span className="text-[#737686]">vs last month</span>
          </div>
        </div>

        {/* Card 2: Appointments Today */}
        <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[13px] text-[#434655] dark:text-[#c3c6d7] font-medium">
                Appointments Today
              </span>
              <h3 className="text-[28px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mt-1">
                {todayAppointments}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#00687a]/10 text-[#00687a] dark:text-[#57dffe] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">calendar_today</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[13px]">
            <span className="text-[#007e37] bg-[#4ae176]/20 font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +5%
            </span>
            <span className="text-[#737686]">vs yesterday</span>
          </div>
        </div>

        {/* Card 3: Available Doctors */}
        <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[13px] text-[#434655] dark:text-[#c3c6d7] font-medium">
                Available Doctors
              </span>
              <h3 className="text-[28px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mt-1">
                {availableDoctors} / {doctors.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#006229]/10 text-[#006229] dark:text-[#4ae176] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">medical_services</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[13px]">
            <span className="text-[#737686]">On Duty across 6 Departments</span>
          </div>
        </div>

        {/* Card 4: Operations Efficiency */}
        <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[13px] text-[#434655] dark:text-[#c3c6d7] font-medium">
                Hospital Efficiency
              </span>
              <h3 className="text-[28px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mt-1">
                94.2%
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">monitoring</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[13px]">
            <span className="text-[#007e37] bg-[#4ae176]/20 font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +1.8%
            </span>
            <span className="text-[#737686]">optimal status</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section (Chart + Schedule Right Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hospital Statistics SVG Chart Card */}
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                  Hospital Patient Statistics
                </h3>
                <p className="text-[13px] text-[#434655] dark:text-[#c3c6d7]">
                  Monthly patient visit trends & volume
                </p>
              </div>

              {/* Timeframe Switcher */}
              <div className="flex items-center p-1 bg-[#eff4ff] dark:bg-[#0b1c30] rounded-xl text-[13px] font-medium text-[#434655]">
                {(['Day', 'Week', 'Month', 'Year'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setChartTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      chartTimeframe === tf
                        ? 'bg-white dark:bg-[#2563eb] text-[#004ac6] dark:text-white font-semibold shadow-sm'
                        : 'hover:text-[#0b1c30] dark:hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive SVG Line Chart */}
            <div className="relative h-64 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#c3c6d7" strokeOpacity="0.3" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#c3c6d7" strokeOpacity="0.3" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#c3c6d7" strokeOpacity="0.3" strokeDasharray="4 4" />

                {/* Smooth Curve Area */}
                <path
                  d="M 20 160 Q 90 130 160 110 T 300 80 T 440 30 L 440 180 L 20 180 Z"
                  fill="url(#chartGrad)"
                />

                {/* Smooth Curve Stroke */}
                <path
                  d="M 20 160 Q 90 130 160 110 T 300 80 T 440 30"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {monthlyData.map((d, i) => {
                  const x = 20 + i * 70;
                  // Normalized Y coordinate mapping
                  const y = 180 - ((d.val - 600) / 700) * 140;
                  const isHovered = hoveredPointIndex === i;

                  return (
                    <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredPointIndex(i)}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 7 : 5}
                        fill={isHovered ? '#2563eb' : '#ffffff'}
                        stroke="#2563eb"
                        strokeWidth={isHovered ? '3' : '2'}
                        className="transition-all duration-200"
                      />
                      {/* Tooltip on hover */}
                      {isHovered && (
                        <g transform={`translate(${x}, ${y - 35})`}>
                          <rect
                            x="-35"
                            y="-18"
                            width="70"
                            height="26"
                            rx="6"
                            fill="#0b1c30"
                            className="shadow-lg"
                          />
                          <text
                            x="0"
                            y="-1"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            {d.val} pts
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* X Axis Labels */}
              <div className="flex justify-between px-2 mt-2 text-[12px] text-[#737686] font-medium">
                {monthlyData.map((d, i) => (
                  <span key={i}>{d.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Appointments Table */}
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                  Recent Appointments
                </h3>
                <p className="text-[13px] text-[#434655] dark:text-[#c3c6d7]">
                  Latest consultations across hospital clinics
                </p>
              </div>
              <button
                onClick={() => setActiveTab('history')}
                className="text-[14px] font-semibold text-[#2563eb] hover:text-[#004ac6] flex items-center gap-1 transition-colors"
              >
                <span>View All History</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#c3c6d7]/30 text-[12px] uppercase text-[#737686] tracking-wider font-semibold">
                    <th className="pb-3 px-2">Patient</th>
                    <th className="pb-3 px-2">Doctor & Dept</th>
                    <th className="pb-3 px-2">Date & Time</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c3c6d7]/20 text-[14px]">
                  {appointments.slice(0, 5).map((apt) => {
                    const matchedPatient = patients.find((p) => p.name === apt.patientName) || patients[0];
                    return (
                      <tr key={apt.id} className="hover:bg-[#eff4ff]/50 dark:hover:bg-[#0b1c30]/40 transition-colors">
                        <td className="py-3.5 px-2">
                          <button
                            onClick={() => onSelectPatient(matchedPatient)}
                            className="flex items-center gap-3 text-left hover:text-[#2563eb]"
                          >
                            <img
                              src={matchedPatient.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                              alt={apt.patientName}
                              className="w-9 h-9 rounded-full object-cover border border-[#c3c6d7]"
                            />
                            <div>
                              <span className="font-semibold text-[#0b1c30] dark:text-[#f8f9ff] block">
                                {apt.patientName}
                              </span>
                              <span className="text-[11px] text-[#737686]">{apt.patientId || 'PT-1024'}</span>
                            </div>
                          </button>
                        </td>

                        <td className="py-3.5 px-2">
                          <div>
                            <span className="font-medium text-[#0b1c30] dark:text-[#f8f9ff] block">
                              {apt.doctorName}
                            </span>
                            <span className="text-[12px] text-[#2563eb]">{apt.department}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-2 text-[#434655] dark:text-[#c3c6d7] text-[13px]">
                          <div>{apt.date}</div>
                          <div className="text-[11px] text-[#737686]">{apt.time}</div>
                        </td>

                        <td className="py-3.5 px-2">
                          <span
                            className={`px-3 py-1 rounded-full text-[12px] font-medium inline-block ${
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

                        <td className="py-3.5 px-2 text-right">
                          <button
                            onClick={() => onSelectPatient(matchedPatient)}
                            className="p-1.5 rounded-lg hover:bg-[#c3c6d7]/30 text-[#434655] dark:text-[#c3c6d7]"
                            title="View Patient Record"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Widgets: Today's Progress + Upcoming Schedule) */}
        <div className="space-y-8">
          {/* Today's Schedule Radial Widget */}
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 flex flex-col items-center text-center">
            <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] self-start mb-1">
              Today's Schedule Progress
            </h3>
            <p className="text-[13px] text-[#434655] dark:text-[#c3c6d7] self-start mb-6">
              33 of 42 consultations completed
            </p>

            {/* Radial Donut Progress */}
            <div className="relative w-40 h-40 flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#eff4ff"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#2563eb"
                  strokeWidth="12"
                  strokeDasharray="251.2"
                  strokeDashoffset="55"
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[28px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                  78%
                </span>
                <span className="text-[11px] text-[#737686] uppercase font-semibold tracking-wider">
                  Completed
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-[#c3c6d7]/30 text-left">
              <div>
                <span className="text-[11px] text-[#737686] block">Remaining Today</span>
                <span className="text-[16px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                  9 Patients
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#737686] block">Next Consultation</span>
                <span className="text-[16px] font-bold text-[#2563eb]">
                  11:30 AM
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming Consultations Timeline */}
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30">
            <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] mb-4">
              Upcoming Today
            </h3>

            <div className="space-y-4">
              {appointments.slice(0, 3).map((apt, index) => (
                <div
                  key={apt.id}
                  className="p-4 rounded-2xl bg-[#eff4ff] dark:bg-[#0b1c30]/40 border border-[#c3c6d7]/30 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 font-bold text-[14px]">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#0b1c30] dark:text-[#f8f9ff]">
                        {apt.patientName}
                      </h4>
                      <p className="text-[12px] text-[#2563eb] font-medium">{apt.doctorName}</p>
                      <p className="text-[11px] text-[#737686] mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {apt.time} • Room 304
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-white dark:bg-[#213145] rounded-full text-[11px] font-medium text-[#004ac6] border border-[#c3c6d7]/40 shrink-0">
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
