import {Entity, model, property} from '@loopback/repository';

@model()
export class Address extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  physical_address: string;

  @property({
    type: 'string',
  })
  postal_address?: string;

  @property({
    type: 'string',
  })
  village?: string;

  @property({
    type: 'string',
  })
  ta?: string;

  @property({
    type: 'number',
    required: true,
  })
  facility_id: number;

  @property({
    type: 'number',
    required: true,
  })
  client_id: number;


  constructor(data?: Partial<Address>) {
    super(data);
  }
}
