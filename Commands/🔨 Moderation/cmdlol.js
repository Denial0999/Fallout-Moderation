const { CommandInteraction, MessageEmbed, Message } = require('discord.js');
const colors = require("../../Structures/colors.json")

module.exports = {
    category: "cmdlol",
    description: "Purge a number of messages",

    permissions: ["MANAGE_MESSAGES"],

    slash: true,
    testOnly: false,
    callback: async({interaction}) => {

        const array = require(`../../Structures/premium.json`);
        if (array.some((word) => interaction === word)) {

    const LogsSetup = new MessageEmbed()
              .setDescription(
                "✅| Successfully setup the anti-alt server logs"
              )
              .setColor("#43b581");

              return interaction.reply({
                embeds: [LogsSetup]
              }
            
              )
            }
            else
            {
                interaction.reply('**You dont have the perms to do that!**');
            }
    }
}