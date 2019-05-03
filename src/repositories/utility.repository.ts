import {DefaultCrudRepository} from '@loopback/repository';
import {Utility} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UtilityRepository extends DefaultCrudRepository<
  Utility,
  typeof Utility.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Utility, dataSource);
  }
}
