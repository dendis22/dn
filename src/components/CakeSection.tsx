import React, { useState } from 'react';
import { Sparkles, Heart, Flame, RotateCcw } from 'lucide-react';
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
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-rose-600 mb-2 bg-rose-100/70 px-3 py-1 rounded-full border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Puncak Perayaan Ulang Tahun</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-stone-950 tracking-tight mb-3">
            Tiup Lilin & Rayakan Harapanmu
          </h2>
          <p className="text-stone-800 font-semibold text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Di hari bertambahnya usiamu, pejamkan matamu sejenak, panjatkan doa terbaikmu,
            lalu tiup lilin ini sebagai simbol langkah baru yang penuh berkah.
          </p>
        </div>

        {/* Clean Realistic Single-Candle Birthday Cake Card */}
        <div className="max-w-md mx-auto bg-white border-2 border-rose-200/90 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-6 bg-rose-50 border border-rose-100 flex items-center justify-center">
            {/* Cake image */}
            <img
              src="/src/assets/images/birthday_cake_candle_1790919789881.jpg"
              alt="Kue ulang tahun dengan lilin menyala"
              className="w-full h-full object-cover"
            />

            {/* Glowing animated flame overlay when lit */}
            {isLit && (
              <div className="absolute top-[28%] left-[49.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-amber-400/40 blur-md animate-ping opacity-75" />
                <div className="w-5 h-7 rounded-full bg-linear-to-t from-amber-500 via-yellow-300 to-white blur-[0.5px] animate-pulse" />
              </div>
            )}

            {/* Soft smoke effect when extinguished */}
            {!isLit && (
              <div className="absolute top-[26%] left-[49.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse">
                <div className="w-3 h-6 bg-stone-400/40 blur-sm rounded-full -translate-y-2" />
                <div className="w-4 h-8 bg-stone-300/30 blur-md rounded-full -translate-y-4" />
              </div>
            )}

            {/* Status indicator on image */}
            <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1 rounded-full text-[11px] font-bold text-stone-900 shadow-xs border border-rose-200">
              {isLit ? '🔥 Lilin Menyala' : '✨ Lilin Berhasil Ditiup'}
            </div>
          </div>

          {/* Realistic interactive blow button */}
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
            &ldquo;Selamat Ulang Tahun untuk Kakakku Tersayang dan Panutan Hidupku.&rdquo;
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
