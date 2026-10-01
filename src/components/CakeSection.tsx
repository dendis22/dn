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
    <section id="cake" className="py-20 px-4 sm:px-6 bg-[#FFF2F5] text-center">
      <div className="max-w-3xl mx-auto">
        {/* Final Birthday Message in Indonesian */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Puncak Perayaan Ulang Tahun</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            Happy Birthday, My Second Mother & Role Model!
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans">
            Terima kasih telah menjadi kehangatan di rumah kita, ketenangan di saat badai, dan
            cahaya penuntun di setiap langkah hidupku. Pejamkan mata, sampaikan harapan terbaikmu,
            lalu klik lilin di bawah ini untuk meniupnya!
          </p>
        </div>

        {/* Clean Cake Card with Single Candle */}
        <div className="max-w-xs sm:max-w-sm mx-auto bg-white p-4 rounded-3xl border border-rose-200 shadow-sm mb-8">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-rose-50 mb-3">
            <img
              src="/src/assets/images/cake_single_candle_1790842546927.jpg"
              alt="Kue ulang tahun dengan satu lilin menyala"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Clickable Candle Flame Hotspot */}
            <button
              type="button"
              onClick={handleCandleClick}
              aria-label={isLit ? 'Klik untuk meniup lilin' : 'Klik untuk menyalakan kembali'}
              className="absolute top-[8%] left-[43%] w-[14%] h-[22%] z-20 group cursor-pointer focus:outline-none flex flex-col items-center justify-center"
            >
              {isLit ? (
                <div className="relative flex flex-col items-center">
                  <div className="absolute -inset-2 rounded-full bg-amber-300/40 blur-xs animate-pulse" />
                  <div className="w-5 h-8 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 animate-flame shadow-md shadow-amber-400/80 cursor-pointer hover:scale-110 transition-transform" />
                  <span className="sr-only">Lilin sedang menyala. Klik untuk meniup.</span>
                </div>
              ) : (
                <div className="relative flex flex-col items-center">
                  <Wind className="w-5 h-5 text-stone-400 opacity-80 animate-bounce" />
                  <span className="sr-only">Lilin padam. Klik untuk menyalakan kembali.</span>
                </div>
              )}
            </button>

            {/* Status overlay */}
            <div className="absolute bottom-2 inset-x-2 bg-white/90 backdrop-blur-xs rounded-xl p-2 flex items-center justify-between text-[11px]">
              <span className="font-medium text-stone-700">
                {isLit ? 'Lilin Menyala Hangat' : 'Harapan Telah Ditiup!'}
              </span>
              <button
                type="button"
                onClick={handleCandleClick}
                className="px-2 py-0.5 rounded-lg bg-rose-500 text-white font-medium cursor-pointer"
              >
                {isLit ? 'Tiup Lilin 💨' : 'Nyalakan 🕯️'}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCandleClick}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {isLit ? (
              <>
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>Klik Lilin untuk Meniup & Merayakan!</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nyalakan Kembali & Lihat Kembang Api!</span>
              </>
            )}
          </button>
        </div>

        {/* Wish Announcement */}
        {wishMade && (
          <div className="max-w-md mx-auto bg-white border border-rose-200 rounded-2xl p-5 shadow-xs mb-8 text-center animate-fade-in">
            <div className="flex items-center justify-center gap-1.5 text-rose-500 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="font-serif font-bold text-base text-stone-800">
                Harapan Indah Telah Dipanjatkan
              </span>
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Semoga semua doa dan kebaikan yang kau simpan di hatimu dikabulkan oleh Yang Maha Kuasa.
              Terima kasih untuk selalu ada bagi kami.
            </p>
          </div>
        )}

        {/* Simple Footer */}
        <div className="pt-8 border-t border-rose-200/80 max-w-sm mx-auto text-stone-500 text-xs">
          <p className="font-serif italic font-medium text-stone-800 text-sm mb-1">
            &ldquo;Happy Birthday My Second Mother and My Role Model.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-1 text-rose-500">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Disusun dengan penuh cinta oleh adikmu</span>
          </div>
        </div>
      </div>
    </section>
  );
};
