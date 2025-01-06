import { Exercise } from './Workout';

type FullPostProps = {
  id?: string;
  title: string;
  author: { id?: string; name: string };
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  image?: {
    thumbnail: string;
    photos: string[];
  };
  exercices?: Exercise[];
  duration?: string;
  interactions?: {
    likes?: number;
    comments?: number;
  };
};

export class FullPost {
  public createdAt: Date;
  public updatedAt?: Date;
  public id?: string;
  public title: string;
  public author: { id?: string; name: string };
  public image?: {
    thumbnail: string;
    photos: string[];
  };
  public description?: string;
  public exercices?: Exercise[];
  public duration?: string;
  public interactions?: {
    likes?: { idLike: string; userId: string; userName: string }[];
    comments?: {
      idComment: string;
      comment: string;
      userId: string;
      userName: string;
    }[];
  };

  constructor(props: FullPostProps) {
    const currentTime = new Date();
    this.createdAt = currentTime;
    this.updatedAt = currentTime;
    this.id = props.id;
    this.title = props.title;
    this.author = props.author;
    this.image = props.image;
    this.description = props.description;
    this.exercices = props.exercices;
    this.duration = props.duration;
    this.interactions = props.interactions;
  }
}

type MinimalPostProps = {
  id?: string;
  title: string;
  author: { id?: string; name: string };
  duration?: string;
  createdAt: Date;
  updatedAt?: Date;
  image?: {
    thumbnail: string;
  };
  interactions?: {
    likes?: number;
    comments?: number;
  };
};

export class MinimalPost {
  public updatedAt?: Date;
  public createdAt: Date;
  public id?: string;
  public title: string;
  public author: { id?: string; name: string };
  public duration?: string;
  public image?: {
    thumbnail: string;
  };
  public interactions?: {
    likes?: number;
    comments?: number;
  };

  constructor(props: MinimalPostProps) {
    this.createdAt = props.createdAt;
    this.title = props.title;
    this.author = props.author;
    this.updatedAt = props.updatedAt;
    this.id = props.id;
    this.image = props.image;
    this.duration = props.duration;
    this.interactions = props.interactions;
  }
}
