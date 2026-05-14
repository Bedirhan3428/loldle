import React, { useEffect, useRef, useState } from 'react';

// Kaydırma animasyonu için özel kart bileşeni
const FadeInCard = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 } // %15'i görününce tetikle
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all duration-1000 ease-out hover:scale-[1.02] hover:border-white/20 hover:shadow-blue-500/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  // Google Drive dosya ID'leri
  const imageId = "1UsuvHmWtc0S6MvWEGKo-F8v236ZMSpjo";
  const videoId = "1ABEcdeF4BSDgZOYchX8kzNONJVFTihaZ";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans overflow-x-hidden pb-12 relative">
      
      {/* Arka plan parlama efekti */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        
        {/* Başlık */}
        <header className="pt-28 pb-20 text-center animate-fade-in-down">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            İHA Proje Vitrini
          </h1>
          <p className="text-slate-400 text-lg md:text-xl tracking-wide font-medium">
            Mustafa • Tasarım & Mühendislik
          </p>
        </header>

        {/* İçerik Kartları */}
        <div className="space-y-16">
          
          {/* Fotoğraf Alanı */}
          <FadeInCard delay={0}>
            <h2 className="text-2xl font-semibold mb-6 pl-4 border-l-4 border-blue-500 text-slate-100">
              Proje Görseli
            </h2>
            <div className="rounded-2xl overflow-hidden bg-black/50 aspect-auto md:aspect-video relative group border border-white/5 flex items-center justify-center">
              <img
                src={`https://drive.google.com/uc?export=view&id=${imageId}`}
                alt="İHA Proje Fotoğrafı"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/800x450?text=Görsel+Yüklenemedi+(Erişim+İzni+Gerekebilir)';
                }}
              />
            </div>
          </FadeInCard>

          {/* Video Alanı */}
          <FadeInCard delay={200}>
            <h2 className="text-2xl font-semibold mb-6 pl-4 border-l-4 border-purple-500 text-slate-100">
              Uçuş & Tanıtım Videosu
            </h2>
            <div className="rounded-2xl overflow-hidden bg-black/50 aspect-video relative group border border-white/5">
              <iframe
                src={`https://drive.google.com/file/d/${videoId}/preview`}
                title="İHA Video"
                className="w-full h-full absolute top-0 left-0 border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </FadeInCard>

        </div>

        {/* Altbilgi */}
        <footer className="mt-28 text-center text-slate-500 text-sm font-medium">
          <p>© 2026 Mustafa. Tüm hakları saklıdır.</p>
        </footer>

      </div>
    </div>
  );
}