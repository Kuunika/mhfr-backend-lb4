import {Entity, model, property} from '@loopback/repository';

@model()
export class FacilityService extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  service_id: number;

  @property({
    type: 'number',
    required: true,
  })
  facility_id: number;

  @property({
    type: 'number',
  })
  client_id?: number;


  constructor(data?: Partial<FacilityService>) {
    super(data);
  }
}
