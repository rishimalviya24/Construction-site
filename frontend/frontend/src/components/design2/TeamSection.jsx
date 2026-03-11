import React from 'react';

const TeamSection = () => {
  const team = [
    {
      name: 'John Smith',
      role: 'Project Manager',
      image: '/img1.avif' 
    },
    {
      name: 'Sarah Wilson',
      role: 'Estimator / Planner',
      image: '/img1.avif'
    },
    {
      name: 'David Clark',
      role: 'Architect',
      image: '/img1.avif'
    },
    {
      name: 'James Miller',
      role: 'Construction Manager',
      image: '/img1.avif'
    }
  ];

  return (
    <section className="bg-[#1a1a1a] py-24 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#2a2a2a] px-3 py-1.5 rounded-md border border-[#333] mb-4">
            <svg className="w-3.5 h-3.5 text-[#bd5e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-[#888] font-bold text-[10px] tracking-[0.2em] uppercase">Unser Team</span>
          </div>
          <h2 className="text-[#bd5e3b] text-5xl md:text-[56px] font-[900] uppercase tracking-tighter leading-none mb-4">Die Gesichter<br />hinter RückbauPro</h2>
          <p className="text-[#888] text-[15px] font-medium max-w-lg mx-auto">
            Unser Team besteht aus erfahrenen Rückbauspezialisten, Projektleitern und Recycling-Experten – gemeinsam bringen wir jedes Bauvorhaben sauber zu Ende.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative aspect-square overflow-hidden rounded-md mb-6 border-2 border-[#333] group-hover:border-[#bd5e3b] transition-colors duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>
              <h3 className="text-white text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-[#666] text-sm font-medium uppercase tracking-wide">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Hiring CTA Card */}
        <div className="relative bg-[#222] rounded-sm overflow-hidden border border-[#333] max-w-4xl mx-auto">
             {/* Wood grain texture effect (CSS pattern) */}
             <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)' }}></div>
             
             <div className="relative z-10 py-16 px-8 text-center">
                <h3 className="text-white text-3xl font-bold mb-3">Wir <span className="text-[#bd5e3b]">stellen ein!</span></h3>
                <p className="text-[#888] max-w-lg mx-auto mb-8 leading-relaxed">
                  Verstärke unser RückbauPro-Team. Wir suchen verlässliche Fachkräfte, die langfristig in der Branche arbeiten möchten.
                </p>
                <button className="bg-[#bd5e3b] text-white px-10 py-3.5 rounded-full font-bold text-[14px] uppercase tracking-wider hover:bg-[#a64d2e] transition-colors shadow-lg">
                  Jetzt bewerben
                </button>
             </div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
