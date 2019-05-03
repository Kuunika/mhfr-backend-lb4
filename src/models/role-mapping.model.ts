import {Entity, model, property} from '@loopback/repository';

@model()
export class RoleMapping extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  principal_type?: string;

  @property({
    type: 'string',
  })
  principalId?: string;

  @property({
    type: 'number',
    required: true,
  })
  role_id: number;


  constructor(data?: Partial<RoleMapping>) {
    super(data);
  }
}
