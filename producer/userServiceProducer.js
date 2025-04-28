const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "user-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const createUser = async (user) => {
  await producer.connect();
  await producer.send({
    topic: "user-signups",
    messages: [{ value: JSON.stringify(user) }],
  });
  console.log(`User signup event produced: ${user.name}`);
  await producer.disconnect();
};

// Simulate a new user signup
const newUser = { id: "u123", name: "Jay Zhao", email: "jay@example.com" };
createUser(newUser);
