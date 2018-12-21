export interface UserContext {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export function getUserFullName(user: UserContext): string {
  return `${user.firstName} ${user.lastName}`;
}
