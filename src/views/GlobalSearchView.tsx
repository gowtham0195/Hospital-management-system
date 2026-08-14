import React, { useState } from 'react';
import { Doctor, Patient, Appointment, Department, NavigationTab } from '../types';

interface GlobalSearchViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  departments: Department[];
  onSelectDoctor: (doc: Doctor) => void;
  onSelectPatient: (pat: Patient) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const GlobalSearchView: React.FC<GlobalSearchViewProps> = ({
  searchQuery,
  setSearchQuery,
  doctors,
  patients,
  appointments,
  departments,
  onSelectDoctor,
  onSelectPatient,
  setActiveTab,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Doctors' | 'Patients' | 'Departments' | 'Appointments'
  >('All');
  const [isListening, setIsListening] = useState(false);

  // Simulated voice input handler
  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setSearchQuery('Cardiology');
      setIsListening(false);
    }, 1500);
  };

  const query = searchQuery.toLowerCase().trim();

  // Filtered lists
  const matchedDoctors = doctors.filter(
    (d) =>
      !query ||
      d.name.toLowerCase().includes(query) ||
      d.department.toLowerCase().includes(query) ||
      (d.bio && d.bio.toLowerCase().includes(query))
  );

  const matchedPatients = patients.filter(
    (p) =>
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.email.toLowerCase().includes(query)
  );

  const matchedDepartments = departments.filter(
    (dep) => !query || dep.name.toLowerCase().includes(query) || dep.headDoctor.toLowerCase().includes(query)
  );

  const matchedAppointments = appointments.filter(
    (apt) =>
      !query ||
      apt.patientName.toLowerCase().includes(query) ||
      apt.doctorName.toLowerCase().includes(query) ||
      apt.id.toLowerCase().includes(query)
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Search Header Banner */}
      <div className="bg-white dark:bg-[#213145] p-6 md:p-8 rounded-3xl card-shadow border border-[#c3c6d7]/30 text-center space-y-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
            Global Hospital Search
          </h1>
          <p className="text-[14px] text-[#434655] dark:text-[#c3c6d7] mt-1">
            Search clinicians, patient medical files, departments, and appointment records across the system
          </p>
        </div>

        {/* Large Search Bar with Mic Button */}
        <div className="relative max-w-2xl mx-auto">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[24px] text-[#2563eb]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, department, diagnosis, or appointment ID..."
            className="w-full pl-12 pr-12 py-4 bg-[#eff4ff] dark:bg-[#0b1c30]/60 border-2 border-[#2563eb]/30 focus:border-[#2563eb] rounded-2xl text-[16px] text-[#0b1c30] dark:text-[#f8f9ff] outline-none shadow-sm transition-all"
          />
          <button
            onClick={handleVoiceSearch}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
              isListening
                ? 'bg-[#ba1a1a] text-white animate-pulse'
                : 'text-[#2563eb] hover:bg-[#2563eb]/10'
            }`}
            title="Voice Search"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
          {(['All', 'Doctors', 'Patients', 'Departments', 'Appointments'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#2563eb] text-white shadow-sm scale-[1.02]'
                  : 'bg-[#eff4ff] dark:bg-[#0b1c30]/50 text-[#434655] dark:text-[#c3c6d7] hover:bg-[#e5eeff]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Display */}
      <div className="space-y-8">
        {/* Category: Doctors */}
        {(activeCategory === 'All' || activeCategory === 'Doctors') && matchedDoctors.length > 0 && (
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
            <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2 pb-2 border-b border-[#c3c6d7]/30">
              <span className="material-symbols-outlined text-[#2563eb]">medical_services</span>
              <span>Doctors ({matchedDoctors.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-[#eff4ff]/60 dark:bg-[#0b1c30]/40 border border-[#c3c6d7]/30 flex items-center justify-between gap-3 hover:border-[#2563eb] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#c3c6d7]"
                    />
                    <div>
                      <h4 className="font-bold text-[15px] text-[#0b1c30] dark:text-[#f8f9ff]">
                        {doc.name}
                      </h4>
                      <p className="text-[12px] text-[#2563eb] font-semibold">{doc.department}</p>
                      <p className="text-[11px] text-[#737686]">{doc.experienceYears} Yrs Exp • ${doc.consultationFee}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectDoctor(doc)}
                    className="px-3 py-1.5 bg-[#2563eb] text-white rounded-xl text-[12px] font-semibold hover:bg-[#0053db] transition-colors shrink-0"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category: Patients */}
        {(activeCategory === 'All' || activeCategory === 'Patients') && matchedPatients.length > 0 && (
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
            <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2 pb-2 border-b border-[#c3c6d7]/30">
              <span className="material-symbols-outlined text-[#00687a]">group</span>
              <span>Patient Records ({matchedPatients.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedPatients.map((pat) => (
                <div
                  key={pat.id}
                  className="p-4 rounded-2xl bg-[#eff4ff]/60 dark:bg-[#0b1c30]/40 border border-[#c3c6d7]/30 flex items-center justify-between gap-3 hover:border-[#2563eb] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={pat.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                      alt={pat.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#c3c6d7]"
                    />
                    <div>
                      <h4 className="font-bold text-[15px] text-[#0b1c30] dark:text-[#f8f9ff]">
                        {pat.name} ({pat.id})
                      </h4>
                      <p className="text-[12px] text-[#434655] dark:text-[#c3c6d7]">
                        {pat.age} Yrs • {pat.gender} • Blood: {pat.bloodGroup}
                      </p>
                      <p className="text-[11px] text-[#737686]">{pat.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onSelectPatient(pat);
                    }}
                    className="px-3 py-1.5 bg-[#2563eb] text-white rounded-xl text-[12px] font-semibold hover:bg-[#0053db] transition-colors shrink-0"
                  >
                    View Record
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category: Departments */}
        {(activeCategory === 'All' || activeCategory === 'Departments') && matchedDepartments.length > 0 && (
          <div className="bg-white dark:bg-[#213145] p-6 rounded-3xl card-shadow border border-[#c3c6d7]/30 space-y-4">
            <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2 pb-2 border-b border-[#c3c6d7]/30">
              <span className="material-symbols-outlined text-[#006229]">domain</span>
              <span>Hospital Departments ({matchedDepartments.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {matchedDepartments.map((dep) => (
                <div
                  key={dep.id}
                  className="p-4 rounded-2xl bg-[#eff4ff]/60 dark:bg-[#0b1c30]/40 border border-[#c3c6d7]/30 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#2563eb]">{dep.icon}</span>
                    <h4 className="font-bold text-[15px] text-[#0b1c30] dark:text-[#f8f9ff]">
                      {dep.name}
                    </h4>
                  </div>
                  <p className="text-[12px] text-[#434655] dark:text-[#c3c6d7]">
                    {dep.floor} • {dep.doctorCount} Doctors
                  </p>
                  <p className="text-[11px] text-[#737686]">Head: {dep.headDoctor}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Fallback */}
        {matchedDoctors.length === 0 &&
          matchedPatients.length === 0 &&
          matchedDepartments.length === 0 &&
          matchedAppointments.length === 0 && (
            <div className="bg-white dark:bg-[#213145] p-12 rounded-3xl text-center card-shadow border border-[#c3c6d7]/30">
              <span className="material-symbols-outlined text-[48px] text-[#737686] mb-2">
                search_off
              </span>
              <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff]">
                No matching results found
              </h3>
              <p className="text-[14px] text-[#737686] mt-1 mb-4">
                We couldn't find anything matching "{searchQuery}". Try a different keyword.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 bg-[#2563eb] text-white rounded-xl text-[14px] font-semibold"
              >
                Clear Search
              </button>
            </div>
          )}
      </div>
    </div>
  );
};
