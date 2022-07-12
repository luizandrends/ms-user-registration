import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

class CreateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const userData = {
      name,
      email,
      password,
    };

    const user = await createUserService.execute(userData);

    return response.json(instanceToInstance(user));
  }
}

export default CreateUserController;
