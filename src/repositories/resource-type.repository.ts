import {DefaultCrudRepository} from '@loopback/repository';
import {ResourceType} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ResourceTypeRepository extends DefaultCrudRepository<
  ResourceType,
  typeof ResourceType.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ResourceType, dataSource);
  }
}
