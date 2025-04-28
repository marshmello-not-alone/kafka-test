const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "logger-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "logger-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-signups", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const user = JSON.parse(message.value.toString());
      console.log(`[Logger] New user signup: ${user.name} (${user.email})`);
    },
  });
};

run();
