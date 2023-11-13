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

import { User } from "./user-model";
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

    @ManyToOne(() => User, (user) => user.id, { cascade: true })
    @JoinColumn({ name: "author_id" })
    user: User;

    // @OneToMany(() => Post, (post) => post.forum)
    // posts: Post[];
}
