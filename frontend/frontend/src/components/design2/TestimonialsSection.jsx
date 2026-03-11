import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Jessica Müller",
      text: "Fantastische Erfahrung! Das Team war professionell, aufmerksam und hat unser Projekt mit großer Sorgfalt abgeschlossen. Unser Rückbau wurde pünktlich und besenrein durchgeführt. Sehr empfehlenswert!",
      rating: 5
    },
    {
      name: "Michael Schneider",
      text: "Wir hatten eine ausgezeichnete Zusammenarbeit. Von der ersten Planung bis zur abschließenden Übergabe war das Team professionell und detailverliebt. Alles wurde termingenau und nach höchsten Standards ausgeführt.",
      rating: 5
    },
    {
      name: "Sarah Gruber",
      text: "Ausgezeichnete Arbeit und Liebe zum Detail! Unser Badezimmer wurde vollständig entkernt und sauber übergeben. Wir sind mehr als zufrieden mit dem Ergebnis.",
      rating: 5
    },
    {
      name: "David Weber",
      text: "Wir sind sehr glücklich mit der geleisteten Arbeit! Das Dach wurde professionell und effizient saniert, alle unsere Wünsche wurden erfüllt und die Baustelle sauber hinterlassen. Kommunikation war reibungslos.",
      rating: 5
    },
    {
      name: "Emily Fischer",
      text: "Wir sind begeistert von dem Rückbau unseres alten Hauses. Alles wurde fachgerecht entsorgt und recycelt. Das Team war freundlich und pünktlich.",
      rating: 5
    },
    {
      name: "Michael Huber",
      text: "Die Renovierungsarbeiten wurden zu unserer vollsten Zufriedenheit durchgeführt! Die Umsetzung unserer Ideen war professionell und termingerecht. Die Qualität der Arbeit übertraf unsere Erwartungen.",
      rating: 5
    }
  ];

  return (
    <section className="bg-[#f6f4f0] py-24 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#ebe7dd] px-4 py-2 rounded-md border border-[#e0dad0] mb-5">
             <svg className="w-4 h-4 text-[#bd5e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
             </svg>
             <span className="text-[#666] font-bold text-[10px] tracking-[0.2em] uppercase">Das sagen unsere Kunden</span>
          </div>
          <h2 className="text-[#bd5e3b] text-5xl md:text-[56px] font-[900] uppercase tracking-tighter leading-none mb-4">Kundenmeinungen</h2>
          <p className="text-[#555] font-medium text-[15px]">
            Echte Rückmeldungen von Auftraggebern, die uns ihr Vertrauen geschenkt haben.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mb-16 space-y-6">
           {testimonials.map((data, index) => (
             <div key={index} className="break-inside-avoid bg-[#ebe7dd] p-8 rounded-sm relative overflow-hidden h-fit transition-transform hover:-translate-y-1 duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-5 text-[#f39c12]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>

                {/* Text */}
                <p className="text-[#444] text-[15px] leading-relaxed mb-8 relative z-10 font-medium">
                  "{data.text}"
                </p>

                {/* Name */}
                <h4 className="text-[#1a1a1a] font-bold text-[14px] relative z-10">{data.name}</h4>

                {/* Big Quote Icon Background */}
                <div className="absolute -bottom-6 -right-2 text-white opacity-60 pointer-events-none">
                   <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                   </svg>
                </div>
             </div>
           ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="bg-transparent border-2 border-[#bd5e3b]/30 text-[#1a1a1a] px-10 py-3.5 rounded-full font-bold text-[14px] hover:border-[#bd5e3b] hover:bg-[#bd5e3b] hover:text-white transition-all shadow-sm uppercase tracking-wide">
            Load More
          </button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
