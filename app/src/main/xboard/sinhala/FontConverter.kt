package app.src.main.xboard.sinhala

/**
 * Unicode 24 Fancy Font Converter for X Board
 * Complete mapping for all 24 requested font styles
 */
object FontConverter {

    fun convertText(text: String, fontId: String): String {
        return when (fontId) {
            "sans-bold" -> mapAlphabet(text, 0x1D5D4, 0x1D5EE, 0x1D7EC) // 𝖧𝖾𝗅𝗅𝗈 (Sans Bold)
            "sans-italic" -> mapAlphabet(text, 0x1D608, 0x1D622)         // 𝘏𝘦𝘭𝘭𝘰 (Sans Italic)
            "bold" -> mapAlphabet(text, 0x1D400, 0x1D41A, 0x1D7CE)        // 𝗛𝗲𝗹𝗹𝗼 (Bold)
            "italic" -> mapItalic(text)                                  // 𝐻𝑒𝑙𝑙𝑜 (Italic)
            "script-cursive" -> mapAlphabet(text, 0x1D4D0, 0x1D4EA)      // 𝓗𝓮𝓵𝓵𝓸 (Script / Cursive)
            "double-struck" -> mapDoubleStruck(text)                     // ℍ𝕖𝕝𝕝𝕠 (Double-struck)
            "heavy-sans" -> mapAlphabet(text, 0x1D5D4, 0x1D5EE, 0x1D7EC) // 𝗛𝗲𝗹𝗹𝗼 (Heavy Sans)
            "monospace" -> mapAlphabet(text, 0x1D670, 0x1D68A, 0x1D7F6)  // 𝙷𝚎𝚕𝗅𝚘 (Monospace)
            "squared" -> mapSquared(text)                                // 🄷🄴🄻🄻🄾 (Squared / Boxed)
            "circled" -> mapCircled(text)                                // Ⓗⓔⓛⓛⓞ (Circled)
            "small-caps-special" -> mapDict(text, smallCapsSpecialMap)   // Ɦⱸⱡⱡꝿ (Small Caps / Special)
            "small-caps" -> mapDict(text, smallCapsMap)                  // ʜᴇʟʟᴏ (Small Caps)
            "gothic-fraktur" -> mapGothic(text)                          // 𝕳𝖊𝖑𝖑𝖔 (Gothic / Fraktur)
            "fancy-script" -> mapFancyScript(text)                      // ℋℯ𝓁𝓁ℴ (Fancy Script)
            "lithe-aesthetic" -> mapDict(text, litheMap)                 // ꓧꗴꓡꓡꝏ (Lithe / Aesthetic)
            "dark-gothic" -> mapAlphabet(text, 0x1D56C, 0x1D586)         // 𝕯𝖊𝖑𝖑𝖔 (Dark Gothic)
            "sans-small" -> mapAlphabet(text, 0x1D5D4, 0x1D5EE)          // 𝖍𝖊𝖑𝗅𝗈 (Sans Small)
            "decorated" -> mapDict(text, decoratedMap)                  // ᕼ𝚎ᒪᒪṌ (Decorated)
            "medieval" -> mapDict(text, medievalMap)                    // Ƕell꙯ (Medieval Style)
            "chinese-style" -> mapDict(text, chineseMap)                 // 卂ᗷᑕ (Chinese-styled)
            "accented" -> mapDict(text, accentedMap)                    // Äḃċ (Accented)
            "phonetic" -> mapDict(text, phoneticMap)                    // Ȟeᶅℓo (Phonetic / IPA style)
            "strikethrough" -> mapDict(text, strikethroughMap)           // Ħɇłłø (Strikethrough / Crossed)
            "unique-style" -> mapDict(text, uniqueMap)                  // ꞪⴹᒪᒪꝊ (Unique Style)
            else -> text
        }
    }

    private fun mapAlphabet(text: String, upperStart: Int, lowerStart: Int, numStart: Int? = null): String {
        val sb = StringBuilder()
        for (ch in text) {
            when (ch) {
                in 'A'..'Z' -> sb.append(String(Character.toChars(upperStart + (ch - 'A'))))
                in 'a'..'z' -> sb.append(String(Character.toChars(lowerStart + (ch - 'a'))))
                in '0'..'9' -> {
                    if (numStart != null) sb.append(String(Character.toChars(numStart + (ch - '0'))))
                    else sb.append(ch)
                }
                else -> sb.append(ch)
            }
        }
        return sb.toString()
    }

    private fun mapItalic(text: String): String {
        val sb = StringBuilder()
        for (ch in text) {
            when (ch) {
                'h' -> sb.append("ℎ")
                in 'A'..'Z' -> sb.append(String(Character.toChars(0x1D434 + (ch - 'A'))))
                in 'a'..'z' -> sb.append(String(Character.toChars(0x1D44E + (ch - 'a'))))
                else -> sb.append(ch)
            }
        }
        return sb.toString()
    }

    private fun mapDoubleStruck(text: String): String {
        val exceptions = mapOf('C' to "ℂ", 'H' to "ℍ", 'N' to "ℕ", 'P' to "ℙ", 'Q' to "ℚ", 'R' to "ℝ", 'Z' to "ℤ")
        val sb = StringBuilder()
        for (ch in text) {
            if (exceptions.containsKey(ch)) sb.append(exceptions[ch])
            else if (ch in 'A'..'Z') sb.append(String(Character.toChars(0x1D538 + (ch - 'A'))))
            else if (ch in 'a'..'z') sb.append(String(Character.toChars(0x1D552 + (ch - 'a'))))
            else sb.append(ch)
        }
        return sb.toString()
    }

    private fun mapSquared(text: String): String {
        val sb = StringBuilder()
        for (ch in text) {
            val upper = ch.uppercaseChar()
            if (upper in 'A'..'Z') sb.append(String(Character.toChars(0x1F130 + (upper - 'A'))))
            else sb.append(ch)
        }
        return sb.toString()
    }

    private fun mapCircled(text: String): String {
        val sb = StringBuilder()
        for (ch in text) {
            when (ch) {
                in 'A'..'Z' -> sb.append(String(Character.toChars(0x24B6 + (ch - 'A'))))
                in 'a'..'z' -> sb.append(String(Character.toChars(0x24D0 + (ch - 'a'))))
                in '1'..'9' -> sb.append(String(Character.toChars(0x2460 + (ch - '1'))))
                '0' -> sb.append("⓪")
                else -> sb.append(ch)
            }
        }
        return sb.toString()
    }

    private fun mapGothic(text: String): String {
        val exceptions = mapOf('C' to "ℭ", 'H' to "ℌ", 'I' to "ℑ", 'R' to "ℜ", 'Z' to "ℨ")
        val sb = StringBuilder()
        for (ch in text) {
            if (exceptions.containsKey(ch)) sb.append(exceptions[ch])
            else if (ch in 'A'..'Z') sb.append(String(Character.toChars(0x1D56C + (ch - 'A'))))
            else if (ch in 'a'..'z') sb.append(String(Character.toChars(0x1D586 + (ch - 'a'))))
            else sb.append(ch)
        }
        return sb.toString()
    }

    private fun mapFancyScript(text: String): String {
        val exceptions = mapOf(
            'B' to "ℬ", 'E' to "ℰ", 'F' to "ℱ", 'H' to "ℋ", 'I' to "ℐ", 'L' to "ℒ",
            'M' to "ℳ", 'R' to "ℛ", 'e' to "ℯ", 'g' to "ℊ", 'o' to "ℴ"
        )
        val sb = StringBuilder()
        for (ch in text) {
            if (exceptions.containsKey(ch)) sb.append(exceptions[ch])
            else if (ch in 'A'..'Z') sb.append(String(Character.toChars(0x1D49C + (ch - 'A'))))
            else if (ch in 'a'..'z') sb.append(String(Character.toChars(0x1D4B6 + (ch - 'a'))))
            else sb.append(ch)
        }
        return sb.toString()
    }

    private fun mapDict(text: String, dict: Map<Char, String>): String {
        val sb = StringBuilder()
        for (ch in text) {
            sb.append(dict[ch] ?: dict[ch.lowercaseChar()] ?: ch.toString())
        }
        return sb.toString()
    }

    private val smallCapsMap = mapOf(
        'a' to "ᴀ", 'b' to "ʙ", 'c' to "ᴄ", 'd' to "ᴅ", 'e' to "ᴇ", 'f' to "ғ", 'g' to "ɢ",
        'h' to "ʜ", 'i' to "ɪ", 'j' to "ᴊ", 'k' to "ᴋ", 'l' to "ʟ", 'm' to "ᴍ", 'n' to "ɴ",
        'o' to "ᴏ", 'p' to "ᴘ", 'q' to "ǫ", 'r' to "ʀ", 's' to "s", 't' to "ᴛ", 'u' to "ᴜ",
        'v' to "ᴠ", 'w' to "ᴡ", 'x' to "x", 'y' to "ʏ", 'z' to "ᴢ"
    )

    private val smallCapsSpecialMap = mapOf(
        'a' to "Ɬ", 'b' to "Ꞵ", 'c' to "Ꞓ", 'd' to "Ꝺ", 'e' to "ⱸ", 'f' to "Ꞙ", 'g' to "Ꞡ",
        'h' to "Ɦ", 'i' to "Ɪ", 'j' to "Ʝ", 'k' to "Ꞣ", 'l' to "ⱡ", 'm' to "Ɱ", 'n' to "Ꞑ",
        'o' to "ꝿ", 'p' to "Ꝑ", 'q' to "Ꝗ", 'r' to "Ɽ", 's' to "Ꞩ", 't' to "Ʇ", 'u' to "Ꞟ",
        'v' to "ⱴ", 'w' to "Ⱳ", 'x' to "Ꭓ", 'y' to "Ɥ", 'z' to "Ɀ"
    )

    private val chineseMap = mapOf(
        'a' to "卂", 'b' to "ᗷ", 'c' to "ᑕ", 'd' to "ᗪ", 'e' to "乇", 'f' to "千", 'g' to "Ꮆ",
        'h' to "卄", 'i' to "丨", 'j' to "ﾌ", 'k' to "Ҝ", 'l' to "ㄥ", 'm' to "爪", 'n' to "几",
        'o' to "ㄖ", 'p' to "尸", 'q' to "Ɋ", 'r' to "尺", 's' to "丂", 't' to "ㄒ", 'u' to "ㄩ",
        'v' to "ᐯ", 'w' to "山", 'x' to "乂", 'y' to "ㄚ", 'z' to "乙"
    )

    private val litheMap = mapOf(
        'a' to "ꓮ", 'b' to "ꓐ", 'c' to "ꓚ", 'd' to "ꓓ", 'e' to "ꗴ", 'f' to "ꓝ", 'g' to "ꓖ",
        'h' to "ꓧ", 'i' to "ꓲ", 'j' to "ꓙ", 'k' to "ꓗ", 'l' to "ꓡ", 'm' to "ꓟ", 'n' to "ꓠ",
        'o' to "ꝏ", 'p' to "ꓑ", 'q' to "ꓚ", 'r' to "ꓣ", 's' to "ꓢ", 't' to "ꓔ", 'u' to "ꓴ",
        'v' to "ꓦ", 'w' to "ꓪ", 'x' to "ꓫ", 'y' to "ꓬ", 'z' to "ꓜ"
    )

    private val decoratedMap = mapOf(
        'a' to "ᗩ", 'b' to "ᗷ", 'c' to "ᑕ", 'd' to "ᗪ", 'e' to "𝚎", 'f' to "ᖴ", 'g' to "g",
        'h' to "ᕼ", 'i' to "i", 'j' to "ᒍ", 'k' to "k", 'l' to "ᒪ", 'm' to "ᗰ", 'n' to "ᑎ",
        'o' to "Ṍ", 'p' to "ᑭ", 'q' to "ᑫ", 'r' to "ᖇ", 's' to "ᔕ", 't' to "t", 'u' to "ᑌ",
        'v' to "ᐯ", 'w' to "ᗯ", 'x' to "᙭", 'y' to "y", 'z' to "ᘔ"
    )

    private val medievalMap = mapOf(
        'A' to "Ⱥ", 'B' to "Ƀ", 'C' to "Ȼ", 'D' to "Ð", 'E' to "Ɇ", 'F' to "Ꞙ", 'G' to "Ꞡ",
        'H' to "Ƕ", 'I' to "Ɨ", 'J' to "Ɉ", 'K' to "Ꝁ", 'L' to "Ł", 'M' to "₥", 'N' to "₦",
        'O' to "Ø", 'P' to "Ᵽ", 'Q' to "Ꝗ", 'R' to "Ɽ", 'S' to "Ꞩ", 'T' to "Ŧ", 'U' to "Ʉ"
    )

    private val accentedMap = mapOf(
        'a' to "ä", 'b' to "ḃ", 'c' to "ċ", 'd' to "ḋ", 'e' to "ë", 'f' to "ḟ", 'g' to "ġ",
        'h' to "ḣ", 'i' to "ï", 'j' to "ĵ", 'k' to "ḱ", 'l' to "ĺ", 'm' to "ṁ", 'n' to "ṅ",
        'o' to "ö", 'p' to "ṗ", 'q' to "q", 'r' to "ṙ", 's' to "ṡ", 't' to "ṫ", 'u' to "ü",
        'v' to "ṽ", 'w' to "ẅ", 'x' to "ẋ", 'y' to "ÿ", 'z' to "ż"
    )

    private val phoneticMap = mapOf(
        'a' to "ɐ", 'b' to "ʙ", 'c' to "ɕ", 'd' to "ɖ", 'e' to "e", 'f' to "ɟ", 'g' to "ɠ",
        'h' to "h", 'i' to "ɪ", 'j' to "ʝ", 'k' to "ɭ", 'l' to "ᶅ", 'm' to "ɯ", 'n' to "ɲ",
        'o' to "o", 'p' to "ɸ", 'q' to "ʠ", 'r' to "ɹ", 's' to "ʃ", 't' to "ʈ", 'u' to "ʊ"
    )

    private val strikethroughMap = mapOf(
        'a' to "a̶", 'b' to "ƀ", 'c' to "ȼ", 'd' to "đ", 'e' to "ɇ", 'f' to "f̶", 'g' to "ǥ",
        'h' to "ħ", 'i' to "ɨ", 'j' to "ɉ", 'k' to "k̶", 'l' to "ł", 'm' to "m̶", 'n' to "n̶",
        'o' to "ø", 'p' to "ᵽ", 'q' to "q̶", 'r' to "ɍ", 's' to "s̶", 't' to "ŧ", 'u' to "ʉ"
    )

    private val uniqueMap = mapOf(
        'a' to "Ɬ", 'b' to "ᗷ", 'c' to "ᑕ", 'd' to "ᗪ", 'e' to "ⴹ", 'f' to "ᖴ", 'g' to "Ǥ",
        'h' to "Ɦ", 'i' to "i", 'j' to "ᒍ", 'k' to "Ҝ", 'l' to "ᒪ", 'm' to "ᗰ", 'n' to "ᑎ",
        'o' to "Ꝋ", 'p' to "ᑭ", 'q' to "ᑫ", 'r' to "ᖇ", 's' to "ᔕ", 't' to "t", 'u' to "ᑌ"
    )
}
