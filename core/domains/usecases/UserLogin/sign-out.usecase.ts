import { IUserLoginRepository } from '../../interfaces/UserLoginRepository';

export class SignOutUserLoginUseCase {
  constructor(private repository: IUserLoginRepository) {}

  execute() {
    return this.repository.signOut();
  }
}
