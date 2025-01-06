import { IUserLoginRepository } from '../../interfaces/UserLoginRepository';

export class DeleteAccountUserLoginUseCase {
  constructor(private repository: IUserLoginRepository) {}

  execute(email: string) {
    this.repository.deleteAccount(email);
  }
}
