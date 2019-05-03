import {DefaultCrudRepository} from '@loopback/repository';
import {RoleMapping} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RoleMappingRepository extends DefaultCrudRepository<
  RoleMapping,
  typeof RoleMapping.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(RoleMapping, dataSource);
  }
}
