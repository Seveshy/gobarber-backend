
import AppError from '@shared/errors/AppErrors'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakerUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService

describe('ResetForgotPassoword', () => {
    beforeEach(() => {
        fakerUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        
         resetPassword = new ResetPasswordService(
            fakerUsersRepository, 
            fakeUserTokensRepository,
            fakeHashProvider
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakerUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        })

        const { token } = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            password: '12345',
            token
        });

        const updatedUser = await fakerUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('12345');
        expect(updatedUser?.password).toBe('12345');

    });  

    it('should not be able to reset the password with non-existing token', async () => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to reset the password with non-existing user', async () => {
        const { token } = await fakeUserTokensRepository.generate(
            'non-existing-user'
            );

        await expect(
            resetPassword.execute({
                token,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to reset the password if passed more than 2 hours', async () => {
        const user = await fakerUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        })

        const { token } = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementation(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                password: '123123',
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);

    });  
})

// Hash

// 2h expiração

// userToken inexistente

