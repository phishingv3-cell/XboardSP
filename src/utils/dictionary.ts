/**
 * Word dictionary with auto-save learned words & real-time auto-suggestions
 */

const DEFAULT_COMMON_WORDS = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'hello', 'welcome', 'morning', 'keyboard', 'awesome', 'super', 'thanks', 'please',
  'friend', 'great', 'love', 'happy', 'cool', 'beautiful', 'style', 'font', 'emoji',
  'subha', 'udasana', 'brother', 'today', 'tomorrow', 'night', 'nice', 'perfect'
];

const STORAGE_KEY = 'xboard_learned_words_v1';

class DictionaryService {
  private learnedWords: Set<string> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      if (typeof window === 'undefined') return;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const list: string[] = JSON.parse(raw);
        list.forEach((w) => this.learnedWords.add(w.toLowerCase().trim()));
      }
    } catch {
      // Ignore local storage error
    }
  }

  private saveToStorage() {
    try {
      if (typeof window === 'undefined') return;
      const list = Array.from(this.learnedWords);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 500)));
    } catch {
      // Ignore local storage error
    }
  }

  /**
   * Auto-saves typed word into dictionary
   */
  public saveWord(word: string) {
    const cleaned = word.trim().replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (cleaned.length >= 2 && cleaned.length <= 25) {
      this.learnedWords.add(cleaned);
      this.saveToStorage();
    }
  }

  /**
   * Learn from a full sentence/paragraph
   */
  public learnFromText(text: string) {
    const words = text.split(/[\s,.;:!?\n\r"()]+/);
    words.forEach((w) => this.saveWord(w));
  }

  /**
   * Get suggestions for current prefix
   */
  public getSuggestions(prefix: string, maxCount = 5): string[] {
    const cleanPrefix = prefix.trim().toLowerCase();
    if (!cleanPrefix) {
      return ['hello', 'the', 'I', 'good', 'thanks'].slice(0, maxCount);
    }

    const matches: string[] = [];

    // Prioritize learned words first
    for (const w of this.learnedWords) {
      if (w.startsWith(cleanPrefix) && w !== cleanPrefix) {
        matches.push(w);
        if (matches.length >= maxCount) break;
      }
    }

    // Then common words
    if (matches.length < maxCount) {
      for (const w of DEFAULT_COMMON_WORDS) {
        const lw = w.toLowerCase();
        if (lw.startsWith(cleanPrefix) && lw !== cleanPrefix && !matches.includes(lw)) {
          matches.push(lw);
          if (matches.length >= maxCount) break;
        }
      }
    }

    // Preserve original capitalization if input was capitalized
    const isCapitalized = prefix.length > 0 && prefix[0] === prefix[0].toUpperCase();
    return matches.map((m) => (isCapitalized ? m.charAt(0).toUpperCase() + m.slice(1) : m));
  }

  public getLearnedWordCount(): number {
    return this.learnedWords.size;
  }

  public clearLearnedWords() {
    this.learnedWords.clear();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
}

export const dictionaryService = new DictionaryService();

export const getDictionarySuggestions = (prefix: string, maxCount = 5): string[] => {
  return dictionaryService.getSuggestions(prefix, maxCount);
};

export const saveWordToDictionary = (word: string): void => {
  dictionaryService.saveWord(word);
};
