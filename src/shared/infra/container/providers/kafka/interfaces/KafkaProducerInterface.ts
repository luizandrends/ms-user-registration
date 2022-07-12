import KafkaProducerDTO from '../dtos/KafkaProducerDTO';

export interface KafkaProducerInterface {
  sendEvent(payload: KafkaProducerDTO): Promise<void>;
}
