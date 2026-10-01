import React, { useState } from 'react';
import { BookOpen, Heart, Quote, ChevronRight, ChevronLeft } from 'lucide-react';
import { Chapter } from '../types';

const chaptersData: Chapter[] = [
  {
    id: 1,
    numberString: 'Bab 01',
    title: 'Cahaya Penuntun di Langkah Pertamaku',
    subtitle: 'Saat tanganmu menggenggam jemariku agar aku tak takut melangkah',
    quote: 'Sebelum aku mengenal arti keberanian, aku sudah melihatnya di matamu saat kau menjagaku.',
    content: [
      'Sejak ingatan paling awal dalam hidupku, kehadiranmu selalu menjadi tempat perlindungan yang paling aman. Di saat aku masih belajar mengenal dunia, kau selalu ada mendahului rasa takutku.',
      'Kau mengikat tali sepatuku saat jemari kecilku belum sanggup, menyemangatiku di hari pertama sekolah, dan memelukku hangat saat gemuruh petir membuatku menangis. Kau menjadi sosok ibu bagiku jauh sebelum kau harus melakukannya, memberi rasa aman yang membuat duniaku terasa begitu ramah.'
    ],
    reflection: 'Kau memberiku keberanian untuk melangkah bebas di dunia ini, karena aku tahu kau akan selalu ada menjagaku.'
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
    quote: 'Nasihatmu bukanlah tuntutan, melainkan lentera lembut yang menuntunku menemukan jati diri.',
    content: [
      'Setiap kali aku merasa bimbang, gagal, atau terluka, kamarmu selalu menjadi tempat ternyaman untuk berteduh. Ditemani secangkir teh hangat dan obrolan tanpa tergesa-gesa, kau selalu mendengarkan tanpa menghakimi.',
      'Kau mengajarkanku bahwa kebaikan hati bukanlah kelemahan, kejujuran adalah mahkota, dan menghargai orang lain dimulai dari menghormati diri sendiri. Segala hal baik dalam caraku memperlakukan sesama hari ini adalah buah dari teladan yang kau contohkan.'
    ],
    reflection: 'Bagiku, kau adalah tolok ukur kesabaran, kebijaksanaan, dan keanggunan budi pekerti.'
  },
  {
    id: 4,
    numberString: 'Bab 04',
    title: 'Tawa, Obrolan Malam & Ikatan yang Abadi',
    subtitle: 'Sukacita yang menjadikan kebersamaan kita anugerah terindah',
    quote: 'Dalam tawa renyah dan canda kita, aku menemukan sahabat sejati seumur hidup.',
    content: [
      'Selain menjadi pelindung dan panutan, kau adalah teman terbaik tempatku berbagi cerita apa adanya. Perjalanan mendadak kita, obrolan larut malam, serta tawa geli atas hal-hal konyol yang hanya kita berdua yang mengerti.',
      'Waktu dan jarak tak akan pernah mampu memudarkan ikatan ini. Di setiap musim kehidupan, mengetahui bahwa kau selalu ada di sisiku membuatku merasa tak terkalahkan.'
    ],
    reflection: 'Berapa pun usiaku kelak, kau akan selalu menjadi pahlawanku, kakakku, dan ibu keduaku.'
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
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Babak Perjalanan Kita</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-2">
            Kenangan Kita (Our Memories)
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Kumpulan momen berharga, pengorbanan tulus, dan pelajaran hidup yang membangun
            pondasi cinta tak tergoyahkan.
          </p>
        </div>

        {/* 4 Chapter Clean Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {chaptersData.map((chap, idx) => (
            <button
              key={chap.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`p-3 rounded-xl text-left border transition-colors cursor-pointer ${
                activeIdx === idx
                  ? 'bg-white border-rose-300 shadow-xs ring-1 ring-rose-200'
                  : 'bg-white/60 hover:bg-white border-rose-100 text-stone-600'
              }`}
            >
              <span className="text-[11px] font-mono font-medium text-rose-600 block">
                {chap.numberString}
              </span>
              <span className="text-xs font-semibold text-stone-800 line-clamp-1 mt-0.5 block">
                {chap.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Chapter Content Card */}
        <div className="bg-white border border-rose-100 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="border-b border-rose-100 pb-5 mb-5">
            <span className="text-xs font-mono text-rose-500 font-medium">
              {activeChapter.numberString}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1 mb-1">
              {activeChapter.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 italic">
              {activeChapter.subtitle}
            </p>
          </div>

          {/* Quote */}
          <div className="bg-rose-50/70 border-l-3 border-rose-400 p-4 rounded-r-xl mb-6">
            <p className="font-serif italic text-stone-700 text-sm sm:text-base leading-relaxed">
              &ldquo;{activeChapter.quote}&rdquo;
            </p>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed mb-6 font-sans">
            {activeChapter.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Reflection */}
          <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl flex items-start gap-3">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-700 block mb-0.5">
                Catatan Hati
              </span>
              <p className="text-xs sm:text-sm text-stone-700 font-serif italic leading-relaxed">
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
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
                activeIdx === 0
                  ? 'opacity-40 cursor-not-allowed border-stone-200 text-stone-400'
                  : 'bg-white hover:bg-rose-50 text-stone-700 border-rose-200'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Bab Sebelumnya</span>
            </button>

            <span className="text-xs text-stone-600 font-mono">
              {activeIdx + 1} / {chaptersData.length}
            </span>

            <button
              type="button"
              disabled={activeIdx === chaptersData.length - 1}
              onClick={() => setActiveIdx((prev) => Math.min(chaptersData.length - 1, prev + 1))}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
                activeIdx === chaptersData.length - 1
                  ? 'opacity-40 cursor-not-allowed border-stone-200 text-stone-400'
                  : 'bg-rose-500 hover:bg-rose-600 text-white border-rose-500 shadow-xs'
              }`}
            >
              <span>Bab Berikutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
