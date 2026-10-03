import React, { useState } from 'react';
import { BookOpen, Heart, Quote, ChevronRight, ChevronLeft } from 'lucide-react';
import { Chapter } from '../types';

const chaptersData: Chapter[] = [
  {
    id: 1,
    numberString: 'Bab 01',
    title: 'Cahaya Penuntun di Langkah Pertamaku',
    subtitle: 'Di setiap langkah hidupku, ada jejak kebaikan Kakak yang menjadi petunjuk jalan.',
    quote: 'Sebelum aku mengenal arti keberanian, aku sudah melihatnya di matamu saat kau menjagaku.',
    content: [
      'Di setiap fase pertumbuhanku, ada bayang-bayang kebaikan Kakak yang selalu mendekap. Kakak adalah cahaya panutan yang kehangatannya tidak pernah pudar oleh waktu. Dari Kakak, aku belajar bahwa menjadi kuat bukan berarti tidak bisa menangis, dan menjadi hebat dimulai dari kerendahan hati.',
      'Setiap nasihatmu adalah bekal, dan setiap tindakanmu adalah cerminan bagi hidupku. Di momen ini, aku hanya ingin menyampaikan rasa terima kasih yang tak terhingga. Semoga cahaya kebaikan yang selalu Kakak pancarkan kepada orang lain, berbalik menerangi hidup Kakak dengan keberkahan, kesehatan, dan kebahagiaan yang berlipat ganda.'
    ],
    reflection: 'Bagi dunia, Kakak mungkin hanya satu orang. Namun bagiku, Kakak adalah cahaya panutan yang selalu menerangi jalan setapakku.'
  },
  {
    id: 2,
    numberString: 'Bab 02',
    title: 'Pengorbanan Sunyi & Keteguhan Hati',
    subtitle: 'Kasih tulus tanpa pamrih yang tak pernah menuntut balas',
    quote: 'Kekuatan sejati bukanlah yang bersuara lantang, melainkan kesabaran dalam mendahulukanku.',
    content: [
      'Semakin bertambah usiaku, semakin aku menyadari betapa banyak beban yang kau pikul dalam diam. Kau kerap mengorbankan waktu luang, istirahat, dan keinginan pribadimu demi memastikan aku mendapatkan yang terbaik.',
      'Tak sekalipun aku mendengar keluhan keluar dari bibirmu. Kau menjalani setiap rintangan dengan martabat dan keanggunan yang luar biasa. Dari pengorbanan sunyimu, aku belajar arti cinta yang sesungguhnya: sebuah pilihan untuk memberi tanpa pamrih.'
    ],
    reflection: 'Melihat ketabahanmu mengajarkanku cara menghadapi masa-masa sulit dengan kepala tegak dan hati yang tetap lembut.'
  },
  {
    id: 3,
    numberString: 'Bab 03',
    title: 'Pelajaran Hidup yang Membentuk Diriku',
    subtitle: 'Nasihat hangat yang menjadi pedoman langkahku hingga kini',
    quote: 'nasihat mu yang tegas terkadang membakar namun kasih sayangmu yang tulus selalu berhasil mendinginkan suasana',
    content: [
      'aku tahu dibalik emosimu yang mudah tersulut, ada hati yang paling cepat merasa iba dan paling pertama mengulurkan tangan saat aku kesulitan. kakak mengajarkanku bahwa manusia tidak harus sempurna untuk menjadi orang baik.',
      'pelajaran hidup darimu membuatku paham, bahwa kemarahanmu hanyalah selimut luar dari rasa khawatir yang teramat besar . Terima kasih telah menjadi pelindung yang tangguh sekaligus kakak yang luar biasa baik hati.'
    ],
    reflection: 'Bagiku, engkau adalah standar utama dalam hal ketabahan'
  },
  {
    id: 4,
    numberString: 'Bab 04',
    title: 'Tawa, Obrolan Malam & Ikatan yang Abadi',
    subtitle: 'Sukacita yang menjadikan kebersamaan kita anugerah terindah',
    quote: 'Dalam tawa renyah canda kita, aku menemukan tempat bersandar yang tulus seumur hidup',
    content: [
      'Selain menjadi pelindung dan panutan, kau adalah teman terbaik tempatku berbagi cerita apa adanya. Perjalanan mendadak kita, obrolan larut malam, serta tawa geli atas hal-hal konyol yang hanya kita berdua yang mengerti.',
      'Waktu dan jarak tak akan pernah mampu memudarkan ikatan ini. Di setiap musim kehidupan, mengetahui bahwa kau selalu ada di sisiku membuatku merasa tak terkalahkan.'
    ],
    reflection: 'Berapa pun usiaku kelak, kau akan selalu menjadi pahlawanku dan kakakku.'
  }
];

export const MemoriesSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeChapter = chaptersData[activeIdx];

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 bg-[#FFF6F8]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-rose-600 mb-2 bg-rose-100/70 px-3 py-1 rounded-full border border-rose-200">
            <BookOpen className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Babak Perjalanan Kita</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-stone-950 tracking-tight mb-2">
            Untaian Kenangan Indah
          </h2>
          <p className="text-stone-800 font-semibold text-xs sm:text-sm leading-relaxed">
            Kumpulan momen berharga, pengorbanan tulus, dan pelajaran hidup yang membangun
            pondasi cinta tak tergoyahkan.
          </p>
        </div>

        {/* 4 Chapter Clean Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {chaptersData.map((chap, idx) => (
            <button
              key={chap.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`p-3.5 rounded-xl text-left border-2 transition-colors cursor-pointer ${
                activeIdx === idx
                  ? 'bg-white border-rose-400 shadow-xs ring-1 ring-rose-300'
                  : 'bg-white/80 hover:bg-white border-rose-100 text-stone-800'
              }`}
            >
              <span className="text-xs font-mono font-bold text-rose-600 block">
                {chap.numberString}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-950 line-clamp-1 mt-0.5 block">
                {chap.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Chapter Content Card */}
        <div className="bg-white border-2 border-rose-200/90 rounded-2xl p-6 sm:p-9 shadow-xs">
          <div className="border-b border-rose-200 pb-5 mb-5">
            <span className="text-xs font-mono text-rose-600 font-bold uppercase tracking-wider">
              {activeChapter.numberString}
            </span>
            <h3 className="text-xl sm:text-3xl font-serif font-extrabold text-stone-950 mt-1 mb-1.5">
              {activeChapter.title}
            </h3>
            <p className="text-sm font-semibold text-stone-600 italic">
              {activeChapter.subtitle}
            </p>
          </div>

          {/* Quote */}
          <div className="bg-rose-50/90 border-l-4 border-rose-500 p-4 sm:p-5 rounded-r-xl mb-6">
            <p className="font-serif italic font-bold text-stone-950 text-base sm:text-lg leading-relaxed">
              &ldquo;{activeChapter.quote}&rdquo;
            </p>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-stone-800 font-medium text-base sm:text-lg leading-relaxed mb-6 font-sans">
            {activeChapter.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Reflection */}
          <div className="bg-rose-50/50 border border-rose-200 p-4 sm:p-5 rounded-xl flex items-start gap-3">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600 shrink-0 mt-1 stroke-[2.2]" />
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-rose-700 block mb-0.5">
                Catatan Hati
              </span>
              <p className="text-sm sm:text-base text-stone-900 font-serif italic font-semibold leading-relaxed">
                {activeChapter.reflection}
              </p>
            </div>
          </div>

          {/* Chapter controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-rose-100">
            <button
              type="button"
              disabled={activeIdx === 0}
              onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
                activeIdx === 0
                  ? 'opacity-40 cursor-not-allowed border-stone-200 text-stone-400'
                  : 'bg-white hover:bg-rose-50 text-stone-900 border-rose-300'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Bab Sebelumnya</span>
            </button>

            <span className="text-xs text-stone-900 font-bold font-mono">
              {activeIdx + 1} / {chaptersData.length}
            </span>

            <button
              type="button"
              disabled={activeIdx === chaptersData.length - 1}
              onClick={() => setActiveIdx((prev) => Math.min(chaptersData.length - 1, prev + 1))}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
                activeIdx === chaptersData.length - 1
                  ? 'opacity-40 cursor-not-allowed border-stone-200 text-stone-400'
                  : 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600 shadow-xs'
              }`}
            >
              <span>Bab Berikutnya</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
