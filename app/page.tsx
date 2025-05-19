'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
const toggleInfo = () => setShowInfo(!showInfo);
  const [secret, setSecret] = useState('');
  const router = useRouter();

  const images = useQuery(api.lucas.getImages);

  const handleClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 3) {
      setShowLogin(true);
    }
    setClickCount(newCount);
  };

  const handleLogin = () => {
    if (secret === 'Lestelledilucanel2025') {
      router.push('/admin');
    } else {
      alert('Wrong code!');
    }
  };



  return (
    <div className="bg-[#02142b] text-white scroll-smooth">
    {/* INFO TEXT FIXED IN TOP-LEFT */}
    <div onClick={toggleInfo} className="infotext">
      info
    </div>


    {/* HERO SECTION */}
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
    {showInfo && (
  <div className="info-popup">
    <div className="info-content">
      <button className="close-button" onClick={toggleInfo}>×</button>
      <h2>About Luca</h2>
      <p>
        Luca is capturing the beauty of the night sky —
        from galaxies and nebulae to constellations. This gallery celebrates his love for space.
      </p>
    </div>
  </div>
)}

  {/* Triple-click hidden admin trigger */}
  <img
    src="/star.png"
    alt="Star logo"
    id="star-logo"
    onClick={handleClick}
    className="w-12 h-12 mb-4 object-contain select-none"
  />


<h1 className="text-4xl font-mono text-[#f5f5dc] text-center">luca’s stars</h1>
<a
  href="#gallery"
  className="mt-10 text-xl text-[#f5f5dc] text-center float-up-down"
>
  ↓ Scroll to Gallery ↓
</a>


 {/* Secret login box (only after triple-click) */}
 {showLogin && (
    <div className="absolute bottom-10 bg-white text-black px-4 py-3 rounded shadow">
      <input
        type="password"
        placeholder="Enter secret code"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        className="border px-2 py-1 rounded mr-2"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-700 text-white px-4 py-1 rounded"
      >
        Enter
      </button>
    </div>
  )}
</section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="min-h-screen px-4 sm:px-6 md:px-10 py-12">
  <h2 className="text-2xl font-semibold mb-6 text-center text-[#f5f5dc]"></h2>

  <div className="gallery-container">
    {images?.map((img) => (
      <div key={img._id} className="gallery-item">
        <img
          src={img.imageUrl}
          alt={img.title}
          className="gallery-img"
        />
        <h3 className="gallery-title">{img.title}</h3>
        {img.description && (
          <p className="gallery-desc">{img.description}</p>
        )}
      </div>
    ))}
  </div>
</section>
    </div>
  );
}
