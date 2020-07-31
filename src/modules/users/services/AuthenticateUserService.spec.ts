
import AppError from '@shared/errors/AppErrors'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository, 
            fakeHashProvider
        
        );
        
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider
            );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        })

        const response = await authenticateUser.execute({
            email: 'johndoe@mail.com',
            password: '12345'
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);

    });

    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

      
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider
            );


        expect(authenticateUser.execute({
            email: 'johndoe@mail.com',
            password: '12345'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository, 
            fakeHashProvider
        
        );
        
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider
            );

         await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        })

        expect(authenticateUser.execute({
            email: 'johndoe@mail.com',
            password: 'non-wrong'
        })).rejects.toBeInstanceOf(AppError);

    });

})