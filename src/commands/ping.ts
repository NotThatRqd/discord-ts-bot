const command = {
	name: 'ping',
	description: 'Ping pong!',
	async execute({ interaction }) {

		const reply = await interaction.deferReply({
			fetchReply: true
		})

		interaction.editReply({
			content: `🏓 Pong! That took ${reply.createdTimestamp - interaction.createdTimestamp}ms!`,
		})

	}
}

export { command }