const { bmbtz } = require("../devkillstrom/killstrom");
const fancy = require("../devkillstrom/style");

const pkg = require("@whiskeysockets/baileys");
const { generateWAMessageFromContent, proto } = pkg;

// VCard Contact (status style)
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
FN:KILLSTROM VERIFIED
ORG:KILLSTROM-BOTZ;
TEL;type=CELL;type=VOICE;waid=255767862457:+255767862457
END:VCARD`
    }
  }
};

bmbtz(
  {
    nomCom: "fancy",
    categorie: "Fun",
    reaction: "✍️"
  },
  async (from, conn, context) => {
    const { arg, repondre, prefixe, ms } = context;

    const id = arg[0]?.match(/\d+/)?.join("");
    const text = arg.slice(1).join(" ");

    try {
      // Hakuna ID au text → onyesha list
      if (!id || !text) {
        return await conn.sendMessage(
          from,
          {
            text:
              `Example:\n${prefixe}fancy 10 killstrombotz\n\n` +
              fancy.list("KILLSTROM-BOTZ", fancy)
          },
          { quoted: quotedContact }
        );
      }

      const selectedStyle = fancy[parseInt(id) - 1];
      const resultText = selectedStyle
        ? fancy.apply(selectedStyle, text)
        : "Style not found";

      // 🔘 COPY BUTTON
      const buttons = [
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "📋 COPY TEXT",
            copy_code: resultText
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
                text: resultText
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

      await conn.relayMessage(from, waMsg.message, {
        messageId: waMsg.key.id
      });

    } catch (error) {
      console.error("FANCY ERROR:", error);
      await repondre("An error occurred while processing your request.");
    }
  }
);
