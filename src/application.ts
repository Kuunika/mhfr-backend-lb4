import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import * as path from 'path';
import { MySequence } from './sequence';

import {
  AuthenticationBindings,
  AuthenticationComponent,
} from '@loopback/authentication';

import { JWTBindings } from './keys';

import {
  AuthenticateActionProvider,
  StrategyResolverProvider,
} from './providers';

import { JWTStrategy } from './strategies';

export class StrongLoopApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Bind authentication component related elements
    this.component(AuthenticationComponent);
    this.bind(AuthenticationBindings.AUTH_ACTION).toProvider(
      AuthenticateActionProvider,
    );
    this.bind(AuthenticationBindings.STRATEGY).toProvider(
      StrategyResolverProvider,
    );

    // Bind JWT authentication strategy related elements
    this.bind(JWTBindings.STRATEGY).toClass(JWTStrategy);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
