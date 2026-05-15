import React from 'react';

export default function Feed() {
  const imageUrl = "https://i.hizliresim.com/2ydo4v5.jpg";
  const videoUrl = "https://firebasestorage.googleapis.com/v0/b/sigalmedia.firebasestorage.app/o/lv_0_20260514201923.mp4?alt=media&token=fee817ab-673e-4ce6-b7bf-54c9481d72fe";

  const cssStyles = `
    body {
        background-color: #ffffff;
        color: #000000;
        font-family: monospace; /* Biraz daha kaba ve sade dursun diye */
        margin: 0;
        padding: 20px;
    }
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
    .header {
        text-align: center;
        margin-bottom: 40px;
    }
    h1 {
        text-transform: uppercase;
        border-bottom: 3px solid #000;
        padding-bottom: 10px;
        margin-bottom: 5px;
    }
    .section {
        border: 2px solid #000;
        padding: 20px;
        margin-bottom: 30px;
        background-color: #fff;
    }
    .section h2 {
        margin-top: 0;
        border-bottom: 1px solid #000;
        padding-bottom: 5px;
    }
    img, video {
        width: 100%;
        height: auto;
        border: 2px solid #000;
        display: block;
    }
    footer {
        text-align: center;
        border-top: 2px solid #000;
        padding-top: 20px;
        margin-top: 40px;
        font-weight: bold;
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <div className="container">
        
        <div className="header">
          <h1>İHA Proje Vitrini</h1>
          <p>Mustafa - Tasarım & Mühendislik</p>
        </div>

        <div className="section">
          <h2>Proje Görseli</h2>
          <img src={imageUrl} alt="İHA Proje" />
        </div>

        <div className="section">
          <h2>Uçuş Videosu</h2>
          <video controls preload="metadata">
            <source src={videoUrl} type="video/mp4" />
            Tarayıcınız video oynatmayı desteklemiyor.
          </video>
        </div>

        <footer>
          <p>© 2026 Mustafa</p>
        </footer>

      </div>
    </>
  );
}