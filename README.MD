[Producer]
↓
[Kafka Topic: "user-signups"]
↓ ↓ ↓
[loggerConsumer] → just logs event
[emailConsumer] → sends email via SendGrid
[crmConsumer] → saves user info into PostgreSQL DB, customer relationship management

File / Service | Purpose
docker-compose.yml | Spins up Kafka + Zookeeper containers using Docker
producer/userServiceProducer.js | (Optional) Static test producer that sends sample events to Kafka
consumers/loggerConsumer.js | Listens to the user-signups topic and logs signup events
consumers/emailConsumer.js | Listens to the user-signups topic and simulates sending a welcome email
consumers/crmConsumer.js | Listens to the user-signups topic and simulates adding the user into a CRM system
server.js | Fastify API server that dynamically produces signup events to Kafka via HTTP POST /signup
