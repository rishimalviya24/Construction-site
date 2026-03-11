import React from 'react';
import { Zap, Truck, Recycle, Hammer } from 'lucide-react';

const HeroSection = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="relative min-h-screen font-sans selection:bg-[#c1694f] selection:text-white">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/img1.avif" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <div className="flex-shrink-0">
          <div className="flex flex-col items-center">
             {/* <img src="/logo.png" alt="Elite Contractors LLC" className="h-20 w-auto" /> */}
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-10">
          <a href="#" className="text-white font-bold text-[15px]">Home</a>
          <a href="#" className="text-gray-200 hover:text-white font-semibold text-[15px] transition-colors">Über Uns</a>
          <div className="flex items-center gap-1 text-gray-200 hover:text-white font-semibold text-[15px] cursor-pointer group">
            <span>Leistungen</span>
            <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <a href="#" className="text-gray-200 hover:text-white font-semibold text-[15px]">Galerie</a>
          <a href="#" className="text-gray-200 hover:text-white font-semibold text-[15px]">Kontakt</a>
        </div>

        <div className="flex items-center gap-4">
            <a href="tel:+41790000000" className="hidden sm:block bg-[#bd5e3b] text-white px-7 py-3 rounded-full font-bold text-[14px] hover:bg-[#a64d2e] transition-all shadow-sm">
            +41 79 000 00 00
            </a>
            
            {/* Mobile Menu Button */}
            <button 
                className="lg:hidden text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>
      </nav>

      {/* Hero Content Section */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 px-6 md:px-12 lg:px-20 pt-10 pb-20 items-center min-h-[calc(100vh-120px)]">
        
        {/* Left Content (Text) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Subheading with badges */}
          <div className="mb-8 flex flex-wrap gap-4">
            <span className="inline-block bg-yellow-500 text-black px-3 py-1 font-black uppercase text-[10px] tracking-widest shadow-sm">
              Schweizweiter Service
            </span>
            <span className="inline-block bg-slate-900 text-white px-3 py-1 font-black uppercase text-[10px] tracking-widest">
              Direkt &amp; Effizient
            </span>
          </div>
          
          <h1 className="text-white text-6xl md:text-7xl lg:text-[88px] font-[900] leading-[0.85] uppercase tracking-tighter mb-10">
            Wir räumen <br /> 
            <span className="block mt-2">den Platz.</span>
          </h1>
          
          <p className="text-gray-200 text-lg md:text-xl font-medium leading-[1.6] max-w-lg mb-10">
            Vom Badezimmer bis zur Industriehalle: Wir reissen ab, trennen sauber und hinterlassen alles besenrein. 
            <span className="block mt-4 font-black italic">
              Kein Job zu dreckig, keine Wand zu dick. Wir erledigen das.
            </span>
          </p>

          {/* Dual Buttons */}
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/41790000000" target="_blank" rel="noopener noreferrer" className="bg-[#bd5e3b] text-white px-9 py-4 rounded-full font-bold text-[14px] uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              WhatsApp Offerte
            </a>
            <button className="bg-transparent border-2 border-white text-white px-9 py-4 rounded-full font-bold text-[14px] uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Termin buchen
            </button>
          </div>

          {/* Highlights row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {[
              { icon: <Zap className="text-yellow-600" size={20} />, text: 'Schnelle Abwicklung' },
              { icon: <Truck className="text-yellow-600" size={20} />, text: 'Eigener Maschinenpark' },
              { icon: <Recycle className="text-yellow-600" size={20} />, text: 'Fachgerechtes Recycling' },
              { icon: <Hammer className="text-yellow-600" size={20} />, text: 'Profi-Equipment' }
            ].map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <span className="text-yellow-600">{h.icon}</span>
                {h.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Content (Review Only) */}
        <div className="lg:col-span-5 relative mt-16 lg:mt-0 flex items-center justify-center lg:justify-end">
            <div className="bg-white p-8 shadow-2xl max-w-[340px] rounded-sm border-t-4 border-[#bd5e3b]">
              <div className="flex gap-1 text-[#f39c12] mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-[#444] text-[15px] font-semibold leading-relaxed mb-6">
                "Besenrein und pünktlich! Das Team arbeitet effizient, respektvoll und verlässt die Baustelle in bestem Zustand. Sehr zu empfehlen!"
              </p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="font-extrabold text-[14px] text-gray-900">Stefan Müller</span>
                <div className="flex gap-2">
                  <div className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-[#bd5e3b] cursor-pointer hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                  </div>
                  <div className="w-9 h-9 bg-[#bd5e3b] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#a64d2e] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;