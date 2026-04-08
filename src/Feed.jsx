
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Detaylandırılmış 5 sayfalık sunum verisi
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
    }, 300); // Yarım saniyelik yumuşak geçiş
  };

  const current = slides[currentSlide];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex items-center justify-center p-4 lg:p-12">
      
      {/* Masaüstünde yan yana, mobilde alt alta duran modern kart yapısı */}
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
        
        {/* Sol Taraf: Metin ve Kontroller */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <Leaf size={24} />
            </div>
            <span className="text-green-600 font-semibold tracking-wider uppercase text-sm">
              Sayfa {currentSlide + 1} / {slides.length}
            </span>
          </div>

          <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              {current.title}
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed text-justify lg:text-left">
              {current.description}
            </p>
          </div>

          {/* Kontrol Butonları ve İlerleme Çubuğu */}
          <div className="flex items-center gap-8 mt-auto pt-8 border-t border-slate-100">
            <div className="flex gap-4">
              <button 
                onClick={prevSlide} 
                disabled={currentSlide === 0}
                className={`p-4 rounded-full flex items-center justify-center transition-all duration-300 ${currentSlide === 0 ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-green-500 hover:text-green-600 shadow-sm hover:shadow-md'}`}
              >
                <ChevronLeft size={28} />
              </button>
              
              <button 
                onClick={nextSlide} 
                disabled={currentSlide === slides.length - 1}
                className={`p-4 rounded-full flex items-center justify-center transition-all duration-300 ${currentSlide === slides.length - 1 ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'}`}
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <div className="flex-1 flex gap-2">
              {slides.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 rounded-full transition-all duration-500 ${currentSlide === index ? 'w-12 bg-green-500' : 'w-2 bg-slate-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Sağ Taraf: Büyük Görsel */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
            <img 
              key={current.image}
              src={current.image} 
              alt={current.title} 
              className={`w-full h-full object-cover transition-all duration-700 ${isAnimating ? 'scale-110 opacity-50' : 'scale-100 opacity-100'}`}
            />
            {/* Görselin üzerine hafif bir gölge efekti (daha şık durması için) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

