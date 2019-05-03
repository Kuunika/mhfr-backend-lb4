import { Entity, model, property } from '@loopback/repository';

@model()
export class District extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  district_name: string;

  @property({
    type: 'string',
    required: false,
  })
  district_code: string;

  @property({
    type: 'number',
    required: true,
  })
  zone_id: number;


  constructor(data?: Partial<District>) {
    super(data);
  }
}
