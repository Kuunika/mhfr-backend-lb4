import { post, requestBody } from '@loopback/rest';
import { Credentials, ClientRepository } from '../repositories';
import { repository } from '@loopback/repository';

export class LoginController {
  constructor(
    @repository(ClientRepository) public clientRepository: ClientRepository,
  ) { }

  @post('login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody() credentials: Credentials,
  ): Promise<{ token: string }> {
    const token = await this.clientRepository.generateClientToken(credentials);
    return { token };
  }
}
