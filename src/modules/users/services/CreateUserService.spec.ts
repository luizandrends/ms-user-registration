import FakeKafkaProducer from '@shared/infra/container/providers/kafka/fakes/FakeKafkaProducer';
import AppError from '@shared/errors/AppError';
import FakeBCryptHashProvider from '../providers/BCryptHashProvider/fakes/FakeBCryptHashProvider';
import FakeUsersRepository from '../interfaces/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeBCryptHashProvider: FakeBCryptHashProvider;
let fakeKafkaProduecer: FakeKafkaProducer;
let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeBCryptHashProvider = new FakeBCryptHashProvider();
    fakeKafkaProduecer = new FakeKafkaProducer();
    fakeUsersRepository = new FakeUsersRepository();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHashProvider,
      fakeKafkaProduecer
    );
  });

  it('should be able to create users', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@fake.com',
      password: '123456',
    };

    const createUser = await createUserService.execute(userData);

    expect(createUser).toHaveProperty('id');
  });

  it('should not be able to create an existent user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@fake.com',
      password: '123456',
    };

    await createUserService.execute(userData);

    const repeatedEmail = {
      name: 'John Doe',
      email: 'johndoe@fake.com',
      password: '123456',
    };

    await expect(
      createUserService.execute(repeatedEmail)
    ).rejects.toBeInstanceOf(AppError);
  });
});
