import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity({name: 'tickets'})
export class ItemTicket  extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column({nullable: true,})
  postedDateTime!: string;

  @Column({nullable: true,})
  createdDateTime!: string;

  @Column({nullable: true,})
  servility!: string;

  @Column({nullable: true,})
  timeToLive!: string;

  @Column({nullable: true,})
  url!: string;

  @Column({nullable: true,})
  logo!: string;

  @Column({nullable: true,})
  order!: string;

  @Column({nullable: true,})
  chime!: string;

  @Column({nullable: true,})
  header!: string;

  @Column({nullable: true,})
  body1!: string;

  @Column({nullable: true,})
  body2!: string;

  @Column({nullable: true,})
  body3!: string;

  @Column({nullable: true,})
  extra1!: string;

  @Column({nullable: true,})
  extra2!: string;
}

