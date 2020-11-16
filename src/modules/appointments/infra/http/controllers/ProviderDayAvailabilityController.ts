
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailiabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderMonthAvailabilityController{
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, day, year} = request.body;

    const listProviderDayAvailiabilityService = container.resolve(ListProviderDayAvailiabilityService);

    const availability = await listProviderDayAvailiabilityService.execute({
        provider_id,
        month,
        day,
        year
    });

    return response.json(availability);
   
  }
}