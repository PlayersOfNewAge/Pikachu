const botConfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {

  console.log(`${bot.user.username}  aktif!`);
  bot.user.setGame("www.gameuxstudios.com ");

});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botConfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `sa`)  {
    return message.channel.send("Aleyküm Selam!");
  }


})

bot.login(botConfig.token);
