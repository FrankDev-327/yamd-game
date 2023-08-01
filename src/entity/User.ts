import { Entity, Column, OneToMany, JoinColumn, BeforeInsert } from "typeorm"
import { Scores } from "./Scores";
import { BaseModelEntity } from "./base.model.entity";
import { hashingPass } from "../utils/bcrypt.helper";

@Entity('users')
export class User extends BaseModelEntity {
    @Column({nullable: true})
    firstName: string

    @Column({nullable: true})
    lastName: string

    @Column({nullable: true})
    email: string

    @Column({nullable: true})
    password: string

    @OneToMany(() =>  Scores, (scores) => scores.user, {
        nullable: true
    })
    @JoinColumn({name: 'score_id'})
    scores: Scores[];

    @BeforeInsert()
    async hashingPassword() {
        this.password = await hashingPass(this.password);
    }
}
