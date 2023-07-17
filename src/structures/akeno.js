const { Client, Collection } = require("discord.js")
const { Logger } = require("../modules/logger")
const env = require("../../secret/env")

require("dotenv").config({ path: "../../secret" })

class Akeno extends Client {
  constructor(options, token) {
    super(options)

    // Token
    this.token = token

    // Config
    this.config = require("../../secret/config")

    // Logger
    this.logger = new Logger()

    // Cooldowns
    this.cooldowns = new Collection()

    // Command handler, context menus, etc...
    require("../rest")(this)

    // Event handler
    require("../events/handler")(this)
  }

  async build() {
    await super.login(this.token)
  }
}

module.exports = {
  Akeno
}