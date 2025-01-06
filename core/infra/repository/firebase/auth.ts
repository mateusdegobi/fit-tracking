import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export class AuthFirebaseRepository {
  async signIn(
    auth: FirebaseAuthTypes.Module,
    email: string,
    password: string,
  ): Promise<any> {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async signOut(auth: FirebaseAuthTypes.Module): Promise<any> {
    return await auth.signOut();
  }

}
