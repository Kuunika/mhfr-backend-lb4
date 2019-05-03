import {Entity, model, property} from '@loopback/repository';

@model()
export class Zone extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  zone_name: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<Zone>) {
    super(data);
  }
}
