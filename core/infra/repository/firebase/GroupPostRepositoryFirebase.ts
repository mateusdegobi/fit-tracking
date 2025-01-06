import { FullPost, MinimalPost } from '../../../domains/entities/Post';
import {
  CreatePostProps,
  GroupPostRepositoryInterface,
} from '../../../domains/interfaces/GroupPostRepository.contract';
import database from '@react-native-firebase/database';

export class GroupPostRepositoryFirebase implements GroupPostRepositoryInterface {
  async createPost(props: CreatePostProps) {
    const db = database();
    const pathPosts = 'groups/' + props.groupId + '/posts';
    const pathMinimalPosts = pathPosts + '/minimal';
    const pathFullPosts = pathPosts + '/full';

    const refFullPosts = db.ref(pathFullPosts);
    const refMinimalPosts = db.ref(pathMinimalPosts);
    console.log(props.post.full);
    const keyPost = refFullPosts.push(props.post.full).key;
    if (keyPost) {
      refMinimalPosts.child(keyPost).set(props.post.minimal);
    }
  }
  async getAllPosts(groupId: string) {
    const db = database();
    const path = 'groups/' + groupId + '/posts/minimal';
    const snapshot = await db.ref(path).once('value');
    if (snapshot.exists()) {
      const posts = snapshot.val();

      const postsArray = Object.entries(posts).map(([key, value]: [string, MinimalPost]) => ({
        ...value,
        id: key,
      }));
      return postsArray as MinimalPost[];
    }

    return [];
  }
  async getPostById(groupId: string, postId: string) {
    const db = database();
    const path = 'groups/' + groupId + '/posts/full/' + postId;
    console.log(path);
    const snapshot = await db.ref(path).once('value');
    if (snapshot.exists()) {
      return snapshot.val() as FullPost;
    }
    return null;
  }
  async deletePost(groupId: string, postId: string) {
    const db = database();
    const pathFull = 'groups/' + groupId + '/posts/full/' + postId;
    const pathMinimal = 'groups/' + groupId + '/posts/minimal/' + postId;

    await db.ref(pathFull).remove();
    await db.ref(pathMinimal).remove();
  }
}
