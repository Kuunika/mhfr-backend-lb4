import {DefaultCrudRepository} from '@loopback/repository';
import {RegulatoryStatus} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RegulatoryStatusRepository extends DefaultCrudRepository<
  RegulatoryStatus,
  typeof RegulatoryStatus.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(RegulatoryStatus, dataSource);
  }
}
