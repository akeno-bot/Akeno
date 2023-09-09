const path = require("path");
const { ShardingManager } = require("discord.js");
const { Logger } = require("./modules/logger");
const { BOT_TOKEN } = require("../secret/env");
const { sharder } = require("../secret/config");

const logger = new Logger();

const manager = new ShardingManager(path.join(__dirname, "bot.js"), {
  token: BOT_TOKEN,
  totalShards: sharder.shardsCount,
  respawn: true,
  mode: sharder.shardingMode,
});

manager
  .on("shardCreate", (shard) => {
    logger.log(`Shard #${shard.id} has spawned.`);

    shard
      .on("disconnect", () => {
        logger.warning(`Shard #${shard.id} has disconnected.`);
      })
      .on("reconnecting", () => {
        logger.log(`Shard #${shard.id} has reconnected.`);
      });

    if (manager.shards.size === manager.totalShards)
      logger.log("All shards have been spawned successfully.");
  })
  .spawn();
