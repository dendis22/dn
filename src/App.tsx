/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PasscodeLock } from './components/PasscodeLock';
import { Navbar } from './components/Navbar';
import { SurfaceHero } from './components/SurfaceHero';
import { MemoriesSection } from './components/MemoriesSection';
import { GallerySection } from './components/GallerySection';
import { LetterSection } from './components/LetterSection';
import { WishesSection } from './components/WishesSection';
import { CakeSection } from './components/CakeSection';
import { FireworksCanvas } from './components/FireworksCanvas';
import { soundPlayer } from './audio/soundPlayer';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [fireworksActive, setFireworksActive] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Automatically start the gentle soothing ambient acoustic melody upon unlock
    soundPlayer.play();
  };

  const handleLock = () => {
    soundPlayer.pause();
    setIsUnlocked(false);
  };

  const triggerFireworks = () => {
    setFireworksActive(false);
    // Restart animation
    setTimeout(() => {
      setFireworksActive(true);
    }, 20);
  };

  if (!isUnlocked) {
    return <PasscodeLock onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F8] text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900 relative">
      {/* Fullscreen Canvas Fireworks System */}
      <FireworksCanvas
        active={fireworksActive}
        onComplete={() => setFireworksActive(false)}
      />

      {/* Top Navigation Bar with 3-Zone Contract */}
      <Navbar onLock={handleLock} onTriggerFireworks={triggerFireworks} />

      <main>
        {/* Section 1: Surface - Exact requested title, heartfelt loving message, and music player */}
        <SurfaceHero />

        {/* Section 2: Our Memories - Introduction + 4 chapters */}
        <MemoriesSection />

        {/* Section 3: Gallery - Titled "A few of my role model shots of you", 8 photos with loving captions */}
        <GallerySection />

        {/* Section 4: The Letter - Heartfelt letter from a younger sibling */}
        <LetterSection />

        {/* Section 5: Wishes - Six heartfelt wishes */}
        <WishesSection />

        {/* Section 6 / Bottom: Final Happy Birthday message, cake with single candle, clicking triggers fireworks */}
        <CakeSection onTriggerFireworks={triggerFireworks} />
      </main>
    </div>
  );
}
