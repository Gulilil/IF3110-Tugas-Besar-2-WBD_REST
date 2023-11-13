import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    JoinTable,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
} from "typeorm";

import { User } from "./user-model";

@Entity()
export class Follow extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    followee_id: number;

    @Column()
    follower_id: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "follower_id"})
    Follower: User[];

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name : "followee_id"})
    Followee: User[];

    // @ManyToMany(() => User)
    // @JoinTable({
    //     name: 'user_follows', // Name of the join table
    //     joinColumn: { name: 'follower_id', referencedColumnName: 'id' },
    //     inverseJoinColumn: { name: 'followee_id', referencedColumnName: 'id' }
    // })
    // followees: User[];

    // @ManyToMany(() => User)
    // @JoinTable({
    //     name: 'user_followers', // Name of the join table, might be the same as above depending on your structure
    //     joinColumn: { name: 'followee_id', referencedColumnName: 'id' },
    //     inverseJoinColumn: { name: 'follower_id', referencedColumnName: 'id' }
    // })
    // followers: User[];
}