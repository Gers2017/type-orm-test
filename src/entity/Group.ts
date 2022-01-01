import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  // A group has many users and a user can be part of many groups

  @ManyToMany((type) => User, (user) => user.groups)
  @JoinTable()
  members: User[];
}
