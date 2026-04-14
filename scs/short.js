const { bmbtz } = require("../devkillstrom/Killstrom");
const axios = require("axios");

// VCard Contact (KILLSTROM VERIFIED ✅)
const quotedContact = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "KILLSTROM VERIFIED ✅",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:KILLSTROM VERIFIED ✅
ORG:KILLSTROM-BOTZ;
TEL;type=CELL;type=VOICE;waid=923254799865:+923254799865
END:VCARD`
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

bmbtz(
  {
    nomCom: "short",
    alias: ["tiny", "shorturl"],
    categorie: "Sticker",
    reaction: "General"
  },
  async (from, conn, context) => {

    const { arg, repondre } = context;

    if (!arg[0]) {
      return repondre("*🏷️ Please provide a link.*");
    }

    try {
      const link = arg[0];

      const response = await axios.get(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(link)}`
      );

      const shortenedUrl = response.data;

      // Box style caption
      const caption = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🛡️ *URL Shortener*
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ 🔗 Original:
┃ ${link}
┣━━━━━━━━━━━━━━━━━━━━━━━
┃ ✂️ Shortened:
┃ ${shortenedUrl}
┗━━━━━━━━━━━━━━━━━━━━━━━
🔗 Powered by KILLSTROM-MD`;

      await conn.sendMessage(
        from,
        {
          text: caption,
          contextInfo: newsletterContext
        },
        { quoted: quotedContact }
      );

    } catch (error) {
      console.error("TINY ERROR:", error);
      repondre("❌ An error occurred while shortening the URL. Please try again.");
    }
  }
);
