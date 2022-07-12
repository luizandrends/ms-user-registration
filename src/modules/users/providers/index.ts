import { container } from 'tsyringe';

import BCryptHashProvider from './BCryptHashProvider/implementations/BCryptHashProvider';
import { BCryptHashProviderInterface } from './BCryptHashProvider/interfaces/BCryptHashProviderInterface';

container.registerSingleton<BCryptHashProviderInterface>(
  'HashProvider',
  BCryptHashProvider
);
