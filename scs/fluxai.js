const { bmbtz } = require("../devkillstrom/killstrom");
const axios = require("axios");

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
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:KILLSTROM VERIFIED ✅\nORG:KILLSTROM-BOTZ ;\nTEL;type=CELL;type=VOICE;waid=255767862457:+255767862457\nEND:VCARD"
    }
  }
};

// Context ya newsletter
const contextInfo = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363407848040840@newsletter",
    newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
    serverMessageId: 1
  }
};

// =============== FLUX AI ===============
bmbtz({
  nomCom: "fluxai",
  aliases: ["flux", "imagine"],
  categorie: "Search",
  reaction: "📸"
}, async (jid, sock, { ms, repondre, arg }) => {
  const q = arg.join(" ");
  if (!q) return repondre("❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.");
  await repondre("> *𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙿𝙷𝙾𝚃𝙾 📸*");

  try {
    const url = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`;
    const { data } = await axios.get(url, { responseType: "arraybuffer" });

    await sock.sendMessage(jid, {
      image: Buffer.from(data, "binary"),
      caption: `🌲 *𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳 𝙱𝚈 𝚃𝙷𝙴 𝙺𝙸𝙻𝙻𝚂𝚃𝚁𝙾𝙼𝙱𝙾𝚃𝚉* 😎\n📸 𝚁𝙴𝙰𝙳𝚈 : *${q}*`,
      contextInfo
    }, { quoted: quotedContact });

  } catch (error) {
    console.error("FluxAI Error:", error);
    repondre(`❌ Error: ${error.message || "Failed to generate image."}`);
  }
});

// =============== STABLE DIFFUSION ===============
bmbtz({
  nomCom: "stablediffusion",
  aliases: ["sdiffusion", "imagine2"],
  categorie: "Search",
  reaction: "📸"
}, async (jid, sock, { ms, repondre, arg }) => {
  const q = arg.join(" ");
  if (!q) return repondre("❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.");
  await repondre("> *𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙿𝙷𝙾𝚃𝙾 📸*");

  try {
    const url = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(q)}`;
    const { data } = await axios.get(url, { responseType: "arraybuffer" });

    await sock.sendMessage(jid, {
      image: Buffer.from(data, "binary"),
      caption: `🌲 *𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳 𝙱𝚈 𝙺𝙸𝙻𝙻𝚂𝚃𝚁𝙾𝙼-𝙱𝙾𝚃𝚉* 😎\n✨ 𝚁𝙴𝙰𝙳𝚈: *${q}*`,
      contextInfo
    }, { quoted: quotedContact });

  } catch (error) {
    console.error("StableDiffusion Error:", error);
    repondre(`❌ Error: ${error.message || "Failed to generate image."}`);
  }
});

// =============== STABILITY AI ===============
bmbtz({
  nomCom: "stabilityai",
  aliases: ["stability", "imagine3"],
  categorie: "Search",
  reaction: "📸"
}, async (jid, sock, { ms, repondre, arg }) => {
  const q = arg.join(" ");
  if (!q) return repondre("❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚙𝚛𝚘𝚖𝚙𝚝 𝚏𝚘𝚛 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.");
  await repondre("> *𝙲𝚁𝙴𝙰𝚃𝙸𝙽𝙶 𝙿𝙷𝙾𝚃𝙾 📸*");

  try {
    const url = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(q)}`;
    const { data } = await axios.get(url, { responseType: "arraybuffer" });

    await sock.sendMessage(jid, {
      image: Buffer.from(data, "binary"),
      caption: `🌲 *𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳 𝙱𝚈 𝙺𝙸𝙻𝙻𝚂𝚃𝚁𝙾𝙼-𝙱𝙾𝚃𝚉* 😎\n📸 𝚁𝙴𝙰𝙳𝚈: *${q}*`,
      contextInfo
    }, { quoted: quotedContact });

  } catch (error) {
    console.error("StabilityAI Error:", error);
    repondre(`❌ Error: ${error.message || "Failed to generate image."}`);
  }
});
