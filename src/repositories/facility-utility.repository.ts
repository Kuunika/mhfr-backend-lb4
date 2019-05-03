import {DefaultCrudRepository} from '@loopback/repository';
import {FacilityUtility} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FacilityUtilityRepository extends DefaultCrudRepository<
  FacilityUtility,
  typeof FacilityUtility.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FacilityUtility, dataSource);
  }
}
