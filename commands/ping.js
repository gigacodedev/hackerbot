module.exports = {
  name: "ping",
  description: "sends pong",
  execute(message) {
    message.channel.send("Pong!");
  },
};
