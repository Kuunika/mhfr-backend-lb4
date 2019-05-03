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
import { FacilityResource } from '../models';
import { FacilityResourceRepository, ResourceRepository, ResourceTypeRepository } from '../repositories';
import { FormattedResource } from '../interfaces';

export class FacilityResourceController {
  constructor(
    @repository(FacilityResourceRepository)
    public facilityResourceRepository: FacilityResourceRepository,
    @repository(ResourceRepository)
    public resourceRepository: ResourceRepository,
    @repository(ResourceTypeRepository)
    public resourceTypeRepository: ResourceTypeRepository,
  ) { }

  @post('/facility-resources', {
    responses: {
      '200': {
        description: 'FacilityResource model instance',
        content: { 'application/json': { schema: { 'x-ts-type': FacilityResource } } },
      },
    },
  })
  async create(@requestBody() facilityResource: FacilityResource): Promise<FacilityResource> {
    return await this.facilityResourceRepository.create(facilityResource);
  }

  @get('/facility-resources/count', {
    responses: {
      '200': {
        description: 'FacilityResource model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(FacilityResource)) where?: Where,
  ): Promise<Count> {
    return await this.facilityResourceRepository.count(where);
  }

  @get('/facility-resources/{facilityId}', {
    responses: {
      '200': {
        description: 'Array of FacilityResource model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': FacilityResource } },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('facilityId') facilityId: number,
    @param.query.object('filter', getFilterSchemaFor(FacilityResource)) filter?: Filter
  ): Promise<FormattedResource[]> {
    const resources = await this.resourceRepository.find();
    const resourceTypes = await this.resourceTypeRepository.find();
    const facilityResources = await this.facilityResourceRepository.find({
      where: {
        facility_id: facilityId
      }
    });
    const formattedFacilityResources = resourceTypes.map(resourceType => ({
      id: resourceType.id,
      name: resourceType.resource_type,
      resources: resources.filter(
        resource => resource.resource_type_id === resourceType.id
      ).map(resource => {
        const facilityResource = facilityResources.find(facilityResource => (facilityResource.facility_id === facilityId && facilityResource.resource_id === resource.id))
        let quantity = 0
        if (facilityResource) quantity = facilityResource.quantity
        return {
          ...resource,
          quantity
        }
      })
    }));
    return formattedFacilityResources;
  }

  @patch('/facility-resources', {
    responses: {
      '200': {
        description: 'FacilityResource PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() facilityResource: FacilityResource,
    @param.query.object('where', getWhereSchemaFor(FacilityResource)) where?: Where,
  ): Promise<Count> {
    return await this.facilityResourceRepository.updateAll(facilityResource, where);
  }

  @patch('/facility-resources/{id}', {
    responses: {
      '204': {
        description: 'FacilityResource PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() facilityResource: FacilityResource,
  ): Promise<void> {
    await this.facilityResourceRepository.updateById(id, facilityResource);
  }

  @put('/facility-resources/{id}', {
    responses: {
      '204': {
        description: 'FacilityResource PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() facilityResource: FacilityResource,
  ): Promise<void> {
    await this.facilityResourceRepository.replaceById(id, facilityResource);
  }

  @del('/facility-resources/{id}', {
    responses: {
      '204': {
        description: 'FacilityResource DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facilityResourceRepository.deleteById(id);
  }
}
