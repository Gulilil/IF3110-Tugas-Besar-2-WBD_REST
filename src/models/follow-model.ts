import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    JoinTable,
} from "typeorm";

import { User } from "./user-model";

@Entity()
export class Follow extends BaseEntity {
    @Column()
    followee_id: number;

    @Column()
    follower_id: number;

    @ManyToMany(() => User)
    @JoinTable({
        name: 'user_follows', // Name of the join table
        joinColumn: { name: 'follower_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'followee_id', referencedColumnName: 'id' }
    })
    followees: User[];

    @ManyToMany(() => User)
    @JoinTable({
        name: 'user_followers', // Name of the join table, might be the same as above depending on your structure
        joinColumn: { name: 'followee_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'follower_id', referencedColumnName: 'id' }
    })
    followers: User[];
}