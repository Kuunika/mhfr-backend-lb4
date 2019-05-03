import {Entity, model, property} from '@loopback/repository';

@model()
export class ResourceType extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  resource_type: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<ResourceType>) {
    super(data);
  }
}
