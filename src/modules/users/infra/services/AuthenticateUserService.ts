import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';
import { injectable, inject} from 'tsyringe';
import AppError from '../../../../shared/errors/AppErrors';

import User from '../typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface Response { 
    user: User;
    token: string
}
@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository) {}

    public async execute({ email, password }: IRequest): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Error email password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401)
            
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        // Usuário autenticado

        return {
            user,
            token
        };
    }
}

export default AuthenticateUserService;