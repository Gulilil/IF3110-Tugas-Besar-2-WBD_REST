import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./user-model";
import { Forum } from "./forum-model";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    postID: number;

    @Column()
    forumID: number;

    @Column()
    authorID: number;

    @Column()
    created_at: Date;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.userID, { cascade: true })
    @JoinColumn({ name: "authorID" })
    user: User;

    @ManyToOne(() => Forum, (forum) => forum.forumID, { cascade: true })
    @JoinColumn({ name: "forumID" })
    forum: Forum;
}
