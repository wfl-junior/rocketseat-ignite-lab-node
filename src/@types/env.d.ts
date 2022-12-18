declare namespace NodeJS {
  interface ProcessEnv {
    KAFKA_CLIENT_ID: string;
    KAFKA_SEND_NOTIFICATION_TOPIC: string;
    KAFKA_BROKER: string;
    KAFKA_USERNAME: string;
    KAFKA_PASSWORD: string;
  }
}
