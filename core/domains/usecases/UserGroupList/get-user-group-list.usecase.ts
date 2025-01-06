import { UserGroupRepository } from '../../interfaces/UserGroupRepository';

export class GetUserGroupListUseCase {
  constructor(private repo: UserGroupRepository) {}

  async execute(userId: string) {
    return this.repo.getGroups(userId);
  }
}
