
import AppError from '@shared/errors/AppErrors'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakerUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakerUsersRepository);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        expect(user).toHaveProperty('id');
    });

    it('should be able to create a new user with same email from another', async () => {
        const fakerUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakerUsersRepository);

         await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        expect(createUser.execute({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        })).rejects.toBeInstanceOf(AppError);
    });

  
})