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
import {Address} from '../models';
import {AddressRepository} from '../repositories';

export class AddressController {
  constructor(
    @repository(AddressRepository)
    public addressRepository : AddressRepository,
  ) {}

  @post('/addresses', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: {'application/json': {schema: {'x-ts-type': Address}}},
      },
    },
  })
  async create(@requestBody() address: Address): Promise<Address> {
    return await this.addressRepository.create(address);
  }

  @get('/addresses/count', {
    responses: {
      '200': {
        description: 'Address model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where,
  ): Promise<Count> {
    return await this.addressRepository.count(where);
  }

  @get('/addresses', {
    responses: {
      '200': {
        description: 'Array of Address model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Address}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Address)) filter?: Filter,
  ): Promise<Address[]> {
    return await this.addressRepository.find(filter);
  }

  @patch('/addresses', {
    responses: {
      '200': {
        description: 'Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() address: Address,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where,
  ): Promise<Count> {
    return await this.addressRepository.updateAll(address, where);
  }

  @get('/addresses/{id}', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: {'application/json': {schema: {'x-ts-type': Address}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Address> {
    return await this.addressRepository.findById(id);
  }

  @patch('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() address: Address,
  ): Promise<void> {
    await this.addressRepository.updateById(id, address);
  }

  @put('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() address: Address,
  ): Promise<void> {
    await this.addressRepository.replaceById(id, address);
  }

  @del('/addresses/{id}', {
    responses: {
      '204': {
        description: 'Address DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.addressRepository.deleteById(id);
  }
}
