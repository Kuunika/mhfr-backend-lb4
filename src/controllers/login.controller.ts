import {post, requestBody} from '@loopback/rest';
import {Credentials, UserRepository} from '../repositories';
import {validateCredentials, JWTAuthenticationService} from '../services';
import {repository} from '@loopback/repository';
import {inject} from '@loopback/core';
import {JWTBindings} from '../keys';

export class LoginController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(JWTBindings.SERVICE)
    public jwtAuthenticationService: JWTAuthenticationService,
  ) {}

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
  ): Promise<{token: string}> {
    validateCredentials(credentials);
    const token = await this.jwtAuthenticationService.getAccessTokenForUser(
      credentials,
    );
    return {token};
  }
}
