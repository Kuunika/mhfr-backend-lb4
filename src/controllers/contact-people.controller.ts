import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {ContactPeople} from '../models';
import {ContactPeopleRepository} from '../repositories';

export class ContactPeopleController {
  constructor(
    @repository(ContactPeopleRepository)
    public contactPeopleRepository : ContactPeopleRepository,
  ) {}

  @post('/contact-people', {
    responses: {
      '200': {
        description: 'ContactPeople model instance',
        content: {'application/json': {schema: {'x-ts-type': ContactPeople}}},
      },
    },
  })
  async create(@requestBody() contactPeople: ContactPeople): Promise<ContactPeople> {
    return await this.contactPeopleRepository.create(contactPeople);
  }

  @get('/contact-people/count', {
    responses: {
      '200': {
        description: 'ContactPeople model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ContactPeople)) where?: Where,
  ): Promise<Count> {
    return await this.contactPeopleRepository.count(where);
  }

  @get('/contact-people', {
    responses: {
      '200': {
        description: 'Array of ContactPeople model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ContactPeople}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ContactPeople)) filter?: Filter,
  ): Promise<ContactPeople[]> {
    return await this.contactPeopleRepository.find(filter);
  }

  @patch('/contact-people', {
    responses: {
      '200': {
        description: 'ContactPeople PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() contactPeople: ContactPeople,
    @param.query.object('where', getWhereSchemaFor(ContactPeople)) where?: Where,
  ): Promise<Count> {
    return await this.contactPeopleRepository.updateAll(contactPeople, where);
  }

  @get('/contact-people/{id}', {
    responses: {
      '200': {
        description: 'ContactPeople model instance',
        content: {'application/json': {schema: {'x-ts-type': ContactPeople}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ContactPeople> {
    return await this.contactPeopleRepository.findById(id);
  }

  @patch('/contact-people/{id}', {
    responses: {
      '204': {
        description: 'ContactPeople PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() contactPeople: ContactPeople,
  ): Promise<void> {
    await this.contactPeopleRepository.updateById(id, contactPeople);
  }

  @put('/contact-people/{id}', {
    responses: {
      '204': {
        description: 'ContactPeople PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contactPeople: ContactPeople,
  ): Promise<void> {
    await this.contactPeopleRepository.replaceById(id, contactPeople);
  }

  @del('/contact-people/{id}', {
    responses: {
      '204': {
        description: 'ContactPeople DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contactPeopleRepository.deleteById(id);
  }
}
