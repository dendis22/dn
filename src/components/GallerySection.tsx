import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { GalleryPhoto } from '../types';
import { getAllCustomPhotos } from '../utils/photoStorage';

const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    src: '/src/assets/images/role_model_portrait_1790842563776.jpg',
    title: 'Keanggunan & Keteduhan',
    caption: 'Seperti pancaran cahaya lembut kehadiranmu selalu meneduhkan hati',
    dateOrTag: 'Keanggunan Sejati',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 2,
    src: '/src/assets/images/cherished_moments_1790842576406.jpg',
    title: 'Tawa Bersama yang Hangat',
    caption: 'menyimpan tawa terbaik dalam 1 bingkai kenangan',
    dateOrTag: 'Momen Bahagia',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 3,
    src: '/src/assets/images/sister_guidance_1790842588588.jpg',
    title: 'Bimbingan Penuh Sabar',
    caption: 'melihat senyummu adalah pengingat terbaik tentang bagaimana ketulusan dan kesabaran bisa menenangkan hati',
    dateOrTag: 'Teladan & Nasihat',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 4,
    src: '/src/assets/images/sister_nature_walk_1790842603393.jpg',
    title: 'Ketenangan Jiwa',
    caption: 'kadang yang kita butuhkan hanyalah tempat yang nyaman untuk menjernihkan pikiran',
    dateOrTag: 'Ketenangan Hati',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 5,
    src: '/src/assets/images/sister_achievement_1790842616881.jpg',
    title: 'Tekad & Ketangguhan',
    caption: 'Setiap keringat dan lelahmu hari ini adalah fondasi bagi masa depan gemilang yang sedang kamu bangun',
    dateOrTag: 'Semangat Berjuang',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 6,
    src: '/src/assets/images/sister_candid_smile_1790842632605.jpg',
    title: 'Senyuman yang Menyejukkan',
    caption: 'Senyuman hangat yang selalu menjadi tempat berteduh paling aman dari segala lelah',
    dateOrTag: 'Tulus dari Hati',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 7,
    src: '/src/assets/images/sister_sunset_view_1790842644610.jpg',
    title: 'Refleksi Senja',
    caption: 'Seperti senja yang menenangkan, kasih sayangmu selalu menghangatkan hatiku tanpa pernah meminta balasan',
    dateOrTag: 'Syukur Mendalam',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 8,
    src: '/src/assets/images/sister_celebration_1790842695091.jpg',
    title: 'Hari yang Berbunga',
    caption: 'Dedikasi nyata dan integritas tinggi dari seorang panutan yang selalu menjadi kebanggaan keluarga.',
    dateOrTag: 'Perayaan Cinta',
    aspect: 'aspect-[4/3]'
  }
];

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialGalleryPhotos);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  
  // All photos marked as favorite with red heart by default
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>(() => {
    const favorites: Record<number, boolean> = {};
    for (let i = 1; i <= 8; i++) {
      favorites[i] = true;
    }
    return favorites;
  });

  // Permanently load custom photos stored in IndexedDB if any
  useEffect(() => {
    async function loadSavedPhotos() {
      const stored = await getAllCustomPhotos();
      if (Object.keys(stored).length > 0) {
        setPhotos(
          initialGalleryPhotos.map((p) => {
            const custom = stored[p.id];
            if (custom) {
              return {
                ...p,
                src: custom.src,
                caption: p.caption
              };
            }
            return p;
          })
        );
      }
    }
    loadSavedPhotos();
  }, []);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 bg-[#FFF9FA]">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-rose-600 mb-2 bg-rose-100/70 px-3 py-1 rounded-full border border-rose-200">
            <Camera className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Koleksi Foto Kenangan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-stone-950 tracking-tight mb-2">
            Potret Istimewa Kakakku Tersayang
          </h2>
          <p className="text-stone-800 font-semibold text-xs sm:text-sm leading-relaxed">
            Delapan potret istimewa yang merekam keanggunan, keteguhan, dan kehangatan kasihmu.
          </p>
        </div>

        {/* 8-Photo Clean Grid: Pure visual photo cards without text or labels */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {photos.map((photo, index) => {
            const isLiked = !!likedPhotos[photo.id];

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className="bg-white border-2 border-rose-200/90 hover:border-rose-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group relative aspect-[4/3]"
              >
                <img
                  src={photo.src}
                  alt={`Foto kenangan ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Favorite Heart Button */}
                <div className="absolute top-2.5 right-2.5 z-10">
                  <button
                    type="button"
                    onClick={(e) => toggleLike(e, photo.id)}
                    className="w-8 h-8 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-xs cursor-pointer border border-rose-200 transition-transform active:scale-90"
                    title={isLiked ? "Foto Favorit" : "Tambah ke Favorit"}
                    aria-label="Foto Favorit"
                  >
                    <Heart
                      className={`w-4 h-4 stroke-[1.8] ${
                        isLiked ? 'fill-rose-600 text-rose-600' : 'text-stone-400'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kalimat di bawah foto */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm font-semibold text-stone-600 inline-flex items-center justify-center gap-1.5 bg-rose-50/80 px-4 py-1.5 rounded-full border border-rose-200/70">
            <span className="text-rose-500">✨</span>
            <span>Ketuk foto untuk membaca keterangannya</span>
          </p>
        </div>

        {/* Lightbox Modal: Shows the full photo AND only the description (no title) */}
        {selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-rose-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Tutup pratinjau foto"
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4 stroke-[2.2]" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-900 flex items-center justify-center shadow-md cursor-pointer border border-stone-200 transition-transform active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Foto selanjutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-900 flex items-center justify-center shadow-md cursor-pointer border border-stone-200 transition-transform active:scale-95"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Big Photo View */}
              <div className="aspect-[4/3] bg-stone-900">
                <img
                  src={photos[selectedPhotoIndex].src}
                  alt={`Foto kenangan ${selectedPhotoIndex + 1}`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Prominent Keterangan Deskripsi (Murni Deskripsi Saja) */}
              <div className="p-5 sm:p-6 bg-white border-t border-rose-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                    <span>Tersimpan di Favorit</span>
                  </span>
                </div>
                <div className="p-4 sm:p-5 bg-rose-50/70 rounded-2xl border border-rose-200">
                  <p className="text-sm sm:text-base text-stone-900 font-semibold leading-relaxed font-sans">
                    {photos[selectedPhotoIndex].caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
