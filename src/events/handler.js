const fs = require("fs")
const path = require("path")

module.exports = (client) => {
  const eventsPath = path.join(__dirname, "events")
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"))

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)
    
    client[event.once ? "once" : "on"](event.name, async (...args) => event.execute(client, ...args))
  }
}