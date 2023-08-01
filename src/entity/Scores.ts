import { Entity, ManyToMany,Column, JoinColumn } from "typeorm"
import { User } from "./User";
import { BaseModelEntity } from "./base.model.entity";

@Entity('scores')
export class Scores extends BaseModelEntity {
    @Column({nullable: true})
    total_score: number;

    @Column({
        nullable: true
    })
    category: string;

    @ManyToMany(() => User, (user) => user.scores, {
        nullable: true
    })
    @JoinColumn({name: 'user_id'})
    user: User;
}
