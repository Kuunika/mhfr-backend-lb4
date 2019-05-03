import { Entity, model, property } from '@loopback/repository';

@model()
export class OperationalStatus extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  facility_operational_status: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<OperationalStatus>) {
    super(data);
  }
}
