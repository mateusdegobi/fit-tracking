import { MinimalPost } from '../../../domains/entities/Post';
import { Workout } from '../../../domains/entities/Workout';
import { UserPostsRepository } from '../../../domains/interfaces/UserPostsRepository';
import database from '@react-native-firebase/database';

export class UserPostsRepositoryFirebase implements UserPostsRepository {
  async create(data: Workout, currentUserId: string) {
    const db = database();
    const mainPath = `userPosts/${currentUserId}`;
    const fullPostsPath = `${mainPath}/full`;

    const fullPostsPushed = await db.ref(fullPostsPath).push(data);
    if (fullPostsPushed.key) {
      const minimalData = new MinimalPost({
        title: data.title,
        id: fullPostsPushed.key,
        author: data.author,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        image: {
          thumbnail: data.image.thumbnail,
        },
      });
      const minimalPostsPath = `${mainPath}/minimal/${minimalData.id}`;
      delete minimalData.id;

      await db.ref(minimalPostsPath).push(minimalData);
    }
  }

  async getPostById(id: string, currentUserId: string) {}
}
