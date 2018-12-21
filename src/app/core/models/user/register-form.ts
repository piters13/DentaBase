import { User } from '../user/user';

export interface RegisterForm extends User {
  password: string;
  registrationDataProcessing: boolean;
  termsAccepted: boolean;
}
