import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./user-model";
import { Post } from "./post-model";

@Entity()
export class Forum extends BaseEntity {
    @PrimaryGeneratedColumn()
    forumID: number;

    @Column()
    title: string;

    @Column()
    authorID: number;

    @Column()
    created_at: Date;

    @Column()
    post_count: number;

    @ManyToOne(() => User, (user) => user.userID, { cascade: true })
    @JoinColumn({ name: "authorID" })
    user: User;

    @OneToMany(() => Post, (post) => post.forum)
    posts: Post[];
}
