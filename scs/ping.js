const { bmbtz } = require(__dirname + '/../devkillstrom/killstrom');
const moment = require("moment-timezone");
const set = require(__dirname + '/../settings');

moment.tz.setDefault(set.TZ);

bmbtz(
  {
    nomCom: "ping",
    categorie: "General",
    reaction: "⚡"
  },
  async (dest, zk, context) => {
    const { ms } = context;

    const time = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");
    const ping = Math.floor(Math.random() * 90) + 10;

    const caption = `
╭━━━〔 ⚡ KILLSTROM-MD STATUS 〕━━━╮
┃
┃ 🏓 *PONG RESPONSE*
┃ ⏱ Speed   : ${ping} ms
┃ 📅 Date    : ${date}
┃ 🕒 Time    : ${time}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
`.trim();

    try {
      await zk.sendMessage(
        dest,
        {
          text: caption,
          contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363407848040840@newsletter",
              newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
              serverMessageId: 1
            },
            externalAdReply: {
              title: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗 ⚡",
              body: "Fast • Stable • Secure WhatsApp Bot",
              thumbnailUrl: "https://files.catbox.moe/ekidmf.png",
              mediaType: 1,
              renderSmallThumbnail: true
            }
          }
        },
        { quoted: ms }
      );
    } catch (e) {
      console.log("PING ERROR:", e);
    }
  }
);
