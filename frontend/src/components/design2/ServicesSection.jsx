import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: 'Rückbau',
      image: '/img1.avif', 
      description: 'Wir reissen ab, trennen sauber und verlassen alles besenrein. Professioneller Abbruch von Gebäuden, Räumen und Strukturen.',
      link: '#'
    },
    {
      title: 'Entkernung',
      image: '/img1.avif', 
      description: 'Vollständige Entkernung von Innenräumen mit fachgerechter Entsorgung und recyclinggerechter Materialtrennung.',
      link: '#'
    },
    {
      title: 'Recycling',
      image: '/img1.avif', 
      description: 'Wir trennen Materialien direkt vor Ort für effiziente und umweltgerechte Verwertung.',
      link: '#'
    },
    {
      title: 'Sanierung',
      image: '/img1.avif', 
      description: 'Sanierungslösungen für private und gewerbliche Liegenschaften nach Ihren spezifischen Anforderungen.',
      link: '#'
    },
    {
      title: 'Entsorgung',
      image: '/img1.avif', 
      description: 'Professionelle Entsorgung aller Materialarten mit vollständiger Dokumentation und Zertifizierung.',
      link: '#'
    }
  ];

  return (
    <section className="relative bg-[#1a1a1a] py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
      {/* Background Graphic (Subtle Saw Blade/Gear hint) */}
      {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
        <svg className="absolute -left-64 -top-64 w-[800px] h-[800px] text-white animate-spin-slow" viewBox="0 0 100 100" fill="currentColor"> */}
             {/* Simple Gear Shape */}
             {/* <path d="M50 0 L55 10 L65 8 L68 18 L78 15 L82 25 L92 22 L95 32 L100 35 L95 45 L100 50 L95 55 L100 65 L90 68 L88 78 L78 75 L75 85 L65 82 L60 92 L50 100 L45 90 L35 92 L32 82 L22 85 L18 75 L8 78 L5 68 L0 65 L5 55 L0 50 L5 45 L0 35 L10 32 L12 22 L22 25 L25 15 L35 18 L40 8 L50 0 Z" />
        </svg>
      </div> */}

      {/* Header Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#2a2a2a] p-1.5 rounded-full border border-[#333]">
              <svg className="w-3 h-3 text-[#bd5e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-[#666] font-bold text-[10px] tracking-[0.2em] uppercase">Was wir tun</span>
          </div>
          <h2 className="text-[#bd5e3b] text-5xl md:text-[56px] font-[900] uppercase tracking-tighter leading-none">Profi <span className="text-white">Demontage.</span></h2>
        </div>
        <div className="pb-2">
          <p className="text-[#999] text-lg font-medium leading-relaxed">
            Saubere Trennung und effiziente Entsorgung ist unser <span className="text-[#bd5e3b]">Kerngeschäft</span> — präzise und zuverlässig.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-20">
        {services.map((service, index) => {
             const isTopRow = index < 2;
             // On desktop (lg), use 3 cols for top items, 2 cols for bottom items.
             // On tablet (md), just use 1 col (default grid behavior) or span full? 
             // With md:grid-cols-2, each item takes 1 cell by default.
             // Let's refine for tablet: Top row items could span full width or just be side-by-side.
             const colSpan = isTopRow ? 'md:col-span-1 lg:col-span-3' : 'md:col-span-1 lg:col-span-2';
             
             return (
              <div key={index} className={`${colSpan} group relative bg-[#242424] rounded-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-lg`}>
                <div className="relative h-64 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{service.title}</h3>
                    <a href={service.link} className="flex items-center text-[#bd5e3b] text-[11px] font-bold uppercase tracking-wider hover:text-white transition-colors mt-1.5">
                      Read More <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                  <p className="text-[#888] leading-relaxed text-[14px] font-medium">
                    {service.description}
                  </p>
                </div>
              </div>
             );
        })}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button className="bg-white text-[#1a1a1a] px-10 py-4 rounded-full font-bold text-[13px] uppercase tracking-wider hover:bg-[#bd5e3b] hover:text-white transition-all shadow-xl">
          Mehr erfahren
        </button>
      </div>

    </section>
  );
};

export default ServicesSection;
