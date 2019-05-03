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
import { RegulatoryStatus } from '../models';
import { RegulatoryStatusRepository, FacilityRepository } from '../repositories';

export class RegulatoryStatusController {
  constructor(
    @repository(RegulatoryStatusRepository)
    public regulatoryStatusRepository: RegulatoryStatusRepository,
    @repository(FacilityRepository)
    public facilityRepository: FacilityRepository,
  ) { }

  @post('/regulatory-statuses', {
    responses: {
      '200': {
        description: 'RegulatoryStatus model instance',
        content: { 'application/json': { schema: { 'x-ts-type': RegulatoryStatus } } },
      },
    },
  })
  async create(@requestBody() regulatoryStatus: RegulatoryStatus): Promise<RegulatoryStatus> {
    return await this.regulatoryStatusRepository.create(regulatoryStatus);
  }

  @get('/regulatory-statuses/count', {
    responses: {
      '200': {
        description: 'RegulatoryStatus model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(RegulatoryStatus)) where?: Where,
  ): Promise<Count> {
    return await this.regulatoryStatusRepository.count(where);
  }

  @get('/regulatory-statuses', {
    responses: {
      '200': {
        description: 'Array of RegulatoryStatus model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': RegulatoryStatus } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(RegulatoryStatus)) filter?: Filter,
  ): Promise<any[]> {
    const facilities = await this.facilityRepository.find();
    const regulatoryStatuses = await this.regulatoryStatusRepository.find();
    const formattedRegulatoryStatus = regulatoryStatuses.map(regulatoryStatus => ({
      id: regulatoryStatus.id,
      name: regulatoryStatus.facility_regulatory_status,
      facilitiesCount: facilities.filter(
        facility => (facility.facility_regulatory_status_id === regulatoryStatus.id)
      ).length
    }))
    return formattedRegulatoryStatus;
  }

  @patch('/regulatory-statuses', {
    responses: {
      '200': {
        description: 'RegulatoryStatus PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() regulatoryStatus: RegulatoryStatus,
    @param.query.object('where', getWhereSchemaFor(RegulatoryStatus)) where?: Where,
  ): Promise<Count> {
    return await this.regulatoryStatusRepository.updateAll(regulatoryStatus, where);
  }

  @get('/regulatory-statuses/{id}', {
    responses: {
      '200': {
        description: 'RegulatoryStatus model instance',
        content: { 'application/json': { schema: { 'x-ts-type': RegulatoryStatus } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<RegulatoryStatus> {
    return await this.regulatoryStatusRepository.findById(id);
  }

  @patch('/regulatory-statuses/{id}', {
    responses: {
      '204': {
        description: 'RegulatoryStatus PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() regulatoryStatus: RegulatoryStatus,
  ): Promise<void> {
    await this.regulatoryStatusRepository.updateById(id, regulatoryStatus);
  }

  @put('/regulatory-statuses/{id}', {
    responses: {
      '204': {
        description: 'RegulatoryStatus PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() regulatoryStatus: RegulatoryStatus,
  ): Promise<void> {
    await this.regulatoryStatusRepository.replaceById(id, regulatoryStatus);
  }

  @del('/regulatory-statuses/{id}', {
    responses: {
      '204': {
        description: 'RegulatoryStatus DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.regulatoryStatusRepository.deleteById(id);
  }
}
