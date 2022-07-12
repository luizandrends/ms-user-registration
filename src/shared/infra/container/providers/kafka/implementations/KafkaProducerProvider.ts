import { kafka } from '@shared/infra/events/kafka';

import KafkaProducerDTO from '../dtos/KafkaProducerDTO';
import KafkaProducerInterface from '../interfaces/KafkaProducerInterface';

export default class KafkaProducer implements KafkaProducerInterface {
  public async sendEvent(payload: KafkaProducerDTO): Promise<void> {
    const producer = kafka.producer();

    await producer.connect();

    const parsedPayload = JSON.stringify(payload);

    await producer.send({
      topic: payload.kafka.topicName,
      messages: [{ value: parsedPayload }],
    });

    await producer.disconnect();
  }
}
