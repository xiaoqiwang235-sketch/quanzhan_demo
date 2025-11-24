import React, { useState, useEffect } from 'react';
import { Terminal, X } from 'lucide-react';
import { FORM_FIELD_LABELS, NUMERIC_FIELDS } from '../../constants/config';

export const EditModal = ({ item, onClose, onSave, c, theme }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  const handleSubmit = async () => {
    const success = await onSave(item.id, formData);
    if (success) {
      onClose();
    }
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
      <div className={`${c.cardBg} border-2 ${c.border} rounded-none shadow-2xl max-w-2xl w-full p-6 my-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className={`${c.primaryText} font-bold flex items-center gap-2 text-sm uppercase tracking-wide`}>
            <Terminal className="w-4 h-4" /> EDIT MODE
          </div>
          <button onClick={onClose} className={`${c.primaryText} hover:text-red-400 transition`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {Object.keys(formData).filter(k => k !== 'id').map(key => (
            <div key={key} className="col-span-1">
              <label className={`block text-xs font-bold mb-1 ${c.textSecondary}`}>
                {FORM_FIELD_LABELS[key] || key.toUpperCase()}
              </label>
              <input
                type={NUMERIC_FIELDS.includes(key) ? 'number' : 'text'}
                value={formData[key] || ''}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                placeholder={`输入${FORM_FIELD_LABELS[key]?.split(' ')[0] || key}`}
                className={`w-full px-3 py-2 ${c.inputBg} border-2 ${c.inputBorder} ${c.text} focus:outline-none ${c.borderHover} font-mono text-sm`}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2 border-2 ${c.buttonBorder} ${c.primaryText} ${c.primaryHover} transition font-bold uppercase text-xs`}
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 px-4 py-2 ${c.primary} ${theme === 'light' ? 'text-white' : theme === 'hacker' ? 'text-black' : 'text-white'} ${c.primaryHover} transition font-bold uppercase text-xs`}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};
