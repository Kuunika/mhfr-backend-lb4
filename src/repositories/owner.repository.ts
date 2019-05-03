import {DefaultCrudRepository} from '@loopback/repository';
import {Owner} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Owner, dataSource);
  }
}
