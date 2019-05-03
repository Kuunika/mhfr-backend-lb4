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
import { OperationalStatus } from '../models';
import { OperationalStatusRepository, FacilityRepository } from '../repositories';
import { FormattedOperationalStatus } from '../interfaces';

export class OperationalStatusController {
  constructor(
    @repository(OperationalStatusRepository)
    public operationalStatusRepository: OperationalStatusRepository,
    @repository(FacilityRepository)
    public facilityRepository: FacilityRepository,
  ) { }

  @post('/operational-statuses', {
    responses: {
      '200': {
        description: 'OperationalStatus model instance',
        content: { 'application/json': { schema: { 'x-ts-type': OperationalStatus } } },
      },
    },
  })
  async create(@requestBody() operationalStatus: OperationalStatus): Promise<OperationalStatus> {
    return await this.operationalStatusRepository.create(operationalStatus);
  }

  @get('/operational-statuses/count', {
    responses: {
      '200': {
        description: 'OperationalStatus model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(OperationalStatus)) where?: Where,
  ): Promise<Count> {
    return await this.operationalStatusRepository.count(where);
  }

  @get('/operational-statuses', {
    responses: {
      '200': {
        description: 'Array of OperationalStatus model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': OperationalStatus } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(OperationalStatus)) filter?: Filter,
  ): Promise<FormattedOperationalStatus[]> {
    const facilities = await this.facilityRepository.find();
    const operationalStatuses = await this.operationalStatusRepository.find();
    const formattedOperationalStatuses: FormattedOperationalStatus[] = operationalStatuses.map(operationalStatus => ({
      ...operationalStatus,
      facility_count: facilities.filter(
        facility => facility.facility_operational_status_id === operationalStatus.id
      ).length
    }))
    return await formattedOperationalStatuses;
  }

  @patch('/operational-statuses', {
    responses: {
      '200': {
        description: 'OperationalStatus PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() operationalStatus: OperationalStatus,
    @param.query.object('where', getWhereSchemaFor(OperationalStatus)) where?: Where,
  ): Promise<Count> {
    return await this.operationalStatusRepository.updateAll(operationalStatus, where);
  }

  @get('/operational-statuses/{id}', {
    responses: {
      '200': {
        description: 'OperationalStatus model instance',
        content: { 'application/json': { schema: { 'x-ts-type': OperationalStatus } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<OperationalStatus> {
    return await this.operationalStatusRepository.findById(id);
  }

  @patch('/operational-statuses/{id}', {
    responses: {
      '204': {
        description: 'OperationalStatus PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() operationalStatus: OperationalStatus,
  ): Promise<void> {
    await this.operationalStatusRepository.updateById(id, operationalStatus);
  }

  @put('/operational-statuses/{id}', {
    responses: {
      '204': {
        description: 'OperationalStatus PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() operationalStatus: OperationalStatus,
  ): Promise<void> {
    await this.operationalStatusRepository.replaceById(id, operationalStatus);
  }

  @del('/operational-statuses/{id}', {
    responses: {
      '204': {
        description: 'OperationalStatus DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.operationalStatusRepository.deleteById(id);
  }
}
