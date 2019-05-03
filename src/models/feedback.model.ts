import { Entity, model, property } from '@loopback/repository';

@model()
export class Feedback extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  data?: string;

  @property({
    type: 'number',
    required: true,
  })
  type_id: number;


  constructor(data?: Partial<Feedback>) {
    super(data);
  }
}
