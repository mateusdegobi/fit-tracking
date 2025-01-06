import {
  CreateAccountUserLoginUseCase,
  DeleteAccountUserLoginUseCase,
  SignInUserLoginUseCase,
} from '../domains/usecases/UserLogin/';
import { UserLoginRepositoryLocal } from '../infra/repository/local/UserLoginRepositoryLocal';

describe('Deve testar o login', () => {
  const repo = new UserLoginRepositoryLocal();
  const mockAccount = {
    email: 'mail@email.com',
    password: '123456',
  };

  it('Deve criar conta e logar', () => {
    const createAccount = new CreateAccountUserLoginUseCase(repo);
    const login = new SignInUserLoginUseCase(repo);
    createAccount.execute(mockAccount.email, mockAccount.password);
    login.execute(mockAccount.email, mockAccount.password);

    expect(repo.accounts).toHaveLength(1);
  });

  it('Deve deletar conta', () => {
    const deleteAccount = new DeleteAccountUserLoginUseCase(repo);
    deleteAccount.execute(mockAccount.email);
    expect(repo.accounts).toHaveLength(0);
  });
});
