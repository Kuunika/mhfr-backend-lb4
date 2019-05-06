import { Entity, model, property } from '@loopback/repository';

@model()
export class Client extends Entity {
  @property({
    id: true,
    index: true,
    length: 11,
    type: 'number',
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 255,
    jsonSchema: {
      maxLength: 255,
      minLength: 3,
    }
  })
  username: string;

  @property({
    type: 'string',
    required: true,
    length: 500,
    jsonSchema: {
      maxLength: 500,
      minLength: 3,
    }
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    jsonSchema: {
      maxLength: 255,
      minLength: 3,
    }
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    jsonSchema: {
      maxLength: 255,
      minLength: 3,
    }
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
    index: {
      "unique": true
    },
    length: 255,
    jsonSchema: {
      maxLength: 255,
      minLength: 3,
    }
  })
  email: string;

  @property({
    type: 'date',
    default: undefined
  })
  archived_date?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  created_at?: string;

  @property({
    type: 'string',
    default: undefined
  })
  realm?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  email_verified?: boolean;

  @property({
    type: 'string',
    default: undefined
  })
  verification_token?: string;


  constructor(data?: Partial<Client>) {
    super(data);
  }
}
