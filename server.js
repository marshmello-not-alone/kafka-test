const Fastify = require("fastify");
const { Kafka } = require("kafkajs");

const fastify = Fastify({ logger: true });

const kafka = new Kafka({
  clientId: "api-server",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

fastify.post("/signup", async (request, reply) => {
  const { name, email } = request.body;

  if (!name || !email) {
    return reply.status(400).send({ error: "Name and email are required" });
  }

  try {
    await producer.send({
      topic: "user-signups",
      messages: [{ value: JSON.stringify({ name, email }) }],
    });

    return { status: "success", message: "User signup event sent!" };
  } catch (err) {
    console.error("Error producing signup event", err);
    return reply.status(500).send({ error: "Internal server error" });
  }
});

// Server + Kafka producer startup
const start = async () => {
  try {
    await producer.connect();
    await fastify.listen({ port: 3000 });
    console.log("Fastify server listening on port 3000");
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
