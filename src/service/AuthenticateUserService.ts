import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response { 
    user: User;
    token: string
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Error email password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.')
            
        }

        const token = sign({}, 'bddf5da09a1a0a5eda2ff4eeb7c68f28', {
            subject: user.id,
            expiresIn: '1d'
        });

        // Usuário autenticado

        return {
            user,
            token
        };
    }
}

export default AuthenticateUserService;