const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "crm-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "crm-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-signups", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const user = JSON.parse(message.value.toString());
      console.log(`[CRM] Adding user to CRM: ${user.name}`);
    },
  });
};

run();
