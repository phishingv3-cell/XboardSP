import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/sound';

interface AdModalProps {
  isOpen: boolean;
  onClose: (completed: boolean) => void;
  actionType?: 'enable' | 'select';
}

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, actionType = 'enable' }) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(5);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [adFinished, setAdFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(5);
      setCanSkip(false);
      setAdFinished(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          setAdFinished(true);
          soundEngine.playAdCompleteTone();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="ad-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
    >
      <div
        id="ad-modal-container"
        className="w-full max-w-md bg-[#121214] border-2 border-[#07f57e] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Ad Header / Info Bar */}
        <div className="bg-[#1a1a1e] px-4 py-2.5 flex items-center justify-between border-b border-[#2d2d34]">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#07f57e] text-black rounded tracking-wider uppercase">
              Ad
            </span>
            <span className="text-xs text-neutral-300 font-medium">
              Sponsored • Google AdMob Simulator
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!canSkip ? (
              <span className="text-xs font-mono font-bold text-[#07f57e] bg-black/40 px-2 py-0.5 rounded border border-[#07f57e]/40">
                Reward in {secondsRemaining}s
              </span>
            ) : (
              <button
                id="btn-skip-ad"
                onClick={() => onClose(true)}
                className="px-3 py-1 bg-[#07f57e] text-black font-bold text-xs rounded hover:bg-[#07f57e]/90 transition-transform active:scale-95 shadow-md flex items-center gap-1 cursor-pointer"
              >
                <span>Skip Ad</span>
                <span>✕</span>
              </button>
            )}
          </div>
        </div>

        {/* Video / Graphic Canvas Simulator */}
        <div className="p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#16161a] to-[#0a0a0c] relative min-h-[300px]">
          {/* Animated pulsing neon radar graphic */}
          <div className="relative w-28 h-28 mb-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#07f57e]/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-[#07f57e]/40 animate-pulse" />
            <div className="w-20 h-20 rounded-2xl bg-[#000000] border-2 border-[#07f57e] flex flex-col items-center justify-center shadow-[0_0_20px_rgba(7,245,126,0.3)]">
              <span className="text-2xl font-black text-[#07f57e] tracking-tighter">X</span>
              <span className="text-[10px] text-white font-bold tracking-widest">BOARD</span>
            </div>
          </div>

          <span className="text-xs text-[#07f57e] font-mono uppercase tracking-widest mb-1">
            Android 8+ Verified Keyboard
          </span>
          <h3 className="text-xl font-bold text-white mb-2">
            X Board Pro: Neon English Keyboard
          </h3>
          <p className="text-xs text-neutral-400 max-w-xs mb-6">
            Ultra-fast typing, 24 unicode fonts, text decorations, and smart word prediction engine.
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-[#242429] h-2 rounded-full overflow-hidden mb-3">
            <div
              className="bg-[#07f57e] h-full transition-all duration-1000 ease-linear shadow-[0_0_10px_#07f57e]"
              style={{ width: `${((5 - secondsRemaining) / 5) * 100}%` }}
            />
          </div>

          <div className="text-[11px] text-neutral-400 font-mono">
            {adFinished ? (
              <span className="text-[#07f57e] font-semibold flex items-center justify-center gap-1.5">
                <span>✓</span> Reward Granted! Keyboard is ready to activate.
              </span>
            ) : (
              <span>Watching ad to enable full system permissions...</span>
            )}
          </div>
        </div>

        {/* Ad Footer / Action Button */}
        <div className="bg-[#1a1a1e] p-4 border-t border-[#2d2d34] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">X Board Android Services</span>
            <span className="text-[10px] text-neutral-400">Free version supported by ads</span>
          </div>

          {canSkip ? (
            <button
              id="btn-ad-continue"
              onClick={() => onClose(true)}
              className="px-5 py-2 bg-[#07f57e] text-black font-bold text-sm rounded-lg hover:bg-[#07f57e]/90 transition shadow-lg active:scale-95 cursor-pointer"
            >
              {actionType === 'select' ? 'Continue & Select Keyboard' : 'Continue & Enable Keyboard'}
            </button>
          ) : (
            <button
              id="btn-ad-wait"
              disabled
              className="px-4 py-2 bg-[#222228] text-neutral-400 text-xs font-medium rounded-lg cursor-not-allowed"
            >
              Please wait ({secondsRemaining}s)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
