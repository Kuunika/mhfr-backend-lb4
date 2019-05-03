import {Entity, model, property} from '@loopback/repository';

@model()
export class UtilityType extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  utility_type: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<UtilityType>) {
    super(data);
  }
}
