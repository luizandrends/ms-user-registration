import { UserDTO } from '@modules/users/dtos/UserDTO';
import { prisma } from '@shared/infra/database';
import { Users as User } from '@prisma/client';

import { UsersInterface } from '@modules/users/interfaces/UsersInterface';

class UsersRepository implements UsersInterface {
  private users: User[] = [];

  public async create(userData: UserDTO): Promise<User> {
    const { name, email, password } = userData;

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  public async findByEmail(
    userEmail: string
  ): Promise<User | null | undefined> {
    const findUser = await prisma.users.findUnique({
      where: { email: userEmail },
    });

    return findUser;
  }
}

export default UsersRepository;
