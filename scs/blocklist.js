const { bmbtz } = require("../devkillstrom/killstrom");

// VCard Contact
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "KILLSTROM VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:KILLSTROM VERIFIED ✅\nORG:KILLSTROM-BOTZ BOT;\nTEL;type=CELL;type=VOICE;waid=255767862457:+255767862457\nEND:VCARD"
    }
  }
};

// Newsletter context
const newsletterContext = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363407848040840@newsletter",
    newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
    serverMessageId: 1
  }
};

bmbtz({
  nomCom: "blocklist",
  aliases: ["listblock", "blacklist"],
  reaction: '☘️',
  categorie: "search"
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    let blocklist = await zk.fetchBlocklist();

    if (blocklist.length > 0) {
      await zk.sendMessage(dest, {
        text: `🧾 You have blocked *${blocklist.length}* contact(s). Fetching list...`,
        contextInfo: {
          ...newsletterContext
        }
      }, { quoted: quotedContact });

      let output = `╭───❖ 「 *BLOCKED CONTACTS* 」\n`;

      for (let user of blocklist) {
        const number = user.split('@')[0];
        output += `│ 🔒 +${number}\n`;
      }

      output += `╰───────────────\n🔐 *By KILLSTROM-BOTZ*`;

      await zk.sendMessage(dest, {
        text: output,
        contextInfo: {
          ...newsletterContext
        }
      }, { quoted: quotedContact });

    } else {
      await zk.sendMessage(dest, {
        text: "✅ You have no blocked contacts.",
        contextInfo: {
          ...newsletterContext
        }
      }, { quoted: quotedContact });
    }
  } catch (e) {
    await zk.sendMessage(dest, {
      text: "❌ An error occurred while accessing blocked users.\n\n" + e,
      contextInfo: {
        ...newsletterContext
      }
    }, { quoted: quotedContact });
  }
});
// bmb check number fixed ✅✅
