import { Entity, model, property } from '@loopback/repository';

@model()
export class FacilityResource extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  facility_id: number;

  @property({
    type: 'number',
    required: true,
  })
  resource_id: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
  })
  client_id?: number;

  @property({
    type: 'date',
  })
  created_date?: string;


  constructor(data?: Partial<FacilityResource>) {
    super(data);
  }
}
