import React, { useState } from 'react';
import { Mail, Heart, Copy, Check } from 'lucide-react';

export const LetterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const letterContent = `Untuk Kakakku Tersayang dan Panutan Hidupku,

Saat mengetik surat ini, rasanya kata-kata tak pernah cukup untuk menampung rasa terima kasih dan syukur yang memenuhi hatiku setiap kali mengingatmu. Sejak aku masih kecil dan belum memahami dunia, kau sudah berdiri kokoh—bukan sekadar sebagai seorang kakak, tetapi sebagai pelindung, guru, dan sosok panutan yang merawat jiwaku dengan kesabaran tiada tara.

Untuk Kakakku tersayang. Aku tahu kadang Kakak mudah marah dan bicara dengan nada tinggi saat aku melakukan kesalahan. Namun, di balik ketegasan itu, aku selalu tahu bahwa Kakak adalah orang pertama yang ingin melindungiku. Terima kasih sudah menjadi benteng pertahanan terbaikku, mengajarkanku arti disiplin, dan selalu menyayangi serta mendukungku dengan caramu yang unik.

Kau menunjukkan kepadaku arti ketulusan yang sesungguhnya lewat tindakan nyata: hadir di saat-saat tersulitku, peka terhadap dukaku bahkan sebelum aku mengeluh, dan memastikan aku selalu merasa didekap kehangatan.

Segala nilai baik yang kumiliki hari ini—caraku memperlakukan orang lain, caraku bangkit dari kegagalan, dan ketulusan yang kupelajari—semuanya bersumber dari teladan yang kau jalani. Kau adalah kompas hidupku, inspirasi terbesarku, dan tempat paling nyaman di dunia ini.

Di hari ulang tahunmu ini, aku ingin berjanji: sebagaimana kau selalu setia menjagaku, aku pun akan selalu ada untuk mendukung, menjaga, dan membanggakanmu. Semoga hari-harimu ke depan selalu dipenuhi dengan kebahagiaan, ketenangan jiwa, dan cinta yang berlimpah.

Selamat ulang tahun, sosok panutan terhebatku. Aku menyayangimu lebih dari yang bisa terucap oleh kata-kata.

Dari Adikmu Tersayang.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="letter" className="py-20 px-4 sm:px-6 bg-[#FFF6F8]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-rose-600 mb-2 bg-rose-100/70 px-3 py-1 rounded-full border border-rose-200">
            <Mail className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Surat dari Lubuk Hati</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-stone-950 tracking-tight mb-2">
            Surat Hangat untukmu
          </h2>
          <p className="text-stone-800 font-semibold text-xs sm:text-sm leading-relaxed">
            Untaian kata tulus dari seorang adik yang sangat bersyukur memiliki sosok hebat sepertimu.
          </p>
        </div>

        {/* Clean, Simple, Highly Readable Letter Container with bold text */}
        <div className="bg-white border-2 border-rose-200/90 rounded-3xl p-6 sm:p-10 shadow-xs relative">
          {/* Letter Header */}
          <div className="flex items-center justify-between border-b border-rose-200 pb-5 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-rose-600 uppercase tracking-widest block mb-0.5">
                Pesan Khusus Ulang Tahun
              </span>
              <h3 className="font-serif italic font-extrabold text-xl sm:text-3xl text-stone-950">
                Untuk Kakakku Tersayang
              </h3>
            </div>
            <div className="w-11 h-11 rounded-full bg-rose-100/80 border border-rose-300 flex items-center justify-center text-rose-600">
              <Heart className="w-5 h-5 fill-rose-600 text-rose-600 stroke-[2.2]" />
            </div>
          </div>

          {/* Letter Body in clean, readable, bold paragraphs */}
          <div className="space-y-5 text-stone-800 font-medium text-base sm:text-lg leading-relaxed font-sans">
            <p>
              Saat mengetik surat ini, rasanya kata-kata tak pernah cukup untuk menampung rasa
              terima kasih dan syukur yang memenuhi hatiku setiap kali mengingatmu. Sejak aku masih
              kecil dan belum memahami dunia, kau sudah berdiri kokoh—bukan sekadar sebagai seorang
              kakak, tetapi sebagai pelindung, guru, dan sosok panutan yang merawat jiwaku dengan
              kesabaran tiada tara.
            </p>

            <p>
              Untuk Kakakku tersayang. Aku tahu kadang Kakak mudah marah dan bicara dengan nada
              tinggi saat aku melakukan kesalahan. Namun, di balik ketegasan itu, aku selalu tahu bahwa
              Kakak adalah orang pertama yang ingin melindungiku. Terima kasih sudah menjadi benteng
              pertahanan terbaikku, mengajarkanku arti disiplin, dan selalu menyayangi serta
              mendukungku dengan caramu yang unik.
            </p>

            <div className="p-5 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl italic font-serif font-bold text-stone-950 text-base sm:text-lg leading-relaxed">
              &ldquo;Kau menunjukkan kepadaku arti ketulusan yang sesungguhnya lewat tindakan nyata:
              hadir di saat-saat tersulitku, peka terhadap dukaku bahkan sebelum aku mengeluh, dan
              memastikan aku selalu merasa didekap kehangatan.&rdquo;
            </div>

            <p>
              Segala nilai baik yang kumiliki hari ini—caraku memperlakukan orang lain, caraku
              bangkit dari kegagalan, dan ketulusan yang kupelajari—semuanya bersumber dari teladan
              yang kau jalani. Kau adalah kompas hidupku, inspirasi terbesarku, dan tempat paling
              nyaman di dunia ini.
            </p>

            <p>
              Di hari ulang tahunmu ini, aku ingin berjanji: sebagaimana kau selalu setia menjagaku,
              aku pun akan selalu ada untuk mendukung, menjaga, dan membanggakanmu. Semoga hari-harimu
              ke depan selalu dipenuhi dengan kebahagiaan, ketenangan jiwa, dan cinta yang berlimpah.
            </p>
          </div>

          {/* Letter Sign-off */}
          <div className="mt-8 pt-6 border-t border-rose-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-stone-600 block mb-0.5">Dengan segenap rasa sayang,</span>
              <p className="font-serif italic font-extrabold text-xl sm:text-2xl text-stone-950">
                Adikmu Tersayang
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-rose-100 border border-stone-300 text-stone-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  <span className="text-emerald-800 font-extrabold">Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-700 stroke-[2]" />
                  <span>Salin Teks Surat</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
