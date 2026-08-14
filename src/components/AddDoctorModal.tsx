import React, { useState } from 'react';
import { Doctor } from '../types';

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDoctor: (doctor: Omit<Doctor, 'id' | 'rating' | 'reviewCount'>) => void;
}

export const AddDoctorModal: React.FC<AddDoctorModalProps> = ({
  isOpen,
  onClose,
  onAddDoctor,
}) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Cardiology');
  const [experienceYears, setExperienceYears] = useState(5);
  const [consultationFee, setConsultationFee] = useState(150);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'Available Today' | 'Busy' | 'On Leave'>('Available Today');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddDoctor({
      name,
      department,
      experienceYears: Number(experienceYears),
      consultationFee: Number(consultationFee),
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@medisync.com`,
      phone: phone || '+1 (555) 000-1122',
      status,
      bio: bio || 'Specialist clinician dedicated to patient-centered medical excellence.',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    });

    // Reset
    setName('');
    setBio('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#213145] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#c3c6d7]/30 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-[#c3c6d7]/30">
          <h3 className="text-[20px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563eb]">add_circle</span>
            Add New Doctor
          </h3>
          <button onClick={onClose} className="text-[#737686] hover:text-[#0b1c30] transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
              Doctor Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Alexander Vance"
              className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] focus:ring-2 focus:ring-[#2563eb]/20 outline-none"
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
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] focus:ring-2 focus:ring-[#2563eb]/20 outline-none"
              >
                <option value="Available Today">Available Today</option>
                <option value="Busy">Busy</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                Consultation Fee ($)
              </label>
              <input
                type="number"
                min="50"
                step="10"
                value={consultationFee}
                onChange={(e) => setConsultationFee(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@medisync.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
              Profile Image URL (Optional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
              Short Biography & Specialization
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Provide a brief clinical background..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none resize-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#c3c6d7] text-[#434655] dark:text-[#c3c6d7] hover:bg-[#eff4ff] transition-colors font-medium text-[14px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#2563eb] text-white hover:bg-[#0053db] transition-colors font-semibold text-[14px] shadow-sm"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
