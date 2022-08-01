const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = (client, instance) => {

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    client.on("guildCreate", async (interaction, client) => {
        const guild = interaction;

        const channel = guild.channels.cache.find(
            (c) =>
            c.type === "GUILD_TEXT" &&
            c.permissionsFor(guild.me).has("SEND_MESSAGES")
        );

        const join = new MessageEmbed()
        .setColor(`DARK_PURPLE`)
        .setDescription(`
    You Can View My Commands Using /help. I hope You enjoy
    [Vivid Moderation](https://discord.com/api/oauth2/authorize?client_id=969623622895419463&permissions=8&scope=bot%20applications.commands), [Vivid Music](https://discord.com/oauth2/authorize?client_id=969623622895419463&permissions=8&scope=bot%20applications.commands), [Vivid Community](https://discord.gg/wyddvBrTGS), [SFL Community](https://discord.gg/GqNugwhyxP)
        `)
        await channel.send({ embeds: [join] });
    });
};

module.exports.config = {

    displayName: 'Guild Add',
    dbName: 'Guild Add' // Never Touch this 

  }