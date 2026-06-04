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

  const renderIllustration = (type) => {
    switch (type) {
      case "cloud":
        return (
          <svg className="svg-icon animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
        );
      case "wifi":
        return (
          <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.375 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM14.25 15.75a3 3 0 11-6 0 3 3 0 016 0zM22.5 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5h.008v.008H3.75v-.008zm5.625 0h.008v.008H9.375v-.008zm5.625 0h.008v.008h-.008v-.008zm5.625 0h.008v.008h-.008v-.008z" />
          </svg>
        );
      case "vacuum":
        return (
          <svg className="svg-icon spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-1.5M4.5 12H3" />
          </svg>
        );
      case "house":
        return (
          <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        );
      case "security":
        return (
          <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="app-wrapper">
      
      {/* Entegre Saf CSS Tasarımı */}
      <style>{`
        .app-wrapper {
          min-height: 100vh;
          background-color: #09090E;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          margin: 0;
          box-sizing: border-box;
        }

        /* Üst Bar ve İlerleme Çubuğu */
        .progress-bar-bg {
          height: 6px;
          width: 100%;
          background-color: #1e1e24;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b, #fcd34d);
          transition: width 0.5s ease;
        }
        .header-bar {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
        }
        .header-logo-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-text {
          color: #f59e0b;
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 0.15em;
        }
        .logo-separator {
          color: #4b5563;
        }
        .logo-subtitle {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
        }

        /* Kronometre */
        .timer-badge {
          display: flex;
          align-items: center;
          gap: 16px;
          background-color: #111118;
          padding: 6px 16px;
          border-radius: 9999px;
          border: 1px solid #1f1f2e;
        }
        .timer-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pulse-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .pulse-dot.active {
          background-color: #10b981;
          animation: pulse-glow 2s infinite;
        }
        .pulse-dot.inactive {
          background-color: #4b5563;
        }
        .timer-text {
          font-family: monospace;
          font-size: 0.875rem;
          color: #d1d5db;
        }
        .timer-btn {
          background: none;
          border: none;
          color: #fbbf24;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s;
        }
        .timer-btn:hover {
          color: #fcd34d;
        }

        /* Ana İçerik Alanı */
        .main-content {
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          padding: 32px 24px;
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 48px;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
            gap: 32px;
            padding: 16px;
          }
          .panel-left, .panel-right {
            width: 100% !important;
          }
        }
        .panel-left {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .illustration-container {
          position: relative;
        }
        .glow-effect {
          position: absolute;
          top: -16px;
          bottom: -16px;
          left: -16px;
          right: -16px;
          background-color: rgba(245, 158, 11, 0.1);
          border-radius: 50%;
          filter: blur(24px);
        }
        .illustration-card {
          position: relative;
          background-color: rgba(17, 17, 24, 0.4);
          border: 1px solid #1f1f2e;
          padding: 32px;
          border-radius: 24px;
          backdrop-filter: blur(12px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .svg-icon {
          width: 192px;
          height: 192px;
          color: #f59e0b;
        }

        /* Sağ Panel Metinleri */
        .panel-right {
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .slide-counter {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
          color: #f59e0b;
          margin-bottom: 8px;
        }
        .slide-title {
          font-size: 2.25rem;
          font-weight: 800;
          margin: 0 0 8px 0;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }
        .slide-subtitle {
          font-size: 1.125rem;
          color: #fcd34d;
          font-weight: 500;
          margin: 0 0 24px 0;
        }
        .points-list {
          border-top: 1px solid #1f1f2e;
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .point-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .point-bullet {
          color: #f59e0b;
          font-size: 1.125rem;
          line-height: 1;
        }
        .point-text {
          color: #d1d5db;
          font-size: 1.125rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Kontrol Paneli */
        .control-panel {
          width: 100%;
          border-top: 1px solid #1f1f2e;
          background-color: #07070b;
          padding: 24px 0;
        }
        .control-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .control-container {
            flex-direction: column;
            gap: 16px;
          }
        }
        .nav-buttons-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .btn-nav {
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-nav.prev {
          background: none;
          border: 1px solid #374151;
          color: #ffffff;
        }
        .btn-nav.prev:hover:not(:disabled) {
          background-color: #111118;
          border-color: #4b5563;
        }
        .btn-nav.next {
          background-color: #f59e0b;
          border: 1px solid #f59e0b;
          color: #000000;
        }
        .btn-nav.next:hover:not(:disabled) {
          background-color: #fbbf24;
          border-color: #fbbf24;
        }
        .btn-nav:disabled {
          border-color: #111118;
          color: #4b5563;
          background-color: transparent;
          cursor: not-allowed;
        }
        .nav-dots {
          display: flex;
          gap: 6px;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #374151;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s;
        }
        .dot.active {
          background-color: #f59e0b;
          width: 24px;
          border-radius: 9999px;
        }
        .btn-toggle-notes {
          background: none;
          border: none;
          color: #9ca3af;
          font-size: 0.875rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        .btn-toggle-notes:hover {
          color: #fbbf24;
        }

        /* Konuşmacı Rehberi */
        .speaker-notes-area {
          width: 100%;
          background-color: rgba(17, 17, 24, 0.6);
          border-top: 1px solid #1f1f2e;
          padding: 24px;
          backdrop-filter: blur(16px);
          box-sizing: border-box;
        }
        .notes-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .notes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .notes-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 700;
          color: #f59e0b;
        }
        .notes-target {
          font-size: 0.75rem;
          color: #6b7280;
          font-family: monospace;
        }
        .notes-text-box {
          background-color: #050508;
          padding: 16px;
          border-radius: 16px;
          border: 1px solid rgba(245, 158, 11, 0.2);
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.6);
          margin: 0;
          color: #e5e7eb;
          font-size: 1rem;
          line-height: 1.6;
        }

        /* Animasyonlar */
        .spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
      `}</style>

      {/* Üst Bilgi Barı ve İlerleme Çubuğu */}
      <div className="progress-section">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill"
            style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
          />
        </div>
        <div className="header-bar">
          <div className="header-logo-group">
            <span className="logo-text">CLOFTHEL</span>
            <span className="logo-separator">|</span>
            <span className="logo-subtitle">Edebiyat Konuşma Sınavı</span>
          </div>
          
          {/* Kronometre (Zamanlayıcı) */}
          <div className="timer-badge">
            <div className="timer-indicator">
              <span className={`pulse-dot ${isTimerRunning ? 'active' : 'inactive'}`} />
              <span className="timer-text">{formatTime(timer)}</span>
            </div>
            <button 
              onClick={isTimerRunning ? () => setIsTimerRunning(false) : startPresentation}
              className="timer-btn"
            >
              {timer === 0 ? "Başlat" : isTimerRunning ? "Durdur" : "Sıfırla"}
            </button>
          </div>
        </div>
      </div>

      {/* Ana Slayt İçerik Alanı */}
      <div className="main-content">
        
        {/* Sol Panel: Minimalist İllüstrasyon */}
        <div className="panel-left">
          <div className="illustration-container">
            <div className="glow-effect" />
            <div className="illustration-card">
              {renderIllustration(slide.svgType)}
            </div>
          </div>
        </div>

        {/* Sağ Panel: Slayt Metinleri ve Kurşun Noktalar */}
        <div className="panel-right">
          <span className="slide-counter">Slayt {slide.id} / {SLIDES.length}</span>
          <h1 className="slide-title">{slide.title}</h1>
          <p className="slide-subtitle">{slide.subtitle}</p>

          <div className="points-list">
            {slide.points.map((point, index) => (
              <div key={index} className="point-item">
                <span className="point-bullet">✦</span>
                <p className="point-text">{point}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Slayt Navigasyon ve Kontrol Paneli */}
      <div className="control-panel">
        <div className="control-container">
          
          {/* Sol: Geri ve İleri Butonları */}
          <div className="nav-buttons-group">
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="btn-nav prev"
            >
              ← Geri
            </button>
            <div className="nav-dots">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              disabled={currentSlide === SLIDES.length - 1}
              className="btn-nav next"
            >
              İleri →
            </button>
          </div>

          {/* Sağ: Konuşmacı Notları Göster / Gizle Butonu */}
          <div>
            <button 
              onClick={() => setShowNotes(!showNotes)}
              className="btn-toggle-notes"
            >
              {showNotes ? "👁️ Konuşmacı Notlarını Gizle" : "👁️ Konuşmacı Notlarını Göster"}
            </button>
          </div>

        </div>
      </div>

      {/* Konuşmacı Rehberi */}
      {showNotes && (
        <div className="speaker-notes-area">
          <div className="notes-container">
            <div className="notes-header">
              <span className="notes-tag">Konuşmacı Rehberi (Sözlü Sınav Notların)</span>
              <span className="notes-target">Hedef Süre: ~25 Saniye (Toplam 2 Dakika)</span>
            </div>
            <p className="notes-text-box">
              "{slide.speakerNotes}"
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
