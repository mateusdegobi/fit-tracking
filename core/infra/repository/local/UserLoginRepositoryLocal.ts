import { UserLogin } from '../../../domains/entities/UserLogin';

export class UserLoginRepositoryLocal {
  accounts: UserLogin[] = [];

  createAccount(email: string, password: string) {
    this.accounts.push({ email, password });
  }

  signIn(email: string, password: string) {
    const account = this.accounts.find((item) => item.email === email);
    if (!account) {
      throw new Error('Conta não encontrada');
    }
    if (account.password !== password) {
      throw new Error('Senha incorreta');
    }
    return account;
  }

  deleteAccount(email: string) {
    const index = this.accounts.findIndex((item) => item.email === email);
    if (index === -1) {
      throw new Error('Conta não encontrada');
    }
    this.accounts.splice(index, 1);
  }

  signOut() {
    //
  }
}
