import { useState, useEffect } from "react";

const C = {
  bg: "#0D1117", bgCard: "#161B22", bgCard2: "#1C2333",
  cyan: "#00D9FF", purple: "#7C3AED", green: "#10B981",
  orange: "#F59E0B", red: "#EF4444", white: "#E6EDF3", gray: "#8B949E",
  dark: "#30363D",
};
useEffect(() => {
const styleEl = document.createElement("style");
styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0D1117; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes blink    { 0%,100%{opacity:1;} 50%{opacity:0;} }
  @keyframes float    { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-10px);} }
  @keyframes pulse    { 0%,100%{opacity:1;} 50%{opacity:.4;} }
  @keyframes matrixFall { 0%{opacity:1;transform:translateY(-10px);} 100%{opacity:0;transform:translateY(130px);} }

  .slide-enter { animation: fadeIn .45s ease both; }
  .card-hover  { transition: transform .2s ease, box-shadow .2s ease; }
  .card-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 36px rgba(0,0,0,.55); }
  .syne { font-family:'Syne',sans-serif; }
  .dm   { font-family:'DM Sans',sans-serif; }
  .mono { font-family:'JetBrains Mono',monospace; }

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:#0D1117; }
  ::-webkit-scrollbar-thumb { background:#30363D; border-radius:3px; }
`;
document.head.appendChild(styleEl);
}, []);

function GlowOrb({ x, y, color, size = 340, opacity = 0.12 }) {
  return (
    <div style={{
      position:"absolute", left:x, top:y, width:size, height:size,
      borderRadius:"50%", background:`radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity, pointerEvents:"none", filter:"blur(48px)", zIndex:0,
    }} />
  );
}

function MatrixRain() {
  const chars = "01アイウエ{}[];:ABCDEF".split("");
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", opacity:.06, zIndex:0 }}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} style={{
          position:"absolute", top:0, left:`${i * 6.5}%`,
          fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:C.cyan,
          animation:`matrixFall ${1.8 + Math.random() * 2.5}s linear ${Math.random() * 2}s infinite`,
        }}>
          {chars[Math.floor(Math.random() * chars.length)]}
        </div>
      ))}
    </div>
  );
}

function Badge({ children, color }) {
  return (
    <span className="mono" style={{
      background:`${color}20`, color, border:`1px solid ${color}55`,
      borderRadius:5, padding:"2px 9px", fontSize:11, display:"inline-block",
    }}>{children}</span>
  );
}

function NavDots({ total, current, onChange }) {
  return (
    <div style={{ display:"flex", gap:7, alignItems:"center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => onChange(i)} style={{
          width: i === current ? 26 : 8, height:8, borderRadius:4, border:"none",
          cursor:"pointer", background: i === current ? C.cyan : C.dark,
          transition:"all .3s ease", padding:0,
        }} />
      ))}
    </div>
  );
}

function Para({ text, color = C.gray, delay = 0 }) {
  return (
    <p className="dm" style={{
      color, fontSize:14.5, lineHeight:1.9,
      animation:`fadeUp .5s ease ${delay}s both`,
    }}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

function InfoCard({ icon, title, body, color = C.cyan, delay = 0 }) {
  return (
    <div className="card-hover" style={{
      background:C.bgCard, borderRadius:10,
      borderLeft:`3px solid ${color}`,
      border:`1px solid ${color}33`, borderLeft:`3px solid ${color}`,
      padding:"16px 18px",
      animation:`fadeUp .5s ease ${delay}s both`,
    }}>
      <div className="syne" style={{ color, fontSize:15, fontWeight:700, marginBottom:8, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:20 }}>{icon}</span>
        {title}
      </div>
      <p className="dm" style={{ color:C.gray, fontSize:13.5, lineHeight:1.8 }}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}

function TermRow({ term, desc, color, delay = 0 }) {
  return (
    <div style={{
      display:"flex", alignItems:"baseline", gap:10,
      animation:`fadeUp .4s ease ${delay}s both`,
      marginBottom:8,
    }}>
      <span className="mono" style={{
        background:`${color}20`, color, border:`1px solid ${color}44`,
        borderRadius:5, padding:"2px 9px", fontSize:11.5,
        flexShrink:0, whiteSpace:"nowrap",
      }}>{term}</span>
      <span className="dm" style={{ color:C.gray, fontSize:13, lineHeight:1.6 }}>{desc}</span>
    </div>
  );
}

function ExampleBox({ title, children, color = C.cyan, delay = 0 }) {
  return (
    <div style={{
      background:"#0A0E14", borderRadius:10, overflow:"hidden",
      border:`1px solid ${color}33`,
      animation:`fadeUp .5s ease ${delay}s both`,
    }}>
      <div style={{
        background:"#161B22", padding:"8px 14px",
        display:"flex", alignItems:"center", gap:8,
        borderBottom:`1px solid ${C.dark}`,
      }}>
        {["#EF4444","#F59E0B","#10B981"].map((c, i) => (
          <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }} />
        ))}
        <span className="mono" style={{ fontSize:11, color:C.gray, marginLeft:4 }}>{title}</span>
      </div>
      <div style={{ padding:"14px 16px" }}>
        {children}
      </div>
    </div>
  );
}

function SlideHeader({ num, label, color }) {
  return (
    <div style={{ marginBottom:20, animation:"fadeUp .4s ease both" }}>
      <span className="mono" style={{ fontSize:10, color, letterSpacing:5, opacity:.8 }}>
        {String(num).padStart(2,"0")} / {label.toUpperCase()}
      </span>
      <div style={{ height:1, background:`linear-gradient(to right, ${color}, transparent)`, marginTop:8 }} />
    </div>
  );
}

/* ═══════════════════ SLAYT 1 — KAPAK ═══════════════════ */
function Slide1() {
  const [typed, setTyped] = useState("");
  const full = "Dijital İzlerimiz";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { if (i <= full.length) { setTyped(full.slice(0, i)); i++; } else clearInterval(t); }, 90);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative" }}>
      <MatrixRain />
      <GlowOrb x="55%" y="-15%" color={C.purple} size={450} opacity={0.16} />
      <GlowOrb x="-8%" y="50%" color={C.cyan} size={320} opacity={0.10} />

      <div style={{ position:"absolute", right:50, top:"50%", transform:"translateY(-50%)", opacity:.1, zIndex:0, animation:"float 4s ease-in-out infinite" }}>
        <svg width={210} height={210} viewBox="0 0 100 100" fill="none">
          {[45,35,25,15,5].map((r,i) => <circle key={i} cx="50" cy="50" r={r} stroke={C.cyan} strokeWidth="1.4" fill="none" opacity={.4+i*.1} />)}
          <circle cx="50" cy="50" r="3" fill={C.cyan} opacity=".9" />
        </svg>
      </div>

      <div style={{ position:"relative", zIndex:1, maxWidth:740 }}>
        <div className="mono" style={{ fontSize:11, color:C.cyan, letterSpacing:6, marginBottom:18, animation:"fadeUp .4s ease both" }}>
          [ SUNUM BAŞLIYOR ]
        </div>

        <h1 className="syne" style={{ fontSize:58, fontWeight:800, lineHeight:1.1, color:C.white, marginBottom:14, animation:"fadeUp .5s ease .1s both" }}>
          <span style={{ color:C.cyan }}>
            {typed}<span style={{ animation:"blink 1s step-end infinite", color:C.cyan }}>|</span>
          </span>
          <br />
          <span style={{ fontSize:30, color:C.white, fontWeight:700 }}>Verilerimiz ve</span>
          <br />
          <span style={{ fontSize:30, color:C.gray, fontWeight:400 }}>İşin Mutfağındaki Sırlar</span>
        </h1>

        <div style={{ height:3, width:300, background:`linear-gradient(to right,${C.purple},${C.cyan})`, borderRadius:2, marginBottom:24, animation:"fadeUp .5s ease .25s both" }} />

        <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.cyan}`, border:`1px solid ${C.cyan}33`, borderLeft:`3px solid ${C.cyan}`, padding:"18px 22px", maxWidth:660, animation:"fadeUp .6s ease .35s both" }}>
          <p className="dm" style={{ color:C.gray, fontSize:14.5, fontStyle:"italic", lineHeight:1.9 }}>
            "Hepimiz her gün onlarca kez bir şeyleri beğeniyor, paylaşıyor veya kaydırıyoruz.
            Peki, ekrandaki o masum <span style={{color:C.cyan}}>'Gönder'</span> butonuna bastığınız saniyede,
            devasa teknoloji şirketlerinin sunucularında nasıl bir <span style={{color:C.orange}}>fırtına</span> koptuğunu
            hiç düşündünüz mü?"
          </p>
        </div>

        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:20, animation:"fadeUp .5s ease .5s both" }}>
          {[
            { icon:"🛡", label:"Güvenlik Filtreleri", color:C.red },
            { icon:"📦", label:"Veri Yapıları",       color:C.green },
            { icon:"🪣", label:"Bucket Depolama",     color:C.orange },
            { icon:"🔐", label:"Şifreleme",           color:C.purple },
          ].map((t, i) => (
            <div key={i} className="card-hover" style={{
              background:C.bgCard, border:`1px solid ${t.color}44`,
              borderRadius:8, padding:"8px 15px",
              display:"flex", alignItems:"center", gap:8,
            }}>
              <span style={{ fontSize:18 }}>{t.icon}</span>
              <span className="dm" style={{ color:t.color, fontSize:13, fontWeight:500 }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        background:"#08090D", borderTop:`1px solid ${C.dark}`,
        padding:"8px 22px", display:"flex", gap:28, alignItems:"center",
      }}>
        {["BAĞLANTI KURULDU","VERİ AKIŞI BAŞLADI","ŞİFRELENİYOR..."].map((t, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.green, animation:`pulse 2s ease ${i*.4}s infinite` }} />
            <span className="mono" style={{ fontSize:9.5, color:C.green, letterSpacing:1 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ SLAYT 2 — GİRİŞ ═══════════════════ */
function Slide2() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 5), 2000);
    return () => clearInterval(t);
  }, []);

  const steps = [
    { icon:"👆", label:"Beğen / Paylaş",   color:C.cyan },
    { icon:"⚡", label:"Sunucu Tetiklenir", color:C.orange },
    { icon:"🔍", label:"Filtreler Tarar",   color:C.purple },
    { icon:"🗄", label:"Veri Kaydedilir",   color:C.green },
    { icon:"🔒", label:"Şifrelenir",        color:C.red },
  ];

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>
      <GlowOrb x="65%" y="-20%" color={C.cyan} size={360} opacity={0.09} />
      <SlideHeader num={1} label="Giriş" color={C.cyan} />

      <h2 className="syne" style={{ fontSize:34, fontWeight:800, color:C.white, marginBottom:16, animation:"fadeUp .5s ease both" }}>
        Masum Bir Tıklamanın Arkasındaki <span style={{ color:C.cyan }}>Fırtına</span>
      </h2>

      <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.cyan}`, border:`1px solid ${C.cyan}22`, borderLeft:`3px solid ${C.cyan}`, padding:"18px 22px", marginBottom:20, animation:"fadeUp .5s ease .1s both" }}>
        <Para text={`
          Hepimiz her gün onlarca kez bir şeyleri beğeniyor, paylaşıyor veya kaydırıyoruz.
          Peki, ekrandaki o masum <span style="color:#00D9FF">'Gönder'</span> butonuna bastığınız saniyede,
          devasa teknoloji şirketlerinin sunucularında nasıl bir fırtına koptuğunu hiç düşündünüz mü?
          Bugün size o pırıl pırıl ekranların arkasındaki <span style="color:#F59E0B">karanlık mutfakta</span>,
          dijital ayak izlerimizin nasıl devasa bir <span style="color:#10B981">veri madenine</span> dönüştüğünü anlatacağım.
        `} />
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {steps.map((st, i) => (
          <div key={i} onClick={() => setActive(i)} className="card-hover" style={{
            flex:1, background:C.bgCard,
            border:`1px solid ${active===i ? st.color : C.dark}`,
            borderTop:`3px solid ${active===i ? st.color : C.dark}`,
            borderRadius:10, padding:"14px 8px", textAlign:"center", cursor:"pointer",
            transition:"all .3s", transform: active===i ? "translateY(-4px)" : "none",
            boxShadow: active===i ? `0 8px 24px ${st.color}33` : "none",
          }}>
            <div style={{ fontSize:26, marginBottom:6 }}>{st.icon}</div>
            <div className="syne" style={{ fontSize:11.5, fontWeight:700, color: active===i ? st.color : C.white, lineHeight:1.3 }}>{st.label}</div>
            <div className="mono" style={{ fontSize:16, fontWeight:700, color: active===i ? st.color : C.dark, marginTop:6 }}>{i+1}</div>
          </div>
        ))}
      </div>

      <div style={{
        background:"linear-gradient(135deg,#1C1A2E,#1A2A1E)",
        borderRadius:10, padding:"16px 22px",
        border:`1px solid ${C.orange}44`,
        display:"flex", alignItems:"center", gap:14,
        animation:"fadeUp .5s ease .5s both",
      }}>
        <span style={{ fontSize:28, flexShrink:0 }}>💡</span>
        <div>
          <div className="dm" style={{ color:C.gray, fontSize:13, marginBottom:3 }}>Teknoloji Dünyasının Altın Kuralı</div>
          <div className="syne" style={{ color:C.orange, fontSize:17, fontWeight:700 }}>
            "Eğer bir ürün ücretsizse, ürün SİZSİNİZDİR."
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ SLAYT 3 — FİLTRELER ═══════════════════ */
function Slide3() {
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>
      <GlowOrb x="-5%" y="20%" color={C.red} size={300} opacity={0.12} />
      <SlideHeader num={2} label="Güvenlik Filtreleri" color={C.red} />

      <h2 className="syne" style={{ fontSize:34, fontWeight:800, color:C.white, marginBottom:16, animation:"fadeUp .5s ease both" }}>
        Dijital Sınır Muhafızları: <span style={{ color:C.red }}>Sentinel Scan</span>
      </h2>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, flex:1 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.red}`, border:`1px solid ${C.red}22`, borderLeft:`3px solid ${C.red}`, padding:"18px 20px", animation:"fadeUp .5s ease .1s both" }}>
            <Para text={`
              Attığınız bir adımın ilk durağı <span style="color:#EF4444">güvenlik filtreleridir</span>.
              Diyelim ki sisteme yasaklı bir kelime yazdınız ve aralara noktalar koyarak
              <span style="color:#F59E0B">(k.ü.f.ü.r gibi)</span> algoritmayı kandırmaya çalıştınız.
              Ekranda zekice durabilir; ama dev şirketlerin
              <span style="color:#EF4444">Sentinel Scan</span> adını verdikleri katmandan kaçamazsınız.
            `} />
          </div>

          <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.orange}`, border:`1px solid ${C.orange}22`, borderLeft:`3px solid ${C.orange}`, padding:"18px 20px", animation:"fadeUp .5s ease .2s both" }}>
            <Para text={`
              Sistem burada metni <span style="color:#00D9FF">Array (Dizi)</span> veri yapısına bölerek parçalar
              ve <span style="color:#7C3AED">Regex (Düzenli İfadeler)</span> algoritmalarını koşturur.
              Araya ne koyarsanız koyun — nokta, boşluk, sembol — dijital iziniz anında yakalanır.
              Tıpkı bir <span style="color:#F59E0B">elekle un eleyen fırıncı</span> gibi:
              ince gözeneklerden hiçbir parça kaçamaz.
            `} />
          </div>

          <div style={{ background:C.bgCard2, borderRadius:10, padding:"14px 18px", animation:"fadeUp .5s ease .3s both" }}>
            <div className="syne" style={{ color:C.gray, fontSize:11, letterSpacing:3, marginBottom:10 }}>KAVRAMLAR</div>
            <TermRow term="Array (Dizi)"    desc="Verileri sıralı kutucuklarda tutan bir liste yapısı."              color={C.cyan}   delay={.35} />
            <TermRow term="Regex"           desc="Belirli kalıpları metinde arayan özel arama formülü."              color={C.purple} delay={.4}  />
            <TermRow term="Sentinel Scan"   desc="Büyük şirketlerin içerik filtresi için kullandığı güvenlik katmanı." color={C.red} delay={.45} />
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <ExampleBox title="Bypass denemesi nasıl yakalanır?" color={C.red} delay={0.2}>
            <div style={{ marginBottom:12 }}>
              <div className="dm" style={{ color:C.gray, fontSize:12, marginBottom:6 }}>1️⃣  Kullanıcının yazdığı:</div>
              <div className="mono" style={{ fontSize:18, color:C.red, letterSpacing:4, fontWeight:700 }}>"k . ü . f . ü . r"</div>
            </div>
            <div style={{ marginBottom:12 }}>
              <div className="dm" style={{ color:C.gray, fontSize:12, marginBottom:6 }}>2️⃣  Sistem nokta ve boşlukları siler:</div>
              <div className="mono" style={{ fontSize:18, color:C.orange, fontWeight:700 }}>"küfür"</div>
            </div>
            <div>
              <div className="dm" style={{ color:C.gray, fontSize:12, marginBottom:6 }}>3️⃣  Kara listede mi? Sonuç:</div>
              <div style={{ background:`${C.red}18`, borderRadius:7, padding:"8px 12px", border:`1px solid ${C.red}44`, display:"inline-flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:18 }}>🚫</span>
                <span className="mono" style={{ color:C.red, fontWeight:700, fontSize:14 }}>ENGELLENDI</span>
              </div>
            </div>
          </ExampleBox>

          <InfoCard
            icon="🧠"
            title="Neden kaçamazsınız?"
            body={`Sistem nokta, tire, yıldız gibi <span style="color:#F59E0B">tüm ara karakterleri temizler</span>,
              ardından temizlenmiş metni yasak kelimeler listesiyle karşılaştırır.
              Bu işlem milisaniyeler içinde tamamlanır ve sizin fark etmeniz imkânsızdır.`}
            color={C.orange}
            delay={0.4}
          />

          <InfoCard
            icon="🔢"
            title="Liste ile Arama (Array)"
            body={`Yasaklı kelimelerin tamamı bir <span style="color:#00D9FF">dizide (listede)</span> tutulur.
              Sistem temizlenmiş kelimeyi bu listeyle karşılaştırır.
              Eşleşme bulunursa gönderi anında engellenir.`}
            color={C.cyan}
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ SLAYT 4 — VERİ YAPILARI ═══════════════════ */
function Slide4() {
  const types = [
    { type:"Sayı (Integer)",    val:"17",              ex:"yaş, kullanıcı no",  color:C.orange },
    { type:"Metin (String)",    val:'"Ahmet"',          ex:"isim, e-posta",      color:C.green  },
    { type:"Liste (Array)",     val:'["mavi","siyah"]', ex:"renkler, etiketler", color:C.cyan   },
    { type:"Evet/Hayır (Bool)", val:"false",            ex:"premium mi?",        color:C.purple },
  ];

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>
      <GlowOrb x="60%" y="5%" color={C.green} size={360} opacity={0.09} />
      <SlideHeader num={3} label="Veri Yapıları & İndeksleme" color={C.green} />

      <h2 className="syne" style={{ fontSize:34, fontWeight:800, color:C.white, marginBottom:16, animation:"fadeUp .5s ease both" }}>
        Dijital İkiziniz: <span style={{ color:C.green }}>JSON, Dictionary & B-Tree</span>
      </h2>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, flex:1 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.green}`, border:`1px solid ${C.green}22`, borderLeft:`3px solid ${C.green}`, padding:"18px 20px", animation:"fadeUp .5s ease .1s both" }}>
            <Para text={`
              Peki milyarlarca kullanıcının verisi nerede duruyor? Devasa şirketler,
              sizin o <span style="color:#10B981">dijital ikizinizi</span> eski usul, sıkıcı ve kısıtlayıcı
              Excel tablolarında saklamaz. Bunun yerine
              <span style="color:#00D9FF">Document-Oriented (Döküman Odaklı)</span> sistemler kullanırlar.
              Bu sayede veriler çok daha esnek ve hızlı bir biçimde depolanabilir.
            `} />
          </div>

          <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.cyan}`, border:`1px solid ${C.cyan}22`, borderLeft:`3px solid ${C.cyan}`, padding:"18px 20px", animation:"fadeUp .5s ease .2s both" }}>
            <Para text={`
              Bir profiliniz veya attığınız bir gönderi;
              <span style="color:#00D9FF">Dictionary (Sözlük)</span> ya da
              <span style="color:#F59E0B">Hash Map</span> dediğimiz veri yapıları içinde,
              esnek bir <span style="color:#10B981">JSON dökümanı</span> olarak tutulur.
              Yaşınız bir <span style="color:#F59E0B">sayı</span>, adınız bir
              <span style="color:#10B981">metin</span>, sevdiğiniz renkler ise bir
              <span style="color:#00D9FF">liste</span> olarak o dosyaya işlenir.
            `} />
          </div>

          <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.purple}`, border:`1px solid ${C.purple}22`, borderLeft:`3px solid ${C.purple}`, padding:"18px 20px", animation:"fadeUp .5s ease .3s both" }}>
            <Para text={`
              Üstelik milyonlarca gönderi arasından sizin o tek bir yorumunuzu bulmak için
              sistem her şeye sırayla bakmaz. İşin içine
              <span style="color:#7C3AED">B-Tree (B-Ağacı)</span> algoritmaları ve
              <span style="color:#7C3AED">indeksleme</span> girer. Bu sayede okyanustaki o tek damla,
              <span style="color:#10B981">milisaniyeler içinde</span> 'pat' diye ekranınıza gelir.
              Tıpkı bir kütüphanedeki katalog gibi; binlerce kitap arasından
              doğrudan doğru rafa yönlenirsiniz.
            `} />
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <ExampleBox title="Bir kullanıcı profili nasıl görünür?" color={C.green} delay={0.15}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12.5, lineHeight:2 }}>
              <div><span style={{color:"#5C6370"}}>{"{"}</span></div>
              {[
                ['"isim"','"Ahmet Yılmaz"'],
                ['"yaş"','17'],
                ['"şehir"','"İstanbul"'],
                ['"premium"','false'],
              ].map(([k,v],i) => (
                <div key={i} style={{ paddingLeft:16 }}>
                  <span style={{color:"#98C379"}}>{k}</span>
                  <span style={{color:C.dark}}>: </span>
                  <span style={{color: v==='false'||v==='17' ? "#D19A66" : "#98C379"}}>{v}</span>
                  <span style={{color:C.dark}}>,</span>
                </div>
              ))}
              <div style={{ paddingLeft:16 }}>
                <span style={{color:"#98C379"}}>"renkler"</span>
                <span style={{color:C.dark}}>: </span>
                <span style={{color:"#5C6370"}}>["</span>
                <span style={{color:"#98C379"}}>mavi</span>
                <span style={{color:"#5C6370"}}>"</span>
                <span style={{color:C.dark}}>, </span>
                <span style={{color:"#5C6370"}}>"</span>
                <span style={{color:"#98C379"}}>siyah</span>
                <span style={{color:"#5C6370"}}>"]</span>
              </div>
              <div><span style={{color:"#5C6370"}}>{"}"}</span></div>
            </div>
          </ExampleBox>

          <div style={{ background:C.bgCard2, borderRadius:10, padding:"14px 18px", animation:"fadeUp .5s ease .3s both" }}>
            <div className="syne" style={{ color:C.gray, fontSize:11, letterSpacing:3, marginBottom:10 }}>VERİ TİPLERİ</div>
            {types.map((t, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, animation:`fadeUp .3s ease ${.35+i*.07}s both` }}>
                <span className="mono" style={{
                  background:`${t.color}20`, color:t.color,
                  border:`1px solid ${t.color}44`, borderRadius:5,
                  padding:"2px 8px", fontSize:10.5, whiteSpace:"nowrap", flexShrink:0, minWidth:160,
                }}>{t.type}</span>
                <span className="mono" style={{ color:C.white, fontSize:11.5 }}>{t.val}</span>
                <span className="dm" style={{ color:C.gray, fontSize:11 }}>({t.ex})</span>
              </div>
            ))}
          </div>

          <div style={{ background:"#0A1527", borderRadius:10, padding:"12px 16px", border:`1px solid ${C.purple}33`, animation:"fadeUp .5s ease .5s both" }}>
            <div className="syne" style={{ color:C.purple, fontSize:13, fontWeight:700, marginBottom:6 }}>🌳 B-Tree neden önemli?</div>
            <p className="dm" style={{ color:C.gray, fontSize:13, lineHeight:1.75 }}>
              1 milyar kayıt arasında sırayla aramak: <span style={{color:C.red}}>1.000.000.000 adım</span>.
              B-Tree indeksiyle: <span style={{color:C.green}}>yalnızca ~30 adım</span>.
              Bu fark, akışın hiç takılmadan size ulaşmasını sağlar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ SLAYT 5 — BUCKET ═══════════════════ */
function Slide5() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(p => p < 2 ? p + 1 : 0), 1800);
    return () => clearInterval(t);
  }, []);

  const flow = [
    { icon:"📸", title:"Fotoğraf Paylaşırsınız",   sub:"4.2 MB ağır dosya",      color:C.cyan   },
    { icon:"🪣", title:"Ayrı Sunucuya Yüklenir",   sub:"Bucket / CDN depolama",  color:C.orange },
    { icon:"🗄",  title:"Sadece Adres Kaydedilir",  sub:"Kısa bir URL linki",     color:C.green  },
  ];

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>
      <GlowOrb x="50%" y="-10%" color={C.orange} size={360} opacity={0.1} />
      <SlideHeader num={4} label="Depolama Mimarisi" color={C.orange} />

      <h2 className="syne" style={{ fontSize:34, fontWeight:800, color:C.white, marginBottom:16, animation:"fadeUp .5s ease both" }}>
        Performans Odaklı Depolama: <span style={{ color:C.orange }}>Bucket Sistemi</span>
      </h2>

      <div style={{ display:"flex", alignItems:"stretch", gap:0, marginBottom:22, animation:"fadeUp .5s ease .1s both" }}>
        {flow.map((f, i) => (
          <>
            <div key={i} style={{
              flex:1, background: step >= i ? `${f.color}14` : C.bgCard,
              border:`1px solid ${step >= i ? f.color : C.dark}`,
              borderRadius:10, padding:"16px 14px", textAlign:"center",
              transition:"all .5s", boxShadow: step >= i ? `0 0 20px ${f.color}33` : "none",
            }}>
              <div style={{ fontSize:30, marginBottom:8 }}>{f.icon}</div>
              <div className="syne" style={{ color: step >= i ? f.color : C.gray, fontSize:13, fontWeight:700, marginBottom:5, lineHeight:1.4 }}>{f.title}</div>
              <div className="dm" style={{ fontSize:11.5, color:C.gray, lineHeight:1.5 }}>{f.sub}</div>
            </div>
            {i < 2 && (
              <div key={`a${i}`} style={{ padding:"0 10px", fontSize:22, color: step > i ? C.orange : C.dark, transition:"color .5s", display:"flex", alignItems:"center" }}>→</div>
            )}
          </>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, flex:1 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.orange}`, border:`1px solid ${C.orange}22`, borderLeft:`3px solid ${C.orange}`, padding:"18px 20px", animation:"fadeUp .5s ease .2s both" }}>
            <Para text={`
              Tabii her şey sadece metin değil. Havalı bir fotoğraf paylaştığınızda,
              sistem bu ağır dosyayı doğrudan veritabanına <span style="color:#EF4444">tıkıştırmaz</span>.
              Şirketler <span style="color:#F59E0B">Performance-First (Performans Odaklı)</span>
              düşünmek zorundadır. Performans demek; sizin uygulamayı açtığınızda
              bekleme ekranı görmemek demektir.
            `} />
          </div>

          <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.cyan}`, border:`1px solid ${C.cyan}22`, borderLeft:`3px solid ${C.cyan}`, padding:"18px 20px", animation:"fadeUp .5s ease .3s both" }}>
            <Para text={`
              Görselleriniz <span style="color:#00D9FF">Bucket (Kova)</span> mantığıyla çalışan
              harici dosya sunucularına atılır. Veritabanında ise sadece o fotoğrafın güvenli,
              kısacık bir <span style="color:#10B981">URL linki</span> tutulur.
              Yani asıl yük dışarıda kalır, sistem <span style="color:#10B981">fişek gibi</span> çalışmaya devam eder.
              Bunu şöyle düşünün: kütüphane kartoteğine kitabın kendisini değil,
              rafın adresini yazarsınız.
            `} />
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <ExampleBox title="Veritabanında ne saklanır?" color={C.orange} delay={0.25}>
            <div className="dm" style={{ color:C.gray, fontSize:12.5, marginBottom:10, lineHeight:1.7 }}>
              ❌ Ağır fotoğraf doğrudan kaydedilseydi → <span style={{color:C.red}}>veritabanı yavaşlar, uygulama kasılır</span>
            </div>
            <div className="dm" style={{ color:C.gray, fontSize:12.5, marginBottom:12, lineHeight:1.7 }}>
              ✅ Sadece kısa adres saklanır → <span style={{color:C.green}}>sistem fişek gibi çalışır</span>
            </div>
            <div className="mono" style={{ background:"#0A0E14", borderRadius:7, padding:"10px 12px", fontSize:11.5, color:C.green, lineHeight:1.8 }}>
              <span style={{color:C.gray}}>"photo_url": </span>
              <span style={{color:"#98C379"}}>"cdn.example.com/ahmet.jpg"</span>
            </div>
          </ExampleBox>

          <InfoCard
            icon="🌐"
            title="CDN ile Küresel Dağıtım"
            body={`Yüklediğiniz fotoğraf otomatik olarak
              <span style="color:#00D9FF">İstanbul, Londra, Tokyo</span> gibi
              dünyanın farklı noktalarındaki sunuculara kopyalanır.
              Sizi ziyaret eden kişi her zaman <span style="color:#10B981">en yakın sunucudan</span> görüntüyü alır.
              Bu sayede internet hızından bağımsız olarak içerikler hızla yüklenir.`}
            color={C.cyan}
            delay={0.45}
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ SLAYT 6 — GÜVENLİK ═══════════════════ */
function Slide6() {
  const [hashed, setHashed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHashed(true), 900); return () => clearTimeout(t); }, []);

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>
      <GlowOrb x="65%" y="5%" color={C.purple} size={360} opacity={0.12} />
      <SlideHeader num={5} label="Zaman & Şifreleme" color={C.purple} />

      <h2 className="syne" style={{ fontSize:34, fontWeight:800, color:C.white, marginBottom:16, animation:"fadeUp .5s ease both" }}>
        Timestamp & <span style={{ color:C.purple }}>Kriptografik Şifreleme</span>
      </h2>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, flex:1 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.orange}`, border:`1px solid ${C.orange}22`, borderLeft:`3px solid ${C.orange}`, padding:"18px 20px", animation:"fadeUp .5s ease .1s both" }}>
            <Para text={`
              Uygulamayı açtığınızda neden hep en yeni gönderiler en üstte çıkar?
              Veritabanındaki her kaydın içinde görünmez bir
              <span style="color:#F59E0B">Timestamp (Zaman Damgası)</span> vardır.
              Bu damga, her gönderinin tam olarak ne zaman oluşturulduğunu kaydeder
              ve algoritmalar sürekli günceli en üste çeken bir sıralama koşturur.
              Tıpkı gazetelerin en taze haberi birinci sayfaya taşıması gibi.
            `} />
          </div>

          <ExampleBox title="Timestamp nasıl çalışır?" color={C.orange} delay={0.2}>
            <div className="dm" style={{ color:C.gray, fontSize:12, marginBottom:10, lineHeight:1.6 }}>
              01.01.1970'den bu yana geçen saniye sayısı kullanılır. Büyük sayı = daha yeni gönderi.
            </div>
            {[
              { ts:"1704153600", date:"02.01.2024 — 10:00", top:true  },
              { ts:"1704110400", date:"01.01.2024 — 22:00", top:false },
              { ts:"1704067200", date:"01.01.2024 — 10:00", top:false },
            ].map((r, i) => (
              <div key={i} style={{
                background: r.top ? "#1F2D1F" : "#0D1117",
                border:`1px solid ${r.top ? C.green : C.dark}`,
                borderRadius:6, padding:"7px 10px", marginBottom:5,
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <span className="mono" style={{ fontSize:10, color: r.top ? C.green : C.gray }}>{r.top && "🔝 "}{r.ts}</span>
                <span className="dm" style={{ fontSize:11, color: r.top ? C.green : C.gray }}>{r.date}</span>
                {r.top && <Badge color={C.green}>EN YENİ</Badge>}
              </div>
            ))}
          </ExampleBox>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:C.bgCard, borderRadius:10, borderLeft:`3px solid ${C.purple}`, border:`1px solid ${C.purple}22`, borderLeft:`3px solid ${C.purple}`, padding:"18px 20px", animation:"fadeUp .5s ease .2s both" }}>
            <Para text={`
              Ama işin en hayati kısmı <span style="color:#7C3AED">şifrelerinizdir</span>.
              Şifreleriniz sistemlere asla '123456' gibi açık metin olarak kaydedilmez.
              <span style="color:#7C3AED">Cryptographic Hashing (Kriptografik Şifreleme)</span>
              algoritmalarından — örneğin <span style="color:#00D9FF">SHA-256</span> — geçirilerek,
              <span style="color:#EF4444">geri döndürülemez</span> karmaşık bir koda dönüştürülür.
              Bu, dijital ayak izinizin en mahrem, en korunması gereken halidir.
            `} />
          </div>

          <ExampleBox title="SHA-256 şifreleme nasıl çalışır?" color={C.purple} delay={0.3}>
            <div className="dm" style={{ color:C.gray, fontSize:12.5, marginBottom:12, lineHeight:1.7 }}>
              Şifreniz hiçbir zaman orijinal haliyle saklanmaz. Tek yönlü bir dönüşüm uygulanır:
            </div>
            {[
              { label:"Siz girersiniz",   val:'"123456"',           color:C.cyan,   icon:"📥" },
              { label:"Algoritma işler",  val:"SHA-256 ⚙",          color:C.orange, icon:"⚙" },
              { label:"Sistem kaydeder", val:"8d969eef6ecad3c2...", color: hashed ? C.green : C.gray, icon:"🔑" },
            ].map((r, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, animation:`fadeUp .4s ease ${.3+i*.2}s both` }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{r.icon}</span>
                <div style={{ flex:1 }}>
                  <div className="dm" style={{ fontSize:11, color:C.gray, marginBottom:3 }}>{r.label}</div>
                  <div className="mono" style={{ background:"#0A0E14", borderRadius:5, padding:"6px 10px", fontSize:11.5, color:r.color, border:`1px solid ${r.color}33`, transition:"all .5s" }}>{r.val}</div>
                </div>
              </div>
            ))}
            <div style={{ background:`${C.purple}15`, borderRadius:8, padding:"10px 12px", border:`1px solid ${C.purple}44`, marginTop:4 }}>
              <p className="dm" style={{ color:C.gray, fontSize:12.5, lineHeight:1.7 }}>
                ⚠ <span style={{ color:C.red, fontWeight:600 }}>Geri döndürülemez!</span>{" "}
                Şirket çalışanları bile şifrenizi göremez.
                Sisteme girişinizde şifreniz yeniden hash'lenir ve eşleşip eşleşmediği kontrol edilir.
              </p>
            </div>
          </ExampleBox>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ SLAYT 7 — KAPANIS ═══════════════════ */
function Slide7() {
  const summaries = [
    { icon:"🛡", title:"Sentinel Scan",   sub:"Regex + Array filtreleri",  color:C.red    },
    { icon:"📦", title:"JSON Döküman",    sub:"Dictionary + Hash Map",     color:C.green  },
    { icon:"🪣", title:"Bucket Depolama", sub:"URL + CDN performansı",     color:C.orange },
    { icon:"⏱", title:"Timestamp",       sub:"Unix zaman damgası",        color:C.cyan   },
    { icon:"🔐", title:"SHA-256 Hash",    sub:"Geri döndürülemez şifre",   color:C.purple },
  ];

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative" }}>
      <MatrixRain />
      <GlowOrb x="-5%" y="20%" color={C.purple} size={420} opacity={0.14} />
      <GlowOrb x="62%" y="-8%" color={C.cyan} size={320} opacity={0.10} />

      <div style={{ position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap", animation:"fadeUp .5s ease both" }}>
          {summaries.map((s, i) => (
            <div key={i} className="card-hover" style={{
              flex:"1 1 120px", background:C.bgCard,
              border:`1px solid ${s.color}44`, borderTop:`3px solid ${s.color}`,
              borderRadius:10, padding:"14px 12px", textAlign:"center",
              animation:`fadeUp .4s ease ${i*.09}s both`,
            }}>
              <div style={{ fontSize:26, marginBottom:6 }}>{s.icon}</div>
              <div className="syne" style={{ color:s.color, fontSize:12, fontWeight:700, marginBottom:4 }}>{s.title}</div>
              <div className="dm" style={{ fontSize:11, color:C.gray, lineHeight:1.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center", marginBottom:20, animation:"fadeUp .5s ease .3s both" }}>
          <h1 className="syne" style={{
            fontSize:52, fontWeight:800,
            background:`linear-gradient(135deg, ${C.white} 0%, ${C.cyan} 45%, ${C.purple} 100%)`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text", lineHeight:1.15, marginBottom:10,
          }}>İnternet Asla Unutmaz.</h1>
          <div style={{ height:3, width:280, margin:"0 auto", background:`linear-gradient(to right,${C.purple},${C.cyan})`, borderRadius:2 }} />
        </div>

        <div style={{ background:C.bgCard, borderRadius:12, padding:"20px 26px", borderLeft:`4px solid ${C.cyan}`, border:`1px solid ${C.cyan}22`, borderLeft:`4px solid ${C.cyan}`, marginBottom:16, animation:"fadeUp .5s ease .4s both" }}>
          <Para text={`
            Bütün bu algoritmalar, esnek veri yapıları ve bulut sunucular tek bir şey için çalışıyor:
            <span style="color:#00D9FF">Sizi sizden daha iyi tanımak.</span>
            Teknoloji dünyasının o meşhur altın kuralını asla unutmayın:
            <span style="color:#F59E0B">Eğer bir ürün ücretsizse, ürün sizsinizdir.</span>
            Bugün o ekranda kaydırdığınız, sildiğinizi sandığınız her şey;
            dünyanın bir ucundaki bir sunucuda, bir veri yapısının içinde
            <span style="color:#7C3AED">şifrelenmiş</span> olarak duruyor.
          `} color={C.gray} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16, animation:"fadeUp .5s ease .5s both" }}>
          {[
            { icon:"🏖",  title:"Sahilde Yürüyüş",    desc:"Ayak izleri rüzgar ve dalgalar tarafından silinir. Geriye hiçbir şey kalmaz.", color:C.green },
            { icon:"💻",  title:"İnternette Yürüyüş", desc:"Dijital izler sunucularda sonsuza dek saklanır. Sildiğinizi sandıklarınız bile.", color:C.red },
          ].map((c, i) => (
            <div key={i} style={{
              background:C.bgCard2, borderRadius:10, padding:"16px 18px",
              border:`1px solid ${c.color}33`,
              display:"flex", gap:14, alignItems:"flex-start",
            }}>
              <span style={{ fontSize:30, flexShrink:0 }}>{c.icon}</span>
              <div>
                <div className="syne" style={{ color:c.color, fontSize:14, fontWeight:700, marginBottom:5 }}>{c.title}</div>
                <div className="dm" style={{ color:C.gray, fontSize:13, lineHeight:1.7 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center", background:"linear-gradient(135deg,#0D1117,#1C1A2E)", borderRadius:12, padding:"16px 22px", border:`1px solid ${C.purple}33`, animation:"fadeUp .5s ease .65s both" }}>
          <div className="syne" style={{ color:C.white, fontSize:20, fontWeight:700, marginBottom:4 }}>Dinlediğiniz için teşekkürler! 🙏</div>
          <div className="dm" style={{ color:C.gray, fontSize:13 }}>Sorularınız var mı? • Dijital Ayak İzi • Veri Yapıları • Kriptografi</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ ANA UYGULAMA ═══════════════════ */
const slides = [
  { component: Slide1, title: "Kapak"         },
  { component: Slide2, title: "Giriş"         },
  { component: Slide3, title: "Filtreler"     },
  { component: Slide4, title: "Veri Yapıları" },
  { component: Slide5, title: "Depolama"      },
  { component: Slide6, title: "Güvenlik"      },
  { component: Slide7, title: "Kapanış"       },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = (i) => { if (i === current) return; setCurrent(i); setAnimKey(k => k + 1); };
  const prev = () => { if (current > 0) goTo(current - 1); };
  const next = () => { if (current < slides.length - 1) goTo(current + 1); };

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [current]);

  const Comp = slides[current].component;

  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column", fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ background:"#08090D", borderBottom:`1px solid ${C.dark}`, padding:"10px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:30, height:30, borderRadius:7, background:`linear-gradient(135deg,${C.cyan},${C.purple})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>🔍</div>
          <span className="syne" style={{ color:C.white, fontSize:13, fontWeight:700 }}>Dijital İzlerimiz</span>
          <span className="mono" style={{ background:`${C.cyan}20`, color:C.cyan, border:`1px solid ${C.cyan}44`, borderRadius:5, padding:"2px 9px", fontSize:11 }}>{slides[current].title}</span>
        </div>
        <NavDots total={slides.length} current={current} onChange={goTo} />
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <span className="mono" style={{ color:C.gray, fontSize:11 }}>{String(current+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span>
          <button onClick={prev} disabled={current===0} style={{ background:C.bgCard, border:`1px solid ${C.dark}`, color:C.gray, borderRadius:6, padding:"5px 11px", cursor:current===0?"not-allowed":"pointer", fontSize:13, opacity:current===0?.35:1, transition:"opacity .2s" }}>←</button>
          <button onClick={next} disabled={current===slides.length-1} style={{ background:C.cyan, border:"none", color:C.bg, borderRadius:6, padding:"5px 11px", cursor:current===slides.length-1?"not-allowed":"pointer", fontSize:13, fontWeight:700, opacity:current===slides.length-1?.35:1, transition:"opacity .2s" }}>→</button>
        </div>
      </div>

      <div style={{ height:2, background:C.dark, flexShrink:0 }}>
        <div style={{ height:"100%", background:`linear-gradient(to right,${C.cyan},${C.purple})`, width:`${((current+1)/slides.length)*100}%`, transition:"width .4s ease" }} />
      </div>

      <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
        <div key={animKey} className="slide-enter" style={{ height:"100%", padding:"28px 40px 22px", overflowY:"auto", position:"relative" }}>
          <Comp />
        </div>
      </div>

      <div style={{ background:"#08090D", borderTop:`1px solid ${C.dark}`, padding:"8px 22px", display:"flex", gap:4, alignItems:"center", flexShrink:0 }}>
        {slides.map((sl, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            background: i===current ? `${C.cyan}18` : "transparent",
            border:`1px solid ${i===current ? C.cyan : "transparent"}`,
            color: i===current ? C.cyan : C.gray,
            borderRadius:5, padding:"4px 11px", cursor:"pointer",
            fontSize:11.5, fontFamily:"'DM Sans',sans-serif", transition:"all .2s",
          }}>{String(i+1).padStart(2,"0")} {sl.title}</button>
        ))}
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:7 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:C.green, animation:"pulse 2s ease infinite" }} />
          <span className="mono" style={{ fontSize:9, color:C.green, letterSpacing:1 }}>← → ile geçiş yapın</span>
        </div>
      </div>
    </div>
  );
}