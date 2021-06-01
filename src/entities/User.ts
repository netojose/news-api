import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert} from "typeorm";

import encryptPassword from "../utils/encryptPassword";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async createIdConfirmationCodeAndHashPassword(): Promise<void> {
    this.password = await encryptPassword(this.password);
  }
}
