export default interface KafkaProducerDTO {
  kafka: {
    topicName: string;
  };
  userId: string;
  email: string;
  password: string;
}
