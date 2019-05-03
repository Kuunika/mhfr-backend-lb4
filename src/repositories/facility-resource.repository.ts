import {DefaultCrudRepository} from '@loopback/repository';
import {FacilityResource} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FacilityResourceRepository extends DefaultCrudRepository<
  FacilityResource,
  typeof FacilityResource.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FacilityResource, dataSource);
  }
}
