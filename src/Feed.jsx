
import React, { useState } from 'react';

// İkonlar
const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 14 6h7v7a7 7 0 0 1-7 7h-3Z"/><path d="M14 6v6a3 3 0 0 1-3 3h-4"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Biyokütle Enerjisi Nedir?",
      description: "Biyokütle, bitkisel ve hayvansal kökenli organik maddelerin genel adıdır. Fosil yakıtların milyonlarca yılda oluşmasına karşın, biyokütle kısa sürede yenilenebilen ve doğada sürekli bir döngü içinde bulunan harika bir enerji kaynağıdır. Güneş enerjisini fotosentez yoluyla depolayan bitkiler, bu enerjiyi doğal ve sürdürülebilir bir şekilde kullanmamıza olanak tanır.",
      image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Kaynakları Nelerdir?",
      description: "Doğadaki pek çok atık aslında gizli birer enerji deposudur. Tarımsal faaliyetler sonucu ortaya çıkan mısır sapları ve buğday samanları, orman endüstrisi atıkları, hayvansal gübreler ve hatta evsel organik atıklar en temel biyokütle kaynaklarıdır. Bu atıkların enerjiye dönüştürülmesi, hem çevre kirliliğini önler hem de atık yönetiminde devrim yaratır.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Enerjiye Nasıl Dönüşür?",
      description: "Biyokütlenin enerjiye dönüşümü farklı modern teknolojilerle sağlanır. En geleneksel yöntem olan doğrudan yakma ile ısı elde edilirken; ileri biyokimyasal ve termokimyasal işlemlerle organik maddeler biyogaz, biyoetanol ve biyodizel gibi yakıtlara çevrilir. Elde edilen bu temiz yakıtlar, elektrik santrallerinde, evlerimizin ısıtılmasında ve motorlu taşıtlarda güvenle kullanılabilir.",
      image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: "Çevre Dostu ve Karbon Nötr",
      description: "Biyokütle enerjisinin en büyük avantajı, sera gazı emisyonlarını dengelemesidir. Bitkiler büyürken atmosferden karbondioksit emerler; biyokütle yakıldığında ise sadece bu emilen karbondioksit geri salınır. Bu sayede atmosfere ekstra karbon eklenmez ve sistem 'karbon nötr' olarak çalışır. Fosil yakıtların aksine, ekosistemin doğal dengesini korur.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 5,
      title: "Gelecekte Biyokütlenin Rolü",
      description: "Küresel iklim kriziyle mücadelede biyokütle enerjisi, rüzgar ve güneş gibi diğer yenilenebilir kaynakları destekleyen kilit bir role sahiptir. Özellikle enerji arzı güvenliğini sağlaması ve kırsal kalkınmaya ekonomik destek vermesi açısından stratejiktir. Geleceğin temiz, yeşil ve sürdürülebilir şehirlerini inşa ederken fosil yakıtlara olan bağımlılığımızı büyük ölçüde bitirecektir.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      triggerAnimation(() => setCurrentSlide(prev => prev + 1));
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      triggerAnimation(() => setCurrentSlide(prev => prev - 1));
    }
  };

  const triggerAnimation = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 300);
  };

  const current = slides[currentSlide];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .app-container { min-height: 100vh; background-color: #ffffff; color: #1e293b; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .slide-wrapper { max-width: 1200px; width: 100%; display: flex; flex-direction: column; gap: 2.5rem; align-items: center; }
        .text-col { width: 100%; display: flex; flex-direction: column; justify-content: center; order: 2; }
        .badge-container { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .icon-box { background-color: #dcfce7; padding: 0.75rem; border-radius: 50%; color: #16a34a; display: flex; align-items: center; justify-content: center; }
        .badge-text { color: #16a34a; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; font-size: 0.875rem; }
        .fade-section { transition: opacity 0.3s ease; }
        .fade-section.hidden { opacity: 0; }
        .fade-section.visible { opacity: 1; }
        .title-text { font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 1.5rem; line-height: 1.2; }
        .desc-text { font-size: 1.125rem; color: #475569; margin-bottom: 3rem; line-height: 1.6; text-align: justify; }
        .controls { display: flex; align-items: center; gap: 2rem; margin-top: auto; padding-top: 2rem; border-top: 1px solid #f1f5f9; }
        .btn-group { display: flex; gap: 1rem; }
        .nav-btn { padding: 1rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; transition: all 0.3s ease; }
        .nav-btn:disabled { background-color: #f8fafc; color: #cbd5e1; cursor: not-allowed; border: 2px solid transparent;}
        .btn-prev:not(:disabled) { background-color: #fff; border: 2px solid #e2e8f0; color: #334155; }
        .btn-prev:not(:disabled):hover { border-color: #22c55e; color: #16a34a; }
        .btn-next:not(:disabled) { background-color: #16a34a; color: white; border: 2px solid #16a34a;}
        .btn-next:not(:disabled):hover { background-color: #15803d; }
        .progress-bar { flex: 1; display: flex; gap: 0.5rem; align-items: center; }
        .dot { height: 0.5rem; border-radius: 9999px; transition: all 0.5s ease; }
        .dot.active { width: 3rem; background-color: #22c55e; }
        .dot.inactive { width: 0.5rem; background-color: #e2e8f0; }
        .img-col { width: 100%; order: 1; }
        .img-container { position: relative; width: 100%; height: 300px; border-radius: 1.5rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); background-color: #f1f5f9; }
        .slide-img { width: 100%; height: 100%; object-fit: cover; transition: all 0.7s ease; }
        .slide-img.animating { transform: scale(1.1); opacity: 0.5; }
        .slide-img.static { transform: scale(1); opacity: 1; }
        .img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.2), transparent); }

        /* Masaüstü Uyumluluğu */
        @media(min-width: 1024px) { 
          .app-container { padding: 3rem; }
          .slide-wrapper { flex-direction: row; gap: 5rem; }
          .text-col { width: 50%; order: 1; }
          .img-col { width: 50%; order: 2; }
          .title-text { font-size: 3.5rem; }
          .desc-text { font-size: 1.25rem; text-align: left; }
          .img-container { height: 600px; }
        }
      `}</style>

      <div className="app-container">
        <div className="slide-wrapper">
          
          {/* Sol: Metin */}
          <div className="text-col">
            <div className="badge-container">
              <div className="icon-box">
                <LeafIcon />
              </div>
              <span className="badge-text">
                Sayfa {currentSlide + 1} / {slides.length}
              </span>
            </div>

            <div className={`fade-section ${isAnimating ? 'hidden' : 'visible'}`}>
              <h1 className="title-text">{current.title}</h1>
              <p className="desc-text">{current.description}</p>
            </div>

            {/* Butonlar */}
            <div className="controls">
              <div className="btn-group">
                <button onClick={prevSlide} disabled={currentSlide === 0} className="nav-btn btn-prev">
                  <ChevronLeftIcon />
                </button>
                <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="nav-btn btn-next">
                  <ChevronRightIcon />
                </button>
              </div>
              <div className="progress-bar">
                {slides.map((_, index) => (
                  <div key={index} className={`dot ${currentSlide === index ? 'active' : 'inactive'}`} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Sağ: Görsel */}
          <div className="img-col">
            <div className="img-container">
              <img 
                key={current.image}
                src={current.image} 
                alt={current.title} 
                className={`slide-img ${isAnimating ? 'animating' : 'static'}`}
              />
              <div className="img-overlay"></div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
