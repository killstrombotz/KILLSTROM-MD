const { bmbtz } = require("../devkillstrom/killstrom");
const pkg = require('@whiskeysockets/baileys');
const { generateWAMessageFromContent, proto } = pkg;
const fs = require("fs-extra");
const ffmpeg = require("fluent-ffmpeg");
const { Catbox } = require('node-catbox');

const catbox = new Catbox();

/* ===== QUOTED CONTACT ===== */
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
ORG:KILLSTROM;
TEL;type=CELL;type=VOICE;waid=923254799865:+923254799865
END:VCARD`
    }
  }
};

async function uploadToCatbox(path) {
  if (!fs.existsSync(path)) throw new Error("File not found");
  return await catbox.uploadFile({ path });
}

async function convertToMp3(input, output) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .toFormat("mp3")
      .on("end", () => resolve(output))
      .on("error", reject)
      .save(output);
  });
}

bmbtz(
  { nomCom: "url", categorie: "General", reaction: "💗" },
  async (from, zk, context) => {
    const { msgRepondu, ms, repondre } = context;

    /* ===== CHAGUA MEDIA ===== */
    const targetMsg =
      msgRepondu ||
      ms.message?.imageMessage ||
      ms.message?.videoMessage ||
      ms.message?.audioMessage
        ? ms
        : null;

    if (!msgRepondu && !ms.message?.imageMessage && !ms.message?.videoMessage && !ms.message?.audioMessage) {
      return repondre("Please reply to or send an image, video, or audio with `.url`.");
    }

    let mediaPath;

    try {
      /* ===== VIDEO ===== */
      if (msgRepondu?.videoMessage || ms.message?.videoMessage) {
        const video = msgRepondu?.videoMessage || ms.message.videoMessage;

        if (video.fileLength > 50 * 1024 * 1024) {
          return repondre("Video is too large.");
        }

        mediaPath = await zk.downloadAndSaveMediaMessage(video);
      }

      /* ===== IMAGE ===== */
      else if (msgRepondu?.imageMessage || ms.message?.imageMessage) {
        const image = msgRepondu?.imageMessage || ms.message.imageMessage;
        mediaPath = await zk.downloadAndSaveMediaMessage(image);
      }

      /* ===== AUDIO ===== */
      else if (msgRepondu?.audioMessage || ms.message?.audioMessage) {
        const audio = msgRepondu?.audioMessage || ms.message.audioMessage;
        const input = await zk.downloadAndSaveMediaMessage(audio);
        const output = `${input}.mp3`;
        await convertToMp3(input, output);
        fs.unlinkSync(input);
        mediaPath = output;
      } 
      else {
        return repondre("Unsupported media type.");
      }

      /* ===== UPLOAD ===== */
      const url = await uploadToCatbox(mediaPath);
      fs.unlinkSync(mediaPath);

      /* ===== BOX UI ===== */
      const textResult = `
╭───〔 KILLSTROM-MD URL 〕───
│
│ 🔗 Generated Link:
│
│ ${url}
│
│ 📋 Use COPY button
│
╰─────────────────────
`;

      const buttons = [
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "📋 COPY URL",
            copy_code: url
          })
        }
      ];

      const viewOnceMessage = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: textResult
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: ""
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                title: "",
                subtitle: "",
                hasMediaAttachment: false
              }),
              nativeFlowMessage:
                proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons
                })
            })
          }
        }
      };

      const waMsg = generateWAMessageFromContent(from, viewOnceMessage, {});
      await zk.relayMessage(from, waMsg.message, {
        messageId: waMsg.key.id
      });

    } catch (err) {
      console.error("URL ERROR:", err);
      repondre("Failed to generate URL.");
    }
  }
);
