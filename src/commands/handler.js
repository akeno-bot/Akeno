const fs = require("fs")
const path = require("path")

const { REST, Routes, Collection, Events } = require("discord.js")

const env = require("../../secret/env")

module.exports = (client) => {
  const commands = []
  client.commands = new Collection()
  
  const foldersPath = path.join(__dirname, "commands")
  const commandFolders = fs.readdirSync(foldersPath)

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file)
      const command = require(filePath)
      
      if ("name" in command && "description" in command) {
        commands.push({
          options: command.options || [],
          name: command.name,
          description: command.description,
          dm_permission: command.dm
        })
        
        client.commands.set(command.name, command)
      } else {
        client.logger.warning(`The command at ${filePath} is missing a required property.`);
      }
    }
  } 

  client.once(Events.ClientReady, async (client) => {
    try {
      const rest = new REST().setToken(env.BOT_TOKEN)

      client.logger.log(`Started refreshing ${commands.length} application (/) commands.`)

      const data = await rest.put(
          Routes.applicationCommands(env.CLIENT_ID),
          { body: commands },
        )

        client.logger.log(`Successfully reloaded ${data?.length} application (/) commands.`)
    } catch(error) {
      console.error(error)
      process.exit(1)
    }
  })
}