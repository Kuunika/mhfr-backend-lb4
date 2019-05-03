import {Entity, model, property} from '@loopback/repository';

@model()
export class Client extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
  })
  archived_date?: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'string',
  })
  realm?: string;

  @property({
    type: 'boolean',
  })
  email_verified?: boolean;

  @property({
    type: 'string',
  })
  verification_token?: string;


  constructor(data?: Partial<Client>) {
    super(data);
  }
}
