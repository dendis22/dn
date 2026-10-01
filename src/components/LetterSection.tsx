import React, { useState } from 'react';
import { Mail, Heart, Copy, Check } from 'lucide-react';

export const LetterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const letterContent = `Untuk Kakakku Tersayang, Ibu Keduaku, dan Panutan Hidupku,

Saat menulis surat ini, rasanya kata-kata tak pernah cukup untuk menampung rasa terima kasih dan syukur yang memenuhi hatiku setiap kali mengingatmu. Sejak aku masih kecil dan belum memahami dunia, kau sudah berdiri kokoh—bukan sekadar sebagai seorang kakak, tetapi sebagai pelindung, guru, dan sosok ibu kedua yang merawat jiwaku dengan kesabaran tiada tara.

Aku masih ingat bagaimana kau selalu merayakan pencapaian kecilku seolah itu adalah hal paling luar biasa di dunia. Saat aku meragukan kemampuanku sendiri, ketenangan dan keyakinanmu menjadi jembatan bagiku untuk menemukan keberanian. Kau menanggung begitu banyak beban dalam diam agar masa kecilku tetap riang, aman, dan penuh kebahagiaan.

Kau mengajarkanku bahwa kebaikan sejati adalah kepedulian yang nyata: mengingat makanan favoritku di hari yang berat, menyadari kesedihanku bahkan sebelum air mataku jatuh, dan tak pernah membiarkanku merasa sendirian.

Segala nilai baik yang kumiliki hari ini—caraku memperlakukan orang lain, caraku bangkit dari kegagalan, dan ketulusan yang kupelajari—semuanya bersumber dari teladan yang kau jalani. Kau adalah kompas hidupku, inspirasi terbesarku, dan tempat paling nyaman di dunia ini.

Di hari ulang tahunmu ini, aku ingin berjanji: sebagaimana kau selalu setia menjagaku, aku pun akan selalu ada untuk mendukung, menjaga, dan membanggakanmu. Semoga hari-harimu ke depan selalu dipenuhi dengan kebahagiaan, ketenangan jiwa, dan cinta yang berlimpah.

Selamat ulang tahun, sosok panutan terhebatku. Aku menyayangimu lebih dari yang bisa terucap oleh kata-kata.

Dari adikmu yang selalu bersyukur dan menyayangimu selamanya.`;

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
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Surat dari Lubuk Hati</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-2">
            Surat Hangat untukmu (The Letter)
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Untaian kata tulus dari seorang adik yang sangat bersyukur memiliki sosok hebat sepertimu.
          </p>
        </div>

        {/* Clean, Simple, Highly Readable Letter Container */}
        <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-10 shadow-xs relative">
          {/* Letter Header */}
          <div className="flex items-center justify-between border-b border-rose-100 pb-5 mb-6">
            <div>
              <span className="text-[11px] font-mono text-rose-500 uppercase tracking-widest block mb-0.5">
                Pesan Khusus Ulang Tahun
              </span>
              <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-stone-900">
                Untuk Kakakku & Ibu Keduaku
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
          </div>

          {/* Letter Body in clean, readable paragraphs */}
          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              Saat menulis surat ini, rasanya kata-kata tak pernah cukup untuk menampung rasa
              terima kasih dan syukur yang memenuhi hatiku setiap kali mengingatmu. Sejak aku masih
              kecil dan belum memahami dunia, kau sudah berdiri kokoh—bukan sekadar sebagai seorang
              kakak, tetapi sebagai pelindung, guru, dan sosok ibu kedua yang merawat jiwaku dengan
              kesabaran tiada tara.
            </p>

            <p>
              Aku masih ingat bagaimana kau selalu merayakan pencapaian kecilku seolah itu adalah hal
              paling luar biasa di dunia. Saat aku meragukan kemampuanku sendiri, ketenangan dan
              keyakinanmu menjadi jembatan bagiku untuk menemukan keberanian. Kau menanggung begitu
              banyak beban dalam diam agar masa kecilku tetap riang, aman, dan penuh kebahagiaan.
            </p>

            <div className="p-4 bg-rose-50/70 border-l-2 border-rose-300 rounded-r-xl italic font-serif text-stone-800 text-base sm:text-lg">
              &ldquo;Kau mengajarkanku bahwa kebaikan sejati adalah kepedulian yang nyata: mengingat hal
              kecil di hari yang berat, menyadari kesedihanku sebelum air mataku jatuh, dan tak
              pernah membiarkanku merasa sendirian.&rdquo;
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
          <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs text-stone-500 block mb-0.5">Dengan segenap rasa sayang,</span>
              <p className="font-serif italic font-bold text-lg sm:text-xl text-stone-900">
                Adikmu yang Selalu Bersyukur
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-stone-50 hover:bg-rose-50 border border-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Tersalin ke Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
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
