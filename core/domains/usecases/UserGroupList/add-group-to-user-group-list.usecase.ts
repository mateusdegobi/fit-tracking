import { UserGroup } from '../../entities/UserGroup';
import { UserGroupRepository } from '../../interfaces/UserGroupRepository';

export class AddGroupToUserGroupList {
  constructor(private repo: UserGroupRepository) {}

  async execute(group: UserGroup, userId: string) {
    return this.repo.addGroup(group, userId);
  }
}
