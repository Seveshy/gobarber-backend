import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../../../modules/users/infra/services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    
    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
        email,
        password
    });

    delete user.password;

    return response.json({ user, token });

  } catch(err) {
    return response.status(err.statusCode).json({ error: err.message });
    }
});

export default sessionRouter;
