const { CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../Structures/Schemas/LogsSetupDB");

module.exports = {
    category: "logs",
    description: "Setup your logging system.",
    permissions: ["ADMINISTRATOR"],
    slash: true,
    testOnly: false,

    cooldown: '10s',

    options: [
        {
            name: "setup",
            description: "Setup your logging system.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "member-logs",
                    description: "Setup your member logs channel.",
                    required: true,
                    type: "CHANNEL",
                    channelType: ["GUILD_TEXT"],

                },
                {
                    name: "message-logs",
                    description: "Setup your message logs channel.",
                    required: true,
                    type: "CHANNEL",
                    channelType: ["GUILD_TEXT"],

                },
                {
                    name: "channel-logs",
                    description: "Setup your channel logs channel.",
                    required: true,
                    type: "CHANNEL",
                    channelType: ["GUILD_TEXT"],
                },
                {
                    name: "role-logs",
                    description: "Setup your role logs channel.",
                    required: true,
                    type: "CHANNEL",
                    channelType: ["GUILD_TEXT"],
                },
                {
                    name: "other-logs",
                    description: "Setup your other logs channel.",
                    required: true,
                    type: "CHANNEL",
                    channelType: ["GUILD_TEXT"],
                },
                {
                    name: "invite-logs",
                    description: "Setup your invite logs channel.",
                    required: true,
                    type: "CHANNEL",
                    channelType: ["GUILD_TEXT"],
                }
            ],

        },
        {
            name: "reset",
            description: "Reset your logging system.",
            type: "SUB_COMMAND",

        }
    ],

        /**
         * 
         * @param {CommandInteraction} interaction 
         */

    callback: async({interaction}) => {

        switch(interaction.options.getSubcommand()) {
            case "setup":
                {
                    const Data = await Schema.findOne({
                        GuildID: interaction.guild.id,
                    });
                    if (!Data) {
                        const newData = new Schema({
                            GuildID: interaction.guild.id,
                            MemberLogsChannel: interaction.options.memberLogs,
                            InviteLogsChannel: interaction.options.inviteLogs,
                            MessageLogsChannel: interaction.options.messageLogs,
                            ChannelLogsChannel: interaction.options.channelLogs,
                            RoleLogsChannel: interaction.options.roleLogs,
                            OtherLogs: interaction.options.otherLogs,
                        });
                        await newData.save();
                    }
                    else {
                        await Schema.findOneAndUpdate(
                        {GuildID: interaction.guild.id},
                        {MemberLogsChannel: interaction.options.memberLogs},
                        {InviteLogsChannel: interaction.options.inviteLogs},
                        {MessageLogsChannel: interaction.options.messageLogs},
                        {ChannelLogsChannel: interaction.options.channelLogs},
                        {RoleLogsChannel: interaction.options.roleLogs},
                        {OtherLogs: interaction.options.otherLogs},
                     )
                    }
                    const embed = new MessageEmbed()
                        .setColor("#0099ff")
                        .setTitle("Logging Setup")
                        .setDescription("Your logging system has been setup!")
                        interaction.reply({embeds : [embed]});
                }
                break;
                case "reset": 
                {
                    const { guild } = interaction;
                    const LogsReset = new MessageEmbed()
                      .setDescription(
                        "<a:Success:934736751468113930> | Successfully reset the logging channel"
                      )
                      .setColor("#43b581");
                    Schema.deleteMany({ GuildID: guild.id }, async (err, data) => {
                      if (err) throw err;
                      if (!data)
                        return interaction.reply({
                          content: "There is no data to delete",
                        });
                      interaction.reply({ embeds: [LogsReset] });
                    });
                  }
                  return;
        }
    
    }
}