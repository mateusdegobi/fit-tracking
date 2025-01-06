import { FullPost, MinimalPost } from '../../../entities/Post';
import { GroupPostRepositoryInterface } from '../../../interfaces/GroupPostRepository.contract';

export class CreateGroupPostUseCase {
  constructor(private repo: GroupPostRepositoryInterface) {}

  async execute(props: { groupId: string; post: FullPost }) {
    const fullPost = props.post;
    const minimalPost = new MinimalPost({
      author: fullPost.author,
      createdAt: fullPost.createdAt,
      title: fullPost.title,
    });

    await this.repo.createPost({
      groupId: props.groupId,
      post: {
        full: fullPost,
        minimal: minimalPost,
      },
    });
  }
}
