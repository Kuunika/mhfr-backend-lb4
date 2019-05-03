import {DefaultCrudRepository} from '@loopback/repository';
import {ContactPeople} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContactPeopleRepository extends DefaultCrudRepository<
  ContactPeople,
  typeof ContactPeople.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ContactPeople, dataSource);
  }
}
