const { bmbtz } = require("../devkillstrom/Killstrom");
const s = require("../settings");
const fs = require('fs');
const Heroku = require('heroku-client');

// Newsletter / forwarded context (change these values to your newsletter JID / name)
const NEWSLETTER_JID = "120363407848040840@newsletter";
const NEWSLETTER_NAME = "𝗞𝗜𝗟𝗟𝗦𝗧𝗥𝗢𝗠-𝗠𝗗";

const newsletterContext = {
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: NEWSLETTER_JID,
      newsletterName: NEWSLETTER_NAME
    }
  }
};

// Helper to send boxed messages with newsletter context
async function sendBox(chatId, zk, ms, title, message) {
  const box = `
╔══════════════════╗
    *${title}* 
╚══════════════════╝

${message}
  `;
  try {
    await zk.sendMessage(chatId, { text: box, ...newsletterContext }, { quoted: ms });
  } catch (error) {
    console.error(`Error sending box message (${title}):`, error);
    try {
      await zk.sendMessage(chatId, { text: '⚠️ Error processing your request.' }, { quoted: ms });
    } catch (e) {
      console.error('Failed fallback send:', e);
    }
  }
}

// Function to get a description of an environment variable
function getDescriptionFromEnv(varName) {
  try {
    const filePath = "./app.json";
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const config = JSON.parse(fileContent);
    return config.env[varName]?.description || "The environment variable description was not found.";
  } catch (err) {
    return "Could not read app.json to get environment variable description.";
  }
}

// Generic pattern for toggles to avoid repetition
function registerToggleCommand(commandName, settingKey, enabledValue, disabledValue, title, enabledText, disabledText, preserveQuotedHelp = false) {
  bmbtz({
    nomCom: commandName,
    categorie: "heroku-client"
  }, async (chatId, zk, context) => {
    const { ms, repondre, superUser, arg } = context;

    if (!superUser) {
      return repondre("*This command is only allowed to be controlled by the owner.👤");
    }

    if (!arg[0]) {
      const help = `👉 Usage:\n- Type: *${commandName} on*  to enable\n- Type: *${commandName} off*   to disable`;
      return sendBox(chatId, zk, ms, title, help);
    }

    const option = arg.join(' ').toLowerCase();
    let responseMessage;

    switch (option) {
      case "on":
        s[settingKey] = enabledValue;
        responseMessage = enabledText || "has been enabled successfully.";
        break;

      case "off":
        s[settingKey] = disabledValue;
        responseMessage = disabledText || "has been disabled successfully.";
        break;

      default:
        return sendBox(chatId, zk, ms, title, "❌ Invalid option.\nUse: *" + commandName + " on* or *" + commandName + " off*.");
    }

    return sendBox(chatId, zk, ms, title, responseMessage);
  });
}

//=============== COMMAND REGISTRATIONS ===============//

// anticall
registerToggleCommand(
  "anticall",
  "ANTICALL",
  "on",
  "off",
  "ANTI-CALL MODE",
  "✅ Anti-call has been *enabled* successfully.",
  "❌ Anti-call has been *disabled* successfully."
);

// autoreact
registerToggleCommand(
  "autoreact",
  "AUTO_REACT",
  "on",
  "off",
  "AUTO-REACT",
  "✅ Auto-react has been *enabled* successfully.",
  "❌ Auto-react has been *disabled* successfully."
);

// readstatus
registerToggleCommand(
  "readstatus",
  "AUTO_READ_STATUS",
  "on",
  "off",
  "AUTO-READ STATUS",
  "✅ Auto-read status has been *enabled* successfully.",
  "❌ Auto-read status has been *disabled* successfully."
);

// antidelete
registerToggleCommand(
  "antidelete",
  "ADM",
  "on",
  "off",
  "ANTI-DELETE MODE",
  "✅ Anti-delete has been *enabled* successfully.",
  "❌ Anti-delete has been *disabled* successfully."
);

// downloadstatus
registerToggleCommand(
  "downloadstatus",
  "AUTO_DOWNLOAD_STATUS",
  "on",
  "off",
  "DOWNLOAD STATUS",
  "✅ Auto-download status has been *enabled* successfully.",
  "❌ Auto-download status has been *disabled* successfully."
);

// startmessage
registerToggleCommand(
  "startmessage",
  "DP",
  "on",
  "off",
  "START MESSAGE",
  "✅ Start message has been *enabled* successfully.",
  "❌ Start message has been *disabled* successfully."
);

// readmessage
registerToggleCommand(
  "readmessage",
  "AUTO_READ_MESSAGES",
  "on",
  "off",
  "AUTO-READ MESSAGES",
  "✅ Auto-read messages has been *enabled* successfully.",
  "❌ Auto-read messages has been *disabled* successfully."
);

// pm-permit
registerToggleCommand(
  "pm-permit",
  "PM_PERMIT",
  "on",
  "off",
  "PM PERMIT",
  "✅ PM permit has been *enabled* successfully.",
  "❌ PM permit has been *disabled* successfully."
);

// greet
registerToggleCommand(
  "greet",
  "AUTO_REPLY",
  "on",
  "off",
  "GREET / AUTO-REPLY",
  "✅ Auto-reply (greet) has been *enabled* successfully.",
  "❌ Auto-reply (greet) has been *disabled* successfully."
);

// publicmode
registerToggleCommand(
  "publicmode",
  "MODE",
  "on",
  "off",
  "PUBLIC MODE",
  "✅ Public mode has been *enabled* successfully.",
  "❌ Public mode has been *disabled* successfully."
);

// autorecord (uses numeric state for enabled)
registerToggleCommand(
  "autorecord",
  "ETAT",
  "3",
  "off",
  "AUTO-RECORD",
  "✅ Auto-record has been *enabled* successfully.",
  "❌ Auto-record has been *disabled* successfully."
);

// autotyping (numeric state)
registerToggleCommand(
  "autotyping",
  "ETAT",
  "2",
  "off",
  "AUTO-TYPING",
  "✅ Auto-typing has been *enabled* successfully.",
  "❌ Auto-typing has been *disabled* successfully."
);

// alwaysonline (numeric state)
registerToggleCommand(
  "alwaysonline",
  "ETAT",
  "1",
  "off",
  "ALWAYS ONLINE",
  "✅ Always-online has been *enabled* successfully.",
  "❌ Always-online has been *disabled* successfully."
);

// privatemode (flipped: enabling private sets MODE to 'off', disabling sets 'on' = public)
registerToggleCommand(
  "privatemode",
  "MODE",
  "off",
  "on",
  "PRIVATE MODE",
  "✅ Private mode has been *enabled* successfully.",
  "❌ Private mode has been *disabled* successfully."
);

// autolikestatus
registerToggleCommand(
  "autolikestatus",
  "AUTO_LIKE_STATUS",
  "on",
  "off",
  "AUTO-LIKE STATUS",
  "✅ Auto-like status has been *enabled* successfully.",
  "❌ Auto-like status has been *disabled* successfully."
);

// chatbot
registerToggleCommand(
  "chatbot",
  "CHATBOT",
  "on",
  "off",
  "CHATBOT",
  "✅ Chatbot has been *enabled* successfully.",
  "❌ Chatbot has been *disabled* successfully."
);

//=============== HEROKU VARS CHANGER ===============//

// Function to change Heroku environment variables
function changevars(commandName, varName) {
  bmbtz({
    nomCom: commandName,
    categorie: 'heroku-client'
  }, async (chatId, zk, context) => {
    const { arg, superUser, repondre } = context;
    
    if (!superUser) {
      repondre("This command is for my owner only!");
      return;
    }

    if (!s.HEROKU_APP_NAME || !s.HEROKU_API_KEY) {
      repondre("Fill in the HEROKU_APP_NAME and HEROKU_API_KEY environment variables");
      return;
    }

    if (!arg[0]) {
      repondre(getDescriptionFromEnv(varName));
      return;
    }

    const heroku = new Heroku({ token: s.HEROKU_API_KEY });
    try {
      await heroku.patch(`/apps/${s.HEROKU_APP_NAME}/config-vars`, {
        body: {
          [varName]: arg.join(" ")
        }
      });

      repondre("That Heroku variable is changing, The bot is restarting....");
    } catch (err) {
      console.error("Error changing Heroku config var:", err);
      repondre("⚠️ Failed to change Heroku config variable. Check logs and credentials.");
    }
  });
}

changevars("setprefix", "PREFIXES");
changevars("menulinks", "BOT_MENU_LINKS");
