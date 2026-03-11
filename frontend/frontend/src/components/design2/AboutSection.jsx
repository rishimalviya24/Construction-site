import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative bg-[#f6f4f0] py-16 md:py-24 px-6 md:px-12 lg:px-20 font-sans overflow-hidden">
      
      {/* Background Watermark (Saw Blade) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1400px] pointer-events-none opacity-[0.03]">
         <img 
          src="/saw-blade.png" 
          alt="" 
          className="absolute top-0 right-0 w-[400px] md:w-[800px] animate-spin-slow"
        />
         <img 
          src="/saw-blade.png" 
          alt="" 
          className="absolute bottom-0 left-0 w-[400px] md:w-[800px] animate-spin-slow"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- Top Section: About Us --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16">
          
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
               <span className="text-[#bd5e3b] text-xl">→</span>
               <span className="text-[#999] font-bold text-[11px] uppercase tracking-[0.2em]">Elite Contractors LLC</span>
            </div>
            <h2 className="text-[#1a1a1a] text-4xl md:text-5xl lg:text-[56px] font-[900] uppercase tracking-tighter leading-none mb-6">Einfach <span className="text-[#bd5e3b]">machen lassen.</span></h2>
            <p className="text-[#555] font-medium leading-relaxed mb-8 max-w-xs mx-auto lg:mx-0">
              15+ Jahre Erfahrung im Rückbau, Entkernung und effizienten Recycling.
            </p>
            <button className="bg-transparent border-2 border-[#dcdcdc] text-[#1a1a1a] px-8 py-3 rounded-full font-bold text-[13px] uppercase tracking-wider hover:border-[#bd5e3b] hover:bg-[#bd5e3b] hover:text-white transition-all">
              Learn More
            </button>
          </div>

          {/* Right Column: Description & Stats */}
          <div className="lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
            <h3 className="text-[#1a1a1a] text-2xl md:text-3xl font-bold leading-tight mb-6">
              Wir verlassen die Baustelle erst, wenn man vom <span className="text-[#bd5e3b]">Boden essen könnte.</span>
            </h3>
            <p className="text-[#666] leading-relaxed mb-12 max-w-3xl mx-auto lg:mx-0">
              Bei uns ist Qualität kein Zufall – es ist unser Standard. Mit über 15 Jahren Erfahrung im Rückbau und Recycling haben wir ein System perfektioniert, das funktioniert. Wir trennen Materialien direkt vor Ort, arbeiten sauber und zuverlässig, und halten uns an vereinbarte Termine. Egal ob Badezimmer oder Industriehalle – wir erledigen das.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-[#e5e5e5] pt-8">
              <div>
                <div className="text-[#bd5e3b] text-4xl font-[900] mb-1">15+</div>
                <div className="text-[#1a1a1a] font-bold text-[13px] uppercase tracking-wide">Jahre Erfahrung</div>
              </div>
              <div className="relative sm:pl-8 pt-8 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[#e5e5e5]">
                <div className="text-[#bd5e3b] text-4xl font-[900] mb-1">1000+</div>
                <div className="text-[#1a1a1a] font-bold text-[13px] uppercase tracking-wide">Projekte Abgebaut</div>
              </div>
              <div className="relative sm:pl-8 pt-8 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[#e5e5e5]">
                <div className="text-[#bd5e3b] text-4xl font-[900] mb-1">100%</div>
                <div className="text-[#1a1a1a] font-bold text-[13px] uppercase tracking-wide">Besenrein</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Middle Section: Large Image --- */}
        <div className="relative w-full h-[300px] md:h-[500px] rounded-sm overflow-hidden mb-24 shadow-xl">
          <img 
            src="/img1.avif" 
            alt="Construction Framework" 
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* --- Bottom Section: Our Benefits --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
           {/* Left Column: Heading */}
           <div className="lg:col-span-4">
             <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
               <span className="text-[#bd5e3b] text-xl">✓</span>
               <span className="text-[#999] font-bold text-[11px] uppercase tracking-[0.2em]">Warum uns wählen</span>
            </div>
            <h2 className="text-[#1a1a1a] text-4xl md:text-[42px] font-[900] uppercase tracking-tighter leading-none mb-6">Unsere <span className="text-[#bd5e3b]">Stärken.</span></h2>
           </div>

           {/* Right Column: Intro Text */}
           <div className="lg:col-span-8">
              <h3 className="text-[#1a1a1a] text-xl md:text-2xl font-bold leading-tight mb-4">
                Wir arbeiten <span className="text-[#bd5e3b]">sauber, schnell und zuverlässig.</span>
              </h3>
              <p className="text-[#666] leading-relaxed max-w-2xl">
                Mit unseren bewährten Verfahren und dem Fokus auf Effizienz liefern wir konsistent besenreines Ergebnis. Von der Termin-Zusage bis zum letzten Quadratmeter – wir halten unser Versprechen.
              </p>
           </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-16">
          
          {/* Benefit 1 */}
          <div className="group">
             <div className="w-12 h-12 mb-6 text-[#bd5e3b] group-hover:scale-110 transition-transform duration-300">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h4 className="text-[#1a1a1a] font-bold text-lg mb-3">Besenrein</h4>
             <p className="text-[#666] text-sm leading-relaxed">
               Wir verlassen die Baustelle erst, wenn man vom Boden essen könnte. Das ist nicht nur ein Versprechen – das ist unser Standard.
             </p>
          </div>

          {/* Benefit 2 */}
          <div className="group">
             <div className="w-12 h-12 mb-6 text-[#bd5e3b] group-hover:scale-110 transition-transform duration-300">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
             </div>
             <h4 className="text-[#1a1a1a] font-bold text-lg mb-3">Recycling</h4>
             <p className="text-[#666] text-sm leading-relaxed">
               Wir trennen Materialien direkt vor Ort für eine effiziente und umweltgerechte Entsorgung.
             </p>
          </div>

          {/* Benefit 3 */}
          <div className="group">
             <div className="w-12 h-12 mb-6 text-[#bd5e3b] group-hover:scale-110 transition-transform duration-300">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <h4 className="text-[#1a1a1a] font-bold text-lg mb-3">Express</h4>
             <p className="text-[#666] text-sm leading-relaxed">
               Kurze Vorlaufzeiten und pünktliche Terminabwicklung sind bei uns Gesetz. Wir halten, was wir versprechen.
             </p>
          </div>

          {/* Benefit 4 */}
          <div className="group">
             <div className="w-12 h-12 mb-6 text-[#bd5e3b] group-hover:scale-110 transition-transform duration-300">
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
             </div>
             <h4 className="text-[#1a1a1a] font-bold text-lg mb-3">Profis mit Erfahrung</h4>
             <p className="text-[#666] text-sm leading-relaxed">
               Mit über 15 Jahren Branchenerfahrung wissen wir, wie man den Job richtig macht. Jedes Projekt ein neuer Standard.
             </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
