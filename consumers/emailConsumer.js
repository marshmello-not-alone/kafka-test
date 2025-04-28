const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "email-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "email-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-signups", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const user = JSON.parse(message.value.toString());
      console.log(`[Email] Sending welcome email to: ${user.email}`);
    },
  });
};

run();
