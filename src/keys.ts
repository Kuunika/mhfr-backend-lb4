import { BindingKey } from '@loopback/context';
import { JWTStrategy } from './strategies/JWT.strategy';

export namespace JWTBindings {
  export const STRATEGY = BindingKey.create<JWTStrategy>(
    'authentication.strategies.jwt.strategy',
  );
}
