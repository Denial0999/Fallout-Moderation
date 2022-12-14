const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/ticketsDB"); //Make sure this path is correct
const { red, green } = require("../../Structures/colors.json");

module.exports = {
    category: "ticket",
    description: "Ticket actions.",
    permissions: ["ADMINISTRATOR"],


	cooldown: '10s',

    
    slash: true,
    testOnly: false, 

    options: [
		{
			name: "action",
			type: "STRING",
			description: "Add and remove a member this ticket.",
			required: true,
			choices: [
				{ name: "Add", value: "add" },
				{ name: "Remove", value: "remove" },
			],
		},
		{
			name: "member",
			type: "USER",
			description: "Select a member.",
			required: true,
		},
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 */

    callback: async({ interaction }) => {
        const { guildId, options, channel } = interaction;

		const Action = options.getString("action");
		const Member = options.getMember("member");

		const Embed = new MessageEmbed();

		switch (Action) {
			case "add":
				DB.findOne(
					{ GuildID: guildId, ChannelID: channel.id },
					async (err, docs) => {
						if (err) throw err;
						if (!docs)
							return interaction.reply({
								embeds: [
									Embed.setColor(red).setDescription(
										"🟥 | This is not a ticket channel."
									),
								],
								ephemeral: true,
							});
						if (docs.MembersID.includes(Member.id))
							return interaction.reply({
								embeds: [
									Embed.setColor(red).setDescription(
										"🟥 | This member is already part of this ticket."
									),
								],
								ephemeral: true,
							});
						docs.MembersID.push(Member.id);
						channel.permissionOverwrites.edit(Member.id, {
							SEND_MESSAGES: true,
							VIEW_CHANNEL: true,
							READ_MESSAGE_HISTORY: true,
						});

						interaction.reply({
							embeds: [
								Embed.setColor(green).setDescription(
									`✅ | ${Member} has been added to the ticket.`
								),
							],
						});
						docs.save();
					}
				);
				break;
			case "remove":
				DB.findOne(
					{ GuildID: guildId, ChannelID: channel.id },
					async (err, docs) => {
						if (err) throw err;
						if (!docs)
							return interaction.reply({
								embeds: [
									Embed.setColor(red).setDescription(
										"🟥 | This is not a ticket channel."
									),
								],
								ephemeral: true,
							});
						if (!docs.MembersID.includes(Member.id))
							return interaction.reply({
								embeds: [
									Embed.setColor(red).setDescription(
										"🟥 | This member is not part of this ticket."
									),
								],
								ephemeral: true,
							});
						docs.MembersID.remove(Member.id);
						channel.permissionOverwrites.delete(Member.id);

						interaction.reply({
							embeds: [
								Embed.setColor(green).setDescription(
									`✅ | ${Member} has been removed from the ticket.`
								),
							],
						});
						docs.save();
					}
				);
				break;
		}
    }
}
