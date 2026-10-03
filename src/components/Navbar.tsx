import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, Play, Pause } from 'lucide-react';
import { soundPlayer } from '../audio/soundPlayer';

interface NavbarProps {
  onLock: () => void;
  onTriggerFireworks: () => void;
}

const navItems = [
  { id: 'surface', label: 'Beranda' },
  { id: 'memories', label: 'Kenangan' },
  { id: 'gallery', label: 'Galeri' },
  { id: 'letter', label: 'Surat' },
  { id: 'wishes', label: 'Doa & Harapan' },
  { id: 'cake', label: 'Tiup Lilin' }
];

export const Navbar: React.FC<NavbarProps> = ({ onLock, onTriggerFireworks }) => {
  const [isPlaying, setIsPlaying] = useState(soundPlayer.getIsPlaying());
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('surface');

  useEffect(() => {
    const unsub = soundPlayer.subscribe(() => {
      setIsPlaying(soundPlayer.getIsPlaying());
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section based on scroll offset
      const sectionIds = ['surface', 'memories', 'gallery', 'letter', 'wishes', 'cake'];
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMusic = () => {
    soundPlayer.toggle();
  };

  const handleNavClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b-2 border-rose-200 py-2 sm:py-2.5 shadow-sm'
          : 'bg-white/70 backdrop-blur-xs py-3 border-b border-rose-100/60'
      }`}
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#surface"
            onClick={(e) => handleNavClick('surface', e)}
            className="text-sm sm:text-base font-serif font-extrabold text-stone-950 hover:text-rose-600 transition-colors whitespace-nowrap mr-2"
          >
            Untuk Panutan Hidupku
          </a>

          {/* Desktop Navigation with high-visibility active highlight */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-stone-100/70 rounded-full border border-rose-200/60">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`text-xs lg:text-sm font-extrabold px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400/50 scale-102'
                      : 'text-stone-700 hover:text-rose-600 hover:bg-white/80'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions: Music & Lock */}
          <div className="flex items-center gap-2">
            {/* Direct Play/Pause Button */}
            <button
              type="button"
              onClick={toggleMusic}
              aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                isPlaying
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-white hover:bg-rose-50 text-stone-900 border-rose-300'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current stroke-[2]" />
                  <span className="hidden sm:inline">Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current stroke-[2]" />
                  <span className="hidden sm:inline">Putar</span>
                </>
              )}
            </button>

            {/* Quick celebrate */}
            <button
              type="button"
              onClick={onTriggerFireworks}
              title="Nyalakan kembang api"
              className="p-1.5 rounded-full text-rose-600 hover:bg-rose-100 border-2 border-rose-300 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>

            {/* Lock */}
            <button
              type="button"
              onClick={onLock}
              title="Kunci kembali"
              className="p-1.5 rounded-full text-stone-600 hover:text-stone-950 hover:bg-rose-100 border-2 border-transparent hover:border-rose-200 transition-colors cursor-pointer"
              aria-label="Kunci kembali"
            >
              <Lock className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Nav Bar with Active Highlight */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 no-scrollbar border-t border-rose-100 mt-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`text-[11px] font-extrabold px-3 py-1 rounded-full transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400/50'
                    : 'bg-white/90 text-stone-700 border border-rose-200/60'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};
