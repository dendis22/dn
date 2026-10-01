import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { BirthdayWish } from '../types';

const wishesData: BirthdayWish[] = [
  {
    id: 1,
    title: 'Kesehatan & Kebugaran Jiwa Raga',
    subtitle: 'Kesehatan & Ketenangan',
    message: 'Semoga setiap pagi menyapamu dengan raga yang bugar, langkah yang ringan, dan tidur yang nyenyak tanpa beban setiap malam.',
    blessing: 'Semoga kesehatan dan perlindungan terbaik selalu menyertai langkahmu.'
  },
  {
    id: 2,
    title: 'Kebahagiaan & Tawa Melimpah',
    subtitle: 'Sinar Sukacita',
    message: 'Semoga hari-harimu selalu dihiasi kejutan manis, canda tawa hangat bersama orang-orang tersayang, dan hati yang selalu lapang.',
    blessing: 'Semoga kesedihan tak menemukan tempat di hati yang sehangat hatimu.'
  },
  {
    id: 3,
    title: 'Terwujudnya Segala Impian',
    subtitle: 'Kemenangan & Kesuksesan',
    message: 'Semoga setiap cita-cita, rencana baik, dan mimpi yang kau simpan dalam doa dibukakan jalannya dengan kemudahan dan kesuksesan gemilang.',
    blessing: 'Semoga semesta membalas setiap kebaikan yang kau tabur dengan berkah melimpah.'
  },
  {
    id: 4,
    title: 'Waktu Istirahat & Memanjakan Diri',
    subtitle: 'Ketenangan Diri',
    message: 'Kau telah sekian lama merawat dan mendahulukan orang lain; semoga di usia baru ini kau memiliki banyak waktu untuk beristirahat dan memanjakan dirimu.',
    blessing: 'Kau berhak diperlakukan dengan kelembutan yang sama seperti yang kau berikan.'
  },
  {
    id: 5,
    title: 'Cinta yang Berlipat Ganda',
    subtitle: 'Dikelilingi Ketulusan',
    message: 'Semoga kau selalu merasa sangat dihargai, dijaga, dan dicintai sedalam cinta tulus yang kau curahkan untuk keluarga selama ini.',
    blessing: 'Semoga kebaikan yang kau berikan kembali padamu dalam wujud kebahagiaan berlipat.'
  },
  {
    id: 6,
    title: 'Kebanggaan Diri & Kedamaian Batin',
    subtitle: 'Inspirasi Sejati',
    message: 'Semoga setiap kali bercermin, kau menyadari betapa hebat, anggun, dan berharganya dirimu sebagai teladan dan kebanggaan keluarga.',
    blessing: 'Tetaplah bersinar, karena kehadiranmu adalah anugerah terbesar bagi kami.'
  }
];

export const WishesSection: React.FC = () => {
  const [blessed, setBlessed] = useState<Record<number, boolean>>({});

  const toggleBlessing = (id: number) => {
    setBlessed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="wishes" className="py-20 px-4 sm:px-6 bg-[#FFF9FA]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Doa Terbaik untuk Usia Baru</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-2">
            Enam Harapan & Doa Tulus (Wishes)
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Untaian doa terbaik untuk sosok tercinta. Klik salah satu kartu doa untuk menyampaikan
            amin dan harapan terbaikmu.
          </p>
        </div>

        {/* 6 Wishes Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {wishesData.map((wish) => {
            const isDone = !!blessed[wish.id];
            return (
              <div
                key={wish.id}
                onClick={() => toggleBlessing(wish.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isDone
                    ? 'bg-rose-50/80 border-rose-300 shadow-xs'
                    : 'bg-white hover:bg-rose-50/30 border-rose-100 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                      Doa 0{wish.id}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isDone ? 'fill-rose-500 text-rose-500' : 'text-stone-300'
                        }`}
                      />
                      <span>{isDone ? 'Diaminkan' : 'Klik untuk Amin'}</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-stone-800 text-base mb-1.5">
                    {wish.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 font-sans">
                    {wish.message}
                  </p>
                </div>

                <div className="pt-3 border-t border-rose-100/60">
                  <p className="text-xs text-rose-600 italic font-serif leading-relaxed">
                    &ldquo;{wish.blessing}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
