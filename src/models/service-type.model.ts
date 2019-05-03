import {Entity, model, property} from '@loopback/repository';

@model()
export class ServiceType extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  service_type: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<ServiceType>) {
    super(data);
  }
}
