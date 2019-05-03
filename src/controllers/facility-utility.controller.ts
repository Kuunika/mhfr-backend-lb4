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
import {FacilityUtility} from '../models';
import {FacilityUtilityRepository} from '../repositories';

export class FacilityUtilityController {
  constructor(
    @repository(FacilityUtilityRepository)
    public facilityUtilityRepository : FacilityUtilityRepository,
  ) {}

  @post('/facility-utilities', {
    responses: {
      '200': {
        description: 'FacilityUtility model instance',
        content: {'application/json': {schema: {'x-ts-type': FacilityUtility}}},
      },
    },
  })
  async create(@requestBody() facilityUtility: FacilityUtility): Promise<FacilityUtility> {
    return await this.facilityUtilityRepository.create(facilityUtility);
  }

  @get('/facility-utilities/count', {
    responses: {
      '200': {
        description: 'FacilityUtility model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(FacilityUtility)) where?: Where,
  ): Promise<Count> {
    return await this.facilityUtilityRepository.count(where);
  }

  @get('/facility-utilities', {
    responses: {
      '200': {
        description: 'Array of FacilityUtility model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': FacilityUtility}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(FacilityUtility)) filter?: Filter,
  ): Promise<FacilityUtility[]> {
    return await this.facilityUtilityRepository.find(filter);
  }

  @patch('/facility-utilities', {
    responses: {
      '200': {
        description: 'FacilityUtility PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() facilityUtility: FacilityUtility,
    @param.query.object('where', getWhereSchemaFor(FacilityUtility)) where?: Where,
  ): Promise<Count> {
    return await this.facilityUtilityRepository.updateAll(facilityUtility, where);
  }

  @get('/facility-utilities/{id}', {
    responses: {
      '200': {
        description: 'FacilityUtility model instance',
        content: {'application/json': {schema: {'x-ts-type': FacilityUtility}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<FacilityUtility> {
    return await this.facilityUtilityRepository.findById(id);
  }

  @patch('/facility-utilities/{id}', {
    responses: {
      '204': {
        description: 'FacilityUtility PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() facilityUtility: FacilityUtility,
  ): Promise<void> {
    await this.facilityUtilityRepository.updateById(id, facilityUtility);
  }

  @put('/facility-utilities/{id}', {
    responses: {
      '204': {
        description: 'FacilityUtility PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() facilityUtility: FacilityUtility,
  ): Promise<void> {
    await this.facilityUtilityRepository.replaceById(id, facilityUtility);
  }

  @del('/facility-utilities/{id}', {
    responses: {
      '204': {
        description: 'FacilityUtility DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facilityUtilityRepository.deleteById(id);
  }
}
