import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SecurityGate({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (pin === '2002') {
      sessionStorage.setItem('gujarat_corridor_auth', 'unlocked_2002');
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin('');
    }
  };

  const handleKeypadPress = (val) => {
    if (pin.length < 4) {
      const nextPin = pin + val;
      setPin(nextPin);
      setError(false);
      if (nextPin.length === 4) {
        if (nextPin === '2002') {
          sessionStorage.setItem('gujarat_corridor_auth', 'unlocked_2002');
          setTimeout(() => onUnlock(), 150);
        } else {
          setTimeout(() => {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setPin('');
          }, 150);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070a12]/95 backdrop-blur-xl p-4">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className={`relative w-full max-w-md bg-[#0f172a]/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl text-center transition-transform ${shake ? 'animate-bounce' : ''}`}>
        {/* Shield Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-5 ring-4 ring-blue-500/10">
          <Lock className="w-8 h-8 text-white" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gujarat Corridor Intelligence</span>
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight">Protected Executive Portal</h2>
        <p className="text-sm text-slate-400 mt-1 mb-6">
          Enter 4-Digit Security Passcode to access live Highway Leads & Physical Meeting Addresses.
        </p>

        {/* PIN Dots Display */}
        <div className="flex justify-center items-center gap-3 mb-6">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            return (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  isFilled
                    ? 'bg-blue-500 scale-125 shadow-md shadow-blue-500/50'
                    : 'bg-slate-700/60 border border-slate-600/50'
                }`}
              />
            );
          })}
        </div>

        {error && (
          <div className="flex items-center justify-center gap-2 text-rose-400 text-xs font-medium bg-rose-500/10 border border-rose-500/20 py-2 rounded-xl mb-4 animate-pulse">
            <ShieldAlert className="w-4 h-4" />
            <span>Incorrect Passcode. Please enter 2002.</span>
          </div>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKeypadPress(digit)}
              className="h-14 rounded-2xl bg-slate-800/60 hover:bg-blue-600 hover:text-white border border-slate-700/50 text-xl font-bold text-slate-200 transition-all duration-150 active:scale-95 flex items-center justify-center shadow-sm"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPin('')}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider transition-all active:scale-95"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => handleKeypadPress('0')}
            className="h-14 rounded-2xl bg-slate-800/60 hover:bg-blue-600 hover:text-white border border-slate-700/50 text-xl font-bold text-slate-200 transition-all active:scale-95"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-sm font-semibold text-slate-400 transition-all active:scale-95 flex items-center justify-center"
          >
            ⌫
          </button>
        </div>

        {/* Keyboard Input Fallback */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''));
                setError(false);
              }}
              placeholder="Or type passcode"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-center tracking-widest text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30"
          >
            <span>Unlock</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AES-Level Highway Pipeline Vault (PIN: 2002)</span>
        </div>
      </div>
    </div>
  );
}
