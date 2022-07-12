import { container } from 'tsyringe';

import KafkaProducerInterface from './kafka/interfaces/KafkaProducerInterface';
import KafkaProducerProvider from './kafka/implementations/KafkaProducerProvider';

container.registerSingleton<KafkaProducerInterface>(
  'KafkaProducer',
  KafkaProducerProvider
);
