import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Maximize2 } from 'lucide-react';
import { GalleryPhoto } from '../types';

const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    src: '/src/assets/images/role_model_portrait_1790842563776.jpg',
    title: 'Keanggunan & Keteduhan',
    caption: 'Keanggunan alami dan kehangatan hatimu yang selalu membuat suasana menjadi begitu menenangkan.',
    dateOrTag: 'Keanggunan Sejati',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 2,
    src: '/src/assets/images/cherished_moments_1790842576406.jpg',
    title: 'Tawa Bersama yang Hangat',
    caption: 'Tawa lepas yang kita bagi bersama—bukti bahwa momen sederhana bersamamu selalu menjadi harta paling berharga.',
    dateOrTag: 'Momen Bahagia',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 3,
    src: '/src/assets/images/sister_guidance_1790842588588.jpg',
    title: 'Bimbingan Penuh Sabar',
    caption: 'Sosok panutan sejatiku: melihat caramu membimbing, mendengarkan, dan memberi nasihat dengan penuh kelembutan.',
    dateOrTag: 'Teladan & Nasihat',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 4,
    src: '/src/assets/images/sister_nature_walk_1790842603393.jpg',
    title: 'Ketenangan Jiwa',
    caption: 'Menikmati indahnya alam bersama, mengingatkanku untuk selalu bersyukur dan menemukan keindahan dalam hal kecil.',
    dateOrTag: 'Ketenangan Hati',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 5,
    src: '/src/assets/images/sister_achievement_1790842616881.jpg',
    title: 'Tekad & Ketangguhan',
    caption: 'Keteguhan dan tekad kuatmu dalam meraih impian akan selalu menjadi inspirasi terbesarku untuk terus maju.',
    dateOrTag: 'Semangat Berjuang',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 6,
    src: '/src/assets/images/sister_candid_smile_1790842632605.jpg',
    title: 'Senyuman yang Menyejukkan',
    caption: 'Senyuman tulus dan hangat yang seketika menghapus semua rasa takut dan gelisah sejak masa kecilku.',
    dateOrTag: 'Tulus dari Hati',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 7,
    src: '/src/assets/images/sister_sunset_view_1790842644610.jpg',
    title: 'Refleksi Senja',
    caption: 'Berdiri menatap senja bersamamu, bersyukur memiliki sosok kakak yang mencintai dengan ketulusan seorang ibu.',
    dateOrTag: 'Syukur Mendalam',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 8,
    src: '/src/assets/images/sister_celebration_1790842695091.jpg',
    title: 'Hari yang Berbunga',
    caption: 'Potret kelembutan, martabat, dan kasih sayang sejati—jantung keluarga kita, hari ini dan selamanya.',
    dateOrTag: 'Perayaan Cinta',
    aspect: 'aspect-[4/3]'
  }
];

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>({});

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % galleryPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 bg-[#FFF9FA]">
      <div className="max-w-5xl mx-auto">
        {/* Exact required title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Koleksi Foto Kenangan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-2">
            A few of my role model shots of you
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Delapan potret istimewa yang merekam keanggunan, keteguhan, dan kehangatan kasihmu.
          </p>
        </div>

        {/* 8-Photo Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {galleryPhotos.map((photo, index) => {
            const isLiked = !!likedPhotos[photo.id];
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className="bg-white border border-rose-100 rounded-2xl overflow-hidden hover:border-rose-200 transition-all cursor-pointer flex flex-col shadow-2xs hover:shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-rose-50 overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={(e) => toggleLike(e, photo.id)}
                      className="w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-rose-500 shadow-xs cursor-pointer"
                      aria-label="Suka foto"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-medium text-rose-600 uppercase tracking-wider block mb-1">
                      {photo.dateOrTag}
                    </span>
                    <h3 className="font-serif font-bold text-stone-800 text-sm mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-sans">
                      {photo.caption}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-rose-50 text-[11px] text-rose-500 font-medium">
                    Lihat Foto Penuh →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Tutup pratinjau foto"
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Foto selanjutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="aspect-[4/3] bg-stone-900">
                <img
                  src={galleryPhotos[selectedPhotoIndex].src}
                  alt={galleryPhotos[selectedPhotoIndex].title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 bg-white border-t border-rose-100">
                <div className="flex items-center justify-between text-xs text-rose-500 font-medium mb-1">
                  <span>Foto {selectedPhotoIndex + 1} dari {galleryPhotos.length}</span>
                  <span>{galleryPhotos[selectedPhotoIndex].dateOrTag}</span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-1">
                  {galleryPhotos[selectedPhotoIndex].title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  {galleryPhotos[selectedPhotoIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
