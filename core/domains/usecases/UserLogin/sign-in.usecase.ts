import { IUserLoginRepository } from '../../interfaces/UserLoginRepository';

export class SignInUserLoginUseCase {
  constructor(private repository: IUserLoginRepository) {}

  async execute(email: string, password: string) {
    return this.repository.signIn(email, password);
  }
}
