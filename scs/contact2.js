const { bmbtz } = require("../devkillstrom/killstrom");
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { exec } = require('child_process');
const { writeFile } = require("fs/promises");
const fs = require('fs-extra');
const moment = require("moment-timezone");

bmbtz({
  nomCom: 'report',
  aliases: 'spread',
  desc: 'report anything to the bot developer',
  categorie: "General",
  reaction: '🍂'
}, async (bot, zk, context) => {
  const { arg, repondre, superUser, nomAuteurMessage, ms } = context;

  if (!arg[0]) {
    return repondre("After the command *broadcast*, type your message to be sent to the specified contacts.");
  }

  if (!superUser) {
    return repondre("Only for the owner.");
  }

  // Specified contacts
  const contacts = [
    '923254799865@s.whatsapp.net',
    '923461280347@s.whatsapp.net',
  ];

  await repondre("*KILLSTROM-BOTZ-MD is sending your message to Developer contacts 🤦🤷*...");

  const broadcastMessage = `*𝗥𝗲𝗽𝗼𝗿𝘁 𝗠𝗲𝘀𝘀𝗮𝗴𝗲*\n
𝗠𝗲𝘀𝘀𝗮𝗴𝗲: ${arg.join(" ")}\n
𝗦𝗲𝗻𝗱𝗲𝗿 𝗡𝗮𝗺𝗲 : ${nomAuteurMessage}`;

  for (let contact of contacts) {
    await zk.sendMessage(contact, {
      image: { url: 'https://ibb.co/WNbc6S0F' },
      caption: broadcastMessage,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363407848040840@newsletter",
          newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
          serverMessageId: 1
        }
      }
    }, { quoted: ms });
  }
});
