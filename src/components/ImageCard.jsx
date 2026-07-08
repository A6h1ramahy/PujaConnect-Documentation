import React, { useState } from 'react';
import { Eye, Monitor, Smartphone, X } from 'lucide-react';

export default function ImageCard({ title, caption, isMobile = false, gradientClass = "from-saffron-500/20 to-gold-500/20", imageSrc }) {
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Clean title to construct fallback path, e.g. "Home Page" -> "/screenshots/home-page.png"
  const defaultFilename = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') + '.png';
  const src = imageSrc || `/screenshots/${defaultFilename}`;

  return (
    <>
      <div className="group relative rounded-2xl overflow-hidden glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-saffron-500/40">
        {/* Mockup Topbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-light-border dark:border-dark-border bg-stone-100/50 dark:bg-dark-surface/50 text-[10px] text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-crimson-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-gold-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1 font-mono">
            {isMobile ? <Smartphone size={10} /> : <Monitor size={10} />}
            <span>pujaconnect.in/{title.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
          <div className="w-8" />
        </div>

        {/* Screen Area */}
        <div className="relative aspect-video w-full overflow-hidden bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
          {!imgError ? (
            <img 
              src={src} 
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* High-fidelity abstract UI wireframe placeholder fallback */
            <div className={`w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-tr ${gradientClass} transition-colors duration-300 relative`}>
              <div className="w-full max-w-[85%] h-[75%] rounded-lg bg-white/70 dark:bg-dark-card/85 border border-white/40 shadow-sm p-3 flex flex-col gap-2 relative overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-300">
                <div className="h-4 rounded bg-saffron-500/20 w-1/3" />
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="h-10 rounded bg-stone-200/50 dark:bg-stone-700/50 border border-stone-200/30" />
                  <div className="h-10 rounded bg-stone-200/50 dark:bg-stone-700/50 border border-stone-200/30" />
                  <div className="h-10 rounded bg-stone-200/50 dark:bg-stone-700/50 border border-stone-200/30" />
                </div>
                <div className="h-3 rounded bg-stone-200/40 dark:bg-stone-800/40 w-full mt-2" />
                <div className="h-3 rounded bg-stone-200/40 dark:bg-stone-800/40 w-5/6" />
                <div className="h-6 rounded bg-gradient-to-r from-saffron-500/60 to-gold-500/60 w-1/4 absolute bottom-3 right-3 flex items-center justify-center text-[7px] text-white font-bold tracking-wider">
                  VIEW DETAIL
                </div>
              </div>
            </div>
          )}

          {/* Hover Action overlay */}
          <div 
            onClick={() => { if (!imgError) setIsModalOpen(true); }}
            className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${!imgError ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-saffron-500 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Eye size={12} />
              <span>{imgError ? 'Wireframe Placeholder' : 'View Screenshot'}</span>
            </span>
          </div>
        </div>

        {/* Caption Content */}
        <div className="p-4 border-t border-light-border dark:border-dark-border bg-white dark:bg-dark-card transition-colors duration-300">
          <h4 className="text-sm font-semibold text-stone-900 dark:text-white group-hover:text-saffron-500 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
            {caption}
          </p>
        </div>
      </div>

      {/* Modal Popup Viewer */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={24} />
          </button>
          
          <div 
            className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#12070A]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the container
          >
            <img 
              src={src} 
              alt={title} 
              className="w-full h-full object-contain max-h-[85vh] mx-auto"
            />
            {/* Caption bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
              <h3 className="font-display font-bold text-lg text-saffron-400">{title}</h3>
              <p className="text-xs text-stone-300 mt-1">{caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
