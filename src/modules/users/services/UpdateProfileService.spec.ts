
import AppError from '@shared/errors/AppErrors';

import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider
        )
    });

    it('should be able update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@teste.com',
        });

        expect(updatedUser.name).toBe('John Trê');
        expect(updatedUser.email).toBe('johntre@teste.com');

    });

    it('should not be able show the profile from non-existing user', async () => {
        expect(updateProfile.execute({
            user_id: 'Non existing user id',
            name: 'Teste',
            email: 'teste@mail.com'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@teste.com',
            password: '12345'
        });

       await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'johndoe@mail.com',
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should be able to updated the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@teste.com',
            old_password: '12345',
            password: '123456'
        });

        expect(updatedUser.password).toBe('123456');

    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        await expect (updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@teste.com',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError);


    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        await expect (updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@teste.com',
            old_password: '12345678',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError);
    });

});
 