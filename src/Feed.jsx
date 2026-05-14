import React, { useEffect, useRef, useState } from 'react';

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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`card ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Feed() {
  // Görsel ve yeni Firebase video linki
  const imageUrl = "https://i.hizliresim.com/2ydo4v5.jpg";
  const videoUrl = "https://firebasestorage.googleapis.com/v0/b/sigalmedia.firebasestorage.app/o/lv_0_20260514201923.mp4?alt=media&token=fee817ab-673e-4ce6-b7bf-54c9481d72fe";

  const cssStyles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .vitrin-body {
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        background-color: #0f172a;
        color: #f8fafc;
        line-height: 1.6;
        min-height: 100vh;
        overflow-x: hidden;
        background-image: radial-gradient(circle at 50% 0%, #1e293b 0%, transparent 70%);
        padding-bottom: 50px;
    }
    .container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        z-index: 10;
    }
    .hero-title {
        font-size: clamp(2.5rem, 5vw, 4.5rem);
        text-align: center;
        margin-top: 12vh;
        font-weight: 800;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #60a5fa, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: fadeDown 1s ease-out;
    }
    .subtitle {
        text-align: center;
        color: #94a3b8;
        font-size: 1.2rem;
        margin-bottom: 4rem;
        animation: fadeUp 1s ease-out 0.4s both;
    }
    .sections-wrapper {
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }
    .card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        padding: 30px;
        width: 100%;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        opacity: 0;
        transform: translateY(40px);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .card.visible {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .card:hover {
        transform: translateY(-8px) scale(1.01);
        box-shadow: 0 30px 60px -15px rgba(96, 165, 250, 0.2);
        border-color: rgba(255, 255, 255, 0.15);
    }
    .card h2 {
        font-size: 1.5rem;
        color: #e2e8f0;
        margin-bottom: 1.5rem;
        padding-left: 12px;
        border-left: 4px solid #3b82f6;
    }
    .card:nth-child(2) h2 {
        border-left-color: #a855f7;
    }
    .media-wrapper {
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        background: rgba(0,0,0,0.5);
        aspect-ratio: 16 / 9;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .media-wrapper img, .media-wrapper video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: none;
        transition: transform 0.7s ease;
    }
    .media-wrapper:hover img {
        transform: scale(1.05);
    }
    @keyframes fadeDown {
        from { opacity: 0; transform: translateY(-30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    footer {
        text-align: center;
        margin-top: 5rem;
        color: #64748b;
        font-size: 0.9rem;
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <div className="vitrin-body">
        <div className="container">
          
          <header>
            <h1 className="hero-title">İHA Proje Vitrini</h1>
            <p className="subtitle">Mustafa • Tasarım & Mühendislik</p>
          </header>

          <div className="sections-wrapper">
            <FadeInCard delay={0}>
              <h2>Proje Görseli</h2>
              <div className="media-wrapper">
                <img
                  src={imageUrl}
                  alt="İHA Proje Fotoğrafı"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/800x450?text=Görsel+Yüklenemedi';
                  }}
                />
              </div>
            </FadeInCard>

            <FadeInCard delay={200}>
              <h2>Uçuş & Tanıtım Videosu</h2>
              <div className="media-wrapper">
                <video controls preload="metadata">
                  <source src={videoUrl} type="video/mp4" />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              </div>
            </FadeInCard>
          </div>

          <footer>
            <p>© 2026 Mustafa. Tüm hakları saklıdır.</p>
          </footer>

        </div>
      </div>
    </>
  );
}