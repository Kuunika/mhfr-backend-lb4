import {DefaultCrudRepository} from '@loopback/repository';
import {Service} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Service, dataSource);
  }
}
