import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Upload, ChevronDown, Heart } from 'lucide-react';
import { soundPlayer } from '../audio/soundPlayer';

export const SurfaceHero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(soundPlayer.getIsPlaying());
  const [volume, setVolume] = useState(soundPlayer.getVolume());
  const [progress, setProgress] = useState(30);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsub = soundPlayer.subscribe(() => {
      setIsPlaying(soundPlayer.getIsPlaying());
      setVolume(soundPlayer.getVolume());
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    soundPlayer.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundPlayer.setVolume(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundPlayer.loadCustomAudio(file);
      soundPlayer.play();
    }
  };

  return (
    <section
      id="surface"
      className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 bg-[#FFF9FA]"
    >
      <div className="max-w-2xl mx-auto w-full text-center">
        {/* Subtitle tag */}
        <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-3 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>Persembahan Spesial Ulang Tahun</span>
        </div>

        {/* Title updated to Happy Birthday My Older Sister */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight tracking-tight mb-6">
          Happy Birthday My Older Sister
        </h1>

        {/* Heartfelt Loving Message in Indonesian */}
        <div className="space-y-4 text-stone-600 text-base sm:text-lg leading-relaxed mb-8 font-sans max-w-xl mx-auto">
          <p>
            Untuk sosok yang selalu memeluk hatiku bahkan sebelum aku mengerti rasa takut:
            kau adalah kompas terbaik, pelindung terkuat, dan tempat pulang ternyaman dalam hidupku.
          </p>
          <p>
            Di setiap langkahku yang ragu, keyakinanmu selalu menjadi pijakan yang kokoh. Kau
            menyayangi dengan kehangatan seorang ibu dan menginspirasi dengan keteguhan seorang pemimpin.
          </p>
          <div className="p-4 bg-white border border-rose-100 rounded-2xl shadow-2xs font-serif italic text-rose-700 text-base sm:text-lg">
            &ldquo;Kau tidak hanya mengajarkan arti kebaikan—kau menjalaninya dengan anggun setiap hari.&rdquo;
          </div>
        </div>

        {/* Clean & Simple Music Player for Raja Giannuca */}
        <div className="w-full max-w-xl mx-auto bg-white border border-rose-200/90 rounded-2xl p-4 sm:p-5 shadow-xs text-left mb-8">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Jeda lagu' : 'Putar lagu'}
                className="w-11 h-11 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white flex items-center justify-center transition-all shadow-xs cursor-pointer shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <div>
                <h2 className="text-sm font-semibold text-stone-900 leading-tight">
                  Masa Ini, Nanti, dan Masa Indah Lainnya
                </h2>
                <p className="text-xs text-rose-600 font-medium mt-0.5">
                  Raja Giannuca · {isPlaying ? 'Sedang Diputar' : 'Klik untuk Memutar'}
                </p>
              </div>
            </div>

            {/* Animated Bars */}
            <div className="flex items-end gap-1 h-5 px-1">
              <div
                className={`w-1 bg-rose-400 rounded-full ${
                  isPlaying ? 'h-5 animate-pulse' : 'h-1.5'
                }`}
              />
              <div
                className={`w-1 bg-rose-500 rounded-full ${
                  isPlaying ? 'h-4 animate-bounce' : 'h-2'
                }`}
              />
              <div
                className={`w-1 bg-rose-300 rounded-full ${
                  isPlaying ? 'h-5 animate-pulse' : 'h-1.5'
                }`}
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-rose-100 rounded-full h-1.5 mb-2 overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${isPlaying ? progress : 20}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => soundPlayer.setVolume(volume > 0 ? 0 : 0.6)}
                className="text-stone-400 hover:text-stone-700"
              >
                {volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 accent-rose-500 h-1 bg-rose-100 rounded-lg cursor-pointer"
                aria-label="Atur volume suara"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Unggah file MP3 lagu jika ada"
                className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Ganti File Musik</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="text-center">
          <a
            href="#memories"
            className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-rose-600 font-medium transition-colors"
          >
            <span>Lanjut Membaca Kenangan Indah</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
