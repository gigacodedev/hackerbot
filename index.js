require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { DISCORD_TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, "commands", file));
  console.log(command);
  client.commands.set(command.name, command);
}

const eventFiles = fs
  .readdirSync(path.join(__dirname, "events"))
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(path.join(__dirname, "events", file));
  client.events.set(event.name, event);
}

//client.login(DISCORD_TOKEN);
