import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`insert id value is ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`update id value is ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`remove id value is ${this.id}`);
  }
}
