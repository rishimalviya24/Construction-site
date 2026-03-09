import React from 'react';

const CtaSection = () => {
  return (
    <section className="relative bg-[#bd5e3b] py-32 px-6 md:px-12 lg:px-20 font-sans overflow-hidden">
      
      {/* Wood Grain Texture (Subtle Waves) */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-multiply">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="woodgrain" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q25 20 50 10 T100 10" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M0 30 Q25 40 50 30 T100 30" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M0 50 Q25 40 50 50 T100 50" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M0 70 Q25 80 50 70 T100 70" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M0 90 Q25 80 50 90 T100 90" fill="none" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#woodgrain)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Headline */}
        <h2 className="text-white text-5xl md:text-[64px] font-[900] uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-sm">
          Bereit für den <br />
          Durchbruch?
        </h2>
        
        {/* Subtext */}
        <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
          Kein Job zu dreckig, keine Wand zu dick. Foto via WhatsApp genügt für eine erste Einschätzung.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:+41790000000" className="bg-white text-[#1a1a1a] px-12 py-4 rounded-full font-bold text-[15px] hover:bg-[#f6f4f0] hover:scale-105 transition-all shadow-xl uppercase tracking-wide flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            079 000 00 00
          </a>
          <button className="bg-[#f6f4f0] text-[#1a1a1a] px-12 py-4 rounded-full font-bold text-[15px] hover:bg-white hover:scale-105 transition-all shadow-xl uppercase tracking-wide flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
};

export default CtaSection;
