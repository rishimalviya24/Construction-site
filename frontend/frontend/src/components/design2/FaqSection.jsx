import React, { useState } from 'react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(1); // Default open index matches the image

  const faqs = [
    {
      question: "Welche Projekte übernehmen Sie?",
      answer: "Wir führen eine breite Palette von Rückbau- und Entkernungsarbeiten durch – vom Einfamilienhaus bis zur Industriehalle. Haben Sie ein spezielles Projekt? Kontaktieren Sie uns gern!"
    },
    {
      question: "Bieten Sie kostenlose Offerten an?",
      answer: "Ja, wir erstellen kostenlose und unverbindliche Offerten, damit Sie Ihre Planung und Ihr Budget im Griff haben."
    },
    {
      question: "Wie lange dauert mein Projekt?",
      answer: "Die Dauer hängt vom Umfang ab. Ein kleines Badezimmer ist in wenigen Tagen erledigt, der Rückbau einer Halle kann mehrere Wochen dauern. Vor Beginn erhalten Sie einen detaillierten Zeitplan."
    },
    {
      question: "Können Sie bei der Planung helfen?",
      answer: "Gerne! Wir beraten Sie bei der Projektplanung oder arbeiten mit vorhandenen Plänen."
    },
    {
      question: "Sind Sie lizenziert und versichert?",
      answer: "Ja, wir sind vollständig lizenziert und versichert. Sicherheit und Professionalität haben für uns oberste Priorität."
    },
    {
      question: "Wie beginne ich?",
      answer: "Kontaktieren Sie uns telefonisch oder über das Formular. Wir vereinbaren einen Termin, besprechen Ihr Vorhaben und erstellen eine Offerte."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#efeae2] py-16 md:py-24 px-6 md:px-12 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start">
        
        {/* Left Column: Heading & Intro */}
        <div className="lg:col-span-5 relative lg:sticky lg:top-24">
          <h2 className="text-[#1a1a1a] text-4xl md:text-5xl lg:text-[56px] font-[900] uppercase tracking-tighter leading-none mb-6">Häufige Fragen</h2>
          <p className="text-[#555] font-medium leading-relaxed mb-8 md:mb-10 max-w-sm">
            Sie haben Fragen? Hier sind einige Dinge, die uns häufig gestellt werden, bevor ein Projekt beginnt.
          </p>
          <button className="bg-transparent border-2 border-[#bd5e3b] text-[#1a1a1a] px-10 py-3.5 rounded-full font-bold text-[14px] uppercase tracking-wider hover:bg-[#bd5e3b] hover:text-white transition-all">
            Kontaktieren Sie uns
          </button>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-7">
          <div className="border-t border-[#d1cec6]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-[#d1cec6]">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
                  >
                    <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-[#bd5e3b]' : 'text-[#1a1a1a] group-hover:text-[#bd5e3b]'}`}>
                      {faq.question}
                    </span>
                    <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg className={`w-5 h-5 ${isOpen ? 'text-[#bd5e3b]' : 'text-[#666]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-[#666] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
