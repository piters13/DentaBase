import { pick } from 'ramda';
import { UserContext } from '../user/user-context';

export type User = UserContext;

export function truncateUserToContext(user: User): UserContext {
  return pick(['id', 'email', 'firstName', 'lastName', 'gender'], user);
}
