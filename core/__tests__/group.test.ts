import { FullPost } from '../domains/entities/Post';
import { PostGroupProps, SquadGroup } from '../domains/entities/SquadGroup';
import { UserGroup } from '../domains/entities/UserGroup';
import { UserGroupRepository } from '../domains/interfaces/UserGroupRepository';
import { CreateUserPostUseCase, GetUserPostByIdUseCase } from '../domains/usecases/Posts';
import {
  CreateSquadGroupUseCase,
  GetPostsSquadGroupUseCase,
  PostWorkoutInSquadGroupUseCase,
} from '../domains/usecases/SquadGroup';
import { AddGroupToUserGroupList } from '../domains/usecases/UserGroupList/add-group-to-user-group-list.usecase';
import { GetUserGroupListUseCase } from '../domains/usecases/UserGroupList/get-user-group-list.usecase';
import { SquadGroupRepositoryMemory } from '../infra/repository/local/SquadGroupRepositoryMemory';
import { UserGroupRepositoryMemory } from '../infra/repository/local/UserGroupRepositoryMemory';
import { UserPostsRepositoryMemory } from '../infra/repository/local/UserPostsRepositoryMemory';

describe('Group', () => {
  const repo = new SquadGroupRepositoryMemory();
  const repoPosts = new UserPostsRepositoryMemory();
  const userInfoRepo = new UserGroupRepositoryMemory();

  it('Deve criar um grupo', () => {
    const createSquadGroup = new CreateSquadGroupUseCase(repo);
    const addGroupToUserGroupList = new AddGroupToUserGroupList(userInfoRepo);

    const squad = new SquadGroup({
      id: '12cb3',
      owner: { id: '1', name: 'Author 1' },
      name: 'Grupo 1',
      description: 'Descrição do grupo 1',
      posts: [],
    });

    createSquadGroup.execute(squad);
    addGroupToUserGroupList.execute({
      id: squad.id,
      name: squad.name,
      description: squad.description,
    });

    expect(repo.groups.length).toBe(1);
    expect(repo.groups[0].name).toBe('Grupo 1');
  });

  it('Deve adicionar um post em um grupo', () => {
    const postGroup: PostGroupProps = {
      id: '1',
      title: 'Post 1',
      description: 'Descrição do post 1',
      duration: 110,
      type: 'muscle',
      author: { id: '1', name: 'Author 1' },
    };
    const post: FullPost = {
      id: '1',
      title: 'Post 1',
      description: 'Descrição do post 1',
      author: { id: '1', name: 'Author 1' },
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    const squadId = '12cb3';

    new PostWorkoutInSquadGroupUseCase(repo).execute(postGroup, squadId);
    new CreateUserPostUseCase(repoPosts).execute(post);

    expect(repo.groups[0].posts.length).toBe(1);
    expect(repo.groups[0].posts[0].title).toBe('Post 1');
    expect(repoPosts.posts.length).toBe(1);
    expect(repoPosts.posts[0].title).toBe('Post 1');
  });

  it('Deve retornar todos os posts', () => {
    const posts = new GetPostsSquadGroupUseCase(repo).execute('12cb3');
    const currentPost = posts[0];
    const post = new GetUserPostByIdUseCase(repoPosts).execute(currentPost.id);

    expect(posts.length).toBe(1);
    expect(posts[0].title).toBe('Post 1');
    expect(post?.title).toBe('Post 1');
  });

  it('Deve pegar todos os grupos em que o usuário participa', async () => {
    const groupsUseCase = new GetUserGroupListUseCase(userInfoRepo);
    const groups = await groupsUseCase.execute();
    expect(groups.length).toBe(1);
  });
});
