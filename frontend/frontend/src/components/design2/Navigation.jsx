import React from 'react';

const Navbar = () => {
  return (
    // Changed bg-[#f2ede4] to bg-transparent
    <nav className="flex items-center justify-between px-10 py-6 bg-transparent w-full">
      
      {/* Logo Section - Replace with your <img> tag */}
      <div className="flex-shrink-0">
        <img 
          src="/path-to-your-logo.png" 
          alt="RückbauPro Logo" 
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center space-x-10">
        <a href="#home" className="text-[#c1694f] font-bold text-sm uppercase tracking-wide">
          Home
        </a>
        <a href="#about" className="text-[#4a4a4a] hover:text-black font-semibold text-sm uppercase tracking-wide transition-colors">
          Über Uns
        </a>
        <a href="#services" className="text-[#4a4a4a] hover:text-black font-semibold text-sm uppercase tracking-wide transition-colors">
          Leistungen
        </a>
        <a href="#gallery" className="text-[#4a4a4a] hover:text-black font-semibold text-sm uppercase tracking-wide transition-colors">
          Galerie
        </a>
        <a href="#contact" className="text-[#4a4a4a] hover:text-black font-semibold text-sm uppercase tracking-wide transition-colors">
          Kontakt
        </a>
      </div>

      {/* Call to Action Button */}
      <div className="flex-shrink-0">
        <a 
          href="tel:+41790000000" 
          className="bg-[#1a1a1a] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-tight hover:bg-black transition-all shadow-md active:scale-95"
        >
          +41 79 000 00 00
        </a>
      </div>
    </nav>
  );
};

export default Navbar;