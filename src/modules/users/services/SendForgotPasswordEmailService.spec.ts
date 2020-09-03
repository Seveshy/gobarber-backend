
import AppError from '@shared/errors/AppErrors'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakerUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakerUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
       
         sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakerUsersRepository, 
            fakeMailProvider,
            fakeUserTokensRepository
        );
    });

    it('should be able to recover the password using the email', async () => {
        

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakerUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@mail.com',
        });

        // Eu espero que a função sendEmail, tenha sido chamada
        expect(sendMail).toHaveBeenCalled();
    }); 

    it('should not be able to recover a non-existing user password', async () => {
    
            // Eu espero que a função sendEmail, tenha sido chamada
            await expect(sendForgotPasswordEmail.execute({
                email: 'johndoe@mail.com',
            })).rejects.toBeInstanceOf(AppError);
    })

    it('should generate a forgot password token', async () => {
       
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakerUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: '12345'
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@mail.com',
        });

        // Eu espero que a função sendEmail, tenha sido chamada
        expect(generateToken).toHaveBeenCalledWith(user.id);
    }); 
})

// Primeiro vamos fazer nosso teste falhar

// Segundo vamos fazer ele passar

// Terceiro, vamos reaftorar o código

