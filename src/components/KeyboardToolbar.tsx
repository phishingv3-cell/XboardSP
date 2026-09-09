import React from 'react';
import { 
  Smile, 
  Type, 
  Sparkles, 
  Clipboard, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  X,
  ChevronLeft
} from 'lucide-react';
import { FontStyle } from '../data/fonts';

export type ToolType = 'emoji' | 'font' | 'text-style' | 'clipboard' | 'help' | 'sound' | null;

interface KeyboardToolbarProps {
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  activeFont: FontStyle;
  isSoundOn: boolean;
  onToggleSound: () => void;
  suggestions: string[];
  onSelectSuggestion: (word: string) => void;
  activeWord: string;
}

export const KeyboardToolbar: React.FC<KeyboardToolbarProps> = ({
  activeTool,
  onSelectTool,
  activeFont,
  isSoundOn,
  onToggleSound,
  suggestions,
  onSelectSuggestion,
  activeWord
}) => {
  return (
    <div id="keyboard-toolbar-wrapper" className="flex flex-col bg-[#121214] border-b border-[#202026]">
      {/* Upper Bar: Main 6 Tool Buttons as requested */}
      <div id="keyboard-tool-buttons-row" className="flex items-center justify-between px-2 py-1.5 bg-[#0a0a0c]">
        {/* Left Side: If a tool is open, show Back button; otherwise show tools */}
        {activeTool !== null ? (
          <div className="flex items-center justify-between w-full">
            <button
              id="btn-back-to-keyboard"
              onClick={() => onSelectTool(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202026] text-[#07f57e] hover:bg-[#282832] font-semibold text-xs transition active:scale-95 cursor-pointer border border-[#2d2d36]"
              title="Back to Keyboard Letters"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Keys</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-white/70 uppercase tracking-wider">
                {activeTool === 'emoji' && 'Emoji Picker'}
                {activeTool === 'font' && '24 Fancy Fonts'}
                {activeTool === 'text-style' && 'Text Decoration Styles'}
                {activeTool === 'clipboard' && 'Clipboard History'}
                {activeTool === 'help' && 'X Board Help'}
                {activeTool === 'sound' && 'Audio & Haptics'}
              </span>

              <button
                id="btn-close-tool-panel"
                onClick={() => onSelectTool(null)}
                className="p-1 rounded-md text-white/80 hover:text-white hover:bg-[#202026] cursor-pointer"
                title="Close Tool"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-1">
            {/* 1. Emoji Button */}
            <button
              id="tool-btn-emoji"
              onClick={() => onSelectTool('emoji')}
              className="flex-1 flex items-center justify-center py-2 rounded-lg text-white hover:text-[#07f57e] hover:bg-[#1e1e24] transition-colors active:scale-95 cursor-pointer"
              title="Emoji Picker"
            >
              <Smile className="w-4 h-4" />
            </button>

            {/* 2. Font Button */}
            <button
              id="tool-btn-font"
              onClick={() => onSelectTool('font')}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors active:scale-95 cursor-pointer ${
                activeFont.id !== 'normal'
                  ? 'bg-[#07f57e] text-black font-bold'
                  : 'text-white hover:text-[#07f57e] hover:bg-[#1e1e24]'
              }`}
              title={`Fonts: Active (${activeFont.name})`}
            >
              <div className="flex items-center gap-1">
                <Type className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-tight">
                  {activeFont.id !== 'normal' ? '𝔽' : 'Font'}
                </span>
              </div>
            </button>

            {/* 3. Text Style Button */}
            <button
              id="tool-btn-text-style"
              onClick={() => onSelectTool('text-style')}
              className="flex-1 flex items-center justify-center py-2 rounded-lg text-white hover:text-[#07f57e] hover:bg-[#1e1e24] transition-colors active:scale-95 cursor-pointer"
              title="Text Decoration Styles"
            >
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-bold">Style</span>
              </div>
            </button>

            {/* 4. Clipboard History Button */}
            <button
              id="tool-btn-clipboard"
              onClick={() => onSelectTool('clipboard')}
              className="flex-1 flex items-center justify-center py-2 rounded-lg text-white hover:text-[#07f57e] hover:bg-[#1e1e24] transition-colors active:scale-95 cursor-pointer"
              title="Clipboard History & Actions"
            >
              <Clipboard className="w-4 h-4" />
            </button>

            {/* 5. Help Button */}
            <button
              id="tool-btn-help"
              onClick={() => onSelectTool('help')}
              className="flex-1 flex items-center justify-center py-2 rounded-lg text-white hover:text-[#07f57e] hover:bg-[#1e1e24] transition-colors active:scale-95 cursor-pointer"
              title="Help & Shortcuts"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* 6. Sound Button */}
            <button
              id="tool-btn-sound"
              onClick={onToggleSound}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors active:scale-95 cursor-pointer ${
                isSoundOn ? 'text-[#07f57e] hover:bg-[#1e1e24]' : 'text-neutral-500 hover:bg-[#1e1e24]'
              }`}
              title={isSoundOn ? 'Sound On (Click to Mute)' : 'Sound Off (Click to Enable)'}
            >
              {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Auto-suggest Strip (Only shown when not inside a full-screen tool panel) */}
      {!activeTool && (
        <div
          id="keyboard-suggestion-strip"
          className="flex items-center gap-1 px-2 py-1.5 overflow-x-auto scrollbar-none bg-[#141418] border-t border-[#202026]"
        >
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, idx) => (
              <button
                key={`${suggestion}-${idx}`}
                id={`suggestion-btn-${idx}`}
                onClick={() => onSelectSuggestion(suggestion)}
                className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition cursor-pointer active:scale-95 ${
                  idx === 0 && activeWord.length > 0
                    ? 'bg-[#07f57e] text-black font-bold shadow-[0_0_8px_rgba(7,245,126,0.3)]'
                    : 'bg-[#202026] text-white hover:bg-[#282832] border border-[#2d2d36]'
                }`}
              >
                {suggestion}
              </button>
            ))
          ) : (
            <div className="text-[11px] text-neutral-500 italic px-2 py-0.5 font-mono">
              Auto-suggest ready • Type words to auto-save to dictionary
            </div>
          )}
        </div>
      )}
    </div>
  );
};
