import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-[#1a1a1a] text-white pt-16 pb-8 px-6 md:px-12 lg:px-20 font-sans overflow-hidden border-t border-[#333]">
      
      {/* Background Watermark (Subtle & Static) */}
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[600px] pointer-events-none opacity-[0.02]">
         <svg viewBox="0 0 100 100" fill="currentColor">
             <path d="M50 0 L55 10 L65 8 L68 18 L78 15 L82 25 L92 22 L95 32 L100 35 L95 45 L100 50 L95 55 L100 65 L90 68 L88 78 L78 75 L75 85 L65 82 L60 92 L50 100 L45 90 L35 92 L32 82 L22 85 L18 75 L8 78 L5 68 L0 65 L5 55 L0 50 L5 45 L0 35 L10 32 L12 22 L22 25 L25 15 L35 18 L40 8 L50 0 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Top Section: Logo & Description */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-12 border-b border-[#333] pb-12 text-center lg:text-left">
          <div className="flex-shrink-0 bg-white/5 p-4 rounded-lg">
             {/* Fallback if logo is missing, or use text */}
             <div className="text-xl font-black italic text-white">Rückbau<span className="text-[#bd5e3b]">Pro</span></div>
          </div>
          <div className="max-w-2xl">
            <h4 className="text-[#bd5e3b] font-bold text-sm uppercase tracking-widest mb-4">RückbauPro</h4>
            <p className="text-[#a0a0a0] leading-relaxed text-[15px] md:text-base">
              Mit 15+ Jahren Erfahrung im Rückbau, Entkernung und Recycling sind wir Ihr zuverlässiger Partner für saubere Demontage und professionelle Entsorgung in der Schweiz. Wir arbeiten mit Integrität und Präzision.
            </p>
          </div>
        </div>

        {/* Middle Section: Services Links */}
        <div className="py-10 border-b border-[#333]">
          <div className="flex flex-wrap justify-center lg:justify-between gap-x-8 gap-y-4 px-4">
            {['Rückbau', 'Entkernung', 'Recycling', 'Sanierung', 'Entsorgung'].map((item) => (
              <a key={item} href="#" className="group flex items-center gap-2 text-[#e5e5e5] text-lg md:text-xl font-bold hover:text-[#bd5e3b] transition-all duration-300">
                <span className="w-1.5 h-1.5 bg-[#bd5e3b] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section: Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-[#333]">
          
          {/* Navigation */}
          <div className="text-center sm:text-left">
            <h5 className="text-[#bd5e3b] font-bold text-xs uppercase tracking-widest mb-6">Explore</h5>
            <ul className="space-y-3">
              {['Home', 'Über Uns', 'Projekte', 'Kontakt'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#ccc] text-sm font-medium hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div className="text-center sm:text-left">
             <h5 className="text-[#bd5e3b] font-bold text-xs uppercase tracking-widest mb-6">Besuche Uns</h5>
             <p className="text-[#ccc] text-sm leading-relaxed mb-4">
               Zürich | Aargau | Zug<br />
               Schweiz
             </p>
             <a href="#" className="text-white text-xs font-bold uppercase tracking-wide border-b border-[#bd5e3b] pb-0.5 hover:text-[#bd5e3b] transition-colors">
               Route abrufen
             </a>
          </div>

          {/* Contact Details */}
          <div className="sm:col-span-2 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-[#222] p-6 rounded-sm border border-[#333] hover:border-[#bd5e3b]/50 transition-colors group">
                <h5 className="text-[#666] font-bold text-xs uppercase tracking-widest mb-2 group-hover:text-[#bd5e3b] transition-colors">Anrufen</h5>
                <a href="tel:+41790000000" className="text-white text-xl font-bold hover:text-[#bd5e3b] transition-colors block">
                  +41 79 000 00 00
                </a>
                <p className="text-[#555] text-xs mt-2">Mo-Fr: 8am - 18pm</p>
             </div>
             
             <div className="bg-[#222] p-6 rounded-sm border border-[#333] hover:border-[#bd5e3b]/50 transition-colors group">
                <h5 className="text-[#666] font-bold text-xs uppercase tracking-widest mb-2 group-hover:text-[#bd5e3b] transition-colors">Email</h5>
                <a href="mailto:info@rueckbaupro.ch" className="text-white text-lg font-bold hover:text-[#bd5e3b] transition-colors block truncate">
                  info@rueckbaupro.ch
                </a>
                <p className="text-[#555] text-xs mt-2">Online Support 24/7</p>
             </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[#555] text-[11px] font-medium uppercase tracking-wider">
          <p>© 2025 RückbauPro. Alle Rechte vorbehalten.</p>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#888] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#888] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#888] transition-colors">Cookies</a>
          </div>

          <div className="flex items-center gap-4">
             {/* Social Icons moved here for cleaner layout */}
             <a href="#" className="text-[#888] hover:text-[#bd5e3b] transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg></a>
             <a href="#" className="text-[#888] hover:text-[#bd5e3b] transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 10-8 8 8 8 0 008-8z"></path></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
