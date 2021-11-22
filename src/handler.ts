/*
The code here adds commands to the Discord api
To add code for when the command is run by someone create a file in the commands folder with the same name as the command
You can copy paste the code from ping.ts and customize it to your needs
*/

export default async (client, testing) => {
	const guild = client.guilds.cache.get('a server id') // Put the server id for the server you are using to test your bot

	let commands
	if (testing) commands = guild.commands
	else commands = client.application.commands

	// For every command in the bot use this to add the command to Discord's api:
	commands.create({
		name: 'ping',
		description: 'Ping pong! 🏓'
	})

	// To delete a command from Discord's api use this:
	// commands.delete((await commands.fetch()).find(a => a.name === 'command name), '657750030903672832')
}
