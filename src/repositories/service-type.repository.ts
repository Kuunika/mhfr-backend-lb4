import {DefaultCrudRepository} from '@loopback/repository';
import {ServiceType} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ServiceTypeRepository extends DefaultCrudRepository<
  ServiceType,
  typeof ServiceType.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ServiceType, dataSource);
  }
}
