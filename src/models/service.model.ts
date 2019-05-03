import { Entity, model, property } from '@loopback/repository';

@model()
export class Service extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  service_name: string;

  @property({
    type: 'string',
  })
  service_description?: string;

  @property({
    type: 'number',
    required: true,
  })
  service_type_id: number;

  @property({
    type: 'number',
  })
  service_category_id?: number;


  constructor(data?: Partial<Service>) {
    super(data);
  }
}
