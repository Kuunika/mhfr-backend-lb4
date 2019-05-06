import * as isemail from 'isemail';
import { generate } from 'shortid';
import { inject } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { compare, genSalt, hash } from 'bcryptjs';

import {
  DefaultCrudRepository,
  DataObject,
  Options
} from '@loopback/repository';

import { Client } from '../models';
import { MysqlDataSource } from '../datasources';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Client, dataSource);
  }

  /**
   * Encrypt a password
   *
   * @param { string } password - Password.
   * @return { string } The encrypted password.
   */
  async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10)
    return await hash(password, salt)
  }

  /**
   * check if the password provided is valid.
   *
   * @param { string } providedPassword - Provided password.
   * @param { string } storedPassword - Client stored password.
   * @return { boolean } The comparison.
   */
  async isValidPassword(
    providedPassword: string,
    storedPass: string,
  ): Promise<boolean> {
    return await compare(providedPassword, storedPass);
  }

  validateEmail(email: string): void {
    if (!isemail.validate(email)) {
      throw new HttpErrors.UnprocessableEntity('invalid email');
    }
  }

  /**
   * Create client
   *
   * @param { Client } client - The client.
   * @param { Options } options - The client creation options.
   * @return { Client } The created client.
   */
  async create(client: DataObject<Client>, options?: Options): Promise<Client> {
    if (!client.email || !client.password) {
      throw new HttpErrors.UnprocessableEntity('invalid email or password');
    }

    this.validateEmail(client.email)
    client.password = await this.encryptPassword(client.password)
    client.verification_token = await generate()

    return await super.create(client, options);
  }
}
