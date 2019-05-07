import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';

import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';

import {
  authenticate,
  UserProfile,
  AuthenticationBindings,
} from '@loopback/authentication';

import { Client } from '../models';
import { ClientRepository } from '../repositories';
import { inject } from '@loopback/core';

export class ClientController {
  constructor(
    @repository(ClientRepository)
    public clientRepository: ClientRepository,
    @inject(AuthenticationBindings.CURRENT_USER) private currentUser: UserProfile,
  ) { }

  @post('/clients', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Client } } },
      },
    },
  })
  async create(@requestBody() client: Client): Promise<Client> {
    const createdClient = await this.clientRepository.create(client);

    delete createdClient.password
    delete createdClient.archived_date
    delete createdClient.email_verified
    delete createdClient.verification_token

    return createdClient
  }

  @get('/clients/count', {
    responses: {
      '200': {
        description: 'Client model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where,
  ): Promise<Count> {
    return await this.clientRepository.count(where);
  }

  @get('/clients', {
    responses: {
      '200': {
        description: 'Array of Client model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Client } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(Client)) filter?: Filter,
  ): Promise<Client[]> {

    const fields = {
      password: false,
      archived_date: false,
      email_verified: false,
      verification_token: false,
    }

    const changedFilter: Filter = { ...filter, fields };
    return await this.clientRepository.find(changedFilter);
  }

  @patch('/clients', {
    responses: {
      '200': {
        description: 'Client PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() client: Client,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where,
  ): Promise<Count> {
    return await this.clientRepository.updateAll(client, where);
  }

  @get('/clients/{id}', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Client } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Client> {
    return await this.clientRepository.findById(id);
  }

  @patch('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() client: Client,
  ): Promise<void> {
    await this.clientRepository.updateById(id, client);
  }

  @put('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() client: Client,
  ): Promise<void> {
    await this.clientRepository.replaceById(id, client);
  }

  @del('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clientRepository.deleteById(id);
  }
}
