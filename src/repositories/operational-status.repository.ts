import {DefaultCrudRepository} from '@loopback/repository';
import {OperationalStatus} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OperationalStatusRepository extends DefaultCrudRepository<
  OperationalStatus,
  typeof OperationalStatus.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(OperationalStatus, dataSource);
  }
}
