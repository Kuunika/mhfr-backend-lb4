import { Entity, model, property } from '@loopback/repository';

@model()
export class Facility extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  facility_code: string;

  @property({
    type: 'string',
  })
  facility_code_dhis2?: string;

  @property({
    type: 'string',
  })
  facility_code_openlmis?: string;

  @property({
    type: 'number',
  })
  registration_number?: number;

  @property({
    type: 'string',
    required: true,
  })
  facility_name: string;

  @property({
    type: 'string',
  })
  common_name?: string;

  @property({
    type: 'date',
  })
  facility_date_opened?: string;

  @property({
    type: 'number',
  })
  facility_type_id?: number;

  @property({
    type: 'number',
  })
  facility_owner_id?: number;

  @property({
    type: 'number',
  })
  facility_operational_status_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  facility_regulatory_status_id: number;

  @property({
    type: 'number',
    required: true,
  })
  district_id: number;

  @property({
    type: 'number',
    required: true,
  })
  client_id: number;

  @property({
    type: 'date',
  })
  archived_date?: string;

  @property({
    type: 'date',
  })
  published_date?: string;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @property({
    type: 'date',
    required: true,
  })
  updated_at: string;


  constructor(data?: Partial<Facility>) {
    super(data);
  }
}
