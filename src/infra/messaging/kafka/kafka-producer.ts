import "dotenv/config";
import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "test-producer",
    ssl: true,
    brokers: [process.env.KAFKA_BROKER],
    sasl: {
      mechanism: "scram-sha-256",
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
  });

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: process.env.KAFKA_SEND_NOTIFICATION_TOPIC,
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitação de amizade!",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
