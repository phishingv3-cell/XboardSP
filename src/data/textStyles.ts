/**
 * Text Decoration Styles specified by user
 */

export interface TextStylePreset {
  id: string;
  title: string;
  template: string; // The exact requested style
  category: string;
}

export const TEXT_STYLE_PRESETS: TextStylePreset[] = [
  {
    id: 'style-1',
    title: 'Cherry Blossom Dots',
    template: '🌸 සුභ •~°• උදෑසනක් •~°• 🌸',
    category: 'Floral & Nature'
  },
  {
    id: 'style-2',
    title: 'Wing Sparkle Boxed',
    template: '꧁•✨• සුභ 🅢︎ උදෑසනක් •✨•꧂',
    category: 'Decorative Wings'
  },
  {
    id: 'style-3',
    title: 'Hibiscus Cursive',
    template: '🌺 𝓤𝓼𝓾𝓫𝓪 𝓤𝓭𝓪𝓼𝓪𝓷𝓪𝓴 🌺',
    category: 'Floral & Nature'
  },
  {
    id: 'style-4',
    title: 'Vintage Stars Swirl',
    template: '★·.·´¯`·.·★ සුභ උදෑසනක් ★·.·´¯`·.·★',
    category: 'Vintage & Symbols'
  },
  {
    id: 'style-5',
    title: 'Butterfly Sparkle',
    template: '🦋✨ සුභ 🅤 උදෑසනක් ✨🦋',
    category: 'Butterflies & Magic'
  },
  {
    id: 'style-6',
    title: 'Sparkle Heart Script',
    template: '💖 𝓈𝓊𝒷𝒽𝒶 𝓊𝒹𝒶𝓈𝒶𝓃𝒶𝓀 💖',
    category: 'Hearts & Love'
  },
  {
    id: 'style-7',
    title: 'Double Cherry Ribbon',
    template: '🌸ꗥ～ꗥ🌸 සුභ උදෑසනක් 🌸ꗥ～ꗥ🌸',
    category: 'Floral & Nature'
  },
  {
    id: 'style-8',
    title: 'Herbal Underline Boxes',
    template: '🌿 (̲̅s̲̅)(̲̅u̲̅)(̲̅b̲̅)(̲̅h̲̅) උදෑසනක් 🌿',
    category: 'Frames & Boxes'
  },
  {
    id: 'style-9',
    title: 'Sparkle Gothic',
    template: '✨ 𝕾𝖚𝖍𝖆 𝖀𝖉𝖆𝖘𝖆𝖓𝖆𝖐 ✨',
    category: 'Gothic & Magic'
  },
  {
    id: 'style-10',
    title: 'Dizzy Superscript',
    template: '💫 ˢᵘᵇʰᵃ ᵘᵈᵃˢᵃⁿᵃᵏ 💫',
    category: 'Cosmic & Stars'
  },
  {
    id: 'style-11',
    title: 'Royal Crown Mixed',
    template: '👑 සුභ 🅢︎🅤︎ᗷ︎𝓗︎ උදෑසනක් 👑',
    category: 'Royal & Prestige'
  },
  {
    id: 'style-12',
    title: 'Tulip Sans Bold',
    template: '🌷 𝐒𝐮𝐛𝐡𝐚 𝐔𝐝𝐚𝐬𝐚𝐧𝐚𝐤 🌷',
    category: 'Floral & Nature'
  },
  {
    id: 'style-13',
    title: 'Sunflower Tiny',
    template: '🌻 ˢᵘᵇʰᵃ ᵘᵈᵃˢᵃⁿᵃᵏ 🌻',
    category: 'Floral & Nature'
  },
  {
    id: 'style-14',
    title: 'Blossom Bold Cursive',
    template: '🌸 𝓢𝓾𝓫𝓱𝓪 𝓤𝓭𝓪𝓼𝓪𝓷𝓪𝓴 🌸',
    category: 'Floral & Nature'
  },
  {
    id: 'style-15',
    title: 'Golden Star Squared',
    template: '🌟 🅂🅄🄱🄷🄰 🅄🄳🄰🅂🄰🄽🄰🄺 🌟',
    category: 'Frames & Boxes'
  },
  {
    id: 'style-16',
    title: 'Four Leaf Clover',
    template: '🍀 𝓢𝓾𝓫𝓱𝓪 𝓤𝓭𝓪𝓼𝓪𝓷𝓪𝓴 🍀',
    category: 'Floral & Nature'
  },
  {
    id: 'style-17',
    title: 'Hibiscus Asterisks',
    template: '🌺 * සුභ උදෑසනක් * 🌺',
    category: 'Floral & Nature'
  },
  {
    id: 'style-18',
    title: 'New Sparkle Script',
    template: '✨ 𝓝𝓮𝔀 𝓢𝓾𝓫𝓱𝓪 𝓤𝓭𝓪𝓼𝓪𝓷𝓪𝓴 ✨',
    category: 'Butterflies & Magic'
  },
  {
    id: 'style-19',
    title: 'Red Rose Italic',
    template: '🌹 𝑆𝑢𝑏ℎ𝑎 𝑈𝑑𝓪𝑠𝑎𝑛𝑎𝑘 🌹',
    category: 'Floral & Nature'
  },
  {
    id: 'style-20',
    title: 'Dizzy Star Script',
    template: '💫 𝓢𝓾𝓫𝓱𝓪 𝓤𝓭𝓪𝓼𝓪𝓷𝓪𝓴 💫',
    category: 'Cosmic & Stars'
  }
];

// Decorative borders for wrapping user text dynamically
export interface BorderDecorator {
  id: string;
  name: string;
  prefix: string;
  suffix: string;
}

export const BORDER_DECORATORS: BorderDecorator[] = [
  { id: 'b1', name: 'Sakura Wings', prefix: '🌸 •~°• ', suffix: ' •~°• 🌸' },
  { id: 'b2', name: 'Angel Wings', prefix: '꧁•✨• ', suffix: ' •✨•꧂' },
  { id: 'b3', name: 'Sparkle Star', prefix: '✨ ｢', suffix: '｣ ✨' },
  { id: 'b4', name: 'Butterfly Glow', prefix: '🦋✨ ', suffix: ' ✨🦋' },
  { id: 'b5', name: 'Love Hearts', prefix: '💖『 ', suffix: ' 』💖' },
  { id: 'b6', name: 'Royal Crown', prefix: '👑 ༒ ', suffix: ' ༒ 👑' },
  { id: 'b7', name: 'Four Leaf Luck', prefix: '🍀 ⟦ ', suffix: ' ⟧ 🍀' },
  { id: 'b8', name: 'Shooting Star', prefix: '💫 ★ ', suffix: ' ★ 💫' },
  { id: 'b9', name: 'Roses Bouquet', prefix: '🌹 ༺ ', suffix: ' ༻ 🌹' },
  { id: 'b10', name: 'Japanese Sparkle', prefix: '✧⁠◝⁠(⁠⁰⁠▿⁠⁰⁠)⁠◜⁠✧ ', suffix: ' ✧' },
];
