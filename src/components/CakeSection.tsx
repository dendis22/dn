import React, { useState } from 'react';
import { Sparkles, Heart, Flame, Wind, RotateCcw } from 'lucide-react';
import { soundPlayer } from '../audio/soundPlayer';

interface CakeSectionProps {
  onTriggerFireworks: () => void;
}

export const CakeSection: React.FC<CakeSectionProps> = ({ onTriggerFireworks }) => {
  const [isLit, setIsLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [blowCount, setBlowCount] = useState(0);

  const handleCandleClick = () => {
    if (isLit) {
      setIsLit(false);
      setWishMade(true);
      setBlowCount((c) => c + 1);
      soundPlayer.playBlowoutSound();
      soundPlayer.playFireworkBoom();
      onTriggerFireworks();
    } else {
      setIsLit(true);
      soundPlayer.playFireworkBoom();
      onTriggerFireworks();
    }
  };

  return (
    <section id="cake" className="py-20 px-4 sm:px-6 bg-[#FFF2F5] text-center font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Final Birthday Message in Indonesian with high readability */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-rose-600 mb-2 bg-rose-100/70 px-3.5 py-1.5 rounded-full border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Puncak Perayaan Ulang Tahun</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-stone-950 tracking-tight mb-4">
            Happy Birthday, My Older Sister & Role Model!
          </h2>

          <p className="text-stone-800 font-medium text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Terima kasih telah menjadi kehangatan di rumah kita, ketenangan di saat badai, dan
            cahaya penuntun di setiap langkah hidupku. Pejamkan mata, sampaikan harapan terbaikmu.
          </p>
        </div>

        {/* Clean Cake Card with Single Candle */}
        <div className="max-w-xs sm:max-w-sm mx-auto bg-white p-4 sm:p-5 rounded-3xl border-2 border-rose-200 shadow-sm mb-8">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-rose-50 mb-3 border border-rose-100 select-none">
            <img
              src="/src/assets/images/birthday_cake_candle_1790919789881.jpg"
              alt="Kue ulang tahun dengan lilin"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Clickable Candle Flame Hotspot raised higher to align precisely with candle top */}
            <button
              type="button"
              onClick={handleCandleClick}
              aria-label={isLit ? 'Klik untuk membuat permohonan' : 'Klik untuk menyalakan kembali'}
              className="absolute top-[4%] sm:top-[5%] left-1/2 -translate-x-1/2 w-20 h-24 z-20 group cursor-pointer focus:outline-none flex flex-col items-center justify-start pt-0.5"
            >
              {isLit ? (
                <div className="relative flex flex-col items-center">
                  {/* Warm pulsating glow around the flame */}
                  <div className="absolute -inset-3 rounded-full bg-amber-400/40 blur-md animate-pulse" />
                  
                  {/* Main Flame body with realistic gradient */}
                  <div className="relative w-4 sm:w-5 h-7 sm:h-8 rounded-full rounded-t-[50%] rounded-b-[40%] bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 shadow-lg shadow-amber-500/70 animate-bounce duration-700">
                    {/* Inner bright core */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-3.5 rounded-full bg-white/90 blur-[0.5px]" />
                  </div>
                  <span className="sr-only">Lilin sedang menyala. Klik untuk membuat permohonan.</span>
                </div>
              ) : (
                <div className="relative flex flex-col items-center animate-fade-in">
                  <Wind className="w-5 h-5 text-stone-400 opacity-90 animate-bounce stroke-[2]" />
                  <span className="sr-only">Lilin padam. Klik untuk menyalakan kembali.</span>
                </div>
              )}
            </button>
          </div>

          {/* Keterangan Buat Permohonan di tengah-tengah di bawah gambar kue tanpa latar belakang */}
          <div className="py-2 text-center">
            <p className="font-serif font-extrabold text-base sm:text-lg text-stone-900 tracking-tight">
              {isLit ? 'Buat Permohonan' : 'Harapan Telah Ditiup!'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCandleClick}
            className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            {isLit ? (
              <>
                <Flame className="w-4 h-4 fill-white stroke-[2]" />
                <span>Klik untuk meniup lilin</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 stroke-[2]" />
                <span>Nyalakan Kembali & Lihat Kembang Api!</span>
              </>
            )}
          </button>
        </div>

        {/* Wish Announcement */}
        {wishMade && (
          <div className="max-w-md mx-auto bg-white border-2 border-rose-300 rounded-2xl p-5 shadow-xs mb-8 text-center animate-fade-in">
            <div className="flex items-center justify-center gap-1.5 text-rose-600 mb-1.5">
              <Sparkles className="w-4 h-4 stroke-[2.2]" />
              <span className="font-serif font-extrabold text-lg text-stone-950">
                Harapan Indah Telah Dipanjatkan
              </span>
              <Sparkles className="w-4 h-4 stroke-[2.2]" />
            </div>
            <p className="text-xs sm:text-sm text-stone-800 font-semibold leading-relaxed font-sans">
              Semoga semua doa dan kebaikan yang kau simpan di hatimu dikabulkan oleh Yang Maha Kuasa.
              Terima kasih untuk selalu ada bagi kami.
            </p>
          </div>
        )}

        {/* Simple Footer with clear font */}
        <div className="pt-8 border-t border-rose-200 max-w-sm mx-auto text-stone-700 text-xs">
          <p className="font-serif italic font-bold text-stone-950 text-base mb-1">
            &ldquo;Happy Birthday My Older Sister and My Role Model.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-1.5 text-rose-600 font-bold">
            <Heart className="w-3.5 h-3.5 fill-rose-600 stroke-[2.2]" />
            <span>Disusun dengan penuh cinta oleh adikmu</span>
          </div>
        </div>
      </div>
    </section>
  );
};
