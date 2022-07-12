import { inject, injectable } from 'tsyringe';
import { Users as User } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import { KafkaProducerInterface } from '@shared/infra/container/providers/kafka/interfaces/KafkaProducerInterface';
import { BCryptHashProviderInterface } from '../providers/BCryptHashProvider/interfaces/BCryptHashProviderInterface';

import { UsersInterface } from '../interfaces/UsersInterface';
import { UserDTO } from '../dtos/UserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersInterface,

    @inject('HashProvider')
    private hashProvider: BCryptHashProviderInterface,

    @inject('KafkaProducer')
    private kafkaProducer: KafkaProducerInterface
  ) {}

  public async execute(userData: UserDTO): Promise<User> {
    const { name, email, password } = userData;

    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError('Email or password invalid', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.kafkaProducer.sendEvent({
      kafka: {
        topicName: 'load-login-database',
      },
      email,
      password: hashedPassword,
      userId: user.id,
    });

    return user;
  }
}

export default CreateUserService;
