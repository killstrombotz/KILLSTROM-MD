const { bmbtz } = require("../devkillstrom/killstrom");
const speed = require("performance-now");

// Function for delay simulation
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to safely get the sender's name
function getName(dest, commandeOptions) {
  return (
    commandeOptions.pushName ||
    commandeOptions.name ||
    (dest.sender ? dest.sender.split('@')[0] : "Unknown User")
  );
}

// Command: Uptime
bmbtz(
  {
    nomCom: 'uptime',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '⌚',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);
    const runtime = process.uptime();
    const formattedRuntime = new Date(runtime * 1000).toISOString().substr(11, 8);
    const img = 'https://ibb.co/C5ht8wcK';
    const murl = 'https://whatsapp.com/channel/0029VbCg36CBKfhshMEigq20';

    // Constructing the contact message
    const con = {
      key: {
        fromMe: false,
        participant: `${dest.sender ? dest.sender.split('@')[0] : "unknown"}@s.whatsapp.net`,
        ...(dest.chat ? { remoteJid: dest.chat } : {}),
      },
      message: {
        contactMessage: {
          displayName: name,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nitem1.TEL;waid=${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }:${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
        },
      },
    };

    // Reply with uptime
    await zk.sendMessage(dest, {
      text: `*KILLSTROM-MD Uptime* 🕒\n\nRuntime: ${formattedRuntime}`,
      contextInfo: {
        mentionedJid: [dest.sender || ""],
        externalAdReply: {
          title: "KILLSTROM-MD - System Uptime",
          body: `Bot has been running for: ${formattedRuntime}`,
          thumbnailUrl: img,
          sourceUrl: murl,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
      quoted: con,
    });

    console.log("Uptime sent successfully with verified tick!");
  }
);

module.exports = {
  delay,
};
        
