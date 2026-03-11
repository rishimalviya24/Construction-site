import React from 'react';

const GallerySection = () => {
  const images = [
    { src: '/img1.avif', alt: 'Eigenes Deck', className: 'row-span-2 col-span-1 h-full' }, // Item 1: Tall Left
    { src: '/img1.avif', alt: 'Rückbau-Struktur', className: 'col-span-2 h-64' },       // Item 2: Wide Top Right
    { src: '/img1.avif', alt: 'Bauarbeiter', className: 'col-span-1 h-64' },     // Item 3: Center
    { src: '/img1.avif', alt: 'Fertiges Gebäude', className: 'col-span-1 h-64' },           // Item 4: Right
    { src: '/img1.avif', alt: 'Veranda', className: 'col-span-1 h-64' },                   // Item 5: Bottom Left
    { src: '/img1.avif', alt: 'Dacharbeiten', className: 'col-span-1 h-64' },                 // Item 6: Bottom Center
    { src: '/img1.avif', alt: 'Vertikale Rahmen', className: 'row-span-2 col-span-1 h-full' }, // Item 7: Tall Bottom Right
    { src: '/img1.avif', alt: 'Verkleidungsarbeiten', className: 'col-span-2 h-64' },             // Item 8: Wide Bottom Left
  ];

  return (
    <section className="relative bg-[#1a1a1a] py-24 px-6 md:px-12 lg:px-20 font-sans overflow-hidden">
      
      {/* Background Graphic */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none opacity-[0.02]">
         <svg className="absolute -top-20 right-1/4 w-[800px] h-[800px] text-white animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
             <path d="M50 0 L55 10 L65 8 L68 18 L78 15 L82 25 L92 22 L95 32 L100 35 L95 45 L100 50 L95 55 L100 65 L90 68 L88 78 L78 75 L75 85 L65 82 L60 92 L50 100 L45 90 L35 92 L32 82 L22 85 L18 75 L8 78 L5 68 L0 65 L5 55 L0 50 L5 45 L0 35 L10 32 L12 22 L22 25 L25 15 L35 18 L40 8 L50 0 Z" />
        </svg>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2a2a2a] px-3 py-1.5 rounded-md border border-[#333] mb-4">
               <svg className="w-3.5 h-3.5 text-[#bd5e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <span className="text-[#888] font-bold text-[10px] tracking-[0.2em] uppercase">Abgeschlossene Projekte</span>
            </div>
            <h2 className="text-[#bd5e3b] text-5xl md:text-[56px] font-[900] uppercase tracking-tighter leading-none">Galerie unserer <span className="text-white">Arbeiten.</span></h2>
          </div>
          
          <button className="bg-[#f0f0f0] text-[#1a1a1a] px-8 py-3 rounded-full font-bold text-[13px] hover:bg-white hover:scale-105 transition-all shadow-lg self-start md:self-end">
            Alle Projekte
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
           {/* 1. Tall Left (Deck) - Full width on mobile, tall on lg */}
           <div className="lg:row-span-2 md:col-span-1 lg:col-span-1 relative rounded-sm overflow-hidden group h-[300px] lg:h-auto">
              <img src="/img1.avif" alt="Deck" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>

           {/* 2. Wide Top Right (Framing) - Full width on mobile, wide on lg */}
           <div className="md:col-span-1 lg:col-span-2 relative rounded-sm overflow-hidden group h-[250px] lg:h-[300px]">
              <img src="/img1.avif" alt="Framing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>

           {/* 3. Center (Man) */}
           <div className="md:col-span-1 lg:col-span-1 relative rounded-sm overflow-hidden group h-[250px] lg:h-[300px]">
              <img src="/img1.avif" alt="Worker" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>

           {/* 4. Right (House) */}
           <div className="md:col-span-1 lg:col-span-1 relative rounded-sm overflow-hidden group h-[250px] lg:h-[300px]">
              <img src="/img1.avif" alt="House" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>

           {/* 5. Bottom Left (Porch) */}
           <div className="md:col-span-1 lg:col-span-1 relative rounded-sm overflow-hidden group h-[250px] lg:h-[300px]">
              <img src="/img1.avif" alt="Porch" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>

           {/* 6. Bottom Center (Worker Roof) */}
           <div className="md:col-span-1 lg:col-span-1 relative rounded-sm overflow-hidden group h-[250px] lg:h-[300px]">
              <img src="/img1.avif" alt="Roofing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>

           {/* 7. Tall Bottom Right (Vertical Framing) */}
           <div className="lg:row-span-2 md:col-span-1 lg:col-span-1 relative rounded-sm overflow-hidden group h-[300px] lg:h-auto">
              <img src="/img1.avif" alt="Vertical Framing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>

           {/* 8. Wide Bottom Left (Siding) */}
           <div className="md:col-span-1 lg:col-span-2 relative rounded-sm overflow-hidden group h-[250px] lg:h-[300px]">
              <img src="/img1.avif" alt="Siding" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
