import {Entity, model, property} from '@loopback/repository';

@model()
export class FeedbackType extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  feedback_type: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<FeedbackType>) {
    super(data);
  }
}
