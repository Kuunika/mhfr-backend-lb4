import {DefaultCrudRepository} from '@loopback/repository';
import {Resource} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ResourceRepository extends DefaultCrudRepository<
  Resource,
  typeof Resource.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Resource, dataSource);
  }
}
