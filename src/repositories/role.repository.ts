import {DefaultCrudRepository} from '@loopback/repository';
import {Role} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Role, dataSource);
  }
}
