import { UserGroup } from '../../../domains/entities/UserGroup';
import { UserGroupRepository } from '../../../domains/interfaces/UserGroupRepository';

export class UserGroupRepositoryMemory implements UserGroupRepository {
  private groups: UserGroup[] = [];

  addGroup(group: UserGroup) {
    this.groups.push(group);
  }

  removeGroup(id: string) {
    this.groups = this.groups.filter((group) => group.id !== id);
  }

  getGroups() {
    return this.groups;
  }
}
