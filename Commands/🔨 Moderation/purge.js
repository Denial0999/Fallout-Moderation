const { CommandInteraction, MessageEmbed } = require('discord.js');
var id;

module.exports = {
    category: "purge",
    description: "Purge a number of messages",

    permissions: ["MANAGE_MESSAGES"],

    options: [
        {
        name: 'amoumt',
        description: 'Select The Amount Of Messages You Want To Purge',
        type: 'NUMBER',
        required: true
        },
        {
        name: 'target',
        description: 'Select A Target To Clear Their Messages',
        type: 'USER',
        required: false   
        }
    ],

    slash: true,
    testOnly: false, 

    cooldown: '10s',

    /**
     * 
     * @param { CommandInteraction } interaction 
     */

    callback: async ({interaction}) => {
        const { channel, options} = interaction;

        const Amount = options.getNumber('amount')
        const Target = options.getNumber('target')

        const Messages = await channel.messages.fetch();
        const Response = new MessageEmbed()
        .setColor('DARK_VIVID_PINK')

        if (Amount > 100) {
            return interaction.reply('You Cannot Purge More Than 100 Messages At Once')
        }

        if(Target) {
         let i = 0;
         const filtered = [];
         (await Messages).filter((m) => {
             if(m.author.id === Target.id && Amount > i){
                 filtered.push(m);
                 i++;
             }
         })

         await channel.bulkDelete(filtered, true).then(messages => {
             Response.setDescription(`🧹 Cleared ${messages.size} from ${Target}`);
             interaction.reply({ embeds: [Response]})
         })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} From This Channel`);
                interaction.reply({ embeds: [Response]})
        })
    }
    }
}