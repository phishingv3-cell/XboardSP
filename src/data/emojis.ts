/**
 * Emoji Categories requested by user
 */

export interface EmojiCategory {
  id: string;
  name: string;
  icon: string;
  emojis: string[];
}

function parseEmojis(raw: string): string[] {
  // Split on whitespace or characters while respecting unicode surrogate pairs and joiners
  // Splitting by spaces works directly for the user's formatted string!
  return raw
    .trim()
    .split(/\s+/)
    .filter((e) => e.length > 0);
}

export const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: 'faces',
    name: 'Faces & Emotions',
    icon: '😀',
    emojis: parseEmojis(`😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 🫠 😉 😊 😇 🥰 😍 🤩 😘 😗 ☺️ 😚 😙 🥲 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🫢 🫣 🤫 🤔 🫡 🤐 🤨 😐 😑 😶 🫥 😶🌫️ 😏 😒 🙄 😬 😮💨 🤥 🫨 😌 😔 😪 🤤 😴 🫩 😷 🤒 🤕 🤢 🤮 🤧 🥵 🥶 🥴 😵 😵💫 🤯 🤠 🥳 🥸 😎 🤓 🧐 😕 🫤 😟 🙁 ☹️ 😮 😯 😲 😳 🥺 🥹 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 🥱 😤 😡 😠 🤬`)
  },
  {
    id: 'fantasy',
    name: 'Fantasy & Creatures',
    icon: '👹',
    emojis: parseEmojis(`😈 👿 💀 ☠️ 💩 🤡 👹 👺 👻 👽 👾 🤖 👼 🦸 🦹 🧙 🧚 🧛 🧜 🧝 🧞 🧟 🧌 🥷`)
  },
  {
    id: 'hearts',
    name: 'Hearts & Symbols',
    icon: '❤️',
    emojis: parseEmojis(`💌 💘 💝 💖 💗 💓 💞 💕 ❣️ 💔 ❤️🔥 ❤️🩹 ❤️ 🩷 🧡 💛 💚 💙 🩵 💜 🤎 🖤 🩶 🤍 💋 💯 💢 💥 💫 💦 💨 💬 💭 💤`)
  },
  {
    id: 'hands',
    name: 'Hands & Body',
    icon: '👋',
    emojis: parseEmojis(`👋 🤚 🖐️ ✋ 🖖 🫱 🫲 🫳 🫴 🫷 🫸 👌 🤌 🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 🫵 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 🦻 👃 🧠 🫀 🫁 🦷 🦴 👀 👁️ 👅 👄 🫦`)
  },
  {
    id: 'people',
    name: 'People',
    icon: '🧑',
    emojis: parseEmojis(`👶 🧒 👦 👧 🧑 👱 👨 🧔 👩 🧓 👴 👵 🙍 🙎 🙅 🙆 💁 🙋 🧏 🙇 🤦 🤷 🧑‍⚕️ 🧑‍🎓 🧑‍🏫 🧑‍⚖️ 🧑‍🌾 🧑‍🍳 🧑‍🔧 🧑‍🏭 🧑‍💼 🧑‍🔬 🧑‍💻 🧑‍🎤 🧑‍🎨 🧑‍✈️ 🧑‍🚀 🧑‍🚒 👮 🕵️ 💂 👷 🫅 🤴 👸 👳 👲 🧕 🤵 👰 🤰 🫃 🫄 🤱 🧑‍🍼 🎅 🤶 🧑‍🎄`)
  },
  {
    id: 'activities',
    name: 'Activities & Sports',
    icon: '🏃',
    emojis: parseEmojis(`🚶 🧍 🧎 🧑🦯 🧑🦼 🧑🦽 🏃 💃 🕺 🧗 🤺 🏇 ⛷️ 🏂 🏌️ 🏄 🚣 🏊 ⛹️ 🏋️ 🚴 🚵 🤸 🤼 🤽 🤾 🤹 🧘 🛀 🛌`)
  },
  {
    id: 'relationships',
    name: 'Relationships & Families',
    icon: '👨‍👩‍👧',
    emojis: parseEmojis(`🧑🤝🧑 👭 👫 👬 💏 💑 👩‍❤️‍👨 👨‍❤️‍👨 👩‍❤️‍👩 👨‍👩‍👦 👨‍👩‍👧 👨‍👩‍👧‍👦 👨‍👨‍👦 👨‍👨‍👧 👩‍👩‍👦 👩‍👩‍👧 👨‍👦 👨‍👧 👩‍👦 👩‍👧 🗣️ 👤 👥 🫂 👪`)
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐶',
    emojis: parseEmojis(`🐵 🐒 🦍 🦧 🐶 🐕 🦮 🐕‍🦺 🐩 🐺 🦊 🦝 🐱 🐈 🐈‍⬛ 🦁 🐯 🐅 🐆 🐴 🫎 🫏 🐎 🦄 🦓 🦌 🦬 🐮 🐂 🐃 🐄 🐷 🐖 🐗 🐽 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦣 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐇 🐿️ 🦫 🦔 🦇 🐻 🐻‍❄️ 🐨 🐼 🦥 🦦 🦨 🦘 🦡 🐾`)
  },
  {
    id: 'birds',
    name: 'Birds',
    icon: '🐦',
    emojis: parseEmojis(`🦃 🐔 🐓 🐣 🐤 🐥 🐦 🐧 🕊️ 🦅 🦆 🦢 🦉 🦤 🪶 🦩 🦚 🦜 🪽 🐦‍⬛ 🪿 🐦‍🔥`)
  },
  {
    id: 'reptiles',
    name: 'Reptiles, Sea & Insects',
    icon: '🐸',
    emojis: parseEmojis(`🐸 🐊 🐢 🦎 🐍 🐲 🐉 🦕 🦖 🐳 🐋 🪸 🐚 🐙 🦈 🐡 🐠 🐟 🦭 🐬 🐛 🦋 🐌 🦪 🦑 🦐 🦞 🦀 🪼 🦂 🕸️ 🕷️ 🪳 🦗 🐞 🪲 🐝 🐜 🦠 🪱 🪰 🦟`)
  },
  {
    id: 'nature',
    name: 'Nature & Plants',
    icon: '🌸',
    emojis: parseEmojis(`🏵️ 🪷 💮 🌸 💐 🪴 🍁 🌱 🍀 🪻 ☘️ 🌷 🌿 🌼 🌾 🌻 🌵 🌺 🌴 🥀 🌳 🌹 🌲 🍂 🍃 🪹 🪺 🍄 🪾`)
  },
  {
    id: 'fruits',
    name: 'Fruits & Vegetables',
    icon: '🍎',
    emojis: parseEmojis(`🍇 🍈 🍉 🍊 🍋 🍋‍🟩 🍌 🍍 🥭 🍎 🍏 🍐 🍑 🍒 🍓 🫐 🥝 🍅 🫒 🥥 🥑 🍆 🥔 🥕 🌽 🌶️ 🫑 🫚 🌰 🫘 🥜 🧅 🧄 🥦 🥬 🥒 🫛`)
  },
  {
    id: 'food',
    name: 'Food & Drinks',
    icon: '🍔',
    emojis: parseEmojis(`🥯 🥨 🫓 🥖 🥐 🍞 🫜 🍄‍🟫 🍟 🍔 🥓 🥩 🍗 🍖 🧀 🧇 🥞 🥚 🧆 🥙 🫔 🌯 🌮 🥪 🌭 🍕 🧂 🧈 🍿 🥗 🥣 🫕 🍲 🥘 🍳 🥫 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🥡 🥠 🥟 🍡 🥮 🍥 🍤 🍣 🍢 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🥧 🫖 ☕ 🥛 🍼 🍯 🍮 🍭 🍬 🍫 🍵 🥤 🧋 🧃 🧉 🧊 🥢 🍽️ 🏺 🫙`)
  },
  {
    id: 'places',
    name: 'Places & Nature',
    icon: '🌍',
    emojis: parseEmojis(`🌍 🌎 🌏 🌐 🗺️ 🗾 🧭 🏔️ ⛰️ 🏛️ 🏟️ 🏞️ 🏝️ 🏜️ 🏖️ 🏕️ 🗻 🌋 🏡 🏠 🏚️ 🏘️ 🛖 🪵 🪨 🧱 🏗️ 🏫 🏪 🏩 🏨 🏦 🏥 🏤 🏣 🏢 🕌 ⛪ 🗽 🗼 💒 🏰 🏯 🏭 🏬 🏙️ 🌃 🌁 ⛺ ⛲ 🕋 ⛩️ 🕍 🛕 🎡 🛝 🎠 ♨️ 🌉 🌇 🌆 🌅 🌄`)
  },
  {
    id: 'transport',
    name: 'Transport & Travel',
    icon: '🚗',
    emojis: parseEmojis(`🚇 🚆 🚅 🚄 🚃 🚂 🚪 🚈 🚐 🦼 🛺 🛻 🚑 🚉 🚊 🚒 🚚 🚲 🛴 🚛 🚓 🚝 🚞 🚔 🚜 🛹 🛼 🏎️ 🚕 🚋 🚌 🚖 🏍️ 🚏 🛣️ 🛵 🚗 🚍 🚎 🚘 🛤️ ⚓ ✈️ 🚢 🚧 ⛴️ 🚦 🚥 🚤 🚨 🛞 🛶 ⛵ ⛽ 🛢️ 🛟 🛩️ 🛰️ 🛫 🚀 🛎️ 🪂 🧳 💺 🚁 🚟 🚠 🚡`)
  },
  {
    id: 'weather',
    name: 'Time & Weather',
    icon: '⏰',
    emojis: parseEmojis(`⌛ 🚠 ⏳ ⌚ ⏰ ⏱️ ⏲️ 🕰️ 🕛 🕧 🕐 🕜 🕑 🕝 🕒 🕞 🕓 🕟 🕔 🕠 🕕 🕡 🕖 🕢 🕗 🕣 🕘 🕤 🕙 🕥 🕚 🕦 🌙 🌘 🌗 🌖 🌕 🌔 🌓 🌒 🌑 🌚 🌛 🌜 🌡️ ☀️ 🌝 🌞 🪐 ⭐ 🌦️ 🌥️ 🌤️ ⛈️ ⛅ ☁️ 🌌 🌠 🌟 🌧️ 🌨️ 🌩️ 🌪️ 🌫️ 🌬️ 🌀 🌈 🌂 🔥 ☄️ ⛄ ☃️ ❄️ ⚡ ⛱️ ☔ ☂️ 💧 🌊`)
  },
  {
    id: 'events',
    name: 'Events & Celebration',
    icon: '🎉',
    emojis: parseEmojis(`🎃 🎄 🎆 🎇 🧨 ✨ 🎈 🎉 🎊 🎁 🎀 🧧 🎑 🎐 🎏 🎎 🎍 🎋 🎗️ 🎟️ 🎫 🎖️ 🏆 🏅 🥇 🥈 🥉`)
  },
  {
    id: 'sports',
    name: 'Sports & Games',
    icon: '⚽',
    emojis: parseEmojis(`🥏 🎾 🏉 🏈 🏐 🏀 🥎 ⚾ ⚽ 🎳 🏏 🏑 🏒 🥍 🏓 🏸 🥊 🥋 🥌 🕹️ 🎮 🛷 🎿 🪄 🔮 🎽 🤿 🎱 🎣 ⛸️ 🪁 🪀 ⛳ 🥅 🎯 🎰 ♦️ 🎲 ♣️ 🧩 ♟️ 🧶 🧸 🃏 🪅 🀄 🪩 🎴 🪆 🎭 ♠️ 🖼️ ♥️ 🎨`)
  },
  {
    id: 'clothing',
    name: 'Clothing & Accessories',
    icon: '👕',
    emojis: parseEmojis(`🧣 👖 👕 👔 🦺 🥼 🥽 🕶️ 👓 🧤 🧥 🧦 👗 👘 🥻 🩱 🩲 🩳 🩴 🎒 🛍️ 👝 👜 👛 🪭 👚 👙 👞 👟 🥾 🥿 👠 👡 🩰 👢 🪮 💄 📿 ⛑️ 🪖 🧢 🎓 🎩 💎 👒 👑 💍`)
  },
  {
    id: 'media',
    name: 'Music & Media',
    icon: '🎵',
    emojis: parseEmojis(`🔔 🔕 📻 🎧 🎷 🪗 🎵 🎼 🎶 🎸 🎹 🎙️ 🎚️ 🎺 🎻 🎛️ 🎤 🪕 🪉 🪈 🪇 🪘 🥁 📞 ☎️ 📲 📱 📟 📠 🎞️ 🎥 🎦 📀 💿 💾 💽`)
  },
  {
    id: 'technology',
    name: 'Technology & Office',
    icon: '💻',
    emojis: parseEmojis(`🔋 🪫 🔌 💻 🖥️ 🖨️ ⌨️ 🧮 🖲️ 🖱️ 🕯️ 💡 🔦 🏮 🪔 📔 📕 📖 📗 📰 💶 💵 📄 📜 📃 📒 💰 🏷️ 📓 📚 💳 📑 📙 📘 🗞️ 📤 ✏️ 📂 📊 💸 ✒️ 🗂️ 📋 📦 📅 📌 🧾 📫 🖊️ 📆 📍 💹 📪 🗒️ 📎 ✉️ 📬 🖍️ 🗓️ 🖇️ 📧 📭 📝 📇 📏 📨 📮 💼 📈 📐 📩 🗳️ 📁 📉 ✂️`)
  },
  {
    id: 'tools',
    name: 'Tools & Objects',
    icon: '🔧',
    emojis: parseEmojis(`🗝️ 🪃 ⚖️ 🪏 💉 🪜 🗜️ 💣 🔑 🔐 ⚙️ 🧲 📡 🔭 🧰 🔩 🗡️ 🔏 🔓 🛠️ 🪛 🔬 🧬 ⛓️ 🔧 ⚒️ 🔒 🗑️ ⛏️ 🪚 🧫 🧪 🔗 🛡️ 🪓 🗄️ 🗃️ 🔨 🏹 ⚗️ 🦯 🪪 🪧 🗿 🧽 🧯`)
  },
  {
    id: 'home',
    name: 'Home & Personal Care',
    icon: '🛏️',
    emojis: parseEmojis(`🧿 🪬 🪥 🫧 🧼 🪣 🧻 🧺 🧹 🧷 🧴 🛏️ 🛋️ 🪑 🚽 🪠 🚿 🛁 🪤 🪒 🪟 🪞 🛗 🚪 🩻 🩺 🩹 💊 🩼`)
  },
  {
    id: 'signs',
    name: 'Signs & Accessibility',
    icon: '🚨',
    emojis: parseEmojis(`🏧 🚮 🚰 ♿ 🚹 🚺 🚻 🚼 🚾 🛅 🛄 🛃 🛂 ⚠️ 🚸 ⛔ 🚫 🚳 🔞 📵 🚷 🚱 🚯 🚭 ⬆️ ☣️ ☢️`)
  },
  {
    id: 'arrows',
    name: 'Arrows & Controls',
    icon: '➡️',
    emojis: parseEmojis(`↗️ ➡️ ↘️ ⬇️ ⬅️ ↖️ ↕️ ↔️ ↩️ ↪️ ⤴️ ⤵️ 🔃 🔄 🔙 🔚 🔛 🔜 🔝 🔀 🔁 🔂 ▶️ ⏩ ⏭️ ⏯️ ◀️ ⏺️ ⏹️ ⏸️ ⏬ 🔽 ⏫ 🔼 ⏮️ ⏪ ⏏️ 🔅 🔆 📶 🛜 📳 📴`)
  },
  {
    id: 'symbols',
    name: 'Symbols, Religions & Zodiac',
    icon: '☮️',
    emojis: parseEmojis(`🛐 ⚛️ 🕉️ ✡️ ☸️ ☯️ ✝️ ☦️ ☪️ 🕎 🔯 🪯 ☮️ ⚧️ ♀️ ♂️ ♾️ ☘️ ⚜️ ☣️ ☢️ ♻️ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ ⛎`)
  },
  {
    id: 'letters-numbers',
    name: 'Letters, Numbers & Buttons',
    icon: '🔤',
    emojis: parseEmojis(`‼️ ⁉️ ❌ ❓ ❔ ❕ ❗ ❇️ ✳️ ❎ ⭕ ✅ ✔️ ☑️ 🟰 ➗ ➖ ➕ ✖️ 💲 ™️ ®️ #️⃣ *️⃣ 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔡 🔠 🔢 🔣 🔤 🅰️ 🆎 🅱️ 🆑 🆒 🆓 ℹ️ 🆔 Ⓜ️ 🆕 🆖 🅾️ 🆗 🅿️ 🆘 🆙 🆚 🈁 🈂️ 🈷️ 🈶 🈯 🉐 🈹 🈚 🈲 🉑 🈸 🈴 🈳 ㊗️ ㊙️ 🈺 🈵`)
  },
  {
    id: 'shapes',
    name: 'Shapes & Colors',
    icon: '🔴',
    emojis: parseEmojis(`🔴 🟠 🟡 🟢 🔵 🟣 🟤 ⚫ ⚪ 🟥 🟧 🟨 🟩 🟦 🟪 🟫 ⬛ ⬜ ◼️ ◻️ ◾ ◽ ▪️ ▫️ 🔶 🔷 🔲 🔳 🔘 💠 🔻 🔺 🔹 🔸`)
  },
  {
    id: 'flags',
    name: 'Flags',
    icon: '🏳️',
    emojis: parseEmojis(`🏁 🚩 🎌 🏴 🏳️ 🏳️‍🌈 🏳️‍⚧️ 🏴‍☠️ 🇦🇨 🇦🇩 🇦🇪 🇦🇫 🇦🇬 🇦🇮 🇦🇱 🇦🇲 🇦🇴 🇦🇷 🇦🇺 🇦🇹 🇦🇿 🇧🇩 🇧🇪 🇧🇭 🇧🇷 🇨🇦 🇨🇭 🇨🇳 🇨🇴 🇨🇺 🇨🇾 🇨🇿 🇩🇪 🇩🇰 🇪🇸 🇫🇮 🇫🇷 🇬🇧 🇬🇷 🇮🇳 🇮🇩 🇮🇪 🇮🇱 🇮🇹 🇯🇵 🇰🇷 🇲🇾 🇳🇱 🇳🇴 🇳🇿 🇵🇰 🇵🇱 🇵🇹 🇷🇺 🇸🇦 🇸🇬 🇸🇪 🇹🇭 🇹🇷 🇺🇦 🇺🇸 🇻🇳 🇿🇦 🇿🇲 🇿🇼`)
  }
];

export interface KaomojiGroup {
  id: string;
  name: string;
  emojis: string[];
}

export const KAOMOJI_GROUPS: KaomojiGroup[] = [
  {
    id: 'happy',
    name: 'Happy & Joy',
    emojis: ['(✿◠‿◠)', '(◕‿◕)', '(≧◡≦)', '(•‿•)', '(^_^)v', '(*^▽^*)', '(＾◡＾)', '(◠‿◠✿)', '＼(＾O＾)／', '(★‿★)']
  },
  {
    id: 'love',
    name: 'Love & Cute',
    emojis: ['(｡♥‿♥｡)', '(づ｡◕‿‿◕｡)づ', '(❤ω❤)', '(✿ ♥‿♥)', '(♡´౪`♡)', '(◕‿◕)♡', '♥(ˆ⌣ˆԅ)', '꒰•‿•꒱', '(っ´∀｀)っ']
  },
  {
    id: 'cool',
    name: 'Cool & Shrug',
    emojis: ['¯\\_(ツ)_/¯', '(⌐■_■)', '( •_•)>⌐■-■', 'ᕦ(ò_óˇ)ᕤ', 'ᕕ( ᐛ )ᕗ', '(¬‿¬)', '(b^_^)b', '凸(¬‿¬)']
  },
  {
    id: 'sad',
    name: 'Sad & Crying',
    emojis: ['(ಥ﹏ಥ)', '(╥﹏╥)', '(T_T)', '(｡•́︿•̀｡)', '(>_<)', '(っ- ‸ - ς)', '(╯︵╰,)', '(;´༎ຶД༎ຶ`)', '(ノ_<。)']
  },
  {
    id: 'angry',
    name: 'Angry & Flip',
    emojis: ['(╯°□°)╯︵ ┻━┻', '(ง\'̀-\'́)ง', '(ಠ_ಠ)', '(ノಠ益ಠ)ノ', '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻', '凸(ಠ_ಠ)凸', '(¬_¬)']
  },
  {
    id: 'animals',
    name: 'Animals & Pets',
    emojis: ['ʕ•ᴥ•ʔ', '(=^･ω･^=)', '( =①ω①=)', 'ʕっ•ᴥ•ʔっ', '(^._.^)ﾉ', '(・ω・)', '₍ᐢ. ̫ .ᐢ₎', 'ฅ^•ﻌ•^ฅ']
  }
];

// Common keywords mapping for instant and intuitive emoji search
const KEYWORD_MAP: Record<string, string[]> = {
  smile: ['😀', '😃', '😄', '😁', '😆', '😅', '🙂', '😊', '😇'],
  happy: ['😀', '😃', '😄', '😁', '😆', '😊', '🥳', '🥰', '😍', '✨'],
  laugh: ['😂', '🤣', '😆', '😅', '😹'],
  love: ['❤️', '💖', '🥰', '😍', '💕', '💗', '💓', '💞', '💘', '💌'],
  heart: ['❤️', '🩷', '🧡', '💛', '💚', '💙', '🩵', '💜', '🤎', '🖤', '🤍', '💔', '❣️'],
  fire: ['🔥', '💥', '🧨', '⚡', '🌋'],
  cool: ['😎', '🕶️', '🥶', '🆒', '🤙', '✨'],
  cry: ['😢', '😭', '😥', '🥺', '😿', '💧'],
  sad: ['🙁', '☹️', '😞', '😓', '😔', '🥺', '😢', '😭'],
  kiss: ['😘', '😗', '😙', '😚', '💋'],
  wink: ['😉', '😜', '🤪', '😝'],
  clap: ['👏', '🙌', '🎉'],
  thumb: ['👍', '👎'],
  ok: ['👌', '🆗', '✅', '✔️'],
  star: ['⭐', '🌟', '✨', '💫', '🌠'],
  rocket: ['🚀', '🛸', '🛰️'],
  money: ['💰', '💵', '💶', '💸', '🤑', '💳'],
  party: ['🎉', '🥳', '🎊', '🍾', '🎈'],
  food: ['🍕', '🍔', '🍟', '🌮', '🍣', '🍩', '🍫', '🍦', '🍜', '🍱'],
  coffee: ['☕', '🧋', '🍵', '🥤'],
  dog: ['🐶', '🐕', '🦮', '🐩'],
  cat: ['🐱', '🐈', '🐈‍⬛', '😻', '😸'],
  sun: ['☀️', '🌞', '🌅', '🌄'],
  moon: ['🌙', '🌕', '🌑', '🌚'],
  car: ['🚗', '🚘', '🏎️', '🚕', '🚙', '🚓'],
  flower: ['🌸', '💐', '🌺', '🌻', '🌷', '🌹'],
  check: ['✅', '✔️', '☑️'],
  warning: ['⚠️', '🚨', '⛔', '🚫'],
  music: ['🎵', '🎶', '🎧', '🎸', '🎹', '🎤'],
  sleep: ['😴', '💤', '🥱', '🤤', '🛌'],
  think: ['🤔', '🧐', '💭'],
  hand: ['👋', '✋', '🖐️', '👌', '✌️', '🤞', '🤝', '🙏', '👏', '👍']
};

export const searchEmojis = (query: string): string[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const resultSet = new Set<string>();

  // 1. Direct keyword match
  for (const [key, list] of Object.entries(KEYWORD_MAP)) {
    if (key.includes(q) || q.includes(key)) {
      list.forEach((e) => resultSet.add(e));
    }
  }

  // 2. Category name match
  for (const cat of EMOJI_CATEGORIES) {
    if (cat.name.toLowerCase().includes(q)) {
      cat.emojis.slice(0, 30).forEach((e) => resultSet.add(e));
    }
  }

  // 3. If nothing found yet, check partial matches
  if (resultSet.size === 0) {
    for (const [key, list] of Object.entries(KEYWORD_MAP)) {
      if (q.split('').some((ch) => key.startsWith(ch))) {
        list.slice(0, 5).forEach((e) => resultSet.add(e));
      }
    }
  }

  return Array.from(resultSet);
};
