
import AppError from '@shared/errors/AppErrors'

import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakerUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
    beforeEach(() => {
     fakerUsersRepository = new FakeUsersRepository();
     fakeHashProvider = new FakeHashProvider();
     fakeCacheProvider = new FakeCacheProvider();

     createUser = new CreateUserService(fakerUsersRepository, fakeHashProvider, fakeCacheProvider);
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        expect(user).toHaveProperty('id');
    });

    it('should be able to create a new user with same email from another', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        await expect(createUser.execute({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        })).rejects.toBeInstanceOf(AppError);
    });
});