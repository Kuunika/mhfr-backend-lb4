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
import {Utility} from '../models';
import {UtilityRepository} from '../repositories';

export class UtilityController {
  constructor(
    @repository(UtilityRepository)
    public utilityRepository : UtilityRepository,
  ) {}

  @post('/utilities', {
    responses: {
      '200': {
        description: 'Utility model instance',
        content: {'application/json': {schema: {'x-ts-type': Utility}}},
      },
    },
  })
  async create(@requestBody() utility: Utility): Promise<Utility> {
    return await this.utilityRepository.create(utility);
  }

  @get('/utilities/count', {
    responses: {
      '200': {
        description: 'Utility model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Utility)) where?: Where,
  ): Promise<Count> {
    return await this.utilityRepository.count(where);
  }

  @get('/utilities', {
    responses: {
      '200': {
        description: 'Array of Utility model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Utility}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Utility)) filter?: Filter,
  ): Promise<Utility[]> {
    return await this.utilityRepository.find(filter);
  }

  @patch('/utilities', {
    responses: {
      '200': {
        description: 'Utility PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() utility: Utility,
    @param.query.object('where', getWhereSchemaFor(Utility)) where?: Where,
  ): Promise<Count> {
    return await this.utilityRepository.updateAll(utility, where);
  }

  @get('/utilities/{id}', {
    responses: {
      '200': {
        description: 'Utility model instance',
        content: {'application/json': {schema: {'x-ts-type': Utility}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Utility> {
    return await this.utilityRepository.findById(id);
  }

  @patch('/utilities/{id}', {
    responses: {
      '204': {
        description: 'Utility PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() utility: Utility,
  ): Promise<void> {
    await this.utilityRepository.updateById(id, utility);
  }

  @put('/utilities/{id}', {
    responses: {
      '204': {
        description: 'Utility PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() utility: Utility,
  ): Promise<void> {
    await this.utilityRepository.replaceById(id, utility);
  }

  @del('/utilities/{id}', {
    responses: {
      '204': {
        description: 'Utility DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.utilityRepository.deleteById(id);
  }
}
