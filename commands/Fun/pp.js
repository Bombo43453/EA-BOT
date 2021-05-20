
module.exports = {
   name: 'ppsize',
   aliases: ['pp'],
   description: "Show a User's PP Size",
   usage: `(user/leave empty)`,
   execute(client, message, args, Discord, errorlog, botlog, msglog, profileData, guildProfile){
     const mentioned = message.mentions.users.first();
   // if (!mentioned) return message.channel.send(`Please Mention A User Usage: ${process.env.PREFIX}ppsize (user)`)
     const ppsize = [
       "8------o",
       "No PP U Female",
       "8--o",
       "8---------------o",
       "8-----o",
       "8-------------------------------o (very big)",
       "8----------o",
       "8----------------------------------------------------------------0 is this possible?",
       "Im Telling On You ",
       "8=====================================================================D"
     ]
       const ppsizes = ppsize[Math.floor(Math.random() *ppsize.length)]

       const ppembed = new Discord.MessageEmbed()
       .setColor(`${guildProfile.EmbedColor}`)
       .setDescription(`Hey, ${message.author} your PP Size Is: \n ${ppsizes}`)

       const userembed = new Discord.MessageEmbed()
       .setColor(`${guildProfile.EmbedColor}`)
       .setDescription(`${mentioned}'s PPsize is: \n ${ppsizes}`)

       if(!message.mentions.users.first()) return message.channel.send(ppembed)
       message.channel.send(userembed)

   }
}
