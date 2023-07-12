// https://discordjs.guide/slash-commands/deleting-commands.html#deleting-all-commands

const { Logger } = require("../logger") 
const { REST, Routes } = require("discord.js")

const cfg = require("../../config")

require("dotenv").config()

const logger = new Logger()

async function deleteSlash(option) {
    try {
        const rest = new REST().setToken(process.env.BOT_TOKEN)

        if (option == "global") {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: [] }
            )
        } else if (option == "guild") {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: [] }
            )
        } else {
            return logger.error("Invalid input provided."), process.exit(1)
        }

    } catch(error) {
        logger.error("Something went wrong during slash commands deletion.")
        console.error(error)
        process.exit(1)
    }

    return logger.log("Done!")
}

const args = process.argv.splice(2)
if (!args[0]) {
    logger.error("Not enough arguments provided!")
    process.exit(1)
} else {
    deleteSlash(args[0])
}