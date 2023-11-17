import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  Repository,
} from "typeorm";

import { Client } from "./client-model";
import { Forum } from "./forum-model";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post_id: number;

  @Column()
  forum_id: number;

  @Column()
  author_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  content: string;

  @ManyToOne(() => Client, (client) => client.id, {onDelete: "CASCADE", onUpdate:"CASCADE"})
  @JoinColumn({ name: "author_id" })
  client: Client;

  @ManyToOne(() => Forum, (forum) => forum.id, {onDelete: "CASCADE", onUpdate:"CASCADE"})
  @JoinColumn({ name: "forum_id" })
  forum: Forum;

  @BeforeInsert()
  async assignPostId() {
    const lastPost = await Post.getRepository().findOne({
      where: { forum_id: this.forum_id },
      order: { post_id: 'DESC' }
    });

    this.post_id = lastPost ? lastPost.post_id + 1 : 1;
  }
}
