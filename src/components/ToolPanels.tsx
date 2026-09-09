import React, { useState, useEffect } from 'react';
import { FONTS, FontStyle } from '../data/fonts';
import { TEXT_STYLE_PRESETS, BORDER_DECORATORS } from '../data/textStyles';
import { EMOJI_CATEGORIES, KAOMOJI_GROUPS, searchEmojis } from '../data/emojis';
import { ToolType } from './KeyboardToolbar';
import { 
  Check, 
  Search, 
  Copy, 
  Scissors, 
  FileText, 
  Trash2, 
  CheckCheck, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  Info,
  Layers,
  Clock,
  Delete,
  CornerDownLeft,
  Space as SpaceIcon,
  Smile
} from 'lucide-react';

interface ToolPanelsProps {
  activeTool: ToolType;
  onClose: () => void;
  activeFont: FontStyle;
  onSelectFont: (font: FontStyle) => void;
  onInsertText: (text: string) => void;
  clipboardHistory: string[];
  onSelectAll: () => void;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onClearClipboard: () => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
  isHapticsOn: boolean;
  onToggleHaptics: () => void;
  activeWord: string;
  onBackspace?: () => void;
  onSpace?: () => void;
  onEnter?: () => void;
  inputMode?: 'send' | 'normal';
}

export const ToolPanels: React.FC<ToolPanelsProps> = ({
  activeTool,
  onClose,
  activeFont,
  onSelectFont,
  onInsertText,
  clipboardHistory,
  onSelectAll,
  onCopy,
  onCut,
  onPaste,
  onClearClipboard,
  isSoundOn,
  onToggleSound,
  isHapticsOn,
  onToggleHaptics,
  activeWord,
  onBackspace,
  onSpace,
  onEnter,
  inputMode = 'send'
}) => {
  // Emoji state
  const [selectedEmojiCat, setSelectedEmojiCat] = useState<string>('recent');
  const [emojiSearch, setEmojiSearch] = useState<string>('');
  const [recentEmojis, setRecentEmojis] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('xboard_recent_emojis');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['❤️', '😂', '🔥', '👍', '😊', '😍', '✨', '🎉', '🙏', '💯', '🥰', '🥺', '😎', '👏', '💖', '🚀'];
  });

  const handleEmojiClick = (emoji: string) => {
    onInsertText(emoji);
    setRecentEmojis((prev) => {
      const filtered = prev.filter((e) => e !== emoji);
      const updated = [emoji, ...filtered].slice(0, 40);
      try {
        localStorage.setItem('xboard_recent_emojis', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Font state preview text
  const previewText = activeWord.trim() || 'Hello';

  // Text Style search / filter
  const [styleTab, setStyleTab] = useState<'presets' | 'wrappers'>('presets');

  if (!activeTool) return null;

  return (
    <div
      id="tool-panels-container"
      className="flex-1 bg-[#101012] text-white flex flex-col h-[260px] overflow-hidden select-none border-t border-[#202026]"
    >
      {/* 1. FONT PANEL */}
      {activeTool === 'font' && (
        <div id="panel-font-selection" className="flex flex-col h-full p-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#202026] mb-2">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#07f57e] uppercase tracking-wider">
                Select Typing Font (24 Styles)
              </span>
              <span className="text-[11px] text-neutral-400">
                Active font will apply to all typed letters
              </span>
            </div>

            <button
              id="btn-apply-font-and-type"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#07f57e] text-black font-bold text-xs rounded-lg hover:bg-[#07f57e]/90 transition active:scale-95 shadow cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply & Type</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 gap-2 scrollbar-thin">
            {FONTS.map((font) => {
              const isSelected = activeFont.id === font.id;
              const convertedPreview = font.convert(previewText);

              return (
                <button
                  key={font.id}
                  id={`font-option-${font.id}`}
                  onClick={() => onSelectFont(font)}
                  className={`p-2.5 rounded-xl text-left transition flex flex-col justify-between border cursor-pointer ${
                    isSelected
                      ? 'bg-[#182820] border-[#07f57e] shadow-[0_0_12px_rgba(7,245,126,0.2)]'
                      : 'bg-[#18181e] border-[#25252e] hover:border-[#333340] hover:bg-[#1e1e26]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                      {font.name}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#07f57e] text-black flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-base text-white font-medium truncate py-0.5">
                    {convertedPreview}
                  </span>
                  <span className="text-[10px] text-neutral-500 mt-1">
                    {font.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. TEXT STYLE PANEL */}
      {activeTool === 'text-style' && (
        <div id="panel-text-style" className="flex flex-col h-full p-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#202026] mb-2">
            <div className="flex items-center gap-2">
              <button
                id="btn-style-tab-presets"
                onClick={() => setStyleTab('presets')}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition cursor-pointer ${
                  styleTab === 'presets'
                    ? 'bg-[#07f57e] text-black'
                    : 'bg-[#1e1e24] text-neutral-300 hover:bg-[#252530]'
                }`}
              >
                20 Style Presets
              </button>
              <button
                id="btn-style-tab-wrappers"
                onClick={() => setStyleTab('wrappers')}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition cursor-pointer ${
                  styleTab === 'wrappers'
                    ? 'bg-[#07f57e] text-black'
                    : 'bg-[#1e1e24] text-neutral-300 hover:bg-[#252530]'
                }`}
              >
                Border Decorators
              </button>
            </div>

            <span className="text-[10px] text-[#07f57e] font-mono">
              Click to Insert
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin">
            {styleTab === 'presets' ? (
              TEXT_STYLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  id={`style-preset-${preset.id}`}
                  onClick={() => {
                    onInsertText(preset.template);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-[#18181e] hover:bg-[#22222c] border border-[#25252e] hover:border-[#07f57e]/60 transition flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-white font-medium group-hover:text-[#07f57e] transition-colors">
                      {preset.template}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-0.5">
                      {preset.title}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-[#202028] group-hover:bg-[#07f57e] group-hover:text-black rounded text-neutral-400 font-bold transition">
                    + Type
                  </span>
                </button>
              ))
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {BORDER_DECORATORS.map((b) => {
                  const sampleDecorated = `${b.prefix}${previewText}${b.suffix}`;
                  return (
                    <button
                      key={b.id}
                      id={`border-decorator-${b.id}`}
                      onClick={() => {
                        onInsertText(sampleDecorated);
                        onClose();
                      }}
                      className="p-2.5 text-left rounded-xl bg-[#18181e] hover:bg-[#22222c] border border-[#25252e] hover:border-[#07f57e]/60 transition flex flex-col justify-between cursor-pointer"
                    >
                      <span className="text-[10px] text-neutral-400 uppercase font-mono">
                        {b.name}
                      </span>
                      <span className="text-xs text-white my-1 font-medium truncate">
                        {sampleDecorated}
                      </span>
                      <span className="text-[10px] text-[#07f57e] font-semibold">
                        Insert Decorated
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. EMOJI & EMOTICON PANEL */}
      {activeTool === 'emoji' && (
        <div id="panel-emoji-selection" className="flex flex-col h-full p-2">
          {/* Search + Clear + Return to Keys Header */}
          <div className="flex items-center gap-2 pb-1.5 border-b border-[#202026] mb-1">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                id="emoji-search-input"
                type="text"
                value={emojiSearch}
                onChange={(e) => setEmojiSearch(e.target.value)}
                placeholder="Search emoji (smile, heart, fire, cat)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#18181e] text-white rounded-lg border border-[#25252e] focus:border-[#07f57e] outline-none"
              />
            </div>
            {emojiSearch && (
              <button
                onClick={() => setEmojiSearch('')}
                className="text-[11px] text-neutral-400 hover:text-white px-2 py-1 rounded bg-[#1e1e24] cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              id="btn-emoji-back-to-abc"
              onClick={onClose}
              className="px-2.5 py-1.5 rounded-lg bg-[#202026] hover:bg-[#282834] text-[#07f57e] text-xs font-bold border border-[#2e2e3a] active:scale-95 transition cursor-pointer flex items-center gap-1"
              title="Return to letter keys"
            >
              <span>ABC</span>
            </button>
          </div>

          {/* Category Tabs: Recents, Kaomoji, and Emojis */}
          {!emojiSearch && (
            <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-1 scrollbar-none">
              {/* Recent / Favorites Tab */}
              <button
                id="emoji-cat-tab-recent"
                onClick={() => setSelectedEmojiCat('recent')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer shrink-0 ${
                  selectedEmojiCat === 'recent'
                    ? 'bg-[#07f57e] text-black shadow'
                    : 'bg-[#18181e] hover:bg-[#22222a] text-neutral-300'
                }`}
                title="Recent & Frequently Used"
              >
                <Clock className="w-3 h-3" />
                <span>Recent</span>
              </button>

              {/* Kaomoji Tab */}
              <button
                id="emoji-cat-tab-kaomoji"
                onClick={() => setSelectedEmojiCat('kaomoji')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer shrink-0 ${
                  selectedEmojiCat === 'kaomoji'
                    ? 'bg-[#07f57e] text-black shadow'
                    : 'bg-[#18181e] hover:bg-[#22222a] text-neutral-300'
                }`}
                title="Cute Kaomoji & Text Faces"
              >
                <span>^_^</span>
                <span>Faces</span>
              </button>

              {/* Standard Emoji Categories */}
              {EMOJI_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  id={`emoji-cat-tab-${cat.id}`}
                  onClick={() => setSelectedEmojiCat(cat.id)}
                  className={`px-2 py-0.5 rounded-lg text-sm transition cursor-pointer shrink-0 ${
                    selectedEmojiCat === cat.id
                      ? 'bg-[#07f57e] text-black shadow'
                      : 'bg-[#18181e] hover:bg-[#22222a] text-white'
                  }`}
                  title={cat.name}
                >
                  {cat.icon}
                </button>
              ))}
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
            {/* 1. Search Results */}
            {emojiSearch.trim() ? (
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 content-start">
                {(() => {
                  const searchResults = searchEmojis(emojiSearch);
                  if (searchResults.length === 0) {
                    return (
                      <div className="col-span-full text-center py-6 text-xs text-neutral-400">
                        No emojis found for "{emojiSearch}". Try searching "smile", "love", "cat", "fire"...
                      </div>
                    );
                  }
                  return searchResults.map((emoji, idx) => (
                    <button
                      key={`search-${emoji}-${idx}`}
                      id={`emoji-search-result-${idx}`}
                      onClick={() => handleEmojiClick(emoji)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xl hover:bg-[#202028] active:scale-125 transition cursor-pointer hover:scale-110"
                    >
                      {emoji}
                    </button>
                  ));
                })()}
              </div>
            ) : selectedEmojiCat === 'recent' ? (
              /* 2. Recent Emojis Grid */
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Frequently Used & Favorites ({recentEmojis.length})
                  </span>
                  <span className="text-[10px] text-[#07f57e]">Tap any to add to text</span>
                </div>
                <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 content-start">
                  {recentEmojis.map((emoji, idx) => (
                    <button
                      key={`recent-${emoji}-${idx}`}
                      id={`emoji-recent-${idx}`}
                      onClick={() => handleEmojiClick(emoji)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xl hover:bg-[#202028] active:scale-125 transition cursor-pointer hover:scale-110"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ) : selectedEmojiCat === 'kaomoji' ? (
              /* 3. Kaomoji Groups */
              <div className="space-y-2 pb-1">
                {KAOMOJI_GROUPS.map((group) => (
                  <div key={group.id} className="space-y-1">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      {group.name}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.emojis.map((kaomoji, idx) => (
                        <button
                          key={`${group.id}-${idx}`}
                          id={`kaomoji-${group.id}-${idx}`}
                          onClick={() => handleEmojiClick(kaomoji + ' ')}
                          className="px-2.5 py-1.5 rounded-lg bg-[#18181e] hover:bg-[#252530] active:bg-[#07f57e] active:text-black text-white text-xs font-mono transition active:scale-95 cursor-pointer border border-[#252530]"
                        >
                          {kaomoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* 4. Standard Emoji Category Grid */
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 content-start">
                {(() => {
                  const currentCategory = EMOJI_CATEGORIES.find((c) => c.id === selectedEmojiCat);
                  const emojis = currentCategory ? currentCategory.emojis : EMOJI_CATEGORIES[0].emojis;
                  return emojis.map((emoji, idx) => (
                    <button
                      key={`${emoji}-${idx}`}
                      id={`emoji-item-${idx}`}
                      onClick={() => handleEmojiClick(emoji)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xl hover:bg-[#202028] active:scale-125 transition cursor-pointer hover:scale-110"
                    >
                      {emoji}
                    </button>
                  ));
                })()}
              </div>
            )}
          </div>

          {/* Bottom Gboard-style Native Emoji Controls Bar: ABC, Space, Backspace, Enter */}
          <div className="flex items-center gap-1.5 pt-1.5 border-t border-[#202026] mt-1 shrink-0">
            {/* Switch back to standard QWERTY letter keys */}
            <button
              id="emoji-bar-key-abc"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#07f57e] hover:bg-[#07f57e]/90 text-black font-extrabold text-xs flex items-center justify-center gap-1 transition active:scale-95 shadow cursor-pointer"
              title="Return to Letter Keys"
            >
              <span>ABC</span>
            </button>

            {/* Space Key */}
            <button
              id="emoji-bar-key-space"
              onClick={() => {
                if (onSpace) onSpace();
                else onInsertText(' ');
              }}
              className="flex-1 py-2 rounded-lg bg-[#202026] hover:bg-[#282834] text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#2e2e3a] transition active:scale-95 cursor-pointer"
              title="Add Space"
            >
              <SpaceIcon className="w-3.5 h-3.5 text-[#07f57e]" />
              <span className="text-neutral-300">Space</span>
            </button>

            {/* Backspace Key */}
            <button
              id="emoji-bar-key-backspace"
              onClick={() => {
                if (onBackspace) onBackspace();
              }}
              className="px-3.5 py-2 rounded-lg bg-[#202026] hover:bg-[#282834] text-white text-xs font-semibold flex items-center justify-center border border-[#2e2e3a] transition active:scale-95 cursor-pointer"
              title="Delete last emoji"
            >
              <Delete className="w-4 h-4 text-neutral-200" />
            </button>

            {/* Enter Key */}
            <button
              id="emoji-bar-key-enter"
              onClick={() => {
                if (onEnter) onEnter();
                else onInsertText('\n');
              }}
              className="px-3.5 py-2 rounded-lg bg-[#07f57e] hover:bg-[#07f57e]/90 text-black font-extrabold text-xs flex items-center justify-center gap-1 transition active:scale-95 shadow cursor-pointer"
              title={inputMode === 'send' ? 'Send' : 'Enter'}
            >
              {inputMode === 'send' ? (
                <span>Send ➔</span>
              ) : (
                <CornerDownLeft className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      )}


      {/* 4. CLIPBOARD PANEL */}
      {activeTool === 'clipboard' && (
        <div id="panel-clipboard" className="flex flex-col h-full p-2.5">
          {/* Quick Action Buttons Row: Select All, Copy, Cut, Paste */}
          <div className="grid grid-cols-4 gap-1.5 pb-2 border-b border-[#202026] mb-2">
            <button
              id="clip-action-select-all"
              onClick={onSelectAll}
              className="py-1.5 px-2 bg-[#202028] hover:bg-[#282834] rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1 cursor-pointer transition active:scale-95"
            >
              <CheckCheck className="w-3.5 h-3.5 text-[#07f57e]" />
              <span>Select All</span>
            </button>
            <button
              id="clip-action-copy"
              onClick={onCopy}
              className="py-1.5 px-2 bg-[#202028] hover:bg-[#282834] rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1 cursor-pointer transition active:scale-95"
            >
              <Copy className="w-3.5 h-3.5 text-[#07f57e]" />
              <span>Copy</span>
            </button>
            <button
              id="clip-action-cut"
              onClick={onCut}
              className="py-1.5 px-2 bg-[#202028] hover:bg-[#282834] rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1 cursor-pointer transition active:scale-95"
            >
              <Scissors className="w-3.5 h-3.5 text-[#07f57e]" />
              <span>Cut</span>
            </button>
            <button
              id="clip-action-paste"
              onClick={onPaste}
              className="py-1.5 px-2 bg-[#07f57e] hover:bg-[#07f57e]/90 rounded-lg text-xs font-bold text-black flex items-center justify-center gap-1 cursor-pointer transition active:scale-95 shadow"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paste</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-neutral-300">
              Saved Clips ({clipboardHistory.length})
            </span>
            {clipboardHistory.length > 0 && (
              <button
                id="btn-clear-clipboard"
                onClick={onClearClipboard}
                className="text-[11px] text-neutral-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
            {clipboardHistory.length > 0 ? (
              clipboardHistory.map((clip, idx) => (
                <button
                  key={`${clip}-${idx}`}
                  id={`clip-history-item-${idx}`}
                  onClick={() => {
                    onInsertText(clip);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-[#18181e] hover:bg-[#202028] border border-[#25252e] hover:border-[#07f57e]/60 transition flex items-center justify-between group cursor-pointer"
                >
                  <span className="text-xs text-white truncate max-w-[80%]">
                    {clip}
                  </span>
                  <span className="text-[10px] text-[#07f57e] font-mono group-hover:underline">
                    Insert
                  </span>
                </button>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 py-6">
                <FileText className="w-8 h-8 mb-2 opacity-40 text-neutral-400" />
                <span className="text-xs">No clipboard items yet</span>
                <span className="text-[10px] text-neutral-500 mt-0.5">
                  Select text and press Copy/Cut to store clips here
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. HELP PANEL */}
      {activeTool === 'help' && (
        <div id="panel-help" className="flex flex-col h-full p-3 overflow-y-auto scrollbar-thin">
          <div className="flex items-center gap-2 pb-2 border-b border-[#202026] mb-2">
            <Info className="w-4 h-4 text-[#07f57e]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              X Board Keyboard Shortcuts & Rules
            </h4>
          </div>

          <div className="space-y-2 text-xs text-neutral-300">
            <div className="p-2 rounded-lg bg-[#18181e] border border-[#22222a]">
              <span className="font-bold text-[#07f57e] block mb-0.5">
                ⇧ Shift Button Key Functions
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-neutral-400 text-[11px]">
                <li><strong className="text-white">1 Click:</strong> First letter uppercase only (Title case)</li>
                <li><strong className="text-white">Double Click:</strong> Uppercase Lock (Caps Lock 🔒)</li>
                <li>Click again to revert to lowercase</li>
              </ul>
            </div>

            <div className="p-2 rounded-lg bg-[#18181e] border border-[#22222a]">
              <span className="font-bold text-[#07f57e] block mb-0.5">
                ✂️ Text Selection & Deletion
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-neutral-400 text-[11px]">
                <li>Use <strong className="text-white">Select All</strong> to highlight the complete text</li>
                <li>Press <strong className="text-white">Backspace (⌫)</strong> while selected to clear everything instantly</li>
                <li>Copy & Cut store clips in the Clipboard history tab</li>
              </ul>
            </div>

            <div className="p-2 rounded-lg bg-[#18181e] border border-[#22222a]">
              <span className="font-bold text-[#07f57e] block mb-0.5">
                ⌨️ Android 8.0+ Oreo (API 26+) Specification
              </span>
              <p className="text-[11px] text-neutral-400">
                Space button displays <strong className="text-white">X Board</strong>. Enter, Space, and Shift buttons are styled in signature <strong className="text-[#07f57e]">#07f57e</strong> neon green.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. SOUND & HAPTICS PANEL */}
      {activeTool === 'sound' && (
        <div id="panel-sound" className="flex flex-col h-full p-3 justify-center items-center">
          <div className="w-full max-w-sm bg-[#18181e] p-4 rounded-2xl border border-[#25252e] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#202028] text-[#07f57e]">
                  {isSoundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Keyboard Click Sounds</span>
                  <span className="text-[10px] text-neutral-400">Mechanical audio synthesized with Web Audio API</span>
                </div>
              </div>
              <button
                id="btn-toggle-sound-switch"
                onClick={onToggleSound}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  isSoundOn ? 'bg-[#07f57e]' : 'bg-[#282832]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-black absolute top-0.5 transition-transform ${
                    isSoundOn ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#25252e]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#202028] text-[#07f57e]">
                  <Vibrate className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Haptic Feedback Vibration</span>
                  <span className="text-[10px] text-neutral-400">10ms physical key vibration response</span>
                </div>
              </div>
              <button
                id="btn-toggle-haptics-switch"
                onClick={onToggleHaptics}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  isHapticsOn ? 'bg-[#07f57e]' : 'bg-[#282832]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-black absolute top-0.5 transition-transform ${
                    isHapticsOn ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
