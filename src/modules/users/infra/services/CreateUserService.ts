import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import AppError from '../../../../shared/errors/AppErrors';
import { injectable, inject} from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}
@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ){}
        
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.')
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;