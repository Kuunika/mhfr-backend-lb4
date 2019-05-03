import {DefaultCrudRepository} from '@loopback/repository';
import {UtilityType} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UtilityTypeRepository extends DefaultCrudRepository<
  UtilityType,
  typeof UtilityType.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(UtilityType, dataSource);
  }
}
