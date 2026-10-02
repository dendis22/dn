import React, { useState, useEffect, useRef } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { soundPlayer } from '../audio/soundPlayer';

interface PasscodeLockProps {
  onUnlock: () => void;
}

const CORRECT_PIN = '0510';

export const PasscodeLock: React.FC<PasscodeLockProps> = ({ onUnlock }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInput = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    setDigits(newDigits);
    setError(false);

    if (cleaned && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullPin = newDigits.join('');
    if (fullPin.length === 4) {
      verifyPin(fullPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyPin = (pin: string) => {
    if (pin === CORRECT_PIN) {
      setIsSuccess(true);
      soundPlayer.playFireworkBoom();
      setTimeout(() => {
        onUnlock();
      }, 600);
    } else {
      setError(true);
      setTimeout(() => {
        setDigits(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 600);
    }
  };

  const handleKeypadPress = (num: string) => {
    const firstEmptyIndex = digits.findIndex((d) => d === '');
    if (firstEmptyIndex !== -1) {
      handleInput(firstEmptyIndex, num);
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = [...digits].reverse().findIndex((d) => d !== '');
    if (lastFilledIndex !== -1) {
      const realIndex = 3 - lastFilledIndex;
      const newDigits = [...digits];
      newDigits[realIndex] = '';
      setDigits(newDigits);
      inputRefs.current[realIndex]?.focus();
    }
  };

  const handleClear = () => {
    setDigits(['', '', '', '']);
    setError(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#FFF6F8] relative overflow-hidden font-sans">
      {/* Soft pastel background glow */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-100/60 blur-3xl pointer-events-none" />

      {/* Main card */}
      <div
        className={`w-full max-w-sm bg-white border-2 border-rose-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative z-10 transition-all duration-300 ${
          error ? 'animate-bounce' : ''
        } ${isSuccess ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-3 text-rose-600">
            <Lock className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-xs uppercase tracking-widest text-rose-600 font-bold block">
            Hanya untuk Aak Tersayang
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-stone-900 mt-1">
            Masukkan Kode Rahasia
          </h1>
        </div>

        {/* 4 Digit Boxes */}
        <div className="flex justify-center gap-3 mb-5">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-12 h-14 text-center text-2xl font-serif font-extrabold rounded-xl border-2 transition-all outline-none ${
                error
                  ? 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200'
                  : digit
                  ? 'border-rose-400 bg-white text-stone-900 shadow-xs'
                  : 'border-rose-200 bg-rose-50/40 text-stone-900'
              } focus:border-rose-500 focus:ring-2 focus:ring-rose-200`}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-rose-700 mb-4 font-bold">
            <AlertCircle className="w-4 h-4 stroke-[2.2]" />
            <span>Kode salah, silakan coba lagi.</span>
          </div>
        )}

        {/* Numerical On-screen Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeypadPress(num)}
              className="h-11 rounded-xl bg-stone-100 hover:bg-rose-100 active:bg-rose-200 text-stone-900 text-lg font-bold transition-colors flex items-center justify-center cursor-pointer border border-stone-200"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="h-11 rounded-xl bg-stone-100 hover:bg-rose-100 text-stone-700 text-xs font-bold transition-colors flex items-center justify-center cursor-pointer border border-stone-200"
          >
            Hapus
          </button>
          <button
            type="button"
            onClick={() => handleKeypadPress('0')}
            className="h-11 rounded-xl bg-stone-100 hover:bg-rose-100 active:bg-rose-200 text-stone-900 text-lg font-bold transition-colors flex items-center justify-center cursor-pointer border border-stone-200"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            aria-label="Hapus satu digit"
            className="h-11 rounded-xl bg-stone-100 hover:bg-rose-100 text-stone-800 text-base font-bold transition-colors flex items-center justify-center cursor-pointer border border-stone-200"
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
};
