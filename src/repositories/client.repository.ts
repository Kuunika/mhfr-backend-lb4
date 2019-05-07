import * as isemail from 'isemail';
import { generate } from 'shortid';
import { inject } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken'

import {
  DefaultCrudRepository,
  DataObject,
  Options
} from '@loopback/repository';

import { Client } from '../models';
import { MysqlDataSource } from '../datasources';
import { UserProfile } from '@loopback/authentication';

export type Credentials = {
  email: string;
  password: string;
};

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id
  > {

  secret: string;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Client, dataSource);
    this.secret = process.env.JWT_SECRET || '#MHFR@0192'
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

  /**
   * Validate email address.
   *
   * @param { string } email - Email address.
   * @return
   */
  validateEmail(email: string): void {
    if (!isemail.validate(email)) {
      throw new HttpErrors.UnprocessableEntity('invalid email');
    }
  }

  /**
   * Decodes the user's information from a valid JWT access token.
   * Then generate a `UserProfile` instance as the returned user.
   *
   * @param token A JWT access token.
   */
  async decodeAccessToken(token: string): Promise<UserProfile> {
    const decoded = await verify(token, this.secret);
    if (typeof decoded === 'object') {
      const decodedUser: UserProfile = {
        id: "" + 1, // TODO: this is a hack. id: decoded.id not working
        ...decoded
      }
      return decodedUser;
    }
    throw new Error('Invalid payload')
  }

  async generateClientToken(credentials: Credentials): Promise<string> {
    const { email, password } = credentials

    this.validateEmail(email)

    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new HttpErrors['NotFound'](`User with email ${email} not found.`);
    }

    const passwordMatched = await this.isValidPassword(password, user.password);
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('The credentials are not correct.');
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    }

    const time = { expiresIn: 60 * 60 }
    return await sign(payload, this.secret, time)
  }
}
