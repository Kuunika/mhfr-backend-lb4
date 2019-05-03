import {Entity, model, property} from '@loopback/repository';

@model()
export class FacilityUtility extends Entity {
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
    type: 'string',
    required: true,
  })
  utility_id: string;

  @property({
    type: 'number',
  })
  client_id?: number;

  @property({
    type: 'date',
  })
  created_at?: string;


  constructor(data?: Partial<FacilityUtility>) {
    super(data);
  }
}
