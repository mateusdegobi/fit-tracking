import { UserGroup } from '../../../domains/entities/UserGroup';
import { UserGroupRepository } from '../../../domains/interfaces/UserGroupRepository';
import database from '@react-native-firebase/database';

export class UserGroupRepositoryFirebase implements UserGroupRepository {
  async addGroup(group: UserGroup, userId: string) {
    const db = database();
    const userGroups = db.ref('userGroups').child(userId).child('groups').child(group.id);
    userGroups.set({ description: group.description, name: group.name });
  }

  async getGroups(userId: string): Promise<UserGroup[]> {
    const db = database();
    const ref = db.ref(`userGroups/${userId}/groups`);
    const userGroups = (await ref.once('value')).val();
    const groups: UserGroup[] = Object.entries(userGroups).map(([key, value]) => ({
      description: value.description,
      name: value.name,
      id: key,
    }));
    return groups;
  }
  async removeGroup(groupId: UserGroup, userId: string): Promise<void> {
    const db = database();
    await db.ref('userGroups').child(userId).child(groupId.id).remove();
  }
}
