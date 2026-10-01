/**
 * Web Audio API synthesizer for Raja Giannuca - "Masa Ini, Nanti, dan Masa Indah Lainnya"
 * Plays a warm, nostalgic acoustic piano ballad melody inspired by the song.
 * Also supports loading a local audio file if user chooses to upload the original track.
 */

class SoundPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private volume = 0.6;
  private currentStep = 0;
  private timer: number | null = null;
  private listeners: Set<() => void> = new Set();
  
  // Custom audio element support if user uploads or provides audio
  private audioElement: HTMLAudioElement | null = null;
  private isCustomAudio = false;

  // Title and track info
  public trackTitle = 'Masa Ini, Nanti, dan Masa Indah Lainnya';
  public artist = 'Raja Giannuca';

  // Melody & chord progression in C/Am evoking the warm, gentle Indonesian ballad:
  // C - G/B - Am7 - Em - F - C/E - Dm7 - Gsus4 - G - C
  private sequence = [
    // Phrase 1: "Masa ini..." (Cmaj7)
    { notes: [48, 60, 64, 67, 72], duration: 0.7 },
    { notes: [71], duration: 0.35 },
    { notes: [67], duration: 0.35 },
    { notes: [64], duration: 0.4 },

    // Phrase 2: (G/B)
    { notes: [47, 59, 62, 67], duration: 0.7 },
    { notes: [69], duration: 0.35 },
    { notes: [67], duration: 0.35 },
    { notes: [62], duration: 0.4 },

    // Phrase 3: "...nanti dan masa indah lainnya" (Am7)
    { notes: [45, 57, 60, 64, 69], duration: 0.7 },
    { notes: [71], duration: 0.35 },
    { notes: [72], duration: 0.35 },
    { notes: [74], duration: 0.4 },

    // Phrase 4: (Em7 / G)
    { notes: [52, 55, 59, 64], duration: 0.6 },
    { notes: [67], duration: 0.35 },
    { notes: [64], duration: 0.35 },
    { notes: [59], duration: 0.4 },

    // Phrase 5: (Fmaj7 - gentle resolution)
    { notes: [41, 53, 57, 60, 65], duration: 0.7 },
    { notes: [64], duration: 0.35 },
    { notes: [60], duration: 0.35 },
    { notes: [57], duration: 0.4 },

    // Phrase 6: (C/E)
    { notes: [40, 52, 55, 60, 64], duration: 0.6 },
    { notes: [67], duration: 0.35 },
    { notes: [64], duration: 0.35 },
    { notes: [60], duration: 0.4 },

    // Phrase 7: (Dm7 -> Gsus4)
    { notes: [38, 50, 53, 57, 62], duration: 0.6 },
    { notes: [65], duration: 0.3 },
    { notes: [43, 55, 58, 62, 67], duration: 0.6 },
    { notes: [71], duration: 0.4 },

    // Phrase 8: (C resolve)
    { notes: [48, 55, 60, 64, 72], duration: 0.9 },
    { notes: [76], duration: 0.4 },
    { notes: [72], duration: 0.5 },
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public loadCustomAudio(file: File) {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
    const url = URL.createObjectURL(file);
    this.audioElement = new Audio(url);
    this.audioElement.loop = true;
    this.audioElement.volume = this.volume;
    this.isCustomAudio = true;
    this.audioElement.onended = () => {
      if (this.isPlaying && this.audioElement) {
        this.audioElement.play();
      }
    };
    if (this.isPlaying) {
      this.audioElement.play();
    }
    this.notify();
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    if (this.isCustomAudio && this.audioElement) {
      this.audioElement.play().catch(() => {});
    } else {
      this.step();
    }
  }

  public pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getVolume() {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  private midiToFreq(midi: number) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private playTone(freq: number, duration: number, isBass: boolean) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = isBass ? 'triangle' : 'sine';
    osc2.type = isBass ? 'sine' : 'triangle';

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 1.002, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 850 : 2200, now);
    filter.frequency.exponentialRampToValueAtTime(isBass ? 450 : 950, now + duration);

    const baseGain = (isBass ? 0.35 : 0.22) * this.volume;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(baseGain, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.6);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration * 1.7);
    osc2.stop(now + duration * 1.7);
  }

  private step() {
    if (!this.isPlaying || !this.ctx || this.isCustomAudio) return;

    const item = this.sequence[this.currentStep];
    item.notes.forEach((midi, idx) => {
      window.setTimeout(() => {
        if (this.isPlaying && !this.isCustomAudio) {
          this.playTone(this.midiToFreq(midi), item.duration, midi < 60);
        }
      }, idx * 50);
    });

    const stepDurationMs = item.duration * 1000 + 120;
    this.currentStep = (this.currentStep + 1) % this.sequence.length;

    this.timer = window.setTimeout(() => {
      this.step();
    }, stepDurationMs);
  }

  public playBlowoutSound() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.45;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.45);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  public playFireworkBoom() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.45);

    oscGain.gain.setValueAtTime(0.5 * this.volume, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);

    const pitches = [523.25, 659.25, 783.99, 1046.5];
    pitches.forEach((freq, idx) => {
      window.setTimeout(() => {
        if (!this.ctx) return;
        const chime = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(freq, this.ctx.currentTime);
        chimeGain.gain.setValueAtTime(0.12 * this.volume, this.ctx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
        chime.connect(chimeGain);
        chimeGain.connect(this.ctx.destination);
        chime.start(this.ctx.currentTime);
        chime.stop(this.ctx.currentTime + 0.6);
      }, idx * 60);
    });
  }
}

export const soundPlayer = new SoundPlayer();
