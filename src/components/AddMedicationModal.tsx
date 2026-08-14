import React, { useState } from 'react';
import { MedicationItem } from '../types';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedication: (med: Omit<MedicationItem, 'id'>) => void;
}

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({
  isOpen,
  onClose,
  onAddMedication,
}) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('500mg');
  const [frequency, setFrequency] = useState('Twice Daily');
  const [duration, setDuration] = useState('30 Days');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddMedication({
      name,
      dosage,
      frequency,
      duration,
      progressPercent: 10,
      status: 'Active',
    });

    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#213145] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#c3c6d7]/30">
        <div className="flex justify-between items-center pb-4 border-b border-[#c3c6d7]/30">
          <h3 className="text-[18px] font-bold text-[#0b1c30] dark:text-[#f8f9ff] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00687a]">pill</span>
            Add Medication Prescription
          </h3>
          <button onClick={onClose} className="text-[#737686] hover:text-[#0b1c30]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
              Medication Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amoxicillin, Atorvastatin"
              className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                Dosage
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="500mg"
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
              >
                <option value="Once Daily">Once Daily</option>
                <option value="Twice Daily">Twice Daily</option>
                <option value="Three Times Daily">Three Times Daily</option>
                <option value="As Needed">As Needed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#434655] dark:text-[#c3c6d7] mb-1">
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 14 Days, 30 Days, Ongoing"
              className="w-full px-4 py-2.5 rounded-xl border border-[#c3c6d7] dark:border-[#737686] bg-[#f8f9ff] dark:bg-[#0b1c30] text-[#0b1c30] dark:text-[#f8f9ff] outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-[#c3c6d7] text-[#434655] dark:text-[#c3c6d7]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#2563eb] text-white font-semibold"
            >
              Add Medication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
