import React, { useState, useEffect, useRef } from 'react';

// Slaytların ve genel konuşma notlarının veri yapısı (Kişisel hiçbir veri barındırmaz)
const SLIDES = [
  {
    id: 1,
    title: "Nesnelerin İnterneti (IoT) Nedir?",
    subtitle: "Fiziksel Dünyanın Dijitalleşmesi",
    points: [
      "Nesnelerin internet üzerinden birbirleriyle iletişim kurmasıdır.",
      "Sensörler ve kablosuz veri iletim teknolojileri üzerine kuruludur.",
      "İnsan müdahalesini en aza indirerek süreçleri otonomlaştırır.",
      "Günlük eşyaları akıllı hale getiren küresel bir ağ yapısıdır."
    ],
    speakerNotes: "Hocam ve sevgili arkadaşlar, bugün sizlere günlük hayatımızı sessizce ama derinden değiştiren 'Nesnelerin İnterneti' yani orijinal adıyla Internet of Things (IoT) teknolojisinden bahsedeceğim. En basit tanımıyla IoT, internete bağlı sıradan nesnelerin, biz insanların müdahalesine gerek kalmadan kendi aralarında veri alışverişi yapabilmesidir.",
    svgType: "cloud"
  },
  {
    id: 2,
    title: "Akıllı Evlerin Çalışma Mantığı",
    subtitle: "Veriden Otonom Aksiyona Uzanan Görünmez Süreç",
    points: [
      "Sensörler: Çevredeki verileri (sıcaklık, hareket, ışık) anlık olarak toplar.",
      "Bulut ve Ağ: Toplanan veriler kablosuz ağlar ile merkezi sisteme iletilir.",
      "Karar Mekanizması: Akıllı algoritmalar veriyi işler ve kararlar alır.",
      "Eylem (Aktüatör): Akıllı cihaz komut doğrultusunda otonom çalışır."
    ],
    speakerNotes: "Peki bu akıllı sistemler arka planda nasıl çalışıyor? Temelde dört adım vardır: İlk olarak sensörler çevreden sıcaklık, ışık veya hareket gibi ham verileri toplar. İkinci adımda bu veriler kablosuz ağlarla bulut sistemine aktarılır. Üçüncü adımda buluttaki yazılım veriyi işler ve son adımda akıllı cihazımız harekete geçerek otonom olarak çalışır.",
    svgType: "wifi"
  },
  {
    id: 3,
    title: "Günlük Hayattan Popüler Örnekler",
    subtitle: "Yaşam Alanımızı Kolaylaştıran Çözümler",
    points: [
      "Robot Süpürgeler: Evi kendi sensörleriyle haritalandırır ve temizler.",
      "Akıllı Termostatlar: Hava durumuna ve alışkanlıklarınıza göre sıcaklığı ayarlar.",
      "Akıllı Aydınlatma: Gün ışığına göre renk ve parlaklığı otomatik optimize eder.",
      "Akıllı Kilitler: Ev güvenliğini uzaktan kontrol etmenizi ve izlemenizi sağlar."
    ],
    speakerNotes: "Günlük hayatta nesnelerin internetinin en somut örneklerini evlerimizde görüyoruz. Örneğin, robot süpürgeler kendi sensörleriyle evi haritalandırıp temizlik yapar. Akıllı termostatlar ise bizim eve geliş saatimizi ve dışarıdaki hava durumunu öğrenerek ev sıcaklığını otomatik ayarlar. Akıllı aydınlatma sistemleri de gün ışığına göre odanın havasını optimize eder.",
    svgType: "home"
  },
  {
    id: 4,
    title: "Otonom Senaryoların Gücü",
    subtitle: "Cihazların Birlikte Yarattığı Pürüzsüz Senkronizasyon",
    points: [
      "Evden Çıkış: Kapı kilitlenir, ışıklar söner, robot süpürge çalışmaya başlar.",
      "Eve Dönüş: Ortam sıcaklığı ayarlanır, kahve makinesi otomatik çalışır.",
      "Enerji Tasarrufu: Kullanılmayan odalardaki cihazlar otomatik kapatılır.",
      "Zaman Tasarrufu: Tekrarlayan rutin ev işleri tamamen makinelere devredilir."
    ],
    speakerNotes: "IoT teknolojisinin asıl gücü 'otomasyon senaryoları' ile ortaya çıkar. Örneğin, siz evden çıktığınızda akıllı telefonunuzun konumundan bunu anlayan sistem; ışıkları kapatır, kapıyı kilitler ve robot süpürgeyi çalıştırır. Eve döndüğünüzde ise eviniz ideal sıcaklığa gelmiştir. Bu durum hem zaman kazandırır hem de ciddi bir enerji tasarrufu sağlar.",
    svgType: "process"
  },
  {
    id: 5,
    title: "Teknolojinin Geleceği ve Güvenlik",
    subtitle: "Yarının Dünyası ve Veri Korunması",
    points: [
      "Tam Otonom Yaşam: Cihazların tamamen bağımsız çalıştığı akıllı şehirler.",
      "Siber Güvenlik: Ağdaki cihazların yetkisiz erişimlere karşı korunması.",
      "Veri Gizliliği: Toplanan kişisel verilerin güvenli sunucularda saklanması.",
      "Sürdürülebilirlik: Doğal kaynakların akıllı sensörlerle verimli yönetilmesi."
    ],
    speakerNotes: "Sonuç olarak, nesnelerin interneti gelecekte sadece evlerimizi değil, akıllı şehirleri ve tüm dünyayı yönetecek bir teknoloji. Elbette bu kadar çok cihazın birbirine bağlı olması siber güvenlik ve veri gizliliği gibi önemli sorumlulukları da beraberinde getiriyor. Bu güvenlik adımları doğru atıldığında, IoT yaşam kalitemizi her geçen gün artırmaya devam edecektir. Teşekkürler.",
    svgType: "security"
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

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
      case "home":
        return (
          <svg className="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        );
      case "process":
        return (
          <svg className="svg-icon spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-1.5M4.5 12H3" />
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
      
      {/* Entegre Saf Normal CSS Tasarımı */}
      <style>{`
        .app-wrapper {
          min-height: 100vh;
          background-color: #0c0c12;
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
          background-color: #1a1a24;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
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
          color: #3b82f6;
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
          background-color: #11111a;
          padding: 6px 16px;
          border-radius: 9999px;
          border: 1px solid #222235;
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
          color: #60a5fa;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s;
        }
        .timer-btn:hover {
          color: #93c5fd;
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
          background-color: rgba(59, 130, 246, 0.1);
          border-radius: 50%;
          filter: blur(24px);
        }
        .illustration-card {
          position: relative;
          background-color: rgba(17, 17, 26, 0.4);
          border: 1px solid #222235;
          padding: 32px;
          border-radius: 24px;
          backdrop-filter: blur(12px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .svg-icon {
          width: 192px;
          height: 192px;
          color: #3b82f6;
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
          color: #3b82f6;
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
          color: #60a5fa;
          font-weight: 500;
          margin: 0 0 24px 0;
        }
        .points-list {
          border-top: 1px solid #222235;
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
          color: #3b82f6;
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
          border-top: 1px solid #222235;
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
          background-color: #11111a;
          border-color: #4b5563;
        }
        .btn-nav.next {
          background-color: #3b82f6;
          border: 1px solid #3b82f6;
          color: #ffffff;
        }
        .btn-nav.next:hover:not(:disabled) {
          background-color: #60a5fa;
          border-color: #60a5fa;
        }
        .btn-nav:disabled {
          border-color: #11111a;
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
          background-color: #3b82f6;
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
          color: #60a5fa;
        }

        /* Konuşmacı Rehberi */
        .speaker-notes-area {
          width: 100%;
          background-color: rgba(17, 17, 26, 0.6);
          border-top: 1px solid #222235;
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
          color: #3b82f6;
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
          border: 1px solid rgba(59, 130, 246, 0.2);
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
            <span className="logo-text">IoT</span>
            <span className="logo-separator">|</span>
            <span className="logo-subtitle">Edebiyat Konuşma Sınavı Sunumu</span>
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
              <span className="notes-tag">Konuşmacı Rehberi (Sözlü Sınav Notları)</span>
              <span className="notes-target">Hedef Süre: Slayt Başı ~24 Saniye (Toplam 2 Dakika)</span>
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
