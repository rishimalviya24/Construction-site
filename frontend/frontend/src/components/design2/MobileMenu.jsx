import React, { useEffect } from 'react';

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  if (!isMenuOpen) return null;

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Über Uns', href: '#about' },
    { label: 'Leistungen', href: '#services' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'Kontakt', href: '#contact' }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#1a1a1a] text-white flex flex-col animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#333]">
        <span className="text-[#bd5e3b] font-bold text-sm uppercase tracking-wide">Menü</span>
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="text-white hover:text-[#bd5e3b] transition-colors p-2"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col justify-center items-center gap-8 p-6">
        {links.map((link, index) => (
          <a 
            key={index} 
            href={link.href} 
            className="text-3xl md:text-5xl font-bold uppercase tracking-tighter hover:text-[#bd5e3b] transition-all transform hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-8 border-t border-[#333] grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
        <div>
           <h5 className="text-[#bd5e3b] font-bold text-xs uppercase tracking-widest mb-4">Kontakt</h5>
           <a href="tel:+41790000000" className="block text-xl font-bold mb-2 hover:text-[#bd5e3b] transition-colors">+41 79 000 00 00</a>
           <a href="mailto:info@rueckbaupro.ch" className="block text-[#ccc] hover:text-white transition-colors">info@rueckbaupro.ch</a>
        </div>
        
        <div className="flex flex-col justify-between">
            <h5 className="text-[#bd5e3b] font-bold text-xs uppercase tracking-widest mb-4">Social</h5>
            <div className="flex justify-center md:justify-start gap-6">
                <a href="#" className="text-white hover:text-[#bd5e3b] transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg></a>
                <a href="#" className="text-white hover:text-[#bd5e3b] transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 10-8 8 8 8 0 008-8z"></path></svg></a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
