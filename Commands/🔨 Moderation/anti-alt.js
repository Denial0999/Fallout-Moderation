const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/AntiAlt.js");

module.exports = {
  category: "antialt",
  description: "Setup or reset the logs channel",
  permissions: ["ADMINISTRATOR"],

  cooldown: '10s',

  options: [
    {
      name: "setup",
      description: "Setup the server anti-alt logs channel",
      type: "SUB_COMMAND",
      options: [
        {
          name: "channel",
          description: "Select the channel to send the server anti-alt logs to",
          required: true,
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
        },
      ],
    },
    {
      name: "reset",
      description: "Reset the logs channel",
      type: "SUB_COMMAND",
    },
  ],

  slash: true,
  testOnly: false, 
  /**
   *
   * @param {GuildMember} member
   * @param {CommandInteraction} interaction
   */
  callback: async({interaction}) => {
    try {
      const options = interaction.options;
      const { guild } = interaction;

      switch (options.getSubcommand()) {
        case "setup":
          {
            const LogsChannel = options.getChannel("channel");

            await DB.findOneAndUpdate(
              { GuildID: guild.id },
              {
                LogsChannel: LogsChannel.id,
              },
              {
                new: true,
                upsert: true,
              }
            ).catch((err) => console.log(err));

            const LogsSetup = new MessageEmbed()
              .setDescription(
                "✅| Successfully setup the anti-alt server logs"
              )
              .setColor("#43b581");

            await guild.channels.cache
              .get(LogsChannel.id)
              .send({ embeds: [LogsSetup] })
              .then((m) => {
                setTimeout(() => {
                  m.delete().catch(() => {});
                }, 1 * 7500);
              });

            await interaction.reply({
              content: "Done",
              ephemeral: true,
            });
          }
          break;
        case "reset":
          {
            const LogsReset = new MessageEmbed()
              .setDescription(
                "✅| Successfully reset the logging channel"
              )
              .setColor("#43b581");
            DB.deleteMany({ GuildID: guild.id }, async (err, data) => {
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
    } catch (e) {
      const errorEmbed = new MessageEmbed()
        .setColor("#f04947")
        .setDescription(`<a:Error:934736751740715009> Error: ${e}`);
      return interaction.reply({
        embeds: [errorEmbed],
        ephemeral: false,
      });
    }
  },
};