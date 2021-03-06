const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const token = process.env.TOKEN;
const {clientId }= require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./global-commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./global-commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands }
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();