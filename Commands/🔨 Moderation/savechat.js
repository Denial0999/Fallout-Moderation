const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");

module.exports = {
    category: "savechat",
    description: "saves channel",
    permissions: ["ADMINISTRATOR"],

    slash: true,
    testOnly: false,

    cooldown: '10s',

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    callback: async({interaction}) => {
        const { channel } = interaction;
        
        const reply = new MessageEmbed()
            .setTitle (`Chat saved`)
            .setDescription (`Saved chat : ${channel}`)
            .setColor (`DARK_PURPLE`);
            
        
        const attachment = await createTranscript(channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `${channel}.html`,
            });
    
        
            await interaction
        .reply({
            embeds: [reply],
            files: [attachment],
          });
       

    }

}