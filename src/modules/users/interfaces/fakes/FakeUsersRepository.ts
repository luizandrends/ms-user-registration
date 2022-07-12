import { UserDTO } from '@modules/users/dtos/UserDTO';
import { Users as User } from '@prisma/client';
import mongoose from 'mongoose';

import { UsersInterface } from '../UsersInterface';

class FakeUsersRepository implements UsersInterface {
  private users: User[] = [];

  public async create(userData: UserDTO): Promise<User> {
    const { name, email, password } = userData;

    const userId = new mongoose.Types.ObjectId();

    const parsedId = userId.toString();

    const user: User = {
      id: parsedId,
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  public async findByEmail(
    userEmail: string
  ): Promise<User | null | undefined> {
    const findUser = this.users.find(user => user.email === userEmail);

    return findUser;
  }
}

export default FakeUsersRepository;
