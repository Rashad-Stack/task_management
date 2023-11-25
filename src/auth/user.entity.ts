import { Exclude } from "class-transformer";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;
}
