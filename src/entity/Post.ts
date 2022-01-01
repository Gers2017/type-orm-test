import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostMetadata } from "./PostMetadata";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  title: string;

  @Column("text")
  description: string;

  @Column()
  likes: number;

  @OneToOne((type) => PostMetadata, (postMetadata) => postMetadata.post, {
    cascade: true,
  })
  metadata: PostMetadata;

  @ManyToOne((type) => User, (user) => user.posts, {
    cascade: true,
  })
  user: User;
}
