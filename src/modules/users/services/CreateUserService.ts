import { inject, injectable } from 'tsyringe';
import { Users as User } from '@prisma/client';

import { UsersInterface } from '../interfaces/UsersInterface';
import { UserDTO } from '../dtos/UserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersInterface
  ) {}

  public async execute(userData: UserDTO): Promise<User> {
    const { name, email, password } = userData;

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
