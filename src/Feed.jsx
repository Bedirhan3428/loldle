
import React, { useState, useEffect, useRef } from 'react';
import { Heart, RefreshCw, Copy, BookOpen, Clock, Trash2, Check, BookMarked } from 'lucide-react';

// Özenle seçilmiş, kısa ve etkileyici 100 Ayet Veri Tabanı
const VERSES_DATABASE = [
  { id: 1, surah: "İnşirâh Suresi, 5. Ayet", arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", turkish: "Şüphesiz her güçlükle beraber bir kolaylık vardır." },
  { id: 2, surah: "İnşirâh Suresi, 6. Ayet", arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", turkish: "Evet, her güçlükle beraber bir kolaylık vardır." },
  { id: 3, surah: "Bakara Suresi, 153. Ayet", arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", turkish: "Şüphesiz Allah sabredenlerle beraberdir." },
  { id: 4, surah: "Bakara Suresi, 186. Ayet", arabic: "فَاِنِّي قَرِيبٌۜ", turkish: "Şüphe yok ki ben onlara çok yakınım." },
  { id: 5, surah: "Necm Suresi, 39. Ayet", arabic: "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَى", turkish: "İnsan için ancak çalıştığının karşılığı vardır." },
  { id: 6, surah: "Zümer Suresi, 53. Ayet", arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", turkish: "Allah'ın rahmetinden ümidinizi kesmeyin." },
  { id: 7, surah: "Talâk Suresi, 3. Ayet", arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", turkish: "Kim Allah'a tevekkül ederse, O kendisine yeter." },
  { id: 8, surah: "Bakara Suresi, 286. Ayet", arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وَسْعَهَا", turkish: "Allah hiç kimseye gücünün yeteceğinden fazlasını yüklemez." },
  { id: 9, surah: "Âl-i İmrân Suresi, 139. Ayet", arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا", turkish: "Gevşemeyin, hüzünlenmeyin." },
  { id: 10, surah: "Duha Suresi, 3. Ayet", arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَى", turkish: "Rabbin seni bırakmadı ve sana darılmadı." },
  { id: 11, surah: "Tâhâ Suresi, 114. Ayet", arabic: "رَّبِّ زِدْنِي عِلْمًا", turkish: "Rabbim, benim ilmimi artır." },
  { id: 12, surah: "Yûsuf Suresi, 86. Ayet", arabic: "إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ", turkish: "Ben hüznümü ve tasamı yalnız Allah'a arz ederim." },
  { id: 13, surah: "Mü'min Suresi, 60. Ayet", arabic: "ادْعُونِي أَسْتَجِبْ لَكُمْ", turkish: "Bana dua edin, size icabet edeyim." },
  { id: 14, surah: "Râd Suresi, 28. Ayet", arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", turkish: "Bilesiniz ki kalpler ancak Allah'ı anarak huzur bulur." },
  { id: 15, surah: "Tevbe Suresi, 40. Ayet", arabic: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", turkish: "Üzülme, çünkü Allah bizimle beraberdir." },
  { id: 16, surah: "Âl-i İmrân Suresi, 160. Ayet", arabic: "إِن يَنصُرْكُمُ اللَّهُ فَلَا غَالِبَ لَكُمْ", turkish: "Eğer Allah size yardım ederse, size galip gelecek yoktur." },
  { id: 17, surah: "Rahmân Suresi, 60. Ayet", arabic: "هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ", turkish: "İyiliğin karşılığı, yalnız iyilik değil midir?" },
  { id: 18, surah: "En'âm Suresi, 17. Ayet", arabic: "وَإِن يَمْسَسْكَ اللَّهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ", turkish: "Eğer Allah sana bir zarar dokundurursa, onu O'ndan başka giderecek yoktur." },
  { id: 19, surah: "Bakara Suresi, 152. Ayet", arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ", turkish: "Öyleyse beni anın ki ben de sizi anayım." },
  { id: 20, surah: "Bakara Suresi, 216. Ayet", arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ", turkish: "Olur ki, bir şey sizin için hayırlı iken siz ondan hoşlanmazsınız." },
  { id: 21, surah: "İbrahim Suresi, 7. Ayet", arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ", turkish: "Andolsun, eğer şükrederseniz elbette size nimetimi artırırım." },
  { id: 22, surah: "Furkân Suresi, 58. Ayet", arabic: "وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ", turkish: "Asla ölmeyecek olan o diri Allah'a tevekkül et." },
  { id: 23, surah: "Mülk Suresi, 19. Ayet", arabic: "مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ", turkish: "Onları havada tutan ancak Rahman'dır." },
  { id: 24, surah: "Lokmân Suresi, 17. Ayet", arabic: "وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ", turkish: "Başına gelene sabret." },
  { id: 25, surah: "Kâf Suresi, 16. Ayet", arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ", turkish: "Biz ona şah damarından daha yakınız." },
  { id: 26, surah: "Yûnus Suresi, 107. Ayet", arabic: "فَلَا كَاشِفَ لَهُ إِلَّا هُوَ", turkish: "Onu O'ndan başka giderecek kimse yoktur." },
  { id: 27, surah: "Hicr Suresi, 99. Ayet", arabic: "وَاعْبُdْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ", turkish: "Sana ölüm gelinceye kadar Rabbine ibadet et." },
  { id: 28, surah: "Kehf Suresi, 24. Ayet", arabic: "عَسَىٰ أَن يَهْدِيَنِ رَبِّي لِأَقْرَبَ مِنْ هَٰذَا رَشَدًا", turkish: "Umarım Rabbim beni doğruya daha yakın olana eriştirir." },
  { id: 29, surah: "Ankebût Suresi, 45. Ayet", arabic: "وَلَذِكْرُ اللَّهِ أَكْبَرُ", turkish: "Şüphesiz Allah'ı anmak en büyük ibadettir." },
  { id: 30, surah: "Hadîd Suresi, 4. Ayet", arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ", turkish: "Nerede olursanız olun, O sizinle beraberdir." },
  { id: 31, surah: "İsrâ Suresi, 81. Ayet", arabic: "جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ", turkish: "Hak geldi, batıl yok oldu." },
  { id: 32, surah: "İsrâ Suresi, 82. Ayet", arabic: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ", turkish: "Biz Kur’an’dan müminler için şifa ve rahmet indiriyoruz." },
  { id: 33, surah: "Nahl Suresi, 128. Ayet", arabic: "إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوا", turkish: "Şüphesiz Allah, takva sahipleriyle beraberdir." },
  { id: 34, surah: "İsrâ Suresi, 23. Ayet", arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا", turkish: "Ana babaya iyi davranın." },
  { id: 35, surah: "Kasas Suresi, 77. Ayet", arabic: "وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ", turkish: "Allah'ın sana iyilik yaptığı gibi, sen de iyilik yap." },
  { id: 36, surah: "Kehf Suresi, 10. Ayet", arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً", turkish: "Rabbimiz, bize katından bir rahmet ver." },
  { id: 37, surah: "Bakara Suresi, 195. Ayet", arabic: "وَأَحْسِنُواۚ إِنَّ اللَّهYُحِبُّ الْمُحْسِنِينَ", turkish: "İyilik edin, şüphesiz Allah iyilik edenleri sever." },
  { id: 38, surah: "Secde Suresi, 17. Ayet", arabic: "فَلَا تَعْلَمُ نَفْسٌ مَّا أُخْفِيَ لَهُم مِّن قُرَّةِ أَعْيُنٍ", turkish: "Hiç kimse kendileri için saklanan müjdeyi bilemez." },
  { id: 39, surah: "Şûrâ Suresi, 30. Ayet", arabic: "وَمَا أَصَابَكُم مِّن مُّصِيبَةٍ فَبِمَا كَسَبَتْ أَيْدِيكُمْ", turkish: "Başınıza gelen her musibet kendi ellerinizle kazandıklarınız yüzündendir." },
  { id: 40, surah: "Şûrâ Suresi, 49. Ayet", arabic: "لِّلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ", turkish: "Göklerin ve yerin hükümranlığı yalnız Allah'ındır." },
  { id: 41, surah: "Neml Suresi, 73. Ayet", arabic: "وَإِنَّ رَبَّكَ لَذُو فَضْلٍ عَلَى النَّاسِ", turkish: "Şüphesiz senin Rabbin insanlara karşı lütuf sahibidir." },
  { id: 42, surah: "Tîn Suresi, 8. Ayet", arabic: "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ", turkish: "Allah hüküm verenlerin en üstünü değil midir?" },
  { id: 43, surah: "Fâtır Suresi, 15. Ayet", arabic: "أَنتُمُ الْفُقَرَاءُ إِلَى اللَّهِ", turkish: "Sizler Allah'a muhtaç olan fakirlersiniz." },
  { id: 44, surah: "Secde Suresi, 9. Ayet", arabic: "قَلِيلًا مَّا تَشْكُرُونَ", turkish: "Ne kadar da az şükrediyorsunuz!" },
  { id: 45, surah: "Fâtır Suresi, 2. Ayet", arabic: "مَا يَفْتَحِ اللَّهُ لِلنَّاسِ مِن رَّحْمَةٍ فَلَا مُمْسِكَ لَهَا", turkish: "Allah'ın insanlar için açtığı rahmeti kısacak kimse yoktur." },
  { id: 46, surah: "Yâsîn Suresi, 82. Ayet", arabic: "إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ", turkish: "O bir şeyi dilediği zaman ona sadece 'Ol' der, o da hemen oluverir." },
  { id: 47, surah: "Zümer Suresi, 36. Ayet", arabic: "أَلَيْسَ اللَّهُ بِكَافٍ عَبْدَهُ", turkish: "Allah kuluna yetmez mi?" },
  { id: 48, surah: "Câsiye Suresi, 15. Ayet", arabic: "مَنْ عَمِلَ صَالِحًا فَلِنَفْسِهِ", turkish: "Kim iyi bir iş yaparsa kendi lehinedir." },
  { id: 49, surah: "Necm Suresi, 58. Ayet", arabic: "لَيْسَ لَهَا مِن دُونِ اللَّهِ كَاشِفَةٌ", turkish: "Onu Allah'tan başka açığa çıkaracak kimse yoktur." },
  { id: 50, surah: "Rahmân Suresi, 13. Ayet", arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", turkish: "Şimdi Rabbinizin nimetlerinden hangisini yalanlıyorsunuz?" },
  { id: 51, surah: "Hacc Suresi, 77. Ayet", arabic: "وَافْعَلُوا الْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ", turkish: "Hayırlı işler yapın ki kurtuluşa eresiniz." },
  { id: 52, surah: "Kalem Suresi, 4. Ayet", arabic: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ", turkish: "Şüphesiz sen yüce bir ahlak üzerinesin." },
  { id: 53, surah: "İnfitâr Suresi, 6. Ayet", arabic: "مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ", turkish: "Seni o kerem sahibi Rabbine karşı ne aldattı?" },
  { id: 54, surah: "Bakara Suresi, 148. Ayet", arabic: "فَاسْتَبِقُوا الْخَيْرَاتِ", turkish: "Öyleyse hayırlarda yarışın." },
  { id: 55, surah: "Tevbe Suresi, 129. Ayet", arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ", turkish: "Allah bana yeter, O'ndan başka ilah yoktur." },
  { id: 56, surah: "Hucurât Suresi, 10. Ayet", arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ", turkish: "Müminler ancak kardeştirler." },
  { id: 57, surah: "Şûrâ Suresi, 53. Ayet", arabic: "أَلَا إِلَى اللَّهِ تَصِيرُ الْأُمُورُ", turkish: "Bilesiniz ki bütün işler eninde sonunda Allah’a döner." },
  { id: 58, surah: "Kehf Suresi, 46. Ayet", arabic: "وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ", turkish: "Kalıcı olan güzel işler, Rabbinin katında daha hayırlıdır." },
  { id: 59, surah: "Âl-i İmrân Suresi, 54. Ayet", arabic: "وَاللَّهُ خَيْرُ الْمَاكِرِينَ", turkish: "Allah tuzak kuranların en hayırlısıdır." },
  { id: 60, surah: "Nisâ Suresi, 28. Ayet", arabic: "وَخُلِقَ الْإِنسَانُ ضَعِيفًا", turkish: "Çünkü insan zayıf yaratılmıştır." },
  { id: 61, surah: "Nisâ Suresi, 147. Ayet", arabic: "مَّا يَفْعَلُ اللَّهُ بِعَذَابِكُمْ إِن شَكَرْتُمْ وَآمَنتُمْ", turkish: "Eğer şükreder ve iman ederseniz, Allah size niye azap etsin?" },
  { id: 62, surah: "Âl-i İmrân Suresi, 103. Ayet", arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا", turkish: "Hep birlikte Allah'ın ipine sımsıkı sarılın." },
  { id: 63, surah: "Bakara Suresi, 263. Ayet", arabic: "قَوْلٌ مَّعْرُوفٌ وَمَغْفِرَةٌ خَيْرٌ", turkish: "Güzel bir söz ve bağışlama daha hayırlıdır." },
  { id: 64, surah: "Bakara Suresi, 163. Ayet", arabic: "وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ", turkish: "Sizin ilahınız tek bir ilahtır." },
  { id: 65, surah: "Hûd Suresi, 115. Ayet", arabic: "وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ", turkish: "Sabret, çünkü Allah iyilik edenlerin mükafatını zayi etmez." },
  { id: 66, surah: "Mü'minûn Suresi, 118. Ayet", arabic: "رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ", turkish: "Rabbim bağışla, merhamet et, sen merhametlilerin en hayırlısısın." },
  { id: 67, surah: "Kasas Suresi, 56. Ayet", arabic: "إِنَّكَ لَا تَهْدِي مَنْ أَحْبَبْتَ", turkish: "Şüphesiz sen sevdiğin kimseyi hidayete erdiremezsin." },
  { id: 68, surah: "Ankebût Suresi, 69. Ayet", arabic: "وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ", turkish: "Şüphesiz Allah iyilik yapanlarla beraberdir." },
  { id: 69, surah: "Rûm Suresi, 60. Ayet", arabic: "فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ", turkish: "Sabret, şüphesiz Allah'ın vaadi haktır." },
  { id: 70, surah: "Lokmân Suresi, 18. Ayet", arabic: "إِنَّ اللَّهَ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ", turkish: "Çünkü Allah, kendini beğenen ve böbürlenen kimseleri sevmez." },
  { id: 71, surah: "Ahzâb Suresi, 3. Ayet", arabic: "وَتَوَكَّلْ عَلَى اللَّهِۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا", turkish: "Allah'a güven, vekil olarak Allah yeter." },
  { id: 72, surah: "Ahzâb Suresi, 70. Ayet", arabic: "اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا", turkish: "Allah'tan korkun ve doğru söz söyleyin." },
  { id: 73, surah: "Zümer Suresi, 9. Ayet", arabic: "هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ", turkish: "Hiç bilenlerle bilmeyenler bir olur mu?" },
  { id: 74, surah: "Zümer Suresi, 55. Ayet", arabic: "وَاتَّبِعُوا أَحْسَنَ مَا أُنزِلَ إِلَيْكُم", turkish: "Size indirilenin en güzeline uyun." },
  { id: 75, surah: "Muhammed Suresi, 7. Ayet", arabic: "إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ", turkish: "Eğer siz Allah'ın dinine yardım ederseniz, O da size yardım eder." },
  { id: 76, surah: "Kaf Suresi, 39. Ayet", arabic: "فَاصْبِرْ عَلَىٰ مَا يَقُولُونَ", turkish: "Onların söylediklerine karşı sabret." },
  { id: 77, surah: "Kamer Suresi, 17. Ayet", arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ", turkish: "Andolsun biz Kur'an'ı öğüt alınsın diye kolaylaştırdık." },
  { id: 78, surah: "Kamer Suresi, 49. Ayet", arabic: "إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ", turkish: "Biz her şeyi bir ölçüye göre yarattık." },
  { id: 79, surah: "Rahmân Suresi, 29. Ayet", arabic: "كُلَّ يَوْمٍ هُوَ فِي شَأْنٍ", turkish: "O, her an yeni bir tecelli ile yaratma halindedir." },
  { id: 80, surah: "Hadîd Suresi, 3. Ayet", arabic: "هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ", turkish: "O ilktir, sondur, zahirdir, batındır." },
  { id: 81, surah: "Hadîd Suresi, 20. Ayet", arabic: "وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا مَتَاعُ الْغُرُورِ", turkish: "Dünya hayatı, aldatıcı bir menfaatten başka bir şey değildir." },
  { id: 82, surah: "Saff Suresi, 13. Ayet", arabic: "نَصْرٌ مِّنَ اللَّهِ وَفَتْحٌ قَرِيبٌ", turkish: "Allah'tan bir yardım ve yakın bir fetih!" },
  { id: 83, surah: "Teğâbun Suresi, 11. Ayet", arabic: "وَمَن يُؤْمِن بِاللَّهِ يَهْدِ قَلْبَهُ", turkish: "Kim Allah'a inanırsa, O onun kalbini doğru yola iletir." },
  { id: 84, surah: "Teğâbun Suresi, 13. Ayet", arabic: "وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ", turkish: "Müminler yalnız Allah'a tevekkül etsinler." },
  { id: 85, surah: "Mülk Suresi, 14. Ayet", arabic: "أَلَا يَعْلَمُ مَنْ خَلَقَ", turkish: "Yaratan bilmez mi?" },
  { id: 86, surah: "Müzzemmil Suresi, 8. Ayet", arabic: "وَاذْكُرِ اسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًا", turkish: "Rabbinin adını an ve bütün varlığınla O'na yönel." },
  { id: 87, surah: "İnşirâh Suresi, 7. Ayet", arabic: "فَإِذَا فَرَغْتَ فَانصَبْ", turkish: "O halde boş kaldın mı, yine çalışıp yorul." },
  { id: 88, surah: "İnşirâh Suresi, 8. Ayet", arabic: "وَإِلَىٰ رَبِّكَ فَارْغَب", turkish: "Ve ancak Rabbine yönel." },
  { id: 89, surah: "Şems Suresi, 9. Ayet", arabic: "قَدْ أَفْلَحَ مَن زَكَّاهَا", turkish: "Nefsini arındıran kesinlikle kurtuluşa ermiştir." },
  { id: 90, surah: "Alak Suresi, 14. Ayet", arabic: "أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ", turkish: "O, Allah'ın her şeyi gördüğünü bilmez mi?" },
  { id: 91, surah: "Kadr Suresi, 3. Ayet", arabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ", turkish: "Kadir gecesi, bin aydan daha hayırlıdır." },
  { id: 92, surah: "Asr Suresi, 1. Ayet", arabic: "وَالْعَصْرِ", turkish: "Zamana andolsun ki," },
  { id: 93, surah: "Asr Suresi, 2. Ayet", arabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", turkish: "İnsan gerçekten ziyan içindedir." },
  { id: 94, surah: "Kâfirûn Suresi, 6. Ayet", arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", turkish: "Sizin dininiz size, benim dinim banadır." },
  { id: 95, surah: "İhlâs Suresi, 1. Ayet", arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", turkish: "De ki: O, Allah'tır, tektir." },
  { id: 96, surah: "Nasr Suresi, 3. Ayet", arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ", turkish: "Rabbini hamd ile tesbih et ve O'ndan bağışlanma dile." },
  { id: 97, surah: "Bakara Suresi, 256. Ayet", arabic: "لَا إِكْرَاهَ فِي الدِّينِ", turkish: "Dinde zorlama yoktur." },
  { id: 98, surah: "Kehf Suresi, 109. Ayet", arabic: "قُل لَّوْ كَانَ الْبَحْرُ مِدَادًا لِّكَلِمَاتِ رَبِّي لَنَفِدَ الْبَحْرُ", turkish: "De ki: Rabbimin sözleri için deniz mürekkep olsa, deniz tükenirdi." },
  { id: 99, surah: "Meryem Suresi, 64. Ayet", arabic: "وَمَا كَانَ رَبُّكَ نَسِيًّا", turkish: "Senin Rabbin asla unutkan değildir." },
  { id: 100, surah: "Enbiyâ Suresi, 107. Ayet", arabic: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ", turkish: "Biz seni ancak alemlere bir rahmet olarak gönderdik." }
];

export default function App() {
  // State Yönetimi (Öncelik LocalStorage'da)
  const [currentAyah, setCurrentAyah] = useState(() => {
    const saved = localStorage.getItem('ayetsaati_current');
    if (saved) return JSON.parse(saved);
    // İlk kurulumda listeden rastgele bir tane seç
    return VERSES_DATABASE[Math.floor(Math.random() * VERSES_DATABASE.length)];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('ayetsaati_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [intervalTime, setIntervalTime] = useState(() => {
    const saved = localStorage.getItem('ayetsaati_interval');
    return saved ? parseInt(saved, 10) : 3600; // Varsayılan: 1 saat
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEndTime = localStorage.getItem('ayetsaati_timer_end');
    if (savedEndTime) {
      const remaining = Math.round((parseInt(savedEndTime, 10) - Date.now()) / 1000);
      return remaining > 0 ? remaining : 3600;
    }
    return 3600;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ayetsaati_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [showFavs, setShowFavs] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [copiedId, setCopiedId] = useState(false);
  
  const timerRef = useRef(null);

  // Toast Bildirimi Göster
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Yeni Rastgele Ayet Çekme (Tekrar Engelleme Mekanizması)
  const nextRandomAyah = (isUserForced = false) => {
    // Tüm veri tabanı geçmişte varsa, geçmişi sıfırla ki kilitlenmesin
    let activeHistory = [...history];
    if (activeHistory.length >= VERSES_DATABASE.length) {
      activeHistory = [];
    }

    // Geçmişte yer almayan ayetleri filtrele
    const filteredVerses = VERSES_DATABASE.filter(verse => !activeHistory.includes(verse.id));
    
    // Filtrelenmiş veya kalmamışsa tüm listeden rastgele seç
    const pool = filteredVerses.length > 0 ? filteredVerses : VERSES_DATABASE;
    const selected = pool[Math.floor(Math.random() * pool.length)];

    setCurrentAyah(selected);
    localStorage.setItem('ayetsaati_current', JSON.stringify(selected));

    // Geçmişe ekle
    const nextHistory = [...activeHistory, selected.id];
    setHistory(nextHistory);
    localStorage.setItem('ayetsaati_history', JSON.stringify(nextHistory));

    if (isUserForced) {
      triggerToast("Yeni kısa ayet yüklendi.");
    }
  };

  // Geri Sayım Sayacı Efekti
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    const savedEndTime = localStorage.getItem('ayetsaati_timer_end');
    let targetTime;

    if (savedEndTime) {
      targetTime = parseInt(savedEndTime, 10);
      const remaining = Math.round((targetTime - Date.now()) / 1000);
      if (remaining <= 0) {
        targetTime = Date.now() + intervalTime * 1000;
        localStorage.setItem('ayetsaati_timer_end', targetTime.toString());
      }
    } else {
      targetTime = Date.now() + intervalTime * 1000;
      localStorage.setItem('ayetsaati_timer_end', targetTime.toString());
    }

    timerRef.current = setInterval(() => {
      const remaining = Math.round((targetTime - Date.now()) / 1000);
      
      if (remaining <= 0) {
        nextRandomAyah();
        targetTime = Date.now() + intervalTime * 1000;
        localStorage.setItem('ayetsaati_timer_end', targetTime.toString());
        setTimeLeft(intervalTime);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [intervalTime, history]);

  // Süre seçimi değişim yöneticisi
  const handleIntervalChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setIntervalTime(value);
    localStorage.setItem('ayetsaati_interval', value.toString());

    const newEndTime = Date.now() + value * 1000;
    localStorage.setItem('ayetsaati_timer_end', newEndTime.toString());
    setTimeLeft(value);
    triggerToast(`Geçiş süresi ayarlandı: ${e.target.options[e.target.selectedIndex].text}`);
  };

  // Favorilere ekleme / çıkarma
  const handleToggleFavorite = () => {
    if (!currentAyah) return;

    const isFav = favorites.some(fav => fav.id === currentAyah.id);
    let updated;

    if (isFav) {
      updated = favorites.filter(fav => fav.id !== currentAyah.id);
      triggerToast("Ayet favorilerden çıkarıldı.");
    } else {
      updated = [...favorites, currentAyah];
      triggerToast("Ayet favorilerinize eklendi!");
    }

    setFavorites(updated);
    localStorage.setItem('ayetsaati_favorites', JSON.stringify(updated));
  };

  // Favoriyi doğrudan listeden silme
  const removeFavoriteDirectly = (id) => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('ayetsaati_favorites', JSON.stringify(updated));
    triggerToast("Ayet favorilerden silindi.");
  };

  // Metin Kopyalama
  const handleCopyToClipboard = () => {
    if (!currentAyah) return;
    const text = `"${currentAyah.turkish}"\n\n(${currentAyah.surah})\n\nArapça:\n${currentAyah.arabic}`;
    
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      setCopiedId(true);
      triggerToast("Ayet panoya kopyalandı!");
      setTimeout(() => setCopiedId(false), 2000);
    } catch (err) {
      console.error('Kopyalanamadı', err);
    }
    document.body.removeChild(tempInput);
  };

  // Zaman Formatlama
  const formatTimeStr = (totalSeconds) => {
    if (totalSeconds < 0) return "00:00:00";
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const isCurrentFav = currentAyah && favorites.some(fav => fav.id === currentAyah.id);
  const progressPercent = 100.53 - ((timeLeft / intervalTime) * 100.53);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-8 font-sans antialiased selection:bg-emerald-500/30 relative overflow-x-hidden">
      
      {/* Toast Bildirim Modülü */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 border border-emerald-500/30 text-emerald-400 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 transition-all duration-300 animate-slide-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs md:text-sm font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Header Bölümü */}
      <header className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-lg">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Ayet Saati
            </h1>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium">100 Seçkin Kısa Ayet • Çevrimdışı Feed</p>
          </div>
        </div>

        {/* Zamanlayıcı Süre Seçimi */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-2 rounded-2xl backdrop-blur">
          <label className="text-[10px] md:text-xs text-slate-400 pl-2 font-semibold uppercase tracking-wider">Otomatik Geçiş:</label>
          <select 
            value={intervalTime} 
            onChange={handleIntervalChange}
            className="bg-slate-950 text-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 border border-slate-800 focus:outline-none focus:border-emerald-500/50 cursor-pointer"
          >
            <option value="3600">1 Saat</option>
            <option value="1800">30 Dakika</option>
            <option value="600">10 Dakika</option>
            <option value="60">1 Dakika (Hızlı)</option>
            <option value="10">10 Saniye (Hızlı Test)</option>
          </select>
        </div>
      </header>

      {/* Ana Ekran / Ayet Kartı */}
      <main className="max-w-4xl mx-auto w-full flex-grow flex flex-col justify-center gap-6 z-10">
        
        <div className="relative bg-gradient-to-b from-slate-900/80 to-slate-950/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between transition-all duration-300 hover:border-slate-800">
          
          {/* Arka Plan Işık Efektleri */}
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Ayet Bilgisi Üst Barı */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800/60 z-10">
            <span className="text-xs font-bold tracking-wide text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
              {currentAyah?.surah || "Lütfen Bekleyin..."}
            </span>
            <div className="flex gap-1.5">
              <button 
                onClick={handleToggleFavorite}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 border border-slate-800 transition-all duration-200"
                title="Favorilere Ekle"
              >
                <Heart className={`w-4 h-4 transition-all ${isCurrentFav ? 'fill-rose-500 stroke-rose-500 scale-110' : ''}`} />
              </button>
              <button 
                onClick={handleCopyToClipboard}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 border border-slate-800 transition-all duration-200"
                title="Panoya Kopyala"
              >
                <Copy className={`w-4 h-4 ${copiedId ? 'text-emerald-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Arapça Orijinal Metin (Kısa ve Net) */}
          <div className="mb-8 select-all text-right z-10">
            <p className="text-2xl md:text-3.5xl text-emerald-100 leading-loose tracking-wide font-normal" style={{ fontFamily: "'Amiri', serif", direction: 'rtl' }}>
              {currentAyah?.arabic}
            </p>
          </div>

          {/* Türkçe Meali */}
          <div className="border-t border-slate-800/40 pt-6 z-10">
            <div className="flex gap-2 text-slate-500 mb-1.5 items-center">
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">Meal</span>
            </div>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed font-light">
              "{currentAyah?.turkish}"
            </p>
          </div>

        </div>

        {/* Kontroller & Geri Sayım Paneli */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* El ile Yeni Ayet Çekme */}
          <button 
            onClick={() => nextRandomAyah(true)}
            className="py-4 px-6 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg active:scale-[0.98] group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Sıradaki Kısa Ayet
          </button>

          {/* Yuvarlak Geri Sayım Sayacı */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl py-2.5 px-4 flex items-center justify-center gap-4 shadow-md">
            <div className="relative flex items-center justify-center w-9 h-9">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="14" stroke="rgba(30, 41, 59, 0.8)" strokeWidth="2.5" fill="transparent"/>
                <circle 
                  cx="18" 
                  cy="18" 
                  r="14" 
                  stroke="#10b981" 
                  strokeWidth="2.5" 
                  fill="transparent" 
                  strokeDasharray="100.53" 
                  strokeDashoffset={progressPercent} 
                  className="transition-all duration-1000"
                />
              </svg>
              <Clock className="w-3.5 h-3.5 text-emerald-400 z-10" />
            </div>
            <div>
              <div className="text-base font-mono font-black text-slate-100">{formatTimeStr(timeLeft)}</div>
              <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Sonraki Güncelleme</div>
            </div>
          </div>

          {/* Favori Listesi Aç */}
          <button 
            onClick={() => setShowFavs(true)}
            className="py-4 px-6 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-current animate-pulse" />
            Favori Ayetlerim ({favorites.length})
          </button>

        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center mt-8 pt-5 border-t border-slate-900/80 z-10">
        <p className="text-[10px] text-slate-500 font-medium">
          Bedirhan için yerel veri tabanından rastgele yüklenen 100 seçkin kısa ayet listesidir. Tarayıcı hafızasını temizlemediğin sürece favorilerin korunur.
        </p>
      </footer>

      {/* Favoriler Modalı */}
      {showFavs && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[75vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in">
            
            {/* Modal Başlığı */}
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-current" />
                <h3 className="font-extrabold text-base text-slate-200">Kaydedilen Ayetler</h3>
              </div>
              <button 
                onClick={() => setShowFavs(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all text-xs font-bold"
              >
                Kapat
              </button>
            </div>

            {/* Modal İçeriği */}
            <div className="p-5 overflow-y-auto flex-grow flex flex-col gap-3.5 custom-scrollbar">
              {favorites.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
                  <BookOpen className="w-10 h-10 text-slate-700" />
                  <p className="text-slate-500 text-xs font-semibold">Henüz favori olarak eklediğin bir ayet bulunmuyor.</p>
                </div>
              ) : (
                favorites.map(fav => (
                  <div key={fav.id} className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl flex flex-col gap-2 relative hover:border-emerald-500/20 transition-all">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-bold border border-emerald-500/10">
                        {fav.surah}
                      </span>
                      <button 
                        onClick={() => removeFavoriteDirectly(fav.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Favorilerden Kaldır"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p 
                      className="text-lg text-emerald-100/90 text-right leading-relaxed font-normal" 
                      style={{ fontFamily: "'Amiri', serif", direction: 'rtl' }}
                    >
                      {fav.arabic}
                    </p>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{fav.turkish}"
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

