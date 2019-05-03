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
import {UtilityType} from '../models';
import {UtilityTypeRepository} from '../repositories';

export class UtilityTypeController {
  constructor(
    @repository(UtilityTypeRepository)
    public utilityTypeRepository : UtilityTypeRepository,
  ) {}

  @post('/utility-types', {
    responses: {
      '200': {
        description: 'UtilityType model instance',
        content: {'application/json': {schema: {'x-ts-type': UtilityType}}},
      },
    },
  })
  async create(@requestBody() utilityType: UtilityType): Promise<UtilityType> {
    return await this.utilityTypeRepository.create(utilityType);
  }

  @get('/utility-types/count', {
    responses: {
      '200': {
        description: 'UtilityType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(UtilityType)) where?: Where,
  ): Promise<Count> {
    return await this.utilityTypeRepository.count(where);
  }

  @get('/utility-types', {
    responses: {
      '200': {
        description: 'Array of UtilityType model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': UtilityType}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(UtilityType)) filter?: Filter,
  ): Promise<UtilityType[]> {
    return await this.utilityTypeRepository.find(filter);
  }

  @patch('/utility-types', {
    responses: {
      '200': {
        description: 'UtilityType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() utilityType: UtilityType,
    @param.query.object('where', getWhereSchemaFor(UtilityType)) where?: Where,
  ): Promise<Count> {
    return await this.utilityTypeRepository.updateAll(utilityType, where);
  }

  @get('/utility-types/{id}', {
    responses: {
      '200': {
        description: 'UtilityType model instance',
        content: {'application/json': {schema: {'x-ts-type': UtilityType}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<UtilityType> {
    return await this.utilityTypeRepository.findById(id);
  }

  @patch('/utility-types/{id}', {
    responses: {
      '204': {
        description: 'UtilityType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() utilityType: UtilityType,
  ): Promise<void> {
    await this.utilityTypeRepository.updateById(id, utilityType);
  }

  @put('/utility-types/{id}', {
    responses: {
      '204': {
        description: 'UtilityType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() utilityType: UtilityType,
  ): Promise<void> {
    await this.utilityTypeRepository.replaceById(id, utilityType);
  }

  @del('/utility-types/{id}', {
    responses: {
      '204': {
        description: 'UtilityType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.utilityTypeRepository.deleteById(id);
  }
}
