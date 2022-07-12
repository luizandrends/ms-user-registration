import KafkaProducerDTO from '../dtos/KafkaProducerDTO';
import { KafkaProducerInterface } from '../interfaces/KafkaProducerInterface';

export default class FakeKafkaProducer implements KafkaProducerInterface {
  private events: KafkaProducerDTO[] = [];

  public async sendEvent(payload: KafkaProducerDTO): Promise<void> {
    this.events.push(payload);
  }
}
