const { bmbtz } = require(__dirname + "/../devkillstrom/killstrom");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

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
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:KILLSTROM VERIFIED ✅\nORG:KILLSTROM-MD;\nTEL;type=CELL;type=VOICE;waid=923254799865:+923254799865\nEND:VCARD"
    }
  }
};

bmbtz({ nomCom: "repo", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre } = commandeOptions;

    const repoUrl = "https://api.github.com/repos/killstrombotz/KILLSTROM-MD";

    // Random image from /scs folder
    const scsFolder = path.join(__dirname, "../scs");
    const images = fs.readdirSync(scsFolder).filter(f => /^menu\d+\.jpg$/i.test(f));
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imagePath = path.join(scsFolder, randomImage);

    try {
        const response = await axios.get(repoUrl);
        const repo = response.data;

        let repoInfo = `
╭══════════════⊷❍
┃ *KILLSTROM-MD REPOSITORY*
┃══════════════════
┃ ❏ Repo Link:🔗 *${repo.html_url}*
┃ ❏ Name: *${repo.name}*
┃ ❏ Owner: *${repo.owner.login}*
┃ ❏ Stars: ⭐ *${repo.stargazers_count}*
┃ ❏ Forks: 🍴 *${repo.forks_count}*
┃ ❏ Issues: 🛠️ *${repo.open_issues_count}*
┃ ❏ Watchers: 👀 *${repo.watchers_count}*
┃ ❏ Updated: 📅 *${new Date(repo.updated_at).toLocaleString()}*
╰══════════════⊷❍
        `;

        // Send repository info with random image
        await zk.sendMessage(dest, {
            image: { url: imagePath },
            caption: repoInfo,
            footer: "*KILLSTROM-MD GitHub Repository*",
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363407848040840@newsletter",
                    newsletterName: "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗",
                    serverMessageId: 1
                }
            },
        }, { quoted: quotedContact });

    } catch (e) {
        console.log("❌ Error fetching repository data: " + e);
        repondre("❌ Error fetching repository data, please try again later.");
    }
});
