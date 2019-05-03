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
import {ResourceType} from '../models';
import {ResourceTypeRepository} from '../repositories';

export class ResourceTypeController {
  constructor(
    @repository(ResourceTypeRepository)
    public resourceTypeRepository : ResourceTypeRepository,
  ) {}

  @post('/resource-types', {
    responses: {
      '200': {
        description: 'ResourceType model instance',
        content: {'application/json': {schema: {'x-ts-type': ResourceType}}},
      },
    },
  })
  async create(@requestBody() resourceType: ResourceType): Promise<ResourceType> {
    return await this.resourceTypeRepository.create(resourceType);
  }

  @get('/resource-types/count', {
    responses: {
      '200': {
        description: 'ResourceType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ResourceType)) where?: Where,
  ): Promise<Count> {
    return await this.resourceTypeRepository.count(where);
  }

  @get('/resource-types', {
    responses: {
      '200': {
        description: 'Array of ResourceType model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ResourceType}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ResourceType)) filter?: Filter,
  ): Promise<ResourceType[]> {
    return await this.resourceTypeRepository.find(filter);
  }

  @patch('/resource-types', {
    responses: {
      '200': {
        description: 'ResourceType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() resourceType: ResourceType,
    @param.query.object('where', getWhereSchemaFor(ResourceType)) where?: Where,
  ): Promise<Count> {
    return await this.resourceTypeRepository.updateAll(resourceType, where);
  }

  @get('/resource-types/{id}', {
    responses: {
      '200': {
        description: 'ResourceType model instance',
        content: {'application/json': {schema: {'x-ts-type': ResourceType}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ResourceType> {
    return await this.resourceTypeRepository.findById(id);
  }

  @patch('/resource-types/{id}', {
    responses: {
      '204': {
        description: 'ResourceType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() resourceType: ResourceType,
  ): Promise<void> {
    await this.resourceTypeRepository.updateById(id, resourceType);
  }

  @put('/resource-types/{id}', {
    responses: {
      '204': {
        description: 'ResourceType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resourceType: ResourceType,
  ): Promise<void> {
    await this.resourceTypeRepository.replaceById(id, resourceType);
  }

  @del('/resource-types/{id}', {
    responses: {
      '204': {
        description: 'ResourceType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resourceTypeRepository.deleteById(id);
  }
}
