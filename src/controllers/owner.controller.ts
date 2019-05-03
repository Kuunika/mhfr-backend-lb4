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
import { Owner } from '../models';
import { OwnerRepository, FacilityRepository, FacilityTypeRepository } from '../repositories';

export class OwnerController {
  constructor(
    @repository(OwnerRepository)
    public ownerRepository: OwnerRepository,
    @repository(FacilityRepository)
    public facilityRepository: FacilityRepository,
    @repository(FacilityTypeRepository)
    public facilityTypeRepository: FacilityTypeRepository,
  ) { }

  @post('/owners', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Owner } } },
      },
    },
  })
  async create(@requestBody() owner: Owner): Promise<Owner> {
    return await this.ownerRepository.create(owner);
  }

  @get('/owners/count', {
    responses: {
      '200': {
        description: 'Owner model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Owner)) where?: Where,
  ): Promise<Count> {
    return await this.ownerRepository.count(where);
  }

  @get('/owners', {
    responses: {
      '200': {
        description: 'Array of Owner model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Owner } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Owner)) filter?: Filter,
  ): Promise<any[]> {
    const facilities = await this.facilityRepository.find();
    const owners = await this.ownerRepository.find();
    const facilityTypes = await this.facilityTypeRepository.find();
    const facilitiesByTypeAndOwnership = owners.map(owner => ({
      ...owner,
      facilityTypes: facilityTypes.map(facilityType => ({
        ...facilityType,
        facilities: facilities.filter(facility => (facility.facility_type_id === facilityType.id && facility.facility_owner_id === owner.id)).length
      }))
    }))
    return facilitiesByTypeAndOwnership;
  }

  @patch('/owners', {
    responses: {
      '200': {
        description: 'Owner PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() owner: Owner,
    @param.query.object('where', getWhereSchemaFor(Owner)) where?: Where,
  ): Promise<Count> {
    return await this.ownerRepository.updateAll(owner, where);
  }

  @get('/owners/{id}', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Owner } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Owner> {
    return await this.ownerRepository.findById(id);
  }

  @patch('/owners/{id}', {
    responses: {
      '204': {
        description: 'Owner PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() owner: Owner,
  ): Promise<void> {
    await this.ownerRepository.updateById(id, owner);
  }

  @put('/owners/{id}', {
    responses: {
      '204': {
        description: 'Owner PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() owner: Owner,
  ): Promise<void> {
    await this.ownerRepository.replaceById(id, owner);
  }

  @del('/owners/{id}', {
    responses: {
      '204': {
        description: 'Owner DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ownerRepository.deleteById(id);
  }
}
