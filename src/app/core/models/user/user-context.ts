export interface UserContext {
  id?: number;
  name: string;
  email: string;
}

export function getUserFullName(user: UserContext): string {
  return `${user.name}`;
}
