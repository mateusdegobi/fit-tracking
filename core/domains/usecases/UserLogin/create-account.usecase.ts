import { IUserLoginRepository } from '../../interfaces/UserLoginRepository';

export class CreateAccountUserLoginUseCase {
  constructor(private repository: IUserLoginRepository) {}

  execute(email: string, password: string) {
    this.repository.createAccount(email, password);
  }
}
