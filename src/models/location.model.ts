import {Entity, model, property} from '@loopback/repository';

@model()
export class Location extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  catchment_area: string;

  @property({
    type: 'number',
    required: true,
  })
  catchment_population: number;

  @property({
    type: 'number',
    required: true,
  })
  facility_id: number;

  @property({
    type: 'number',
  })
  client_id?: number;


  constructor(data?: Partial<Location>) {
    super(data);
  }
}
