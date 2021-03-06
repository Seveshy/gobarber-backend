
import AppError from '@shared/errors/AppErrors'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

      
       
        authenticateUser = new AuthenticateUserService(
           fakeUsersRepository,
           fakeHashProvider
           );
    })

    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
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
        expect(authenticateUser.execute({
            email: 'johndoe@mail.com',
            password: '12345'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not not be able to authenticate with wrong password', async () => {
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider
            );

            const user = await fakeUsersRepository.create({
                name: 'John Doe',
                email: 'johndoe@mail.com',
                password: '12345'
            })

        await expect(authenticateUser.execute({
            email: 'johndoe@mail.com',
            password: 'non-wrong'
        })).rejects.toBeInstanceOf(AppError);

    });

})