import {DefaultCrudRepository} from '@loopback/repository';
import {FacilityType} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FacilityTypeRepository extends DefaultCrudRepository<
  FacilityType,
  typeof FacilityType.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FacilityType, dataSource);
  }
}
