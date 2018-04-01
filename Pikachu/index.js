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

  if(cmd === `${prefix}sunucubilgi`) {

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Sunucu Bilgileri")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Sunucu Adı:", message.guild.name)
    .addField("Oluşturulma Tarihi:", message.guild.createdAt)
    .addField("Giriş Tarihiniz:", message.member.joinedAt)
    .addField("Toplam Kullanıcılar:", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  // Kısaltmalar
  if(cmd === `sa`)  {
    return message.channel.send("Aleyküm Selam!");
  }
  // -----------

  if(cmd === `${prefix}hakkında`) {

    let bicon = bot.user.displayAvatarURL;

    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Bilgileri")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Adı:", bot.user.username)
    .addField("Oluşturulma Tarihi:", bot.user.createdAt);

    return message.channel.send(botembed);
  }


})

bot.login(botConfig.token);
