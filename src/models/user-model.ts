import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Forum } from "./forum-model";
import { Post } from "./post-model";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userID: number;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        unique: true,
    })
    username: string;

    @Column()
    password: string;

    @Column({
        unique: true,
    })
    image: string;

    @Column({
        default: false,
    })
    linked: boolean;

    @Column()
    follower_count: number;

    @OneToMany(() => Forum, (forum) => forum.user)
    forums: Forum[];

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @ManyToMany(() => User, (user) => user.followers)
    @JoinTable({
      name: 'follow', // The name of the join table
      joinColumn: { name: 'follower_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'followee_id', referencedColumnName: 'id' }
    })
    following: User[];
  
    @ManyToMany(() => User, (user) => user.following)
    followers: User[];
}