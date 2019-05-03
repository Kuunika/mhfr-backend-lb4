import {Entity, model, property} from '@loopback/repository';

@model()
export class Owner extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  facility_owner?: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<Owner>) {
    super(data);
  }
}
