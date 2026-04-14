const axios = require("axios");
const { bmbtz } = require("../devkillstrom/killstrom");

// VCard Contact for quoting
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "KILLSTROM VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:KILLSTROM VERIFIED ✅\nORG:KILLSTROM-BOTZ;\nTEL;type=CELL;type=VOICE;waid=923254799865:+923254799865\nEND:VCARD"
    }
  }
};

bmbtz({
  nomCom: "rw",
  categorie: "Download",
  reaction: "🌌"
}, async (jid, sock, { arg, ms, repondre }) => {
  try {
    const query = arg.join(" ") || "random";
    const apiUrl = `https://pikabotzapi.vercel.app/random/randomwall/?apikey=anya-md&query=${encodeURIComponent(query)}`;

    const { data } = await axios.get(apiUrl);

    if (data.status && data.imgUrl) {
      const caption = `🌌 *Random Wallpaper: ${query}*\n\n> *© Powered By Killstrom-md*`;

      await sock.sendMessage(jid, {
        image: { url: data.imgUrl },
        caption,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363407848040840@newsletter",
            newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
            serverMessageId: 2
          }
        }
      }, { quoted: quotedContact }); // Use quoting with VCard contact here
    } else {
      repondre(`❌ No wallpaper found for *"${query}"*.`);
    }
  } catch (error) {
    console.error("Wallpaper Error:", error);
    repondre("❌ An error occurred while fetching the wallpaper. Please try again.");
  }
});
