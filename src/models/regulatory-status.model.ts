import {Entity, model, property} from '@loopback/repository';

@model()
export class RegulatoryStatus extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  facility_regulatory_status?: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<RegulatoryStatus>) {
    super(data);
  }
}
