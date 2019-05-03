import {DefaultCrudRepository} from '@loopback/repository';
import {FeedbackType} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FeedbackTypeRepository extends DefaultCrudRepository<
  FeedbackType,
  typeof FeedbackType.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FeedbackType, dataSource);
  }
}
