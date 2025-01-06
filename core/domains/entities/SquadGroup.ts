export class SquadGroup {
  public id: string;
  public name: string;
  public description: string;
  public owner: { id: string; name: string };
  public posts: PostGroupProps[] = [];

  constructor({ id, name, description, owner }: SquadGroupProps) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.owner = owner;
  }
}
