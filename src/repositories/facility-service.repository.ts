import {DefaultCrudRepository} from '@loopback/repository';
import {FacilityService} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FacilityServiceRepository extends DefaultCrudRepository<
  FacilityService,
  typeof FacilityService.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FacilityService, dataSource);
  }
}
