import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronDown, Heart } from 'lucide-react';
import { soundPlayer } from '../audio/soundPlayer';

export const SurfaceHero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(soundPlayer.getIsPlaying());
  const [volume, setVolume] = useState(soundPlayer.getVolume());

  useEffect(() => {
    const unsub = soundPlayer.subscribe(() => {
      setIsPlaying(soundPlayer.getIsPlaying());
      setVolume(soundPlayer.getVolume());
    });
    return unsub;
  }, []);

  const togglePlay = () => {
    soundPlayer.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundPlayer.setVolume(val);
  };

  return (
    <section
      id="surface"
      className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 bg-[#FFF9FA]"
    >
      <div className="max-w-2xl mx-auto w-full text-center">
        {/* Subtitle tag */}
        <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-rose-600 mb-3 bg-rose-100/70 px-3.5 py-1.5 rounded-full border border-rose-200">
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>Persembahan Spesial Ulang Tahun</span>
        </div>

        {/* Title: Selamat Ulang Tahun Kakakku Tersayang */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-serif font-extrabold text-stone-950 leading-tight tracking-tight mb-6">
          Selamat Ulang Tahun Kakakku Tersayang
        </h1>

        {/* Heartfelt Loving Message in Indonesian */}
        <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed mb-8 font-sans font-medium max-w-xl mx-auto">
          <p>
            Untuk sosok yang selalu memeluk hatiku bahkan sebelum aku mengerti rasa takut:
            kau adalah kompas terbaik, pelindung terkuat, dan tempat pulang ternyaman dalam hidupku.
          </p>
          <p>
            Di setiap langkahku yang ragu, keyakinanmu selalu menjadi pijakan yang kokoh. Kau
            menyayangi dengan kehangatan seorang ibu dan menginspirasi dengan keteguhan seorang pemimpin.
          </p>
          <div className="p-4 bg-white border-2 border-rose-200/90 rounded-2xl shadow-xs font-serif italic font-bold text-rose-800 text-base sm:text-lg leading-relaxed">
            &ldquo;kakak selalu mengusahakan dunia untukku padahal aku tau kakak juga sedang berjuang&rdquo;
          </div>
        </div>

        {/* Clean & Simple Music Player with Play/Pause button */}
        <div className="w-full max-w-lg mx-auto bg-white border-2 border-rose-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="text-left min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-stone-950 leading-tight truncate">
                Masa ini, Nanti, dan Masa Indah Lainnya
              </h2>
              <p className="text-xs font-semibold text-rose-600 mt-0.5 truncate">
                Nuca
              </p>
            </div>

            {/* Direct Play / Pause Action Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Jeda lagu' : 'Putar lagu'}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shrink-0 ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current stroke-[2]" />
                  <span>Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current stroke-[2]" />
                  <span>Putar</span>
                </>
              )}
            </button>
          </div>

          {/* Controls Footer with Volume */}
          <div className="flex items-center justify-between text-xs font-semibold text-stone-600 pt-3 border-t border-rose-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => soundPlayer.setVolume(volume > 0 ? 0 : 0.6)}
                className="text-stone-600 hover:text-stone-950 cursor-pointer"
                aria-label="Bisukan atau bunyikan musik"
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 stroke-[2]" />
                ) : (
                  <Volume2 className="w-4 h-4 stroke-[2]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 accent-rose-600 h-1.5 bg-rose-100 rounded-lg cursor-pointer"
                aria-label="Atur volume suara"
              />
            </div>

            <span className="text-[11px] font-medium text-stone-500">
              {isPlaying ? 'Sedang Diputar' : 'Musik Dijeda'}
            </span>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="text-center">
          <a
            href="#memories"
            className="inline-flex items-center gap-1 text-xs font-bold text-stone-700 hover:text-rose-600 transition-colors"
          >
            <span>Lanjut Membaca Kenangan Indah</span>
            <ChevronDown className="w-4 h-4 stroke-[2.2]" />
          </a>
        </div>
      </div>
    </section>
  );
};
