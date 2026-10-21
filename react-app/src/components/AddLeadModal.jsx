import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  User, 
  Phone, 
  Globe2, 
  IndianRupee, 
  Flame, 
  CheckCircle2, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { CORRIDOR_CITIES, GUJARAT_CITIES, RAJASTHAN_CITIES } from '../data/leadsData';

export default function AddLeadModal({ onClose, onLeadCreated, theme = 'dark' }) {
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    state: 'Gujarat',
    city: 'Surat',
    zone: 'Pandesara GIDC',
    address: '',
    category: 'Textiles & Jacquard',
    type: 'B2B',
    dm: '',
    phone: '',
    website: 'No Website',
    priority: 'Hot',
    stage: 'Audit Sent',
    webCost: '65000',
    mrr: '30000',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // When state changes, update default city
  const handleStateChange = (newState) => {
    setFormData((prev) => ({
      ...prev,
      state: newState,
      city: newState === 'Gujarat' ? 'Surat' : 'Jaipur',
      zone: newState === 'Gujarat' ? 'GIDC Industrial Area' : 'RIICO Industrial Area'
    }));
  };

  const availableCities = formData.state === 'Gujarat' ? GUJARAT_CITIES : RAJASTHAN_CITIES;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter company name.');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg('Please enter the physical meeting / factory address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await onLeadCreated(formData);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create lead via API.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-3xl p-6 shadow-2xl backdrop-blur-2xl border transition-all my-8 ${
        isDark ? 'bg-[#0f172a] border-blue-500/40 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                <span>Add Verified B2B Lead</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold">
                  API Connected
                </span>
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Add manufacturer or wholesaler with physical meeting address to corridor database
              </p>
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

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Company Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold mb-1">Company / Factory Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Marvel Tiles & Granites"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Business Model</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="B2B">B2B Industrial</option>
                <option value="D2C">D2C Brand</option>
              </select>
            </div>
          </div>

          {/* Row 2: State, City, Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">State / Region</label>
              <select
                value={formData.state}
                onChange={(e) => handleStateChange(e.target.value)}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="Gujarat">🦁 Gujarat</option>
                <option value="Rajasthan">🏰 Rajasthan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">City Hub</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                {availableCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Industrial Zone / Area</label>
              <input
                type="text"
                placeholder="e.g. Sitapura RIICO Phase 3"
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Row 3: Physical Address */}
          <div>
            <label className="block text-xs font-bold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1 text-rose-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Physical Meeting / Factory Address *</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Plot No, Street, Road, Pin Code</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Plot No. 245, Road No. 8, RIICO Industrial Area, Phase II, Sitapura, Jaipur, Rajasthan - 302022"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 leading-relaxed ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Row 4: Category, Contact Name, Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">Category / Sector</label>
              <input
                type="text"
                placeholder="e.g. CNC Turned Components"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Decision Maker (Owner)</label>
              <input
                type="text"
                placeholder="e.g. Rajeshbhai Shah"
                value={formData.dm}
                onChange={(e) => setFormData({ ...formData, dm: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">WhatsApp / Phone *</label>
              <input
                type="tel"
                required
                placeholder="e.g. 9825123456"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 font-mono ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Row 5: Web Status, Dev Fee, MRR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1">Digital Presence</label>
              <select
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="No Website">No Website (Zero-Web Target)</option>
                <option value="Outdated">Outdated / Broken Site</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Est. Web Dev (₹)</label>
              <input
                type="number"
                placeholder="65000"
                value={formData.webCost}
                onChange={(e) => setFormData({ ...formData, webCost: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 font-mono ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Est. Retainer MRR (₹/mo)</label>
              <input
                type="number"
                placeholder="30000"
                value={formData.mrr}
                onChange={(e) => setFormData({ ...formData, mrr: e.target.value })}
                className={`w-full text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-blue-500 font-mono ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-slate-700/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to API...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Save Lead via API</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
