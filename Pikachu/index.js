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

  if(cmd === `${prefix}raporla`) {

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Kullanıcı Bulunamadı.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Raporlar")
    .setColor("#15f153")
    .addField("Raporlanmış Kullanıcı", `${rUser} - ID: ${rUser.id}`)
    .addField("Raporlayan", `${message.author} - ID: ${message.author.id}`)
    .addField("Sohbet Kanalı", message.channel)
    .addField("Zaman", message.createdAt)
    .addField("Sebep", reason);


    let reportsChannel = message.guild.channels.find(`name`, "report-logs");
    if(!reportsChannel) return message.channel.send("Raporların konulcağı kanal bulunamadı.");

    //message.delete.catch(O_o=>{});
    reportsChannel.send(reportEmbed);

    return;

  }

  if(cmd === `${prefix}at`) {

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) message.channel.send("Kullanıcı Bulunamadı!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu komut için yetkiniz bulunmamakta!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu kullanıcı atılamaz!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Sunucudan Atma~")
    .setColor("#bc0000")
    .addField("Atılan Kullanıcı", `${kUser} + Kullanıcı ID: ${kUser.id}`)
    .addField("Atan Kullanıcı", `<@${message.author.id} + Kullanıcı ID: ${message.author.id}`)
    .addField("Kanal", message.channel)
    .addField("Zaman", message.createdAt)
    .addField("Sebep", kReason);

    let kickChannel = message.guild.channels.find('name', "logs");
    if(!kickChannel) return message.channel.send("Kullanıcı atıldığında çıkacak logların konulacağı kanal bulunamadı.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`) {

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) message.channel.send("Kullanıcı Bulunamadı!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu komut için yetkiniz bulunmamakta!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu kullanıcı yasaklanamaz!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Sunucudan Yasaklama~")
    .setColor("#bc0000")
    .addField("Atılan Kullanıcı", `${bUser} + Kullanıcı ID: ${bUser.id}`)
    .addField("Atan Kullanıcı", `<@${message.author.id} + Kullanıcı ID: ${message.author.id}`)
    .addField("Kanal", message.channel)
    .addField("Zaman", message.createdAt)
    .addField("Sebep", bReason);

    let banChannel = message.guild.channels.find('name', "logs");
    if(!banChannel) return message.channel.send("Kullanıcı atıldığında çıkacak logların konulacağı kanal bulunamadı.");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);

    return;
  }

  if(cmd === `${prefix}site`) {

    message.channel.send("**GameUx Studios: **\n" + "https://www.gameuxstudios.com");

  }

  if(cmd === `${prefix}yapımcı`) {

    message.channel.send("**GameUx Studios: **\n" + "https://www.gameuxstudios.com");

  }

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
  if(cmd === `sa` || cmd === `Sa` || cmd === `sA` || cmd === `SA` || cmd === `s.a` || cmd === `S.A` || cmd === `S.a` || cmd === `s.A`)  {
    return message.channel.send("Aleyküm Selam!");
  }

  if(cmd === `merhaba`) {
    return message.channel.send("Merhaba **" + message.author.username + "**");
  }

  // -----------

  if(cmd === `${prefix}hakkında`) {

    let bicon = bot.user.displayAvatarURL;

    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Bilgileri")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Adı:", bot.user.username)
	  .addField("Bot Yapımcı:", "GameUx Studios")
    .addField("Oluşturulma Tarihi:", bot.user.createdAt);

    return message.channel.send(botembed);
  }


})

bot.login(botConfig.token);
