
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailiabilityService from '@modules/appointments/services/ListProviderMonthAvailiabilityService';

export default class ProviderMonthAvailabilityController{
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year} = request.body;

    const listProviderMonthAvailiabilityService = container.resolve(ListProviderMonthAvailiabilityService);

    const availability = await listProviderMonthAvailiabilityService.execute({
        provider_id,
        month,
        year
    });

    return response.json(availability);
   
  }
}