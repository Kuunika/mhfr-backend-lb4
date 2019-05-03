import {Entity, model, property} from '@loopback/repository';

@model()
export class FacilityType extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  facility_type: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<FacilityType>) {
    super(data);
  }
}
