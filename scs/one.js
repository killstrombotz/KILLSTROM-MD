const { bmbtz } = require("../devkillstrom/killstrom");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

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
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:KILLSTROM VERIFIED ✅\nORG:KILLSTROM-BOTZ;\nTEL;type=CELL;type=VOICE;waid=255767862457:+255767862457\nEND:VCARD"
    }
  }
};

bmbtz(
  { nomCom: "vv", aliases: ["send", "keep"], categorie: "View Once" },
  async (dest, zk, commandeOptions) => {
    const { repondre, msgRepondu } = commandeOptions;

    if (!msgRepondu) {
      return repondre("📥 Reply to the message you want to save.");
    }

    try {
      const contextInfo = {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363407848040840@newsletter",
          newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
          serverMessageId: 1
        }
      };

      let msg;
      if (msgRepondu.imageMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        msg = {
          image: { url: media },
          caption: msgRepondu.imageMessage.caption || "",
          contextInfo
        };
      } else if (msgRepondu.videoMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        msg = {
          video: { url: media },
          caption: msgRepondu.videoMessage.caption || "",
          gifPlayback: true,
          contextInfo
        };
      } else if (msgRepondu.audioMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        msg = {
          audio: { url: media },
          mimetype: 'audio/mp4',
          contextInfo
        };
      } else if (msgRepondu.stickerMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        const stickerMess = new Sticker(media, {
          pack: 'KILLSTROM-MD',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent"
        });
        const stickerBuffer = await stickerMess.toBuffer();
        msg = { sticker: stickerBuffer };
      } else {
        msg = {
          text: msgRepondu.conversation || "📝 Message copied.",
          contextInfo
        };
      }

      await zk.sendMessage(dest, msg, { quoted: quotedContact });
    } catch (error) {
      console.error("Error processing the message:", error);
      repondre("❌ Failed to process the message.");
    }
  }
);
