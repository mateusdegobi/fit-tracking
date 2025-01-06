import { PostGroupProps, SquadGroup } from '../../../domains/entities/SquadGroup';
import { SquadGroupRepository } from '../../../domains/interfaces/SquadGroupRepository';
import database from '@react-native-firebase/database';

export class SquadGroupRepositoryFirebase implements SquadGroupRepository {
  async create(data: SquadGroup): Promise<SquadGroup> {
    const db = database();
    const ref = db.ref('squad-groups');
    const pushedData = await ref.push(data);

    return { ...data, id: pushedData.key as string };
  }

  async getPosts(squadId: string): Promise<PostGroupProps[] | undefined> {
    const db = database();
    const refSquadGroup = db.ref('squad-groups').child(squadId).child('posts');
    const squadGroupObj = (await refSquadGroup.once('value')).val();
    const squadGroup = Object.entries(squadGroupObj || {}).map(([key, value]) => ({
      id: key,
      ...value,
    }));
    return squadGroup;
  }

  async postWorkoutInSquadGroup(post: PostGroupProps, squadId: string) {
    const db = database();
    const ref = db.ref('squad-groups').child(squadId).child('posts');
    ref.push(post);
  }
}
