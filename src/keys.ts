import {BindingKey} from '@loopback/context';
import {JWTAuthenticationService} from './services/jwt.service';
import {JWTStrategy} from './strategies/JWT.strategy';
import {PasswordHasher} from './services/hash.service';

export namespace JWTBindings {
  export const STRATEGY = BindingKey.create<JWTStrategy>(
    'authentication.strategies.jwt.strategy',
  );
  export const SECRET = BindingKey.create<string>('authentication.jwt.secret');
  export const SERVICE = BindingKey.create<JWTAuthenticationService>(
    'services.authentication.jwt.service',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}
