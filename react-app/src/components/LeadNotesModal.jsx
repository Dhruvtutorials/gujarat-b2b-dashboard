import React, { useState } from 'react';
import { 
  X, 
  StickyNote, 
  Save, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  PhoneCall, 
  Tag, 
  User, 
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const LEAD_STATUS_OPTIONS = [
  { id: 'New Lead', label: 'New Lead', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40', badge: 'bg-blue-500' },
  { id: 'WhatsApp Sent', label: 'WhatsApp Sent', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40', badge: 'bg-purple-500' },
  { id: 'Call Done', label: 'Call Done', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40', badge: 'bg-amber-500' },
  { id: 'Meeting Fixed', label: 'Meeting Fixed', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40', badge: 'bg-cyan-500' },
  { id: 'Deal Closed (Won) 🏆', label: 'Deal Closed (Won) 🏆', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold', badge: 'bg-emerald-500' },
  { id: 'Cold / Follow Later', label: 'Cold / Follow Later', color: 'bg-slate-500/20 text-slate-400 border-slate-500/40', badge: 'bg-slate-500' },
];

export default function LeadNotesModal({ lead, onClose, onSaveLead, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [currentStatus, setCurrentStatus] = useState(lead.status || 'New Lead');
  const [notes, setNotes] = useState(lead.notes || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const quickNoteTemplates = [
    'Owner ne bola kal dopahar 3 baje call karo',
    'WhatsApp pitch bheji, owner ne bola proposal review karenge',
    'Meeting fixed for Monday 11:00 AM at GIDC factory',
    'Need discount on web package, ready to close for ₹25,000',
    'Owner out of station, follow up next week'
  ];

  const handleSave = () => {
    const updatedLead = {
      ...lead,
      status: currentStatus,
      notes: notes.trim(),
      lastNoteUpdated: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    onSaveLead(updatedLead);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4">
      <div className={`relative w-full max-w-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border transition-all ${
        isDark ? 'bg-[#0f172a] border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 mb-3.5 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <StickyNote className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                  {lead.id}
                </span>
                <span className="text-xs text-slate-400">{lead.city}, {lead.state}</span>
              </div>
              <h3 className="text-sm sm:text-base font-black truncate max-w-xs sm:max-w-sm mt-0.5">
                {lead.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lead CRM Status Picker */}
        <div className="mb-4">
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-blue-400" />
            <span>Lead Pipeline Stage:</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LEAD_STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCurrentStatus(opt.id)}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold text-left transition-all border flex items-center gap-2 ${
                  currentStatus === opt.id
                    ? `${opt.color} ring-2 ring-blue-500 shadow-md`
                    : isDark 
                      ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${opt.badge}`} />
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes Textarea */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Conversation Notes & Follow-up:</span>
            </label>
            {lead.lastNoteUpdated && (
              <span className="text-[10px] text-slate-400 font-mono">
                Updated: {lead.lastNoteUpdated}
              </span>
            )}
          </div>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Client se kya baat hui yahan likhein... (e.g. Owner ne bola kal dopahar 3 baje call karo)"
            className={`w-full p-3 rounded-xl text-xs transition-all border shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isDark 
                ? 'bg-slate-900/90 border-slate-700 text-slate-100 placeholder-slate-500' 
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mb-4">
          <span className="text-[10px] text-slate-400 font-bold block mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Quick Notes Templates (Tap to add):</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickNoteTemplates.map((template, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setNotes((prev) => prev ? `${prev}\n• ${template}` : `• ${template}`)}
                className={`text-[10px] px-2 py-1 rounded-lg border text-left transition-all ${
                  isDark 
                    ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white' 
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                + {template}
              </button>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 gap-2">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${lead.phone}`}
              className={`p-2 rounded-xl border flex items-center justify-center text-xs font-bold transition-all ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-blue-400 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-blue-600 border-slate-200'
              }`}
              title="Call Decision Maker"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste Sir, Gujarat & Rajasthan B2B Web Solutions se Dhruv Rana bol raha hoon. We noticed ${lead.name} does not have a verified digital catalog yet.`)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold transition-all"
              title="Open WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                savedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
              }`}
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Notes & Status</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
