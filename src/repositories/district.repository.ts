import {DefaultCrudRepository} from '@loopback/repository';
import {District} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DistrictRepository extends DefaultCrudRepository<
  District,
  typeof District.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(District, dataSource);
  }
}
