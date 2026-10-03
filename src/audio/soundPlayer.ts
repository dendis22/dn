/**
 * Web Audio & MP3 Player for:
 * Raja Giannuca - "Masa Ini, Nanti, dan Masa Indah Lainnya"
 * 
 * Fitur:
 * 1. Otomatis memuat file /audio/song.mp3 jika tersedia di folder /public/audio/song.mp3
 * 2. Menyimpan file MP3 yang Anda unggah ke penyimpanan browser (IndexedDB)
 *    sehingga saat halaman dibuka kembali, lagu pilihan Anda LANGSUNG AKTIF otomatis!
 * 3. Melodi sintetis akustik sebagai fallback bawaan yang nyaman dan syahdu.
 */

const DB_NAME = 'BirthdayMusicDB';
const STORE_NAME = 'musicStore';
const MUSIC_KEY = 'userSong';

class SoundPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private volume = 0.6;
  private currentStep = 0;
  private timer: number | null = null;
  private listeners: Set<() => void> = new Set();
  
  private audioElement: HTMLAudioElement | null = null;
  public isCustomAudio = false;
  public currentTrackName = 'Masa ini, Nanti, dan Masa Indah Lainnya';
  public artist = 'Nuca';
  public isLoadedFromStorage = false;

  // Melodi sintetis akustik Raja Giannuca
  private sequence = [
    { notes: [48, 60, 64, 67, 72], duration: 0.7 },
    { notes: [71], duration: 0.35 },
    { notes: [67], duration: 0.35 },
    { notes: [64], duration: 0.4 },
    { notes: [47, 59, 62, 67], duration: 0.7 },
    { notes: [69], duration: 0.35 },
    { notes: [67], duration: 0.35 },
    { notes: [62], duration: 0.4 },
    { notes: [45, 57, 60, 64, 69], duration: 0.7 },
    { notes: [71], duration: 0.35 },
    { notes: [72], duration: 0.35 },
    { notes: [74], duration: 0.4 },
    { notes: [52, 55, 59, 64], duration: 0.6 },
    { notes: [67], duration: 0.35 },
    { notes: [64], duration: 0.35 },
    { notes: [59], duration: 0.4 },
    { notes: [41, 53, 57, 60, 65], duration: 0.7 },
    { notes: [64], duration: 0.35 },
    { notes: [60], duration: 0.35 },
    { notes: [57], duration: 0.4 },
    { notes: [40, 52, 55, 60, 64], duration: 0.6 },
    { notes: [67], duration: 0.35 },
    { notes: [64], duration: 0.35 },
    { notes: [60], duration: 0.4 },
    { notes: [38, 50, 53, 57, 62], duration: 0.6 },
    { notes: [65], duration: 0.3 },
    { notes: [43, 55, 58, 62, 67], duration: 0.6 },
    { notes: [71], duration: 0.4 },
    { notes: [48, 55, 60, 64, 72], duration: 0.9 },
    { notes: [76], duration: 0.4 },
    { notes: [72], duration: 0.5 },
  ];

  constructor() {
    // Inisialisasi pengecekan lagu tersimpan saat web dimuat
    if (typeof window !== 'undefined') {
      this.initStoredAudio();
    }
  }

  private async initStoredAudio() {
    try {
      // 0. Cek preloaded audio string (misal dari HTML bundle mandiri)
      if (typeof window !== 'undefined' && (window as any).__PRELOADED_CUSTOM_AUDIO__) {
        const audioData = (window as any).__PRELOADED_CUSTOM_AUDIO__;
        if (audioData.dataUrl) {
          const res = await fetch(audioData.dataUrl);
          const blob = await res.blob();
          this.setupAudioElement({ blob, name: audioData.name || 'Lagu Pilihan Pribadi' }, audioData.name);
          this.isLoadedFromStorage = true;
          this.notify();
          return;
        }
      }

      // 1. Cek apakah ada file MP3 tersimpan di IndexedDB browser
      const savedBlob = await this.getAudioFromDB();
      if (savedBlob) {
        this.setupAudioElement(savedBlob, 'Masa ini, Nanti, dan Masa Indah Lainnya');
        this.isLoadedFromStorage = true;
        this.notify();
        return;
      }

      // 2. Cek apakah ada file statis di /audio/song.mp3
      const response = await fetch('/audio/song.mp3', { method: 'HEAD' });
      if (response.ok && response.headers.get('content-type')?.includes('audio')) {
        const audio = new Audio('/audio/song.mp3');
        audio.loop = true;
        audio.volume = this.volume;
        this.audioElement = audio;
        this.isCustomAudio = true;
        this.notify();
      }
    } catch {
      // Gunakan sintetis jika tidak ada file statis
    }
  }

  // --- IndexedDB Storage Helper ---
  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(STORE_NAME);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  private async saveAudioToDB(blob: Blob, name: string) {
    try {
      const db = await this.openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put({ blob, name }, MUSIC_KEY);
    } catch {
      // Ignore storage errors
    }
  }

  private async getAudioFromDB(): Promise<{ blob: Blob; name: string } | null> {
    try {
      const db = await this.openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).get(MUSIC_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  }

  public async clearStoredAudio() {
    try {
      const db = await this.openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(MUSIC_KEY);
    } catch {
      // Ignore
    }
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
    this.isCustomAudio = false;
    this.isLoadedFromStorage = false;
    this.currentTrackName = 'Masa ini, Nanti, dan Masa Indah Lainnya';
    this.notify();
  }

  private setupAudioElement(data: { blob: Blob; name: string } | File, trackName?: string) {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
    const blob = data instanceof File ? data : data.blob;
    const name = trackName || (data instanceof File ? data.name : data.name);
    const url = URL.createObjectURL(blob);
    this.audioElement = new Audio(url);
    this.audioElement.loop = true;
    this.audioElement.volume = this.volume;
    this.isCustomAudio = true;
    if (name) {
      this.currentTrackName = name.replace(/\.[^/.]+$/, '');
    }
    this.notify();
  }

  public async getAudioBase64(): Promise<string | null> {
    const saved = await this.getAudioFromDB();
    if (!saved) return null;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(saved.blob);
    });
  }

  public async loadCustomAudio(file: File) {
    // 1. Pasang langsung ke audio player
    this.setupAudioElement(file, file.name);

    // 2. Simpan secara permanen di IndexedDB browser
    await this.saveAudioToDB(file, file.name);
    this.isLoadedFromStorage = true;
    this.notify();
  }

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

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    if (this.isCustomAudio && this.audioElement) {
      this.audioElement.play().catch(() => {
        // Fallback ke sintetis jika autoplay tertahan
        this.step();
      });
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
