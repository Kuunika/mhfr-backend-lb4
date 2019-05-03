import {DefaultCrudRepository} from '@loopback/repository';
import {Geolocation} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GeolocationRepository extends DefaultCrudRepository<
  Geolocation,
  typeof Geolocation.prototype.id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Geolocation, dataSource);
  }
}
