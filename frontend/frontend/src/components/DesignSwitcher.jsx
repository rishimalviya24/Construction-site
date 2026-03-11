import React from 'react';

const DesignSwitcher = ({ currentDesign, setDesign }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 p-2 bg-slate-800 rounded-lg shadow-lg">
      <button 
        className={`px-4 py-2 rounded-md text-sm font-bold uppercase transition-colors ${currentDesign === 'design1' ? 'bg-yellow-500 text-black' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
        onClick={() => setDesign('design1')}
      >
        Design 1
      </button>
      <button 
        className={`px-4 py-2 rounded-md text-sm font-bold uppercase transition-colors ${currentDesign === 'design2' ? 'bg-yellow-500 text-black' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
        onClick={() => setDesign('design2')}
      >
        Design 2
      </button>
    </div>
  );
};

export default DesignSwitcher;
