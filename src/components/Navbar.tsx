import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Lock, Sparkles } from 'lucide-react';
import { soundPlayer } from '../audio/soundPlayer';

interface NavbarProps {
  onLock: () => void;
  onTriggerFireworks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLock, onTriggerFireworks }) => {
  const [isPlaying, setIsPlaying] = useState(soundPlayer.getIsPlaying());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = soundPlayer.subscribe(() => {
      setIsPlaying(soundPlayer.getIsPlaying());
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMusic = () => {
    soundPlayer.toggle();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-rose-100 py-3 shadow-2xs'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#surface"
          className="text-base sm:text-lg font-serif font-bold text-stone-800 hover:text-rose-600 transition-colors whitespace-nowrap"
        >
          Untuk Panutan Hidupku
        </a>

        {/* Zone 2: Clean text navigation links in Indonesian */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a href="#surface" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            Beranda
          </a>
          <a href="#memories" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            Kenangan
          </a>
          <a href="#gallery" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            Galeri
          </a>
          <a href="#letter" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            Surat
          </a>
          <a href="#wishes" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            Doa & Harapan
          </a>
          <a href="#cake" className="hover:text-rose-600 transition-colors whitespace-nowrap">
            Kue Ulang Tahun
          </a>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2">
          {/* Music button */}
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Jeda musik' : 'Putar lagu Raja Giannuca'}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              isPlaying
                ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                : 'bg-white hover:bg-rose-50 text-stone-700 border-rose-200'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Raja Giannuca</span>
                <span className="flex items-center gap-0.5 ml-0.5">
                  <span className="w-1 h-2.5 bg-white rounded-full animate-bounce" />
                  <span className="w-1 h-3.5 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span>Putar Musik</span>
              </>
            )}
          </button>

          {/* Quick celebrate */}
          <button
            type="button"
            onClick={onTriggerFireworks}
            title="Nyalakan kembang api"
            className="hidden sm:flex p-1.5 rounded-full text-rose-500 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Lock */}
          <button
            type="button"
            onClick={onLock}
            title="Kunci kembali"
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-rose-50 transition-colors cursor-pointer"
            aria-label="Kunci kembali"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
