package app.src.main.xboard.sinhala

import android.content.Context
import android.content.SharedPreferences

/**
 * Word Dictionary Helper for X Board
 * Stores learned words automatically and generates real-time suggestions
 */
class WordDictionary(context: Context) {

    private val prefs: SharedPreferences = context.getSharedPreferences("xboard_dict", Context.MODE_PRIVATE)
    private val memoryWords = mutableSetOf(
        "the", "and", "you", "that", "was", "for", "are", "with", "his", "they",
        "have", "this", "from", "one", "had", "word", "what", "some", "we", "can",
        "out", "other", "were", "all", "there", "when", "up", "use", "your", "how",
        "said", "each", "she", "which", "do", "their", "time", "if", "will", "way",
        "about", "many", "then", "them", "write", "would", "like", "so", "these", "her",
        "long", "make", "thing", "see", "him", "two", "has", "look", "more", "day",
        "could", "go", "come", "did", "number", "sound", "no", "most", "people", "my",
        "over", "know", "water", "than", "call", "first", "who", "may", "down", "side",
        "been", "now", "find", "any", "new", "work", "part", "take", "get", "place",
        "made", "live", "where", "after", "back", "little", "only", "round", "man", "year",
        "came", "show", "every", "good", "me", "give", "our", "under", "name", "very",
        "through", "just", "form", "sentence", "great", "think", "say", "help", "low", "line",
        "differ", "turn", "cause", "much", "mean", "before", "move", "right", "boy", "old",
        "too", "same", "tell", "does", "set", "three", "want", "air", "well", "also",
        "play", "small", "end", "put", "home", "read", "hand", "port", "large", "spell",
        "add", "even", "land", "here", "must", "big", "high", "such", "follow", "act",
        "why", "ask", "men", "change", "went", "light", "kind", "off", "need", "house",
        "picture", "try", "us", "again", "animal", "point", "mother", "world", "near", "build",
        "self", "earth", "father", "head", "stand", "own", "page", "should", "country", "found",
        "answer", "school", "grow", "study", "still", "learn", "plant", "cover", "food", "sun",
        "four", "between", "state", "keep", "eye", "never", "last", "let", "thought", "city",
        "tree", "cross", "farm", "hard", "start", "might", "story", "saw", "far", "sea",
        "draw", "left", "late", "run", "don't", "while", "press", "close", "night", "real",
        "life", "few", "north", "open", "seem", "together", "next", "white", "children", "begin",
        "got", "walk", "example", "ease", "paper", "group", "always", "music", "those", "both",
        "mark", "often", "letter", "until", "mile", "river", "car", "feet", "care", "second"
    )

    init {
        val savedWords = prefs.getStringSet("custom_words", emptySet()) ?: emptySet()
        memoryWords.addAll(savedWords)
    }

    /**
     * Auto-save typed words
     */
    fun recordTypedWord(word: String) {
        val clean = word.trim().lowercase()
        if (clean.length > 1 && clean.all { it.isLetter() }) {
            memoryWords.add(clean)
            prefs.edit().putStringSet("custom_words", memoryWords).apply()
        }
    }

    /**
     * Auto-suggest words based on active prefix
     */
    fun getSuggestions(prefix: String, limit: Int = 4): List<String> {
        val clean = prefix.trim().lowercase()
        if (clean.isEmpty()) return emptyList()

        return memoryWords
            .filter { it.startsWith(clean) }
            .sortedWith(compareBy({ it.length }, { it }))
            .take(limit)
    }
}
