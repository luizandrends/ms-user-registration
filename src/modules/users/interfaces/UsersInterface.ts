import { Users as User } from '@prisma/client';

import { UserDTO } from '../dtos/UserDTO';

export interface UsersInterface {
  create(userData: UserDTO): Promise<User>;
  findByEmail(userEmail: string): Promise<User | null | undefined>;
}
