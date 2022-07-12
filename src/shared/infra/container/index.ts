import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import UsersRepository from '@modules/users/infra/database/repositories/UsersRepository';
import { UsersInterface } from '@modules/users/interfaces/UsersInterface';

container.registerSingleton<UsersInterface>('UsersRepository', UsersRepository);
