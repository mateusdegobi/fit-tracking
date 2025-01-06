import { SquadGroup } from '../../entities/SquadGroup';
import { SquadGroupRepository } from '../../interfaces/SquadGroupRepository';

export class CreateSquadGroupUseCase {
  constructor(private repo: SquadGroupRepository) {}
  async execute(data: Omit<SquadGroup, 'id'>) {
    return this.repo.create(data);
  }
}
