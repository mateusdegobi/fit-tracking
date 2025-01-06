import { IUserLoginRepository } from '../../../domains/interfaces/UserLoginRepository';
import auth from '@react-native-firebase/auth';

export class UserLoginRepositoryFirebase implements IUserLoginRepository {
  async createAccount(email: string, password: string): Promise<void> {
    await auth().createUserWithEmailAndPassword(email, password);
  }

  async deleteAccount(): Promise<void> {
    auth().currentUser?.delete();
  }

  async signIn(email: string, password: string): Promise<void> {
    await auth().signInWithEmailAndPassword(email, password);
  }

  async signOut(): Promise<void> {
    await auth().signOut();
  }
}
