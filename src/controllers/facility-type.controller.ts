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
import { FacilityType } from '../models';
import { FacilityTypeRepository, OwnerRepository, FacilityRepository } from '../repositories';

export class FacilityTypeController {
  constructor(
    @repository(FacilityTypeRepository)
    public facilityTypeRepository: FacilityTypeRepository,
    @repository(OwnerRepository)
    public ownerRepository: OwnerRepository,
    @repository(FacilityRepository)
    public facilityRepository: FacilityRepository,
  ) { }

  @post('/facility-types', {
    responses: {
      '200': {
        description: 'FacilityType model instance',
        content: { 'application/json': { schema: { 'x-ts-type': FacilityType } } },
      },
    },
  })
  async create(@requestBody() facilityType: FacilityType): Promise<FacilityType> {
    return await this.facilityTypeRepository.create(facilityType);
  }

  @get('/facility-types/count', {
    responses: {
      '200': {
        description: 'FacilityType model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(FacilityType)) where?: Where,
  ): Promise<Count> {
    return await this.facilityTypeRepository.count(where);
  }

  @get('/facility-types', {
    responses: {
      '200': {
        description: 'Array of FacilityType model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': FacilityType } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(FacilityType)) filter?: Filter,
  ): Promise<any[]> {
    //TODO: Add a proper type to this
    const facilities = await this.facilityRepository.find();
    const owners = await this.ownerRepository.find();
    const facilityTypes = await this.facilityTypeRepository.find();
    const formattedFacilityTypes = facilityTypes.map(facilityType => ({
      id: facilityType.id,
      name: facilityType.facility_type,
      ownership: owners.map(owner => ({
        id: owner.id,
        name: owner.facility_owner,
        facilitiesCount: facilities.filter(
          facility => (
            facility.facility_owner_id === owner.id
            &&
            facility.facility_type_id === facilityType.id
          ))
      }))
    }))
    return formattedFacilityTypes;
  }

  @patch('/facility-types', {
    responses: {
      '200': {
        description: 'FacilityType PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() facilityType: FacilityType,
    @param.query.object('where', getWhereSchemaFor(FacilityType)) where?: Where,
  ): Promise<Count> {
    return await this.facilityTypeRepository.updateAll(facilityType, where);
  }

  @get('/facility-types/{id}', {
    responses: {
      '200': {
        description: 'FacilityType model instance',
        content: { 'application/json': { schema: { 'x-ts-type': FacilityType } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<FacilityType> {
    return await this.facilityTypeRepository.findById(id);
  }

  @patch('/facility-types/{id}', {
    responses: {
      '204': {
        description: 'FacilityType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() facilityType: FacilityType,
  ): Promise<void> {
    await this.facilityTypeRepository.updateById(id, facilityType);
  }

  @put('/facility-types/{id}', {
    responses: {
      '204': {
        description: 'FacilityType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() facilityType: FacilityType,
  ): Promise<void> {
    await this.facilityTypeRepository.replaceById(id, facilityType);
  }

  @del('/facility-types/{id}', {
    responses: {
      '204': {
        description: 'FacilityType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facilityTypeRepository.deleteById(id);
  }
}
