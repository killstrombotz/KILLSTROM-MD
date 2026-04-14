const fs = require('fs-extra');
const { bmbtz } = require(__dirname + "/../devkillstrom/killstrom");
const s = require(__dirname + "/../settings");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

// VCard Contact kwa quoting
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

bmbtz({ nomCom: "payment", categorie: "General" }, async (dest, zk, commandeOptions) => {
  let { repondre, mybotpic } = commandeOptions;

  let infoMsg = `┏━━━━━━━━━━━━━━━━━━\n` +
                `┃ 💳 *Payment Details*\n` +
                `┃ \n` +
                `┃ 👤 *Name:* SAJID ALI\n` +
                `┃ 📞 *Number:* 923254799865 (Easypaisa)\n` +
                `┃ 🌐 *Method:* Online Payment\n` +
                `┃ 🌍 *Country:* Pakistan🇵🇰\n` +
                `┗━━━━━━━━━━━━━━━━━`;

  let lien = mybotpic() || "https://ibb.co/C5ht8wcK";

  try {
    const imageType = lien.match(/\.(jpeg|jpg|png|gif|mp4)$/i)?.[0];

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363407848040840@newsletter",
        newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
        serverMessageId: 1
      }
    };

    if (imageType?.includes('mp4') || imageType?.includes('gif')) {
      await zk.sendMessage(dest, {
        video: { url: lien },
        caption: infoMsg,
        gifPlayback: true,
        contextInfo
      }, { quoted: quotedContact });
    } else {
      await zk.sendMessage(dest, {
        image: { url: lien },
        caption: infoMsg,
        contextInfo
      }, { quoted: quotedContact });
    }

  } catch (e) {
    console.log("🥵 Menu error: " + e);
    repondre("🥵 Menu error: " + e.message);
  }
});
