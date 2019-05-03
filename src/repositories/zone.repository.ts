import {DefaultCrudRepository} from '@loopback/repository';
import {Zone} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ZoneRepository extends DefaultCrudRepository<
  Zone,
  typeof Zone.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Zone, dataSource);
  }
}
