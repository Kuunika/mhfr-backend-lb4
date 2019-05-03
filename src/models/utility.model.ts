import {Entity, model, property} from '@loopback/repository';

@model()
export class Utility extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  utility_name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  utility_type_id: number;


  constructor(data?: Partial<Utility>) {
    super(data);
  }
}
