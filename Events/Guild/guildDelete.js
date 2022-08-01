const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = (client, instance) => {

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    client.on("guildDelete", async (interaction, client) => {
        const guild = interaction;

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("The bot left a server")
        .setDescription(`${client.user.tag} was removed from a server.`)
        .setFields(
            {name: "Guild Name:", value: `${guild.name}`, inline: true},
            {name: "Guild Members:", value: `${guild.memberCount}`, inline: true},
            {name: "Total Guilds", value: `${client.guilds.cache.size}`},
            {name: "Total Users", value: `${client.users.cache.size}`}
        )
        .setTimestamp();
        
        const logC = client.channels.cache.get("957694468549668935")

        logC.send({ embeds: [embed] })
    });

};

module.exports.config = {

    displayName: 'Guild Remove',
    dbName: 'Guild Remove' // Never Touch this 

  }