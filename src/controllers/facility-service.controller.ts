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
import {FacilityService} from '../models';
import {FacilityServiceRepository} from '../repositories';

export class FacilityServiceController {
  constructor(
    @repository(FacilityServiceRepository)
    public facilityServiceRepository : FacilityServiceRepository,
  ) {}

  @post('/facility-services', {
    responses: {
      '200': {
        description: 'FacilityService model instance',
        content: {'application/json': {schema: {'x-ts-type': FacilityService}}},
      },
    },
  })
  async create(@requestBody() facilityService: FacilityService): Promise<FacilityService> {
    return await this.facilityServiceRepository.create(facilityService);
  }

  @get('/facility-services/count', {
    responses: {
      '200': {
        description: 'FacilityService model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(FacilityService)) where?: Where,
  ): Promise<Count> {
    return await this.facilityServiceRepository.count(where);
  }

  @get('/facility-services', {
    responses: {
      '200': {
        description: 'Array of FacilityService model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': FacilityService}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(FacilityService)) filter?: Filter,
  ): Promise<FacilityService[]> {
    return await this.facilityServiceRepository.find(filter);
  }

  @patch('/facility-services', {
    responses: {
      '200': {
        description: 'FacilityService PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() facilityService: FacilityService,
    @param.query.object('where', getWhereSchemaFor(FacilityService)) where?: Where,
  ): Promise<Count> {
    return await this.facilityServiceRepository.updateAll(facilityService, where);
  }

  @get('/facility-services/{id}', {
    responses: {
      '200': {
        description: 'FacilityService model instance',
        content: {'application/json': {schema: {'x-ts-type': FacilityService}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<FacilityService> {
    return await this.facilityServiceRepository.findById(id);
  }

  @patch('/facility-services/{id}', {
    responses: {
      '204': {
        description: 'FacilityService PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() facilityService: FacilityService,
  ): Promise<void> {
    await this.facilityServiceRepository.updateById(id, facilityService);
  }

  @put('/facility-services/{id}', {
    responses: {
      '204': {
        description: 'FacilityService PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() facilityService: FacilityService,
  ): Promise<void> {
    await this.facilityServiceRepository.replaceById(id, facilityService);
  }

  @del('/facility-services/{id}', {
    responses: {
      '204': {
        description: 'FacilityService DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facilityServiceRepository.deleteById(id);
  }
}
