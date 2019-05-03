import { DefaultCrudRepository, repository } from '@loopback/repository';
import { Facility } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { OwnerRepository, FacilityTypeRepository, OperationalStatusRepository, DistrictRepository } from '.';
import { FormattedFacility } from '../interfaces';


export class FacilityRepository extends DefaultCrudRepository<
  Facility,
  typeof Facility.prototype.id
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Facility, dataSource);
  }
}
