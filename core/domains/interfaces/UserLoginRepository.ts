export interface IUserLoginRepository {
  createAccount: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  deleteAccount: (email: string) => void;
  signOut: () => void;
}
