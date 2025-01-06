import { UserGroup } from '../entities/UserGroup';

export interface UserGroupRepository {
  addGroup(group: UserGroup, userId: string): Promise<void> | void;
  removeGroup(groupId: UserGroup, userId: string): Promise<void> | void;
  getGroups(userId: string): Promise<UserGroup[]> | UserGroup[];
}
