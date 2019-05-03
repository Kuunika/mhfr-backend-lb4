import { Entity, model, property } from '@loopback/repository';

@model()
export class Resource extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  resource_name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  resource_type_id: number;


  constructor(data?: Partial<Resource>) {
    super(data);
  }
}
