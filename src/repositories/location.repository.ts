import {DefaultCrudRepository} from '@loopback/repository';
import {Location} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Location, dataSource);
  }
}
