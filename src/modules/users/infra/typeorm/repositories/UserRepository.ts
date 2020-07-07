import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '../../typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUsers';

class UsersRepository  implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

public async findById(id: string): Promise<User | undifined> {
    const user = await this.ormRepository.findOne(id);

    return user;
}

public async findByEmail(email: string): Promise<User | undifined> {
    const user = await this.ormRepository.findOne({
        where: { email }
    });

    return user;
}
  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);

    await this.ormRepository.save(appointment)

    return appointment;
  }

  public async save(user: User): Promise<User> {
      return this.ormRepository.save(user);
  }
}

export default UsersRepository;