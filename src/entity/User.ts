import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Group } from "./Group";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany((type) => Group, (group) => group.members)
  groups: Group[];
}
