
import React, { useState, useEffect, useRef } from 'react';

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
  { id: 27, surah: "Hicr Suresi, 99. Ayet", arabic: "وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ", turkish: "Sana ölüm gelinceye kadar Rabbine ibadet et." },
  { id: 28, surah: "Kehf Suresi, 24. Ayet", arabic: "عَسَىٰ أَن يَهْدِيَنِ رَبِّي لِأَقْرَبَ مِنْ هَٰذَا رَشَدًا", turkish: "Umarım Rabbim beni doğruya daha yakın olana eriştirir." },
  { id: 29, surah: "Ankebût Suresi, 45. Ayet", arabic: "وَلَذِكْرُ اللَّهِ أَكْبَرُ", turkish: "Şüphesiz Allah'ı anmak en büyük ibadettir." },
  { id: 30, surah: "Hadîd Suresi, 4. Ayet", arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ", turkish: "Nerede olursanız olun, O sizinle beraberdir." },
  { id: 31, surah: "İsrâ Suresi, 81. Ayet", arabic: "جَاءَ الْحَقُw وَزَهَقَ الْبَاطِلُ", turkish: "Hak geldi, batıl yok oldu." },
  { id: 32, surah: "İsrâ Suresi, 82. Ayet", arabic: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ", turkish: "Biz Kur’an’dan müminler için şifa ve rahmet indiriyoruz." },
  { id: 33, surah: "Nahl Suresi, 128. Ayet", arabic: "إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوا", turkish: "Şüphesiz Allah, takva sahipleriyle beraberdir." },
  { id: 34, surah: "İsrâ Suresi, 23. Ayet", arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا", turkish: "Ana babaya iyi davranın." },
  { id: 35, surah: "Kasas Suresi, 77. Ayet", arabic: "وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ", turkish: "Allah'ın sana iyilik yaptığı gibi, sen de iyilik yap." },
  { id: 36, surah: "Kehf Suresi, 10. Ayet", arabic: "رَبَّنَا آتِنَا مِن لَّdُنكَ رَحْمَةً", turkish: "Rabbimiz, bize katından bir rahmet ver." },
  { id: 37, surah: "Bakara Suresi, 195. Ayet", arabic: "وَأَحْسِنُواۚ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ", turkish: "İyilik edin, şüphesiz Allah iyilik edenleri sever." },
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
  { id: 60, surah: "Nisâ Suresi, 28. Ayet", arabic: "وَخُلِقَ الْإِnsَانُ ضَعِيفًا", turkish: "Çünkü insan zayıf yaratılmıştır." },
  { id: 61, surah: "Nisâ Suresi, 147. Ayet", arabic: "مَّا يَفْعَلُ اللَّهُ بِعَذَابِكُمْ إِن şَكَرْتُمْ وَآمَنتُمْ", turkish: "Eğer şükreder ve iman ederseniz, Allah size niye azap etsin?" },
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
  { id: 80, surah: "Hadîd Suresi, 3. Ayet", arabic: "هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ", turkish: "O ilktir, sondur, zahirdir, batındır." },
  { id: 81, surah: "Hadîd Suresi, 20. Ayet", arabic: "وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا مَتَاعُ الْغُرُورِ", turkish: "Dünya hayatı, aldatıcı bir menfaatten başka bir şey değildir." },
  { id: 82, surah: "Saff Suresi, 13. Ayet", arabic: "نَصْرٌ مِّنَ اللَّهِ وَفَتْحٌ قَرِيبٌ", turkish: "Allah'tan bir yardım ve yakın bir fetih!" },
  { id: 83, surah: "Teğâbun Suresi, 11. Ayet", arabic: "وَمَن يُؤْمِن بِاللَّهِ يَهْدِ قَلْبَهُ", turkish: "Kim Allah'a inanırsa, O onun kalbini doğru yola iletir." },
  { id: 84, surah: "Teğâbun Suresi, 13. Ayet", arabic: "وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ", turkish: "Müminler yalnız Allah'a tevekkül etsinler." },
  { id: 85, surah: "Mülk Suresi, 14. Ayet", arabic: "أَلَا يَعْلَمُ مَنْ خَلَقَ", turkish: "Yaratan bilmez mi?" },
  { id: 86, surah: "Müzzemmil Suresi, 8. Ayet", arabic: "وَاذْكُرِ اسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًا", turkish: "Rabbinin adını an ve bütün varlığınla O'na yönel." },
  { id: 87, surah: "İnşirâh Suresi, 7. Ayet", arabic: "فَإِذَا فَرَغْتَ فَانصَبْ", turkish: "O halde boş kaldın mı, yine çalışıp yorul." },
  { id: 88, surah: "İnşirâh Suresi, 8. Ayet", arabic: "وَإِلَىٰ رَبِّكَ فَارْغَب", turkish: "Ve ancak Rabbine yönel." },
  { id: 89, surah: "Şems Suresi, 9. Ayet", arabic: "قَدْ أَfْلَحَ مَن زَكَّاهَا", turkish: "Nefsini arındıran kesinlikle kurtuluşa ermiştir." },
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
  // Eyalet Yapısı (LocalStorage uyumlu)
  const [currentAyah, setCurrentAyah] = useState(() => {
    const saved = localStorage.getItem('ayetsaati_current');
    if (saved) return JSON.parse(saved);
    return VERSES_DATABASE[0];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('ayetsaati_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [intervalTime, setIntervalTime] = useState(() => {
    const saved = localStorage.getItem('ayetsaati_interval');
    return saved ? parseInt(saved, 10) : 3600; 
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
  const [copied, setCopied] = useState(false);
  
  const timerRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Yeni Rastgele Ayet Seçimi (Tekrarsız)
  const nextRandomAyah = (isUserForced = false) => {
    let activeHistory = [...history];
    
    if (activeHistory.length >= VERSES_DATABASE.length) {
      activeHistory = [];
    }

    const unshownVerses = VERSES_DATABASE.filter(verse => !activeHistory.includes(verse.id));
    const pool = unshownVerses.length > 0 ? unshownVerses : VERSES_DATABASE;
    const selected = pool[Math.floor(Math.random() * pool.length)];

    setCurrentAyah(selected);
    localStorage.setItem('ayetsaati_current', JSON.stringify(selected));

    const nextHistory = [...activeHistory, selected.id];
    setHistory(nextHistory);
    localStorage.setItem('ayetsaati_history', JSON.stringify(nextHistory));

    if (isUserForced) {
      showToast("Yeni ayet yüklendi.");
    }
  };

  // Zamanlayıcı
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

  const handleIntervalChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setIntervalTime(value);
    localStorage.setItem('ayetsaati_interval', value.toString());

    const newEndTime = Date.now() + value * 1000;
    localStorage.setItem('ayetsaati_timer_end', newEndTime.toString());
    setTimeLeft(value);
    showToast(`Geçiş süresi ayarlandı: ${e.target.options[e.target.selectedIndex].text}`);
  };

  const toggleFavorite = () => {
    if (!currentAyah) return;

    const isFav = favorites.some(fav => fav.id === currentAyah.id);
    let updated;

    if (isFav) {
      updated = favorites.filter(fav => fav.id !== currentAyah.id);
      showToast("Ayet favorilerden çıkarıldı.");
    } else {
      updated = [...favorites, currentAyah];
      showToast("Ayet favorilerinize eklendi!");
    }

    setFavorites(updated);
    localStorage.setItem('ayetsaati_favorites', JSON.stringify(updated));
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('ayetsaati_favorites', JSON.stringify(updated));
    showToast("Ayet silindi.");
  };

  const copyToClipboard = () => {
    if (!currentAyah) return;
    const text = `"${currentAyah.turkish}"\n\n(${currentAyah.surah})\n\nArapça:\n${currentAyah.arabic}`;
    
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      showToast("Panoya kopyalandı!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız', err);
    }
    document.body.removeChild(tempInput);
  };

  const formatTime = (totalSeconds) => {
    if (totalSeconds < 0) return "00:00:00";
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const isCurrentFav = currentAyah && favorites.some(fav => fav.id === currentAyah.id);
  const progressPercent = 100.53 - ((timeLeft / intervalTime) * 100.53);

  return (
    <div className="app-layout">
      {/* Saf Yerleşik CSS Stilleri */}
      <style>{`
        /* Genel Sürüm Ayarları */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #020617;
          background-image: radial-gradient(circle at center, #0f172a 0%, #020617 100%);
          color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          min-height: 100vh;
        }

        .app-layout {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100vh;
          padding: 2rem 1.5rem;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        /* Header */
        header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          width: 100%;
        }

        @media (max-width: 640px) {
          header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-icon {
          padding: 0.75rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 1rem;
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-title {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.025em;
          background: linear-gradient(to right, #34d399, #14b8a6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .header-control {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid #1e293b;
          padding: 0.5rem;
          border-radius: 1rem;
        }

        .header-control label {
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 600;
          padding-left: 0.5rem;
          text-transform: uppercase;
        }

        .header-control select {
          background: #020617;
          color: #e2e8f0;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 0.75rem;
          padding: 0.4rem 0.75rem;
          border: 1px solid #1e293b;
          cursor: pointer;
          outline: none;
        }

        .header-control select:focus {
          border-color: rgba(16, 185, 129, 0.5);
        }

        /* Ana Kart */
        main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.5rem;
          width: 100%;
        }

        .ayah-card {
          position: relative;
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(2, 6, 23, 0.4));
          border: 1px solid rgba(30, 41, 59, 0.8);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 280px;
        }

        @media (max-width: 640px) {
          .ayah-card {
            padding: 1.5rem;
          }
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(30, 41, 59, 0.6);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .ayah-source {
          font-size: 0.75rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          border: 1px solid rgba(16, 185, 129, 0.15);
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          background: #020617;
          border: 1px solid #1e293b;
          color: #94a3b8;
          padding: 0.6rem;
          border-radius: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.2);
        }

        .action-btn.favorite.active {
          color: #f43f5e;
          border-color: rgba(244, 63, 94, 0.2);
          background: rgba(244, 63, 94, 0.1);
        }

        .arabic-text-container {
          text-align: right;
          margin-bottom: 2rem;
        }

        .arabic-text {
          font-size: 1.75rem;
          color: #ecfdf5;
          line-height: 1.8;
          direction: rtl;
        }

        .turkish-text-container {
          border-t: 1px solid rgba(30, 41, 59, 0.4);
          padding-top: 1.5rem;
        }

        .meal-title {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 900;
          color: #64748b;
          margin-bottom: 0.5rem;
          display: block;
        }

        .turkish-text {
          font-size: 1.05rem;
          color: #cbd5e1;
          line-height: 1.6;
          font-weight: 300;
        }

        /* Kontrol Paneli Izgarası */
        .controls-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .controls-grid {
            grid-template-columns: 1fr;
          }
        }

        .primary-btn {
          width: 100%;
          padding: 1rem;
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 1.25rem;
          color: #10b981;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .primary-btn:hover {
          background: #1e293b;
          border-color: rgba(16, 185, 129, 0.3);
        }

        .primary-btn:active {
          transform: scale(0.98);
        }

        .timer-badge {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(30, 41, 59, 0.6);
          border-radius: 1.25rem;
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .timer-circle-wrapper {
          position: relative;
          width: 2.25rem;
          height: 2.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer-circle-wrapper svg {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .timer-info {
          display: flex;
          flex-direction: column;
        }

        .timer-digits {
          font-family: monospace;
          font-weight: 900;
          font-size: 1rem;
          color: #f1f5f9;
        }

        .timer-label {
          font-size: 0.55rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }

        /* Toast Bildirim */
        .custom-toast {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 100;
          background: #0f172a;
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
          padding: 0.85rem 1.25rem;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          animation: slideIn 0.3s ease-out forwards;
        }

        @keyframes slideIn {
          from {
            transform: translateY(-1rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Favoriler Modalı */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 90;
          background: rgba(2, 6, 23, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }

        .modal-box {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 1.5rem;
          max-width: 500px;
          width: 100%;
          max-height: 75vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
        }

        .modal-header {
          padding: 1.25rem;
          border-bottom: 1px solid #1e293b;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #e2e8f0;
          font-weight: 800;
          font-size: 1.1rem;
        }

        .modal-close {
          background: #020617;
          border: none;
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: 0.75rem;
          cursor: pointer;
        }

        .modal-close:hover {
          background: #1e293b;
          color: #f1f5f9;
        }

        .modal-body {
          padding: 1.25rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .fav-item {
          background: rgba(2, 6, 23, 0.4);
          border: 1px solid #1e293b;
          border-radius: 1rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: border-color 0.2s;
        }

        .fav-item:hover {
          border-color: rgba(16, 185, 129, 0.2);
        }

        .fav-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fav-surah {
          font-size: 0.7rem;
          color: #10b981;
          font-weight: 700;
          background: rgba(16, 185, 129, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
        }

        .delete-btn {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.2rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
        }

        .delete-btn:hover {
          color: #ef4444;
        }

        .fav-arabic {
          font-size: 1.25rem;
          color: #ecfdf5;
          text-align: right;
          line-height: 1.6;
        }

        .fav-turkish {
          font-size: 0.8rem;
          color: #94a3b8;
          font-style: italic;
          line-height: 1.4;
        }

        .empty-favs {
          text-align: center;
          padding: 2.5rem 0;
          color: #475569;
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* Footer */
        footer {
          max-width: 900px;
          width: 100%;
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(15, 23, 42, 0.8);
        }

        footer p {
          font-size: 0.65rem;
          color: #475569;
          font-weight: 500;
        }
      `}</style>

      {/* Toast Bildirim Modülü */}
      {toastMessage && (
        <div className="custom-toast">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Üst Kısım / Logo ve Seçim Alanı */}
      <header>
        <div className="header-brand">
          <div className="brand-icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h1 className="brand-title">Ayet Saati</h1>
            <p className="brand-subtitle">100 Seçkin Kısa Ayet • Güvenli Çevrimdışı Feed</p>
          </div>
        </div>

        <div className="header-control">
          <label>Zamanlayıcı:</label>
          <select value={intervalTime} onChange={handleIntervalChange}>
            <option value="3600">1 Saat</option>
            <option value="1800">30 Dakika</option>
            <option value="600">10 Dakika</option>
            <option value="60">1 Dakika (Test)</option>
            <option value="10">10 Saniye (Hızlı)</option>
          </select>
        </div>
      </header>

      {/* Ayet Kartı */}
      <main>
        <div className="ayah-card">
          <div className="card-top">
            <span className="ayah-source">{currentAyah?.surah || "Yükleniyor..."}</span>
            <div className="card-actions">
              <button 
                onClick={toggleFavorite} 
                className={`action-btn favorite ${isCurrentFav ? 'active' : ''}`}
                title="Favorilere Ekle"
              >
                <svg width="16" height="16" fill={isCurrentFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button onClick={copyToClipboard} className="action-btn" title="Kopyala">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>

          <div className="arabic-text-container">
            <p className="arabic-text" style={{ fontFamily: 'Georgia, serif' }}>
              {currentAyah?.arabic}
            </p>
          </div>

          <div className="turkish-text-container">
            <span className="meal-title">Meali</span>
            <p className="turkish-text">"{currentAyah?.turkish}"</p>
          </div>
        </div>

        {/* Kontroller */}
        <div className="controls-grid">
          <button onClick={() => nextRandomAyah(true)} className="primary-btn">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
            </svg>
            Yeni Ayet Göster
          </button>

          <div className="timer-badge">
            <div className="timer-circle-wrapper">
              <svg>
                <circle cx="18" cy="18" r="14" stroke="rgba(30, 41, 59, 0.8)" strokeWidth="2.5" fill="none" />
                <circle 
                  cx="18" 
                  cy="18" 
                  r="14" 
                  stroke="#10b981" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeDasharray="100.53" 
                  strokeDashoffset={progressPercent} 
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="timer-info">
              <span className="timer-digits">{formatTime(timeLeft)}</span>
              <span className="timer-label">Geçiş Süresi</span>
            </div>
          </div>

          <button onClick={() => setShowFavs(true)} className="primary-btn">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#f43f5e' }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Favorilerim ({favorites.length})
          </button>
        </div>
      </main>

      {/* Alt Açıklama */}
      <footer>
        <p>Bedirhan İmer için yerleşik saf CSS tasarımıyla hazırlanmıştır. Çevrimdışı ve kütüphanesiz çalışır.</p>
      </footer>

      {/* Favoriler Modalı */}
      {showFavs && (
        <div className="modal-overlay" onClick={() => setShowFavs(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#f43f5e' }}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <h3>Kaydedilen Ayetler</h3>
              </div>
              <button className="modal-close" onClick={() => setShowFavs(false)}>Kapat</button>
            </div>

            <div className="modal-body">
              {favorites.length === 0 ? (
                <div className="empty-favs">Henüz favorilere eklenmiş ayet bulunmuyor.</div>
              ) : (
                favorites.map(fav => (
                  <div key={fav.id} className="fav-item">
                    <div className="fav-item-header">
                      <span className="fav-surah">{fav.surah}</span>
                      <button className="delete-btn" onClick={() => removeFavorite(fav.id)}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="fav-arabic" style={{ fontFamily: 'Georgia, serif' }}>{fav.arabic}</p>
                    <p className="fav-turkish">"{fav.turkish}"</p>
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

