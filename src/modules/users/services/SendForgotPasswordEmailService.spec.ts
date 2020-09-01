
import AppError from '@shared/errors/AppErrors'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakerUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
       
        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakerUsersRepository, 
            fakeMailProvider
            );

        await fakerUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@mail.com',
        });

        // Eu espero que a função sendEmail, tenha sido chamada
        expect(sendMail).toHaveBeenCalled();
    }); 
})

// Primeiro vamos fazer nosso teste falhar

// Segundo vamos fazer ele passar

// Terceiro, vamos reaftorar o código