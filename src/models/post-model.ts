import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { User } from "./user-model";
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

    @ManyToOne(() => User, (user) => user.id, { cascade: true })
    @JoinColumn({ name: "author_id" })
    user: User;

    @ManyToOne(() => Forum, (forum) => forum.id, { cascade: true })
    @JoinColumn({ name: "id" })
    forum: Forum;
}
