import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class PostMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 65 })
  createdAt: string;

  @OneToOne((type) => Post)
  @JoinColumn()
  post: Post;
}
