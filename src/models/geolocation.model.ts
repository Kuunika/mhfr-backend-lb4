import {Entity, model, property} from '@loopback/repository';

@model()
export class Geolocation extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  datum?: number;

  @property({
    type: 'string',
    required: true,
  })
  longitude: string;

  @property({
    type: 'string',
    required: true,
  })
  latitude: string;

  @property({
    type: 'number',
    required: true,
  })
  facility_id: number;

  @property({
    type: 'number',
  })
  client_id?: number;


  constructor(data?: Partial<Geolocation>) {
    super(data);
  }
}
