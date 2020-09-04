
import AppError from '@shared/errors/AppErrors'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakerUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakerUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
       
         resetPassword = new ResetPasswordService(
            fakerUsersRepository, 
            fakeUserTokensRepository
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakerUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        })

        const { token } = await fakeUserTokensRepository.generate(user.id);

        await resetPassword.execute({
            password: '12345',
            token
        });

        const updatedUser = await fakerUsersRepository.findById(user.id);

        // Eu espero que a função sendEmail, tenha sido chamada
        expect(updatedUser?.password).toBe('12345');
    });  
})

// Hash

// 2h expiração

// userToken inexistente

