/*

READ ME PLEASE!
Most of the stuff in this file you will not need to touch but you will need to edit the switch statement in the on command callback (~line 60)
You also will need to edit the .env file to add your bot token
Check out the comments in handler.ts too, or your bot will not work
If you are testing your bot, make sure to set the testing variable to true (right below this comment)

To run your bot use "npm run start"

*/

const testing = true

// Imports

import Discord from 'discord.js'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import handler from './handler'

// Client

const client = new Discord.Client({
	intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
})

// Command handler

let commands: any = new Discord.Collection()
let commandsTable: any = []

console.log('Loading commands...')

const commandFiles = fs
	.readdirSync('./src/commands/')
	.filter((file) => file.endsWith('.ts')) // array containing names + file extension of all command modules

commandFiles.forEach((file) => {
	// for each command module
	import(`./commands/${file}`).then((imported) => {
		// import command module
		const { command } = imported
		commands.set(command.name, command) // add to list of commands

		commandsTable.push({ command_name: command.name, loaded: true }) // add command to an array of commands
	})
})

// On ready

client.once('ready', () => {
	handler(client, testing)

	console.table(commandsTable) // show all commands loaded in a table

	console.log('Bot is online!')
})

// On command

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return // not command

	const { commandName } = interaction

	// Add more cases here to add more commands. Just copy and paste the example case and change the command name from 'ping' to something else
	// You need to check handler.ts too, or this won't work
	switch (commandName) {
		case 'ping':
			commands.get('ping').execute({
				interaction
			})
			break
	}
})

// Login to bot

client.login(process.env.TOKEN)
