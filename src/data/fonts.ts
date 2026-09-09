/**
 * 24 Unicode Fancy Font Mappings requested by user
 */

export interface FontStyle {
  id: string;
  name: string;
  example: string;
  category: string;
  convert: (text: string) => string;
}

// Helper to map characters with offset or lookup
function mapAlphabet(text: string, upperStart: number, lowerStart: number, numStart?: number): string {
  return text
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCodePoint(upperStart + (code - 65));
      }
      if (code >= 97 && code <= 122) {
        return String.fromCodePoint(lowerStart + (code - 97));
      }
      if (numStart !== undefined && code >= 48 && code <= 57) {
        return String.fromCodePoint(numStart + (code - 48));
      }
      return char;
    })
    .join('');
}

function mapWithDict(text: string, dict: Record<string, string>): string {
  return text
    .split('')
    .map((char) => dict[char] || dict[char.toLowerCase()] || char)
    .join('');
}

// 1. Sans Bold: 𝖧𝖾𝗅𝗅𝗈 (Mathematical Sans-Serif Bold 0x1D5D4 / 0x1D5EE)
const sansBold = (t: string) => mapAlphabet(t, 0x1d5d4, 0x1d5ee, 0x1d7ec);

// 2. Sans Italic: 𝘏𝘦𝘭𝘭𝘰 (Mathematical Sans-Serif Italic 0x1D608 / 0x1D622)
const sansItalic = (t: string) => mapAlphabet(t, 0x1d608, 0x1d622);

// 3. Bold: 𝗛𝗲𝗹𝗹𝗼 (Mathematical Sans-Serif Bold 0x1D5D4 or Serif Bold 0x1D400)
const bold = (t: string) => mapAlphabet(t, 0x1d400, 0x1d41a, 0x1d7ce);

// 4. Italic: 𝐻𝑒𝑙𝑙𝑜 (Mathematical Italic 0x1D434 / 0x1D44E)
const italic = (t: string) => {
  return t
    .split('')
    .map((c) => {
      if (c === 'h') return 'ℎ'; // special unicode exception
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d434 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d44e + (code - 97));
      return c;
    })
    .join('');
};

// 5. Script / Cursive: 𝓗𝓮𝓵𝓵𝓸 (Mathematical Bold Script 0x1D4D0 / 0x1D4EA)
const scriptCursive = (t: string) => mapAlphabet(t, 0x1d4d0, 0x1d4ea);

// 6. Double-struck / Outline: ℍ𝕖𝕝𝕝𝕠 (0x1D538 / 0x1D552)
const doubleStruckDict: Record<string, string> = {
  C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ',
  0: '𝟘', 1: '𝟙', 2: '𝟚', 3: '𝟛', 4: '𝟜', 5: '𝟝', 6: '𝟞', 7: '𝟟', 8: '𝟠', 9: '𝟡'
};
const doubleStruck = (t: string) => {
  return t
    .split('')
    .map((c) => {
      if (doubleStruckDict[c]) return doubleStruckDict[c];
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d538 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d552 + (code - 97));
      return c;
    })
    .join('');
};

// 7. Heavy Sans: 𝗛𝗲𝗹𝗹𝗼 (Mathematical Sans-Serif Bold 0x1D5D4)
const heavySans = (t: string) => mapAlphabet(t, 0x1d5d4, 0x1d5ee, 0x1d7ec);

// 8. Monospace: 𝙷𝚎𝚕𝚕𝚘 (0x1D670 / 0x1D68A)
const monospace = (t: string) => mapAlphabet(t, 0x1d670, 0x1d68a, 0x1d7f6);

// 9. Squared / Boxed: 🄷🄴🄻🄻🄾 (0x1F130 / 0x1F14F)
const squared = (t: string) => {
  return t
    .split('')
    .map((c) => {
      const code = c.toUpperCase().charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCodePoint(0x1f130 + (code - 65));
      }
      return c;
    })
    .join('');
};

// 10. Circled: Ⓗⓔⓛⓛⓞ (0x24B6 / 0x24D0)
const circled = (t: string) => {
  return t
    .split('')
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
      if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
      if (code === 48) return '⓪';
      return c;
    })
    .join('');
};

// 11. Small Caps / Special: Ɦⱸⱡⱡꝿ
const smallCapsSpecialDict: Record<string, string> = {
  A: 'Ɬ', B: 'Ꞵ', C: 'Ꞓ', D: 'Ꝺ', E: 'ⱸ', F: 'Ꞙ', G: 'Ꞡ', H: 'Ɦ', I: 'Ɪ', J: 'Ʝ',
  K: 'Ꞣ', L: 'ⱡ', M: 'Ɱ', N: 'Ꞑ', O: 'ꝿ', P: 'Ꝑ', Q: 'Ꝗ', R: 'Ɽ', S: 'Ꞩ', T: 'Ʇ',
  U: 'Ꞟ', V: 'ⱴ', W: 'Ⱳ', X: 'Ꭓ', Y: 'Ɥ', Z: 'Ɀ',
  a: 'Ɬ', b: 'Ꞵ', c: 'Ꞓ', d: 'Ꝺ', e: 'ⱸ', f: 'Ꞙ', g: 'Ꞡ', h: 'Ɦ', i: 'Ɪ', j: 'Ʝ',
  k: 'Ꞣ', l: 'ⱡ', m: 'Ɱ', n: 'Ꞑ', o: 'ꝿ', p: 'Ꝑ', q: 'Ꝗ', r: 'Ɽ', s: 'Ꞩ', t: 'Ʇ',
  u: 'Ꞟ', v: 'ⱴ', w: 'Ⱳ', x: 'Ꭓ', y: 'Ɥ', z: 'Ɀ'
};
const smallCapsSpecial = (t: string) => mapWithDict(t, smallCapsSpecialDict);

// 12. Small Caps: ʜᴇʟʟᴏ
const smallCapsDict: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ',
  k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ',
  u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ', I: 'ɪ', J: 'ᴊ',
  K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ',
  U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ'
};
const smallCaps = (t: string) => mapWithDict(t, smallCapsDict);

// 13. Gothic / Fraktur: 𝕳𝖊𝖑𝖑𝖔 (0x1D56C / 0x1D586)
const gothicDict: Record<string, string> = {
  C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ'
};
const gothicFraktur = (t: string) => {
  return t
    .split('')
    .map((c) => {
      if (gothicDict[c]) return gothicDict[c];
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d56c + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d586 + (code - 97));
      return c;
    })
    .join('');
};

// 14. Fancy Script: ℋℯ𝓁𝓁ℴ (0x1D49C / 0x1D4B6)
const fancyScriptDict: Record<string, string> = {
  B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ',
  e: 'ℯ', g: 'ℊ', o: 'ℴ'
};
const fancyScript = (t: string) => {
  return t
    .split('')
    .map((c) => {
      if (fancyScriptDict[c]) return fancyScriptDict[c];
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d49c + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d4b6 + (code - 97));
      return c;
    })
    .join('');
};

// 15. Lithe / Aesthetic: ꓧꗴꓡꓡꝏ
const litheDict: Record<string, string> = {
  A: 'ꓮ', B: 'ꓐ', C: 'ꓚ', D: 'ꓓ', E: 'ꗴ', F: 'ꓝ', G: 'ꓖ', H: 'ꓧ', I: 'ꓲ', J: 'ꓙ',
  K: 'ꓗ', L: 'ꓡ', M: 'ꓟ', N: 'ꓠ', O: 'ꝏ', P: 'ꓑ', Q: 'ꓚ', R: 'ꓣ', S: 'ꓢ', T: 'ꓔ',
  U: 'ꓴ', V: 'ꓦ', W: 'ꓪ', X: 'ꓫ', Y: 'ꓬ', Z: 'ꓜ',
  a: 'ꓮ', b: 'ꓐ', c: 'ꓚ', d: 'ꓓ', e: 'ꗴ', f: 'ꓝ', g: 'ꓖ', h: 'ꓧ', i: 'ꓲ', j: 'ꓙ',
  k: 'ꓗ', l: 'ꓡ', m: 'ꓟ', n: 'ꓠ', o: 'ꝏ', p: 'ꓑ', q: 'ꓚ', r: 'ꓣ', s: 'ꓢ', t: 'ꓔ',
  u: 'ꓴ', v: 'ꓦ', w: 'ꓪ', x: 'ꓫ', y: 'ꓬ', z: 'ꓜ'
};
const litheAesthetic = (t: string) => mapWithDict(t, litheDict);

// 16. Dark Gothic: 𝕯𝖊𝖑𝖑𝖔 (0x1D5A0 / 0x1D5BA Bold Fraktur)
const darkGothic = (t: string) => mapAlphabet(t, 0x1d56c, 0x1d586);

// 17. Sans Small: 𝖍𝖊𝖑𝖑𝖔
const sansSmall = (t: string) => mapAlphabet(t, 0x1d5d4, 0x1d5ee);

// 18. Decorated: ᕼ𝚎ᒪᒪṌ
const decoratedDict: Record<string, string> = {
  A: 'ᗩ', B: 'ᗷ', C: 'ᑕ', D: 'ᗪ', E: 'E', F: 'ᖴ', G: 'G', H: 'ᕼ', I: 'I', J: 'ᒍ',
  K: 'K', L: 'ᒪ', M: 'ᗰ', N: 'ᑎ', O: 'Ṍ', P: 'ᑭ', Q: 'ᑫ', R: 'ᖇ', S: 'ᔕ', T: 'T',
  U: 'ᑌ', V: 'ᐯ', W: 'ᗯ', X: '᙭', Y: 'Y', Z: 'ᘔ',
  a: 'ᗩ', b: 'ᗷ', c: 'ᑕ', d: 'ᗪ', e: '𝚎', f: 'ᖴ', g: 'g', h: 'ᕼ', i: 'i', j: 'ᒍ',
  k: 'k', l: 'ᒪ', m: 'ᗰ', n: 'ᑎ', o: 'Ṍ', p: 'ᑭ', q: 'ᑫ', r: 'ᖇ', s: 'ᔕ', t: 't',
  u: 'ᑌ', v: 'ᐯ', w: 'ᗯ', x: '᙭', y: 'y', z: 'ᘔ'
};
const decorated = (t: string) => mapWithDict(t, decoratedDict);

// 19. Medieval Style: Ƕell꙯
const medievalDict: Record<string, string> = {
  A: 'Ⱥ', B: 'Ƀ', C: 'Ȼ', D: 'Ð', E: 'Ɇ', F: 'Ꞙ', G: 'Ꞡ', H: 'Ƕ', I: 'Ɨ', J: 'Ɉ',
  K: 'Ꝁ', L: 'Ł', M: '₥', N: '₦', O: 'Ø', P: 'Ᵽ', Q: 'Ꝗ', R: 'Ɽ', S: 'Ꞩ', T: 'Ŧ',
  U: 'Ʉ', V: 'ⱴ', W: '₩', X: 'Ꭓ', Y: 'Ɏ', Z: 'Ƶ',
  a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j',
  k: 'k', l: 'l', m: 'm', n: 'n', o: '꙯o', p: 'p', q: 'q', r: 'r', s: 's', t: 't',
  u: 'u', v: 'v', w: 'w', x: 'x', y: 'y', z: 'z'
};
const medieval = (t: string) => {
  return t
    .split('')
    .map((c, i) => {
      if (i === t.length - 1 && /[a-z]/i.test(c)) return c + '꙯';
      return medievalDict[c] || c;
    })
    .join('');
};

// 20. Chinese-styled / Fancy: 卂ᗷᑕ
const chineseStyleDict: Record<string, string> = {
  A: '卂', B: 'ᗷ', C: 'ᑕ', D: 'ᗪ', E: '乇', F: '千', G: 'Ꮆ', H: '卄', I: '丨', J: 'ﾌ',
  K: 'Ҝ', L: 'ㄥ', M: '爪', N: '几', O: 'ㄖ', P: '尸', Q: 'Ɋ', R: '尺', S: '丂', T: 'ㄒ',
  U: 'ㄩ', V: 'ᐯ', W: '山', X: '乂', Y: 'ㄚ', Z: '乙',
  a: '卂', b: 'ᗷ', c: 'ᑕ', d: 'ᗪ', e: '乇', f: '千', g: 'Ꮆ', h: '卄', i: '丨', j: 'ﾌ',
  k: 'Ҝ', l: 'ㄥ', m: '爪', n: '几', o: 'ㄖ', p: '尸', q: 'Ɋ', r: '尺', s: '丂', t: 'ㄒ',
  u: 'ㄩ', v: 'ᐯ', w: '山', x: '乂', y: 'ㄚ', z: '乙'
};
const chineseStyle = (t: string) => mapWithDict(t, chineseStyleDict);

// 21. Accented: Äḃċ
const accentedDict: Record<string, string> = {
  A: 'Ä', B: 'Ḃ', C: 'Ċ', D: 'Ḋ', E: 'Ë', F: 'Ḟ', G: 'Ġ', H: 'Ḣ', I: 'Ï', J: 'Ĵ',
  K: 'Ḱ', L: 'Ĺ', M: 'Ṁ', N: 'Ṅ', O: 'Ö', P: 'Ṗ', Q: 'Q', R: 'Ṙ', S: 'Ṡ', T: 'Ṫ',
  U: 'Ü', V: 'Ṽ', W: 'Ẅ', X: 'Ẋ', Y: 'Ÿ', Z: 'Ż',
  a: 'ä', b: 'ḃ', c: 'ċ', d: 'ḋ', e: 'ë', f: 'ḟ', g: 'ġ', h: 'ḣ', i: 'ï', j: 'ĵ',
  k: 'ḱ', l: 'ĺ', m: 'ṁ', n: 'ṅ', o: 'ö', p: 'ṗ', q: 'q', r: 'ṙ', s: 'ṡ', t: 'ṫ',
  u: 'ü', v: 'ṽ', w: 'ẅ', x: 'ẋ', y: 'ÿ', z: 'ż'
};
const accented = (t: string) => mapWithDict(t, accentedDict);

// 22. Phonetic / IPA style: Ȟeᶅℓo
const phoneticDict: Record<string, string> = {
  A: 'ɐ', B: 'ʙ', C: 'ɕ', D: 'ɖ', E: 'ə', F: 'ɟ', G: 'ɠ', H: 'Ȟ', I: 'ɪ', J: 'ʝ',
  K: 'ɭ', L: 'ᶅ', M: 'ɯ', N: 'ɲ', O: 'ɵ', P: 'ɸ', Q: 'ʠ', R: 'ɹ', S: 'ʃ', T: 'ʈ',
  U: 'ʊ', V: 'ʋ', W: 'ʍ', X: 'χ', Y: 'ʎ', Z: 'ʐ',
  a: 'ɐ', b: 'ʙ', c: 'ɕ', d: 'ɖ', e: 'e', f: 'ɟ', g: 'ɠ', h: 'h', i: 'ɪ', j: 'ʝ',
  k: 'ɭ', l: 'ᶅ', m: 'ɯ', n: 'ɲ', o: 'o', p: 'ɸ', q: 'ʠ', r: 'ɹ', s: 'ʃ', t: 'ʈ',
  u: 'ʊ', v: 'ʋ', w: 'ʍ', x: 'χ', y: 'ʎ', z: 'ʐ'
};
const phonetic = (t: string) => mapWithDict(t, phoneticDict);

// 23. Strikethrough / Crossed: Ħɇłłø
const strikethroughDict: Record<string, string> = {
  A: 'Ⱥ', B: 'Ƀ', C: 'Ȼ', D: 'Đ', E: 'Ɇ', F: 'Ƒ', G: 'Ǥ', H: 'Ħ', I: 'Ɨ', J: 'Ɉ',
  K: 'Ꝁ', L: 'Ł', M: 'M̶', N: 'N̶', O: 'Ø', P: 'Ᵽ', Q: 'Q̶', R: 'Ɍ', S: 'S̶', T: 'Ŧ',
  U: 'Ʉ', V: 'V̶', W: 'W̶', X: 'X̶', Y: 'Ɏ', Z: 'Ƶ',
  a: 'a̶', b: 'ƀ', c: 'ȼ', d: 'đ', e: 'ɇ', f: 'f̶', g: 'ǥ', h: 'ħ', i: 'ɨ', j: 'ɉ',
  k: 'k̶', l: 'ł', m: 'm̶', n: 'n̶', o: 'ø', p: 'ᵽ', q: 'q̶', r: 'ɍ', s: 's̶', t: 'ŧ',
  u: 'ʉ', v: 'v̶', w: 'w̶', x: 'x̶', y: 'ɏ', z: 'ƶ'
};
const strikethrough = (t: string) => mapWithDict(t, strikethroughDict);

// 24. Unique Style: ꞪⴹᒪᒪꝊ
const uniqueStyleDict: Record<string, string> = {
  A: 'Ɬ', B: 'ᗷ', C: 'ᑕ', D: 'ᗪ', E: 'ⴹ', F: 'ᖴ', G: 'Ǥ', H: 'Ɦ', I: 'I', J: 'ᒍ',
  K: 'Ҝ', L: 'ᒪ', M: 'ᗰ', N: 'ᑎ', O: 'Ꝋ', P: 'ᑭ', Q: 'ᑫ', R: 'ᖇ', S: 'ᔕ', T: 'T',
  U: 'ᑌ', V: 'ᐯ', W: 'ᗯ', X: '᙭', Y: 'Y', Z: 'ᘔ',
  a: 'Ɬ', b: 'ᗷ', c: 'ᑕ', d: 'ᗪ', e: 'ⴹ', f: 'ᖴ', g: 'Ǥ', h: 'Ɦ', i: 'i', j: 'ᒍ',
  k: 'Ҝ', l: 'ᒪ', m: 'ᗰ', n: 'ᑎ', o: 'Ꝋ', p: 'ᑭ', q: 'ᑫ', r: 'ᖇ', s: 'ᔕ', t: 't',
  u: 'ᑌ', v: 'ᐯ', w: 'ᗯ', x: '᙭', y: 'y', z: 'ᘔ'
};
const uniqueStyle = (t: string) => mapWithDict(t, uniqueStyleDict);

export const FONTS: FontStyle[] = [
  { id: 'normal', name: 'Normal English', example: 'Hello', category: 'Standard', convert: (t) => t },
  { id: 'sans-bold', name: 'Sans Bold', example: '𝖧𝖾𝗅𝗅𝗈', category: 'Sans', convert: sansBold },
  { id: 'sans-italic', name: 'Sans Italic', example: '𝘏𝘦𝘭𝘭𝘰', category: 'Sans', convert: sansItalic },
  { id: 'bold', name: 'Bold', example: '𝗛𝗲𝗹𝗹𝗼', category: 'Emphasis', convert: bold },
  { id: 'italic', name: 'Italic', example: '𝐻𝑒𝑙𝑙𝑜', category: 'Emphasis', convert: italic },
  { id: 'script-cursive', name: 'Script / Cursive', example: '𝓗𝓮𝓵𝓵𝓸', category: 'Cursive', convert: scriptCursive },
  { id: 'double-struck', name: 'Double-struck / Outline', example: 'ℍ𝕖𝕝𝕝𝕠', category: 'Display', convert: doubleStruck },
  { id: 'heavy-sans', name: 'Heavy Sans', example: '𝗛𝗲𝗹𝗹𝗼', category: 'Sans', convert: heavySans },
  { id: 'monospace', name: 'Monospace', example: '𝙷𝚎𝚕𝗅𝚘', category: 'Code', convert: monospace },
  { id: 'squared', name: 'Squared / Boxed', example: '🄷🄴🄻🄻🄾', category: 'Boxed', convert: squared },
  { id: 'circled', name: 'Circled', example: 'Ⓗⓔⓛⓛⓞ', category: 'Circled', convert: circled },
  { id: 'small-caps-special', name: 'Small Caps / Special', example: 'Ɦⱸⱡⱡꝿ', category: 'Novelty', convert: smallCapsSpecial },
  { id: 'small-caps', name: 'Small Caps', example: 'ʜᴇʟʟᴏ', category: 'Typography', convert: smallCaps },
  { id: 'gothic-fraktur', name: 'Gothic / Fraktur', example: '𝕳𝖊𝖑𝖑𝖔', category: 'Gothic', convert: gothicFraktur },
  { id: 'fancy-script', name: 'Fancy Script', example: 'ℋℯ𝓁𝓁ℴ', category: 'Cursive', convert: fancyScript },
  { id: 'lithe-aesthetic', name: 'Lithe / Aesthetic', example: 'ꓧꗴꓡꓡꝏ', category: 'Aesthetic', convert: litheAesthetic },
  { id: 'dark-gothic', name: 'Dark Gothic', example: '𝕯𝖊𝖑𝖑𝖔', category: 'Gothic', convert: darkGothic },
  { id: 'sans-small', name: 'Sans Small', example: '𝖍𝖊𝖑𝖑𝖔', category: 'Sans', convert: sansSmall },
  { id: 'decorated', name: 'Decorated', example: 'ᕼ𝚎ᒪᒪṌ', category: 'Decorated', convert: decorated },
  { id: 'medieval', name: 'Medieval Style', example: 'Ƕell꙯', category: 'Vintage', convert: medieval },
  { id: 'chinese-style', name: 'Chinese-styled / Fancy', example: '卂ᗷᑕ', category: 'Novelty', convert: chineseStyle },
  { id: 'accented', name: 'Accented', example: 'Äḃċ', category: 'Decorated', convert: accented },
  { id: 'phonetic', name: 'Phonetic / IPA style', example: 'Ȟeᶅℓo', category: 'Novelty', convert: phonetic },
  { id: 'strikethrough', name: 'Strikethrough / Crossed', example: 'Ħɇłłø', category: 'Special', convert: strikethrough },
  { id: 'unique-style', name: 'Unique Style', example: 'ꞪⴹᒪᒪꝊ', category: 'Unique', convert: uniqueStyle },
];

export const convertWithFont = (text: string, fontId: string): string => {
  const font = FONTS.find((f) => f.id === fontId);
  return font ? font.convert(text) : text;
};
