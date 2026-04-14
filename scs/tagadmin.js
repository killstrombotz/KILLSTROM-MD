const { bmbtz } = require("../devkillstrom/Killstrom")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../lib/antilien")
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../lib/antibot")
const fs = require("fs-extra");
const conf = require("../settings");
const { default: axios } = require('axios');

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

bmbtz({ nomCom: "tagadmin", categorie: 'Group', reaction: "🪰" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) return repondre("❌ This command is for groups only.");
  if (!verifAdmin && !superUser) return repondre("❌ You must be an admin or superuser to use this command.");

  let mess = arg && arg.length > 0 ? arg.join(' ') : 'No Message';

  let adminsGroupe = infosGroupe.participants.filter(m => m.admin);

  let tag = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🏷️ *Group:* ${nomGroupe}
┃ 🙋 *Sender:* ${nomAuteurMessage}
┃ 📢 *Message:* ${mess}
┣━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

  let emoji = ['🤔', '🥏', '📛', '🫡', '🚨'];
  let random = Math.floor(Math.random() * emoji.length);

  for (const membre of adminsGroupe) {
    tag += `┃ ${emoji[random]} @${membre.id.split("@")[0]}\n`;
  }

  tag += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛`;

  await zk.sendMessage(dest, {
    text: tag,
    mentions: adminsGroupe.map(i => i.id),
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      mentionedJid: adminsGroupe.map(i => i.id),
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363407848040840@newsletter",
        newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
        serverMessageId: 1
      }
    }
  }, { quoted: quotedContact });  // <=== Hii ni sehemu ya quoting contact
});
