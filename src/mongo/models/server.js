const { servers } = require("../db")

module.exports = {
    async addServer(id) {
        const server = {
            "id": id
        }

        await servers.insertOne(server)
    },

    async removeServer(id) {
        await servers.deleteOne({ "id": id })
    }
}