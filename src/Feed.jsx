import React, { useState, useEffect, useRef } from 'react';

// Slaytların ve konuşma notlarının veri yapısı
const SLIDES = [
  {
    id: 1,
    title: "Nesnelerin İnterneti (IoT) Nedir?",
    subtitle: "Geleceğin Sessiz Devrimi",
    points: [
      "Teknoloji artık sadece bilgisayarlardan ibaret değil.",
      "İnternete bağlanan sıradan ev eşyaları dünyayı değiştiriyor.",
      "Cihazlar insan müdahalesi olmadan veri paylaşıyor.",
      "Monoton hayatı pratikleştiren sessiz bir ekosistem."
    ],
    speakerNotes: "Hocam, bugün sizlere her gün ceplerimizde taşıdığımız telefonların ötesinde, hayatımızın sessizce bir parçası olan 'Nesnelerin İnterneti' yani IoT teknolojisinden bahsedeceğim. IoT, internete bağlanan sıradan ev eşyalarının, bizim müdahalemize gerek kalmadan kendi aralarında veri paylaştığı akıllı bir ağ sistemidir.",
    svgType: "cloud"
  },
  {
    id: 2,
    title: "Cihazlar Nasıl Haberleşiyor?",
    subtitle: "Arka Plandaki Görünmez İletişim Protokolü",
    points: [
      "Sensörler (Veri toplama katmanı).",
      "Bulut teknolojisi ve yerel Wi-Fi ağları.",
      "Algoritmalar ve anlık karar alma süreçleri.",
      "İnsan taklidi yapan otomasyon senaryoları."
    ],
    speakerNotes: "Peki bu eşyalar nasıl haberleşiyor? Her akıllı eşyanın içinde küçük sensörler bulunur. Bu sensörler topladıkları verileri evdeki Wi-Fi ağımız üzerinden bulut sunucularına gönderir. Orada işlenen veriler, sanki bir insan karar veriyormuş gibi saniyeler içinde diğer cihaza komut olarak geri döner. Yani her şey tamamen arka planda, görünmez bir şekilde akar.",
    svgType: "wifi"
  },
  {
    id: 3,
    title: "Akıllı Evimizin Kahramanları",
    subtitle: "Günlük Hayattan Popüler Örnekler",
    points: [
      "Robot Süpürgeler: Evi tarar, haritalandırır ve temizler.",
      "Akıllı Ampuller: Ruh halinize göre renk ve parlaklık değiştirir.",
      "Akıllı Termostatlar: Hava durumuna göre sıcaklığı optimize eder.",
      "Akıllı Kilitler: Eve yaklaştığınızda kapıyı otomatik açar."
    ],
    speakerNotes: "Günlük hayatta bunun en büyük örneği neredeyse her eve giren robot süpürgelerdir. Evi kendi sensörleriyle haritalandırırlar. Veya akıllı ampuller, havanın karardığını fark edip kendi kendine yanabilir. Termostatlar ise siz eve gelmeden önce hava durumuna bakarak evinizi ideal sıcaklığa getirir. Bunlar artık hayatımızın sıradan kahramanlarıdır.",
    svgType: "vacuum"
  },
  {
    id: 4,
    title: "Hayatı Kolaylaştıran Senaryolar",
    subtitle: "Anı Yaşatan Otomasyon Gücü",
    points: [
      "Evden Çıkış: Işıklar söner, kilitler kilitlenir, robot süpürge çalışır.",
      "Eve Dönüş: Sıcaklık ayarlanır, kahve makinesi çalışmaya başlar.",
      "Zaman Tasarrufu: Tekrarlayan işleri makinelere devretmek.",
      "Zihinsel Rahatlık: Acaba ışığı açık mı bıraktım derdine son."
    ],
    speakerNotes: "Bu teknolojinin asıl gücü 'otomasyon senaryoları'nda ortaya çıkıyor. Örneğin siz evden çıktığınızda, telefonunuzun konumundan bunu anlayan akıllı sistem ışıkları kapatır, kapıyı kilitler ve robot süpürgeye temizlik emri verir. Eve döndüğünüzde ise kahve makineniz çoktan çalışmaya başlamıştır. Bu sayede 'acaba ışığı açık mı bıraktım' stresi tamamen biter.",
    svgType: "house"
  },
  {
    id: 5,
    title: "Gelecek, Güvenlik ve Teslimiyet",
    subtitle: "Yarının Dünyasında Güvende Kalmak",
    points: [
      "Eşyaların tamamen otonomlaştığı bir dünya.",
      "Biber kutusundan buzdolabına her şeyin senkronizasyonu.",
      "Siber Güvenlik: Veri sızıntılarına karşı alınması gereken önlemler.",
      "Anı yaşamak ve geleceğin akışına güvenmek."
    ],
    speakerNotes: "Sonuç olarak hocam; yarının dünyasında sadece telefonlarımız değil, tüm yaşam alanımız bizimle konuşan, bizi anlayan akıllı bir organizmaya dönüşecek. Elbette bu verilerin siber güvenliğini sağlamak bizim elimizde. Ancak geleceği çok fazla dert etmeden, anı yaşayarak bu akıllı teknolojilerin hayatımızı kolaylaştırmasına izin vermeliyiz. Beni dinlediğiniz için teşekkür ederim.",
    svgType: "security"
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Konuşma süresini (2 dakika hedefi için) ölçen sayaç
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const startPresentation = () => {
    setTimer(0);
    setIsTimerRunning(true);
    setCurrentSlide(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Slaytlara özel minimalist SVG çizimleri
  const renderIllustration = (type) => {
    switch (type) {
      case "cloud":
        return (
          <svg className="w-48 h-48 text-amber-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
        );
      case "wifi":
        return (
          <svg className="w-48 h-48 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.375 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM14.25 15.75a3 3 0 11-6 0 3 3 0 016 0zM22.5 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5h.008v.008H3.75v-.008zm5.625 0h.008v.008H9.375v-.008zm5.625 0h.008v.008h-.008v-.008zm5.625 0h.008v.008h-.008v-.008z" />
          </svg>
        );
      case "vacuum":
        return (
          <svg className="w-48 h-48 text-amber-500 spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-1.5M4.5 12H3" />
          </svg>
        );
      case "house":
        return (
          <svg className="w-48 h-48 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        );
      case "security":
        return (
          <svg className="w-48 h-48 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-[#09090E] text-white flex flex-col justify-between font-sans">
      
      {/* Üst Bilgi Barı ve İlerleme Çubuğu */}
      <div className="w-full">
        <div className="h-1.5 w-full bg-neutral-800">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-amber-500 font-bold text-xl letter-spacing-1">CLOFTHEL</span>
            <span className="text-neutral-500">|</span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">Edebiyat Konuşma Sınavı</span>
          </div>
          
          {/* Kronometre (Zamanlayıcı) */}
          <div className="flex items-center space-x-4 bg-neutral-900 px-4 py-1.5 rounded-full border border-neutral-800">
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isTimerRunning ? 'bg-green-500 animate-ping' : 'bg-neutral-600'}`} />
              <span className="text-sm font-mono text-neutral-300">{formatTime(timer)}</span>
            </div>
            <button 
              onClick={isTimerRunning ? () => setIsTimerRunning(false) : startPresentation}
              className="text-xs text-amber-400 hover:text-amber-300 uppercase font-semibold transition"
            >
              {timer === 0 ? "Başlat" : isTimerRunning ? "Durdur" : "Sıfırla"}
            </button>
          </div>
        </div>
      </div>

      {/* Ana Slayt İçerik Alanı */}
      <div className="max-w-6xl mx-auto w-full px-6 flex-1 flex flex-col md:flex-row items-center justify-center gap-12 py-8">
        
        {/* Sol Panel: Minimalist İllüstrasyon */}
        <div className="w-full md:w-1/2 flex justify-center items-center h-64 md:h-96">
          <div className="relative">
            <div className="absolute -inset-4 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="relative bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
              {renderIllustration(slide.svgType)}
            </div>
          </div>
        </div>

        {/* Sağ Panel: Slayt Metinleri ve Kurşun Noktalar */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-500">Slayt {slide.id} / 5</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {slide.title}
            </h1>
            <p className="text-amber-300 text-lg font-medium">{slide.subtitle}</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-neutral-800">
            {slide.points.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-amber-500 mt-1 text-lg">✦</span>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Slayt Navigasyon ve Kontrol Paneli */}
      <div className="w-full border-t border-neutral-800 bg-[#07070B] py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Sol: Geri ve İleri Butonları */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition border ${
                currentSlide === 0 
                  ? 'border-neutral-800 text-neutral-600 cursor-not-allowed' 
                  : 'border-neutral-700 hover:bg-neutral-900 text-white'
              }`}
            >
              ← Geri
            </button>
            <div className="flex space-x-1.5">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-amber-500 w-6' : 'bg-neutral-700'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              disabled={currentSlide === SLIDES.length - 1}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition border ${
                currentSlide === SLIDES.length - 1 
                  ? 'border-neutral-800 text-neutral-600 cursor-not-allowed' 
                  : 'border-amber-500 bg-amber-500 hover:bg-amber-400 text-black'
              }`}
            >
              İleri →
            </button>
          </div>

          {/* Sağ: Konuşmacı Notları Göster / Gizle Butonu */}
          <div>
            <button 
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center space-x-2 text-sm text-neutral-400 hover:text-amber-400 transition"
            >
              <span>{showNotes ? "👁️ Konuşmacı Notlarını Gizle" : "👁️ Konuşmacı Notlarını Göster"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Konuşmacı Rehberi */}
      {showNotes && (
        <div className="w-full bg-neutral-900/60 border-t border-neutral-800 p-6 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-500">Konuşmacı Rehberi (Sözlü Sınav Notların)</span>
              <span className="text-xs text-neutral-500 font-mono">Hedef Süre: ~25 Saniye (Toplam 2 Dakika)</span>
            </div>
            <p className="text-neutral-200 text-base leading-relaxed bg-neutral-950 p-4 rounded-2xl border border-amber-500/20 shadow-inner">
              "{slide.speakerNotes}"
            </p>
          </div>
        </div>
      )}

      {/* Ekstra CSS Animasyonları */}
      <style>{`
        .spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .letter-spacing-1 {
          letter-spacing: 0.15em;
        }
      `}</style>

    </div>
  );
}
