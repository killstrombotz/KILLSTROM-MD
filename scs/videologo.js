const { bmbtz } = require("../devkillstrom/killstrom");
const axios = require("axios");

// Contact quote object
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "KILLSTROM VERIFIED ✅",
      vcard:
        "BEGIN:VCARD\n" +
        "VERSION:3.0\n" +
        "FN:KILLSTROM VERIFIED ✅\n" +
        "ORG:KILLSTROM-BOTZ;\n" +
        "TEL;type=CELL;type=VOICE;waid=923254799865:+923254799865\n" +
        "END:VCARD"
    }
  }
};

// Context info with newsletterJid
const contextInfo = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363407848040840@newsletter",
    newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
    serverMessageId: 1
  },
  externalAdReply: {
    title: "Killstrom-md",
    body: "Powered by Killstrom-md",
    thumbnailUrl: "https://ibb.co/C5ht8wcK",
    sourceUrl: "https://whatsapp.com/channel/0029VbCg36CBKfhshMEigq20",
    mediaType: 1,
    renderLargerThumbnail: true
  }
};

bmbtz({ nomCom: "videologo", categorie: "Download", reaction: "✋" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const text = arg.join(" ");

  if (!text) {
    repondre("❌ Please enter text to generate a logo.");
    return;
  }

  try {
    // Message content
    const messageText = `Reply with a number below to generate a logo for *${text}*:

1 ➠ sweet love 💕😘
2 ➠ lightning pubg
3 ➠ intro video 📷
4 ➠ tiger 🐯 video logo

*Enjoy 😂*`;

    // Send menu options to user
    const sentMessage = await zk.sendMessage(dest, {
      text: messageText,
      contextInfo,
    }, { quoted: quotedContact });

    // Listen for user's reply
    zk.ev.on('messages.upsert', async (update) => {
      const message = update.messages[0];
      if (!message.message || !message.message.extendedTextMessage) return;

      // Ensure the reply is for the above options
      if (message.message.extendedTextMessage.contextInfo?.stanzaId !== sentMessage.key.id) return;

      const responseText = message.message.extendedTextMessage.text.trim();

      let logoUrl;
      switch (responseText) {
        case '1':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-sweet-love-video-cards-online-734.html", text);
          break;
        case '2':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html", text);
          break;
        case '3':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html", text);
          break;
        case '4':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html", text);
          break;
        default:
          repondre("*Invalid number, please try again.*");
          return;
      }

      if (logoUrl) {
        await zk.sendMessage(dest, {
          video: { url: logoUrl },
          mimetype: "video/mp4",
          caption: `*Downloaded by Killstrom-md*`,
          contextInfo,
        }, { quoted: ms });
      } else {
        repondre("❌ Failed to fetch the logo. Please try again later.");
      }
    });

  } catch (error) {
    console.error(error);
    repondre(`❌ An error occurred: ${error.message || error}`);
  }
});

// Function to get logo URL from API
async function fetchLogoUrl(url, name) {
  try {
    const response = await axios.get("https://api-pink-venom.vercel.app/api/logo", {
      params: { url, name }
    });
    return response.data.result.download_url;
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
}
