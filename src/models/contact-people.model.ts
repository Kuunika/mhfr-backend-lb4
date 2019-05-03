import {Entity, model, property} from '@loopback/repository';

@model()
export class ContactPeople extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  contact_person_fullname: string;

  @property({
    type: 'string',
    required: true,
  })
  contact_person_phone: string;

  @property({
    type: 'string',
  })
  contact_person_email?: string;

  @property({
    type: 'string',
  })
  postal_address?: string;

  @property({
    type: 'number',
    required: true,
  })
  facility_id: number;

  @property({
    type: 'number',
    required: true,
  })
  client_id: number;

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


  constructor(data?: Partial<ContactPeople>) {
    super(data);
  }
}
