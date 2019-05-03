import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  Model
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
import { Facility, Location, Address } from '../models';
import { FacilityRepository, OwnerRepository, FacilityTypeRepository, OperationalStatusRepository, DistrictRepository, LocationRepository, AddressRepository, ContactPeopleRepository, GeolocationRepository } from '../repositories';
import { FormattedFacility } from '../interfaces';

export class FacilityController {
  constructor(
    @repository(FacilityRepository)
    public facilityRepository: FacilityRepository,
    @repository(OwnerRepository)
    protected ownerRepository: OwnerRepository,
    @repository(FacilityTypeRepository)
    public facilityTypeRepository: FacilityTypeRepository,
    @repository(OperationalStatusRepository)
    public operationalStatusRepository: OperationalStatusRepository,
    @repository(DistrictRepository)
    public districtRepository: DistrictRepository,
    @repository(LocationRepository)
    public locationRepository: LocationRepository,
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
    @repository(ContactPeopleRepository)
    public contactPeopleRepository: ContactPeopleRepository,
    @repository(GeolocationRepository)
    public geolocationRepository: GeolocationRepository,
  ) { }

  @post('/facilities', {
    responses: {
      '200': {
        description: 'Facility model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Facility } } },
      },
    },
  })
  async create(@requestBody() facility: Facility): Promise<Facility> {
    return await this.facilityRepository.create(facility);
  }

  @get('/facilities/count', {
    responses: {
      '200': {
        description: 'Facility model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Facility)) where?: Where,
  ): Promise<Count> {
    return await this.facilityRepository.count(where);
  }

  @get('/facilities/download', {
    responses: {
      '200': {
        description: 'A file containing facilities data',
      },
    },
  })
  async downloadFacilities(): Promise<void> {

  }

  @get('/facilities', {
    responses: {
      '200': {
        description: 'Array of Facility model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Facility } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Facility)) filter?: Filter,
  ): Promise<FormattedFacility[]> {
    const facilities = await this.facilityRepository.find();
    const facilityOwnerships = await this.ownerRepository.find();
    const facilityTypes = await this.facilityTypeRepository.find();
    const districts = await this.districtRepository.find();
    const facilityOperationalStatuses = await this.operationalStatusRepository.find();

    const getModelDisplayName = (key: number | undefined, lookup: string, haystack: Array<any>): string => {
      if (!key) return ''
      const entry = haystack.find(function (hay) {
        return hay['id'] == key;
      })
      if (!entry) return '';
      return entry[lookup];
    }

    const formattedFacilities = facilities.map(facility => ({
      name: facility.facility_name,
      code: facility.facility_code,
      commonName: facility.common_name,
      dateOpened: facility.facility_date_opened,
      facilityOwnership: getModelDisplayName(facility.facility_owner_id, 'facility_owner', facilityOwnerships),
      facilityType: getModelDisplayName(facility.facility_type_id, 'facility_type', facilityTypes),
      district: getModelDisplayName(facility.district_id, 'district_name', districts),
      facilityOperationalStatus: getModelDisplayName(
        facility.facility_operational_status_id,
        'facility_operational_status',
        facilityOperationalStatuses
      )
    }));
    return formattedFacilities;
  }

  @patch('/facilities', {
    responses: {
      '200': {
        description: 'Facility PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() facility: Facility,
    @param.query.object('where', getWhereSchemaFor(Facility)) where?: Where,
  ): Promise<Count> {
    return await this.facilityRepository.updateAll(facility, where);
  }

  @get('/facilities/contact-details/{id}', {
    responses: {
      '200': {
        description: 'Facility model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Facility } } },
      },
    },
  })
  async fetchContactDetails(@param.path.number('id') id: number): Promise<any> {
    //TODO: add more to the type returned
    const facility = await this.facilityRepository.findById(id);
    const location = await this.locationRepository.findOne({ where: { facility_id: facility.id } })
    const address = await this.addressRepository.findOne({ where: { facility_id: facility.id } })
    const contactPerson = await this.contactPeopleRepository.findOne({ where: { facility_id: facility.id } })
    const geolocation = await this.geolocationRepository.findOne({ where: { facility_id: facility.id } })
    return {
      location,
      address,
      contactPerson,
      geolocation
    };
  }

  @get('/facilities/{id}', {
    responses: {
      '200': {
        description: 'Facility model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Facility } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Facility> {
    return await this.facilityRepository.findById(id);
  }

  @patch('/facilities/{id}', {
    responses: {
      '204': {
        description: 'Facility PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() facility: Facility,
  ): Promise<void> {
    await this.facilityRepository.updateById(id, facility);
  }

  @put('/facilities/{id}', {
    responses: {
      '204': {
        description: 'Facility PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() facility: Facility,
  ): Promise<void> {
    await this.facilityRepository.replaceById(id, facility);
  }

  @del('/facilities/{id}', {
    responses: {
      '204': {
        description: 'Facility DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facilityRepository.deleteById(id);
  }
}
