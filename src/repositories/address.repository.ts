import {DefaultCrudRepository} from '@loopback/repository';
import {Address} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Address, dataSource);
  }
}
