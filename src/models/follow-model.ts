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

import { Client } from "./client-model";

@Entity()
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followee_id: number;

  @Column()
  follower_id: number;

  @ManyToOne(() => Client, (client) => client.id, {onDelete: "CASCADE", onUpdate:"CASCADE"})
  @JoinColumn({ name: "follower_id" })
  Follower: Client[];

  @ManyToOne(() => Client, (client) => client.id, {onDelete: "CASCADE", onUpdate:"CASCADE"})
  @JoinColumn({ name: "followee_id" })
  Followee: Client[];

  // @ManyToMany(() => Client)
  // @JoinTable({
  //     name: 'Client_follows', // Name of the join table
  //     joinColumn: { name: 'follower_id', referencedColumnName: 'id' },
  //     inverseJoinColumn: { name: 'followee_id', referencedColumnName: 'id' }
  // })
  // followees: Client[];

  // @ManyToMany(() => Client)
  // @JoinTable({
  //     name: 'Client_followers', // Name of the join table, might be the same as above depending on your structure
  //     joinColumn: { name: 'followee_id', referencedColumnName: 'id' },
  //     inverseJoinColumn: { name: 'follower_id', referencedColumnName: 'id' }
  // })
  // followers: Client[];
}
