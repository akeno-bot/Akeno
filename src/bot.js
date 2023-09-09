const { Akeno } = require("./structures/akeno");
const { clientOptions } = require("../secret/config");
const { BOT_TOKEN } = require("../secret/env");

const client = new Akeno(clientOptions, BOT_TOKEN);

process
  .on("unhandledRejection", async (promise, reason) => {
    console.log(promise, reason);
  })
  .on("uncaughtException", (error) => {
    console.log(error);
  })
  .on("uncaughtExceptionMonitor", (error, origin) => {
    console.log(error, origin);
  });

client.build();
