import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

import { Client } from "./client-model";
import { Post } from "./post-model";

@Entity()
export class Forum extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  post_count: number;

  @ManyToOne(() => Client, (client) => client.id, {onDelete: "CASCADE", onUpdate:"CASCADE"})
  @JoinColumn({ name: "author_id" })
  client: Client;

  @OneToMany(() => Post, (post) => post.forum)
  posts: Post[];
}
