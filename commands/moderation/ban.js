
module.exports = {
    name: "ban",
    description: "Ban A Member",
    usage: `(user) (reason)`,
        async execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
        if(!message.member.permissions.has(`${guildProfile.BanPerm}`)) return message.channel.send(`You Don't Have Permissions!!!!!`);

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
       // if (message.mentions.users.first() === `581584824326684672` || `533036968884568065` || `317748198158630913`) return message.channel.send(`Cmon you tried to ban a director!!!`);
        if (!member) return message.channel.send(`You Must Mention A Member ${guildProfile.prefix}ban (User) (reason)`).then (msg => msg.delete({timeout:3000}));

        if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`You Can't Punish Because You Either Have The Same Role Or Your Role Is Lower Than The Person You Are Trying To Ban`);
        const reason = args.slice(1).join(" ") || "No Reason Provided";

        //PUBLIC MESSAGE BELOW
        const banembed = new Discord.MessageEmbed()
        .setTitle('Banned Member')
        .setDescription(`Banned By: ${message.author}`)
        .setColor(`RED`)
        .setTimestamp()
        .addFields(
            {name: `Banned Member:`, value: `${member}`, inline: false},
            {name: `Reason:`, value: `${reason}`, inline: false }
        )

        //LOG MESSAGE
        const logembed = new Discord.MessageEmbed()
        .setTitle(`MEMBER BANNED`)
        .setColor(`${guildProfile.EmbedColor}`)
        .setDescription(`Banned By: ${message.author}`)
        .addFields(
            {name: `Member Banned:`, value: `${member}`, inline: false},
            {name: `Reason:`, value: `${reason}`, inline: false}
        )

        //DM MESSAGE
        const DMmessage = new Discord.MessageEmbed()
        .setTitle(`You Have Been Banned`)
        .setColor(`RED`)
        .addFields(
            {name: `Banned By:`, value: `${message.author}`, inline: false},
            {name: `Reason:`, value: `${reason}`, inline: false},
        )


        if(member){

            try{
                message.mentions.users.first().send(DMmessage)
            setTimeout(function(){
                member.ban({ reason })
                message.channel.send(banembed);
                client.channels.cache.get(`${process.env.LOG}`).send(logembed);
                require('log-timestamp');
                console.log(`MEMBER BANNED
BANNED BY: ${message.author.tag}
REASON: ${reason}
MEMBER BANNED: ${member}`)
             }, 3000);
            } catch (err){
                message.channel.send(`You Have Not Set A Log Channel. ${message.guild.owner}, Please do ${guildProfile.prefix}setup to set up your channels.`)
                return;
            }

        }else{
            channel.send(`${message.author}, Cannot Ban that Member`)
        }

    }
}
