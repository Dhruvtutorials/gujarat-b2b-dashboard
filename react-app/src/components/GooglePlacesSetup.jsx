import React, { useState, useEffect } from 'react';
import {
  Key,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  MapPin,
  Building2,
  Loader2,
  Globe2,
  Phone,
  Sparkles,
  AlertTriangle,
  Trash2,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { 
  getGoogleApiKey, 
  saveGoogleApiKey, 
  clearGoogleApiKey, 
  fetchRealLeadsFromGooglePlaces 
} from '../services/apiService';
import { CORRIDOR_CITIES, GUJARAT_CITIES, RAJASTHAN_CITIES } from '../data/leadsData';

// City GPS search keyword mapping
const CITY_KEYWORDS = {
  'Surat':       'textile diamond manufacturer',
  'Ahmedabad':   'pharmaceutical chemical manufacturer',
  'Vadodara':    'engineering chemical manufacturer',
  'Gandhinagar': 'electronics IT company',
  'Ankleshwar':  'chemical manufacturer',
  'Bharuch':     'fertilizer industrial manufacturer',
  'Anand':       'dairy food processing manufacturer',
  'Jaipur':      'gems jewellery handicraft manufacturer',
  'Jodhpur':     'handicrafts furniture stone manufacturer',
  'Udaipur':     'marble mineral zinc manufacturer',
  'Bhilwara':    'textile suiting manufacturer',
  'Kota':        'chemical engineering manufacturer',
  'Kalol & Chhatral': 'plastic textile machinery manufacturer',
};

export default function GooglePlacesSetup({ onLeadsHarvested, onClose, theme = 'dark' }) {
  const isDark = theme === 'dark';

  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedKey, setSavedKey] = useState('');
  const [selectedCity, setSelectedCity] = useState('Surat');
  const [selectedState, setSelectedState] = useState('Gujarat');
  const [customKeyword, setCustomKeyword] = useState('');

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchResult, setFetchResult] = useState(null);
  const [fetchedLeads, setFetchedLeads] = useState([]);
  const [fetchProgress, setFetchProgress] = useState('');

  useEffect(() => {
    const existing = getGoogleApiKey();
    if (existing) {
      setSavedKey(existing);
      setApiKey(existing);
    }
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;
    setIsTesting(true);
    setTestResult(null);

    try {
      // Test the key with a quick Places API call
      const testRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey.trim(),
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress'
        },
        body: JSON.stringify({
          textQuery: 'Surat GIDC textile manufacturer India',
          maxResultCount: 1
        })
      });

      if (testRes.ok) {
        const data = await testRes.json();
        saveGoogleApiKey(apiKey.trim());
        setSavedKey(apiKey.trim());
        setTestResult({
          success: true,
          message: `✅ API Key Valid! Google Places API is working. Test returned: "${data.places?.[0]?.displayName?.text || 'Business found'}"`
        });
      } else {
        const errData = await testRes.json();
        setTestResult({
          success: false,
          message: `❌ Error: ${errData.error?.message || 'Invalid API Key'}. Please check that "Places API (New)" is enabled in Google Cloud Console.`
        });
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: `❌ Network Error: ${err.message}. Check your internet connection.`
      });
    }

    setIsTesting(false);
  };

  const handleFetchRealLeads = async () => {
    if (!savedKey) {
      setTestResult({ success: false, message: 'Please save and verify your API key first.' });
      return;
    }

    setIsFetching(true);
    setFetchResult(null);
    setFetchedLeads([]);
    setFetchProgress(`🔍 Searching real businesses in ${selectedCity}...`);

    const keyword = customKeyword.trim() || CITY_KEYWORDS[selectedCity] || 'manufacturer factory industrial';

    setFetchProgress(`📡 Calling Google Places API for "${keyword}" in ${selectedCity}...`);
    await new Promise(r => setTimeout(r, 400));

    const result = await fetchRealLeadsFromGooglePlaces(selectedCity, selectedState, keyword);

    setIsFetching(false);
    setFetchProgress('');

    if (result.success) {
      setFetchedLeads(result.leads || []);
      setFetchResult({
        success: true,
        message: `✅ Found ${result.totalFound} real businesses in ${selectedCity}! ${result.newAdded} new leads added to your dashboard.`
      });
      if (onLeadsHarvested && result.leads?.length > 0) {
        onLeadsHarvested(result.leads);
      }
    } else {
      setFetchResult({
        success: false,
        message: `❌ ${result.error}`
      });
    }
  };

  const handleClearKey = () => {
    clearGoogleApiKey();
    setSavedKey('');
    setApiKey('');
    setTestResult(null);
    setFetchResult(null);
    setFetchedLeads([]);
  };

  const availableCities = selectedState === 'Gujarat' ? GUJARAT_CITIES : RAJASTHAN_CITIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border transition-all my-auto max-h-[92vh] overflow-y-auto ${
        isDark ? 'bg-[#0d1526] border-blue-500/40 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
      }`}>

        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                <span>Google Places API — Real Lead Fetcher</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  Live Data
                </span>
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Apni Google API key daalke <strong>100% real verified businesses</strong> fetch karo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            ✕
          </button>
        </div>

        {/* API Key Setup Section */}
        <div className={`rounded-2xl p-4 mb-4 border ${
          isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
              savedKey ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'
            }`}>
              {savedKey ? '✓' : '1'}
            </div>
            <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Google Cloud API Key Dalo
            </h4>
            {savedKey && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                ✓ Verified & Saved
              </span>
            )}
          </div>

          <div className="relative mb-3">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIzaSy... (Google Places API Key)"
              className={`w-full pl-4 pr-10 py-2.5 rounded-xl text-sm font-mono border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSaveKey}
              disabled={!apiKey.trim() || isTesting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold disabled:opacity-50 shadow-md shadow-blue-600/30"
            >
              {isTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
              <span>{isTesting ? 'Verifying...' : 'Verify & Save Key'}</span>
            </button>

            {savedKey && (
              <button
                onClick={handleClearKey}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Key</span>
              </button>
            )}

            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 underline"
            >
              <ExternalLink className="w-3 h-3" />
              Get API Key
            </a>
          </div>

          {/* Test Result Banner */}
          {testResult && (
            <div className={`mt-3 p-3 rounded-xl text-xs font-semibold border ${
              testResult.success
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
            }`}>
              {testResult.message}
            </div>
          )}
        </div>

        {/* Real Lead Fetch Section */}
        <div className={`rounded-2xl p-4 mb-4 border ${
          isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
        } ${!savedKey ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
              savedKey ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              2
            </div>
            <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              City Select Karo & Real Leads Fetch Karo
            </h4>
          </div>

          {/* State Selector */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {['Gujarat', 'Rajasthan'].map(state => (
              <button
                key={state}
                onClick={() => {
                  setSelectedState(state);
                  setSelectedCity(state === 'Gujarat' ? 'Surat' : 'Jaipur');
                }}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  selectedState === state
                    ? state === 'Gujarat'
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-amber-600 text-white border-amber-500'
                    : isDark
                      ? 'bg-slate-800 text-slate-400 border-slate-700'
                      : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                {state === 'Gujarat' ? '🦁 Gujarat' : '🏰 Rajasthan'}
              </button>
            ))}
          </div>

          {/* City Selector */}
          <div className="mb-3">
            <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              City Select Karo
            </label>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Custom Search Keyword */}
          <div className="mb-4">
            <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Business Type Search (Optional)
            </label>
            <input
              type="text"
              value={customKeyword}
              onChange={e => setCustomKeyword(e.target.value)}
              placeholder={CITY_KEYWORDS[selectedCity] || 'manufacturer factory industrial'}
              className={`w-full px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
            <p className={`text-[10px] mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Default: "{CITY_KEYWORDS[selectedCity] || 'manufacturer factory'}"
            </p>
          </div>

          {/* Fetch Button */}
          <button
            onClick={handleFetchRealLeads}
            disabled={!savedKey || isFetching}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all shadow-lg shadow-emerald-600/30 disabled:opacity-50"
          >
            {isFetching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Fetching Real Leads...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>🔴 Fetch 100% Real Leads from Google — {selectedCity}</span>
              </>
            )}
          </button>

          {/* Progress */}
          {fetchProgress && (
            <div className="mt-2 text-xs text-blue-400 font-mono text-center animate-pulse">
              {fetchProgress}
            </div>
          )}

          {/* Fetch Result Banner */}
          {fetchResult && (
            <div className={`mt-3 p-3 rounded-xl text-xs font-semibold border ${
              fetchResult.success
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
            }`}>
              {fetchResult.message}
            </div>
          )}
        </div>

        {/* Fetched Leads Preview */}
        {fetchedLeads.length > 0 && (
          <div className={`rounded-2xl p-4 border ${
            isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className={`text-sm font-black mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Real Businesses Found ({fetchedLeads.length}) — Google Verified ✅
            </h4>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {fetchedLeads.map((lead, idx) => (
                <div
                  key={lead.id}
                  className={`rounded-xl p-3 border text-xs ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {lead.name}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          lead.priority === 'Hot' 
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {lead.priority}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          🟢 Google Verified
                        </span>
                      </div>

                      <div className="flex items-start gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                        <span className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {lead.address}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        {lead.phone && lead.phone !== 'To be verified' && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-blue-400 hover:underline">
                            <Phone className="w-3 h-3" />
                            <span className="font-mono">{lead.phone}</span>
                          </a>
                        )}
                        {lead.phone === 'To be verified' && (
                          <span className="text-slate-500 text-[10px]">📞 Phone not listed on Google</span>
                        )}
                        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {lead.city}, {lead.state}
                        </span>
                        {lead.rating > 0 && (
                          <span className="text-amber-400 text-[10px] font-bold">
                            ⭐ {lead.rating} ({lead.reviews} reviews)
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href={lead.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/40"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className={`mt-4 p-3 rounded-xl text-xs border flex items-start gap-2 ${
          isDark ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Note:</strong> Google Places mein kuch businesses apna phone number publicly list nahi karte. 
            "To be verified" wali leads ke liye aap Google Maps pe directly search karke contact lena.
            Saari addresses aur business names 100% real hain.
          </div>
        </div>

      </div>
    </div>
  );
}
